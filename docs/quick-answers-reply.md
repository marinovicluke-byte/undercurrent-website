---
ai-assisted: true
source: claude-code
date: 2026-10-02
---

# Quick Answers in the new shape: the reply

**PR:** https://github.com/marinovicluke-byte/undercurrent-website/pull/38, branch `content/quick-answers-shape`. **Live.** Luke squash-merged it as `1b490c1` (parent `6491ca9`), and production deployed itself as `undercurrent-website-ckef82cte`. The auto-mode permission check had blocked me from merging, so Luke did it. Before the merge, the 23MB of hero screenshots were dropped from the branch, so they never reached main.

## What changed

- **52 rewritten.** These were the 57 one-paragraph answers from the round 3 list, minus the 5 the top-six rewrite already did. **7 were already done:** the proof plus the six rewrites. 9 articles have no Quick Answer and keep their description line.
- Each answer is one bold sentence that answers the question by itself and keeps the primary keyword and any figure it led with. Then 2 to 4 short points from the old answer, with no full stops and no sentences strung together.
- Only the Quick Answer changed. No published or updated dates moved.
- One done article was touched. In `how-much-time-tradies-spend-on-admin-australia`, the "62% of construction businesses" point was 16 words, and it's now 13 ("more time on admin than on the tools"). The lead sentence already names quoting, scheduling and invoicing.
- The 4-point limit dropped a few minor items: closing slogans ("Own the asset. Win the booking."), the MITRE IDs in the summarise-with-AI answer, PetExec's "nearly half of companies" stat in the pet-grooming automation answer, and the unsourced "40% faster payments" in the eInvoicing answer.

## Flagged: figures with no source or a mismatch

None of these figures are in a bold sentence any more. Each one sits in a point, so the meaning hasn't changed. The full rewrites should source them or cut them.

| Article | Figure | Problem |
|---|---|---|
| hidden-cost-manual-trade-business-australia | $18,720 to $31,200, and $35,000 to $50,000 | Not worked anywhere in the body. The FAQ says $31,500 to $54,400 |
| automating-business-processes-australia-sme-guide | 5 to 10 hours a week, payback in the first month | These rest on "SMEs we work with" and three named builds (HVAC Brunswick, retail Surry Hills, bookkeeper Brisbane) that aren't in the approved stories list. They look invented |
| client-onboarding-accountants-automation-australia | 20+ hours a week, 40% faster | This cites an unlinked "2024 Deloitte study", and the 40% has no source |
| how-overdue-invoices-hurt-australian-sme-cash-flow | $7,000 a month, paid in 14 days not 42 | The $7,000 only appears in the title and description. The 42 days is from Xero, but 14 days is a promise |
| how-australian-entrepreneurs-boost-team-efficiency-without-hiring | 30-40% more output within 90 days | No source |
| why-tradies-lose-jobs-before-quoting-australia | 50-70% of jobs lost, 3-4 businesses contacted | No source. The "100 times" figure is credited to Harvard Business Review. As far as I know, it comes from the InsideSales/MIT lead-response study, so check that before the rewrite |
| how-much-are-manual-processes-costing-your-business | $15,000 to $40,000 a year | This is only in the description, with no source |
| what-is-an-ai-agent-for-business-australia | 40% of SMEs, 2.8 times faster | AI adoption stats come from a consultant's blog and a trade site. UC policy wants primary sources |
| einvoicing-small-business-australia-guide | $2 an invoice, 1-2 hour setup | The ATO is cited without a link. The answer says 1-2 hours, but the FAQ says 15-20 minutes |
| ai-automation-for-pet-grooming | No-shows 10-15% down to 2-5% | This is credited to "industry data", with no link |
| seo-audit-self-check-australia | Two serious problems within 15 minutes | No source |

## Checks

- **`scripts/check-quick-answers.mjs`** (committed): **59 of 59 pass.** For every article with a Quick Answer it asserts one bold sentence of up to 30 words, 2 to 4 points of up to 15 words each, no em dash, no closing paragraphs, and that every number was already in the article on `origin/main`. It also warns when the bold sentence is missing a keyword word. Four warnings are left: one on chatgpt-knowledge-cutoff, where "Australia" doesn't fit the answer, and three on articles that were already done.
- **`next build`**, run directly: passes, 143 pages. In the built HTML, all 59 have the bold answer style and the points list, none have a closing line, and every article has one H1.
- **`next start`, Chromium, 390 and 1440, reduced motion.** I checked the five longest, the five shortest, and one article per category colour (8 categories, 12 pages). Every page returned 200 with no sideways scroll. On a phone the answer ends by 696px at most, and the median before was 586px for the hero alone with some past 700. The screenshots are kept out of the repo (24 PNGs, 23MB), on disk at `/private/tmp/claude-501/-Users-luke-UnderCurrent-Builds-Products-Website-undercurrent/64bcb93d-2508-452c-89b8-8b0e5616c384/scratchpad/quick-answers-screenshots/`.
- **Head check against production, 10 articles:** titles, meta descriptions, canonicals and all six JSON-LD blocks are byte-identical between the branch build and undercurrentautomations.com.

## Live checks (undercurrentautomations.com, after `1b490c1`)

- **All 59 articles with a Quick Answer:** each returns the bold answer and the points list in the hero, no closing line, and one H1.
- **Ten sampled articles:** each returns 200, and the hero answer matches the branch build. Titles, meta descriptions, canonicals and all six JSON-LD blocks are byte-identical to the snapshot taken before the merge.
- **Chromium at 390 and 1440, same 12 pages as above:** every page returns 200 with no sideways scroll, and the hero measurements match the branch build to the pixel.
- **Other pages:** the homepage, `/blog`, `/sitemap.xml` (134 URLs) and `/robots.txt` return 200.

## Rollback

Run `git revert 1b490c1`, then merge it through a PR. A squash commit has one parent, so the revert needs no `-m 1`. The revert deploys itself. For an instant rollback without git, run `vercel rollback undercurrent-website-mmx5evs6s-marinovicluke-bytes-projects.vercel.app`. That's production before the merge (commit `6491ca9`, main after PR #37's services revert). Main then stays ahead of what's live until it's reverted.
