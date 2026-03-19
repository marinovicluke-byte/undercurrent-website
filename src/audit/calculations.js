import { RESPONSE_MULTIPLIERS } from './config.js'

const RATING_SCORE = { Red: 1, Orange: 2, Green: 3 }

// Returns 'Red' | 'Orange' | 'Green' based on hours/week for a single pillar
// Scale: more hours = worse rating (Green means <2 hrs — automated/delegated, not necessarily healthy)
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
  const multiplier = RESPONSE_MULTIPLIERS[responseTimeBand]
  if (multiplier === undefined) return 0  // unknown band — treat as no data
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
      phone: contact.phone?.trim() || null,
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
