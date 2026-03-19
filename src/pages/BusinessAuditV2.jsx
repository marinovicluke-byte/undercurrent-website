import { useState, useMemo, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
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
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
          fontWeight: 700,
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
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
            fontWeight: 700,
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

// ─── ReportModal ──────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function ReportModal({ isOpen, onClose, payload }) {
  const [form, setForm] = useState({ businessName: '', fullName: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle')

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'Required'
    if (!form.fullName.trim())     errs.fullName     = 'Required'
    if (!form.email.trim())        errs.email        = 'Required'
    else if (!EMAIL_RE.test(form.email)) errs.email  = 'Enter a valid email'
    if (!form.phone.trim())        errs.phone        = 'Required'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')
    const webhookUrl = import.meta.env.VITE_N8N_AUDIT_WEBHOOK_URL
    if (!webhookUrl && import.meta.env.DEV) console.warn('[ReportModal] VITE_N8N_AUDIT_WEBHOOK_URL not set')
    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...payload,
          contact: {
            business_name: form.businessName.trim(),
            full_name: form.fullName.trim(),
            email: form.email.trim(),
            phone: form.phone.trim(),
          },
        }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) { setForm({ businessName: '', fullName: '', email: '', phone: '' }); setErrors({}); setStatus('idle') }
  }, [isOpen])

  if (!isOpen) return null

  const inputStyle = (hasErr) => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: '10px',
    border: `1.5px solid ${hasErr ? 'rgba(220,80,60,0.6)' : 'rgba(143,175,159,0.2)'}`,
    background: 'rgba(255,255,255,0.05)',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#F7F3ED',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#8FAF9F',
    marginBottom: '6px',
  }

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(0,0,0,0.82)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div style={{
        background: '#141414',
        border: '1px solid rgba(143,175,159,0.2)',
        borderRadius: '24px',
        padding: 'clamp(28px, 5vw, 44px)',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
      }}>
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '20px',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'rgba(247,243,237,0.4)',
            fontSize: '1.2rem',
            lineHeight: 1,
            padding: '4px',
            transition: 'color 0.15s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#F7F3ED'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(247,243,237,0.4)'}
        >
          ✕
        </button>

        {status === 'success' ? (
          <div style={{ textAlign: 'center', padding: '16px 0' }}>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.68rem', letterSpacing: '0.2em', color: '#8FAF9F', margin: '0 0 12px', textTransform: 'uppercase' }}>
              Report sent
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F7F3ED', margin: '0 0 10px', lineHeight: 1.2 }}>
              Check your inbox.
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: 'rgba(247,243,237,0.45)', margin: 0, lineHeight: 1.6 }}>
              Your full audit report is on its way — we'll be in touch shortly.
            </p>
          </div>
        ) : (
          <>
            <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.62rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.7)', margin: '0 0 6px', textTransform: 'uppercase' }}>
              Get your full report
            </p>
            <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.2rem, 2.5vw, 1.7rem)', fontWeight: 700, letterSpacing: '-0.02em', color: '#F7F3ED', margin: '0 0 24px', lineHeight: 1.2 }}>
              We'll send your personalised breakdown straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { field: 'businessName', label: 'Business name',  type: 'text',  placeholder: 'Acme Plumbing' },
                { field: 'fullName',     label: 'Your name',      type: 'text',  placeholder: 'Jane Smith' },
                { field: 'email',        label: 'Email address',  type: 'email', placeholder: 'jane@example.com' },
                { field: 'phone',        label: 'Phone number',   type: 'tel',   placeholder: '04XX XXX XXX' },
              ].map(({ field, label, type, placeholder }) => (
                <div key={field}>
                  <label htmlFor={`modal-${field}`} style={labelStyle}>{label}</label>
                  <input
                    id={`modal-${field}`}
                    type={type}
                    value={form[field]}
                    onChange={set(field)}
                    placeholder={placeholder}
                    style={inputStyle(!!errors[field])}
                    onFocus={e => { e.target.style.borderColor = '#8FAF9F' }}
                    onBlur={e => { e.target.style.borderColor = errors[field] ? 'rgba(220,80,60,0.6)' : 'rgba(143,175,159,0.2)' }}
                  />
                  {errors[field] && (
                    <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.74rem', color: 'rgba(220,80,60,0.9)', margin: '4px 0 0' }}>
                      {errors[field]}
                    </p>
                  )}
                </div>
              ))}

              {status === 'error' && (
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(220,80,60,0.9)', margin: '0' }}>
                  Something went wrong — please try again.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  marginTop: '4px',
                  padding: '14px 28px',
                  borderRadius: '9999px',
                  border: '1.5px solid #8FAF9F',
                  background: status === 'loading' ? 'rgba(143,175,159,0.1)' : 'rgba(143,175,159,0.12)',
                  color: '#8FAF9F',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  cursor: status === 'loading' ? 'default' : 'pointer',
                  opacity: status === 'loading' ? 0.6 : 1,
                  transition: 'all 0.2s',
                  width: '100%',
                }}
                onMouseEnter={e => { if (status !== 'loading') { e.currentTarget.style.background = '#8FAF9F'; e.currentTarget.style.color = '#0D0D0D' } }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(143,175,159,0.12)'; e.currentTarget.style.color = '#8FAF9F' }}
              >
                {status === 'loading' ? 'Sending…' : 'Send me the full report'}
              </button>
            </form>
          </>
        )}
      </div>
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
  const [modalOpen, setModalOpen]           = useState(false)

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
        /* Scroll bounce animation */
        @keyframes audit-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
      `}</style>

      <div style={{ backgroundColor: '#0D0D0D', minHeight: '100vh', overflowX: 'hidden', color: '#F7F3ED' }}>
        <ScrollProgressBar />
        <Navbar isSubPage />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section style={{
          minHeight: '420px',
          background: 'linear-gradient(160deg, #0D0D0D 0%, #111111 40%, #1a2e24 70%, #2a3d30 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '100px 24px 60px',
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

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.5,
            animation: 'audit-bounce 2s ease-in-out infinite',
          }}>
            <span style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.2em',
              color: '#8FAF9F',
              textTransform: 'uppercase',
            }}>scroll</span>
            <ChevronDown size={16} color="#8FAF9F" strokeWidth={1.5} />
          </div>
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

              {/* Response time — pill buttons */}
              <div>
                <label style={{
                  display: 'block',
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '0.62rem',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(143,175,159,0.65)',
                  marginBottom: '10px',
                }}>
                  Avg lead response time
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {RESPONSE_OPTIONS.map(opt => {
                    const active = responseTime === opt.value
                    return (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setResponseTime(active ? '' : opt.value)}
                        style={{
                          height: '32px',
                          padding: '0 14px',
                          borderRadius: '9999px',
                          border: active ? '1px solid #8FAF9F' : '1px solid rgba(255,255,255,0.15)',
                          background: active ? 'rgba(143,175,159,0.15)' : 'transparent',
                          color: active ? '#8FAF9F' : 'rgba(247,243,237,0.45)',
                          fontFamily: 'DM Mono, monospace',
                          fontSize: '0.72rem',
                          letterSpacing: '0.04em',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {opt.label}
                      </button>
                    )
                  })}
                </div>
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

            {/* ── Headline: total estimated loss ── */}
            <div style={{
              padding: 'clamp(20px, 3vw, 28px)',
              borderRadius: '20px',
              background: hasResults ? 'linear-gradient(135deg, rgba(143,175,159,0.1) 0%, rgba(107,124,74,0.08) 100%)' : 'rgba(255,255,255,0.03)',
              border: `1.5px solid ${hasResults ? 'rgba(143,175,159,0.3)' : 'rgba(255,255,255,0.06)'}`,
              marginBottom: '14px',
              transition: 'all 0.3s ease',
            }}>
              <p style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '0.58rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'rgba(143,175,159,0.6)',
                margin: '0 0 8px',
              }}>
                Estimated monthly loss
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: hasResults ? '#F7F3ED' : 'rgba(247,243,237,0.18)',
                margin: '0 0 4px',
                lineHeight: 1,
              }}>
                {hasResults ? fmt(totalMonthly) : '$0'}
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.82rem',
                color: 'rgba(247,243,237,0.38)',
                margin: 0,
              }}>
                {hasResults ? `${fmt(totalYearly)} per year` : 'Fill in your details to see your numbers'}
              </p>
            </div>

            {/* ── Breakdown tiles ── */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '20px' }}>
              {/* Time cost tile */}
              <div style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(143,175,159,0.5)', margin: '0 0 8px' }}>
                  Time cost
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700, color: '#8FAF9F', margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                  {fmt(timeCostMonthly)}
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(247,243,237,0.3)', margin: 0 }}>
                  per month
                </p>
              </div>
              {/* Lead bleed tile */}
              <div style={{
                padding: '16px',
                borderRadius: '14px',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}>
                <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.55rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(143,175,159,0.5)', margin: '0 0 8px' }}>
                  Lead bleed
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(1.1rem, 2vw, 1.5rem)', fontWeight: 700, color: leadBleedMonthly > 0 ? 'rgba(220,100,80,0.85)' : 'rgba(247,243,237,0.18)', margin: '0 0 2px', letterSpacing: '-0.02em' }}>
                  {leadBleedMonthly > 0 ? fmt(leadBleedMonthly) : '—'}
                </p>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.72rem', color: 'rgba(247,243,237,0.3)', margin: 0 }}>
                  per month
                </p>
              </div>
            </div>

            {/* Gap analysis */}
            <GapTable pillars={pillars} leadBleedMonthly={leadBleedMonthly} />

            {/* CTA button */}
            {hasResults && (
              <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid rgba(143,175,159,0.1)' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  style={{
                    width: '100%',
                    padding: '16px 28px',
                    borderRadius: '9999px',
                    border: '1.5px solid #8FAF9F',
                    background: 'rgba(143,175,159,0.1)',
                    color: '#8FAF9F',
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#8FAF9F'; e.currentTarget.style.color = '#0D0D0D' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(143,175,159,0.1)'; e.currentTarget.style.color = '#8FAF9F' }}
                >
                  Get your full report →
                </button>
                <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.75rem', color: 'rgba(247,243,237,0.28)', margin: '10px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
                  We'll send a personalised breakdown straight to your inbox.
                </p>
              </div>
            )}

          </div>
        </div>

        <Footer />
      </div>

      <ReportModal isOpen={modalOpen} onClose={() => setModalOpen(false)} payload={webhookPayload} />
    </>
  )
}
