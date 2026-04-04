'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import JsonLd from '@/components/ui/JsonLd'
import Breadcrumb from '@/components/layout/Breadcrumb'

const CTA_HREF  = 'https://cal.com/luke-marinovic-aqeosc/30min'
const DOMAIN    = 'https://undercurrentautomations.com.au'
const LIGHT     = '#F7F3ED'
const PARCHMENT = '#E8E0D0'
const CHARCOAL  = '#1C1C1A'
const SAGE      = '#8FAF9F'
const WARM_DARK = '#1a1816'

// ─── Grain canvas ─────────────────────────────────────────────────────────────
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

// ─── Step current anim ────────────────────────────────────────────────────────
function StepCurrentAnim() {
  const [phase, setPhase] = useState(0)
  const svgRef = useRef(null)
  const visRef = useRef(false)
  useEffect(() => {
    let raf
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0 })
    if (svgRef.current) obs.observe(svgRef.current)
    const loop = () => { if (visRef.current) setPhase(p => p + 0.035); raf = requestAnimationFrame(loop) }
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
    <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
      {waves.map((w, wi) => {
        const pts = Array.from({ length: 60 }, (_, i) => {
          const x = (i / 59) * W
          const y = w.yBase + w.amp * Math.sin(phase * w.speed + i * w.freq)
          return `${x},${y}`
        }).join(' ')
        return <polyline key={wi} points={pts} fill="none" stroke={`rgba(143,175,159,${w.opacity})`} strokeWidth={w.width} />
      })}
    </svg>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── LARGE DEMO ANIMATIONS ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

function CustomerJourneyDemo() {
  const [active, setActive] = useState(0)
  const containerRef = useRef(null)
  const visRef = useRef(false)
  const stages = [
    { key: 'contract',  label: 'Contract signed',    sub: 'Trigger fires instantly' },
    { key: 'welcome',   label: 'Welcome sequence',    sub: 'Sent automatically' },
    { key: 'checkin',   label: 'Week 1 check-in',     sub: 'Personalised message' },
    { key: 'survey',    label: 'Satisfaction survey', sub: 'At key milestone' },
    { key: 'review',    label: 'Review request',      sub: 'After positive signal' },
    { key: 'referral',  label: 'Referral triggered',  sub: 'Revenue without ads' },
  ]
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0.1 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    let t
    const tick = () => {
      if (visRef.current) setActive(a => (a + 1) % stages.length)
      t = setTimeout(tick, 1800)
    }
    t = setTimeout(tick, 1800)
    return () => clearTimeout(t)
  }, [])
  return (
    <div ref={containerRef} style={{ width: '100%', padding: '0 0 8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {stages.map((stage, i) => {
          const isPast = i < active, isCurrent = i === active, isFuture = i > active
          return (
            <div key={stage.key} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                <div style={{ width: 1, flexBasis: i === 0 ? 20 : 0, flexGrow: i === 0 ? 0 : 1, background: isPast ? 'rgba(143,175,159,0.5)' : 'rgba(143,175,159,0.12)', transition: 'background 0.5s' }} />
                <div style={{ width: isCurrent ? 14 : 8, height: isCurrent ? 14 : 8, borderRadius: '50%', flexShrink: 0, background: isCurrent ? SAGE : isPast ? 'rgba(143,175,159,0.4)' : 'rgba(143,175,159,0.1)', boxShadow: isCurrent ? `0 0 0 5px rgba(143,175,159,0.18), 0 0 12px ${SAGE}` : 'none', border: isCurrent ? `1.5px solid ${SAGE}` : isPast ? '1px solid rgba(143,175,159,0.4)' : '1px solid rgba(143,175,159,0.15)', transition: 'all 0.45s', zIndex: 2 }} />
                {i < stages.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 24, background: isPast ? 'rgba(143,175,159,0.5)' : 'rgba(143,175,159,0.12)', transition: 'background 0.5s' }} />}
              </div>
              <div style={{ padding: '10px 0 10px 14px', opacity: isFuture ? 0.28 : isCurrent ? 1 : 0.55, transition: 'opacity 0.45s', flex: 1 }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? SAGE : 'rgba(232,224,208,0.85)', lineHeight: 1.3, transition: 'color 0.45s' }}>{stage.label}</div>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10.5, color: isCurrent ? 'rgba(143,175,159,0.7)' : 'rgba(232,224,208,0.3)', marginTop: 3, letterSpacing: '0.04em', transition: 'color 0.45s' }}>{stage.sub}</div>
              </div>
              <div style={{ alignSelf: 'center' }}>
                {isCurrent && <div style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(143,175,159,0.12)', border: '1px solid rgba(143,175,159,0.28)', fontFamily: 'DM Mono, monospace', fontSize: 9.5, letterSpacing: '0.06em', color: SAGE, whiteSpace: 'nowrap' }}>RUNNING</div>}
                {isPast && <div style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(143,175,159,0.07)', border: '1px solid rgba(143,175,159,0.12)', fontFamily: 'DM Mono, monospace', fontSize: 9.5, letterSpacing: '0.06em', color: 'rgba(143,175,159,0.45)', whiteSpace: 'nowrap' }}>DONE</div>}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: SAGE, boxShadow: `0 0 6px ${SAGE}`, flexShrink: 0, animation: 'sp-blink 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.55)' }}>RUNNING CONTINUOUSLY — 24/7</span>
      </div>
    </div>
  )
}

