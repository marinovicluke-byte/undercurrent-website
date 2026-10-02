// scripts/convert-step-runs.mjs — turns a run of step-labelled paragraphs into a steps
// block (Fill, lib/remarkArticleBlocks.js). Deterministic: the words stay, the shape changes.
// The model picks the title.
//
//   node scripts/convert-step-runs.mjs <article.md>                          list the runs
//   node scripts/convert-step-runs.mjs <article.md> --at <line> --title "…"  convert one run
//
// Four shapes, three or more in a row:
//   **Day 1:** text            →  1. text, **Day 1**        (the label is the step's timing)
//   **Weeks 3-4: Title.** text →  1. **Title.** text, **Weeks 3-4**
//   **Step 1: Title**          →  1. Title. Paragraph       (the numeral is Fill's own)
//   Paragraph
//   **Step 1: Title.** text    →  1. **Title.** text
// A run stops at a heading, a list, a table, an image, a blockquote or any other paragraph.

import fs from 'fs'

const [file, ...rest] = process.argv.slice(2)
const opt = k => (rest.includes(k) ? rest[rest.indexOf(k) + 1] : null)
const L = fs.readFileSync(file, 'utf8').split('\n')

const TIMED = /^\*\*((?:Day|Week|Month|Year|Hour|Minute)s?\s+\d+(?:-\d+)?[^*:]*?)(?::\s*([^*]+?))?:?\*\*:?\s+(\S.*)$/
const TITLED = /^\*\*(?:Step|Stage|Phase)\s+\d+[:.]\s*([^*]+?)\.?\*\*:?\s*$/
const INLINE = /^\*\*(?:Step|Stage|Phase)\s+\d+[:.]\s*([^*]+?)\*\*:?\s+(\S.*)$/
const plainPara = l => l && !/^(#|\||>|!\[|<|\d+\.\s|[-*]\s|\*\*)/.test(l)

// the runs: [{ start, end (exclusive), steps: [text] }]
function runs() {
  const out = []
  let i = 0
  while (i < L.length) {
    const steps = []
    let j = i, end = i
    for (;;) {
      while (j < L.length && L[j].trim() === '') j++
      let m
      if ((m = L[j]?.match(TIMED))) { steps.push(`${m[2] ? `**${m[2].trim()}** ` : ''}${m[3].trim().replace(/[.,;]$/, '')}, **${m[1].trim()}**`); end = ++j; continue }
      if ((m = L[j]?.match(INLINE))) { steps.push(`**${m[1].trim()}** ${m[2].trim()}`); end = ++j; continue }
      if ((m = L[j]?.match(TITLED))) {
        let k = j + 1
        while (k < L.length && L[k].trim() === '') k++
        if (!plainPara(L[k]) || L[k].match(TIMED) || L[k].match(TITLED)) break
        const paras = []
        while (plainPara(L[k])) { paras.push(L[k].trim()); k++; while (k < L.length && L[k].trim() === '' && plainPara(L[k + 1]) && !L[k + 1].match(TITLED)) k++ }
        steps.push(`${m[1].trim()}. ${paras.join(' ')}`)
        j = end = k
        continue
      }
      break
    }
    if (steps.length >= 3) { out.push({ start: i + (L.slice(i).findIndex(l => l.trim() !== '')), end, steps }); i = end }
    else i++
  }
  return out
}

const found = runs()
const at = opt('--at')
if (!at) {
  for (const r of found) console.log(`lines ${r.start + 1}-${r.end}: ${r.steps.length} steps\n  ${r.steps.map(s => s.slice(0, 90)).join('\n  ')}`)
  if (!found.length) console.log('no step runs')
  process.exit(0)
}
const title = opt('--title')
if (!title) throw new Error('--title is required with --at')
const r = found.find(r => +at >= r.start + 1 && +at <= r.end)
if (!r) throw new Error(`no step run at line ${at}`)
const block = [`**${title}**`, '', ...r.steps.map((s, n) => `${n + 1}. ${s}`)]
L.splice(r.start, r.end - r.start, ...block)
fs.writeFileSync(file, L.join('\n'))
console.log(`converted lines ${r.start + 1}-${r.end} into "${title}", ${r.steps.length} steps`)
