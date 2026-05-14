// Services hub — C7 "Portrait Grid · Glow Bloom" promoted to /services.
// Two sections: DEEP header, CHARCOAL services + discovery.
// Padding uses var(--page-pad) so it aligns with the rest of the site.

import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import PillCTA from '@/components/ui/PillCTA'
import { SERVICES_V2, SERVICES_SCHEMA } from '@/lib/data/services-v2'

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
const MUTED      = 'rgba(250,249,245,0.60)'
const FAINT      = 'rgba(250,249,245,0.09)'

const ACCENTS = {
  blue:   { hex: BLUE,   rgb: BLUE_RGB   },
  sage:   { hex: SAGE,   rgb: SAGE_RGB   },
  orange: { hex: ORANGE, rgb: ORANGE_RGB },
}

const SERVICES = SERVICES_V2.map(s => {
  const a = ACCENTS[s.accent]
  return {
    num: s.num,
    name: s.name,
    accent: a.hex,
    ar: a.rgb,
    tagline: s.tagline,
    desc: s.desc,
    bullets: s.bullets,
    href: `/${s.slug}`,
  }
})

export const metadata = {
  title: 'Services',
  description: 'Four spokes covering search visibility, website design, custom integrations, and AI strategy and training for Australian small businesses.',
  alternates: { canonical: 'https://undercurrentautomations.com/services' },
  openGraph: {
    title: 'Services | UnderCurrent Automations',
    description: 'Four spokes covering search visibility, website design, custom integrations, and AI strategy and training for Australian small businesses.',
    url: 'https://undercurrentautomations.com/services',
    type: 'website',
    images: ['/brand/og-card.png'],
  },
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
          Four spokes covering every layer of your operation. Most teams start with a Discovery session to find their highest-leverage entry point.
        </p>
      </header>

      {/* ── SECTION 2: DISCOVERY + SERVICES — charcoal ── */}
      <section style={{ background: CHARCOAL, borderTop: `1px solid ${FAINT}` }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '72px var(--page-pad) 100px' }}>
          <div className="c7-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>

            {/* Discovery — spans full width */}
            <Link
              href="https://cal.com/luke-marinovic-aqeosc/30min"
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
                  color: ORANGE, margin: 0,
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
                  <span aria-hidden="true" className="c7-cta" style={{ opacity: 0.32 }}>
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
                  lineHeight: 1.5, color: `rgb(${s.ar})`,
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
          <PillCTA label="Let's talk" href="https://cal.com/luke-marinovic-aqeosc/30min" large />
        </div>
      </section>
    </div>
  )
}
