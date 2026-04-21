// app/case-studies/page.js — Case studies index.
// Design: matches homepage — var(--page-pad), maxWidth: 1280, left-aligned, rounded cards.
import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import { getAllCaseStudies } from '@/lib/caseStudies'
import { CLUSTERS } from '@/lib/clusters'

const SITE_URL = 'https://undercurrentautomations.com'
const CONTENT_MAX = 1280

export const metadata = {
  title: 'Case Studies',
  description:
    'Real automation case studies from UnderCurrent Automations, Melbourne. Before/after metrics, tools used, and the workflow behind every system we build for Australian small businesses.',
  alternates: { canonical: `${SITE_URL}/case-studies` },
  openGraph: {
    title: 'Case Studies — Real Automation Systems with Real Numbers',
    description:
      'Real automation systems with before/after metrics for Australian small businesses.',
    type: 'website',
    url: `${SITE_URL}/case-studies`,
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

export default function CaseStudiesIndex() {
  const caseStudies = getAllCaseStudies()

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Case Studies — UnderCurrent Automations',
    description: metadata.description,
    url: `${SITE_URL}/case-studies`,
    inLanguage: 'en-AU',
    isPartOf: { '@type': 'WebSite', name: 'UnderCurrent Automations', url: SITE_URL },
    hasPart: {
      '@type': 'ItemList',
      name: 'Automation Case Studies',
      numberOfItems: caseStudies.length,
      itemListElement: caseStudies.map((cs, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `${SITE_URL}/case-studies/${cs.slug}`,
        name: cs.title,
        description: cs.description || cs.summary,
      })),
    },
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Case Studies', item: `${SITE_URL}/case-studies` },
    ],
  }

  return (
    <>
      <JsonLd schema={collectionSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Hero */}
      <section style={{ padding: '120px var(--page-pad) 80px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 20 }}>
            <span style={{ fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 500, letterSpacing: '-0.01em', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
              Proof · {caseStudies.length} automation {caseStudies.length === 1 ? 'system' : 'systems'}
            </span>
          </div>

          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(40px, 6vw, 88px)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 900,
            }}
          >
            Real systems.{' '}
            <span className="uc-glow-word uc-glow-word--blue">Real numbers</span>.
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
            Automation builds with before/after metrics, tools used, and what went wrong during the build. No recycled fictional characters, no made-up clients — just systems we've built and run.
          </p>
        </div>
      </section>

      <style>{`
        .cs-list-card {
          display: block;
          padding: 28px;
          border-radius: 14px;
          background: var(--charcoal);
          border: 1px solid var(--text-faint);
          border-left: 3px solid var(--blue);
          text-decoration: none;
          transition: transform 160ms cubic-bezier(.2,.7,.3,1), box-shadow 160ms cubic-bezier(.2,.7,.3,1);
        }
        .cs-list-card:hover {
          transform: translate(-3px, -3px);
          box-shadow: 6px 6px 0 0 var(--blue);
        }
        .cs-list-card:hover h2 { color: var(--blue-light); }
      `}</style>

      {/* List */}
      <section
        style={{
          padding: '80px var(--page-pad) 120px',
          background: 'var(--charcoal)',
          borderTop: '1px solid var(--text-faint)',
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          {caseStudies.length === 0 ? (
            <p style={{ padding: '48px 0', textAlign: 'center', fontFamily: 'var(--font-body)', color: 'var(--text-muted)' }}>
              Case studies coming soon.
            </p>
          ) : (
            <div style={{ display: 'grid', gap: 16 }}>
              {caseStudies.map(cs => {
                const clusterLabel = cs.relatedCluster && CLUSTERS[cs.relatedCluster]?.label
                return (
                  <Link key={cs.slug} href={`/case-studies/${cs.slug}`} className="cs-list-card">
                    <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <p style={{ margin: 0, fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--blue-light)' }}>
                        Case study
                      </p>
                      {cs.industry && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)' }}>· {cs.industry}</span>}
                      {cs.location && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)' }}>· {cs.location}</span>}
                      {clusterLabel && <span style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 12, color: 'var(--text-muted)' }}>· {clusterLabel}</span>}
                    </div>

                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 'clamp(22px, 2.4vw, 28px)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.025em',
                        color: 'var(--text-primary)',
                        transition: 'color 0.15s ease',
                      }}
                    >
                      {cs.title}
                    </h2>

                    {cs.outcomeHeadline && (
                      <p style={{ margin: '14px 0 0', fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 600, color: 'var(--sage-light)', letterSpacing: '-0.01em' }}>
                        → {cs.outcomeHeadline}
                      </p>
                    )}

                    {cs.summary && (
                      <p style={{ margin: '16px 0 0', fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                        {cs.summary}
                      </p>
                    )}

                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--text-faint)', display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
                      {cs.date && <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>{formatDate(cs.date)}</span>}
                      {cs.readingTime && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{cs.readingTime} min read</span>}
                      {cs.tools && cs.tools.length > 0 && (
                        <span style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)' }}>
                          {cs.tools.slice(0, 3).join(' · ')}
                          {cs.tools.length > 3 && ` +${cs.tools.length - 3} more`}
                        </span>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          <div style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--text-faint)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href="/blog" style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', textDecoration: 'none' }} className="hover:text-blue transition-colors">
              ← Read the articles
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
