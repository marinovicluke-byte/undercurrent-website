import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

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
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', fontWeight: 500 }}>
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
                <span className="ml-auto font-mono text-charcoal/30" style={{ fontSize: '0.65rem' }}>
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

// Card 2: Admin & Personal Assistant — typewriter inbox
function AdminCard() {
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
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', fontWeight: 500 }}>
          ADMIN & PERSONAL ASSISTANT
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
              <span style={{ fontSize: '0.65rem', color: '#6B7C4A', letterSpacing: '0.1em' }}>SYSTEM IDLE</span>
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
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', fontWeight: 500 }}>
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
                  <span className="font-dm rounded-full px-2.5 py-0.5" style={{ fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.08em', backgroundColor: `${item.color}25`, color: item.color }}>
                    {item.tag}
                  </span>
                  <span style={{ fontSize: '0.68rem', color: isActive ? '#ffffff40' : '#1C1C1A30', fontFamily: 'DM Sans, sans-serif' }}>
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
        <span className="font-dm text-charcoal/40" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', fontWeight: 500 }}>
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
            className="flex-1 rounded-full transition-all duration-500 text-center py-1"
            style={{
              backgroundColor: i === phase ? current.color : `${p.color}20`,
              cursor: 'pointer',
              border: 'none',
            }}
          >
            <span
              className="font-dm"
              style={{
                fontSize: '0.6rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                color: i === phase ? '#1C1C1A' : '#1C1C1A50',
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
            style={{ fontSize: '0.62rem', backgroundColor: `${current.color}25`, color: current.color, letterSpacing: '0.06em' }}
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

export default function WhatWeAutomate() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const row1Ref = useRef(null)
  const row2Ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: headingRef.current, start: 'top 82%' } }
      )
      gsap.fromTo(
        row1Ref.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.18, scrollTrigger: { trigger: row1Ref.current, start: 'top 78%' } }
      )
      gsap.fromTo(
        row2Ref.current.children,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.85, ease: 'power3.out', stagger: 0.18, scrollTrigger: { trigger: row2Ref.current, start: 'top 82%' } }
      )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="what-we-automate" className="py-20 px-6 md:px-12" style={{ backgroundColor: '#F7F3ED' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-10">
          <p className="font-dm text-charcoal/40 mb-3" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500 }}>
            WHAT WE AUTOMATE
          </p>
          <h2
            className="font-cormorant text-charcoal"
            style={{ fontSize: 'clamp(3rem, 5.5vw, 6rem)', fontWeight: 700, lineHeight: 1.0, letterSpacing: '-0.02em' }}
          >
            Four areas.<br />Immediate impact.
          </h2>
          <p className="font-dm text-charcoal/50 mt-4" style={{ fontSize: '1.05rem', fontWeight: 300, maxWidth: '480px', lineHeight: 1.7 }}>
            We focus where the ROI is clearest — and build systems that run without you.
          </p>
        </div>

        {/* Row 1: 3 cards */}
        <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
          <SalesCard />
          <AdminCard />
          <ContentCard />
        </div>

        {/* Row 2: 1 full-width card */}
        <div ref={row2Ref} className="grid grid-cols-1 gap-5">
          <CustomerCard />
        </div>
      </div>
    </section>
  )
}
