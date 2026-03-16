import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// ─── Grain Canvas overlay ────────────────────────────────────────────────────
function GrainOverlay({ opacity = 0.045 }) {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf
    let visible = false
    const observer = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    observer.observe(canvas)
    const draw = () => {
      if (visible) {
        const w = canvas.width = canvas.offsetWidth
        const h = canvas.height = canvas.offsetHeight
        const img = ctx.createImageData(w, h)
        const d = img.data
        for (let i = 0; i < d.length; i += 4) {
          const v = (Math.random() * 255) | 0
          d[i] = d[i + 1] = d[i + 2] = v
          d[i + 3] = 18
        }
        ctx.putImageData(img, 0, 0)
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2, opacity,
      }}
    />
  )
}

// ─── Map Visual — pulsing network graph ─────────────────────────────────────
function MapVisual() {
  const [phase, setPhase] = useState(0)
  const visibleRef = useRef(false)
  const containerRef = useRef(null)
  useEffect(() => {
    let raf
    const loop = () => {
      if (visibleRef.current) setPhase(p => p + 0.012)
      raf = requestAnimationFrame(loop)
    }
    const observer = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0 })
    if (containerRef.current) observer.observe(containerRef.current)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])
  const nodes = [
    { x: 120, y: 50,  r: 18, label: 'You',     primary: true },
    { x: 48,  y: 130, r: 13, label: 'CRM' },
    { x: 120, y: 155, r: 13, label: 'Email' },
    { x: 192, y: 130, r: 13, label: 'Tasks' },
    { x: 68,  y: 220, r: 10, label: 'Reports' },
    { x: 172, y: 220, r: 10, label: 'Slack' },
  ]
  const edges = [[0,1],[0,2],[0,3],[1,4],[3,5],[2,4],[2,5]]
  return (
    <svg ref={containerRef} viewBox="0 0 240 270" fill="none" style={{ width: '100%', maxWidth: 180, display: 'block' }}>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const pulse = 0.35 + 0.25 * Math.sin(phase + i * 0.8)
        return (
          <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={`rgba(143,175,159,${pulse})`}
            strokeWidth={0.8 + pulse * 0.6} strokeDasharray="3 4" />
        )
      })}
      {nodes.map((n, i) => {
        const glow = 0.15 + 0.12 * Math.sin(phase * 0.7 + i * 1.1)
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 6} fill={`rgba(143,175,159,${glow})`} />
            <circle cx={n.x} cy={n.y} r={n.r}
              fill={n.primary ? 'rgba(143,175,159,0.22)' : 'rgba(28,28,26,0.8)'}
              stroke={n.primary ? '#8FAF9F' : 'rgba(143,175,159,0.35)'}
              strokeWidth={n.primary ? 1.5 : 1} />
            <text x={n.x} y={n.y + 4} textAnchor="middle"
              fontFamily="DM Mono, monospace"
              fontSize={n.primary ? 9 : 7.5}
              fill={n.primary ? '#8FAF9F' : 'rgba(247,243,237,0.6)'}>
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Build Visual — typewriter terminal ─────────────────────────────────────
const BUILD_LINES = [
  { t: '$ trigger  new_lead',   c: 'rgba(143,175,159,0.9)' },
  { t: '  ↳ enrich_contact()',  c: 'rgba(212,201,176,0.7)' },
  { t: '  ↳ score_lead(data)',  c: 'rgba(212,201,176,0.7)' },
  { t: '  ↳ if score > 80:',    c: 'rgba(212,201,176,0.7)' },
  { t: '      notify_sales()',  c: 'rgba(247,243,237,0.85)' },
  { t: '  ↳ log_to_crm()',      c: 'rgba(212,201,176,0.7)' },
  { t: '✓ done  0.3s elapsed',  c: 'rgba(107,124,74,0.95)' },
]

function BuildVisual() {
  const [shown, setShown] = useState([])
  const [cur, setCur] = useState('')
  const [li, setLi] = useState(0)
  const [ci, setCi] = useState(0)
  const [blink, setBlink] = useState(true)

  useEffect(() => {
    const b = setInterval(() => setBlink(v => !v), 530)
    return () => clearInterval(b)
  }, [])

  useEffect(() => {
    if (li >= BUILD_LINES.length) {
      const r = setTimeout(() => { setShown([]); setCur(''); setLi(0); setCi(0) }, 2800)
      return () => clearTimeout(r)
    }
    const line = BUILD_LINES[li].t
    if (ci < line.length) {
      const t = setTimeout(() => { setCur(p => p + line[ci]); setCi(c => c + 1) }, 22)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setShown(p => [...p, BUILD_LINES[li]])
      setCur(''); setCi(0); setLi(l => l + 1)
    }, 160)
    return () => clearTimeout(t)
  }, [li, ci])

  return (
    <div style={{
      background: '#0d0d0c', borderRadius: 10, padding: '12px 14px',
      fontFamily: 'DM Mono, monospace', width: '100%',
      border: '1px solid rgba(143,175,159,0.12)',
      boxShadow: '0 0 30px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.03)',
    }}>
      <div style={{ display: 'flex', gap: 5, marginBottom: 10 }}>
        {['#FF5F57','#FFBD2E','#28C840'].map((c, i) => (
          <div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: c, opacity: 0.6 }} />
        ))}
      </div>
      {shown.map((line, i) => (
        <div key={i} style={{ fontSize: '0.75rem', color: line.c, lineHeight: 1.85, opacity: i < shown.length - 2 ? 0.4 : 0.85 }}>
          {line.t}
        </div>
      ))}
      {li < BUILD_LINES.length && (
        <div style={{ fontSize: '0.75rem', color: BUILD_LINES[li].c, lineHeight: 1.85 }}>
          {cur}<span style={{ opacity: blink ? 1 : 0 }}>▋</span>
        </div>
      )}
    </div>
  )
}

