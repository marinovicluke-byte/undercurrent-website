---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# Format pass, batch 5: blocks for 10 older articles

Branch `content/format-pass-batch-5`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.** Luke squash-merges it.

The rule is the same: **keep the words, change the shape.** Titles, meta, canonicals, slugs, the published date and the Quick Answer are unchanged. Every changed article gets a new `dateModified` under Luke's 3 Oct rule (see "Updated dates"). Pair titles stay neutral, and step timings use the ", **Day 1**" form.

## What changed, per article

| # | Article | Blocks added | Body words (main → branch) |
|--:|---|---|---|
| 1 | seo-audit-self-check-australia | 2 lists | 2,013 → 2,021 (+0.4%) |
| 2 | seo-for-mortgage-brokers-australia | 1 Fill, 2 lists | 3,095 → 3,106 (+0.4%) |
| 3 | seo-for-tradies | 1 Fill, 2 lists | 3,039 → 3,045 (+0.2%) |
| 4 | how-to-measure-ai-search-visibility | 2 Fill, 1 list | 2,745 → 2,749 (+0.1%) |
| 5 | how-to-send-instant-follow-up-email-to-leads-automatically-australia | 3 Fill, 2 lists | 2,652 → 2,652 (0.0%) |
| 6 | google-business-profile-for-pet-grooming | **none** (see "Left as prose") | unchanged |
| 7 | google-business-profile-optimisation | 1 list | 2,460 → 2,460 (0.0%) |
| 8 | build-a-website-for-small-business | 1 Fill, 3 lists | 2,417 → 2,420 (+0.1%) |
| 9 | what-is-geo-generative-engine-optimisation-explained-australia | 2 lists | 2,401 → 2,401 (0.0%) |
| 10 | seo-for-dog-groomers | **none** (see "Left as prose") | unchanged |

The total is 8 Fill and 15 titled lists. There are no Worked blocks, and 8 of the 10 articles changed.

The details, article by article:

1. **SEO self-check.** The eight "**Check N, ...:**" paragraphs become two titled lists, "The first four checks" and "The last four checks", one per H2. They are bullet lists, not Fill, on purpose. A Fill numbers its own steps from 1, so the second half would show 1 to 4 beside "Check 5" to "Check 8". The "Check N" labels stay in the text.
2. **Mortgage brokers.**
   - The Business Profile setup (category, services, photos, posting) becomes a four-step Fill.
   - The three schema types (FAQPage, LocalBusiness, Article) become a titled list.
   - The audit's three findings become a titled list.
3. **SEO for tradies.**
   - The three search modes (emergency, research, near-me) become a titled list.
   - The profile setup becomes a four-step Fill.
   - The audit's "First, Second, Third" becomes a titled list.
4. **Measuring AI search visibility.**
   - The five metrics were a numbered list with no title. They get one, so they become a Fill.
   - "The rhythm: baseline now, ship the structural fixes this month, re-run ..., compare" becomes a four-step Fill.
   - The audit's three things become a titled list.
5. **Instant follow-up email.**
   - The HubSpot "**Step 1:** ... **Step 5:**" setup becomes a Fill.
   - "Good instant follow-up emails do three things" gets its title.
   - **A render bug is fixed.** The four "**Email N: ...**" timing lines had no blank lines between them, so on the live page they run together as one paragraph. They are now a timed Fill, from "Instant (0 minutes)" to "Day 7 (+168 hours)".
   - The four bold-numbered metrics and the four next automations become titled lists. "Cuts no-shows by 40%" is a flagged figure. It sits in a list, not a Worked block.
7. **GBP optimisation.** The audit's three things become a titled list. Everything else is long paragraphs and a table.
8. **Build a website.** The core pages, the five build steps (a Fill) and the six mistakes were lists with plain lead-ins, and they get titles. The audit's three surprises become a titled list.
9. **GEO explained.**
   - **A structure bug is fixed.** The "four levers" list was split in two by a JSON fence at column 0, so it rendered as two separate lists. The fence is now indented under item 2, "Schema markup", so the four levers are one titled list. At 390 the code box scrolls sideways inside itself (`overflow-x: auto`, the same as top-level code), and the page doesn't scroll.
   - The audit's three things become a titled list.

