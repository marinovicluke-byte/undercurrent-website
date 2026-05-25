// lib/articles.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import sharp from 'sharp'
import { CLUSTER_ORDER } from './clusters.js'

const articlesDir = path.join(process.cwd(), 'content', 'articles')
const publicDir = path.join(process.cwd(), 'public')

// Cache image dimensions per file to avoid re-probing across builds.
const dimensionsCache = new Map()
async function probeDimensions(absPath) {
  if (dimensionsCache.has(absPath)) return dimensionsCache.get(absPath)
  try {
    const meta = await sharp(absPath).metadata()
    const dims = { width: meta.width, height: meta.height }
    dimensionsCache.set(absPath, dims)
    return dims
  } catch {
    // File missing or unreadable — fall back to no dims so the build still ships.
    return null
  }
}

// Rewrite ./body-N.jpg (authored relative to the markdown file) to /_next/image so
// body images flow through Next.js image optimization (WebP/AVIF, quality-controlled).
// Also probes the source file at build time and emits width/height attributes on the
// rendered <img> so the browser reserves layout box on first paint (zero CLS).
function resolveRelativeImages(slug) {
  return () => async tree => {
    const nodes = []
    visit(tree, 'image', node => {
      if (typeof node.url === 'string' && node.url.startsWith('./')) {
        nodes.push(node)
      }
    })
    await Promise.all(nodes.map(async node => {
      const relPath = `/articles/${slug}/${node.url.slice(2)}`
      const absPath = path.join(publicDir, relPath)
      const dims = await probeDimensions(absPath)
      const params = new URLSearchParams({ url: relPath, w: '1200', q: '75' })
      node.url = `/_next/image?${params.toString()}`
      if (dims) {
        // hProperties lands on the <img> element via remark-html.
        node.data = node.data || {}
        node.data.hProperties = {
          ...(node.data.hProperties || {}),
          width: dims.width,
          height: dims.height,
          loading: 'lazy',
          decoding: 'async',
        }
      }
    }))
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
    .use(html, { sanitize: false }) // Task 13: allow inline <svg> charts for Article Reviewer data-viz; writer-controlled content only
    .process(content)
  const out = processed.toString()
  // Build-time guard: any body H1 in compiled HTML is a regression of the
  // duplicate-H1 bug — fail loud rather than ship broken SEO.
  if (/<h1[\s>]/i.test(out)) {
    throw new Error(`[articles] body H1 leaked into compiled HTML for ${slug} — fix the markdown source or extend stripLeadingH1.`)
  }
  return { slug, frontmatter: data, html: out }
}