// ─── Flow Visual — orbiting system ──────────────────────────────────────────
function FlowVisual() {
  const [t, setT] = useState(0)
  const visibleRef = useRef(false)
  const containerRef = useRef(null)
  useEffect(() => {
    let raf
    const loop = () => {
      if (visibleRef.current) setT(p => p + 0.018)
      raf = requestAnimationFrame(loop)
    }
    const observer = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0 })
    if (containerRef.current) observer.observe(containerRef.current)
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])

  const cx = 110, cy = 110
  const orbits = [
    { r: 60, speed: 1,   label: 'Email',    offset: 0,              color: 'rgba(143,175,159,0.85)' },
    { r: 60, speed: 1,   label: 'CRM',      offset: Math.PI * 0.66, color: 'rgba(212,201,176,0.8)' },
    { r: 60, speed: 1,   label: 'Slack',    offset: Math.PI * 1.33, color: 'rgba(247,243,237,0.7)' },
    { r: 85, speed: 0.6, label: 'Reports',  offset: 0.4,            color: 'rgba(107,124,74,0.8)' },
    { r: 85, speed: 0.6, label: 'Invoices', offset: Math.PI,        color: 'rgba(143,175,159,0.6)' },
  ]

  return (
    <svg ref={containerRef} viewBox="0 0 220 220" fill="none" style={{ width: '100%', maxWidth: 180, display: 'block' }}>
      <circle cx={cx} cy={cy} r={60} stroke="rgba(143,175,159,0.08)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={85} stroke="rgba(143,175,159,0.05)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={28} fill="rgba(143,175,159,0.1)" stroke="rgba(143,175,159,0.5)" strokeWidth={1.5} />
      <text x={cx} y={cy - 4} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize={8} fill="rgba(143,175,159,0.9)">auto</text>
      <text x={cx} y={cy + 9} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize={7} fill="rgba(247,243,237,0.4)">24/7</text>
      {orbits.map((o, i) => {
        const angle = t * o.speed + o.offset
        const nx = cx + o.r * Math.cos(angle)
        const ny = cy + o.r * Math.sin(angle)
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={nx} y2={ny}
              stroke={o.color} strokeWidth={0.5} strokeDasharray="2 3" opacity={0.3} />
            <circle cx={nx} cy={ny} r={10} fill="rgba(28,28,26,0.9)" stroke={o.color} strokeWidth={1} />
            <text x={nx} y={ny + 4} textAnchor="middle"
              fontFamily="DM Sans, sans-serif" fontSize={6} fill={o.color}>
              {o.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Step data ────────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01',
    word: 'Map',
    color: '#8FAF9F',
    tagline: 'Understand before we touch anything.',
    body: 'We audit your business in 30 minutes. Every repeated task, every bottleneck — ranked by time saved. You see exactly where hours are leaking.',
    visual: <MapVisual />,
  },
  {
    num: '02',
    word: 'Build',
    color: '#D4C9B0',
    tagline: 'Precision engineering, zero disruption.',
    body: 'We build custom automations that plug directly into your existing tools. No new software to learn. No processes ripped up. Just the slow parts, gone.',
    visual: <BuildVisual />,
  },
  {
    num: '03',
    word: 'Flow',
    color: '#6B7C4A',
    tagline: 'Set in motion. Stays in motion.',
    body: "Your systems run 24/7. You get time back. We stay on call to tune and scale as you grow — so the work keeps moving even when you're not.",
    visual: <FlowVisual />,
  },
]

// ─── Compact step card ────────────────────────────────────────────────────────
function StepCard({ step, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const tween = gsap.fromTo(
      cardRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
        delay: index * 0.12,
        scrollTrigger: { trigger: cardRef.current, start: 'top 82%', toggleActions: 'play none none none' },
      }
    )
    return () => tween.scrollTrigger?.kill()
  }, [])

  return (
    <div
      ref={cardRef}
      style={{
        position: 'relative',
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid rgba(${step.color === '#8FAF9F' ? '143,175,159' : step.color === '#D4C9B0' ? '212,201,176' : '107,124,74'},0.14)`,
        borderRadius: 20,
        padding: 'clamp(24px, 3vw, 36px)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        overflow: 'hidden',
      }}
    >
      {/* Ghost number — decorative, clipped inside card */}
      <div style={{
        position: 'absolute',
        right: '-0.06em',
        bottom: '-0.18em',
        fontFamily: 'Cormorant Garamond, serif',
        fontWeight: 700,
        fontSize: 'clamp(100px, 14vw, 160px)',
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: `1px rgba(${step.color === '#8FAF9F' ? '143,175,159' : step.color === '#D4C9B0' ? '212,201,176' : '107,124,74'},0.07)`,
        pointerEvents: 'none',
        userSelect: 'none',
        zIndex: 0,
        letterSpacing: '-0.04em',
      }}>
        {step.num}
      </div>

      {/* Left accent line */}
      <div style={{
        position: 'absolute',
        left: 0, top: '20%', bottom: '20%',
        width: 2,
        borderRadius: 2,
        background: `linear-gradient(to bottom, transparent, ${step.color}60, transparent)`,
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Number row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
        }}>
          <span style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.14em', color: step.color, fontWeight: 500,
          }}>
            {step.num}
          </span>
          <div style={{
            flex: 1, height: 1, maxWidth: 60,
            background: `linear-gradient(to right, ${step.color}50, transparent)`,
          }} />
        </div>

        {/* Word */}
        <div style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 5vw, 4.5rem)',
          fontWeight: 600, lineHeight: 0.9,
          letterSpacing: '-0.03em', color: '#F7F3ED',
          marginBottom: 14,
        }}>
          {step.word}
        </div>

        {/* Tagline */}
        <p style={{
          fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
          color: step.color, letterSpacing: '0.04em',
          marginBottom: 10, lineHeight: 1.5,
        }}>
          {step.tagline}
        </p>

        {/* Body */}
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
          color: 'rgba(247,243,237,0.48)',
          lineHeight: 1.7, fontWeight: 300,
        }}>
          {step.body}
        </p>
      </div>

      {/* Visual */}
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        position: 'relative', zIndex: 1,
        opacity: 0.9,
        marginTop: 'auto',
      }}>
        {step.visual}
      </div>
    </div>
  )
}

// ─── Protocol section ─────────────────────────────────────────────────────────
export default function Protocol() {
  const heroRef  = useRef(null)
  const gridRef  = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.proto-eyebrow',
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, ease: 'power3.out',
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.proto-h2',
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.15,
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%' } }
      )
      gsap.fromTo('.proto-sub',
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3,
          scrollTrigger: { trigger: heroRef.current, start: 'top 80%' } }
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="protocol" style={{ backgroundColor: '#1C1C1A', overflow: 'hidden' }}>

      {/* ── Section header ── */}
      <div
        ref={heroRef}
        style={{
          position: 'relative',
          overflow: 'hidden',
          paddingTop: 'clamp(56px, 8vw, 88px)',
          paddingBottom: 'clamp(36px, 4vw, 56px)',
          paddingLeft: 'clamp(24px, 5vw, 64px)',
          paddingRight: 'clamp(24px, 5vw, 64px)',
        }}
      >
        <GrainOverlay opacity={0.038} />

        {/* Watermark */}
        <div style={{
          position: 'absolute', right: '-0.04em', bottom: '-0.12em',
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 700,
          fontSize: 'clamp(120px, 18vw, 240px)', lineHeight: 1,
          letterSpacing: '-0.04em', color: 'transparent',
          WebkitTextStroke: '1px rgba(143,175,159,0.06)',
          pointerEvents: 'none', userSelect: 'none', zIndex: 1,
        }}>
          Work
        </div>

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 1100, margin: '0 auto' }}>
          <p className="proto-eyebrow" style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.16em', color: '#8FAF9F',
            textTransform: 'uppercase', marginBottom: 16, opacity: 0,
          }}>
            The Process
          </p>

          <div style={{
            display: 'flex', flexDirection: 'row', flexWrap: 'wrap',
            alignItems: 'flex-end', justifyContent: 'space-between', gap: 20,
          }}>
            <h2 className="proto-h2" style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              fontWeight: 600, lineHeight: 0.93,
              letterSpacing: '-0.03em', color: '#F7F3ED',
              opacity: 0,
            }}>
              How we<br />
              <span style={{ color: '#8FAF9F' }}>work</span>
            </h2>

            <div className="proto-sub" style={{ opacity: 0, maxWidth: 300, paddingBottom: 4 }}>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
                color: 'rgba(247,243,237,0.42)',
                lineHeight: 1.65, fontWeight: 300, marginBottom: 16,
              }}>
                Three steps. One clean handoff.<br />Runs without you.
              </p>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {STEPS.map((s) => (
                  <div key={s.num} style={{
                    fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
                    letterSpacing: '0.1em', color: s.color,
                    border: `1px solid ${s.color}40`,
                    borderRadius: 9999, padding: '3px 10px',
                  }}>
                    {s.num} {s.word}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade into grid */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 48, zIndex: 4,
          background: 'linear-gradient(to bottom, transparent, #1C1C1A)',
        }} />
      </div>

      {/* ── Compact 3-column grid ── */}
      <div
        ref={gridRef}
        style={{
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(16px, 3vw, 32px) clamp(24px, 5vw, 64px) clamp(56px, 7vw, 88px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(14px, 2vw, 22px)',
        }}
      >
        {STEPS.map((step, i) => (
          <StepCard key={step.num} step={step} index={i} />
        ))}
      </div>

    </section>
  )
}
