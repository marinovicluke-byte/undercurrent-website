---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: aussie-startup-keen-to-help-small-businesses-cut-manual-work-cheap-happy-to-chat

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 6 (added by ops 10:20), under Luke's 10:50 rule update and 11:50 dates rule. **Branched off `content/format-pass-batch-1` (PR #44, still open).** This PR's base is that branch, so its diff shows only this article. Batch 1's blocks for this article stand: the week-by-week Fill, the DIY Weight pair and the Worked block.

## Verdict

**Every statistic in the article is unsourced, and none is linked.** Cut:

- About twenty "studies show" or "industry data" percentages (73%, 82%, 68%, 67%, 55%, 90%, 78%, 63%, 41%, 92%, 98%, 87% and more).
- Every industry price band ($2,000 to $15,000 setups, $8,000-$15,000 IT budgets, retainers).
- UC's own claims: "94% of our clients", "8.5 hours saved", "$12,000-$25,000 per audit".

The Quick Answer's "$2,000 to $8,000" goes too.

**A decision for Luke: the article's UC offer contradicts UC's own published facts.** The article says UC setups cost "$3,000 to $8,000 with us" and take 4-6 weeks. The live [company information page](https://undercurrentautomations.com/company-information) says "Custom AI automation, implementation, and business AI workshops also start at $1,000 AUD per month ... All prices exclude GST", and "Automation and website builds go live within 14 days of the first call". I didn't pick one. The article's UC price and timeline are cut and not replaced, and the UC section describes the offer without numbers. **Luke: which is current?** Once that's settled, a linked line can go back in.

**Kept:** the DIY Worked block (30 hours x $100 = $3,000). Its two inputs are now labelled as the example's assumptions, per the new rule.

**Added, linked:** Zapier's own pricing (free plan, US$29.99 a month billed monthly) in the options table, as in PR #45.

## Sources checked

| Source | How | Result |
|---|---|---|
| "Recent small business surveys" 73% / 520 hours | None named | **CUT** |
| "A 2024 study" 82% prefer local | None named | **CUT** |
| "Studies show" 68% audit, 67% referrals, 41% DIY abandon; "Research" 55% content | None named | **CUT** |
| "Industry data" 63%, 87%; "Approximately" 92%; Zapier "98% uptime" | None named | **CUT** |
| "90% of Australian studios test with 50 transactions", "78% request tweaks" | None named | **CUT** |
| UC: 94% quote match, 8.5 hours, $12,000-$25,000 audit, $3,000-$8,000 pricing | Not on the approved stories list. They contradict [/company-information](https://undercurrentautomations.com/company-information) | **CUT**. Decision for Luke (above) |
| [Zapier pricing](https://zapier.com/pricing) | Page read (article 2) | Free 100 tasks/mo; Professional US$29.99/mo billed monthly. **ADDED** in the table, replacing "$20-$70/month" |
| "Zapier's 5,000+ app directory"; "1,000+ applications" | FAQ, no link possible | Reworded to "thousands", with no exact number in the FAQ |
| Salesforce / Dynamics "$100-$300 per user per month" | Not checked against vendors | **CUT**. The point stands without it |

## Figure table

| # | Figure | Where | Source or CUT |
|--:|---|---|---|
| 1 | About $2,000 to $8,000 for a first setup | Quick Answer | CUT. Replaced by "Clear prices before you commit" |
| 2-3 | $50K roadmap; $30K | Intro, Why section | Reworded with no number |
| 4 | Team of five, not fifty | Why section | Kept. It's a turn of phrase |
| 5-6 | 73% of under-20 businesses spend 10+ hours; 520 hours, three months | Why section | CUT |
| 7 | Pays for itself in six months | Why section | CUT |
| 8 | IT budget $8,000-$15,000 | Why section | CUT |
| 9 | 60-70% of the week on operations | Why section | CUT |
| 10 | Three days for a response | Why section | Reworded with no number |
| 11 | 82% prefer local (2024 study) | Why section | CUT |
| 12-13 | Expect $2,000-$8,000; below $1,500 / above $15,000 | What to look for | CUT. Reworded: ask for a ballpark, and be wary of a template sold as custom |
| 14 | 68% find 5+ hours in an audit | What to look for | CUT |
| 15 | Fewer than 20 employees | What to look for | Kept. It's an instruction (ask for references from businesses your size) |
| 16-27 | Price bands: $2,000-$15,000; $2,000-$5,000 / 1-2 weeks / 3-5 h; $5,000-$10,000 / 3-4 weeks / 8-12 h; $10,000-$15,000 / 6-8 weeks / 15-20 h; $3,000-$6,000; 3-5 automations, 5-10 h, 260-520 h; 85% less | Real cost section | CUT. The three tiers stay as descriptions (simple, medium, complex) with no prices or hours |
| 28-30 | DIY 20-40 hours; $50/h = $1,000-$2,000; $100/h | Real cost section | CUT. The Worked block below carries the same point as a labelled example |
| 31-32 | ROI 4-8 months; 10+ hours break even in 3-4 months | Real cost section | CUT |
| 33-44 | Options table: $20-$70/mo, 20-40 h; $500-$2,000, 1-2 weeks; $3,000-$8,000, 4-6 weeks, 30-90 days; $25,000-$100,000+, 3-6 months | Options table | DIY cost **REPLACED** with Zapier's own price (linked under the table). All other numbers CUT and reworded |
| 45 | 1-20 employees | After the table | Kept. A description of who the options suit |
| 46 | 67% find providers by referral | How to find | CUT |
| 47 | 5-10 studios per city | How to find | CUT |
| 48 | 5-15 years of experience | How to find | Reworded: "a track record in small business work" |
| 49 | 55% higher conversion | How to find | CUT |
| 50 | 2-3 candidates | How to find | Kept. An instruction |
| 51 | 500-person companies; first 90 days | Questions | Reworded with no numbers |
| 52-53 | 30-90 days free support; $150-$500/month retainer | Questions | CUT. Reworded: a support period, or a monthly retainer |
| 54-56 | $5,000 project, 8 hours, 4-6 months at $50-$75/h | Questions | CUT |
| 57-63 | Week-by-week Fill: 1-2 hour conversation; "6 hours ... $15,600 ... $50/hour"; 90% / 50 transactions; 2-3 hour training; 78% / 2-5 tweaks; Weeks 1-8 | Fill block (batch 1) | Stats CUT. The Week 1 to Weeks 6-8 timing stays, framed as "a typical engagement can run". The audit quote's $15,600 (6 x $50 x 52) is CUT: it used 52 weeks, and its inputs were unlabelled |
| 64 | 4-6 weeks, "not months" | After the Fill | Reworded: "weeks, not months" |
| 65 | Salesforce / Dynamics $100-$300 per user | Red flags | CUT |
| 66 | 12-month retainer | Red flags | Reworded: "a long retainer" |
| 67 | 63% sign ongoing support | Red flags | CUT |
| 68-69 | DIY pair: 1-2 automations, 10-20 hours, 3+ systems, $50/hour | DIY pair (batch 1) | Reworded with no numbers ("one or two", "a few systems" stay as words) |
| 70-72 | Worked: 30 hours x $100 = $3,000 | DIY Worked (batch 1) | **KEPT**, with both inputs labelled "the example's assumption" |
| 73 | 41% abandon DIY | DIY | CUT |
| 74 | 1-50 employees | UC section | Kept. It's UC's stated audience (`undercurrent.yml`: "1-50 staff") |
| 75 | Audit uncovers $12,000-$25,000 | UC section | CUT |
| 76-77 | $3,000-$8,000 with us; 94% within $500 | UC section | CUT. Decision for Luke |
| 78 | 30-90 days support | UC section | Reworded: "stick around after go-live" |
| 79 | 8.5 hours saved after 90 days | UC section | CUT. Flagged by format pass batch 1 |
| 80-90 | FAQ 1: $3,000-$8,000, 3-10, $2,000-$3,000, $5,000-$10,000, $10,000-$15,000, $20-$200, 4-8 months, 8+ hours | FAQ | CUT. Replaced with how to get a price and work out payback |
| 91-97 | FAQ 2: $20-$70, $400+, 40-60% less, $20-$50, 1-5, $100, 10+ | FAQ | CUT. Plain comparison |
| 98-104 | FAQ 3: 4-6 weeks, Weeks 1-8, 20-40 h, 2-3 months, 1-2 h, 3-5 h | FAQ | CUT. Stages without durations |
| 105-107 | FAQ 4: 1,000+, 5,000+, 92% | FAQ | Reworded: "thousands" |
| 108-111 | FAQ 5: 30-90 days, $100-$500, 98%, 1-2 h, 87% | FAQ | CUT |

The FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions are unchanged. A figure in a FAQ answer can't carry a link, so the FAQs hold none.

## Front matter

- **`dateModified`: "2026-10-01" (batch 1) became "2026-10-03"**, under the rewrite-lane date rule: the first byte of sha256(slug), `0x2d`, is odd, so 3 Oct. The published date is unchanged.
- **The meta description has no figure, so it's unchanged.**

## Blocks

Batch 1's blocks are unchanged in shape: Fill (a typical engagement, week by week), Weight pair (DIY makes sense / DIY is the wrong call) and Worked (what building it yourself costs). Only their figures changed, as above. No block was added: with the stats gone, there's no further sum to work.

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before (on batch 1): 2,975
- After: 2,649 (down 326, or 11%). The format-pass survey script counts 3,230 to 2,776 (-14.1%).

## Checks

- **`next build`** (run directly, no IndexNow postbuild): passes, including the Worked sum (30 x $100 = $3,000).
- **`scripts/check-format-pass.mjs --base origin/content/format-pass-batch-1`** (now in the repo on this branch): one new number, 29.99 (Zapier, linked). No flagged figure, no em dash, one H1, and the headings are identical to batch 1. It fails on words (-14.1%), front matter and Quick Answer, which are intended. It also says "dateModified 2026-10-03, want 2026-10-01": the format pass's date script spreads 29 Sep to 3 Oct. **The brief gives rewrite-lane articles 2 or 3 Oct, so 3 Oct stands.** If PR #44 is merged first and its script is rerun on main, it would set this article back to 1 Oct.
- **`scripts/check-quick-answers.mjs`**: 71 of 71 pass.
- **Head against production:** title, meta description and canonical match. In the JSON-LD only `dateModified` and the FAQ answer texts differ. The page shows "Updated 3 Oct 2026".
- **`next start`, at 390 and 1440, in Chromium and WebKit** (CSP stripped for WebKit): no sideways scroll, and all 5 blocks render.

## Reads thin (for Luke)

1. **UC's price and timeline.** The decision above. The "How UnderCurrent helps" section is now offer-shaped with no numbers.
2. **The cost section has no prices at all.** Nothing in it had a source. UC's own published price, once Luke confirms it, is the natural fill.
3. **No proof.** The approved stories list has nothing that matches "cheap and happy to chat". The SaaS sales research automation (about 10 hours a week) would fit, but it has no clickable source.