function SalesPipelineDemo() {
  const containerRef = useRef(null)
  const visRef = useRef(false)
  const [lines, setLines] = useState([])
  const [metrics, setMetrics] = useState({ captured: 0, qualified: 0, sequenced: 0, booked: 0 })
  const allLines = [
    { text: '> New inbound: Rachel T. (website form)', metric: 'captured' },
    { text: '> Enriching contact via Apollo...', metric: null },
    { text: '> ICP match: 94%. Routing to sequence A.', metric: 'qualified' },
    { text: '> Sequence triggered. Email 1 sending...', metric: 'sequenced' },
    { text: '> Open detected. Follow-up queued: +48h.', metric: null },
    { text: '> Reply received. Booking link sent.', metric: null },
    { text: '> Meeting confirmed: Thursday 11am.', metric: 'booked' },
    { text: '> CRM stage updated: Discovery.', metric: null },
    { text: '> Pre-meeting brief generating...', metric: null },
    { text: '> Brief delivered to calendar event.', metric: null },
  ]
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0.1 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    let idx = 0, t
    const showNext = () => {
      if (!visRef.current) { t = setTimeout(showNext, 200); return }
      if (idx >= allLines.length) {
        t = setTimeout(() => { setLines([]); setMetrics({ captured: 0, qualified: 0, sequenced: 0, booked: 0 }); idx = 0; t = setTimeout(showNext, 800) }, 2500)
        return
      }
      const line = allLines[idx]
      setLines(prev => [...prev.slice(-8), line.text])
      if (line.metric) setMetrics(prev => ({ ...prev, [line.metric]: prev[line.metric] + 1 }))
      idx++
      t = setTimeout(showNext, 820)
    }
    t = setTimeout(showNext, 400)
    return () => clearTimeout(t)
  }, [])
  const statItems = [
    { key: 'captured',  label: 'Captured' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'sequenced', label: 'In sequence' },
    { key: 'booked',    label: 'Meetings booked' },
  ]
  return (
    <div ref={containerRef} style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 20 }}>
      <div style={{ background: 'rgba(0,0,0,0.28)', borderRadius: 12, padding: '16px 18px', border: '1px solid rgba(143,175,159,0.12)', minHeight: 220 }}>
        <div style={{ display: 'flex', gap: 5, marginBottom: 12 }}>
          {['#FF5F57','#FFBD2E','#28C840'].map((c, i) => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c, opacity: 0.65 }} />)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {lines.map((line, i) => <div key={i} style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, lineHeight: 1.7, color: i === lines.length - 1 ? SAGE : 'rgba(232,224,208,0.38)', transition: 'color 0.3s' }}>{line}</div>)}
          <span style={{ display: 'inline-block', width: 6, height: 13, background: SAGE, opacity: 0.65, animation: 'sp-blink 1s step-end infinite', verticalAlign: 'text-bottom', marginLeft: 2 }} />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
        {statItems.map(({ key, label }) => (
          <div key={key} style={{ background: 'rgba(143,175,159,0.07)', border: '1px solid rgba(143,175,159,0.14)', borderRadius: 10, padding: '12px 14px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 24, fontWeight: 700, color: metrics[key] > 0 ? SAGE : 'rgba(143,175,159,0.2)', lineHeight: 1, transition: 'color 0.4s' }}>{metrics[key]}</div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 10.5, color: 'rgba(232,224,208,0.35)', marginTop: 4, lineHeight: 1.3 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ContentFlowDemo() {
  const [phase, setPhase] = useState(0)
  const containerRef = useRef(null)
  const visRef = useRef(false)
  const outputs = [
    { label: 'Blog post',         platform: 'WordPress', color: '#8FAF9F', icon: '✦' },
    { label: 'LinkedIn post',     platform: 'LinkedIn',  color: '#6B7C4A', icon: '◈' },
    { label: 'Email newsletter',  platform: 'Mailchimp', color: '#A89F7A', icon: '◇' },
    { label: 'Instagram caption', platform: 'Instagram', color: '#8FAF9F', icon: '◉' },
  ]
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0.1 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    const interval = setInterval(() => {
      if (visRef.current) setPhase(p => (p + 1) % (outputs.length + 2))
    }, 900)
    return () => clearInterval(interval)
  }, [])
  return (
    <div ref={containerRef} style={{ display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'center', width: '100%' }}>
      <div style={{ padding: '14px 28px', borderRadius: 12, border: '1.5px solid rgba(143,175,159,0.45)', background: 'rgba(143,175,159,0.1)', textAlign: 'center', boxShadow: '0 0 24px rgba(143,175,159,0.12)' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.6)', marginBottom: 5 }}>INPUT</div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, color: 'rgba(232,224,208,0.85)' }}>Voice note or brief</div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, color: 'rgba(232,224,208,0.35)', marginTop: 3 }}>3 minutes of your thoughts</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <div style={{ width: 1, height: 20, background: 'rgba(143,175,159,0.3)' }} />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M6 7L1 1M6 7l5-6" stroke="rgba(143,175,159,0.5)" strokeWidth="1.2" strokeLinecap="round" /></svg>
      </div>
      <div style={{ padding: '10px 22px', borderRadius: 10, border: '1px solid rgba(143,175,159,0.2)', background: 'rgba(28,28,26,0.6)', textAlign: 'center' }}>
        <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: SAGE, letterSpacing: '0.1em' }}>PIPELINE RUNNING<span style={{ animation: 'sp-blink 1s step-end infinite' }}>_</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
        <div style={{ width: 1, height: 20, background: 'rgba(143,175,159,0.3)' }} />
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none"><path d="M6 7L1 1M6 7l5-6" stroke="rgba(143,175,159,0.5)" strokeWidth="1.2" strokeLinecap="round" /></svg>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, width: '100%' }}>
        {outputs.map((out, i) => {
          const isActive = phase >= i + 2
          return (
            <div key={out.label} style={{ padding: '14px 16px', borderRadius: 10, border: `1px solid ${isActive ? `${out.color}30` : 'rgba(143,175,159,0.1)'}`, background: isActive ? `${out.color}0a` : 'rgba(28,28,26,0.4)', transition: 'all 0.5s ease', opacity: isActive ? 1 : 0.25 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                <span style={{ color: isActive ? out.color : 'rgba(143,175,159,0.25)', fontSize: 14, transition: 'color 0.4s' }}>{out.icon}</span>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12.5, fontWeight: 500, color: isActive ? 'rgba(232,224,208,0.85)' : 'rgba(232,224,208,0.25)', transition: 'color 0.4s' }}>{out.label}</span>
              </div>
              <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9.5, color: isActive ? `${out.color}70` : 'rgba(143,175,159,0.15)', letterSpacing: '0.05em', transition: 'color 0.4s' }}>{out.platform}</div>
              {isActive && <div style={{ marginTop: 6, width: '100%', height: 2, background: `${out.color}25`, borderRadius: 1, position: 'relative', overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '70%', background: out.color, borderRadius: 1 }} /></div>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function InboxTriageDemo() {
  const [step, setStep] = useState(0)
  const containerRef = useRef(null)
  const visRef = useRef(false)
  const emails = [
    { from: 'sarah@clientco.com',   subject: 'Q1 report — quick question',  tag: 'DRAFT REPLY',  tagColor: SAGE,                     action: 'Draft generated' },
    { from: 'matt@prospects.io',    subject: 'Intro call this week?',        tag: 'MEETING',      tagColor: '#6B7C4A',                action: 'Booking link sent' },
    { from: 'accounts@xero.com',    subject: 'Invoice INV-0047 overdue',     tag: 'FLAGGED',      tagColor: '#C07A6A',                action: 'Escalated to you' },
    { from: 'james@partner.co',     subject: 'Referral: Alice from Shore',   tag: 'TASK CREATED', tagColor: '#A89F7A',                action: 'Added to Notion' },
    { from: 'noreply@linkedin.com', subject: 'You have 14 notifications',    tag: 'ARCHIVED',     tagColor: 'rgba(143,175,159,0.4)', action: 'Auto-archived' },
  ]
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0.1 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    const t = setInterval(() => {
      if (visRef.current) setStep(s => (s + 1) % (emails.length + 1))
    }, 1600)
    return () => clearInterval(t)
  }, [])
  return (
    <div ref={containerRef} style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.5)' }}>INBOX — 5 new</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: SAGE, boxShadow: `0 0 5px ${SAGE}`, animation: 'sp-blink 2s ease-in-out infinite' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 9.5, color: 'rgba(143,175,159,0.5)', letterSpacing: '0.06em' }}>AI ACTIVE</span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {emails.map((email, i) => {
          const isActive = i === step, isProcessed = i < step
          return (
            <div key={i} style={{ padding: '11px 14px', borderRadius: 9, border: `1px solid ${isActive ? 'rgba(143,175,159,0.3)' : isProcessed ? 'rgba(143,175,159,0.1)' : 'rgba(143,175,159,0.07)'}`, background: isActive ? 'rgba(143,175,159,0.07)' : 'rgba(28,28,26,0.3)', transition: 'all 0.4s', opacity: !isActive && !isProcessed ? 0.3 : 1, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', flexShrink: 0, background: isProcessed ? 'transparent' : isActive ? SAGE : 'rgba(143,175,159,0.2)', border: isProcessed ? '1px solid rgba(143,175,159,0.2)' : 'none', boxShadow: isActive ? `0 0 5px ${SAGE}` : 'none', transition: 'all 0.4s' }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: isActive ? SAGE : 'rgba(143,175,159,0.4)', transition: 'color 0.4s' }}>{email.from}</span>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12.5, color: isProcessed ? 'rgba(232,224,208,0.35)' : isActive ? 'rgba(232,224,208,0.85)' : 'rgba(232,224,208,0.3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', transition: 'color 0.4s' }}>{email.subject}</div>
              </div>
              {(isActive || isProcessed) && (
                <div style={{ padding: '2px 8px', borderRadius: 999, background: `${email.tagColor}18`, border: `1px solid ${email.tagColor}35`, fontFamily: 'DM Mono, monospace', fontSize: 9, letterSpacing: '0.06em', color: email.tagColor, whiteSpace: 'nowrap', flexShrink: 0 }}>{email.tag}</div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function FinanceFlowDemo() {
  const [phase, setPhase] = useState(0)
  const [paid, setPaid] = useState(true)
  const containerRef = useRef(null)
  const visRef = useRef(false)
  const accent = SAGE, green = '#6B9F7A', red = '#C07A6A', dim = 'rgba(143,175,159,0.1)'
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0.1 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    let t
    const tick = () => {
      if (!visRef.current) { t = setTimeout(tick, 200); return }
      setPhase(p => {
        if (p >= 6) { setTimeout(() => { setPaid(prev => !prev); setPhase(0) }, 1200); return p }
        return p + 1
      })
      t = setTimeout(tick, 900)
    }
    t = setTimeout(tick, 600)
    return () => clearTimeout(t)
  }, [paid])
  const notifyColor = paid ? green : red
  const s1d = phase >= 2, s1a = phase === 1
  const s2d = phase >= 3, s2a = phase === 2
  const s3d = phase >= 4, s3a = phase === 3
  const paidD = phase >= 5 && paid,  paidA = phase === 4 && paid
  const unpD  = phase >= 5 && !paid, unpA  = phase === 4 && !paid
  const notD  = phase >= 6,          notA  = phase === 5
  const nodeRow = (active, done, color, text, sub) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: active || done ? 1 : 0.3, transition: 'opacity 0.5s' }}>
      <div style={{ width: 38, height: 38, borderRadius: '50%', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? color : active ? `${color}22` : 'rgba(28,28,26,0.05)', border: `1.5px solid ${done || active ? color : dim}`, boxShadow: active ? `0 0 0 4px ${color}14` : 'none', transition: 'all 0.5s' }}>
        {done
          ? <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#F7F3ED" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
          : <div style={{ width: 6, height: 6, borderRadius: '50%', background: active ? (color === accent ? accent : '#F7F3ED') : dim }} />
        }
      </div>
      <div>
        <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, fontWeight: active || done ? 500 : 300, color: active || done ? 'rgba(232,224,208,0.9)' : 'rgba(232,224,208,0.3)', lineHeight: 1.3, transition: 'color 0.4s' }}>{text}</div>
        {sub && <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: active || done ? `${color}80` : 'rgba(143,175,159,0.15)', marginTop: 2, transition: 'color 0.4s' }}>{sub}</div>}
      </div>
    </div>
  )
  const vline = (active, color = accent) => (
    <div style={{ width: 1.5, height: 28, marginLeft: 19, background: active ? color : dim, transition: 'background 0.5s' }} />
  )
  return (
    <div ref={containerRef} style={{ width: '100%', maxWidth: 420 }}>
      {nodeRow(s1a, s1d, accent, 'Invoice generated', 'Triggered automatically')}
      {vline(s2a || s2d)}
      {nodeRow(s2a, s2d, accent, 'Sent to client', 'PDF attached')}
      {vline(s3a || s3d)}
      {nodeRow(s3a, s3d, accent, 'Awaiting payment', '7-day window')}
      {vline(phase >= 4, notifyColor)}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 4 }}>
        {[
          { active: paidA, done: paidD, color: green, label: 'Payment received', sub: 'Receipt sent auto' },
          { active: unpA,  done: unpD,  color: red,   label: 'Not received',     sub: 'Sequence starts' },
        ].map(({ active, done, color, label, sub }) => (
          <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '12px', borderRadius: 10, background: done ? `${color}0e` : active ? `${color}07` : 'rgba(28,28,26,0.03)', border: `1px solid ${done || active ? `${color}30` : dim}`, opacity: active || done ? 1 : 0.3, transition: 'all 0.5s' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: done ? color : active ? `${color}22` : 'rgba(28,28,26,0.05)', border: `1.5px solid ${done || active ? color : dim}`, transition: 'all 0.5s' }}>
              {done
                ? <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#F7F3ED" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <div style={{ width: 5, height: 5, borderRadius: '50%', background: active ? (color === green ? green : '#F7F3ED') : dim }} />
              }
            </div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 12, fontWeight: 500, color: active || done ? 'rgba(232,224,208,0.85)' : 'rgba(232,224,208,0.25)', lineHeight: 1.3, transition: 'color 0.4s' }}>{label}</div>
            <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9.5, color: active || done ? `${color}70` : 'rgba(143,175,159,0.15)', transition: 'color 0.4s' }}>{sub}</div>
          </div>
        ))}
      </div>
      {vline(notA || notD, notifyColor)}
      {nodeRow(notA, notD, notifyColor, paid ? 'Confirmation sent' : 'Reminder sequence', paid ? 'Job complete' : 'Tone adjusts over time')}
      <div style={{ marginTop: 18 }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '5px 14px', borderRadius: 999, background: phase >= 6 ? (paid ? `${green}10` : `${red}10`) : 'rgba(28,28,26,0.04)', border: `1px solid ${phase >= 6 ? (paid ? `${green}30` : `${red}30`) : 'rgba(28,28,26,0.1)'}`, transition: 'all 0.5s' }}>
          <div style={{ width: 5, height: 5, borderRadius: '50%', background: phase >= 6 ? (paid ? green : red) : 'rgba(28,28,26,0.18)', transition: 'background 0.5s' }} />
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.08em', color: phase >= 6 ? (paid ? green : red) : 'rgba(28,28,26,0.28)', transition: 'color 0.5s' }}>
            {phase >= 6 ? (paid ? 'PAID — COMPLETE' : 'OVERDUE — CHASING') : 'IN PROGRESS'}
          </span>
        </div>
      </div>
    </div>
  )
}

