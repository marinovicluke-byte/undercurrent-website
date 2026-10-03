---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Rewrite lane: what-social-media-scheduling-tools-work-australia-2026

Brief: `Vault/Projects/ops/briefs/2026-10-03-uc-rewrite-lane.md`, Lane 2, article 9, under Luke's 10:50 rule update and the 11:50 dates rule. **Branched off `content/format-pass-batch-4` (PR #52, still open).** This PR's base is that branch, so its diff shows only this article. Batch 4's two titled lists stand.

Vendor facts were read on the vendors' own pages on 3 Oct 2026. Some help centres return 403 to a fetch. Where a fact rests on the vendor's search snippet alone, it isn't used.

## Figure table

| # | Figure or claim | Where | Source or CUT |
|--:|---|---|---|
| 1 | "All eight ... comply with Privacy Act 1988 requirements, accept AUD payments, ... TikTok without geo-restrictions" | Opening bold | **CORRECTED.** No vendor shows AUD. Later says "Prices are billed in USD", Metricool shows EUR and USD, Sendible shows USD, GBP and EUR. Privacy compliance and TikTok on all eight are unverified, so those claims are cut |
| 2 | $19 to $399 AUD a month | Quick Answer | **CORRECTED**: free plans (Buffer, Metricool) up to Sprout Social's US$399 per seat a month, linked in the body |
| 3 | "All take AUD, meet Australian privacy law" | Quick Answer bullet | **CORRECTED**: none lists AUD, so check the unit you pay by |
| 4-8 | Sarah: 8 staff, 6 hours every Monday; Jake: weeks, 5 times a day; Lisa daily | Intro | **REFRAMED** as three examples, not clients |
| 9 | "This guide tests 8 platforms" | Intro | Reworded to "compares". Nothing was tested |
| 10 | OAIC: 67% of SMEs don't understand their obligations | H2 1 | CUT. No such OAIC figure was found |
| 11 | "Your scheduling platform is a data processor under Australian law" | H2 1 | CUT. "Processor" is a GDPR term, and the Privacy Act doesn't use it |
| 12 | (added) Privacy Act threshold: turnover of $3 million | H2 1, Privacy | **ADDED, linked** to [OAIC, small business](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/organisations/small-business): "A small business is one with an annual turnover of $3 million or less", with exceptions such as health service providers |
| 13-36 | Table: AUD prices, team members, post limits, analytics depth, AU support hours, for 8 tools | H2 2 table | **REPLACED.** The new table has the free plan, the cheapest paid plan and the unit priced, from each vendor's pricing page, in the vendor's currency. Support hours, post limits and analytics depth are cut, because none of them was sourced |
| 37 | "Pricing current as of January 2026" | Under table | **CORRECTED** to "read on each vendor's pricing page on 3 Oct 2026" |
| 38 | "3 profiles" (a page, an account and a profile) | Under table | Kept. It's counting, not a claim |
| 39-41 | Jake: March 2025, 90 minutes, followers +34% in 6 months | H2 3 | **REFRAMED** as an example. The 90 minutes is the example's assumption. +34% is CUT |
| 42-43 | Buffer $19 AUD, 3 profiles, 100 posts; no Stories in Buffer | H2 3 | **CORRECTED** per [Buffer pricing](https://buffer.com/pricing): free plan with 3 channels and 10 scheduled posts per channel. Essentials is US$5 a month per channel. Per [Buffer's help](https://support.buffer.com/article/657-scheduling-instagram-posts-and-reels), it auto-publishes to Instagram professional accounts, and some features fall back to a notification |
| 44 | Later $29 AUD, 1 social set, 60 posts | H2 3 | **CORRECTED** per [Later pricing](https://later.com/pricing/): Starter US$18.75 a month billed yearly, 1 social set (8 profiles), 30 posts per profile |
| 45 | Metricool free: 1 user, 50 posts, 3 profiles | H2 3 | **CORRECTED** per [Metricool pricing](https://metricool.com/pricing/): 1 brand, 20 posts a month |
| 46 | "2-3 times weekly" | H2 3 | Kept. An example's posting rhythm |
| 47 | MYOB 2025: 58% of sole traders under 2 hours a week | H2 3 | CUT. No MYOB source was found |
| 48-50 | Sarah's agency: late 2024, 8 logins, 12 clients, 47 profiles, 10 minutes vs 2 hours | H2 4 | **REFRAMED** as an example with no result. The report-time saving is CUT |
| 51-52 | Hootsuite Team $149 AUD (20 profiles, 3 users); Business $599 AUD (35 profiles) | H2 4 | **CORRECTED** to what [Hootsuite's plans page](https://www.hootsuite.com/plans) shows: Standard covers up to 10 social accounts and Professional is unlimited, priced per user. **The price itself is CUT**, because the page loads it by script and Hootsuite's own blog disagrees with third-party pages. The reader is sent to the live page |
| 53 | Automating client reporting saves 4-6 hours per client monthly | H2 4 | CUT. The link stays |
| 54 | Sendible $39 AUD, 1 user, 12 profiles; $399, 10 users | H2 4 | **CORRECTED**: Core is 1 workspace and 6 profiles, with unlimited users on every plan, per [Sendible pricing](https://www.sendible.com/pricing). The price is US$30 a month billed yearly, from [Sendible's own comparison page](https://www.sendible.com/hootsuite-alternative). White label is a paid add-on on Elite and Enterprise, so it isn't on Core |
| 55 | Planable $19 AUD, 50 posts | H2 4 | **CORRECTED** per [Planable pricing](https://planable.io/pricing/): the first 50 posts are free, then Basic is US$33 per workspace a month with unlimited users |
| 56 | HubSpot 2025: approval workflows +23% consistency | H2 4 | CUT. No such HubSpot report was found |
| 57 | 3 times weekly vs 10 times in a burst | H2 4 | Kept. An illustration, not a claim |
| 58 | Engagement rate formula (x 100) | H2 5 | Kept. A formula |
| 59-60 | Sensis 2025: 41% track, 18% change | H2 5 | CUT. The Sensis Business Index isn't a 2025 survey that could be found |
| 61 | "All eight tools are GDPR-compliant, which generally covers Privacy Act requirements" | H2 6 | **CORRECTED.** GDPR claims aren't the Australian test. The OAIC threshold (#12) now sits here |
| 62-64 | "ACCC's 2025 guidelines" for businesses using scheduling tools (three rules) | H2 6 | **CUT as attributed.** No ACCC guideline on scheduling tools exists on accc.gov.au. The three checks stay as UC's own advice, reworded |
| 65-66 | Data in US, EU or AU; Hootsuite, Sprout and Metricool offer AU residency | H2 6 | **CORRECTED** per each privacy page: Metricool stores data in the EU. Hootsuite, Later, SocialBee, Sprout Social, Planable and Sendible say the US. None offers Australian residency |
| 67 | OAIC 2024: 31% of small business breaches from shared logins | H2 6 | CUT. The advice to use proper access stays |
| 68-70 | Jake: Zapier GMB to Buffer, 15 minutes, 2-3 quote requests monthly | H2 7 | **REFRAMED** as an example idea with no result |
| 71 | ACCC 2024 warnings on undisclosed chatbots | H2 7 | CUT. Not found. The advice stays as a plain claim |
| 72-73 | Tom: 2025 chatbot, three complaints, one week | H2 7 | CUT. A persona presented as real |
| 74-75 | Deloitte 2025: 44% abandoned within 6 months | H2 8 | CUT |
| 76 | "Use it for 3 months" | H2 8 | Kept. An instruction |
| 77-80 | Lisa: Oct 2025, 3 a week for 90 days, 47 vs 12 interactions, 60 vs 15 minutes | H2 8 | **REFRAMED** as an example with no result. The reader compares their own numbers |
| 81 | "One agency owner we spoke to": 18 hours monthly | H2 8 | CUT. Not on the approved story list |
| 82-86 | Bottom-line prices: $19, $149+, $39+, $29, $0-$199, $299+ | H2 9 list | **CORRECTED** to the sourced prices above. Hootsuite has no price |
| 87 | "1 week ahead, 3-5 times weekly" | H2 9 list | Kept. Advice |
| 88 | $19/month vs $599/month | H2 9 | **CORRECTED** to Buffer's US$5 channel vs a per-seat plan |
| 89 | "Most service businesses find 8-12 hours weekly" | H2 9 | CUT |
| 90 | FAQ 1: Metricool free 1 user, 3 profiles, 50 posts; Buffer $19 AUD | FAQ | **CORRECTED** as #42 and #45 |
| 91 | FAQ 2: only Later and Metricool schedule Stories and Reels directly; "Instagram's API doesn't allow" | FAQ | **CORRECTED.** [Meta's Content Publishing docs](https://developers.facebook.com/docs/instagram-platform/content-publishing/) let professional accounts publish Stories and Reels. Stickers and links aren't supported, so those still need a phone notification. The body carries the link |
| 92 | FAQ 3: "authorised posting partners", "completely compliant" | FAQ | Reworded to "they publish through each network's own publishing API" |
| 93 | FAQ 4: 4 weeks ahead | FAQ | Kept. A rule of thumb |
| 94 | FAQ 6: BrightLocal 2025, 72% expect a reply within 24 hours | FAQ | CUT. See the checks below |

FAQ answers render from `faqs:` and feed the FAQPage JSON-LD, so they change with the visible FAQ. The questions are unchanged.

**FAQ 6 check:** No BrightLocal survey holds "72% within 24 hours", in the 2024 edition or the 2026 one. BrightLocal's own [learn page](https://www.brightlocal.com/learn/reviews-on-social-media/) credits a similar line to Sprout Social, which makes it secondhand, so it isn't used.

**Sources:** the article has no Sources list. Every source is linked in the text.

## Verdict

- **Four personas were presented as real customers, and none is any longer.**
  - Sarah's agency, Jake the electrician and Lisa the consultant return as labelled examples ("Say a...") with no results. Their followers +34%, 47 vs 12 interactions and "10 minutes instead of 2 hours" are cut.
  - Tom the plumber is cut.
  - "One agency owner we spoke to" (18 hours) is cut.
- **Eight unlinked statistics are cut:** OAIC 67%, MYOB 58%, HubSpot 23%, Sensis 41%/18%, OAIC 31%, Deloitte 44% and BrightLocal 72%. None could be found at the body named.
- **"The ACCC's 2025 guidelines" for scheduling tools don't exist,** and neither do the "2024 warnings" on chatbots. The three checks stay as UC's own advice.
- **The pricing table was wrong in kind, not just in amount.**
  - No vendor bills in AUD.
  - The tools price by different units: channel (Buffer), seat (Sprout, Hootsuite), workspace (Planable, Sendible), social set (Later) and brands (Metricool).
  - The table is rebuilt from the eight pricing pages, each linked, read 3 Oct 2026. Hootsuite's price isn't shown, because the page renders it in the browser and the sources disagree.
- **Two factual errors are fixed:**
  - "Instagram's API doesn't allow" auto-posting Stories. Meta's Content Publishing API supports Stories and Reels for professional accounts. Stickers and links are the exception.
  - "Your scheduling platform is a data processor under Australian law." That's GDPR language. The OAIC's $3 million threshold replaces it, linked.
- **Data residency:** none of the eight stores data in Australia. Metricool is in the EU and six say the US, each linked.

## Front matter

- **`dateModified`: "2026-09-30" (batch 4) became "2026-10-03"**, under the rewrite-lane date rule: the first byte of sha256(slug), `0x4b`, is odd, so 3 Oct. The published date is unchanged.
- **`summary`** (blog card text) said "AUD pricing, ACCC compliance notes, and real performance benchmarks". All three are now false, so it reads "each vendor's own pricing, Australian privacy notes, and a pick by business type". The brief's keep-list doesn't name `summary`.
- **The meta description is unchanged, as the brief says.** It still says "tested", "pricing in AUD" and "real performance data", and the H1 says "Tested". See "Reads thin".

## Blocks

| Block | Where | What it holds |
|---|---|---|
| Worked (new) | H2 3, Buffer | "What Buffer costs for three channels": US$5 x 3 = US$15 a month. US$5 is from Buffer's pricing page (linked in the sentence above). The 3 channels are the article's own count (a page, an account and a profile) |
| Titled list (batch 4) | H2 5 | "Reporting depth, platform by platform", unchanged |
| Titled list (batch 4) | H2 9 | "The pick, by business type", with the prices corrected |
| Rail (rebuilt) | H2 2 | The tool table: five columns, a vendor link per row |

No Fill: there's no step run. No Weight: there's no before/after pair that carries the decision.

## Word count

Body, from the H1 to the end of the last section before the FAQ, with link URLs removed:

- Before (on batch 4): 2,138
- After: 2,125 (down 13). The format-pass survey script counts 2,286 to 2,277 (-0.4%).

## Checks

- **`next build`** (run directly, no IndexNow postbuild): passes, including the Worked sum (5 x 3 = 15).
- **`scripts/check-format-pass.mjs --base origin/content/format-pass-batch-4`**: words -0.4%, no em dash added (the one em dash is batch 4's, in `heroImageAlt`), one H1, and the headings are identical to batch 4.
  - New numbers: 14 (14-day trials), 18.75, 30 and 33. All are sourced vendor figures.
  - It flags the front matter (the FAQs and `summary`), the Quick Answer (the price range) and the date (it wants 30 Sep). The rewrite-lane rule gives 3 Oct.
- **`scripts/check-quick-answers.mjs`**: 71 of 71 pass.
- **`next start`, at 390 and 1440, in Chromium and WebKit** (CSP and HSTS stripped for WebKit, which otherwise upgrades localhost to https and loads no CSS): 200, no sideways scroll, one H1, "Updated 3 Oct 2026". All three blocks render. The table scrolls inside its own frame at 390.

## Reads thin (for Luke)

1. **The meta description and H1 promise testing and "real performance data".** Nothing in the article was tested. Both are on the brief's keep-list, so they're unchanged. Changing them is Luke's call: "compared" for "tested", and "vendor pricing" for "pricing in AUD ... real performance data".
2. **No Hootsuite price.** Check https://www.hootsuite.com/plans in a browser and add it to the table and the bottom-line list if wanted.
3. **No evidence that scheduling pays off.** Every result was a persona's. No story on the approved list fits social scheduling.
4. **Prices date fast.** The table says "read on 3 Oct 2026". It's worth a recheck at the next touch.
