// app/glossary/[term]/page.js — Glossary entry. DefinedTerm + BreadcrumbList +
// a light Article node (author/dates only — the AI-search freshness signal) +
// optional FAQPage. Mirrors /blog/[slug] structure minus blog cruft: no hero image
// rig, no reading-time, no related-posts carousel. Body markdown is styled with the
// same `.article-prose` block the blog uses (copied locally — extracting it to
// globals.css is a separate refactor, not in scope here).
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/ui/JsonLd'
import AuthorBio from '@/components/ui/AuthorBio'
import { getAllGlossaryTerms, getGlossaryTermBySlug } from '@/lib/glossary'

const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280
const TEXT_MAX = 760

export const dynamicParams = false

export function generateStaticParams() {
  return getAllGlossaryTerms().map(t => ({ term: t.slug }))
}

export async function generateMetadata({ params }) {
  const { term } = await params
  const entry = await getGlossaryTermBySlug(term)
  if (!entry) return {}
  const fm = entry.frontmatter
  return {
    title: `${fm.term} — Glossary`,
    description: fm.shortDefinition,
    alternates: { canonical: `${SITE_URL}/glossary/${entry.slug}` },
    openGraph: {
      title: `${fm.term} — UnderCurrent Glossary`,
      description: fm.shortDefinition,
      type: 'article',
      url: `${SITE_URL}/glossary/${entry.slug}`,
      publishedTime: fm.datePublished,
      modifiedTime: fm.dateModified || fm.datePublished,
      authors: [fm.author || 'Luke Marinovic'],
      images: [{ url: `${SITE_URL}/brand/og-card.png`, width: 1200, height: 630, alt: fm.term }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${fm.term} — UnderCurrent Glossary`,
      description: fm.shortDefinition,
      images: [`${SITE_URL}/brand/og-card.png`],
    },
  }
}

function formatDate(d) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

function faqList(fm) {
  if (!Array.isArray(fm?.faqs)) return []
  return fm.faqs
    .map(f => ({ question: (f.q || f.question || '').trim(), answer: (f.a || f.answer || '').trim() }))
    .filter(f => f.question && f.answer)
}

function serviceLabel(href) {
  return href.replace(/^\//, '').split('/').pop().replace(/-/g, ' ')
}

export default async function GlossaryEntryPage({ params }) {
  const { term } = await params
  const entry = await getGlossaryTermBySlug(term)
  if (!entry) notFound()

  const fm = entry.frontmatter
  const url = `${SITE_URL}/glossary/${entry.slug}`
  const faqs = faqList(fm)
  const allTerms = getAllGlossaryTerms()
  const relatedTerms = (fm.relatedTerms || [])
    .map(slug => allTerms.find(t => t.slug === slug))
    .filter(Boolean)
  const relatedServices = Array.isArray(fm.relatedServices) ? fm.relatedServices : []
  const sources = Array.isArray(fm.sources) ? fm.sources.filter(s => s && s.url) : []

  const definedTerm = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: fm.term,
    description: fm.shortDefinition,
    url,
    inDefinedTermSet: `${SITE_URL}/glossary`,
  }
  // Light Article node — carries author + publish/modified dates for AI-search
  // freshness signals. Deliberately minimal; the page is a definition, not a post.
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.term,
    description: fm.shortDefinition,
    url,
    mainEntityOfPage: url,
    inLanguage: 'en-AU',
    datePublished: fm.datePublished,
    dateModified: fm.dateModified || fm.datePublished,
    articleSection: 'Glossary',
    author: { '@id': `${SITE_URL}/about#luke` },
    publisher: { '@id': `${SITE_URL}#organization` },
    isPartOf: { '@id': `${SITE_URL}#website` },
  }
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Glossary', item: `${SITE_URL}/glossary` },
      { '@type': 'ListItem', position: 3, name: fm.term, item: url },
    ],
  }
  const faqSchema = faqs.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
  } : null

  return (
    <>
      <JsonLd schema={definedTerm} />
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumb} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      {/* Hero */}
      <header style={{ padding: '120px var(--page-pad) 48px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <p style={{ margin: '0 0 14px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
            Glossary{fm.category ? ` · ${String(fm.category).replace(/-/g, ' ')}` : ''}
          </p>
          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(34px, 4.6vw, 64px)', lineHeight: 1.06, letterSpacing: '-0.03em', color: 'var(--off-white)', textWrap: 'balance' }}>
            {fm.term}
          </h1>
          <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--text-faint)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>
              Written by <strong style={{ color: 'var(--off-white)' }}>{fm.author || 'Luke Marinovic'}</strong>, Founder of UnderCurrent Automations · Melbourne
            </p>
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
              {fm.datePublished && `Published ${formatDate(fm.datePublished)}`}
              {fm.dateModified && fm.dateModified !== fm.datePublished && ` · Updated ${formatDate(fm.dateModified)}`}
            </p>
          </div>
        </div>
      </header>

      {/* Body */}
      <article style={{ padding: '48px var(--page-pad) 64px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ maxWidth: TEXT_MAX }}>
            {fm.complianceNote && (
              <p style={{ margin: '0 0 28px', padding: '14px 18px', borderRadius: 10, background: 'rgba(106,141,173,0.08)', border: '1px solid rgba(106,141,173,0.3)', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                <strong style={{ color: 'var(--blue-light)' }}>Compliance note: </strong>{fm.complianceNote}
              </p>
            )}
            <div className="article-prose" dangerouslySetInnerHTML={{ __html: entry.html }} />
          </div>
        </div>
      </article>

      {/* FAQ — rendered visibly so the FAQPage schema matches on-page content */}
      {faqs.length > 0 && (
        <section style={{ padding: '0 var(--page-pad) 56px', background: 'var(--charcoal)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ maxWidth: TEXT_MAX, paddingTop: 24, borderTop: '1px solid var(--text-faint)' }}>
              <h2 style={{ margin: '0 0 22px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(20px, 2.2vw, 26px)', letterSpacing: '-0.02em', color: 'var(--off-white)' }}>
                Frequently asked questions
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                {faqs.map((f, i) => (
                  <div key={i}>
                    <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, lineHeight: 1.3, letterSpacing: '-0.01em', color: 'var(--off-white)' }}>{f.question}</h3>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>{f.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sources */}
      {sources.length > 0 && (
        <section style={{ padding: '0 var(--page-pad) 48px', background: 'var(--charcoal)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ maxWidth: TEXT_MAX, paddingTop: 24, borderTop: '1px solid var(--text-faint)' }}>
              <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Sources</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {sources.map((s, i) => (
                  <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.5 }}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)' }} className="hover:text-blue transition-colors">
                      {s.title || s.url}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Related */}
      {(relatedTerms.length > 0 || relatedServices.length > 0) && (
        <section style={{ padding: '0 var(--page-pad) 72px', background: 'var(--charcoal)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ maxWidth: TEXT_MAX, paddingTop: 24, borderTop: '1px solid var(--text-faint)' }}>
              <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>Related</p>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {relatedTerms.map(t => (
                  <li key={t.slug} style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}>
                    <Link href={`/glossary/${t.slug}`} style={{ color: 'var(--text-secondary)' }} className="hover:text-blue transition-colors">{t.term}</Link>
                  </li>
                ))}
                {relatedServices.map(href => (
                  <li key={href} style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}>
                    <Link href={href} style={{ color: 'var(--text-secondary)' }} className="hover:text-blue transition-colors">UC service: {serviceLabel(href)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Author bio */}
      <section style={{ padding: '0 var(--page-pad) 96px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <AuthorBio />
        </div>
      </section>

      <style>{`
        .article-prose h2 { font-family: var(--font-display); font-weight: 500; color: var(--off-white); font-size: clamp(22px, 2.4vw, 30px); letter-spacing: -0.025em; margin-top: 3rem; margin-bottom: 1rem; line-height: 1.15; }
        .article-prose h3 { font-family: var(--font-display); font-weight: 500; color: var(--off-white); font-size: 18px; letter-spacing: -0.015em; margin-top: 2rem; margin-bottom: 0.75rem; line-height: 1.3; }
        .article-prose p { color: var(--text-secondary); font-family: var(--font-body); font-size: 17px; line-height: 1.65; margin-bottom: 1.25rem; }
        .article-prose ul, .article-prose ol { color: var(--text-secondary); font-family: var(--font-body); font-size: 17px; line-height: 1.65; padding-left: 1.5rem; margin-bottom: 1.25rem; }
        .article-prose li { margin-bottom: 0.5rem; }
        .article-prose a { color: var(--blue); text-decoration: underline; text-decoration-color: rgba(106,141,173,0.4); text-underline-offset: 3px; }
        .article-prose a:hover { text-decoration-color: var(--blue); }
        .article-prose strong { color: var(--off-white); font-weight: 600; }
        .article-prose blockquote { border-left: 3px solid var(--blue); padding: 1rem 1.25rem; margin: 1.5rem 0; background: rgba(106,141,173,0.05); border-radius: 0 12px 12px 0; }
        .article-prose blockquote p { color: var(--text-primary); margin: 0; }
        .article-prose table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 1.5rem 0; font-size: 14px; border-radius: 12px; overflow: hidden; border: 1px solid var(--text-faint); background: rgba(255,255,255,0.015); }
        @media (max-width: 700px) { .article-prose table { display: block; overflow-x: auto; max-width: 100%; -webkit-overflow-scrolling: touch; } }
        .article-prose th, .article-prose td { padding: 0.85rem 1rem; text-align: left; color: var(--text-secondary); font-family: var(--font-body); border-bottom: 1px solid rgba(250,249,245,0.08); }
        .article-prose tr:last-child td { border-bottom: none; }
        .article-prose tbody tr:nth-child(even) td { background: rgba(255,255,255,0.018); }
        .article-prose tbody tr:hover td { background: rgba(106,141,173,0.06); }
        .article-prose th { background: rgba(250,249,245,0.04); color: var(--off-white); font-family: var(--font-display); font-weight: 500; font-size: 12px; letter-spacing: 0.05em; text-transform: uppercase; border-bottom: 1px solid var(--text-faint); }
      `}</style>
    </>
  )
}
