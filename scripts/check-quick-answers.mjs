// scripts/check-quick-answers.mjs — checks every article's Quick Answer is in the
// hero shape: one bold, self-contained answer sentence, then 2 to 4 short bullets.
// Also checks no em dash, and that every number in the answer was already in the
// article (its old answer or body) at the base ref, so nothing new gets claimed.
//
//   node scripts/check-quick-answers.mjs [--base <git ref>]   (default origin/main)
//
// Exits 1 on any failure. The keyword line is a warning only.

import fs from 'fs'
import path from 'path'
import { execFileSync } from 'child_process'

const DIR = 'content/articles'
const LEAD_MAX = 30
const POINT_MAX = 15 // "about 14"
const args = process.argv.slice(2)
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main'

const plain = s => s.replace(/\]\([^)]*\)/g, ']').replace(/[*[\]`]/g, '').trim()
const words = s => plain(s).split(/\s+/).filter(Boolean).length
const nums = s => (plain(s).match(/\d+(?:[.,]\d+)*/g) || []).map(n => n.replace(/,/g, ''))
const STOP = new Set(['a', 'an', 'the', 'for', 'to', 'in', 'of', 'and', 'my', 'your', 'how', 'what', 'is', 'can', 'with', 'on', 'vs', 'using', 'right', 'now', 'do', 'does', 'much', 'are', 'why'])

function block(src) {
  const lines = src.split('\n')
  const i = lines.findIndex(l => /^> \*\*Quick Answer:?\*\*/.test(l))
  if (i < 0) return null
  let j = i
  while (j < lines.length && lines[j].startsWith('>')) j++
  return { lines: lines.slice(i, j), start: i, end: j }
}

let fails = 0, checked = 0
const warns = []
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort()) {
  const src = fs.readFileSync(path.join(DIR, f), 'utf8')
  const qa = block(src)
  if (!qa) continue
  checked++
  const errs = []
  const [first, ...rest] = qa.lines
  const lead = first.replace(/^> \*\*Quick Answer:?\*\*\s*/, '')

  // one bold sentence: the whole lead bold, one closing stop, no stop inside
  if (!/^\*\*[^*]+\*\*$/.test(lead)) errs.push('lead is not one bold run')
  const inner = lead.replace(/^\*\*|\*\*$/g, '')
  if (!/[.?]$/.test(inner)) errs.push('lead does not end as a sentence')
  if (/[.?!]\s+[A-Z]/.test(plain(inner))) errs.push('lead has more than one sentence')
  if (words(inner) > LEAD_MAX) errs.push(`lead ${words(inner)} words > ${LEAD_MAX}`)

  const body = rest.filter(l => l.trim() !== '>')
  const points = body.filter(l => /^> - /.test(l))
  if (points.length !== body.length) errs.push('something other than bullets after the lead')
  if (points.length < 2 || points.length > 4) errs.push(`${points.length} bullets, want 2 to 4`)
  for (const p of points) {
    const t = p.replace(/^> - /, '')
    if (words(t) > POINT_MAX) errs.push(`bullet ${words(t)} words > ${POINT_MAX}: "${plain(t)}"`)
    if (/[.?!]\s+[A-Z]/.test(plain(t))) errs.push(`bullet strings sentences: "${plain(t)}"`)
  }
  if (/—/.test(qa.lines.join('\n'))) errs.push('em dash')

  // every number already in the article at the base ref
  let old = ''
  try { old = execFileSync('git', ['show', `${base}:${DIR}/${f}`], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }) } catch {}
  const known = new Set(nums(old.replace(/\]\([^)]*\)/g, ']')))
  for (const n of nums(qa.lines.join(' '))) if (!known.has(n)) errs.push(`number ${n} not in the article at ${base}`)

  // the primary keyword's words in the lead (warning)
  const kw = (src.match(/^keyword:\s*"?([^"\n]+)"?/m) || [])[1] || ''
  const miss = kw.toLowerCase().split(/[^a-z0-9]+/).filter(w => w && !STOP.has(w) && !plain(inner).toLowerCase().includes(w))
  if (miss.length) warns.push(`${f}: keyword "${kw}" missing ${miss.join(', ')}`)

  if (errs.length) { fails++; console.log(`FAIL ${f}\n  - ${errs.join('\n  - ')}`) }
}
for (const w of warns) console.log(`warn ${w}`)
console.log(`\n${checked} Quick Answers checked against ${base}: ${checked - fails} pass, ${fails} fail, ${warns.length} keyword warnings`)
process.exit(fails ? 1 : 0)