function LeadBookingDemo() {
  const [active, setActive] = useState(0)
  const containerRef = useRef(null)
  const visRef = useRef(false)
  const stages = [
    { label: 'Enquiry received',  sub: 'Google Ads — website form',       time: '7:04pm' },
    { label: 'Auto-reply sent',   sub: 'Instant acknowledgement',         time: '7:04pm' },
    { label: 'Lead qualified',    sub: 'Service, suburb, urgency tagged',  time: '7:05pm' },
    { label: 'Follow-up sent',    sub: 'Next morning if no reply',        time: 'Day 2' },
    { label: 'Quote delivered',   sub: 'Email and SMS',                   time: 'Day 2' },
    { label: 'Job booked',        sub: 'Confirmed in your calendar',      time: 'Day 3' },
  ]
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { visRef.current = e.isIntersecting }, { threshold: 0.1 })
    if (containerRef.current) obs.observe(containerRef.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    let t
    const tick = () => {
      if (visRef.current) setActive(a => (a + 1) % stages.length)
      t = setTimeout(tick, 1800)
    }
    t = setTimeout(tick, 1800)
    return () => clearTimeout(t)
  }, [])
  return (
    <div ref={containerRef} style={{ width: '100%', padding: '0 0 8px' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {stages.map((stage, i) => {
          const isPast = i < active, isCurrent = i === active, isFuture = i > active
          return (
            <div key={stage.label} style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 32, flexShrink: 0 }}>
                <div style={{ width: 1, flexBasis: i === 0 ? 20 : 0, flexGrow: i === 0 ? 0 : 1, background: isPast ? 'rgba(143,175,159,0.5)' : 'rgba(143,175,159,0.12)', transition: 'background 0.5s' }} />
                <div style={{ width: isCurrent ? 14 : 8, height: isCurrent ? 14 : 8, borderRadius: '50%', flexShrink: 0, background: isCurrent ? SAGE : isPast ? 'rgba(143,175,159,0.4)' : 'rgba(143,175,159,0.1)', boxShadow: isCurrent ? `0 0 0 5px rgba(143,175,159,0.18), 0 0 12px ${SAGE}` : 'none', border: isCurrent ? `1.5px solid ${SAGE}` : isPast ? '1px solid rgba(143,175,159,0.4)' : '1px solid rgba(143,175,159,0.15)', transition: 'all 0.45s', zIndex: 2 }} />
                {i < stages.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 24, background: isPast ? 'rgba(143,175,159,0.5)' : 'rgba(143,175,159,0.12)', transition: 'background 0.5s' }} />}
              </div>
              <div style={{ padding: '10px 0 10px 14px', opacity: isFuture ? 0.28 : isCurrent ? 1 : 0.55, transition: 'opacity 0.45s', flex: 1 }}>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: isCurrent ? 600 : 400, color: isCurrent ? SAGE : 'rgba(232,224,208,0.85)', lineHeight: 1.3, transition: 'color 0.45s' }}>{stage.label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11.5, color: isCurrent ? 'rgba(143,175,159,0.65)' : 'rgba(232,224,208,0.3)', marginTop: 3, transition: 'color 0.45s' }}>{stage.sub}</div>
              </div>
              <div style={{ alignSelf: 'center', paddingLeft: 8, flexShrink: 0 }}>
                {isCurrent && <div style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(143,175,159,0.12)', border: '1px solid rgba(143,175,159,0.28)', fontFamily: 'DM Mono, monospace', fontSize: 9.5, letterSpacing: '0.06em', color: SAGE, whiteSpace: 'nowrap' }}>{stage.time}</div>}
                {isPast && <div style={{ padding: '3px 10px', borderRadius: 999, background: 'rgba(143,175,159,0.07)', border: '1px solid rgba(143,175,159,0.12)', fontFamily: 'DM Mono, monospace', fontSize: 9.5, letterSpacing: '0.06em', color: 'rgba(143,175,159,0.45)', whiteSpace: 'nowrap' }}>DONE</div>}
              </div>
            </div>
          )
        })}
      </div>
      <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: SAGE, boxShadow: `0 0 6px ${SAGE}`, flexShrink: 0, animation: 'sp-blink 2s ease-in-out infinite' }} />
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.55)' }}>EVERY ENQUIRY — AUTOMATICALLY</span>
      </div>
    </div>
  )
}

