// app/case-studies/[slug]/page.js — Individual case study detail page.
// Full Article + FAQPage + Person + BreadcrumbList JSON-LD per wiki.
// Design: matches homepage — var(--page-pad), maxWidth: 1280 with narrower text column, rounded.
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/ui/JsonLd'
import AuthorBio from '@/components/ui/AuthorBio'
import Breadcrumb from '@/components/layout/Breadcrumb'
import HeroCta from '@/components/article/HeroCta'
import { getAllCaseStudies, getCaseStudyBySlug } from '@/lib/caseStudies'
import { getAllArticles } from '@/lib/articles'
import { CLUSTERS } from '@/lib/clusters'
import { LUKE_PERSON } from '@/lib/schema/person'

const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280
const TEXT_MAX = 880   // reading column, left-aligned inside CONTENT_MAX
const HERO_IMG_MAX = 1000  // hero image constrained below full content width

export const dynamicParams = false

export function generateStaticParams() {
  return getAllCaseStudies().map(c => ({ slug: c.slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return {}

  const heroImageUrl = `${SITE_URL}/case-studies/${slug}/hero.jpg`

  return {
    title: cs.frontmatter.title,
    description: cs.frontmatter.description || cs.frontmatter.summary,
    alternates: { canonical: `${SITE_URL}/case-studies/${slug}` },
    openGraph: {
      title: cs.frontmatter.title,
      description: cs.frontmatter.description || cs.frontmatter.summary,
      type: 'article',
      publishedTime: cs.frontmatter.date,
      modifiedTime: cs.frontmatter.dateModified || cs.frontmatter.date,
      url: `${SITE_URL}/case-studies/${slug}`,
      authors: [cs.frontmatter.author || 'Luke Marinovic'],
      images: [{ url: heroImageUrl, width: 1536, height: 1024, alt: cs.frontmatter.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: cs.frontmatter.title,
      description: cs.frontmatter.description || cs.frontmatter.summary,
      images: [heroImageUrl],
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
// Regex fallback is kept for case studies that haven't been backfilled yet.
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

export default async function CaseStudyPage({ params }) {
  const { slug } = await params
  const cs = await getCaseStudyBySlug(slug)
  if (!cs) return notFound()

  const fm = cs.frontmatter
  const faqs = extractFaqs(fm, cs.html)
  const { quickAnswer, bodyHtml } = extractQuickAnswer(cs.html)
  const clusterLabel = fm.relatedCluster && CLUSTERS[fm.relatedCluster]?.label
  const clusterSlug = fm.relatedCluster

  const related = clusterSlug
    ? getAllArticles().filter(a => a.cluster === clusterSlug).slice(0, 3)
    : []

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${SITE_URL}/case-studies/${slug}#article`,
        headline: fm.title,
        description: fm.description || fm.summary,
        datePublished: fm.date,
        dateModified: fm.dateModified || fm.date,
        author: { '@id': `${SITE_URL}/about#luke` },
        publisher: { '@id': `${SITE_URL}#organization` },
        mainEntityOfPage: `${SITE_URL}/case-studies/${slug}`,
        articleSection: clusterLabel || 'Case Study',
        keywords: [fm.keyword, fm.industry, fm.location, ...(fm.tools || [])].filter(Boolean).join(', '),
        inLanguage: 'en-AU',
        image: `${SITE_URL}/case-studies/${slug}/hero.jpg`,
      },
      LUKE_PERSON,
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
      { '@type': 'ListItem', position: 3, name: fm.title, item: `${SITE_URL}/case-studies/${slug}` },
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
      <JsonLd schema={pageSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {faqSchema && <JsonLd schema={faqSchema} />}

      {/* Hero */}
      <section style={{ padding: '120px var(--page-pad) 60px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 28 }}>
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: 'Case Studies', href: '/case-studies' },
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
              Case study
            </span>
            {fm.industry && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)' }}>· {fm.industry}</span>}
            {fm.location && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)' }}>· {fm.location}</span>}
            {clusterLabel && clusterSlug && (
              <Link href={`/blog/cluster/${clusterSlug}`} style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
                · {clusterLabel} →
              </Link>
            )}
          </div>

          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(32px, 5vw, 64px)', lineHeight: 1.08, letterSpacing: '-0.03em', color: 'var(--off-white)', textWrap: 'balance', maxWidth: 960 }}>
            {fm.title}
          </h1>

          {fm.outcomeHeadline && (
            <p style={{ margin: '24px 0 0', fontFamily: 'var(--font-display)', fontSize: 'clamp(16px, 1.6vw, 20px)', fontWeight: 600, color: 'var(--sage-light)', letterSpacing: '-0.015em' }}>
              → {fm.outcomeHeadline}
            </p>
          )}

          {/* Author byline */}
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--text-faint)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div aria-hidden="true" style={{ width: 44, height: 44, borderRadius: '50%', background: 'var(--blue)', color: 'var(--charcoal-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 16, flexShrink: 0 }}>
                {(fm.author || 'L')[0]}
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>
                  <strong style={{ color: 'var(--off-white)' }}>{fm.author || 'Luke Marinovic'}</strong>
                  {fm.authorTitle && ` · ${fm.authorTitle}`}
                </p>
                <p style={{ margin: '2px 0 0', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
                  Published {formatDate(fm.date)}
                  {fm.dateModified && fm.dateModified !== fm.date && ` · Updated ${formatDate(fm.dateModified)}`}
                  {fm.readingTime && ` · ${fm.readingTime} min read`}
                </p>
              </div>
            </div>
            <HeroCta />
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
        <section style={{ padding: '60px var(--page-pad) 20px', background: 'var(--charcoal)' }}>
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
            className="cs-prose"
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
        .cs-prose h2 {
          font-family: var(--font-display);
          font-weight: 500;
          color: var(--off-white);
          font-size: clamp(22px, 2.4vw, 30px);
          letter-spacing: -0.025em;
          margin-top: 3rem;
          margin-bottom: 1rem;
          line-height: 1.15;
        }
        .cs-prose h3 {
          font-family: var(--font-display);
          font-weight: 500;
          color: var(--off-white);
          font-size: 18px;
          letter-spacing: -0.015em;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .cs-prose p {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.65;
          margin-bottom: 1.25rem;
        }
        .cs-prose ul, .cs-prose ol {
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 17px;
          line-height: 1.65;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .cs-prose li { margin-bottom: 0.5rem; }
        .cs-prose a {
          color: var(--blue);
          text-decoration: underline;
          text-decoration-color: rgba(106,141,173,0.4);
          text-underline-offset: 3px;
        }
        .cs-prose a:hover { text-decoration-color: var(--blue); }
        .cs-prose strong { color: var(--off-white); font-weight: 600; }
        .cs-prose blockquote {
          border-left: 3px solid var(--blue);
          padding: 1rem 1.25rem;
          margin: 1.5rem 0;
          background: rgba(106,141,173,0.05);
          border-radius: 0 12px 12px 0;
        }
        .cs-prose blockquote p { color: var(--text-primary); margin: 0; }
        .cs-prose table {
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
          .cs-prose table {
            display: block;
            overflow-x: auto;
            max-width: 100%;
            -webkit-overflow-scrolling: touch;
          }
        }
        .cs-prose th, .cs-prose td {
          padding: 0.85rem 1rem;
          text-align: left;
          color: var(--text-secondary);
          font-family: var(--font-body);
          border-bottom: 1px solid rgba(250,249,245,0.08);
        }
        .cs-prose tr:last-child td {
          border-bottom: none;
        }
        .cs-prose tbody tr:nth-child(even) td {
          background: rgba(255,255,255,0.018);
        }
        .cs-prose tbody tr:hover td {
          background: rgba(106,141,173,0.06);
        }
        .cs-prose th {
          background: rgba(250,249,245,0.04);
          color: var(--off-white);
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 12px;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border-bottom: 1px solid var(--text-faint);
        }
        .cs-prose pre {
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--text-faint);
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          max-width: 100%;
          margin: 1.5rem 0;
          -webkit-overflow-scrolling: touch;
        }
        .cs-prose pre code {
          font-family: 'SF Mono', ui-monospace, 'Cascadia Code', monospace;
          font-size: 13px;
          line-height: 1.6;
          color: var(--text-primary);
          background: none;
          padding: 0;
          border-radius: 0;
          white-space: pre;
        }
        .cs-prose code {
          font-family: 'SF Mono', ui-monospace, 'Cascadia Code', monospace;
          font-size: 13px;
          background: rgba(255,255,255,0.06);
          padding: 2px 6px;
          border-radius: 4px;
          color: var(--blue-light);
        }
      `}</style>

      {/* Tools */}
      {fm.tools && fm.tools.length > 0 && (
        <section style={{ padding: '40px var(--page-pad)', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <p style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
              Tools used in this build
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {fm.tools.map(t => (
                <span
                  key={t}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 999,
                    background: 'rgba(250,249,245,0.04)',
                    border: '1px solid var(--text-faint)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: 'var(--text-primary)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related + CTA */}
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
                  </Link>
                ))}
              </div>
            </>
          )}

          <div style={{ paddingTop: 24, borderTop: '1px solid var(--text-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/case-studies" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              ← All case studies
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
