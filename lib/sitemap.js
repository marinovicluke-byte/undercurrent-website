// lib/sitemap.js — every indexable URL and its lastmod, for /sitemap.xml (app/sitemap.xml/route.js)
// and the IndexNow ping (scripts/indexnow-ping.mjs). Relative imports only, so the postbuild
// script can load it outside Next. Articles come through the date gate: a scheduled one is
// left out until its day.
import { LOCATIONS } from './data/locations.js'
import { getAllArticles } from './articles.js'
import { getAllGlossaryTerms } from './glossary.js'

const BASE = 'https://undercurrentautomations.com'

// Last substantive content edit to the static pages. Bump by hand when one of
// them actually changes; a build timestamp teaches crawlers to ignore lastmod.
const STATIC_LASTMOD = new Date('2026-09-13')

const newestDate = items =>
  items.length
    ? new Date(Math.max(...items.map(i => +new Date(i.dateModified || i.datePublished || i.date))))
    : STATIC_LASTMOD

export function sitemapEntries(opts) {
  const allArticles = getAllArticles(opts)
  const allGlossary = getAllGlossaryTerms()

  const staticPages = [
    '', '/automation', '/website', '/seo', '/consulting',
    '/about', '/contact',
    '/company-information', '/privacy', '/terms',
  ].map(path => ({ url: `${BASE}${path}`, lastModified: STATIC_LASTMOD }))

  // Index pages change when their newest item does.
  const indexPages = [
    { url: `${BASE}/blog`, lastModified: newestDate(allArticles) },
    { url: `${BASE}/glossary`, lastModified: newestDate(allGlossary) },
  ]

  const locationPages = LOCATIONS.map(l => ({ url: `${BASE}/${l.slug}`, lastModified: STATIC_LASTMOD }))

  const articles = allArticles.map(a => ({ url: `${BASE}/blog/${a.slug}`, lastModified: new Date(a.dateModified || a.date) }))

  const glossaryPages = allGlossary.map(t => ({
    url: `${BASE}/glossary/${t.slug}`,
    lastModified: new Date(t.dateModified || t.datePublished || STATIC_LASTMOD),
  }))

  return [...staticPages, ...indexPages, ...locationPages, ...articles, ...glossaryPages]
}

// the same bytes Next wrote for the old app/sitemap.js metadata route
export function sitemapXml(entries) {
  const urls = entries.map(e => `<url>\n<loc>${e.url}</loc>\n<lastmod>${e.lastModified.toISOString()}</lastmod>\n</url>\n`).join('')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}</urlset>\n`
}
