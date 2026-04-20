'use client'

// V4: "The Architect" — Swiss-grid, precise, label-heavy, sage as structural accent
// Three sections: About Me / About the Company / Our Style

const SAGE = '143, 175, 159'
const SAGE_LIGHT = '168, 196, 184'
const SAGE_DARK = '107, 138, 122'
const BLUE = '106, 141, 173'
const BLUE_LIGHT = '138, 174, 200'

function PortraitSquare() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        background: `linear-gradient(145deg, rgba(${SAGE}, 0.12) 0%, #121210 100%)`,
        border: `1px solid rgba(${SAGE}, 0.25)`,
        overflow: 'hidden',
      }}
    >
      {/* Grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(rgba(${SAGE}, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(${SAGE}, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <svg
        viewBox="0 0 320 320"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '82%' }}
      >
        <defs>
          <linearGradient id="v4-sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${SAGE_LIGHT}, 0.40)`} />
            <stop offset="100%" stopColor="rgba(12,12,10,0.95)" />
          </linearGradient>
        </defs>
        <path
          d="M160 40 c26 0 44 20 44 48 c0 20-10 36-22 44 c36 12 56 40 62 78 c2 20 4 38 4 64 H72 c0-26 2-44 4-64 c6-38 26-66 62-78 c-12-8-22-24-22-44 c0-28 18-48 44-48 Z"
          fill="url(#v4-sil)"
        />
      </svg>
      {/* Corner markers */}
      {[
        { top: 0, left: 0, borderRight: 'none', borderBottom: 'none' },
        { top: 0, right: 0, borderLeft: 'none', borderBottom: 'none' },
        { bottom: 0, left: 0, borderRight: 'none', borderTop: 'none' },
        { bottom: 0, right: 0, borderLeft: 'none', borderTop: 'none' },
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            border: `1px solid rgba(${SAGE}, 0.45)`,
            ...pos,
          }}
        />
      ))}
    </div>
  )
}

function VerticalLabel({ text }) {
  return (
    <div
      style={{
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)',
        fontFamily: 'var(--font-mono)',
        fontSize: 10,
        color: `rgb(${SAGE})`,
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        userSelect: 'none',
      }}
    >
      {text}
    </div>
  )
}

