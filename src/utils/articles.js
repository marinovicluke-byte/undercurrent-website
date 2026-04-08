import { marked } from 'marked'

// Configure marked to generate heading IDs and handle external links
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = tokens.map(t => t.raw || t.text || '').join('')
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
      const Tag = `h${depth}`
      return `<${Tag} id="${id}">${this.parser.parseInline(tokens)}</${Tag}>\n`
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens)
      const isExternal = href && href.startsWith('http') && !href.includes('undercurrentautomations')
      const attrs = isExternal ? ' target="_blank" rel="noopener noreferrer"' : ''
      const titleAttr = title ? ` title="${title}"` : ''
      return `<a href="${href}"${titleAttr}${attrs}>${text}</a>`
    },
    table({ header, rows }) {
      const headerCells = header.map(cell => `<th>${this.parser.parseInline(cell.tokens)}</th>`).join('')
      const bodyRows = rows.map(row =>
        `<tr>${row.map(cell => `<td>${this.parser.parseInline(cell.tokens)}</td>`).join('')}</tr>`
      ).join('\n')
      return `<div class="table-scroll-wrapper"><table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table></div>\n`
    }
  }
})

function stripHtml(html) {
  return html.replace(/<[^>]+>/g, '').trim()
}

function extractFaqFromHtml(html) {
  const items = []
  const faqMatch = html.match(/<h2[^>]*>[^<]*(?:FAQ|Frequently Asked)[^<]*<\/h2>([\s\S]*?)(?=<h2[^>]*>|$)/i)
  if (!faqMatch) return items

  const section = faqMatch[1]
  const pairs = [...section.matchAll(/<h3[^>]*>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi)]
  for (const match of pairs) {
    items.push({
      question: stripHtml(match[1]),
      answer: stripHtml(match[2]),
    })
  }
  return items
}

function extractHowToSteps(html) {
  const steps = []
  const matches = [...html.matchAll(/<h3[^>]*>\s*(?:Step\s*\d+[:.)\s]*)([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi)]
  for (const match of matches) {
    steps.push({
      name: stripHtml(match[1]),
      text: stripHtml(match[2]),
    })
  }
  return steps
}

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
  const html = marked.parse(_body)
  const faqItems = extractFaqFromHtml(html)
  const howToSteps = extractHowToSteps(html)
  return { ...meta, html, faqItems, howToSteps }
}

export function getArticlesByCluster(cluster) {
  return getAllArticles().filter(a => a.cluster === cluster)
}

export const CLUSTER_LABELS = {
  'leads-sales': 'Leads & Sales',
  'time-admin': 'Time & Admin',
  'getting-started': 'Getting Started',
  'industry-guides': 'Industry Guides',
}
