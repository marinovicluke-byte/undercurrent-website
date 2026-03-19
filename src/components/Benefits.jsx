import { useEffect, useRef, useState } from 'react'

// ─── Stat counter ─────────────────────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────────────
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
      { type: 'trigger', label: 'Trigger',                 text: 'Job completed · 14 days ago' },
      { type: 'message', label: 'SMS to Mike · Auto-sent', text: "Hi Mike — hope the kitchen's coming along nicely! If you have 30 seconds, a Google review would mean the world to us. 🙏" },
      { type: 'result',  label: 'Result',                  text: 'Review posted · Google', stars: true },
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
      { type: 'trigger', label: 'Trigger',                       text: 'New enquiry received · 9:47 PM' },
      { type: 'message', label: 'Auto-reply to Sarah · Instant', text: "Hey Sarah! Thanks for reaching out — I'd love to help. Are you free for a quick call this week? 📅" },
      { type: 'result',  label: 'Result',                       text: 'Call booked · next morning', check: true },
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
      { type: 'trigger', label: 'Trigger',              text: 'Job marked complete · 4:15 PM' },
      { type: 'message', label: 'Invoice · Auto-sent',  text: 'Invoice #247 · $3,200\nDue in 14 days — sent automatically.' },
      { type: 'result',  label: 'Result',               text: 'Paid · 6 days early', check: true },
    ],
  },
]

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

      {item.type === 'message' && (
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.09)',
          borderRadius: '0.6rem',
          padding: '0.7rem 0.85rem',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.82rem, 1.3vw, 0.9rem)',
          color: 'rgba(247,243,237,0.75)',
          lineHeight: 1.6,
          whiteSpace: 'pre-line',
        }}>
          {item.text}
        </div>
      )}

      {item.type === 'result' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          {item.stars && (
            <span style={{ color, fontSize: '0.95rem', letterSpacing: '0.06em', lineHeight: 1 }}>★★★★★</span>
          )}
          {item.check && (
            <span style={{
              width: '1.2rem', height: '1.2rem', borderRadius: '50%',
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
            fontSize: 'clamp(0.85rem, 1.4vw, 0.92rem)',
            color: 'rgba(247,243,237,0.88)',
            fontWeight: 500,
          }}>
            {item.text}
          </span>
        </div>
      )}

      {item.type === 'trigger' && (
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
  const [step, setStep]     = useState(-1)
  const cardRef = useRef(null)
  const count   = useCounter(benefit.statNum, 1100, active)

  useEffect(() => {
    const el = cardRef.current
    if (!el) return
    const timeouts = []
    const offset = index * 180

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
      { threshold: 0.15 }
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
        borderRadius: '1.25rem',
        padding: 'clamp(1.5rem, 3vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Check badge */}
      <div style={{
        width: '2.1rem', height: '2.1rem', borderRadius: '50%',
        background: `${benefit.color}15`, border: `1.5px solid ${benefit.color}38`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '1.35rem', flexShrink: 0,
      }}>
        <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
          <path d="M1.5 5.5L5 9L11.5 1" stroke={benefit.color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      {/* Stat */}
      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(3.5rem, 6vw, 5.5rem)',
        fontWeight: 800,
        color: '#F7F3ED',
        lineHeight: 0.92,
        letterSpacing: '-0.045em',
        marginBottom: '0.5rem',
      }}>
        {benefit.statPrefix}{count}{benefit.statSuffix}
      </div>

      <div style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: 'clamp(0.88rem, 1.5vw, 1rem)',
        color: benefit.color,
        fontWeight: 500,
        marginBottom: '0.9rem',
      }}>
        {benefit.statLabel}
      </div>

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
        background: `linear-gradient(to right, ${benefit.color}45, rgba(255,255,255,0.06) 55%, transparent)`,
        margin: '1.5rem 0',
      }} />

      {/* Animated story */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem', flex: 1 }}>
        {benefit.story.map((item, i) => (
          <div key={i}>
            <StoryItem item={item} active={step >= i} color={benefit.color} />
            {i < benefit.story.length - 1 && (
              <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)', marginTop: '1.1rem' }} />
            )}
          </div>
        ))}
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '0.4rem', marginTop: '1.5rem', alignItems: 'center' }}>
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

// ─── Section ──────────────────────────────────────────────────────────────────────
export default function Benefits() {
  return (
    <section style={{
      backgroundColor: '#1C1C1A',
      padding: 'clamp(4rem, 8vw, 7rem) clamp(1.25rem, 5vw, 4rem)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.8rem, 6vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.0,
            letterSpacing: '-0.025em',
            maxWidth: '800px',
            marginBottom: '1.25rem',
          }}>
            <span style={{ color: '#F7F3ED' }}>Save Hours. Cut Costs.</span>
            <br />
            <span style={{ color: '#8FAF9F' }}>Grow Faster.</span>
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
            color: '#8A8A7A',
            lineHeight: 1.6,
            maxWidth: '340px',
          }}>
            Real results from AI that automates quoting, scheduling, and admin — so your business runs smarter every day.
          </p>
        </div>

        <div className="benefits-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'clamp(1rem, 2vw, 1.5rem)',
        }}>
          {BENEFITS.map((b, i) => (
            <BenefitCard key={b.id} benefit={b} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .benefits-grid { grid-template-columns: 1fr !important; }
        }
        @media (min-width: 861px) and (max-width: 1060px) {
          .benefits-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </section>
  )
}
