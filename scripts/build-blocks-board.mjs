// scripts/build-blocks-board.mjs — writes public/article-blocks-concepts.html, the board of the
// article block looks. Every frame is the real thing: copy lifted from the live articles on disk,
// run through the real transform (lib/remarkArticleBlocks.js), styled by the real stylesheets
// (app/styles/article.css + article-blocks.css), with the look classes the page would carry.
// Rebuild after any change to the blocks:  node scripts/build-blocks-board.mjs
import fs from 'node:fs'
import { remark } from 'remark'
import gfm from 'remark-gfm'
import html from 'remark-html'
import remarkArticleBlocks from '../lib/remarkArticleBlocks.js'
import { extractQuickAnswer } from '../lib/articleBody.js'

const read = f => fs.readFileSync(f, 'utf8')
const article = slug => read(`content/articles/${slug}.md`).split('\n---\n').slice(1).join('\n---\n')

// a run of markdown from the line that starts with `from`: the block, its list, its note, and any
// block straight after it, up to the first plain paragraph or heading
function lift(slug, from, { blocks = 1 } = {}) {
  const lines = article(slug).split('\n')
  let i = lines.findIndex(l => l.startsWith(from))
  if (i < 0) throw new Error(`${slug}: no line starts with "${from}"`)
  const out = []
  let seen = 0
  for (; i < lines.length; i++) {
    const l = lines[i]
    const plain = l.trim() && !/^(\s|>|[-*] |\d+\. |\||\*\*|\*[^*])/.test(l)
    if (/^\*\*/.test(l) && /\*\*:?$/.test(l.trim()) && out.length) { if (++seen >= blocks) break }
    if (plain || /^#/.test(l)) break
    out.push(l)
  }
  return out.join('\n').trim()
}

// each lifted run renders on its own, as it sits between paragraphs in its article
async function render(runs) {
  const out = await Promise.all(runs.map(md => remark().use(gfm).use(remarkArticleBlocks).use(html, { sanitize: false }).process(md)))
  return out.map(String).join('\n')
}

const css = read('app/styles/article.css') + '\n' + read('app/styles/article-blocks.css')
const frameDoc = (looks, inner) => `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>:root{--font-inter:'Inter'}${css}
body{background:#fff}.art{padding:28px 0 36px}.qa{padding-top:28px;padding-bottom:28px}</style></head>
<body><article class="ucb-looks ${looks} c-auto">${inner}</article></body></html>`
const bodyFrame = (looks, htmlBody) => frameDoc(looks, `<div class="art"><div class="wrap"><div class="art__col"><div class="body">${htmlBody}</div></div></div></div>`)

function qaFrame(looks, qa) {
  const pts = qa.items.length ? `<ul class="qa__pts">${qa.items.map(i => `<li>${i}</li>`).join('')}</ul>` : ''
  return frameDoc(looks, `<section class="qa" aria-label="Quick answer"><div class="wrap"><div class="qa__in"><p class="eyebrow">Quick answer</p><p class="qa__lead${qa.answer ? ' qa__lead--answer' : ''}">${qa.lead}</p>${pts}</div></div></section>`)
}

const steps = await render([
  lift('small-business-website-design', '**Work the project in five steps'),
  lift('does-chatgpt-search-the-web', '**Your ranking window'),
  lift('how-to-choose-a-google-ads-agency-australia', '**Google Ads agency vetting checklist'),
])
const pairs = await render([
  lift('how-overdue-invoices-hurt-australian-sme-cash-flow', '**Current state', { blocks: 2 }),
  lift('einvoicing-small-business-australia-guide', '**Free options', { blocks: 2 }),
])
const tables = await render([
  lift('chatgpt-knowledge-cutoff-australia', '| Model |'),
  lift('n8n-vs-zapier-australia-small-business', '| Factor | Zapier |'),
])
const workings = await render([
  lift('google-ads-cost-australian-small-business', '**Work the budget backwards', { blocks: 2 }),
  lift('what-is-ai-automation-australia', '**What the invoice generator handed back'),
])
const qaHtml = String(await remark().use(gfm).use(html, { sanitize: false }).process(lift('what-is-ai-automation-australia', '> **Quick Answer')))
const { qa } = extractQuickAnswer(qaHtml + '\n')
if (!qa) throw new Error('the proof article Quick Answer did not parse')

const CONCEPTS = [
  {
    id: 'steps', name: 'a. Steps, two looks', what: 'An ordered list under a bold title. A trailing bold is the step\'s timing. Checklists and plain lists share the same rows in both looks.',
    source: 'small-business-website-design, does-chatgpt-search-the-web, how-to-choose-a-google-ads-agency-australia (all migrated out of code boxes)',
    looks: [
      { name: 'Ledger', cls: 'ucb-steps--ledger', note: 'The page\'s own numbered rows: the light numeral, a hairline under every step, the timing as a tracked label. Recommended, and on.', doc: bodyFrame('ucb-steps--ledger ucb-data--fit ucb-qa--plain', steps) },
      { name: 'Track', cls: 'ucb-steps--track', note: 'The run of a workflow: a spine through numbered nodes, the last one lit in the blue.', doc: bodyFrame('ucb-steps--track ucb-data--fit ucb-qa--plain', steps) },
    ],
    honest: 'Track\'s lit last node says "done", which fits a workflow and is only decoration on a list that has no finish, like the DIY SEO checklist. Ledger is quieter than Track, almost too quiet: it reads as part of the page, not as a feature.',
  },
  {
    id: 'pair', name: 'b. Pair, in the blue ramp', what: 'Two titled lists in a row. When the titles say before and after, works and doesn\'t, do and don\'t, the better side takes the deep blue and the other the pale blue. Side by side from 641px, stacked under.',
    source: 'how-overdue-invoices-hurt-australian-sme-cash-flow (contrast), einvoicing-small-business-australia-guide (equals)',
    looks: [
      { name: 'Contrast and equals', cls: 'ucb-pair--contrast', note: 'Top: Current state and After automation. Bottom: Free options and Paid options, two equals on grey, no colour verdict.', doc: bodyFrame('ucb-steps--ledger ucb-data--fit ucb-qa--plain', pairs) },
    ],
    honest: 'The tone comes from a word list on the titles (before, after, don\'t, current, works and so on). A pair titled some other way gets the neutral grey, never a guessed verdict, which means a real contrast with odd titles needs the writer to name it plainly. The colour only repeats what the titles say; no red, no green.',
  },
  {
    id: 'data', name: 'c. Data rail', what: 'A real <table> with row headers and labelled cells. On a phone it is a snap rail of one card a row, with a row count and, in browsers that can, a scroll-driven progress line. No script.',
    source: 'chatgpt-knowledge-cutoff-australia (model, cutoff, released), n8n-vs-zapier-australia-small-business (four columns)',
    looks: [
      { name: 'Fit', cls: 'ucb-data--fit', note: 'The rail on the phone, the table back from 961px. Five or more columns stay a rail everywhere. Recommended, and on.', doc: bodyFrame('ucb-steps--ledger ucb-data--fit ucb-qa--plain', tables) },
      { name: 'Rail everywhere', cls: 'ucb-data--rail', note: 'Luke\'s call for Intelligentle: the rail on every screen.', doc: bodyFrame('ucb-steps--ledger ucb-data--rail ucb-qa--plain', tables) },
    ],
    honest: 'UC\'s grid argues for Fit. 114 of the 138 tables are three or four columns, most of them comparisons read down a column, and the 760px column holds them without a scroll. On a desktop the rail shows two and a half of nine rows and hides the rest sideways. The progress line moves in Chrome and Safari 26; Firefox shows a still hairline. The row count is CSS generated content, marked empty for screen readers.',
  },
  {
    id: 'qa', name: 'd. Quick Answer', what: 'The answer sentence first, bold, self-contained, then two to four short points. In the DOM: the label, a <p><strong>, a <ul>, in that order, nothing behind a tap.',
    source: 'the proof article, what-is-ai-automation-australia',
    looks: [
      { name: 'Plain', cls: 'ucb-qa--plain', note: 'Desktop-only trait: the points go two across. Recommended, and on.', doc: qaFrame('ucb-steps--ledger ucb-data--fit ucb-qa--plain', qa) },
      { name: 'Split', cls: 'ucb-qa--split', note: 'Desktop-only trait: the points sit in a column beside the answer.', doc: qaFrame('ucb-steps--ledger ucb-data--fit ucb-qa--split', qa) },
    ],
    honest: 'Only the proof article has the new shape so far. The other 57 Quick Answers are still one paragraph; they render as the bold lead paragraph, no points, until they are rewritten. Split wants a wider measure than the 760px column the rest of the article keeps.',
  },
  {
    id: 'workings', name: 'e. Workings, the UC one', what: 'Show your workings. A list whose every line ends in a bold value becomes a receipt: label, dotted leader, value, and a line opening "= " is the total, under a double rule in the blue. For the sums an article already does in prose, and for UC\'s own client numbers.',
    source: 'google-ads-cost-australian-small-business (migrated out of a code box), the invoice result in the proof article',
    looks: [
      { name: 'Workings', cls: 'ucb--workings', note: 'Top two: a formula and its worked example. Last: UC\'s first-party result, about 10 hours a week, about 480 a year.', doc: bodyFrame('ucb-steps--ledger ucb-data--fit ucb-qa--plain', workings) },
    ],
    honest: 'It only restates numbers the article already has; it adds no claim. The "=" is literal text so a scraper reads the sum as a sum, and the leader is the comma restyled, so the line reads "Weeks in the working year, 48". On a phone a long label pushes its value to its own line.',
  },
]

const esc = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
const section = c => `
<section class="concept" id="${c.id}">
  <h2>${c.name}</h2>
  <p class="what">${esc(c.what)}</p>
  <div class="looks">${c.looks.map(l => `
    <div class="look">
      <h3>${l.name} <code>${l.cls}</code></h3>
      <p class="note">${esc(l.note)}</p>
      <div class="stage"><iframe title="${esc(c.name + ', ' + l.name)}" loading="lazy" srcdoc="${esc(l.doc)}"></iframe></div>
    </div>`).join('')}
  </div>
  <p class="src">Copy from: ${esc(c.source)}</p>
  <p class="honest"><b>Honest footnote.</b> ${esc(c.honest)}</p>
</section>`

const page = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Article blocks, UC concepts</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
:root{--ink:#141414;--ink-2:#6b6b6b;--line:rgba(20,20,20,.14);--off:#f6f6f6;--blue:#2563EB;--pad:clamp(16px,4vw,56px)}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,sans-serif;color:var(--ink);background:#fff;-webkit-font-smoothing:antialiased;line-height:1.5}
::selection{background:#DEEAFF;color:var(--ink)}
.bar{position:sticky;top:0;z-index:5;display:flex;justify-content:space-between;align-items:center;gap:16px;padding:14px var(--pad);background:#fff;border-bottom:1px solid var(--line)}
.bar b{font-weight:500;font-size:15px;letter-spacing:-.01em}
.toggle{display:flex;border:1px solid var(--ink)}
.toggle button{font:inherit;font-size:12px;letter-spacing:.14em;text-transform:uppercase;padding:9px 14px;border:0;background:#fff;color:var(--ink);cursor:pointer}
.toggle button[aria-pressed=true]{background:var(--ink);color:#fff}
.toggle button:focus-visible{outline:2px solid var(--blue);outline-offset:2px}
main{max-width:1440px;margin:0 auto;padding:0 var(--pad) 96px}
.intro{max-width:68ch;padding:48px 0 8px}
.intro h1{font-weight:500;font-size:clamp(30px,4vw,48px);letter-spacing:-.03em;line-height:1.08}
.intro p{margin-top:16px;font-size:17px;color:var(--ink-2)}
.intro code,h3 code{font-family:ui-monospace,Menlo,monospace;font-size:.82em;color:var(--ink);background:var(--off);padding:1px 5px}
.concept{padding-top:56px;margin-top:56px;border-top:1px solid var(--line)}
.concept h2{font-weight:500;font-size:clamp(24px,2.4vw,32px);letter-spacing:-.02em}
.what{margin-top:10px;max-width:72ch;font-size:16px;color:var(--ink-2)}
.looks{display:flex;flex-wrap:wrap;gap:32px;margin-top:28px}
.look{flex:0 0 auto;width:390px;max-width:100%}
.look h3{font-weight:500;font-size:17px;letter-spacing:-.01em}
.note{margin-top:4px;font-size:14px;color:var(--ink-2);min-height:3em}
.stage{margin-top:14px;border:1px solid var(--line);overflow:hidden;background:#fff}
iframe{display:block;border:0;width:390px;height:400px;transform-origin:0 0}
.src{margin-top:24px;font-size:13px;color:var(--ink-2)}
.honest{margin-top:10px;max-width:80ch;font-size:15px;line-height:1.55;padding:14px 16px;background:var(--off)}
.honest b{font-weight:500}
body.desk .look{width:100%}
body.desk iframe{width:1440px}
@media (max-width:440px){.look,iframe{width:100%}}
</style>
</head>
<body>
<header class="bar"><b>Article blocks, UC</b>
  <div class="toggle" role="group" aria-label="Frame width">
    <button type="button" data-mode="phone" aria-pressed="true">Phone 390</button>
    <button type="button" data-mode="desk" aria-pressed="false">Desktop 1440</button>
  </div>
</header>
<main>
<section class="intro">
  <h1>Article blocks for the UC blog, phone first</h1>
  <p>Every frame is the live article page's own CSS around copy lifted from live UC articles and run through the real transform, so what you see is what ships. A look is one class on the article: change <code>BLOCK_LOOKS</code> in <code>app/blog/[slug]/page.js</code>. The rule for all of them: real semantic HTML in the DOM, an ordered list stays an <code>&lt;ol&gt;</code>, a table stays a <code>&lt;table&gt;</code>, phone and desktop are CSS only, nothing hidden or duplicated, nothing behind a tap or a script.</p>
  <p>Colour: the page keeps its category ground in the hero; the blocks use greyscale and the one blue from BRAND.md as a ramp, never red or green for good and bad.</p>
</section>
${CONCEPTS.map(section).join('\n')}
</main>
<script>
// the board's own behaviour: fit each frame to its content, scale the desktop frames to the column
var frames = [].slice.call(document.querySelectorAll('iframe'));
function fit(f) {
  var d = f.contentDocument; if (!d || !d.body) return;
  var desk = document.body.classList.contains('desk');
  var w = f.parentNode.clientWidth, scale = desk ? Math.min(1, w / 1440) : Math.min(1, w / 390);
  f.style.transform = scale < 1 ? 'scale(' + scale + ')' : '';
  f.style.height = '10px';
  var h = d.documentElement.scrollHeight;
  f.style.height = h + 'px';
  f.parentNode.style.height = Math.ceil(h * scale) + 'px';
}
frames.forEach(function (f) { f.addEventListener('load', function () { fit(f); setTimeout(function () { fit(f) }, 400) }) });
function mode(m) {
  document.body.classList.toggle('desk', m === 'desk');
  [].forEach.call(document.querySelectorAll('.toggle button'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === m)) });
  frames.forEach(fit);
}
[].forEach.call(document.querySelectorAll('.toggle button'), function (b) { b.addEventListener('click', function () { mode(b.dataset.mode) }) });
addEventListener('resize', function () { frames.forEach(fit) });
</script>
</body>
</html>
`
fs.writeFileSync('public/article-blocks-concepts.html', page)
console.log(`public/article-blocks-concepts.html, ${CONCEPTS.length} concepts, ${Math.round(page.length / 1024)}KB`)
