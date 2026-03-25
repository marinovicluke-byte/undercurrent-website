import { marked } from 'marked'

// Configure marked to generate heading IDs for deep linking
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = tokens.map(t => t.raw || t.text || '').join('')
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
      const Tag = `h${depth}`
      return `<${Tag} id="${id}">${this.parser.parseInline(tokens)}</${Tag}>\n`
    }
  }
})

// Load all .md files as raw strings at build time
const articleFiles = import.meta.glob('../content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null

  const frontmatter = {}
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    // Parse numbers
    if (/^\d+$/.test(val)) val = Number(val)
    frontmatter[key] = val
  })

  return { frontmatter, body: match[2] }
}

// Parse all articles once on import
const articles = Object.entries(articleFiles)
  .map(([path, raw]) => {
    const parsed = parseFrontmatter(raw)
    if (!parsed) return null
    return { ...parsed.frontmatter, _body: parsed.body }
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getAllArticles() {
  return articles.map(({ _body, ...meta }) => meta)
}

export function getArticleBySlug(slug) {
  const article = articles.find(a => a.slug === slug)
  if (!article) return null
  const { _body, ...meta } = article
  return { ...meta, html: marked.parse(_body) }
}

export function getArticlesByCluster(cluster) {
  return getAllArticles().filter(a => a.cluster === cluster)
}

export const CLUSTER_LABELS = {
  automation: 'Automation',
  ai: 'AI for Business',
  growth: 'Business Growth',
}
