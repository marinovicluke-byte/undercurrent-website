---
ai-assisted: true
source: claude-code
date: 2026-10-02
---

# Article blocks, round 3 locked: the reply

**Preview:** https://undercurrent-website-6yv03bkoq-marinovicluke-bytes-projects.vercel.app (Vercel auth; built from `ab5fc9a`, all code in).
- Proof: `/blog/what-is-ai-automation-australia`
- A one-paragraph Deck: `/blog/seo-pricing-australia-2026`
- The board, now a record: `/article-blocks-concepts.html`

Branch `design/article-blocks-mobile`, pushed. Nothing merged, nothing on main.

## What shipped

Luke's picks are the only looks on the site: steps **Fill**, pairs **Weight**, tables **Rail**, Quick Answer **Deck**, workings **Worked**.

- **The stylesheet** (`app/styles/article-blocks.css`) carries only those five, styled directly on the blocks. The look classes and `BLOCK_LOOKS` are gone. The site's CSS contains none of the other 14 looks (checked by grepping the served CSS).
- **The transform** (`lib/remarkArticleBlocks.js`) drops what only the unshipped looks used: Tally's running figure, Pick's bold column, Ledger's figure columns, and Across's shared row count. It keeps Fill's step positions, the checked maths with drawn signs for Worked, the column count for Rail, and the before/after tones for Weight.
- **The page** (`app/blog/[slug]/page.js`) always renders the Quick Answer in the hero, under the H1, in place of the description. An article with no Quick Answer (ten of them) keeps its description line.
- **The board** is frozen as the round 3 record on its own stylesheet (`public/article-blocks-concepts.css`). That stylesheet is a copy and is no longer built from the site's. All 19 looks still work there, and a note at the top says which five shipped. The generator is retired; commit `54ab531` has it. `robots.txt` disallows `/article-blocks-concepts` for all 16 agents, the page carries `noindex`, and the sitemap never listed it.
- **CLAUDE.md:** the hard rules now describe the live design, from `docs/blocks-design-notes.md`. Committed on its own (`bb6a626`).

## The sweep

