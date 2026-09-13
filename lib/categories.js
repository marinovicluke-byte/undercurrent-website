// lib/categories.js — the blog's five categories from the sandbox (one colour
// each, `c-<key>` in the stylesheets) and how the live clusters fold into them.
// Front-matter keeps its `cluster`; the mapping lives here only.
export const CATEGORIES = {
  seo: { key: 'seo', label: 'Google & AI Search', clusters: ['seo-ai-visibility'] },
  auto: { key: 'auto', label: 'AI Automation', clusters: ['foundations', 'lead-generation', 'revenue-operations', 'custom-integrations'] },
  web: { key: 'web', label: 'Website & UI', clusters: ['website-experience-design'] },
  strat: { key: 'strat', label: 'AI Strategy & Training', clusters: ['ai-strategy-training'] },
  growth: { key: 'growth', label: 'Business Growth Consulting', clusters: ['industry-guides'] },
}
export const CATEGORY_ORDER = ['seo', 'auto', 'web', 'strat', 'growth']

const byCluster = Object.fromEntries(
  Object.values(CATEGORIES).flatMap(c => c.clusters.map(k => [k, c.key]))
)

export function categoryOf(cluster) {
  return CATEGORIES[byCluster[cluster] || 'auto']
}

// the closing band's question, one a category
export const CLOSE_LINES = {
  seo: 'Where does your business stand in AI search today?',
  auto: 'What would you hand to a system first?',
  web: 'What is your website costing you in enquiries?',
  strat: 'Where would AI give your team an hour a day back?',
  growth: 'Which job in your business is worth fixing first?',
}

export const fmtDate = d => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
export const fmtDateLong = d => new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
export const isoDate = d => new Date(d).toISOString().slice(0, 10)

// the old service slugs the glossary front-matter still points at, onto the four pages
const SERVICE_ROUTES = {
  '/seo-ai-visibility': ['/seo', 'Google & AI Search'],
  '/website-design': ['/website', 'Website Design'],
  '/front-end-experience': ['/website', 'Website Design'],
  '/ai-strategy-training': ['/consulting', 'Consulting'],
}
export function serviceRoute(oldPath) {
  return SERVICE_ROUTES[oldPath] || ['/automation', 'Automation']
}
