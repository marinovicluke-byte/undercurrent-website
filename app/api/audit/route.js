// app/api/audit/route.js
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { auditSchema } from '@/lib/validation'
import { proxyToN8n } from '@/lib/webhookProxy'

const MAX_BODY_SIZE = 50_000

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = auditSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  if (result.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const { honeypot, ...payload } = result.data
  const proxy = await proxyToN8n(process.env.N8N_AUDIT_WEBHOOK_URL, payload)
  if (!proxy.ok) {
    return NextResponse.json({ error: 'Submission failed' }, { status: proxy.status })
  }

  return NextResponse.json({ ok: true })
}
