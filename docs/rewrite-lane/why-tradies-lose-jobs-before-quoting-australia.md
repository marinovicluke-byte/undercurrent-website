---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: why-tradies-lose-jobs-before-quoting-australia

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, Lane 2, article 11, under Luke's 10:50 rule update and the 11:50 dates rule. **Branched off `content/format-pass-batch-6` (PR #56, still open).** This PR's base is that branch, so its diff shows only this article. Batch 6's two Fill blocks stand. Step 1's stray "project., [Your Name]" is fixed.

Sources were read on 3 Oct 2026. They are the same HBR and InsideSales pages as article 10 (PR #61).

## Verdict

- **The core study was misattributed.**
  - "HBR and InsideSales ran a study analysing 2.2 million leads across 42 companies" and found "100 times" is wrong on both counts. [HBR's study](https://hbr.org/2011/03/the-short-life-of-online-sales-leads) analysed **1.25 million** leads at 42 US companies and found "nearly seven times" (within an hour vs an hour later) and "more than 60 times" (vs 24 hours or more).
  - The **100 times** (5 vs 30 minutes, contact) is [InsideSales' own finding](https://www.insidesales.com/why-timing-is-everything-when-responding-to-web-leads/).
  - The "42 hours" credited to InsideSales is HBR's (an average among companies that replied within 30 days). Each claim now sits with its own source.
- **Flagged on 2 Oct, now resolved:**
  - **50-70%** is cut from the meta description, the Quick Answer and FAQ 4.
  - **3-4 businesses** is cut from the Quick Answer and body ("several").
  - **100 times** stays, re-credited to InsideSales and linked in the body.
- **Unsourced or misattributed, cut:**
  - "78% go with the first to respond" (no InsideSales or XANT page holds it)
  - "nearly 400% more likely than within 10 minutes" (Velocify's study has no 10-minute comparison)
  - BrightLocal's "76% within 24 hours" (that line is Google's, from an old Think with Google page that no longer carries it)
  - BrightLocal's "53% expect a response within an hour" (in neither the 2024 nor the 2026 survey)
  - the ASBFEO "11 hours per week" (not on asbfeo.gov.au)
  - "4-6 hours" average for Australian tradies, "24-48 hours", "3-4 times more jobs", "60% more quote requests", "thousands of dollars a month"
- **Client results not on the approved list:** the Sydney builder (quotes doubled) and the Melbourne plumber (30% to 65%) come back as labelled examples with no results. The Geelong "$50K decision" is cut.
- **The Real Cost sum was built on a made-up rate.** "Conversion jumps to 60-70% (based on the HBR data)" isn't in HBR. It's replaced by a Worked example whose inputs are plainly the reader's own assumptions: 1 extra job x $2,000 x 12 = $24,000 a year.

## Figure table

| # | Figure or claim | Where | Source or CUT |
|--:|---|---|---|
| 1 | 50-70% of enquiries lost | Meta description | CUT. "Many Australian tradies lose enquiries...". Flagged 2 Oct. Article 1 set the precedent for dropping an unsourced range from the meta |
| 2 | 50-70% | QA bullet 1 | **REPLACED**: "In a Harvard Business Review audit, most firms didn't reply within an hour" (37% did, per HBR). Written with no number, because the Quick Answer check allows only numbers already on main |
| 3 | HBR 100 times, 5 vs 30 min | QA bullet 2, FAQ 1 | **RE-CREDITED** to InsideSales, linked in the body |
| 4 | 3-4 businesses | QA bullet 3 | Reworded, "several". Flagged |
| 5-8 | HBR + InsideSales, 2.2 million leads, 42 companies, 100 times, "almost zero after an hour" | Intro | **CORRECTED**: HBR, 1.25 million leads, 42 US companies, nearly 7x and more than 60x (linked), and InsideSales 100x (linked). "Almost zero" CUT |
| 9 | First minute nearly 400% vs 10 minutes | H2 1 | CUT. Velocify's 2012 study has no 10-minute comparison |
| 10-11 | BrightLocal 76% within 24 hours; three or four businesses | H2 1 | CUT. Not BrightLocal's. "Several" for the count |
| 12 | "thousands of dollars a month" | H2 1 | CUT |
| 13 | InsideSales/XANT 78% | H2 2, FAQ 2 | CUT. No primary page |
| 14-16 | Sydney builder: 60 seconds, 30 minutes, quotes doubled in a month | H2 2 | **REFRAMED** as an example. The SMS within 60 seconds and the call within 30 minutes stay as setup. "Doubled" CUT |
| 17 | 5 minutes | H2 3 | Kept. A target |
| 18 | "it's been 4 hours" | H2 3 | Kept. An illustration of a day |
| 19 | ASBFEO 11 hours a week | H2 3 | CUT. Not on asbfeo.gov.au. The internal link stays |
| 20 | 60% more quote requests | H2 3 | CUT |
| 21-23 | HBR: after 5 min -80%, after an hour -90%, 24 hours invisible | H2 4 | CUT as attributed. **REPLACED** with HBR's audit of 2,241 companies, linked, and a Worked block |
| 24 | (added) HBR: 37% / 16% / 24% / 23% | H2 4, Worked | **ADDED, linked.** It sums to 100% |
| 25 | BrightLocal 2024: 53% expect a reply within an hour; 30 minutes for urgent jobs | H2 4 | CUT. Neither is in BrightLocal. Reworded as a plain claim |
| 26-30 | Timeframe table: 0-5 min ... 3+ hours | H2 4 table | Kept, introduced as "an illustration, not survey data" |
| 31-33 | Average AU tradie 4-6 hours; fast ones under 10 minutes; 3-4 times more jobs | H2 5 | CUT (3-4 flagged). **REPLACED**: no Australian figure is published, so HBR's US 42-hour average is used, linked |
| 34 | 24-48 hours | H2 5 | Reworded, "the next day" |
| 35 | 4pm | H2 5 | Kept. An illustration |
| 36 | "LRM study (InsideSales) average 42 hours" | H2 5 | CUT. The figure is HBR's and now sits there |
| 37 | 4-6 hours vs 10 minutes, "the majority" | H2 5 | Reworded with no numbers |
| 38 | SMS "within 30 minutes" | H2 5 | Kept. Template text |
| 39-41 | Melbourne plumber: n8n, 30 minutes, 30% to 65% in two months | H2 5 | **REFRAMED** as an example. The result is CUT |
| 42-50 | Real cost: 20 enquiries, 20-30%, 4-6 quoted, 50%, 2-3 jobs, 60-70% "based on HBR", 12-14, 6-7, $2,000, $6,000-$8,000, nearly $100,000 | H2 6 | CUT. **REPLACED** with a Worked example: 1 extra job (assumption) x $2,000 (assumption) x 12 = $24,000 |
| 51 | Fill step 1: 30 minutes | H2 7 Fill | Kept. Template text. The stray full stop is fixed |
| 52 | "about an hour to set up" | H2 7 | Reworded, "It isn't a big build" |
| 53 | "Most tradies we work with use Google Forms..." | H2 7 | Reworded, "Many tradies already have...". A claim about UC's clients with no source |
| 54 | Geelong "$50K decision" | H2 7 | CUT |
| 55 | Next steps Fill: the next week; 30 minutes | H2 8 Fill | Kept. Instructions |
| 56 | FAQ 3: 4-6 hours, 24-48 hours, 10-30 minutes | FAQ | **REPLACED** with HBR's 2,241 companies, 42 hours and 23% (linked in the body) |
| 57 | FAQ 4: 50-70%, 20 enquiries, double, $80,000-$100,000 | FAQ | CUT. **REPLACED** with the Worked example's method and its $24,000 |
| 58 | FAQ 5: no response for 6 hours | FAQ | Reworded, "for hours" |
| 59 | FAQ 6: under $50 a month | FAQ | CUT. No n8n or SMS price was sourced |

FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions are unchanged.

## Front matter

- **`dateModified`: "2026-10-01" (batch 6) became "2026-10-03"**, under the rewrite-lane date rule: the first byte of sha256(slug), `0xe9`, is odd, so 3 Oct. The published date is unchanged.
- **The meta description dropped "50-70%"** (see #1). The title and canonical are unchanged.

## Blocks

| Block | Where | What it holds |
|---|---|---|
| Worked (new) | H2 4 | "How fast 2,241 US companies answered a web lead (HBR, 2011)": 37% + 16% + 24% + 23% = 100%. Every input is HBR's, linked in the sentence above |
| Worked (new) | H2 6 | "Say replying first wins one extra job a month (an example)": 1 x $2,000 x 12 = $24,000. The 1 and the $2,000 are labelled as the example's assumptions. $2,000 was the article's own job value |
| Fill (batch 6) | H2 7 | "The three steps", with the stray full stop fixed |
| Fill (batch 6) | H2 8 | "The fastest path", unchanged |
| Rail (kept) | H2 4 | The timeframe table, now introduced as an illustration |

No flagged figure is in a Worked block.

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before (on batch 6): 2,028
- After: 1,934 (down 94, or 5%). The format-pass survey script counts 2,304 to 2,178 (-5.5%).

## Checks

- **`next build`** (run directly, no IndexNow postbuild): passes, including both Worked sums. The first build failed on two unescaped apostrophes in the FAQ front matter. That's fixed, and logged in `lab-notes.md`.
- **`scripts/check-format-pass.mjs --base origin/content/format-pass-batch-6`**: no flagged figure in a Worked block, no em dash added, one H1, and the headings are identical to batch 6.
  - New numbers: 2,241, 1.25, 2011, 37, 16, 23 (HBR) and 24,000 (the Worked example).
  - It flags words -5.5%, the front matter (meta and FAQs), the Quick Answer and the date (it wants 1 Oct), all as intended.
- **`scripts/check-quick-answers.mjs`**: 71 of 71 pass.
- **`next start`, at 390 and 1440, in Chromium and WebKit** (CSP and HSTS stripped for WebKit): 200, no sideways scroll, one H1, "Updated 3 Oct 2026". All four blocks render.

## Reads thin (for Luke)

1. **No Australian data on how fast tradies reply.** The article now says so plainly and leans on a 2011 US audit. A real Australian measure, for example UC mystery-shopping 50 local tradies' web forms, would be a strong original asset for this article.
2. **The money section is an example, not evidence.** "One extra job a month" is an assumption the reader can change. No study ties reply speed to Australian trade revenue.
3. **The meta description changed** (the 50-70% is gone). The brief keeps meta unless a figure is cut, and this one was flagged.
