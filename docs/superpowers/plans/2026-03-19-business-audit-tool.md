# Business Audit Tool Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/audit` page with a five-pillar business health calculator, live results block, and PDF capture form that POSTs to an N8N webhook.

**Architecture:** Pure calculation logic lives in `src/audit/calculations.js` (no React, fully testable). Static config (pillars, industries, multipliers) lives in `src/audit/config.js`. Four focused React components (`PillarCard`, `ResultsBlock`, `PDFCaptureForm`, plus the business context form inline in the page) are assembled in `src/pages/BusinessAudit.jsx`, which owns all state. The existing `/audit` route in `App.jsx` is rewired to this new page.

**Tech Stack:** React 19, Vite 8, Tailwind CSS 3, GSAP 3, Lucide React. Vitest added as devDependency for unit testing pure functions. No new production dependencies.

**Spec:** `docs/superpowers/specs/2026-03-19-business-audit-tool-design.md`

---

## File Map

| Action | Path | Responsibility |
|---|---|---|
| Create | `src/audit/config.js` | PILLARS array, INDUSTRIES list, RESPONSE_MULTIPLIERS map |
| Create | `src/audit/calculations.js` | Pure functions: calcRating, calcGap, calcPillarMonthly, calcLeadBleed, calcTotals, bandValue, buildPayload |
| Create | `src/audit/PillarCard.jsx` | Single expandable pillar card — health pills, main slider, sub-task sliders |
| Create | `src/audit/ResultsBlock.jsx` | Headline figures, gap analysis table, lead bleed row, pillar breakdown |
| Create | `src/audit/PDFCaptureForm.jsx` | Contact fields, validation, webhook POST, success/error states |
| Create | `src/pages/BusinessAudit.jsx` | Page root — Hero, business context form, pillar cards, results, PDF form |
| Create | `src/__tests__/audit/calculations.test.js` | Unit tests for all pure functions in calculations.js |
| Modify | `src/App.jsx` | Swap `/audit` import from MissedRevenueAudit → BusinessAudit |
| Modify | `vite.config.js` | Add vitest test config block |
| Modify | `package.json` | Add vitest devDependency + `"test"` script |
| Create | `.env.example` | Document VITE_N8N_AUDIT_WEBHOOK_URL |

---

## Task 1: Test infrastructure + static config

**Files:**
- Modify: `package.json`
- Modify: `vite.config.js`
- Create: `src/audit/config.js`
- Create: `src/__tests__/audit/calculations.test.js` (empty scaffold)

- [ ] **Step 1: Add vitest to devDependencies and add test script**

In `package.json`, add inside `"devDependencies"`:
```json
"vitest": "^2.0.0"
```
And add inside `"scripts"`:
```json
"test": "vitest run"
```

- [ ] **Step 2: Add vitest config to vite.config.js**

Replace the entire contents of `vite.config.js` with:
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'node',
  },
})
```

- [ ] **Step 3: Install vitest**

Run from `undercurrent/`:
```bash
npm install
```
Expected: installs vitest, no errors.

- [ ] **Step 4: Create src/audit/config.js**

```js
// ─── Response time multipliers (from spec) ────────────────────────────────────
// Sources: Hormozi $100M Leads, MIT/InsideSales, Harvard Business Review
export const RESPONSE_MULTIPLIERS = {
  'lt5':    1.00,  // < 5 min   — full conversion potential
  '5to30':  0.48,  // 5–30 min  — 8x drop (MIT/InsideSales)
  '30to60': 0.14,  // 30–60 min — 21x less likely (InsideSales)
  '1to4h':  0.08,  // 1–4 hrs
  '4to24h': 0.03,  // 4–24 hrs
  '24plus': 0.01,  // 24+ hrs   — 60x less likely (HBR)
}

export const RESPONSE_OPTIONS = [
  { value: 'lt5',    label: '< 5 min' },
  { value: '5to30',  label: '5–30 min' },
  { value: '30to60', label: '30–60 min' },
  { value: '1to4h',  label: '1–4 hrs' },
  { value: '4to24h', label: '4–24 hrs' },
  { value: '24plus', label: '24+ hrs' },
]