I swept all 68 articles at 390 and 1440 with the picks on: 136 pages, plus a crop of every block (515 images). Each page was checked for sideways overflow and for anything poking out of the column. The whole sweep ran again after the fixes, then a final overflow pass ran in both Chromium and WebKit (Safari's engine). Result: all 272 page loads returned 200, styled, with no sideways overflow.

What it found, and what I fixed:

| Case | What broke | Fix |
|---|---|---|
| Fill, a run of ten (`seo-for-small-business`) | Two-digit numerals at 52px crowd their 64px column | Runs of ten or more set the numerals smaller (36px phone, 52px desktop) |
| Fill, long steps (up to 286 characters, `why-tradies-dont-get-google-reviews-australia`) | Nothing | None needed |
| Deck, a one-paragraph answer (57 articles) | The paragraph took the answer sentence's 19 to 23px size, and grey lines would have shown on the colour | A one-paragraph answer sets at 16px, with any bold lead in full white. Hairlines and grey turn white on the ground |
| Deck, a three-line answer | Nothing; the answer wraps inside a 42-character measure | None needed |
| Rail, tables of five to eight columns (13 tables) | On a phone, nothing. On desktop, the 7- and 8-column tables were clipped at the right edge of the 760px column with no cue | From 1100px, a table of five or more columns steps out to the page's full width, like a wide figure. Seven and eight columns fit at 1440 |
| Rail, two-column tables (12 tables) | A rail of one option would read "1 / 1, 1 columns, swipe" | A one-column table is marked and stays a plain table |
| Rail counters | WebKit showed "1 / 0" and "0 columns"; Chromium showed "1 / 3" on every column. My first-column screenshots hid it | The counter reset moved from the wrapper (a size container, which also contains counters) to the `<table>`. Both engines now count 1 / 3, 2 / 3, 3 / 3 |
| Weight, a title with a bracketed note | "CORE BUSINESS SYSTEMS THE THINGS YOU'RE CONNECTING" ran together in caps | The note sits on its own line, in sentence case |
| Worked, a formula value | "monthly ad budget / 30.4" set 30.4 big, as if it were the answer | A value that is itself a formula isn't split around a figure |
| A bare URL in a list (`customer-onboarding-automation-service-business`) | The phone page scrolled sideways by 74px. It's the same on the live site | `.body` breaks a word that would overflow |

**Articles changed:** none in the sweep. Every fix is in the stylesheet or the transform. The only content edit was on the proof, `what-is-ai-automation-australia`: round 3 had bolded its table header for the Pick look, and that is reverted because Pick didn't ship.

**Found, not fixed, not caused by this branch (both are live today):**
- `google-business-profile-optimisation` (body-1, body-2) and `ai-automation-for-pet-grooming` (body-1) point at images that were never committed. The live site returns 400 for them.
- The Google Ads cost article's hand-written SVG chart clips its own "Strong 6 / Competent 8 / Weak 12" label on a phone.

## The one-paragraph Quick Answers in Deck

57 of the 68 articles have the older Quick Answer: one paragraph of 74 to 553 characters (median 364). Nine of them add bullets, and six add a closing line (the pet-grooming set). Ten articles have none, and only the proof has the new answer-first shape.

How Deck renders them: the "Quick answer" label, then the paragraph at 16px in near-white on the category ground, where the description used to sit, with bullets and closing lines below on white hairlines.

- **Desktop:** the hero stays close to its locked 62vh. The median is 560px and the tallest is 696px (pet-grooming-website-design, with bullets and a closing line). It reads like a longer description line.
- **Phone:** the median hero is 586px on an 844px screen, so the byline and the start of the body still show. The longest paragraphs fill the first screen, and four heroes with bullets run past 700px.
- **What's missing:** the bold answer sentence that makes Deck work on the proof. Most old paragraphs open plain, so the deck reads as a block of text rather than an answer.

**Verdict: acceptable until they are rewritten.** Nothing breaks, nothing hides, the answer still comes straight after the H1 in the HTML, and desktop looks right. The cost is a heavier first screen on a phone.

Suggested rewrite order, longest first: ai-automation-consultant-melbourne (553), seo-pricing-australia-2026 (545), what-social-media-scheduling-tools-work-australia-2026 (539), n8n-vs-zapier-australia-small-business (504), aussie-startup-keen-to-help-small-businesses-cut-manual-work-cheap-happy-to-chat (490), why-tradies-lose-jobs-before-quoting-australia (481), then the four pet-grooming answers with bullets. That's 11 answers over 450 characters, and 9 under 250 that already sit well.

## Verified

- `next build` run directly (not `npm run build`, so no IndexNow ping). It passes, which means every Workings sum on the site checks out.
- curl against `next start`:
  - The proof returns 200 with one H1, and the order is H1, then the hero Quick Answer (label, bold answer, points), then the rail. No look classes are left in the HTML.
  - A one-paragraph article renders Deck with no description line. An article with no Quick Answer keeps its description.
  - The board and its stylesheet return 200, with all 19 looks in the stylesheet. robots.txt disallows the board for 16 agents, and the sitemap doesn't mention it.
- The sweep and the two-engine overflow pass are described above.
- Screenshots in `docs/screenshots/`: the proof at 390 and 1440 (`what-is-ai-automation-australia-*.png`), and a one-paragraph Deck with wide tables at 390 and 1440 (`seo-pricing-australia-2026-deck-*.png`).

## Ready for "push it live"?

**Yes.** Nothing blocks it. Four things to know first:

1. **Push live ships the whole branch, not just tonight:** 14 articles (13 fence migrations and the proof rewrite), the 57-photo library with its manifest, the photo hero, the blocks, the robots change and the CLAUDE.md update. That's 95 files against main.
2. **Main is two commits ahead** (the testimonial fixes, `bf5066e` and `6328f95`). They merge cleanly; a PR merge carries them.
3. **Testing used Playwright's Chromium and WebKit, not a physical iPhone.** A two-minute look at the proof and the SEO pricing page on Luke's phone, through the preview, is the last check I'd want.
4. **The 57 older Quick Answers** read as a block of text in the hero until they are rewritten (see above). The two pre-existing image and chart issues are live today and are separate fixes.
