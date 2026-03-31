import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import WaveDivider from '../components/WaveDivider'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import Breadcrumb from '../components/Breadcrumb'
import { CTA_HREF } from '../constants'

const DOMAIN = 'https://www.undercurrentautomations.com'
const LIGHT     = '#F7F3ED'
const PARCHMENT = '#E8E0D0'
const CHARCOAL  = '#1C1C1A'
const SAGE      = '#8FAF9F'
const WARM_DARK = '#1a1816'

// ─── Grain canvas ────────────────────────────────────────────────────────────
function Grain({ opacity = 0.045 }) {
  const ref = useRef(null)
  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf
    let visible = false
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    obs.observe(canvas)
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
    return () => { cancelAnimationFrame(raf); obs.disconnect() }
  }, [])
  return <canvas ref={ref} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 2, opacity }} />
}

// ─── Flowing current — used inside process step cards ────────────────────────
function StepCurrentAnim() {
  const [phase, setPhase] = useState(0)
  const svgRef = useRef(null)
  const visRef = useRef(false)
  useEffect(() => {
    let raf
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0 })
    if (svgRef.current) obs.observe(svgRef.current)
    const loop = () => {
      if (visRef.current) setPhase(p => p + 0.035)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); obs.disconnect() }
  }, [])

  const waves = [
    { yBase: 60,  amp: 14, freq: 0.022, speed: 1.0, opacity: 0.13, width: 1.2 },
    { yBase: 100, amp: 10, freq: 0.018, speed: 0.7, opacity: 0.09, width: 0.9 },
    { yBase: 140, amp: 16, freq: 0.025, speed: 1.3, opacity: 0.07, width: 0.7 },
  ]
  const W = 300, H = 200
  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {waves.map((w, wi) => {
        const pts = Array.from({ length: 60 }, (_, i) => {
          const x = (i / 59) * W
          const y = w.yBase + w.amp * Math.sin(phase * w.speed + i * w.freq)
          return `${x},${y}`
        }).join(' ')
        return (
          <polyline
            key={wi}
            points={pts}
            fill="none"
            stroke={`rgba(143,175,159,${w.opacity})`}
            strokeWidth={w.width}
          />
        )
      })}
    </svg>
  )
}

// ─── Pipeline anim (Professional Services) ───────────────────────────────────
function PipelineAnim() {
  const [active, setActive] = useState(0)
  const stages = ['Contract signed', 'Welcome sequence sent', 'Week 1 check-in', 'Review request triggered']
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % stages.length), 1400)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: '24px 20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
      {stages.map((stage, i) => {
        const isPast = i < active
        const isCurrent = i === active
        return (
          <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 10, transition: 'opacity 0.4s', opacity: isPast ? 0.3 : isCurrent ? 1 : 0.18 }}>
            <div style={{
              width: 7, height: 7, borderRadius: '50%', flexShrink: 0,
              background: isCurrent ? SAGE : isPast ? 'rgba(143,175,159,0.35)' : 'rgba(212,201,176,0.15)',
              boxShadow: isCurrent ? `0 0 7px ${SAGE}` : 'none',
              transition: 'all 0.4s',
            }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: isCurrent ? SAGE : 'rgba(232,224,208,0.5)', letterSpacing: '0.04em', transition: 'color 0.4s' }}>{stage}</span>
          </div>
        )
      })}
      <div style={{ marginTop: 6, fontFamily: 'DM Mono', fontSize: 10, color: 'rgba(143,175,159,0.4)', letterSpacing: '0.08em' }}>RUNNING CONTINUOUSLY</div>
    </div>
  )
}

