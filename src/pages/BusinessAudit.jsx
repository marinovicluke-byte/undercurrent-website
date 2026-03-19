import { useState, useRef, useEffect, useMemo } from 'react'
import { gsap } from 'gsap'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import PillarCard from '../audit/PillarCard.jsx'
import ResultsBlock from '../audit/ResultsBlock.jsx'
import PDFCaptureForm from '../audit/PDFCaptureForm.jsx'
import { PILLARS, INDUSTRIES, RESPONSE_OPTIONS, defaultPillarState } from '../audit/config.js'
import { calcPillarMonthly, calcLeadBleed, calcTotals, buildPayload } from '../audit/calculations.js'

// ─── Water canvas (matches hero/roi pattern) ──────────────────────────────────
function WaterCanvas({ opacity = 1 }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      const w = canvas.offsetWidth; const h = canvas.offsetHeight
      canvas.width = w * dpr; canvas.height = h * dpr; ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)
    let visible = true
    const obs = new IntersectionObserver(([e]) => { visible = e.isIntersecting }, { threshold: 0 })
    obs.observe(canvas)
    const currents = [
      { yFrac: 0.38, amp: 38, freq: 0.008, speed: 0.18,  phase: 0,   color: 'rgba(143,175,159,0.20)', lw: 1.0, dash: 0,  gap: 0  },
      { yFrac: 0.48, amp: 28, freq: 0.010, speed: -0.14, phase: 1.2, color: 'rgba(143,175,159,0.16)', lw: 0.8, dash: 0,  gap: 0  },
      { yFrac: 0.52, amp: 20, freq: 0.013, speed: 0.22,  phase: 2.4, color: 'rgba(212,201,176,0.13)', lw: 0.7, dash: 0,  gap: 0  },
      { yFrac: 0.44, amp: 44, freq: 0.007, speed: -0.28, phase: 0.6, color: 'rgba(143,175,159,0.12)', lw: 0.5, dash: 0,  gap: 0  },
      { yFrac: 0.56, amp: 16, freq: 0.011, speed: 0.12,  phase: 3.6, color: 'rgba(212,201,176,0.18)', lw: 1.2, dash: 60, gap: 90 },
    ]
    const driftPhases = currents.map((_, i) => i * 0.7)
    const driftAmps   = [0.035, 0.028, 0.022, 0.040, 0.018]
    const driftSpeeds = [0.0004, 0.0003, 0.0005, 0.00035, 0.00025]
    let t = 0
    const draw = () => {
      if (!visible) { rafRef.current = requestAnimationFrame(draw); return }
      const W = canvas.offsetWidth; const H = canvas.offsetHeight
      ctx.clearRect(0, 0, W, H)
      currents.forEach((c, i) => {
        const drift = Math.sin(t * driftSpeeds[i] * 1000 + driftPhases[i]) * driftAmps[i]
        const yCenter = (c.yFrac + drift) * H
        ctx.beginPath(); ctx.strokeStyle = c.color; ctx.lineWidth = c.lw; ctx.lineCap = 'round'
        if (c.dash > 0) { ctx.setLineDash([c.dash, c.gap]); ctx.lineDashOffset = -(t * c.speed * 60) % (c.dash + c.gap) }
        else ctx.setLineDash([])
        for (let x = -4; x <= W + 4; x += 4) {
          const y = yCenter + Math.sin(x * c.freq + t * c.speed * 60) * c.amp
          if (x === -4) ctx.moveTo(x, y); else ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      t += 0.016; rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); obs.disconnect() }
  }, [])

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity, pointerEvents: 'none' }} />
}

// ─── Scroll reveal ─────────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, className = '', style = {} }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        gsap.fromTo(el, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', delay })
        obs.disconnect()
      }
    }, { threshold: 0, rootMargin: '0px 0px 150px 0px' })
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return <div ref={ref} className={className} style={{ opacity: 0, ...style }}>{children}</div>
}

