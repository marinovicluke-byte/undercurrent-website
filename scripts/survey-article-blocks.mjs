// scripts/survey-article-blocks.mjs — counts, per article, the prose patterns that
// should become an article block (lib/remarkArticleBlocks.js). Read-only.
//
//   node scripts/survey-article-blocks.mjs                    every article, a table
//   node scripts/survey-article-blocks.mjs --slugs a,b --lines  the hits with file line numbers
//   node scripts/survey-article-blocks.mjs --ref origin/main  read through git instead of the tree
//   node scripts/survey-article-blocks.mjs --json             rows as JSON
//
// Step runs → Fill, comparisons → Weight, prose sums → Worked, lists over six items.
// Patterns already inside a block (a bold title line, then a list) are not counted.
// Every top-level table is already a Rail, so tables are counted but not scored.
// Method and calibration: docs/article-blocks-survey.md.

import fs from 'fs'
import { execFileSync } from 'child_process'

const DIR = 'content/articles'
const args = process.argv.slice(2)
const opt = k => (args.includes(k) ? args[args.indexOf(k) + 1] : null)
const ref = opt('--ref')
const only = opt('--slugs')?.split(',')

const read = f => (ref ? execFileSync('git', ['show', `${ref}:${DIR}/${f}`], { encoding: 'utf8' }) : fs.readFileSync(`${DIR}/${f}`, 'utf8'))
const files = (ref ? execFileSync('git', ['ls-tree', '--name-only', `${ref}:${DIR}`], { encoding: 'utf8' }).split('\n') : fs.readdirSync(DIR))
  .filter(f => f.endsWith('.md') && (!only || only.includes(f.slice(0, -3))))

const STEP = /^(?:\d+\.\s+|[-*]\s+|#{2,4}\s+)?\*{0,2}(?:(?:Day|Step|Week|Month|Stage|Phase|Hour|Minute|Year)\s+\d+|First|Then|Next|Finally|Second|Third)\b/i
const BOLDTITLE = l => /^\*\*[^*]+\*\*:?\s*$/.test(l)
const ITEM = /^(\d+\.|[-*])\s/
const SUMWORD = /(=|\btotal\b|\bper (week|year)\b|\ba (week|year)\b|\d\s*[x×]\s*\$?\d|\bsav(e|es|ing)\b)/i
const FIG = /\$?\d[\d,.]*%?/g

export function survey(src) {
  const L = src.split('\n')
  // blank out what isn't body, keeping line numbers: frontmatter, drawings, the Quick Answer
  const fmEnd = L[0] === '---' ? L.indexOf('---', 1) : -1
  for (let i = 0; i <= fmEnd; i++) L[i] = ''
  let inSvg = false
  for (let i = 0; i < L.length; i++) {
    if (/<svg/.test(L[i])) inSvg = true
    const was = inSvg
    if (/<\/svg>/.test(L[i])) inSvg = false
    if (was || L[i].startsWith('>')) L[i] = ''
  }

  // lines already inside a block, and the block titles
  const inBlock = new Set()
  let blocks = 0
  for (let i = 0; i < L.length; i++) {
    if (!BOLDTITLE(L[i])) continue
    let j = i + 1
    while (j < L.length && L[j].trim() === '') j++
    if (!ITEM.test(L[j] || '')) continue
    blocks++
    while (j < L.length && (ITEM.test(L[j]) || /^\s+\S/.test(L[j]))) inBlock.add(j++)
  }

  const hit = { step: [], comp: [], sum: [], list: [] }
  let run = 0
  for (let i = 0; i < L.length; i++) {
    const l = L[i]
    if (l.trim() === '' || /^\s+\S/.test(l)) continue
    // a step-labelled line extends the run; one plain paragraph between two labelled lines is allowed
    if (STEP.test(l) && !inBlock.has(i)) { run++; if (run === 3) hit.step.push(i + 1) }
    else if (run && !/^(#|\*\*|\d+\.|[-*]\s)/.test(l) && STEP.test(L[i + 2] || '')) continue
    else run = 0
  }
  let tables = 0
  for (let i = 0; i < L.length; i++) {
    const l = L[i]
    if (/^\s*\|.*\|\s*$/.test(l) && /^\s*\|?\s*:?-{3,}/.test(L[i + 1] || '')) {
      tables++
      const cols = l.trim().replace(/^\||\|$/g, '').split('|').length
      if (cols === 2 || cols === 3) hit.comp.push(i + 1)
    }
    if (inBlock.has(i)) continue
    if ((/^#{2,4}\s/.test(l) || /^\*\*[^*]+\*\*/.test(l)) && /\b(vs\.?|versus|before and after|manual (vs|versus|or) automat)/i.test(l)) hit.comp.push(i + 1)
    else if (/^\*\*(Before|Manual|Without)\b[^*]*\*\*/i.test(l)) hit.comp.push(i + 1)
    if (/^\s*\|/.test(l) || /^#/.test(l)) continue
    for (const s of l.split(/(?<=[.?!])\s+(?=[A-Z$])/)) {
      const figs = (s.replace(/\]\([^)]*\)/g, ']').match(FIG) || []).filter(n => /\d/.test(n))
      if (figs.length >= 2 && SUMWORD.test(s)) { hit.sum.push(i + 1); break }
    }
  }
  let n = 0, start = -1
  for (let i = 0; i <= L.length; i++) {
    if (ITEM.test(L[i] || '')) { if (n === 0) start = i; n++; continue }
    if (n && /^\s+\S/.test(L[i] || '')) continue
    if (n && (L[i] || '').trim() === '' && ITEM.test(L[i + 1] || '')) continue
    if (n > 6 && !inBlock.has(start)) hit.list.push(start + 1)
    n = 0
  }
  const words = L.join('\n').replace(/<[^>]+>/g, ' ').replace(/^\s*\|.*$/gm, '').replace(/\]\([^)]*\)/g, ']').split(/\s+/).filter(w => /[A-Za-z0-9]/.test(w)).length
  const count = hit.step.length + hit.comp.length + hit.sum.length + hit.list.length
  return { words, tables, blocks, count, hit, date: (src.match(/^date:\s*"?([\d-]+)/m) || [])[1] || '' }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const rows = files.map(f => ({ slug: f.slice(0, -3), ...survey(read(f)) })).sort((a, b) => b.count - a.count || b.words - a.words)
  if (args.includes('--json')) console.log(JSON.stringify(rows))
  else {
    console.log('count | step | comp | sum | list | blocks | words | slug')
    for (const r of rows) {
      console.log([r.count, r.hit.step.length, r.hit.comp.length, r.hit.sum.length, r.hit.list.length, r.blocks, r.words, r.slug].join(' | '))
      if (args.includes('--lines')) for (const [k, v] of Object.entries(r.hit)) if (v.length) console.log(`    ${k}: lines ${v.join(', ')}`)
    }
  }
}
