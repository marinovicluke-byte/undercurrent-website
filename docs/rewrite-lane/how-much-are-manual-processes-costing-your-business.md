---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: how-much-are-manual-processes-costing-your-business

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 1 of 5. Every figure has a source the reader can click, or it's gone. Nothing new was invented.

## Verdict

Of about 120 figures, three stay: OFX's **80%** and **38%** (an Ipsos survey of over 500 SME accountants and finance decision makers) and **48 working weeks** (52 weeks less the 4 weeks of annual leave in the National Employment Standards). Everything else is cut.

The article was built on invented client stories: a Dandenong plumber, a Brunswick agency, a Richmond consultant, a Frankston physio, a CBD consulting firm, a Dandenong electrician, a Geelong landscaper. None of them is on the approved list in `Builds/Products/SEO/_config/clients/undercurrent.yml`. Four of its six cited sources don't support what they're cited for:

- **Source Digital** states "40+ hours weekly" and "8-12 months" payback, but cites nothing for them. It's a vendor blog, not a primary source.
- **A One Outsourcing** cites the "MYOB 62%" figure without a link. I couldn't find the figure in any MYOB Business Monitor report I could reach.
- **Endless Automation** is about manufacturers. It never mentions invoicing, ServiceM8, Tradify or a 40-60% cut in errors.
- **The RBA bulletin** is linked as the source for the "$3,000 setup, $180/month" invoicing cost. It says nothing about invoicing automation.

## Sources checked

