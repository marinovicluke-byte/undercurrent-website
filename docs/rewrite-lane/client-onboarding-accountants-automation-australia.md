---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: client-onboarding-accountants-automation-australia

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, article 4 of 5, under Luke's rule update of 10:50. A sourced figure from a primary source may be added. Examples are fine when they're framed as examples, never as client results.

## Verdict

**The two flagged figures go, and one is replaced by the study that actually says it.**

- "A 2024 Deloitte study ... 20+ hours per week" can't be found. The figure that does exist is from a [Progress Software survey](https://www.globenewswire.com/news-release/2026/07/30/3336122/0/en/Professional-Services-Firms-Lose-60K-a-Year-to-Inefficient-Client-Coordination-New-Progress-Software-Report-Finds.html) (30 Jul 2026): 355 professional services firms across 10 industries, accounting included, spend "nearly 20 hours a week collecting documents and signatures, following up with clients, clarifying requests and tracking tasks". It's global, not Australian, and it covers client coordination, not onboarding alone. The article now says exactly that.
- "40% faster time-to-revenue" has no source. **CUT.**

The "real example from a Melbourne accounting firm" and the "three real examples ... real setups we've built" aren't on the approved list. They come back as examples framed as examples, with no results claimed. The day-by-day timelines stay as an example ("Say a firm onboards a new client by email"), shaped as Fill.

**Two factual errors that aren't figures are also fixed:**

- **"Section 396 authority" and "Activity Statement Agent Authority" aren't Australian ATO forms.** The real step is [client-to-agent linking](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/client-to-agent-linking): the client nominates you in ATO online services, and the agent can't do it for them. So it can be prompted by automation but not automated. The TFN declaration is real, and the article correctly frames it as a form for a client's new employees.
- **`/process` 301-redirects to the homepage.** That link is removed. The words stay.

The tool prices were checked against each vendor's page on 3 Oct 2026:

- DocuSign Personal is AU$15 a month, which confirms the FAQ's "$15". It's now in the table with a link. It's out of the FAQ, because a FAQ answer can't carry a link.
- Xero Practice Manager is included free at Silver, Gold or Platinum partner level. Otherwise it's $163.90 a month including GST, for up to 10 users.
- Zapier, Make and n8n are as verified in article 2.
- Ignition's page shows no readable prices, and Karbon's currency couldn't be confirmed, so those two carry no number.

## Sources checked

