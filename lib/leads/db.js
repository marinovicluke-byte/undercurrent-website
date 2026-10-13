// lib/leads/db.js
// Supabase REST (PostgREST) with the service-role key, server only. Tables come from
// Operations/meta-ads/db/schema.sql + the 2026-10-13 google-reviews migration beside it.

function cfg() {
  const url = process.env.LEADS_SUPABASE_URL
  const key = process.env.LEADS_SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('LEADS_SUPABASE_URL / LEADS_SUPABASE_SERVICE_ROLE_KEY not set')
  return { base: `${url.replace(/\/$/, '')}/rest/v1`, key }
}

async function rest(path, { method = 'GET', body, prefer } = {}) {
  const { base, key } = cfg()
  const headers = { apikey: key, authorization: `Bearer ${key}`, 'content-type': 'application/json' }
  if (prefer) headers.prefer = prefer
  const res = await fetch(`${base}/${path}`, {
    method,
    headers,
    body: body === undefined ? undefined : JSON.stringify(body),
    cache: 'no-store',
    signal: AbortSignal.timeout(10_000),
  })
  const text = await res.text()
  if (!res.ok) {
    const err = new Error(`supabase ${method} ${path.split('?')[0]} ${res.status}: ${text.slice(0, 300)}`)
    err.status = res.status
    throw err
  }
  return text ? JSON.parse(text) : null
}

export async function findLeadByMobile(mobile) {
  const rows = await rest(`leads?mobile=eq.${encodeURIComponent(mobile)}&select=*&limit=1`)
  return rows[0] || null
}

export async function insertLead(row) {
  const rows = await rest('leads', { method: 'POST', body: row, prefer: 'return=representation' })
  return rows[0]
}

export async function updateLead(id, patch) {
  await rest(`leads?id=eq.${id}`, { method: 'PATCH', body: patch, prefer: 'return=minimal' })
}
