import { LOCATIONS } from '@/lib/data/locations'
import { getAllArticles } from '@/lib/articles'
import { getAllGlossaryTerms } from '@/lib/glossary'

const BASE = 'https://undercurrentautomations.com'

// Last substantive content edit to the static pages. Bump by hand when one of
// them actually changes; a build timestamp teaches crawlers to ignore lastmod.
const STATIC_LASTMOD = new Date('2026-09-13')

const newestDate = items =>
  items.length
    ? new Date(Math.max(...items.map(i => +new Date(i.dateModified || i.datePublished || i.date))))
    : STATIC_LASTMOD

export default function sitemap() {
  const allArticles = getAllArticles()
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
