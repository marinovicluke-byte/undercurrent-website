---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Format pass, batch 1: blocks for 10 older articles

Branch `content/format-pass-batch-1`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.** Luke squash-merges it.

The rule of the job: **keep the words, change the shape.** Titles, meta, canonicals, schema, slugs, dates (published and `dateModified`) and the Quick Answer are unchanged. I left `dateModified` alone because a shape change isn't a content update, and leaving it keeps the schema identical.

## What changed, per article

| # | Article | Blocks added | Body words (main → branch) |
|--:|---|---|---|
| 1 | how-to-use-ai-to-optimise-tradie-business-australia | 3 Fill, 1 Worked | 2,400 → 2,423 (+1.0%) |
| 2 | what-is-ai-search-optimisation-australia | 1 list | 2,107 → 2,104 (−0.1%) |
| 3 | how-overdue-invoices-hurt-australian-sme-cash-flow | 2 lists, 1 Fill | 2,434 → 2,443 (+0.4%) |
| 4 | what-is-answer-engine-optimisation | 1 Fill | 2,442 → 2,445 (+0.1%) |
| 5 | what-is-an-ai-agent-for-business-australia | 1 Fill | 2,772 → 2,766 (−0.2%) |
| 6 | aussie-startup-keen-to-help-small-businesses-cut-manual-work-cheap-happy-to-chat | 1 Fill, 1 Weight pair, 1 Worked | 3,200 → 3,230 (+0.9%) |
| 7 | seo-pricing-australia-2026 | **none** (see "Left as prose") | 3,285 → 3,285 |
| 8 | wix-vs-squarespace | 2 lists | 2,773 → 2,774 (0.0%) |
| 9 | seo-for-electricians | 2 Fill | 2,461 → 2,472 (+0.4%) |
| 10 | au-seo-agencies-ai-search-audit | 1 Weight pair, 2 lists | 6,440 → 6,439 (0.0%) |

The details, article by article:

1. **Tradie AI guide.**
   - The three setup lists become numbered Fill steps: quote automation in four moves, the scheduling setup, and invoice automation in three steps. They were bullets, but each one is a sequence.
   - The ROI sum becomes Worked (see below).
2. **AI search optimisation.** The "three things" lead-in becomes the title of its list, so the list gets the block style. The techniques list was already a block. The comparison is a table, which stays as Rail.
3. **Overdue invoices.**
   - "Four reasons" and "Here's what works" were runs of bold-lead paragraphs. Each becomes a titled list.
   - The 30, 45 and 60-day collections escalation becomes a Fill with each step's timing.
4. **AEO guide.** The five-step playbook was written as prose ("Step one, ... Step two, ...") and split by a JSON example. It's now a Fill, and the JSON example follows it ("For step three, the minimal FAQ block looks like this").
5. **AI agents.**
   - "**Step 1: Pick one problem.** ..." to "**Step 6**" becomes a Fill, done by `scripts/convert-step-runs.mjs`.
   - Two em dashes become commas.
6. **Aussie startup.**
   - The Week 1 to Weeks 6-8 engagement becomes a Fill with timings, done by the converter.
   - "DIY makes sense if" and the list after it become a Weight pair. The second title changed from "DIY does NOT make sense if" to "DIY is the wrong call if". A "not" in a title makes the pair a contrast, and that greyed out the case against DIY, which is the article's own argument. The neutral title shows the two sides as equals.
   - The DIY sum becomes Worked (see below).
   - Eight em dashes become commas.
8. **Wix vs Squarespace.**
   - "First, speed ... Fourth, ownership" becomes a titled list of four ceilings.
   - The three "stay on a builder if" cases become a titled list.
9. **Electricians.**
   - The profile-setup paragraph (four steps in one paragraph) becomes a Fill.
   - "Three layers ... First, Second, Third" becomes a Fill.
10. **Agency audit.**
    - "What we did to mitigate the conflict" and the list after it become a Weight pair. The second title changed from "What we did not solve" to "What we left unsolved", for the same reason as the DIY pair: as a contrast, the limitations were shrunk and greyed out in a section about scepticism.
    - The two score breakdowns get titles.
    - One em dash becomes a colon.

## Every Worked block

The build checks each sum and fails if one doesn't add up. Both sums pass.

**1. Tradie AI guide: "Six hours a week, back on the tools"**

| Line | Value | Where it comes from (main, `content/articles/how-to-use-ai-to-optimise-tradie-business-australia.md`) |
|---|---|---|
| Hours a week back | 6 | Line 193: "Six hours a week at a $90 AUD billable rate" |
| Your billable rate | $90 AUD | Line 193, same sentence |
| Working weeks a year | 48 | Line 193: "Across a 48-week working year" |
| = Your time back on the tools a year | about $25,900 AUD | Line 193: "about $25,900 AUD". 6 × 90 × 48 = 25,920, inside the build's 1.5% tolerance |

The sum is the article's own worked example. **Luke should check one thing:** the six hours rests on line 191, "UnderCurrent's experience across the trade builds we run". That is a first-party claim that isn't on the stories list. It isn't one of the eleven figures flagged on 2 Oct, so the rule allows it, but it's the same kind of claim.

