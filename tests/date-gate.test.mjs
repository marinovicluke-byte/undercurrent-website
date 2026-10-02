// The date gate: a scheduled article (dated after Melbourne's today) builds its page but stays
// out of every list, feed and sitemap until the day. Run with `npm test` (node --test).
import test from 'node:test'
import assert from 'node:assert/strict'
import { melbourneToday, isLive, getAllArticles } from '../lib/articles.js'
import { sitemapEntries, sitemapXml } from '../lib/sitemap.js'

test('Melbourne today turns over at local midnight, either side of Daylight Saving', () => {
  // DST starts 2am Sunday 4 Oct 2026, so midnight on the 5th is 13:00 UTC on the 4th
  assert.equal(melbourneToday(new Date('2026-10-04T12:59:00Z')), '2026-10-04')
  assert.equal(melbourneToday(new Date('2026-10-04T13:00:00Z')), '2026-10-05')
  // winter, UTC+10
  assert.equal(melbourneToday(new Date('2026-07-01T13:59:00Z')), '2026-07-01')
  assert.equal(melbourneToday(new Date('2026-07-01T14:00:00Z')), '2026-07-02')
})

test('a date goes live on its day, quoted or not', () => {
  assert.equal(isLive({ date: '2026-10-05' }, '2026-10-04'), false)
  assert.equal(isLive({ date: '2026-10-05' }, '2026-10-05'), true)
  assert.equal(isLive({ date: new Date('2026-10-05') }, '2026-10-05'), true)
  assert.equal(isLive({ date: new Date('2026-10-05') }, '2026-10-04'), false)
})

test('the article list leaves out every scheduled article, and scheduled: true keeps them', () => {
  const today = '2026-10-02'
  const all = getAllArticles({ scheduled: true })
  const live = getAllArticles({ today })
  const ahead = all.filter(a => String(a.date) > today)
  assert.ok(ahead.length > 0, 'expected scheduled articles in content/articles')
  assert.equal(live.length + ahead.length, all.length)
  for (const a of live) assert.ok(String(a.date) <= today, `${a.slug} is dated ${a.date}`)
  // and each one joins on its own date, not before
  for (const a of ahead) {
    const d = String(a.date)
    const dayBefore = new Date(Date.parse(d) - 864e5).toISOString().slice(0, 10)
    assert.ok(!getAllArticles({ today: dayBefore }).some(x => x.slug === a.slug), `${a.slug} shows before ${d}`)
    assert.ok(getAllArticles({ today: d }).some(x => x.slug === a.slug), `${a.slug} missing on ${d}`)
  }
})

test('the sitemap, and so the IndexNow ping, names no scheduled article', () => {
  const today = '2026-10-02'
  const ahead = getAllArticles({ scheduled: true }).filter(a => String(a.date) > today)
  const xml = sitemapXml(sitemapEntries({ today }))
  for (const a of ahead) assert.ok(!xml.includes(`/blog/${a.slug}<`), `${a.slug} in the sitemap`)
  assert.ok(xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>\n<urlset'))
})
