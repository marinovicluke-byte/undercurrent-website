---
ai-assisted: true
source: claude-code
date: 2026-10-02
---

# UC drip: 12 articles scheduled, two a week

**Result: built, checked and waiting on one merge.** PR #39 holds the date gate and all 12 articles, and it built green on the Vercel preview. The merge into `main` (which deploys production) was refused by the auto-mode permission check, so production and the live checks have not happened. Luke merges #39. Nothing else is needed for the schedule to run.

## 1. The date gate

| Where a reader or crawler finds articles | Before | Now |
|---|---|---|
| `/blog`, its category sections and the Recent block | Static, built once at deploy | Filters out future dates, ISR every hour |
| Read next on every article | Built from every article | Built from live articles only |
| `/feed.xml`, `/llms.txt` | Already rendered per request | Filter out future dates |
| `/sitemap.xml` | `app/sitemap.js` metadata route, frozen at deploy | `app/sitemap.xml/route.js`, rendered per request, cached 1 hour at the CDN |
| IndexNow (postbuild) | Read the prerendered sitemap file | Reads the same builder as the sitemap (`lib/sitemap.js`) |
| Category pages | `/blog/cluster/*` already redirects to `/blog` | Covered by `/blog` |

"Today" is Melbourne's date (`Intl` with `Australia/Melbourne`, so Daylight Saving is handled; it started 4 Oct). An article joins `/blog` within an hour of midnight on its date, and the sitemap, feed and llms.txt pick it up on the next request after midnight. I copied IH's sitemap fix, not its first attempt. On Next 16 + Vercel, both the metadata route and an ISR route handler froze at the deploy snapshot. The new sitemap's XML is byte-identical to the old one's.

A scheduled URL resolves directly before its date: 200, index,follow, self-canonical. This matches IH. Nothing links to one: no live page, no list, no feed. The only links into the 12 come from two later scheduled articles, and each one's target goes live first.

