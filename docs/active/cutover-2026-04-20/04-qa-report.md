# QA Report — 2026-04-20 Vite → Next.js Cutover

Auditor: Claude Code (cold read, no prior session context)
Date: 2026-04-20
Working tree: `/Users/luke/UnderCurrent/Builds/Products/Website/undercurrent`
Production: `https://www.undercurrentautomations.com`

---

## Pass / Fail by Criterion

| # | Criterion | Result | Evidence |
|---|-----------|--------|----------|
| A | Routes live (200 on prod) | PASS | All 26 checked routes return 200. See detail below. |
| B | Redirects (single-hop 301) | FAIL | 2 issues: (1) `/resources/` chains via 2 hops. (2) `/case-study/<slug-with-suffix>` 308s to a 404 destination. All redirects emit 308 not 301 — see notes. |
| C | Sitemap 200, 46 URLs, correct content | PASS | 46 URLs confirmed. 18 articles, 4 cluster hubs, `/blog` index, 1 case study detail, `/case-studies` index, 12 service pages, location, static pages. `/front-end-experience` and `/surface-discovery` present. |
| D | Meta files render (robots, llms, feed) | PASS | All 3 return 200. robots.txt contains full AI bot allowlist and sitemap reference. llms.txt well-formed with all services. feed.xml is valid RSS. |
| E | Noindex orphans (/roi, /missed-revenue) | PASS | Both return 200, both contain `noindex` in rendered HTML, neither in sitemap.xml. |
| F | Vercel Framework Preset = Next.js | PASS | `vercel project inspect` shows: Framework Preset = Next.js, Output Directory = Next.js default. |
| G | Social URLs in Footer.js | PASS | 4 `SocialIcon` tags with real URLs: Instagram (`undercurrent.automations`), LinkedIn (`undercurrent-automations`), X (`UC_Automations`), Facebook (profile ID `61578553167947`). No `href="#"` placeholders. |
| H | Cross-links website-design ↔ front-end-experience, seo-ai-visibility ↔ surface-discovery | PASS | `/website-design` internalLinks includes `/front-end-experience`. `/front-end-experience` internalLinks includes `/website-design`. `/seo-ai-visibility` internalLinks includes `/surface-discovery`. `/surface-discovery` internalLinks includes `/seo-ai-visibility`. All 4 directions confirmed. |
| I | Legacy junk not in prod | PARTIAL FAIL | `.vercel/`, `.claude/`, `.vscode/`, `.superpowers/`, `*.bak`, `public/favicon-preview.html` all present in `.gitignore`. `/favicon-preview.html` returns 404 on prod (correct). However: `.superpowers/` (19 files) is tracked in git despite being in `.gitignore`. `CLAUDE.md.bak` exists in working tree but is NOT tracked. `docs/favicon-preview.html` IS tracked in git (different path to the gitignored `public/favicon-preview.html`). |
| J | Branch state: no-ff merge, redesign still on remote, lab-notes has cutover | PASS | Merge commit `1b8064b` has two parents (`2cb6400`, `71ab75b`) — confirmed `--no-ff`. `origin/redesign` exists. `origin/main:lab-notes.md` opens with a `## Cutover` section dated 2026-04-20. |
| K | .env leak: still tracked, not re-introduced since f15df88 | PASS (known outstanding) | `.env` confirmed in `git ls-files`. `git log -- .env` shows last commit touching it was `f15df88`. Not re-introduced post-cutover. Rotation + `git rm --cached` still required. |
| L | Build health: clean, ~60 static pages | PASS | `rm -rf .next && npm run build` compiles cleanly. `✓ Compiled successfully in 2.1s`, `✓ Generating static pages (62/62)`. Zero TypeScript or lint errors in output. 62 routes (static + SSG + dynamic). |
| M | blog-redesign-followups.md pre-cutover items addressed | PARTIAL FAIL | "Pre-cutover — footer SEO columns" marked DONE. Pipeline items 6 and 7 explicitly deferred as non-blocking. **Item 6 (pipeline `github_content_path`) still points to `src/content/articles` in SEO project config** — not updated post-cutover as the follow-up specifies it should be. |

---

### Route detail (Criterion A)

All routes checked via `curl --max-redirs 0`, following no redirects. All returned 200.

Core: `/`, `/blog`, `/services`, `/about`, `/contact`, `/process`, `/privacy`, `/terms`, `/audit`, `/case-studies`, `/ai-automation-melbourne`, `/front-end-experience`, `/surface-discovery`

