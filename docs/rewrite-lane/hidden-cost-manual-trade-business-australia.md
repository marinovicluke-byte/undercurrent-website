---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: hidden-cost-manual-trade-business-australia

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 3 of 5. Every figure has a source the reader can click, or it's gone. Nothing new was invented.

## Verdict

**No figure in this article survives.** It said "No guesses. No made-up stats. Just Fair Work Commission data, ABS research, and Xero's small business insights", and closed with "These aren't made-up numbers". But every source link went to a homepage (fwc.gov.au, abs.gov.au, asbfeo.gov.au, xero.com, serviceseeking.com.au), and none of the named figures could be found at its source:

- **FWC award rates.** The article gave $35.94 (electrician), $34.78 (plumber) and $33.25 (carpenter). They don't match the 1 July 2025 pay guides, as summarised from the Fair Work guides: a grade 5 electrical worker is $29.74 base, and a plumber $29.47.
- **"ABS data on trade service pricing", $80-$120 an hour.** The ABS doesn't publish this.
- **ASBFEO, 7.2 hours a week on admin, and a "2023 Red Tape Report" at $5,100 a year.** Neither found. The nearest is an ACCI finding that 39% of small businesses spend more than six hours a week on red tape, which is a different figure.
- **Xero Small Business Insights 2024: $8,400 a year lost, "11 days faster", 34 vs 23 days.** Not in Xero's data. The real Xero figures are different: small businesses waited 22.6 days to be paid on average, and were paid 6.5 days late (March 2024 quarter, [Xero Small Business Insights](https://www.xero.com/au/resources/small-business-insights/latest-australia/)). **Not added**, per the brief's no-new-number rule. Ops can approve them as a sourced replacement.
- **Service Seeking, 42% of leads go cold within 7 days.** Not found.

"Dave the Melbourne plumber" and "an electrician in Brisbane" are invented examples, presented as "a real example" and "a real scenario". The flagged Quick Answer ($18,720 to $31,200, and $35,000 to $50,000) was worked nowhere in the body, and the FAQ said $31,500 to $54,400. The sums also disagreed with each other: 52 weeks in one place, 50 in another.

**What's left is the method:** your rate × your admin hours × your working weeks, plus slow payments, missed follow-ups and compliance time, each measured by the reader. The weeks are corrected to 48 (52 weeks less the 4 weeks of annual leave under the National Employment Standards). That's the one sourced sum, and it is the Worked block.

## Sources checked

