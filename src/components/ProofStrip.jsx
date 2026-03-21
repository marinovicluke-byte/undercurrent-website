import { useEffect, useRef, useState } from 'react'

function useVisible(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

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
  }, [active, target, duration])
  return count
}

// ─── Arc gauge ────────────────────────────────────────────────────────────────
function ArcGauge({ color, active }) {
  const r = 48
  const cx = 64
  const cy = 60
  const circumference = Math.PI * r
  const fill = active ? circumference * 0.72 : 0

  return (
    <svg width="128" height="68" viewBox="0 0 128 68" style={{ display: 'block' }}>
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke={`${color}18`} strokeWidth="7" strokeLinecap="round"
      />
      <path
        d={`M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`}
        fill="none" stroke={color} strokeWidth="7" strokeLinecap="round"
        strokeDasharray={`${circumference} ${circumference}`}
        strokeDashoffset={circumference - fill}
        style={{ transition: active ? 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.3s' : 'none' }}
      />
      {active && (
        <circle
          cx={cx + r * Math.cos(Math.PI * (1 - 0.72))}
          cy={cy - r * Math.sin(Math.PI * (1 - 0.72))}
          r="4.5" fill={color}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      )}
    </svg>
  )
}

// ─── Line chart ───────────────────────────────────────────────────────────────
function LineChart({ color, active }) {
  const pts = [[0,62],[18,58],[36,52],[54,45],[72,36],[90,25],[108,16],[128,6]]
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')

  return (
    <svg width="128" height="68" viewBox="0 0 128 68" style={{ display: 'block' }}>
      <defs>
        <linearGradient id="lg1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${d} L 128 68 L 0 68 Z`} fill="url(#lg1)"
        opacity={active ? 1 : 0}
        style={{ transition: active ? 'opacity 0.8s ease 0.7s' : 'none' }}
      />
      <path d={d} fill="none" stroke={color} strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="220" strokeDashoffset={active ? 0 : 220}
        style={{ transition: active ? 'stroke-dashoffset 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s' : 'none' }}
      />
      <circle cx="128" cy="6" r="4" fill={color}
        opacity={active ? 1 : 0}
        style={{ transition: active ? 'opacity 0.3s ease 1.5s' : 'none', filter: `drop-shadow(0 0 5px ${color})` }}
      />
    </svg>
  )
}

// ─── Bar chart ────────────────────────────────────────────────────────────────
function BarChart({ color, active }) {
  const bars = [22, 34, 28, 44, 38, 56, 50, 68]

  return (
    <svg width="128" height="68" viewBox="0 0 128 68" style={{ display: 'block' }}>
      {bars.map((h, i) => {
        const barH = (h / 70) * 60
        const x = i * 16 + 4
        const y = 65 - barH
        const isLast = i === bars.length - 1
        return (
          <rect key={i} x={x} y={active ? y : 65}
            width="11" height={active ? barH : 0} rx="3"
            fill={isLast ? color : `${color}${i % 2 === 0 ? '60' : '35'}`}
            style={{
              transition: active
                ? `y 0.65s cubic-bezier(0.4,0,0.2,1) ${0.1 + i * 0.07}s, height 0.65s cubic-bezier(0.4,0,0.2,1) ${0.1 + i * 0.07}s`
                : 'none',
              filter: isLast ? `drop-shadow(0 0 5px ${color}90)` : 'none',
            }}
          />
        )
      })}
    </svg>
  )
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function StatCard({ cardLabel, cardSub, viz, statPrefix, statNum, statSuffix, title, desc, secondaryLabel, secondaryDesc, color, active, delay }) {
  const count = useCounter(statNum, 1800, active)

  return (
    <div style={{
      background: '#222220',
      border: `1px solid rgba(255,255,255,0.07)`,
      borderRadius: '1.25rem',
      padding: '1.75rem',
      display: 'flex',
      flexDirection: 'column',
      opacity: active ? 1 : 0,
      transform: active ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Top label + viz + stat — centered on mobile */}
      <div className="card-top">
        <div style={{ marginBottom: '1.25rem' }}>
          <p className="font-dm" style={{ fontSize: '0.92rem', fontWeight: 700, color: '#F7F3ED', margin: '0 0 0.1rem' }}>
            {cardLabel}
          </p>
          <p className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color: `${color}80`, margin: 0, textTransform: 'uppercase' }}>
            {cardSub}
          </p>
        </div>

        {/* Mini visualisation */}
        <div className="card-viz" style={{ marginBottom: '1.25rem' }}>
          {viz}
        </div>

        {/* Big stat */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.1rem', marginBottom: '1rem' }}>
        {statPrefix && (
          <span className="font-dm" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.03em' }}>
            {statPrefix}
          </span>
        )}
        <span className="font-dm" style={{ fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 800, color, lineHeight: 1, letterSpacing: '-0.03em' }}>
          {count}
        </span>
        {statSuffix && (
          <span className="font-dm" style={{ fontSize: 'clamp(1.2rem, 2vw, 1.6rem)', fontWeight: 700, color, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
            {statSuffix}
          </span>
        )}
      </div>

      </div>{/* end card-top */}

      {/* Divider */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.07)', marginBottom: '1rem' }} />

      {/* Bold title */}
      <p className="font-dm" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#F7F3ED', margin: '0 0 0.45rem', lineHeight: 1.3 }}>
        {title}
      </p>

      {/* Description */}
      <p className="font-dm" style={{ fontSize: '0.85rem', fontWeight: 400, color: 'rgba(247,243,237,0.6)', margin: '0 0 1.25rem', lineHeight: 1.65 }}>
        {desc}
      </p>

      {/* Secondary callout */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: '0.65rem',
        padding: '0.75rem 0.9rem',
        background: `${color}0D`,
        border: `1px solid ${color}20`,
        borderRadius: '0.65rem',
        marginTop: 'auto',
      }}>
        <span style={{
          width: '18px', height: '18px', borderRadius: '50%',
          background: `${color}25`, border: `1.5px solid ${color}60`,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px',
        }}>
          <svg width="8" height="7" viewBox="0 0 8 7" fill="none">
            <path d="M1 3.5L3 5.5L7 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <div>
          <p className="font-dm" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#F7F3ED', margin: '0 0 0.15rem' }}>
            {secondaryLabel}
          </p>
          <p className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 400, color: 'rgba(247,243,237,0.55)', margin: 0, lineHeight: 1.55 }}>
            {secondaryDesc}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function ProofStrip() {
  const [ref, active] = useVisible(0.1)
  const [headRef, headVisible] = useVisible(0.2)

  const CARDS = [
    {
      color: '#8FAF9F',
      cardLabel: 'Time Lost to Admin',
      cardSub: 'Per owner, every week',
      viz: <ArcGauge color="#8FAF9F" active={active} />,
      statPrefix: '',
      statNum: 3,
      statSuffix: '-4 hrs/day',
      title: 'Lost Before You Even Start Work',
      desc: 'The average service business owner spends half their day on email, scheduling, and follow-up. That\'s 800+ hours a year not spent on growth.',
      secondaryLabel: 'What gets automated',
      secondaryDesc: 'Inbox triage, reply drafts, appointment reminders, client check-ins.',
      delay: 0.05,
    },
    {
      color: '#C4A97A',
      cardLabel: 'Speed to Lead',
      cardSub: 'Impact on conversion rate',
      viz: <LineChart color="#C4A97A" active={active} />,
      statPrefix: '',
      statNum: 78,
      statSuffix: '%',
      title: 'Of Clients Go With Who Replies First',
      desc: 'Most decisions are made in the first hour. If you\'re on a job when an enquiry comes in, that lead is already gone, unless your system replies for you.',
      secondaryLabel: 'What gets automated',
      secondaryDesc: 'Instant enquiry replies, lead qualification, booking links, 24/7.',
      delay: 0.15,
    },
    {
      color: '#89ACBE',
      cardLabel: 'Revenue at Risk',
      cardSub: 'From manual processes annually',
      viz: <BarChart color="#89ACBE" active={active} />,
      statPrefix: '$',
      statNum: 41,
      statSuffix: 'k+',
      title: 'The True Cost of Doing It Manually',
      desc: '800 hours of admin per year, at the average owner\'s hourly rate. That\'s before accounting for leads that went cold and invoices never chased.',
      secondaryLabel: 'What gets automated',
      secondaryDesc: 'Invoice follow-ups, payment reminders, expense logging, overdue alerts.',
      delay: 0.25,
    },
  ]

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '5rem 1.5rem' }}>
      <style>{`
        @media (max-width: 860px) {
          .proof-cards { grid-template-columns: 1fr !important; }
          .card-top { text-align: center; }
          .card-top .font-mono { display: block; }
          .card-viz svg { margin: 0 auto; }
          .card-top > div[style] { justify-content: center; }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Section heading */}
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
          <h2 className="font-dm" style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
            fontWeight: 800,
            color: '#F7F3ED',
            lineHeight: 1.15,
            letterSpacing: '-0.025em',
            margin: '0 0 0.5rem',
          }}>
            Automation is the future of small business.
          </h2>
          <p className="font-dm" style={{
            fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
            fontWeight: 400,
            color: '#8FAF9F',
            margin: 0,
            letterSpacing: '-0.01em',
          }}>
            Here's why.
          </p>
        </div>

        {/* Cards */}
        <div
          ref={ref}
          className="proof-cards"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.25rem',
          }}
        >
          {CARDS.map((card) => (
            <StatCard key={card.title} {...card} active={active} />
          ))}
        </div>

      </div>
    </section>
  )
}
