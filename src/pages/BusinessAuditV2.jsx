import { useState, useMemo } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import PDFCaptureForm from '../audit/PDFCaptureForm.jsx'
import { PILLARS, INDUSTRIES, RESPONSE_OPTIONS, defaultPillarState } from '../audit/config.js'
import { calcPillarMonthly, calcLeadBleed, calcTotals, calcRating, calcGap, buildPayload } from '../audit/calculations.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(n) {
  if (!n || n <= 0) return '$0'
  if (n >= 1000) return '$' + Math.round(n).toLocaleString()
  return '$' + Math.round(n)
}

// ─── HealthPill ───────────────────────────────────────────────────────────────
function HealthPill({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: '28px',
        padding: '0 12px',
        borderRadius: '9999px',
        border: selected ? '1px solid #8FAF9F' : '1px solid rgba(255,255,255,0.18)',
        background: selected ? 'rgba(143,175,159,0.15)' : 'transparent',
        color: selected ? '#8FAF9F' : 'rgba(255,255,255,0.38)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'all 0.18s ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

// ─── AuditSlider ──────────────────────────────────────────────────────────────
function AuditSlider({ label, value, onChange, max = 40, step = 0.5, unit = 'hrs/wk' }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(247,243,237,0.65)' }}>{label}</span>
        <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', color: '#8FAF9F', minWidth: '52px', textAlign: 'right' }}>
          {value > 0 ? `${value} ${unit}` : '—'}
        </span>
      </div>
      <input
        type="range"
        className="audit-v2-slider"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
      />
    </div>
  )
}

// ─── NumberInputDark ──────────────────────────────────────────────────────────
function NumberInputDark({ label, value, onChange, prefix = '$', placeholder = '0' }) {
  return (
    <div style={{
      padding: '14px 16px',
      borderRadius: '12px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.08)',
    }}>
      <label style={{
        display: 'block',
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.65rem',
        letterSpacing: '0.12em',
        color: 'rgba(143,175,159,0.7)',
        textTransform: 'uppercase',
        marginBottom: '6px',
      }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '3px' }}>
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
          fontWeight: 600,
          color: '#8FAF9F',
          lineHeight: 1,
        }}>{prefix}</span>
        <input
          type="number"
          className="audit-v2-number-input"
          value={value || ''}
          min={0}
          placeholder={placeholder}
          onChange={e => onChange(Math.max(0, Number(e.target.value)))}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            fontWeight: 600,
            color: '#F7F3ED',
            width: '100%',
            caretColor: '#8FAF9F',
            MozAppearance: 'textfield',
          }}
        />
      </div>
    </div>
  )
}

