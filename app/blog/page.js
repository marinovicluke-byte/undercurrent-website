// app/blog/page.js
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { getAllArticles } from '@/lib/articles'

export const metadata = {
  title: 'Blog',
  description: 'Guides, insights, and automation ideas for Australian small businesses.',
}

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <div className="bg-white pt-24 pb-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h1 className="font-display text-5xl font-bold text-charcoal">Blog</h1>
          <p className="mt-4 text-muted max-w-xl">
            Guides and insights for Australian small businesses looking to automate smarter.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 50}>
              <Link
                href={`/blog/${article.slug}`}
                className="block rounded-xl border border-border bg-white p-6 hover:border-blue transition-colors group"
              >
                {article.category && (
                  <p className="text-xs font-body text-blue uppercase tracking-widest">
                    {article.category}
                  </p>
                )}
                <h2 className="mt-3 font-display text-xl font-bold text-charcoal group-hover:text-blue transition-colors line-clamp-2">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="mt-3 text-sm text-muted line-clamp-3">{article.description}</p>
                )}
                {article.date && (
                  <p className="mt-4 text-xs text-muted">
                    {new Date(article.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
