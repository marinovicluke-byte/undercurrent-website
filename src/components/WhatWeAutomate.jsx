import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Subtle flowing current lines — same aesthetic as Hero but quieter
function SectionCanvas() {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    const resize = () => {
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)
    let visible = true
    const visObserver = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    visObserver.observe(canvas)

    const currents = [
      { yFrac: 0.18, amp: 32, freq: 0.007, speed: 0.12,  phase: 0,   color: 'rgba(143,175,159,0.10)', lw: 1.0, dash: 0,  gap: 0 },
      { yFrac: 0.28, amp: 22, freq: 0.009, speed: -0.09, phase: 1.4, color: 'rgba(212,201,176,0.09)', lw: 0.8, dash: 0,  gap: 0 },
      { yFrac: 0.50, amp: 40, freq: 0.006, speed: 0.10,  phase: 2.8, color: 'rgba(143,175,159,0.07)', lw: 1.2, dash: 55, gap: 85 },
      { yFrac: 0.62, amp: 18, freq: 0.011, speed: -0.14, phase: 0.8, color: 'rgba(143,175,159,0.08)', lw: 0.6, dash: 0,  gap: 0 },
      { yFrac: 0.75, amp: 28, freq: 0.008, speed: 0.08,  phase: 3.5, color: 'rgba(212,201,176,0.07)', lw: 1.0, dash: 40, gap: 75 },
      { yFrac: 0.88, amp: 14, freq: 0.013, speed: 0.18,  phase: 1.0, color: 'rgba(143,175,159,0.09)', lw: 0.5, dash: 0,  gap: 0 },
    ]
    const driftPhases = currents.map((_, i) => i * 0.9)
    const driftAmps   = [0.030, 0.022, 0.038, 0.016, 0.025, 0.012]
    const driftSpeeds = [0.0004, 0.00035, 0.0003, 0.0005, 0.00028, 0.0006]

    let t = 0
    const draw = () => {
      if (!visible) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)

      currents.forEach((c, i) => {
        const drift = Math.sin(t * driftSpeeds[i] * 1000 + driftPhases[i]) * driftAmps[i]
        const yCenter = (c.yFrac + drift) * H

        ctx.beginPath()
        ctx.strokeStyle = c.color
        ctx.lineWidth = c.lw
        ctx.lineCap = 'round'
        if (c.dash > 0) {
          ctx.setLineDash([c.dash, c.gap])
          ctx.lineDashOffset = -(t * c.speed * 60) % (c.dash + c.gap)
        } else {
          ctx.setLineDash([])
        }

        for (let x = -20; x <= W + 20; x += 3) {
          const y = yCenter + Math.sin(x * c.freq + t * c.speed * 60 + c.phase) * c.amp
          x === -20 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })

      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      visObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  )
}

