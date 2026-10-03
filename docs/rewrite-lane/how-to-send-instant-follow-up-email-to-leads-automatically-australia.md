---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: how-to-send-instant-follow-up-email-to-leads-automatically-australia

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, Lane 2, article 10, under Luke's 10:50 rule update and the 11:50 dates rule. **Branched off `content/format-pass-batch-5` (PR #54, still open).** This PR's base is that branch, so its diff shows only this article. Batch 5's three Fill blocks and two titled lists stand, with their text corrected where it held a figure.

Sources were read on 3 Oct 2026. HBR's page is paywalled past the teaser. Its figures were read from a 2011 print of the same HBR article and are linked to hbr.org.

## Verdict

- **The headline study was misquoted, three different ways.**
  - "Within 5 minutes converts 5 times better than 30 minutes" and "9 times more likely" were credited to Harvard Business Review. HBR's study ([Oldroyd, McElheran, Elkington, 2011](https://hbr.org/2011/03/the-short-life-of-online-sales-leads)) says neither.
  - What HBR does say: within an hour is "nearly seven times as likely to qualify the lead" as an hour later, and "more than 60 times" as likely as 24 hours or more. Its audit of 2,241 companies found a 42-hour average reply. Those figures now carry the point, linked.
  - The 5 vs 30 minute finding is InsideSales' own (100 times more likely to reach the lead), linked to [InsideSales](https://www.insidesales.com/why-timing-is-everything-when-responding-to-web-leads/).
- **Four personas presented as real customers** (Jake, Sarah, Tom, Lisa) become labelled examples with no results. Cut with them: "lost 8 jobs", "22% to 38%", "16 extra jobs a month", "60% had booked someone else", "3x more booked calls", and Tom's "revenue up 30%, 8 hours, 40% more jobs".
- **Unlinked statistics are cut:**
  - 64% of small businesses lose leads
  - MYOB 2024, 40%
  - HubSpot, 3-5 follow-ups lift replies 40%
  - Mailchimp, weekends 15-20% worse
  - ServiceM8 and Tradify, 30-40% (flagged 2 Oct)
  - "Recovers 15-20%"
  - "Cuts no-shows by 40%" (flagged)
  - the open, click and delivery benchmarks (98%, 40-60%, 30%, 10-20%, 5%)
