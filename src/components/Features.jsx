import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Card 1: Diagnostic Shuffler
function AutomationCard() {
  const [active, setActive] = useState(0)
  const items = ['Lead Follow-Up', 'Client Onboarding', 'Booking Confirmation']
  const colors = ['#8FAF9F', '#6B7C4A', '#D4C9B0']

  useEffect(() => {
    const interval = setInterval(() => {
      setActive(prev => (prev + 1) % items.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="card-hover rounded-4xl border p-8 flex flex-col h-full"
      style={{ backgroundColor: '#F7F3ED', borderColor: '#D4C9B0' }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8FAF9F' }} />
        <span className="font-dm text-charcoal/50" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 500 }}>
          ALWAYS-ON AUTOMATION
        </span>
      </div>

      <h3 className="font-cormorant text-charcoal mb-2" style={{ fontSize: '2.4rem', fontWeight: 600, lineHeight: 1.1 }}>
        Always-On Automation
      </h3>
      <p className="font-dm text-charcoal/60 mb-8" style={{ fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.65 }}>
        Lead follow-up, client onboarding, bookings, and re-engagement running 24/7 without human input.
      </p>

      {/* Shuffling cards */}
      <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: '140px', height: '140px', overflow: 'hidden' }}>
        {items.map((item, i) => {
          const offset = (i - active + items.length) % items.length
          const isActive = offset === 0
          const isNext = offset === 1
          const isPrev = offset === 2

          return (
            <div
              key={item}
              className="absolute rounded-[1.5rem] px-5 py-3 font-dm font-medium"
              style={{
                backgroundColor: isActive ? colors[i] : '#E8E0D0',
                color: isActive ? '#1C1C1A' : '#1C1C1A80',
                fontSize: '0.85rem',
                letterSpacing: '0.02em',
                transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: isActive
                  ? 'translateY(0) scale(1)'
                  : isNext
                  ? 'translateY(-28px) scale(0.92)'
                  : 'translateY(-50px) scale(0.84)',
                opacity: isActive ? 1 : isNext ? 0.6 : 0.3,
                zIndex: isActive ? 3 : isNext ? 2 : 1,
                whiteSpace: 'nowrap',
                border: `1px solid ${isActive ? 'transparent' : '#D4C9B0'}`,
                willChange: 'transform, opacity',
              }}
            >
              {item}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Card 2: Telemetry Typewriter
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768

function TypewriterCard() {
  const [lines, setLines] = useState([])
  const [currentLine, setCurrentLine] = useState('')
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)

  const messages = [
    'Mapping client intake process...',
    'Identifying manual touchpoints...',
    'Designing automation logic...',
    'Connecting CRM integration...',
    'Deploying to production...',
    'System operational.',
  ]

  useEffect(() => {
    if (IS_MOBILE) return
    if (lineIdx >= messages.length) {
      const reset = setTimeout(() => {
        setLines([])
        setCurrentLine('')
        setLineIdx(0)
        setCharIdx(0)
      }, 2500)
      return () => clearTimeout(reset)
    }

    if (charIdx < messages[lineIdx].length) {
      const t = setTimeout(() => {
        setCurrentLine(prev => prev + messages[lineIdx][charIdx])
        setCharIdx(c => c + 1)
      }, 45)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setLines(prev => [...prev, messages[lineIdx]])
        setCurrentLine('')
        setCharIdx(0)
        setLineIdx(l => l + 1)
      }, 600)
      return () => clearTimeout(t)
    }
  }, [lineIdx, charIdx])

  return (
    <div
      className="card-hover rounded-4xl border p-8 flex flex-col h-full"
      style={{ backgroundColor: '#F7F3ED', borderColor: '#D4C9B0' }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full pulse-dot" style={{ backgroundColor: '#6B7C4A' }} />
        <span className="font-dm text-charcoal/50" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 500 }}>
          LIVE BUILD
        </span>
      </div>

      <h3 className="font-cormorant text-charcoal mb-2" style={{ fontSize: '2.4rem', fontWeight: 600, lineHeight: 1.1 }}>
        Built Around How You Work
      </h3>
      <p className="font-dm text-charcoal/60 mb-6" style={{ fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.65 }}>
        Every workflow is built to match how your business already runs — not a generic template you have to adapt to.
      </p>

      <div
        className="rounded-[1.5rem] p-4 font-mono"
        style={{ backgroundColor: '#1C1C1A', height: '130px', minHeight: '130px', maxHeight: '130px', flexShrink: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
      >
        <div style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
          {(IS_MOBILE ? messages : lines).map((line, i) => (
            <div key={i} className="font-mono" style={{ fontSize: '0.72rem', color: '#8FAF9F', lineHeight: 1.8, opacity: 0.6 }}>
              <span style={{ color: '#6B7C4A', marginRight: '0.5rem' }}>›</span>
              {line}
            </div>
          ))}
          {!IS_MOBILE && lineIdx < messages.length && (
            <div className="font-mono" style={{ fontSize: '0.72rem', color: '#8FAF9F', lineHeight: 1.8 }}>
              <span style={{ color: '#6B7C4A', marginRight: '0.5rem' }}>›</span>
              {currentLine}
              <span className="cursor-blink" style={{ color: '#6B7C4A' }}>█</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Card 3: Scheduler Protocol
function SchedulerCard() {
  const [activeDay, setActiveDay] = useState(0)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const events = [
    { day: 0, label: 'Lead arrives', color: '#D4C9B0' },
    { day: 1, label: 'AI qualifies', color: '#8FAF9F' },
    { day: 2, label: 'Follow-up sends', color: '#6B7C4A' },
    { day: 3, label: 'Meeting booked', color: '#1C1C1A' },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveDay(prev => (prev + 1) % 5)
    }, 1200)
    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="card-hover rounded-4xl border p-8 flex flex-col h-full"
      style={{ backgroundColor: '#F7F3ED', borderColor: '#D4C9B0' }}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#8FAF9F' }} />
        <span className="font-dm text-charcoal/50" style={{ fontSize: '0.7rem', letterSpacing: '0.15em', fontWeight: 500 }}>
          SCHEDULER PROTOCOL
        </span>
      </div>

      <h3 className="font-cormorant text-charcoal mb-2" style={{ fontSize: '2.4rem', fontWeight: 600, lineHeight: 1.1 }}>
        Work You Shouldn't Be Doing
      </h3>
      <p className="font-dm text-charcoal/60 mb-6" style={{ fontWeight: 300, fontSize: '1.1rem', lineHeight: 1.65 }}>
        We hand the repetitive stuff to intelligent systems so you and your team can focus on work that actually moves things forward.
      </p>

      {/* Weekly grid */}
      <div className="flex-1">
        <div className="grid grid-cols-5 gap-1.5 mb-3">
          {days.map((day, i) => (
            <div
              key={day}
              className="rounded-xl py-1.5 text-center font-dm transition-all duration-500"
              style={{
                fontSize: '0.7rem',
                fontWeight: 500,
                letterSpacing: '0.05em',
                backgroundColor: i <= activeDay ? 'rgba(143,175,159,0.2)' : 'transparent',
                color: i <= activeDay ? '#1C1C1A' : '#1C1C1A40',
              }}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-2">
          {events.map((event, i) => (
            <div
              key={event.label}
              className="flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-700"
              style={{
                backgroundColor: activeDay >= event.day ? `${event.color}20` : 'transparent',
                opacity: activeDay >= event.day ? 1 : 0.3,
                transform: activeDay >= event.day ? 'translateX(0)' : 'translateX(-6px)',
                border: `1px solid ${activeDay >= event.day ? event.color + '40' : 'transparent'}`,
              }}
            >
              <div
                className="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-500"
                style={{ backgroundColor: activeDay >= event.day ? event.color : '#D4C9B0' }}
              />
              <span className="font-dm text-charcoal/70" style={{ fontSize: '0.8rem', fontWeight: 400 }}>
                <span className="font-mono text-charcoal/30 mr-2" style={{ fontSize: '0.7rem' }}>{days[event.day]}</span>
                {event.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Features() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.45, ease: 'power3.out',
          scrollTrigger: { trigger: headingRef.current, start: 'top 95%' }
        }
      )

      gsap.fromTo(cardsRef.current.children,
        { y: 25, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.4, ease: 'power3.out', stagger: 0.08,
          scrollTrigger: { trigger: cardsRef.current, start: 'top 95%' }
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="features" className="py-16 px-6 md:px-12" style={{ backgroundColor: '#F7F3ED' }}>
      <div className="max-w-7xl mx-auto">
        <div ref={headingRef} className="mb-8">
          <p className="font-dm text-charcoal/40 mb-3" style={{ fontSize: '0.8rem', letterSpacing: '0.18em', fontWeight: 500 }}>
            WHAT WE BUILD
          </p>
          <h2 className="font-cormorant text-charcoal" style={{ fontSize: 'clamp(3.5rem, 6vw, 6.5rem)', fontWeight: 600, lineHeight: 1.0, letterSpacing: '-0.02em' }}>
            The work that's eating your day — handled.
          </h2>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <AutomationCard />
          <TypewriterCard />
          <SchedulerCard />
        </div>
      </div>
    </section>
  )
}
