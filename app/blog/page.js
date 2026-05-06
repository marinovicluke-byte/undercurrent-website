// app/blog-v4/page.js — Evolved v1: black hero + charcoal body, case-studies strip,
// top-5 per cluster with pillar-page "view all" links. Full SEO/AEO schema stack
// per vault wiki: nextjs-ai-search-framework, article-optimisation-2026, case-study-production-framework.
// Design: matches homepage — var(--page-pad), maxWidth: 1280, left-aligned, rounded cards (12px).
import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { getAllArticles } from '@/lib/articles'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { CLUSTERS, CLUSTER_ORDER, groupByCluster } from '@/lib/clusters'

const TOP_N_PER_CLUSTER = 5
const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280

export const metadata = {
  title: 'Automation Blog',
  description:
    'Topic-clustered automation guides and case studies for Australian SMEs. Getting started, admin time, leads and sales, and industry workflows.',
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: 'Automation Blog for Australian Small Business',
    description:
      'Topic-clustered automation guides and case studies for Australian SMEs.',
    type: 'website',
    url: `${SITE_URL}/blog`,
    images: ['/brand/og-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automation Blog for Australian Small Business',
    description:
      'Topic-clustered automation guides and case studies for Australian SMEs.',
  },
}

function formatDate(d) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

function Eyebrow({ number, label }) {
  return <SectionEyebrow n={number} label={label} />
}

