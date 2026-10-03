---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: what-is-business-process-automation-australia

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 7 (added by ops), under Luke's 10:50 rule update and 11:50 dates rule. **Branched off `content/format-pass-batch-2` (PR #47, still open).** This PR's base is that branch, so its diff shows only this article. Batch 2's two Fill blocks stand.

## Verdict

Batch 2 left this article's sums in prose because they were unnamed client results, and one was the flagged $31,200. Under the new rule:

- **Kept as labelled examples, with sourced weeks:**
  - **The Brisbane agency** (12 hours a week, $50 an hour) is now "Say an 8-person Brisbane agency (an example)". Its sum is worked at 48 weeks, not 52: 12 x $50 x 48 = **$28,800**. That replaces the flagged $31,200. Its "$8,500 setup, ROI in 4 months" is cut, because those were claimed results.
  - **The Melbourne tradie** (5 minutes x 30 jobs = 2.5 hours a week) was "a real example". It's now "say", in a Worked block.
- **Cut, as client results not on the approved list:**
  - The Melbourne bookkeeper "we worked with": 8 hours, $60, $24,960, $4,200, 8.75 weeks.
  - The Sydney cafe owner: 15 hours, 4 hours, $600, net 11 hours. The story stays, framed as an example with no numbers.
- **Cut, unsourced:**
  - "[ABS](https://www.abs.gov.au) data, 67% waste 5+ hours". The link was the ABS homepage, and no such ABS figure exists.
  - "2024 Deloitte report, 12-18 hours".
  - "15+ hours", twice.
  - Every price band: custom $2,000-$15,000 and $5,000-$8,000, maintenance $200-$500, enterprise $500-$5,000+, "10-20% of setup a year".
  - "Covers 80%".
- **Corrected to the vendor page:** "$20-$150/month for Zapier, Make" became Zapier free (100 tasks), then US$29.99 a month billed monthly, and Make free (1,000 credits), then US$9 a month, both linked. "Zapier connects 5,000+ apps" became "thousands of apps".
- **Corrected, sourced:** batch 2's Fill "Work out your annual saving" said "Multiply by 52 weeks". It now says 48 working weeks, 52 less the 4 weeks of annual leave under the [National Employment Standards](https://www.fairwork.gov.au/leave/annual-leave).
- **UC pricing:** the article's "$2,000-$15,000" custom range isn't UC's published price (see the article 6 decision on `/company-information`). Cut, not replaced.

## Rule applied to small counts

Instructions and the timings of an example setup ("another email 2 days later", "a reminder 24 hours before", "pay in 7 days") describe how to configure a workflow. They aren't claims, so they stay. So does the article's own rule of thumb (more than 5 minutes, at least once a week).

## Figure table

