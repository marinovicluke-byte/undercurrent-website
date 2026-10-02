// scripts/check-format-pass.mjs — the format pass keeps the words and changes the shape.
// For every article changed against the base ref, asserts:
//   - the body word count moved by 2% or less (scripts/survey-article-blocks.mjs counts it)
//   - no number that wasn't already in the article
//   - no em dash added
//   - no flagged figure inside a Worked block (FLAGGED, from docs/quick-answers-reply.md)
//   - one H1, and the headings, frontmatter (bar dateModified) and Quick Answer unchanged
//
//   node scripts/check-format-pass.mjs [--base origin/main]
// Exits 1 on any failure.

import fs from 'fs'
import { execFileSync } from 'child_process'
import { survey } from './survey-article-blocks.mjs'

const DIR = 'content/articles'
const args = process.argv.slice(2)
const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main'
const git = (...a) => execFileSync('git', a, { encoding: 'utf8', maxBuffer: 64e6 })

// figures with no source or a mismatch (2 Oct). They stay in prose until Luke sources them.
const FLAGGED = {
  'hidden-cost-manual-trade-business-australia': ['18,720', '31,200', '35,000', '50,000'],
  'automating-business-processes-australia-sme-guide': ['5-10', 'first month'],
  'client-onboarding-accountants-automation-australia': ['20+', '20 hours', '40%'],
  'how-overdue-invoices-hurt-australian-sme-cash-flow': ['7,000', '14 days'],
  'how-australian-entrepreneurs-boost-team-efficiency-without-hiring': ['30-40%', '90 days'],
  'why-tradies-lose-jobs-before-quoting-australia': ['50-70%', '3-4', '100 times'],
  'how-much-are-manual-processes-costing-your-business': ['15,000', '40,000'],
  'what-is-an-ai-agent-for-business-australia': ['40%', '2.8'],
  'einvoicing-small-business-australia-guide': ['$2', '40%', '1-2 hours'],
  'ai-automation-for-pet-grooming': ['10-15%', '2-5%'],
  'seo-audit-self-check-australia': ['15 minutes', '15-minute'],
  'how-to-send-instant-follow-up-email-to-leads-automatically-australia': ['30%', '40%'],
}

// an ordered list's own numerals ("1. ") are structure, not figures
const nums = s => (s.replace(/^\d+\.\s/gm, '').replace(/\]\([^)]*\)/g, ']').match(/\d+(?:[.,]\d+)*/g) || []).map(n => n.replace(/,/g, ''))
const front = s => (s.match(/^---\n[\s\S]*?\n---\n/) || [''])[0].replace(/^dateModified:.*$/m, '')
const qa = s => (s.match(/^> \*\*Quick Answer[\s\S]*?(?=\n[^>])/m) || [''])[0]
const heads = s => s.split('\n').filter(l => /^#{1,6}\s/.test(l))

// Worked blocks: a bold title line, then a list whose every item ends ", **value**"
function worked(s) {
  const L = s.split('\n'), out = []
  for (let i = 0; i < L.length; i++) {
    if (!/^\*\*[^*]+\*\*:?\s*$/.test(L[i])) continue
    let j = i + 1
    while (L[j]?.trim() === '') j++
    const items = []
    while (/^[-*]\s/.test(L[j] || '')) items.push(L[j++])
    if (items.length > 1 && items.every(t => /, \*\*[^*]+\*\*\s*$/.test(t))) out.push({ title: L[i], items })
  }
  return out
}

const changed = git('diff', '--name-only', base, '--', DIR).split('\n').filter(f => f.endsWith('.md'))
let fails = 0
for (const path of changed) {
  const slug = path.slice(DIR.length + 1, -3)
  const now = fs.readFileSync(path, 'utf8')
  let old = ''
  try { old = git('show', `${base}:${path}`) } catch { console.log(`skip ${slug}: new article`); continue }
  const errs = []
  const a = survey(old), b = survey(now)
  const drift = (b.words - a.words) / a.words
  if (Math.abs(drift) > 0.02) errs.push(`body words ${a.words} → ${b.words} (${(drift * 100).toFixed(1)}%)`)
  const known = new Set(nums(old))
  const added = [...new Set(nums(now))].filter(n => !known.has(n))
  if (added.length) errs.push(`new numbers: ${added.join(', ')}`)
  const plus = git('diff', base, '--', path).split('\n').filter(l => l.startsWith('+') && !l.startsWith('+++'))
  if (plus.some(l => l.includes('—'))) errs.push('em dash added')
  if ((now.match(/^# /gm) || []).length !== 1) errs.push('not exactly one H1')
  if (JSON.stringify(heads(old)) !== JSON.stringify(heads(now))) errs.push('headings changed')
  if (front(old) !== front(now)) errs.push('frontmatter changed (other than dateModified)')
  if (qa(old) !== qa(now)) errs.push('Quick Answer changed')
  for (const w of worked(now)) for (const f of FLAGGED[slug] || []) if (w.items.join(' ').includes(f)) errs.push(`flagged figure "${f}" in Worked block ${w.title}`)
  const blocks = b.blocks - a.blocks
  console.log(`${errs.length ? 'FAIL' : 'ok  '} ${slug}: words ${a.words} → ${b.words} (${(drift * 100).toFixed(1)}%), blocks +${blocks}, Worked ${worked(now).length}`)
  for (const e of errs) console.log(`  - ${e}`)
  if (errs.length) fails++
}
console.log(`\n${changed.length} changed articles checked against ${base}: ${fails ? fails + ' fail' : 'all pass'}`)
process.exit(fails ? 1 : 0)