// ─── Number input (matching ROI calculator style) ──────────────────────────────
function NumberInput({ label, value, onChange, prefix = '$', placeholder = '0', defaultVal }) {
  return (
    <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(232,224,208,0.45)', border: '1px solid rgba(212,201,176,0.65)' }}>
      <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '6px' }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: '#8FAF9F', lineHeight: 1 }}>{prefix}</span>
        <input
          type="number"
          className="hourly-input"
          value={value || ''}
          min={0}
          placeholder={placeholder}
          onChange={e => onChange(Math.max(0, Number(e.target.value)))}
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
        />
      </div>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BusinessAudit() {
  const heroRef = useRef(null); const glowRef = useRef(null)
  const headlineRef = useRef(null); const subRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })
      tl.fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.8, ease: 'power2.out' })
        .fromTo(headlineRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' }, '-=1.0')
        .fromTo(subRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.5')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // ─── State ───────────────────────────────────────────────────────────────────
  const [industry, setIndustry]           = useState('')
  const [customIndustry, setCustomIndustry] = useState('')
  const [hourlyRate, setHourlyRate]       = useState(75)
  const [projectValue, setProjectValue]   = useState(0)
  const [leadsPerMonth, setLeadsPerMonth] = useState(0)
  const [responseTime, setResponseTime]   = useState('')
  const [pillars, setPillars]             = useState(defaultPillarState)

  const handlePillarChange = (key) => (newState) => setPillars(prev => ({ ...prev, [key]: newState }))

  // ─── Calculations ────────────────────────────────────────────────────────────
  const pillarMonthly = useMemo(() => {
    const out = {}
    for (const p of PILLARS) out[p.key] = calcPillarMonthly(pillars[p.key].hours, hourlyRate)
    return out
  }, [pillars, hourlyRate])

  const leadBleedMonthly = useMemo(
    () => calcLeadBleed(leadsPerMonth, projectValue, responseTime || null),
    [leadsPerMonth, projectValue, responseTime]
  )

  const { totalMonthly, totalYearly } = useMemo(
    () => calcTotals(pillarMonthly, leadBleedMonthly),
    [pillarMonthly, leadBleedMonthly]
  )

  const hasResults = useMemo(() => PILLARS.some(p => pillars[p.key].hours > 0), [pillars])

  // ─── Payload ─────────────────────────────────────────────────────────────────
  const webhookPayload = useMemo(() => buildPayload({
    contact: { businessName: '', fullName: '', email: '', phone: '' }, // filled in by PDFCaptureForm
    context: { industry: customIndustry || industry, hourlyRate, leadsPerMonth, projectValue },
    pillars,
    totalMonthly,
    responseTimeBand: responseTime || null,
  }), [industry, customIndustry, hourlyRate, leadsPerMonth, projectValue, pillars, totalMonthly, responseTime])

  const isOther = industry === 'Other'

  return (
    <>
      <PageHead
        title="Business Audit — UnderCurrent"
        description="Find the holes in your business. See exactly how much time and money you're losing across the five core areas of your operation."
      />

      <style>{`
        .roi-slider { -webkit-appearance: none; appearance: none; width: 100%; height: 3px; background: rgba(143,175,159,0.25); border-radius: 2px; outline: none; cursor: pointer; margin-bottom: 12px; transition: background 0.2s; display: block; }
        .roi-slider:hover { background: rgba(143,175,159,0.40); }
        .roi-slider::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #8FAF9F; border: 2px solid #F7F3ED; box-shadow: 0 0 0 1px #8FAF9F, 0 2px 8px rgba(143,175,159,0.4); cursor: pointer; transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .roi-slider::-webkit-slider-thumb:hover { transform: scale(1.2); box-shadow: 0 0 0 1px #6B7C4A, 0 4px 16px rgba(107,124,74,0.4); background: #6B7C4A; }
        .roi-slider::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #8FAF9F; border: 2px solid #F7F3ED; cursor: pointer; }
        .hourly-input { background: transparent; border: none; outline: none; font-family: 'Cormorant Garamond', serif; font-weight: 600; color: #1C1C1A; width: 100%; caret-color: #8FAF9F; -moz-appearance: textfield; }
        .hourly-input::-webkit-outer-spin-button, .hourly-input::-webkit-inner-spin-button { -webkit-appearance: none; }
        .btn-sage { display: inline-flex; align-items: center; border-radius: 9999px; border: 1px solid #8FAF9F; background: transparent; color: #1C1C1A; font-family: 'DM Sans', sans-serif; font-size: 0.875rem; font-weight: 500; letter-spacing: 0.05em; padding: 10px 24px; cursor: pointer; transition: all 0.2s; }
        .btn-sage:hover { background: #8FAF9F; color: #F7F3ED; transform: scale(1.03); }
      `}</style>

      <div style={{ backgroundColor: '#F7F3ED', overflowX: 'hidden' }}>
        <ScrollProgressBar />
        <Navbar isSubPage />

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section ref={heroRef} style={{ height: '70dvh', minHeight: '520px', background: 'linear-gradient(160deg, #1C1C1A 0%, #2a3028 30%, #3d4f42 55%, #8FAF9F 80%, #D4C9B0 100%)', position: 'relative', overflow: 'hidden' }}>
          <div ref={glowRef} style={{ position: 'absolute', top: '42%', left: '50%', transform: 'translate(-50%,-50%)', width: '80vw', maxWidth: '900px', height: '80vw', maxHeight: '900px', borderRadius: '50%', background: 'radial-gradient(ellipse at center, rgba(143,175,159,0.22) 0%, rgba(143,175,159,0.08) 45%, transparent 70%)', pointerEvents: 'none', opacity: 0 }} />
          <WaterCanvas opacity={0.8} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '5rem 24px 0' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', letterSpacing: '0.2em', color: 'rgba(143,175,159,0.7)', marginBottom: '16px' }}>
              BUSINESS AUDIT
            </p>
            <h1 ref={headlineRef} style={{ opacity: 0, lineHeight: 1, margin: 0 }}>
              <span style={{ display: 'block', fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 700, letterSpacing: '-0.03em', color: '#F7F3ED', lineHeight: 1.0 }}>
                Find the holes
              </span>
              <span style={{ display: 'block', fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(3rem, 7vw, 7rem)', fontWeight: 300, fontStyle: 'italic', letterSpacing: '-0.02em', color: 'rgba(143,175,159,0.9)', lineHeight: 1.05, marginTop: '0.08em' }}>
                in your business.
              </span>
            </h1>
            <p ref={subRef} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1rem, 1.5vw, 1.15rem)', fontWeight: 300, color: 'rgba(232,224,208,0.65)', lineHeight: 1.7, maxWidth: '44ch', marginTop: '2rem', opacity: 0 }}>
              Five areas. Real numbers. See exactly where your business is bleeding time and money.
            </p>
          </div>
        </section>

        {/* ── Business context ───────────────────────────────────────────── */}
        <section style={{ padding: '80px 24px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8FAF9F', margin: '0 0 8px' }}>Step 01</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#1C1C1A', margin: '0 0 28px', letterSpacing: '-0.02em' }}>
              Tell us about your business
            </h2>
          </Reveal>

          <Reveal delay={0.05}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '16px' }}>
              {/* Industry */}
              <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(232,224,208,0.45)', border: '1px solid rgba(212,201,176,0.65)' }}>
                <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '8px' }}>Industry</label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: industry ? '#1C1C1A' : 'rgba(28,28,26,0.4)', cursor: 'pointer' }}
                >
                  <option value="">Select your industry…</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                </select>
                {isOther && (
                  <input
                    type="text"
                    placeholder="Type your industry…"
                    value={customIndustry}
                    onChange={e => setCustomIndustry(e.target.value)}
                    style={{ marginTop: '10px', width: '100%', background: 'transparent', border: 'none', borderTop: '1px solid rgba(212,201,176,0.5)', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: '#1C1C1A', padding: '8px 0 0', boxSizing: 'border-box' }}
                  />
                )}
              </div>

              <NumberInput label="Your hourly rate" value={hourlyRate} onChange={setHourlyRate} placeholder="75" />
              <NumberInput label="Avg project / job value" value={projectValue} onChange={setProjectValue} placeholder="0" />
              <NumberInput label="Leads per month" value={leadsPerMonth} onChange={setLeadsPerMonth} prefix="#" placeholder="0" />

              {/* Response time */}
              <div style={{ padding: '16px 20px', borderRadius: '14px', background: 'rgba(232,224,208,0.45)', border: '1px solid rgba(212,201,176,0.65)' }}>
                <label style={{ display: 'block', fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.12em', color: '#8FAF9F', textTransform: 'uppercase', marginBottom: '8px' }}>Avg lead response time</label>
                <select
                  value={responseTime}
                  onChange={e => setResponseTime(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', outline: 'none', fontFamily: 'DM Sans, sans-serif', fontSize: '0.95rem', color: responseTime ? '#1C1C1A' : 'rgba(28,28,26,0.4)', cursor: 'pointer' }}
                >
                  <option value="">Select response time…</option>
                  {RESPONSE_OPTIONS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                </select>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── Five pillars ───────────────────────────────────────────────── */}
        <section style={{ padding: '20px 24px 40px', maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8FAF9F', margin: '0 0 8px' }}>Step 02</p>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#1C1C1A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              Rate your five core areas
            </h2>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', color: 'rgba(28,28,26,0.55)', margin: '0 0 28px', lineHeight: 1.6 }}>
              Pick a health rating, then drag to show how many hours a week you spend on each area. Expand any card to break it down further — optional, but revealing.
            </p>
          </Reveal>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.key} delay={i * 0.06}>
                <PillarCard
                  pillar={pillar}
                  state={pillars[pillar.key]}
                  onChange={handlePillarChange(pillar.key)}
                />
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── Results ────────────────────────────────────────────────────── */}
        {hasResults && (
          <section style={{ padding: '20px 24px 40px', maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#8FAF9F', margin: '0 0 8px' }}>Step 03</p>
              <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 400, color: '#1C1C1A', margin: '0 0 28px', letterSpacing: '-0.02em' }}>
                Here's what the numbers say
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <ResultsBlock
                pillars={pillars}
                hourlyRate={hourlyRate}
                responseTimeBand={responseTime || null}
                totalMonthly={totalMonthly}
                totalYearly={totalYearly}
                leadBleedMonthly={leadBleedMonthly}
              />
            </Reveal>
          </section>
        )}

        {/* ── PDF capture ────────────────────────────────────────────────── */}
        {hasResults && (
          <section style={{ padding: '20px 24px 100px', maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <PDFCaptureForm payload={webhookPayload} />
            </Reveal>
          </section>
        )}

        <Footer />
      </div>
    </>
  )
}
