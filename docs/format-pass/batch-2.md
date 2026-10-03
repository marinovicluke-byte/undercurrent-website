---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Format pass, batch 2: blocks for 10 older articles

Branch `content/format-pass-batch-2`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.** Luke squash-merges it. It doesn't depend on batch 1 (PR 44). The three scripts were copied from the batch 1 branch tip. One line in `check-format-pass.mjs` was then fixed here (see "Found on the way"), so whichever PR merges second has a one-line conflict in that file. Keep batch 2's line.

The rule is the same as batch 1: **keep the words, change the shape.** Titles, meta, canonicals, schema, slugs, dates (published and `dateModified`) and the Quick Answer are unchanged.

Two batch 1 notes were applied to every block:

- Pair titles stay neutral.
- Step timings use the ", **Week 1**" form.

## What changed, per article

| # | Article | Blocks added | Body words (main → branch) |
|--:|---|---|---|
| 1 | pet-grooming-marketing-australia | 1 Fill | 3,795 → 3,802 (+0.2%) |
| 2 | seo-for-small-business | **none** (see "Left as prose") | 2,887 → 2,887 |
| 3 | local-seo-checklist | 5 lists | 2,501 → 2,500 (0.0%) |
| 4 | seo-vs-google-ads-dog-grooming | 1 Weight pair | 2,669 → 2,670 (0.0%) |
| 5 | does-chatgpt-search-the-web | 1 Fill, 1 list | 2,233 → 2,237 (+0.2%) |
| 6 | seo-for-buyers-agents-australia | 1 Fill, 1 list | 1,934 → 1,945 (+0.6%) |
| 7 | what-is-business-process-automation-australia | 2 Fill | 3,098 → 3,116 (+0.6%) |
| 8 | n8n-vs-zapier-australia-small-business | 2 Fill, 1 Worked | 2,961 → 2,973 (+0.4%) |
| 9 | how-to-win-at-perplexity-seo | 1 Fill, 2 lists | 2,463 → 2,472 (+0.4%) |
| 10 | google-ads-cost-australian-small-business | 1 list | 2,354 → 2,350 (−0.2%) |

The details, article by article:

1. **Pet grooming marketing.** In the sequencing section, the one-sentence order ("claim and complete your Google profile, then build a real booking website, then ...") becomes a Fill: "The order to build it in", four steps. The 30-day plan, the checklist and the calendar are tables, so they stay as Rail.
2. **SEO for small business: unchanged.** See "Left as prose".
3. **Local SEO checklist.**
   - The four quarterly lists had plain lead-ins ("Work through this every quarter:"). Each lead-in becomes a block title, in a matching set: "Your quarterly profile checks", "... website checks", "... reviews checklist", "... citation audit". The profile list has eight items. It wasn't split, only titled.
   - "Three patterns in the audit data ... First, ... Second, ... Third, ..." becomes a titled list. The sentences are word for word.
4. **SEO vs Google Ads for groomers.** The Verdict's "Pick Google Ads first if ... Go with SEO first if ..." becomes a Weight pair. Both titles start "Pick ... first if". The original "Go with" would have matched the `with` in the pair's PLUS words. That makes the pair a contrast and greys out the Ads side, which is the article's main advice for new salons. As titled, the pair renders as equals (checked in the crop).
5. **Does ChatGPT search the web.**
   - The 90-day plan ("**Weeks 1-2.** ... **Weeks 11-12.**") becomes a Fill, "The 90-day shape". Each step's first sentence is its bold title, and the weeks are its timing.
   - The audit's "Three things hit harder ... First, ... Second, ... Third, ..." becomes a titled list.
6. **Buyers agents.**
   - The 90-day plan ("**Days 1 to 14, ...**") becomes a Fill with timings.
   - The Search Console regex fence can't sit inside a list item, so it now follows the Fill, introduced by "For step three, this regex filter pulls your buyer-intent suburb queries". This is the same move as batch 1's AEO JSON.
   - The inline "Three things hit harder than the score sheet shows" becomes a titled list.