// ─── Five pillars ─────────────────────────────────────────────────────────────
export const PILLARS = [
  {
    key: 'customer_experience',
    label: 'Customer Experience',
    subtasks: [
      { key: 'responding_to_enquiries',    label: 'Responding to enquiries (email/SMS/DM)' },
      { key: 'followup_after_quote',       label: 'Follow-up after quote/proposal' },
      { key: 'postwork_followup_review',   label: 'Post-work follow-up & review collection' },
      { key: 'new_client_onboarding',      label: 'New client onboarding' },
      { key: 'complaints_support',         label: 'Handling complaints & support' },
    ],
  },
  {
    key: 'sales',
    label: 'Sales',
    subtasks: [
      { key: 'speed_to_lead_followup',   label: 'Speed-to-lead follow-up' },
      { key: 'proposal_quote_creation',  label: 'Proposal/quote creation' },
      { key: 'crm_pipeline_updates',     label: 'CRM updates & pipeline tracking' },
      { key: 'booking_discovery_calls',  label: 'Booking discovery calls' },
      { key: 'reengaging_cold_leads',    label: 'Re-engaging cold/dormant leads' },
    ],
  },
  {
    key: 'content_design',
    label: 'Content & Design',
    subtasks: [
      { key: 'writing_social_captions',      label: 'Writing social captions & posts' },
      { key: 'creating_graphics',            label: 'Creating graphics & visuals' },
      { key: 'writing_emails_newsletters',   label: 'Writing emails & newsletters' },
      { key: 'repurposing_content',          label: 'Repurposing content across platforms' },
      { key: 'scheduling_publishing',        label: 'Scheduling & publishing' },
    ],
  },
  {
    key: 'personal_systems',
    label: 'Personal Systems',
    subtasks: [
      { key: 'email_inbox_management', label: 'Email inbox management' },
      { key: 'calendar_scheduling',    label: 'Calendar & scheduling' },
      { key: 'meeting_notes_actions',  label: 'Meeting notes & action items' },
      { key: 'admin_document_prep',    label: 'Admin & document prep' },
      { key: 'internal_reporting',     label: 'Internal reporting & data entry' },
    ],
  },
  {
    key: 'finance',
    label: 'Finance',
    subtasks: [
      { key: 'sending_invoices',         label: 'Sending invoices' },
      { key: 'chasing_overdue_payments', label: 'Chasing overdue payments' },
      { key: 'bookkeeping_data_entry',   label: 'Bookkeeping data entry' },
      { key: 'expense_tracking',         label: 'Expense tracking' },
      { key: 'financial_reporting',      label: 'Financial reporting' },
    ],
  },
]

// ─── Industry list ────────────────────────────────────────────────────────────
export const INDUSTRIES = [
  'Trades & Construction',
  'Real Estate',
  'Health & Wellness',
  'Beauty & Personal Care',
  'Professional Services (Legal, Accounting, Finance)',
  'Marketing & Creative Agency',
  'Coaching & Consulting',
  'Hospitality & Events',
  'Retail & E-commerce',
  'Education & Training',
  'Technology & Software',
  'Property Management',
  'Other',
]

// ─── Default pillar state ─────────────────────────────────────────────────────
export function defaultPillarState() {
  const state = {}
  for (const pillar of PILLARS) {
    const subtasks = {}
    for (const st of pillar.subtasks) subtasks[st.key] = 0
    state[pillar.key] = { hours: 0, selfRating: null, subtasks }
  }
  return state
}
```

- [ ] **Step 5: Create empty test scaffold**

Create `src/__tests__/audit/calculations.test.js`:
```js
import { describe, it, expect } from 'vitest'
// Tests written in Task 2
```

- [ ] **Step 6: Run tests (expect 0 tests, no errors)**

```bash
npm test
```
Expected: `0 tests passed`, no import errors.

- [ ] **Step 7: Commit**

```bash
git add package.json vite.config.js src/audit/config.js src/__tests__/audit/calculations.test.js
git commit -m "feat: add audit config and vitest setup"
```

---

## Task 2: Pure calculation logic (TDD)

**Files:**
- Create: `src/audit/calculations.js`
- Modify: `src/__tests__/audit/calculations.test.js`

- [ ] **Step 1: Write failing tests**

Replace `src/__tests__/audit/calculations.test.js` with:

```js
import { describe, it, expect } from 'vitest'
import {
  calcRating,
  calcGap,
  calcPillarMonthly,
  calcLeadBleed,
  calcTotals,
  bandLeads,
  bandProjectValue,
  bandMonthlyLoss,
} from '../../audit/calculations.js'

describe('calcRating', () => {
  it('returns Green for hours < 2', () => {
    expect(calcRating(0)).toBe('Green')
    expect(calcRating(1.5)).toBe('Green')
    expect(calcRating(1.99)).toBe('Green')
  })
  it('returns Orange for hours >= 2 and <= 6', () => {
    expect(calcRating(2)).toBe('Orange')
    expect(calcRating(4)).toBe('Orange')
    expect(calcRating(6)).toBe('Orange')
  })
  it('returns Red for hours > 6', () => {
    expect(calcRating(6.01)).toBe('Red')
    expect(calcRating(10)).toBe('Red')
    expect(calcRating(40)).toBe('Red')
  })
})

