---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Format pass, batch 3: blocks for 10 older articles

Branch `content/format-pass-batch-3`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.** Luke squash-merges it.

The rule is the same as batches 1 and 2: **keep the words, change the shape.** Titles, meta, canonicals, schema, slugs, dates (published and `dateModified`) and the Quick Answer are unchanged. The scripts are batch 2's, with the fence-aware H1 count. Pair titles stay neutral, and step timings use the ", **Day 1**" form.

## What changed, per article

| # | Article | Blocks added | Body words (main → branch) |
|--:|---|---|---|
| 1 | how-to-rank-in-chatgpt-search | 2 Fill | 3,352 → 3,361 (+0.3%) |
| 2 | geo-for-buyers-agents-australia | 1 Fill, 2 lists | 3,089 → 3,096 (+0.2%) |
| 3 | aeo-vs-seo-vs-geo | 1 Fill, 1 list | 2,947 → 2,954 (+0.2%) |
| 4 | how-to-do-chatgpt-seo | 1 Fill, 2 lists | 2,922 → 2,918 (−0.1%) |
| 5 | how-to-rank-buyers-agency-ai-search-melbourne | 1 Fill | 2,573 → 2,573 (0.0%) |
| 6 | small-business-website-design | 2 lists | 2,451 → 2,450 (0.0%) |
| 7 | why-tradies-dont-get-google-reviews-australia | 1 Fill, 1 Weight pair, 1 list | 2,414 → 2,415 (0.0%) |
| 8 | google-maps-seo | 2 lists | 2,384 → 2,387 (+0.1%) |
| 9 | ai-automation-for-pet-grooming | 1 Fill | 2,336 → 2,348 (+0.5%) |
| 10 | best-aeo-agencies-australia | 2 lists | 2,322 → 2,321 (0.0%) |

The total is 8 Fill, 1 Weight pair and 12 titled lists. There are no new Worked blocks (see "Worked" below).

The details, article by article:

1. **Rank in ChatGPT search.** Two "Start with / Next / Then / Finally" runs become Fills, each step titled by its own first sentence:
   - the entity build, "Build your entity, in order"
   - the start-here steps, "The four first steps". The next paragraph already calls them "these four steps".
2. **GEO for buyers agents.**
   - The "Days 1–14 ... Days 61–90" rollout becomes a Fill with timings, "The 90-day rollout, in four phases".
   - The "Three retrieval signals move the needle:" lead-in becomes its list's title.
   - The audit's "First, schema ... Second ... Third ..." becomes a titled list, labelled from the text.
3. **AEO vs SEO vs GEO.**
   - "the order is: build the page, earn the ranking ..., then format it for extraction, then build the off-site authority" becomes a four-step Fill.
   - The audit's "First, Second, Third" becomes a titled list.
4. **ChatGPT SEO in 30 minutes.**
   - The 30-minute run was a numbered list with no title. It becomes a Fill, and each step's "(5 minutes)" moves to the step's timing: 5, 8, 7, 5 and 5 minutes.
   - "Four things do the heavy lifting. First, identity ... Fourth, structure" becomes a titled list.
   - The audit's "Three things stood out" becomes a titled list.
5. **Melbourne buyers agency.** The four llms.txt requirements were a numbered list. Its lead-in becomes the title.
6. **Small business website design.**
   - "Three things carry the weight. Speed ... Structure ... And conversion design" becomes a titled list.
   - The audit's "three patterns" becomes a titled list.
   - The five-step plan was already a block.
7. **Tradie Google reviews.**
   - The review-request "**Step 1:** ... **Step 4:**" run becomes a Fill.
   - "Electrician A" and "Electrician B" were two one-line bullets packed with figures. They become a Weight pair, with three facts a side. The titles are neutral, so the pair renders as equals (checked in the crop). The article's point is that B wins despite the lower rating, so neither side should be greyed.
   - The review-count tiers get their lead-in as a title.
8. **Google Maps SEO.**
   - "Three signals at once. Volume ... Velocity ... And the words customers use" becomes a titled list.
   - The audit's "three patterns" becomes a titled list.
9. **Pet grooming automation.** "Someone books, you confirm, you remind them the day before, ... you nudge them to rebook in six weeks" becomes a seven-step Fill, "The work around the groom". The list has more than six items, but it is a sequence, so the rule allows it.
10. **Best AEO agencies.**
    - "Other warning signs: a; b; c; d; and e" becomes a titled list of five.
    - The audit's "Three things hit harder" becomes a titled list, labelled from the text.

## Worked

**No new Worked blocks.** Every prose sum in the batch failed one of the rules:

- **Pet grooming automation:** the no-show sums ("at a 10-15% no-show rate ... loses 8 to 12", "12% to 4% ... saves six to eight") rest on **10-15% and 2-5%**. Both are on the 2 Oct flagged list. They stay in prose, and the check asserts it.
- **Tradie Google reviews:** see "For Luke" below. The lost-revenue sum doesn't add up, so a Worked block would fail the build.
- **ChatGPT SEO:** the five timings add up to 30 minutes, but the Fill already shows each one. A Worked block would repeat it.
- The rest are band counts, or ranges that describe a corpus rather than drive a decision.

## For Luke

These are figures to check. None of them is in a block.

- **why-tradies-dont-get-google-reviews-australia, line 124:** "2-4 extra quotes per week ... average job $8,000 ... close 30% ... $10K-$20K on the table every month". 2-4 quotes × 30% × $8,000 is $4,800-$9,600 a week, which is about $21K-$42K a month. The "$120K-$240K" a year follows the monthly figure. The BrightLocal attributions (4-6% unprompted, 68% / 23% / under 10% by timing, 44% pack CTR) and the unnamed Melbourne plumber (8% to 52%) and Brisbane builder quote also want sourcing.
- **how-to-rank-buyers-agency-ai-search-melbourne, line 55:** the bands don't add up. "Zero Strong, Three Competent, Eleven Weak, Seven below 30" is 21 articles, but the audit is 27.
- **how-to-rank-in-chatgpt-search:** three figures are attributed to pages that don't hold them:
  - "Semantic coherence ... 45%, solution validation 35%, knowledge graph links 20%" is cited to Google's helpful-content page.
  - "Cited at 18% versus 8.9%" is cited to Schema.org's docs.
  - "2.3x more often" is cited to Google's structured data intro.

  It also carries unnamed client results: the Perth HVAC, the Geelong electrician (8-12 enquiries), the Melbourne plumber ($2,800-$4,200), and "180-320%" and "140-280%" lifts. This one looks like a rewrite-lane article.
- **geo-for-buyers-agents-australia:** the data table cites "UC summary of public Bocati case data" for a $2,500–$12,000 benchmark, with no link.

## Left as prose, and why

- **Bold-numbered or bold-lead runs with several sentences per item** stay as paragraphs, which is batch 1's rule. They are:
  - the GEO five pillars (with a JSON fence after pillar 3) and five mistakes
  - the tradie "1. They forget / 2. It feels awkward / 3. They don't know how"
  - the rank-in-ChatGPT schema types
- **Paragraphs that read fine as prose:**
  - GEO's "three differences" (one sentence each, inside a definition paragraph)
  - website design's "The moves are concrete" paragraph
  - Maps SEO's doorway vs landmark contrast
  - the pet grooming chatbot vs receptionist split, which would need rewording to become a pair
- **The tradie maths section** (50 jobs: "2-3 reviews" without asking, "25-35" if you ask) stays as it is. Each side would hold one line, and its rates are among the unsourced figures above.
- **Lead-ins that contain a link can't be a block title**, which must be bold text alone. That rules out the AEO agencies' "ask three things", the GEO tools stack and the tradie CTR list.
- **Code fences kept:** the JSON and robots-style examples in articles 1, 2, 3, 4, 5 and 8, and the review-request YAML in 9.

## Checks

- **`scripts/check-format-pass.mjs`: all 10 changed articles pass.**
  - Body words moved by 0.5% at most.
  - There are no new numbers.
  - No em dash was added.
  - No flagged figure is in a Worked block.
  - There is one H1, and the headings, frontmatter and Quick Answer are unchanged.
- **`next build` (run directly): passes** on the final article commit.
- **Browser, local `next start`, Chromium, reduced motion, 390 and 1440:**
  - All 20 loads return 200, with no sideways scroll.
  - Every block renders: its height is over 20px and it sits inside the viewport.
  - I looked at crops of the Electrician pair, the Days and minutes Fills, and the seven-step Fill.
  - The screenshots are kept out of git.
- **Mid-body photo:** on all ten, it sits before the same H2 as production. GEO for buyers agents has none, on production too.
- **Against production:** titles, meta descriptions, canonicals, all six JSON-LD blocks, the H1 count and the hero Quick Answer are identical on all ten.

## Rollback

The PR goes in as a squash merge, so main gets one commit. Roll back with `git revert <squash commit>` (no `-m 1`), merged through a PR. The revert deploys itself.

PR 44 and PR 47 both add the three scripts. Batch 3 carries batch 2's version (`e2849c7`'s fence-aware H1 line), so it matches PR 47 exactly. Against PR 44 it has the same one-line add/add conflict. It will be rebased onto main after those merge, as ops asked for batch 2.
