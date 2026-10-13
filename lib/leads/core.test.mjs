// Run: node --test lib/leads/core.test.mjs
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { toE164AU, isGbpUrl, googleReviewsLeadSchema } from './core.js'

test('toE164AU', () => {
  assert.equal(toE164AU('0412 345 678'), '+61412345678')
  assert.equal(toE164AU('+61 412 345 678'), '+61412345678')
  assert.equal(toE164AU('61412345678'), '+61412345678')
  assert.equal(toE164AU('(03) 9123 4567'), '+61391234567')
  assert.equal(toE164AU('+1 415 555 0100'), null)
  assert.equal(toE164AU('12345'), null)
})

test('isGbpUrl', () => {
  assert.ok(isGbpUrl('https://maps.app.goo.gl/abc123'))
  assert.ok(isGbpUrl('https://www.google.com/maps/place/Foo'))
  assert.ok(isGbpUrl('g.page/r/abc'))
  assert.ok(isGbpUrl('https://share.google/xyz'))
  assert.ok(!isGbpUrl('https://evil.example/google.com'))
  assert.ok(!isGbpUrl('not a url at all'))
})

const valid = {
  name: 'Sam Lee',
  phone: '0412 345 678',
  email: 'sam@example.com',
  business_name: 'Lee BJJ',
  website: '',
  gbp_url: 'https://maps.app.goo.gl/abc',
  years_in_business: '3-10',
  slot_start: '2026-10-15T14:30:00+11:00',
  duration_min: 15,
  niche: 'jiu-jitsu',
  event_id: '6f1c2a4e-8b1d-4c3e-9a7f-2d5e6b7c8a90',
  consent: true,
}

test('schema accepts the contract and treats empty website as missing', () => {
  const r = googleReviewsLeadSchema.safeParse(valid)
  assert.ok(r.success, JSON.stringify(r.error?.flatten()))
  assert.equal(r.data.website, undefined)
})

test('schema rejects bad duration, missing consent, unknown niche, slot without offset', () => {
  for (const patch of [{ duration_min: 45 }, { consent: false }, { niche: 'plumbers' }, { slot_start: '2026-10-15T14:30:00' }]) {
    assert.ok(!googleReviewsLeadSchema.safeParse({ ...valid, ...patch }).success, JSON.stringify(patch))
  }
})
