import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import { getAllArticles } from '@/lib/articles'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { getAllGlossaryTerms } from '@/lib/glossary'
import { CLUSTER_ORDER } from '@/lib/clusters'

const BASE = 'https://undercurrentautomations.com'

// Last substantive content edit to the static, location and service pages.
// Bump manually when one of those pages actually changes. Using the build
// timestamp made every deploy claim every page changed, which teaches
// crawlers to ignore our lastmod.
const STATIC_LASTMOD = new Date('2026-06-10')

const newestDate = items =>
  items.length
    ? new Date(Math.max(...items.map(i => +new Date(i.dateModified || i.datePublished || i.date))))
    : STATIC_LASTMOD

export default function sitemap() {
  const allArticles = getAllArticles()
  const allCaseStudies = getAllCaseStudies()
  const allGlossary = getAllGlossaryTerms()

  const staticPages = [
    '', '/about', '/services', '/process', '/contact',
    '/audit',
    '/company-information',
    '/privacy', '/terms',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: STATIC_LASTMOD,
  }))

  // Index pages change when their newest item does.
  const indexPages = [
    { url: `${BASE}/blog`, lastModified: newestDate(allArticles) },
    { url: `${BASE}/case-studies`, lastModified: newestDate(allCaseStudies) },
    { url: `${BASE}/glossary`, lastModified: newestDate(allGlossary) },
  ]

  const locationPages = LOCATIONS.map(l => ({
    url: `${BASE}/${l.slug}`,
    lastModified: STATIC_LASTMOD,
  }))

  // Slugs excluded from the sitemap. Pages still render via the [slug] dispatcher
  // for direct visitors, but they're not promoted to search engines.
  // - front-end-experience: 301'd to website-design (see next.config.mjs)
  const SITEMAP_EXCLUDED = new Set(['front-end-experience'])

  const servicePages = SERVICES
    .filter(s => !SITEMAP_EXCLUDED.has(s.slug))
    .map(s => ({
      url: `${BASE}/${s.slug}`,
      lastModified: STATIC_LASTMOD,
    }))

  // Topic cluster pillar pages — change when their newest article does.
  const clusterPages = CLUSTER_ORDER.map(slug => ({
    url: `${BASE}/blog/cluster/${slug}`,
    lastModified: newestDate(allArticles.filter(a => a.cluster === slug)),
  }))

  const articles = allArticles.map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.dateModified || a.date),
  }))

  const caseStudies = allCaseStudies.map(c => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: new Date(c.dateModified || c.date),
  }))

  const glossaryPages = allGlossary.map(t => ({
    url: `${BASE}/glossary/${t.slug}`,
    lastModified: new Date(t.dateModified || t.datePublished || STATIC_LASTMOD),
  }))

  return [
    ...staticPages,
    ...indexPages,
    ...locationPages,
    ...servicePages,
    ...clusterPages,
    ...articles,
    ...caseStudies,
    ...glossaryPages,
  ]
}
