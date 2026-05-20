# Handoff — Build an "Admin Time Recovered" calculator for the tradie-admin article

**Owner:** Luke Marinovic
**Source brief written:** 2026-05-20
**Receiving agent:** any (open a fresh Claude Code window in `~/UnderCurrent/Builds/Products/Website/undercurrent/`)
**Estimated build:** ~2 hours including styling, accessibility pass, deploy verification

---

## Why this exists

`/blog/how-much-time-tradies-spend-on-admin-australia` is currently a 99/100 Exceptional-tier article (per the `/article-review` skill, May 2026). A second reviewer flagged the highest remaining ROI move:

> "Build a calculator (hours saved × hourly rate × weeks) as an interactive widget on this page. Everything else is fine-tuning."

The article already contains every input the calculator needs. We just don't have the widget. Adding it should lift dwell time, increase bookmarks/shares, and give Perplexity/ChatGPT a structurally-novel signal on the page (interactive components are rare in this niche).

This brief is fully scoped — do NOT re-design from scratch. Build what's specced here, verify, ship.

---

## What to build

A self-contained React **client component** (`'use client'`) that lives in the website repo and renders inline inside the tradie-admin article. Three numeric inputs, three computed outputs, real-time recalculation.

### Inputs

| Input | Default | Range | Step | Format | Notes |
|---|---|---|---|---|---|
| Hours per week on admin | 10 | 0-30 | 0.5 | "hrs/wk" | Slider + number input, bound together |
| Hourly billable rate (AUD) | 90 | 30-200 | 5 | "$ AUD/hr" | Prefix $, the article's own midpoint figure |
| Working weeks per year | 48 | 30-52 | 1 | "weeks" | The article uses 48 (accounting for holidays + downtime) |

### Outputs (live, no submit button)

| Output | Formula | Format |
|---|---|---|
| Weekly cost | `hours × rate` | "$ AUD per week" |
| Annual cost | `hours × rate × weeks` | "$ AUD per year" — bold, large |
| Equivalent extra working weeks | `(hours × weeks) / 40` | "X.X weeks per year" — frame as "that's X weeks of pure paperwork" |

### Optional bonus output (only if it lands cleanly)

