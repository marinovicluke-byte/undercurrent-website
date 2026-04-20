#!/usr/bin/env node
// populate-service-keywords.mjs
//
// One-off and re-runnable script. For every service in lib/data/services.js,
// calls Serper three times (primary + 2 variants), extracts People Also Ask,
// Related Searches, organic-title entities, and Knowledge Graph, then writes
// a per-slug cluster to SEO/articles/data/undercurrent/service-keywords.json.
//
// Consumed by the /undercurrent-copy skill when rewriting a specific service:
// only that slug's cluster is loaded into context, not the whole bank.
//
// Run:
//   node scripts/populate-service-keywords.mjs            # all slugs
//   node scripts/populate-service-keywords.mjs <slug>     # one slug
//
// Reads SERPER_API_KEY from:
//   /Users/luke/UnderCurrent/Builds/Products/SEO/active/seo-outreach/.env

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT      = path.resolve(__dirname, '..')
const ENV_FILE  = '/Users/luke/UnderCurrent/Builds/Products/SEO/active/seo-outreach/.env'
const OUT_FILE  = '/Users/luke/UnderCurrent/Builds/Products/SEO/articles/data/undercurrent/service-keywords.json'

// ─── Env loader (no external deps) ──────────────────────────────────────────
function loadEnv(envPath) {
  const txt = fs.readFileSync(envPath, 'utf8')
  const env = {}
  for (const line of txt.split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/)
    if (m) env[m[1]] = m[2].replace(/^['"]|['"]$/g, '')
  }
  return env
}

const env = loadEnv(ENV_FILE)
const SERPER_KEY = env.SERPER_API_KEY
if (!SERPER_KEY) {
  console.error('SERPER_API_KEY not found in', ENV_FILE)
  process.exit(1)
}

// ─── Service slug → query variants ──────────────────────────────────────────
// Each service yields: (1) three generic discovery queries derived from its
// name, plus (2) any `seedQueries` authored on the service entry — these are
// narrow, UC-specific phrases tuned to the real offering. Deduplicated.
//
// We do NOT pass gl=au to Serper. gl=au suppresses peopleAlsoAsk +
// relatedSearches in the response. We keep results locale-neutral and include
// "australia" in the generic set to surface AU-flavoured organic results.
function buildQueries(service) {
  const name = (service.displayName || slugToName(service.slug)).toLowerCase()
  const base = name.replace(/\s*&\s*/g, ' and ')
  const generic = [
    `what is ${base}`,
    `how does ${base} work for small business`,
    `${base} australia`,
  ]
  const seeds = Array.isArray(service.seedQueries) ? service.seedQueries : []
  // Dedupe while preserving order. Generic first, then seeds.
  const seen = new Set()
  const out  = []
  for (const q of [...generic, ...seeds]) {
    const k = q.trim().toLowerCase()
    if (k && !seen.has(k)) { seen.add(k); out.push(q) }
  }
  return out
}

function slugToName(slug) {
  return slug.replace(/-melbourne$/, '').split('-')
    .map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
}

// ─── Serper call ────────────────────────────────────────────────────────────
async function serper(query) {
  const res = await fetch('https://google.serper.dev/search', {
    method: 'POST',
    headers: {
      'X-API-KEY': SERPER_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ q: query, hl: 'en', num: 10 }),
  })
  if (!res.ok) {
    throw new Error(`Serper ${res.status}: ${await res.text()}`)
  }
  return res.json()
}

// ─── Extractors ─────────────────────────────────────────────────────────────
function extractFromResponse(r) {
  const paa = (r.peopleAlsoAsk || []).map(x => x.question).filter(Boolean)
  const related = (r.relatedSearches || []).map(x => x.query).filter(Boolean)
  const titles = (r.organic || []).map(x => x.title).filter(Boolean)
  const kg = r.knowledgeGraph
  const entities = []
  if (kg) {
    if (kg.title) entities.push(kg.title)
    if (kg.type)  entities.push(kg.type)
    for (const attr of Object.values(kg.attributes || {})) {
      if (typeof attr === 'string') entities.push(attr)
    }
  }
  const aio = r.answerBox ? (r.answerBox.answer || r.answerBox.snippet || '').slice(0, 240) : null
  return { paa, related, titles, entities, aio }
}

// ─── Dynamic import of SERVICES from the site ───────────────────────────────
async function loadServices() {
  const mod = await import(path.join(ROOT, 'lib/data/services.js'))
  return mod.SERVICES
}

// ─── Main ────────────────────────────────────────────────────────────────────
async function main() {
  const SERVICES = await loadServices()
  const targetSlug = process.argv[2] || null
  const targets = targetSlug
    ? SERVICES.filter(s => s.slug === targetSlug)
    : SERVICES

  if (!targets.length) {
    console.error(`No matching service${targetSlug ? ` for slug "${targetSlug}"` : ''}`)
    process.exit(1)
  }

  let bank = {}
  if (fs.existsSync(OUT_FILE)) {
    bank = JSON.parse(fs.readFileSync(OUT_FILE, 'utf8'))
  }

  for (const service of targets) {
    const queries = buildQueries(service)
    console.log(`\n→ ${service.slug}`)
    console.log(`  queries:`, queries)

    const merged = { paa: new Set(), related: new Set(), entities: new Set(), aio: [], titles: new Set() }
    for (const q of queries) {
      try {
        const raw = await serper(q)
        const x   = extractFromResponse(raw)
        x.paa.forEach(v => merged.paa.add(v))
        x.related.forEach(v => merged.related.add(v))
        x.entities.forEach(v => merged.entities.add(v))
        x.titles.forEach(v => merged.titles.add(v))
        if (x.aio) merged.aio.push({ q, text: x.aio })
        console.log(`  ✓ "${q}" → paa=${x.paa.length} rel=${x.related.length} ent=${x.entities.length}`)
      } catch (e) {
        console.error(`  ✗ "${q}" failed:`, e.message)
      }
    }

    bank[service.slug] = {
      displayName: service.displayName || slugToName(service.slug),
      primary: queries[0],
      queries,
      paa:      [...merged.paa],
      related:  [...merged.related],
      entities: [...merged.entities],
      titles:   [...merged.titles].slice(0, 20),
      aioSnippets: merged.aio,
      updated: new Date().toISOString().slice(0, 10),
    }

    const total = merged.paa.size + merged.related.size + merged.entities.size
    console.log(`  total unique keyword-ish items: ${total}`)
  }

  fs.mkdirSync(path.dirname(OUT_FILE), { recursive: true })
  fs.writeFileSync(OUT_FILE, JSON.stringify(bank, null, 2))
  console.log(`\nWrote ${OUT_FILE}`)
  console.log(`Services in bank: ${Object.keys(bank).length}`)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
