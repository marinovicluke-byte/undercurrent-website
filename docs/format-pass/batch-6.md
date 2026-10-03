---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Format pass, batch 6: blocks for the last 6 articles

Branch `content/format-pass-batch-6`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.** Luke squash-merges it. This is the last batch. The " , " sweep follows as its own PR.

The rule is the same: **keep the words, change the shape.** Titles, meta, canonicals, slugs, the published date and the Quick Answer are unchanged. Every changed article gets a new `dateModified` (see "Updated dates").

## What changed, per article

| # | Article | Blocks added | Body words (main → branch) |
|--:|---|---|---|
| 1 | summarise-with-ai-button-risk | 3 lists | 2,026 → 2,026 (0.0%) |
| 2 | simplest-small-business-automation-tasks-australia-2026 | 1 Fill | 2,659 → 2,659 (0.0%) |
| 3 | seo-for-dentists | 4 lists | 2,403 → 2,400 (−0.1%) |
| 4 | why-tradies-lose-jobs-before-quoting-australia | 2 Fill | 2,298 → 2,304 (+0.3%) |
| 5 | ai-tools-for-dog-grooming-business | 1 Worked | 2,757 → 2,770 (+0.5%) |
| 6 | search-agent-optimisation-explained | 1 Fill, 1 list | 2,146 → 2,146 (0.0%) |

The total is 4 Fill, 8 titled lists and 1 Worked block.

1. **Summarise-with-AI button risk.** The audit's "First, Second, Third" becomes a titled list. The "Three structures do the work:" and "Three things worth flagging in procurement:" lead-ins become their lists' titles.
2. **Simplest automation tasks.**
   - Its five "How to set it up" step lists were already blocks.
   - "Ask yourself three questions" gets its title, so the 3-question test becomes a Fill.
   - One body em dash becomes a colon. The meta description keeps its em dash, because frontmatter must match production.
3. **Dentists.**
   - "Three levers ... First, your Google Business Profile ... Second, proximity ... Third, reviews" becomes a titled list.
   - The keyword intents and the four tracking metrics get their lead-ins as titles.
   - The audit's three patterns become a titled list.
4. **Tradies losing jobs before quoting.**
   - The three-step lead response system and the three next steps were numbered lists. They get titles, so both become Fills.
   - One body em dash becomes a colon.
5. **AI tools for groomers.** The AIToolsCapital cost model becomes Worked (see below). The starting-stack table was already Rail.
6. **Search agent optimisation.**
   - The five-step readiness checklist gets a title, so it becomes a Fill.
   - The audit's three things become a titled list.
   - "Five things ... First ... Fifth" in the section above stays prose: it's the same five steps as the checklist, and two near-identical blocks would repeat each other.

## Every Worked block

The build checks each sum and fails if one doesn't add up. This one passes.

**5. AI tools for groomers: "What 48 saved hours a month are worth (AIToolsCapital's model)"**

| Line | Value | Where it comes from (main, `content/articles/ai-tools-for-dog-grooming-business.md`) |
|---|---|---|
| Hours saved a month | 48 | Line 125: "[AIToolsCapital] models 48 hours saved a month" |
| What an hour is worth | $15 | Line 125: "at $15 an hour" |
| = Value a month | $720 | Line 125: "as roughly $720 in value". 48 × 15 = 720 |

The title names the source because it's a vendor model, and the article already says to "take the dollar figures with a pinch of salt". The net figure ("a net benefit near $658 after a $62 tool cost", 720 − 62 = 658) stays in the sentence after the block, because Worked doesn't subtract. This is the block the 2 Oct survey suggested.

## For Luke

These are figures to check. None of them is in a block.

- **why-tradies-lose-jobs-before-quoting-australia: a rewrite-lane candidate.**
  - It has unlinked or misattributed claims: "ASBFEO reports that small businesses lose an average of 11 hours per week", "78% of customers go with the business that responds first", and "400% more likely".
  - It has unnamed client results: the Sydney builder whose quotes doubled, the Melbourne plumber whose close rate went from 30% to 65%, and the Geelong "$50K decision".
  - "The Real Cost" sum uses a 60-70% conversion rate "based on the Harvard Business Review data". The article doesn't link the study or show where that rate comes from, and the study it describes measures contact rates, not conversion. Its 50-70%, 3-4 and 100 times are already on the 2 Oct flagged list.
  - The SMS template in step 1 reads "your project., [Your Name]", a stray full stop from an earlier edit.
- **simplest-small-business-automation-tasks-australia-2026:** unsourced figures:
  - "68% faster ROI"
  - "$12 billion per year" in no-shows
  - "87% of Australian consumers"

  Plus the Brisbane physio "18% to 4% ... That's 14% more revenue". 14 percentage points fewer no-shows isn't 14% more revenue.
- **summarise-with-ai-button-risk:**
  - The audit checklist's step 3 ends mid-list ("includes "remember", "recommend", "trusted",").
  - The intro says to review memory "monthly", but checklist step 5 says "quarterly".

## Left as prose, and why

- **The Real Cost maths in the tradies article** stays prose, for the reason above.
- **The 1,875-SMS sum in the simplest-tasks article** ($150 ÷ 8 cents) is a division. As Worked it would need a new figure ($0.08) that isn't in the article.
- **Long-paragraph sections** in the groomer AI tools and dentist articles stay as they are: the chatbot split, the "never use AI for" section and the cost tiers.

## Updated dates

| Article | Updated |
|---|---|
| why-tradies-lose-jobs-before-quoting-australia | 2026-10-01 |
| simplest-small-business-automation-tasks-australia-2026 | 2026-10-02 |
| ai-tools-for-dog-grooming-business | 2026-10-03 |
| search-agent-optimisation-explained | 2026-10-03 |
| seo-for-dentists | 2026-10-03 |
| summarise-with-ai-button-risk | 2026-10-03 |

These come from the slug hash in `scripts/set-updated-date.mjs`. Four of six land on 3 Oct by chance. Across all 80 slugs the spread is 11 to 20 a day.

## Checks

- **`scripts/check-format-pass.mjs`: all 6 changed articles pass.**
  - Body words moved by 0.5% at most.
  - There are no new numbers.
  - No em dash was added.
  - No flagged figure is in a Worked block.
  - There is one H1, and the headings, frontmatter (bar `dateModified`) and Quick Answer are unchanged.
  - Each date is the slug's day.
- **`next build` (run directly): passes**, including the new Worked sum.
- **Browser, local `next start`, Chromium, reduced motion, 390 and 1440:**
  - All 12 loads return 200, with no sideways scroll.
  - Every block renders, and the DOM block count matches what was added.
- **Mid-body photo:** on all six, it sits before the same H2 as production.
- **Against production:** titles, meta descriptions, canonicals, the H1 count, the hero Quick Answer, and all six JSON-LD blocks except `dateModified` are identical.

## Rollback

The PR goes in as a squash merge, so main gets one commit. Roll back with `git revert <squash commit>` (no `-m 1`), merged through a PR. The revert deploys itself. The scripts are byte-identical to the other format-pass PRs.
