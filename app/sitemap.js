import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://undercurrentautomations.com.au'

export default function sitemap() {
  const staticPages = [
    '', '/about', '/services', '/process', '/contact',
    '/audit', '/roi', '/missed-revenue', '/blog',
    '/case-study', '/privacy', '/terms',
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

  const servicePages = SERVICES.map(s => ({
    url: `${BASE}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articles = getAllArticles().map(a => ({
    url: `${BASE}/blog/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...locationPages, ...servicePages, ...articles]
}
