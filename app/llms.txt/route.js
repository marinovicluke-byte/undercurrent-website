import { SERVICES } from '@/lib/data/services'
import { LOCATIONS } from '@/lib/data/locations'
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://undercurrentautomations.com'

export async function GET() {
  const articles = getAllArticles()

  const content = `# UnderCurrent Automations

> AI automation for Australian small businesses. We build custom workflows that save 15+ hours a week.

## Services

${SERVICES.map(s => `- [${s.label}](${BASE}/${s.slug}): ${s.metaDescription}`).join('\n')}

## Locations

${LOCATIONS.map(l => `- [${l.city}, ${l.region}](${BASE}/${l.slug}): ${l.metaDescription}`).join('\n')}

## Blog

${articles.map(a => `- [${a.title}](${BASE}/blog/${a.slug})`).join('\n')}
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