7. **Business process automation.**
   - The HubSpot to Xero to Stripe flow, four stages each tagged "(automated)", becomes a Fill: "One lead, from form to payment".
   - The ROI method ("Calculate ... Multiply by ... Multiply by 52 weeks") becomes a three-step Fill: "Work out your annual saving".
   - Two em dash pairs become parentheses and commas.
8. **n8n vs Zapier.**
   - The self-hosting steps and the four decision questions were numbered lists with plain lead-ins. Each lead-in becomes the block's title, so both become Fills.
   - The lead workflow's task count becomes Worked (see below).
9. **Perplexity SEO.**
   - "Freshness comes first ... Then source density ... Then structure ... Last, entity clarity" becomes a titled list of the four signals, labelled from the text. This is the same shape as batch 1's Wix "four ceilings".
   - The audit's "Three things stood out. First, ..." becomes a titled list.
   - The inline "Week 1: ... Week 4: ..." plan becomes a Fill with timings.
10. **Google Ads cost.** Its two Worked blocks (the budget formula and the plumber example) were already there and are unchanged. The four money leaks ("broken conversion tracking is the biggest ... The second leak is ... The third is ... The fourth is ...") become a titled list, "The four leaks", each labelled with its own opening words.

## Every Worked block

The build checks each sum and fails if one doesn't add up. The new sum passes.

**8. n8n vs Zapier: "What a modest lead workflow burns on Zapier"**

| Line | Value | Where it comes from (main, `content/articles/n8n-vs-zapier-australia-small-business.md`) |
|---|---|---|
| Tasks per run | 4 | Line 98: "new lead captured, CRM updated, follow-up SMS sent, invoice drafted, hits 4 tasks per run" |
| Leads a month | 300 | Line 98: "At 300 leads/month" |
| = Tasks a month | 1,200 | Line 98: "that's 1,200 tasks". 4 × 300 = 1,200 |

It's a worked example with the article's own numbers, not a client result. The sentence after the block keeps the conclusion: "That pushes you into Professional territory". Starter is 750 tasks a month, per the plan list above it (line 94).

The Google Ads cost article has two Worked blocks that were on main before this batch, and both still pass. **No flagged figure is in a Worked block.** None of the ten is on the 2 Oct flagged list, and the check asserts it.

## Left as prose, and why

- **seo-for-small-business: unchanged.**
  - Its comparisons are tables, already Rail: the four line items, the costs, and DIY or paid.
  - Its checklist was already a titled block.
  - The "First, ... Second, ... Third, ..." overpaying run has items of three to four sentences, about 60 words each. As a list they would read as a wall, which is batch 1's rule.
  - The audit band sum (32 + 21 + 9 = 62) describes the corpus. It doesn't drive a decision, so it isn't Worked.
- **Business process automation: no Worked, and it should go to the rewrite lane.** Its sums are unnamed client results, which aren't on the stories list. Batch 1 left the same kind of sum out of the AI agents article. They are:
  - the Brisbane agency (12 hours, 624 a year, $31,200, $8,500, "ROI in 4 months")
  - the Melbourne bookkeeper ($480 a week, $24,960, 8.75 weeks)
  - the Sydney cafe owner (15 hours, $600)
  - the Melbourne tradie (2.5 hours)

  **For Luke:**
  - $31,200 is the same figure flagged on hidden-cost-manual-trade-business-australia.
  - "According to Australian Bureau of Statistics data, 67% of small businesses waste 5+ hours weekly" links to the ABS home page, not a release.
  - "a 2024 Deloitte report on Australian SMEs ... 12-18 hours per week" has no link.
  - "Typical small business saves 15+ hours per week" is unsourced.
  - The bold-numbered runs (three ways, five tasks, five benefits, six mistakes) stay as prose. Each item is several sentences.
