#!/usr/bin/env node
// filter-service-keywords.mjs
//
// Reads service-keywords.json, applies UC ICP filter rules to every PAA +
// Related Search, and writes curated `paaKept` + `relatedKept` arrays back to
// each service's cluster. Raw arrays (`paa`, `related`) are preserved for
// reference so future reruns of the populator don't lose data.
//
// ICP: Australian SMEs (trades, professional services, clinics, agencies,
// ecommerce). Not enterprise, not careers/training, not negative framing.

import fs from 'node:fs'

const BANK = '/Users/luke/UnderCurrent/Builds/Products/SEO/articles/data/undercurrent/service-keywords.json'

// ─── Skip patterns (case-insensitive substring match) ───────────────────────
const SKIP_PATTERNS = [
  // Jargon / numbered frameworks
  /\b\d+\s+(pillars|types|c's|d's|p's|stages|steps|rule)\b/i,
  /\b(4\s+types|5\s+c's|5\s+d's|4\s+pillars|7\s+steps|4\s+p's|5\s+p's)\b/i,
  // Negative framing
  /disadvantages/i,
  /replaced by ai/i,
  // Download / training / certification intent
  /\bpdf\b/i,
  /\bdownload\b/i,
  /\bcourse(s)?\b/i,
  /\bcertification\b/i,
  /\bcertificate\b/i,
  /\bdiploma\b/i,
  /\btafe\b/i,
  // Careers / jobs
  /\bjobs?\b/i,
  /\bsalary\b/i,
  /\bcareer\b/i,
  /\bvisa\b/i,
  /\bhiring\b/i,
  /\bsponsorship\b/i,
  /\bemployment\b/i,
  /\brecruit/i,
  // Brand monitoring / self-referential
  /\breviews?\b/i,
  /\breddit\b/i,
  /\bquora\b/i,
  /\baddress\b/i,
  // Enterprise jargon
  /\bforrester\b/i,
  /\bmckinsey\b/i,
  /\bgartner\b/i,
  /\berp\b/i,
  /\bfms\b/i,
  /\bsfa\b/i,
  // Off-topic geography/history (hit surface-discovery pre-rename, safe to keep)
  /gold.*australia/i,
  /prettiest town/i,
  /\bjan(uary)? 26\b/i,
  /1788/i,
  // Wrong category: iPhone shortcuts, smart home
  /\biphone\b/i,
  /\bsmart home\b/i,
  /\bhome automation\b/i,
  // Negative/generic patterns
  /\bmeaning\b.*\bcommissioning\b/i,
  /\bautonation\b/i,
  /\bcbsa\b/i,
  // Sales methodology / unrelated frameworks
  /\b5 c's of sales\b/i,
  /\b4 p's of customer experience\b/i,
  /\b4 types of cx\b/i,
  /inbound methodology/i,
  // Competitors (lead gen agencies we don't want to echo)
  /\bcallbox\b/i,
  /\blead express\b/i,
  /buy leads/i,
  /lead generation agency/i,
  /lead generation companies/i,
  // Sales intelligence is a different product category
  /sales intelligence/i,
  // Feedback on self
  /\bshowcase\b/i,
  // Geo mismatch (non-AU / non-relevant)
  /\bnew york\b/i,
  /\bnyc\b/i,
  /\busa\b/i,
  /\blondon\b/i,
  /\bcolumbus\b/i,
  /\bfigma\b/i,
  // Wrong verticals
  /\btravel website\b/i,
  /\bhotel booking\b/i,
  /\bhotel\b.*\bwebsite\b/i,
  // Price-shopping without buyer intent
  /how much does.*cost to (design|build)/i,
  /\$\d+ a day/i,
  /\$\d+ a year/i,
  /make \$\d+/i,
  // Tool-adjacent noise
  /\bdavinci resolve\b/i,
  /\bssis\b/i,
  /\bsql server\b/i,
  /\bedi\b/i,
  /\bpower automate\b/i,
  /microsoft (teams )?workflow/i,
  // Generic "5 golden rules" etc
  /\d+\s+(golden|basic|key|main)\s+rules/i,
  /\b3 second rule\b/i,
  // Shady / dubious practices
  /\bautoblogging\b/i,
  /how to trick/i,
  /cheat.*google/i,
  // Product ambiguity ("Instantly" = Instantly.ai product, not "instant lead response")
  /\binstantly (ai|app|accelerator|customer support|support email|free trial|free alternative)/i,
  // Careers hiding in "how much do X make"
  /\b(engineers?|developers?|designers?) make\b/i,
  /how much do\b.*\b(engineers?|developers?|designers?)/i,
  // Adsense / monetisation
  /\badsense\b/i,
  // Industry-specific wrong fit
  /\bconstruction website developer\b/i,
  // Generic integer templates that aren't a query
  /^\w+\.io(?!\s)/i,
  // Tool product pages we're not promoting
  /\brepurpose\.?io\b/i,
  /\bblog2social\b/i,
  /\blindy ai\b/i,
  // Duplicates of primary across services
  /^what is \w+(?: \w+)* examples?$/i,
]

// ─── Strong keeps (always retain unless also hits skip) ─────────────────────
const STRONG_KEEP_PATTERNS = [
  /small business/i,
  /\bsme\b/i,
  /\baustralia\b/i,
  /\bmelbourne\b/i,
  /\bsydney\b/i,
  /\bbrisbane\b/i,
  /\btrades?\b/i,
  /\btradie/i,
  /\bplumber/i,
  /\belectrician/i,
  /\bbuilder/i,
  /\bconsult/i,
  /\bagenc/i,
  /\bclinic/i,
  /\bcrm\b/i,
  /\bxero\b/i,
  /\bquickbooks\b/i,
  /\bmyob\b/i,
  /\bhubspot\b/i,
  /\bpipedrive\b/i,
  /\bshopify\b/i,
  /\bgmail\b/i,
  /\boutlook\b/i,
  /\bai overview/i,
  /\bchatgpt\b/i,
  /\bperplexity\b/i,
  /\banswer engine/i,
  /\bseo\b/i,
  /\baeo\b/i,
  /\bgeo\b/i,
  /\binstant response/i,
  /\binvoice/i,
  /\breferral/i,
  /\bonboard/i,
  /\breview request/i,
  /\bpayment follow/i,
  /\blead follow/i,
  /\bmeeting book/i,
  /\binbox/i,
]

function shouldSkip(text) {
  if (!text || typeof text !== 'string') return true
  return SKIP_PATTERNS.some(p => p.test(text))
}

function isStrongKeep(text) {
  if (!text || typeof text !== 'string') return false
  return STRONG_KEEP_PATTERNS.some(p => p.test(text))
}

function filterItems(items, primaryQuery) {
  const kept = []
  const skipped = []
  const primaryLc = (primaryQuery || '').toLowerCase()
  for (const raw of items) {
    const t = String(raw).trim()
    if (!t) continue
    // Exact duplicate of primary query - skip
    if (t.toLowerCase() === primaryLc) { skipped.push(t); continue }
    if (shouldSkip(t)) { skipped.push(t); continue }
    // Default keep if contains strong signal OR is a direct on-topic query
    if (isStrongKeep(t)) { kept.push(t); continue }
    // Neutral - keep (gentle default; easier to remove than to add back)
    kept.push(t)
  }
  return { kept, skipped }
}

// ─── Run ────────────────────────────────────────────────────────────────────
const bank = JSON.parse(fs.readFileSync(BANK, 'utf8'))

const summary = []
for (const [slug, cluster] of Object.entries(bank)) {
  const paaResult = filterItems(cluster.paa || [], cluster.primary)
  const relResult = filterItems(cluster.related || [], cluster.primary)
  cluster.paaKept      = paaResult.kept
  cluster.paaSkipped   = paaResult.skipped
  cluster.relatedKept  = relResult.kept
  cluster.relatedSkipped = relResult.skipped
  summary.push({
    slug,
    paa:     { raw: cluster.paa.length,     kept: paaResult.kept.length,     pct: pct(paaResult.kept.length, cluster.paa.length) },
    related: { raw: cluster.related.length, kept: relResult.kept.length,     pct: pct(relResult.kept.length, cluster.related.length) },
  })
}

fs.writeFileSync(BANK, JSON.stringify(bank, null, 2))

console.log('\nService'.padEnd(40), 'PAA  raw→kept (%)'.padEnd(22), 'Rel  raw→kept (%)')
console.log('-'.repeat(90))
for (const s of summary) {
  const paaStr = `${s.paa.raw} → ${s.paa.kept} (${s.paa.pct}%)`
  const relStr = `${s.related.raw} → ${s.related.kept} (${s.related.pct}%)`
  console.log(s.slug.padEnd(40), paaStr.padEnd(22), relStr)
}
const totalRaw  = summary.reduce((a, s) => a + s.paa.raw + s.related.raw, 0)
const totalKept = summary.reduce((a, s) => a + s.paa.kept + s.related.kept, 0)
console.log('-'.repeat(90))
console.log('TOTAL'.padEnd(40), `${totalRaw} raw → ${totalKept} kept (${pct(totalKept, totalRaw)}%)`)
console.log(`\nWrote filtered bank to ${BANK}`)

function pct(num, den) { return den ? Math.round(100 * num / den) : 0 }