const DEMO_ANIM_MAP = {
  'customer-journey': CustomerJourneyDemo,
  'sales-pipeline':   SalesPipelineDemo,
  'content-flow':     ContentFlowDemo,
  'inbox-triage':     InboxTriageDemo,
  'finance-flow':     FinanceFlowDemo,
  'lead-booking':     LeadBookingDemo,
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── SMALL CARD ANIMATIONS ────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

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
        const isPast = i < active, isCurrent = i === active
        return (
          <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: 10, transition: 'opacity 0.4s', opacity: isPast ? 0.3 : isCurrent ? 1 : 0.18 }}>
            <div style={{ width: 7, height: 7, borderRadius: '50%', flexShrink: 0, background: isCurrent ? SAGE : isPast ? 'rgba(143,175,159,0.35)' : 'rgba(212,201,176,0.15)', boxShadow: isCurrent ? `0 0 7px ${SAGE}` : 'none', transition: 'all 0.4s' }} />
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, color: isCurrent ? SAGE : 'rgba(232,224,208,0.5)', letterSpacing: '0.04em', transition: 'color 0.4s' }}>{stage}</span>
          </div>
        )
      })}
      <div style={{ marginTop: 6, fontFamily: 'DM Mono', fontSize: 10, color: 'rgba(143,175,159,0.4)', letterSpacing: '0.08em' }}>RUNNING CONTINUOUSLY</div>
    </div>
  )
}

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
        <span style={{ display: 'inline-block', width: 7, height: 13, background: SAGE, opacity: 0.7, animation: 'sp-blink 1s step-end infinite', verticalAlign: 'text-bottom', marginLeft: 2 }} />
      </div>
    </div>
  )
}

