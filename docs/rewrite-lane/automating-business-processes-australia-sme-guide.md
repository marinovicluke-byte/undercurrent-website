---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: automating-business-processes-australia-sme-guide

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 2 of 5. Every figure has a source the reader can click, or it's gone. Nothing new was invented.

## Verdict

The sourced spine holds:

- **ABS:** only 5% of businesses with 0-4 staff reach "Established" digital intensity, against 53% with 200 or more (2021-22 data).
- **MYOB:** the "Digitised but disconnected" research (SoWhat, 2022, 1,531 Australian businesses) finds $2.2bn invested a year, 3 in 5 with "bad digitisation", 7 hours a week wasted, and $1.4bn on unused tools.

Everything the 2 Oct flag named is cut: the "5 to 10 hours a week" and "payback in the first month". So are the three named builds (HVAC in Brunswick, retail in Surry Hills, a bookkeeper in Brisbane) and four more stories (a Geelong tradie, a Brunswick electrician, the "47 identical emails", the "SMEs we work with" results). None is on the approved list in `Builds/Products/SEO/_config/clients/undercurrent.yml`.

The three builds come back as patterns with no client, no place and no result. They're labelled "how the pattern works, not a client result". The $72,000 "our own math" sum is cut, because its 3 hours a day and $100 an hour have no source. MYOB's 7 hours a week takes its place as the cost of doing nothing, worked to a year.

Tool prices were checked against each vendor's own page on 3 Oct 2026. Five were wrong:

- Zapier and Make are priced in USD, not AUD.
- Make's paid plan is $9, not $10.59.
- Xero's cheapest plan is $78, not $35.
- MYOB's cheapest Business plan is Lite at $315 a year, not $14 a month.
- Calendly is $10 USD a seat, not $12 AUD.

These are corrected to the vendor's figure and linked, not invented. **Ops decided on 3 Oct to keep the corrected prices, each linked to the vendor page.**

## Rule applied to small counts

A count that's an instruction or a description of the article is not a claim, so it stays. Examples: "pick two processes", "three things", "five mistakes", "book 2 hours", "Step 1 to Step 5". A count that claims a result or a fact needs a source.

## Sources checked

