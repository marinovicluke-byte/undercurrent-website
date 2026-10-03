---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Format pass, batch 4: blocks for 10 older articles

Branch `content/format-pass-batch-4`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.** Luke squash-merges it.

The rule is unchanged: **keep the words, change the shape.** Titles, meta, canonicals, slugs, the published date and the Quick Answer are unchanged. The one new thing is Luke's rule from 3 Oct: every changed article gets a new updated date (see "Updated dates"). Pair titles stay neutral, and step timings use the ", **Day 1**" form.

## What changed, per article

| # | Article | Blocks added | Body words (main → branch) |
|--:|---|---|---|
| 1 | chatgpt-knowledge-cutoff-australia | 2 Fill, 3 lists | 2,264 → 2,281 (+0.8%) |
| 2 | best-marketing-automation-software-australia-2026 | 1 Fill, 2 lists, 1 Worked | 3,261 → 3,279 (+0.6%) |
| 3 | local-seo-services-australia | 5 lists | 3,110 → 3,106 (−0.1%) |
| 4 | google-ads-for-dog-grooming | 1 list, 1 Worked | 3,081 → 3,090 (+0.3%) |
| 5 | einvoicing-small-business-australia-guide | 4 Fill, 1 list | 2,947 → 2,952 (+0.2%) |
| 6 | ai-search-for-pet-grooming | 1 Fill | 2,621 → 2,630 (+0.3%) |
| 7 | ai-search-vs-traditional-search-australia-2026 | 2 Fill, 2 lists | 2,577 → 2,585 (+0.3%) |
| 8 | pet-grooming-website-design | 1 Fill | 2,548 → 2,557 (+0.4%) |
| 9 | how-to-choose-a-google-ads-agency-australia | 4 lists | 2,488 → 2,501 (+0.5%) |
| 10 | what-social-media-scheduling-tools-work-australia-2026 | 2 lists | 2,276 → 2,286 (+0.4%) |

The total is 11 Fill, 20 titled lists and 2 Worked blocks.

The details, article by article:

1. **ChatGPT knowledge cutoff.**
   - The "Worked example" timeline was a bold-labelled numbered list ("**Within hours.** ... **Within 12 months.**"). It becomes a Fill whose labels are the timings: "From the mention to the model".
   - The 12-month plan ("**Month 1.** ... **Months 9-12.**") becomes a timed Fill, "The 12 months, in order".
   - The retrieval-sprint and earned-media bullet lists get titles.
   - The audit's "First, Second, Third" becomes a titled list.
2. **Marketing automation software.**
   - "Here's the order that works for most Australian SMEs:" becomes the title of its numbered list (a Fill).
   - The five "**If you're ...:**" pain-point paragraphs become a titled list, "Match the tool to the pain point".
   - The five "**Xero integration:** ..." paragraphs become "Integration, system by system".
   - The DIY sum becomes Worked (see below).
   - Five body em dashes become a colon or a comma. The H3 headings keep theirs, because headings must not change. So do the frontmatter FAQ and its body copy, which have to match the FAQ schema.
3. **Local SEO services.** Five titled lists, each from a run that was already a list in the prose:
   - the four jobs
   - the audit's three findings
   - the four questions to ask before signing
   - the three traps (doorway pages, citation spam, thin service pages)
   - the five metrics

   The review "Volume / Velocity / Keywords" trio stays as prose, so the article doesn't turn into a run of lists.
4. **Google Ads for groomers.**
   - The three cases where ads make sense become a titled list.
   - The cost-per-booking sum becomes Worked (see below).
5. **eInvoicing guide.** Four numbered runs get titles:
   - "Here's the simple version of how it works".
   - The five setup steps were "**Step N: Title**" headings with paragraphs and sub-lists. They become one Fill, "Five steps to your first eInvoice", with the sub-lists and later paragraphs indented inside each step. Checked in the crop: the sub-bullets nest under their step. A step's second paragraph sits with no gap under its first. That is the block's CSS, not the markdown, and it reads fine, so it's left for a later styling pass.
   - The ATO requirements.
   - The finance automation stack.

   "Here's why you should do it anyway" becomes a titled list. Its "40% faster payment cycles" is a flagged figure. It's in a list, not a Worked block, and the check allows that.
6. **AI search for groomers.** The profile-then-site sequence (category, services and suburbs, an owned website, LocalBusiness schema) becomes a four-step Fill.
7. **AI search vs traditional search.**
   - "Day one: ... Day five: ..." becomes a timed Fill, "Your first week".
   - "Five moves ... One, answer first ... Five, track citations" becomes a Fill.
   - The five dead tactics become a titled list.
   - The audit's three things become a titled list.
8. **Grooming website design.** "Below the hero, in order: ..." becomes a five-step Fill, "The homepage, top to bottom".
9. **Google Ads agency.**
   - The six before-you-sign questions and the six bad-agency signs get titles.
   - The three monthly signals and the three audit findings become titled lists.
10. **Social scheduling tools.** The three reporting tiers and the four "**If you're ...:**" bottom-line picks become titled lists. See "For Luke" for why nothing else was emphasised.

## Every Worked block

The build checks each sum and fails if one doesn't add up. Both sums pass.

**2. Marketing automation: "What learning HubSpot yourself costs"**

| Line | Value | Where it comes from (main, `content/articles/best-marketing-automation-software-australia-2026.md`) |
|---|---|---|
| Hours spent learning the platform | 20 | Line 218: "spending 20 hours learning HubSpot" |
| Your billable rate | $100/hour | Line 218: "if you're billing $100+/hour" |
| = Opportunity cost | $2,000 | Line 218: "costs you $2,000 in opportunity cost". 20 × 100 = 2,000 |