export default function BlogV4() {
  const articles = getAllArticles()
  const caseStudies = getAllCaseStudies()
  const grouped = groupByCluster(articles)

  const latestUpdate =
    [...articles, ...caseStudies]
      .map(x => x.dateModified || x.date)
      .filter(Boolean)
      .sort((a, b) => new Date(b) - new Date(a))[0] || null

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'UnderCurrent Blog — Automation Guides for Australian Small Business',
    description: metadata.description,
    url: `${SITE_URL}/blog`,
    inLanguage: 'en-AU',
    isPartOf: { '@type': 'WebSite', name: 'UnderCurrent Automations', url: SITE_URL },
    hasPart: [
      ...CLUSTER_ORDER.map(key => ({
        '@type': 'ItemList',
        name: `${CLUSTERS[key].label} — Automation Guides`,
        description: CLUSTERS[key].description,
        url: `${SITE_URL}/blog/cluster/${key}`,
        numberOfItems: grouped[key].length,
        itemListElement: grouped[key].map((a, j) => ({
          '@type': 'ListItem',
          position: j + 1,
          url: `${SITE_URL}/blog/${a.slug}`,
          name: a.title,
          description: a.description || a.summary,
        })),
      })),
      {
        '@type': 'ItemList',
        name: 'Case Studies',
        description: 'Real-world automation case studies from UnderCurrent.',
        url: `${SITE_URL}/case-studies`,
        numberOfItems: caseStudies.length,
        itemListElement: caseStudies.map((c, j) => ({
          '@type': 'ListItem',
          position: j + 1,
          url: `${SITE_URL}/case-studies/${c.slug}`,
          name: c.title,
          description: c.description || c.summary,
        })),
      },
    ],
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
    ],
  }

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* ═══ HERO — near-black ═══ */}
      <section
        style={{
          position: 'relative',
          padding: '120px var(--page-pad) 80px',
          background: 'var(--bg-deep)',
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <Eyebrow
              label={`Knowledge Base · ${articles.length} articles · ${caseStudies.length} case ${caseStudies.length === 1 ? 'study' : 'studies'}`}
            />
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(40px, 5.4vw, 80px)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
            }}
          >
            Automation playbooks for{' '}
            <span className="uc-glow-word uc-glow-word--blue">Australian small business</span>.
          </h1>

          <p
            style={{
              margin: '28px 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              maxWidth: 640,
            }}
          >
            Every article answers a specific question. Every case study shows a real system with real numbers. Organised by topic cluster so AI search, Google, and you can all find what you need fast.
          </p>

          {/* Author byline — text only, no avatar */}
          <div
            style={{
              marginTop: 32,
              paddingTop: 20,
              borderTop: '1px solid var(--text-faint)',
            }}
          >
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-primary)' }}>
              Written by <strong style={{ color: 'var(--off-white)' }}>Luke</strong>, Founder of UnderCurrent Automations · Melbourne
              {latestUpdate && ` · Updated ${formatDate(latestUpdate)}`}
            </p>
          </div>

          {/* Topic cluster nav — pill buttons */}
          <nav aria-label="Topic clusters" style={{ marginTop: 40 }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {CLUSTER_ORDER.map(key => (
                <a
                  key={key}
                  href={`#${key}`}
                  className="blog-v4-pill"
                >
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.6 }}>{CLUSTERS[key].num}</span>
                  <span>{CLUSTERS[key].label}</span>
                </a>
              ))}
              {caseStudies.length > 0 && (
                <a href="#case-studies" className="blog-v4-pill blog-v4-pill--accent">
                  Case Studies
                </a>
              )}
            </div>
          </nav>
        </div>
      </section>

      <style>{`
        .blog-v4-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: 999px;
          background: rgba(250,249,245,0.03);
          border: 1px solid var(--text-faint);
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 13px;
          text-decoration: none;
          transition: all 0.15s ease;
        }
        .blog-v4-pill:hover {
          background: rgba(106,141,173,0.08);
          border-color: var(--blue);
          color: var(--blue);
        }
        .blog-v4-pill--accent {
          background: rgba(106,141,173,0.08);
          border-color: rgba(106,141,173,0.4);
          color: var(--blue);
        }
        .blog-v4-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 40px;
          padding: 20px 16px;
          margin: 0 -16px;
          border-radius: 12px;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .blog-v4-row:hover {
          background: rgba(250,249,245,0.02);
        }
        .blog-v4-row:hover h3 { color: var(--blue); }
        .blog-v4-case {
          display: block;
          padding: 24px;
          border-radius: 14px;
          background: var(--charcoal);
          border: 1px solid var(--text-faint);
          border-left: 3px solid var(--blue);
          text-decoration: none;
          transition: transform 160ms cubic-bezier(.2,.7,.3,1), box-shadow 160ms cubic-bezier(.2,.7,.3,1);
        }
        .blog-v4-case:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0 0 var(--blue);
        }
        .blog-v4-case:hover h3 { color: var(--blue-light); }
      `}</style>

      {/* ═══ CASE STUDIES STRIP ═══ */}
      {caseStudies.length > 0 && (
        <section
          id="case-studies"
          style={{
            padding: '80px var(--page-pad)',
            background: 'var(--charcoal)',
            borderTop: '1px solid var(--text-faint)',
            scrollMarginTop: 96,
          }}
        >
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: 16,
                marginBottom: 32,
                paddingBottom: 16,
                borderBottom: '1px solid var(--text-faint)',
              }}
            >
              <div>
                <Eyebrow label="Proof · Real systems" />
                <h2
                  style={{
                    margin: '12px 0 4px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(28px, 3.2vw, 40px)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.025em',
                    color: 'var(--off-white)',
                  }}
                >
                  Case Studies
                </h2>
                <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-muted)', maxWidth: 560 }}>
                  Automation builds with before/after numbers and the tools used.
                </p>
              </div>
              {caseStudies.length > 3 && (
                <Link
                  href="/case-studies"
                  style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', whiteSpace: 'nowrap' }}
                  className="hover:text-blue transition-colors"
                >
                  View all {caseStudies.length} →
                </Link>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
              {caseStudies.slice(0, 3).map(cs => (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="blog-v4-case">
                  <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
                    {cs.industry || 'Case study'}
                    {cs.location && ` · ${cs.location}`}
                  </p>
                  <h3 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, lineHeight: 1.3, color: 'var(--text-primary)', letterSpacing: '-0.015em' }}>
                    {cs.title}
                  </h3>
                  {cs.outcomeHeadline && (
                    <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--sage-light)', letterSpacing: '-0.01em' }}>
                      → {cs.outcomeHeadline}
                    </p>
                  )}
                  {cs.summary && (
                    <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {cs.summary}
                    </p>
                  )}
                  <div style={{ marginTop: 16, paddingTop: 12, borderTop: '1px solid var(--text-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
                      {formatDate(cs.date)}
                    </span>
                    {cs.readingTime && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                        {cs.readingTime} min
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ TOPIC CLUSTERS ═══ */}
      <section style={{ padding: '40px var(--page-pad) 120px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          {CLUSTER_ORDER.map(key => {
            const clusterArticles = grouped[key]
            if (!clusterArticles.length) return null
            const cluster = CLUSTERS[key]
            const top = clusterArticles.slice(0, TOP_N_PER_CLUSTER)
            const remaining = clusterArticles.length - top.length

            return (
              <section key={key} id={key} style={{ paddingTop: 80, scrollMarginTop: 96 }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: 16,
                    marginBottom: 32,
                    paddingBottom: 16,
                    borderBottom: '1px solid var(--text-faint)',
                  }}
                >
                  <div style={{ maxWidth: 720 }}>
                    <Eyebrow number={cluster.num} label={`${clusterArticles.length} ${clusterArticles.length === 1 ? 'article' : 'articles'}`} />
                    <h2
                      style={{
                        margin: '12px 0 8px',
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 'clamp(28px, 3.2vw, 40px)',
                        lineHeight: 1.1,
                        letterSpacing: '-0.025em',
                        color: 'var(--off-white)',
                      }}
                    >
                      {cluster.label}
                    </h2>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.55, color: 'var(--text-muted)' }}>
                      {cluster.description}
                    </p>
                  </div>
                  <Link
                    href={`/blog/cluster/${key}`}
                    style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0 }}
                    className="hover:text-blue transition-colors"
                  >
                    View all →
                  </Link>
                </div>

                <div>
                  {top.map((article, i) => (
                    <Link key={article.slug} href={`/blog/${article.slug}`} className="blog-v4-row" style={{ borderBottom: i < top.length - 1 ? '1px solid var(--text-faint)' : 'none', borderRadius: 0 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.015em', color: 'var(--text-primary)', transition: 'color 0.15s ease' }}>
                          {article.title}
                        </h3>
                        {article.summary && (
                          <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {article.summary}
                          </p>
                        )}
                      </div>
                      <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, paddingTop: 2 }}>
                        {article.readingTime && (
                          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
                            {article.readingTime} min
                          </span>
                        )}
                        {article.level && (
                          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-light)', opacity: 0.8 }}>
                            {article.level}
                          </span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>

                {remaining > 0 && (
                  <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--text-faint)' }}>
                    <Link href={`/blog/cluster/${key}`} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
                      View all {clusterArticles.length} articles in {cluster.label} →
                    </Link>
                  </div>
                )}
              </section>
            )
          })}

          {/* Footer */}
          <div style={{ marginTop: 96, paddingTop: 32, borderTop: '1px solid var(--text-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
              {articles.length} articles · {caseStudies.length} case {caseStudies.length === 1 ? 'study' : 'studies'}
              {latestUpdate && ` · Updated ${formatDate(latestUpdate)}`}
            </p>
            <a href="#" style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              ↑ Back to top
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
