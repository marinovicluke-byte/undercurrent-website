---
ai-assisted: true
source: claude-code
date: 2026-10-02
---

# Article blocks, round 3: the reply

**Preview:** https://undercurrent-website-llags3l7l-marinovicluke-bytes-projects.vercel.app (Vercel auth)
- Board: `/article-blocks-concepts.html` (phone and desktop toggle top right)
- Proof: `/blog/what-is-ai-automation-australia`

Branch `design/article-blocks-mobile`, pushed. Nothing merged, nothing on main.

## What the live site is made of

Full notes are in `docs/blocks-design-notes.md`. In short:

- **Grain** is SVG noise inlined as data URIs, blended over the category colour and jittered with `steps()`, so it reads as live film grain. It lives on colour: the hero, the cards, the bands, the footer.
- **The cross** is a 13px "+" cut from (category colour × coarse grain). It sits where the hairlines of the logo and problem grids meet. On white paper it is the only place grain shows up.
- **Lines:** one 1px hairline, a full-width rule with a tracked caps label opening every section, hairline rows, and grids of cells alternating white and #f6f6f6.
- **Scanlines** cut the hero H1s: stripes .014em on per .043em, clipped to the type.
- **Type** is Inter only: 500 headings, 300 light numerals, 18px body, two greys.
- **Corners** are square everywhere.
- **Colour** means category, and on paper it only appears at the size of a mark.

Everything below is built from those parts, and nothing else.

## What Ledger, Ramp and Pills had in common

Nothing is boxed, the hairline is the only structure, and the type does the work: a numeral carries the order, a label carries the side. All 19 looks start from that, and all 19 are new.

## Steps (four looks)

| Look | The idea | Honest |
|---|---|---|
| **Fill** (pick) | The numerals use the hero's striped lettering, and each one fills from the foot in the article's colour as far as the run has gone: a third full at step one of three, solid at the last. | The colour is the biggest on the paper after the hero, and past eight steps the fills differ by a sliver. |
| Relay | The steps are the service page's problem grid read left to right, with the grain cross on the hairline where one step hands to the next. | The idea only shows on a wide screen. On a phone the cells stack and it becomes a numbered list with crosses on its rules. |
| Command | Each step is set as a headline, and its number shrinks to a mark in the margin, so a short run reads as orders. | It's built for one-line steps. The longer recipe steps on the site would turn into walls of big type. |
| Signal | There are no numerals at all. Every step carries the whole run as the carousel's dots: the ones behind it in ink, its own in the colour, the ones ahead in grey. | You can't say "step three" out loud, and past seven steps the dots run long on a phone. |

**Why Fill:** it keeps what you liked in Ledger and Ramp, a numeral column on hairlines and order you can see. It draws them in the hero's own lettering, and no other site has that numeral.

## Pair (four looks)

| Look | The idea | Honest |
|---|---|---|
| Strike | The worse side is crossed out like an edit and the better side is left standing, so the verdict is in the text, not in a colour. | Struck text is slower to read, and the "before" list is still worth reading. |
| **Weight** (pick) | The type is the verdict: the better side is set large in ink and gets more of the width, and the other drops to small grey. | The small side really is small at 14px. With equals it is two plain lists. |
| Across | You read line against line. The two lists share one set of rows, so each line sits beside its counterpart, on a phone too. | Lines that don't correspond still sit side by side as if they did, and on a phone each column is 160px wide. |
| Signed | Every line carries a sign: the grain cross for the side that helps, a dash for the side that costs. A line quoted alone still says which side it came from. | The sign is drawn, not written, so an engine quoting a line gets the words without the sign. |

**Why Weight:** the verdict reads at a glance from type alone, with nothing boxed. Both sides stay true and legible, and a pair of equals (Free and Paid) stays equal. It is Pills with the pills taken off. Strike is the bolder second, but crossing out "Cash tied up: $56,000" reads as if the figure were wrong.

## Data table (four looks)

| Look | The idea | Honest |
|---|---|---|
| **Rail** (pick) | On a phone the row names hold still and the options snap past one column at a time. Each column is numbered, and a hairline fills as you swipe. It is CSS only, over a real `<table>`. | On a phone you compare one option at a time, never two side by side. From 761px it is the plain table. |
| Ledger | It reads as an account book: figures in tabular numerals, right-aligned, a rule down every column and a double rule to close, on the grain like paper. | It only earns its keep on figures, and the cutoffs table is all dates and words. It scrolls sideways on a phone. |
| Pick | One column is the answer. A bold header in the markdown marks it. That column reads in full ink under the colour's underline while the rest recede, and on a phone it leads every row. | The writer has to bold the pick. A table without one gets the phone stack and no emphasis. |
| Turn | The column names turn on their side so every column fits a phone: nothing scrolls, nothing hides, and the grid stays a grid. | Long cell text wraps narrow, and past four columns the cells get too thin to read. |

**Why Rail:** it is the snap rail you asked for, done the other way round from round 2. The row names stay put and the options move, so a four-column comparison reads on a phone with nothing squeezed.

## Quick Answer (four looks)

All four keep the same DOM order: the label, a `<p><strong>`, a `<ul>`. Nothing sits behind a tap.

