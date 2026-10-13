// lib/leads/cal.js
// Cal.com v2 is the slot source: it owns Luke's availability, checks his connected calendar for
// clashes, writes the event to it and emails the lead a confirmation with reschedule links.
// Slots and bookings on a public event type need no API key. CAL_API_KEY is sent when set.
import { TZ } from './core.js'

const API = 'https://api.cal.com/v2'

function eventSlug(durationMin) {
  return durationMin === 15
    ? process.env.CAL_EVENT_SLUG_15 || '15min'
    : process.env.CAL_EVENT_SLUG_30 || '30min'
}

function headers(version) {
  const h = { 'content-type': 'application/json', 'cal-api-version': version }
  if (process.env.CAL_API_KEY) h.authorization = `Bearer ${process.env.CAL_API_KEY}`
  return h
}

// Public booking handle (cal.com/luke-marinovic-aqeosc), not a secret.
const username = () => process.env.CAL_USERNAME || 'luke-marinovic-aqeosc'

/** Open slots grouped by Melbourne date: { 'YYYY-MM-DD': ['2026-10-14T09:00:00.000+11:00', ...] } */
export async function getSlots({ durationMin, start, end }) {
  const qs = new URLSearchParams({
    eventTypeSlug: eventSlug(durationMin),
    username: username(),
    start,
    end,
    timeZone: TZ,
  })
  const res = await fetch(`${API}/slots?${qs}`, {
    headers: headers('2024-09-04'),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok || body.status !== 'success') {
    throw new Error(`cal slots ${res.status}: ${JSON.stringify(body).slice(0, 300)}`)
  }
  const out = {}
  for (const [date, slots] of Object.entries(body.data || {})) {
    out[date] = slots.map((s) => (typeof s === 'string' ? s : s.start))
  }
  return out
}

/**
 * Book the slot. Returns { uid, id, start } or throws. A taken slot comes back as a 4xx;
 * the caller maps that to "pick another time".
 */
export async function createBooking({ slotStart, durationMin, name, email, phone, notes, metadata }) {
  const res = await fetch(`${API}/bookings`, {
    method: 'POST',
    headers: headers('2026-02-25'),
    body: JSON.stringify({
      start: new Date(slotStart).toISOString(),
      eventTypeSlug: eventSlug(durationMin),
      username: username(),
      attendee: { name, email, timeZone: TZ, phoneNumber: phone, language: 'en' },
      bookingFieldsResponses: { notes },
      metadata,
    }),
    signal: AbortSignal.timeout(15_000),
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok || body.status !== 'success') {
    const err = new Error(`cal booking ${res.status}: ${JSON.stringify(body).slice(0, 400)}`)
    err.status = res.status
    throw err
  }
  const b = Array.isArray(body.data) ? body.data[0] : body.data
  return { uid: b.uid, id: b.id, start: b.start }
}
