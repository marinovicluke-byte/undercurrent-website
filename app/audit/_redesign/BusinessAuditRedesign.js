'use client'

import { useState, useMemo, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { buildPayload } from '@/components/audit/calculations.js'
import {
  PILLARS, calcRating, calcGap, fmt, useAuditState,
  T, ACCENT, gradBg, accentShadow,
  Slider, HealthPill, NumberField, ResponsePills, IndustrySelect, GapTable, PreviewStyles,
} from './shared.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Stepped-wizard audit. Step 1 = context, 2..6 = pillars, 7 = summary.
// Matches homepage brand: rounded 14/16 cards, accent-tinted shadows,
// blue/sage primary, orange only for cost/loss signals.

const GLOW_WORDS = ['audit', 'leaks', 'find', 'bleeding']

function renderHeadline(text) {
  const tokens = String(text).split(/(\s+)/)
  const isGlow = (w) => GLOW_WORDS.includes(w.toLowerCase().replace(/[^a-z]/g, ''))
  return tokens.map((t, i) =>
    isGlow(t) ? <span key={i} className="uc-glow-word">{t}</span> : <span key={i}>{t}</span>
  )
}

// ─── Section label pattern (matches SectionShell.js) ────────────────────────
function StepHeader({ index, total, label, title, lede }) {
  return (
    <div style={{ marginBottom: 32, animation: 'uc-audit-fade-up 400ms ease both', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--text-muted)',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {String(index).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </span>
        <span style={{ width: 20, height: 1, background: 'var(--text-faint)' }} />
        <span className="label" style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      </div>

      <h2 style={{
        margin: '0 auto',
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 'clamp(28px, 3.2vw, 44px)',
        lineHeight: 1.08,
        letterSpacing: '-0.03em',
        color: 'var(--off-white)',
        textWrap: 'balance',
        maxWidth: 720,
      }}>
        {title}
      </h2>

      {lede && (
        <p style={{
          margin: '14px auto 0',
          maxWidth: 560,
          fontFamily: 'var(--font-body)',
          fontSize: 15,
          lineHeight: 1.5,
          color: 'var(--text-secondary)',
        }}>
          {lede}
        </p>
      )}
    </div>
  )
}

// ─── Progress rail ──────────────────────────────────────────────────────────
function ProgressRail({ steps, active }) {
  const a = ACCENT.blue
  const sage = ACCENT.sage
  return (
    <div style={{ display: 'flex', gap: 6, width: '100%', maxWidth: 620 }}>
      {steps.map((step, i) => {
        const isActive = i === active
        const isPast = i < active
        return (
          <div
            key={i}
            title={step}
            style={{
              flex: 1,
              height: 3,
              borderRadius: 999,
              background: isPast ? `rgb(${sage.light})` : isActive ? `rgb(${a.light})` : 'var(--text-faint)',
              boxShadow: isActive ? `0 0 12px rgba(${a.rgb}, 0.7)` : isPast ? `0 0 8px rgba(${sage.rgb}, 0.5)` : 'none',
              transition: 'all 300ms ease',
            }}
          />
        )
      })}
    </div>
  )
}

// ─── Context Step ───────────────────────────────────────────────────────────
function ContextStep({ s }) {
  return (
    <div>
      <StepHeader
        index={1} total={7} label="About your business"
        title="Tell us what we're working with."
        lede="Takes 30 seconds. We use this to pressure-test your numbers against industry benchmarks."
      />

      <div style={{ display: 'grid', gap: 12, maxWidth: 560, margin: '0 auto', textAlign: 'left' }}>
        <IndustrySelect industry={s.industry} setIndustry={s.setIndustry} customIndustry={s.customIndustry} setCustomIndustry={s.setCustomIndustry} />
        <NumberField label="Your hourly rate" value={s.hourlyRate} onChange={s.setHourlyRate} placeholder="75" accent="blue" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <NumberField label="Avg project value" value={s.projectValue} onChange={s.setProjectValue} placeholder="0" accent="blue" />
          <NumberField label="Leads per month" value={s.leadsPerMonth} onChange={s.setLeadsPerMonth} prefix="#" placeholder="0" accent="blue" />
        </div>
        <div style={{ marginTop: 4 }}>
          <label style={{ display: 'block', fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 10, textAlign: 'center' }}>
            Avg lead response time
          </label>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ResponsePills value={s.responseTime} onChange={s.setResponseTime} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Pillar Step ────────────────────────────────────────────────────────────
function PillarStep({ s, index, pillar, total }) {
  const state = s.pillars[pillar.key]
  const onChange = s.pillarHandlers[pillar.key]
  const calced = calcRating(state.hours)
  const gap = calcGap(state.selfRating, calced, state.hours)

  return (
    <div>
      <StepHeader
        index={index} total={total} label={`Pillar ${String(index - 1).padStart(2, '0')}`}
        title={pillar.label}
        lede="How well is this area running, and how much time does it eat each week?"
      />

      <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'left' }}>
        {/* Self-rating, three cards */}
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 10px', textAlign: 'center' }}>
            Self-rating
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: 10 }}>
            {[
              { key: 'Red',    blurb: 'Breaking / chaotic',   accent: 'red' },
              { key: 'Orange', blurb: 'Working but messy',    accent: 'orange' },
              { key: 'Green',  blurb: 'Smooth / automated',   accent: 'sage' },
            ].map(opt => {
              const sel = state.selfRating === opt.key
              const a = ACCENT[opt.accent]
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => onChange({ ...state, selfRating: sel ? null : opt.key })}
                  style={{
                    padding: '16px 18px',
                    textAlign: 'left',
                    borderRadius: 14,
                    background: sel ? gradBg(opt.accent) : T.bgCard,
                    border: `1px solid ${sel ? `rgba(${a.rgb}, 0.45)` : 'var(--text-faint)'}`,
                    boxShadow: sel ? accentShadow(opt.accent, 'hi') : 'none',
                    cursor: 'pointer',
                    transition: 'all 250ms ease',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {sel && (
                    <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `rgb(${a.rgb})`, borderRadius: '14px 14px 0 0' }} />
                  )}
                  <p style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 17,
                    fontWeight: 500,
                    color: sel ? `rgb(${a.light})` : 'var(--off-white)',
                    margin: '0 0 4px',
                    letterSpacing: '-0.01em',
                  }}>
                    {opt.key}
                  </p>
                  <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                    {opt.blurb}
                  </p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Hours */}
        <div style={{
          padding: '20px 22px 16px',
          borderRadius: 14,
          background: state.hours > 0 ? gradBg('blue') : T.bgCard,
          border: `1px solid ${state.hours > 0 ? `rgba(${ACCENT.blue.rgb}, 0.35)` : 'var(--text-faint)'}`,
          boxShadow: state.hours > 0 ? accentShadow('blue') : 'none',
          transition: 'all 300ms ease',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10, flexWrap: 'wrap', gap: 10 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: 0 }}>
              Hours per week
            </p>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 500,
              color: state.hours > 0 ? `rgb(${ACCENT.blue.light})` : 'var(--text-faint)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              {state.hours > 0 ? state.hours : '0'}
              <span style={{ fontSize: 12, color: 'var(--text-muted)', marginLeft: 6, letterSpacing: '0.08em', fontWeight: 500 }}>hrs</span>
            </span>
          </div>
          <Slider ariaLabel={`Hours for ${pillar.label}`} value={state.hours} onChange={v => onChange({ ...state, hours: v })} max={Math.max(40, state.hours)} accent="blue" />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)' }}>0</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)' }}>40+</span>
          </div>
        </div>

        {gap && (
          <div style={{
            marginTop: 12,
            padding: '12px 16px',
            borderRadius: 12,
            background: gap === 'Blind spot' ? `rgba(${ACCENT.red.rgb}, 0.1)` : gap === 'Under-estimated' ? `rgba(${ACCENT.orange.rgb}, 0.1)` : `rgba(${ACCENT.sage.rgb}, 0.1)`,
            border: '1px solid ' + (gap === 'Blind spot' ? `rgba(${ACCENT.red.rgb}, 0.32)` : gap === 'Under-estimated' ? `rgba(${ACCENT.orange.rgb}, 0.32)` : `rgba(${ACCENT.sage.rgb}, 0.32)`),
            animation: 'uc-audit-fade-up 300ms ease both',
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: gap === 'Blind spot' ? `rgb(${ACCENT.red.light})` : gap === 'Under-estimated' ? `rgb(${ACCENT.orange.light})` : `rgb(${ACCENT.sage.light})`,
              margin: '0 0 2px',
            }}>
              {gap}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.45 }}>
              {gap === 'Blind spot' ? `You rated this ${state.selfRating}, but the hours suggest ${calced}.` : gap === 'Under-estimated' ? `You rated this ${state.selfRating}, the hours suggest it's actually healthier (${calced}).` : `Self-rating matches the numbers.`}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Summary Step ───────────────────────────────────────────────────────────
