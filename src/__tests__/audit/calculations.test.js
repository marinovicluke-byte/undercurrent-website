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
