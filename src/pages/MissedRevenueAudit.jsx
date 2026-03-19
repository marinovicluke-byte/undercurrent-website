import { useState, useRef, useEffect, useCallback } from 'react'
import { gsap } from 'gsap'
import { AlertTriangle, TrendingDown, Clock, DollarSign, ArrowRight, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'

// ─── Response time options ────────────────────────────────────────────────────
const RESPONSE_OPTIONS = [
  { value: 'lt5',    label: '< 5 min',    loss: 0.05 },
  { value: '5to15',  label: '5–15 min',   loss: 0.22 },
  { value: '15to30', label: '15–30 min',  loss: 0.42 },
  { value: '30to60', label: '30–60 min',  loss: 0.62 },
  { value: '1to4h',  label: '1–4 hrs',    loss: 0.78 },
  { value: '4plus',  label: '4+ hrs',     loss: 0.88 },
  { value: 'next',   label: 'Next day+',  loss: 0.95 },
]

const ADMIN_OPTIONS = [
  { value: 'lt2',    label: '0–2 hrs/wk',   hrs: 1    },
  { value: '2to5',   label: '2–5 hrs/wk',   hrs: 3.5  },
  { value: '5to10',  label: '5–10 hrs/wk',  hrs: 7.5  },
  { value: '10to20', label: '10–20 hrs/wk', hrs: 15   },
  { value: '20plus', label: '20+ hrs/wk',   hrs: 25   },
]

const SCAN_LINES = [
  'Resolving business domain...',
  'Checking contact response patterns...',
  'Benchmarking against industry averages...',
  'Calculating lead conversion loss...',
  'Mapping revenue exposure...',
  'Compiling diagnostic data...',
  'Audit complete.',
]

function getGrade(lossRate) {
  if (lossRate <= 0.10) return { grade: 'B', label: 'Low Risk',      color: '#8FAF9F' }
  if (lossRate <= 0.35) return { grade: 'C', label: 'Moderate Risk', color: '#C9A84C' }
  if (lossRate <= 0.65) return { grade: 'D', label: 'High Risk',     color: '#C07D48' }
  return                       { grade: 'F', label: 'Critical Leak', color: '#B85248' }
}

// ─── Animated number ──────────────────────────────────────────────────────────
function AnimatedNumber({ value, prefix = '', suffix = '' }) {
  const [displayed, setDisplayed] = useState(0)
  const rafRef = useRef(null)
  const startRef = useRef(null)

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const from = displayed
    startRef.current = null
    const duration = 900

    const animate = (now) => {
      if (!startRef.current) startRef.current = now
      const progress = Math.min((now - startRef.current) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayed(from + (value - from) * eased)
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
      else setDisplayed(value)
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [value])

  return (
    <span>
      {prefix}{Math.round(displayed).toLocaleString('en-AU')}{suffix}
    </span>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function MissedRevenueAudit() {
  const [url, setUrl]                 = useState('')
  const [jobValue, setJobValue]       = useState('')
  const [monthlyLeads, setMonthlyLeads] = useState('')
  const [responseTime, setResponseTime] = useState('1to4h')
  const [adminTime, setAdminTime]     = useState('5to10')

  // 'input' | 'scanning' | 'results'
  const [phase, setPhase]   = useState('input')
  const [scanLine, setScanLine] = useState(0)
  const [results, setResults]   = useState(null)

  const [name, setName]         = useState('')
  const [email, setEmail]       = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted]   = useState(false)

  const resultsRef = useRef(null)
  const heroRef    = useRef(null)

  const canAudit = url.trim() && Number(jobValue) > 0 && Number(monthlyLeads) > 0

  // Entrance animation
  useEffect(() => {
    if (!heroRef.current) return
    gsap.fromTo(heroRef.current.querySelectorAll('[data-hero]'),
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.12, delay: 0.1 }
    )
  }, [])

  const handleAudit = useCallback(() => {
    if (!canAudit) return
    const ro = RESPONSE_OPTIONS.find(o => o.value === responseTime)
    const ao = ADMIN_OPTIONS.find(o => o.value === adminTime)

    const jv  = Number(jobValue)
    const ml  = Number(monthlyLeads)
    const leadsLost     = Math.round(ml * ro.loss)
    const monthlyRevLeak = leadsLost * jv
    const annualRevLeak  = monthlyRevLeak * 12
    const adminHrs       = ao.hrs
    const monthlyAdminCost = Math.round(adminHrs * 4.33 * 65)
    const annualAdminCost  = Math.round(adminHrs * 52  * 65)
    const totalAnnualLeak  = annualRevLeak + annualAdminCost

    setResults({
      url, jv, ml, leadsLost,
      monthlyRevLeak, annualRevLeak,
      monthlyAdminCost, annualAdminCost, totalAnnualLeak,
      grade: getGrade(ro.loss),
      lossRate: ro.loss,
      responseLabel: ro.label,
      adminLabel: ao.label,
    })
    setScanLine(0)
    setPhase('scanning')
  }, [canAudit, url, jobValue, monthlyLeads, responseTime, adminTime])

  // Drive scan animation
  useEffect(() => {
    if (phase !== 'scanning') return
    const id = setInterval(() => {
      setScanLine(prev => {
        if (prev >= SCAN_LINES.length - 1) {
          clearInterval(id)
          setTimeout(() => setPhase('results'), 700)
          return prev
        }
        return prev + 1
      })
    }, 330)
    return () => clearInterval(id)
  }, [phase])

  // Scroll to results when they appear
  useEffect(() => {
    if (phase === 'results' && resultsRef.current) {
      setTimeout(() => resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100)
    }
  }, [phase])

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    if (!name || !email || !results) return
    setSubmitting(true)
    try {
      // ── Wire up your form endpoint here (Formspree, EmailJS, etc.) ──
      // await fetch('https://formspree.io/f/YOUR_ID', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ name, email, ...results }),
      // })
      await new Promise(r => setTimeout(r, 1100)) // remove when real endpoint added
    } finally {
      setSubmitting(false)
      setSubmitted(true)
    }
  }

  // ── Shared style helpers ────────────────────────────────────────────────────
  const monoLabel = { fontFamily: 'DM Mono, monospace', fontSize: '0.66rem', letterSpacing: '0.18em', textTransform: 'uppercase' }
  const card = (extra = {}) => ({
    borderRadius: '20px', padding: '18px 20px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.07)',
    ...extra,
  })

  return (
    <>
      <PageHead
        title="Missed Revenue Auditor — UnderCurrent"
        description="Find out exactly how much revenue your service business is losing to slow follow-up. Free 60-second audit for trades, cleaners, and service businesses."
      />

      <style>{`
        .audit-field {
          width: 100%;
          background: rgba(232,224,208,0.35);
          border: 1.5px solid rgba(212,201,176,0.6);
          border-radius: 12px;
          padding: 13px 15px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          color: #1C1C1A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
        }
        .audit-field::placeholder { color: rgba(28,28,26,0.32); }
        .audit-field:focus {
          border-color: rgba(143,175,159,0.75);
          box-shadow: 0 0 0 3px rgba(143,175,159,0.11);
          background: rgba(247,243,237,0.95);
        }
        .audit-field::-webkit-outer-spin-button,
        .audit-field::-webkit-inner-spin-button { -webkit-appearance: none; }
        .audit-field[type=number] { -moz-appearance: textfield; }

        .audit-field-dark {
          width: 100%;
          background: rgba(255,255,255,0.05);
          border: 1.5px solid rgba(255,255,255,0.11);
          border-radius: 12px;
          padding: 13px 15px;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.93rem;
          color: #E8E0D0;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .audit-field-dark::placeholder { color: rgba(232,224,208,0.28); }
        .audit-field-dark:focus {
          border-color: rgba(143,175,159,0.55);
          box-shadow: 0 0 0 3px rgba(143,175,159,0.09);
        }

        .pill {
          padding: 7px 13px;
          border-radius: 100px;
          border: 1.5px solid rgba(212,201,176,0.5);
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.80rem;
          color: rgba(28,28,26,0.6);
          cursor: pointer;
          transition: all 0.16s ease;
          white-space: nowrap;
        }
        .pill:hover {
          border-color: rgba(143,175,159,0.65);
          color: #1C1C1A;
          background: rgba(143,175,159,0.07);
        }
        .pill.on {
          border-color: #8FAF9F;
          background: rgba(143,175,159,0.14);
          color: #1C1C1A;
          font-weight: 500;
        }

        @keyframes cur-blink {
          0%,100% { opacity:1; } 50% { opacity:0; }
        }
        .scan-cur {
          display: inline-block;
          width: 7px; height: 13px;
          background: #8FAF9F;
          margin-left: 3px;
          vertical-align: middle;
          animation: cur-blink 0.75s ease-in-out infinite;
        }

        @keyframes leak-glow {
          0%,100% { box-shadow: 0 0 0 0 rgba(184,82,72,0); }
          50%      { box-shadow: 0 0 0 10px rgba(184,82,72,0.07); }
        }
        .leak-pulse { animation: leak-glow 2.8s ease-in-out infinite; }
      `}</style>

      <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
        <ScrollProgressBar />
        <Navbar isSubPage />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section
          ref={heroRef}
          style={{
            minHeight: '62dvh',
            background: 'linear-gradient(160deg, #1C1C1A 0%, #252824 38%, #3a4d3e 62%, #8FAF9F 88%, #D4C9B0 100%)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(110px, 14vw, 150px) 24px 64px',
            position: 'relative', overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          <div style={{
            position: 'absolute', top: '40%', left: '50%',
            transform: 'translate(-50%,-50%)',
            width: '65vw', maxWidth: '700px',
            height: '65vw', maxHeight: '700px',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(143,175,159,0.16) 0%, transparent 68%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', maxWidth: '660px' }}>
            <p data-hero style={{ ...monoLabel, color: 'rgba(143,175,159,0.72)', marginBottom: '20px', opacity: 0 }}>
              Free Audit — 60 Seconds
            </p>
            <h1 data-hero style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(2.5rem, 6.5vw, 4.4rem)',
              fontWeight: 700, color: '#F7F3ED',
              lineHeight: 1.08, letterSpacing: '-0.03em',
              margin: '0 0 14px', opacity: 0,
            }}>
              Find your{' '}
              <span style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontWeight: 300, fontStyle: 'italic',
                color: 'rgba(143,175,159,0.9)',
              }}>revenue leak.</span>
            </h1>
            <p data-hero style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(0.95rem, 1.5vw, 1.08rem)',
              fontWeight: 300, color: 'rgba(232,224,208,0.58)',
              lineHeight: 1.75, maxWidth: '42ch', margin: '0 auto',
              opacity: 0,
            }}>
              78% of buyers choose the first business to respond. See exactly how much slow follow-up and manual admin is costing you every year.
            </p>
          </div>
        </section>

        {/* ── Main content ──────────────────────────────────────────────── */}
        <section style={{ padding: 'clamp(48px, 6vw, 80px) 24px clamp(80px, 10vw, 120px)' }}>
          <div style={{ maxWidth: '660px', margin: '0 auto' }}>

            {/* ─────────────────── PHASE: INPUT ─────────────────────────── */}
            {phase === 'input' && (
              <div style={{
                backgroundColor: '#FDFAF6',
                border: '1px solid rgba(212,201,176,0.65)',
                borderRadius: '24px',
                padding: 'clamp(28px, 5vw, 48px)',
                boxShadow: '0 8px 48px rgba(28,28,26,0.08)',
              }}>
                <div style={{ marginBottom: '32px' }}>
                  <p style={{ ...monoLabel, color: '#8FAF9F', marginBottom: '8px' }}>
                    Revenue Audit
                  </p>
                  <h2 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.7rem, 3.2vw, 2.3rem)',
                    fontWeight: 600, color: '#1C1C1A', margin: 0,
                  }}>
                    Tell us about your business
                  </h2>
                </div>

                {/* URL */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ ...monoLabel, color: 'rgba(28,28,26,0.42)', display: 'block', marginBottom: '8px' }}>
                    Business Website URL
                  </label>
                  <input
                    type="url"
                    className="audit-field"
                    placeholder="https://yourbusiness.com.au"
                    value={url}
                    onChange={e => setUrl(e.target.value)}
                  />
                </div>

                {/* Job value + monthly leads */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(190px, 100%), 1fr))',
                  gap: '14px', marginBottom: '28px',
                }}>
                  <div>
                    <label style={{ ...monoLabel, color: 'rgba(28,28,26,0.42)', display: 'block', marginBottom: '8px' }}>
                      Average Job Value ($)
                    </label>
                    <input
                      type="number"
                      className="audit-field"
                      placeholder="e.g. 850"
                      value={jobValue}
                      onChange={e => setJobValue(e.target.value)}
                      min={0}
                    />
                  </div>
                  <div>
                    <label style={{ ...monoLabel, color: 'rgba(28,28,26,0.42)', display: 'block', marginBottom: '8px' }}>
                      Monthly Lead Volume
                    </label>
                    <input
                      type="number"
                      className="audit-field"
                      placeholder="e.g. 30"
                      value={monthlyLeads}
                      onChange={e => setMonthlyLeads(e.target.value)}
                      min={0}
                    />
                  </div>
                </div>

                {/* Response time */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ ...monoLabel, color: 'rgba(28,28,26,0.42)', display: 'block', marginBottom: '10px' }}>
                    How fast do you respond to new leads?
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {RESPONSE_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        className={`pill${responseTime === o.value ? ' on' : ''}`}
                        onClick={() => setResponseTime(o.value)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Admin hours */}
                <div style={{ marginBottom: '36px' }}>
                  <label style={{ ...monoLabel, color: 'rgba(28,28,26,0.42)', display: 'block', marginBottom: '10px' }}>
                    Manual admin time per week
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {ADMIN_OPTIONS.map(o => (
                      <button
                        key={o.value}
                        className={`pill${adminTime === o.value ? ' on' : ''}`}
                        onClick={() => setAdminTime(o.value)}
                      >
                        {o.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit */}
                <button
                  onClick={handleAudit}
                  disabled={!canAudit}
                  style={{
                    width: '100%',
                    padding: '15px 24px', borderRadius: '14px', border: 'none',
                    background: canAudit
                      ? 'linear-gradient(135deg, #3a4d3e 0%, #1C1C1A 100%)'
                      : 'rgba(28,28,26,0.10)',
                    color: canAudit ? '#E8E0D0' : 'rgba(28,28,26,0.3)',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '1rem', fontWeight: 600,
                    cursor: canAudit ? 'pointer' : 'not-allowed',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
                    transition: 'background 0.2s',
                    letterSpacing: '-0.01em',
                  }}
                  onMouseEnter={e => { if (canAudit) e.currentTarget.style.background = 'linear-gradient(135deg, #4a6350 0%, #2a2a28 100%)' }}
                  onMouseLeave={e => { if (canAudit) e.currentTarget.style.background = 'linear-gradient(135deg, #3a4d3e 0%, #1C1C1A 100%)' }}
                >
                  Reveal My Revenue Leak
                  <ArrowRight size={17} />
                </button>
                {!canAudit && (
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.76rem',
                    color: 'rgba(28,28,26,0.3)', textAlign: 'center', marginTop: '10px',
                  }}>
                    Enter your URL, average job value, and monthly leads to continue
                  </p>
                )}
              </div>
            )}

            {/* ─────────────────── PHASE: SCANNING ──────────────────────── */}
            {phase === 'scanning' && (
              <div style={{
                backgroundColor: '#1C1C1A',
                border: '1px solid rgba(143,175,159,0.18)',
                borderRadius: '24px',
                padding: 'clamp(28px, 5vw, 48px)',
                boxShadow: '0 8px 48px rgba(28,28,26,0.3)',
              }}>
                <p style={{ ...monoLabel, color: 'rgba(143,175,159,0.55)', marginBottom: '28px', wordBreak: 'break-all' }}>
                  Running audit — {url.replace(/^https?:\/\//, '')}
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {SCAN_LINES.map((line, i) => (
                    <div key={i} style={{
                      display: 'flex', alignItems: 'center', gap: '12px',
                      opacity: i <= scanLine ? 1 : 0.12,
                      transition: 'opacity 0.3s ease',
                    }}>
                      <span style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', width: '12px',
                        color: i < scanLine ? '#8FAF9F' : i === scanLine ? '#E8E0D0' : 'rgba(232,224,208,0.3)',
                        flexShrink: 0,
                      }}>
                        {i < scanLine ? '✓' : i === scanLine ? '›' : '·'}
                      </span>
                      <span style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '0.82rem',
                        color: i < scanLine ? 'rgba(143,175,159,0.75)' : i === scanLine ? '#E8E0D0' : 'rgba(232,224,208,0.18)',
                      }}>
                        {line}
                        {i === scanLine && <span className="scan-cur" />}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ─────────────────── PHASE: RESULTS ───────────────────────── */}
            {phase === 'results' && results && (
              <div ref={resultsRef}>

                {/* Diagnostic card */}
                <div style={{
                  backgroundColor: '#1C1C1A',
                  border: `1px solid ${results.grade.color}30`,
                  borderRadius: '24px',
                  padding: 'clamp(28px, 5vw, 44px)',
                  marginBottom: '14px',
                  boxShadow: '0 8px 48px rgba(28,28,26,0.22)',
                }}>
                  {/* Header row */}
                  <div style={{
                    display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                    gap: '16px', flexWrap: 'wrap', marginBottom: '32px',
                  }}>
                    <div>
                      <p style={{ ...monoLabel, color: 'rgba(143,175,159,0.5)', marginBottom: '6px', wordBreak: 'break-all' }}>
                        Audit — {results.url.replace(/^https?:\/\//, '')}
                      </p>
                      <h2 style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(1.5rem, 3vw, 2.1rem)',
                        fontWeight: 600, color: '#E8E0D0', margin: 0,
                      }}>
                        Your Diagnostic Report
                      </h2>
                    </div>
                    {/* Grade badge */}
                    <div style={{
                      width: '62px', height: '62px', borderRadius: '14px', flexShrink: 0,
                      border: `2px solid ${results.grade.color}`,
                      background: `${results.grade.color}14`,
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                    }}>
                      <span style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '2rem', fontWeight: 700, lineHeight: 1,
                        color: results.grade.color,
                      }}>{results.grade.grade}</span>
                      <span style={{
                        fontFamily: 'DM Mono, monospace', fontSize: '0.48rem',
                        letterSpacing: '0.07em', color: results.grade.color, opacity: 0.8,
                        marginTop: '1px',
                      }}>{results.grade.label.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* 3 stat cards */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(155px, 100%), 1fr))',
                    gap: '10px', marginBottom: '24px',
                  }}>
                    {[
                      {
                        icon: <TrendingDown size={13} color={results.grade.color} />,
                        label: 'Leads lost / mo',
                        value: results.leadsLost,
                        display: `${results.leadsLost} of ${results.ml}`,
                        highlight: false,
                      },
                      {
                        icon: <DollarSign size={13} color={results.grade.color} />,
                        label: 'Monthly rev. leak',
                        value: results.monthlyRevLeak,
                        display: `$${results.monthlyRevLeak.toLocaleString('en-AU')}`,
                        highlight: false,
                      },
                      {
                        icon: <AlertTriangle size={13} color={results.grade.color} />,
                        label: 'Annual rev. leak',
                        value: results.annualRevLeak,
                        display: null,
                        highlight: true,
                      },
                    ].map((s, i) => (
                      <div key={i} style={{
                        ...card(s.highlight ? {
                          background: `${results.grade.color}12`,
                          border: `1px solid ${results.grade.color}28`,
                        } : {}),
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '8px' }}>
                          {s.icon}
                          <span style={{ ...monoLabel, fontSize: '0.60rem', color: 'rgba(232,224,208,0.38)' }}>
                            {s.label}
                          </span>
                        </div>
                        <div style={{
                          fontFamily: 'Cormorant Garamond, serif',
                          fontSize: 'clamp(1.35rem, 2.6vw, 1.85rem)',
                          fontWeight: 700, lineHeight: 1, letterSpacing: '-0.02em',
                          color: s.highlight ? results.grade.color : '#E8E0D0',
                        }}>
                          {s.display ? s.display : <AnimatedNumber value={s.value} prefix="$" />}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Research insight */}
                  <div style={{
                    padding: '15px 18px', borderRadius: '12px',
                    background: 'rgba(143,175,159,0.05)',
                    border: '1px solid rgba(143,175,159,0.14)',
                    marginBottom: '14px',
                  }}>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem',
                      color: 'rgba(232,224,208,0.6)', margin: 0, lineHeight: 1.65,
                    }}>
                      <span style={{ color: '#8FAF9F', fontWeight: 600 }}>78% of buyers</span> choose the first business to respond.
                      At a <span style={{ color: '#E8E0D0' }}>{results.responseLabel}</span> response time, you're losing an estimated{' '}
                      <span style={{ color: results.grade.color, fontWeight: 600 }}>{Math.round(results.lossRate * 100)}%</span> of inbound leads.
                      {results.lossRate >= 0.42 && (
                        <> Responding after 10 minutes decreases lead qualification likelihood by{' '}
                          <span style={{ color: '#8FAF9F', fontWeight: 600 }}>up to 400%.</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* Admin waste row */}
                  <div style={{
                    ...card(),
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={13} color="rgba(232,224,208,0.35)" />
                      <span style={{
                        fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem',
                        color: 'rgba(232,224,208,0.5)',
                      }}>
                        Admin overhead — {results.adminLabel} × $65/hr
                      </span>
                    </div>
                    <span style={{
                      fontFamily: 'DM Mono, monospace', fontSize: '0.80rem',
                      color: 'rgba(232,224,208,0.65)',
                    }}>
                      −${results.annualAdminCost.toLocaleString('en-AU')}/yr
                    </span>
                  </div>
                </div>

                {/* Total leak */}
                <div className="leak-pulse" style={{
                  backgroundColor: '#1C1C1A',
                  border: `1.5px solid ${results.grade.color}40`,
                  borderRadius: '24px',
                  padding: 'clamp(24px, 4vw, 38px)',
                  marginBottom: '14px',
                  textAlign: 'center',
                }}>
                  <p style={{ ...monoLabel, color: 'rgba(232,224,208,0.35)', marginBottom: '8px' }}>
                    Total Annual Revenue Leak
                  </p>
                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(3rem, 8vw, 5.2rem)',
                    fontWeight: 700, lineHeight: 1, letterSpacing: '-0.03em',
                    color: results.grade.color,
                  }}>
                    <AnimatedNumber value={results.totalAnnualLeak} prefix="$" />
                  </div>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem',
                    color: 'rgba(232,224,208,0.38)', marginTop: '8px',
                  }}>
                    Based on {results.ml} leads/month × ${Number(results.jv).toLocaleString('en-AU')} average job value
                  </p>
                </div>

                {/* Email capture / success */}
                {!submitted ? (
                  <div style={{
                    backgroundColor: '#FDFAF6',
                    border: '1px solid rgba(212,201,176,0.65)',
                    borderRadius: '24px',
                    padding: 'clamp(24px, 4vw, 40px)',
                    boxShadow: '0 4px 32px rgba(28,28,26,0.07)',
                  }}>
                    <p style={{ ...monoLabel, color: '#8FAF9F', marginBottom: '6px' }}>
                      Free Diagnostic Report
                    </p>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                      fontWeight: 600, color: '#1C1C1A', margin: '0 0 8px',
                    }}>
                      Get your full written report
                    </h3>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem',
                      color: 'rgba(28,28,26,0.5)', margin: '0 0 22px', lineHeight: 1.65,
                    }}>
                      We'll send you a breakdown of exactly where the leak is and a clear plan to fix it — free, no obligation.
                    </p>
                    <form onSubmit={handleEmailSubmit}>
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(min(175px, 100%), 1fr))',
                        gap: '12px', marginBottom: '12px',
                      }}>
                        <input
                          type="text"
                          className="audit-field"
                          placeholder="First name"
                          value={name}
                          onChange={e => setName(e.target.value)}
                          required
                        />
                        <input
                          type="email"
                          className="audit-field"
                          placeholder="Business email"
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={submitting || !name || !email}
                        style={{
                          width: '100%', padding: '14px 24px',
                          borderRadius: '12px', border: 'none',
                          background: 'linear-gradient(135deg, #8FAF9F 0%, #6B7C4A 100%)',
                          color: '#fff',
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: '0.95rem', fontWeight: 600,
                          cursor: (submitting || !name || !email) ? 'not-allowed' : 'pointer',
                          opacity: (submitting || !name || !email) ? 0.62 : 1,
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                          transition: 'opacity 0.2s',
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send My Diagnostic Report'}
                        {!submitting && <ArrowRight size={15} />}
                      </button>
                    </form>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem',
                      color: 'rgba(28,28,26,0.28)', textAlign: 'center', marginTop: '10px',
                    }}>
                      No spam. One email with your report + optional follow-up call.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    backgroundColor: '#FDFAF6',
                    border: '1px solid rgba(143,175,159,0.38)',
                    borderRadius: '24px',
                    padding: 'clamp(24px, 4vw, 40px)',
                    textAlign: 'center',
                    boxShadow: '0 4px 32px rgba(143,175,159,0.07)',
                  }}>
                    <div style={{
                      width: '46px', height: '46px', borderRadius: '50%',
                      background: 'rgba(143,175,159,0.13)',
                      border: '1px solid rgba(143,175,159,0.28)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}>
                      <Zap size={18} color="#8FAF9F" />
                    </div>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.65rem', fontWeight: 600,
                      color: '#1C1C1A', margin: '0 0 8px',
                    }}>
                      Report on its way, {name}.
                    </h3>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif', fontSize: '0.86rem',
                      color: 'rgba(28,28,26,0.52)', margin: '0 0 22px', lineHeight: 1.65,
                    }}>
                      Check your inbox. While you wait — want to walk through the numbers together?
                    </p>
                    <a
                      href="https://cal.com/luke-marinovic-aqeosc/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-sage"
                      style={{ fontSize: '0.9rem' }}
                    >
                      Book a free 30-min call
                    </a>
                  </div>
                )}
              </div>
            )}

          </div>
        </section>

        <Footer />
      </div>
    </>
  )
}
