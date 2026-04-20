// lib/caseStudies.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const caseStudiesDir = path.join(process.cwd(), 'content', 'case-studies')

// Rewrite ./body-N.jpg → /articles/{slug}-case-study/body-N.jpg so relative
// image paths in the markdown resolve to the correct public/ folder.
function resolveRelativeImages(slug) {
  return () => tree => {
    visit(tree, 'image', node => {
      if (typeof node.url === 'string' && node.url.startsWith('./')) {
        node.url = `/articles/${slug}-case-study/${node.url.slice(2)}`
      }
    })
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
    .use(resolveRelativeImages(slug))
    .use(html)
    .process(content)
  return { slug, frontmatter: data, html: processed.toString() }
}
