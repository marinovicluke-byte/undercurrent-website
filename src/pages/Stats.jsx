import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'

gsap.registerPlugin(ScrollTrigger)

// ─── Reveal ──────────────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.fromTo(el, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out', delay })
          obs.disconnect()
        }
      },
      { threshold: 0, rootMargin: '0px 0px 80px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} style={{ opacity: 0, ...style }}>{children}</div>
}

// ─── Benefits data ────────────────────────────────────────────────────────────────
const BENEFITS = [
  {
    id: 'reviews',
    statNum: 31,
    statPrefix: '+',
    statSuffix: '%',
    statLabel: 'more 5-star reviews',
    description: 'Timed follow-ups land when the job is still fresh. No awkward asks. No chasing required.',
    color: '#C4A97A',
    story: [
      {
        type: 'trigger',
        label: 'TRIGGER',
        text: 'Job completed · 14 days ago',
      },
      {
        type: 'message',
        label: 'SMS TO MIKE · AUTO-SENT',
        text: "Hi Mike — hope the kitchen's coming along nicely! If you have 30 seconds, a Google review would mean the world to us. 🙏",
      },
      {
        type: 'result',
        label: 'RESULT',
        text: 'Review posted · Google',
        stars: true,
      },
    ],
  },
  {
    id: 'leads',
    statNum: 40,
    statPrefix: '+',
    statSuffix: '%',
    statLabel: 'more leads converted',
    description: 'Every enquiry gets an instant, personal reply — even at 11pm on a Sunday.',
    color: '#8FAF9F',
    story: [
      {
        type: 'trigger',
        label: 'TRIGGER',
        text: 'New enquiry received · 9:47 PM',
      },
      {
        type: 'message',
        label: 'AUTO-REPLY TO SARAH · INSTANT',
        text: "Hey Sarah! Thanks for reaching out — I'd love to help. Are you free for a quick call this week? 📅",
      },
      {
        type: 'result',
        label: 'RESULT',
        text: 'Call booked · next morning',
        check: true,
      },
    ],
  },
  {
    id: 'time',
    statNum: 12,
    statPrefix: '',
    statSuffix: ' hrs',
    statLabel: 'back every week',
    description: 'Invoices, reminders, follow-ups — all handled automatically after every single job.',
    color: '#89ACBE',
    story: [
      {
        type: 'trigger',
        label: 'TRIGGER',
        text: 'Job marked complete · 4:15 PM',
      },
      {
        type: 'message',
        label: 'INVOICE · AUTO-SENT',
        text: 'Invoice #247 · $3,200\nDue in 14 days — sent automatically.',
      },
      {
        type: 'result',
        label: 'RESULT',
        text: 'Paid · 6 days early',
        check: true,
      },
    ],
  },
]

const TOTALS = [
  { value: '12',    label: 'Hours back',        sub: 'EVERY WEEK'       },
  { value: '$50K+', label: 'Saved per year',     sub: 'AT $80/HR'        },
  { value: '5',     label: 'Services automated', sub: 'RUNNING 24/7'     },
  { value: '0',     label: 'Manual admin left',  sub: 'NONE. ZERO. ZIP.' },
]

// ─── Stat counter hook ────────────────────────────────────────────────────────────
function useCounter(target, duration, active) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start = null
    let raf
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, active])
  return count
}

// ─── Story item ───────────────────────────────────────────────────────────────────
function StoryItem({ item, active, color }) {
  return (
    <div style={{
      opacity: active ? 1 : 0.1,
      transform: active ? 'translateY(0)' : 'translateY(5px)',
      transition: 'opacity 0.6s ease, transform 0.6s ease',
    }}>
      <div style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: 'clamp(0.54rem, 0.8vw, 0.6rem)',
        letterSpacing: '0.14em',
        color: item.type === 'result' ? color + 'CC' : 'rgba(247,243,237,0.32)',
        textTransform: 'uppercase',
        marginBottom: '0.35rem',
      }}>
        {item.label}
      </div>

      {item.type === 'message' ? (
        <div style={{
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '0.55rem',
          padding: '0.65rem 0.8rem',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.82rem, 1.3vw, 0.9rem)',
          color: 'rgba(247,243,237,0.75)',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}>
          {item.text}
        </div>
      ) : item.type === 'result' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {item.stars && (
            <span style={{ color, fontSize: '0.9rem', letterSpacing: '0.05em', lineHeight: 1 }}>★★★★★</span>
          )}
          {item.check && (
            <span style={{
              width: '1.15rem', height: '1.15rem', borderRadius: '50%',
              background: `${color}20`, border: `1.5px solid ${color}60`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="7" height="6" viewBox="0 0 7 6" fill="none">
                <path d="M1 3L3 5L6 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          )}
          <span style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(0.8rem, 1.4vw, 0.88rem)',
            color: 'rgba(247,243,237,0.85)',
            fontWeight: 500,
          }}>
            {item.text}
          </span>
        </div>
      ) : (
        <div style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: 'clamp(0.72rem, 1.1vw, 0.8rem)',
          color: 'rgba(247,243,237,0.55)',
          letterSpacing: '0.02em',
          lineHeight: 1.5,
        }}>
          {item.text}
        </div>
      )}
    </div>
  )
}

