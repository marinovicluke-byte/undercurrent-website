import { SERVICES } from '@/lib/data/services'
import { SERVICES_V2 } from '@/lib/data/services-v2'
import { LOCATIONS } from '@/lib/data/locations'
import { getAllArticles } from '@/lib/articles'
import { getAllGlossaryTerms } from '@/lib/glossary'

const BASE = 'https://undercurrentautomations.com'

// Slugs that are still rendered for SEO continuity but are not part of the
// primary 4-spoke IA. Listed under "Specific automations" so AI crawlers
// can still find them, just below the spokes.
const SPOKE_SLUGS = new Set(SERVICES_V2.map(s => s.slug))
const HIDDEN_FROM_LLMS_TXT = new Set(['front-end-experience'])

export async function GET() {
  const articles = getAllArticles()
  const glossary = getAllGlossaryTerms()

  const spokeServices = SERVICES_V2
    .map(s => SERVICES.find(x => x.slug === s.slug))
    .filter(Boolean)
  const orphanServices = SERVICES.filter(
    s => !SPOKE_SLUGS.has(s.slug) && !HIDDEN_FROM_LLMS_TXT.has(s.slug),
  )

  const renderService = s =>
    `- [${s.displayName || s.label}](${BASE}/${s.slug}): ${s.metaDescription}`

  const content = `# UnderCurrent Automations

> AI automation for Australian small businesses. We build custom workflows that save 15+ hours a week.

## Research

- [The UnderCurrent Article Reviewer](${BASE}/research/article-reviewer): Open methodology for scoring Australian blog articles on AI search and SEO criteria. Six dimensions, 100-point rubric, live corpus snapshot.

## Services

${spokeServices.map(renderService).join('\n')}

## Specific automations

${orphanServices.map(renderService).join('\n')}

## Locations

${LOCATIONS.map(l => `- [${l.city}, ${l.region}](${BASE}/${l.slug}): ${l.metaDescription}`).join('\n')}

## Glossary

${glossary.map(t => `- [${t.term}](${BASE}/glossary/${t.slug}): ${t.shortDefinition}`).join('\n')}

## Blog

${articles.map(a => `- [${a.title}](${BASE}/blog/${a.slug})`).join('\n')}
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
