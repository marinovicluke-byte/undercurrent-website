import { useEffect, useRef, useState } from 'react'

// ─── Counter hook (scroll-triggered, fires once) ──────────────────────────────
function useScrollCounter(target, duration) {
  const [count, setCount] = useState(0)
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

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

  return [ref, count]
}

// ─── Pipeline animation (Card 3) ─────────────────────────────────────────────
function PipelineVisual({ color }) {
  const [dotPos, setDotPos] = useState(0) // 0 = start, 1 = node1, 2 = node2, 3 = end
  const [active, setActive] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!active) return
    let pos = 0
    const advance = () => {
      pos = (pos + 1) % 4
      setDotPos(pos)
    }
    // Each node: 1.5s traverse + 0.5s pause
    const intervals = [1500, 500, 1500, 500]
    let i = 0
    const loop = () => {
      const t = setTimeout(() => { advance(); i = (i + 1) % 4; loop() }, intervals[i])
      return t
    }
    const t = loop()
    return () => clearTimeout(t)
  }, [active])

  const nodes = [
    { x: 20,  label: 'Enquiry' },
    { x: 110, label: 'Follow-up' },
    { x: 200, label: 'Booked' },
  ]

  // Dot x position based on dotPos (0 = before node 0, 1 = at node 0, 2 = at node 1, 3 = at node 2)
  const dotX = dotPos === 0 ? 0 : nodes[Math.min(dotPos - 1, 2)].x

  return (
    <svg
      ref={ref}
      viewBox="0 0 220 60"
      fill="none"
      style={{ width: '100%', maxWidth: '220px', display: 'block', margin: '0 auto', overflow: 'visible' }}
    >
      {/* Track line */}
      <line x1={20} y1={28} x2={200} y2={28} stroke={`${color}30`} strokeWidth={1} strokeDasharray="3 4" />

      {/* Animated dot */}
      <circle
        cx={dotPos}
        cy={28}
        r={5}
        fill={color}
        style={{ transition: 'cx 1.3s cubic-bezier(0.4,0,0.2,1)' }}
      />

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={28} r={8} fill="rgba(28,28,26,0.8)" stroke={`${color}50`} strokeWidth={1} />
          <circle cx={n.x} cy={28} r={3} fill={`${color}80`} />
          <text
            x={n.x}
            y={50}
            textAnchor="middle"
            fontFamily="DM Sans, sans-serif"
            fontSize={8}
            fill={`${color}70`}
          >
            {n.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

// ─── Service pill tags ────────────────────────────────────────────────────────
function ServiceTags({ tags, color }) {
  return (
    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: 'auto', paddingTop: '1rem' }}>
      {tags.map(tag => (
        <span
          key={tag}
          className="font-mono"
          style={{
            fontSize: '0.55rem',
            letterSpacing: '0.1em',
            color: `${color}80`,
            border: `1px solid ${color}30`,
            borderRadius: '9999px',
            padding: '0.18rem 0.55rem',
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

// ─── Card 1 — Time ────────────────────────────────────────────────────────────
function TimeCard() {
  const color = '#8FAF9F'
  const [ref, count] = useScrollCounter(12, 2500)

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,243,237,0.07)',
        borderTop: `3px solid ${color}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color, border: `1px solid ${color}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start' }}>
        TIME
      </span>
      <p className="font-cormorant" style={{ fontSize: '3.5rem', fontWeight: 600, color, margin: '0 0 0.1rem', lineHeight: 1 }}>
        {count} <span style={{ fontSize: '1.5rem' }}>hrs/week</span>
      </p>
      <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
        Back every week
      </p>
      <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
        Your follow-ups, reminders, and inbox — handled automatically. You only touch what actually needs you.
      </p>
      <ServiceTags tags={['Sales', 'Personal Admin']} color={color} />
    </div>
  )
}

// ─── Card 2 — Money ───────────────────────────────────────────────────────────
function MoneyCard() {
  const color = '#C4A97A'
  const [ref, count] = useScrollCounter(800, 2500)

  return (
    <div
      ref={ref}
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,243,237,0.07)',
        borderTop: `3px solid ${color}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color, border: `1px solid ${color}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start' }}>
        MONEY
      </span>
      <p className="font-cormorant" style={{ fontSize: '3.5rem', fontWeight: 600, color, margin: '0 0 0.1rem', lineHeight: 1 }}>
        ${count}<span style={{ fontSize: '1.5rem' }}>+</span>
      </p>
      <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
        Saved per week in admin costs
      </p>
      <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
        Every invoice chased, every receipt logged, every overdue payment followed up — without you lifting a finger.
      </p>
      <ServiceTags tags={['Finance', 'Customer Experience']} color={color} />
    </div>
  )
}

// ─── Card 3 — Growth ──────────────────────────────────────────────────────────
function GrowthCard() {
  const color = '#89ACBE'

  return (
    <div
      style={{
        backgroundColor: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(247,243,237,0.07)',
        borderTop: `3px solid ${color}`,
        borderRadius: '1.25rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '320px',
      }}
    >
      <span className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.12em', color, border: `1px solid ${color}40`, borderRadius: '9999px', padding: '0.2rem 0.6rem', display: 'inline-block', marginBottom: '1rem', alignSelf: 'flex-start' }}>
        GROWTH
      </span>
      <p className="font-cormorant" style={{ fontSize: '3.5rem', fontWeight: 600, color, margin: '0 0 0.1rem', lineHeight: 1 }}>
        +40%
      </p>
      <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.4)', margin: '0 0 1rem' }}>
        More leads converted
      </p>
      <p className="font-dm" style={{ fontSize: '0.9rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
        Every enquiry gets a fast, personal reply. Every lead gets followed up. No one slips through the cracks.
      </p>
      <div style={{ marginBottom: '1.5rem' }}>
        <PipelineVisual color={color} />
      </div>
      <ServiceTags tags={['Sales', 'Content']} color={color} />
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function WhatWeAutomate() {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '7rem 1.5rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          ref={ref}
          style={{
            textAlign: 'center',
            marginBottom: '4rem',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.9)', marginBottom: '1rem', fontWeight: 500 }}>
            WHAT CHANGES
          </p>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '0.5rem' }}>
            Here's what your business looks like when it runs itself.
          </h2>
        </div>

        {/* Cards grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          <TimeCard />
          <MoneyCard />
          <GrowthCard />
        </div>

        {/* Tagline */}
        <p
          className="font-cormorant"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: 'rgba(247,243,237,0.45)',
            marginTop: '3rem',
            letterSpacing: '-0.01em',
          }}
        >
          "We do the repetitive work so you can focus on the work only you can do."
        </p>
      </div>
    </section>
  )
}
