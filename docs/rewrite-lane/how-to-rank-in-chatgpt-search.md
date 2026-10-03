---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: how-to-rank-in-chatgpt-search

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 8 (added by ops after batch 3), under Luke's 10:50 rule update and 11:50 dates rule. **Branched off `content/format-pass-batch-3` (PR #49, still open).** This PR's base is that branch. Batch 3's two Fill blocks stand.

## Verdict

**The three figures batch 3 flagged are cut.** Each was credited to a page that doesn't hold it:

- 45/35/20% to Google's helpful-content page
- 18% vs 8.9% to Schema.org's docs
- 2.3x to Google's structured data intro

The "three factors" framing stays as a plain way to think about it, with no false attribution.

**The other figures are cut too:**

- **UC results:** "UC audits: 180-320% in 8 weeks", "last 30 audits: 140-280%", "3-4 times more often in UC's pipeline", "4-6 weeks to first citations".
- **Client stories:** the Perth HVAC, the Geelong electrician (8-12 enquiries) and the Melbourne plumber ($2,800-$4,200) are presented as real. The HVAC and electrician come back as examples with no results. The plumber's results are cut.
- **Marketing-blog statistics:** 80.1% (Incremys), 49% and 80% (roi.com.au) and 62% (Pathfinder). UC's config requires primary sources for AI adoption statistics. "4.2x", "11.1 points", "90% faster", "double your citation rate", and the top table's impact and time columns are cut as well.

**Two factual errors are fixed, from OpenAI's own docs:**

