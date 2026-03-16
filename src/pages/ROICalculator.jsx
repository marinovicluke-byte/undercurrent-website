import { useEffect, useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RotateCcw, TrendingUp, Clock, DollarSign } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'

gsap.registerPlugin(ScrollTrigger)

// ─── Water canvas (same as hero/about) ───────────────────────────────────────
function WaterCanvas({ opacity = 1 }) {
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
      { yFrac: 0.38, amp: 38, freq: 0.008, speed: 0.18, phase: 0,   color: 'rgba(143,175,159,0.20)', lw: 1.0, dash: 0,  gap: 0  },
      { yFrac: 0.48, amp: 28, freq: 0.010, speed: -0.14,phase: 1.2, color: 'rgba(143,175,159,0.16)', lw: 0.8, dash: 0,  gap: 0  },
      { yFrac: 0.52, amp: 20, freq: 0.013, speed: 0.22, phase: 2.4, color: 'rgba(212,201,176,0.13)', lw: 0.7, dash: 0,  gap: 0  },
      { yFrac: 0.44, amp: 44, freq: 0.007, speed: -0.28,phase: 0.6, color: 'rgba(143,175,159,0.12)', lw: 0.5, dash: 0,  gap: 0  },
      { yFrac: 0.56, amp: 16, freq: 0.011, speed: 0.12, phase: 3.6, color: 'rgba(212,201,176,0.18)', lw: 1.2, dash: 60, gap: 90 },
      { yFrac: 0.50, amp: 12, freq: 0.018, speed: 0.35, phase: 1.8, color: 'rgba(143,175,159,0.22)', lw: 0.6, dash: 0,  gap: 0  },
      { yFrac: 0.42, amp: 52, freq: 0.005, speed: -0.08,phase: 4.2, color: 'rgba(212,201,176,0.09)', lw: 1.5, dash: 0,  gap: 0  },
      { yFrac: 0.54, amp: 8,  freq: 0.022, speed: 0.42, phase: 2.0, color: 'rgba(143,175,159,0.14)', lw: 0.4, dash: 40, gap: 70 },
    ]
    const driftPhases = currents.map((_, i) => i * 0.7)
    const driftAmps   = [0.035, 0.028, 0.022, 0.040, 0.018, 0.012, 0.044, 0.015]
    const driftSpeeds = [0.0004,0.0003,0.0005,0.00035,0.00025,0.0006,0.0002,0.0007]
    let t = 0

    const draw = () => {
      if (!visible) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      currents.forEach((c, i) => {
        const drift   = Math.sin(t * driftSpeeds[i] * 1000 + driftPhases[i]) * driftAmps[i]
        const yCenter = (c.yFrac + drift) * H
        ctx.beginPath()
        ctx.strokeStyle = c.color
        ctx.lineWidth   = c.lw
        ctx.lineCap     = 'round'
        if (c.dash > 0) {
          ctx.setLineDash([c.dash, c.gap])
          ctx.lineDashOffset = -(t * c.speed * 60) % (c.dash + c.gap)
        } else {
          ctx.setLineDash([])
        }
        const step = 4
        for (let x = -step; x <= W + step; x += step) {
          const y = yCenter + Math.sin(x * c.freq + t * c.speed * 60) * c.amp
          if (x === -step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      visObserver.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }}
    />
  )
}

// ─── Scroll reveal wrapper ────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(el,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay }
        )
        observer.disconnect()
      }
    }, { threshold: 0.1 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])
  return (
    <div ref={ref} className={className} style={{ opacity: 0, ...style }}>
      {children}
    </div>
  )
}

// ─── Animated number display ──────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '', decimals = 0 }) {
  const [displayed, setDisplayed] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)
  const fromRef = useRef(0)

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    fromRef.current = displayed
    startRef.current = null

    const duration = 600
    const from = fromRef.current
    const to = value

    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      setDisplayed(current)
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setDisplayed(to)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  const formatted = displayed.toLocaleString('en-AU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return <span>{prefix}{formatted}{suffix}</span>
}

