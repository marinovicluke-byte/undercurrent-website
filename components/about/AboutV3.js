'use client'

// V3: "The Human" — warm, orange-tinted, founder portrait-first, personal narrative
// Three sections: About Me / About the Company / Our Style

const ORANGE = '224, 122, 85'
const ORANGE_LIGHT = '236, 158, 128'
const SAGE = '143, 175, 159'
const SAGE_LIGHT = '168, 196, 184'
const BLUE = '106, 141, 173'

function PortraitLarge() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '3/4',
        background: `linear-gradient(160deg, rgba(${ORANGE}, 0.14) 0%, #26241F 50%, rgba(${SAGE}, 0.10) 100%)`,
        border: '1px solid var(--text-faint)',
        boxShadow: `0 12px 40px rgba(0,0,0,0.50), inset 0 1px 0 rgba(255,255,255,0.04)`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(100% 55% at 50% 10%, rgba(${ORANGE_LIGHT}, 0.16) 0%, transparent 70%)`,
        }}
      />
      <svg
        viewBox="0 0 320 400"
        preserveAspectRatio="xMidYMax meet"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', height: '86%' }}
      >
        <defs>
          <linearGradient id="v3-sil" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={`rgba(${ORANGE_LIGHT}, 0.35)`} />
            <stop offset="60%" stopColor={`rgba(${SAGE}, 0.18)`} />
            <stop offset="100%" stopColor="rgba(38,36,31,0.98)" />
          </linearGradient>
        </defs>
        <path
          d="M160 48 c28 0 48 22 48 52 c0 22-11 40-24 48 c38 14 60 44 66 84 c2 22 4 40 4 68 H66 c0-28 2-46 4-68 c6-40 28-70 66-84 c-13-8-24-26-24-48 c0-30 20-52 48-52 Z"
          fill="url(#v3-sil)"
        />
      </svg>

      {/* Bottom name tag */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: '32px 24px 24px',
          background: `linear-gradient(0deg, rgba(38,36,31,0.95) 0%, transparent 100%)`,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: 18,
              color: 'var(--off-white)',
              letterSpacing: '-0.02em',
              marginBottom: 2,
            }}
          >
            Luke Marinovic
          </div>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'var(--text-muted)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
            }}
          >
            Founder
          </div>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 10,
            color: `rgba(${ORANGE}, 0.55)`,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Melbourne, AU
        </div>
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
        background: '#26241F',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px 6px 6px',
            borderRadius: 999,
            background: `rgba(${ORANGE}, 0.08)`,
            border: `1px solid rgba(${ORANGE}, 0.22)`,
            marginBottom: 56,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: `rgba(${ORANGE}, 0.18)`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: `rgb(${ORANGE})`,
            }}
          >
            01
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '-0.005em',
            }}
          >
            About me
          </span>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* Left: Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <h2
              style={{
                margin: 0,
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 'clamp(42px, 5.2vw, 80px)',
                lineHeight: 1.02,
                letterSpacing: '-0.04em',
                color: 'var(--off-white)',
                textWrap: 'balance',
              }}
            >
              Built to give time back to the people doing real work.
            </h2>

            {/* Pull quote */}
            <div
              style={{
                padding: '22px 24px',
                borderLeft: `3px solid rgb(${ORANGE})`,
                background: `rgba(${ORANGE}, 0.06)`,
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 19,
                  lineHeight: 1.45,
                  color: `rgb(${ORANGE_LIGHT})`,
                  letterSpacing: '-0.01em',
                  fontStyle: 'italic',
                }}
              >
                "No one had stopped to ask if they still had to."
              </p>
            </div>

            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 17,
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
              }}
            >
              I started UnderCurrent after watching too many teams grind through work the way
              they'd always done it — because no one had stopped to ask if they still had to.
              The answer, most of the time, is no. Automate the repetitive, and what's left
              is the work that actually moves things forward.
            </p>

            {/* Timeline-style credentials */}
            <div
              style={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 0,
                position: 'relative',
                paddingLeft: 20,
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 8,
                  bottom: 8,
                  width: 1,
                  background: `linear-gradient(180deg, rgb(${ORANGE}) 0%, rgba(${SAGE}, 0.40) 100%)`,
                }}
              />
              {[
                { year: '2024', event: 'Founded UnderCurrent Automations' },
                { year: '2025', event: 'First agency pipeline shipped' },
                { year: '2026', event: 'Scaling to 100 clients @ $50/mo' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '12px 0',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <div
                    style={{
                      position: 'absolute',
                      left: -24,
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: i === 0 ? `rgb(${ORANGE})` : i === 1 ? `rgb(${SAGE})` : `rgb(${BLUE})`,
                      border: '1px solid #26241F',
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 11,
                      color: 'var(--text-muted)',
                      letterSpacing: '0.10em',
                      minWidth: 40,
                    }}
                  >
                    {item.year}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 15,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.event}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Portrait */}
          <PortraitLarge />
        </div>
      </div>
    </section>
  )
}

// SECTION 2: About the Company
function AboutCompany() {
  return (
    <section
      style={{
        padding: '120px 56px',
        background: '#121210',
        borderTop: '1px solid var(--text-faint)',
      }}
    >
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px 6px 6px',
            borderRadius: 999,
            background: `rgba(${SAGE}, 0.08)`,
            border: `1px solid rgba(${SAGE}, 0.22)`,
            marginBottom: 56,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: `rgba(${SAGE}, 0.18)`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: `rgb(${SAGE})`,
            }}
          >
            02
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '-0.005em',
            }}
          >
            About the company
          </span>
        </div>

        {/* Big mission card */}
        <div
          style={{
            padding: '56px 60px',
            background: '#26241F',
            border: '1px solid var(--text-faint)',
            borderTop: `3px solid rgb(${SAGE})`,
            marginBottom: 60,
            boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
          }}
        >
          <p
            style={{
              margin: '0 0 8px',
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: `rgb(${SAGE})`,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
            }}
          >
            Our mission
          </p>
          <h2
            style={{
              margin: '0 0 28px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(34px, 4vw, 60px)',
              lineHeight: 1.08,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 820,
            }}
          >
            A fully automated web agency for Australian trades businesses.
          </h2>
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.65,
              color: 'var(--text-secondary)',
              maxWidth: 600,
            }}
          >
            Meta Ads lead to live website — onboarding, AI content generation, domain setup,
            payment, deployment — handled end to end. No overhead. No junior account managers.
            Just a system that delivers.
          </p>
        </div>

        {/* 3-col why cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
          }}
        >
          {[
            {
              accent: ORANGE,
              title: 'For trades, specifically',
              body: 'Plumbers, electricians, builders, HVAC, roofing — we know the business model and we\'ve built for it.',
            },
            {
              accent: SAGE,
              title: 'Australian-owned & operated',
              body: 'Based in Melbourne. We understand local compliance, GST, and what Aussie SMBs actually care about.',
            },
            {
              accent: BLUE,
              title: 'Economics that make sense',
              body: '$50/month subscription. 100 clients = $5,000 MRR. Simple pricing, predictable costs.',
            },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                padding: '28px 28px 32px',
                background: '#1C1C1A',
                border: '1px solid var(--text-faint)',
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 3,
                  background: `rgb(${card.accent})`,
                  marginBottom: 20,
                }}
              />
              <h3
                style={{
                  margin: '0 0 12px',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: '-0.02em',
                  color: 'var(--off-white)',
                  lineHeight: 1.25,
                }}
              >
                {card.title}
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
                {card.body}
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
  const traits = [
    {
      accent: ORANGE,
      headline: 'We ship things that work.',
      sub: 'Not elegant demos. Not clever prototypes. Working systems in production.',
      detail: 'Operational beats perfect. Validate it works, then refine.',
    },
    {
      accent: SAGE,
      headline: 'We document what breaks.',
      sub: 'Every failure goes into the lab notes. No repeat mistakes. No hidden bugs.',
      detail: 'If it broke once, it\'s logged. If it\'s likely to break again, it\'s automated around.',
    },
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
        {/* Eyebrow */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px 6px 6px',
            borderRadius: 999,
            background: `rgba(${BLUE}, 0.08)`,
            border: `1px solid rgba(${BLUE}, 0.22)`,
            marginBottom: 56,
          }}
        >
          <span
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: `rgba(${BLUE}, 0.18)`,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: 11,
              color: `rgb(${BLUE})`,
            }}
          >
            03
          </span>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              letterSpacing: '-0.005em',
            }}
          >
            Our style
          </span>
        </div>

        <h2
          style={{
            margin: '0 0 64px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 5vw, 76px)',
            lineHeight: 1.03,
            letterSpacing: '-0.04em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 820,
          }}
        >
          Honest work. No mystery.
        </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {traits.map((t, i) => (
            <div
              key={i}
              style={{
                padding: '44px 40px',
                background: '#121210',
                border: '1px solid var(--text-faint)',
                display: 'flex',
                flexDirection: 'column',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 4,
                  background: `linear-gradient(90deg, rgb(${t.accent}), rgba(${t.accent}, 0.4))`,
                  marginBottom: 8,
                }}
              />
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 'clamp(22px, 2.4vw, 32px)',
                  letterSpacing: '-0.03em',
                  color: 'var(--off-white)',
                  lineHeight: 1.2,
                }}
              >
                {t.headline}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 17,
                  lineHeight: 1.55,
                  color: 'var(--text-secondary)',
                  fontWeight: 500,
                }}
              >
                {t.sub}
              </p>
              <p
                style={{
                  margin: 0,
                  fontFamily: 'var(--font-body)',
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'var(--text-muted)',
                  borderTop: '1px solid var(--text-faint)',
                  paddingTop: 16,
                }}
              >
                {t.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom statement */}
        <div
          style={{
            padding: '32px 36px',
            background: `rgba(${ORANGE}, 0.06)`,
            border: `1px solid rgba(${ORANGE}, 0.18)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 32,
          }}
        >
          <p
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(16px, 1.8vw, 22px)',
              color: 'var(--off-white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.35,
              maxWidth: 640,
            }}
          >
            We measure what ships, what converts, and what compounds. Nothing else gets counted.
          </p>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: `rgb(${ORANGE})`,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}
          >
            Results, not effort
          </div>
        </div>
      </div>
    </section>
  )
}

export default function AboutV3() {
  return (
    <>
      <AboutMe />
      <AboutCompany />
      <OurStyle />
    </>
  )
}
