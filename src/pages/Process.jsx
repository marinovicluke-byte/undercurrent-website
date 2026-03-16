import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'

gsap.registerPlugin(ScrollTrigger)

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

// ─── Grain Canvas overlay (animated noise per panel) ────────────────────────
function GrainOverlay({ opacity = 0.055 }) {
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
          d[i] = d[i+1] = d[i+2] = v
          d[i+3] = 18
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

// ─── Spotlight that follows scroll position ──────────────────────────────────
function ScrollSpotlight({ scrollPct }) {
  const x = 20 + scrollPct * 60
  const y = 30 + Math.sin(scrollPct * Math.PI) * 40
  return (
    <div style={{
      position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
      background: `radial-gradient(ellipse 60% 50% at ${x}% ${y}%, rgba(143,175,159,0.07) 0%, transparent 70%)`,
      transition: 'background 0.1s linear',
    }} />
  )
}

// ─── Animated SVG — Map (network graph pulsing) ─────────────────────────────
function MapVisual() {
  const [phase, setPhase] = useState(0)
  const visibleRef = useRef(false)
  const svgRef = useRef(null)
  useEffect(() => {
    let raf
    const observer = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0 })
    if (svgRef.current) observer.observe(svgRef.current)
    const loop = () => { if (visibleRef.current) setPhase(p => p + 0.012); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])
  const nodes = [
    { x: 120, y: 50, r: 18, label: 'You', primary: true },
    { x: 48, y: 130, r: 13, label: 'CRM' },
    { x: 120, y: 155, r: 13, label: 'Email' },
    { x: 192, y: 130, r: 13, label: 'Tasks' },
    { x: 68, y: 220, r: 10, label: 'Reports' },
    { x: 172, y: 220, r: 10, label: 'Slack' },
  ]
  const edges = [[0,1],[0,2],[0,3],[1,4],[3,5],[2,4],[2,5]]
  return (
    <svg ref={svgRef} viewBox="0 0 240 270" fill="none" style={{ width: '100%', maxWidth: 200, height: 200, display: 'block' }}>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const pulse = 0.35 + 0.25 * Math.sin(phase + i * 0.8)
        return (
          <line
            key={i}
            x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
            stroke={`rgba(143,175,159,${pulse})`}
            strokeWidth={0.8 + pulse * 0.6}
            strokeDasharray="3 4"
          />
        )
      })}
      {nodes.map((n, i) => {
        const glow = 0.15 + 0.12 * Math.sin(phase * 0.7 + i * 1.1)
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r + 6} fill={`rgba(143,175,159,${glow})`} />
            <circle
              cx={n.x} cy={n.y} r={n.r}
              fill={n.primary ? 'rgba(143,175,159,0.22)' : 'rgba(28,28,26,0.8)'}
              stroke={n.primary ? '#8FAF9F' : 'rgba(143,175,159,0.35)'}
              strokeWidth={n.primary ? 1.5 : 1}
            />
            <text
              x={n.x} y={n.y + 4}
              textAnchor="middle"
              fontFamily="DM Mono, monospace"
              fontSize={n.primary ? 9 : 7.5}
              fill={n.primary ? '#8FAF9F' : 'rgba(247,243,237,0.6)'}
            >
              {n.label}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Animated visual — Build (automation schematic assembling) ───────────────
function BuildVisual() {
  // On mobile, start fully built; on desktop, animate from phase 0
  const [phase, setPhase] = useState(IS_MOBILE ? 13 : 0)
  // 13 phases: trigger → wires + nodes → branch → glow
  const TOTAL = 13

  useEffect(() => {
    if (IS_MOBILE) return
    if (phase < TOTAL) {
      const t = setTimeout(() => setPhase(p => p + 1), 370)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setPhase(0), 3800)
    return () => clearTimeout(t)
  }, [phase])

  // stroke-dashoffset "pen drawing" helper — instant hide, animated reveal
  const wire = (len, show) => ({
    strokeDasharray: len,
    strokeDashoffset: show ? 0 : len,
    transition: show ? `stroke-dashoffset 0.42s ease` : 'stroke-dashoffset 0s',
    fill: 'none',
  })

  // fade helper — instant hide, smooth reveal
  const fade = (show) => ({
    opacity: show ? 1 : 0,
    transition: show ? 'opacity 0.28s ease' : 'opacity 0s',
  })

  // Phase map (0 = empty, 13 = fully built):
  // 1  TRIGGER node
  // 2  wire A: trigger → enrich  (24px vertical)
  // 3  ENRICH node
  // 4  wire B: enrich → score    (22px vertical)
  // 5  SCORE node
  // 6  wire C: score → diamond   (10px vertical)
  // 7  ROUTE diamond (decision "> 80")
  // 8  wire D: left branch       (L-shape, 46px)
  // 9  NOTIFY node
  // 10 wire E: right branch      (L-shape, 46px)
  // 11 LOG node
  // 12 port dots + branch labels
  // 13 completion glow

  const SAGE  = 'rgba(143,175,159,0.85)'
  const SAND  = 'rgba(212,201,176,0.6)'
  const DARK  = 'rgba(28,28,26,0.9)'

  return (
    <svg viewBox="0 0 160 192" fill="none"
      style={{ width: '100%', maxWidth: 200, height: 200, display: 'block' }}>

      {/* ── Dot-grid background (engineering graph paper feel) ── */}
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => (
          <circle key={`${r}-${c}`}
            cx={8 + c * 36} cy={10 + r * 44} r={0.9}
            fill="rgba(212,201,176,0.07)" />
        ))
      )}

      {/* ── Wires (drawn via stroke-dashoffset) ── */}

      {/* Wire A: trigger bottom → enrich top  (80,28)→(80,52)  len=24 */}
      <line x1={80} y1={28} x2={80} y2={52}
        stroke={SAND} strokeWidth={1} style={wire(24, phase > 1)} />

      {/* Wire B: enrich bottom → score top  (80,76)→(80,98)  len=22 */}
      <line x1={80} y1={76} x2={80} y2={98}
        stroke={SAND} strokeWidth={1} style={wire(22, phase > 3)} />

      {/* Wire C: score bottom → diamond top  (80,122)→(80,132)  len=10 */}
      <line x1={80} y1={122} x2={80} y2={132}
        stroke={SAND} strokeWidth={1} style={wire(10, phase > 5)} />

      {/* Wire D: diamond left → notify  M62,144 L34,144 L34,162  len=28+18=46 */}
      <path d="M62,144 L34,144 L34,162"
        stroke={SAGE} strokeWidth={1} style={wire(46, phase > 7)} />

      {/* Wire E: diamond right → log  M98,144 L126,144 L126,162  len=28+18=46 */}
      <path d="M98,144 L126,144 L126,162"
        stroke={SAND} strokeWidth={1} style={wire(46, phase > 9)} />

      {/* ── Components ── */}

      {/* TRIGGER — pulsing origin dot */}
      <g style={fade(phase > 0)}>
        <circle cx={80} cy={19} r={10}
          fill={DARK} stroke={SAGE} strokeWidth={1} />
        <circle cx={80} cy={19} r={3.5} fill={SAGE} />
        <text x={80} y={15} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={5}
          fill="rgba(143,175,159,0.45)" letterSpacing="0.12em">TRIGGER</text>
      </g>

      {/* ENRICH block */}
      <g style={fade(phase > 2)}>
        <rect x={44} y={52} width={72} height={24} rx={2.5}
          fill={DARK} stroke={SAND} strokeWidth={0.75} />
        <rect x={44} y={52} width={72} height={2.5} rx={1}
          fill="rgba(212,201,176,0.1)" />
        <text x={80} y={67} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={7}
          fill="rgba(212,201,176,0.8)" letterSpacing="0.04em">enrich_data()</text>
      </g>

      {/* SCORE block */}
      <g style={fade(phase > 4)}>
        <rect x={44} y={98} width={72} height={24} rx={2.5}
          fill={DARK} stroke={SAND} strokeWidth={0.75} />
        <rect x={44} y={98} width={72} height={2.5} rx={1}
          fill="rgba(212,201,176,0.1)" />
        <text x={80} y={113} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={7}
          fill="rgba(212,201,176,0.8)" letterSpacing="0.04em">score_lead()</text>
      </g>

      {/* ROUTE diamond — decision node "> 80" */}
      <g style={fade(phase > 6)}>
        <polygon points="80,132 98,144 80,156 62,144"
          fill={DARK} stroke={SAGE} strokeWidth={0.75} />
        <text x={80} y={147} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={6}
          fill={SAGE} letterSpacing="0.04em">{`> 80`}</text>
      </g>

      {/* NOTIFY block (left / yes branch) */}
      <g style={fade(phase > 8)}>
        <rect x={8} y={162} width={52} height={22} rx={2.5}
          fill={DARK} stroke={SAGE} strokeWidth={0.75} />
        <rect x={8} y={162} width={52} height={2.5} rx={1}
          fill="rgba(143,175,159,0.1)" />
        <text x={34} y={176} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={6.5}
          fill={SAGE} letterSpacing="0.04em">notify()</text>
      </g>

      {/* LOG block (right / else branch) */}
      <g style={fade(phase > 10)}>
        <rect x={100} y={162} width={52} height={22} rx={2.5}
          fill={DARK} stroke={SAND} strokeWidth={0.75} />
        <rect x={100} y={162} width={52} height={2.5} rx={1}
          fill="rgba(212,201,176,0.08)" />
        <text x={126} y={176} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={6.5}
          fill="rgba(212,201,176,0.7)" letterSpacing="0.04em">log_crm()</text>
      </g>

      {/* ── Junction dots + branch labels ── */}
      <g style={fade(phase > 11)}>
        {/* Dots at wire junctions */}
        <circle cx={80} cy={28} r={2} fill={SAND} />
        <circle cx={80} cy={76} r={2} fill={SAND} />
        <circle cx={80} cy={122} r={2} fill={SAND} />
        <circle cx={34} cy={162} r={2} fill={SAGE} />
        <circle cx={126} cy={162} r={2} fill={SAND} />
        {/* Branch labels */}
        <text x={47} y={141} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={5}
          fill="rgba(143,175,159,0.5)" letterSpacing="0.06em">yes</text>
        <text x={113} y={141} textAnchor="middle"
          fontFamily="DM Mono, monospace" fontSize={5}
          fill="rgba(212,201,176,0.35)" letterSpacing="0.06em">log</text>
      </g>

      {/* ── Completion glow on NOTIFY (phase 13) ── */}
      <rect x={8} y={162} width={52} height={22} rx={2.5}
        fill="rgba(143,175,159,0.07)"
        style={fade(phase >= 13)} />
    </svg>
  )
}

