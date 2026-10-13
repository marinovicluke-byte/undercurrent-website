// app/api/leads/google-reviews/route.js
// The Google reviews form receiver (Meta ads funnel). Validates, books the slot on Cal.com,
// writes the Supabase `leads` row and answers the page. Tracking (CAPI, PostHog) runs after the
// response. Texts, the Telegram ping and the Twenty sync are Python jobs that read `leads`
// (Operations/meta-ads/automation/lead_jobs.py, Twenty/integrations/meta_lead_sync.py).
import { NextResponse, after } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { googleReviewsLeadSchema, toE164AU, isGbpUrl, CONSENT_TEXT } from '@/lib/leads/core'
import { createBooking } from '@/lib/leads/cal'
import { findLeadByMobile, insertLead, updateLead } from '@/lib/leads/db'
import { sendCapiLead, capturePosthog } from '@/lib/leads/tracking'

const MAX_BODY_SIZE = 10_000
const MIN_NOTICE_MS = 60 * 60_000
const MAX_AHEAD_MS = 60 * 86_400_000

// Optional bot check: on once TURNSTILE_SECRET_KEY is set (the page then sends cf_turnstile_token).
async function turnstileOk(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true
  if (!token) return false
  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    body: new URLSearchParams({ secret, response: token, ...(ip !== 'unknown' && { remoteip: ip }) }),
    signal: AbortSignal.timeout(8_000),
  }).catch(() => null)
  const body = res ? await res.json().catch(() => ({})) : {}
  return body.success === true
}

