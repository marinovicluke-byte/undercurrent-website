import { LOCATIONS } from '@/lib/data/locations'
import { getAllArticles } from '@/lib/articles'
import { getAllGlossaryTerms } from '@/lib/glossary'

const BASE = 'https://undercurrentautomations.com'

const SERVICES = [
  ['AI Automation', '/automation', 'Repetitive work handed to systems. Bookings, follow-ups, reporting, the jobs that eat your week.'],
  ['Website Design', '/website', 'Sites that load fast, read clearly, and turn visitors into enquiries.'],
  ['Google & AI Search', '/seo', 'Being found when people look, on Google and inside AI answers.'],
  ['Consulting', '/consulting', 'A clear plan for what to automate first, what to leave alone, and why.'],
]

export async function GET() {
  const articles = getAllArticles()
  const glossary = getAllGlossaryTerms()

  const content = `# UnderCurrent Automations

> AI automation, digital growth and business consulting for service businesses. Built in Melbourne, working Australia-wide.

## Services

${SERVICES.map(([name, path, desc]) => `- [${name}](${BASE}${path}): ${desc}`).join('\n')}

## Company

- [About](${BASE}/about)
- [Contact](${BASE}/contact)
- [Company information](${BASE}/company-information)

## Locations

${LOCATIONS.map(l => `- [${l.city}, ${l.region}](${BASE}/${l.slug}): ${l.metaDescription}`).join('\n')}

## Glossary

${glossary.map(t => `- [${t.term}](${BASE}/glossary/${t.slug}): ${t.shortDefinition}`).join('\n')}

## Blog

${articles.map(a => `- [${a.title}](${BASE}/blog/${a.slug})`).join('\n')}
`

  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
