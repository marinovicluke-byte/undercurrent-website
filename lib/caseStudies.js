// lib/caseStudies.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'
import sharp from 'sharp'

const caseStudiesDir = path.join(process.cwd(), 'content', 'case-studies')
const publicDir = path.join(process.cwd(), 'public')

// Build-time cache for image dimensions — avoid re-probing across the build pass.
const dimensionsCache = new Map()
async function probeDimensions(absPath) {
  if (dimensionsCache.has(absPath)) return dimensionsCache.get(absPath)
  try {
    const meta = await sharp(absPath).metadata()
    const dims = { width: meta.width, height: meta.height }
    dimensionsCache.set(absPath, dims)
    return dims
  } catch {
    return null
  }
}

// Rewrite ./body-N.jpg → /_next/image?url=/articles/{slug}-case-study/body-N.jpg
// so body images flow through Next.js image optimization (WebP/AVIF, quality-controlled).
// Also probes the source file at build time and emits width/height attrs on the
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
      const relPath = `/articles/${slug}-case-study/${node.url.slice(2)}`
      const absPath = path.join(publicDir, relPath)
      const dims = await probeDimensions(absPath)
      const params = new URLSearchParams({ url: relPath, w: '1200', q: '75' })
      node.url = `/_next/image?${params.toString()}`
      if (dims) {
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
// Strip a leading body H1 so exactly one H1 ships per page (SEO/AIO hygiene).
function stripLeadingH1() {
  return tree => {
    if (tree.children?.[0]?.type === 'heading' && tree.children[0].depth === 1) {
      tree.children.shift()
    }
  }
}

export function getAllCaseStudies() {
  if (!fs.existsSync(caseStudiesDir)) return []
  const files = fs.readdirSync(caseStudiesDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(caseStudiesDir, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getCaseStudyBySlug(slug) {
  const filePath = path.join(caseStudiesDir, `${slug}.md`)
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
  if (/<h1[\s>]/i.test(out)) {
    throw new Error(`[caseStudies] body H1 leaked into compiled HTML for ${slug} — fix the markdown source or extend stripLeadingH1.`)
  }
  return { slug, frontmatter: data, html: out }
}