// ─── Terminal anim (Trades) ───────────────────────────────────────────────────
function TerminalAnim() {
  const sequences = [
    ['> Enquiry received: James K.', '> Qualifying lead...', '> Quote generated: $4,200', '> Email sent automatically', '> Invoice: PAID'],
    ['> New booking: Sarah M.', '> Job details captured', '> Schedule confirmed', '> Reminder sent: 24hrs prior', '> Review request: sent'],
  ]
  const [seq, setSeq] = useState(0)
  const [visible, setVisible] = useState(1)
  useEffect(() => {
    const t = setInterval(() => {
      setVisible(v => {
        if (v < sequences[seq].length) return v + 1
        setTimeout(() => { setSeq(s => (s + 1) % sequences.length); setVisible(1) }, 800)
        return v
      })
    }, 900)
    return () => clearInterval(t)
  }, [seq])
  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ background: 'rgba(0,0,0,0.25)', borderRadius: 8, padding: '14px 16px', border: '1px solid rgba(143,175,159,0.12)' }}>
        {sequences[seq].slice(0, visible).map((line, i) => (
          <div key={i} style={{ fontFamily: 'DM Mono, monospace', fontSize: 10.5, lineHeight: 1.75, color: i === visible - 1 ? SAGE : 'rgba(232,224,208,0.4)', transition: 'color 0.3s' }}>{line}</div>
        ))}
        <span style={{ display: 'inline-block', width: 7, height: 13, background: SAGE, opacity: 0.7, animation: 'uc-blink 1s step-end infinite', verticalAlign: 'text-bottom', marginLeft: 2 }} />
      </div>
    </div>
  )
}

// ─── Lead gen anim (Lead Generation card) ────────────────────────────────────
function LeadGenAnim() {
  const [step, setStep] = useState(0)
  const flow = [
    { label: 'Lead captured',     value: '24 this week' },
    { label: 'Follow-up sent',    value: 'Automatic' },
    { label: 'Meetings booked',   value: '9 confirmed' },
  ]
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), 1500)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
      {flow.map(({ label, value }, i) => (
        <div key={label} style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '9px 12px', borderRadius: 7,
          background: i === step ? 'rgba(143,175,159,0.12)' : 'rgba(143,175,159,0.04)',
          border: `1px solid ${i === step ? 'rgba(143,175,159,0.25)' : 'rgba(143,175,159,0.08)'}`,
          transition: 'all 0.4s',
        }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: i === step ? 'rgba(232,224,208,0.85)' : 'rgba(232,224,208,0.4)' }}>{label}</span>
          <span style={{ fontFamily: 'DM Mono', fontSize: 12, color: i === step ? SAGE : 'rgba(143,175,159,0.3)', transition: 'color 0.4s' }}>{value}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Network anim (Custom-built benefit) ─────────────────────────────────────