// ─── Benefit card ─────────────────────────────────────────────────────────────────
function BenefitCard({ benefit, index }) {
  const [active, setActive] = useState(false)
  const [step, setStep] = useState(-1)
  const cardRef = useRef(null)
  const count = useCounter(benefit.statNum, 1100, active)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return

    const timeouts = []
    const offset = index * 180  // stagger start per card

    const runSeq = () => {
      setStep(-1)
      timeouts.push(setTimeout(() => setStep(0), 550 + offset))
      timeouts.push(setTimeout(() => setStep(1), 1500 + offset))
      timeouts.push(setTimeout(() => setStep(2), 2600 + offset))
      timeouts.push(setTimeout(runSeq, 7500))
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true)
          runSeq()
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      timeouts.forEach(clearTimeout)
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      style={{
        background: '#0F0F0D',
        border: '1px solid rgba(255,255,255,0.07)',
        borderTop: `3px solid ${benefit.color}`,
        borderRadius: '1.1rem',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Check badge */}
      <div style={{
        width: '2.1rem',
        height: '2.1rem',
        borderRadius: '50%',
        background: `${benefit.color}15`,
        border: `1.5px solid ${benefit.color}35`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.35rem',
        flexShrink: 0,
      }}>
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path d="M1.5 5.5L5 9L11.5 1" stroke={benefit.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stat */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(3.2rem, 6.5vw, 5rem)',
        fontWeight: 800,
        color: '#F7F3ED',
        lineHeight: 0.92,
        letterSpacing: '-0.045em',
        marginBottom: '0.45rem',
      }}>
        {benefit.statPrefix}{count}{benefit.statSuffix}
      </div>

      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(0.82rem, 1.5vw, 0.92rem)',
        color: benefit.color,
        fontWeight: 500,
        marginBottom: '0.9rem',
        letterSpacing: '0.005em',
      }}>
        {benefit.statLabel}
      </div>

      {/* Description */}
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(0.85rem, 1.4vw, 0.94rem)',
        color: 'rgba(247,243,237,0.38)',
        lineHeight: 1.7,
        fontWeight: 300,
        margin: 0,
      }}>
        {benefit.description}
      </p>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: `linear-gradient(to right, ${benefit.color}45, rgba(255,255,255,0.06) 50%, transparent)`,
        margin: '1.5rem 0',
      }} />

      {/* Animated story */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', flex: 1 }}>
        {benefit.story.map((item, i) => (
          <div key={i}>
            <StoryItem item={item} active={step >= i} color={benefit.color} />
            {i < benefit.story.length - 1 && (
              <div style={{
                height: '1px',
                background: 'rgba(255,255,255,0.05)',
                marginTop: '1.1rem',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        gap: '0.4rem',
        marginTop: '1.5rem',
        alignItems: 'center',
      }}>
        {benefit.story.map((_, i) => (
          <div key={i} style={{
            height: '3px',
            width: step >= i ? '1.8rem' : '0.55rem',
            borderRadius: '9999px',
            background: step >= i ? benefit.color : 'rgba(255,255,255,0.12)',
            transition: 'width 0.45s cubic-bezier(0.34,1.56,0.64,1), background 0.35s ease',
            flexShrink: 0,
          }} />
        ))}
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────────
export default function Stats() {
  const headRef    = useRef(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const trigger = { trigger: headRef.current, start: 'top 88%' }
      gsap.fromTo('.stats-eyebrow', { y: 14, opacity: 0 }, { y: 0, opacity: 1, duration: 0.42, ease: 'power3.out', scrollTrigger: trigger })
      gsap.fromTo('.stats-h1',      { y: 22, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5,  ease: 'power3.out', delay: 0.09, scrollTrigger: trigger })
      gsap.fromTo('.stats-sub',     { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay: 0.18, scrollTrigger: trigger })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const GRAIN = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")"

  return (
    <div ref={sectionRef} style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageHead
        title="Results — UnderCurrent"
        description="Three things UnderCurrent does for your business every single week. More reviews. More leads. More time back."
      />
      <ScrollProgressBar />
      <Navbar isSubPage />

      <style>{`
        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(1rem, 2vw, 1.5rem);
        }
        @media (max-width: 860px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) and (max-width: 1060px) {
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────────────── */}
      <section
        ref={headRef}
        style={{
          padding: 'clamp(120px, 14vw, 200px) clamp(20px, 5vw, 64px) clamp(60px, 8vw, 90px)',
          maxWidth: 1100, margin: '0 auto', textAlign: 'center', position: 'relative',
        }}
      >
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: '60%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(143,175,159,0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <p className="stats-eyebrow" style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', letterSpacing: '0.2em',
          color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '1.5rem', opacity: 0,
        }}>
          Real Results · Every Week
        </p>
        <h1 className="stats-h1" style={{
          fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3.5rem, 10vw, 8rem)',
          fontWeight: 700, color: '#F7F3ED', lineHeight: 1, letterSpacing: '-0.025em',
          marginBottom: '1.5rem', opacity: 0,
        }}>
          What You Get.
        </h1>
        <p className="stats-sub" style={{
          fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
          color: 'rgba(247,243,237,0.42)', lineHeight: 1.75, maxWidth: 460, margin: '0 auto',
          fontWeight: 300, opacity: 0,
        }}>
          Three outcomes. Real numbers. Every week, without lifting a finger.
        </p>
      </section>

      {/* ── Three benefits ───────────────────────────────────────────────────────── */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 10vw, 130px)',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <div className="benefits-grid">
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.id} benefit={b} index={i} />
          ))}
        </div>
      </section>

      {/* ── Totals ───────────────────────────────────────────────────────────────── */}
      <section style={{
        padding: '0 clamp(20px, 5vw, 64px) clamp(80px, 10vw, 130px)',
        maxWidth: 1100, margin: '0 auto',
      }}>
        <Reveal>
          <div style={{
            borderRadius: '1.5rem',
            background: 'rgba(247,243,237,0.025)',
            border: '1px solid rgba(143,175,159,0.16)',
            padding: 'clamp(2rem, 5vw, 4rem) clamp(1.5rem, 4vw, 3.5rem)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
              width: '70%', height: '200px',
              background: 'radial-gradient(ellipse at 50% 0%, rgba(143,175,159,0.07) 0%, transparent 65%)',
              pointerEvents: 'none',
            }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: GRAIN, backgroundSize: '150px', opacity: 0.7 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <p style={{
                fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.2em',
                color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '0.65rem', textAlign: 'center',
              }}>
                The Full Picture
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                fontWeight: 700, color: '#F7F3ED', textAlign: 'center', lineHeight: 1.05,
                letterSpacing: '-0.02em', marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
              }}>
                Your business runs itself.
              </h2>

              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)', marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
              }}>
                {TOTALS.map((t, i) => (
                  <Reveal key={t.label} delay={i * 0.08}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{
                        fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                        fontWeight: 800, color: '#8FAF9F', lineHeight: 1, letterSpacing: '-0.03em', marginBottom: '0.35rem',
                      }}>
                        {t.value}
                      </div>
                      <div style={{
                        fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(0.85rem, 1.5vw, 0.95rem)',
                        color: 'rgba(247,243,237,0.72)', fontWeight: 500, marginBottom: '0.2rem',
                      }}>
                        {t.label}
                      </div>
                      <div style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em',
                        color: 'rgba(247,243,237,0.28)', textTransform: 'uppercase',
                      }}>
                        {t.sub}
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={0.3}>
                <div style={{ textAlign: 'center' }}>
                  <a
                    href="/roi"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: 500,
                      color: '#8FAF9F', textDecoration: 'none',
                      border: '1px solid rgba(143,175,159,0.28)',
                      padding: '0.75rem 1.85rem', borderRadius: '9999px', letterSpacing: '0.02em',
                      transition: 'background 0.25s ease, border-color 0.25s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = 'rgba(143,175,159,0.08)'
                      e.currentTarget.style.borderColor = 'rgba(143,175,159,0.48)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = 'transparent'
                      e.currentTarget.style.borderColor = 'rgba(143,175,159,0.28)'
                    }}
                  >
                    Calculate your exact savings →
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </section>

      <Footer />
    </div>
  )
}