| # | Figure | Where | Source or CUT |
|--:|---|---|---|
| 1-2 | ABS 67% waste 5+ hours; 250 hours a year | Intro | CUT. The ABS homepage link stated nothing of the kind |
| 3-7 | "A real example": Melbourne tradie, 4 actions, 5 min, 30 jobs, 2.5 hours | H2 1 | **REFRAMED** "Say a Melbourne tradie...". Worked: 5 min x 30 jobs = 150 minutes (2.5 hours), inputs labelled as the example's assumptions |
| 8 | $20-$150/month | H2 2, option 1 | **CORRECTED** to Zapier and Make pricing, linked (below) |
| 9-10 | $2,000-$15,000; 15+ hours after first setup | H2 2, option 2 | CUT |
| 11 | 10-person business in Sydney | H2 2 table intro | Kept as an example setup. No figures in the table |
| 12-13 | 5 minutes, once a week | H2 3 bold opener | Kept. The article's own rule of thumb |
| 14-17 | 2 days, a week; 7 days, 14 days; 24 hours | H2 3 list | Kept. Example configuration, not claims |
| 18-19 | Deloitte 2024 12-18 h; 3-4 h per person in a 5-person business | H2 3 | CUT |
| 20 | 15+ hours, two workdays | H2 4, benefit 1 | CUT |
| 21 | 60 seconds; 9pm Saturday | H2 4, benefit 3 | "60 seconds" reworded to "a minute or two". The scene stays |
| 22 | 3 days | H2 4, benefit 4 | Reworded, "days" |
| 23-28 | Brisbane agency table: 4, 3, 2, 3 = 12 h/week | H2 4 table | **KEPT as an example.** The intro says "Say an 8-person Brisbane agency..." and the note says the hours are the example's assumptions |
| 29-33 | 624 h, $50/h, $31,200, $8,500, 4 months | H2 4 | $31,200 CUT (flagged 2 Oct). **Worked:** 12 h x $50 (assumption) x 48 weeks (Fair Work) = $28,800. $8,500 and "4 months" CUT |
| 34 | 2 days, 5 emails over 3 weeks | H2 5 example | Kept. Example configuration |
| 35-36 | $20-$150/month | H2 6, DIY | **CORRECTED**: Zapier free then US$29.99/mo billed monthly; Make free then US$9/mo, linked |
| 37-40 | $2,000-$15,000; 1-50 people; $5,000-$8,000; 3-5 workflows; $200-$500/month | H2 6, custom | CUT ("1-50 people" kept as UC's stated audience) |
| 41 | $500-$5,000+/month enterprise | H2 6 | CUT. "Built for large organisations" stays |
| 42 | Multiply by 52 weeks | H2 6, Fill (batch 2) | **CORRECTED** to 48 working weeks, Fair Work linked |
| 43-48 | 3-6 months payback; bookkeeper 8 h, $60, $480, $24,960, $4,200, 8.75 weeks | H2 6 | CUT. Client result not on the approved list |
| 49 | Zapier 5,000+ apps | H2 7 | Reworded, "thousands" (linked to zapier.com) |
| 50 | 80% of small business needs | H2 7 | CUT |
| 51 | 15 workflows simultaneously | Mistake 2 | Reworded, "everything at once" |
| 52 | 10-20% of setup cost a year | Mistake 3 | CUT |
| 53-54 | 20 hours vs 3 hours | Mistake 6 | Reworded with no numbers |
| 55-59 | Sydney cafe: 15 h, 3 weeks, 4 h, $600, net 11 h | Mistake 6 | **REFRAMED** as an example with no numbers |
| 60 | FAQ 1: 2 days, a week | FAQ | Kept. Example configuration |
| 61-63 | FAQ 3: 2-3 steps, 2 apps, 30 min to 1 h; 5-20 h; 3-5 workflows, 1-2 weeks | FAQ | CUT |
| 64-65 | FAQ 6: 5 hours = 20%, "an extra day" | FAQ | CUT. Also wrong for a full-time week |
| 66-67 | FAQ 8: $20-$150; n8n cloud $20-$50 | FAQ | CUT. A FAQ answer can't carry a link |

FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions are unchanged. The one-paragraph answer at the top (a blockquote, not the Quick Answer shape) has no figure and is unchanged.

## Front matter

- **`dateModified`: "2026-09-30" (batch 2) became "2026-10-02"**, under the rewrite-lane date rule: the first byte of sha256(slug), `0xda`, is even, so 2 Oct. The published date is unchanged.
- The meta description has no figure, so it's unchanged.

## Blocks

| Block | Where | What it holds |
|---|---|---|
| Fill (batch 2) | H2 2 | "One lead, from form to payment", unchanged |
| Fill (batch 2) | H2 6 | "Work out your annual saving", with step 3 corrected to 48 weeks |
| Worked | H2 1 | "Say a Melbourne tradie invoices 30 jobs a week (an example)": 5 min x 30 = 150 minutes |
| Worked | H2 4 | "What the agency's 12 hours a week are worth (an example)": 12 x $50 x 48 = $28,800 |
| Rail (kept) | H2 2, H2 4 | The systems table and the agency table (now framed as an example) |

## Word count

Body, from the top to the end of the last section before the FAQ, with link URLs removed:

- Before (on batch 2): 2,803
- After: see Checks

## Reads thin (for Luke)

1. **The cost section gives tool prices but no build price.** UC's custom price is the open decision from article 6.
2. **No sourced Australian figure for time lost to repetitive tasks.** The ABS one was invented. MYOB's 2022 "7 hours a week" (used in PR #45) would fit if ops wants it here too.