const fail = (status, error, extra) => NextResponse.json({ ok: false, error, ...extra }, { status })

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!rateLimit(ip).allowed) return fail(429, 'too_many_requests')

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY_SIZE) return fail(413, 'payload_too_large')

  let body
  try {
    body = await request.json()
  } catch {
    return fail(400, 'invalid_json')
  }

  const parsed = googleReviewsLeadSchema.safeParse(body)
  if (!parsed.success) return fail(422, 'validation_failed', { fields: parsed.error.flatten().fieldErrors })
  const f = parsed.data
  if (f.honeypot) return NextResponse.json({ ok: true, lead_id: null })
  if (!(await turnstileOk(f.cf_turnstile_token, ip))) return fail(403, 'bot_check_failed')

  const mobile = toE164AU(f.phone)
  if (!mobile) return fail(422, 'validation_failed', { fields: { phone: ['Enter an Australian phone number'] } })
  if (!isGbpUrl(f.gbp_url)) {
    return fail(422, 'validation_failed', { fields: { gbp_url: ['Paste your Google Business Profile or Maps link'] } })
  }
  const slotMs = new Date(f.slot_start).getTime()
  if (slotMs < Date.now() + MIN_NOTICE_MS || slotMs > Date.now() + MAX_AHEAD_MS) {
    return fail(422, 'validation_failed', { fields: { slot_start: ['Pick another time'] } })
  }

  let existing
  try {
    existing = await findLeadByMobile(mobile)
  } catch (err) {
    console.error('[gr-lead] supabase read', err.message)
    return fail(503, 'try_again')
  }

  // Dedupe on phone: an upcoming booking stands, a second submit does not double-book.
  // The reply carries no id or time, so nobody can look up another person's booking by phone.
  if (existing?.status === 'booked' && existing.slot_start && new Date(existing.slot_start) > new Date()) {
    await updateLead(existing.id, { submissions: (existing.submissions || 1) + 1 }).catch(() => {})
    return NextResponse.json({ ok: true, lead_id: null, duplicate: true })
  }

  let booking
  try {
    booking = await createBooking({
      slotStart: f.slot_start,
      durationMin: f.duration_min,
      name: f.name,
      email: f.email,
      phone: mobile,
      notes: [
        `Business: ${f.business_name}`,
        `Google profile: ${f.gbp_url}`,
        `Website: ${f.website || 'none'}`,
        `Years in business: ${f.years_in_business}`,
        `Phone: ${mobile}`,
        `From: ${f.niche} page${f.utm_content ? `, ad ${f.utm_content}` : ''}`,
      ].join('\n'),
      metadata: {
        funnel: 'google-reviews',
        niche: f.niche,
        event_id: f.event_id,
        ...(f.utm_campaign && { utm_campaign: f.utm_campaign.slice(0, 500) }),
        ...(f.utm_content && { utm_content: f.utm_content.slice(0, 500) }),
      },
    })
  } catch (err) {
    console.error('[gr-lead] cal booking', err.message)
    if (err.status && err.status < 500) return fail(409, 'slot_taken')
    return fail(502, 'booking_failed')
  }

  const now = new Date().toISOString()
  const row = {
    name: f.name,
    mobile,
    email: f.email.toLowerCase(),
    business: f.business_name,
    website: f.website || null,
    gbp_url: f.gbp_url,
    years_in_business: f.years_in_business,
    slot_start: booking.start || f.slot_start,
    duration_min: f.duration_min,
    booked_at: now,
    cal_booking_uid: booking.uid,
    cal_booking_id: booking.id,
    niche: f.niche,
    page_variant: f.page_variant || null,
    source: 'meta-google-reviews',
    status: 'booked',
    utm_source: f.utm_source || null,
    utm_medium: f.utm_medium || null,
    utm_campaign: f.utm_campaign || null,
    utm_content: f.utm_content || null,
    utm_term: f.utm_term || null,
    ad_id: f.ad_id || null,
    fbclid: f.fbclid || null,
    fbc: f.fbc || null,
    fbp: f.fbp || null,
    event_id: f.event_id,
    posthog_distinct_id: f.posthog_distinct_id || null,
    consent: true,
    consent_text: CONSENT_TEXT,
    consent_at: now,
  }

  let lead
  try {
    if (existing) {
      // Same phone, past or cancelled slot: rebook on the same row. Message rows key on
      // slot_start, so the new slot gets a fresh set of texts.
      await updateLead(existing.id, {
        ...row,
        status: existing.status === 'won' ? 'won' : 'booked', // never downgrade a client
        submissions: (existing.submissions || 1) + 1,
        luke_pinged_at: null,
        capi_sent_at: null,
        capi_error: null,
      })
      lead = { ...existing, ...row }
    } else {
      lead = await insertLead(row)
    }
  } catch (err) {
    // The booking exists (Cal.com emailed Luke and the lead), but nothing downstream will see it.
    // Log loud and still confirm to the lead: their slot is real.
    console.error('[gr-lead] LEAD_NOT_SAVED cal booking', booking.uid, err.message)
    return NextResponse.json({ ok: true, lead_id: null, slot_start: row.slot_start })
  }

  after(async () => {
    const [capi, ph] = await Promise.allSettled([
      sendCapiLead(lead, {
        ip: ip === 'unknown' ? null : ip,
        userAgent: request.headers.get('user-agent'),
        sourceUrl: request.headers.get('referer'),
      }),
      capturePosthog('gr_lead_created', f.posthog_distinct_id || lead.id, {
        lead_id: lead.id,
        niche: f.niche,
        page_variant: f.page_variant,
        duration_min: f.duration_min,
        years_in_business: f.years_in_business,
        has_website: Boolean(f.website),
        utm_source: f.utm_source,
        utm_campaign: f.utm_campaign,
        utm_content: f.utm_content,
        utm_term: f.utm_term,
        ad_id: f.ad_id,
        repeat_submit: Boolean(existing),
      }),
    ])
    if (ph.status === 'rejected') console.error('[gr-lead] posthog', ph.reason?.message)
    const capiPatch =
      capi.status === 'fulfilled'
        ? capi.value?.skipped
          ? { capi_error: capi.value.skipped }
          : { capi_sent_at: new Date().toISOString(), capi_error: null }
        : { capi_error: String(capi.reason?.message || capi.reason).slice(0, 500) }
    await updateLead(lead.id, capiPatch).catch((e) => console.error('[gr-lead] capi patch', e.message))
  })

  return NextResponse.json({ ok: true, lead_id: lead.id, slot_start: row.slot_start })
}