describe('calcGap', () => {
  it('returns null when selfRating is null', () => {
    expect(calcGap(null, 'Red')).toBeNull()
  })
  it('returns null when hours is 0', () => {
    expect(calcGap('Green', 'Green', 0)).toBeNull()
  })
  it('detects Blind spot (self better than calc)', () => {
    // self=Green(3), calc=Red(1) → gap=2 → Blind spot
    expect(calcGap('Green', 'Red', 8)).toBe('Blind spot')
  })
  it('detects Accurate (self matches calc)', () => {
    expect(calcGap('Orange', 'Orange', 4)).toBe('Accurate')
  })
  it('detects Under-estimated (self worse than calc)', () => {
    // self=Red(1), calc=Green(3) → gap=-2 → Under-estimated
    expect(calcGap('Red', 'Green', 1)).toBe('Under-estimated')
  })
})

describe('calcPillarMonthly', () => {
  it('returns hours * rate * 4.33', () => {
    expect(calcPillarMonthly(10, 75)).toBeCloseTo(10 * 75 * 4.33)
  })
  it('returns 0 for 0 hours', () => {
    expect(calcPillarMonthly(0, 75)).toBe(0)
  })
})

describe('calcLeadBleed', () => {
  it('returns 0 when leads is 0', () => {
    expect(calcLeadBleed(0, 5000, '1to4h')).toBe(0)
  })
  it('returns 0 when projectValue is 0', () => {
    expect(calcLeadBleed(10, 0, '1to4h')).toBe(0)
  })
  it('returns 0 when responseTime is null (unselected)', () => {
    expect(calcLeadBleed(10, 5000, null)).toBe(0)
  })
  it('returns 0 when responseTime is lt5 (multiplier=1.00)', () => {
    expect(calcLeadBleed(10, 5000, 'lt5')).toBe(0)
  })
  it('calculates bleed correctly for 5to30 band', () => {
    // potential = 10 * 5000 * 0.20 = 10000
    // actual    = 10 * 5000 * (0.20 * 0.48) = 4800
    // bleed     = 5200
    expect(calcLeadBleed(10, 5000, '5to30')).toBeCloseTo(5200)
  })
  it('calculates bleed correctly for 24plus band', () => {
    // potential = 10 * 5000 * 0.20 = 10000
    // actual    = 10 * 5000 * (0.20 * 0.01) = 100
    // bleed     = 9900
    expect(calcLeadBleed(10, 5000, '24plus')).toBeCloseTo(9900)
  })
})

describe('calcTotals', () => {
  it('sums pillar monthly losses + lead bleed', () => {
    const pillarMonthly = { customer_experience: 100, sales: 200, content_design: 50, personal_systems: 75, finance: 25 }
    const leadBleed = 500
    const result = calcTotals(pillarMonthly, leadBleed)
    expect(result.totalMonthly).toBeCloseTo(950)
    expect(result.totalYearly).toBeCloseTo(950 * 12)
  })
  it('annualises using x12 consistently', () => {
    const pillarMonthly = { customer_experience: 1000, sales: 0, content_design: 0, personal_systems: 0, finance: 0 }
    const result = calcTotals(pillarMonthly, 0)
    expect(result.totalYearly).toBe(result.totalMonthly * 12)
  })
})

describe('bandLeads', () => {
  it('returns null for 0', () => { expect(bandLeads(0)).toBeNull() })
  it('bands 1–4 as "< 5"', () => { expect(bandLeads(1)).toBe('< 5'); expect(bandLeads(4)).toBe('< 5') })
  it('bands 5–20 as "5–20"', () => { expect(bandLeads(5)).toBe('5–20'); expect(bandLeads(20)).toBe('5–20') })
  it('bands 21–50 as "20–50"', () => { expect(bandLeads(21)).toBe('20–50'); expect(bandLeads(50)).toBe('20–50') })
  it('bands 51–100 as "50–100"', () => { expect(bandLeads(51)).toBe('50–100'); expect(bandLeads(100)).toBe('50–100') })
  it('bands 101+ as "100+"', () => { expect(bandLeads(101)).toBe('100+') })
})

describe('bandProjectValue', () => {
  it('returns null for 0', () => { expect(bandProjectValue(0)).toBeNull() })
  it('bands 1–499 as "< $500"', () => { expect(bandProjectValue(1)).toBe('< $500'); expect(bandProjectValue(499)).toBe('< $500') })
  it('bands 500–1999 as "$500–$2k"', () => { expect(bandProjectValue(500)).toBe('$500–$2k'); expect(bandProjectValue(1999)).toBe('$500–$2k') })
  it('bands 2000–9999 as "$2k–$10k"', () => { expect(bandProjectValue(2000)).toBe('$2k–$10k'); expect(bandProjectValue(9999)).toBe('$2k–$10k') })
  it('bands 10000–49999 as "$10k–$50k"', () => { expect(bandProjectValue(10000)).toBe('$10k–$50k'); expect(bandProjectValue(49999)).toBe('$10k–$50k') })
  it('bands 50000+ as "$50k+"', () => { expect(bandProjectValue(50000)).toBe('$50k+') })
})

