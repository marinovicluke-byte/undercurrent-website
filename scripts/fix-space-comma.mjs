// scripts/fix-space-comma.mjs — one-off sweep (3 Oct 2026): an earlier em-dash swap turned
// "x — y" into "x , y" across the articles. This puts the right punctuation back, words untouched.
//
//   **term** , text           →  **term:** text
//   [link](url) , text        →  [link](url), text       (Related Reading)
//   [Publisher , Title](url)  →  [Publisher: Title](url)  (Sources)
//   | High , reason |         →  | High: reason |          (table cells)
//   anything else             →  a per-sentence fix in FIXES, or the script stops
//
// Skips frontmatter (titles, meta and FAQ schema must match production), the body copies of
// frontmatter FAQ answers (so the visible FAQ keeps matching its schema), and the rewrite-lane
// articles (that pane owns them).
//
//   node scripts/fix-space-comma.mjs            fix in place, list what changed
//   node scripts/fix-space-comma.mjs --check    exit 1 if a fixable " , " is left
//   node scripts/fix-space-comma.mjs --only a,b  just those slugs

import fs from 'fs'

const DIR = 'content/articles'
const REWRITE_LANE = [
  'how-much-are-manual-processes-costing-your-business', 'automating-business-processes-australia-sme-guide',
  'hidden-cost-manual-trade-business-australia', 'client-onboarding-accountants-automation-australia',
  'how-australian-entrepreneurs-boost-team-efficiency-without-hiring',
  'aussie-startup-keen-to-help-small-businesses-cut-manual-work-cheap-happy-to-chat',
  'what-is-business-process-automation-australia', 'how-to-rank-in-chatgpt-search',
]

// swept inside their own format-pass PR (PR 44, PR 52), which edit the same lines; sweeping them
// here too would make the PRs conflict
const IN_BATCH_PR = ['what-is-ai-search-optimisation-australia', 'how-to-choose-a-google-ads-agency-australia']

// sentence-level fixes, by a unique fragment of the line: [from, to]
const FIXES = [
  ['a separate dial , whether the live model decides any given prompt needs a fresh search , and', 'a separate dial (whether the live model decides any given prompt needs a fresh search), and'],
  ['/blog/how-to-rank-buyers-agency-ai-search-melbourne) , the methodology source', '/blog/how-to-rank-buyers-agency-ai-search-melbourne), the methodology source'],
  ['and not before , paid search', 'and not before: paid search'],
  ['every week , below roughly', 'every week: below roughly'],
  ['never inside it , your ad spend', 'never inside it: your ad spend'],
  ['not on clicks , impressions', 'not on clicks: impressions'],
  ['often are too , across 88', 'often are too: across 88'],
  ['for whom , the format AI summaries quote', 'for whom, the format AI summaries quote'],
  ['pricing methodology , context from', 'pricing methodology; context from'],
  ['SEO for Dog Groomers , The 4 Levers', 'SEO for Dog Groomers: The 4 Levers'],
  ['24.4% of clicks , see [', '24.4% of clicks; see ['],
  ['named by AI assistants , the Three-Layer', 'named by AI assistants: the Three-Layer'],
  ['(/glossary/what-is-chatgpt-search) , this is the third layer', '(/glossary/what-is-chatgpt-search); this is the third layer'],
  ['the criteria shown , they are not drawn', 'the criteria shown; they are not drawn'],
  ['keyword optimisation ignores , things like', 'keyword optimisation ignores: things like'],
  ['(GEO, AEO, LLMO , they\'re basically', '(GEO, AEO, LLMO: they\'re basically'],
  ['not a separate channel , it is an evolution', 'not a separate channel; it is an evolution'],
  ['prioritises ranking position , getting your page', 'prioritises ranking position: getting your page'],
  ['don\'t cite your homepage , they cite', 'don\'t cite your homepage; they cite'],
  ['sales or marketing channel , the exact base', 'sales or marketing channel: the exact base'],
  ['## GEO, AEO, LLMO , What\'s the Difference?', '## GEO, AEO, LLMO: What\'s the Difference?'],
  ['generative AI systems broadly , ChatGPT', 'generative AI systems broadly: ChatGPT'],
  ['answer direct questions , the kind', 'answer direct questions: the kind'],
  ['the most technical framing , seeding', 'the most technical framing: seeding'],
  ['with a direct answer , not a story', 'with a direct answer, not a story'],
  ['under 300 words , AI engines truncate', 'under 300 words; AI engines truncate'],
  ['your service plus suburb , "electrician', 'your service plus suburb: "electrician'],
  ['needs work , not necessarily', 'needs work, not necessarily'],
  ['conversational queries , the exact format that feeds AI Overviews , are', 'conversational queries (the exact format that feeds AI Overviews) are'],
  ['(/audit) , most AI visibility audits', '(/audit): most AI visibility audits'],
  ['in the past year , and AI-mediated discovery', 'in the past year, and AI-mediated discovery'],
  ['prioritises citation , getting a specific passage', 'prioritises citation: getting a specific passage'],
]

const check = process.argv.includes('--check')
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null
let left = 0
for (const f of fs.readdirSync(DIR).filter(f => f.endsWith('.md'))) {
  const slug = f.slice(0, -3)
  if (only ? !only.includes(slug) : REWRITE_LANE.includes(slug) || IN_BATCH_PR.includes(slug)) continue
  const path = `${DIR}/${f}`
  const src = fs.readFileSync(path, 'utf8')
  const fmEnd = src.indexOf('\n---\n', 4) + 5
  const front = src.slice(0, fmEnd)
  // frontmatter FAQ fragments around " , ", unescaped, so their body copies are left alone
  const keep = (front.match(/.{0,30} , .{0,30}/g) || []).map(s => s.replace(/\\"/g, '"'))
  const lines = src.slice(fmEnd).split('\n')
  let n = 0
  const out = lines.map(l => {
    if (!l.includes(' , ') || keep.some(k => l.includes(k))) return l
    let x = l
    for (const [from, to] of FIXES) if (x.includes(from)) x = x.replace(from, to)
    x = x.replace(/\*\* , /g, ':** ')
    x = x.replace(/\]\(([^)]*)\) , /g, ']($1), ')
    x = x.replace(/\[([^\]]+?) , ([^\]]+)\]\(/g, '[$1: $2](')
    x = x.replace(/^(\d+\. )([A-Z][^,[\]]*?) , /, '$1$2: ')
    if (/^\s*\|/.test(x)) x = x.replace(/ , /g, ': ')
    if (x.includes(' , ')) { console.log(`LEFT ${slug}: ${x.slice(Math.max(0, x.indexOf(' , ') - 50), x.indexOf(' , ') + 40)}`); left++ }
    if (x !== l) n++
    return x
  })
  if (n && !check) { fs.writeFileSync(path, front + out.join('\n')); console.log(`${String(n).padStart(3)} lines  ${slug}`) }
  else if (n && check) { console.log(`unfixed  ${slug}: ${n} lines`); left++ }
}
if (left) { console.log(`\n${left} left`); process.exit(1) }
