// app/blog/[slug]/page.js
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import JsonLd from '@/components/ui/JsonLd'
import Breadcrumb from '@/components/layout/Breadcrumb'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      type: 'article',
      publishedTime: article.frontmatter.date,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: 'UnderCurrent Automations',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UnderCurrent Automations',
      url: 'https://undercurrentautomations.com.au',
    },
    url: `https://undercurrentautomations.com.au/blog/${slug}`,
  }

  return (
    <article className="bg-white pt-24 pb-section">
      <JsonLd schema={schema} />
      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Blog', href: '/blog' },
          { label: article.frontmatter.title },
        ]} />

        <header className="mt-8">
          {article.frontmatter.category && (
            <p className="text-sm font-body text-blue uppercase tracking-widest">
              {article.frontmatter.category}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            {article.frontmatter.title}
          </h1>
          {article.frontmatter.date && (
            <p className="mt-4 text-sm text-muted">
              {new Date(article.frontmatter.date).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </header>

        <div
          className="mt-10 prose prose-lg max-w-none prose-headings:font-display prose-headings:text-charcoal prose-p:text-muted prose-a:text-blue"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </div>
    </article>
  )
}
