// scripts/gen-services-concepts.mjs — builds public/services-concepts.html, the board of design
// ideas for the four service pages (Luke, 2026-10-02: "use a html to show me various design ideas
// ... ensuring it's best for mobile"). Each idea is a frame (srcdoc) on its own stylesheet,
// public/services-concepts.css, set at 390 first with a desktop toggle. Copy and figures are the
// AI Automation page's, word for word unless the idea says otherwise.
// Run: node scripts/gen-services-concepts.mjs
import fs from 'node:fs'
import path from 'node:path'

const OUT = path.join(path.dirname(new URL(import.meta.url).pathname), '..', 'public', 'services-concepts.html')
const V = Date.now().toString(36)

// ---------- the AI Automation page's copy ----------
const head = (label) => `<div class="sec__head"><span class="eyebrow">${label}</span></div>`
const why = {
  h2: 'The businesses that have moved are pulling away.',
  lead: "Not a forecast. The record from the last two years: the businesses running AI grow faster, get hours back every week, and make more money than the ones that haven't started.",
  p: "Nine in ten small businesses with AI say it lifts their revenue. Four in ten Australian ones have already seen it in the numbers, against three in a hundred who saw a drop. Every quarter they have it and you don't, the gap gets wider.",
}
const figs = [
  ['2.8x', "faster growth for Australian SMEs using AI than those that aren't"],
  ['5.6 hrs', 'saved a week, per worker, once AI is in the routine'],
  ['$209k', 'average revenue lift for Australian businesses running AI'],
]
const steps = [
  ['Talk', "How the work moves today, and what a good week looks like once it doesn't need you."],
  ['Map', 'The automations and the workflows around them, drawn before anything is built.'],
  ['Build, together', 'You see it early and often, so it fits how your team actually works.'],
  ['Stay', "Handover, then we're with you until it's part of the routine. You're not left alone with it."],
]
const what = {
  h2: 'Software that does the admin. Broad on purpose.',
  lead: "AI automation is a wide term, and that's the point. It covers every part of the business that follows a pattern: a job comes in, a quote goes out, an invoice is raised, a follow-up falls due. A system watches for the trigger and does the steps, on the tools you already pay for.",
  p: 'The AI part is judgment: reading an email, pulling the details out of a photo of a job sheet, drafting the reply. The automation part is the plumbing that moves it along. We build both, and you approve anything that goes out with your name on it.',
}
const areas = [
  ['Finance', 'Invoicing, chasing, reconciliation, the Monday numbers.'],
  ['Sales', 'Enquiries answered, quotes drafted, follow-ups on the third day, the CRM kept honest.'],
  ['Marketing', 'Content drafted, posts scheduled, leads captured and sorted.'],
  ['Operations', 'Bookings, reminders, job sheets into the system, reports out the other end.'],
]
const incl = [
  ['The process map', 'The workflows drawn, before and after. Yours to keep, whatever you decide.'],
  ['The automation', 'Built on the tools you already use, tested on your real jobs, not sample data.'],
  ['Documentation', "How it works and how to change it, in plain words, not a developer's notes."],
  ['Training', "A session with the people who'll actually use it, recorded so you can rewatch."],
  ['Monitoring', 'It tells us when something breaks, before it tells you.'],
  ['30 days of support', 'After handover, included. Longer if you want it.'],
]
const about = {
  h2: "The person you'll deal with.",
  lead: 'UnderCurrent is run by Luke Marinovic out of Melbourne. Strategy, design, code and automation under one roof, so nothing gets lost between the person who understands the problem and the person building the fix.',
  p: "We automate the boring, repeated work: the quoting, the chasing, the copying from one screen to another. We won't automate the part where you talk to your customer. We pick what to build with one test: how many hours a week it gives back.",
}
const photoHow = `<div class="ph" role="img" aria-label="Luke Marinovic" style="--img:url(/assets/about4-800.jpg);--y:40%"></div>`
const photoAbout = `<div class="ph" role="img" aria-label="Luke Marinovic" style="--img:url(/assets/luke-800.jpg);--y:30%"></div>`
const X = (c = '') => `<i class="x${c ? ' ' + c : ''}" aria-hidden="true"></i>`
const of = (i, n) => `style="--n:${i + 1};--of:${n}"`