function NetworkAnim() {
  const [phase, setPhase] = useState(0)
  const svgRef = useRef(null)
  const visRef = useRef(false)
  useEffect(() => {
    let raf
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0 })
    if (svgRef.current) obs.observe(svgRef.current)
    const loop = () => { if (visRef.current) setPhase(p => p + 0.015); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); obs.disconnect() }
  }, [])
  const nodes = [
    { x: 110, y: 50,  r: 16, label: 'Your ops' },
    { x: 44,  y: 120, r: 11, label: 'CRM' },
    { x: 110, y: 140, r: 11, label: 'Email' },
    { x: 176, y: 120, r: 11, label: 'Tasks' },
    { x: 64,  y: 200, r: 9,  label: 'Reports' },
    { x: 156, y: 200, r: 9,  label: 'Slack' },
  ]
  const edges = [[0,1],[0,2],[0,3],[1,4],[3,5],[2,4],[2,5]]
  return (
    <svg ref={svgRef} viewBox="0 0 220 240" fill="none" style={{ width: '100%', maxWidth: 180, height: 180, display: 'block', margin: '0 auto' }}>
      {edges.map(([a, b], i) => {
        const na = nodes[a], nb = nodes[b]
        const p = 0.28 + 0.22 * Math.sin(phase + i * 0.9)
        return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={`rgba(143,175,159,${p})`} strokeWidth={0.7 + p * 0.5} strokeDasharray="3 4" />
      })}
      {nodes.map((n, i) => {
        const pulse = 0.6 + 0.25 * Math.sin(phase * 1.3 + i * 1.1)
        return (
          <g key={i}>
            <circle cx={n.x} cy={n.y} r={n.r * 1.6} fill={`rgba(143,175,159,${pulse * 0.07})`} />
            <circle cx={n.x} cy={n.y} r={n.r} fill="rgba(28,28,26,0.9)" stroke={`rgba(143,175,159,${pulse * 0.6})`} strokeWidth={0.8} />
            <text x={n.x} y={n.y + 0.4} textAnchor="middle" dominantBaseline="middle" fill={`rgba(232,224,208,${0.45 + pulse * 0.3})`} fontSize={n.r * 0.65} fontFamily="DM Sans">{n.label}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Retainer anim (Maintained and Improving benefit) ────────────────────────
function RetainerAnim() {
  const [shown, setShown] = useState(0)
  const [cycling, setCycling] = useState(false)
  const items = ['Monitored continuously', 'Maintained as needed', 'Improved over time', 'New workflows added', 'On call when you need us']
  useEffect(() => {
    const t = setInterval(() => {
      setShown(n => {
        if (n < items.length) return n + 1
        if (!cycling) { setCycling(true); return 0 }
        return n + 1
      })
    }, 650)
    return () => clearInterval(t)
  }, [cycling])
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 9, height: '100%' }}>
      {items.slice(0, shown).map((item, i) => (
        <div key={item + i} style={{ display: 'flex', alignItems: 'center', gap: 10, animation: 'uc-fadein 0.35s ease' }}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="7.5" cy="7.5" r="6.5" stroke={SAGE} strokeWidth="0.9" />
            <path d="M4 7.5l2.5 2.5L11 5" stroke={SAGE} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span style={{ fontFamily: 'DM Sans', fontSize: 12.5, color: 'rgba(232,224,208,0.7)' }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Integrations anim ────────────────────────────────────────────────────────
function IntegrationsAnim() {
  const [phase, setPhase] = useState(0)
  const tools = ['Xero', 'HubSpot', 'Shopify', 'Gmail', 'Slack', 'Notion']
  useEffect(() => {
    const t = setInterval(() => setPhase(p => p + 0.02), 50)
    return () => clearInterval(t)
  }, [])
  const cx = 110, cy = 110, r = 72
  return (
    <svg viewBox="0 0 220 220" style={{ width: '100%', maxWidth: 190, height: 190, display: 'block', margin: '0 auto' }}>
      <circle cx={cx} cy={cy} r={22} fill="rgba(28,28,26,0.9)" stroke="rgba(143,175,159,0.35)" strokeWidth={1} />
      <text x={cx} y={cy + 0.5} textAnchor="middle" dominantBaseline="middle" fill={SAGE} fontSize="9" fontFamily="DM Mono" letterSpacing="0.05em">YOU</text>
      {tools.map((tool, i) => {
        const angle = (i / tools.length) * Math.PI * 2 + phase * 0.3
        const tx = cx + r * Math.cos(angle)
        const ty = cy + r * Math.sin(angle)
        const pulse = 0.28 + 0.18 * Math.sin(phase * 1.2 + i * 1.3)
        return (
          <g key={tool}>
            <line x1={cx} y1={cy} x2={tx} y2={ty} stroke={`rgba(143,175,159,${pulse})`} strokeWidth={0.7} strokeDasharray="2 3" />
            <circle cx={tx} cy={ty} r={18} fill="rgba(28,28,26,0.85)" stroke={`rgba(143,175,159,${0.18 + pulse * 0.3})`} strokeWidth={0.8} />
            <text x={tx} y={ty + 0.5} textAnchor="middle" dominantBaseline="middle" fill={`rgba(232,224,208,${0.38 + pulse * 0.4})`} fontSize="8" fontFamily="DM Sans">{tool}</text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Results anim — non-italic DM Sans numbers ───────────────────────────────
function ResultsAnim() {
  const targets = [
    { label: 'More pipeline',    value: '3x',    sub: 'same headcount' },
    { label: 'More reviews',     value: '+40%',  sub: 'automated ask' },
    { label: 'Hours back / week', value: '15-25', sub: 'per person' },
  ]
  const [tick, setTick] = useState(0)
  useEffect(() => {
    const t = setInterval(() => setTick(n => (n + 1) % targets.length), 2000)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 12, height: '100%', justifyContent: 'center' }}>
      {targets.map(({ label, value, sub }, i) => (
        <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: i === tick ? 1 : 0.25, transition: 'opacity 0.5s' }}>
          <div style={{ minWidth: 58 }}>
            <span style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 28, fontWeight: 700,
              color: SAGE, lineHeight: 1, display: 'block',
            }}>{value}</span>
          </div>
          <div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 12.5, color: 'rgba(232,224,208,0.8)', fontWeight: 500 }}>{label}</div>
            <div style={{ fontFamily: 'DM Sans', fontSize: 11, color: 'rgba(232,224,208,0.3)' }}>{sub}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

const ANIM_MAP = {
  pipeline:     PipelineAnim,
  terminal:     TerminalAnim,
  leadgen:      LeadGenAnim,
  network:      NetworkAnim,
  retainer:     RetainerAnim,
  integrations: IntegrationsAnim,
  results:      ResultsAnim,
}

// ─── Industry card ────────────────────────────────────────────────────────────
function IndustryCard({ industry, index }) {
  const AnimComp = ANIM_MAP[industry.animType]
  return (
    <Reveal delay={index * 0.1} style={{ flex: '1 1 280px', minWidth: 0 }}>
      <div
        style={{ borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid rgba(212,201,176,0.2)', background: LIGHT, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 20px rgba(28,28,26,0.06)', transition: 'transform 0.25s, box-shadow 0.25s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(28,28,26,0.1)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(28,28,26,0.06)' }}
      >
        <div style={{ position: 'relative', background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 40%, #3d4f42 75%, rgba(143,175,159,0.25) 100%)', height: 188, overflow: 'hidden' }}>
          <Grain opacity={0.04} />
          <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'radial-gradient(ellipse 80% 70% at 50% 30%, rgba(143,175,159,0.1) 0%, transparent 70%)' }} />
          <div style={{ position: 'relative', zIndex: 3, height: '100%' }}>
            {AnimComp && <AnimComp />}
          </div>
        </div>
        <div style={{ padding: '24px 28px 28px', flex: 1 }}>
          <span style={{ display: 'inline-block', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: SAGE, background: 'rgba(143,175,159,0.08)', border: '1px solid rgba(143,175,159,0.18)', padding: '4px 10px', borderRadius: 999, marginBottom: 12 }}>{industry.label}</span>
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 500, color: CHARCOAL, lineHeight: 1.2, margin: '0 0 10px' }}>{industry.headline}</h3>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14.5, lineHeight: 1.65, color: 'rgba(28,28,26,0.58)', margin: 0 }}>{industry.copy}</p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Benefit card ─────────────────────────────────────────────────────────────
function BenefitCard({ benefit, index }) {
  const AnimComp = ANIM_MAP[benefit.animType]
  return (
    <Reveal delay={index * 0.08} style={{ flex: '1 1 260px', minWidth: 0 }}>
      <div
        style={{ borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid rgba(212,201,176,0.25)', background: PARCHMENT, height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 16px rgba(28,28,26,0.05)', transition: 'transform 0.25s, box-shadow 0.25s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(28,28,26,0.09)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 16px rgba(28,28,26,0.05)' }}
      >
        <div style={{ position: 'relative', background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 45%, #3d4f42 80%)', height: 200, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Grain opacity={0.04} />
          <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
            {AnimComp && <AnimComp />}
          </div>
        </div>
        <div style={{ padding: '22px 24px 26px', flex: 1 }}>
          <h3 style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 600, color: CHARCOAL, margin: '0 0 8px', lineHeight: 1.3 }}>{benefit.title}</h3>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.65, color: 'rgba(28,28,26,0.56)', margin: 0 }}>{benefit.copy}</p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Process steps ────────────────────────────────────────────────────────────
const STEPS = [
  {
    num: '01', label: 'Map', headline: 'We find where your time is going.',
    copy: 'In a 30-minute call, we go through everything you and your team do repeatedly. We rank it by time saved and show you exactly what can be automated and what the impact would be.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <circle cx="13" cy="13" r="7.5" stroke={SAGE} strokeWidth="1.2" />
        <path d="M19 19L25 25" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" />
        <path d="M10 13h6M13 10v6" stroke="rgba(143,175,159,0.45)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: '02', label: 'Build', headline: 'We set it up. You do not lift a finger.',
    copy: 'We connect automations directly into the tools you already use. No new software to learn, nothing to change about how you work. We just remove the slow, repetitive parts.',
    icon: (
      <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
        <rect x="7" y="9" width="16" height="13" rx="2.5" stroke={SAGE} strokeWidth="1.2" />
        <path d="M11 14h8M11 18h5" stroke="rgba(143,175,159,0.45)" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M15 6v3" stroke="rgba(143,175,159,0.3)" strokeWidth="1" strokeLinecap="round" />
        <circle cx="15" cy="5.5" r="1.5" fill="rgba(143,175,159,0.3)" />
      </svg>
    ),
  },
  {
    num: '03', label: 'Flow', headline: 'It runs. You do not have to.',
    copy: 'Your systems work around the clock. Following up leads, looking after clients, keeping your inbox clear. You get your time back, and it stays that way as your business grows.',
    icon: (
      <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
        <path d="M2 12 C6 5, 10 19, 14 12 C18 5, 22 19, 26 12 C28 8, 30 12, 32 10" stroke={SAGE} strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M2 17 C6 11, 10 23, 14 17 C18 11, 22 23, 26 17" stroke="rgba(143,175,159,0.35)" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
]

function ProcessStep({ step, index }) {
  return (
    <Reveal delay={index * 0.12} style={{ flex: '1 1 220px', minWidth: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 50%, #3d4f42 100%)',
            borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', position: 'relative',
            border: '1px solid rgba(143,175,159,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {/* Flowing current background */}
            <StepCurrentAnim />
            <Grain opacity={0.03} />
            {/* Icon + label */}
            <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              {step.icon}
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: SAGE, lineHeight: 1 }}>{step.label}</span>
            </div>
          </div>
          {/* Number badge */}
          <div style={{
            position: 'absolute', top: -10, left: 16, zIndex: 4,
            background: 'rgba(28,28,26,0.92)', border: '1px solid rgba(143,175,159,0.28)',
            borderRadius: 999, padding: '3px 12px',
            fontFamily: 'DM Mono, monospace', fontSize: 11, color: SAGE, letterSpacing: '0.08em',
          }}>{step.num}</div>
        </div>
        <div>
          <h3 style={{ fontFamily: 'DM Sans', fontSize: 15.5, fontWeight: 600, color: 'rgba(232,224,208,0.88)', margin: '0 0 8px', lineHeight: 1.3 }}>{step.headline}</h3>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.65, color: 'rgba(232,224,208,0.42)', margin: 0 }}>{step.copy}</p>
        </div>
      </div>
    </Reveal>
  )
}

// ─── Comparison table ─────────────────────────────────────────────────────────
function ComparisonTable({ location }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ padding: '0 0 20px', width: '34%' }} />
            {location.comparisonColumns.map((col, i) => (
              <th key={col} style={{ padding: '0 8px 20px', textAlign: 'center', fontFamily: 'DM Sans', fontSize: i === 0 ? 14 : 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? CHARCOAL : 'rgba(28,28,26,0.38)' }}>
                {i === 0
                  ? <span style={{ display: 'inline-block', background: CHARCOAL, color: LIGHT, padding: '6px 16px', borderRadius: 999, fontSize: 13 }}>{col}</span>
                  : col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {location.comparisonRows.map((row, ri) => (
            <tr key={ri}>
              <td style={{ padding: '14px 0', borderTop: '1px solid rgba(212,201,176,0.35)', fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(28,28,26,0.68)' }}>{row.label}</td>
              {[row.uc, row.manual, row.generic, row.agency].map((val, ci) => (
                <td key={ci} style={{ borderTop: '1px solid rgba(212,201,176,0.35)', textAlign: 'center', padding: '14px 8px', background: ci === 0 ? 'rgba(143,175,159,0.05)' : 'transparent' }}>
                  {val
                    ? <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'inline-block' }}><circle cx="10" cy="10" r="9" stroke={SAGE} strokeWidth="1.2" /><path d="M6 10l3 3 5-5" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    : <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ display: 'inline-block' }}><circle cx="10" cy="10" r="9" stroke="rgba(28,28,26,0.12)" strokeWidth="1.2" /><path d="M7 13l6-6M13 13l-6-6" stroke="rgba(28,28,26,0.22)" strokeWidth="1.3" strokeLinecap="round" /></svg>
                  }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────
function FAQItem({ faq }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderBottom: '1px solid rgba(212,201,176,0.4)' }}>
      <button onClick={() => setOpen(o => !o)} aria-expanded={open} style={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 0', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}>
        <span style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 500, color: CHARCOAL, lineHeight: 1.4 }}>{faq.q}</span>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none' }}>
          <path d="M10 4v12M4 10h12" stroke={SAGE} strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: open ? 300 : 0, transition: 'max-height 0.35s ease' }}>
        <p style={{ fontFamily: 'DM Sans', fontSize: 15, lineHeight: 1.7, color: 'rgba(28,28,26,0.6)', margin: '0 0 20px', paddingRight: 36 }}>{faq.a}</p>
      </div>
    </div>
  )
}

// ─── Section label ────────────────────────────────────────────────────────────
function SectionLabel({ children, dark = false }) {
  return (
    <span style={{ display: 'inline-block', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: dark ? 'rgba(143,175,159,0.75)' : 'rgba(28,28,26,0.42)', border: `1px solid ${dark ? 'rgba(143,175,159,0.22)' : 'rgba(28,28,26,0.14)'}`, padding: '5px 14px', borderRadius: 999, marginBottom: 18 }}>{children}</span>
  )
}

// ─── Hero headline by variant ─────────────────────────────────────────────────
function HeroHeadline({ location }) {
  const v = location.heroVariant || 'default'
  const line1Style = {
    default:   { fontFamily: 'DM Sans, sans-serif',          fontWeight: 700,  fontStyle: 'normal',  color: '#F7F3ED' },
    editorial: { fontFamily: 'Cormorant Garamond, serif',    fontWeight: 300,  fontStyle: 'italic',  color: SAGE },
    mono:      { fontFamily: 'DM Mono, monospace',           fontWeight: 400,  fontStyle: 'normal',  color: '#F7F3ED', letterSpacing: '-0.01em' },
  }
  const line2Style = {
    default:   { fontFamily: 'Cormorant Garamond, serif',    fontWeight: 300,  fontStyle: 'italic',  color: SAGE },
    editorial: { fontFamily: 'DM Sans, sans-serif',          fontWeight: 700,  fontStyle: 'normal',  color: '#F7F3ED' },
    mono:      { fontFamily: 'Cormorant Garamond, serif',    fontWeight: 300,  fontStyle: 'italic',  color: SAGE },
  }
  const baseSize = { fontSize: 'clamp(3rem, 8vw, 7.5rem)', letterSpacing: '-0.03em', lineHeight: 0.97, display: 'block', margin: '0 0 0.06em' }
  return (
    <h1 style={{ margin: '0 0 28px', padding: 0 }}>
      <Reveal delay={0.05}>
        <span style={{ ...baseSize, ...line1Style[v] }}>{location.heroHeadline1}</span>
      </Reveal>
      <Reveal delay={0.12}>
        <span style={{ ...baseSize, ...line2Style[v] }}>{location.heroHeadline2}</span>
      </Reveal>
    </h1>
  )
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function LocationPage({ location }) {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${DOMAIN}/${location.slug}#business`,
      name: 'UnderCurrent',
      description: location.metaDescription,
      url: `${DOMAIN}/${location.slug}`,
      address: { '@type': 'PostalAddress', addressLocality: location.city, addressRegion: location.region, addressCountry: 'AU' },
      areaServed: { '@type': 'State', name: `${location.city}, ${location.region}` },
      serviceType: ['AI Business Automation', 'Workflow Automation', 'Business Process Automation'],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: location.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How AI Automation Works for ${location.city} Small Businesses`,
      description: `Three steps to automate your ${location.city} business operations with UnderCurrent.`,
      step: STEPS.map(s => ({ '@type': 'HowToStep', name: s.label, text: s.copy })),
      provider: { '@type': 'Organization', '@id': `${DOMAIN}/#business`, name: 'UnderCurrent' },
    },
  ]

  return (
    <div style={{ backgroundColor: LIGHT, overflowX: 'hidden' }}>
      <style>{`
        @keyframes uc-blink   { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes uc-fadein  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      `}</style>

      <PageHead title={location.metaTitle} description={location.metaDescription} canonical={`${DOMAIN}/${location.slug}`} jsonLd={jsonLd} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: `AI Automation ${location.city}` }]} />
      <ScrollProgressBar />
      <Navbar ready />

      {/* ── HERO — MP4 video background ──────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: '94vh', background: CHARCOAL, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '140px 24px 80px' }}>
        {/* Video */}
        <video
          preload="auto" autoPlay muted loop playsInline aria-hidden="true"
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', zIndex: 0 }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        {/* Edge fade overlay — same as main Hero.jsx */}
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1,
          background: [
            'linear-gradient(to bottom, #1C1C1A 0%, transparent 30%)',
            'linear-gradient(to top,    #1C1C1A 0%, transparent 35%)',
            'linear-gradient(to right,  #1C1C1A 0%, transparent 24%)',
            'linear-gradient(to left,   #1C1C1A 0%, transparent 24%)',
          ].join(', '),
        }} />
        <Grain opacity={0.04} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 3, maxWidth: 820, margin: '0 auto', width: '100%' }}>
          <Reveal>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.85)', border: '1px solid rgba(143,175,159,0.25)', padding: '5px 14px', borderRadius: 999, marginBottom: 28 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: SAGE, boxShadow: `0 0 6px ${SAGE}`, animation: 'uc-blink 2s ease-in-out infinite' }} />
              {location.heroPill}
            </span>
          </Reveal>

          <HeroHeadline location={location} />

          <Reveal delay={0.2}>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 300, lineHeight: 1.65, color: 'rgba(232,224,208,0.7)', maxWidth: 560, margin: '0 0 40px' }}>{location.heroCopy}</p>
          </Reveal>

          <Reveal delay={0.28}>
            <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', color: '#F7F3ED', textDecoration: 'none', padding: '14px 32px', borderRadius: 9999, border: '1.5px solid rgba(143,175,159,0.75)', background: 'rgba(143,175,159,0.15)', backdropFilter: 'blur(6px)', boxShadow: '0 0 18px rgba(143,175,159,0.15), inset 0 1px 0 rgba(255,255,255,0.06)', transition: 'box-shadow 0.25s, transform 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(143,175,159,0.35)'; e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(143,175,159,0.15), inset 0 1px 0 rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none' }}
            >
              Book a Free Workflow Audit
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── WHO WE HELP ───────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, padding: 'clamp(64px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal><SectionLabel>{location.industriesLabel}</SectionLabel></Reveal>
          <div style={{ maxWidth: 680, marginBottom: 52 }}>
            <Reveal delay={0.05}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: CHARCOAL, margin: '0 0 16px', lineHeight: 1.15 }}>{location.industriesHeadline}</h2></Reveal>
            <Reveal delay={0.1}><p style={{ fontFamily: 'DM Sans', fontSize: 17, lineHeight: 1.65, color: 'rgba(28,28,26,0.56)', margin: 0 }}>{location.industriesCopy}</p></Reveal>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {location.industries.map((ind, i) => <IndustryCard key={ind.label} industry={ind} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── WHAT YOU GET ──────────────────────────────────────────────────── */}
      <section style={{ background: PARCHMENT, padding: 'clamp(64px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal><SectionLabel>{location.benefitsLabel}</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: CHARCOAL, margin: '0 0 48px', lineHeight: 1.15, maxWidth: 560 }}>{location.benefitsHeadline}</h2></Reveal>
          <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
            {location.benefits.map((b, i) => <BenefitCard key={b.title} benefit={b} index={i} />)}
          </div>
        </div>
      </section>

      <WaveDivider from={PARCHMENT} to={WARM_DARK} height={80} flip />

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      <section style={{ background: WARM_DARK, padding: 'clamp(56px, 7vw, 88px) 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Reveal><SectionLabel dark>{location.processLabel}</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: '#F7F3ED', margin: '0 0 48px', lineHeight: 1.15 }}>{location.processHeadline}</h2></Reveal>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {STEPS.map((step, i) => <ProcessStep key={step.num} step={step} index={i} />)}
          </div>
          <Reveal delay={0.3} style={{ marginTop: 48 }}>
            <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, fontWeight: 500, letterSpacing: '0.05em', color: '#F7F3ED', textDecoration: 'none', padding: '13px 28px', borderRadius: 9999, border: '1.5px solid rgba(143,175,159,0.55)', background: 'rgba(143,175,159,0.1)', backdropFilter: 'blur(6px)', transition: 'all 0.25s' }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 24px rgba(143,175,159,0.28)'; e.currentTarget.style.transform = 'scale(1.03)' }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none' }}
            >
              Start with a free audit
            </a>
          </Reveal>
        </div>
      </section>

      <WaveDivider from={WARM_DARK} to={LIGHT} height={80} />

      {/* ── WHY UNDERCURRENT ──────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, padding: 'clamp(64px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <Reveal><SectionLabel>{location.comparisonLabel}</SectionLabel></Reveal>
          <div style={{ maxWidth: 640, marginBottom: 48 }}>
            <Reveal delay={0.05}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 500, color: CHARCOAL, margin: '0 0 14px', lineHeight: 1.15 }}>{location.comparisonHeadline}</h2></Reveal>
            <Reveal delay={0.1}><p style={{ fontFamily: 'DM Sans', fontSize: 17, lineHeight: 1.65, color: 'rgba(28,28,26,0.54)', margin: 0 }}>{location.comparisonCopy}</p></Reveal>
          </div>
          <Reveal delay={0.15}>
            <div style={{ background: PARCHMENT, borderRadius: '1.5rem', padding: 'clamp(24px, 4vw, 40px)', border: '1px solid rgba(212,201,176,0.4)' }}>
              <ComparisonTable location={location} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────────── */}
      <section style={{ background: PARCHMENT, padding: 'clamp(64px, 8vw, 100px) 24px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Reveal><SectionLabel>{location.faqLabel}</SectionLabel></Reveal>
          <Reveal delay={0.05}><h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 500, color: CHARCOAL, margin: '0 0 40px', lineHeight: 1.2 }}>{location.faqHeadline}</h2></Reveal>
          <Reveal delay={0.1}>
            <div>{location.faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}</div>
          </Reveal>
        </div>
      </section>

      <WaveDivider from={PARCHMENT} to={CHARCOAL} height={80} flip />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <div style={{ background: CHARCOAL }}>
        <section style={{ padding: 'clamp(72px, 9vw, 112px) 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: 640, margin: '0 auto' }}>
            <Reveal>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4.5vw, 3.2rem)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px', color: '#F7F3ED' }}>{location.ctaHeadline}</h2>
            </Reveal>
            <Reveal delay={0.08}>
              <p style={{ fontFamily: 'DM Sans', fontSize: 17, lineHeight: 1.65, fontWeight: 300, color: 'rgba(232,224,208,0.58)', margin: '0 0 36px' }}>{location.ctaCopy}</p>
            </Reveal>
            <Reveal delay={0.16}>
              <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: 'DM Sans', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', color: '#F7F3ED', textDecoration: 'none', padding: '14px 36px', borderRadius: 9999, border: '1.5px solid rgba(143,175,159,0.75)', background: 'rgba(143,175,159,0.15)', backdropFilter: 'blur(6px)', boxShadow: '0 0 18px rgba(143,175,159,0.15)', transition: 'all 0.25s' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(143,175,159,0.35)'; e.currentTarget.style.transform = 'scale(1.04) translateY(-1px)' }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(143,175,159,0.15)'; e.currentTarget.style.transform = 'none' }}
              >
                Book Your Free Workflow Review
              </a>
            </Reveal>
          </div>
        </section>

        {/* Internal links */}
        <nav aria-label="Service pages" style={{ padding: '28px 24px 24px', borderTop: '1px solid rgba(212,201,176,0.07)' }}>
          <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', flexWrap: 'wrap', gap: '10px 24px', justifyContent: 'center' }}>
            {location.internalLinks.map(({ label, path }) => (
              <Link key={label} to={path} style={{ fontFamily: 'DM Sans', fontSize: 13, color: 'rgba(232,224,208,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'rgba(143,175,159,0.75)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,224,208,0.35)' }}
              >{label}</Link>
            ))}
          </div>
        </nav>

        <Footer />
      </div>
    </div>
  )
}