Blog clusters: `/blog/cluster/time-admin`, `/blog/cluster/getting-started`, `/blog/cluster/leads-sales`, `/blog/cluster/industry-guides`

Case study: `/case-studies/ai-content-automation-small-business-australia`

Service pages (10 checked): `/customer-experience-automation`, `/sales-automation`, `/content-automation`, `/personal-system-automation`, `/finance-automation`, `/inbound-lead-management-melbourne`, `/website-design`, `/seo-ai-visibility`, `/ai-strategy-training`, `/custom-integrations`

---

## Critical Issues

1. **`/case-study/<slug-with-case-study-suffix>` → 404** — `next.config.mjs` redirect rule `'/case-study/:slug' → '/case-studies/:slug'` performs a literal slug pass-through. The legacy URL `/case-study/ai-content-automation-small-business-australia-case-study` redirects to `/case-studies/ai-content-automation-small-business-australia-case-study`, which does not exist (the actual page is at `/case-studies/ai-content-automation-small-business-australia`). Any external links or indexed URLs using the old `/case-study/{slug}-case-study` pattern now land on a 404. A dedicated redirect rule for the exact old URL is needed, mirroring the `/blog/ai-content-automation-small-business-australia-case-study` rule already in next.config.mjs.

---

## Major Issues

2. **`/resources/` (trailing slash) chains through 2 hops** — `curl -v` trace: `/resources/` → 308 → `/resources` → 308 → `/blog`. The redirect rule in `next.config.mjs` sources `/resources` (no slash), so Next.js first normalises the trailing slash to `/resources`, then fires the custom redirect to `/blog`. Googlebot counts each redirect hop against crawl budget; a 2-hop chain from a real legacy URL is a recoverable but real SEO issue. Fix: add a second rule `source: '/resources/'` → `destination: '/blog'` with `permanent: true`, or set `trailingSlash: false` at the config level.

3. **All redirects emit 308, not 301** — `permanent: true` in Next.js 15/16 redirects emits HTTP 308 (Permanent Redirect) rather than 301 (Moved Permanently). Browsers treat them identically for GET, but some crawlers (and older SEO audit tools) do not follow 308 chains the same way as 301. Google's own documentation still recommends 301/302 for SEO purposes. Fix: add `statusCode: 301` to each redirect object in `next.config.mjs`.

4. **Sitemap and robots.txt use bare domain (non-www), production canonical is www** — All sitemap `<loc>` entries and the `Sitemap:` directive in robots.txt reference `https://undercurrentautomations.com/...`. Vercel serves the site on `www.undercurrentautomations.com` with a 307 redirect from the apex. This creates a domain mismatch: Google Search Console will require the sitemap to be submitted under the property that matches the canonical domain. If the GSC property is registered as `www`, the sitemap URLs will not match. Fix: set `const BASE = 'https://www.undercurrentautomations.com'` in `app/sitemap.js` and update `app/robots.js` sitemap URL to match.

---

## Minor Issues

5. **`.superpowers/` directory tracked in git despite being in `.gitignore`** — 19 files under `.superpowers/brainstorm/` are listed by `git ls-files`. Like `.env`, they were committed before the gitignore rule was added, so the rule does not remove them from tracking. The directory contains HTML mockups and server state files — not secrets, but repo noise. Fix when convenient: `git rm -r --cached .superpowers/` and commit.

6. **`docs/favicon-preview.html` tracked in git** — The `.gitignore` rule covers `public/favicon-preview.html` but not `docs/favicon-preview.html`. This file is committed. It is not served on prod (Vercel does not expose `docs/`), so no user-visible impact. Cleanup: either add `docs/favicon-preview.html` to `.gitignore` and untrack it, or delete it if it has no ongoing value.

7. **`about-concepts` and `services/preview` + `services/preview/v5a` routes exist in the repository and build cleanly locally (62 pages) but return 404 on production** — These have `robots: { index: false }` so they are not SEO liabilities, but the local/prod mismatch is unexplained without a `.vercelignore` or deployment-side exclusion. Not confirmed root cause; may be a Vercel static file routing edge case or a deployment artefact from the cutover sequence. Worth a live `vercel redeploy` to confirm or rule out.