Tests: `npm test` (node's built-in runner, 4 passing). They cover midnight on both sides of Daylight Saving, quoted and unquoted dates, each scheduled article joining the list on its own date and not the day before, and the sitemap naming none of them.

## 2. Schedule (Mondays and Thursdays)

I picked Monday and Thursday because they keep IH's 3-day and 4-day rhythm and never land on IH's Wednesday or Sunday. Monday is also the day an owner plans the week. The first slot, Mon 5 Oct, is three days from today.

| Date | Day | Slug | Hero (luke-2026 frame) | Category |
|---|---|---|---|---|
| 5 Oct | Mon | claude-vs-chatgpt-for-small-business | over-shoulder-typing-portrait | AI Strategy & Training |
| 8 Oct | Thu | is-chatgpt-safe-for-business | steel-desk-laptop-wide | AI Strategy & Training |
| 12 Oct | Mon | ai-in-australia-small-business-2026 | at-desk-hands-clasped-smiling | AI Strategy & Training |
| 15 Oct | Thu | best-ai-model-for-small-business | hands-on-laptop-website | AI Strategy & Training |
| 19 Oct | Mon | claude-opus-vs-sonnet | over-shoulder-search-console | AI Strategy & Training |
| 22 Oct | Thu | ai-policy-for-small-business | at-desk-arms-folded | AI Strategy & Training |
| 26 Oct | Mon | ai-laws-australia-small-business | sling-chair-thinking | AI Strategy & Training |
| 29 Oct | Thu | copilot-vs-chatgpt-small-business | over-shoulder-typing-website | AI Strategy & Training |
| 2 Nov | Mon | ai-for-accountants-australia | seated-leaning-forward | AI Automation |
| 5 Nov | Thu | crm-for-small-business-buy-or-build | over-shoulder-laptop-photo-grid | AI Automation |
| 9 Nov | Mon | kpi-dashboard-for-small-business | hands-on-laptop-analytics | AI Automation |
| 12 Nov | Thu | custom-software-vs-off-the-shelf | walking-laptop-under-arm | AI Automation |

How I picked the heroes:

- **No repeats and no look-alikes.** No two of the 12 share a hero, and no hero matches or looks like one of the six rewrites' heroes. That rules out the on-phone, lounge-chair, laptop-on-lap, steel-desk-typing and hand-on-chin frames, along with their look-alikes.
- **Author card.** The steel-desk arms-folded set is the author card photo, so none of it is used.
- **Neighbours.** Posts next to each other in the schedule never share a look-alike set.
- **Fit.** Where I could, the photo suits the article: the Search Console report goes on the reporting article and the analytics chart on the KPI dashboard.
- **Hero picks.** Seven of the 12 are hero picks. After the exclusions above, the other five came from the plain at-desk, sling-chair, seated and walking frames.
- **Crops.** I checked every crop by eye at 390 and 1440.

## 3. Category mapping

The site has no `ai_for_small_business`. It files articles by `cluster`, through `lib/categories.js`.

| Writer cluster | Site cluster | Category | Articles |
|---|---|---|---|
| `ai_for_small_business` (front-matter said `foundations`) | `ai-strategy-training` | AI Strategy & Training | the eight authority pieces, 1 to 8 |
| `ai_implementation` / `custom-integrations` | `custom-integrations` (unchanged) | AI Automation | the four build how-tos, 9 to 12 |

`foundations` would have filed the authority pieces under AI Automation. They're about choosing tools, policy, law and adoption, which is the Strategy & Training shelf, the same move today's Claude guide rewrite made.

## 4. Wording changes, and why

- **Workings blocks (11 articles).** Each sum that backs a claim is now a workings block the build checks. I took the arithmetic sentence out ("That's 8 × 4 × 230 working days, or...") and put its figures in the block under a short label, like "Client records sent to a free chatbot (an example)". Every figure is the writer's own, and none changed. The article and the sum:
  - #1: 87 h × $90
  - #2: 75 × 52
  - #3: 5 × $80 × 52
  - #4: 4 × A$64 × 12
  - #5: the Sonnet and Opus month, then US$504 a year
  - #6: 20 × 5 × 48
  - #7: 8 × 4 × 230
  - #8: 5 × A$54.91 × 12
  - #9: 120 h × $90
  - #10: $800 × 12 × 3
  - #11: $3,571 × 6
  - #12: three-year buy and build, then 5 × $45 × 52

  #10's three-year table stays a table. I checked its sums by hand and they hold.
- **#8, closing line.** "builds workflows ... on the model that suits each job" became "builds workflows on Claude ...". The #4 revision had already made the same change to fit your stated position.
- **#8, H1.** The body's H1 was "Pick the Right One for Microsoft 365", but the title is "Which to Pick If You're on Microsoft 365". The page prints the title, so I set the H1 to match it.
- **FAQ format.** The FAQ questions changed from `###` headings to bold lines, the shape the six rewrites use. The front-matter FAQs come from the body, using the repo's own script.
- **Two up-links on existing words.** In #7, "a tool list with a data rule" now links to the AI policy article (#6). In #12, "a CRM" now links to the CRM article (#10). Both targets go live first. All other internal links already pointed at live pages, and none redirects.
- **Quick Answer, steps and tables.** The drafts already had the new Quick Answer shape, their step lists and their tables, so these needed no edits.

## 5. Checks

**Done locally and on the preview:**

- The `next build` passes, so every workings sum checks out.
- `next start`: none of the 12 appears in `/blog`, `/sitemap.xml`, `/feed.xml` or `/llms.txt`. Each lists exactly the 68 existing articles. All 12 return 200 with one H1.
- I grepped every prerendered file. None of the 12 appears anywhere except its own page and the two up-links between scheduled articles.
- Chromium at 390 and 1440 passes 24 of 24: one H1, the Quick Answer, hero and end photo loaded, the blocks, the FAQ and no sideways scroll.
- All 68 existing articles render identical markup. For 65 the HTML is byte-identical apart from the build id. The other 3 differ only in the order of RSC chunks, and two builds of the same commit show the same kind of difference. No existing markdown file changed.
- The PR's Vercel preview built green.

**Not done: the live checks on undercurrentautomations.com.** They need the merge. I hashed the `<main>` of all 68 live articles before the merge, so the after-check is a straight comparison.

## 6. The watcher

The watcher lives at `Builds/Products/Website/drip-watch/`, beside the site repo, the same way IH's sits beside its own repo. It has three files: `schedule.json` (date and slug), `drip_check.py` and the plist.

Each day at 09:05 it checks every due post:

1. The page returns 200.
2. The post is in the sitemap.
3. The post is on `/blog`.

When all three hold, it pings IndexNow for that one URL (the deploy-time ping couldn't name it), sends a Telegram message and ticks the post's Twenty task if it has one. If a post still isn't visible the day after its date, it sends one alert.

How it was tested:

- **Dry runs.** With today's date, nothing is due. Pretending it's 5 Oct, it reports "not visible yet". Pretending it's 6 Oct, it sends a MISSED alert, which is correct, because nothing is merged. With a test schedule naming a live article, it takes the live path.
- **launchd.** The job is installed and loaded. A `kickstart` ran it and it exited 0.

**If #39 isn't merged by Tue 6 Oct, you'll get a MISSED alert on Telegram, which is the reminder working as designed.**

**Twenty:** I didn't create tasks. Twenty has no UnderCurrent project, and every existing article task belongs to IH's client retainer, so a task needs a home you choose first. To add them later, create 12 tasks named "Article — <title>", each due on its date, and paste their ids into `twenty_task_id`. The watcher then ticks each one when its post goes live.

## 7. Merge and rollback

- **Merge (Luke):** `gh pr merge 39 --merge`, from the repo. That deploys production through Vercel. PR #38 (Quick Answers) touches none of #39's files, so the order doesn't matter. The `lab-notes.md` entry sits mid-file, away from where #38 appends.
- **Rollback:**
  - `git revert -m 1 <merge sha>`, then push.
  - Or, instantly: `vercel promote https://undercurrent-website-h2yqi6wmr-marinovicluke-bytes-projects.vercel.app`, the production deploy before the merge.
  - Stop the watcher with `launchctl bootout gui/$(id -u)/com.undercurrent.uc-drip-watch`.

## 8. For Luke

- **Claims to confirm before they go live (from the writers' notes):**
  - #5 (19 Oct): "We run our own inbox sorting workflow on Sonnet. A smaller model misread too many emails." The #4 writer removed the same smaller-model claim as invented, but it's still in #5. Also in #5: "the August monthly report was written 5 September with nobody touching it".
  - #6: the six-rule policy is what UC gives clients.
  - #7: "In the audits we've run, it's the first gap we look for."
  - #9: "We run our own weekly reports this way."
  - #10 and #12: the wording "our own support work" and "our founder's own support work" for the invoicing app.
  - #11: naming ServiceM8.
  - #2 and #6: the Melbourne property advisory audit story.
- **Founder story clash.** #1, #8 and #9 tell the founder's three-hour story, but the config says founder stories are background only.
- **Recheck before their dates:**
  - The Copilot A$26.91 promo price (#4 on 15 Oct, #8 on 29 Oct). The promo runs to 31 Dec.
  - The US$ model prices in #5.
  - The status of the OAIC automated-decision guidance in #7 (26 Oct).
- **Consultant-style price gaps:** I couldn't read the consultant rewrite's notes this session (the permission check blocked it), so I can't tell you which gaps those are. None of the 12 states a UC price.
- **Read next.** On the eight Strategy articles, Read next leads with `ai-tools-for-dog-grooming-business`, the newest live article in that category. That's the site's existing rule, not something I changed. It will improve as the drip goes live and the pages are rebuilt.