- **n8n vs Zapier: client results left alone.** The Melbourne plumbing business (5 hours, 18 days to 9) and the Brisbane agency ($329 to under $80) are "based on typical outcomes from our automation audits", which reads as a composite. They aren't on the stories list and aren't in a block. **For Luke:** the FAQ sum doesn't add up at the top end. It says 5 to 15 hours a week at $50 to $80 an hour is "$1,000 to $3,000 per month recovered". That's about $1,080 to $5,200 a month at 4.33 weeks. It sits in the FAQ, which is also in the schema, so it's left for the rewrite.
- **Perplexity: one "First, Second, Third" run kept as prose.** "Three things tilt the shortlist your way" stays a paragraph. The section is a narrative of how Perplexity picks sources, and a third list in four sections would turn the article into a run of lists.
- **Buyers agents: the One / Two / Three line items stay as prose.** Each one is several sentences, and the third carries the JSON example.
- **Google Ads cost: the UnderCurrent tier paragraph stays as prose.** The table above it already gives the summary. A list of three prices would end each item in a bold value, which would turn it into a Worked look with no sum. The "five things" drivers run across three paragraphs and stays.
- **Pet grooming: the seven ideas list stays as it is.** It has more than six items and isn't a sequence.
- **Code fences kept:** pet grooming's prompt, dog grooming's negative keywords, buyers agents' regex and JSON, n8n's Docker Compose, and Perplexity's JSON and robots.txt.

## Checks

- **`scripts/check-format-pass.mjs`: all 9 changed articles pass.**
  - Body words moved by 0.6% at most.
  - There are no new numbers.
  - No em dash was added.
  - No flagged figure is in a Worked block.
  - There is one H1, and the headings, frontmatter and Quick Answer are unchanged.
- **`next build` (run directly, not `npm run build`): passes** on the final article commit.
- **Browser, local `next start`, Chromium, reduced motion, 390 and 1440:**
  - All 20 loads return 200, with no sideways scroll.
  - Every block renders: its height is over 20px and it sits inside the viewport.
  - I looked at crops of the pair, the Worked sum, the timed Fills and the decision questions.
  - The screenshots are kept out of git, in the session scratchpad.
- **Mid-body photo:** on all ten, it sits before the same H2 as production. Pet grooming and SEO vs Ads for groomers have none, on production too, because an SVG chart sits near the middle.
- **Against production:** titles, meta descriptions, canonicals, all six JSON-LD blocks, the H1 count and the hero Quick Answer are identical on all ten.

## Found on the way

- **The check counted `# comments` inside code fences as H1s.** n8n vs Zapier has a commented Docker Compose fence (six `# ` lines on main too), so it failed "not exactly one H1". `check-format-pass.mjs` now strips fences before counting (commit `e2849c7`). Batch 1 adds the same file with the old line, so the second of the two PRs to merge gets an add/add conflict on that one line. Keep the line with the fence comment. I can rebase this branch after PR 44 merges, if that's easier.
- **"Go with" and "with" make a pair a contrast.** The PLUS words include `with`, so a title like "Go with SEO first if" turns a neutral choice into plus and minus. Pick verbs outside both word lists ("Pick", "Choose").
- **Old em-dash swaps left " , " in 25 articles.** Most are in Related Reading lists ("[link] , the guide"), and a few are in body prose (does-chatgpt-search-the-web line 44). The memory rule is never to produce " , ". This batch doesn't touch them: four of the ten have them, and fixing four of 25 would leave the site half done. One sweep across all 25 is a separate small PR.

## Scripts

These are reused from batch 1 and copied from the batch 1 branch tip (`scripts/survey-article-blocks.mjs`, `scripts/convert-step-runs.mjs`, `scripts/check-format-pass.mjs`). The only change is the code-fence fix above. The converter matched only two of the plans this time: the Weeks plan in the ChatGPT article and the Days plan for buyers agents. Both have a long first sentence that works better as a bold step title, so they were converted by hand in the same shape.

## Rollback

The PR goes in as a squash merge, so main gets one commit. Roll back with `git revert <squash commit>` (no `-m 1`), merged through a PR. The revert deploys itself.