| Source | How | Result |
|---|---|---|
| [ABS Digital Intensity Index](https://www.abs.gov.au/articles/development-composite-indicator-business-digital-intensity-australia-digital-intensity-index) | Page read | 5% (0-4 employees) and 53% (200+) at Established, table "Digital Intensity Indicator, selected levels, by employment size", 2021-22, published 28 Jul 2023. **Kept** |
| [MYOB, Digitised but disconnected](https://www.myob.com/au/press-releases/digitised-but-disconnected-3-in-5-smes-report-digital-solutions-are) | Page read | "$2.2bn yearly", "3 in 5 ... 'bad digitisation'", "the equivalent of one working day each week (7 hours)", "$1.4bn ... unused digital tools". 2,056 surveyed (1,531 AU), 24 Mar to 17 Apr 2022, published 13 Jun 2022. **Kept**, now with the year |
| [Fair Work, annual leave](https://www.fairwork.gov.au/leave/annual-leave) | Page text | 4 weeks of annual leave, so 48 working weeks. **Added** for the Worked block. The old sum already assumed it (240 days is 48 weeks of 5) |
| [ATO, BAS](https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/business-activity-statements-bas) | Old URL 404, new URL 200 | Link fixed. The claim "Xero auto-reconciles the receipts as they land" is cut: Xero suggests matches, you still confirm them |
| [Fair Work, record-keeping](https://www.fairwork.gov.au/pay-and-wages/pay-slips-and-record-keeping/record-keeping) | n/a | Only used inside the invented bookkeeper story. **Dropped** |
| [Zapier pricing](https://zapier.com/pricing) | Page read | Free 100 tasks/mo ✓. Professional $29.99/mo billed monthly, **USD** ("Base currency: USD"). Corrected from AUD |
| [Make pricing](https://www.make.com/en/pricing) | Page read | Free up to 1,000 credits/mo ✓ (was "ops"). Make plan **$9/mo USD**. Corrected from $10.59 AUD |
| [n8n pricing](https://n8n.io/pricing/) | Page read | Self-hosted Community Edition is free ✓. "No limits" reworded: the page states no limits for it, and says nothing either way |
| [Xero AU pricing](https://www.xero.com/au/pricing-plans/) | Page read | Plans from **$78/mo** (Grow), AUD incl. GST. Corrected from "around $35" |
| [MYOB AU pricing](https://www.myob.com/au/pricing) | Page read | Lite **$315 a year** standard, the cheapest Business plan. Corrected from "from $14/mo" |
| [HubSpot CRM](https://www.hubspot.com/products/crm) | Page read | Free CRM ✓ |
| [Calendly pricing](https://calendly.com/pricing) | Page read | Free plan ✓. Standard **$10 USD/seat/mo**. Corrected from $12 AUD |
| [ServiceM8 AU pricing](https://www.servicem8.com/au/pricing) | Page read | Starter **$29/mo**, AUD incl. GST ✓. Also a free plan |
| [Square AU pricing](https://squareup.com/au/en/pricing) | Page read | "No setup fees or monthly fees", pay per transaction ✓ |
| Vault wikis | grep MYOB, ABS digital intensity, no-code pricing | Nothing on these figures |

## Figure table

| # | Figure | Sentence (where) | Source or CUT |
|--:|---|---|---|
| 1 | Save SMEs 5-10 hours a week | Quick Answer | CUT. Flagged 2 Oct, rests on unlisted builds |
| 2 | Pay for themselves within the first month | Quick Answer | CUT. Flagged 2 Oct |
| 3 | 3-4 hours lost every day | Intro | CUT |
| 4-6 | Pays back in the first month, 5-15 hours a week, "SMEs we work with" | Intro | CUT. First-party, not on the approved list |
| 7 | 10-minute map (audit) | Intro | Reworded with no number |
| 8-9 | ABS 5% (0-4 employees) vs 53% (200+) | Intro | **KEPT**, ABS. Said once now: the repeat in the tools section is cut |
| 10 | Pay back in the first billing cycle | H2 1 bold opener | CUT |
| 11 | 2-3 hours a week chasing payments | Order list 1 | CUT |
| 12-13 | Reminders 7 days before, on the due date, 3 days after; build in under an hour | Order list 1 | Reworded: "before, on and after the due date" with no numbers. "Under an hour" cut |
| 14-15 | Geelong tradie, 45 min a day, 6 hours back | Order list 2 | CUT. Invented story |
| 16-18 | No-shows cost "thousands every month"; a reminder 24 hours before cuts no-shows 60-70%; 20 minutes to set up | Order list 3 | CUT. No source |
| 19 | Three days later it's too late | Order list 4 | Reworded with no number |
| 20 | "#1 and #2" | After the list | Kept. An instruction |
| 21-22 | Three real builds, 4-10 hours of admin, paid back inside the first month | H2 2 bold opener | CUT. Flagged 2 Oct |
| 23-25 | HVAC Brunswick: 8-10 h/week, follow-up 5 days later; after, follow-up after 3 days, reminders 7/0/3 days | Example 1 | CUT. The before/after process stays as a generic Weight pair with no client and no numbers |
| 26-28 | Time saved 8 hours, $300 setup, paid for itself in the first week | Example 1 | CUT |
| 29-31 | Surry Hills store: 4-5 hours, $49/month Zapier Pro | Example 2 | CUT. The stock-sync pattern stays as a description with no client |
| 32-36 | Brisbane bookkeeper: 6 hours, 5 days before deadline, 5-6 hours saved, free, 3 more clients | Example 3 | CUT. The document-chase pattern stays with no client. "Free" is kept for HubSpot's free CRM, which is sourced |
| 37 | First builds run under an hour | H2 3 bold opener | CUT |
| 38 | Build your first automation in under an hour | Before the steps | CUT |
| 39 | A full working day every week (bold opener), "the average SME we audit" | H2 4 | **KEPT as MYOB's figure**, credited to MYOB, not to UC audits |
| 40-43 | Brunswick electrician, 3 hours a day, 15 hours a week, six figures | H2 4 bold opener | CUT. Invented |
| 44-46 | 3 hours a day = 15 a week = 60 a month | H2 4 | CUT. No source for the 3 hours |
| 47-50 | 3 h/day x $100/h x 240 days = $72,000 "our own math" | H2 4 | CUT. Inputs unsourced. Replaced by the Worked block from MYOB's 7 hours (see Blocks) |
| 51 | 20-30% more work | H2 4 | CUT |
| 52-55 | MYOB $2.2bn, 3 in 5, one working day a week (7 hours), $1.4bn | H2 4 | **KEPT**, MYOB 2022. Now says 2022 and the sample |
| 56-57 | $50-200/month on tools, vs the $72,000 | H2 4 close | CUT |
| 58 | Explain it in 5 bullet points | Mistake 2 | Reworded, "a few bullet points". It's a rule of thumb with no source |
| 59 | 47 identical emails | Mistake 3 | CUT. An unlisted anecdote |
| 60 | 5 disconnected tools | Mistake 5 | Reworded, "a handful of" |
| 61-62 | 80% automation coverage with 3-4 tools | H2 6 bold opener and paragraph | CUT, both times. "3-4 tools" kept as a description of the list |
| 63-64 | Zapier free 100 tasks, then $29.99 | Tools table | **KEPT**, Zapier, now marked USD |
| 65-66 | Make free 1,000 ops, then $10.59 | Tools table | 1,000 **KEPT** as credits. $10.59 **CORRECTED** to $9 USD (Make) |
| 67 | n8n free self-hosted | Tools table | **KEPT**, n8n |
| 68 | 60% of your admin with three apps | Recommendation | CUT |
| 69 | Xero around $35/mo | Tools list | **CORRECTED** to "from $78 a month", Xero |
| 70 | MYOB from $14/mo | Tools list | **CORRECTED** to "Lite $315 a year", MYOB |
| 71 | HubSpot free tier | Tools list | **KEPT**, HubSpot |
| 72 | Calendly free or $12 AUD/mo | Tools list | Free **KEPT**. $12 **CORRECTED** to $10 USD a seat, Calendly |
| 73 | ServiceM8 $29/mo | Tools list | **KEPT**, ServiceM8, AUD |
| 74 | Square free, fees apply | Tools list | **KEPT**, Square |
| 75-82 | Approaches table: 5-10 h, $0-200/mo, 2-3 h, $500-2,000, 3-5 h, $2,000-10,000+, weeks, $60,000-90,000 salary | Approaches table | CUT. The table stays with words only |
| 83 | Hit a wall at around 5-7 automations | After the table | Reworded with no number |
| 84-88 | First 1-2 h, second 30-45 min, then 20-30 min each; coverage in 3-6 months; top 5-7 | How long section | CUT. Reworded: the first takes longest because you're learning the tool, then each gets quicker |
| 89 | 3-4 automations | How long section | Reworded with no number |
| 90 | First two automations inside a fortnight | H2 8 bold opener | CUT |
| 91 | It takes 10 minutes (audit) | Next steps 3 | CUT |
| 92-93 | $50-200/month, $500-2,000 upfront, 2-3 automations | FAQ 1 | CUT. The answer now points at the sourced vendor prices: free tiers, and paid plans from $9 to $29.99 USD a month |
| 94-95 | 2-3 hours, 8-10 hours, the first month | FAQ 3 | CUT |
| 96-99 | 4-6 weeks, 10-15 hours, top 5, $4,000-6,000 a month | FAQ 4 | CUT |
| 100 | 5-10 minutes to fix | FAQ 5 | CUT |
| 101 | "Real examples from trades, retail, and professional services" (no figure, but no longer true) | Meta description | CHANGED (ops, 3 Oct). Now: "Worked patterns for trades, retail, and professional services." The title and canonical are unchanged |

Em dashes: 24 in the original, 0 now, including in the `faqs:` front matter. The FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The schema type, the questions and their order are unchanged.

## Blocks added

| Block | Where | What it holds |
|---|---|---|
| Fill | Which to automate first | "Automate in this order", the five-item hierarchy, First to Fifth |
| Weight (pair) | What it looks like in practice | "Manual: a new job, start to finish" / "Automated: the same job". The HVAC process with no client and no numbers. It reads as a contrast |
| Fill | How to automate without an expert | "Build your first automation", the five "**Step N:**" paragraphs as five steps |
| Worked | Hidden cost of not automating | "What MYOB's lost day adds up to in a year": 7 hours x 48 weeks = 336 hours. MYOB 2022 plus Fair Work. The build checks it |
| Rail (kept) | Tools table and approaches table | Prices corrected and linked in the first, numbers cut from the second |

One Worked block only. The 336 hours is the one sum that changes the reader's decision, and both of its inputs are sourced.

## Word count

Body, from the H1 to the Sources list, without the FAQ, with link URLs removed:

- Before: 3,175
- After: 2,851 (down 324, or 10%). The format-pass survey script counts 3,176 to 2,891 on its own rules.

## Checks

- **`next build`** (run directly, no IndexNow postbuild): passes. The Worked sum, 7 x 48 = 336, passes the workings check.
- **`scripts/check-format-pass.mjs`** (from `content/format-pass-batch-1`, run without committing it here): it fails on purpose for a rewrite: words -9.0%, new numbers, headings, front matter and Quick Answer changed. The checks that apply to the rewrite lane pass: no em dash, no flagged figure in a Worked block, one H1. Its "new numbers" are exactly the source years (2021-22, 2022), the sample (1,531), the Worked figures (48, 52, 336) and the corrected prices (78, 315). Every one is in the figure table.
- **`scripts/check-quick-answers.mjs`**: 71 of 71 pass. The new answer has no numbers.
- **Headings:** H1 and H2s unchanged. The three H3s that named invented clients changed: "Example 1: HVAC business in Brunswick (Melbourne)" became "Pattern 1: a trade business, from enquiry to paid invoice", and the same for 2 and 3.
- **Head against production:** title, canonical and every JSON-LD block are identical to undercurrentautomations.com, apart from the FAQ answer text. The meta description changed on purpose (figure 101).
- **`next start`, at 390 and 1440, in Chromium and WebKit** (CSP stripped for WebKit): no sideways scroll. Both Fill blocks, the Worked block and the contrast pair render. The two tables break out of the text column the same way they do on production. The rotating photo sits before "What are the common mistakes to avoid?", one H2 later than on production, because the body is shorter.

## Reads thin (for Luke)

1. **The "in practice" section has no real result.** The three builds are patterns now. The approved list has nothing in trades or retail. The health business invoice generator (about 10 hours a week, "stated by Luke") would fit, but it has no clickable source.
2. **The FAQ "How long does it take to see ROI" no longer gives a time.** It says how to work it out.
3. **The meta description no longer says "Real examples".** Ops approved the change on 3 Oct. It now says "Worked patterns".
4. **The 336 hours is a new total.** Ops kept it on 3 Oct, because it's arithmetic on two sourced inputs.

## Update, 3 Oct: link phrase

The link to `hidden-cost-manual-trade-business-australia` said "For a dollar-side breakdown by trade". That article (PR #46) no longer has a breakdown by trade. It now has a method and one worked example. The phrase now reads "To work out what manual admin costs a trade business in dollars". Ops asked for this change. No figure changed.