function LeadGenAnim() {
  const [step, setStep] = useState(0)
  const flow = [
    { label: 'Lead captured',   value: '24 this week' },
    { label: 'Follow-up sent',  value: 'Automatic' },
    { label: 'Meetings booked', value: '9 confirmed' },
  ]
  useEffect(() => {
    const t = setInterval(() => setStep(s => (s + 1) % 3), 1500)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: '20px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10 }}>
      {flow.map(({ label, value }, i) => (
        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '9px 12px', borderRadius: 7, background: i === step ? 'rgba(143,175,159,0.12)' : 'rgba(143,175,159,0.04)', border: `1px solid ${i === step ? 'rgba(143,175,159,0.25)' : 'rgba(143,175,159,0.08)'}`, transition: 'all 0.4s' }}>
          <span style={{ fontFamily: 'DM Sans', fontSize: 12, color: i === step ? 'rgba(232,224,208,0.85)' : 'rgba(232,224,208,0.4)' }}>{label}</span>
          <span style={{ fontFamily: 'DM Mono', fontSize: 12, color: i === step ? SAGE : 'rgba(143,175,159,0.3)', transition: 'color 0.4s' }}>{value}</span>
        </div>
      ))}
    </div>
  )
}

const ANIM_MAP = { pipeline: PipelineAnim, terminal: TerminalAnim, leadgen: LeadGenAnim }

