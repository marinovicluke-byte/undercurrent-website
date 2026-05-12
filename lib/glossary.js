// lib/glossary.js
// Glossary entries — short definitional pages at /glossary/[term].
// Mirrors lib/articles.js (gray-matter front-matter + remark→html body, leading-H1 strip)
// but lighter: no body images, no cluster taxonomy. Entries are categorised, not clustered.
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'

const glossaryDir = path.join(process.cwd(), 'content', 'glossary')

// Display order + labels for the /glossary hub. `key` is what an entry puts in
// its `category:` front-matter field. Add a category here before using it in an entry.
export const GLOSSARY_CATEGORIES = [
  { key: 'discipline', label: 'Disciplines' },
  { key: 'workflow', label: 'Workflows & techniques' },
  { key: 'tool', label: 'Tools & platforms' },
  { key: 'metric', label: 'Metrics' },
  { key: 'regulator', label: 'Regulators & compliance' },
  { key: 'buyer-language', label: 'Buyer language' },
]
const CATEGORY_KEYS = GLOSSARY_CATEGORIES.map(c => c.key)

// Files prefixed with `_` are scaffolding (e.g. _TEMPLATE.md), not live entries.
function entryFiles() {
  if (!fs.existsSync(glossaryDir)) return []
  return fs.readdirSync(glossaryDir).filter(f => f.endsWith('.md') && !f.startsWith('_'))
}

// The body markdown opens with a `# {term}` line; the page template renders the
// front-matter `term` as the page <h1>. Strip the leading H1 so exactly one ships.
function stripLeadingH1() {
  return tree => {
    if (tree.children?.[0]?.type === 'heading' && tree.children[0].depth === 1) {
      tree.children.shift()
    }
  }
}

export function getAllGlossaryTerms() {
  const terms = entryFiles().map(filename => {
    const fileSlug = filename.replace(/\.md$/, '')
    const { data } = matter(fs.readFileSync(path.join(glossaryDir, filename), 'utf8'))
    return { ...data, slug: data.slug || fileSlug, fileSlug }
  })

  // Build-time guards — fail loud so a malformed entry can't silently disappear
  // from /glossary, break a URL, or emit invalid schema.
  const problems = []
  for (const t of terms) {
    if (t.slug !== t.fileSlug) problems.push(`  - ${t.fileSlug}.md → front-matter slug "${t.slug}" must match the filename`)
    if (!CATEGORY_KEYS.includes(t.category)) problems.push(`  - ${t.fileSlug}.md → category "${t.category || '(missing)'}" not in: ${CATEGORY_KEYS.join(', ')}`)
    if (!t.term) problems.push(`  - ${t.fileSlug}.md → missing "term"`)
    if (!t.shortDefinition) problems.push(`  - ${t.fileSlug}.md → missing "shortDefinition"`)
  }
  if (problems.length) {
    throw new Error(`[glossary] ${problems.length} entry problem(s):\n${problems.join('\n')}`)
  }

  return terms.sort((a, b) => (a.term || '').localeCompare(b.term || '', 'en-AU'))
}

export function getGlossaryTermsByCategory() {
  const all = getAllGlossaryTerms()
  return GLOSSARY_CATEGORIES
    .map(c => ({ ...c, terms: all.filter(t => t.category === c.key) }))
    .filter(c => c.terms.length > 0)
}

export async function getGlossaryTermBySlug(slug) {
  if (!slug || slug.startsWith('_')) return null
  const filePath = path.join(glossaryDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'))
  const processed = await remark().use(gfm).use(stripLeadingH1).use(html).process(content)
  const out = processed.toString()
  // Mirrors the articles.js guard: a body H1 in compiled HTML duplicates the page
  // H1 and confuses crawlers/AI engines about the topic. Fail loud.
  if (/<h1[\s>]/i.test(out)) {
    throw new Error(`[glossary] body H1 leaked into compiled HTML for ${slug} — remove the second H1 from the markdown source.`)
  }
  return { slug, frontmatter: data, html: out }
}
