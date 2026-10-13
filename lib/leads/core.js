// lib/leads/core.js
// Pure helpers for the Google reviews lead funnel: form schema, AU phone, GBP link check.
// No network, no env, so `node --test` can run them directly.
import { z } from 'zod'

export const TZ = 'Australia/Melbourne'
export const NICHES = ['general', 'jiu-jitsu', 'electricians']
export const YEARS = ['<1', '1-3', '3-10', '10+']

/**
 * AU mobile/landline → E.164 (+61...). Ported from Operations/meta-ads/tracking/lib/normalize.ts.
 * AU only: every other country code is rejected (SMS toll-fraud guard).
 */
export function toE164AU(raw) {
  if (!raw) return null
  let s = String(raw).replace(/[^\d+]/g, '')
  if (s.startsWith('+')) return /^\+61\d{9}$/.test(s) ? s : null
  if (s.startsWith('61')) s = s.slice(2)
  else if (s.startsWith('0')) s = s.slice(1)
  if (!/^\d{9}$/.test(s)) return null
  return `+61${s}`
}

const optionalText = (max) =>
  z.preprocess((v) => (v === '' || v === null ? undefined : v), z.string().trim().max(max).optional())

export const googleReviewsLeadSchema = z.object({
  name: z.string().trim().min(1).max(100),
  phone: z.string().trim().min(8).max(20),
  email: z.string().trim().email().max(254),
  business_name: z.string().trim().min(1).max(150),
  website: optionalText(300),
  gbp_url: z.string().trim().min(5).max(1000),
  years_in_business: z.enum(YEARS),
  slot_start: z.string().datetime({ offset: true }),
  duration_min: z.coerce.number().refine((n) => n === 15 || n === 30, 'duration_min must be 15 or 30'),
  niche: z.enum(NICHES),
  page_variant: optionalText(60),
  utm_source: optionalText(200),
  utm_medium: optionalText(200),
  utm_campaign: optionalText(200),
  utm_content: optionalText(200),
  fbclid: optionalText(500),
  fbp: optionalText(200),
  fbc: optionalText(600),
  posthog_distinct_id: optionalText(200),
  event_id: z.string().uuid(),
  consent: z.literal(true),
  cf_turnstile_token: optionalText(2048),
  honeypot: z.string().max(0).optional(),
})

/** The consent line the page shows (compliance/consent-copy.md §2). Stored against the lead. */
export const CONSENT_TEXT =
  'I agree to be contacted by UnderCurrent by phone, SMS and email about my enquiry. Reply STOP to opt out anytime.'

/** GBP link guard: must be a Google Maps / Business Profile / g.page / goo.gl link. */
export function isGbpUrl(raw) {
  try {
    const u = new URL(raw.startsWith('http') ? raw : `https://${raw}`)
    const h = u.hostname.toLowerCase()
    return (
      h === 'g.page' ||
      h === 'maps.app.goo.gl' ||
      h === 'goo.gl' ||
      h === 'share.google' ||
      /(^|\.)google\.[a-z.]+$/.test(h)
    )
  } catch {
    return false
  }
}