// ---------- the sections, the live version first, then the ideas ----------
const whyTop = `${head('Why it matters')}<div class="two"><h2>${why.h2}</h2><div><p class="lead-p">${why.lead}</p><p>${why.p}</p></div></div>`
const howTop = (list) => `${head('How we work together')}<div class="two how"><div><h2>Built with you, not delivered to you.</h2>${photoHow}</div>${list}</div>`

const families = [
  {
    id: 'stats', label: '01', title: 'The figures', sec: 'Why it matters',
    what: "Now: three light numerals on one hairline, a line under each. Luke: \"i think we can put that cool number style that we have as it will look better\". Every idea here sets them in the hero's stripes; they differ in how the three sit together. The figures and their lines are unchanged.",
    pick: "<b>Pick: Scanline.</b> It answers the ask directly, keeps the three equal (they come from three different studies), and on a phone each figure gets a full row at 76px.",
    looks: [
      { name: 'Now', idea: 'The live section.', honest: 'Reads as three more lines of text at 46px on a phone.', html: `<section class="sec"><div class="wrap">${whyTop}<div class="fig">${figs.map(([n, c]) => `<div><b>${n}</b><span>${c}</span></div>`).join('')}</div></div></section>` },
      { name: 'Scanline', pick: true, idea: "The three figures in the hero's stripes, a hairline row each on the phone, three hairline cells with the grain cross on a wide screen.", honest: 'The quietest change. The stripes are a little harder to read than solid ink, so they only work this big. The lines under them stay in solid ink.', html: `<section class="sec"><div class="wrap">${whyTop}<div class="sa">${figs.map(([n, c], i) => `<div class="sa__f">${i ? X('x--t') + X('x--b') : ''}<span class="sa__n scan">${n}</span><span class="sa__c">${c}</span></div>`).join('')}</div></div></section>` },
      { name: 'Ledger', idea: 'Set the way the Worked block sets a sum: the line on the left, the striped figure right-aligned at the end of it.', honest: "It reads like a sum, but nothing adds up and there's no total to rule off. Captions go grey on the phone so the figures lead.", html: `<section class="sec"><div class="wrap">${whyTop}<div class="sb">${figs.map(([n, c]) => `<div class="sb__f"><span class="sb__n scan">${n}</span><span class="sb__c">${c}</span></div>`).join('')}</div></div></section>` },
      { name: 'Ground', idea: "The whole section moves onto the green ground the hero sits on, with the figures in the hero's own white stripes.", honest: 'Strongest on its own. But the Why us band further down is the same green with big white numbers, so the page would have two of them.', html: `<section class="sec sec--ground"><div class="layer band"></div><div class="layer layer--glow"></div><div class="layer layer--static"></div><div class="layer layer--grain"></div><div class="wrap">${whyTop}<div class="sc">${figs.map(([n, c]) => `<div><span class="sc__n">${n}</span><span class="sc__c">${c}</span></div>`).join('')}</div></div></section>` },
      { name: 'Lead figure', idea: 'One figure as big as the hero H1, with the other two under it as a smaller pair.', honest: "It ranks the figures. 2.8x leads only because it comes first, and its source (MYOB) never defines \"growing\". If this one wins, $209k (QuickBooks, 3,790 Australian businesses) would be the sturdier lead, and that's a reorder for Luke to approve.", html: `<section class="sec"><div class="wrap">${whyTop}<div class="sd"><div class="sd__lead"><span class="scan">${figs[0][0]}</span><span class="sd__c">${figs[0][1]}</span></div><div class="sd__rest">${X()}${figs.slice(1).map(([n, c]) => `<div><span class="scan">${n}</span><span class="sd__c">${c}</span></div>`).join('')}</div></div></div></section>` },
    ],
  },
  {
    id: 'steps', label: '02', title: 'The four steps', sec: 'How we work together',
    what: "Now: 01 to 04 in small light type, four hairline rows. Luke: \"same with this section\", meaning the Fill steps from the blog. Every idea uses the Fill numeral (striped, filling from the foot in green as the run goes on). They differ in layout and in whether it moves. Copy unchanged.",
    pick: "<b>Pick: Fill.</b> It's the blog block exactly, so a reader who has seen an article sees the same thing here. It keeps the photo of Luke beside it and needs no script.",
    looks: [
      { name: 'Now', idea: 'The live section.', honest: "The numbers are the smallest type in the row, so the eye reads four grey paragraphs.", html: `<section class="sec sec--off"><div class="wrap">${howTop(`<ol class="steps">${steps.map(([h, p]) => `<li class="rowb"><div><h3>${h}</h3><p>${p}</p></div></li>`).join('')}</ol>`)}</div></section>` },
      { name: 'Fill', pick: true, idea: "The article's steps block: striped numerals, each filled with green to how far along the run it is, a quarter at Talk and solid at Stay.", honest: 'Static. On a phone the photo still sits between the heading and the steps, as it does now.', html: `<section class="sec sec--off"><div class="wrap">${howTop(`<ol class="fill">${steps.map(([h, p], i) => `<li class="rowb" ${of(i, 4)}><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>`)}</div></section>` },
      { name: 'Fill, as you read', idea: "Each numeral fills solid and its row bands green as you scroll to it, like the trace in the Boongalla proposal.", honest: "More alive, but the fill now means \"you've read this far\" rather than \"this far through the job\". It needs a small script. With reduced motion, every row shows filled.", live: true, html: `<section class="sec sec--off"><div class="wrap">${howTop(`<ol class="fill fill--live">${steps.map(([h, p]) => `<li class="rowb"><h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>`)}</div></section>` },
      { name: 'Track', idea: 'The four steps run across the full width on a wide screen, with a cross where each column meets the rule. On the phone, one rule runs down the left with a cross at each step.', honest: 'Gives the section a different shape from everything around it. The photo becomes a wide strip. Four columns get tight below about 900px.', html: `<section class="sec sec--off"><div class="wrap">${head('How we work together')}<div class="tk__top"><h2>Built with you, not delivered to you.</h2>${photoHow}</div><ol class="track">${steps.map(([h, p], i) => `<li ${of(i, 4)}>${X()}<h3>${h}</h3><p>${p}</p></li>`).join('')}</ol></div></section>` },
      { name: 'Cells', idea: "The steps as the page's crossed grid, two by two, with a Fill numeral in each cell.", honest: 'The problem section two sections up is already this grid, so the page would read grid, rows, grid.', html: `<section class="sec sec--off"><div class="wrap">${howTop(`<ol class="cl4">${steps.map(([h, p], i) => `<li ${of(i, 4)}>${i === 0 ? X() : ''}<h3>${h}</h3><p>${p}</p></li>`).join('')}</ol>`)}</div></section>` },
    ],
  },
  {
    id: 'what', label: '03', title: 'What it is', sec: 'What it is',
    what: "Now: a heading, two paragraphs of about 55 words each, then four rows. It's the longest run of body text on the page. The second paragraph is two halves (the AI part, the automation part) written as one block.",
    pick: "<b>Pick: Deck and pair.</b> It cuts no words, and the structure the paragraph already has becomes visible. On the phone, the areas grid breaks the column after a run of rows.",
    looks: [
      { name: 'Now', idea: 'The live section.', honest: 'On a phone this is about 110 words before the first break.', html: `<section class="sec"><div class="wrap">${head('What it is')}<div class="two"><div><h2>${what.h2}</h2><p class="lead-p">${what.lead}</p><p>${what.p}</p></div><div class="areas">${areas.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></div></section>` },
      { name: 'Deck and pair', pick: true, idea: "The first paragraph becomes the heading's deck, set larger. The second splits into the AI part and the automation part, side by side. The areas become a crossed grid under the lot.", honest: 'Copy change: "The AI part is judgment: ..." becomes a label, "The AI part", over "Judgment: reading an email, ...". The automation half gets the same treatment, and the last sentence stands on its own.', html: `<section class="sec"><div class="wrap">${head('What it is')}<div class="two"><h2>${what.h2}</h2><div class="wa__body"><p class="deck">${what.lead}</p><div class="wa__pair">${X()}<div><h3 class="lbl">The AI part</h3><p>Judgment: reading an email, pulling the details out of a photo of a job sheet, drafting the reply.</p></div><div><h3 class="lbl">The automation part</h3><p>The plumbing that moves it along.</p></div></div><p class="wa__close">We build both, and you approve anything that goes out with your name on it.</p></div></div><div class="wa__areas">${X()}${areas.map(([h, p]) => `<div><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></section>` },
      { name: 'Trigger line', idea: 'The pattern the first paragraph names (a job comes in, a quote goes out, an invoice is raised, a follow-up falls due) drawn as four steps on a rule, with a cross at each.', honest: 'Copy change: that clause is lifted out of the sentence into the drawing, and each part gets a capital. The flow is the paragraph\'s example, not a real client\'s workflow.', html: `<section class="sec"><div class="wrap">${head('What it is')}<div class="two"><div><h2>${what.h2}</h2><p class="lead-p">AI automation is a wide term, and that's the point. It covers every part of the business that follows a pattern:</p><ol class="wb__flow">${['A job comes in', 'A quote goes out', 'An invoice is raised', 'A follow-up falls due'].map((t) => `<li>${X()}${t}</li>`).join('')}</ol><p class="lead-p">A system watches for the trigger and does the steps, on the tools you already pay for.</p><p>${what.p}</p></div><div class="areas">${areas.map(([h, p]) => `<div class="rowb"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></div></section>` },
      { name: 'Index', idea: 'The four areas become the landmark: Finance, Sales, Marketing and Operations set large on hairline rows, as the menu sets its links.', honest: "No words cut, and the paragraphs stay as long as they are. It breaks the wall by giving the eye something big to land on, not by shortening it.", html: `<section class="sec"><div class="wrap">${head('What it is')}<div class="two"><h2>${what.h2}</h2><div><p class="lead-p">${what.lead}</p><p>${what.p}</p></div></div><div class="wc__rows">${areas.map(([h, p]) => `<div class="rowb"><h3>${h}</h3><p>${p}</p></div>`).join('')}</div></div></section>` },
    ],
  },
  {
    id: 'includes', label: '04', title: 'What the build includes', sec: 'What the build includes',
    what: 'Now: six label-and-line rows in 15 to 16px, grey on white. It sits straight after the steps, which are also rows, so the two sections run together.',
    pick: "<b>Pick: Ticks.</b> It's a different shape from the Fill rows just above it, it works the same on all four pages, and the names finally read at a size you'd scan.",
    looks: [
      { name: 'Now', idea: 'The live section.', honest: 'A second list of grey rows straight after the steps.', html: `<section class="sec"><div class="wrap">${head('What the build includes')}<div class="two"><h2>Everything you need to run it without us.</h2><div class="spec">${incl.map(([b, s]) => `<div class="rowb"><b>${b}</b><span>${s}</span></div>`).join('')}</div></div></div></section>` },
      { name: 'Ticks', pick: true, idea: "Six things you keep, each marked with the proposal's green square, names set up to 21px, in two columns on a wide screen.", honest: 'A tick reads as "done", which suits a handover list. On the phone it is still six rows, just easier to scan.', html: `<section class="sec"><div class="wrap">${head('What the build includes')}<h2>Everything you need to run it without us.</h2><ul class="ia">${incl.map(([b, s]) => `<li><div><b>${b}</b><span>${s}</span></div></li>`).join('')}</ul></div></section>` },
      { name: 'Cells', idea: 'The six as the crossed grid: three by two on a wide screen, with alternating white and grey cells on the phone.', honest: "It's the third crossed grid on the page, after the problem section and the industries.", html: `<section class="sec"><div class="wrap">${head('What the build includes')}<h2>Everything you need to run it without us.</h2><div class="ib">${incl.map(([b, s], i) => `<div>${i === 0 || i === 1 ? X() : ''}<b>${b}</b><span>${s}</span></div>`).join('')}</div></div></section>` },
      { name: 'Stages', idea: 'The same six, grouped by when you get them: before anything is built, the build, after handover.', honest: "The grouping is my reading of the copy, and putting Training in the build is a guess. Each page would need its own grouping, and the search page's work is monthly, so it doesn't fit.", html: `<section class="sec"><div class="wrap">${head('What the build includes')}<h2>Everything you need to run it without us.</h2><div class="ic">${[['Before anything is built', [0]], ['The build', [1, 2, 3]], ['After handover', [4, 5]]].map(([g, ix], gi) => `<div class="ic__g"><h3 class="lbl"><i>${gi + 1}</i>${g}</h3><ul>${ix.map((i) => `<li><b>${incl[i][0]}</b><span>${incl[i][1]}</span></li>`).join('')}</ul></div>`).join('')}</div></div></section>` },
    ],
  },
  {
    id: 'about', label: '05', title: 'About', sec: 'About',
    what: "Now: the photo, a heading, then two paragraphs. The second holds three different ideas in a row: what we automate, what we won't, and the test.",
    pick: "<b>Pick: Pair.</b> \"We automate\" and \"we won't\" is a real do and don't, the case the pair block was made for, and \"we won't\" is the line that sets UnderCurrent apart.",
    looks: [
      { name: 'Now', idea: 'The live section.', honest: 'Readable, but the best line, "we won\'t automate the part where you talk to your customer", sits in the middle of a grey paragraph.', html: `<section class="sec"><div class="wrap">${head('About')}<div class="two about">${photoAbout}<div><h2>${about.h2}</h2><p class="lead-p">${about.lead}</p><p>${about.p}</p><a class="link" href="#">More about us</a></div></div></div></section>` },
      { name: 'Pair', pick: true, idea: 'What we automate and what we won\'t, side by side, with the "won\'t" set up. The test follows in a line under them.', honest: 'Copy change: "We automate" and "We won\'t automate" become labels, and the rest of each sentence sits under its label.', html: `<section class="sec"><div class="wrap">${head('About')}<div class="two about">${photoAbout}<div><h2>${about.h2}</h2><p class="lead-p">${about.lead}</p><div class="aa__pair">${X()}<div><h3 class="lbl">We automate</h3><p>The boring, repeated work: the quoting, the chasing, the copying from one screen to another.</p></div><div><h3 class="lbl">We won't automate</h3><p>The part where you talk to your customer.</p></div></div><p class="aa__test">We pick what to build with one test: how many hours a week it gives back.</p><a class="link" href="#">More about us</a></div></div></div></section>` },
      { name: 'Pull line', idea: 'The test the paragraph ends on is lifted out and set large under a rule in ink, with the answer in green.', honest: 'The lightest touch: one sentence moves and nothing is reworded. "We won\'t" stays where it is now, in the middle of the paragraph.', html: `<section class="sec"><div class="wrap">${head('About')}<div class="two about">${photoAbout}<div><h2>${about.h2}</h2><p class="lead-p">${about.lead}</p><p>We automate the boring, repeated work: the quoting, the chasing, the copying from one screen to another. We won't automate the part where you talk to your customer.</p><p class="ab__pull">We pick what to build with one test: <span>how many hours a week it gives back.</span></p><a class="link" href="#">More about us</a></div></div></div></section>` },
      { name: 'Facts', idea: 'Both paragraphs become a spec sheet: who, where, what is under one roof, what we automate, what we don\'t, and the test.', honest: 'The biggest copy change, and it loses the voice ("so nothing gets lost between..."). It works as a scan and reads as a form.', html: `<section class="sec"><div class="wrap">${head('About')}<div class="two about">${photoAbout}<div><h2>${about.h2}</h2><dl class="acf"><div><dt>Run by</dt><dd>Luke Marinovic, out of Melbourne</dd></div><div><dt>Under one roof</dt><dd>Strategy, design, code and automation</dd></div><div><dt>We automate</dt><dd>The quoting, the chasing, the copying from one screen to another</dd></div><div><dt>We don't</dt><dd>The part where you talk to your customer</dd></div><div><dt>The test</dt><dd>How many hours a week it gives back</dd></div></dl><a class="link" href="#">More about us</a></div></div></div></section>` },
    ],
  },
]

// ---------- the frame and the board ----------
const liveJs = `<script>(function(){var r=[].slice.call(document.querySelectorAll('.fill--live>li'));if(matchMedia('(prefers-reduced-motion: reduce)').matches||!('IntersectionObserver' in window)){r.forEach(function(l){l.classList.add('on')});return}var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{rootMargin:'0px 0px -30% 0px'});r.forEach(function(l){io.observe(l)})})()</script>`
const pinJs = `<script>document.addEventListener('click',function(e){var r=e.target.closest('.rowb');if(r)r.classList.toggle('on')})</script>`
const frame = (look) => `<!doctype html><html lang="en-AU"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet"><link rel="stylesheet" href="/services-concepts.css?v=${V}"></head><body>${look.html}${look.live ? liveJs : ''}${pinJs}</body></html>`
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')

const board = `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Service Pages Board</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&display=swap" rel="stylesheet">
<style>
/* the board's own chrome. The frames carry /services-concepts.css */
:root{--white:#fff;--off:#f6f6f6;--ink:#141414;--ink-2:#6b6b6b;--line:rgba(20,20,20,.14);--c0:hsl(160 45% 34%);--pad:clamp(16px,4vw,56px);
  --noise-coarse:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.32' numOctaves='1' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,sans-serif;color:var(--ink);background:var(--white);-webkit-font-smoothing:antialiased;line-height:1.5}
a{color:inherit;text-decoration:none}
.bar{position:sticky;top:0;z-index:5;display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:8px 28px;padding:14px var(--pad);background:var(--white);box-shadow:0 1px 0 var(--line)}
.bar b{font-size:15px;font-weight:500;letter-spacing:-.01em}
.jump,.toggle{display:flex;flex-wrap:wrap;gap:2px 18px}
.jump a,.toggle button{font:inherit;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2);padding:6px 0;border:0;border-bottom:1px solid transparent;background:none;cursor:pointer;transition:color .3s,border-color .3s}
.jump a:hover,.toggle button:hover{color:var(--ink)}
.toggle button[aria-pressed=true]{color:var(--ink);border-bottom-color:var(--c0)}
:focus-visible{outline:1px solid var(--ink);outline-offset:4px}
main{max-width:1520px;margin:0 auto;padding:0 var(--pad) 120px}
.intro{max-width:76ch;padding:clamp(40px,6vw,88px) 0 0}
.intro h1{font-size:clamp(32px,4.4vw,60px);font-weight:500;letter-spacing:-.035em;line-height:1.04}
.intro p{margin-top:16px;font-size:16px;line-height:1.6;color:var(--ink-2)}
.intro p b{font-weight:500;color:var(--ink)}
.fam{margin-top:clamp(64px,8vw,120px);padding-top:20px;border-top:1px solid var(--line);scroll-margin-top:90px}
.label{display:flex;gap:14px;font-size:12px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-2)}
.fam h2{margin-top:clamp(24px,3vw,44px);font-size:clamp(30px,3.4vw,46px);font-weight:500;letter-spacing:-.03em;line-height:1.08}
.what{margin-top:14px;max-width:80ch;font-size:16px;line-height:1.6;color:var(--ink-2)}
.pick{margin-top:14px;max-width:80ch;font-size:16px;line-height:1.6}
.pick b{font-weight:500}
.looks{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,330px),1fr));margin-top:clamp(28px,4vw,48px);border-top:1px solid var(--line);border-left:1px solid var(--line)}
.look{position:relative;display:flex;flex-direction:column;min-width:0;padding:20px 16px 22px;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}
.look:nth-child(even){background:var(--off)}
.look__head{display:flex;flex-wrap:wrap;align-items:baseline;gap:6px 12px}
.look h3{font-size:22px;font-weight:500;letter-spacing:-.02em;margin-right:auto}
.tag{display:inline-flex;align-items:center;gap:8px;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:var(--ink)}
.tag::before{content:"";width:11px;height:11px;background:linear-gradient(var(--c0),var(--c0)),var(--noise-coarse) 0 0/220px 220px;background-blend-mode:multiply;-webkit-mask:linear-gradient(#000,#000) center/1px 100% no-repeat,linear-gradient(#000,#000) center/100% 1px no-repeat;mask:linear-gradient(#000,#000) center/1px 100% no-repeat,linear-gradient(#000,#000) center/100% 1px no-repeat}
.tag--now{color:var(--ink-2)}.tag--now::before{content:none}
.idea{margin-top:10px;font-size:15px;line-height:1.5}
.stage{margin-top:14px;overflow:hidden;background:#fff;box-shadow:0 0 0 1px var(--line)}
iframe{display:block;border:0;width:390px;height:400px;transform-origin:0 0}
.honest{margin-top:12px;font-size:14px;line-height:1.5;color:var(--ink-2)}
.honest b{font-weight:500;color:var(--ink)}
body.desk .looks{grid-template-columns:1fr}
body.desk iframe{width:1440px}
@media (min-width:700px){.look{padding:22px 22px 24px}}
/* on a phone the bar keeps to two lines (the jump list scrolls sideways) and the frames run edge to
   edge, so a 390 frame shows at its real size */
@media (max-width:699px){
  .bar{gap:4px 18px;padding:10px var(--pad)}
  .jump{flex-wrap:nowrap;width:100%;overflow-x:auto;scrollbar-width:none;white-space:nowrap;order:3}
  .jump::-webkit-scrollbar{display:none}
  .looks{margin-inline:calc(-1*var(--pad));border-left:0}
  .look{padding:20px 0 22px;border-right:0}
  .look>:not(.stage){padding-inline:var(--pad)}
  .stage{box-shadow:0 1px 0 var(--line),0 -1px 0 var(--line)}
}
</style>
</head>
<body>
<header class="bar"><b>Service pages, the ideas</b>
  <nav class="jump" aria-label="Sections">${families.map((f) => `<a href="#${f.id}">${f.title}</a>`).join('')}</nav>
  <div class="toggle" role="group" aria-label="Frame width">
    <button type="button" data-mode="phone" aria-pressed="true">Phone 390</button>
    <button type="button" data-mode="desk" aria-pressed="false">Desktop 1440</button>
  </div>
</header>
<main>
  <section class="intro">
    <h1>Bringing the service pages up to the blog and the proposal</h1>
    <p>Five sections of the AI Automation page, each shown as it is now and then three or four ideas for it, all at 390 first. Use the toggle top right for 1440. The copy and figures are the page's own, and every idea says plainly where it changes a word. Whichever idea wins in each section goes onto all four pages through one shared component, in that page's colour.</p>
    <p><b>Staying as they are:</b> the green Why us band (untouched, on every page), the hero, the problem grid, the work cards, testimonials, who it's for, the FAQ, other services and contact. Each of those already has its own shape.</p>
    <p><b>To pick:</b> one name per section. A row with a green band can be tapped (that's the live pages' hover).</p>
  </section>
${families.map((f) => `  <section class="fam" id="${f.id}" aria-labelledby="${f.id}-h">
    <p class="label"><span>${f.label}</span><span>${f.sec}</span></p>
    <h2 id="${f.id}-h">${f.title}</h2>
    <p class="what">${f.what}</p>
    <p class="pick">${f.pick}</p>
    <div class="looks">
${f.looks.map((l) => `      <article class="look">
        <div class="look__head"><h3>${l.name}</h3>${l.pick ? '<span class="tag">Pick</span>' : l.name === 'Now' ? '<span class="tag tag--now">Live</span>' : ''}</div>
        <p class="idea">${l.idea}</p>
        <div class="stage"><iframe title="${f.title}, ${l.name}" loading="lazy" srcdoc="${attr(frame(l))}"></iframe></div>
        <p class="honest"><b>Honest:</b> ${l.honest}</p>
      </article>`).join('\n')}
    </div>
  </section>`).join('\n')}
</main>
<script>
// the board's behaviour: fit each frame to its content, scale it to its cell
var frames = [].slice.call(document.querySelectorAll('iframe'));
function fit(f) {
  var d = f.contentDocument; if (!d || !d.body) return;
  var desk = document.body.classList.contains('desk');
  var w = f.parentNode.clientWidth, scale = Math.min(1, w / (desk ? 1440 : 390));
  f.style.transform = scale < 1 ? 'scale(' + scale + ')' : '';
  f.style.height = '10px';
  var h = d.documentElement.scrollHeight;
  f.style.height = h + 'px';
  f.parentNode.style.height = Math.ceil(h * scale) + 'px';
}
frames.forEach(function (f) { f.addEventListener('load', function () { fit(f); setTimeout(function () { fit(f) }, 600) }) });
function mode(m) {
  document.body.classList.toggle('desk', m === 'desk');
  [].forEach.call(document.querySelectorAll('.toggle button'), function (b) { b.setAttribute('aria-pressed', String(b.dataset.mode === m)) });
  frames.forEach(fit);
}
[].forEach.call(document.querySelectorAll('.toggle button'), function (b) { b.addEventListener('click', function () { mode(b.dataset.mode) }) });
addEventListener('resize', function () { frames.forEach(fit) });
if (document.fonts) document.fonts.ready.then(function () { frames.forEach(fit) });
if (location.hash === '#desk') mode('desk');
</script>
</body>
</html>
`
fs.writeFileSync(OUT, board)
console.log('wrote', OUT, (board.length / 1024).toFixed(0) + 'KB', families.reduce((n, f) => n + f.looks.length, 0), 'frames')
