'use client'

import { useMemo, useState } from 'react'
import { PILLARS, INDUSTRIES, RESPONSE_OPTIONS, defaultPillarState } from '@/components/audit/config.js'
import { calcPillarMonthly, calcLeadBleed, calcTotals, calcRating, calcGap } from '@/components/audit/calculations.js'

export { PILLARS, INDUSTRIES, RESPONSE_OPTIONS, calcRating, calcGap }

export function fmt(n) {
  if (!n || n <= 0) return '$0'
  if (n >= 1000) return '$' + Math.round(n).toLocaleString()
  return '$' + Math.round(n)
}

export function useAuditState() {
  const [industry, setIndustry] = useState('')
  const [customIndustry, setCustomIndustry] = useState('')
  const [hourlyRate, setHourlyRate] = useState(75)
  const [projectValue, setProjectValue] = useState(0)
  const [leadsPerMonth, setLeadsPerMonth] = useState(0)
  const [responseTime, setResponseTime] = useState('')
  const [pillars, setPillars] = useState(defaultPillarState)

  const pillarHandlers = useMemo(() => {
    const h = {}
    for (const p of PILLARS) h[p.key] = (s) => setPillars(prev => ({ ...prev, [p.key]: s }))
    return h
  }, [])

  const pillarMonthly = useMemo(() => {
    const o = {}
    for (const p of PILLARS) o[p.key] = calcPillarMonthly(pillars[p.key].hours, hourlyRate)
    return o
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

  return {
    industry, setIndustry,
    customIndustry, setCustomIndustry,
    hourlyRate, setHourlyRate,
    projectValue, setProjectValue,
    leadsPerMonth, setLeadsPerMonth,
    responseTime, setResponseTime,
    pillars, setPillars, pillarHandlers,
    pillarMonthly, leadBleedMonthly,
    totalMonthly, totalYearly, timeCostMonthly,
    hasResults,
  }
}

// ─── Accent palette (matches homepage ACCENTS) ──────────────────────────────
export const ACCENT = {
  blue:   { rgb: '106, 141, 173', light: '138, 174, 200' },
  sage:   { rgb: '143, 175, 159', light: '168, 196, 184' },
  orange: { rgb: '224, 122, 85',  light: '236, 158, 128' },
  red:    { rgb: '212, 86, 74',   light: '232, 120, 105' },
}

export const T = {
  bgDeep: 'var(--bg-deep)',       // #121210
  bgMain: 'var(--charcoal)',      // #1C1C1A
  bgCard: 'rgba(22,22,20,0.96)',  // matches WhyAutomation card bg
  offWhite: 'var(--off-white)',
  textPri: 'var(--text-primary)',
  textSec: 'var(--text-secondary)',
  textMute: 'var(--text-muted)',
  textFaint: 'var(--text-faint)',
}

// Gradient background for an active card (matches ServicesOverview)
export const gradBg = (accent) => `linear-gradient(180deg, rgba(${ACCENT[accent].rgb}, 0.09) 0%, rgba(18,18,16,0.7) 100%)`

// Accent-tinted shadow (matches WhyAutomation)
export const accentShadow = (accent, strength = 'normal') => {
  const c = ACCENT[accent].rgb
  if (strength === 'hi')   return `0 0 0 4px rgba(${c}, 0.08), 0 20px 60px -30px rgba(${c}, 0.45)`
  return `0 12px 40px -22px rgba(${c}, 0.45)`
}

// ─── Primitives ─────────────────────────────────────────────────────────────

export function Slider({ value, onChange, max = 40, step = 0.5, ariaLabel, accent = 'sage' }) {
  return (
    <input
      type="range"
      aria-label={ariaLabel}
      className={`uc-audit-slider uc-audit-slider--${accent}`}
      min={0}
      max={max}
      step={step}
      value={value}
      onChange={e => onChange(Number(e.target.value))}
    />
  )
}

export function HealthPill({ label, selected, onClick }) {
  const map = {
    Red:    'red',
    Orange: 'orange',
    Green:  'sage',
  }
  const a = ACCENT[map[label]]
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        height: 30,
        padding: '0 16px',
        borderRadius: 999,
        border: selected ? `1px solid rgba(${a.rgb}, 0.55)` : `1px solid var(--text-faint)`,
        background: selected ? `rgba(${a.rgb}, 0.14)` : 'transparent',
        color: selected ? `rgb(${a.light})` : 'var(--text-muted)',
        fontFamily: 'var(--font-display)',
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 200ms ease',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </button>
  )
}

export function NumberField({ label, value, onChange, prefix = '$', placeholder = '0', accent = 'blue' }) {
  const a = ACCENT[accent]
  return (
    <div style={{
      padding: '12px 14px',
      borderRadius: 14,
      background: T.bgCard,
      border: `1px solid var(--text-faint)`,
      transition: 'border-color 180ms ease, box-shadow 180ms ease',
    }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.14em',
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        marginBottom: 6,
      }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
          fontWeight: 500,
          color: `rgb(${a.light})`,
          lineHeight: 1,
        }}>{prefix}</span>
        <input
          type="number"
          className="uc-audit-number"
          value={value || ''}
          min={0}
          placeholder={placeholder}
          onChange={e => onChange(Math.max(0, Number(e.target.value)))}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
            fontWeight: 500,
            color: 'var(--off-white)',
            width: '100%',
            caretColor: `rgb(${a.rgb})`,
            letterSpacing: '-0.02em',
          }}
        />
      </div>
    </div>
  )
}

