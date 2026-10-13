// app/api/leads/google-reviews/slots/route.js
// GET ?duration=15|30&days=1-14 → open call slots from Luke's Cal.com, grouped by Melbourne date.
import { NextResponse } from 'next/server'
import { getSlots } from '@/lib/leads/cal'
import { TZ } from '@/lib/leads/core'

const MIN_NOTICE_MS = 2 * 3_600_000 // never offer a slot less than 2 hours out

function melbDate(d) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: TZ, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d)
}

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const duration = Number(searchParams.get('duration') || 30)
  const days = Math.min(Math.max(Number(searchParams.get('days') || 7), 1), 14)
  if (duration !== 15 && duration !== 30) {
    return NextResponse.json({ ok: false, error: 'duration must be 15 or 30' }, { status: 400 })
  }

  const now = new Date()
  const start = melbDate(now)
  const end = melbDate(new Date(now.getTime() + days * 86_400_000))
  try {
    const all = await getSlots({ durationMin: duration, start, end })
    const cutoff = now.getTime() + MIN_NOTICE_MS
    const slots = {}
    for (const [date, list] of Object.entries(all)) {
      const open = list.filter((s) => new Date(s).getTime() >= cutoff)
      if (open.length) slots[date] = open
    }
    return NextResponse.json(
      { ok: true, timezone: TZ, duration_min: duration, slots },
      { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=60' } },
    )
  } catch (err) {
    console.error('[gr-slots]', err.message)
    return NextResponse.json({ ok: false, error: 'slots_unavailable' }, { status: 502 })
  }
}