8. **SEO pipeline `github_content_path` not updated post-cutover** — `_config/clients/undercurrent.yml` line 516 in the SEO project still reads `src/content/articles`. The follow-up doc (`docs/blog-redesign-followups.md` item 6) says this should be changed to `content/articles` "when redesign merges to main". The cutover has happened; the path has not been updated. New pipeline-published articles will land in the wrong directory and not appear on the site.

---

## Anything Missed

From the original 11-step cutover spec:

- **Step 10 (GSC sitemap resubmit + index request)** — explicitly marked "manual by owner, out of scope for automated audit." Not verified. Owner should action this given the sitemap domain mismatch in issue #4 above; a re-submit after fixing the non-www URLs is advisable.
- **Step 2 (pre-flight clean build on `redesign` before merge)** — not verifiable post-cutover from git history. lab-notes.md does not record a clean pre-merge build result. The merge commit message does not reference it. Low risk given the post-merge build is clean, but the step was not documented as completed.

---

## Outstanding (known, not fixed)

| Item | Status | Notes |
|------|--------|-------|
| `.env` tracked in git since `f15df88` | Outstanding | Contains `VITE_N8N_AUDIT_WEBHOOK_URL`. Rotation + `git rm --cached .env` required. Lab-notes documents this. |
| SEO pipeline `github_content_path` = `src/content/articles` | Outstanding | Should be `content/articles` post-cutover. Item 6 in blog-redesign-followups.md. |
| Case study pipeline emitting to wrong path | Outstanding | Item 7 in blog-redesign-followups.md. Deferred non-blocking. |
| `CLAUDE.md` hard rule "don't push to main" now stale | Outstanding | Lab-notes flags it. Owner should update CLAUDE.md. |

---

## Tests

- **Build:** `rm -rf .next && NEXT_TELEMETRY_DISABLED=1 npm run build` — PASS. 62 routes, zero errors.
- **Live routes:** `curl --max-redirs 0` against prod for all 26 required routes — PASS (26/26 × 200).
- **Redirects:** `curl -v -L` full chain trace for all 11 redirect rules — FAIL (2 issues: 2-hop chain on `/resources/`, 404 destination on `/case-study/<slug-with-suffix>`).
- **Sitemap:** `curl /sitemap.xml` — PASS (200, 46 URLs, correct entries).
- **Meta files:** `curl /robots.txt`, `/llms.txt`, `/feed.xml` — PASS (3/3 × 200, well-formed).
- **Noindex:** `curl -L /roi` and `/missed-revenue` — PASS (200 + noindex meta, absent from sitemap).
- **Vercel preset:** `vercel project inspect` — PASS (Framework = Next.js, Output = Next.js default).
- **Git state:** `git log`, `git show 1b8064b`, `git branch -r` — PASS (no-ff merge, redesign branch exists, lab-notes updated).

---

## Fixes Applied

Fix pass run on branch `mobile-polish`. Clean local build reproduced (`✓ Compiled`, `✓ Generating static pages (62/62)`). Local `next start` on port 4114 used to verify each redirect chain end-to-end.

**Critical 1 — `/case-study/<slug>-case-study` → 404** — RESOLVED.
In `next.config.mjs`, added a specific redirect for `/case-study/ai-content-automation-small-business-australia-case-study` → `/case-studies/ai-content-automation-small-business-australia`, placed *before* the generic `/case-study/:slug` rule so it wins on match order. Verified: `curl -I` now returns `HTTP/1.1 301 Moved Permanently` → canonical case-study URL. Single hop.

**Major 2 — `/resources/` 2-hop chain** — RESOLVED.
Root cause was Next.js's built-in trailing-slash 308, which fires before both custom redirects and middleware/proxy, so the report's suggested `source: '/resources/'` rule would have been unreachable. Fix applied in two parts:
- `next.config.mjs`: added `skipTrailingSlashRedirect: true` to disable the automatic 308.
- `proxy.js` (new file): a Next.js 16 proxy (successor to `middleware.js`) that matches `/resources/:path*` and issues a single 301 → `/blog` for `/resources` and `/resources/`.
Verified: `curl -I /resources/` now returns `HTTP/1.1 301 Moved Permanently` → `/blog`. One hop. Sanity-checked `/about/`, `/blog/`, `/customer-experience-automation/` still return 200 despite the auto-redirect being off — canonical `<link>` tags continue to point to the no-slash form, so duplicate-content risk stays bounded.

**Major 3 — 308 instead of 301 on all redirects** — RESOLVED.
Replaced `permanent: true` with `statusCode: 301` on every redirect object in `next.config.mjs`. Verified: `/articles/my-article`, `/case-study/<slug>-case-study`, `/resources` → all emit `HTTP/1.1 301 Moved Permanently`.

