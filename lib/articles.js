// lib/articles.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import { CLUSTER_ORDER } from './clusters.js'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

// Rewrite ./body-N.jpg (authored relative to the markdown file) to /_next/image so
// body images flow through Next.js image optimization (WebP/AVIF, quality-controlled)
// instead of being served as raw multi-hundred-KB JPGs via a plain <img> tag.
function resolveRelativeImages(slug) {
  return () => tree => {
    visit(tree, 'image', node => {
      if (typeof node.url === 'string' && node.url.startsWith('./')) {
        const src = `/articles/${slug}/${node.url.slice(2)}`
        const params = new URLSearchParams({ url: src, w: '1200', q: '75' })
        node.url = `/_next/image?${params.toString()}`
      }
    })
  }
}

// The page template already renders frontmatter `title` as the page <h1>.
// Markdown bodies start with a `# Heading` line that would compile to a second
// <h1> in the source HTML — duplicate H1s confuse SEO crawlers and AI search
// engines about the page topic. Strip the leading H1 from the AST so exactly
// one H1 ships per page.
function stripLeadingH1() {
  return tree => {
    if (tree.children?.[0]?.type === 'heading' && tree.children[0].depth === 1) {
      tree.children.shift()
    }
  }
}

export function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  const articles = files.map(filename => {
    const slug = filename.replace(/\.md$/, '')
    const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
    const { data } = matter(raw)
    return { slug, ...data }
  })

  // Zero-orphan guard: every article must have a cluster that exists in CLUSTER_ORDER.
  // Fails the build loudly so a mis-tagged frontmatter can never silently disappear from /blog.
  const orphans = articles.filter(a => !CLUSTER_ORDER.includes(a.cluster))
  if (orphans.length > 0) {
    const detail = orphans
      .map(a => `  - ${a.slug}.md → cluster: "${a.cluster || '(missing)'}"`)
      .join('\n')
    throw new Error(
      `[clusters] ${orphans.length} article(s) have an invalid cluster. Valid clusters: ${CLUSTER_ORDER.join(', ')}.\n${detail}`
    )
  }

  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getArticleBySlug(slug) {
  const filePath = path.join(articlesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark()
    .use(gfm)
    .use(stripLeadingH1)
    .use(resolveRelativeImages(slug))
    .use(html)
    .process(content)
  const out = processed.toString()
  // Build-time guard: any body H1 in compiled HTML is a regression of the
  // duplicate-H1 bug — fail loud rather than ship broken SEO.
  if (/<h1[\s>]/i.test(out)) {
    throw new Error(`[articles] body H1 leaked into compiled HTML for ${slug} — fix the markdown source or extend stripLeadingH1.`)
  }
  return { slug, frontmatter: data, html: out }
}
