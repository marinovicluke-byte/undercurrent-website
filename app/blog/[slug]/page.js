// app/blog/[slug]/page.js — Blog article detail.
// Full Article + FAQPage + Person + BreadcrumbList JSON-LD per wiki.
// Mirrors /case-studies/[slug] design: Hero → image → Quick Answer → body (with tables) → related → CTA.
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/ui/JsonLd'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { CLUSTERS } from '@/lib/clusters'

const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280
const TEXT_MAX = 880
const HERO_IMG_MAX = 1000

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  const fm = article.frontmatter
  const image = fm.heroImage ? `${SITE_URL}${fm.heroImage}` : undefined

  return {
    title: fm.title,
    description: fm.description || fm.summary,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: fm.title,
      description: fm.description || fm.summary,
      type: 'article',
      publishedTime: fm.date,
      modifiedTime: fm.dateModified || fm.date,
      url: `${SITE_URL}/blog/${slug}`,
      authors: [fm.author || 'Luke Marinovic'],
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: fm.title,
      description: fm.description || fm.summary,
      images: image ? [image] : undefined,
    },
  }
}

function formatDate(d) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

// Prefer structured frontmatter faqs over HTML regex extraction.
// Frontmatter shape: `faqs: [{ q: '...', a: '...' }, ...]` — direct and reliable.
// Regex fallback is kept for existing articles that haven't migrated yet;
// new articles should always use frontmatter so FAQPage schema matches
// visible content one-to-one (framework rule).
function extractFaqs(frontmatter, html) {
  if (Array.isArray(frontmatter?.faqs) && frontmatter.faqs.length > 0) {
    return frontmatter.faqs
      .map(f => ({
        question: (f.q || f.question || '').trim(),
        answer: (f.a || f.answer || '').trim(),
      }))
      .filter(f => f.question && f.answer)
  }
  const faqStart = html.indexOf('Frequently Asked Questions')
  if (faqStart < 0) return []
  const faqSection = html.slice(faqStart)
  const faqs = []
  const regex = /<h3[^>]*>(.*?)<\/h3>\s*<p[^>]*>(.*?)<\/p>/gis
  let match
  while ((match = regex.exec(faqSection)) !== null) {
    const question = match[1].replace(/<[^>]+>/g, '').trim()
    const answer = match[2].replace(/<[^>]+>/g, '').trim()
    if (question && answer) faqs.push({ question, answer })
  }
  return faqs
}