| Source | How | Result |
|---|---|---|
| Fair Work Commission award rates (article linked fwc.gov.au homepage) | Searched the 2025-26 pay guides (MA000025, MA000036) | $35.94 and $34.78 match no official rate. The searches return $29.74 (electrical worker grade 5 base) and $29.47 (plumber). **CUT**, no correction added |
| "ABS data on trade service pricing" (abs.gov.au homepage) | Searched | No such ABS series. **CUT** |
| ASBFEO, 7.2 hours a week (asbfeo.gov.au homepage) | Searched | Not found. **CUT** |
| ASBFEO "2023 Red Tape Report", $5,100 | Searched | Not found. **CUT** |
| Xero Small Business Insights 2024, $8,400, 11 days, 34 vs 23 days (xero.com homepage) | Searched Xero SBI and its media releases | Not found. Xero's real numbers are 22.6 days to be paid and 6.5 days late (Mar 2024). **CUT, not replaced** |
| Service Seeking, 42% cold in 7 days | Searched | Not found. **CUT** |
| [Fair Work, annual leave](https://www.fairwork.gov.au/leave/annual-leave) | Page text | "Full-time and part-time employees get 4 weeks of annual leave". **Added** to correct the 52 and 50 weeks to 48 |
| Vault wikis | grep ASBFEO, award rates, Xero insights | Nothing |

## Figure table

| # | Figure | Sentence (where) | Source or CUT |
|--:|---|---|---|
| 1-2 | $18,720 to $31,200 a year | Quick Answer | CUT. Flagged 2 Oct, worked nowhere |
| 3 | "Fair Work award rates and documented admin time" | Quick Answer | CUT. Neither checks out |
| 4-5 | $35,000-$50,000 | Quick Answer | CUT. Flagged 2 Oct |
| 6-7 | $80-$120 an hour, 6-10 hours a week | Intro | CUT. Reworded with no number |
| 8 | "No guesses. No made-up stats. Just Fair Work, ABS, Xero" | Intro | CUT. The claim was false |
| 9-11 | FWC $35.94, $34.78, $33.25 | H2 1 | CUT. They don't match the 2025-26 pay guides |
| 12 | $80-$120 an hour, "ABS data" | H2 1 | CUT. No such ABS series |
| 13-14 | ASBFEO 7.2 hours; trades 8-10 hours | H2 1 | CUT. Not found |
| 15-17 | 7 h x $90 = $630 a week; x 52 = $32,760 | H2 1 | CUT. Inputs unsourced, and it disagrees with the 50 weeks used two lines later |
| 18-21 | Base calculation: $90, 7 h, 50 weeks, $31,500 | H2 2 | CUT. Now a "work out your own" Fill with no numbers, and weeks corrected to 48 (Fair Work) |
| 22-23 | Xero $8,400 a year; extra 2-3 weeks' wait | H2 2 | CUT. Not in Xero's data |
| 24-28 | Service Seeking 42% in 7 days; 2-3 missed a month at $2,000; $48,000-$72,000; one a quarter = $8,000 | H2 2 | CUT |
| 29-30 | ASBFEO $5,100; trades $6,500-$8,000 | H2 2 | CUT |
| 31-35 | Totals $31,500 + $8,400 + $8,000 + $6,500 = $54,400; past $70,000 at 8-10 h or $110-$120 | H2 2 | CUT |
| 36-50 | Dave: $95/h, 32 h, 3 h, 2 h, 2 h, 1 h, 8 h, $760, x 50 = $38,000 | H2 3 | CUT. Invented person. Kept as "where admin hides in a tradie's week", with no numbers and no person |
| 51 | Xero "11 days faster" | H2 3 | CUT |
| 52-58 | Dave: 3-4 renos a month, 50% vs 10% conversion, 48 hours, 2 jobs at $3,500, $7,000/mo, $84,000/yr | H2 3 | CUT |
| 59-63 | Dave total $38,000 + $8,400 + $84,000 + $7,000 = $137,400 | H2 3 | CUT |
| 64-78 | Table: 7-10 h vs 2-3 h, 250-350 h; 3-7 days vs same day, 11 days; 30-40% vs 95-100%, 4-8 jobs; 34 vs 23 days, $8,400; $31,500-$60,000 vs $9,000-$18,000, $22,500-$42,000 | H2 4 | CUT. Now a Weight pair in words. The heading "Manual vs Automated: The Real Numbers" became "Manual vs Automated: What Changes", because there are no numbers left in it |
| 79-83 | Brisbane electrician: $100/h, 7 h, 50 weeks, $35,000, $8,400, $2,500 x 12 = $30,000, $73,400 | H2 5 | CUT. Invented "real scenario" |
| 84-86 | $8,000 setup, $300/month, $3,600/yr, $11,600 | H2 5 | CUT. No source |
| 87-88 | Invoices within 2 hours; follow-ups after 3 days | H2 5 list | Reworded with no number |
| 89-102 | 7 to 2 h, 5 h x $100 x 50 = $25,000; 34 to 23 days, $8,400; 10% to 40%, 4 jobs x $2,500 = $10,000; $43,400 - $11,600 = $31,800; year two $39,800; five years $186,200; 1,250 hours | H2 5 | CUT |
| 103-115 | Summary: 7-10 h x $80-$120 x 50 = $28,000-$60,000; $8,400; $6,500-$8,000; 1-2 a month at $2,000-$5,000 = $24,000-$120,000; 20-30% of urgent jobs, $10,000-$40,000; errors $2,000-$5,000 "(Xero data)"; totals $54,900 / $73,400 / $141,000 | H2 6 | CUT. Kept as a list of what to count, with no numbers |
| 116 | "These aren't made-up numbers ... The sources are cited" | H2 6 | CUT. The claim was false |
| 117-119 | FAQ 1: $31,500-$54,400, over $70,000 | FAQ | CUT. Replaced with the method |
| 120-122 | FAQ 2: $90, 7 h, $630, $31,500 | FAQ | CUT. Method, with 48 weeks (sourced) |
| 123-124 | FAQ 3: $8,400, 11 days | FAQ | CUT |
| 125-126 | FAQ 4: ASBFEO 2023 $5,100, trades $6,500-$8,000 | FAQ | CUT. The answer now says no such ASBFEO figure was found. The question is unchanged, because the schema keeps its questions |
| 127-130 | FAQ 5: $31,000-$50,000, $8,000-$12,000, 3-5 months, 5-8 hours | FAQ | CUT |
| 131-136 | FAQ 6: 50 weeks, $8,400, 1-2 a month, $6,500-$8,000, ($95 x 7 x 50) + ... = $72,650 | FAQ | CUT. The formula stays with 48 weeks. "Track for 2 weeks" stays as an instruction. |

The FAQ answers render from the `faqs:` front matter and feed the FAQPage JSON-LD, so they change with the visible FAQ. The schema type, the six questions and their order are unchanged.

## Blocks added

| Block | Where | What it holds |
|---|---|---|
| Worked | How much do tradies lose | "Why to count 48 working weeks, not 52": 52 - 4 = 48. Fair Work. The build checks it |
| Fill | The real cost | "Work out your own cost", four steps: rate, tracked hours, 48 weeks, multiply |
| List | The real cost | "The three costs on top of admin time": slow payments, missed follow-ups, compliance, each to count yourself. It replaces the bold-label paragraphs |
| List | Opportunity cost | "Where admin hides in a tradie's week", Dave's week with no person and no numbers |
| Weight (pair) | Manual vs automated | "Manual operation" / "Automated operation", the old table's rows in words. It reads as a contrast |
| List (kept) | Earn back by automating | "What a trade business usually automates first", the old five-item list with the numbers taken out |

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before: 1,790
- After: see Checks

## Reads thin (for Luke)

1. **The title promises a hidden cost, and the article no longer names one.** "The hidden cost" is now a method the reader runs, not a dollar figure. This article needs Luke more than the others: either real sourced figures (Xero SBI's 6.5 days late is a candidate, as are hipages' published rates as used in the PR 34 tradie admin rewrite), or a reframe of the title.
2. **The meta description says "Fair Work + ABS hours + Xero insights = the number you need to see."** It has no figure, but none of those three sources is used any more. I didn't change it, because ops approves meta changes per article. Proposed: "Work out the real cost of running your Australian trade business manually: your rate, your admin hours, your working weeks. A method you can check."
3. **FAQ 4 asks what ASBFEO says, and the honest answer is that no such ASBFEO figure was found.** Better to replace the question, but the schema keeps its questions.
4. **Article 2 (PR #45) links here as "a dollar-side breakdown by trade".** After this rewrite that's no longer true. One phrase in PR #45 to fix if ops agrees.
