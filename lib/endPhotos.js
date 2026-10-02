// lib/endPhotos.js — the photo from the rotation, set inside the article body at the h2 nearest
// its middle (photoSpot, below). It rotates through POOL, never the author photo (/assets/luke-800.jpg, the steel-desk
// arms-folded set, kept out of the pool with its look-alikes), never a photo the article
// already shows (its hero or a body photo), and never the photo of a neighbour on /blog or
// an article in its Read next. On the page itself look-alike frames count as one (FAMILIES).
// Deterministic: articles are dealt oldest first, each starting at a hash of its slug, so a
// page keeps its photo from build to build and a new article takes its pick last.
// Front-matter `endPhoto: false` leaves the article without one; `endPhoto: <library path>` pins one.
// The name is from when it sat at the foot; kept so 68 files don't change.
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

let dealt = null

// all: getAllArticles(), newest first, the /blog order
export function endPhotoOf(slug, all) {
  if (!dealt) {
    dealt = new Map()
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

// ---------- where the photo goes: inside the body, at the h2 nearest the middle by length, so it
// breaks the reading up (Luke, 2026-10-02: "photos shoudl be in the middle of an article to break
// things up where it makes sense"). It sits at the end of the block before that h2, so it is never
// inside a list, table, step block, worked sum, pair, callout or the FAQ, and the rail's anchors
// don't move. A boundary is skipped when an image, chart or the calculator ends the block before
// it or opens the one after it, and only boundaries between a quarter and three quarters of the
// way down count. No photo when the body has fewer than three h2s, when it already carries an
// image or chart near the middle, or when no boundary passes.
const MEDIA = /<svg\b|<img\b|<figure\b|<!-- calc:/
const SPAN = [0.25, 0.75]
const NEAR = [0.35, 0.65]
const len = s => s.replace(/<svg[\s\S]*?<\/svg>/g, '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').length

// the top-level elements of a block's html, first and last (remark's html is never indented)
const els = html => html.trim().split(/\n(?=<(?:p|h3|h4|ul|ol|table|blockquote|pre|figure|div|svg|hr|img|!--)\b)/)
const firstEl = html => els(html)[0]
const lastEl = html => els(html).at(-1)

// intro and blocks from splitBlocks (lib/articleBody.js), the FAQ already off. Returns
// { at: index of the block the photo closes, before: the next h2 } or { skip: why }
export function photoSpot(intro, blocks) {
  if (blocks.length < 3) return { skip: `short (${blocks.length} h2)` }
  const parts = [intro, ...blocks.map(b => `<h2>${b.title}</h2>\n${b.html}`)]
  const lens = parts.map(len), total = lens.reduce((a, b) => a + b, 0)
  // where each element of media starts, as a share of the body
  let run = 0
  for (const p of parts) {
    for (const m of p.matchAll(new RegExp(MEDIA.source, 'g'))) {
      const at = (run + len(p.slice(0, m.index))) / total
      if (at >= NEAR[0] && at <= NEAR[1]) return { skip: `media near the middle (${Math.round(at * 100)}%)` }
    }
    run += len(p)
  }
  // boundary k sits before blocks[k]; the photo closes the part before it (the intro when k is 0)
  const spots = blocks.map((b, k) => ({ k, at: lens.slice(0, k + 1).reduce((a, c) => a + c, 0) / total }))
    .filter(s => s.at >= SPAN[0] && s.at <= SPAN[1])
    .sort((a, b) => Math.abs(a.at - 0.5) - Math.abs(b.at - 0.5) || a.k - b.k)
  const ok = spots.find(({ k }) => !MEDIA.test(lastEl(k ? blocks[k - 1].html : intro)) && !MEDIA.test(firstEl(blocks[k].html)))
  if (!ok) return { skip: spots.length ? 'every middle h2 is next to an image or chart' : 'no h2 near the middle' }
  return { at: ok.k - 1, before: blocks[ok.k].toc, share: Math.round(ok.at * 100) }
}
