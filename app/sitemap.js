import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import { getAllArticles } from '@/lib/articles'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { CLUSTER_ORDER } from '@/lib/clusters'

const BASE = 'https://undercurrentautomations.com'

export default function sitemap() {
  const staticPages = [
    '', '/about', '/services', '/process', '/contact',
    '/audit',
    '/blog', '/case-studies',
    '/company-information',
    '/privacy', '/terms',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }))

  const locationPages = LOCATIONS.map(l => ({
    url: `${BASE}/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  // Slugs excluded from the sitemap. Pages still render via the [slug] dispatcher
  // for direct visitors, but they're not promoted to search engines.
  // - front-end-experience: 301'd to website-design (see next.config.mjs)
  const SITEMAP_EXCLUDED = new Set(['front-end-experience'])

  const servicePages = SERVICES
    .filter(s => !SITEMAP_EXCLUDED.has(s.slug))
    .map(s => ({
      url: `${BASE}/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))

  // Topic cluster pillar pages — high SEO priority (topical authority hubs)
  const clusterPages = CLUSTER_ORDER.map(slug => ({
    url: `${BASE}/blog/cluster/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articles = getAllArticles().map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.dateModified || a.date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  const caseStudies = getAllCaseStudies().map(c => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: new Date(c.dateModified || c.date),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...locationPages,
    ...servicePages,
    ...clusterPages,
    ...articles,
    ...caseStudies,
  ]
}
