import PillCTA from '@/components/ui/PillCTA'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export const metadata = {
  title: 'About',
  description:
    'UnderCurrent Automations is a Melbourne AI automation agency founded by Luke Marinovic. The story behind the build, the team, and where we\'re going.',
  alternates: { canonical: 'https://undercurrentautomations.com/about' },
  openGraph: {
    title: 'About UnderCurrent Automations',
    description: 'Melbourne AI automation agency. Founded by Luke Marinovic. We build custom workflows for Australian small businesses.',
    url: 'https://undercurrentautomations.com/about',
    type: 'website',
    images: ['/brand/og-card.png'],
  },
}

// ─── Shared tokens ────────────────────────────────────────────────────────────
const AC_BLUE   = { rgb: '106, 141, 173', light: '138, 174, 200' }
const AC_SAGE   = { rgb: '143, 175, 159', light: '168, 196, 184' }
const AC_ORANGE = { rgb: '224, 122, 85',  light: '236, 158, 128' }

const EyebrowPill = SectionEyebrow

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 01 — About UnderCurrent
// LeftClick layout: full-width headline → 2-col body/image below
// ═══════════════════════════════════════════════════════════════════════════════
function AboutUndercurrent() {
  const pillars = [
    { ac: AC_ORANGE, label: 'Get found online', text: 'AI search, SEO, and content automation that put your business in front of the people already looking. Google, ChatGPT, Perplexity, all of it.' },
    { ac: AC_SAGE,   label: 'Turn traffic into revenue', text: 'Lead capture and sales automation that turns traffic into booked calls and paid invoices. Every lead chased, every follow-up sent.' },
    { ac: AC_BLUE,   label: 'Build AI capability', text: 'AI training and strategy consulting for teams that want to build it themselves. Real workflows, not workshop theatre.' },
  ]

  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>

        {/* Eyebrow */}
        <div style={{ marginBottom: 40 }}>
          <EyebrowPill n="01" label="About UnderCurrent" />
        </div>

        {/* Full-width giant headline */}
        <h1
          style={{
            margin: '0 0 72px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.8vw, 64px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
            color: 'var(--off-white)',
            textWrap: 'balance',
          }}
        >
          Helping Australian small businesses{' '}
          <span className="uc-glow-word uc-glow-word--sage">grow revenue</span>{' '}
          through AI automation.
        </h1>

        {/* Body + pillars + CTA */}
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 20,
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              UnderCurrent Automations is an AI automation agency in Melbourne, Australia.
              We work with Australian small businesses in trades, business services,
              consultants, and allied health practitioners.
            </p>

            {/* Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {pillars.map((p, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 18,
                    padding: '20px 0',
                    borderBottom: i < pillars.length - 1 ? '1px solid var(--text-faint)' : 'none',
                    alignItems: 'flex-start',
                  }}
                >
                  <div
                    style={{
                      width: 3,
                      minHeight: 48,
                      background: `rgb(${p.ac.rgb})`,
                      flexShrink: 0,
                      marginTop: 2,
                    }}
                  />
                  <div>
                    <h3 style={{ margin: '0 0 6px', fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, color: `rgb(${p.ac.light})`, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                      {p.label}
                    </h3>
                    <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.6, color: 'var(--text-secondary)' }}>
                      {p.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 8 }}>
              <PillCTA label="See what we build" href="/services" tone="blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 02 — About Me (Luke)
// Same LeftClick layout, flipped (image left, text right)
// ═══════════════════════════════════════════════════════════════════════════════
function AboutMe() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>

        {/* Eyebrow */}
        <div style={{ marginBottom: 40 }}>
          <EyebrowPill n="02" label="About me" />
        </div>

        {/* Full-width headline */}
        <h2
          style={{
            margin: '0 0 72px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.8vw, 64px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
            color: 'var(--off-white)',
            textWrap: 'balance',
          }}
        >
          I build AI systems that give small businesses their{' '}
          <span className="uc-glow-word uc-glow-word--blue">time back</span>.
        </h2>

        {/* Text + credentials + CTA */}
        <div style={{ maxWidth: 760 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 20,
                lineHeight: 1.6,
                color: 'var(--text-secondary)',
              }}
            >
              I&apos;m Luke Marinovic, an AI automation consultant based in Melbourne, Australia.
              I founded UnderCurrent Automations in 2026 after watching too many teams grind
              through work the way they&apos;d always done it, because no one had stopped to ask
              if they still had to. The answer, most of the time, is no.
            </p>

            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--text-muted)',
              }}
            >
              Automate the repetitive, and what&apos;s left is the work that moves things
              forward. Revenue. Creativity. Time with the people you like. That&apos;s the whole idea.
            </p>

            {/* Credentials */}
            <div
              style={{
                display: 'flex',
                gap: 0,
                paddingTop: 28,
                marginTop: 8,
                borderTop: '1px solid var(--text-faint)',
              }}
            >
              {[
                { label: 'Based in',  value: 'Melbourne, AU' },
                { label: 'Focus',     value: 'AI automation' },
                { label: 'Founded',   value: '2026' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    paddingLeft:  i > 0 ? 24 : 0,
                    paddingRight: i < 2 ? 24 : 0,
                    borderLeft: i > 0 ? '1px solid var(--text-faint)' : 'none',
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 11, color: 'var(--text-muted)', letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 6 }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: 15, color: 'var(--off-white)', letterSpacing: '-0.01em' }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 8, display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <PillCTA label="Let's talk" href="https://cal.com/luke-marinovic-aqeosc/30min" tone="sage" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION 03 — Our Journey
// Vertical timeline going downward
// ═══════════════════════════════════════════════════════════════════════════════
const MILESTONES = [
  {
    year: 'Feb 2026',
    ac: AC_ORANGE,
    title: 'Founded in Melbourne',
    body: 'UnderCurrent Automations went live in February 2026. Built in Melbourne around a specific bet: that the right automation could give a small business owner back a working day every week.',
  },
  {
    year: 'Mar 2026',
    ac: AC_SAGE,
    title: 'First clients served',
    body: 'First paying clients came in. Workflows ran in production for the first time. Work that used to eat a morning started running before the kettle boiled. The thesis held.',
  },
  {
    year: 'Apr 2026',
    ac: AC_BLUE,
    title: 'First product shipped',
    body: 'April 2026: the SEO and AI search ranking engine went live, keeping client sites visible on Google, ChatGPT, and Perplexity. The rest of the automation stack for trades, business services, consultants, and allied health practitioners is in active build.',
    isCurrent: true,
  },
  {
    year: 'Next',
    ac: AC_ORANGE,
    title: 'Scaling across Australia',
    body: 'More clients across more industries. The goal is simple: make any Australian small business that wants a working automation system able to get one in days, not months.',
    isFuture: true,
  },
]

function OurJourney() {
  return (
    <section
      style={{
        padding: '120px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: 0 }}>

        {/* Eyebrow */}
        <div style={{ marginBottom: 40 }}>
          <EyebrowPill n="03" label="Our journey" />
        </div>

        {/* Headline */}
        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(36px, 4.8vw, 64px)',
            lineHeight: 0.98,
            letterSpacing: '-0.045em',
            color: 'var(--off-white)',
            textWrap: 'balance',
          }}
        >
          Where we&apos;ve been.{' '}
          <span className="uc-glow-word uc-glow-word--sage">Where we&apos;re going.</span>
        </h2>

        <p
          style={{
            margin: '0 0 80px',
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.6,
            color: 'var(--text-muted)',
            maxWidth: 560,
          }}
        >
          An honest account of how we got here, what it took, and what comes next.
        </p>

        {/* Timeline */}
        <div
          className="uc-timeline-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1px 1fr',
            gap: '0 48px',
          }}
        >
        <style>{`
          @media (max-width: 780px) {
            .uc-timeline-grid {
              grid-template-columns: 28px 1fr !important;
              gap: 0 20px !important;
            }
            .uc-timeline-grid .uc-tl-year {
              grid-column: 2 !important;
              text-align: left !important;
              padding-bottom: 10px !important;
            }
            .uc-timeline-grid .uc-tl-year span {
              font-size: 22px !important;
            }
            .uc-timeline-grid .uc-tl-line {
              grid-column: 1 !important;
              grid-row: span 2 !important;
              align-self: stretch !important;
              margin-top: 8px !important;
            }
            .uc-timeline-grid .uc-tl-content {
              grid-column: 2 !important;
              padding-bottom: 48px !important;
            }
            .uc-timeline-grid .uc-tl-content h3 {
              font-size: 20px !important;
            }
            .uc-timeline-grid .uc-tl-content p {
              font-size: 15px !important;
            }
          }
        `}</style>
          {MILESTONES.map((m, i) => {
            const isLast = i === MILESTONES.length - 1
            return (
              <>
                {/* Year — left column */}
                <div
                  key={`year-${i}`}
                  className="uc-tl-year"
                  style={{
                    paddingTop: 6,
                    paddingBottom: isLast ? 0 : 72,
                    textAlign: 'right',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 600,
                      fontSize: m.isFuture ? 28 : 40,
                      lineHeight: 1,
                      letterSpacing: '-0.04em',
                      color: m.isFuture ? 'var(--text-faint)' : `rgb(${m.ac.rgb})`,
                      fontStyle: m.isFuture ? 'italic' : 'normal',
                    }}
                  >
                    {m.year}
                  </span>
                </div>

                {/* Line + dot — centre column */}
                <div
                  key={`line-${i}`}
                  className="uc-tl-line"
                  style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  {/* Dot */}
                  <div
                    style={{
                      width: m.isCurrent ? 14 : 10,
                      height: m.isCurrent ? 14 : 10,
                      borderRadius: '50%',
                      background: m.isFuture
                        ? 'transparent'
                        : `rgb(${m.ac.rgb})`,
                      border: m.isFuture
                        ? `2px dashed rgba(${m.ac.rgb}, 0.35)`
                        : m.isCurrent
                          ? `2px solid rgba(${m.ac.light}, 0.5)`
                          : 'none',
                      flexShrink: 0,
                      marginTop: 8,
                      zIndex: 1,
                    }}
                  />
                  {/* Vertical line down */}
                  {!isLast && (
                    <div
                      style={{
                        flex: 1,
                        width: 1,
                        marginTop: 6,
                        background: m.isFuture
                          ? `linear-gradient(180deg, rgba(${m.ac.rgb}, 0.18) 0%, transparent 100%)`
                          : `linear-gradient(180deg, rgba(${m.ac.rgb}, 0.35) 0%, rgba(${MILESTONES[i+1].ac.rgb}, 0.20) 100%)`,
                      }}
                    />
                  )}
                </div>

                {/* Content — right column */}
                <div
                  key={`content-${i}`}
                  className="uc-tl-content"
                  style={{
                    paddingTop: 2,
                    paddingBottom: isLast ? 0 : 72,
                    opacity: m.isFuture ? 0.55 : 1,
                  }}
                >
                  {m.isCurrent && (
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '3px 10px 3px 8px',
                        borderRadius: 999,
                        background: `rgba(${m.ac.rgb}, 0.12)`,
                        border: `1px solid rgba(${m.ac.rgb}, 0.28)`,
                        marginBottom: 12,
                      }}
                    >
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: `rgb(${m.ac.rgb})` }} />
                      <span style={{ fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 11, color: `rgb(${m.ac.light})`, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                        Now
                      </span>
                    </div>
                  )}

                  <h3
                    style={{
                      margin: '0 0 14px',
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 'clamp(22px, 2.4vw, 32px)',
                      letterSpacing: '-0.025em',
                      color: m.isFuture ? 'var(--text-muted)' : 'var(--off-white)',
                      lineHeight: 1.2,
                    }}
                  >
                    {m.title}
                  </h3>

                  <p
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-body)',
                      fontSize: 16,
                      lineHeight: 1.65,
                      color: 'var(--text-secondary)',
                      maxWidth: 600,
                    }}
                  >
                    {m.body}
                  </p>
                </div>
              </>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          style={{
            marginTop: 80,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '28px 36px',
            borderRadius: 14,
            background: 'var(--charcoal)',
            border: '1px solid var(--text-faint)',
            boxShadow: '6px 6px 0 0 var(--blue)',
            gap: 32,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              letterSpacing: '-0.02em',
              color: 'var(--off-white)',
              lineHeight: 1.35,
              textWrap: 'balance',
              maxWidth: 560,
            }}
          >
            Want to be part of what&apos;s next? Let&apos;s talk.
          </p>
          <PillCTA label="Get in touch" href="/contact" tone="blue" />
        </div>
      </div>
    </section>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// Page
// ═══════════════════════════════════════════════════════════════════════════════
export default function AboutPage() {
  return (
    <>
      <AboutUndercurrent />
      <AboutMe />
      <OurJourney />
    </>
  )
}