// ─── Task slider row ──────────────────────────────────────────────────────────
function TaskSlider({ label, value, onChange, maxWeeklyHrs }) {
  const pct = maxWeeklyHrs > 0 ? (value / maxWeeklyHrs) * 100 : 0
  return (
    <div className="task-slider-row">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#1C1C1A', fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: '#8FAF9F', minWidth: '52px', textAlign: 'right' }}>
          {value} hr{value !== 1 ? 's' : ''}
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <input
          type="range"
          min={0}
          max={20}
          step={0.5}
          value={value}
          onChange={e => onChange(Number(e.target.value))}
          className="roi-slider"
        />
        <div style={{
          position: 'absolute',
          bottom: '-10px',
          left: 0,
          right: 0,
          height: '2px',
          backgroundColor: 'rgba(143,175,159,0.15)',
          borderRadius: '1px',
          pointerEvents: 'none',
        }}>
          <div style={{
            width: `${pct}%`,
            height: '100%',
            backgroundColor: 'rgba(143,175,159,0.45)',
            borderRadius: '1px',
            transition: 'width 0.3s ease',
          }} />
        </div>
      </div>
    </div>
  )
}

// ─── Task breakdown bar ───────────────────────────────────────────────────────
function BreakdownBar({ label, hours, hourlyRate, maxCost }) {
  const cost = hours * hourlyRate
  const pct = maxCost > 0 ? (cost / maxCost) * 100 : 0
  return (
    <div style={{ marginBottom: '16px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.80rem', color: '#1C1C1A', opacity: 0.75 }}>
          {label}
        </span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#6B7C4A' }}>
          ${cost.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}/wk
        </span>
      </div>
      <div style={{ height: '4px', backgroundColor: 'rgba(143,175,159,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
        <div style={{
          width: `${pct}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #8FAF9F, #6B7C4A)',
          borderRadius: '2px',
          transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        }} />
      </div>
    </div>
  )
}

// ─── Hero entrance animation hook ────────────────────────────────────────────
function useHeroEntrance(heroRef, glowRef, headlineRef, subRef) {
  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(glowRef.current,
        { opacity: 0, scale: 0.7 },
        { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' }
      )
      .fromTo(headlineRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' },
        '-=1.0'
      )
      .fromTo(subRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
        '-=0.5'
      )
    }, heroRef)
    return () => ctx.revert()
  }, [])
}

// ─── Main page ────────────────────────────────────────────────────────────────
const TASKS = [
  { key: 'email',      label: 'Email & inbox management' },
  { key: 'scheduling', label: 'Scheduling & calendar' },
  { key: 'data',       label: 'Data entry & reporting' },
  { key: 'followups',  label: 'Customer follow-ups' },
  { key: 'social',     label: 'Social media & content' },
  { key: 'admin',      label: 'Admin & document prep' },
]

const DEFAULT_HOURS = { email: 0, scheduling: 0, data: 0, followups: 0, social: 0, admin: 0 }

export default function ROICalculator() {
  const heroRef    = useRef(null)
  const glowRef    = useRef(null)
  const headlineRef = useRef(null)
  const subRef     = useRef(null)

  useHeroEntrance(heroRef, glowRef, headlineRef, subRef)

  const [hourlyRate, setHourlyRate] = useState(75)
  const [taskHours, setTaskHours] = useState(DEFAULT_HOURS)
  const [isResetting, setIsResetting] = useState(false)

  const totalHoursPerWeek = Object.values(taskHours).reduce((a, b) => a + b, 0)
  const weeklySaving  = totalHoursPerWeek * hourlyRate
  const monthlySaving = weeklySaving * 4.33
  const yearlySaving  = weeklySaving * 52
  const hasValues     = totalHoursPerWeek > 0 && hourlyRate > 0

  const maxTaskCost = Math.max(...TASKS.map(t => taskHours[t.key] * hourlyRate), 1)

  const handleReset = useCallback(() => {
    setIsResetting(true)
    // Stagger the sliders back to 0
    let i = 0
    const keys = Object.keys(taskHours)
    const interval = setInterval(() => {
      if (i >= keys.length) {
        clearInterval(interval)
        setIsResetting(false)
        return
      }
      const key = keys[i]
      setTaskHours(prev => ({ ...prev, [key]: 0 }))
      i++
    }, 60)
  }, [taskHours])

  return (
    <>
      <PageHead
        title="ROI Calculator — UnderCurrent"
        description="See exactly how much time and money you're leaving on the table. Calculate your automation ROI in seconds."
      />

      <style>{`
        /* ── Slider styling ── */
        .roi-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(143,175,159,0.25);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          margin-bottom: 18px;
          transition: background 0.2s;
        }
        .roi-slider:hover {
          background: rgba(143,175,159,0.40);
        }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #8FAF9F;
          border: 2px solid #F7F3ED;
          box-shadow: 0 0 0 1px #8FAF9F, 0 2px 8px rgba(143,175,159,0.4);
          cursor: pointer;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .roi-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          box-shadow: 0 0 0 1px #6B7C4A, 0 4px 16px rgba(107,124,74,0.4);
          background: #6B7C4A;
        }
        .roi-slider::-webkit-slider-thumb:active {
          transform: scale(1.1);
        }
        .roi-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #8FAF9F;
          border: 2px solid #F7F3ED;
          box-shadow: 0 0 0 1px #8FAF9F;
          cursor: pointer;
        }

        /* ── Hourly rate input ── */
        .hourly-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #1C1C1A;
          width: 100%;
          caret-color: #8FAF9F;
          -moz-appearance: textfield;
        }
        .hourly-input::-webkit-outer-spin-button,
        .hourly-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }

        /* ── Pulsing glow on results card ── */
        @keyframes sage-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,175,159,0), 0 4px 40px rgba(143,175,159,0.06); }
          50%       { box-shadow: 0 0 0 6px rgba(143,175,159,0.08), 0 4px 40px rgba(143,175,159,0.18); }
        }
        .results-glow {
          animation: sage-pulse 3s ease-in-out infinite;
        }

        /* ── Task slider row spacing ── */
        .task-slider-row {
          padding: 14px 0 6px;
          border-bottom: 1px solid rgba(212,201,176,0.35);
        }
        .task-slider-row:last-child {
          border-bottom: none;
        }

        /* ── Metric card ── */
        .metric-card {
          padding: 20px 24px;
          border-radius: 16px;
          background: rgba(232,224,208,0.35);
          border: 1px solid rgba(212,201,176,0.6);
          box-shadow: 0 2px 12px rgba(28,28,26,0.05), inset 0 1px 0 rgba(255,255,255,0.6);
          transition: border-color 0.4s ease, background 0.4s ease, box-shadow 0.4s ease;
        }
        .metric-card.active {
          border-color: rgba(143,175,159,0.55);
          background: rgba(247,243,237,0.95);
          box-shadow: 0 4px 20px rgba(143,175,159,0.12), 0 2px 8px rgba(28,28,26,0.06), inset 0 1px 0 rgba(255,255,255,0.8);
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>

      <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
        <ScrollProgressBar />
        <Navbar isSubPage />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden"
          style={{
            height: '70dvh',
            minHeight: '520px',
            background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 30%, #3d4f42 55%, #8FAF9F 80%, #D4C9B0 100%)',
          }}
        >
          <div ref={glowRef} style={{
            position: 'absolute', top: '42%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw', maxWidth: '900px', height: '80vw', maxHeight: '900px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at center, rgba(143,175,159,0.22) 0%, rgba(143,175,159,0.08) 45%, transparent 70%)',
            pointerEvents: 'none', opacity: 0,
          }} />
          <WaterCanvas opacity={0.8} />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6" style={{ paddingTop: '5rem' }}>
            <p className="font-mono mb-4" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)' }}>
              ROI CALCULATOR
            </p>
            <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1, margin: 0 }}>
              <span className="block font-dm" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
                What's your time
              </span>
              <span className="block font-cormorant" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05, marginTop: '0.08em' }}>
                actually worth?
              </span>
            </h1>
            <p ref={subRef} className="font-dm" style={{ fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.65)', lineHeight: 1.7, maxWidth: '44ch', marginTop: '2rem', opacity: 0 }}>
              Plug in your numbers. See how much you're leaving on the table every single week.
            </p>
          </div>
          <div id="hero-sentinel" style={{ position: 'absolute', bottom: 0, left: 0, height: '1px', width: '100%' }} />
        </section>

        {/* ── Calculator ────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px 120px', position: 'relative', overflow: 'hidden' }}>
          {/* Radial gradient blooms — same as WhatWeAutomate */}
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
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px',
            alignItems: 'start',
          }}>

            {/* ── LEFT: Inputs ──────────────────────────────────────────── */}
            <Reveal delay={0.05}>
              <div style={{
                backgroundColor: '#FDFAF6',
                border: '1px solid rgba(212,201,176,0.7)',
                borderRadius: '24px',
                padding: 'clamp(24px, 4vw, 40px)',
                boxShadow: '0 4px 32px rgba(28,28,26,0.07), 0 1px 4px rgba(28,28,26,0.04)',
              }}>

                {/* Hourly rate */}
                <div style={{
                  marginBottom: '36px',
                  padding: '20px 24px',
                  borderRadius: '16px',
                  background: 'rgba(232,224,208,0.45)',
                  border: '1px solid rgba(212,201,176,0.65)',
                  boxShadow: '0 2px 12px rgba(28,28,26,0.05), inset 0 1px 0 rgba(255,255,255,0.5)',
                  transition: 'border-color 0.25s, box-shadow 0.25s',
                }}
                  onFocus={(e) => e.currentTarget.style.boxShadow = '0 4px 24px rgba(143,175,159,0.18)'}
                  onBlur={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <label style={{
                    display: 'block',
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.7rem',
                    letterSpacing: '0.12em',
                    color: '#8FAF9F',
                    textTransform: 'uppercase',
                    marginBottom: '8px',
                  }}>
                    Your hourly rate
                  </label>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(2.4rem, 5vw, 3.5rem)',
                      fontWeight: 600,
                      color: '#8FAF9F',
                      lineHeight: 1,
                    }}>$</span>
                    <input
                      type="number"
                      className="hourly-input"
                      value={hourlyRate}
                      min={0}
                      max={9999}
                      onChange={e => setHourlyRate(Math.max(0, Number(e.target.value)))}
                      placeholder="75"
                    />
                    <span style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.78rem',
                      color: '#1C1C1A',
                      opacity: 0.4,
                      alignSelf: 'flex-end',
                      paddingBottom: '6px',
                    }}>/hr</span>
                  </div>
                </div>

                {/* Task sliders */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#1C1C1A',
                      margin: 0,
                    }}>
                      Hours per week on…
                    </h3>
                    <span style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.68rem',
                      color: '#1C1C1A',
                      opacity: 0.35,
                    }}>0 – 20 hrs</span>
                  </div>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.82rem',
                    color: '#1C1C1A',
                    opacity: 0.45,
                    margin: '0 0 16px',
                  }}>
                    Drag each slider to match your typical week
                  </p>

                  {TASKS.map(task => (
                    <TaskSlider
                      key={task.key}
                      label={task.label}
                      value={taskHours[task.key]}
                      maxWeeklyHrs={totalHoursPerWeek || 1}
                      onChange={val => setTaskHours(prev => ({ ...prev, [task.key]: val }))}
                    />
                  ))}
                </div>

                {/* Reset */}
                <button
                  onClick={handleReset}
                  disabled={isResetting}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '24px',
                    padding: '10px 18px',
                    borderRadius: '100px',
                    border: '1px solid rgba(212,201,176,0.6)',
                    backgroundColor: 'transparent',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.82rem',
                    color: '#1C1C1A',
                    opacity: hasValues ? 0.7 : 0.3,
                    cursor: hasValues ? 'pointer' : 'default',
                    transition: 'opacity 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { if (hasValues) e.currentTarget.style.opacity = '1' }}
                  onMouseLeave={e => { if (hasValues) e.currentTarget.style.opacity = '0.7' }}
                >
                  <RotateCcw size={13} />
                  Reset all
                </button>
              </div>
            </Reveal>

            {/* ── RIGHT: Results ────────────────────────────────────────── */}
            <div style={{ position: 'sticky', top: '96px' }}>
              <Reveal delay={0.15}>
                {/* Results card */}
                <div
                  className={hasValues ? 'results-glow' : ''}
                  style={{
                    backgroundColor: '#FDFAF6',
                    border: `1px solid ${hasValues ? 'rgba(143,175,159,0.55)' : 'rgba(212,201,176,0.6)'}`,
                    borderRadius: '24px',
                    padding: 'clamp(24px, 4vw, 40px)',
                    marginBottom: '20px',
                    transition: 'border-color 0.6s ease',
                    boxShadow: hasValues
                      ? '0 4px 40px rgba(143,175,159,0.14), 0 1px 4px rgba(28,28,26,0.05)'
                      : '0 4px 32px rgba(28,28,26,0.07), 0 1px 4px rgba(28,28,26,0.04)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '28px' }}>
                    <div style={{
                      width: '34px', height: '34px',
                      borderRadius: '10px',
                      backgroundColor: 'rgba(143,175,159,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <TrendingUp size={16} color="#8FAF9F" />
                    </div>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.4rem',
                      fontWeight: 600,
                      color: '#1C1C1A',
                      margin: 0,
                    }}>
                      Your savings
                    </h3>
                  </div>

                  {/* Three metric cards */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                    {[
                      { label: 'Per week', value: weeklySaving,  period: 'weekly'  },
                      { label: 'Per month', value: monthlySaving, period: 'monthly' },
                      { label: 'Per year',  value: yearlySaving,  period: 'yearly'  },
                    ].map(({ label, value }, idx) => (
                      <div
                        key={label}
                        className={`metric-card ${hasValues ? 'active' : ''}`}
                      >
                        <div style={{
                          fontFamily: 'DM Mono, monospace',
                          fontSize: '0.68rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#8FAF9F',
                          marginBottom: '4px',
                        }}>
                          {label}
                        </div>
                        <div style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: idx === 2 ? 'clamp(2.2rem, 4vw, 3rem)' : 'clamp(1.7rem, 3.5vw, 2.4rem)',
                          fontWeight: 600,
                          color: hasValues ? '#1C1C1A' : 'rgba(28,28,26,0.25)',
                          lineHeight: 1.05,
                          letterSpacing: '-0.02em',
                          transition: 'color 0.4s ease',
                        }}>
                          <AnimatedNumber value={value} prefix="$" decimals={0} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Hours summary */}
                  {hasValues && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '14px 16px',
                      borderRadius: '12px',
                      background: 'rgba(143,175,159,0.08)',
                      border: '1px solid rgba(143,175,159,0.2)',
                    }}>
                      <Clock size={14} color="#8FAF9F" />
                      <span style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.84rem',
                        color: '#1C1C1A',
                        opacity: 0.7,
                      }}>
                        <strong style={{ color: '#6B7C4A', fontWeight: 600 }}>
                          {totalHoursPerWeek.toFixed(1)} hours
                        </strong>
                        {' '}of automatable work per week
                      </span>
                    </div>
                  )}

                  {!hasValues && (
                    <div style={{
                      textAlign: 'center',
                      padding: '16px',
                    }}>
                      <p style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.84rem',
                        color: '#1C1C1A',
                        opacity: 0.35,
                        margin: 0,
                        fontStyle: 'italic',
                      }}>
                        Drag the sliders to see your potential savings
                      </p>
                    </div>
                  )}
                </div>

                {/* Breakdown bars */}
                {hasValues && (
                  <div style={{
                    backgroundColor: '#FDFAF6',
                    border: '1px solid rgba(212,201,176,0.65)',
                    borderRadius: '24px',
                    padding: 'clamp(20px, 3vw, 32px)',
                    boxShadow: '0 4px 32px rgba(28,28,26,0.07), 0 1px 4px rgba(28,28,26,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                      <DollarSign size={14} color="#6B7C4A" />
                      <span style={{
                        fontFamily: 'DM Mono, monospace',
                        fontSize: '0.68rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#6B7C4A',
                      }}>
                        Cost breakdown
                      </span>
                    </div>
                    {TASKS.filter(t => taskHours[t.key] > 0).map(task => (
                      <BreakdownBar
                        key={task.key}
                        label={task.label}
                        hours={taskHours[task.key]}
                        hourlyRate={hourlyRate}
                        maxCost={maxTaskCost}
                      />
                    ))}
                    <p style={{
                      fontFamily: 'DM Mono, monospace',
                      fontSize: '0.65rem',
                      color: '#1C1C1A',
                      opacity: 0.3,
                      margin: '16px 0 0',
                      letterSpacing: '0.04em',
                    }}>
                      Based on typical automation time savings
                    </p>
                  </div>
                )}
              </Reveal>
            </div>
          </div>
          </div>
        </section>

        {/* ── CTA Strip ─────────────────────────────────────────────────── */}
        <Reveal>
          <section style={{
            margin: '0 24px 100px',
            maxWidth: '1100px',
            marginLeft: 'auto',
            marginRight: 'auto',
            padding: 'clamp(40px, 6vw, 64px)',
            borderRadius: '28px',
            background: '#1C1C1A',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <WaterCanvas opacity={0.12} />
            <div style={{ position: 'relative' }}>
              <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.7rem',
                letterSpacing: '0.18em',
                color: '#8FAF9F',
                textTransform: 'uppercase',
                marginBottom: '16px',
              }}>
                Ready to get it back?
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#E8E0D0',
                margin: '0 0 24px',
                letterSpacing: '-0.02em',
              }}>
                Let's automate the hours you just counted.
              </h2>
              <a
                href="/#contact"
                className="btn-sage-hero"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Start the conversation
              </a>
            </div>
          </section>
        </Reveal>

        <Footer />
      </div>
    </>
  )
}