describe('bandMonthlyLoss', () => {
  it('bands < 1000 as "< $1k"', () => { expect(bandMonthlyLoss(0)).toBe('< $1k'); expect(bandMonthlyLoss(999)).toBe('< $1k') })
  it('bands 1000–4999 as "$1k–$5k"', () => { expect(bandMonthlyLoss(1000)).toBe('$1k–$5k'); expect(bandMonthlyLoss(4999)).toBe('$1k–$5k') })
  it('bands 5000–19999 as "$5k–$20k"', () => { expect(bandMonthlyLoss(5000)).toBe('$5k–$20k'); expect(bandMonthlyLoss(19999)).toBe('$5k–$20k') })
  it('bands 20000+ as "$20k+"', () => { expect(bandMonthlyLoss(20000)).toBe('$20k+') })
})
```

- [ ] **Step 2: Run tests — confirm they all fail**

```bash
npm test
```
Expected: all tests FAIL with "Cannot find module '../../audit/calculations.js'"

- [ ] **Step 3: Implement calculations.js**

Create `src/audit/calculations.js`:

```js
import { RESPONSE_MULTIPLIERS } from './config.js'

const RATING_SCORE = { Red: 1, Orange: 2, Green: 3 }
const SCORE_RATING = { 1: 'Red', 2: 'Orange', 3: 'Green' }

// Returns 'Red' | 'Orange' | 'Green' based on hours/week for a single pillar
export function calcRating(hours) {
  if (hours < 2) return 'Green'
  if (hours <= 6) return 'Orange'
  return 'Red'
}

// Returns gap status string, or null if preconditions not met
// hours param is used to check > 0; calcRating is already computed externally
export function calcGap(selfRating, calcedRating, hours = 1) {
  if (!selfRating || hours === 0) return null
  const gap = RATING_SCORE[selfRating] - RATING_SCORE[calcedRating]
  if (gap > 0) return 'Blind spot'
  if (gap === 0) return 'Accurate'
  return 'Under-estimated'
}

// Monthly cost of time spent on a single pillar
export function calcPillarMonthly(hours, hourlyRate) {
  return hours * hourlyRate * 4.33
}

// Monthly revenue lost due to slow lead response
// Returns 0 if any input is missing/zero or response time is unset / lt5
export function calcLeadBleed(leadsPerMonth, projectValue, responseTimeBand) {
  if (!leadsPerMonth || !projectValue || !responseTimeBand) return 0
  const multiplier = RESPONSE_MULTIPLIERS[responseTimeBand] ?? 1
  const potential = leadsPerMonth * projectValue * 0.20
  const actual    = leadsPerMonth * projectValue * (0.20 * multiplier)
  return potential - actual
}

// Compute grand totals from per-pillar monthly losses + lead bleed
export function calcTotals(pillarMonthly, leadBleedMonthly) {
  const totalMonthly = Object.values(pillarMonthly).reduce((a, b) => a + b, 0) + leadBleedMonthly
  return {
    totalMonthly,
    totalYearly: totalMonthly * 12,
  }
}

// ─── Banding helpers ──────────────────────────────────────────────────────────

export function bandLeads(n) {
  if (!n || n <= 0) return null
  if (n <= 4)   return '< 5'
  if (n <= 20)  return '5–20'
  if (n <= 50)  return '20–50'
  if (n <= 100) return '50–100'
  return '100+'
}

export function bandProjectValue(n) {
  if (!n || n <= 0) return null
  if (n <= 499)   return '< $500'
  if (n <= 1999)  return '$500–$2k'
  if (n <= 9999)  return '$2k–$10k'
  if (n <= 49999) return '$10k–$50k'
  return '$50k+'
}

export function bandMonthlyLoss(n) {
  if (n < 1000)  return '< $1k'
  if (n < 5000)  return '$1k–$5k'
  if (n < 20000) return '$5k–$20k'
  return '$20k+'
}

// ─── Webhook payload builder ──────────────────────────────────────────────────

