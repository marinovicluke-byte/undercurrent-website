// components/gr/slots.js — call slots in Melbourne time, whatever the visitor's own time zone.
// Next 10 business days, 9:00 to 17:00 in 30 minute steps (last start 16:30), nothing sooner than
// 2 hours from now. GET /api/leads/google-reviews/slots then hides the taken ones; until that route
// exists (lead-booking pane) every slot shows. The server stays the judge: a taken slot is refused there.
const TZ = 'Australia/Melbourne'
const DAYS = 10
const LEAD_MS = 2 * 60 * 60 * 1000
// VIC public holidays inside the next few months. The server is the real check; this only hides them.
const HOLIDAYS = new Set(['2026-11-03', '2026-12-25', '2026-12-28', '2027-01-01', '2027-01-26', '2027-03-08'])

const pad = n => String(n).padStart(2, '0')

// Melbourne's calendar date for an instant, as [y, m, d, weekday 0-6].
function melbDate(ms) {
  const parts = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short' }).formatToParts(new Date(ms))
  const get = t => parts.find(p => p.type === t).value
  const wd = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'))
  return [+get('year'), +get('month'), +get('day'), wd]
}

// Melbourne's UTC offset at an instant, as "+11:00" or "+10:00".
function melbOffset(ms) {
  const name = new Intl.DateTimeFormat('en-US', { timeZone: TZ, timeZoneName: 'longOffset' }).formatToParts(new Date(ms)).find(p => p.type === 'timeZoneName').value
  return name.replace('GMT', '') || '+00:00'
}

// One slot: the ISO string the form posts (with Melbourne's offset) and the instant it stands for.
function slot(y, m, d, h, min) {
  const guess = Date.UTC(y, m - 1, d, h, min) - 10 * 3600 * 1000
  const off = melbOffset(guess)
  const iso = `${y}-${pad(m)}-${pad(d)}T${pad(h)}:${pad(min)}:00${off}`
  return { iso, ms: Date.parse(iso), label: timeLabel(h, min) }
}

function timeLabel(h, min) {
  const ap = h < 12 ? 'am' : 'pm'
  return `${h % 12 || 12}:${pad(min)} ${ap}`
}

export function buildDays(now = Date.now()) {
  const days = []
  for (let i = 0; days.length < DAYS && i < 30; i++) {
    const [y, m, d, wd] = melbDate(now + i * 86400000)
    const key = `${y}-${pad(m)}-${pad(d)}`
    if (wd === 0 || wd === 6 || HOLIDAYS.has(key) || days.some(x => x.key === key)) continue
    const slots = []
    for (let h = 9; h < 17; h++) for (const min of [0, 30]) {
      const s = slot(y, m, d, h, min)
      if (s.ms - now >= LEAD_MS) slots.push(s)
    }
    if (!slots.length) continue
    const label = dayLabel(slots[0].ms)
    days.push({ key, label, slots })
  }
  return days
}

// "Tue 14 Oct" (en-AU puts a comma after the weekday; dropped)
function dayLabel(ms) {
  return new Intl.DateTimeFormat('en-AU', { timeZone: TZ, weekday: 'short', day: 'numeric', month: 'short' }).format(new Date(ms)).replace(',', '')
}

// "Tue 14 Oct, 10:30 am"
export function slotLabel(iso) {
  const ms = Date.parse(iso)
  const day = dayLabel(ms)
  const time = new Intl.DateTimeFormat('en-AU', { timeZone: TZ, hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(ms)).replace(/\s?([ap])\.?m\.?/i, ' $1m')
  return `${day}, ${time}`
}

// The visitor's own clock for a slot, only when it differs from Melbourne's (Perth, Brisbane, Adelaide).
export function localHint(iso) {
  const ms = Date.parse(iso)
  const fmt = tz => new Intl.DateTimeFormat('en-AU', { timeZone: tz, hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(ms))
  const mine = Intl.DateTimeFormat().resolvedOptions().timeZone
  if (!mine || fmt(mine) === fmt(TZ)) return ''
  return `That’s ${fmt(mine).replace(/\s?([ap])\.?m\.?/i, ' $1m')} your time.`
}

// Accepts either { taken: [iso] } or { available: [iso] } from the slots route. Anything else: show all.
export async function fetchTaken(duration) {
  try {
    const res = await fetch(`/api/leads/google-reviews/slots?duration=${duration}`, { headers: { accept: 'application/json' } })
    if (!res.ok) return { stub: true }
    const j = await res.json()
    if (Array.isArray(j.taken)) return { taken: new Set(j.taken.map(t => Date.parse(t))) }
    if (Array.isArray(j.available)) return { available: new Set(j.available.map(t => Date.parse(t))) }
    return { stub: true }
  } catch {
    return { stub: true }
  }
}
