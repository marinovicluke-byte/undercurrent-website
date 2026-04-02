import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'motion/react'

const SAGE    = '#8FAF9F'
const CHARCOAL = '#1C1C1A'
const LIGHT   = '#F7F3ED'
const PARCHMENT = '#E8E0D0'

const AUTO_PLAY = 5000

// ── Visual panel: leads flowing into pipeline ──────────────────────────────
function CapturePanel() {
  const [active, setActive] = useState(0)
  const sources = [
    { label: 'Google Ads', icon: 'G', color: '#8FAF9F' },
    { label: 'Website Form', icon: '⬡', color: '#A89F7A' },
    { label: 'Facebook/Meta', icon: 'f', color: '#8FAF9F' },
    { label: 'Direct Email', icon: '@', color: '#6B7C4A' },
  ]
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % sources.length), 1200)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: '40px 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(143,175,159,0.6)', marginBottom: 8 }}>LEAD SOURCES</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {sources.map(({ label, icon, color }, i) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 14, transition: 'opacity 0.4s', opacity: i === active ? 1 : 0.3 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: i === active ? `${color}22` : 'rgba(143,175,159,0.05)', border: `1px solid ${i === active ? `${color}55` : 'rgba(143,175,159,0.1)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'DM Mono, monospace', fontSize: 13, color: i === active ? color : 'rgba(143,175,159,0.3)', transition: 'all 0.4s', flexShrink: 0 }}>
              {icon}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: i === active ? 'rgba(232,224,208,0.9)' : 'rgba(232,224,208,0.3)', fontWeight: i === active ? 500 : 400, transition: 'color 0.4s' }}>{label}</div>
            </div>
            {i === active && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 40, height: 1, background: `linear-gradient(to right, ${color}, transparent)` }} />
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: color, boxShadow: `0 0 6px ${color}` }} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: '14px 16px', borderRadius: 10, background: 'rgba(143,175,159,0.08)', border: '1px solid rgba(143,175,159,0.18)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, color: 'rgba(232,224,208,0.7)' }}>All sources, one pipeline</span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: SAGE, letterSpacing: '0.08em' }}>AUTOMATIC</span>
      </div>
    </div>
  )
}

// ── Visual panel: auto follow-up timeline ──────────────────────────────────
function FollowUpPanel() {
  const [step, setStep] = useState(0)
  const timeline = [
    { time: 'Day 1 — 7:04pm', label: 'Enquiry received', sub: 'Google Ads form submission', color: SAGE, done: true },
    { time: 'Day 1 — 7:04pm', label: 'Auto-reply sent',  sub: 'Instant acknowledgement + intro', color: SAGE, done: true },
    { time: 'Day 2 — 9:00am', label: 'Follow-up sent',   sub: 'If no reply overnight', color: '#A89F7A', done: false },
    { time: 'Day 2 — 2:30pm', label: 'Lead replied',     sub: 'Wants a quote this week', color: '#6B7C4A', done: false },
  ]
  useEffect(() => {
    const t = setInterval(() => setStep(s => s < timeline.length - 1 ? s + 1 : 0), 1600)
    return () => clearInterval(t)
  }, [])
  return (
    <div style={{ padding: '40px 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(143,175,159,0.6)', marginBottom: 20 }}>FOLLOW-UP SEQUENCE</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {timeline.map(({ time, label, sub, color }, i) => {
          const isActive = i === step
          const isPast = i < step
          return (
            <div key={label} style={{ display: 'flex', gap: 14, paddingBottom: i < timeline.length - 1 ? 20 : 0, opacity: i > step ? 0.2 : isPast ? 0.5 : 1, transition: 'opacity 0.5s' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 20, flexShrink: 0 }}>
                <div style={{ width: isActive ? 12 : 8, height: isActive ? 12 : 8, borderRadius: '50%', background: isActive ? color : isPast ? 'rgba(143,175,159,0.4)' : 'rgba(143,175,159,0.1)', border: `1.5px solid ${isActive ? color : 'transparent'}`, boxShadow: isActive ? `0 0 8px ${color}` : 'none', transition: 'all 0.4s', flexShrink: 0 }} />
                {i < timeline.length - 1 && <div style={{ width: 1, flex: 1, minHeight: 16, background: isPast ? 'rgba(143,175,159,0.35)' : 'rgba(143,175,159,0.1)', marginTop: 4, transition: 'background 0.5s' }} />}
              </div>
              <div style={{ paddingBottom: 4 }}>
                <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 9.5, color: isActive ? `${color}90` : 'rgba(143,175,159,0.3)', letterSpacing: '0.05em', marginBottom: 3 }}>{time}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 13, fontWeight: isActive ? 600 : 400, color: isActive ? LIGHT : 'rgba(232,224,208,0.6)', marginBottom: 2, transition: 'color 0.4s' }}>{label}</div>
                <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11.5, color: 'rgba(232,224,208,0.35)' }}>{sub}</div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Visual panel: pipeline kanban + conversion ─────────────────────────────
function TrackPanel() {
  const [booked, setBooked] = useState(4)
  const [activeCol, setActiveCol] = useState(0)
  const cols = [
    { label: 'New',       count: 8,      color: 'rgba(212,201,176,0.5)' },
    { label: 'Contacted', count: 5,      color: 'rgba(143,175,159,0.5)' },
    { label: 'Quoted',    count: 3,      color: 'rgba(143,175,159,0.7)' },
    { label: 'Booked',    count: booked, color: SAGE },
    { label: 'Lost',      count: 2,      color: 'rgba(180,100,80,0.5)' },
  ]
  useEffect(() => {
    const t1 = setInterval(() => setActiveCol(c => (c + 1) % 5), 1100)
    const t2 = setInterval(() => setBooked(b => b < 9 ? b + 1 : 4), 2400)
    return () => { clearInterval(t1); clearInterval(t2) }
  }, [])
  const convRate = Math.round((booked / 8) * 100)
  return (
    <div style={{ padding: '40px 32px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 20 }}>
      <div style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(143,175,159,0.6)' }}>LEAD PIPELINE</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
        {cols.map(({ label, count, color }, i) => (
          <div key={label} style={{ textAlign: 'center', padding: '12px 4px 10px', borderRadius: 10, background: i === activeCol ? 'rgba(143,175,159,0.1)' : 'rgba(143,175,159,0.03)', border: `1px solid ${i === activeCol ? 'rgba(143,175,159,0.2)' : 'rgba(143,175,159,0.07)'}`, transition: 'all 0.4s' }}>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 24, fontWeight: 700, color: i === 3 ? SAGE : (i === activeCol ? 'rgba(232,224,208,0.85)' : 'rgba(232,224,208,0.2)'), transition: 'color 0.4s', lineHeight: 1 }}>{count}</div>
            <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 8.5, color: 'rgba(232,224,208,0.3)', marginTop: 5, letterSpacing: '0.03em', textTransform: 'uppercase' }}>{label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(143,175,159,0.08)', border: '1px solid rgba(143,175,159,0.15)' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 26, fontWeight: 700, color: SAGE, lineHeight: 1 }}>{convRate}%</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(232,224,208,0.4)', marginTop: 4 }}>Conversion rate</div>
        </div>
        <div style={{ padding: '14px 16px', borderRadius: 10, background: 'rgba(143,175,159,0.04)', border: '1px solid rgba(143,175,159,0.1)' }}>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 26, fontWeight: 700, color: 'rgba(232,224,208,0.7)', lineHeight: 1 }}>8</div>
          <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 11, color: 'rgba(232,224,208,0.4)', marginTop: 4 }}>New leads this week</div>
        </div>
      </div>
    </div>
  )
}

const PANELS = [CapturePanel, FollowUpPanel, TrackPanel]

const STEPS = [
  {
    id: '01',
    title: 'Capture & Organise',
    description: 'A lead comes in from Google Ads, Meta, your website, or email. We capture it automatically, tag the source, and drop it into a simple pipeline while notifying you or your admin instantly.',
  },
  {
    id: '02',
    title: 'Qualify & Follow Up',
    description: 'Basic qualification rules run automatically — service type, suburb, urgency. The lead gets an instant acknowledgement, and a short follow-up sequence starts, plus reminders for your team, until someone takes action.',
  },
  {
    id: '03',
    title: 'Track & Improve',
    description: 'Every lead moves through New, Contacted, Quoted, Booked, or Lost. You see exactly how many came in, how many converted, and where leads are dropping — so you can keep tightening the system.',
  },
]

export default function HowItWorksVertical({ label, headline }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const containerRef = useRef(null)

  const handleNext = useCallback(() => {
    setDirection(1)
    setActiveIndex(p => (p + 1) % STEPS.length)
  }, [])

  const handleSelect = (i) => {
    if (i === activeIndex) return
    setDirection(i > activeIndex ? 1 : -1)
    setActiveIndex(i)
    setIsPaused(false)
  }

  useEffect(() => {
    if (isPaused) return
    const t = setInterval(handleNext, AUTO_PLAY)
    return () => clearInterval(t)
  }, [activeIndex, isPaused, handleNext])

  const variants = {
    enter:  (d) => ({ y: d > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { y: 0, opacity: 1 },
    exit:   (d) => ({ y: d > 0 ? '-100%' : '100%', opacity: 0 }),
  }

  const PanelComp = PANELS[activeIndex]

  return (
    <section ref={containerRef} style={{ background: CHARCOAL, padding: '80px 24px 96px', position: 'relative', overflow: 'hidden' }}>
      {/* Subtle radial glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 400, borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.06) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1100, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span style={{ display: 'inline-block', fontFamily: 'DM Mono, monospace', fontSize: 10, letterSpacing: '0.12em', color: 'rgba(143,175,159,0.75)', border: '1px solid rgba(143,175,159,0.22)', padding: '5px 14px', borderRadius: 999, marginBottom: 18 }}>
            {label || 'HOW IT WORKS'}
          </span>
          <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 300, fontStyle: 'italic', color: '#F7F3ED', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
            {headline || 'Three steps. Then it runs itself.'}
          </h2>
        </div>

        {/* Main grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 48 }}>
          {/* On desktop: side by side */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 48, alignItems: 'center' }}>

            {/* Left: vertical step list */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {STEPS.map((step, i) => {
                const isActive = activeIndex === i
                return (
                  <button
                    key={step.id}
                    onClick={() => handleSelect(i)}
                    style={{
                      all: 'unset',
                      cursor: 'pointer',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 20,
                      padding: '28px 0',
                      borderTop: i === 0 ? 'none' : '1px solid rgba(212,201,176,0.12)',
                      textAlign: 'left',
                      transition: 'opacity 0.3s',
                    }}
                  >
                    {/* Left progress bar */}
                    <div style={{ position: 'absolute', left: -24, top: 0, bottom: 0, width: 2, background: 'rgba(143,175,159,0.1)', borderRadius: 1 }}>
                      {isActive && (
                        <motion.div
                          key={`${i}-${isPaused}`}
                          style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: SAGE, borderRadius: 1, originY: 0 }}
                          initial={{ height: '0%' }}
                          animate={isPaused ? { height: '0%' } : { height: '100%' }}
                          transition={{ duration: AUTO_PLAY / 1000, ease: 'linear' }}
                        />
                      )}
                    </div>

                    {/* Step number */}
                    <span style={{ fontFamily: 'DM Mono, monospace', fontSize: 10, color: isActive ? SAGE : 'rgba(143,175,159,0.3)', marginTop: 6, flexShrink: 0, letterSpacing: '0.05em', transition: 'color 0.3s' }}>
                      /{step.id}
                    </span>

                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.3rem, 2.5vw, 1.75rem)', fontWeight: isActive ? 500 : 300, color: isActive ? LIGHT : 'rgba(232,224,208,0.35)', lineHeight: 1.2, transition: 'color 0.35s, font-weight 0.35s' }}>
                        {step.title}
                      </div>
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                            style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 14.5, fontWeight: 300, color: 'rgba(232,224,208,0.55)', lineHeight: 1.65, margin: '10px 0 0', overflow: 'hidden' }}
                          >
                            {step.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Right: animated visual panel */}
            <div
              style={{ position: 'relative' }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div style={{ position: 'relative', borderRadius: '1.75rem', overflow: 'hidden', border: '1px solid rgba(143,175,159,0.14)', background: 'linear-gradient(160deg, #1C1C1A 0%, #1e2420 100%)', minHeight: 360 }}>
                {/* Grain overlay */}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.04\'/%3E%3C/svg%3E")', opacity: 0.4, pointerEvents: 'none', zIndex: 1 }} />

                {/* Corner accent */}
                <div style={{ position: 'absolute', top: 0, right: 0, width: 180, height: 180, borderRadius: '0 1.75rem 0 100%', background: 'radial-gradient(ellipse at top right, rgba(143,175,159,0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />

                <AnimatePresence custom={direction} mode="wait">
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={variants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ y: { type: 'spring', stiffness: 280, damping: 30 }, opacity: { duration: 0.3 } }}
                    style={{ position: 'relative', zIndex: 2, width: '100%' }}
                  >
                    <PanelComp />
                  </motion.div>
                </AnimatePresence>

                {/* Step indicator dots */}
                <div style={{ position: 'absolute', bottom: 20, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6, zIndex: 10 }}>
                  {STEPS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(i)}
                      style={{ all: 'unset', cursor: 'pointer', width: i === activeIndex ? 20 : 6, height: 6, borderRadius: 3, background: i === activeIndex ? SAGE : 'rgba(143,175,159,0.25)', transition: 'all 0.35s' }}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