export function buildPayload({ contact, context, pillars, totalMonthly, responseTimeBand }) {
  const { industry, hourlyRate, leadsPerMonth, projectValue } = context
  const activePillars = {}

  for (const [key, pillar] of Object.entries(pillars)) {
    if (pillar.hours <= 0) continue
    const subtasks = {}
    for (const [stKey, stVal] of Object.entries(pillar.subtasks)) {
      subtasks[stKey] = stVal > 0 ? stVal : null
    }
    activePillars[key] = {
      hours_per_week: pillar.hours,
      self_rating: pillar.selfRating,
      calc_rating: calcRating(pillar.hours),
      subtasks,
    }
  }

  const submissionDate = new Date().toLocaleDateString('en-AU', { timeZone: 'Australia/Melbourne' })
    .split('/').reverse().join('-')  // converts dd/mm/yyyy → yyyy-mm-dd

  return {
    contact: {
      business_name: contact.businessName,
      full_name: contact.fullName,
      email: contact.email,
      phone: contact.phone.trim() || null,
    },
    benchmark: {
      industry,
      submission_date: submissionDate,
      hourly_rate: hourlyRate,
      response_time_band: responseTimeBand || null,
      leads_per_month_band: bandLeads(leadsPerMonth),
      project_value_band: bandProjectValue(projectValue),
      total_monthly_loss_band: bandMonthlyLoss(totalMonthly),
      pillars: activePillars,
    },
  }
}
```

- [ ] **Step 4: Run tests — confirm they all pass**

```bash
npm test
```
Expected: all tests PASS, 0 failures.

- [ ] **Step 5: Commit**

```bash
git add src/audit/calculations.js src/__tests__/audit/calculations.test.js
git commit -m "feat: add audit calculation logic with full test coverage"
```

---

## Task 3: PillarCard component

**Files:**
- Create: `src/audit/PillarCard.jsx`

- [ ] **Step 1: Create PillarCard.jsx**

```jsx
import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { calcRating } from './calculations.js'

const HEALTH_COLORS = {
  Red:    { bg: 'rgba(220,60,60,0.12)',  border: 'rgba(220,60,60,0.5)',  text: '#dc3c3c' },
  Orange: { bg: 'rgba(212,140,0,0.12)',  border: 'rgba(212,140,0,0.5)',  text: '#d48c00' },
  Green:  { bg: 'rgba(143,175,159,0.15)', border: 'rgba(143,175,159,0.6)', text: '#8FAF9F' },
}

function HealthPill({ rating, selected, onClick }) {
  const c = HEALTH_COLORS[rating]
  return (
    <button
      onClick={() => onClick(rating)}
      style={{
        padding: '4px 14px',
        borderRadius: '999px',
        border: `1.5px solid ${selected ? c.border : 'rgba(212,201,176,0.45)'}`,
        backgroundColor: selected ? c.bg : 'transparent',
        color: selected ? c.text : 'rgba(28,28,26,0.45)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: selected ? 600 : 400,
      }}
    >
      {rating}
    </button>
  )
}