// ─── Industry card ────────────────────────────────────────────────────────────
function IndustryCard({ industry }) {
  const AnimComp = ANIM_MAP[industry.animType]
  return (
    <div style={{ flex: '1 1 280px', minWidth: 0 }}>
      <div
        style={{ borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid rgba(143,175,159,0.15)', background: 'rgba(28,28,26,0.6)', height: '100%', display: 'flex', flexDirection: 'column', boxShadow: '0 2px 20px rgba(0,0,0,0.2)', transition: 'transform 0.25s, box-shadow 0.25s' }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.2)' }}
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
          <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 300, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.2, margin: '0 0 10px' }}>{industry.headline}</h3>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14.5, lineHeight: 1.65, color: 'rgba(232,224,208,0.5)', margin: 0 }}>{industry.copy}</p>
        </div>
      </div>
    </div>
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

function ProcessStep({ step }) {
  return (
    <div style={{ flex: '1 1 220px', minWidth: 0 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ position: 'relative' }}>
          <div style={{ background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 50%, #3d4f42 100%)', borderRadius: '1.5rem', overflow: 'hidden', aspectRatio: '4/3', position: 'relative', border: '1px solid rgba(143,175,159,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StepCurrentAnim />
            <Grain opacity={0.03} />
            <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              {step.icon}
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 300, fontStyle: 'italic', color: SAGE, lineHeight: 1 }}>{step.label}</span>
            </div>
          </div>
          <div style={{ position: 'absolute', top: -10, left: 16, zIndex: 4, background: 'rgba(28,28,26,0.92)', border: '1px solid rgba(143,175,159,0.28)', borderRadius: 999, padding: '3px 12px', fontFamily: 'DM Mono, monospace', fontSize: 11, color: SAGE, letterSpacing: '0.08em' }}>{step.num}</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'DM Sans', fontSize: 15.5, fontWeight: 600, color: 'rgba(232,224,208,0.88)', margin: '0 0 8px', lineHeight: 1.3 }}>{step.headline}</h3>
          <p style={{ fontFamily: 'DM Sans', fontSize: 14, lineHeight: 1.65, color: 'rgba(232,224,208,0.42)', margin: 0 }}>{step.copy}</p>
        </div>
      </div>
    </div>
  )
}