// ─── Animated visual — Flow (orbiting system) ───────────────────────────────
function FlowVisual() {
  const [t, setT] = useState(0)
  const visibleRef = useRef(false)
  const svgRef = useRef(null)
  useEffect(() => {
    let raf
    const observer = new IntersectionObserver(([e]) => { visibleRef.current = e.isIntersecting }, { threshold: 0 })
    if (svgRef.current) observer.observe(svgRef.current)
    const loop = () => { if (visibleRef.current) setT(p => p + 0.018); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); observer.disconnect() }
  }, [])

  const cx = 110, cy = 110
  const orbits = [
    { r: 60, speed: 1, label: 'Email', offset: 0, color: 'rgba(143,175,159,0.85)' },
    { r: 60, speed: 1, label: 'CRM', offset: Math.PI * 0.66, color: 'rgba(212,201,176,0.8)' },
    { r: 60, speed: 1, label: 'Slack', offset: Math.PI * 1.33, color: 'rgba(247,243,237,0.7)' },
    { r: 85, speed: 0.6, label: 'Reports', offset: 0.4, color: 'rgba(107,124,74,0.8)' },
    { r: 85, speed: 0.6, label: 'Invoices', offset: Math.PI, color: 'rgba(143,175,159,0.6)' },
  ]

  return (
    <svg ref={svgRef} viewBox="0 0 220 220" fill="none" style={{ width: '100%', maxWidth: 200, height: 200, display: 'block' }}>
      {/* Orbit rings */}
      <circle cx={cx} cy={cy} r={60} stroke="rgba(143,175,159,0.08)" strokeWidth={1} />
      <circle cx={cx} cy={cy} r={85} stroke="rgba(143,175,159,0.05)" strokeWidth={1} />
      {/* Centre node */}
      <circle cx={cx} cy={cy} r={28} fill="rgba(143,175,159,0.1)" stroke="rgba(143,175,159,0.5)" strokeWidth={1.5} />
      <circle cx={cx} cy={cy} r={28}
        fill="none" stroke="rgba(143,175,159,0.25)" strokeWidth={8}
        style={{ filter: 'blur(6px)' }} />
      <text x={cx} y={cy - 5} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize={8} fill="rgba(143,175,159,0.9)">auto</text>
      <text x={cx} y={cy + 8} textAnchor="middle" fontFamily="DM Mono, monospace" fontSize={7} fill="rgba(247,243,237,0.4)">24/7</text>
      {/* Orbiting nodes */}
      {orbits.map((o, i) => {
        const angle = t * o.speed + o.offset
        const nx = cx + o.r * Math.cos(angle)
        const ny = cy + o.r * Math.sin(angle)
        // Faint line from center
        return (
          <g key={i}>
            <line x1={cx} y1={cy} x2={nx} y2={ny}
              stroke={o.color} strokeWidth={0.5} strokeDasharray="2 3" opacity={0.3} />
            <circle cx={nx} cy={ny} r={10}
              fill="rgba(28,28,26,0.9)" stroke={o.color} strokeWidth={1} />
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

// ─── Mobile breakpoint hook ──────────────────────────────────────────────────
function useIsMobile(bp = 700) {
  const [m, setM] = useState(() => window.innerWidth < bp)
  useEffect(() => {
    const h = () => setM(window.innerWidth < bp)
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [bp])
  return m
}

// ─── Step panel ──────────────────────────────────────────────────────────────
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
    body: 'Your systems run 24/7. You get time back. We stay on call to tune and scale as you grow — so the work keeps moving even when you\'re not.',
    visual: <FlowVisual />,
  },
]

function StepPanel({ step, index }) {
  const panelRef = useRef(null)
  const ghostRef = useRef(null)
  const contentRef = useRef(null)
  const tagRef = useRef(null)
  const bodyRef = useRef(null)
  const numRef = useRef(null)
  const wordRefs = useRef([])
  const isMobile = useIsMobile()

  useEffect(() => {
    const panel = panelRef.current
    const ghost = ghostRef.current
    const content = contentRef.current

    if (IS_MOBILE) {
      // On mobile: no clip-path (causes height recalc). Simple fade only.
      gsap.set(content, { opacity: 0 })
      gsap.set(ghost, { opacity: 0 })
      const tl = gsap.timeline({
        scrollTrigger: { trigger: panel, start: 'top 80%', toggleActions: 'play none none none' }
      })
      tl.to(content, { opacity: 1, duration: 0.6, ease: 'power2.out' })
        .to(ghost, { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.3')
      return () => tl.scrollTrigger?.kill()
    }

    // Desktop: full clip-path reveal
    gsap.set(content, { clipPath: 'inset(0 100% 0 0)', opacity: 1 })
    gsap.set(ghost, { opacity: 0, x: -30 })
    gsap.set(tagRef.current, { y: 20, opacity: 0 })
    gsap.set(bodyRef.current, { y: 20, opacity: 0 })
    gsap.set(numRef.current, { opacity: 0 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: panel,
        start: 'top 72%',
        toggleActions: 'play none none none',
      }
    })

    tl.to(ghost, { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' })
      .to(content, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.85,
        ease: 'power4.inOut',
      }, '-=0.5')
      .to(numRef.current, { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
      .to(tagRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(bodyRef.current, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')

    return () => tl.scrollTrigger?.kill()
  }, [isMobile])

  const isEven = index % 2 === 0

  return (
    <div
      ref={panelRef}
      style={{
        position: 'relative',
        background: '#1C1C1A',
        overflow: 'hidden',
        minHeight: isMobile ? 0 : 'clamp(480px, 55vw, 600px)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <GrainOverlay opacity={0.04} />

      {/* Ghost enormous number — watermark */}
      <div
        ref={ghostRef}
        style={{
          position: 'absolute',
          [isEven ? 'left' : 'right']: '-0.05em',
          top: '50%',
          transform: 'translateY(-54%)',
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 700,
          fontSize: 'clamp(220px, 30vw, 380px)',
          lineHeight: 1,
          color: 'transparent',
          WebkitTextStroke: `1px rgba(${step.color === '#8FAF9F' ? '143,175,159' : step.color === '#D4C9B0' ? '212,201,176' : '107,124,74'},0.09)`,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 1,
          letterSpacing: '-0.05em',
        }}
      >
        {step.num}
      </div>

      {/* Subtle side accent line */}
      <div style={{
        position: 'absolute',
        [isEven ? 'left' : 'right']: 0,
        top: '15%', bottom: '15%',
        width: 2,
        background: `linear-gradient(to bottom, transparent, ${step.color}55, transparent)`,
        zIndex: 3,
      }} />

      {/* Main content — revealed via clip-path */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 4,
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 5vw, 72px)',
          display: 'flex',
          flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'),
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 'clamp(32px, 5vw, 80px)',
        }}
      >
        {/* Text side */}
        <div style={{ flex: '1 1 55%', minWidth: 0 }}>
          {/* Step number inline */}
          <div ref={numRef} style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.75rem',
            letterSpacing: '0.16em',
            color: step.color,
            marginBottom: 20,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span>{step.num}</span>
            <span style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${step.color}60, transparent)`, maxWidth: 80 }} />
          </div>

          {/* The big word */}
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            fontWeight: 600,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            color: '#F7F3ED',
            marginBottom: 'clamp(20px, 3vw, 32px)',
          }}>
            {step.word}
          </div>

          {/* Tagline */}
          <p ref={tagRef} style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: 'clamp(0.75rem, 1.1vw, 0.85rem)',
            color: step.color,
            letterSpacing: '0.06em',
            marginBottom: 16,
            lineHeight: 1.5,
          }}>
            {step.tagline}
          </p>

          {/* Body */}
          <p ref={bodyRef} style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
            color: 'rgba(247,243,237,0.55)',
            lineHeight: 1.7,
            maxWidth: 400,
            fontWeight: 300,
          }}>
            {step.body}
          </p>
        </div>

        {/* Visual side */}
        <div style={{
          width: isMobile ? '100%' : '40%',
          maxWidth: isMobile ? '100%' : 280,
          height: 220,
          minHeight: 220,
          maxHeight: 220,
          flexShrink: 0,
          flexGrow: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          opacity: 0.9,
        }}>
          {step.visual}
        </div>
      </div>
    </div>
  )
}

// ─── Thin divider between panels ────────────────────────────────────────────
function PanelDivider({ color }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(to right, transparent, ${color}30, transparent)`,
    }} />
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Process() {
  const heroRef = useRef(null)
  const ctaRef = useRef(null)
  const [scrollPct, setScrollPct] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      setScrollPct(max > 0 ? window.scrollY / max : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.p-hero-eyebrow',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.15 }
      )
      gsap.fromTo('.p-hero-h1',
        { y: 32, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )
      gsap.fromTo('.p-hero-sub',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.55 }
      )
    }, heroRef)

    const ctaTl = gsap.timeline({
      scrollTrigger: { trigger: ctaRef.current, start: 'top 85%' }
    })
    ctaTl.fromTo(ctaRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }
    )

    return () => { ctx.revert(); ctaTl.scrollTrigger?.kill() }
  }, [])

  return (
    <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
      <PageHead
        title="How We Work — UnderCurrent"
        description="Three precise steps: Map your workflows, Build automations that fit, let them Flow around the clock."
        canonical="https://undercurrent.au/process"
      />
      <ScrollProgressBar />
      <Navbar isSubPage={true} />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative',
          background: '#1C1C1A',
          overflow: 'hidden',
          paddingTop: 'clamp(120px, 16vw, 160px)',
          paddingBottom: 'clamp(56px, 8vw, 96px)',
          paddingLeft: 'clamp(24px, 5vw, 72px)',
          paddingRight: 'clamp(24px, 5vw, 72px)',
        }}
      >
        <GrainOverlay opacity={0.045} />
        <ScrollSpotlight scrollPct={scrollPct} />

        {/* Background text watermark */}
        <div style={{
          position: 'absolute', right: '-0.04em', bottom: '-0.15em',
          fontFamily: 'Cormorant Garamond, serif', fontWeight: 700,
          fontSize: 'clamp(180px, 26vw, 340px)',
          lineHeight: 1, letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1px rgba(143,175,159,0.07)',
          pointerEvents: 'none', userSelect: 'none', zIndex: 1,
        }}>
          Work
        </div>

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 1100, margin: '0 auto' }}>
          <p className="p-hero-eyebrow" style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.16em', color: '#8FAF9F',
            textTransform: 'uppercase', marginBottom: 20, opacity: 0,
          }}>
            The Process
          </p>

          <h1 className="p-hero-h1" style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3.5rem, 9vw, 7.5rem)',
            fontWeight: 600, lineHeight: 0.92,
            letterSpacing: '-0.03em', color: '#F7F3ED',
            marginBottom: 'clamp(24px, 3vw, 36px)',
            opacity: 0,
          }}>
            How we<br/>
            <span style={{ color: '#8FAF9F' }}>work</span>
          </h1>

          <div className="p-hero-sub" style={{ opacity: 0, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.1rem)',
              color: 'rgba(247,243,237,0.45)',
              maxWidth: 340, lineHeight: 1.6, fontWeight: 300,
            }}>
              Three steps. Clean handoff. Runs without you.
            </p>
            {/* Step index pills */}
            <div style={{ display: 'flex', gap: 8, marginTop: 20 }}>
              {STEPS.map((s, i) => (
                <div key={i} style={{
                  fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
                  letterSpacing: '0.1em', color: s.color,
                  border: `1px solid ${s.color}40`,
                  borderRadius: 9999, padding: '4px 12px',
                }}>
                  {s.num} {s.word}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 80, zIndex: 4,
          background: 'linear-gradient(to bottom, transparent, #1C1C1A)',
        }} />
      </section>

      {/* ── Three Step Panels ────────────────────────────────────────── */}
      <div>
        {STEPS.map((step, i) => (
          <div key={i}>
            <StepPanel step={step} index={i} />
            {i < STEPS.length - 1 && <PanelDivider color={step.color} />}
          </div>
        ))}
      </div>

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section
        style={{
          background: '#1C1C1A',
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(64px, 9vw, 112px) clamp(24px, 5vw, 72px)',
        }}
      >
        <GrainOverlay opacity={0.035} />
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(143,175,159,0.06) 0%, transparent 70%)',
          pointerEvents: 'none', zIndex: 1,
        }} />

        <div ref={ctaRef} style={{
          position: 'relative', zIndex: 2, opacity: 0,
          maxWidth: 1100, margin: '0 auto',
          textAlign: 'center',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24,
        }}>
          <p style={{
            fontFamily: 'DM Mono, monospace', fontSize: '0.75rem',
            letterSpacing: '0.14em', color: '#8FAF9F',
            textTransform: 'uppercase',
          }}>
            Ready to start
          </p>
          <h2 style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
            fontWeight: 600, lineHeight: 0.95,
            letterSpacing: '-0.03em', color: '#F7F3ED',
          }}>
            Let's map your<br/>
            <span style={{ color: '#8FAF9F' }}>business.</span>
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            color: 'rgba(247,243,237,0.4)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            fontWeight: 300, lineHeight: 1.6,
            maxWidth: 320,
          }}>
            A 30-minute call. No pitch deck. Just your workflows and where they're leaking time.
          </p>
          <a
            href="mailto:hello@undercurrent.au"
            className="btn-sage-hero"
            style={{ marginTop: 8, padding: '0.85rem 2.4rem', fontSize: '0.88rem' }}
          >
            <span>Book a call</span>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