This is the reader's own time at their own rate, not a statistic. It's the same kind of sum as batch 1's DIY block.

**4. Google Ads for groomers: "A $4 click that converts to a booking one time in ten"**

| Line | Value | Where it comes from (main, `content/articles/google-ads-for-dog-grooming.md`) |
|---|---|---|
| Cost per click | $4 | Line 125: "if a $4 click converts to a booking one time in ten" |
| Clicks per booking | 10 | Line 125, same sentence ("one time in ten") |
| = Cost per booking | $40 | Line 125: "that is $40 to win a $95 groom". 4 × 10 = 40 |

The article's broad-term contrast ("one time in fifty costs $200 a booking") stays in the sentence after the block. As a second Worked block it would have needed the digit 50, which isn't in the article, and the check forbids new numbers. The $95 ticket is sourced to WoofSpark.

**No flagged figure is in a Worked block.** eInvoicing's flagged figures ($2, 40%, 1-2 hours) stay in prose and lists.

## For Luke

These are figures to check. None of them is in a Worked block.

- **einvoicing-small-business-australia-guide, line 36:** "If you're sending 50 invoices a month, that's $600-$1,200 a year". That's 600 invoices a year at $0.80 to $2.00, which is $480 to $1,200. The low end is wrong. The $0.80 to $2.00 range is attributed to the ATO with no link, and "$2" is already on the 2 Oct flagged list.
- **what-social-media-scheduling-tools-work-australia-2026: a rewrite-lane candidate.**
  - It's built on personas presented as real customers: Sarah's agency, Jake the electrician (34% follower growth), Lisa the consultant (47 vs 12 interactions), and Tom the plumber.
  - It has stats with no link: OAIC 67%, MYOB 58%, HubSpot 23%, Sensis 41% / 18%, OAIC 31%, Deloitte 44%.
  - It has "ACCC 2025 guidelines" that require three things of businesses using scheduling tools.

  I gave none of these a block. Its formatting is two neutral lists.
- **best-marketing-automation-software-australia-2026:** from January 2026, with prices "as of" then. It also has unsourced claims ("Most businesses lose 20-30% of their leads"). It's worth a price refresh when it's next touched.

## Left as prose, and why

- **Bold-lead runs with several sentences per item** stay as paragraphs, which is batch 1's rule:
  - each tool's Cost / What it solves / Local integration / Where it falls short in the marketing automation article
  - the eInvoicing mistakes and fixes
- **Two-item contrasts and one-line sides** stay as prose: the AI vs traditional "Job one / Job two", and the website article's "First, Second" pair.
- **Lead-ins that hold a link** can't be a block title, so the knowledge-cutoff plan's lead-in stays a sentence and the block takes its own title. The social article's ACCC list is left unemphasised on purpose (see "For Luke").
- **Code fences kept:** the knowledge cutoff's llms.txt, the local SEO and AI vs traditional schema, and the groomer ads' negative keywords.

## Updated dates

Luke, 3 Oct: changed articles get a new updated date, mixed across 29 Sep to 3 Oct so they don't stack on one day. `scripts/set-updated-date.mjs` sets `dateModified` from a hash of the slug, so a rerun gives the same date. Published dates don't move. `scripts/check-format-pass.mjs` asserts each date. The Article JSON-LD `dateModified`, the visible "Updated" line and the sitemap lastmod move with it.

| Article | Updated |
|---|---|
| best-marketing-automation-software-australia-2026 | 2026-09-29 |
| what-social-media-scheduling-tools-work-australia-2026 | 2026-09-30 |
| chatgpt-knowledge-cutoff-australia | 2026-10-02 |
| einvoicing-small-business-australia-guide | 2026-10-02 |
| how-to-choose-a-google-ads-agency-australia | 2026-10-02 |
| local-seo-services-australia | 2026-10-02 |
| ai-search-for-pet-grooming | 2026-10-03 |
| ai-search-vs-traditional-search-australia-2026 | 2026-10-03 |
| google-ads-for-dog-grooming | 2026-10-03 |
| pet-grooming-website-design | 2026-10-03 |

## Checks

- **`scripts/check-format-pass.mjs`: all 10 changed articles pass.**
  - Body words moved by 0.8% at most.
  - There are no new numbers.
  - No em dash was added.
  - No flagged figure is in a Worked block.
  - There is one H1, and the headings, frontmatter (bar `dateModified`) and Quick Answer are unchanged.
  - Each updated date is the slug's day.
- **`next build` (run directly): passes** on the final article commit, including both Worked sums.
- **Browser, local `next start`, Chromium, reduced motion, 390 and 1440:**
  - All 20 loads return 200, with no sideways scroll.
  - Every block renders: its height is over 20px and it sits inside the viewport.
  - I looked at crops of the nested eInvoicing Fill.
- **Mid-body photo:** on all ten, it sits before the same H2 as production. Local SEO services has none, on production too.
- **Against production:** titles, meta descriptions, canonicals, the H1 count, the hero Quick Answer, and all six JSON-LD blocks except their `dateModified` are identical on all ten. `dateModified` reads the new date in the JSON-LD on every one.

## Rollback

The PR goes in as a squash merge, so main gets one commit. Roll back with `git revert <squash commit>` (no `-m 1`), merged through a PR. The revert deploys itself. The four scripts are byte-identical to PRs 44, 47 and 49, so the PRs merge in any order without a conflict.
