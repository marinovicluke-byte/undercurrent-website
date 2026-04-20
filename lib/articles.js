// lib/articles.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'
import gfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

// Rewrite ./body-N.jpg (authored relative to the markdown file) to /articles/{slug}/body-N.jpg
// so images resolve correctly when rendered inside /blog/{slug}.
function resolveRelativeImages(slug) {
  return () => tree => {
    visit(tree, 'image', node => {
      if (typeof node.url === 'string' && node.url.startsWith('./')) {
        node.url = `/articles/${slug}/${node.url.slice(2)}`
      }
    })
  }
}

export function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getArticleBySlug(slug) {
  const filePath = path.join(articlesDir, `${slug}.md`)
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