// SECTION 1: About Me
function AboutMe() {
  const dataRows = [
    { label: 'Full name', value: 'Luke Marinovic' },
    { label: 'Role', value: 'Founder & Builder' },
    { label: 'Location', value: 'Melbourne, AU' },
    { label: 'Founded', value: '2024' },
    { label: 'Focus', value: 'Australian SMBs' },
    { label: 'Stack', value: 'FastAPI / Next.js / Claude' },
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
        {/* Swiss-style header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 24,
            marginBottom: 56,
            alignItems: 'center',
          }}
        >
          <VerticalLabel text="About / 01" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingBottom: 20,
              borderBottom: `1px solid rgba(${SAGE}, 0.25)`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(80px, 10vw, 140px)',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: `rgba(${SAGE}, 0.10)`,
              }}
            >
              01
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              About me
            </h2>
          </div>
        </div>

        {/* 4-column swiss grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 280px 1fr 280px',
            gap: 32,
            alignItems: 'start',
          }}
        >
          {/* Col 1: Vertical label */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: 8,
              borderRight: `1px solid rgba(${SAGE}, 0.12)`,
            }}
          >
            <VerticalLabel text="Founder" />
          </div>

          {/* Col 2: Portrait */}
          <div>
            <PortraitSquare />
          </div>

          {/* Col 3: Bio */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
              paddingLeft: 8,
            }}
          >
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(22px, 2.4vw, 34px)',
                lineHeight: 1.25,
                letterSpacing: '-0.03em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              I build systems that give time back.
            </p>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
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
                fontSize: 15,
                lineHeight: 1.65,
                color: 'var(--text-muted)',
              }}
            >
              Automate the repetitive, and what's left is the work that actually moves
              things forward: revenue, creativity, time with the people you like.
            </p>

            <div
              style={{
                marginTop: 8,
                paddingTop: 20,
                borderTop: `1px solid rgba(${SAGE}, 0.15)`,
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                color: `rgb(${SAGE})`,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              undercurrentautomations.com
            </div>
          </div>

          {/* Col 4: Data rows */}
          <div
            style={{
              borderLeft: `1px solid rgba(${SAGE}, 0.12)`,
              paddingLeft: 24,
            }}
          >
            {dataRows.map((row, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr',
                  gap: 12,
                  padding: '10px 0',
                  borderBottom: i < dataRows.length - 1 ? '1px solid var(--text-faint)' : 'none',
                  alignItems: 'baseline',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 9,
                    color: 'var(--text-muted)',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    lineHeight: 1.4,
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--off-white)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 2: About the Company
function AboutCompany() {
  const facts = [
    {
      n: '01',
      label: 'What we do',
      content:
        'Fully automated web design for Australian trades businesses — plumbers, electricians, builders, HVAC, roofing.',
    },
    {
      n: '02',
      label: 'How it works',
      content:
        'Meta Ads lead → onboarding → AI content generation → Stripe → Cloudflare domain → Vercel deployment. End to end, automated.',
    },
    {
      n: '03',
      label: 'Why it works',
      content:
        '$50/month subscription. Targeting 100 clients. $5,000 MRR. Simple economics that actually compound.',
    },
    {
      n: '04',
      label: 'What makes it different',
      content:
        'No agency overhead. No account managers. Claude generates content for under $0.15 per site. The margin is the model.',
    },
  ]

  return (
    <section
      style={{
        padding: '120px 56px',
        background: '#1C1C1A',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Swiss header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 24,
            marginBottom: 56,
            alignItems: 'center',
          }}
        >
          <VerticalLabel text="Company / 02" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingBottom: 20,
              borderBottom: `1px solid rgba(${SAGE}, 0.25)`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(80px, 10vw, 140px)',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: `rgba(${SAGE}, 0.10)`,
              }}
            >
              02
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              About the company
            </h2>
          </div>
        </div>

        {/* Mission line */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 24,
            marginBottom: 56,
          }}
        >
          <div />
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(28px, 3.5vw, 52px)',
              lineHeight: 1.12,
              letterSpacing: '-0.04em',
              color: `rgb(${SAGE})`,
              textWrap: 'balance',
              maxWidth: 900,
            }}
          >
            A fully automated web agency for Australian trades.
          </p>
        </div>

        {/* Fact rows */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 24,
          }}
        >
          <div />
          <div>
            {facts.map((fact, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '48px 200px 1fr',
                  gap: 32,
                  padding: '24px 0',
                  borderBottom: i < facts.length - 1 ? `1px solid rgba(${SAGE}, 0.10)` : 'none',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 11,
                    color: `rgba(${SAGE}, 0.55)`,
                    letterSpacing: '0.16em',
                    paddingTop: 3,
                  }}
                >
                  {fact.n}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 10,
                    color: `rgb(${SAGE})`,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    paddingTop: 4,
                  }}
                >
                  {fact.label}
                </span>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {fact.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 3: Our Style
function OurStyle() {
  const tiles = [
    { label: 'Approach', value: 'Minimum viable complexity', accent: SAGE },
    { label: 'Edit style', value: 'Surgical — every line traces to the request', accent: SAGE },
    { label: 'Error protocol', value: 'Log it, fix it, prevent it', accent: BLUE },
    { label: 'AI ratio', value: '10% judgment, 90% deterministic', accent: BLUE },
    { label: 'Shipping rule', value: 'Operational before perfect', accent: SAGE },
    { label: 'Documentation', value: 'Code and docs in sync, always', accent: BLUE },
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
        {/* Swiss header */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 24,
            marginBottom: 56,
            alignItems: 'center',
          }}
        >
          <VerticalLabel text="Style / 03" />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              paddingBottom: 20,
              borderBottom: `1px solid rgba(${SAGE}, 0.25)`,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: 'clamp(80px, 10vw, 140px)',
                lineHeight: 0.85,
                letterSpacing: '-0.06em',
                color: `rgba(${SAGE}, 0.10)`,
              }}
            >
              03
            </span>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(28px, 3vw, 44px)',
                lineHeight: 1.1,
                letterSpacing: '-0.035em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              Our style
            </h2>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '40px 1fr',
            gap: 24,
          }}
        >
          <div />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Intro */}
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(22px, 2.8vw, 40px)',
                lineHeight: 1.2,
                letterSpacing: '-0.03em',
                color: 'var(--off-white)',
                textWrap: 'balance',
                maxWidth: 700,
              }}
            >
              How we think. How we build. What we won't compromise on.
            </p>

            {/* Tile grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 1,
                background: `rgba(${SAGE}, 0.10)`,
              }}
            >
              {tiles.map((tile, i) => (
                <div
                  key={i}
                  style={{
                    padding: '28px 24px',
                    background: '#121210',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 9,
                      color: `rgba(${tile.accent}, 0.65)`,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {tile.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 15,
                      color: 'var(--off-white)',
                      letterSpacing: '-0.015em',
                      lineHeight: 1.3,
                    }}
                  >
                    {tile.value}
                  </div>
                  <div
                    style={{
                      width: 24,
                      height: 1,
                      background: `rgba(${tile.accent}, 0.40)`,
                      marginTop: 4,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Bottom manifesto line */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 40,
                alignItems: 'center',
                paddingTop: 32,
                borderTop: `1px solid rgba(${SAGE}, 0.15)`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 16,
                  lineHeight: 1.6,
                  color: 'var(--text-secondary)',
                  maxWidth: 620,
                }}
              >
                We believe in systems over heroics. A business that relies on a specific person
                working a specific way is fragile. Build the pipeline, document the failure modes,
                and let the system run.
              </p>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 'clamp(48px, 6vw, 80px)',
                  lineHeight: 0.9,
                  letterSpacing: '-0.06em',
                  color: `rgba(${SAGE}, 0.12)`,
                  textAlign: 'right',
                  whiteSpace: 'nowrap',
                }}
              >
                UC
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutV4() {
  return (
    <>
      <AboutMe />
      <AboutCompany />
      <OurStyle />
    </>
  )
}