function AuditSlider({ label, value, max, onChange, showValue = true }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: '#1C1C1A', opacity: 0.8 }}>
          {label}
        </span>
        {showValue && (
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#8FAF9F', minWidth: '52px', textAlign: 'right' }}>
            {value} hr{value !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={0.5}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="roi-slider"
      />
    </div>
  )
}

export default function PillarCard({ pillar, state, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const { hours, selfRating, subtasks } = state
  const calcedRating = calcRating(hours)

  const handleHours = (val) => onChange({ ...state, hours: val })
  const handleRating = (rating) => onChange({ ...state, selfRating: rating === selfRating ? null : rating })
  const handleSubtask = (key, val) => onChange({ ...state, subtasks: { ...subtasks, [key]: val } })

  return (
    <div style={{
      backgroundColor: '#FDFAF6',
      border: '1px solid rgba(212,201,176,0.7)',
      borderRadius: '20px',
      padding: 'clamp(20px, 3vw, 28px)',
      boxShadow: '0 2px 16px rgba(28,28,26,0.06)',
      transition: 'box-shadow 0.3s',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8FAF9F',
          margin: '0 0 10px',
        }}>
          {pillar.label}
        </p>

        {/* Health pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['Red', 'Orange', 'Green'].map(r => (
            <HealthPill key={r} rating={r} selected={selfRating === r} onClick={handleRating} />
          ))}
        </div>
      </div>

      {/* Main hours slider */}
      <div style={{ paddingBottom: '8px', borderBottom: expanded ? '1px solid rgba(212,201,176,0.35)' : 'none', marginBottom: expanded ? '16px' : '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#1C1C1A', fontWeight: 500 }}>
            Hours/week on this area
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: '#8FAF9F' }}>
            {hours} hr{hours !== 1 ? 's' : ''}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={40}
          step={0.5}
          value={hours}
          onChange={e => handleHours(Number(e.target.value))}
          className="roi-slider"
        />
      </div>

      {/* Sub-tasks (expanded) */}
      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {pillar.subtasks.map(st => (
            <AuditSlider
              key={st.key}
              label={st.label}
              value={subtasks[st.key]}
              max={20}
              onChange={val => handleSubtask(st.key, val)}
            />
          ))}
        </div>
      )}

      {/* Expand / collapse trigger */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.80rem',
          color: 'rgba(28,28,26,0.5)',
          transition: 'color 0.2s',
          marginTop: expanded ? '0' : '8px',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#8FAF9F'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,28,26,0.5)'}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Collapse' : 'Break it down'}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify no import errors (quick check)**

```bash
npm run build 2>&1 | head -20
```
Expected: no errors referencing PillarCard.

- [ ] **Step 3: Commit**

```bash
git add src/audit/PillarCard.jsx
git commit -m "feat: add PillarCard component with health pills and expandable sub-tasks"
```

---

## Task 4: ResultsBlock component

**Files:**
- Create: `src/audit/ResultsBlock.jsx`

- [ ] **Step 1: Create ResultsBlock.jsx**

```jsx
import { PILLARS } from './config.js'
import { calcRating, calcGap, calcPillarMonthly } from './calculations.js'

// Must be defined before the component (const is not hoisted)
const RESPONSE_LABEL = {
  lt5: '< 5 min', '5to30': '5–30 min', '30to60': '30–60 min',
  '1to4h': '1–4 hrs', '4to24h': '4–24 hrs', '24plus': '24+ hrs',
}

function fmt(n) {
  return n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const GAP_STYLES = {
  'Blind spot':       { icon: '⚠', color: '#d48c00' },
  'Accurate':         { icon: '✓', color: '#8FAF9F' },
  'Under-estimated':  { icon: '↑', color: 'rgba(28,28,26,0.45)' },
}

const RATING_DOT = {
  Red:    { bg: 'rgba(220,60,60,0.15)',   color: '#dc3c3c' },
  Orange: { bg: 'rgba(212,140,0,0.12)',   color: '#d48c00' },
  Green:  { bg: 'rgba(143,175,159,0.15)', color: '#8FAF9F' },
}

function RatingBadge({ rating }) {
  if (!rating) return <span style={{ color: 'rgba(28,28,26,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '0.78rem' }}>—</span>
  const s = RATING_DOT[rating]
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      backgroundColor: s.bg,
      color: s.color,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.72rem',
      fontWeight: 600,
    }}>
      {rating}
    </span>
  )
}

export default function ResultsBlock({ pillars, hourlyRate, leadsPerMonth, projectValue, responseTimeBand, totalMonthly, totalYearly, leadBleedMonthly }) {
  // Sort pillars by monthly loss descending, preserve original order for ties
  const sorted = PILLARS.map((p, originalIndex) => ({
    ...p,
    originalIndex,
    monthly: calcPillarMonthly(pillars[p.key].hours, hourlyRate),
    hours: pillars[p.key].hours,
    selfRating: pillars[p.key].selfRating,
    calcRating: calcRating(pillars[p.key].hours),
  })).sort((a, b) => b.monthly - a.monthly || a.originalIndex - b.originalIndex)

  return (
    <div>
      {/* Headline figures */}
      <div style={{
        backgroundColor: '#1C1C1A',
        borderRadius: '24px',
        padding: 'clamp(28px, 4vw, 48px)',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(143,175,159,0.7)',
          margin: '0 0 12px',
        }}>
          You're leaving an estimated
        </p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 600,
          color: '#F7F3ED',
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          ${fmt(totalMonthly)}<span style={{ fontSize: '0.45em', opacity: 0.6, fontWeight: 400 }}>/month</span>
        </p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(143,175,159,0.85)',
          margin: '0',
          letterSpacing: '-0.01em',
        }}>
          ${fmt(totalYearly)} / year
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(232,224,208,0.5)', margin: '12px 0 0' }}>
          on the table
        </p>
      </div>

      {/* Gap analysis table */}
      <div style={{
        backgroundColor: '#FDFAF6',
        border: '1px solid rgba(212,201,176,0.7)',
        borderRadius: '20px',
        padding: 'clamp(20px, 3vw, 32px)',
        marginBottom: '16px',
      }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8FAF9F',
          margin: '0 0 16px',
        }}>
          Health Assessment
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Area', 'Self-rated', 'Calculated', 'Status'].map(h => (
                  <th key={h} style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(28,28,26,0.4)',
                    textAlign: 'left',
                    padding: '0 12px 10px 0',
                    borderBottom: '1px solid rgba(212,201,176,0.4)',
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(p => {
                const gap = calcGap(p.selfRating, p.calcRating, p.hours)
                const gapStyle = gap ? GAP_STYLES[gap] : null
                return (
                  <tr key={p.key}>
                    <td style={{ padding: '10px 12px 10px 0', fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: '#1C1C1A', borderBottom: '1px solid rgba(212,201,176,0.25)' }}>
                      {p.label}
                    </td>
                    <td style={{ padding: '10px 12px 10px 0', borderBottom: '1px solid rgba(212,201,176,0.25)' }}>
                      <RatingBadge rating={p.selfRating} />
                    </td>
                    <td style={{ padding: '10px 12px 10px 0', borderBottom: '1px solid rgba(212,201,176,0.25)' }}>
                      <RatingBadge rating={p.hours > 0 ? p.calcRating : null} />
                    </td>
                    <td style={{ padding: '10px 0 10px 0', borderBottom: '1px solid rgba(212,201,176,0.25)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: gapStyle?.color ?? 'rgba(28,28,26,0.3)' }}>
                      {gapStyle ? `${gapStyle.icon} ${gap}` : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead bleed row (hidden when === 0) */}
      {leadBleedMonthly > 0 && (
        <div style={{
          backgroundColor: 'rgba(220,60,60,0.06)',
          border: '1px solid rgba(220,60,60,0.25)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '1.1rem' }}>⚡</span>
          <div>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: '#1C1C1A' }}>
              Lead bleed:{' '}
              <strong style={{ color: '#dc3c3c' }}>${fmt(leadBleedMonthly)}/mo</strong>
              {' '}— responding in{' '}
              <strong>{responseTimeBand ? RESPONSE_LABEL[responseTimeBand] : '—'}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Per-pillar cost breakdown */}
      <div style={{ marginTop: '24px' }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(28,28,26,0.4)',
          margin: '0 0 12px',
        }}>
          Cost breakdown — time lost per area
        </p>
        {sorted.filter(p => p.monthly > 0).map(p => (
          <div key={p.key} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#1C1C1A', opacity: 0.75 }}>{p.label}</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#6B7C4A' }}>
                ${fmt(p.monthly)}/mo
              </span>
            </div>
            <div style={{ height: '4px', backgroundColor: 'rgba(143,175,159,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min((p.monthly / (totalMonthly || 1)) * 100, 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8FAF9F, #6B7C4A)',
                borderRadius: '2px',
                transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

```

- [ ] **Step 2: Commit**

```bash
git add src/audit/ResultsBlock.jsx
git commit -m "feat: add ResultsBlock with gap analysis table and lead bleed row"
```

---

## Task 5: PDFCaptureForm component

**Files:**
- Create: `src/audit/PDFCaptureForm.jsx`

- [ ] **Step 1: Create PDFCaptureForm.jsx**

```jsx
import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function PDFCaptureForm({ onSubmit, payload }) {
  const [form, setForm] = useState({ businessName: '', fullName: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'Required'
    if (!form.fullName.trim())     errs.fullName = 'Required'
    if (!form.email.trim())        errs.email = 'Required'
    else if (!EMAIL_RE.test(form.email)) errs.email = 'Enter a valid email address'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')

    const webhookUrl = import.meta.env.VITE_N8N_AUDIT_WEBHOOK_URL
    const body = {
      ...payload,
      contact: {
        business_name: form.businessName.trim(),
        full_name:     form.fullName.trim(),
        email:         form.email.trim(),
        phone:         form.phone.trim() || null,
      },
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      onSubmit?.()
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${hasError ? 'rgba(220,60,60,0.5)' : 'rgba(212,201,176,0.6)'}`,
    backgroundColor: '#FDFAF6',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#1C1C1A',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8FAF9F',
    marginBottom: '6px',
  }

  const errStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.76rem',
    color: '#dc3c3c',
    marginTop: '4px',
  }

  if (status === 'success') {
    return (
      <div style={{
        backgroundColor: 'rgba(143,175,159,0.1)',
        border: '1.5px solid rgba(143,175,159,0.4)',
        borderRadius: '20px',
        padding: '32px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.15em', color: '#8FAF9F', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Report incoming
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#1C1C1A', margin: '0', letterSpacing: '-0.01em' }}>
          Report on its way — check your inbox.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#FDFAF6',
      border: '1px solid rgba(212,201,176,0.7)',
      borderRadius: '24px',
      padding: 'clamp(24px, 4vw, 40px)',
    }}>
      <p style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.68rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#8FAF9F',
        margin: '0 0 6px',
      }}>
        Get your full report
      </p>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
        fontWeight: 400,
        color: '#1C1C1A',
        margin: '0 0 24px',
        letterSpacing: '-0.02em',
      }}>
        See the full breakdown — sent straight to your inbox.
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '16px', marginBottom: '16px' }}>
          {[
            { field: 'businessName', label: 'Business name', type: 'text', placeholder: 'Acme Plumbing' },
            { field: 'fullName',     label: 'Your name',     type: 'text', placeholder: 'Jane Smith' },
            { field: 'email',        label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
            { field: 'phone',        label: 'Phone (optional)', type: 'tel', placeholder: '04XX XXX XXX' },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label style={labelStyle}>{label}</label>
              <input
                type={type}
                value={form[field]}
                onChange={set(field)}
                placeholder={placeholder}
                style={fieldStyle(!!errors[field])}
                onFocus={e => { e.target.style.borderColor = '#8FAF9F' }}
                onBlur={e => { e.target.style.borderColor = errors[field] ? 'rgba(220,60,60,0.5)' : 'rgba(212,201,176,0.6)' }}
              />
              {errors[field] && <p style={errStyle}>{errors[field]}</p>}
            </div>
          ))}
        </div>

        {status === 'error' && (
          <p style={{ ...errStyle, marginBottom: '16px', fontSize: '0.84rem' }}>
            Something went wrong — please try again or email us directly at{' '}
            <a href="mailto:hello@undercurrent.com.au" style={{ color: '#dc3c3c' }}>hello@undercurrent.com.au</a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-sage"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            opacity: status === 'loading' ? 0.6 : 1,
            cursor: status === 'loading' ? 'default' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Sending…' : 'Send me the full report'}
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/audit/PDFCaptureForm.jsx
git commit -m "feat: add PDFCaptureForm with validation and N8N webhook integration"
```

---

## Task 6: BusinessAudit page — assemble everything

**Files:**
- Create: `src/pages/BusinessAudit.jsx`

This file owns all state and wires up: Hero → business context form → PillarCards → ResultsBlock → PDFCaptureForm → Footer. It also defines WaterCanvas and Reveal (following existing page patterns).

- [ ] **Step 1: Create src/pages/BusinessAudit.jsx**

```jsx
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
                leadsPerMonth={leadsPerMonth}
                projectValue={projectValue}
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
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/BusinessAudit.jsx
git commit -m "feat: add BusinessAudit page — assembles all audit components"
```

---

## Task 7: Wire up routing and environment

**Files:**
- Modify: `src/App.jsx`
- Create: `.env.example`

- [ ] **Step 1: Update App.jsx — swap the /audit route**

In `src/App.jsx`, replace:
```js
const MissedRevenueAudit = lazy(() => import('./pages/MissedRevenueAudit'))
```
with:
```js
const BusinessAudit = lazy(() => import('./pages/BusinessAudit'))
```

And replace:
```jsx
<Route path="/audit" element={<Suspense fallback={null}><MissedRevenueAudit /></Suspense>} />
```
with:
```jsx
<Route path="/audit" element={<Suspense fallback={null}><BusinessAudit /></Suspense>} />
```

- [ ] **Step 2: Create .env.example**

Create `.env.example` at the root of `undercurrent/`:
```
# N8N webhook — handles both PDF send and benchmark data storage
VITE_N8N_AUDIT_WEBHOOK_URL=https://your-n8n-instance.com/webhook/audit
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx .env.example
git commit -m "feat: wire /audit route to BusinessAudit page"
```

---

## Task 8: Build verification and smoke test

- [ ] **Step 1: Run tests — all should pass**

```bash
npm test
```
Expected: all calculation tests PASS, 0 failures.

- [ ] **Step 2: Build for production**

```bash
npm run build
```
Expected: build completes with no errors. Warnings about bundle size are OK.

- [ ] **Step 3: Smoke test in dev server**

```bash
npm run dev
```
Then open `http://localhost:5173/audit` in a browser.

Check manually:
- [ ] Hero renders with gradient and water canvas
- [ ] Business context inputs work (industry select, number inputs, response time)
- [ ] "Other" industry shows free-text input
- [ ] Five pillar cards render — each has health pills, slider, expand button
- [ ] Expanding a card shows 5 sub-task sliders; multiple can be open at once
- [ ] Moving any pillar slider to > 0 shows the Results block
- [ ] Results headline shows monthly and yearly figures
- [ ] Gap analysis table renders with "—" for unrated pillars
- [ ] Setting leads + project value + response time shows lead bleed row
- [ ] Setting response time to "< 5 min" hides lead bleed row
- [ ] PDF capture form appears below results
- [ ] Form validation prevents submit with empty required fields
- [ ] Email format validation works
- [ ] Phone optional (can submit without it)

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete business audit tool — all tasks done"
```