## Worked

**None this batch.** The sums here are band counts, timelines or ranges that describe rather than decide. The instant follow-up article's one real before-and-after (Jake's conversion rate, "22% to 38%") is a persona's result (see "For Luke").

## For Luke

These are figures to check. None of them is in a block.

- **how-to-send-instant-follow-up-email-to-leads-automatically-australia: a rewrite-lane candidate.**
  - It's the same persona set as the social scheduling article in batch 4: Jake the electrician ("lost 8 jobs", "22% to 38%", "16 extra jobs per month"), Sarah the agency owner, Tom the plumber ("revenue is up 30%"), and Lisa the consultant ("3x more booked calls").
  - It has unlinked "Harvard Business Review", "2024 MYOB survey" and "Mailchimp send time data" figures.
  - Its 30% and 40% are on the 2 Oct flagged list.
- **seo-audit-self-check-australia:** the Coburg landscaping "page 3 to page 1 within two months" is an unnamed client result. "Per Statista's Australian mobile usage data, over 60%" has no link.

## Left as prose, and why

- **google-business-profile-for-pet-grooming: unchanged.** It's long paragraphs that each argue one point, plus a comparison table that's already Rail. The category, review and website sections read as prose, and none holds a sequence or a list.
- **seo-for-dog-groomers: unchanged.** The same shape. Its profile mistakes and its effort-against-impact plan are already tables.
- **Two-step or narrative passages** stay as prose: the GBP claim-and-verify walkthrough, the tradies "costliest mistakes" (which would need rewording into a list), the mortgage compliance "No ... No ..." lines, and the GEO measurement paragraphs.
- **Code fences kept:** the self-check's commented JSON-LD, and the schema blocks in articles 3, 7, 8 and 9.

## Updated dates

`scripts/set-updated-date.mjs` gives each changed article a `dateModified` picked from a hash of its slug, across 29 Sep to 3 Oct. Published dates don't move. The two unchanged articles keep their dates.

| Article | Updated |
|---|---|
| google-business-profile-optimisation | 2026-09-29 |
| how-to-send-instant-follow-up-email-to-leads-automatically-australia | 2026-09-29 |
| what-is-geo-generative-engine-optimisation-explained-australia | 2026-09-29 |
| seo-for-tradies | 2026-10-01 |
| build-a-website-for-small-business | 2026-10-02 |
| seo-for-mortgage-brokers-australia | 2026-10-02 |
| how-to-measure-ai-search-visibility | 2026-10-03 |
| seo-audit-self-check-australia | 2026-10-03 |

## Checks

- **`scripts/check-format-pass.mjs`: all 8 changed articles pass.**
  - Body words moved by 0.4% at most.
  - There are no new numbers.
  - No em dash was added.
  - No flagged figure is in a Worked block.
  - There is one H1, and the headings, frontmatter (bar `dateModified`) and Quick Answer are unchanged.
  - Each date is the slug's day.
- **`next build` (run directly): passes** on the final commit.
- **Browser, local `next start`, Chromium, reduced motion, 390 and 1440:**
  - All 16 loads return 200, with no sideways scroll.
  - Every block renders, and the DOM block count matches what was added on every article.
  - That count caught one miss: build-a-website's steps title had stayed on the end of the sentence before it, so its Fill didn't form. It was fixed in its own commit and rechecked after a fresh build.
- **Mid-body photo:** on all eight, it sits before the same H2 as production. Two have none, on production too.
- **Against production:** titles, meta descriptions, canonicals, the H1 count, the hero Quick Answer, and all six JSON-LD blocks except `dateModified` are identical on all eight.

## Rollback

The PR goes in as a squash merge, so main gets one commit. Roll back with `git revert <squash commit>` (no `-m 1`), merged through a PR. The revert deploys itself. The scripts are byte-identical to the other format-pass PRs.
