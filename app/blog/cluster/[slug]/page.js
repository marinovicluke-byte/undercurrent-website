// app/blog/cluster/[slug]/page.js — Topic cluster pillar pages.
// Design: matches homepage — var(--page-pad), maxWidth: 1280, left-aligned, rounded cards.
import Link from 'next/link'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/ui/JsonLd'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import { getAllArticles } from '@/lib/articles'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { CLUSTERS, CLUSTER_ORDER, getClusterBySlug } from '@/lib/clusters'

const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280

export const dynamicParams = false

export function generateStaticParams() {
  return CLUSTER_ORDER.map(slug => ({ slug }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const cluster = getClusterBySlug(slug)
  if (!cluster) return {}

  return {
    title: `${cluster.label} Guides`,
    description: cluster.description,
    alternates: { canonical: `${SITE_URL}/blog/cluster/${slug}` },
    openGraph: {
      title: `${cluster.label} — Automation Guides for Australian Small Business`,
      description: cluster.description,
      type: 'website',
      url: `${SITE_URL}/blog/cluster/${slug}`,
      images: ['/brand/og-card.png'],
    },
  }
}

function formatDate(d) {
  if (!d) return null
  return new Date(d).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function ClusterPage({ params }) {
  const { slug } = await params
  const cluster = getClusterBySlug(slug)
  if (!cluster) return notFound()

  const allArticles = getAllArticles()
  const articles = allArticles.filter(a => a.cluster === slug)
  const allCaseStudies = getAllCaseStudies()
  const relatedCaseStudies = allCaseStudies.filter(c => c.relatedCluster === slug)

  const latestUpdate =
    [...articles, ...relatedCaseStudies]
      .map(x => x.dateModified || x.date)
      .filter(Boolean)
      .sort((a, b) => new Date(b) - new Date(a))[0] || null

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${cluster.label} — Automation Guides for Australian Small Business`,
    description: cluster.description,
    url: `${SITE_URL}/blog/cluster/${slug}`,
    inLanguage: 'en-AU',
    isPartOf: { '@type': 'WebSite', name: 'UnderCurrent Automations', url: SITE_URL },
    hasPart: {
      '@type': 'ItemList',
      name: cluster.label,
      numberOfItems: articles.length,
      itemListElement: articles.map((a, j) => ({
        '@type': 'ListItem',
        position: j + 1,
        url: `${SITE_URL}/blog/${a.slug}`,
        name: a.title,
        description: a.description || a.summary,
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: cluster.label, item: `${SITE_URL}/blog/cluster/${slug}` },
    ],
  }

  const siblings = CLUSTER_ORDER.filter(s => s !== slug).map(s => CLUSTERS[s])

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section style={{ padding: '120px var(--page-pad) 80px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <SectionEyebrow
              n={cluster.num}
              label={`Topic cluster · ${articles.length} ${articles.length === 1 ? 'article' : 'articles'}${relatedCaseStudies.length > 0 ? ` · ${relatedCaseStudies.length} case ${relatedCaseStudies.length === 1 ? 'study' : 'studies'}` : ''}`}
            />
          </div>

          <h1 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(40px, 6vw, 88px)', lineHeight: 1.04, letterSpacing: '-0.035em', color: 'var(--off-white)', textWrap: 'balance', maxWidth: 900 }}>
            <span className="uc-glow-word uc-glow-word--blue">{cluster.label}</span>.
          </h1>

          <p style={{ margin: '28px 0 0', fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.55, color: 'var(--text-secondary)', maxWidth: 720 }}>
            {cluster.description}
          </p>

          {latestUpdate && (
            <p style={{ margin: '20px 0 0', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
              Last updated {formatDate(latestUpdate)}
            </p>
          )}
        </div>
      </section>

      <style>{`
        .cluster-row {
          display: flex; align-items: flex-start; justify-content: space-between;
          gap: 40px; padding: 20px 16px; margin: 0 -16px;
          border-radius: 12px; text-decoration: none;
          transition: background 0.15s ease;
        }
        .cluster-row:hover { background: rgba(250,249,245,0.02); }
        .cluster-row:hover h3 { color: var(--blue); }
        .cluster-case {
          display: block; padding: 24px; border-radius: 14px;
          background: var(--charcoal); border: 1px solid var(--text-faint);
          border-left: 3px solid var(--blue); text-decoration: none;
          transition: transform 160ms cubic-bezier(.2,.7,.3,1), box-shadow 160ms cubic-bezier(.2,.7,.3,1);
        }
        .cluster-case:hover { transform: translate(-3px, -3px); box-shadow: 6px 6px 0 0 var(--blue); }
        .cluster-case:hover h3 { color: var(--blue-light); }
        .cluster-sibling {
          display: block; padding: 16px 20px; border-radius: 12px;
          background: var(--charcoal); border: 1px solid var(--text-faint);
          text-decoration: none; color: var(--text-secondary);
          transition: transform 160ms cubic-bezier(.2,.7,.3,1), box-shadow 160ms cubic-bezier(.2,.7,.3,1);
        }
        .cluster-sibling:hover {
          color: var(--blue-light);
          transform: translate(-2px, -2px);
          box-shadow: 4px 4px 0 0 var(--blue);
        }
      `}</style>

      {/* Related case studies */}
      {relatedCaseStudies.length > 0 && (
        <section style={{ padding: '60px var(--page-pad) 20px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
              Proof · Case studies in this cluster
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 16 }}>
              {relatedCaseStudies.map(cs => (
                <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="cluster-case">
                  <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
                    Case study{cs.industry && ` · ${cs.industry}`}
                  </p>
                  <h3 style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 18, lineHeight: 1.3, letterSpacing: '-0.015em', color: 'var(--text-primary)' }}>
                    {cs.title}
                  </h3>
                  {cs.outcomeHeadline && (
                    <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600, color: 'var(--sage-light)', letterSpacing: '-0.01em' }}>
                      → {cs.outcomeHeadline}
                    </p>
                  )}
                  {cs.summary && (
                    <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {cs.summary}
                    </p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All articles in cluster */}
      <section style={{ padding: '60px var(--page-pad) 60px', background: 'var(--charcoal)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid var(--text-faint)' }}>
            <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
              All guides in this cluster
            </p>
            <h2 style={{ margin: '8px 0 0', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 'clamp(22px, 2.4vw, 28px)', lineHeight: 1.1, letterSpacing: '-0.025em', color: 'var(--off-white)' }}>
              {articles.length} {articles.length === 1 ? 'article' : 'articles'}
            </h2>
          </div>

          <div>
            {articles.map((article, i) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} className="cluster-row" style={{ borderBottom: i < articles.length - 1 ? '1px solid var(--text-faint)' : 'none', borderRadius: 0 }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 17, lineHeight: 1.35, letterSpacing: '-0.015em', color: 'var(--text-primary)', transition: 'color 0.15s ease' }}>
                    {article.title}
                  </h3>
                  {(article.summary || article.description) && (
                    <p style={{ margin: '6px 0 0', fontFamily: 'var(--font-body)', fontSize: 14, lineHeight: 1.55, color: 'var(--text-muted)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {article.summary || article.description}
                    </p>
                  )}
                  {article.date && (
                    <p style={{ margin: '8px 0 0', fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
                      {formatDate(article.date)}
                    </p>
                  )}
                </div>
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, paddingTop: 2 }}>
                  {article.readingTime && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{article.readingTime} min</span>}
                  {article.level && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sage-light)', opacity: 0.8 }}>{article.level}</span>}
                </div>
              </Link>
            ))}
          </div>

          {articles.length === 0 && (
            <p style={{ padding: '48px 0', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
              Articles coming soon in this cluster.
            </p>
          )}
        </div>
      </section>

      {/* Sibling clusters */}
      <section style={{ padding: '40px var(--page-pad) 120px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <p style={{ margin: '0 0 24px', fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Other topic clusters
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {siblings.map(s => (
              <Link key={s.slug} href={`/blog/cluster/${s.slug}`} className="cluster-sibling">
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', display: 'block', marginBottom: 4 }}>
                  {s.num}
                </span>
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 15 }}>{s.label} →</span>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 48, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/blog" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              ← All blog content
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
