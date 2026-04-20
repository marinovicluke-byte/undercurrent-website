'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { RotateCcw, TrendingUp, Clock, DollarSign } from 'lucide-react'

const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

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
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.88rem', color: '#1C1C1A', fontWeight: 500 }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#8FAF9F', minWidth: '52px', textAlign: 'right' }}>
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
          aria-label={label}
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
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.80rem', color: '#1C1C1A', opacity: 0.75 }}>
          {label}
        </span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#6B7C4A' }}>
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

// ─── Project Estimation Calculator ───────────────────────────────────────────
function ProjectEstimationCalc() {
  const [serviceType, setServiceType] = useState('both')
  const [workflows, setWorkflows] = useState(3)
  const [aiTraining, setAiTraining] = useState(false)
  const [maintenance, setMaintenance] = useState(false)
  const [timeline, setTimeline] = useState('regular')

  const isBoth = serviceType === 'both'

  const calculatePrice = () => {
    const bases = { strategy: 599, automation: 999, both: 1299 }
    const perW  = { strategy: 200, automation: 350, both: 499 }
    let total = bases[serviceType] + (workflows - 1) * perW[serviceType]
    if (aiTraining) total += workflows * 200
    if (maintenance) total += workflows * 100
    if (timeline === 'rush') total += workflows * 300
    if (timeline === 'fast') total += workflows * 100
    return total
  }

  const calculateAgencyCost = () => {
    const perW = isBoth ? 3000 : 1500
    return 20000 + (workflows - 1) * perW
  }

  const calculateFreelancerCost = () => {
    const perW = isBoth ? 1000 : 500
    return 3000 + (workflows - 1) * perW
  }

  const price          = calculatePrice()
  const agencyCost     = calculateAgencyCost()
  const freelancerCost = calculateFreelancerCost()

  const radioOuter = (active) => ({
    width: '20px', height: '20px', borderRadius: '50%',
    border: `2px solid ${active ? '#8FAF9F' : 'rgba(232,224,208,0.28)'}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'border-color 0.2s',
    backgroundColor: active ? 'rgba(143,175,159,0.12)' : 'transparent',
    cursor: 'pointer',
  })
  const radioInner = (active) => ({
    width: '8px', height: '8px', borderRadius: '50%',
    backgroundColor: '#8FAF9F',
    opacity: active ? 1 : 0, transition: 'opacity 0.2s',
  })
  const checkboxOuter = (active) => ({
    width: '20px', height: '20px', borderRadius: '4px',
    border: `2px solid ${active ? '#8FAF9F' : 'rgba(232,224,208,0.28)'}`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'all 0.2s',
    backgroundColor: active ? '#8FAF9F' : 'transparent',
    cursor: 'pointer',
  })
  const labelText = (active) => ({
    fontFamily: 'var(--font-body)', fontSize: '0.87rem',
    color: '#E8E0D0', opacity: active ? 1 : 0.55, transition: 'opacity 0.2s',
  })
  const sectionDivider = {
    borderTop: '1px solid rgba(232,224,208,0.1)',
    paddingTop: '20px', marginTop: '20px',
  }
  const costCard = {
    padding: '18px 22px', borderRadius: '16px',
    backgroundColor: 'rgba(232,224,208,0.08)',
    border: '1px solid rgba(212,201,176,0.18)',
  }

  return (
    <section style={{ padding: '0 24px 80px', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.68rem',
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#8FAF9F', marginBottom: '10px',
          }}>
            Project Estimation Calculator
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.9rem, 3.8vw, 3rem)',
            fontWeight: 400, color: '#1C1C1A', margin: 0, letterSpacing: '-0.02em',
          }}>
            Get your automation package within budget
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          borderRadius: '24px', overflow: 'hidden',
          border: '1px solid rgba(212,201,176,0.45)',
          boxShadow: '0 8px 48px rgba(28,28,26,0.10)',
        }}>
          {/* ── LEFT: Form ─────────────────────────────────────────── */}
          <div style={{ backgroundColor: '#1C1C1A', padding: 'clamp(24px, 4vw, 40px)' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#E8E0D0', margin: '0 0 14px' }}>
                What do you need?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { value: 'automation', label: 'Automation Build Only' },
                  { value: 'strategy',   label: 'Strategy & Audit Only' },
                  { value: 'both',       label: 'Strategy + Automation' },
                ].map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setServiceType(opt.value)}>
                    <div style={radioOuter(serviceType === opt.value)}><div style={radioInner(serviceType === opt.value)} /></div>
                    <span style={labelText(serviceType === opt.value)}>{opt.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={sectionDivider}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#E8E0D0', margin: '0 0 14px' }}>
                Workflows to automate: <span style={{ color: '#8FAF9F' }}>{workflows}</span>
              </h3>
              <input type="range" min={1} max={20} step={1} value={workflows} onChange={e => setWorkflows(Number(e.target.value))} className="est-slider" aria-label="Workflows to automate" />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'rgba(232,224,208,0.3)', marginTop: '4px' }}>
                <span>1</span><span>20</span>
              </div>
            </div>

            <div style={sectionDivider}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#E8E0D0', margin: '0 0 14px' }}>Add-ons</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { label: 'Custom AI training & prompting', price: '+$200/workflow', val: aiTraining, toggle: () => setAiTraining(v => !v) },
                  { label: 'Ongoing support & maintenance',  price: '+$100/workflow', val: maintenance, toggle: () => setMaintenance(v => !v) },
                ].map(item => (
                  <label key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={item.toggle}>
                    <div style={checkboxOuter(item.val)}>
                      {item.val && (
                        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
                          <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span style={{ ...labelText(item.val), flex: 1 }}>{item.label}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8FAF9F', whiteSpace: 'nowrap' }}>{item.price}</span>
                  </label>
                ))}
              </div>
            </div>

            <div style={sectionDivider}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 600, color: '#E8E0D0', margin: '0 0 14px' }}>How fast do you need this?</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { value: 'rush',    label: 'Within 1 Week',              price: '+$300/workflow' },
                  { value: 'fast',    label: 'Within 2 Weeks',             price: '+$100/workflow' },
                  { value: 'regular', label: 'Flexible (Based on Discussion)', price: null },
                ].map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }} onClick={() => setTimeline(opt.value)}>
                    <div style={radioOuter(timeline === opt.value)}><div style={radioInner(timeline === opt.value)} /></div>
                    <span style={{ ...labelText(timeline === opt.value), flex: 1 }}>{opt.label}</span>
                    {opt.price && <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#8FAF9F', whiteSpace: 'nowrap' }}>{opt.price}</span>}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Cost Estimation ──────────────────────────────── */}
          <div style={{ backgroundColor: '#FDFAF6', padding: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: '14px', borderLeft: '1px solid rgba(212,201,176,0.35)' }}>
            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: '#1C1C1A', margin: '0 0 6px' }}>Estimated Cost</h3>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#1C1C1A', opacity: 0.45, margin: 0 }}>See how UnderCurrent compares</p>
            </div>
            <div style={costCard}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1C1A', opacity: 0.45, marginBottom: '6px' }}>Typical agency charges minimum</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1C1C1A', lineHeight: 1.05, letterSpacing: '-0.02em' }}>${agencyCost.toLocaleString()}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: '#1C1C1A', opacity: 0.4, marginTop: '4px' }}>+ Long timelines &amp; ongoing retainer fees</div>
            </div>
            <div style={costCard}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1C1C1A', opacity: 0.45, marginBottom: '6px' }}>Regular freelancer charges minimum</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#1C1C1A', lineHeight: 1.05, letterSpacing: '-0.02em' }}>${freelancerCost.toLocaleString()}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.76rem', color: '#1C1C1A', opacity: 0.4, marginTop: '4px' }}>+ Inconsistent quality &amp; no AI expertise</div>
            </div>
            <div style={{ padding: '22px 24px', borderRadius: '16px', background: 'linear-gradient(135deg, #8FAF9F 0%, #6B7C4A 100%)' }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.72)', marginBottom: '6px' }}>With UnderCurrent</div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 3.5vw, 2.8rem)', fontWeight: 700, color: '#fff', lineHeight: 1.05, letterSpacing: '-0.02em' }}>${price.toLocaleString()}</div>
              <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: 'rgba(255,255,255,0.85)', marginTop: '4px' }}>Save time, money &amp; get real results</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Tasks ────────────────────────────────────────────────────────────────────
const TASKS = [
  { key: 'email',      label: 'Email & inbox management' },
  { key: 'scheduling', label: 'Scheduling & calendar' },
  { key: 'data',       label: 'Data entry & reporting' },
  { key: 'followups',  label: 'Customer follow-ups' },
  { key: 'social',     label: 'Social media & content' },
  { key: 'admin',      label: 'Admin & document prep' },
]

const DEFAULT_HOURS = { email: 0, scheduling: 0, data: 0, followups: 0, social: 0, admin: 0 }

// ─── Main page ────────────────────────────────────────────────────────────────
export default function ROICalculator() {
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
      <style>{`
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
        .roi-slider:hover { background: rgba(143,175,159,0.40); }
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
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
        .roi-slider::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #8FAF9F;
          border: 2px solid #F7F3ED;
          box-shadow: 0 0 0 1px #8FAF9F;
          cursor: pointer;
        }
        .hourly-input {
          background: transparent;
          border: none;
          outline: none;
          font-family: var(--font-display);
          font-size: clamp(2.4rem, 5vw, 3.5rem);
          font-weight: 600;
          color: #1C1C1A;
          width: 100%;
          caret-color: #8FAF9F;
          -moz-appearance: textfield;
        }
        .hourly-input::-webkit-outer-spin-button,
        .hourly-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        @keyframes sage-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,175,159,0), 0 4px 40px rgba(143,175,159,0.06); }
          50%       { box-shadow: 0 0 0 6px rgba(143,175,159,0.08), 0 4px 40px rgba(143,175,159,0.18); }
        }
        .results-glow { animation: sage-pulse 3s ease-in-out infinite; }
        .task-slider-row {
          padding: 14px 0 6px;
          border-bottom: 1px solid rgba(212,201,176,0.35);
        }
        .task-slider-row:last-child { border-bottom: none; }
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
        .est-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 3px;
          background: rgba(143,175,159,0.25);
          border-radius: 2px;
          outline: none;
          cursor: pointer;
          margin-bottom: 4px;
          transition: background 0.2s;
          display: block;
        }
        .est-slider:hover { background: rgba(143,175,159,0.42); }
        .est-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #8FAF9F;
          border: 2px solid #1C1C1A;
          box-shadow: 0 0 0 1px #8FAF9F, 0 2px 8px rgba(143,175,159,0.45);
          cursor: pointer;
          transition: transform 0.15s ease, background 0.15s ease;
        }
        .est-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #6B7C4A;
        }
        .est-slider::-moz-range-thumb {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #8FAF9F;
          border: 2px solid #1C1C1A;
          cursor: pointer;
        }
        .btn-sage-hero {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          border: 1.5px solid rgba(143,175,159,0.6);
          background: transparent;
          color: #E8E0D0;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 14px 36px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-sage-hero:hover {
          background: rgba(143,175,159,0.12);
          border-color: #8FAF9F;
        }
      `}</style>

      <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section style={{
          height: '100dvh',
          minHeight: '520px',
          background: '#1C1C1A',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <video
            preload="auto"
            autoPlay muted loop playsInline
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              opacity: 1, pointerEvents: 'none',
            }}
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: [
              'linear-gradient(to bottom, #1C1C1A 0%, transparent 28%)',
              'linear-gradient(to top,    #1C1C1A 0%, transparent 32%)',
              'linear-gradient(to right,  #1C1C1A 0%, transparent 22%)',
              'linear-gradient(to left,   #1C1C1A 0%, transparent 22%)',
            ].join(', '),
          }} />
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            textAlign: 'center', padding: '5rem 24px 0',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)', marginBottom: '16px' }}>
              ROI CALCULATOR
            </p>
            <h1 style={{ lineHeight: 1, margin: 0 }}>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
                Automation ROI
              </span>
              <span style={{ display: 'block', fontFamily: 'var(--font-body)', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05, marginTop: '0.08em' }}>
                Calculator.
              </span>
            </h1>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.65)', lineHeight: 1.7, maxWidth: '44ch', marginTop: '2rem' }}>
              What&apos;s your time actually worth? Plug in your numbers and see how much automation could save your business every single week.
            </p>
          </div>
        </section>

        {/* ── Calculator ────────────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px 120px', position: 'relative', overflow: 'hidden' }}>
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0,
            background: [
              'radial-gradient(ellipse 70% 45% at 15% 12%, rgba(143,175,159,0.10) 0%, transparent 70%)',
              'radial-gradient(ellipse 50% 35% at 85% 8%, rgba(212,201,176,0.12) 0%, transparent 65%)',
              'radial-gradient(ellipse 60% 40% at 50% 55%, rgba(143,175,159,0.06) 0%, transparent 70%)',
            ].join(', '),
          }} />
          <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))',
              gap: '32px',
              alignItems: 'start',
            }}>

              {/* ── LEFT: Inputs ──────────────────────────────────────────── */}
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
                }}>
                  <label style={{
                    display: 'block',
                    fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
                    letterSpacing: '0.12em', color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '8px',
                  }}>
                    Your hourly rate
                  </label>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
                    <span style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', fontWeight: 600, color: '#8FAF9F', lineHeight: 1 }}>$</span>
                    <input
                      type="number"
                      className="hourly-input"
                      value={hourlyRate}
                      min={0}
                      max={9999}
                      onChange={e => setHourlyRate(Math.max(0, Number(e.target.value)))}
                      placeholder="75"
                    />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#1C1C1A', opacity: 0.4, alignSelf: 'flex-end', paddingBottom: '6px' }}>/hr</span>
                  </div>
                </div>

                {/* Task sliders */}
                <div style={{ marginBottom: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 600, color: '#1C1C1A', margin: 0 }}>
                      Hours per week on…
                    </h3>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#1C1C1A', opacity: 0.35 }}>0 – 20 hrs</span>
                  </div>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#1C1C1A', opacity: 0.45, margin: '0 0 16px' }}>
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
                    display: 'flex', alignItems: 'center', gap: '8px',
                    marginTop: '24px', padding: '10px 18px',
                    borderRadius: '100px', border: '1px solid rgba(212,201,176,0.6)',
                    backgroundColor: 'transparent',
                    fontFamily: 'var(--font-body)', fontSize: '0.82rem', color: '#1C1C1A',
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

              {/* ── RIGHT: Results ────────────────────────────────────────── */}
              <div style={{ position: 'sticky', top: '96px' }}>
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
                    <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'rgba(143,175,159,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <TrendingUp size={16} color="#8FAF9F" />
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: 600, color: '#1C1C1A', margin: 0 }}>Your savings</h3>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
                    {[
                      { label: 'Per week',  value: weeklySaving  },
                      { label: 'Per month', value: monthlySaving },
                      { label: 'Per year',  value: yearlySaving  },
                    ].map(({ label, value }, idx) => (
                      <div key={label} className={`metric-card ${hasValues ? 'active' : ''}`}>
                        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8FAF9F', marginBottom: '4px' }}>
                          {label}
                        </div>
                        <div style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: idx === 2 ? 'clamp(2.2rem, 4vw, 3rem)' : 'clamp(1.7rem, 3.5vw, 2.4rem)',
                          fontWeight: 600,
                          color: hasValues ? '#1C1C1A' : 'rgba(28,28,26,0.25)',
                          lineHeight: 1.05, letterSpacing: '-0.02em',
                          transition: 'color 0.4s ease',
                        }}>
                          <AnimatedNumber value={value} prefix="$" decimals={0} />
                        </div>
                      </div>
                    ))}
                  </div>

                  {hasValues && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '12px', background: 'rgba(143,175,159,0.08)', border: '1px solid rgba(143,175,159,0.2)' }}>
                      <Clock size={14} color="#8FAF9F" />
                      <span style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: '#1C1C1A', opacity: 0.7 }}>
                        <strong style={{ color: '#6B7C4A', fontWeight: 600 }}>{totalHoursPerWeek.toFixed(1)} hours</strong>
                        {' '}of automatable work per week
                      </span>
                    </div>
                  )}

                  {!hasValues && (
                    <div style={{ textAlign: 'center', padding: '16px' }}>
                      <p style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: '#1C1C1A', opacity: 0.35, margin: 0, fontStyle: 'italic' }}>
                        Drag the sliders to see your potential savings
                      </p>
                    </div>
                  )}
                </div>

                {hasValues && (
                  <div style={{ backgroundColor: '#FDFAF6', border: '1px solid rgba(212,201,176,0.65)', borderRadius: '24px', padding: 'clamp(20px, 3vw, 32px)', boxShadow: '0 4px 32px rgba(28,28,26,0.07), 0 1px 4px rgba(28,28,26,0.04)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                      <DollarSign size={14} color="#6B7C4A" />
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#6B7C4A' }}>Cost breakdown</span>
                    </div>
                    {TASKS.filter(t => taskHours[t.key] > 0).map(task => (
                      <BreakdownBar key={task.key} label={task.label} hours={taskHours[task.key]} hourlyRate={hourlyRate} maxCost={maxTaskCost} />
                    ))}
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: '#1C1C1A', opacity: 0.3, margin: '16px 0 0', letterSpacing: '0.04em' }}>
                      Based on typical automation time savings
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Project Estimation Calculator ─────────────────────────────── */}
        <ProjectEstimationCalc />

        {/* ── CTA Strip ─────────────────────────────────────────────────── */}
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
          <div style={{ position: 'relative' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', letterSpacing: '0.18em', color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '16px' }}>
              Ready to get it back?
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#E8E0D0', margin: '0 0 24px', letterSpacing: '-0.02em' }}>
              Let&apos;s automate the hours you just counted.
            </h2>
            <a href={CTA_HREF} target="_blank" rel="noopener noreferrer" className="btn-sage-hero" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Start the conversation
            </a>
          </div>
        </section>

        {/* ── Related Pages ── */}
        <section style={{ position: 'relative', zIndex: 10, maxWidth: '1100px', margin: '0 auto', padding: '0 24px 80px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
            {[
              { href: '/audit', label: 'Free Business Audit', desc: 'Get a personalised breakdown of where your business is leaking time.' },
              { href: '/services', label: 'Our Services', desc: 'Explore the AI business automation systems we build.' },
              { href: '/#contact', label: 'Get in Touch', desc: "Ready to stop the leak? Let's talk." },
            ].map(link => (
              <a key={link.href} href={link.href} style={{
                display: 'block', padding: '20px 24px', borderRadius: '16px',
                background: 'rgba(232,224,208,0.5)', border: '1px solid rgba(212,201,176,0.6)',
                textDecoration: 'none', maxWidth: '280px', flex: '1 1 200px',
                transition: 'border-color 0.2s, background 0.2s',
              }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7C4A', marginBottom: '6px' }}>
                  {link.label}
                </div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '0.84rem', color: 'rgba(28,28,26,0.65)', lineHeight: 1.55 }}>
                  {link.desc}
                </div>
              </a>
            ))}
          </div>
        </section>

      </div>
    </>
  )
}