A small comparison row showing:
- Annual cost at current inputs
- Annual cost if automation claws back 70% (cite the article's "6 to 8 hours back from 10 typical")
- Delta = annual recovery, framed as "$X back in your pocket per year"

Don't add this if it bloats the component; it's nice-to-have.

---

## Where it goes in the article

`content/articles/how-much-time-tradies-spend-on-admin-australia.md`

Insert between these two H2 sections (current line numbers approximate, find by H2 text):

```
## What does 10 hours of admin per week cost over a year?
... (existing section body) ...

[INSERT CALCULATOR HERE]

## Which side of the Tradie Admin Triangle should you automate first?
```

The calculator goes after the section that does the static math, so the reader can plug in their own numbers right after seeing the example. Natural placement, no rewriting of surrounding prose needed.

---

## How to embed a React component in a markdown article

The website renders articles via `src/views/Article.jsx` using `marked` + DOMPurify (per memory: inline SVG support was added in PR #24, May 2026). It does NOT currently support arbitrary React component embedding via markdown.

Two paths — pick whichever you can ship cleanly:

### Path A (preferred — minimal renderer change)

Add a **custom HTML token** to the markdown renderer. Pattern:

```html
<!-- calc:tradie-admin -->
```

In `src/views/Article.jsx`, detect this HTML comment in the body markdown, split the rendered output around it, and inject the `<TradieAdminCalculator />` React component at that position. Use the same approach as you'd use for any custom block — render top half → component → render bottom half.

This keeps the markdown source clean, the comment is invisible in plain-text fallback, and other articles can register other calculators later by adding more `<!-- calc:* -->` tokens.

### Path B (fallback — server component)

If Path A blows up on the marked tokenizer, render the calculator unconditionally below the article body when frontmatter has `calculator: "tradie-admin"`. Article frontmatter gains a new optional field. Simpler but less flexible.

**Pick Path A unless it costs more than 30 minutes of fighting the renderer.** Stop after 30 min and switch to B.

---

## Component file location

```
src/components/calculators/TradieAdminCalculator.jsx   ← the component
src/components/calculators/Calculator.module.css       ← scoped styles, brand tokens
```

Use a `calculators/` subfolder because we'll build more of these (ROI, automation savings, etc).

---

## Styling — match the brand

The site uses these tokens (verified in existing inline SVG charts in `content/articles/seo-pricing-australia-2026.md`):

```
Background:  #2A2A28  (dark canvas)
Text:        #F7F3ED  (off-white)
Sage accent: #8FAF9F  (primary action / positive)
Orange:      #D89B6D  (warning / cost emphasis)
Blue:        #5B7A9F  (secondary)
```

Fonts: site-wide Inter / system stack — inherit from the article body, don't import anything new.

Calculator box should sit visually as a **callout** — distinct from prose, on a slightly lifted background, with a 1px sage hairline border. Not pop-out enough to interrupt the read; clear enough that it reads as interactive. Reference: the comparison table styling already in the article.

Sliders should have visible thumb + track. Use native `<input type="range">` with custom CSS for the track/thumb — keeps it accessible and small. Avoid React libraries.

Mobile: stack inputs vertically below 640px. Outputs always stack. Touch target ≥ 44px on slider thumbs.

---

## Accessibility (non-negotiable)

- All inputs have visible `<label>` AND `aria-label`
- Number inputs are bound to sliders so screen-reader users can type directly
- Outputs are inside an `aria-live="polite"` region so screen readers announce updated annual cost on input change
- Heading hierarchy: calculator's title is an `<h3>`, inside the parent `## What does 10 hours of admin per week cost over a year?` section
- Colour contrast: all text on `#2A2A28` background must meet WCAG AA (4.5:1 for normal text, 3:1 for large)
- Keyboard nav: tab through all 3 inputs in order, arrow keys adjust sliders

---

## What it should NOT do

- No user-account state, no API calls, no localStorage. Pure client computation.
- No "Email me the result" or "Send to my inbox" capture. This is a thinking tool, not a lead funnel. The article's existing `/audit` CTA below the calculator does the conversion.
- No analytics events beyond whatever Plausible/Vercel Analytics is doing site-wide. Don't add tracking pixels.
- No third-party calculator libraries. Build it raw — 80 lines of React max.
- Don't change the 99/100 rubric pass. Specifically:
  - Don't push the host H2 section ("What does 10 hours of admin per week cost over a year?") out of 134-167 word range. Calculator HTML doesn't count as section words (regex strips it as a code-like block), but verify with the markdown extractor before shipping.
  - Don't add new CTAs. Keep the existing hero/mid/end /audit CTAs intact.

---

## Verification checklist before merging

Run these end-to-end before opening a PR:

1. **Local dev** — `pnpm dev`, open the article, plug in `10 hours / $90 / 48 weeks`, confirm annual = $43,200 (matches the article's static example exactly).
2. **Mobile preview** — Chrome DevTools mobile viewport, verify stack layout + 44px touch targets.
3. **Keyboard nav** — tab through inputs, arrow keys move sliders, no focus traps.
4. **Screen reader spot-check** — VoiceOver on Mac: focus the annual-cost output, change a slider, confirm it announces the new figure.
5. **Lighthouse a11y** — score should not drop on the article page.
6. **Re-run `/article-review`** on the live URL after merge. Score must stay ≥ 95. Use:
   ```
   python3 ~/.claude/skills/article-review/scripts/scrape.py <url> > /tmp/ar-tradie-rerun2/scrape.json
   ```
   with `maxAge=0` override (FireCrawl caches — see lab-notes 2026-05-20 for the bypass pattern).
7. **Mutual link check** — confirm the 4 reciprocal cluster links from the May 2026 PR (overdue-invoices, lose-jobs-before-quoting, simplest-automation-tasks, ai-optimise-tradie) still land on this URL and aren't broken by the calculator's DOM insertion.

---

## Reuse note

After this calculator ships, the next obvious build is an **ROI calculator** that drops onto `/roi` and the AI-automation service pages. Same component pattern, different formula:

- Inputs: weekly hours saved, hourly rate, monthly automation cost
- Outputs: monthly net, annual net, payback period

Keep `TradieAdminCalculator` focused — don't generalise it prematurely. Build the second one when needed, then extract the shared bits.

---

## Files you'll touch

1. `src/components/calculators/TradieAdminCalculator.jsx` — NEW
2. `src/components/calculators/Calculator.module.css` — NEW
3. `src/views/Article.jsx` — small edit to detect and inject custom calculator token (Path A) or render conditionally from frontmatter (Path B)
4. `content/articles/how-much-time-tradies-spend-on-admin-australia.md` — add the `<!-- calc:tradie-admin -->` token between the two H2s named above
5. `next.config.mjs` — likely no change needed; verify build doesn't trip on the new component

---

## Out of scope (don't touch)

- The article's prose, citations, schema, frontmatter dates, SVG charts, or existing CTAs. All scored at 99/100, locked.
- The `app/layout.js` title template — already adjusted at the blog-post route level (May 2026).
- The Foundations cluster structure or any other article.
- Building a second calculator. One thing at a time.

---

## Acceptance criteria

PR is ready to merge when:

- [ ] Calculator renders inline in the live article preview between the two named H2s
- [ ] Default inputs (10 / $90 / 48) produce annual cost = $43,200 exactly
- [ ] Sliders + number inputs are bound together (changing one updates the other)
- [ ] Mobile layout stacks cleanly, touch targets ≥ 44px
- [ ] Keyboard + screen-reader accessibility verified manually
- [ ] Lighthouse a11y score does not drop on this article page
- [ ] `/article-review` re-scored on the live URL stays ≥ 95
- [ ] All 4 reciprocal cluster links still resolve
- [ ] No new analytics, no API calls, no third-party libs
- [ ] The 5 verification steps above all pass

Stop work and ask Luke before merging if any criterion fails.