| Source | Checked how | Result |
|---|---|---|
| [OFX, Oct 2025 PDF](https://www.ofx.com/wp-content/uploads/2025/10/The-state-of-SME-financial-management-in-Australia-2.pdf) | PDF text extracted | 80% "using entirely or partially manual processes to reconcile their business' or client's out-of-pocket expenses". 38% "cite errors from manual data entry as their most common inefficiency". OFX (Ipsos) survey of over 500 SME accountants and finance decision makers. **Kept** |
| [OFX, Nov 2025 PDF](https://www.ofx.com/wp-content/uploads/2025/11/The-state-of-SME-financial-management-in-Australia-2025.pdf) | PDF text extracted | Same 80% and 38%. **Kept** as the reconciliation link |
| [Fair Work, annual leave](https://www.fairwork.gov.au/leave/annual-leave) | Page text | "Full-time and part-time employees get 4 weeks of annual leave". **Added** as the source for 48 weeks |
| [Source Digital](https://source-digital.com.au/blog/australian-smes-cutting-costs-with-ai-2026) | Page read | 40+ hours and 8-12 months are stated with no source. **Dropped** |
| [A One Outsourcing](https://www.aoneoutsourcing.au/blog/automation-accounting-in-australia) | Page read, then searched MYOB's reports | 62% is credited to "MYOB's November 2025 Business Monitor", with no link. Not found at MYOB. **Dropped** |
| [Endless Automation](https://endlessautomation.com.au/the-roi-of-automation-in-2026-a-guide-for-australian-manufacturers-facing-high-labor-costs/) | Page read | Nothing on invoicing. **Dropped** |
| [RBA bulletin, Oct 2025](https://www.rba.gov.au/publications/bulletin/2025/oct/pdf/small-business-economic-and-financial-conditions.pdf) | PDF read | Nothing on automation costs. **Dropped** |
| Vault wikis (`Research/wiki/MASTER-INDEX.md`) | grep for OFX, MYOB, manual processes, labour cost | No wiki covers these figures |
| [ServiceM8 Xero](https://www.servicem8.com/au/xero-integration), [Xero invoices](https://www.xero.com/au/accounting-software/send-invoices/), [Xero bank feeds](https://www.xero.com/au/accounting-software/bank-feeds/), [Dext](https://dext.com/au/) | 200 OK | Product facts with no figures. **Added** as links for the claims that replace the stories |

## Figure table

| # | Figure | Sentence (where) | Source or CUT |
|--:|---|---|---|
| 1 | $15,000-$40,000 a year | Meta description | CUT (ops, 3 Oct). Now: "Manual processes cost Australian SMEs paid hours every week. Calculate your hidden costs and find where automation pays for itself." The title and canonical are unchanged |
| 2 | $15,000-$40,000 a year | Quick Answer point 1 | CUT. Not stated by any source, and not worked in the body |
| 3 | About 40 hours a week, 5-10 person team | Quick Answer point 2 | CUT. Source Digital, unsourced |
| 4 | Payback 8-12 months | Quick Answer point 3 | CUT. Source Digital, unsourced |
| 5-16 | 6-8 h, $12k-$15k, 40-60% error cut; 10-15 h, $8k-$12k, 30-60% time saved; 8-12 h, $6k-$12k, 30% retention; 5-8 h, $5k-$10k, 50% faster | Top table, 4 rows | CUT. No source. The table is kept with words only (where the time goes, what automation changes) |
| 17 | "three days late", "three different systems" | Intro | Reworded with no number |
| 18 | 80% rely on manual or partly manual expense reconciliation | Intro, OFX | **KEPT**, OFX Oct 2025. Reworded to match the source: 80% of SME accountants and finance decision makers, out-of-pocket expenses |
| 19 | 40+ hours weekly per business | H2 1, Source Digital | CUT. Unsourced on the page |
| 20-21 | Solo tradie at $95/h = $3,800/week | H2 1 | CUT. No source for $95, and it rests on #19 |
| 22 | 5-person team $6,000-$8,000/week | H2 1 | CUT |
| 23 | Owners guess 2-3 times low | H2 1, "UC audits" | CUT. Replaced with a plain claim: admin comes in small bits, so it's easy to guess low |
| 24-27 | Dandenong plumbing: 10 h guessed, 28 h tracked, two weeks, $56,000 at $40/h | H2 1 | CUT. Invented story |
| 28-30 | $3,000 setup, $180/month, payback in two months | H2 1, linked to the RBA | CUT. The RBA bulletin doesn't say this |
| 31 | Track for five working days | Step 1 | Reworded, "a full working week" |
| 32-35 | $75,000 salary, $105k-$120k loaded, $55-$65/h, $50/h baseline | Step 2 | CUT. No source. Kept the method (wages plus super, leave and overheads) with no number |
| 36 | 48 working weeks | Step 3 | **KEPT.** Fair Work NES, 52 - 4 weeks of leave. Now the Worked block |
| 37-40 | Brunswick agency, 8 staff, 12 h/month, 3 h/week, 144 h, $7,200 | Step 3 | CUT. Invented story |
| 41 | 38% cite manual data entry errors | Step 4, OFX | **KEPT**, OFX Oct 2025. Said once, in the data entry section, not twice |
| 42-44 | $200-$500 per error, 2-3 errors a month, $6,000-$12,000 a year | Step 4 | CUT. No source, and the sum is wrong (2 x $200 x 12 is $4,800) |
| 45-47 | $95 callout, $150 consultation, $2,500 website build | Step 5 | CUT. Example prices with no source |
| 48-50 | Richmond consultant, 4 h/week, $180/h, $34,560 | Step 5 | CUT. Invented story |
| 51-56 | 6 h $14,400, 10 h $24,000, 8 h $19,200, 5 h $12,000, 3 errors $9,000, total $78,600 | "Typical 5-person trade business" list | CUT. The sums add up at $50/h x 48 weeks, but every input is unsourced |
| 57-60 | $8,000-$12,000 setup, $300-$500/month, payback 3-4 months, $60,000+ a year | After the list, linked to A One | CUT. The source doesn't say this |
| 61 | Follow up three times over 30 days | Invoicing | Reworded with no number |
| 62 | 62% of SMEs use manual bookkeeping (MYOB) | Invoicing | CUT. Second-hand, no primary found |
| 63-64 | 15-25 min per invoice (tradie), 30-45 min (consultant) | Invoicing | CUT. No source |
| 65-67 | 20 jobs/week, 5-8 h, $12,000-$15,000 at $50/h | Invoicing | CUT |
| 68-69 | Under 40 min/week, 40-60% fewer billing errors | Invoicing, Endless Automation | CUT. The source doesn't say this |
| 70-75 | Frankston physio, 12 clients, 3 min, 36 min, 3 h, $7,200, 5 days faster | Invoicing | CUT. Invented story |
| 76-80 | CBD consulting, 6 staff, 15 h, $36,000, 3 h, $28,800 | Data entry | CUT. Invented story |
| 81 | 38% (repeat) | Data entry, OFX | **KEPT**, OFX. The only place it now sits |
| 82 | "2pm on a Wednesday" | Follow-up scene | Kept. It sets the scene, it isn't a statistic |
| 83 | Tradies lose 40-60% of leads | Follow-up | CUT. No source |
| 84 | Respond within 60 minutes | Follow-up | CUT. Plain claim: speed wins |
| 85-90 | Dandenong electrician, 3-4 days, 28% to 48%, 4 h, $2,800, $56,000 | Follow-up | CUT. Invented story |
| 91-94 | Solo consultant, 3-6 months, 30/90/180 days, repeat business +30%, $18,000 | Follow-up | CUT. Invented story |
| 95-99 | Brunswick agency, 8 staff, 12 h/month, 144 h, $7,200, 15 min, $6,500 | Reporting | CUT. Invented story, the same one as #37-40 told twice |
| 100-104 | Geelong landscaping, 4 staff, 8 h, $19,200, 2 h, $14,400 | Reconciliation | CUT. Invented story |
| 105 | "Dozens of times per week" | Priority list | Reworded, "many times a week" |
| 106-109 | Plumber, 15 jobs, 6 h, $180/month, $14,400, 1.5 months | Priority list | CUT |
| 110-114 | Frankston physio, 4 no-shows, $95, 1/week, $14,820, $40/month | Priority list | CUT. Invented story |
| 115-117 | Instant follow-up +30-50% conversion, manual 2-3 days, automated under 5 min | Priority list | CUT. Plain claim: minutes, not days |
| 118-121 | UC sees 10-15 h/week recovered, $24k-$36k, $8k-$15k, payback 3-6 months | Priority close | CUT. A first-party result that's not on the approved list |
| 122-124 | $120/h, 10 h/week, $62,400 | FAQ 1 | CUT. Also wrong: at 48 weeks it's $57,600, not $62,400. The method stays, with 48 weeks (sourced) |
| 125-131 | 2-4 months, 6 h, $14,400, $2,000-$3,000, $180-$250/month, month 3, $12,000+ | FAQ 2 | CUT. Replaced with how to work out payback |
| 132-138 | 80% same pattern, 15 h/week, $20k-$25k, $4k-$8k, $200-$400/month, 60%, 40% | FAQ 3 | CUT |
| 139-144 | $8k-$15k, $300-$600/month, 3-6 months, $60k-$80k, half in year one | FAQ 4 | CUT. **The answer no longer gives a price.** See "Reads thin" |
| 145-148 | $180/h, 4 h, $34,560, $9,600 | FAQ 5 | CUT |

The FAQ answers render from the `faqs:` front matter, which also feeds the FAQPage JSON-LD. So the answer text in the schema changed with the visible FAQ, because the two must match. The schema type, the five questions and their order are unchanged.

## Blocks added

| Block | Where | What it holds |
|---|---|---|
| Rail (kept) | Top table | The same four rows and the same table position, with the figure columns turned into words |
| Fill | How do you calculate | "Work out what manual work costs you", the five Step paragraphs as five steps |
| Worked | How do you calculate | "Why a year has 48 working weeks": 52 weeks - 4 weeks of annual leave = 48. Every figure is sourced to Fair Work. The build checks the sum |
| Weight (pair) | Manual invoicing | "Manual invoicing" / "Automated invoicing" (contrast tone). The automated side is linked to ServiceM8 and Xero |
| Fill | Which to automate first | "Automate in this order", four tiers with First / Second / Third / Last as the timing |

Only one Worked block. No other sourced sum is left that drives the reader's decision.

## Word count

Body, from the H1 to the Sources list, without the FAQ, with link URLs and image markdown removed:

- Before: 1,953
- After: 1,513 (down 440, or 23%). The cut stories were most of the loss.

## Checks

- **`next build`** (run directly, so the IndexNow postbuild doesn't fire) passes. The Worked sum (52 - 4 = 48) passes the build's workings check.
- **`scripts/check-quick-answers.mjs`**: 71 of 71 pass. The new answer's numbers (80, 38, 48) were all in the article on `origin/main`. No keyword warning on this article.
- **No format-pass check script exists yet.** By hand: no em dash, H1 to H3 headings identical to `origin/main`, and the only numbers left are 80%, 38%, over 500, 52, 4 and 48, plus "5-10" in an FAQ question that stays as it is.
- **Head against production:** the title, canonical and every JSON-LD block are byte-identical to undercurrentautomations.com, apart from the FAQ answer text. The meta description changed on purpose (figure 1).
- **`next start`, at 390 and 1440, in Chromium and WebKit** (WebKit with the CSP stripped, per lab-notes 2026-10-02): no sideways scroll. Both Fill blocks, the Worked block and the contrast pair render. The rotating photo sits just before the "Four Biggest Drains" H2. Screenshots are kept out of git.

## Reads thin (for Luke)

1. **The article no longer answers its own title with a number.** "How much" now means "here's how to work out yours". The $78,600 example and the $15k-$40k range carried the argument, and neither had a source.
2. **The meta description lost its "$15,000-$40,000 a year".** Ops approved the change on 3 Oct. The new line makes no figure claim.
3. **FAQ 4 ("How much does it cost to automate...") gives no price.** UC's own published pricing would answer it, but that's a new number, so I didn't add one.
4. **There's no client story.** The approved list has one that fits ("Invoice generator (health business)", about 10 hours a week). Its source is "stated by Luke", which the reader can't click, so I left it out. It's a one-paragraph add if Luke wants it.

## Update, 3 Oct: updated date (Luke, 11:50)

`dateModified` is now `"2026-10-03"` (was absent, so the page showed the published date as "Updated"). The rewrite lane picks 2 or 3 Oct deterministically from the slug: the first byte of sha256(slug), even gives 2 Oct, odd gives 3 Oct (`0x67` here). The published date is unchanged. `dateModified` feeds the visible "Updated" line, the Article JSON-LD `dateModified`, og `modifiedTime` and the sitemap `lastmod`.
