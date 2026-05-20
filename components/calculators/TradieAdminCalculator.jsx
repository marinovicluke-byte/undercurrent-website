'use client'

// Admin Time Recovered calculator — embedded in the tradie-admin article via
// the <!-- calc:tradie-admin --> token, but self-contained so it can also be
// dropped onto any page (e.g. /roi) with a plain import. No props, no state
// beyond the three inputs, no network calls.
import { useState } from 'react'
import styles from './Calculator.module.css'

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

// A typical full-time billable week — lets us express admin hours as
// "weeks of paperwork a year" (matches the host article's framing).
const FULL_WEEK = 40
// Automation usually claws back 6-8 hrs of a typical 10-hr admin load.
const RECOVERY = 0.7

const FIELDS = [
  { key: 'hours', id: 'tradie-calc-hours', label: 'Hours per week on admin',
    min: 0, max: 30, step: 0.5, unit: 'hrs/wk' },
  { key: 'rate', id: 'tradie-calc-rate', label: 'Your hourly billable rate (AUD)',
    min: 30, max: 200, step: 5, unit: '/hr', prefix: '$' },
  { key: 'weeks', id: 'tradie-calc-weeks', label: 'Working weeks per year',
    min: 30, max: 52, step: 1, unit: 'weeks' },
]

export default function TradieAdminCalculator() {
  const [values, setValues] = useState({ hours: 10, rate: 90, weeks: 48 })

  // Clamp to max while typing so outputs stay sane; defer the min-clamp to
  // blur, so multi-digit values above the minimum can be typed digit by digit.
  function handleInput(field, raw) {
    const n = raw === '' ? 0 : Number(raw)
    if (Number.isNaN(n)) return
    setValues(v => ({ ...v, [field.key]: Math.min(field.max, n) }))
  }
  function handleBlur(field) {
    setValues(v => ({ ...v, [field.key]: Math.max(field.min, v[field.key]) }))
  }

  const { hours, rate, weeks } = values
  const weekly = hours * rate
  const annual = weekly * weeks
  const adminWeeks = (hours * weeks) / FULL_WEEK
  const recovered = annual * RECOVERY

  return (
    <div className={styles.calculator} role="group" aria-label="Admin cost calculator">
      <div className={styles.head}>
        <span className={styles.eyebrow}>Interactive</span>
        <h3 className={styles.title}>Work out your own admin cost</h3>
        <span className={styles.intro}>
          Drag the sliders or type your numbers. The maths updates live.
        </span>
      </div>

      <div className={styles.fields}>
        {FIELDS.map(field => {
          const value = values[field.key]
          const sliderValue = Math.max(field.min, Math.min(field.max, value))
          const pct = ((sliderValue - field.min) / (field.max - field.min)) * 100
          return (
            <div className={styles.field} key={field.key}>
              <label className={styles.label} htmlFor={field.id}>
                <span className={styles.labelText}>{field.label}</span>
                <span className={styles.badge}>
                  {field.prefix || ''}{value}{field.unit === '/hr' ? '' : ' '}{field.unit}
                </span>
              </label>
              <div className={styles.inputRow}>
                <input
                  className={styles.slider}
                  id={field.id}
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={sliderValue}
                  onChange={e => handleInput(field, e.target.value)}
                  aria-label={field.label}
                  style={{ '--pct': `${pct}%` }}
                />
                <input
                  className={styles.number}
                  type="number"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={value}
                  onChange={e => handleInput(field, e.target.value)}
                  onBlur={() => handleBlur(field)}
                  aria-label={`${field.label} — type a value`}
                />
              </div>
            </div>
          )
        })}
      </div>

      <div className={styles.outputs} aria-live="polite">
        <div className={styles.row}>
          <span className={styles.rowLabel}>Weekly cost</span>
          <span className={styles.rowValue}>{AUD.format(weekly)}</span>
        </div>
        <div className={styles.primary}>
          <span className={styles.primaryLabel}>Annual cost in lost billable time</span>
          <span className={styles.primaryValue}>{AUD.format(annual)}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>That is pure paperwork</span>
          <span className={styles.rowValue}>{adminWeeks.toFixed(1)} weeks a year</span>
        </div>
      </div>

      <div className={styles.recovery}>
        <span className={styles.recoveryLabel}>
          Automate the routine work and you claw back around 70%
        </span>
        <span className={styles.recoveryValue}>{AUD.format(recovered)} back a year</span>
      </div>
    </div>
  )
}