| Source | How | Result |
|---|---|---|
| "2024 Deloitte study on professional services efficiency" | Searched | Not found. **CUT** |
| [Progress Software survey, 30 Jul 2026](https://www.globenewswire.com/news-release/2026/07/30/3336122/0/en/Professional-Services-Firms-Lose-60K-a-Year-to-Inefficient-Client-Coordination-New-Progress-Software-Report-Finds.html) | Release read | "nearly 20 hours a week collecting documents and signatures, following up with clients, clarifying requests and tracking tasks". 355 firms, 10 industries incl. accounting, a "global survey" with no countries named, USD. **ADDED** in place of Deloitte, with that scope stated |
| [ATO, client-to-agent linking](https://www.ato.gov.au/tax-and-super-professionals/for-tax-professionals/client-to-agent-linking) | Page fetched, and the ATO checklist via search | Entities with an ABN (other than sole traders, who have their own process) nominate their registered agent in Online services for business. "A client must nominate their agent. The agent can assist ... but cannot complete the nomination process for them." **ADDED**. Replaces the two invented form names |
| [ATO, TFN declaration](https://www.ato.gov.au/forms-and-instructions/tfn-declaration) | URL 200 | A form a payee gives a payer. Kept, as "for new employees if you run their payroll" |
| [DocuSign AU pricing](https://ecom.docusign.com/en-AU/plans-and-pricing/esignature) | Page read | Personal AU$15/mo (5 envelopes a month), Standard AU$37/mo per user. **KEPT** $15 |
| [Xero Practice Manager](https://www.xero.com/au/features-and-tools/practice-tools/practicemanager/) | Page read | "included free for practices at Silver, Gold or Platinum level". "$163.90 per month for up to 10 users (including GST)". **CORRECTED** from "$100-$150" |
| [Zapier](https://zapier.com/pricing), [Make](https://www.make.com/en/pricing), [n8n](https://n8n.io/pricing/) | As in article 2 | Free tiers or self-hosted, Make from US$9. **CORRECTED** from "$0-$50 AUD" |
| [Ignition](https://www.ignitionapp.com/pricing), [Karbon](https://karbonhq.com/pricing/) | Pages read | Ignition shows no readable price. Karbon shows $59 per user a month annual, but the currency couldn't be confirmed. **No number given** |
| Vault wikis | grep Deloitte, onboarding, client-to-agent | Nothing |

## Figure table

| # | Figure | Sentence (where) | Source or CUT |
|--:|---|---|---|
| 1 | Cut 20+ hours of manual admin per week | Meta description | **CHANGED** on the article 1 precedent (the meta carries a cut figure). Now: "Automate client onboarding for your accounting firm: engagement letters, agent nomination, document collection and practice records. A guide for Australian accountants." The title and canonical are unchanged |
| 2 | 20+ hours a week | Quick Answer | CUT. Flagged 2 Oct |
| 3 | 40% faster | Quick Answer | CUT. Flagged 2 Oct |
| 4 | "Drop to near zero" | Quick Answer | Reworded. A claim with no source |
| 5 | An entire work week every month | Intro | CUT |
| 6 | Five follow-up emails | Intro | Reworded with no number |
| 7 | Firms in Melbourne, Sydney, Brisbane cut onboarding time in half | Intro | CUT. An unlisted result |
| 8-9 | Deloitte 2024, 20+ hours a week; "three and a half days" | H2 1 | **REPLACED** by Progress Software's "nearly 20 hours a week" with its real scope (global, client coordination). "Three and a half days" is CUT. It was also wrong: 20 hours isn't 3.5 days |
| 10-18 | Manual timeline, Day 1 to Day 16; 16 days | H2 2 | **KEPT as an example**, framed "Say a firm onboards a new small business client by email". The days are the example's own. Shaped as Fill |
| 19-23 | Automated timeline, Day 1, 2, 4, 5; 5 days; about 10 minutes | H2 2 | **KEPT as an example**, same framing. Fill |
| 24 | 40% faster time-to-revenue | H2 2 | CUT. Flagged 2 Oct |
| 25 | Sign online in two minutes | H3 1 | Reworded with no number |
| 26 | Cuts 3-5 days | H3 1 | CUT. Reworded: "takes days out" |
| 27 | "IMG_2847.jpg" | H3 2 | Kept. It's a sample file name, not a statistic |
| 28-30 | Section 396 authority; Activity Statement Agent Authority | H3 3 | **CORRECTED** to ATO client-to-agent linking (agent nomination), linked. Not figures, but false claims |
| 31 | One trigger, three actions | H3 4 | Kept. It describes the build |
| 32 | "A real example from a Melbourne accounting firm" | H2 4 | **REFRAMED** as "a workflow like this can run, as an example". One Fill |
| 33-34 | 2-3 days, 10 minutes | H2 4 | CUT |
| 35 | 16-day manual process | H2 4 | Kept as a reference back to the example |
| 36-37 | $50K custom build; $100-$300 a month | H2 5 | CUT |
| 38-45 | Table: DocuSign $15-$50; portal $50-$150; workflow $0-$50; XPM $100-$150 | H2 5 table | **CORRECTED** to vendor pages: DocuSign Personal AU$15/mo; workflow free tiers, paid from US$9/mo; XPM included at Silver, Gold or Platinum, otherwise $163.90/mo incl. GST. Portal: no number (not verifiable) |
| 46 | Total $165-$400 a month | H2 5 | CUT |
| 47 | 20+ hours (Deloitte) | H2 5 | CUT |
| 48-53 | ROI: $200/h x 20 h = $4,000/week; half = $2,000/week = $8,000/month; pays for itself in 3 days | H2 5 | CUT. Replaced by a **Worked example with every input stated as the example's assumption**: 4 new clients a month x 3 admin hours each x a $200 charge-out rate = $2,400 a month. (The old "$2,000/week = $8,000/month" was also loose: 4 weeks, not 4.33) |
| 54-59 | Options: 2-4 weeks, $0-$500; 1 day, $150-$300/mo; 1-2 weeks, $2,000-$8,000 | H2 6 | CUT. The three options stay without numbers |
| 60 | "Most firms pick Option 3"; "billing by week 2" | H2 6 | CUT. An unsourced claim |
| 61 | "Desktop in 2019" | H2 7 | Kept. A turn of phrase, not a statistic |
| 62-72 | Melbourne bookkeeper 12 days, 4-5 h, 3 days, 20 min, 4+ h, 8 clients, 32 h; Sydney tax agent 2 h, June-October, 200+ h; Brisbane advisory 6-8 emails, 45 min | H2 8 | CUT. "Real setups we've built" isn't on the approved list. The three are **REFRAMED** as "Say a bookkeeping firm ..." examples with no results |
| 73-75 | FAQ 1: 1-2 days, 1-2 weeks, first week | FAQ | CUT. Reworded with no numbers |
| 76 | FAQ 4: three days to respond | FAQ | Reworded, "days" |
| 77 | FAQ 5: "near zero" | FAQ | Reworded |
| 78-79 | FAQ 6: 10 hours = half your workweek; DocuSign $15/month | FAQ | 10 hours CUT (it's also not half of a working week). $15 is out of the FAQ, because a front-matter answer can't carry a link. It lives in the linked table |
| 80 | FAQ 6 answer | FAQ | **BUG FIXED:** the closing call to action ("--- Ready to stop chasing signed PDFs ...") had been swallowed into the FAQ answer by the FAQ migration, so it showed in the FAQ and in the FAQPage schema. Removed from the answer. It still closes the body |

Other fixes:

- **Em dash leftovers.** Ten places where an em dash had been replaced by a bare comma ("work,like", "impersonal,it") now read as proper sentences.
- **FAQ answers.** They render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions and their order are unchanged.

## Blocks added

| Block | Where | What it holds |
|---|---|---|
| Fill | How much time without automation | "A manual onboarding, day by day (an example)", Day 1 to Day 16. The survey's own example |
| Fill | Same section | "The same onboarding, automated (an example)", Day 1 to Day 5 |
| Weight (pair) x 4 | The four "automate first" H3s | "Manual process" / "Automated process" for engagement letters, document collection, ATO forms, and CRM and practice records |
| Fill | What a workflow looks like | "An onboarding workflow in n8n and Xero Practice Manager (an example)", six steps |
| Worked | What it costs | "Say a firm onboards 4 clients a month (an example)": 4 x 3 hours x $200 = $2,400 a month, with every input labelled as the example's assumption |
| Rail (kept) | Cost table | Prices corrected and linked |

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before: 2,972
- After: see Checks

## Reads thin (for Luke)

1. **No Australian figure for onboarding time.** The only sourced hours figure is Progress Software's global "nearly 20 hours a week", which covers client coordination generally. The article says so plainly.
2. **The three practice examples are examples now, not case studies.** If UC has a real accounting build, it needs to go on the approved list first.
3. **Ignition and Karbon have no price.** Their pages didn't give a readable, confirmed AUD price.