// ─── PillarSection ────────────────────────────────────────────────────────────
function PillarSection({ pillar, state, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const calcedRating = calcRating(state.hours)
  const gapStatus = calcGap(state.selfRating, calcedRating, state.hours)

  const setHours = (val) => onChange({ ...state, hours: val })
  const setRating = (r) => onChange({ ...state, selfRating: r === state.selfRating ? null : r })
  const setSubtask = (key, val) => onChange({ ...state, subtasks: { ...state.subtasks, [key]: val } })

  const pillStyle = {
    padding: '20px 0',
    borderBottom: '1px solid rgba(143,175,159,0.1)',
  }

  return (
    <div style={pillStyle}>
      {/* Header row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <h3 style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.95rem',
          fontWeight: 600,
          color: '#F7F3ED',
          margin: 0,
          letterSpacing: '-0.01em',
        }}>
          {pillar.label}
        </h3>
        {/* Health pills */}
        <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
          {['Red', 'Orange', 'Green'].map(r => (
            <HealthPill key={r} label={r} selected={state.selfRating === r} onClick={() => setRating(r)} />
          ))}
        </div>
      </div>

      {/* Hours slider */}
      <AuditSlider
        label="Hours per week"
        value={state.hours}
        onChange={setHours}
        max={40}
        step={0.5}
      />

      {/* Gap indicator */}
      {gapStatus && (
        <div style={{ marginTop: '6px', marginBottom: '8px' }}>
          <span style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            padding: '2px 8px',
            borderRadius: '4px',
            background: gapStatus === 'Blind spot' ? 'rgba(220,100,80,0.15)' : gapStatus === 'Under-estimated' ? 'rgba(200,160,60,0.15)' : 'rgba(143,175,159,0.12)',
            color: gapStatus === 'Blind spot' ? 'rgba(220,120,100,0.9)' : gapStatus === 'Under-estimated' ? 'rgba(210,175,80,0.9)' : '#8FAF9F',
            border: '1px solid ' + (gapStatus === 'Blind spot' ? 'rgba(220,100,80,0.25)' : gapStatus === 'Under-estimated' ? 'rgba(200,160,60,0.25)' : 'rgba(143,175,159,0.2)'),
          }}>
            {gapStatus} — calc: {calcedRating}
          </span>
        </div>
      )}

      {/* Break it down button */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'none',
          border: 'none',
          padding: '4px 0',
          cursor: 'pointer',
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.08em',
          color: 'rgba(143,175,159,0.6)',
          transition: 'color 0.15s',
          marginTop: '4px',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#8FAF9F'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(143,175,159,0.6)'}
      >
        {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
        {expanded ? 'Collapse' : 'Break it down'}
      </button>

      {/* Subtask sliders */}
      {expanded && (
        <div style={{ marginTop: '14px', paddingLeft: '12px', borderLeft: '1px solid rgba(143,175,159,0.15)' }}>
          {pillar.subtasks.map(st => (
            <AuditSlider
              key={st.key}
              label={st.label}
              value={state.subtasks[st.key]}
              onChange={v => setSubtask(st.key, v)}
              max={20}
              step={0.5}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// ─── ResultCard ───────────────────────────────────────────────────────────────
function ResultCard({ title, price, subtitle, priceColor = '#F7F3ED', gradient = false, sageBorder = false, secondaryLabel, secondaryValue }) {
  return (
    <div style={{
      borderRadius: '16px',
      padding: '20px 24px',
      background: gradient
        ? 'linear-gradient(135deg, #1a2e24 0%, #2a3d30 40%, #3d4f42 100%)'
        : 'rgba(255,255,255,0.04)',
      border: sageBorder
        ? '1px solid rgba(143,175,159,0.35)'
        : '1px solid rgba(255,255,255,0.08)',
      marginBottom: '10px',
    }}>
      <p style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(143,175,159,0.7)',
        margin: '0 0 8px',
      }}>
        {title}
      </p>
      <p style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: gradient ? 'clamp(2rem, 4vw, 2.8rem)' : 'clamp(1.6rem, 3vw, 2.2rem)',
        fontWeight: 600,
        color: priceColor,
        margin: 0,
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}>
        {price}
      </p>
      {secondaryLabel && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.82rem',
          color: '#8FAF9F',
          margin: '4px 0 0',
        }}>
          {secondaryLabel}: <strong>{secondaryValue}</strong>
        </p>
      )}
      <p style={{
        fontFamily: 'DM Sans, sans-serif',
        fontSize: '0.78rem',
        color: 'rgba(247,243,237,0.38)',
        margin: '8px 0 0',
        lineHeight: 1.4,
      }}>
        {subtitle}
      </p>
    </div>
  )
}

// ─── GapTable ─────────────────────────────────────────────────────────────────
function GapTable({ pillars, leadBleedMonthly }) {
  const rows = PILLARS.map(p => {
    const st = pillars[p.key]
    if (st.hours <= 0) return null
    const calcedRating = calcRating(st.hours)
    const gap = calcGap(st.selfRating, calcedRating, st.hours)
    return { label: p.label, selfRated: st.selfRating, calced: calcedRating, gap }
  }).filter(Boolean)

  if (rows.length === 0 && leadBleedMonthly <= 0) return null

  const ratingColor = (r) => {
    if (r === 'Red') return 'rgba(220,100,80,0.85)'
    if (r === 'Orange') return 'rgba(210,160,60,0.85)'
    return '#8FAF9F'
  }

  return (
    <div style={{ marginTop: '16px' }}>
      <p style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.62rem',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'rgba(143,175,159,0.5)',
        margin: '0 0 10px',
      }}>
        Gap Analysis
      </p>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['Area', 'Self', 'Calc', 'Status'].map(h => (
              <th key={h} style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(247,243,237,0.28)',
                textAlign: 'left',
                paddingBottom: '6px',
                paddingRight: h !== 'Status' ? '8px' : '0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(247,243,237,0.65)', padding: '7px 8px 7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.label}
              </td>
              <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: row.selfRated ? ratingColor(row.selfRated) : 'rgba(247,243,237,0.25)', padding: '7px 8px 7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.selfRated || '—'}
              </td>
              <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: ratingColor(row.calced), padding: '7px 8px 7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.calced}
              </td>
              <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.65rem', color: row.gap === 'Blind spot' ? 'rgba(220,100,80,0.8)' : row.gap === 'Under-estimated' ? 'rgba(210,160,60,0.8)' : '#8FAF9F', padding: '7px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                {row.gap || '—'}
              </td>
            </tr>
          ))}
          {leadBleedMonthly > 0 && (
            <tr>
              <td colSpan={3} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.78rem', color: 'rgba(247,243,237,0.65)', padding: '7px 8px 7px 0' }}>
                Lead bleed (slow response)
              </td>
              <td style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.7rem', color: 'rgba(220,100,80,0.8)', padding: '7px 0' }}>
                {fmt(leadBleedMonthly)}/mo
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function BusinessAuditV2() {
  // ─── State ─────────────────────────────────────────────────────────────────
  const [industry, setIndustry]             = useState('')
  const [customIndustry, setCustomIndustry] = useState('')
  const [hourlyRate, setHourlyRate]         = useState(75)
  const [projectValue, setProjectValue]     = useState(0)
  const [leadsPerMonth, setLeadsPerMonth]   = useState(0)
  const [responseTime, setResponseTime]     = useState('')
  const [pillars, setPillars]               = useState(defaultPillarState)

  const pillarHandlers = useMemo(() => {
    const handlers = {}
    for (const p of PILLARS) {
      handlers[p.key] = (newState) => setPillars(prev => ({ ...prev, [p.key]: newState }))
    }
    return handlers
  }, [])

  // ─── Calculations ──────────────────────────────────────────────────────────
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

  const timeCostMonthly = useMemo(
    () => Object.values(pillarMonthly).reduce((a, b) => a + b, 0),
    [pillarMonthly]
  )

  const industryAverage = useMemo(
    () => Math.max(2500, totalMonthly * 2.4),
    [totalMonthly]
  )

  const hasResults = useMemo(() => PILLARS.some(p => pillars[p.key].hours > 0), [pillars])

  const webhookPayload = useMemo(() => buildPayload({
    contact: { businessName: '', fullName: '', email: '', phone: '' },
    context: { industry: customIndustry || industry, hourlyRate, leadsPerMonth, projectValue },
    pillars,
    totalMonthly,
    responseTimeBand: responseTime || null,
  }), [industry, customIndustry, hourlyRate, leadsPerMonth, projectValue, pillars, totalMonthly, responseTime])

  const isOther = industry === 'Other'

  // ─── Shared styles ─────────────────────────────────────────────────────────
  const sectionDividerStyle = { borderBottom: '1px solid rgba(143,175,159,0.1)', paddingBottom: '28px', marginBottom: '28px' }
  const sectionHeadStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.72rem',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'rgba(143,175,159,0.75)',
    margin: '0 0 16px',
  }
  const selectStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '10px',
    outline: 'none',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.88rem',
    color: '#F7F3ED',
    cursor: 'pointer',
    padding: '10px 12px',
    appearance: 'none',
    WebkitAppearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238FAF9F' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right 12px center',
    paddingRight: '32px',
  }

  return (
    <>
      <PageHead
        title="Business Audit V2 — UnderCurrent"
        description="Find the holes in your business. See exactly how much time and money you're losing across the five core areas of your operation."
      />

      <style>{`
        .audit-v2-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 2px;
          background: rgba(143,175,159,0.2);
          border-radius: 1px;
          outline: none;
          cursor: pointer;
          display: block;
          margin: 2px 0 10px;
        }
        .audit-v2-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #8FAF9F;
          cursor: pointer;
          transition: transform 0.15s ease;
        }
        .audit-v2-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
          background: #6B7C4A;
        }
        .audit-v2-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #8FAF9F;
          border: none;
          cursor: pointer;
        }
        .audit-v2-number-input::-webkit-outer-spin-button,
        .audit-v2-number-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        .audit-v2-number-input {
          -moz-appearance: textfield;
        }
        .btn-sage {
          display: inline-flex;
          align-items: center;
          border-radius: 9999px;
          border: 1px solid #8FAF9F;
          background: transparent;
          color: #F7F3ED;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          padding: 10px 24px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-sage:hover {
          background: #8FAF9F;
          color: #1C1C1A;
          transform: scale(1.03);
        }
        /* Dark override for PDFCaptureForm inside V2 */
        .audit-v2-pdf-wrapper input,
        .audit-v2-pdf-wrapper select {
          background: rgba(255,255,255,0.05) !important;
          border-color: rgba(255,255,255,0.12) !important;
          color: #F7F3ED !important;
        }
        .audit-v2-pdf-wrapper input::placeholder {
          color: rgba(247,243,237,0.3) !important;
        }
      `}</style>

      <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', overflowX: 'hidden', color: '#F7F3ED' }}>
        <ScrollProgressBar />
        <Navbar isSubPage />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section style={{
          height: '300px',
          background: 'linear-gradient(160deg, #0D0D0D 0%, #111111 40%, #1a2e24 70%, #2a3d30 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 24px',
        }}>
          {/* Subtle grid */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'linear-gradient(rgba(143,175,159,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(143,175,159,0.04) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            pointerEvents: 'none',
          }} />

          <p style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '0.68rem',
            letterSpacing: '0.22em',
            color: 'rgba(143,175,159,0.65)',
            margin: '0 0 14px',
            position: 'relative',
          }}>
            BUSINESS AUDIT
          </p>
          <h1 style={{ margin: 0, position: 'relative' }}>
            <span style={{
              display: 'block',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: '#F7F3ED',
              lineHeight: 1.0,
            }}>
              Find the holes
            </span>
            <span style={{
              display: 'block',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(2rem, 5vw, 3.8rem)',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: 'rgba(143,175,159,0.85)',
              lineHeight: 1.08,
              marginTop: '0.06em',
            }}>
              in your business.
            </span>
          </h1>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'rgba(247,243,237,0.45)',
            lineHeight: 1.65,
            maxWidth: '44ch',
            marginTop: '1.2rem',
            position: 'relative',
          }}>
            Five areas. Real numbers. See exactly where your business is bleeding time and money.
          </p>
        </section>

        {/* ── 2-column layout ─────────────────────────────────────────────── */}
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 480px), 1fr))',
          alignItems: 'start',
        }}>

          {/* ── LEFT COLUMN — Inputs ─────────────────────────────────────── */}
          <div style={{
            padding: 'clamp(32px, 5vw, 48px) clamp(24px, 4vw, 48px)',
            borderRight: '1px solid rgba(143,175,159,0.08)',
            overflowY: 'auto',
          }}>

            {/* Section 1: Business Context */}
            <div style={sectionDividerStyle}>
              <h3 style={sectionHeadStyle}>About your business</h3>

              {/* Industry */}
              <div style={{ marginBottom: '12px' }}>
                <label style={{
                  display: 'block',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(143,175,159,0.65)',
                  marginBottom: '6px',
                }}>
                  Industry
                </label>
                <select
                  value={industry}
                  onChange={e => setIndustry(e.target.value)}
                  style={{
                    ...selectStyle,
                    color: industry ? '#F7F3ED' : 'rgba(247,243,237,0.3)',
                  }}
                >
                  <option value="">Select your industry…</option>
                  {INDUSTRIES.map(ind => <option key={ind} value={ind} style={{ background: '#1a1a1a', color: '#F7F3ED' }}>{ind}</option>)}
                </select>
                {isOther && (
                  <input
                    type="text"
                    placeholder="Type your industry…"
                    value={customIndustry}
                    onChange={e => setCustomIndustry(e.target.value)}
                    style={{
                      marginTop: '8px',
                      width: '100%',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '10px',
                      outline: 'none',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.88rem',
                      color: '#F7F3ED',
                      padding: '10px 12px',
                      boxSizing: 'border-box',
                    }}
                  />
                )}
              </div>

              {/* Hourly rate */}
              <div style={{ marginBottom: '12px' }}>
                <NumberInputDark label="Your hourly rate" value={hourlyRate} onChange={setHourlyRate} placeholder="75" />
              </div>

              {/* Project value + leads per month */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <NumberInputDark label="Avg project value" value={projectValue} onChange={setProjectValue} placeholder="0" />
                <NumberInputDark label="Leads per month" value={leadsPerMonth} onChange={setLeadsPerMonth} prefix="#" placeholder="0" />
              </div>

              {/* Response time */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(143,175,159,0.65)',
                  marginBottom: '6px',
                }}>
                  Avg lead response time
                </label>
                <select
                  value={responseTime}
                  onChange={e => setResponseTime(e.target.value)}
                  style={{
                    ...selectStyle,
                    color: responseTime ? '#F7F3ED' : 'rgba(247,243,237,0.3)',
                  }}
                >
                  <option value="">Select response time…</option>
                  {RESPONSE_OPTIONS.map(opt => <option key={opt.value} value={opt.value} style={{ background: '#1a1a1a', color: '#F7F3ED' }}>{opt.label}</option>)}
                </select>
              </div>
            </div>

            {/* Sections 2–6: Five Pillars */}
            {PILLARS.map(pillar => (
              <PillarSection
                key={pillar.key}
                pillar={pillar}
                state={pillars[pillar.key]}
                onChange={pillarHandlers[pillar.key]}
              />
            ))}

          </div>

          {/* ── RIGHT COLUMN — Results (sticky) ─────────────────────────── */}
          <div style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflowY: 'auto',
            padding: 'clamp(32px, 5vw, 48px) clamp(24px, 4vw, 48px)',
            background: '#111111',
          }}>

            <h3 style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(143,175,159,0.65)',
              margin: '0 0 4px',
            }}>
              Estimated loss
            </h3>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.82rem',
              color: 'rgba(247,243,237,0.35)',
              margin: '0 0 20px',
              lineHeight: 1.5,
            }}>
              Based on your inputs — updated live as you fill in the form.
            </p>

            {/* Card 1 — Industry average */}
            <ResultCard
              title="What businesses typically lose"
              price={fmt(industryAverage)}
              subtitle="Per month — across typical SMB operations"
            />

            {/* Card 2 — Time cost */}
            <ResultCard
              title="Your time cost (manual labour)"
              price={fmt(timeCostMonthly)}
              priceColor="#8FAF9F"
              subtitle="Per month"
              secondaryLabel="Per year"
              secondaryValue={fmt(timeCostMonthly * 12)}
            />

            {/* Card 3 — Total estimated loss */}
            <ResultCard
              title="Your total estimated loss"
              price={fmt(totalMonthly)}
              priceColor="#F7F3ED"
              subtitle="Including time cost + lead bleed"
              gradient
              sageBorder
              secondaryLabel="Per year"
              secondaryValue={fmt(totalYearly)}
            />

            {/* Gap analysis */}
            <GapTable pillars={pillars} leadBleedMonthly={leadBleedMonthly} />

            {/* PDF Capture Form */}
            {hasResults && (
              <div style={{
                marginTop: '24px',
                paddingTop: '24px',
                borderTop: '1px solid rgba(143,175,159,0.1)',
              }}>
                <div className="audit-v2-pdf-wrapper">
                  <PDFCaptureForm payload={webhookPayload} />
                </div>
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>
    </>
  )
}
