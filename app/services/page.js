// Services hub — C7 "Portrait Grid · Glow Bloom" promoted to /services.
// Two sections: DEEP header, CHARCOAL services + discovery.
// Padding uses var(--page-pad) so it aligns with the rest of the site.

import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import PillCTA from '@/components/ui/PillCTA'
import { SERVICES_SCHEMA } from '@/lib/data/services-v2'

const ORANGE     = '#E07A55'
const ORANGE_RGB = '224,122,85'
const SAGE       = '#8FAF9F'
const SAGE_RGB   = '143,175,159'
const BLUE       = '#6A8DAD'
const BLUE_RGB   = '106,141,173'
const DEEP       = '#121210'
const CHARCOAL   = '#1C1C1A'
const OFF_WHITE  = 'rgba(250,249,245,0.88)'
const SECONDARY  = 'rgba(250,249,245,0.55)'
const MUTED      = 'rgba(250,249,245,0.38)'
const FAINT      = 'rgba(250,249,245,0.09)'

// Six services. `href` points to the live detail page where one exists,
// otherwise to a future top-level slug — update when detail pages are built.
// Per vault SEO rules, future URLs follow the same /{slug} pattern as
// existing services so the [slug] dispatcher picks them up once added to
// lib/data/services.js.
const SERVICES = [
  {
    num: '01', name: 'Lead Generation', accent: BLUE, ar: BLUE_RGB,
    tagline: 'Fill your pipeline without the manual grind.',
    desc: 'AI cold email, outbound sequences, and content systems that bring qualified buyers to you — on repeat.',
    bullets: ['AI cold-email at scale', 'Outbound that follows up', 'Content that compounds'],
    href: '/inbound-lead-management-melbourne',
  },
  {
    num: '02', name: 'Revenue Operations', accent: ORANGE, ar: ORANGE_RGB,
    tagline: 'Close more. Keep more. Grow faster.',
    desc: 'CRM, automated follow-up, proposal workflows, and pipeline reporting — no lead slips through.',
    bullets: ['CRM hygiene & setup', 'AI nurture sequences', 'Pipeline views that get opened'],
    href: '/sales-automation',
  },
  {
    num: '03', name: 'Website Experience Design', accent: SAGE, ar: SAGE_RGB,
    tagline: 'The face of your business, built to convert.',
    desc: 'Websites, portals, booking systems, and dashboards. Built for performance, built for trust.',
    bullets: ['Marketing sites', 'Interactive demos', 'Booking & client portals'],
    href: '/website-design',
  },
  {
    num: '04', name: 'SEO & AI Visibility', accent: BLUE, ar: BLUE_RGB,
    tagline: 'Rank everywhere your buyers are looking.',
    desc: 'Classic SEO plus AEO and GEO — earning rankings in Google and citations in ChatGPT and Claude.',
    bullets: ['Classic SEO foundations', 'Answer-engine presence (AEO)', 'Generative search (GEO)'],
    href: '/seo-ai-visibility',
  },
  {
    num: '05', name: 'AI Strategy & Training', accent: ORANGE, ar: ORANGE_RGB,
    tagline: 'The right tools. The right way.',
    desc: 'Roadmaps, tool selection, and hands-on training so your team uses AI with confidence.',
    bullets: ['90-day AI roadmaps', 'Team workshops', 'Tool-selection audits'],
    href: '/ai-strategy-training',
  },
  {
    num: '06', name: 'Custom Integrations', accent: SAGE, ar: SAGE_RGB,
    tagline: 'Connect everything.',
    desc: "If your tools don't talk, we fix it. n8n, Make, Zapier, direct APIs — wired and built to last.",
    bullets: ['Bespoke API integrations', 'Multi-tool agent systems', 'Automations built to last'],
    href: '/custom-integrations',
  },
]

export const metadata = {
  title: 'Services',
  description: 'Six automation disciplines for Australian small businesses — lead generation, revenue operations, frontend experiences, SEO and discovery, AI strategy, and custom integrations.',
  alternates: { canonical: 'https://undercurrentautomations.com/services' },
}

const BREADCRUMB_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: 'https://undercurrentautomations.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://undercurrentautomations.com/services' },
  ],
}