// ─── Comparison table ─────────────────────────────────────────────────────────
function ComparisonTable({ service }) {
  return (
    <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
      <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 520 }}>
        <thead>
          <tr>
            <th style={{ padding: '0 0 20px', width: '34%' }} />
            {service.comparisonColumns.map((col, i) => (
              <th key={col} style={{ padding: '0 8px 20px', textAlign: 'center', fontFamily: 'DM Sans', fontSize: i === 0 ? 14 : 13, fontWeight: i === 0 ? 600 : 400, color: i === 0 ? CHARCOAL : 'rgba(28,28,26,0.38)' }}>
                {i === 0
                  ? <span style={{ display: 'inline-block', background: CHARCOAL, color: LIGHT, padding: '6px 16px', borderRadius: 999, fontSize: 13 }}>{col}</span>
                  : col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {service.comparisonRows.map((row, ri) => (
            <tr key={ri}>
              <td style={{ padding: '14px 0', borderTop: '1px solid rgba(212,201,176,0.35)', fontFamily: 'DM Sans', fontSize: 14, color: 'rgba(28,28,26,0.68)' }}>{row.label}</td>
              {[row.uc, row.manual, row.generic, row.agency].slice(0, service.comparisonColumns.length).map((val, ci) => (
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

// ─── FAQ item ─────────────────────────────────────────────────────────────────
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
function HeroHeadline({ service }) {
  const v = service.heroVariant || 'default'
  const line1Style = {
    default:   { fontFamily: 'DM Sans, sans-serif',       fontWeight: 700, fontStyle: 'normal', color: '#F7F3ED' },
    editorial: { fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: SAGE },
    mono:      { fontFamily: 'DM Mono, monospace',        fontWeight: 400, fontStyle: 'normal', color: '#F7F3ED', letterSpacing: '-0.01em' },
    outfit:    { fontFamily: 'Outfit, sans-serif',        fontWeight: 800, fontStyle: 'normal', color: '#F7F3ED' },
  }
  const line2Style = {
    default:   { fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: SAGE },
    editorial: { fontFamily: 'DM Sans, sans-serif',       fontWeight: 700, fontStyle: 'normal', color: '#F7F3ED' },
    mono:      { fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', color: SAGE },
    outfit:    { fontFamily: 'Outfit, sans-serif',        fontWeight: 800, fontStyle: 'normal', background: 'linear-gradient(135deg, #8FAF9F 0%, #b8d4c8 50%, #8FAF9F 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' },
  }
  const baseSize = { fontSize: 'clamp(3rem, 8vw, 7.5rem)', letterSpacing: '-0.03em', lineHeight: 0.97, display: 'block', margin: '0 0 0.06em' }
  return (
    <h1 style={{ margin: '0 0 28px', padding: 0 }}>
      <span style={{ ...baseSize, ...line1Style[v] }}>{service.heroHeadline1}</span>
      <span style={{ ...baseSize, ...line2Style[v] }}>{service.heroHeadline2}</span>
    </h1>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
// ─── MAIN EXPORT ──────────────────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════════

export default function ServicePage({ service }) {
  const DemoAnim = DEMO_ANIM_MAP[service.demoAnimType]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${DOMAIN}/${service.slug}#service`,
      name: `${service.label.charAt(0) + service.label.slice(1).toLowerCase()} Automation`,
      description: service.metaDescription,
      url: `${DOMAIN}/${service.slug}`,
      provider: {
        '@type': 'Organization',
        '@id': `${DOMAIN}/#business`,
        name: 'UnderCurrent',
        url: DOMAIN,
        areaServed: { '@type': 'State', name: 'Victoria, AU' },
      },
      areaServed: { '@type': 'State', name: 'Victoria, AU' },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: service.faqs.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      name: `How ${service.label.charAt(0) + service.label.slice(1).toLowerCase()} Automation Works with UnderCurrent`,
      description: `Three steps to automate your ${service.label.toLowerCase()} operations with UnderCurrent.`,
      step: STEPS.map(s => ({ '@type': 'HowToStep', name: s.label, text: s.copy })),
      provider: { '@type': 'Organization', '@id': `${DOMAIN}/#business`, name: 'UnderCurrent' },
    },
  ]

  return (
    <div style={{ backgroundColor: LIGHT, overflowX: 'hidden' }}>
      <style>{`
        @keyframes sp-blink  { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes sp-fadein { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:none} }
      `}</style>

      {jsonLd.map((schema, i) => <JsonLd key={i} schema={schema} />)}

      <div style={{ padding: '80px 24px 0' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Services', href: '/services' },
            { label: service.label.charAt(0) + service.label.slice(1).toLowerCase() + ' Automation' },
          ]} />
        </div>
      </div>

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section style={{ position: 'relative', overflow: 'hidden', minHeight: service.heroMockup ? '112vh' : '88vh', background: CHARCOAL, display: 'flex', flexDirection: 'column', justifyContent: service.heroMockup ? 'flex-start' : 'center', padding: service.heroMockup ? '120px 24px 0' : '140px 24px 80px' }}>
        <video preload="auto" autoPlay muted loop playsInline aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', pointerEvents: 'none', zIndex: 0 }}>
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: ['linear-gradient(to bottom, #1C1C1A 0%, transparent 30%)', 'linear-gradient(to top, #1C1C1A 0%, transparent 35%)', 'linear-gradient(to right, #1C1C1A 0%, transparent 24%)', 'linear-gradient(to left, #1C1C1A 0%, transparent 24%)'].join(', ') }} />
        <Grain opacity={0.04} />

        <div style={{ position: 'relative', zIndex: 3, maxWidth: 820, margin: '0 auto', width: '100%', textAlign: 'center', paddingBottom: service.heroMockup ? '56px' : 0 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.85)', border: '1px solid rgba(143,175,159,0.25)', padding: '5px 14px', borderRadius: 999, marginBottom: 28 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: SAGE, boxShadow: `0 0 6px ${SAGE}`, animation: 'sp-blink 2s ease-in-out infinite' }} />
            {service.heroPill}
          </span>

          <HeroHeadline service={service} />

          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(16px, 2vw, 19px)', fontWeight: 300, lineHeight: 1.65, color: 'rgba(232,224,208,0.7)', maxWidth: 560, margin: '0 auto 40px' }}>{service.heroCopy}</p>

          <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: 'DM Sans, sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '0.05em', color: '#F7F3ED', textDecoration: 'none', padding: '14px 32px', borderRadius: 9999, border: '1.5px solid rgba(143,175,159,0.75)', background: 'rgba(143,175,159,0.15)', backdropFilter: 'blur(6px)', boxShadow: '0 0 18px rgba(143,175,159,0.15), inset 0 1px 0 rgba(255,255,255,0.06)', transition: 'box-shadow 0.25s, transform 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 32px rgba(143,175,159,0.35)'; e.currentTarget.style.transform = 'scale(1.03) translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 0 18px rgba(143,175,159,0.15), inset 0 1px 0 rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'none' }}
          >
            Book a Quick Call
          </a>
        </div>

        {service.heroMockup && (
          <div style={{ position: 'relative', zIndex: 3, width: '92%', maxWidth: 1180, margin: '0 auto' }}>
            <div style={{ position: 'absolute', inset: -1, borderRadius: '16px 16px 0 0', background: 'linear-gradient(180deg, rgba(143,175,159,0.18) 0%, transparent 50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', borderRadius: '16px 16px 0 0', border: '1px solid rgba(143,175,159,0.14)', borderBottom: 'none', background: 'rgba(26,30,28,0.95)', overflow: 'hidden', aspectRatio: '16 / 9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, opacity: 0.28 }}>
                <svg width="52" height="52" viewBox="0 0 52 52" fill="none"><rect x="6" y="11" width="40" height="30" rx="4" stroke="#8FAF9F" strokeWidth="1.5" /><path d="M6 20h40" stroke="#8FAF9F" strokeWidth="1" /><circle cx="13" cy="15.5" r="1.8" fill="#8FAF9F" /><circle cx="19" cy="15.5" r="1.8" fill="#8FAF9F" /><circle cx="25" cy="15.5" r="1.8" fill="#8FAF9F" /></svg>
                <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 11, letterSpacing: '0.12em', color: '#8FAF9F' }}>SCREENSHOT COMING SOON</span>
              </div>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%', background: 'linear-gradient(to top, #1C1C1A 0%, transparent 100%)', pointerEvents: 'none' }} />
            </div>
          </div>
        )}
      </section>

      {/* ── LARGE DEMO ANIMATION ─────────────────────────────────────────────── */}
      <section style={{ background: 'linear-gradient(180deg, #1C1C1A 0%, #1e2420 100%)', padding: '80px 24px 96px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(143,175,159,0.06) 0%, transparent 70%)' }} />
        <Grain opacity={0.03} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel dark>{service.demoLabel}</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 300, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.1, margin: '0 0 16px', letterSpacing: '-0.02em' }}>{service.demoHeadline}</h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 300, lineHeight: 1.65, color: 'rgba(232,224,208,0.5)', maxWidth: 520, margin: '0 auto' }}>{service.demoCopy}</p>
          </div>
          <div style={{ background: 'rgba(18,20,18,0.7)', border: '1px solid rgba(143,175,159,0.14)', borderRadius: '2rem', padding: 'clamp(28px, 5vw, 52px)', boxShadow: '0 24px 80px rgba(0,0,0,0.35), 0 0 0 1px rgba(143,175,159,0.06) inset', backdropFilter: 'blur(4px)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(ellipse at top right, ${service.accentColor}10 0%, transparent 65%)`, pointerEvents: 'none' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 28 }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: SAGE, boxShadow: `0 0 5px ${SAGE}`, animation: 'sp-blink 2.5s ease-in-out infinite' }} />
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.5)' }}>LIVE DEMO</span>
            </div>
            {DemoAnim && <DemoAnim />}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER ──────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, padding: '96px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel>{service.deliversLabel}</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 500, color: CHARCOAL, lineHeight: 1.1, margin: '0 auto 56px', letterSpacing: '-0.02em', maxWidth: '28ch' }}>{service.deliversHeadline}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '0 48px' }}>
            {service.whatWeDeliver.map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, padding: '18px 0', borderBottom: '1px solid rgba(212,201,176,0.4)' }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
                  <circle cx="9" cy="9" r="8" stroke={SAGE} strokeWidth="1" />
                  <path d="M5.5 9l2.5 2.5L12.5 7" stroke={SAGE} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 15, lineHeight: 1.6, color: 'rgba(28,28,26,0.72)', fontWeight: 300 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE HELP ──────────────────────────────────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '80px 24px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel dark>{service.industriesLabel}</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 300, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{service.industriesHeadline}</h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16, fontWeight: 300, color: 'rgba(232,224,208,0.5)', maxWidth: 540, lineHeight: 1.6, margin: '0 auto 56px' }}>{service.industriesCopy}</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
            {service.industries.map((industry) => <IndustryCard key={industry.label} industry={industry} />)}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '80px 24px 96px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel dark>{service.processLabel}</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 300, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.1, margin: '0 0 56px', letterSpacing: '-0.02em' }}>{service.processHeadline}</h2>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>
            {STEPS.map((step) => <ProcessStep key={step.num} step={step} />)}
          </div>
        </div>
      </section>

      {/* ── COMPARISON ───────────────────────────────────────────────────────── */}
      <section style={{ background: LIGHT, padding: '96px 24px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel>{service.comparisonLabel}</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 500, color: CHARCOAL, lineHeight: 1.1, margin: '0 0 12px', letterSpacing: '-0.02em' }}>{service.comparisonHeadline}</h2>
            <p style={{ fontFamily: 'DM Sans', fontSize: 16, fontWeight: 300, color: 'rgba(28,28,26,0.5)', maxWidth: 500, lineHeight: 1.6, margin: '0 auto 48px' }}>{service.comparisonCopy}</p>
          </div>
          <ComparisonTable service={service} />
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────────────────── */}
      <section style={{ background: PARCHMENT, padding: '96px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          <div style={{ textAlign: 'center' }}>
            <SectionLabel>{service.faqLabel}</SectionLabel>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 500, color: CHARCOAL, lineHeight: 1.1, margin: '0 0 48px', letterSpacing: '-0.02em' }}>{service.faqHeadline}</h2>
          </div>
          <div>
            {service.faqs.map((faq, i) => <FAQItem key={i} faq={faq} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(143,175,159,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.4rem, 5vw, 4.2rem)', fontWeight: 300, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.05, margin: '0 0 20px', letterSpacing: '-0.02em' }}>{service.ctaHeadline}</h2>
          <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 16.5, fontWeight: 300, lineHeight: 1.65, color: 'rgba(232,224,208,0.55)', margin: '0 0 44px', maxWidth: 500, marginLeft: 'auto', marginRight: 'auto' }}>{service.ctaCopy}</p>
          <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, fontWeight: 500, letterSpacing: '0.06em', color: '#1C1C1A', textDecoration: 'none', padding: '16px 40px', borderRadius: 9999, background: SAGE, boxShadow: `0 0 32px ${SAGE}30`, transition: 'transform 0.2s, box-shadow 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04) translateY(-2px)'; e.currentTarget.style.boxShadow = `0 0 48px ${SAGE}50` }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = `0 0 32px ${SAGE}30` }}
          >
            Book a Free Workflow Audit
          </a>
        </div>
      </section>

      {/* ── INTERNAL LINKS ───────────────────────────────────────────────────── */}
      <section style={{ background: CHARCOAL, padding: '0 24px 80px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ borderTop: '1px solid rgba(212,201,176,0.1)', paddingTop: 48, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.1em', color: 'rgba(143,175,159,0.4)', marginRight: 4 }}>EXPLORE</span>
            {service.internalLinks.map(link => (
              <Link key={link.path} href={link.path} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13.5, color: 'rgba(232,224,208,0.45)', textDecoration: 'none', padding: '6px 16px', borderRadius: 999, border: '1px solid rgba(212,201,176,0.14)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.currentTarget.style.color = '#F7F3ED'; e.currentTarget.style.borderColor = 'rgba(212,201,176,0.3)' }}
                onMouseLeave={e => { e.currentTarget.style.color = 'rgba(232,224,208,0.45)'; e.currentTarget.style.borderColor = 'rgba(212,201,176,0.14)' }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
