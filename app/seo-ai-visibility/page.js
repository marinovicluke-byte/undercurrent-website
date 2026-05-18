// Bespoke SEO & AI Visibility service page — overrides app/[slug] catch-all at /seo-ai-visibility.
// Preserves all copy and schema from lib/data/services.js entry slug:'seo-ai-visibility'.
// SEO Melbourne — primary keyword page. Hub for Local SEO, National SEO, AI Search sub-pages.

import Link from 'next/link'
import PillCTA from '@/components/ui/PillCTA'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import SeoTabDemo from '@/components/ui/SeoTabDemo'
import { SERVICES } from '@/lib/data/services'
import { DOMAIN, PROVIDER, AREAS_SERVED } from '@/lib/data/seo'

const SVC = SERVICES.find(s => s.slug === 'seo-ai-visibility')

// ── Colour palette (hex so server-only JSX has no hydration surprises) ────────
const DEEP      = '#121210'
const CHARCOAL  = '#1C1C1A'
const CHARCOAL2 = '#232320'
const OFF_WHITE = 'rgba(250,249,245,0.95)'
const SECONDARY = 'rgba(250,249,245,0.58)'
const MUTED     = 'rgba(250,249,245,0.40)'
const FAINT     = 'rgba(250,249,245,0.09)'
const BLUE      = '#6A8DAD'
const BLUE_RGB  = '106,141,173'
const SAGE      = '#8FAF9F'
const SAGE_RGB  = '143,175,159'
const ORANGE    = '#E07A55'
const ORANGE_RGB = '224,122,85'

// ── Metadata ─────────────────────────────────────────────────────────────────
export const metadata = {
  title: SVC.metaTitle,
  description: SVC.metaDescription,
  alternates: { canonical: `${DOMAIN}/${SVC.slug}` },
  openGraph: {
    title: SVC.metaTitle,
    description: SVC.metaDescription,
    url: `${DOMAIN}/${SVC.slug}`,
    type: 'website',
    images: [`${DOMAIN}/brand/og-card.png`],
  },
}

// ── JSON-LD ───────────────────────────────────────────────────────────────────
const BREADCRUMB_LD = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',                item: DOMAIN },
    { '@type': 'ListItem', position: 2, name: 'Services',            item: `${DOMAIN}/services` },
    { '@type': 'ListItem', position: 3, name: 'SEO & AI Visibility', item: `${DOMAIN}/seo-ai-visibility` },
  ],
}

const SERVICE_LD = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${DOMAIN}/seo-ai-visibility#service`,
  name: 'SEO & AI Visibility',
  serviceType: 'SEO and AI Visibility for Australian small businesses',
  description: SVC.metaDescription,
  url: `${DOMAIN}/seo-ai-visibility`,
  provider: { '@id': `${DOMAIN}#organization` },
  areaServed: AREAS_SERVED.map(a => ({ '@type': 'Place', name: a })),
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'SEO & AI Visibility deliverables',
    itemListElement: SVC.whatWeDeliver.map((item, i) => ({
      '@type': 'Offer',
      position: i + 1,
      itemOffered: { '@type': 'Service', name: item },
    })),
  },
}

const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: SVC.faqs.map(f => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
}

// ── Small UI helpers (server components) ─────────────────────────────────────
function H2({ children, maxWidth, style }) {
  return (
    <h2 style={{
      fontFamily: 'var(--font-display)', fontWeight: 500,
      fontSize: 'clamp(30px, 3.2vw, 48px)', lineHeight: 1.06,
      letterSpacing: '-0.03em', color: OFF_WHITE,
      margin: 0,
      maxWidth: maxWidth || 640,
      ...style,
    }}>
      {children}
    </h2>
  )
}