function SummaryStep({ s, onOpenModal }) {
  return (
    <div>
      <StepHeader
        index={7} total={7} label="Your numbers"
        title="Here's what it's costing you."
        lede={s.hasResults ? 'Based on your inputs, this is the estimated monthly loss across time cost and lead bleed.' : 'Go back and fill in at least one pillar to see your numbers.'}
      />

      {/* Headline loss card — uses orange because it's the cost/warning signal */}
      <div style={{
        padding: 'clamp(28px, 4vw, 44px)',
        borderRadius: 16,
        background: s.hasResults ? gradBg('orange') : T.bgCard,
        border: `1px solid ${s.hasResults ? `rgba(${ACCENT.orange.rgb}, 0.45)` : 'var(--text-faint)'}`,
        boxShadow: s.hasResults ? accentShadow('orange', 'hi') : 'none',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
        maxWidth: 760,
        margin: '0 auto',
      }}>
        {s.hasResults && (
          <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `rgb(${ACCENT.orange.rgb})`, borderRadius: '16px 16px 0 0' }} />
        )}
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: s.hasResults ? `rgb(${ACCENT.orange.light})` : 'var(--text-muted)', margin: '0 0 10px' }}>
          Estimated monthly loss
        </p>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.6rem, 6.5vw, 5rem)', fontWeight: 500, color: s.hasResults ? 'var(--off-white)' : 'var(--text-muted)', margin: '0 0 8px', letterSpacing: '-0.04em', lineHeight: 0.95 }}>
          {s.hasResults ? fmt(s.totalMonthly) : '$0'}
        </p>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)', margin: 0 }}>
          {s.hasResults ? `${fmt(s.totalYearly)} per year.` : 'No data yet.'}
        </p>
      </div>

      {/* Breakdown tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12, marginTop: 12, marginBottom: 20, maxWidth: 760, marginLeft: 'auto', marginRight: 'auto' }}>
        <div style={{
          padding: 20,
          borderRadius: 14,
          background: s.timeCostMonthly > 0 ? gradBg('sage') : T.bgCard,
          border: `1px solid ${s.timeCostMonthly > 0 ? `rgba(${ACCENT.sage.rgb}, 0.35)` : 'var(--text-faint)'}`,
          boxShadow: s.timeCostMonthly > 0 ? accentShadow('sage') : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {s.timeCostMonthly > 0 && <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `rgb(${ACCENT.sage.rgb})`, borderRadius: '14px 14px 0 0' }} />}
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 10px' }}>Time cost</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, color: s.timeCostMonthly > 0 ? `rgb(${ACCENT.sage.light})` : 'var(--text-faint)', margin: 0, letterSpacing: '-0.02em' }}>{fmt(s.timeCostMonthly)}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0' }}>per month</p>
        </div>
        <div style={{
          padding: 20,
          borderRadius: 14,
          background: s.leadBleedMonthly > 0 ? gradBg('orange') : T.bgCard,
          border: `1px solid ${s.leadBleedMonthly > 0 ? `rgba(${ACCENT.orange.rgb}, 0.35)` : 'var(--text-faint)'}`,
          boxShadow: s.leadBleedMonthly > 0 ? accentShadow('orange') : 'none',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {s.leadBleedMonthly > 0 && <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `rgb(${ACCENT.orange.rgb})`, borderRadius: '14px 14px 0 0' }} />}
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 10px' }}>Lead bleed</p>
          <p style={{ fontFamily: 'var(--font-display)', fontSize: 26, fontWeight: 500, color: s.leadBleedMonthly > 0 ? `rgb(${ACCENT.orange.light})` : 'var(--text-faint)', margin: 0, letterSpacing: '-0.02em' }}>{s.leadBleedMonthly > 0 ? fmt(s.leadBleedMonthly) : '—'}</p>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: 'var(--text-muted)', margin: '3px 0 0' }}>per month</p>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <GapTable pillars={s.pillars} leadBleedMonthly={s.leadBleedMonthly} />
      </div>

      {s.hasResults && (
        <div style={{ marginTop: 28, display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center', justifyContent: 'center' }}>
          <button
            type="button"
            onClick={onOpenModal}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '16px 30px',
              borderRadius: 999,
              background: `rgba(${ACCENT.blue.rgb}, 0.22)`,
              color: 'var(--off-white)',
              border: `1px solid rgba(${ACCENT.blue.light}, 0.4)`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px -12px rgba(${ACCENT.blue.rgb}, 0.5)`,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 16,
              letterSpacing: '-0.01em',
              cursor: 'pointer',
              transition: 'all 200ms ease',
            }}
          >
            Get your full report
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M4 12 L20 12 M14 6 L20 12 L14 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-muted)', margin: 0 }}>
            Personalised breakdown sent to your inbox.
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Report Modal ───────────────────────────────────────────────────────────
function ReportModal({ isOpen, onClose, onSubmit, status, error }) {
  const [form, setForm] = useState({ businessName: '', fullName: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [focusedField, setFocusedField] = useState(null)

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'Required'
    if (!form.fullName.trim())     errs.fullName     = 'Required'
    if (!form.email.trim())        errs.email        = 'Required'
    else if (!EMAIL_RE.test(form.email)) errs.email  = 'Enter a valid email'
    return errs
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    onSubmit(form)
  }

  useEffect(() => {
    if (!isOpen) return
    const fn = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [isOpen, onClose])

  useEffect(() => {
    if (isOpen) { setForm({ businessName: '', fullName: '', email: '', phone: '' }); setErrors({}) }
  }, [isOpen])

  if (!isOpen) return null

  const inputStyle = (field) => ({
    width: '100%',
    padding: '12px 14px',
    borderRadius: 14,
    border: `1px solid ${errors[field] ? `rgba(${ACCENT.red.rgb}, 0.55)` : focusedField === field ? `rgba(${ACCENT.blue.rgb}, 0.55)` : 'var(--text-faint)'}`,
    background: T.bgCard,
    fontFamily: 'var(--font-body)',
    fontSize: 14,
    color: 'var(--off-white)',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 150ms ease',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: 'var(--font-display)',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'var(--text-muted)',
    marginBottom: 8,
  }

  const fields = [
    { field: 'businessName', label: 'Business name',    type: 'text',  placeholder: 'Acme Plumbing' },
    { field: 'fullName',     label: 'Your name',        type: 'text',  placeholder: 'Jane Smith' },
    { field: 'email',        label: 'Email address',    type: 'email', placeholder: 'jane@example.com' },
    { field: 'phone',        label: 'Phone (optional)', type: 'tel',   placeholder: '04XX XXX XXX' },
  ]

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(10,10,8,0.78)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        animation: 'uc-audit-fade-in 200ms ease both',
      }}
    >
      <div style={{
        background: T.bgCard,
        border: `1px solid rgba(${ACCENT.blue.rgb}, 0.35)`,
        borderRadius: 20,
        padding: 'clamp(28px, 5vw, 40px)',
        width: '100%',
        maxWidth: 460,
        position: 'relative',
        overflow: 'hidden',
        boxShadow: `0 24px 64px -20px rgba(0,0,0,0.7), 0 0 0 4px rgba(${ACCENT.blue.rgb}, 0.06)`,
        animation: 'uc-audit-fade-up 250ms ease both',
      }}>
        <div aria-hidden style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `rgb(${ACCENT.blue.rgb})`, borderRadius: '20px 20px 0 0' }} />

        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 14,
            right: 14,
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid var(--text-faint)',
            borderRadius: 999,
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--text-muted)',
            transition: 'color 150ms, border-color 150ms',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--off-white)'; e.currentTarget.style.borderColor = 'rgba(138,174,200,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--text-faint)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M6 6 L18 18 M6 18 L18 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" /></svg>
        </button>

        <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: `rgb(${ACCENT.blue.light})`, margin: '4px 0 10px' }}>
          Get your full report
        </p>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.3rem, 2.5vw, 1.55rem)',
          fontWeight: 500,
          letterSpacing: '-0.02em',
          color: 'var(--off-white)',
          margin: '0 0 22px',
          lineHeight: 1.15,
          textWrap: 'balance',
        }}>
          Your personalised breakdown, straight to your inbox.
        </h3>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {fields.map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label htmlFor={`uc-modal-${field}`} style={labelStyle}>{label}</label>
              <input
                id={`uc-modal-${field}`}
                type={type}
                value={form[field]}
                onChange={set(field)}
                onFocus={() => setFocusedField(field)}
                onBlur={() => setFocusedField(null)}
                placeholder={placeholder}
                style={inputStyle(field)}
                autoComplete={field === 'email' ? 'email' : field === 'phone' ? 'tel' : field === 'fullName' ? 'name' : 'organization'}
              />
              {errors[field] && (
                <p style={{ fontFamily: 'var(--font-body)', fontSize: 12, color: `rgb(${ACCENT.red.light})`, margin: '6px 0 0' }}>
                  {errors[field]}
                </p>
              )}
            </div>
          ))}

          {error && (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: `rgb(${ACCENT.red.light})`, margin: 0 }}>
              Something went wrong, please try again.
            </p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            style={{
              marginTop: 6,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              padding: '14px 24px',
              borderRadius: 999,
              background: `rgba(${ACCENT.blue.rgb}, 0.22)`,
              color: 'var(--off-white)',
              border: `1px solid rgba(${ACCENT.blue.light}, 0.4)`,
              boxShadow: `inset 0 1px 0 rgba(255,255,255,0.08), 0 12px 32px -12px rgba(${ACCENT.blue.rgb}, 0.5)`,
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: '-0.01em',
              cursor: status === 'loading' ? 'default' : 'pointer',
              opacity: status === 'loading' ? 0.6 : 1,
              transition: 'all 200ms ease',
              width: '100%',
            }}
          >
            {status === 'loading' ? 'Sending…' : 'Send my report'}
            {status !== 'loading' && (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 12 L20 12 M14 6 L20 12 L14 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function BusinessAuditRedesign() {
  const s = useAuditState()
  const [step, setStep] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [submitStatus, setSubmitStatus] = useState('idle')
  const [submitError, setSubmitError] = useState(false)
  const router = useRouter()

  const steps = useMemo(() => [
    { label: 'Context' },
    ...PILLARS.map(p => ({ label: p.label })),
    { label: 'Summary' },
  ], [])
  const total = steps.length

  const webhookPayload = useMemo(() => buildPayload({
    contact: { businessName: '', fullName: '', email: '', phone: '' },
    context: {
      industry: s.customIndustry || s.industry,
      hourlyRate: s.hourlyRate,
      leadsPerMonth: s.leadsPerMonth,
      projectValue: s.projectValue,
    },
    pillars: s.pillars,
    totalMonthly: s.totalMonthly,
    responseTimeBand: s.responseTime || null,
  }), [s.industry, s.customIndustry, s.hourlyRate, s.leadsPerMonth, s.projectValue, s.pillars, s.totalMonthly, s.responseTime])

  const handleSubmitReport = async (form) => {
    setSubmitStatus('loading')
    setSubmitError(false)

    const activePillars = {}
    for (const [key, pillar] of Object.entries(s.pillars)) {
      if (pillar.hours <= 0) continue
      activePillars[key] = {
        hours_per_week: pillar.hours,
        self_rating: pillar.selfRating,
        subtasks: pillar.subtasks,
      }
    }

    const reportData = {
      b: form.businessName.trim(),
      n: form.fullName.trim(),
      i: s.customIndustry || s.industry,
      r: s.hourlyRate,
      rt: s.responseTime || null,
      p: activePillars,
    }

    fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...webhookPayload,
        contact: {
          business_name: form.businessName.trim(),
          full_name: form.fullName.trim(),
          email: form.email.trim(),
          phone: form.phone.trim() || null,
        },
      }),
    }).catch(() => {})

    router.push('/audit/report?d=' + encodeURIComponent(btoa(JSON.stringify(reportData))))
  }

  const scrollToCalc = () => {
    document.getElementById('uc-audit-calc')?.scrollIntoView({ behavior: 'smooth' })
    setStep(0)
  }

  const next = () => setStep(i => Math.min(i + 1, total - 1))
  const prev = () => setStep(i => Math.max(i - 1, 0))

  let body
  if (step === 0) body = <ContextStep s={s} />
  else if (step === total - 1) body = <SummaryStep s={s} onOpenModal={() => setModalOpen(true)} />
  else body = <PillarStep s={s} index={step + 1} pillar={PILLARS[step - 1]} total={total} />

  return (
    <>
      <PreviewStyles />

      {/* ─── Hero (homepage parity) ─────────────────────────────────────── */}
      <section style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'calc(100vh - 80px)',
        overflow: 'hidden',
      }}>
        <div aria-hidden style={{
          position: 'absolute', right: '-20%', bottom: '-30%', width: '60%', height: '90%',
          pointerEvents: 'none',
          background: 'radial-gradient(circle at 70% 70%, rgba(138,174,200,0.28) 0%, rgba(106,141,173,0.12) 32%, transparent 68%)',
          filter: 'blur(38px)', zIndex: 1,
        }} />

        <div className="uc-audit-hero-spacer" style={{ padding: '0 var(--page-pad) 32px', position: 'relative', zIndex: 2, marginTop: '34vh' }}>
          <div style={{ maxWidth: 1280, width: '100%', boxSizing: 'border-box' }}>
            <h1 style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(48px, 6.4vw, 92px)',
              lineHeight: 1.02,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 1180,
            }}>
              {renderHeadline('The audit that finds your bleeding.')}
            </h1>

            <p style={{ margin: '28px 0 0', fontFamily: 'var(--font-body)', fontSize: 18, lineHeight: 1.45, color: 'var(--text-secondary)', maxWidth: 580 }}>
              Seven short steps. Answer honestly, we will show you exactly where the time and money are going.
            </p>

            <div style={{ marginTop: 40 }}>
              <button
                type="button"
                onClick={scrollToCalc}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 16,
                  padding: '16px 30px',
                  borderRadius: 999,
                  background: `rgba(${ACCENT.blue.rgb}, 0.22)`,
                  color: 'var(--off-white)',
                  border: `1px solid rgba(${ACCENT.blue.light}, 0.4)`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.25)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 18,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'all 200ms ease',
                }}
              >
                Start the audit
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 4 L12 20 M6 14 L12 20 L18 14" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Wizard ──────────────────────────────────────────────────────── */}
      <section
        id="uc-audit-calc"
        className="uc-audit-wizard-section"
        style={{
          background: 'var(--charcoal)',
          borderTop: '1px solid rgba(255,255,255,0.04)',
          padding: '48px var(--page-pad) 56px',
          marginTop: -48,
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 -24px 48px -24px rgba(0,0,0,0.6)',
        }}
      >
        <div style={{ maxWidth: 1040, margin: '0 auto' }}>

          {/* Progress + running total — stacked, centered */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, marginBottom: 36 }}>
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
              <ProgressRail steps={steps.map(x => x.label)} active={step} />
            </div>

            <div style={{
              padding: '8px 16px',
              borderRadius: 999,
              background: s.hasResults ? `rgba(${ACCENT.sage.rgb}, 0.14)` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${s.hasResults ? `rgba(${ACCENT.sage.rgb}, 0.35)` : 'var(--text-faint)'}`,
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: 10,
              whiteSpace: 'nowrap',
              transition: 'all 250ms ease',
            }}>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Running
              </span>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: s.hasResults ? `rgb(${ACCENT.sage.light})` : 'var(--text-faint)', letterSpacing: '-0.02em' }}>
                {fmt(s.totalMonthly)}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>/ mo</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ minHeight: 420 }}>
            {body}
          </div>

          {/* Nav */}
          <div style={{
            marginTop: 36,
            paddingTop: 20,
            borderTop: '1px solid var(--text-faint)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 14,
            flexWrap: 'wrap',
          }}>
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              style={{
                padding: '10px 20px',
                borderRadius: 999,
                border: '1px solid var(--text-faint)',
                background: 'transparent',
                color: step === 0 ? 'var(--text-faint)' : 'var(--text-secondary)',
                fontFamily: 'var(--font-display)',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '-0.01em',
                cursor: step === 0 ? 'not-allowed' : 'pointer',
                opacity: step === 0 ? 0.4 : 1,
                transition: 'all 180ms',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              ← Back
            </button>

            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontVariantNumeric: 'tabular-nums', color: 'var(--text-muted)', letterSpacing: '0.04em' }}>
              {String(step + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </span>

            {step < total - 1 ? (
              <button
                type="button"
                onClick={next}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 24px',
                  borderRadius: 999,
                  background: `rgba(${ACCENT.blue.rgb}, 0.22)`,
                  color: 'var(--off-white)',
                  border: `1px solid rgba(${ACCENT.blue.light}, 0.4)`,
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), 0 1px 3px rgba(0,0,0,0.25)',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'all 180ms',
                }}
              >
                {step === total - 2 ? 'See summary' : 'Next'}
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M4 12 L20 12 M14 6 L20 12 L14 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            ) : (
              <div style={{ width: 100 }} />
            )}
          </div>
        </div>
      </section>

      <ReportModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmitReport}
        status={submitStatus}
        error={submitError}
      />
    </>
  )
}
