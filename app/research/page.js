// /research, the research hub. Lists UnderCurrent's published methodology and
// audit studies. Today: one study (Article Reviewer). Designed to grow.
import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import Breadcrumb from '@/components/layout/Breadcrumb'
import { ROBIN_RUBRIC_SNAPSHOT } from '@/lib/data/robinRubricSnapshot'
import { DOMAIN } from '@/lib/data/seo'

const PAGE_URL = `${DOMAIN}/research`
const CONTENT_MAX = 1280

const STUDIES = [
  {
    slug: 'article-reviewer',
    eyebrow: 'Study 01',
    title: 'The Robin Search Article Reviewer',
    blurb: `Open methodology for scoring Australian blog articles on AI search and SEO criteria. Six dimensions, 100-point rubric, live snapshot of ${ROBIN_RUBRIC_SNAPSHOT.articlesAudited} audited articles.`,
    href: '/research/article-reviewer',
    lastUpdated: ROBIN_RUBRIC_SNAPSHOT.lastUpdatedDisplay,
    accent: 'var(--blue)',
  },
]

export const metadata = {
  title: 'Research',
  description:
    'Published methodology and audit studies from UnderCurrent Automations. Open frameworks for AI search and SEO content quality, scored against a live Australian corpus.',
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: 'Research, UnderCurrent Automations',
    description: 'Published methodology and audit studies from UnderCurrent Automations.',
    url: PAGE_URL,
    type: 'website',
    images: [`${DOMAIN}/brand/og-card.png`],
  },
}

const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Research', item: PAGE_URL },
  ],
}

const COLLECTION_LD = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  '@id': `${PAGE_URL}#collection`,
  name: 'UnderCurrent Automations Research',
  description: metadata.description,
  url: PAGE_URL,
  inLanguage: 'en-AU',
  hasPart: STUDIES.map(s => ({
    '@type': 'Article',
    name: s.title,
    url: `${DOMAIN}${s.href}`,
    description: s.blurb,
  })),
}

export default function ResearchHub() {
  return (
    <>
      <JsonLd schema={BREADCRUMB_LD} />
      <JsonLd schema={COLLECTION_LD} />

      <div style={{ background: 'var(--bg-deep)' }}>
        <div style={{ padding: '32px var(--page-pad) 0', maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Research' },
          ]} />
        </div>

        {/* Hero */}
        <section style={{ padding: '64px var(--page-pad) 56px', background: 'var(--bg-deep)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <div style={{ marginBottom: 32 }}>
              <SectionEyebrow label="Research" />
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(40px, 5.4vw, 76px)',
                lineHeight: 1.02,
                letterSpacing: '-0.035em',
                color: 'var(--off-white)',
                textWrap: 'balance',
                maxWidth: 1080,
              }}
            >
              Open methodology. <span className="uc-glow-word uc-glow-word--blue">Australian corpus.</span>
            </h1>
            <p
              style={{
                margin: '28px 0 0',
                fontFamily: 'var(--font-body)',
                fontSize: 19,
                lineHeight: 1.55,
                color: 'var(--text-secondary)',
                maxWidth: 720,
              }}
            >
              Frameworks we score our work and our competitors&apos; work against. Published in full. Refreshed monthly.
            </p>
          </div>
        </section>

        {/* Studies list */}
        <section style={{ padding: '24px var(--page-pad) 120px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
          <div style={{ maxWidth: CONTENT_MAX, margin: 0, width: '100%' }}>
            <ol style={{ listStyle: 'none', margin: '40px 0 0', padding: 0, display: 'grid', gap: 20 }}>
              {STUDIES.map(s => (
                <li key={s.slug}>
                  <Link
                    href={s.href}
                    style={{
                      display: 'block',
                      padding: '32px 36px',
                      borderRadius: 14,
                      background: 'var(--bg-deep)',
                      border: '1px solid var(--text-faint)',
                      boxShadow: `6px 6px 0 0 ${s.accent}`,
                      textDecoration: 'none',
                      color: 'inherit',
                    }}
                  >
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 12,
                        letterSpacing: '0.14em',
                        color: 'var(--blue-light, #9DB6CC)',
                        marginBottom: 12,
                      }}
                    >
                      {s.eyebrow} · Updated {s.lastUpdated}
                    </div>
                    <h2
                      style={{
                        margin: 0,
                        fontFamily: 'var(--font-display)',
                        fontWeight: 500,
                        fontSize: 'clamp(24px, 2.8vw, 34px)',
                        lineHeight: 1.15,
                        letterSpacing: '-0.025em',
                        color: 'var(--off-white)',
                      }}
                    >
                      {s.title}
                    </h2>
                    <p
                      style={{
                        margin: '14px 0 0',
                        fontFamily: 'var(--font-body)',
                        fontSize: 16,
                        lineHeight: 1.55,
                        color: 'var(--text-secondary)',
                        maxWidth: 720,
                      }}
                    >
                      {s.blurb}
                    </p>
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>
      </div>
    </>
  )
}