**6. Aussie startup: "What building it yourself really costs"**

| Line | Value | Where it comes from (main, `content/articles/aussie-startup-...-happy-to-chat.md`) |
|---|---|---|
| Hours spent building it yourself | 30 | Line 170: "If you spend 30 hours building something" |
| What your time is worth | $100/hour | Line 170: "your time is worth $100/hour" |
| = Opportunity cost | $3,000 | Line 170: "you've actually spent $3,000 in opportunity cost". 30 × 100 = 3,000 |

This is a hypothetical with the reader's own numbers, not a statistic.

**No flagged figure is in a Worked block.** `scripts/check-format-pass.mjs` asserts this, using the 2 Oct list.

## Left as prose, and why

- **seo-pricing-australia-2026: unchanged.**
  - Its patterns are tables: 16 of them, already Rail, and the rule is that tables stay.
  - The tier line items would make perfect Worked sums ($1,840 + $690 + $115 + $155 = $2,800), but they're tables.
  - Its one prose sum, "At peak performance Tier 2 maxes at retainer + bonus = $6,400 effective monthly" (line 203), adds a **quarterly** $900 bonus cap to a **monthly** $5,500 retainer. A Worked block would print that as checked. **For Luke: that sum looks wrong.** Monthly, it would be about $5,800.
- **Overdue invoices: no Worked.** Its flagged figures ($7,000 a month, 14 days not 42) stay in prose. Its other sums rest on unlinked statistics ("research by Xero", 6.2 hours) or on named personas (Tom, Sarah, Lisa). The ROI section already had a Current state / After automation pair.
- **AI agents: no Worked.**
  - Its flagged figures (40%, 2.8×) stay where they are.
  - "A Footscray wholesale distributor ... net benefit of $136,320" is an unnamed client result that isn't on the stories list.
  - The $50,000 to $28,250 R&D offset is a subtraction, and Worked only sums or multiplies.
- **Aussie startup: invented-looking first-party figures left alone.** These include "94% of our clients say our final invoice matched the initial quote", "Our average audit uncovers $12,000-$25,000", "Our clients report an average of 8.5 hours saved per week", and a run of unsourced "studies show" percentages. None is in a block. **For Luke:** this article belongs in the rewrite lane with the other five.
- **Bold-lead paragraph runs I didn't convert:** the overdue cost buckets, the aussie startup's look-for, questions, red flags and how-we're-different sections, the electricians mistakes, and the agency audit's five questions. Each item is several sentences, so as a block they would read as a wall. They stay as prose.
- **Code fences:** the AEO and AI search optimisation articles keep their JSON examples, and the agency audit keeps its copy-paste checklist fence. The 1 Oct fence migration left those in place.

## Checks

- **`scripts/check-format-pass.mjs`: all 9 changed articles pass.**
  - Body words moved by 1.0% at most.
  - There are no new numbers.
  - No em dash was added.
  - No flagged figure is in a Worked block.
  - There is one H1, and the headings, frontmatter and Quick Answer are unchanged.
- **`next build` (run directly, not `npm run build`): passes.** It ran three times, the last on the final commit.
- **Browser, local `next start`, Chromium, reduced motion, 390 and 1440:**
  - All 20 loads return 200, with no sideways scroll.
  - Every block renders: its height is over 20px and it sits inside the viewport.
  - I looked at block crops for the Worked sums, the timed Fills and both pairs.
  - The screenshots are kept out of git, in the session scratchpad.
- **Mid-body photo:** on all ten, it sits before the same H2 as production. The tradie guide has none, on production too, because its drawing sits near the middle.
- **Against production:** titles, meta descriptions, canonicals, all JSON-LD blocks and the hero Quick Answer are identical on all ten.

## Found on the way

- **The timing on a Fill step only renders as timing with a comma.** "Step text, **Day 1**" gives the small caps timing line (`.ucb__time`). The six 2 Oct rewrites write "Step text. **Day 0**", which renders as plain bold inside the sentence. This batch uses the comma form. Moving the six rewrites to it is a one-line change each, for a later PR.
- **A pair's tone comes from its titles.** A "not", "without", "before" or "manual" in one title makes the pair a contrast: that side is set small and grey, and the other side large. That is right for Before / After. It's wrong when the "not" side is the point. Check every pair's titles for this.

## Scripts (new, reused from batch 2)

- `scripts/survey-article-blocks.mjs`: the survey. Add `--slugs a,b --lines` for the hits with line numbers.
- `scripts/convert-step-runs.mjs`: deterministic step-run conversion. It handles four shapes: `**Day 1:** text`, `**Weeks 3-4: Title.** text`, `**Step 1: Title**` plus a paragraph, and `**Step 1: Title.** text`. The model gives the title.
- `scripts/check-format-pass.mjs`: run it before every push.

## Rollback

The PR goes in as a squash merge, so main gets one commit. Roll back with `git revert <squash commit>` (no `-m 1`), merged through a PR. The revert deploys itself.
