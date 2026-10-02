// lib/endPhotos.js — the photo at the foot of an article, above the "Hey, I'm Luke" card.
// It rotates through POOL, never the author photo (/assets/luke-800.jpg, the steel-desk
// arms-folded set, kept out of the pool with its look-alikes), never a photo the article
// already shows (its hero or a body photo), and never the photo of a neighbour on /blog or
// an article in its Read next. On the page itself look-alike frames count as one (FAMILIES).
// Deterministic: articles are dealt oldest first, each starting at a hash of its slug, so a
// page keeps its photo from build to build and a new article takes its pick last.
// Front-matter `endPhoto: false` leaves the slot empty; `endPhoto: <library path>` pins one.
import fs from 'node:fs'
import path from 'node:path'
import { categoryOf } from './categories.js'
import { photoOf } from './photos.js'

const LIB = '/images/luke-2026/luke-marinovic-undercurrent-'
// frames shot on one set in one pose read as the same photo, so they go as a family: a page
// never shows two of a family
const FAMILIES = [
  ['on-phone-at-desk', 'on-phone-seated-side-on'],
  ['at-desk-hands-clasped', 'at-desk-arms-folded'],
  ['walking-to-desk'],
  ['over-shoulder-laptop-photo-grid', 'over-shoulder-typing-website', 'over-shoulder-search-console'],
  ['hands-on-laptop-website', 'hands-on-laptop-analytics'],
  ['over-shoulder-laptop-code'],
  ['walking-laptop-under-arm'],
  ['seated-legs-crossed', 'seated-leaning-forward'],
  ['white-shirt-light-beam'],
  ['laptop-lounge-chair-feet-up', 'laptop-lounge-chair', 'laptop-on-lap'],
  ['steel-desk-typing-wide', 'steel-desk-typing', 'standing-at-laptop'],
  ['sling-chair-thinking', 'sling-chair-relaxed'],
].map(f => f.map(k => `${LIB}${k}-melbourne.jpg`))
const POOL = FAMILIES.flat()
const FAMILY = new Map(FAMILIES.flatMap((f, i) => f.map(p => [p, i])))
const fam = p => FAMILY.get(p) ?? p

// Read next on an article: its own category first, then the rest, newest first, three
export function relatedTo(slug, all) {
  const key = categoryOf(all.find(a => a.slug === slug)?.cluster).key
  return [
    ...all.filter(a => a.slug !== slug && categoryOf(a.cluster).key === key),
    ...all.filter(a => a.slug !== slug && categoryOf(a.cluster).key !== key),
  ].slice(0, 3)
}

function hash(s) {
  let h = 2166136261
  for (const c of s) h = Math.imul(h ^ c.codePointAt(0), 16777619) >>> 0
  return h
}

let dealt = null, dealtFor = ''

// all: getAllArticles(), newest first, the /blog order (a scheduled article's page passes its
// own list, so the deal is kept per list)
export function endPhotoOf(slug, all) {
  const key = all.map(a => a.slug).join()
  if (!dealt || dealtFor !== key) {
    dealt = new Map()
    dealtFor = key
    const dir = path.join(process.cwd(), 'content', 'articles')
    const near = new Map(all.map((a, i) => [a.slug, new Set([
      all[i - 1]?.slug, all[i + 1]?.slug, ...relatedTo(a.slug, all).map(r => r.slug),
    ].filter(Boolean))]))
    const order = [...all].sort((a, b) => new Date(a.date) - new Date(b.date) || a.slug.localeCompare(b.slug))
    for (const a of order) {
      if (a.endPhoto === false) { dealt.set(a.slug, null); continue }
      if (typeof a.endPhoto === 'string') { dealt.set(a.slug, photoOf(a.endPhoto)); continue }
      const shown = fs.readFileSync(path.join(dir, `${a.slug}.md`), 'utf8').match(/\/images\/luke-2026\/[\w-]+\.jpg/g) || []
      const nearby = [...dealt].filter(([s, p]) => p && (near.get(a.slug).has(s) || near.get(s).has(a.slug))).map(([, p]) => p.path)
      const barred = new Set(shown.map(fam))
      const start = hash(a.slug) % POOL.length
      const pick = POOL.map((_, i) => POOL[(start + i) % POOL.length]).find(p => !barred.has(fam(p)) && !nearby.includes(p))
      dealt.set(a.slug, pick ? photoOf(pick) : null)
    }
  }
  return dealt.get(slug) || null
}
