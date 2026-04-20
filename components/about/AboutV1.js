'use client'

// V1: "The Director's Cut" — editorial, sage-dominant, magazine-grade
// Three sections: About Me / About the Company / Our Style

const SAGE = '143, 175, 159'
const SAGE_LIGHT = '168, 196, 184'
const BLUE = '106, 141, 173'

function PhotoBlock({ accentRgb = SAGE, ratio = '3/4' }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: ratio,
        background: `linear-gradient(165deg, rgba(${accentRgb}, 0.18) 0%, #121210 100%)`,
        border: `1px solid rgba(${accentRgb}, 0.30)`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(110% 60% at 35% 20%, rgba(${accentRgb}, 0.20) 0%, transparent 65%)`,
        }}
      />
      <svg
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '85%' }}
      >
        <defs>
          <linearGradient id="v1-sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${accentRgb}, 0.40)`} />
            <stop offset="100%" stopColor="rgba(12,12,10,0.95)" />
          </linearGradient>
        </defs>
        <path
          d="M160 48 c28 0 48 22 48 52 c0 22-11 40-24 48 c38 14 60 44 66 84 c2 22 4 40 4 68 H66 c0-28 2-46 4-68 c6-40 28-70 66-84 c-13-8-24-26-24-48 c0-30 20-52 48-52 Z"
          fill="url(#v1-sil)"
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          bottom: 14,
          right: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: `rgba(${accentRgb}, 0.55)`,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        portrait · placeholder
      </div>
    </div>
  )
}

function SectionDivider({ number, label, accent = SAGE }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        marginBottom: 64,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: `rgb(${accent})`,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
        }}
      >
        {number}
      </span>
      <div style={{ flex: 1, height: 1, background: `rgba(${accent}, 0.22)` }} />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}
      >
        {label}
      </span>
    </div>
  )
}

// SECTION 1: About Me
function AboutMe() {
  return (
    <section
      style={{
        position: 'relative',
        padding: '120px 56px',
        background: '#121210',
        borderTop: '1px solid var(--text-faint)',
        overflow: 'hidden',
      }}
    >
      {/* Giant background number */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: -20,
          left: 40,
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'clamp(160px, 20vw, 280px)',
          color: `rgba(${SAGE}, 0.04)`,
          lineHeight: 1,
          letterSpacing: '-0.06em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        01
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative' }}>
        <SectionDivider number="01" label="About me" accent={SAGE} />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left: Text */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(44px, 5.6vw, 88px)',
                lineHeight: 1.0,
                letterSpacing: '-0.04em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              I build systems that{' '}
              <span
                style={{
                  color: `rgb(${SAGE})`,
                  WebkitTextFillColor: 'unset',
                }}
              >
                free up your time.
              </span>
            </h2>

            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                maxWidth: 540,
              }}
            >
              I started UnderCurrent after watching too many teams grind through work the way
              they'd always done it — because no one had stopped to ask if they still had to.
              The answer, most of the time, is no.
            </p>

            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                maxWidth: 500,
              }}
            >
              Automate the repetitive, and what's left is the work that actually moves things
              forward — revenue, creativity, time with the people you like.
            </p>

            {/* Credentials row */}
            <div
              style={{
                marginTop: 16,
                display: 'flex',
                gap: 0,
                borderTop: `1px solid rgba(${SAGE}, 0.15)`,
                paddingTop: 28,
              }}
            >
              {[
                { label: 'Based in', value: 'Melbourne, AU' },
                { label: 'Serving', value: 'Australian SMBs' },
                { label: 'Since', value: '2024' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    paddingRight: 24,
                    borderRight: i < 2 ? `1px solid rgba(${SAGE}, 0.12)` : 'none',
                    paddingLeft: i > 0 ? 24 : 0,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: 6,
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 15,
                      fontWeight: 500,
                      color: 'var(--off-white)',
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait */}
          <div>
            <PhotoBlock accentRgb={SAGE} ratio="3/4" />
            <div style={{ marginTop: 14 }}>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--off-white)',
                  letterSpacing: '-0.01em',
                }}
              >
                Luke Marinovic
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  marginTop: 4,
                }}
              >
                Founder, UnderCurrent
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 2: About the Company
function AboutCompany() {
  const metrics = [
    { value: '100%', label: 'Australian-owned' },
    { value: '<$0.15', label: 'Per AI-built site' },
    { value: '9', label: 'Pipeline stages, automated' },
  ]

  return (
    <section
      style={{
        padding: '120px 56px',
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionDivider number="02" label="About the company" accent={SAGE} />

        {/* Pull quote block */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '4px 1fr',
            gap: 36,
            marginBottom: 72,
          }}
        >
          <div
            style={{
              width: 4,
              background: `linear-gradient(180deg, rgb(${SAGE}) 0%, rgba(${SAGE}, 0.2) 100%)`,
              borderRadius: 2,
              minHeight: 80,
            }}
          />
          <blockquote
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 900,
            }}
          >
            UnderCurrent is a fully automated web design agency built for Australian trades businesses.
          </blockquote>
        </div>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            maxWidth: 680,
            marginBottom: 64,
          }}
        >
          From Meta Ads lead through to a live website — onboarding, AI content generation,
          domain setup, Stripe payment, Vercel deployment — handled end to end. No agency
          overhead. No junior account managers. Just a system that works.
        </p>

        {/* Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: `rgba(${SAGE}, 0.12)`,
            border: `1px solid rgba(${SAGE}, 0.18)`,
          }}
        >
          {metrics.map((m, i) => (
            <div
              key={i}
              style={{
                padding: '32px 36px',
                background: '#26241F',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(36px, 4vw, 56px)',
                  letterSpacing: '-0.04em',
                  color: `rgb(${SAGE})`,
                  lineHeight: 1,
                  marginBottom: 10,
                }}
              >
                {m.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 11,
                  color: 'var(--text-muted)',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                }}
              >
                {m.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 3: Our Style
function OurStyle() {
  const traits = [
    {
      accent: SAGE,
      tag: 'Principle 01',
      title: 'Minimum viable complexity',
      body:
        'If a recurring task can be a script, it should be a script. We resist the pull toward clever solutions when simple ones work. Less surface area to break.',
    },
    {
      accent: BLUE,
      tag: 'Principle 02',
      title: 'Surgical over sweeping',
      body:
        'Every changed line traces to the request. We don\'t touch adjacent code, add unrequested flexibility, or design for hypothetical future requirements.',
    },
    {
      accent: SAGE,
      tag: 'Principle 03',
      title: 'Ship then sharpen',
      body:
        'Operational beats perfect. We get it live, validate it works, then refine. Perfection that never ships helps nobody.',
    },
  ]

  return (
    <section
      style={{
        padding: '120px 56px',
        background: '#121210',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <SectionDivider number="03" label="Our style" accent={SAGE} />

        <h2
          style={{
            margin: '0 0 56px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 4.8vw, 72px)',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 780,
          }}
        >
          How we think. How we work.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 1,
            background: 'var(--text-faint)',
          }}
        >
          {traits.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '40px 36px',
                background: '#1C1C1A',
                borderTop: `3px solid rgb(${t.accent})`,
                display: 'flex',
                flexDirection: 'column',
                gap: 18,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  color: `rgba(${t.accent}, 0.70)`,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {t.tag}
              </div>
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 22,
                  letterSpacing: '-0.02em',
                  color: 'var(--off-white)',
                  lineHeight: 1.2,
                }}
              >
                {t.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                }}
              >
                {t.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutV1() {
  return (
    <>
      <AboutMe />
      <AboutCompany />
      <OurStyle />
    </>
  )
}