export function ResponsePills({ value, onChange }) {
  const a = ACCENT.blue
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
      {RESPONSE_OPTIONS.map(opt => {
        const active = value === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(active ? '' : opt.value)}
            style={{
              height: 30,
              padding: '0 13px',
              borderRadius: 999,
              border: active ? `1px solid rgba(${a.rgb}, 0.55)` : `1px solid var(--text-faint)`,
              background: active ? `rgba(${a.rgb}, 0.14)` : 'transparent',
              color: active ? `rgb(${a.light})` : 'var(--text-muted)',
              fontFamily: 'var(--font-display)',
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: '0.02em',
              cursor: 'pointer',
              transition: 'all 180ms ease',
              whiteSpace: 'nowrap',
              flexShrink: 0,
            }}
          >
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

export function IndustrySelect({ industry, setIndustry, customIndustry, setCustomIndustry }) {
  const isOther = industry === 'Other'
  return (
    <div>
      <label style={{
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-muted)',
        marginBottom: 10,
      }}>
        Industry
      </label>
      <select
        value={industry}
        onChange={e => setIndustry(e.target.value)}
        style={{
          width: '100%',
          background: T.bgCard,
          border: `1px solid var(--text-faint)`,
          borderRadius: 14,
          outline: 'none',
          fontFamily: 'var(--font-body)',
          fontSize: 14,
          color: industry ? 'var(--off-white)' : 'var(--text-faint)',
          cursor: 'pointer',
          padding: '11px 34px 11px 14px',
          appearance: 'none',
          WebkitAppearance: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238AAEC8' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
      >
        <option value="">Select your industry…</option>
        {INDUSTRIES.map(ind => <option key={ind} value={ind} style={{ background: '#1C1C1A', color: '#FAF9F5' }}>{ind}</option>)}
      </select>
      {isOther && (
        <input
          type="text"
          placeholder="Type your industry…"
          value={customIndustry}
          onChange={e => setCustomIndustry(e.target.value)}
          style={{
            marginTop: 10,
            width: '100%',
            background: T.bgCard,
            border: `1px solid var(--text-faint)`,
            borderRadius: 14,
            outline: 'none',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--off-white)',
            padding: '14px 16px',
            boxSizing: 'border-box',
          }}
        />
      )}
    </div>
  )
}

// ─── GapTable ───────────────────────────────────────────────────────────────
export function GapTable({ pillars, leadBleedMonthly }) {
  const rows = PILLARS.map(p => {
    const st = pillars[p.key]
    if (st.hours <= 0) return null
    const calced = calcRating(st.hours)
    const gap = calcGap(st.selfRating, calced, st.hours)
    return { label: p.label, self: st.selfRating, calced, gap }
  }).filter(Boolean)

  if (rows.length === 0 && leadBleedMonthly <= 0) return null

  const ratingColor = (r) => {
    const key = r === 'Red' ? 'red' : r === 'Orange' ? 'orange' : 'sage'
    return `rgb(${ACCENT[key].light})`
  }
  const gapColor = (g) => {
    if (g === 'Blind spot') return `rgb(${ACCENT.red.light})`
    if (g === 'Under-estimated') return `rgb(${ACCENT.orange.light})`
    return `rgb(${ACCENT.sage.light})`
  }

  return (
    <div style={{ marginTop: 20 }}>
      <p style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--text-muted)', margin: '0 0 12px' }}>
        Gap analysis
      </p>
      <div style={{ borderRadius: 14, background: T.bgCard, border: '1px solid var(--text-faint)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              {['Area', 'Self', 'Calc', 'Status'].map(h => (
                <th key={h} style={{ fontFamily: 'var(--font-display)', fontSize: 10, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', textAlign: 'left', padding: '14px 14px 10px', background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--text-faint)' }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.label}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, color: r.self ? ratingColor(r.self) : 'var(--text-faint)', padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.self || '—'}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, color: ratingColor(r.calced), padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.calced}</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, color: gapColor(r.gap), padding: '12px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>{r.gap || '—'}</td>
              </tr>
            ))}
            {leadBleedMonthly > 0 && (
              <tr>
                <td colSpan={3} style={{ fontFamily: 'var(--font-body)', fontSize: 14, color: 'var(--text-secondary)', padding: '12px 14px' }}>Lead bleed (slow response)</td>
                <td style={{ fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 600, color: `rgb(${ACCENT.orange.light})`, padding: '12px 14px' }}>{fmt(leadBleedMonthly)}/mo</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// ─── Global styles ──────────────────────────────────────────────────────────
export function PreviewStyles() {
  return (
    <style>{`
      .uc-audit-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 3px;
        background: rgba(138,174,200,0.2);
        border-radius: 999px;
        outline: none;
        cursor: pointer;
        display: block;
        margin: 6px 0 10px;
      }
      .uc-audit-slider--sage { background: rgba(168,196,184,0.22); }
      .uc-audit-slider--blue { background: rgba(138,174,200,0.22); }
      .uc-audit-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: rgb(138,174,200);
        cursor: pointer;
        transition: transform 150ms ease, box-shadow 150ms ease;
        box-shadow: 0 2px 10px rgba(106,141,173,0.5);
      }
      .uc-audit-slider--sage::-webkit-slider-thumb { background: rgb(168,196,184); box-shadow: 0 2px 10px rgba(143,175,159,0.5); }
      .uc-audit-slider::-webkit-slider-thumb:hover {
        transform: scale(1.15);
      }
      .uc-audit-slider::-moz-range-thumb {
        width: 18px;
        height: 18px;
        border-radius: 50%;
        background: rgb(138,174,200);
        border: none;
        cursor: pointer;
      }
      .uc-audit-slider--sage::-moz-range-thumb { background: rgb(168,196,184); }
      .uc-audit-number::-webkit-outer-spin-button,
      .uc-audit-number::-webkit-inner-spin-button { -webkit-appearance: none; margin: 0; }
      .uc-audit-number { -moz-appearance: textfield; }
      @keyframes uc-audit-pulse {
        0%,100% { opacity: 0.75; }
        50% { opacity: 1; }
      }
      @keyframes uc-audit-fade-up {
        from { opacity: 0; transform: translateY(10px); }
        to   { opacity: 1; transform: translateY(0); }
      }
      @keyframes uc-audit-fade-in {
        from { opacity: 0; }
        to   { opacity: 1; }
      }
      @media (max-width: 720px) {
        .uc-audit-hero-spacer { margin-top: 22vh !important; }
        .uc-audit-wizard-section {
          border-top-left-radius: 24px !important;
          border-top-right-radius: 24px !important;
          margin-top: -32px !important;
          padding-top: 36px !important;
          padding-bottom: 48px !important;
        }
      }
    `}</style>
  )
}