**Major 4 — sitemap + robots non-www domain mismatch** — RESOLVED (scoped).
`app/sitemap.js` `BASE` constant updated to `https://www.undercurrentautomations.com`. `app/robots.js` `sitemap` URL updated to match. Verified sitemap `<loc>` entries and the `Sitemap:` directive both serve the www form.
Follow-up note (out of scope for this fix): many active files still use the apex form for canonicals and JSON-LD — `lib/data/seo.js`, `lib/data/services-v2.js`, `app/services/page.js`, `app/[slug]/page.js`, `components/pages/LocationPage.js`. The QA report flagged only sitemap + robots; the broader canonical consistency sweep is a separate task. Not blocking GSC sitemap submission since the sitemap itself is now aligned.

**Minor 5 — `.superpowers/` tracked despite `.gitignore`** — RESOLVED.
`git rm -r --cached .superpowers/` — 19 files untracked. Stage change will land on next commit.

**Minor 6 — `docs/favicon-preview.html` tracked** — RESOLVED.
`git rm --cached docs/favicon-preview.html`. Added `docs/favicon-preview.html` to `.gitignore` next to the existing `public/favicon-preview.html` rule so it stays untracked.

**Minor 7 — `about-concepts` / `services/preview` 404 on prod** — NOT A BUG.
Root cause: both directories are **untracked** in git (`git status` shows `?? app/about-concepts/`, `?? app/services/preview/`). They exist only in the local working tree and have never been committed, so Vercel has never deployed them. Not a cutover regression, not a `.vercelignore` issue. No code change needed. If these routes should exist on prod, they need to be committed and pushed. If not, they can remain as local-only scratch.

**Minor 8 — SEO pipeline `github_content_path`** — DEFERRED (cross-project).
Confirmed: `/Users/luke/UnderCurrent/Builds/Products/SEO/_config/clients/undercurrent.yml:516` still reads `src/content/articles`. The active Next.js content lives at `content/articles` (verified `./content/articles` exists and contains the live articles; `./src/content/articles` is legacy Vite content). Deliberately not edited during this pass because the file is in a sibling project (`/Products/SEO/`), outside the scope of a website-repo QA fix. Flagged for Luke: next pipeline publish run will silently land in the legacy directory unless that YAML is updated to `content/articles`.

### Verification

- `rm -rf .next && NEXT_TELEMETRY_DISABLED=1 npm run build` — PASS. `✓ Compiled successfully`, `✓ Generating static pages (62/62)`. Zero errors. Zero warnings after renaming `middleware.js` → `proxy.js`.
- Local `next start` on port 4114 — redirects probed with `curl -I`:
  - `/resources/` → 301 `/blog` (single hop) ✓
  - `/resources` → 301 `/blog` ✓
  - `/articles/my-article` → 301 `/blog/my-article` ✓
  - `/case-study/ai-content-automation-small-business-australia-case-study` → 301 `/case-studies/ai-content-automation-small-business-australia` ✓
  - `/about/`, `/blog/`, `/customer-experience-automation/` → 200 (no auto-redirect, page renders) ✓
- Sitemap + robots — probed with `curl`:
  - `/sitemap.xml` first `<loc>` = `https://www.undercurrentautomations.com` ✓
  - `/robots.txt` `Sitemap:` directive = `https://www.undercurrentautomations.com/sitemap.xml` ✓

### Files changed

- `next.config.mjs` — `skipTrailingSlashRedirect: true` added, all `permanent: true` → `statusCode: 301`, specific case-study redirect added before generic rule.
- `app/sitemap.js` — `BASE` constant flipped to www.
- `app/robots.js` — `sitemap` URL flipped to www.
- `proxy.js` — new file, single 301 for `/resources/` variants.
- `.gitignore` — added `docs/favicon-preview.html`.
- `git rm --cached` staged for `.superpowers/` (19 files) and `docs/favicon-preview.html`.

### Known limitation

Local verification uses `next start`, which runs the proxy and the trailing-slash normaliser in the same Node process. Production on Vercel Edge may reorder these. The `skipTrailingSlashRedirect: true` + proxy combination removes that uncertainty — the auto-redirect is off, so the proxy is guaranteed to fire first regardless of runtime. That said, a preview deploy is the cleanest final verification before merging to `main`.
