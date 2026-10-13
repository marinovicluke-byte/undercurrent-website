// lib/leads/signals.js
// Tracking signals the form receiver fires after a lead lands: Meta CAPI Lead and a PostHog
// server event. They stay in the route because CAPI match quality needs the request's IP and
// user agent. Texts, the Telegram ping and the Twenty sync are Python jobs (meta-ads automation/).
// Each is a no-op (returns { skipped }) when its env vars are missing.
import { createHash } from 'node:crypto'

const sha256 = (v) => createHash('sha256').update(v, 'utf8').digest('hex')
const normName = (v) => (v || '').trim().toLowerCase().replace(/[^a-zà-ɏ]/g, '')

/** Meta Conversions API Lead. Same event_id as the browser Pixel Lead, so Meta dedups the pair. */
export async function sendCapiLead(lead, { ip, userAgent, sourceUrl }) {
  const pixel = process.env.META_PIXEL_ID
  const token = process.env.META_CAPI_TOKEN
  if (!pixel || !token) return { skipped: 'META_PIXEL_ID / META_CAPI_TOKEN not set' }
  const [first, ...rest] = lead.name.trim().split(/\s+/)
  const user_data = {
    em: [sha256(lead.email.trim().toLowerCase())],
    ph: [sha256(lead.mobile.replace(/\D/g, ''))],
    country: [sha256('au')],
  }
  if (normName(first)) user_data.fn = [sha256(normName(first))]
  if (normName(rest.join(''))) user_data.ln = [sha256(normName(rest.join('')))]
  const fbc = lead.fbc || (lead.fbclid ? `fb.1.${Date.now()}.${lead.fbclid}` : null)
  if (fbc) user_data.fbc = fbc
  if (lead.fbp) user_data.fbp = lead.fbp
  if (ip) user_data.client_ip_address = ip
  if (userAgent) user_data.client_user_agent = userAgent

  const payload = {
    data: [
      {
        event_name: 'Lead',
        event_time: Math.floor(Date.now() / 1000),
        event_id: lead.event_id,
        action_source: 'website',
        event_source_url: sourceUrl || undefined,
        user_data,
        custom_data: { niche: lead.niche, page_variant: lead.page_variant || undefined },
      },
    ],
  }
  if (process.env.META_CAPI_TEST_EVENT_CODE) payload.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE
  const version = process.env.META_GRAPH_API_VERSION || 'v21.0'
  const res = await fetch(`https://graph.facebook.com/${version}/${pixel}/events?access_token=${encodeURIComponent(token)}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(10_000),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(`capi ${res.status}: ${JSON.stringify(body).slice(0, 300)}`)
  return body
}

/** PostHog server event, joined to the browser session by posthog_distinct_id when the page sent it. */
export async function capturePosthog(event, distinctId, properties) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
  if (!key) return { skipped: 'NEXT_PUBLIC_POSTHOG_KEY not set' }
  const host = (process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com').replace(/\/$/, '')
  const res = await fetch(`${host}/i/v0/e/`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ api_key: key, event, distinct_id: distinctId, properties, timestamp: new Date().toISOString() }),
    signal: AbortSignal.timeout(8_000),
  })
  if (!res.ok) throw new Error(`posthog ${res.status}`)
  return { ok: true }
}