export default function ServicesPage() {
  return (
    <div style={{ background: DEEP, minHeight: '100vh', color: OFF_WHITE }}>
      <JsonLd schema={SERVICES_SCHEMA} />
      <JsonLd schema={BREADCRUMB_SCHEMA} />

      <style>{`
        .c7-card {
          transition:
            transform 280ms ease,
            box-shadow 280ms ease,
            background 280ms ease,
            border-color 280ms ease;
        }
        .c7-card:hover {
          transform: translate(-3px, -3px);
          background: rgba(var(--ca), 0.05) !important;
          box-shadow: 6px 6px 0 0 rgb(var(--ca));
          border-color: rgba(var(--ca), 0.32) !important;
          border-left-color: rgb(var(--ca)) !important;
        }
        .c7-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: transform 240ms ease, opacity 240ms ease;
        }
        .c7-card:hover .c7-cta {
          transform: translateX(5px);
          opacity: 1 !important;
        }
        .c7-num {
          transition: color 280ms ease;
        }
        .c7-card:hover .c7-num {
          color: rgb(var(--ca)) !important;
        }
        .c7-disc {
          transition: background 250ms ease, box-shadow 250ms ease;
        }
        .c7-disc:hover {
          transform: translate(-3px, -3px);
          background: rgba(${ORANGE_RGB}, 0.08) !important;
          box-shadow: 6px 6px 0 0 ${ORANGE};
        }
        @media (max-width: 900px) {
          .c7-grid { grid-template-columns: 1fr !important; }
          .c7-disc { grid-template-columns: 1fr !important; gap: 24px !important; }
          .c7-cta-strip { flex-direction: column !important; align-items: flex-start !important; }
        }
      `}</style>

      {/* ── SECTION 1: HEADER — deep black ──────────────── */}
      <header style={{ maxWidth: 1280, margin: '0 auto', padding: '100px var(--page-pad)' }}>
        <p style={{
          fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 500,
          letterSpacing: '0.14em', color: MUTED,
          textTransform: 'uppercase', margin: '0 0 36px',
        }}>
          Our Services
        </p>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 500,
          fontSize: 'clamp(52px, 6vw, 88px)', lineHeight: 0.97,
          letterSpacing: '-0.04em', color: OFF_WHITE, margin: '0 0 28px',
        }}>
          The full stack.<br />
          <span style={{ color: SAGE }}>Built to compound.</span>
        </h1>
        <p style={{
          fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.65,
          color: SECONDARY, margin: 0, maxWidth: 520,
        }}>
          Six disciplines covering every layer of your operation. Most teams start with a Discovery session to find their highest-leverage entry point.
        </p>
      </header>

      {/* ── SECTION 2: DISCOVERY + SERVICES — charcoal ── */}
      <section style={{ background: CHARCOAL, borderTop: `1px solid ${FAINT}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px var(--page-pad) 100px' }}>
          <div className="c7-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>

            {/* Discovery — spans full width */}
            <Link
              href="/contact"
              className="c7-disc"
              style={{
                gridColumn: '1 / -1',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 56,
                alignItems: 'center',
                textDecoration: 'none',
                color: 'inherit',
                background: `rgba(${ORANGE_RGB}, 0.06)`,
                border: `1px solid rgba(${ORANGE_RGB}, 0.18)`,
                borderLeft: `3px solid ${ORANGE}`,
                borderRadius: 16,
                padding: '48px 52px 48px 49px',
              }}
            >
              <div>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600,
                  letterSpacing: '0.14em', color: ORANGE,
                  border: `1px solid rgba(${ORANGE_RGB}, 0.35)`,
                  padding: '4px 12px', display: 'inline-block', marginBottom: 24,
                }}>
                  START HERE
                </span>
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(44px, 5vw, 68px)', lineHeight: 1.0,
                  letterSpacing: '-0.04em', color: OFF_WHITE, margin: '0 0 12px',
                }}>
                  Discovery
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 14,
                  color: `rgba(${ORANGE_RGB}, 0.72)`, margin: 0,
                }}>
                  We map before we build.
                </p>
              </div>
              <div>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
                  color: SECONDARY, margin: '0 0 28px',
                }}>
                  A structured audit of your entire operation — where time is being lost, where money is leaking, and where automation delivers the fastest return on effort.
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13, lineHeight: 1.6,
                  color: SECONDARY, margin: '0 0 24px',
                  paddingTop: 24,
                  borderTop: `1px solid rgba(${ORANGE_RGB}, 0.14)`,
                }}>
                  Every engagement starts here. A 90-minute session with a full written report and prioritised automation roadmap.
                </p>
                <span style={{
                  fontFamily: 'var(--font-display)', fontSize: 12, fontWeight: 600,
                  color: ORANGE, letterSpacing: '0.08em',
                }}>
                  BOOK A SESSION →
                </span>
              </div>
            </Link>

            {/* 6 portrait cards */}
            {SERVICES.map((s) => (
              <Link
                key={s.num}
                href={s.href}
                className="c7-card"
                style={{
                  '--ca': s.ar,
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  color: 'inherit',
                  background: DEEP,
                  border: `1px solid ${FAINT}`,
                  borderLeft: `3px solid rgba(${s.ar}, 0.35)`,
                  borderRadius: 16,
                  padding: '36px 36px 40px 33px',
                }}
              >
                {/* Number + explore row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
                  <span
                    className="c7-num"
                    style={{
                      fontFamily: 'var(--font-mono)', fontSize: 11,
                      color: MUTED, letterSpacing: '0.12em',
                    }}
                  >
                    {s.num}
                  </span>
                  <span className="c7-cta" style={{ opacity: 0.32 }}>
                    <span style={{
                      fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600,
                      color: `rgb(${s.ar})`, letterSpacing: '0.1em',
                    }}>
                      EXPLORE →
                    </span>
                  </span>
                </div>

                {/* Name */}
                <h2 style={{
                  fontFamily: 'var(--font-display)', fontWeight: 500,
                  fontSize: 'clamp(24px, 2.4vw, 34px)', lineHeight: 1.08,
                  letterSpacing: '-0.03em', color: OFF_WHITE,
                  margin: '0 0 12px',
                }}>
                  {s.name}
                </h2>

                {/* Tagline */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  lineHeight: 1.5, color: `rgba(${s.ar}, 0.85)`,
                  margin: '0 0 20px', fontWeight: 500,
                }}>
                  {s.tagline}
                </p>

                {/* Divider */}
                <div style={{ height: 1, background: FAINT, margin: '0 0 20px' }} />

                {/* Description */}
                <p style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  lineHeight: 1.65, color: SECONDARY,
                  margin: '0 0 24px', flexGrow: 1,
                }}>
                  {s.desc}
                </p>

                {/* Bullets */}
                <ul style={{
                  margin: 0, padding: 0, listStyle: 'none',
                  display: 'flex', flexDirection: 'column', gap: 9,
                }}>
                  {s.bullets.map((b, i) => (
                    <li key={i} style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      fontFamily: 'var(--font-body)', fontSize: 12,
                      color: SECONDARY,
                    }}>
                      <span style={{
                        width: 6, height: 6,
                        background: `rgba(${s.ar}, 0.7)`,
                        flexShrink: 0,
                      }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA STRIP — deep black ───────────────────────── */}
      <section style={{ background: DEEP, borderTop: `1px solid ${FAINT}` }}>
        <div
          className="c7-cta-strip"
          style={{
            maxWidth: 1280, margin: '0 auto',
            padding: '64px var(--page-pad)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'space-between', gap: 40,
          }}
        >
          <div>
            <p style={{
              fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 500,
              letterSpacing: '0.14em', color: MUTED,
              textTransform: 'uppercase', margin: '0 0 12px',
            }}>
              Not sure where to start
            </p>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontWeight: 500,
              fontSize: 'clamp(20px, 2.2vw, 32px)', lineHeight: 1.1,
              letterSpacing: '-0.025em', color: OFF_WHITE,
              margin: 0, maxWidth: 440,
            }}>
              30 minutes. A full picture of where automation fits your business.
            </h2>
          </div>
          <PillCTA label="Let's talk" href="/contact" large />
        </div>
      </section>
    </div>
  )
}