- **Blocking GPTBot doesn't hide you from ChatGPT search.** [OpenAI's crawler docs](https://developers.openai.com/api/docs/bots) say "OAI-SearchBot is used to surface websites in search results in ChatGPT's search features", while GPTBot crawls for model training. The article and FAQ 4 said the opposite, and both now say this.
- **Referral tracking.** "UTM parameters for chat.openai.com" was wrong in two ways. You don't add UTMs to inbound referrals, and ChatGPT moved to chatgpt.com. The advice now reads: in GA4, look at referral traffic from chatgpt.com and perplexity.ai.

**Also fixed:**

- "ChatGPT relies on Bing's index and Google's index" contradicted FAQ 1 ("doesn't directly use Google's index"). The body now matches OpenAI's docs (OAI-SearchBot), with Bing described as a reported search partner.
- Three internal links 301 elsewhere: `/sales-automation` goes to `/automation` (now linked directly), `/case-studies` goes to `/blog` (the sentence is removed, because there are no case studies) and `/process` goes to `/` (link removed).

**Added, linked:** hipages' published plumber rates, which replace two unsourced price examples:

- The answer-first example sentence ("trade insurance $800-$2,500") is now a plumber-rate sentence on hipages' national $80 to $200 an hour.
- The JSON FAQ sample's plumbing prices are now hipages' Melbourne "around $80-$160 per hour", credited in the prose under the code.

## Rule applied to small counts

UC's own writing guidelines stay as instructions, not claims:

- answer in 40-60 words
- a mix of question and statement headings
- 130-170 words per section
- audit your top 5-10 pages
- 5-7 FAQ questions
- 60-80 word answers
- five or more authority mentions

## Figure table

| # | Figure | Where | Source or CUT |
|--:|---|---|---|
| 1-12 | Top table impact (2x, 40%, 11+, 40%) and times (30 min, 1-2 h, 45 min, 2-3 months, 3-6 months, 1-2 h); "5+ sources" | Top table | Numbers CUT. The table stays (Rail), with words for impact and effort |
| 13 | 80.1% global AI search share (Incremys) | Intro | CUT. A marketing blog, not primary |
| 14 | 49% of Australians use gen AI (roi.com.au) | Intro | CUT. Not primary |
| 15-16 | 62% of SMB owners' customers use ChatGPT (Pathfinder); "two-thirds" | Intro | CUT |
| 17-18 | UC audits 180-320% in 8 weeks; Brisbane plumbers 90% faster (linked to a Google support page that says no such thing) | Intro | CUT |
| 19 | 2019 | Intro | Kept. A turn of phrase |
| 20-22 | 45% / 35% / 20% "according to Google" | H2 1 | CUT. Flagged by batch 3 |
| 23 | First 60 words | H2 1 | Reworded, "the first paragraph" |
| 24 | Perth HVAC, six weeks | H2 1 | **REFRAMED** as an example ("Say a Perth HVAC company has no AI citations...") with the fix order and no claimed result |
| 25-26 | 40-60 word answer; $800-$2,500 trade insurance example | H3 answer-first | 40-60 kept as UC's guideline. The insurance price example is **REPLACED** with hipages' plumber rate, linked |
| 27 | 3-4 times more often (UC pipeline) | H3 answer-first | CUT |
| 28-29 | 18% vs 8.9% "according to Schema.org" | H3 headings | CUT. Flagged by batch 3 |
| 30-31 | 60/25/15% headings; three of five | H3 headings | Kept as UC's rule of thumb, labelled as one |
| 32 | 130-170 words per section | H3 length | Kept. A guideline |
| 33 | 4.2x more likely | H3 length | CUT |
| 34-35 | 2-3 sentences; 400 words into three 130-word chunks | H3 length | Kept. Instructions |
| 36 | 2.3x "according to Google" | H3 length | CUT. Flagged by batch 3 |
| 37-39 | Last 30 audits, 140-280%, 6-8 weeks | H3 length | CUT |
| 40-44 | JSON sample: $150-$250/h, $90-$150 callout, 1-2 h, 1.5x-2x weekends, $200-$350 | Schema code block | **REPLACED.** Q1 now uses hipages' Melbourne "around $80-$160 per hour", credited under the block. Q2's weekend multiplier is gone, and the answer tells the reader to quote their own after-hours rate |
| 45-47 | Geelong electrician: six questions, four weeks, 8-12 enquiries a month | Schema section | **REFRAMED** as an example with no result |
| 48 | 5+ authority sources "improve citation rates significantly" | Entity section | Kept as a guideline, without the unsourced "significantly" |
| 49 | GBP feeds "ChatGPT's knowledge graph" | Entity Fill (batch 3), step 1 | Reworded. ChatGPT has no published link to Google's knowledge graph |
| 50-53 | Top 5-10 pages; 60 words; 5-7 questions; 60-80 words | Four first steps Fill (batch 3) | Kept. Instructions |
| 54 | "ChatGPT uses Bing's index" | Fill step 3 | **CORRECTED**: OAI-SearchBot, linked to OpenAI. Bing kept as a widely reported partner |
| 55-58 | 4-6 weeks to first citations; Melbourne plumber, two weeks, a month, 4-6 jobs, $2,800-$4,200 | After the Fill | CUT. Client result not on the approved list |
| 59 | "Double your citation rate" | Next steps | CUT |
| 60 | 40-60 word blockquote | Next steps | Kept. Guideline |
| 61-62 | 5+ mentions in six months; 11.1 points higher | Next steps | Six months kept as a goal. 11.1 CUT |
| 63-64 | UTM for chat.openai.com; 4-6 weeks | Next steps | **CORRECTED** to GA4 referral traffic from chatgpt.com and perplexity.ai. 4-6 weeks reworded |
| 65-66 | FAQ 3: 4-8 weeks, 3-6 months | FAQ | CUT |
| 67 | FAQ 4: blocking GPTBot hides you from AI search | FAQ | **CORRECTED** per OpenAI's docs. The answer can't carry a link, so the body carries it |
| 68 | FAQ 6: top 5-10 pages; 80% of SMEs use AI (roi.com.au) | FAQ | 5-10 kept (instruction). 80% CUT |
| 69-70 | FAQ 7: UTM chat.openai.com; 6-8 weeks | FAQ | **CORRECTED** as in #63. 6-8 weeks reworded |

FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions are unchanged.

**Sources list:** trimmed to the sources the article still cites. Removed: AI Rank Lab, Pathfinder, First Page Sage, Aidan Coleman, Incremys, both ROI pages, Red Search, Google's helpful-content page (it was cited for figures it doesn't hold), Schema.org documents (same) and Google's structured data intro (same). Added: OpenAI's crawler docs, and hipages.

## Front matter

- **`dateModified`: "2026-09-29" (batch 3) became "2026-10-02"**, under the rewrite-lane date rule (`0x12`, even). The published date is unchanged.
- The meta description has no figure ("2-3 sentences" is an instruction), so it's unchanged.

## Blocks

Batch 3's two Fill blocks stand ("Build your entity, in order" and "The four first steps"), with step text corrected as above. No Worked block: no sum in the article is sourced, and none drives the decision. The top table stays Rail.

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before (on batch 3): 2,816
- After: see Checks

## Reads thin (for Luke)

1. **No evidence that the method works.** Every "it lifted citations by X%" claim was unsourced or a client result not on the list. UC's own AI referral story (3 to 28 sessions in a month, 24 from ChatGPT, August 2026) is on the approved list and fits exactly. Its source is UC's internal report, not a clickable page.
2. **No adoption statistic.** The four were from marketing blogs. A primary source (the ABS, or OpenAI's own usage figures) could replace them if ops wants a hook.
