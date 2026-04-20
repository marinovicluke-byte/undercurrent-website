'use client'

// V2: "The Manifesto" — SaaS/product feel, blue-dominant, numbered statements
// Three sections: About Me / About the Company / Our Style

const BLUE = '106, 141, 173'
const BLUE_LIGHT = '138, 174, 200'
const SAGE = '143, 175, 159'
const ORANGE = '224, 122, 85'

function PhotoBlock() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1/1',
        background: `linear-gradient(135deg, rgba(${BLUE}, 0.15) 0%, #121210 100%)`,
        border: `1px solid rgba(${BLUE}, 0.25)`,
        overflow: 'hidden',
      }}
    >
      <svg
        viewBox="0 0 320 320"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '80%' }}
      >
        <defs>
          <linearGradient id="v2-sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${BLUE_LIGHT}, 0.35)`} />
            <stop offset="100%" stopColor="rgba(12,12,10,0.95)" />
          </linearGradient>
        </defs>
        <path
          d="M160 40 c26 0 44 20 44 48 c0 20-10 36-22 44 c36 12 56 40 62 78 c2 20 4 38 4 64 H72 c0-26 2-44 4-64 c6-38 26-66 62-78 c-12-8-22-24-22-44 c0-28 18-48 44-48 Z"
          fill="url(#v2-sil)"
        />
      </svg>
      {/* Blue corner accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 48,
          height: 48,
          borderLeft: `1px solid rgba(${BLUE}, 0.35)`,
          borderBottom: `1px solid rgba(${BLUE}, 0.35)`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 14,
          left: 14,
          fontFamily: 'var(--font-mono)',
          fontSize: 9,
          color: `rgba(${BLUE}, 0.50)`,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        Luke Marinovic
      </div>
    </div>
  )
}

// SECTION 1: About Me
function AboutMe() {
  return (
    <section
      style={{
        padding: '120px 56px',
        background: '#121210',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 72,
            borderBottom: `1px solid rgba(${BLUE}, 0.18)`,
            paddingBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: `rgb(${BLUE})`,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            01 — About me
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--text-faint)',
              letterSpacing: '0.14em',
            }}
          >
            Melbourne, Australia
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '300px 1fr',
            gap: 72,
            alignItems: 'start',
          }}
        >
          {/* Left: Portrait + name */}
          <div>
            <PhotoBlock />
            <div
              style={{
                marginTop: 20,
                paddingTop: 20,
                borderTop: `1px solid rgba(${BLUE}, 0.18)`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--off-white)',
                  letterSpacing: '-0.02em',
                  marginBottom: 4,
                }}
              >
                Luke Marinovic
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
                Founder & Builder
              </div>
            </div>
          </div>

          {/* Right: Statements */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <h2
              style={{
                margin: '0 0 36px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(38px, 4.8vw, 72px)',
                lineHeight: 1.04,
                letterSpacing: '-0.04em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              I build systems that give time back.
            </h2>

            <p
              style={{
                margin: '0 0 28px',
                fontFamily: 'var(--font-body)',
                fontSize: 18,
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
                margin: '0 0 48px',
                fontFamily: 'var(--font-body)',
                fontSize: 16,
                lineHeight: 1.6,
                color: 'var(--text-muted)',
              }}
            >
              Automate the repetitive, and what's left is the work that actually moves things
              forward: revenue, creativity, time with the people you like.
            </p>

            {/* Pull quote */}
            <div
              style={{
                padding: '24px 28px',
                background: `rgba(${BLUE}, 0.07)`,
                border: `1px solid rgba(${BLUE}, 0.20)`,
                borderLeft: `3px solid rgb(${BLUE})`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 18,
                  lineHeight: 1.5,
                  color: `rgb(${BLUE_LIGHT})`,
                  letterSpacing: '-0.01em',
                  fontStyle: 'italic',
                }}
              >
                "The goal isn't automation for its own sake. It's creating conditions where
                excellent work is the default outcome."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// SECTION 2: About the Company
function AboutCompany() {
  const principles = [
    {
      n: 'I.',
      title: 'Systems over heroics',
      body: "A business that relies on a specific person working a specific way is fragile. We build pipelines that run whether you're in the room or not.",
    },
    {
      n: 'II.',
      title: 'Results, not effort',
      body: "Time spent doesn't equal value created. We measure what ships, what converts, and what compounds. Nothing else gets counted.",
    },
    {
      n: 'III.',
      title: 'Honest about tradeoffs',
      body: 'Every tool has a cost. Every shortcut has a consequence. We name them upfront so decisions are made with full information.',
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
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 72,
            borderBottom: `1px solid rgba(${BLUE}, 0.18)`,
            paddingBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: `rgb(${BLUE})`,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            02 — About the company
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: 'var(--text-faint)',
              letterSpacing: '0.14em',
            }}
          >
            UnderCurrent Automations
          </span>
        </div>

        {/* Large centered headline */}
        <h2
          style={{
            margin: '0 0 24px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 5.4vw, 80px)',
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 960,
          }}
        >
          A fully automated web agency for Australian trades.
        </h2>

        <p
          style={{
            margin: '0 0 72px',
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
            maxWidth: 640,
          }}
        >
          From Meta Ads lead to live website — every step handled end to end. No overhead.
          No account managers. Just a system that delivers.
        </p>

        {/* Principles grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}
        >
          {principles.map((p, i) => (
            <div
              key={i}
              style={{
                padding: '36px 32px',
                background: '#121210',
                border: '1px solid var(--text-faint)',
                borderTop: `2px solid rgb(${BLUE})`,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 32,
                  color: `rgba(${BLUE}, 0.30)`,
                  letterSpacing: '-0.04em',
                  lineHeight: 1,
                  marginBottom: 20,
                }}
              >
                {p.n}
              </div>
              <h3
                style={{
                  margin: '0 0 14px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 20,
                  letterSpacing: '-0.02em',
                  color: 'var(--off-white)',
                  lineHeight: 1.2,
                }}
              >
                {p.title}
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
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// SECTION 3: Our Style
function OurStyle() {
  const items = [
    {
      number: '01',
      title: 'Minimal code. Maximum clarity.',
      desc: 'Minimum code for today\'s problem. No speculative features. No single-use abstractions. 200 lines that should be 50, rewrite.',
      accent: BLUE,
    },
    {
      number: '02',
      title: 'Goal-driven, not task-driven.',
      desc: '"Fix bug" means write a failing test, make it pass. "Refactor" means tests pass before and after. Every task converts to a verifiable outcome.',
      accent: SAGE,
    },
    {
      number: '03',
      title: 'No surprises. No hidden costs.',
      desc: 'We name tradeoffs upfront. We document what broke and what fixed it. Code and docs stay in sync. Always.',
      accent: BLUE,
    },
    {
      number: '04',
      title: 'Automation where it earns its place.',
      desc: 'If a recurring task can be a script, it should be a script — not a prompt. 60% deterministic code, 30% structured process, 10% AI judgment.',
      accent: SAGE,
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
        {/* Header row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 72,
            borderBottom: `1px solid rgba(${BLUE}, 0.18)`,
            paddingBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: `rgb(${BLUE})`,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            03 — Our style
          </span>
        </div>

        <h2
          style={{
            margin: '0 0 64px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(38px, 4.8vw, 72px)',
            lineHeight: 1.04,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 800,
          }}
        >
          How we think. How we work.
        </h2>

        {/* Manifesto list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '80px 320px 1fr',
                gap: 40,
                alignItems: 'start',
                padding: '32px 0',
                borderBottom: '1px solid var(--text-faint)',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  color: `rgba(${item.accent}, 0.55)`,
                  letterSpacing: '0.14em',
                  paddingTop: 4,
                }}
              >
                {item.number}
              </span>
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 20,
                  letterSpacing: '-0.02em',
                  color: 'var(--off-white)',
                  lineHeight: 1.25,
                }}
              >
                {item.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--text-secondary)',
                  maxWidth: 520,
                }}
              >
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function AboutV2() {
  return (
    <>
      <AboutMe />
      <AboutCompany />
      <OurStyle />
    </>
  )
}