- **Wrong product facts, corrected from the vendors' pages:**
  - **HubSpot's free tools don't include Workflows.** Workflows need Professional ([HubSpot KB](https://knowledge.hubspot.com/workflows/create-workflows)). The Fill's step 3 told readers to build one on the free tier. It now uses the free "Send an email after form submission" form automation, one per form ([HubSpot](https://knowledge.hubspot.com/forms/form-automations)).
  - **Mailchimp's free plan has no automation and 250 contacts,** not "500 contacts with limited automation" ([Mailchimp pricing](https://mailchimp.com/pricing/marketing/)).
  - **ActiveCampaign** starts at $15 a month, not $29 ([ActiveCampaign FAQ](https://www.activecampaign.com/about/faq)).
  - **ServiceM8** has a free plan (30 jobs a month) ([ServiceM8 pricing](https://www.servicem8.com/au/pricing)). Its automations don't list a "job created" trigger ([ServiceM8 help](https://support.servicem8.com/hc/en-us/articles/214222743-Automation-overview)), so the "When job is created, send..." recipe is replaced with what it does have.
- **Fixed link:** `/sales-automation` redirects to `/automation`, so it now points there directly (as in article 8).

## Figure table

| # | Figure or claim | Where | Source or CUT |
|--:|---|---|---|
| 1 | "convert 5x more leads" | `summary` | CUT |
| 2 | HBR: 5 min converts 5x vs 30 min | Intro, FAQ 1 | **CORRECTED** to HBR's "nearly seven times" (an hour vs an hour later), linked in the body |
| 3 | 64% of small businesses lose leads to slow follow-up | Intro | CUT |
| 4 | Quick Answer "0 minutes" | QA | Kept. An instruction. The Quick Answer is unchanged |
| 5-6 | Jake: 8 jobs a month, 90 seconds | Intro | **REFRAMED** as an example with no result |
| 7-8 | HBR: 5 min 9x vs 30 min; after an hour -90% | H2 1 | CUT as attributed. **REPLACED** with HBR's 2,241 companies, 42-hour average and "more than 60 times" (linked), and InsideSales' 5 vs 30 min, 100 times (linked) |
| 9 | (added) HBR: 37% within an hour, 16% 1-24 h, 24% over 24 h, 23% never | H2 1, Worked | **ADDED, linked.** HBR's own audit split, worked to 100% |
| 10 | MYOB 2024: 40% improvement | H2 1 | CUT. Not found |
| 11-12 | Sarah: 2-3 hours, under 2 minutes | H2 1 | **REFRAMED** as an example. The timings are cut |
| 13-14 | Tom: Sunday nights, 60% booked elsewhere; 24-hour reminder | H2 1 | **REFRAMED.** 60% CUT. The 24-hour reminder is kept as setup |
| 15-24 | Table: free tiers (1000, 500), $29, 100 tasks, $29; setup times; "Sydney office", "Online only" | H2 2 table | **REPLACED** with each vendor's free plan and whether it can send an instant reply free. Each row links its source. Setup times and support columns are cut |
| 25 | "Set up instant follow-up in under an hour" | H2 2 | Reworded with no number |
| 26 | Persona tool picks | H2 2 | **REFRAMED** to the examples |
| 27 | "most common platform for Australian small businesses" | H2 3 | CUT. Reworded to "can do this at no cost" |
| 28 | Fill step 3: Workflows on the free tier, delay 0 minutes | H2 3 Fill | **CORRECTED** (see the verdict) |
| 29 | Fill step 4: within 60 seconds | H2 3 Fill | Kept. A test instruction |
| 30 | Fill step 5: after 2 weeks; open rate below 40% | H2 3 Fill | 2 weeks kept. 40% CUT (flagged) |
| 31-32 | 30-45 min first time; under 10 min after | H2 3 | CUT |
| 33 | Mailchimp free: one automation | H2 3 | **CORRECTED**: no automation on free |
| 34 | ServiceM8 "When job is created" trigger; 10 minutes | H2 3 | **CORRECTED** to its listed automations. 10 min CUT |
| 35-37 | Template: within 2 hours, 0400 123 456, 15-minute call | Templates | Kept. Template text, plainly illustrative |
| 38 | Lisa: three versions, 3x more booked calls | H2 4 | **REFRAMED** as a test the reader runs. 3x CUT |
| 39-42 | Timing Fill: 0 min, +4-24 h, day 3 (+72 h), day 7 (+168 h) | H2 5 Fill | Kept. A suggested schedule |
| 43-44 | HubSpot: 3-5 follow-ups +40%; more than 6 in 2 weeks | H2 5 | CUT. Not found at HubSpot. Reworded as a plain claim |
| 45 | Jake's 3 emails, Sarah's 4 (day 5, 4, 8) | H2 5 | **REFRAMED** "For example, an electrician might send..." |
| 46-47 | Mailchimp: weekends 15-20% worse; Mon-Thu 9-11am AEST | H2 5 | **REPLACED** with [Mailchimp's send-time research](https://mailchimp.com/resources/insights-from-mailchimps-send-time-optimization-system/): Tuesday to Thursday, around 10am in the reader's time zone, flagged as newsletter data |
| 48 | "We've done 40+ jobs in Newtown" | Personalisation example | Kept. Sample copy that shows a token, not a claim |
| 49 | Sarah's form | H2 6 | **REFRAMED** as "an agency" |
| 50-54 | 98%+, 40-60%, below 30%, 10-20%, below 5% | Metrics list | CUT (30% and 40% flagged). Plain guidance |
| 55 | Sarah: under 4 h, above 6 h | H2 7 | **REFRAMED**. The reader sets the target |
| 56-58 | Jake: 22% to 38%, 16 extra jobs a month | H2 7 | CUT. The reader compares their own months |
| 59 | 3 days; 15-20% recovered | Next automations list | 3 days kept. 15-20% CUT |
| 60 | 24 hours after job completion | List | Kept. Setup |
| 61 | 7, 14, 30 days | List | Kept. Setup |
| 62 | 24 hours before; cuts no-shows 40% | List | 24 h kept. 40% CUT (flagged) |
| 63-65 | Tom: revenue +30%, 8 h less admin, 40% more jobs | H2 8 | CUT. A persona's results |
| 66 | FAQ 2: HubSpot 1,000 contacts; Mailchimp 500 with automation; Zapier 100 tasks; free until 50-100 leads | FAQ | HubSpot 1,000 kept ([catalog](https://legal.hubspot.com/hubspot-product-and-services-catalog)). Mailchimp **CORRECTED** (no automation). Zapier 100 kept ([pricing](https://zapier.com/pricing)). 50-100 CUT |
| 67 | FAQ 5: 30-40% higher conversion (ServiceM8, Tradify) | FAQ | CUT (flagged). Not found at either vendor |
| 68 | FAQ 6: no more than 4 emails in 2 weeks | FAQ | Kept. A rule of thumb, as with article 8's guidelines |

FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions are unchanged. A FAQ answer can't carry a link, so the body carries each source.

## Front matter

- **`dateModified`: "2026-09-29" (batch 5) became "2026-10-03"**, under the rewrite-lane date rule: the first byte of sha256(slug), `0xdf`, is odd, so 3 Oct. The published date is unchanged.
- **`summary`** dropped "to convert 5x more leads". The meta description has no figure and is unchanged.
- **The Quick Answer has no figure** and is unchanged.

## Blocks

| Block | Where | What it holds |
|---|---|---|
| Worked (new) | H2 1 | "How fast 2,241 US companies answered a web lead (HBR, 2011)": 37% + 16% + 24% + 23% = 100%. Every input is HBR's, linked in the sentence above. The note says they're US figures |
| Fill (batch 5) | H2 3 | "Set it up in HubSpot, step by step", with step 3 corrected and step 5's 40% cut |
| Fill (batch 5) | H2 5 | The timing structure, unchanged |
| Titled lists (batch 5) | H2 4, 7, 8 | The three things, four metrics (benchmarks cut) and next four automations (results cut) |
| Rail (rebuilt) | H2 2 | The platform table, sourced per row |

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before (on batch 5): 2,378
- After: 2,445 (up 67, mostly the Worked block and the HBR detail). The format-pass survey script counts 2,652 to 2,721 (+2.6%). The 2% cap is the format pass's rule, not the rewrite lane's.
