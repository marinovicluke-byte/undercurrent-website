// Location page renderer. Server component, no client hooks needed — the only
// interactive pieces are the FAQ <details> accordion (native HTML) and the
// PillCTA leaf, which is itself client-only. Animations and grain canvases
// from the old sage/parchment design have been dropped in favour of v2
// primitives (uc-glow-word, uc-pop-*, hard offset shadows, SectionEyebrow).
// Design reference: app/page.js, app/about/page.js, app/services/page.js.

import Link from 'next/link'
import PillCTA from '@/components/ui/PillCTA'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const ACCENTS = {
  blue:   { rgb: '106, 141, 173', light: '138, 174, 200', hex: '#6A8DAD' },
  sage:   { rgb: '143, 175, 159', light: '168, 196, 184', hex: '#8FAF9F' },
  orange: { rgb: '224, 122, 85',  light: '236, 158, 128', hex: '#E07A55' },
}

const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

// ────────────────────────────────────────────────────────────────────────────
// Hero
// ────────────────────────────────────────────────────────────────────────────
function Hero({ location }) {
  const accent = ACCENTS[location.heroAccent || 'blue']

  return (
    <section
      style={{
        position: 'relative',
        background: 'var(--charcoal-deep)',
        padding: 'clamp(96px, 14vh, 160px) var(--page-pad) clamp(80px, 12vh, 140px)',
        borderBottom: '1px solid var(--text-faint)',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0, position: 'relative', zIndex: 2 }}>
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: 'var(--font-display)',
            fontSize: 12,
            color: 'var(--text-muted)',
            letterSpacing: '-0.005em',
            marginBottom: 40,
          }}
        >
          <Link href="/" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>
            Home
          </Link>
          <span aria-hidden style={{ color: 'var(--text-faint)' }}>/</span>
          <span style={{ color: 'var(--off-white)' }}>AI Automation {location.city}</span>
        </nav>

        {/* Eyebrow */}
        <div style={{ marginBottom: 36 }}>
          <SectionEyebrow n="00" label={location.heroPill} />
        </div>

        {/* H1 */}
        <h1
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(44px, 8vw, 104px)',
            lineHeight: 1.0,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 1100,
          }}
        >
          {location.heroHeadline1}{' '}
          <span
            className={`uc-glow-word uc-glow-word--${location.heroAccent || 'blue'}`}
          >
            {location.heroHeadline2}
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            margin: '32px 0 0',
            maxWidth: 640,
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          {location.heroCopy}
        </p>

        {/* CTAs + stat chips */}
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 16,
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          <PillCTA label="Book a Workflow Review" href={CTA_HREF} tone={location.heroAccent || 'blue'} large external />
          <Link
            href="/audit"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              borderBottom: '1px solid var(--text-faint)',
              paddingBottom: 3,
              letterSpacing: '-0.005em',
            }}
          >
            See what you&rsquo;re missing →
          </Link>
        </div>

        {/* Stat band */}
        {location.heroStats && location.heroStats.length > 0 && (
          <div
            style={{
              marginTop: 72,
              paddingTop: 32,
              borderTop: '1px solid var(--text-faint)',
              display: 'grid',
              gridTemplateColumns: `repeat(${location.heroStats.length}, 1fr)`,
              gap: 32,
              maxWidth: 820,
            }}
          >
            {location.heroStats.map((s, i) => (
              <div key={i}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 600,
                    fontSize: 'clamp(26px, 3.2vw, 38px)',
                    letterSpacing: '-0.03em',
                    color: `rgb(${accent.light})`,
                    lineHeight: 1,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: 'var(--font-body)',
                    fontSize: 13,
                    color: 'var(--text-muted)',
                    lineHeight: 1.45,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Industries — 4-card grid, one accent per card rotating blue, sage, blue,
// orange. Matches the services-hub portrait card grid (app/services/page.js).
// ────────────────────────────────────────────────────────────────────────────
const INDUSTRY_ACCENT_ORDER = ['blue', 'sage', 'blue', 'orange']

function IndustryCard({ industry, idx }) {
  const accent = ACCENTS[INDUSTRY_ACCENT_ORDER[idx] || 'blue']
  return (
    <article
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        borderLeft: `3px solid rgba(${accent.rgb}, 0.75)`,
        borderRadius: 14,
        padding: '34px 34px 36px 31px',
        minHeight: 320,
      }}
    >
      {/* num + label row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 28,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            letterSpacing: '0.12em',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 10,
            fontWeight: 600,
            color: `rgb(${accent.light})`,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          {industry.label}
        </span>
      </div>

      {/* Headline */}
      <h3
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(22px, 2.2vw, 28px)',
          lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: 'var(--off-white)',
        }}
      >
        {industry.headline}
      </h3>

      {/* Body */}
      <p
        style={{
          margin: '16px 0 0',
          fontFamily: 'var(--font-body)',
          fontSize: 14.5,
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
          flexGrow: 1,
        }}
      >
        {industry.copy}
      </p>

      {/* Bullets */}
      {industry.bullets && industry.bullets.length > 0 && (
        <ul
          style={{
            margin: '22px 0 0',
            padding: 0,
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            paddingTop: 22,
            borderTop: '1px solid var(--text-faint)',
          }}
        >
          {industry.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                fontFamily: 'var(--font-body)',
                fontSize: 13.5,
                color: 'var(--text-secondary)',
                lineHeight: 1.5,
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 6,
                  height: 6,
                  background: `rgb(${accent.light})`,
                  flexShrink: 0,
                  marginTop: 7,
                }}
              />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

function Industries({ location }) {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 36 }}>
          <SectionEyebrow n="01" label={location.industriesLabel || 'Who we help'} />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          {location.industriesHeadlineLead}{' '}
          {location.industriesHeadlineGlow && (
            <span
              className={`uc-glow-word uc-glow-word--${location.industriesHeadlineAccent || 'sage'}`}
            >
              {location.industriesHeadlineGlow}
            </span>
          )}
          {location.industriesHeadlineTail}
        </h2>

        <p
          style={{
            margin: '22px 0 0',
            maxWidth: 680,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
          }}
        >
          {location.industriesCopy}
        </p>

        <div
          className="uc-loc-industries"
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20,
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .uc-loc-industries { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {location.industries.map((ind, i) => (
            <IndustryCard key={ind.label} industry={ind} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Benefits — 4-column grid mirroring homepage Process.js card style.
// ────────────────────────────────────────────────────────────────────────────
function BenefitCard({ benefit, idx }) {
  return (
    <article
      style={{
        padding: '28px 28px 30px',
        borderRadius: 14,
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        boxShadow: '4px 4px 0 0 var(--text-faint)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 260,
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'var(--off-white)',
          color: 'var(--charcoal-deep)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
        }}
      >
        {String(idx + 1).padStart(2, '0')}
      </span>
      <h3
        style={{
          margin: '24px 0 12px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 19,
          letterSpacing: '-0.02em',
          color: 'var(--off-white)',
          lineHeight: 1.25,
        }}
      >
        {benefit.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
        }}
      >
        {benefit.copy}
      </p>
    </article>
  )
}

function Benefits({ location }) {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 36 }}>
          <SectionEyebrow n="02" label={location.benefitsLabel || 'What you get'} />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          {location.benefitsHeadlineLead}{' '}
          {location.benefitsHeadlineGlow && (
            <span
              className={`uc-glow-word uc-glow-word--${location.benefitsHeadlineAccent || 'blue'}`}
            >
              {location.benefitsHeadlineGlow}
            </span>
          )}
          {location.benefitsHeadlineTail}
        </h2>

        <div
          className="uc-stack-4col"
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
          }}
        >
          {location.benefits.map((b, i) => (
            <BenefitCard key={b.title} benefit={b} idx={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Process — 3 steps matching homepage Process.js
// ────────────────────────────────────────────────────────────────────────────
function ProcessStep({ step, idx }) {
  return (
    <article
      style={{
        padding: '30px 30px 32px',
        borderRadius: 14,
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        boxShadow: '4px 4px 0 0 var(--text-faint)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 260,
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'var(--off-white)',
          color: 'var(--charcoal-deep)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: 12,
          fontWeight: 600,
          fontVariantNumeric: 'tabular-nums',
          flexShrink: 0,
        }}
      >
        {step.num}
      </span>
      <h3
        style={{
          margin: '24px 0 12px',
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 20,
          letterSpacing: '-0.015em',
          color: 'var(--off-white)',
          lineHeight: 1.25,
        }}
      >
        {step.title}
      </h3>
      <p
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: 'var(--text-secondary)',
          lineHeight: 1.55,
        }}
      >
        {step.body}
      </p>
    </article>
  )
}

function Process({ location }) {
  const defaultSteps = [
    { num: '01', title: 'Workflow review', body: 'A free 30-minute session where we map every repetitive task in your business, rank by time saved, and show you exactly what automation looks like.' },
    { num: '02', title: 'Fixed-price build', body: 'Scope, timeline, fixed price. No surprises, no hourly billing. Built inside tools you already use, live within 14 days.' },
    { num: '03', title: 'Handoff and handle', body: 'You get a documented, running system plus an optional retainer for monitoring and iteration. Most clients see compounding returns.' },
  ]
  const steps = location.processSteps && location.processSteps.length ? location.processSteps : defaultSteps

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 36 }}>
          <SectionEyebrow n="03" label={location.processLabel || 'How we work'} />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          {location.processHeadlineLead}{' '}
          {location.processHeadlineGlow && (
            <span
              className={`uc-glow-word uc-glow-word--${location.processHeadlineAccent || 'sage'}`}
            >
              {location.processHeadlineGlow}
            </span>
          )}
          {location.processHeadlineTail}
        </h2>

        {location.processCopy && (
          <p
            style={{
              margin: '22px 0 0',
              maxWidth: 640,
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
            }}
          >
            {location.processCopy}
          </p>
        )}

        <div
          className="uc-loc-process"
          style={{
            marginTop: 56,
            display: 'grid',
            gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
            gap: 16,
          }}
        >
          <style>{`
            @media (max-width: 900px) {
              .uc-loc-process { grid-template-columns: 1fr !important; }
            }
          `}</style>
          {steps.map((s, i) => <ProcessStep key={s.num || i} step={s} idx={i} />)}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Comparison — single FlatPanel-style card with hard offset shadow.
// Replaces the old wide 4-column tick-table; v2 prefers vertical density.
// ────────────────────────────────────────────────────────────────────────────
function Comparison({ location }) {
  if (!location.comparisonRows || !location.comparisonRows.length) return null
  const accent = ACCENTS[location.comparisonAccent || 'blue']

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 36 }}>
          <SectionEyebrow n="04" label={location.comparisonLabel || 'Why UnderCurrent'} />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 900,
          }}
        >
          {location.comparisonHeadlineLead}{' '}
          {location.comparisonHeadlineGlow && (
            <span
              className={`uc-glow-word uc-glow-word--${location.comparisonAccent || 'blue'}`}
            >
              {location.comparisonHeadlineGlow}
            </span>
          )}
          {location.comparisonHeadlineTail}
        </h2>

        {location.comparisonCopy && (
          <p
            style={{
              margin: '22px 0 0',
              maxWidth: 640,
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
            }}
          >
            {location.comparisonCopy}
          </p>
        )}

        <article
          style={{
            marginTop: 56,
            padding: 'clamp(24px, 3vw, 36px)',
            borderRadius: 14,
            background: 'var(--charcoal)',
            border: '1px solid var(--text-faint)',
            boxShadow: `6px 6px 0 0 rgb(${accent.rgb})`,
          }}
        >
          <div style={{ overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                borderCollapse: 'separate',
                borderSpacing: 0,
                minWidth: 560,
              }}
            >
              <thead>
                <tr>
                  <th style={{ padding: '0 0 20px', width: '42%' }} />
                  {location.comparisonColumns.map((col, i) => (
                    <th
                      key={col}
                      style={{
                        padding: '0 10px 20px',
                        textAlign: 'center',
                        fontFamily: 'var(--font-display)',
                        fontWeight: i === 0 ? 600 : 500,
                        fontSize: i === 0 ? 13 : 12,
                        letterSpacing: i === 0 ? '-0.005em' : '0.08em',
                        textTransform: i === 0 ? 'none' : 'uppercase',
                        color: i === 0 ? 'var(--off-white)' : 'var(--text-muted)',
                      }}
                    >
                      {i === 0 ? (
                        <span
                          style={{
                            display: 'inline-block',
                            background: 'var(--off-white)',
                            color: 'var(--charcoal-deep)',
                            padding: '6px 16px',
                            borderRadius: 999,
                            fontSize: 13,
                          }}
                        >
                          {col}
                        </span>
                      ) : (
                        col
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {location.comparisonRows.map((row, ri) => (
                  <tr key={ri}>
                    <td
                      style={{
                        padding: '14px 0',
                        borderTop: '1px solid var(--text-faint)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 14,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.45,
                      }}
                    >
                      {row.label}
                    </td>
                    {[row.uc, row.manual, row.generic, row.agency].map((val, ci) => (
                      <td
                        key={ci}
                        style={{
                          borderTop: '1px solid var(--text-faint)',
                          textAlign: 'center',
                          padding: '14px 10px',
                          background: ci === 0 ? `rgba(${accent.rgb}, 0.06)` : 'transparent',
                        }}
                      >
                        {val ? (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-label="Yes"
                            style={{ display: 'inline-block' }}
                          >
                            <circle cx="10" cy="10" r="9" stroke={`rgb(${accent.light})`} strokeWidth="1.2" />
                            <path d="M6 10l3 3 5-5" stroke={`rgb(${accent.light})`} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        ) : (
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            aria-label="No"
                            style={{ display: 'inline-block' }}
                          >
                            <circle cx="10" cy="10" r="9" stroke="var(--text-faint)" strokeWidth="1.2" />
                            <path d="M7 13l6-6M13 13l-6-6" stroke="var(--text-muted)" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// FAQ — native <details> accordion styled like homepage FAQ.js
// ────────────────────────────────────────────────────────────────────────────
function FAQ({ location }) {
  const accent = ACCENTS[location.faqAccent || 'sage']

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 36 }}>
          <SectionEyebrow n="05" label={location.faqLabel || 'Common questions'} />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.6vw, 64px)',
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 1000,
          }}
        >
          {location.faqHeadlineLead}{' '}
          {location.faqHeadlineGlow && (
            <span
              className={`uc-glow-word uc-glow-word--${location.faqAccent || 'sage'}`}
            >
              {location.faqHeadlineGlow}
            </span>
          )}
          {location.faqHeadlineTail}
        </h2>

        {location.faqCopy && (
          <p
            style={{
              margin: '22px 0 0',
              maxWidth: 640,
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
            }}
          >
            {location.faqCopy}
          </p>
        )}

        <style>{`
          .uc-loc-faq {
            margin-top: 48px;
            border-radius: 14px;
            border: 1px solid var(--text-faint);
            background: var(--charcoal);
            box-shadow: 6px 6px 0 0 rgb(${accent.rgb});
            overflow: hidden;
            max-width: 980px;
          }
          .uc-loc-faq-item + .uc-loc-faq-item { border-top: 1px solid var(--text-faint); }
          .uc-loc-faq-item > summary {
            list-style: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 18px;
            padding: 22px 26px;
          }
          .uc-loc-faq-item > summary::-webkit-details-marker { display: none; }
          .uc-loc-faq-item > summary::marker { display: none; }
          .uc-loc-faq-item > summary:hover { background: rgba(255,255,255,0.02); }
          .uc-loc-faq-item[open] > summary { background: rgba(${accent.rgb}, 0.05); }
          .uc-loc-faq-q {
            flex: 1;
            margin: 0;
            font-family: var(--font-display);
            font-weight: 500;
            font-size: 17px;
            letter-spacing: -0.015em;
            color: var(--off-white);
            line-height: 1.35;
          }
          .uc-loc-faq-icon {
            width: 22px;
            height: 22px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            color: rgb(${accent.light});
            font-size: 22px;
            font-family: var(--font-body);
            font-weight: 300;
            line-height: 1;
            flex-shrink: 0;
            transition: transform 0.2s ease;
          }
          .uc-loc-faq-item[open] .uc-loc-faq-icon { transform: rotate(45deg); }
          .uc-loc-faq-a {
            margin: 0;
            padding: 0 26px 24px;
            font-family: var(--font-body);
            font-size: 15px;
            line-height: 1.7;
            color: var(--text-secondary);
            max-width: 820px;
          }
        `}</style>

        <div className="uc-loc-faq">
          {location.faqs.map((faq, i) => (
            <details key={i} className="uc-loc-faq-item" open={i === 0}>
              <summary>
                <h3 className="uc-loc-faq-q">{faq.q}</h3>
                <span className="uc-loc-faq-icon" aria-hidden>+</span>
              </summary>
              <p className="uc-loc-faq-a">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// ClosingCTA — the one radial glow per page
// ────────────────────────────────────────────────────────────────────────────
function ClosingCTA({ location }) {
  const accent = ACCENTS[location.ctaAccent || 'blue']
  return (
    <section
      style={{
        padding: '140px var(--page-pad)',
        borderTop: '1px solid var(--text-faint)',
        background: 'var(--bg-deep)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-30%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '90%',
          pointerEvents: 'none',
          background: `radial-gradient(circle at 50% 70%, rgba(${accent.rgb}, 0.30) 0%, rgba(${accent.rgb}, 0.12) 30%, transparent 65%)`,
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
          }}
        >
          {location.ctaHeadline}
        </h2>
        <p
          style={{
            marginTop: 20,
            marginBottom: 36,
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          {location.ctaCopy}
        </p>
        <div style={{ display: 'inline-flex' }}>
          <PillCTA label="Book a Workflow Review" href={CTA_HREF} tone={location.ctaAccent || 'blue'} large external />
        </div>

        {/* Internal links strip */}
        {location.internalLinks && location.internalLinks.length > 0 && (
          <nav
            aria-label="Service pages"
            style={{
              marginTop: 72,
              paddingTop: 32,
              borderTop: '1px solid var(--text-faint)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px 28px',
              justifyContent: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 600,
                fontSize: 11,
                color: 'var(--text-muted)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              Related
            </span>
            {location.internalLinks.map(link => (
              <Link
                key={link.path}
                href={link.path}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--text-faint)',
                  paddingBottom: 2,
                  letterSpacing: '-0.005em',
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// QuickAnswer: BLUF callout block. Renders only when location.quickAnswer is
// set in the data file. AEO citation block + featured-snippet candidate.
// ────────────────────────────────────────────────────────────────────────────
function QuickAnswer({ location }) {
  if (!location.quickAnswer) return null
  const accent = ACCENTS[location.heroAccent || 'sage']
  const paragraphs = Array.isArray(location.quickAnswer)
    ? location.quickAnswer
    : [location.quickAnswer]

  return (
    <section
      id="quick-answer"
      data-aeo="quick-answer"
      style={{
        background: 'var(--charcoal-deep)',
        padding: 'clamp(80px, 12vh, 128px) var(--page-pad)',
        borderBottom: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 920, margin: 0 }}>
        <div style={{ marginBottom: 28 }}>
          <SectionEyebrow n="QA" label="The honest answer" />
        </div>
        <div
          style={{
            borderLeft: `3px solid ${accent.hex}`,
            paddingLeft: 28,
            display: 'grid',
            gap: 22,
          }}
        >
          {paragraphs.map((p, i) => (
            <p
              key={i}
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(19px, 1.9vw, 22px)',
                lineHeight: 1.65,
                color: i === 0 ? 'var(--off-white)' : 'var(--text-secondary)',
                letterSpacing: '-0.005em',
              }}
            >
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// MetroDetail: anti-doorway paragraph + regulators + stats + embedded map.
// Renders only when location.metroDetail is set. This is the section that
// makes the page genuinely scope-specific (Cat 1 + Cat 9 rubric lift).
// ────────────────────────────────────────────────────────────────────────────
function MetroDetail({ location }) {
  if (!location.metroDetail) return null
  const md = location.metroDetail
  const accent = ACCENTS[location.heroAccent || 'sage']
  const mapQuery = encodeURIComponent(location.city)

  return (
    <section
      style={{
        background: 'var(--charcoal-deep)',
        padding: 'clamp(80px, 12vh, 140px) var(--page-pad)',
        borderBottom: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>
        <div style={{ marginBottom: 32 }}>
          <SectionEyebrow n="LO" label={`${location.city}, ${location.region}`} />
        </div>

        {md.heading && (
          <h2
            style={{
              margin: '0 0 32px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4.5vw, 52px)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 900,
            }}
          >
            {md.heading}
          </h2>
        )}

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 56,
            alignItems: 'start',
          }}
        >
          <div>
            {md.body && (
              <div style={{ display: 'grid', gap: 20 }}>
                {(Array.isArray(md.body) ? md.body : [md.body]).map((p, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: 17,
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      letterSpacing: '-0.005em',
                    }}
                  >
                    {p}
                  </p>
                ))}
              </div>
            )}

            {md.stats && md.stats.length > 0 && (
              <div
                style={{
                  marginTop: 48,
                  paddingTop: 32,
                  borderTop: '1px solid var(--text-faint)',
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(md.stats.length, 3)}, 1fr)`,
                  gap: 24,
                }}
              >
                {md.stats.map((s, i) => (
                  <div key={i}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 600,
                        fontSize: 'clamp(22px, 2.6vw, 32px)',
                        letterSpacing: '-0.025em',
                        color: `rgb(${accent.light})`,
                        lineHeight: 1,
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {s.value}
                    </div>
                    <div
                      style={{
                        marginTop: 10,
                        fontFamily: 'var(--font-body)',
                        fontSize: 12,
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                      }}
                    >
                      {s.source ? (
                        <a
                          href={s.source}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}
                        >
                          {s.label}
                        </a>
                      ) : (
                        s.label
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {md.regulators && md.regulators.length > 0 && (
              <div style={{ marginTop: 40 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                    marginBottom: 14,
                  }}
                >
                  Regulators we design around
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 8 }}>
                  {md.regulators.map((r, i) => (
                    <li key={i}>
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 14,
                          color: 'var(--text-secondary)',
                          textDecoration: 'underline',
                          textDecorationColor: 'var(--text-faint)',
                        }}
                      >
                        {r.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div
            style={{
              position: 'relative',
              aspectRatio: '4/5',
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid var(--text-faint)',
              background: 'var(--charcoal)',
            }}
          >
            <iframe
              title={`Map of greater ${location.city}`}
              src={`https://www.google.com/maps?q=${mapQuery}&z=10&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, display: 'block', filter: 'grayscale(0.4) contrast(0.95)' }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// LocalProof: inline case-study reference. Renders only when
// location.localProof is set. Cat 4 (Local Proof) lift.
// ────────────────────────────────────────────────────────────────────────────
function LocalProof({ location }) {
  if (!location.localProof) return null
  const lp = location.localProof
  const accent = ACCENTS[location.heroAccent || 'sage']

  return (
    <section
      style={{
        background: 'var(--charcoal-deep)',
        padding: 'clamp(56px, 8vh, 96px) var(--page-pad)',
        borderBottom: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1000, margin: 0 }}>
        <div style={{ marginBottom: 28 }}>
          <SectionEyebrow n="PR" label={`Proof in ${location.city}`} />
        </div>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(17px, 1.6vw, 19px)',
            lineHeight: 1.6,
            color: 'var(--off-white)',
            borderLeft: `3px solid ${accent.hex}`,
            paddingLeft: 24,
            maxWidth: 820,
          }}
        >
          {lp.excerpt}
        </p>
        {lp.caseStudyPath && (
          <div style={{ marginTop: 28 }}>
            <Link
              href={lp.caseStudyPath}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 14,
                fontWeight: 500,
                color: `rgb(${accent.light})`,
                textDecoration: 'none',
                borderBottom: `1px solid rgb(${accent.rgb})`,
                paddingBottom: 3,
                letterSpacing: '-0.005em',
              }}
            >
              {lp.caseStudyLabel || 'Read the case study'} →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// PageMeta: visible "Last reviewed" line + author attribution. Cat 3
// (E-E-A-T) + Cat 7 (technical foundation, freshness signal).
// ────────────────────────────────────────────────────────────────────────────
function PageMeta({ location }) {
  if (!location.dateModified) return null
  const d = new Date(location.dateModified)
  const formatted = d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
  return (
    <section
      style={{
        background: 'var(--charcoal-deep)',
        padding: '32px var(--page-pad) 56px',
        borderBottom: '1px solid var(--text-faint)',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 13,
          color: 'var(--text-muted)',
          lineHeight: 1.5,
        }}
      >
        Last reviewed{' '}
        <time dateTime={location.dateModified} style={{ color: 'var(--text-secondary)' }}>
          {formatted}
        </time>
        {' '}by{' '}
        <Link href="/about" style={{ color: 'var(--text-secondary)', textDecoration: 'underline', textDecorationColor: 'var(--text-faint)' }}>
          Luke Marinovic
        </Link>
        , Founder, UnderCurrent Automations.
      </div>
    </section>
  )
}

// ────────────────────────────────────────────────────────────────────────────
// Main export
// ────────────────────────────────────────────────────────────────────────────
export default function LocationPageClient({ location }) {
  return (
    <>
      <Hero location={location} />
      <QuickAnswer location={location} />
      <MetroDetail location={location} />
      <Industries location={location} />
      <Benefits location={location} />
      <Process location={location} />
      <Comparison location={location} />
      <LocalProof location={location} />
      <FAQ location={location} />
      <ClosingCTA location={location} />
      <PageMeta location={location} />
    </>
  )
}