function BrowserMockup({ label, url, height = 460 }) {
  return (
    <div style={{
      background: CHARCOAL,
      border: `1px solid ${FAINT}`,
      borderRadius: 14,
      overflow: 'hidden',
      boxShadow: `6px 6px 0 0 rgba(${BLUE_RGB},0.32)`,
    }}>
      <div style={{
        background: 'rgba(0,0,0,0.45)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        borderBottom: `1px solid rgba(250,249,245,0.07)`,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#FF5F57', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#FEBC2E', flexShrink: 0 }} />
        <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28C840', flexShrink: 0 }} />
        <div style={{
          flex: 1, background: 'rgba(255,255,255,0.05)',
          borderRadius: 4, height: 22, marginLeft: 10,
          display: 'flex', alignItems: 'center', paddingLeft: 10,
        }}>
          <span style={{ fontSize: 11, color: 'rgba(250,249,245,0.28)', fontFamily: 'var(--font-body)' }}>
            {url || 'undercurrentautomations.com / dashboard'}
          </span>
        </div>
      </div>
      <div style={{
        height,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 16, padding: 32,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 12,
          background: `rgba(${BLUE_RGB},0.1)`,
          border: `1px solid rgba(${BLUE_RGB},0.3)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M3 12h18M3 6h18M3 18h18" stroke={BLUE} strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{
            color: 'rgba(250,249,245,0.28)', fontSize: 13,
            fontFamily: 'var(--font-display)', fontWeight: 500,
            margin: '0 0 6px',
          }}>
            UnderCurrent Search
          </p>
          <p style={{
            color: 'rgba(250,249,245,0.16)', fontSize: 12,
            fontFamily: 'var(--font-body)', margin: 0, lineHeight: 1.5,
            maxWidth: 240,
          }}>
            {label || 'Dashboard screenshot coming soon'}
          </p>
        </div>
      </div>
    </div>
  )
}

function Check({ on, highlight }) {
  if (!on) return <span style={{ color: 'rgba(250,249,245,0.15)', fontSize: 16 }}>·</span>
  return <span style={{ color: highlight ? SAGE : MUTED, fontSize: 15, fontWeight: 600 }}>✓</span>
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function SeoAiVisibilityPage() {
  return (
    <div style={{ background: DEEP, color: OFF_WHITE, paddingTop: 96 }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(BREADCRUMB_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(SERVICE_LD) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_LD) }} />

      {/* Fixed scroll-fade at header edge */}
      <div aria-hidden style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: 130,
        background: 'linear-gradient(to bottom, #121210 0%, rgba(18,18,16,0.82) 55%, transparent 100%)',
        pointerEvents: 'none', zIndex: 20,
      }} />

      {/* ── 01 HERO ──────────────────────────────────────────────────────── */}
      <section style={{ padding: '0 var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>

          {/* Centred hero text */}
          <div style={{
            maxWidth: 820, margin: '0 auto',
            textAlign: 'center',
            padding: '60px 0 52px',
          }}>
            <h1 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(40px, 5.5vw, 78px)', lineHeight: 0.97,
              letterSpacing: '-0.04em', color: OFF_WHITE,
              margin: '0 0 28px',
            }}>
              Real Results Driven<br />
              SEO Agency in <span style={{ color: BLUE }}>Melbourne.</span>
            </h1>

            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 17, lineHeight: 1.65,
              color: SECONDARY, margin: '0 auto 40px',
              maxWidth: 580,
            }}>
              We build the organic rankings and AI search citations that compound over time. Google, ChatGPT, Perplexity — one system, one team, one brief.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 28 }}>
              <PillCTA label="Book a scoping call" href="https://cal.com/luke-marinovic-aqeosc/30min" tone="blue" />
              <Link href="/audit" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '12px 24px', borderRadius: 999,
                border: `1px solid ${FAINT}`, background: 'transparent',
                color: OFF_WHITE, textDecoration: 'none',
                fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 500,
                letterSpacing: '-0.01em',
              }}>
                Free SEO audit <span aria-hidden style={{ fontSize: 12 }}>→</span>
              </Link>
            </div>

            <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
              {['Melbourne · Australia-wide', 'Google + ChatGPT + Perplexity', 'No lock-in contracts'].map(chip => (
                <span key={chip} style={{
                  display: 'inline-block', padding: '5px 12px',
                  border: `1px solid rgba(250,249,245,0.13)`,
                  background: 'rgba(255,255,255,0.025)',
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 12, color: MUTED, borderRadius: 999,
                }}>
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Hero dashboard mockup */}
          <div style={{ paddingBottom: 0 }}>
            <BrowserMockup
              height={480}
              label="Full dashboard view — screenshot coming soon"
              url="undercurrentautomations.com / dashboard"
            />
          </div>
        </div>
      </section>

      {/* ── 02 STATS STRIP ───────────────────────────────────────────────── */}
      <section style={{
        background: CHARCOAL,
        borderTop: `1px solid ${FAINT}`,
        borderBottom: `1px solid ${FAINT}`,
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '64px var(--page-pad)' }}>
          <div style={{ marginBottom: 40 }}><SectionEyebrow n="01" label="By the numbers" /></div>
          <div className="seo-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
            {[
              { num: '3',     label: 'Search surfaces',            sub: 'Google, ChatGPT, Perplexity — one system' },
              { num: '20%',   label: 'Above enterprise benchmarks', sub: 'Average content quality score uplift' },
              { num: '4–8',   label: 'Weeks to first movement',     sub: 'Technical fixes and on-page retrofits' },
              { num: '$0',    label: 'Lock-in fees',                sub: 'Cancel any month, no questions' },
            ].map(s => (
              <div key={s.num} style={{
                background: DEEP,
                border: `1px solid rgba(250,249,245,0.1)`,
                borderRadius: 14, padding: '32px 28px',
                boxShadow: `6px 6px 0 0 rgba(${BLUE_RGB},0.18)`,
              }}>
                <p style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'clamp(28px, 3vw, 44px)',
                  color: BLUE, margin: '0 0 10px', lineHeight: 1,
                }}>
                  {s.num}
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 14, color: OFF_WHITE, margin: '0 0 6px',
                }}>
                  {s.label}
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  color: SECONDARY, margin: 0, lineHeight: 1.5,
                }}>
                  {s.sub}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 WHAT MAKES US DIFFERENT ───────────────────────────────────── */}
      <section style={{ padding: '96px var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}><SectionEyebrow n="02" label="Why UnderCurrent" /></div>
          <H2 style={{ marginBottom: 16 }}>
            Most agencies optimise for Google.<br />
            <span style={{ color: BLUE }}>We optimise for everywhere buyers look.</span>
          </H2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
            color: SECONDARY, margin: '0 0 52px', maxWidth: 520,
          }}>
            Traditional SEO retainers chase blue-link rankings. We cover the whole discovery surface — Google, AI Overviews, ChatGPT, and Perplexity — as one compounding system.
          </p>

          <div className="seo-diff-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 18 }}>
            {[
              {
                num: '01',
                accent: BLUE_RGB,
                title: 'Three search surfaces, one brief',
                body: 'One system that earns Google rankings, Google AI Overview citations, and verbatim mentions inside ChatGPT, Claude, and Perplexity. Most agencies cover one. We cover all three by default.',
              },
              {
                num: '02',
                accent: SAGE_RGB,
                title: '20% above enterprise content benchmarks',
                body: 'Our content scoring model benchmarks against the top 1% of enterprise editorial content before anything ships. You get article-quality writing with AEO structure baked in — not AI slop dressed up as SEO.',
              },
              {
                num: '03',
                accent: BLUE_RGB,
                title: 'Topical authority, not one-off posts',
                body: 'We map and build full topic clusters — pillar hubs interlinked with supporting articles — so Google reads your site as the authority on a subject, not just a page that mentioned a keyword.',
              },
              {
                num: '04',
                accent: SAGE_RGB,
                title: 'Human editorial review on everything',
                body: 'AI accelerates keyword clustering, schema generation, and draft structure. A human editor reviews and rewrites before anything publishes. AI-generated slop caught in quality review never ships.',
              },
            ].map(d => (
              <div key={d.num} style={{
                background: CHARCOAL,
                border: `1px solid rgba(250,249,245,0.09)`,
                borderLeft: `3px solid rgba(${d.accent},0.55)`,
                borderRadius: 14, padding: '32px 32px 32px 29px',
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 18 }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 11,
                    color: `rgb(${d.accent})`, marginTop: 3, flexShrink: 0,
                  }}>
                    {d.num}
                  </span>
                  <div>
                    <p style={{
                      fontFamily: 'var(--font-display)', fontWeight: 500,
                      fontSize: 17, color: OFF_WHITE, margin: '0 0 10px',
                      lineHeight: 1.25, letterSpacing: '-0.01em',
                    }}>
                      {d.title}
                    </p>
                    <p style={{
                      fontFamily: 'var(--font-body)', fontSize: 14,
                      color: SECONDARY, margin: 0, lineHeight: 1.7,
                    }}>
                      {d.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 HOW IT WORKS (interactive tabs) ───────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '96px var(--page-pad)', borderTop: `1px solid ${FAINT}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}><SectionEyebrow n="03" label="How it works" /></div>
          <H2 style={{ marginBottom: 56 }}>
            Audit, architect, publish.<br />
            <span style={{ color: BLUE }}>Then it compounds.</span>
          </H2>
          <SeoTabDemo />
        </div>
      </section>

      {/* ── 05 HOW WE COMPARE ────────────────────────────────────────────── */}
      <section style={{ padding: '96px var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}><SectionEyebrow n="04" label="How we compare" /></div>
          <H2 style={{ marginBottom: 16 }}>
            Most SEO retainers rank you for nothing.
          </H2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
            color: SECONDARY, margin: '0 0 48px', maxWidth: 520,
          }}>
            {SVC.comparisonCopy}
          </p>

          <div style={{ overflowX: 'auto', borderRadius: 14, border: `1px solid rgba(250,249,245,0.09)` }}>
            <table style={{ width: '100%', minWidth: 640, borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: CHARCOAL, borderBottom: `1px solid ${FAINT}` }}>
                  <th style={{
                    textAlign: 'left', padding: '14px 20px',
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: MUTED, width: '38%',
                  }}>
                    Capability
                  </th>
                  {SVC.comparisonColumns.map((col, i) => (
                    <th key={i} style={{
                      padding: '14px 20px', textAlign: 'center',
                      fontFamily: 'var(--font-display)', fontWeight: 500,
                      fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: i === 0 ? BLUE : MUTED,
                      borderBottom: i === 0 ? `2px solid ${BLUE}` : 'none',
                    }}>
                      {i === 0 ? 'UnderCurrent ✦' : col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SVC.comparisonRows.map((row, i) => (
                  <tr key={i} style={{
                    borderBottom: i < SVC.comparisonRows.length - 1 ? `1px solid rgba(250,249,245,0.06)` : 'none',
                    background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)',
                  }}>
                    <td style={{
                      padding: '14px 20px',
                      fontFamily: 'var(--font-body)', fontSize: 14,
                      color: 'rgba(250,249,245,0.8)',
                    }}>
                      {row.label}
                    </td>
                    {['uc', 'manual', 'generic', 'agency'].map((key, ci) => (
                      <td key={ci} style={{ padding: '14px 20px', textAlign: 'center' }}>
                        <Check on={row[key]} highlight={ci === 0} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 06 LOCAL + NATIONAL ──────────────────────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '96px var(--page-pad)', borderTop: `1px solid ${FAINT}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ marginBottom: 24 }}><SectionEyebrow n="05" label="Coverage" /></div>
          <H2 style={{ marginBottom: 16 }}>
            Suburb level. State level.<br />
            <span style={{ color: BLUE }}>National scale.</span>
          </H2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
            color: SECONDARY, margin: '0 0 52px', maxWidth: 520,
          }}>
            We run local SEO and national AI search visibility as a single system — not two separate retainers.
          </p>

          <div className="seo-coverage-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            {/* Local */}
            <div style={{
              background: DEEP,
              border: `1px solid rgba(250,249,245,0.1)`,
              borderTop: `3px solid rgba(${SAGE_RGB},0.6)`,
              borderRadius: 14, padding: 36,
            }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: SAGE, margin: '0 0 18px',
              }}>
                Local SEO
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.15,
                letterSpacing: '-0.02em', color: OFF_WHITE,
                margin: '0 0 16px',
              }}>
                Ranked in your suburb.<br />Found on the map.
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.7,
                color: SECONDARY, margin: '0 0 28px',
              }}>
                Google Business Profile setup and ongoing optimisation. Suburb-level landing pages with local schema. Citation building across Australian directories. Review generation workflows so your star rating compounds with every completed job.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 9 }}>
                {[
                  'Google Business Profile management',
                  'Suburb and service-area landing pages',
                  'Local citation building (AU directories)',
                  'Review request automation',
                  'Maps pack optimisation',
                  'LocalBusiness + Service JSON-LD schema',
                ].map(item => (
                  <li key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontFamily: 'var(--font-body)', fontSize: 13.5, color: SECONDARY,
                  }}>
                    <span style={{ width: 5, height: 5, background: `rgba(${SAGE_RGB},0.7)`, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* National / AI */}
            <div style={{
              background: DEEP,
              border: `1px solid rgba(250,249,245,0.1)`,
              borderTop: `3px solid rgba(${BLUE_RGB},0.6)`,
              borderRadius: 14, padding: 36,
            }}>
              <p style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                color: BLUE, margin: '0 0 18px',
              }}>
                National & AI Search
              </p>
              <h3 style={{
                fontFamily: 'var(--font-display)', fontWeight: 500,
                fontSize: 'clamp(20px, 2vw, 26px)', lineHeight: 1.15,
                letterSpacing: '-0.02em', color: OFF_WHITE,
                margin: '0 0 16px',
              }}>
                Cited by AI.<br />Compounding nationally.
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)', fontSize: 14.5, lineHeight: 1.7,
                color: SECONDARY, margin: '0 0 28px',
              }}>
                Topic cluster architecture that earns topical authority across Australian and national buyer queries. Content structured so ChatGPT, Perplexity, and Google AI Overviews cite it verbatim. State-specific pages for multi-location businesses without cannibalising each other.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 9 }}>
                {[
                  'Pillar hub and topic cluster architecture',
                  'Answer engine optimisation (AEO)',
                  'Google AI Overview optimisation',
                  'ChatGPT and Perplexity citation tracking',
                  'State-level content for multi-location',
                  'llms.txt + GPTBot / ClaudeBot directives',
                ].map(item => (
                  <li key={item} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    fontFamily: 'var(--font-body)', fontSize: 13.5, color: SECONDARY,
                  }}>
                    <span style={{ width: 5, height: 5, background: `rgba(${BLUE_RGB},0.7)`, flexShrink: 0 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 07 PLANS ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24, marginBottom: 52 }}>
            <div>
              <div style={{ marginBottom: 24 }}><SectionEyebrow n="06" label="Plans" /></div>
              <H2>
                Start with an audit.<br />
                <span style={{ color: BLUE }}>Scale when it moves.</span>
              </H2>
            </div>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 16px',
              background: `rgba(${ORANGE_RGB},0.1)`,
              border: `1px solid rgba(${ORANGE_RGB},0.35)`,
              borderRadius: 999,
              fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600,
              color: ORANGE, letterSpacing: '0.1em',
            }}>
              NO LOCK-IN CONTRACTS
            </span>
          </div>

          <div className="seo-plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
            {SVC.pricingTiers.map((t, i) => {
              const featured = i === 2
              const accentRgb = i === 0 ? BLUE_RGB : i === 1 ? SAGE_RGB : BLUE_RGB
              return (
                <div key={t.name} style={{
                  background: featured ? `rgba(${BLUE_RGB},0.07)` : CHARCOAL,
                  border: `1px solid rgba(250,249,245,${featured ? '0.14' : '0.09'})`,
                  borderTop: `3px solid rgba(${accentRgb},0.65)`,
                  borderRadius: 14,
                  padding: '36px 32px',
                  boxShadow: featured ? `6px 6px 0 0 rgba(${BLUE_RGB},0.25)` : 'none',
                  display: 'flex', flexDirection: 'column', gap: 0,
                }}>
                  {featured && (
                    <span style={{
                      display: 'inline-block', padding: '3px 10px',
                      background: `rgba(${BLUE_RGB},0.15)`,
                      border: `1px solid rgba(${BLUE_RGB},0.35)`,
                      borderRadius: 999, marginBottom: 18,
                      fontFamily: 'var(--font-display)', fontSize: 10,
                      fontWeight: 600, color: BLUE, letterSpacing: '0.12em',
                      alignSelf: 'flex-start',
                    }}>
                      MOST POPULAR
                    </span>
                  )}
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: `rgb(${accentRgb})`, margin: '0 0 8px',
                  }}>
                    {t.tag}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-display)', fontWeight: 500,
                    fontSize: 24, color: OFF_WHITE, margin: '0 0 6px',
                    letterSpacing: '-0.02em',
                  }}>
                    {t.name}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-mono)', fontSize: 13,
                    color: `rgb(${accentRgb})`, margin: '0 0 20px',
                  }}>
                    {t.priceFrom}
                  </p>
                  <div style={{ height: 1, background: FAINT, margin: '0 0 20px' }} />
                  <p style={{
                    fontFamily: 'var(--font-body)', fontSize: 14,
                    color: SECONDARY, margin: '0 0 24px', lineHeight: 1.7, flexGrow: 1,
                  }}>
                    {t.desc}
                  </p>
                  <PillCTA
                    label="Book a call"
                    href="https://cal.com/luke-marinovic-aqeosc/30min"
                    tone={i === 0 ? 'sage' : 'blue'}
                    compact
                  />
                </div>
              )
            })}
          </div>

          {/* What a plan looks like */}
          <div style={{
            marginTop: 40,
            background: CHARCOAL,
            border: `1px solid rgba(250,249,245,0.09)`,
            borderLeft: `3px solid rgba(${ORANGE_RGB},0.5)`,
            borderRadius: 14,
            padding: '36px 40px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }} className="seo-plan-detail-grid">
              <div>
                <p style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 11, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: ORANGE, margin: '0 0 14px',
                }}>
                  What a plan looks like
                </p>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(18px, 1.8vw, 24px)', lineHeight: 1.2,
                  letterSpacing: '-0.02em', color: OFF_WHITE,
                  margin: '0 0 14px',
                }}>
                  Everything is documented.<br />Nothing surprises you.
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: SECONDARY, margin: 0, lineHeight: 1.7,
                }}>
                  Every engagement starts with a scoping call and ends with a written brief. You approve the cluster architecture before a word is written. Pricing is agreed before work starts.
                </p>
              </div>
              <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 10 }}>
                {[
                  { n: '01', step: 'Scoping call (30 min)',       detail: 'We map your current state, target queries, and competitors.' },
                  { n: '02', step: 'Audit report delivered',      detail: 'Written breakdown with prioritised actions and a 90-day roadmap.' },
                  { n: '03', step: 'Cluster architecture approved', detail: 'You review the topic map before any content is drafted.' },
                  { n: '04', step: 'Content and retrofits built', detail: 'Delivered in batches with schema and internal links wired in.' },
                  { n: '05', step: 'Live, indexed, reported',     detail: 'Monthly report: rankings, AI citations, organic traffic attribution.' },
                ].map(s => (
                  <li key={s.n} style={{
                    display: 'grid', gridTemplateColumns: '28px 1fr', gap: 14,
                    background: 'rgba(255,255,255,0.025)',
                    border: `1px solid rgba(250,249,245,0.07)`,
                    borderRadius: 10, padding: '13px 16px',
                  }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: ORANGE, marginTop: 2 }}>
                      {s.n}
                    </span>
                    <div>
                      <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 14, color: OFF_WHITE, margin: '0 0 4px' }}>{s.step}</p>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: SECONDARY, margin: 0, lineHeight: 1.55 }}>{s.detail}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ── 08 FOLLOW-UPS / REPORTING ────────────────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '96px var(--page-pad)', borderTop: `1px solid ${FAINT}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="seo-followup-grid">
          <div>
            <div style={{ marginBottom: 24 }}><SectionEyebrow n="07" label="Ongoing reporting" /></div>
            <H2 style={{ marginBottom: 20 }}>
              Monthly proof.<br />
              <span style={{ color: BLUE }}>No surprises.</span>
            </H2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
              color: SECONDARY, margin: '0 0 32px',
            }}>
              Every month, a plain-English report lands in your inbox covering exactly what moved, what was published, and what is next. You see the compound effect building.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: 12 }}>
              {[
                { label: 'Google ranking movements',    sub: 'Target queries tracked weekly, reported monthly' },
                { label: 'AI citation tracking',        sub: 'ChatGPT, Perplexity, Google AI Overview appearances' },
                { label: 'Organic pipeline attribution',sub: 'Which pages brought which enquiries' },
                { label: 'Priority actions for next month', sub: 'What we are building or fixing in the next cycle' },
              ].map(r => (
                <li key={r.label} style={{
                  display: 'flex', alignItems: 'flex-start', gap: 14,
                  padding: '14px 0',
                  borderBottom: `1px solid rgba(250,249,245,0.06)`,
                }}>
                  <span style={{ width: 7, height: 7, background: BLUE, borderRadius: 1, marginTop: 6, flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 14.5, color: OFF_WHITE, margin: '0 0 4px' }}>{r.label}</p>
                    <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: SECONDARY, margin: 0 }}>{r.sub}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Report mockup */}
          <BrowserMockup
            height={440}
            label="Monthly search report — screenshot coming soon"
            url="undercurrentautomations.com / report / may-2026"
          />
        </div>
      </section>

      {/* ── 09 FAQ ───────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px var(--page-pad)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '300px 1fr', gap: 80, alignItems: 'start' }} className="seo-faq-grid">
          <div style={{ position: 'sticky', top: '28vh' }}>
            <div style={{ marginBottom: 24 }}><SectionEyebrow n="08" label="FAQ" /></div>
            <H2 style={{ fontSize: 'clamp(26px, 2.6vw, 38px)', marginBottom: 18 }}>
              Common questions.
            </H2>
            <p style={{
              fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
              color: SECONDARY, margin: '0 0 32px',
            }}>
              Straight answers on how we work, what it costs, and when you see results.
            </p>
            <PillCTA label="Ask us directly" href="https://cal.com/luke-marinovic-aqeosc/30min" tone="blue" />
          </div>

          <div style={{ display: 'grid', gap: 10 }}>
            {SVC.faqs.map((f, i) => (
              <div key={i} style={{
                background: CHARCOAL,
                border: `1px solid rgba(250,249,245,0.09)`,
                borderRadius: 12, padding: '24px 28px',
              }}>
                <h3 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 16, lineHeight: 1.3, letterSpacing: '-0.01em',
                  color: OFF_WHITE, margin: '0 0 12px',
                }}>
                  {f.q}
                </h3>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: SECONDARY, margin: 0, lineHeight: 1.7,
                }}>
                  {f.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10 CLOSING CTA ───────────────────────────────────────────────── */}
      <section style={{ padding: '120px var(--page-pad)', position: 'relative', overflow: 'hidden', background: CHARCOAL, borderTop: `1px solid ${FAINT}` }}>
        <div aria-hidden style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 640, height: 640, borderRadius: '50%',
          background: `radial-gradient(circle, rgba(${BLUE_RGB},0.10) 0%, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
          <div style={{ marginBottom: 24 }}><SectionEyebrow n="09" label="Get started" /></div>
          <H2 style={{ fontSize: 'clamp(32px, 3.8vw, 58px)', maxWidth: 700, marginBottom: 20, margin: '0 auto 20px' }}>
            {SVC.ctaHeadline}
          </H2>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 16, lineHeight: 1.7,
            color: SECONDARY, margin: '0 auto 44px', maxWidth: 540,
          }}>
            {SVC.ctaCopy}
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <PillCTA label="Book a scoping call" href="https://cal.com/luke-marinovic-aqeosc/30min" tone="blue" large />
            <Link href="/audit" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              padding: '15px 30px', borderRadius: 999,
              border: `1px solid ${FAINT}`, background: 'transparent',
              color: OFF_WHITE, textDecoration: 'none',
              fontFamily: 'var(--font-display)', fontSize: 15, fontWeight: 500,
              letterSpacing: '-0.01em',
            }}>
              Free SEO audit <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 1080px) {
          .seo-plans-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 900px) {
          .seo-stats { grid-template-columns: repeat(2, 1fr) !important; }
          .seo-diff-grid { grid-template-columns: 1fr !important; }
          .seo-coverage-grid { grid-template-columns: 1fr !important; }
          .seo-followup-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          .seo-faq-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .seo-faq-grid > div:first-child { position: static !important; }
          .seo-plan-detail-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
        @media (max-width: 640px) {
          .seo-stats { grid-template-columns: 1fr !important; }
          .seo-plans-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