function extractQuickAnswer(html) {
  const regex = /<blockquote>\s*<p>\s*<strong>\s*Quick Answer:?\s*<\/strong>\s*([\s\S]*?)<\/p>\s*<\/blockquote>/i
  const match = html.match(regex)
  if (!match) return { quickAnswer: null, bodyHtml: html }
  return { quickAnswer: match[1].trim(), bodyHtml: html.replace(match[0], '') }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return notFound()

  const fm = article.frontmatter
  const faqs = extractFaqs(fm, article.html)
  const { quickAnswer, bodyHtml } = extractQuickAnswer(article.html)
  const clusterLabel = fm.cluster && CLUSTERS[fm.cluster]?.label
  const clusterSlug = fm.cluster

  // Related: 3 other articles from same cluster (excluding this one)
  const related = clusterSlug
    ? getAllArticles()
        .filter(a => a.cluster === clusterSlug && a.slug !== slug)
        .slice(0, 3)
    : []

  // Related case studies from same cluster
  const relatedCaseStudies = clusterSlug
    ? getAllCaseStudies().filter(c => c.relatedCluster === clusterSlug).slice(0, 2)
    : []

  // about: primary semantic entities the article covers. Auto-fall-back to
  // cluster + Australia as Place so every post emits coverage signals; writer
  // can override or extend via `about:` frontmatter array of {name, type?}.
  // mentions: secondary entities (tools, frameworks). Optional, frontmatter only.
  const aboutEntities = (Array.isArray(fm.about) && fm.about.length > 0)
    ? fm.about.map(e => ({ '@type': e.type || 'Thing', name: e.name || e }))
    : [
        ...(clusterLabel ? [{ '@type': 'Thing', name: clusterLabel }] : []),
        { '@type': 'Place', name: 'Australia' },
      ]
  const mentionEntities = Array.isArray(fm.mentions) && fm.mentions.length > 0
    ? fm.mentions.map(e => ({ '@type': e.type || 'Thing', name: e.name || e }))
    : null

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fm.title,
    description: fm.description || fm.summary,
    datePublished: fm.date,
    dateModified: fm.dateModified || fm.date,
    author: {
      '@type': 'Person',
      name: fm.author || 'Luke Marinovic',
      jobTitle: fm.authorTitle || 'Founder, UnderCurrent Automations',
      url: `${SITE_URL}/about`,
      sameAs: ['https://www.linkedin.com/in/lukemarinovic/'],
    },
    publisher: { '@type': 'Organization', name: 'UnderCurrent Automations', url: SITE_URL },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    keywords: [fm.keyword, fm.cluster, fm.level].filter(Boolean).join(', '),
    inLanguage: 'en-AU',
    about: aboutEntities,
    ...(mentionEntities && { mentions: mentionEntities }),
    ...(fm.heroImage && { image: `${SITE_URL}${fm.heroImage}` }),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ...(clusterSlug && clusterLabel ? [{
        '@type': 'ListItem',
        position: 3,
        name: clusterLabel,
        item: `${SITE_URL}/blog/cluster/${clusterSlug}`,
      }] : []),
      {
        '@type': 'ListItem',
        position: clusterSlug ? 4 : 3,
        name: fm.title,
        item: `${SITE_URL}/blog/${slug}`,
      },
    ],
  }

  const faqSchema = faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  } : null

  return (
    <>
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      {/* Hero */}
      <section style={{ padding: '120px var(--page-pad) 60px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 28 }}>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Blog', href: '/blog' },
                ...(clusterSlug && clusterLabel ? [{ label: clusterLabel, href: `/blog/cluster/${clusterSlug}` }] : []),
                { label: fm.title },
              ]}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '6px 14px', borderRadius: 999,
                background: 'var(--blue)', color: 'var(--charcoal-deep)',
                fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
              }}
            >
              Article
            </span>
            {clusterLabel && clusterSlug && (
              <Link
                href={`/blog/cluster/${clusterSlug}`}
                style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }}
                className="hover:text-blue transition-colors"
              >
                · {clusterLabel} →
              </Link>
            )}
            {fm.level && (
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>
                · {fm.level}
              </span>
            )}
          </div>

          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--off-white)', textWrap: 'balance' }}>
            {fm.title}
          </h1>

          {fm.description && (
            <p style={{ margin: '24px 0 0', fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 720 }}>
              {fm.description}
            </p>
          )}

          {/* Byline */}
          <div style={{ marginTop: 32, paddingTop: 20, borderTop: '1px solid var(--text-faint)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>
              Written by <strong style={{ color: 'var(--off-white)' }}>{fm.author || 'Luke Marinovic'}</strong>
              {fm.authorTitle ? `, ${fm.authorTitle}` : ', Founder of UnderCurrent Automations'} · Melbourne
            </p>
            <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
              Published {formatDate(fm.date)}
              {fm.dateModified && fm.dateModified !== fm.date && ` · Updated ${formatDate(fm.dateModified)}`}
              {fm.readingTime && ` · ${fm.readingTime} min read`}
            </p>
          </div>
        </div>
      </section>

      {/* Hero image */}
      {fm.heroImage && (
        <section style={{ padding: '48px var(--page-pad) 0', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: HERO_IMG_MAX, aspectRatio: '21 / 9', overflow: 'hidden', borderRadius: 16 }}>
              <Image
                src={fm.heroImage}
                alt={fm.heroImageAlt || fm.title}
                fill
                priority
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 1000px"
              />
            </div>
          </div>
        </section>
      )}

      {/* Quick Answer */}
      {quickAnswer && (
        <section style={{ padding: '60px var(--page-pad) 20px', background: 'var(--charcoal)', borderTop: fm.heroImage ? 'none' : '1px solid var(--text-faint)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div
              style={{
                maxWidth: TEXT_MAX,
                padding: '32px 36px',
                borderRadius: 14,
                background: 'var(--charcoal)',
                border: '1px solid var(--text-faint)',
                borderLeft: '3px solid var(--blue)',
                boxShadow: '6px 6px 0 0 var(--blue)',
              }}
            >
              <p style={{ margin: '0 0 12px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
                Quick Answer
              </p>
              <p
                style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.6, color: 'var(--text-primary)' }}
                dangerouslySetInnerHTML={{ __html: quickAnswer }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Article body */}
      <article style={{ padding: '40px var(--page-pad) 80px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div
            className="article-prose"
            style={{ maxWidth: TEXT_MAX }}
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        </div>
      </article>

      {/* Author bio */}
      <section style={{ padding: '0 var(--page-pad) 72px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <AuthorBio />
        </div>
      </section>

      <style>{`
        .article-prose h2 {
          font-family: var(--font-display);
          font-weight: 500;
          color: var(--off-white);
          font-size: clamp(22px, 2.4vw, 30px);
          letter-spacing: -0.025em;
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .article-prose h3 {
          font-family: var(--font-display);
          font-weight: 500;
          color: var(--off-white);
          font-size: 18px;
          letter-spacing: -0.015em;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .article-prose p {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .article-prose ul, .article-prose ol {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.65;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-prose li { margin-bottom: 0.5rem; }
        .article-prose a {
          color: var(--blue);
          text-decoration: underline;
          text-decoration-color: rgba(106,141,173,0.4);
          text-underline-offset: 3px;
        }
        .article-prose a:hover { text-decoration-color: var(--blue); }
        .article-prose strong { color: var(--off-white); font-weight: 600; }
        .article-prose blockquote {
          border-left: 3px solid var(--blue);
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          background: rgba(106,141,173,0.05);
          border-radius: 0 12px 12px 0;
        }
        .article-prose blockquote p { color: var(--text-primary); margin: 0; }
        .article-prose table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1.5rem 0;
          font-size: 14px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid var(--text-faint);
          background: rgba(255,255,255,0.015);
        }
        @media (max-width: 700px) {
          .article-prose table {
            display: block;
            overflow-x: auto;
            max-width: 100%;
            -webkit-overflow-scrolling: touch;
          }
        }
        .article-prose th, .article-prose td {
          padding: 0.85rem 1rem;
          text-align: left;
          color: var(--text-secondary);
          font-family: var(--font-body);
          border-bottom: 1px solid rgba(250,249,245,0.08);
        }
        .article-prose tr:last-child td {
          border-bottom: none;
        }
        .article-prose tbody tr:nth-child(even) td {
          background: rgba(255,255,255,0.018);
        }
        .article-prose tbody tr:hover td {
          background: rgba(106,141,173,0.06);
        }
        .article-prose th {
          background: rgba(250,249,245,0.04);
          color: var(--off-white);
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid var(--text-faint);
        }
      `}</style>

      {/* Related case studies (if any) */}
      {relatedCaseStudies.length > 0 && (
        <section style={{ padding: '40px var(--page-pad)', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
              See the system in action · Case {relatedCaseStudies.length === 1 ? 'study' : 'studies'}
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16, maxWidth: TEXT_MAX }}>
              {relatedCaseStudies.map(cs => (
                <Link
                  key={cs.slug}
                  href={`/case-studies/${cs.slug}`}
                  className="article-case-card"
                  style={{
                    display: 'block', padding: 20, borderRadius: 14,
                    background: 'var(--charcoal)',
                    border: '1px solid var(--text-faint)',
                    borderLeft: '3px solid var(--blue)',
                    textDecoration: 'none',
                    transition: 'transform 160ms cubic-bezier(.2,.7,.3,1), box-shadow 160ms cubic-bezier(.2,.7,.3,1)',
                  }}
                >
                  <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
                    Case study
                  </p>
                  <h3 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 16, lineHeight: 1.3, letterSpacing: '-0.015em', color: 'var(--text-primary)' }}>
                    {cs.title}
                  </h3>
                  {cs.outcomeHeadline && (
                    <p style={{ margin: '10px 0 0', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 13, color: 'var(--sage-light)', letterSpacing: '-0.01em' }}>
                      → {cs.outcomeHeadline}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <style>{`
        .article-case-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0 0 var(--blue);
        }
        .article-case-card:hover h3 { color: var(--blue-light); }
      `}</style>

      {/* Related articles + CTA */}
      <section style={{ padding: '60px var(--page-pad) 120px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          {clusterSlug && related.length > 0 && (
            <>
              <p style={{ margin: '0 0 20px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
                Read next · {clusterLabel}
              </p>
              <div style={{ marginBottom: 48, maxWidth: TEXT_MAX }}>
                {related.map((r, i) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    style={{
                      display: 'block',
                      padding: '16px 0',
                      borderBottom: i < related.length - 1 ? '1px solid var(--text-faint)' : 'none',
                      color: 'var(--text-primary)',
                      textDecoration: 'none',
                      transition: 'color 0.15s ease',
                    }}
                    className="hover:text-blue"
                  >
                    <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontSize: 16, fontWeight: 500, letterSpacing: '-0.015em' }}>
                      {r.title}
                    </p>
                    {r.summary && (
                      <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {r.summary}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            </>
          )}

          <div style={{ paddingTop: 24, borderTop: '1px solid var(--text-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <Link href="/blog" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              ← All articles
            </Link>
            <Link href="/audit" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              Get a free audit →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