// Card 1: Sales Outbound — animated pipeline flow
function SalesCard() {
  const [step, setStep] = useState(0)
  const steps = [
    { label: 'Lead identified', icon: '◎', color: '#8FAF9F' },
    { label: 'Research complete', icon: '◉', color: '#8FAF9F' },
    { label: 'Personalised email drafted', icon: '✦', color: '#6B7C4A' },
    { label: 'Sent & tracked', icon: '→', color: '#6B7C4A' },
    { label: 'Follow-up scheduled', icon: '◆', color: '#1C1C1A' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setStep(prev => (prev + 1) % (steps.length + 1))
    }, 900)
    return () => clearInterval(interval)
  }, [])

  const activeStep = step >= steps.length ? steps.length - 1 : step

  return (
    <div
      className="card-hover rounded-4xl border flex flex-col h-full"
      style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '2rem' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#6B7C4A' }} />
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500 }}>
          SALES OUTBOUND
        </span>
      </div>
      <h3 className="font-cormorant text-charcoal mb-1" style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.05 }}>
        Fill your pipeline.<br />While you sleep.
      </h3>
      <p className="font-dm text-charcoal/55 mb-1" style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.6 }}>
        Prospect research, personalised outreach, follow-up sequences — fully automated from first signal to booked meeting.
      </p>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-cormorant" style={{ fontSize: '2rem', fontWeight: 600, color: '#6B7C4A' }}>3×</span>
        <span className="font-dm text-charcoal/45" style={{ fontSize: '0.78rem', fontWeight: 400 }}>more pipeline, same headcount</span>
      </div>
      <div className="flex-1 space-y-2">
        {steps.map((s, i) => {
          const isActive = i === activeStep
          const isDone = i < activeStep || step >= steps.length
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-2xl px-4 py-2.5 transition-all duration-500"
              style={{
                backgroundColor: isDone || isActive ? `${s.color}18` : 'transparent',
                border: `1px solid ${isDone || isActive ? s.color + '30' : 'transparent'}`,
                opacity: isDone || isActive ? 1 : 0.3,
                transform: isActive ? 'translateX(4px)' : 'translateX(0)',
              }}
            >
              <span
                className="font-mono transition-all duration-300"
                style={{ fontSize: '0.75rem', color: isDone || isActive ? s.color : '#1C1C1A30', width: '1rem', textAlign: 'center' }}
              >
                {isDone ? '✓' : s.icon}
              </span>
              <span className="font-dm text-charcoal/70" style={{ fontSize: '0.82rem', fontWeight: isDone ? 400 : isActive ? 500 : 300 }}>
                {s.label}
              </span>
              {isActive && (
                <span className="ml-auto font-mono text-charcoal/30" style={{ fontSize: '0.75rem' }}>
                  running<span className="cursor-blink">_</span>
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Card 2: Personal System — typewriter inbox
function PersonalCard() {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  const messages = [
    '> Drafting reply to client@example.com...',
    '> Scheduling follow-up for Thursday 2pm...',
    '> Summarising 3 unread threads...',
    '> Flagging urgent: contract renewal due.',
    '> Calendar blocked: no-meeting Wednesday.',
    '> All done. Inbox: 0.',
  ]

  useEffect(() => {
    if (lineIdx >= messages.length) {
      const reset = setTimeout(() => {
        setLines([])
        setCurrentLine('')
        setLineIdx(0)
        setCharIdx(0)
      }, 2800)
      return () => clearTimeout(reset)
    }
    if (charIdx < messages[lineIdx].length) {
      const t = setTimeout(() => {
        setCurrentLine(prev => prev + messages[lineIdx][charIdx])
        setCharIdx(c => c + 1)
      }, 38)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, messages[lineIdx]])
        setCurrentLine('')
        setCharIdx(0)
        setLineIdx(l => l + 1)
      }, 500)
      return () => clearTimeout(t)
    }
  }, [lineIdx, charIdx])

  return (
    <div
      className="card-hover rounded-4xl border flex flex-col h-full"
      style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '2rem' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8FAF9F' }} />
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500 }}>
          PERSONAL SYSTEM
        </span>
      </div>
      <h3 className="font-cormorant text-charcoal mb-1" style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.05 }}>
        Your inbox, handled.<br />Your calendar, owned.
      </h3>
      <p className="font-dm text-charcoal/55 mb-1" style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.6 }}>
        Emails drafted, meetings booked, threads summarised. Your AI assistant handles the daily grind so you focus on what matters.
      </p>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-cormorant" style={{ fontSize: '2rem', fontWeight: 600, color: '#6B7C4A' }}>8 hrs</span>
        <span className="font-dm text-charcoal/45" style={{ fontSize: '0.78rem', fontWeight: 400 }}>saved per week, per person</span>
      </div>
      <div
        className="flex-1 rounded-2xl p-4 font-mono"
        style={{ backgroundColor: '#1C1C1A', height: '180px', minHeight: '180px', maxHeight: '180px', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        <div style={{ overflow: 'hidden' }}>
          {lines.map((line, i) => (
            <div key={i} style={{ fontSize: '0.72rem', color: '#8FAF9F', lineHeight: 1.85, opacity: i < lines.length - 1 ? 0.5 : 0.75 }}>
              {line}
            </div>
          ))}
          {lineIdx < messages.length && (
            <div style={{ fontSize: '0.72rem', color: '#8FAF9F', lineHeight: 1.85 }}>
              {currentLine}
              <span className="cursor-blink" style={{ color: '#6B7C4A' }}>█</span>
            </div>
          )}
          {lineIdx >= messages.length && (
            <div className="mt-2 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ backgroundColor: '#6B7C4A' }} />
              <span style={{ fontSize: '0.75rem', color: '#6B7C4A', letterSpacing: '0.1em' }}>SYSTEM IDLE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Card 3: Content Generation — stacked cycling cards
function ContentCard() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)

  const content = [
    { type: 'LinkedIn Post', preview: 'Why most agencies fail at AI: a thread on what we actually build for clients...', tag: 'Social', color: '#8FAF9F' },
    { type: 'Case Study', preview: 'How a 3-person firm replaced 20hrs/wk of admin with a single automation stack...', tag: 'Long-form', color: '#6B7C4A' },
    { type: 'Email Newsletter', preview: 'This week: 3 workflows we deployed, 1 client result, and a tool you should know...', tag: 'Email', color: '#D4C9B0' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % content.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    setProgress(0)
    const startTime = Date.now()
    const duration = 3200
    const frame = () => {
      const elapsed = Date.now() - startTime
      setProgress(Math.min((elapsed / duration) * 100, 100))
      if (elapsed < duration) requestAnimationFrame(frame)
    }
    const raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [active])

  return (
    <div
      className="card-hover rounded-4xl border flex flex-col h-full"
      style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '2rem' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8FAF9F' }} />
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500 }}>
          CONTENT & MARKETING
        </span>
      </div>
      <h3 className="font-cormorant text-charcoal mb-1" style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.05 }}>
        Publish more.<br />Write less.
      </h3>
      <p className="font-dm text-charcoal/55 mb-1" style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.6 }}>
        From brief to published. Research, drafting, formatting, and distribution — all automated across every channel you use.
      </p>
      <div className="flex items-baseline gap-2 mb-6">
        <span className="font-cormorant" style={{ fontSize: '2rem', fontWeight: 600, color: '#6B7C4A' }}>10×</span>
        <span className="font-dm text-charcoal/45" style={{ fontSize: '0.78rem', fontWeight: 400 }}>more output, same creative effort</span>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="h-0.5 rounded-full overflow-hidden" style={{ backgroundColor: '#D4C9B040' }}>
          <div
            className="h-full rounded-full"
            style={{ width: `${progress}%`, backgroundColor: content[active].color, transition: progress === 0 ? 'none' : 'width 0.1s linear' }}
          />
        </div>
        <div className="relative flex-1" style={{ minHeight: '120px' }}>
          {content.map((item, i) => {
            const offset = (i - active + content.length) % content.length
            const isActive = offset === 0
            const isNext = offset === 1
            return (
              <div
                key={item.type}
                className="absolute inset-0 rounded-2xl p-4 transition-all duration-700"
                style={{
                  backgroundColor: isActive ? '#1C1C1A' : '#E8E0D0',
                  opacity: isActive ? 1 : isNext ? 0.5 : 0.2,
                  transform: isActive ? 'translateY(0) scale(1)' : isNext ? 'translateY(-12px) scale(0.95)' : 'translateY(-22px) scale(0.9)',
                  zIndex: isActive ? 3 : isNext ? 2 : 1,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-dm rounded-full px-2.5 py-0.5" style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.08em', backgroundColor: `${item.color}25`, color: item.color }}>
                    {item.tag}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: isActive ? '#ffffff40' : '#1C1C1A30', fontFamily: 'DM Sans, sans-serif' }}>
                    {item.type}
                  </span>
                </div>
                <p className="font-dm" style={{ fontSize: '0.82rem', lineHeight: 1.55, fontWeight: 300, color: isActive ? 'rgba(255,255,255,0.7)' : '#1C1C1A50' }}>
                  {item.preview}
                </p>
              </div>
            )
          })}
        </div>
        <div className="flex gap-1.5 justify-center">
          {content.map((_, i) => (
            <div key={i} className="rounded-full transition-all duration-500" style={{ width: active === i ? '1.5rem' : '0.4rem', height: '0.4rem', backgroundColor: active === i ? '#6B7C4A' : '#D4C9B0' }} />
          ))}
        </div>
      </div>
    </div>
  )
}