| Look | The idea | Honest |
|---|---|---|
| Statement | The answer is the biggest sentence on the page after the title, set the way the homepage sets its opening line, with the points as fine print under it. | A 44px sentence makes the page open slower. It suits answers of one or two lines, not three. |
| **Deck** (pick) | The answer is the title's deck. It sits in the hero under the H1, on the category ground, so title and answer are one glance. | The hero gets tall and the description line gives way to the answer. The page renders the answer in a different place for this look. |
| Margin | On a wide screen the answer stands in the margin beside the opening, a note that stays there the whole time you read. Under 1200px its label runs in ahead of the answer, like a newspaper lead-in. | It only becomes a margin note from 1200px. On a laptop and a phone it is the run-in. |
| Grid | The answer is the lead cell of the service page's crossed grid, and every point gets a cell of its own, read at a glance the way the problems are. | It's the widest look, running past the reading column on desktop, and with three points one cell sits empty. |

**Why Deck:** title and answer land in one glance, above the fold, on the grain. In the HTML the answer comes straight after the H1, which is where an answer engine looks for it. It does change the hero you locked on 6 September (the description line makes way). If that's a no, Statement is one word away in `BLOCK_LOOKS` and is the safe second.

## Workings (three looks), and the 1-of-1 move

**The 1-of-1: the site does the maths.** The transform reads every Workings block. A label with its own sum ("30 leads x $60") has to come to its value. A total has to be the product or the sum of the lines above it. The transform works out which, writes the sign into the text (`Admin hours a week, 10 × Working weeks a year, 48 × … = Cost of that admin a year, $38,400`), and throws if the sum doesn't hold, which stops the build. All four Workings blocks on the site pass. The signs are drawn as the site's grain cross: upright for plus, turned 45° for times, two hairlines for equals. The answer is set in the hero's striped lettering. So a site that sells "numbers, not adjectives" can't publish a wrong sum, and every sum it shows wears the brand's own marks.

| Look | The idea | Honest |
|---|---|---|
| **Worked** (pick) | The sum is set the way you'd do it on paper: figures stacked and right-aligned in light numerals, the sign beside each one, a rule under the last line, the answer in the stripes. | On a phone a long label wraps to three lines beside its figure. |
| Tally | The result is kept as you go. Each line carries the running figure on the right, growing with every line, so you watch 10 become 480 become $38,400. | Only a chained sum has a running figure. The Google Ads lines each carry their own sum, so there it is a plain list. |
| Equation | The sum is one line across the column, each figure captioned underneath the way the homepage captions its stats, with the answer last in the stripes. | It wraps on a phone, and a figure with words in it ("$80 an hour") takes a line to itself. |

**Why Worked:** it handles every shape of sum on the site, chained or self-contained, and reads like a page of workings on a phone and on a desk. Equation is the louder one on desktop and worth a look.

## What changed

- `6235fcc`: round 2's BRAND.md styling is removed in its own commit (blue, Satoshi/Switzer, rounded tiles, offset cards, the Switzer files).
- `lib/remarkArticleBlocks.js`: the checked maths, sign spans, running figures, the pick column (a bold header), figure columns (dates excluded), and step and pair counts for the looks.
- `app/styles/article-blocks.css`: the 19 looks plus a base on the live tokens.
- `app/blog/[slug]/page.js`: the `QuickAnswer` component and the Deck placement. `BLOCK_LOOKS` is `{ steps: 'fill', pairs: 'weight', data: 'rail', qa: 'deck', work: 'worked' }`.
- The proof article keeps its tightened text. The only change is that its table header bolds **AI automation** (the pick, invisible in every look but Pick). The fence migration and the photos are untouched.
- The board is rebuilt in the live style, with the idea and an honest line under every look. The rebuild script is `scripts/build-blocks-board.mjs`.

## Verified

- `next build` run directly (not `npm run build`, so no IndexNow ping). It passes with every article building, which means every Workings sum on the site checks out.
- curl against `next start`: the proof returns 200 and has one H1. The answer follows the H1 in the HTML (label, strong sentence, list), the pick header is marked, and the sum's text reads with its signs. Five other articles, the board and the homepage return 200.
- Screenshots in `docs/screenshots/`: the proof at 390 and 1440, and the board at 390, 1440 and 1440 desktop mode. Each of the 19 frames was also checked at both widths during the build. One fix round covered row headers in caps, Turn's names on the wrong edge, Equation wrapping on desktop, Fill's fill fraction and a missing grid cross.
- The impeccable detector flagged the scanline lettering (gradient text), the cross and dot gradients, and Inter. All three are the live site's own vocabulary, so they stay. Its em-dash count was the `--` in class names; the board has zero real em dashes.

## Open, or worth knowing

- The proof has no pair, so Weight shows only on the board. It is live on the three articles with pairs.
- Deck alters the locked article hero (see above). It is a one-word revert.
- The repo `CLAUDE.md` "Hard Rules" (Space Grotesk, 14px radius, offset shadows) describe the retired design, not the live one. I followed the live site and logged it in `lab-notes.md`. The CLAUDE.md itself is unchanged and needs your call.
- `public/fonts/Satoshi-Variable.woff2` was in the repo before round 2. It is unused and left alone.
- I ran this from the brief without stopping to ask questions; the impeccable skill's interview step was skipped because the brief was complete.
