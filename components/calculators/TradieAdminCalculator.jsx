'use client'

// Admin Time Recovered calculator — embedded in the tradie-admin article via
// the <!-- calc:tradie-admin --> token, but self-contained so it can also be
// dropped onto any page (e.g. /roi) with a plain import. No props, no state
// beyond the three inputs, no network calls.
//
// Set as the Worked block's interactive cousin (app/styles/article-blocks.css):
// the inputs are the lines of the sum with their signs, the weekly cost the
// running line, the annual cost the answer in the hero's stripes. The server
// renders the default sum as text, so it reads without JavaScript; the inputs
// come alive once it loads.
import { useEffect, useRef, useState } from 'react'
import styles from './Calculator.module.css'

const AUD = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

// A typical full-time billable week — lets us express admin hours as
// "weeks of paperwork a year" (matches the host article's framing).
const FULL_WEEK = 40

const FIELDS = [
  { key: 'hours', id: 'tradie-calc-hours', label: 'Hours per week on admin',
    min: 0, max: 30, step: 0.5, unit: 'hrs/wk' },
  { key: 'rate', id: 'tradie-calc-rate', label: 'Your hourly billable rate (AUD)',
    min: 30, max: 200, step: 5, unit: '/hr', prefix: '$' },
  { key: 'weeks', id: 'tradie-calc-weeks', label: 'Working weeks per year',
    min: 30, max: 52, step: 1, unit: 'weeks' },
]

// the sign before each line, drawn as the Worked block's cross (turned for times, two hairlines
// for equals); the character stays in the text for screen readers
function Op({ kind }) {
  if (!kind) return <span className={styles.opNone} aria-hidden="true" />
  return <span className={`ucb__op ucb__op--${kind} ${styles.op}`}>{kind === 'eq' ? '=' : '×'}</span>
}

export default function TradieAdminCalculator() {
  const [values, setValues] = useState({ hours: 10, rate: 90, weeks: 48 })
  // false on the server and until hydration: the inputs show the defaults but can't be changed,
  // so with JavaScript off the block reads as the default worked sum
  const [live, setLive] = useState(false)
  useEffect(() => setLive(true), [])

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

  // the answer, announced politely once the reader stops moving (not on every slider step)
  const [said, setSaid] = useState('')
  const first = useRef(true)
  useEffect(() => {
    if (first.current) { first.current = false; return }
    const t = setTimeout(() => setSaid(`Annual cost in lost billable time ${AUD.format(annual)}. That is pure paperwork: ${adminWeeks.toFixed(1)} weeks a year.`), 700)
    return () => clearTimeout(t)
  }, [annual, adminWeeks])

  const line = (field, op) => {
    const value = values[field.key]
    const sliderValue = Math.max(field.min, Math.min(field.max, value))
    const p = (sliderValue - field.min) / (field.max - field.min)
    return (
      <div className={`${styles.line} ${styles.input}`} key={field.key}>
        <label className={styles.label} htmlFor={field.id + '-n'}>{field.label}</label>
        <Op kind={op} />
        <span className={styles.val}>
          {field.prefix && <span className={styles.pre}>{field.prefix}</span>}
          {live ? (
            <input
              className={styles.num}
              id={field.id + '-n'}
              type="number"
              inputMode="decimal"
              min={field.min}
              max={field.max}
              step={field.step}
              value={value}
              onChange={e => handleInput(field, e.target.value)}
              onBlur={() => handleBlur(field)}
            />
          ) : (
            // until the script runs (or with it off) the figure is plain text, the same size
            <span className={styles.num} id={field.id + '-n'}>{value}</span>
          )}
          <span className={styles.unit}>{field.unit}</span>
        </span>
        <input
          className={styles.range}
          id={field.id}
          type="range"
          min={field.min}
          max={field.max}
          step={field.step}
          value={sliderValue}
          disabled={!live}
          onChange={e => handleInput(field, e.target.value)}
          aria-label={field.label}
          style={{ '--p': p }}
        />
      </div>
    )
  }

  return (
    <div className={styles.calculator} role="group" aria-labelledby="tradie-calc-title">
      <p className={styles.eyebrow}>Interactive</p>
      <h3 className={styles.title} id="tradie-calc-title">Work out your own admin cost</h3>
      <p className={styles.intro}>Drag the sliders or type your numbers. The maths updates live.</p>

      <div className={styles.sum}>
        {line(FIELDS[0])}
        {line(FIELDS[1], 'times')}
        <div className={`${styles.line} ${styles.running}`}>
          <span className={styles.label}>Weekly cost</span>
          <Op kind="eq" />
          <span className={styles.val}><span className={styles.fig}>{AUD.format(weekly)}</span></span>
        </div>
        {line(FIELDS[2], 'times')}
        <div className={styles.answer}>
          <div className={`${styles.line} ${styles.total}`}>
            <span className={styles.label}>Annual cost in lost billable time</span>
            <Op kind="eq" />
            <span className={styles.val}><span className={styles.big}>{AUD.format(annual)}</span></span>
          </div>
          <p className={styles.note}>
            <span>That is pure paperwork</span>
            <span className={styles.noteVal}>{adminWeeks.toFixed(1)} weeks a year</span>
          </p>
        </div>
      </div>
      <p className={styles.sr} aria-live="polite">{said}</p>
    </div>
  )
}