// Card 4: Customer Experience — lifecycle timeline slider
function CustomerCard() {
  const [phase, setPhase] = useState(0)
  const [sliding, setSliding] = useState(false)

  const phases = [
    {
      stage: 'Onboarding',
      time: 'Day 1',
      color: '#8FAF9F',
      actions: [
        'Welcome email sequence sent',
        'Onboarding portal link delivered',
        'Setup checklist auto-assigned',
      ],
    },
    {
      stage: 'Activation',
      time: 'Week 1–2',
      color: '#6B7C4A',
      actions: [
        'Check-in message triggered',
        'Usage milestone celebrated',
        'Resource pack delivered',
      ],
    },
    {
      stage: 'Nurture',
      time: 'Month 1–3',
      color: '#A89F7A',
      actions: [
        'Personalised tips based on usage',
        'Upsell offer at right moment',
        'Satisfaction pulse survey sent',
      ],
    },
    {
      stage: 'Advocacy',
      time: 'Month 3+',
      color: '#D4C9B0',
      actions: [
        'Review request automatically sent',
        'Referral program triggered',
        'NPS survey + follow-up flow',
      ],
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setSliding(true)
      setTimeout(() => {
        setPhase(prev => (prev + 1) % phases.length)
        setSliding(false)
      }, 300)
    }, 2800)
    return () => clearInterval(interval)
  }, [])

  const current = phases[phase]

  return (
    <div
      className="card-hover rounded-4xl border flex flex-col h-full"
      style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '2rem' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#A89F7A' }} />
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500 }}>
          CUSTOMER EXPERIENCE
        </span>
      </div>
      <h3 className="font-cormorant text-charcoal mb-1" style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.05 }}>
        Every customer.<br />Always looked after.
      </h3>
      <p className="font-dm text-charcoal/55 mb-1" style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.6 }}>
        Onboarding, follow-ups, reviews, and referrals — the full customer lifecycle automated so no one slips through the cracks.
      </p>
      <div className="flex items-baseline gap-2 mb-5">
        <span className="font-cormorant" style={{ fontSize: '2rem', fontWeight: 600, color: '#A89F7A' }}>40%</span>
        <span className="font-dm text-charcoal/45" style={{ fontSize: '0.78rem', fontWeight: 400 }}>more 5-star reviews, on autopilot</span>
      </div>

      {/* Stage slider track */}
      <div className="flex gap-1 mb-4">
        {phases.map((p, i) => (
          <button
            key={p.stage}
            onClick={() => setPhase(i)}
            className="flex-1 rounded-full transition-all duration-500 text-center"
            style={{
              backgroundColor: i === phase ? current.color : `${p.color}20`,
              cursor: 'pointer',
              border: 'none',
              padding: '4px 2px',
              minWidth: 0,
            }}
          >
            <span
              className="font-dm"
              style={{
                fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)',
                fontWeight: 600,
                letterSpacing: '0.03em',
                color: i === phase ? '#1C1C1A' : '#1C1C1A50',
                display: 'block',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {p.stage.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Sliding content panel */}
      <div
        className="flex-1 rounded-2xl p-4 transition-all duration-300"
        style={{
          backgroundColor: `${current.color}15`,
          border: `1px solid ${current.color}30`,
          opacity: sliding ? 0 : 1,
          transform: sliding ? 'translateX(8px)' : 'translateX(0)',
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <span
            className="font-cormorant"
            style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1C1C1A', lineHeight: 1 }}
          >
            {current.stage}
          </span>
          <span
            className="font-mono rounded-full px-2.5 py-0.5"
            style={{ fontSize: '0.75rem', backgroundColor: `${current.color}25`, color: current.color, letterSpacing: '0.06em' }}
          >
            {current.time}
          </span>
        </div>
        <div className="space-y-2">
          {current.actions.map((action, i) => (
            <div
              key={action}
              className="flex items-start gap-2.5 transition-all duration-500"
              style={{ transitionDelay: `${i * 80}ms`, opacity: sliding ? 0 : 1 }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
                style={{ backgroundColor: current.color }}
              />
              <span className="font-dm text-charcoal/65" style={{ fontSize: '0.82rem', fontWeight: 300, lineHeight: 1.5 }}>
                {action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// Card 5: Finance — invoice flow diagram
function FinanceCard() {
  const [phase, setPhase] = useState(0)
  const [paid, setPaid] = useState(true)

  useEffect(() => {
    const sequence = [
      { phase: 1, delay: 600 },
      { phase: 2, delay: 1400 },
      { phase: 3, delay: 1200 },
      { phase: 4, delay: 1600 },
      { phase: 5, delay: 1200 },
      { phase: 6, delay: 900 },
    ]
    let timers = []
    let accumulated = 0
    sequence.forEach(({ phase: p, delay }) => {
      accumulated += delay
      timers.push(setTimeout(() => setPhase(p), accumulated))
    })
    const reset = setTimeout(() => {
      setPhase(0)
      setPaid(prev => !prev)
      setTimeout(() => setPhase(1), 600)
    }, accumulated + 2400)
    timers.push(reset)
    return () => timers.forEach(clearTimeout)
  }, [paid])

  const accent = '#A89F7A'
  const green = '#6B7C4A'
  const red = '#C07A6A'
  const dim = 'rgba(28,28,26,0.15)'
  const notifyColor = paid ? green : red

  const step1Done = phase >= 2, step1Active = phase === 1
  const step2Done = phase >= 3, step2Active = phase === 2
  const step3Done = phase >= 4, step3Active = phase === 3
  const paidDone = phase >= 5 && paid,    paidActive   = phase === 4 && paid
  const unpaidDone = phase >= 5 && !paid, unpaidActive = phase === 4 && !paid
  const notifyDone = phase >= 6, notifyActive = phase === 5

  const nodeRow = (active, done, color = accent) => ({
    display: 'flex', alignItems: 'center', gap: '0.75rem',
    opacity: active || done ? 1 : 0.32,
    transition: 'opacity 0.5s ease',
  })
  const circ = (active, done, color = accent) => ({
    width: '2.2rem', height: '2.2rem', borderRadius: '50%', flexShrink: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundColor: done ? color : active ? `${color}22` : 'rgba(28,28,26,0.05)',
    border: `1.5px solid ${done || active ? color : dim}`,
    boxShadow: active ? `0 0 0 4px ${color}14` : 'none',
    transition: 'all 0.5s ease',
  })
  const lbl = (active, done, text) => (
    <span style={{
      fontSize: '0.78rem', fontWeight: active || done ? 500 : 300,
      color: active || done ? '#1C1C1A' : 'rgba(28,28,26,0.38)',
      fontFamily: 'DM Sans, sans-serif', transition: 'color 0.4s ease',
    }}>{text}</span>
  )
  const vline = (active, color = accent) => (
    <div style={{
      width: '1.5px', height: '1.4rem', marginLeft: '1.1rem',
      backgroundColor: active ? color : dim,
      transition: 'background-color 0.5s ease',
    }} />
  )

  const ic = (active, done) => done ? '#F7F3ED' : active ? '#F7F3ED' : 'rgba(28,28,26,0.28)'
  const icAccent = (active, done) => done ? '#F7F3ED' : active ? accent : 'rgba(28,28,26,0.28)'

  return (
    <div
      className="card-hover rounded-4xl border flex flex-col h-full"
      style={{ backgroundColor: '#EDE8E0', borderColor: '#D4C9B0', padding: '2rem' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#A89F7A' }} />
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', fontWeight: 500 }}>
          FINANCE
        </span>
      </div>
      <h3 className="font-cormorant text-charcoal mb-1" style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.05 }}>
        Invoices out.<br />Expenses tracked.
      </h3>
      <p className="font-dm text-charcoal/55 mb-1" style={{ fontWeight: 300, fontSize: '0.95rem', lineHeight: 1.6 }}>
        Invoice generation, overdue follow-ups, expense capture, and cash flow reporting — all automated so your books stay clean without the admin.
      </p>
      <div className="flex items-baseline gap-2 mb-5">
        <span className="font-cormorant" style={{ fontSize: '2rem', fontWeight: 600, color: '#A89F7A' }}>5 hrs</span>
        <span className="font-dm text-charcoal/45" style={{ fontSize: '0.78rem', fontWeight: 400 }}>saved on finance admin per week</span>
      </div>

      {/* Flow diagram */}
      <div className="flex-1" style={{ padding: '0.1rem 0' }}>
        {/* Step 1 */}
        <div style={nodeRow(step1Active, step1Done)}>
          <div style={circ(step1Active, step1Done)}>
            {step1Done
              ? <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#F7F3ED" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><rect x="3" y="1.5" width="8" height="11" rx="1" stroke={icAccent(step1Active, step1Done)} strokeWidth="1.5"/><path d="M5.5 5h3M5.5 7.5h3M5.5 10h2" stroke={icAccent(step1Active, step1Done)} strokeWidth="1.2" strokeLinecap="round"/></svg>}
          </div>
          {lbl(step1Active, step1Done, 'Generate invoice')}
        </div>
        {vline(step2Active || step2Done)}

        {/* Step 2 */}
        <div style={nodeRow(step2Active, step2Done)}>
          <div style={circ(step2Active, step2Done)}>
            {step2Done
              ? <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#F7F3ED" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M8 3l4 4-4 4" stroke={ic(step2Active, step2Done)} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>}
          </div>
          {lbl(step2Active, step2Done, 'Send invoice to client')}
        </div>
        {vline(step3Active || step3Done)}

        {/* Step 3 */}
        <div style={nodeRow(step3Active, step3Done)}>
          <div style={circ(step3Active, step3Done)}>
            {step3Done
              ? <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#F7F3ED" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <svg width="12" height="12" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={icAccent(step3Active, step3Done)} strokeWidth="1.5"/><path d="M7 4.5V7l2 1.5" stroke={icAccent(step3Active, step3Done)} strokeWidth="1.3" strokeLinecap="round"/></svg>}
          </div>
          {lbl(step3Active, step3Done, 'Awaiting payment')}
        </div>
        {vline(phase >= 4)}

        {/* Branch */}
        <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '0' }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.55rem 0.65rem', borderRadius: '0.65rem',
            opacity: paidActive || paidDone ? 1 : 0.3,
            backgroundColor: paidDone ? `${green}12` : paidActive ? `${green}08` : 'rgba(28,28,26,0.03)',
            border: `1px solid ${paidDone || paidActive ? `${green}35` : dim}`,
            transition: 'all 0.5s ease',
          }}>
            <div style={circ(paidActive, paidDone, green)}>
              {paidDone
                ? <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><path d="M2.5 7L5.5 10L11.5 4" stroke="#F7F3ED" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/></svg>
                : <svg width="11" height="11" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="5.5" stroke={paidActive ? green : dim} strokeWidth="1.5"/><path d="M4.5 7l2 2 3-3" stroke={paidActive ? green : dim} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: paidActive || paidDone ? 500 : 300, color: paidDone ? green : paidActive ? green : 'rgba(28,28,26,0.35)', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.4s ease', lineHeight: 1.3 }}>Payment<br/>received</span>
          </div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '0.6rem',
            padding: '0.55rem 0.65rem', borderRadius: '0.65rem',
            opacity: unpaidActive || unpaidDone ? 1 : 0.3,
            backgroundColor: unpaidDone ? `${red}12` : unpaidActive ? `${red}08` : 'rgba(28,28,26,0.03)',
            border: `1px solid ${unpaidDone || unpaidActive ? `${red}35` : dim}`,
            transition: 'all 0.5s ease',
          }}>
            <div style={circ(unpaidActive, unpaidDone, red)}>
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><circle cx="6" cy="6" r="5" stroke={unpaidDone || unpaidActive ? '#F7F3ED' : dim} strokeWidth="1.5"/><path d="M4 4l4 4M8 4l-4 4" stroke={unpaidDone || unpaidActive ? '#F7F3ED' : dim} strokeWidth="1.3" strokeLinecap="round"/></svg>
            </div>
            <span style={{ fontSize: '0.72rem', fontWeight: unpaidActive || unpaidDone ? 500 : 300, color: unpaidDone ? red : unpaidActive ? red : 'rgba(28,28,26,0.35)', fontFamily: 'DM Sans, sans-serif', transition: 'color 0.4s ease', lineHeight: 1.3 }}>Not<br/>received</span>
          </div>
        </div>
        {vline(phase >= 5, notifyColor)}

        {/* Notify */}
        <div style={nodeRow(notifyActive, notifyDone, notifyColor)}>
          <div style={circ(notifyActive, notifyDone, notifyColor)}>
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path d="M7 2a4 4 0 0 1 4 4v2.5l1 1.5H2l1-1.5V6a4 4 0 0 1 4-4z" stroke={notifyDone || notifyActive ? '#F7F3ED' : 'rgba(28,28,26,0.28)'} strokeWidth="1.4" strokeLinejoin="round"/>
              <path d="M5.5 10.5a1.5 1.5 0 0 0 3 0" stroke={notifyDone || notifyActive ? '#F7F3ED' : 'rgba(28,28,26,0.28)'} strokeWidth="1.3"/>
            </svg>
          </div>
          {lbl(notifyActive, notifyDone, paid ? 'Receipt confirmation sent' : 'Automated reminder sent')}
        </div>

        {/* Status badge */}
        <div style={{ marginTop: '1rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.3rem 0.85rem', borderRadius: '9999px',
            backgroundColor: phase >= 6 ? (paid ? `${green}12` : `${red}12`) : 'rgba(28,28,26,0.04)',
            border: `1px solid ${phase >= 6 ? (paid ? `${green}35` : `${red}35`) : 'rgba(28,28,26,0.1)'}`,
            transition: 'all 0.5s ease',
          }}>
            <div style={{
              width: '0.35rem', height: '0.35rem', borderRadius: '50%',
              backgroundColor: phase >= 6 ? (paid ? green : red) : 'rgba(28,28,26,0.18)',
              transition: 'background-color 0.5s ease',
            }} />
            <span style={{
              fontSize: '0.75rem', fontFamily: 'DM Sans, sans-serif', fontWeight: 500,
              letterSpacing: '0.09em',
              color: phase >= 6 ? (paid ? green : red) : 'rgba(28,28,26,0.28)',
              transition: 'color 0.5s ease',
            }}>
              {phase >= 6 ? (paid ? 'PAID — COMPLETE' : 'OVERDUE — CHASING') : 'IN PROGRESS'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Area data ───────────────────────────────────────────────────────────────
const AREAS = [
  { id: 'cx',      num: '01', label: 'Customer Experience', dot: '#A89F7A', metric: '40%',   sub: 'more 5-star reviews' },
  { id: 'sales',   num: '02', label: 'Sales Outbound',      dot: '#6B7C4A', metric: '3×',    sub: 'more pipeline'       },
  { id: 'content', num: '03', label: 'Content & Marketing', dot: '#8FAF9F', metric: '10×',   sub: 'more output'         },
  { id: 'personal',num: '04', label: 'Personal System',     dot: '#8FAF9F', metric: '8 hrs', sub: 'saved / week'        },
  { id: 'finance', num: '05', label: 'Finance',             dot: '#A89F7A', metric: '5 hrs', sub: 'saved / week'        },
]

// Chevron icon
function ChevronIcon({ open }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 16 16" fill="none"
      style={{
        transition: 'transform 0.4s cubic-bezier(0.34,1.56,0.64,1)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        flexShrink: 0,
      }}
    >
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

// ─── Main export ─────────────────────────────────────────────────────────────
export default function WhatWeAutomate() {
  // Which panel is open (0–4). Start with 0 open.
  const [openIdx, setOpenIdx] = useState(0)
  // Drives content fade/slide when switching tabs (desktop)
  const [panelVisible, setPanelVisible] = useState(true)
  const [panelKey, setPanelKey] = useState(0)

  const sectionRef  = useRef(null)
  const headingRef  = useRef(null)
  const selectorRef = useRef(null)

  // Tabs selector: switch with a brief crossfade
  const handleSelect = (idx) => {
    if (idx === openIdx) return
    setPanelVisible(false)
    setTimeout(() => {
      setOpenIdx(idx)
      setPanelKey(k => k + 1)   // remount card so its animation restarts
      setPanelVisible(true)
    }, 200)
  }

  // Mobile accordion: toggle open/close
  const handleMobileToggle = (idx) => {
    setOpenIdx(prev => prev === idx ? -1 : idx)
    setPanelKey(k => k + 1)
  }

  // GSAP scroll reveal
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
      gsap.fromTo(
        selectorRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: selectorRef.current, start: 'top 85%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const cards = [
    <CustomerCard key={`cx-${panelKey}`} />,
    <SalesCard    key={`sales-${panelKey}`} />,
    <ContentCard  key={`content-${panelKey}`} />,
    <PersonalCard key={`personal-${panelKey}`} />,
    <FinanceCard  key={`finance-${panelKey}`} />,
  ]

  return (
    <section
      ref={sectionRef}
      id="what-we-automate"
      className="py-20 px-6 md:px-12"
      style={{ backgroundColor: '#F7F3ED', position: 'relative', overflow: 'hidden' }}
    >
      {/* Animated water-current background */}
      <SectionCanvas />

      {/* Radial gradient blooms */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: [
          'radial-gradient(ellipse 70% 45% at 15% 12%, rgba(143,175,159,0.10) 0%, transparent 70%)',
          'radial-gradient(ellipse 50% 35% at 85% 8%, rgba(212,201,176,0.12) 0%, transparent 65%)',
          'radial-gradient(ellipse 60% 40% at 50% 55%, rgba(143,175,159,0.06) 0%, transparent 70%)',
          'radial-gradient(ellipse 45% 30% at 10% 85%, rgba(212,201,176,0.08) 0%, transparent 65%)',
          'radial-gradient(ellipse 55% 35% at 90% 90%, rgba(143,175,159,0.07) 0%, transparent 65%)',
        ].join(', '),
      }} />

      <div className="max-w-7xl mx-auto" style={{ position: 'relative', zIndex: 1 }}>

        {/* ── Heading ── */}
        <div ref={headingRef} className="mb-10">
          <p className="font-dm text-charcoal/40 mb-3" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500 }}>
            WHAT WE AUTOMATE
          </p>
          <h2
            className="font-cormorant text-charcoal"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            Five areas.<br />Immediate impact.
          </h2>
          <p className="font-dm text-charcoal/50 mt-4" style={{ fontSize: '1.05rem', fontWeight: 300, maxWidth: '480px', lineHeight: 1.7 }}>
            We focus where the ROI is clearest — and build systems that run without you.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════
            DESKTOP LAYOUT  (md+): horizontal tab rail
        ══════════════════════════════════════════════════ */}
        <div ref={selectorRef} className="hidden md:block">

          {/* Tab rail */}
          <div
            className="relative flex rounded-2xl overflow-hidden mb-5"
            style={{
              border: '1px solid #D4C9B0',
              backgroundColor: '#EDE8E0',
            }}
          >
            {/* Gliding highlight pill */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '6px',
                bottom: '6px',
                left: `calc(${openIdx} * 20% + 5px)`,
                width: 'calc(20% - 10px)',
                backgroundColor: '#F7F3ED',
                borderRadius: '10px',
                boxShadow: '0 1px 6px rgba(28,28,26,0.08)',
                border: '1px solid rgba(212,201,176,0.6)',
                transition: 'left 0.45s cubic-bezier(0.34, 1.4, 0.64, 1)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {AREAS.map((area, i) => {
              const isActive = openIdx === i
              return (
                <button
                  key={area.id}
                  onClick={() => handleSelect(i)}
                  style={{
                    flex: 1,
                    position: 'relative',
                    zIndex: 1,
                    padding: '1rem 0.75rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'opacity 0.2s ease',
                  }}
                >
                  {/* Number */}
                  <span
                    className="font-mono block mb-1"
                    style={{
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      color: isActive ? area.dot : 'rgba(28,28,26,0.3)',
                      transition: 'color 0.3s ease',
                      fontWeight: 500,
                    }}
                  >
                    {area.num}
                  </span>

                  {/* Label */}
                  <span
                    className="font-dm block"
                    style={{
                      fontSize: 'clamp(0.75rem, 1.1vw, 0.82rem)',
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? '#1C1C1A' : 'rgba(28,28,26,0.45)',
                      lineHeight: 1.25,
                      transition: 'color 0.3s ease, font-weight 0.2s ease',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {area.label}
                  </span>

                  {/* Metric */}
                  <span
                    className="font-cormorant block"
                    style={{
                      fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                      fontWeight: 700,
                      color: isActive ? area.dot : 'rgba(28,28,26,0.25)',
                      lineHeight: 1,
                      transition: 'color 0.3s ease',
                    }}
                  >
                    {area.metric}
                  </span>
                  <span
                    className="font-dm block"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: 300,
                      color: isActive ? 'rgba(28,28,26,0.45)' : 'rgba(28,28,26,0.25)',
                      transition: 'color 0.3s ease',
                      marginTop: '0.1rem',
                    }}
                  >
                    {area.sub}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Content panel */}
          <div
            style={{
              opacity: panelVisible ? 1 : 0,
              transform: panelVisible ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.25s ease, transform 0.3s ease',
            }}
          >
            {cards[openIdx]}
          </div>
        </div>

        {/* ══════════════════════════════════════════════════
            MOBILE LAYOUT  (<md): vertical accordion
        ══════════════════════════════════════════════════ */}
        <div className="md:hidden space-y-2">
          {AREAS.map((area, i) => {
            const isOpen = openIdx === i
            return (
              <div
                key={area.id}
                className="rounded-2xl overflow-hidden"
                style={{
                  border: `1px solid ${isOpen ? area.dot + '50' : '#D4C9B0'}`,
                  backgroundColor: isOpen ? '#EDE8E0' : 'rgba(237,232,224,0.5)',
                  transition: 'border-color 0.3s ease, background-color 0.3s ease',
                }}
              >
                {/* Accordion trigger */}
                <button
                  onClick={() => handleMobileToggle(i)}
                  className="w-full flex items-center gap-4 text-left"
                  style={{
                    padding: '1rem 1.25rem',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {/* Dot + number */}
                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div
                      className="rounded-full transition-all duration-300"
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: isOpen ? area.dot : 'rgba(28,28,26,0.2)',
                        boxShadow: isOpen ? `0 0 6px ${area.dot}80` : 'none',
                      }}
                    />
                    <span
                      className="font-mono"
                      style={{
                        fontSize: '0.75rem',
                        color: isOpen ? area.dot : 'rgba(28,28,26,0.3)',
                        letterSpacing: '0.1em',
                        fontWeight: 600,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {area.num}
                    </span>
                  </div>

                  {/* Label + metric */}
                  <div className="flex-1 min-w-0">
                    <span
                      className="font-dm block"
                      style={{
                        fontSize: '0.9rem',
                        fontWeight: isOpen ? 500 : 400,
                        color: isOpen ? '#1C1C1A' : 'rgba(28,28,26,0.55)',
                        transition: 'color 0.3s ease',
                      }}
                    >
                      {area.label}
                    </span>
                    <span
                      className="font-dm"
                      style={{
                        fontSize: '0.72rem',
                        color: isOpen ? area.dot : 'rgba(28,28,26,0.3)',
                        fontWeight: 400,
                        transition: 'color 0.3s ease',
                      }}
                    >
                      <span className="font-cormorant" style={{ fontWeight: 700, fontSize: '0.9rem' }}>{area.metric}</span>
                      {' '}{area.sub}
                    </span>
                  </div>

                  {/* Chevron */}
                  <span style={{ color: isOpen ? area.dot : 'rgba(28,28,26,0.3)', transition: 'color 0.3s ease' }}>
                    <ChevronIcon open={isOpen} />
                  </span>
                </button>

                {/* Accordion content — CSS grid-template-rows trick for smooth height */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0 0.75rem 0.75rem' }}>
                      {cards[i]}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
