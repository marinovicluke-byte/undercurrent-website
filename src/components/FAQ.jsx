import { useState, useEffect, useRef } from 'react'

function useVisible(threshold = 0.1) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const FEATURED = [
  {
    q: '"Will this actually work for my type of business?"',
    a: 'We work with any service-based business — tradies, consultants, coaches, agencies, healthcare practices. If you have repetitive tasks and customers, we can automate it. The audit tells you exactly how much.',
  },
  {
    q: '"I\'m not tech-savvy — will I be able to manage this?"',
    a: "You don't manage anything. We build it, we maintain it, we fix it when something changes. You just receive the results. Most clients never need to open a settings panel.",
  },
  {
    q: '"What if it doesn\'t save me as much time as you say?"',
    a: "We don't guess. In the audit, we show you the exact hours and tasks we'll automate before we build anything. You see the numbers first. If they don't impress you, walk away — no charge.",
  },
]

const FAQS = [
  {
    num: '01',
    q: 'How does this work with our existing tools?',
    a: "We connect to the software you already use — Gmail, HubSpot, Notion, Slack, Xero, whatever you have. Nothing changes about how your team works. We add automation underneath, so the results happen without you having to think about it.",
  },
  {
    num: '02',
    q: 'What does it actually cost?',
    a: "We price based on what we save you. If automation saves your business $20,000 a year, we take a small share — you keep the rest. Most clients see their full investment back within six months. We show you the numbers in the free audit before you spend anything.",
  },
  {
    num: '03',
    q: 'How long until we see results?',
    a: "Most clients notice a difference in the first two weeks. The full system is live in 30 days. We move fast because we've done this before. The free audit maps out exactly what gets automated and when.",
  },
  {
    num: '04',
    q: 'Do we own the automations or are we locked in?',
    a: "You own everything we build. If you ever want to take it in-house or move on, the automations stay with you. We're not a subscription you can't escape — we're here to build something that works for your business long term.",
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function FAQ() {
  const [active, setActive] = useState(0)
  const [openAccordion, setOpenAccordion] = useState(null)
  const [headRef, headVisible] = useVisible(0.15)
  const [tilesRef, tilesVisible] = useVisible(0.08)
  const [carouselRef, carouselVisible] = useVisible(0.08)

  const activeFaq = FAQS[active]

  return (
    <section id="faq" style={{ backgroundColor: '#F7F3ED', padding: '3.5rem 1.5rem' }}>
      <style>{`
        .faq-tiles {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.25rem;
          margin-bottom: 2.5rem;
        }
        .faq-desktop { display: flex; gap: 1.75rem; }
        .faq-mobile  { display: none; }

        @media (max-width: 860px) {
          .faq-tiles { grid-template-columns: 1fr; }
          .faq-desktop { display: none; }
          .faq-mobile  { display: block; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Heading ── */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center',
            marginBottom: '3.5rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#6B7C4A', marginBottom: '0.85rem', fontWeight: 600 }}>
            COMMON CONCERNS
          </p>
          <h2 className="font-cormorant" style={{
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            fontWeight: 700,
            color: '#1C1C1A',
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            We've heard every objection.<br />Here's the truth.
          </h2>
        </div>

        {/* ── Top 3 featured tiles ── */}
        <div
          ref={tilesRef}
          className="faq-tiles"
          style={{
            opacity: tilesVisible ? 1 : 0,
            transform: tilesVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          {FEATURED.map((f, i) => (
            <div
              key={i}
              style={{
                background: '#EDE8E0',
                border: '1px solid rgba(107,124,74,0.2)',
                borderLeft: '3px solid rgba(107,124,74,0.45)',
                borderRadius: '1rem',
                padding: '2rem',
              }}
            >
              <p className="font-cormorant" style={{
                fontSize: 'clamp(1.1rem, 1.4vw, 1.25rem)',
                fontStyle: 'italic',
                fontWeight: 500,
                color: '#1C1C1A',
                margin: '0 0 1rem',
                lineHeight: 1.45,
              }}>
                {f.q}
              </p>
              <p className="font-dm" style={{
                fontSize: '0.9rem',
                fontWeight: 400,
                color: 'rgba(28,28,26,0.78)',
                margin: 0,
                lineHeight: 1.7,
              }}>
                {f.a}
              </p>
            </div>
          ))}
        </div>

        {/* ── Sub-heading ── */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#6B7C4A', marginBottom: '0.75rem', fontWeight: 600 }}>
            QUESTIONS
          </p>
          <h3 className="font-cormorant" style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
            fontWeight: 700,
            color: '#1C1C1A',
            lineHeight: 1.15,
            margin: 0,
            letterSpacing: '-0.02em',
          }}>
            Still on the fence? These might help.
          </h3>
        </div>

        {/* ── Desktop carousel ── */}
        <div
          ref={carouselRef}
          className="faq-desktop"
          style={{
            opacity: carouselVisible ? 1 : 0,
            transform: carouselVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
          }}
        >
          {/* Left nav */}
          <div style={{ flex: '0 0 320px', display: 'flex', flexDirection: 'column', gap: '0.2rem', alignSelf: 'flex-start' }}>
            {FAQS.map((faq, i) => (
              <button
                key={faq.num}
                onClick={() => setActive(i)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem 1.1rem',
                  borderRadius: '0.65rem',
                  background: active === i ? '#EDE8E0' : 'transparent',
                  border: 'none',
                  borderLeft: active === i ? '3px solid #6B7C4A' : '3px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  transition: 'background 0.2s ease',
                }}
              >
                <span className="font-dm" style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: active === i ? '#6B7C4A' : 'rgba(107,124,74,0.4)',
                  minWidth: '22px',
                  letterSpacing: '0.03em',
                }}>
                  {faq.num}
                </span>
                <span className="font-dm" style={{
                  fontSize: '0.88rem',
                  fontWeight: active === i ? 600 : 400,
                  color: active === i ? '#1C1C1A' : 'rgba(28,28,26,0.65)',
                  lineHeight: 1.4,
                  flex: 1,
                }}>
                  {faq.q}
                </span>
                {active === i && (
                  <span style={{ color: '#6B7C4A', fontSize: '0.85rem', flexShrink: 0 }}>→</span>
                )}
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div style={{
            flex: 1,
            background: '#EDE8E0',
            border: '1px solid rgba(107,124,74,0.2)',
            borderRadius: '1.25rem',
            padding: '2.5rem',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '260px',
          }}>
            {/* Decorative number */}
            <p className="font-dm" style={{
              position: 'absolute',
              top: '1rem',
              right: '1.5rem',
              fontSize: '5.5rem',
              fontWeight: 800,
              color: 'rgba(107,124,74,0.12)',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              userSelect: 'none',
            }}>
              {activeFaq.num}
            </p>

            <div style={{ width: '2rem', height: '2px', background: '#6B7C4A', opacity: 0.5, marginBottom: '1.25rem' }} />

            <p className="font-mono" style={{
              fontSize: '0.58rem',
              letterSpacing: '0.16em',
              color: '#6B7C4A',
              margin: '0 0 0.85rem',
              fontWeight: 600,
            }}>
              QUESTION {activeFaq.num}
            </p>

            <p className="font-dm" style={{
              fontSize: 'clamp(1.05rem, 1.6vw, 1.25rem)',
              fontWeight: 700,
              color: '#1C1C1A',
              margin: '0 0 1rem',
              lineHeight: 1.35,
              letterSpacing: '-0.01em',
            }}>
              {activeFaq.q}
            </p>

            <p className="font-dm" style={{
              fontSize: '0.95rem',
              fontWeight: 400,
              color: 'rgba(28,28,26,0.75)',
              margin: 0,
              lineHeight: 1.75,
              maxWidth: '520px',
            }}>
              {activeFaq.a}
            </p>
          </div>
        </div>

        {/* ── Mobile accordion ── */}
        <div className="faq-mobile">
          <div style={{
            background: '#EDE8E0',
            border: '1px solid rgba(107,124,74,0.2)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
          }}>
            {FAQS.map((faq, i) => (
              <div key={faq.num}>
                <button
                  onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <span className="font-dm" style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    color: 'rgba(107,124,74,0.5)',
                    minWidth: '22px',
                  }}>
                    {faq.num}
                  </span>
                  <span className="font-dm" style={{
                    fontSize: '0.95rem',
                    fontWeight: openAccordion === i ? 700 : 400,
                    color: '#1C1C1A',
                    flex: 1,
                    lineHeight: 1.4,
                  }}>
                    {faq.q}
                  </span>
                  <span className="font-dm" style={{
                    color: 'rgba(107,124,74,0.65)',
                    fontSize: '1.25rem',
                    fontWeight: 300,
                    lineHeight: 1,
                    flexShrink: 0,
                  }}>
                    {openAccordion === i ? '−' : '+'}
                  </span>
                </button>

                {openAccordion === i && (
                  <div style={{ padding: '0 1.5rem 1.5rem 3.5rem' }}>
                    <p className="font-dm" style={{
                      fontSize: '0.88rem',
                      color: 'rgba(28,28,26,0.78)',
                      margin: 0,
                      lineHeight: 1.75,
                    }}>
                      {faq.a}
                    </p>
                  </div>
                )}

                {i < FAQS.length - 1 && (
                  <div style={{ height: '1px', background: 'rgba(107,124,74,0.15)', margin: '0 1.5rem' }} />
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
