// End-to-end test of the Google reviews form receiver with a fake lead on Luke's own phone/email.
// Books a REAL Cal.com slot (the last open one in the next 7 days): cancel it from the Cal.com email after.
//
//   TEST_LEAD_PHONE=04xx TEST_LEAD_EMAIL=you@x node scripts/test-gr-lead.mjs http://localhost:3001
//
// Reads TEST_LEAD_PHONE / TEST_LEAD_EMAIL from the environment (or .env.local), never from this file.
import { readFileSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

const base = (process.argv[2] || 'http://localhost:3001').replace(/\/$/, '')
try {
  for (const line of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = line.match(/^(TEST_LEAD_\w+)=(.*)$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim()
  }
} catch {}
const { TEST_LEAD_PHONE: phone, TEST_LEAD_EMAIL: email } = process.env
if (!phone || !email) throw new Error('Set TEST_LEAD_PHONE and TEST_LEAD_EMAIL')

const s = await (await fetch(`${base}/api/leads/google-reviews/slots?duration=15&days=7`)).json()
if (!s.ok) throw new Error(`slots: ${JSON.stringify(s)}`)
const all = Object.values(s.slots).flat()
if (!all.length) throw new Error('no open slots in the next 7 days')
const slot = all.at(-1)
console.log('booking slot', slot)

const res = await fetch(`${base}/api/leads/google-reviews`, {
  method: 'POST',
  headers: { 'content-type': 'application/json' },
  body: JSON.stringify({
    name: 'Test Lead',
    phone,
    email,
    business_name: 'UC Test Gym (delete me)',
    gbp_url: 'https://maps.app.goo.gl/test',
    years_in_business: '1-3',
    slot_start: slot,
    duration_min: 15,
    niche: 'jiu-jitsu',
    page_variant: 'e2e-test',
    utm_source: 'test',
    utm_campaign: 'e2e',
    event_id: randomUUID(),
    consent: true,
  }),
})
console.log(res.status, await res.json())
