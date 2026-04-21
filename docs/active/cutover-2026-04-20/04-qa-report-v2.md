# QA Report v2 — 2026-04-20 Cutover, Second Pass

Auditor: Claude Code (cold read, no prior session context)
Date: 2026-04-20
Commit verified: `0b467d8` (fix(qa): address cutover QA findings)
Production: `https://www.undercurrentautomations.com`

---

## Status vs First Report

| # | Original Severity | Issue | Fix Applied | Verified? |
|---|-------------------|-------|-------------|-----------|
| 1 | Critical | `/case-study/<slug>-case-study` → 404 | Exact-match redirect added before generic rule in `next.config.mjs` | RESOLVED — 301 single-hop to correct destination |
| 2 | Major | `/resources/` 2-hop chain | `skipTrailingSlashRedirect: true` + `proxy.js` middleware | RESOLVED — 301 single-hop to `/blog` |
| 3 | Major | All redirects emit 308 not 301 | All `permanent: true` replaced with `statusCode: 301` | RESOLVED — all tested redirects return 301 |
| 4 | Major | Sitemap + robots.txt use bare apex, canonical is www | `BASE` in `app/sitemap.js` and `app/robots.js` updated to www | RESOLVED — sitemap `<loc>` and robots `Sitemap:` both use `https://www.undercurrentautomations.com` |
| 5 | Minor | `.superpowers/` tracked in git despite gitignore | `git rm -r --cached .superpowers/` | RESOLVED — `.superpowers/brainstorm/` (19 files) no longer tracked. See new issue #1. |
| 6 | Minor | `docs/favicon-preview.html` tracked in git | `git rm --cached docs/favicon-preview.html`, gitignore extended | RESOLVED — `git ls-files` returns empty for `favicon-preview` |
| 7 | Minor | Preview routes 404 on prod (local-only scratch files) | Confirmed not a bug — files were never committed | CONFIRMED NOT A BUG — `/about-concepts`, `/services/preview`, `/services/preview/v5a` all return 404 on prod as expected |
| 8 | Minor | SEO pipeline `github_content_path` out of date | Deferred — cross-project, out of scope | ACCEPTED DEFERRAL — not in this repo |

---

## New Issues Found

### #1 — `docs/superpowers/` is a distinct tracked directory, separate from the removed `.superpowers/`

**Severity: Nice-to-have**

The fix commit removed `.superpowers/brainstorm/` (the HTML mockups). A different directory, `docs/superpowers/`, with 7 markdown planning files (specs and plans), remains tracked. These were not flagged in the first report and are not the same content. They are not served on prod. This is not a regression from the fix commit, just unreported repo noise. Action when convenient: either keep them (they're legitimate planning docs) or `git rm -r --cached docs/superpowers/`.

Evidence: `git ls-files | grep superpowers` returns 7 paths under `docs/superpowers/plans/` and `docs/superpowers/specs/`.

### #2 — `proxy.js` does not handle `/resources/<slug>` that also matches a slug-rename redirect (2-hop chain remains for that subset)

**Severity: Nice-to-have**

The `proxy.js` matcher covers `/resources/:path*` and redirects only `/resources` and `/resources/` to `/blog`. Any `/resources/<slug>` path falls through to the `next.config.mjs` rule `{ source: '/resources/:slug', destination: '/blog/:slug' }`, which is a 301. If the resulting `/blog/<slug>` URL itself is a redirect source (e.g., the einvoicing slug rename), the full chain from `/resources/getting-started-einvoicing-...` is 2 hops: `/resources/...` → `/blog/getting-started-...` → `/blog/einvoicing-...`. Both hops are 301. This pattern pre-existed the fix (it would have been 3 hops before: 308 + 301 + 301). The fix reduced the `/resources/` path from 2 hops to 1; the `/resources/<slug>` → renamed-blog path is 2 hops and was 2 before. Not a regression, not a blocker.

### #3 — `next.config.mjs` comment references `middleware.js` for `/resources/` handling, but the file is `proxy.js`

**Severity: Nice-to-have**

Line 17 of `next.config.mjs` reads: `// '/resources/' (trailing slash) is handled in middleware.js — see comment there.` The actual file is `proxy.js`. Stale comment, no runtime impact.

---

## Regression Checks

| Check | Result |
|-------|--------|
| Homepage + top 5 routes (/, /blog, /services, /about, /contact, /case-studies) | PASS — all 200 |
| Sitemap `/sitemap.xml` | PASS — 200, www BASE confirmed |
| `robots.txt`, `llms.txt`, `feed.xml` | PASS — all 200 |
| Build clean: `rm -rf .next && NEXT_TELEMETRY_DISABLED=1 npm run build` | PASS — `Compiled successfully`, `Generating static pages (62/62)`, zero errors |
| Preview routes `/about-concepts`, `/services/preview`, `/services/preview/v5a` | PASS — all 404 on prod (expected, never committed) |
| `proxy.js` interference: `/resources`, `/resources/foo`, `/resources/getting-started-*` | PASS — each returns 301, proxy does not swallow arbitrary routes |
| `skipTrailingSlashRedirect` regression: `/about/`, `/blog/`, `/services/`, `/contact/`, `/customer-experience-automation/` | PASS — all return 200 (no unexpected redirects, pages render) |
| `proxy.js` as Next.js 16 Proxy file format | CONFIRMED — `PROXY_FILENAME = 'proxy'` is a first-class constant in Next.js 16. Build output labels it `ƒ Proxy (Middleware)`. Prod confirms it fires correctly. |

---

## Outstanding (not fixed, but known and accepted)

| Item | Status | Notes |
|------|--------|-------|
| `.env` tracked in git since `f15df88` | Outstanding | Contains `VITE_N8N_AUDIT_WEBHOOK_URL`. Rotation + `git rm --cached .env` still required. |
| SEO pipeline `github_content_path` = `src/content/articles` | Deferred | Cross-project. Should be `content/articles`. Item 6 in `docs/blog-redesign-followups.md`. |
| Case study pipeline emitting to wrong path | Deferred | Item 7 in `docs/blog-redesign-followups.md`. Non-blocking. |
| `CLAUDE.md` hard rule "don't push to main" now stale | Outstanding | Lab-notes flags it. |
| Broader canonical consistency (apex vs www in JSON-LD, seo.js, services-v2.js, etc.) | Deferred | Flagged in first-report fix notes. Sitemap and robots now aligned. Full sweep is a separate task. |
| `docs/superpowers/` 7 markdown files still tracked | New, Nice-to-have | Not a bug. Cleanup when convenient. |
| Stale `middleware.js` reference in `next.config.mjs` comment | New, Nice-to-have | Line 17. One-line fix. |

---

## Tests

- Build: `rm -rf .next && NEXT_TELEMETRY_DISABLED=1 npm run build` — PASS. 62 routes, zero errors.
- Redirects (prod): all 11 redirect rules tested with `curl -sI` — PASS. All return 301 on first hop.
- Critical #1 chain: `curl -L /case-study/<suffixed-slug>` — PASS. 1 hop, 301, final 200.
- Major #2 chain: `curl -L /resources/` — PASS. 1 hop, 301, final 200 at `/blog`.
- Major #4: `curl /sitemap.xml` + `curl /robots.txt` — PASS. Both use `https://www.undercurrentautomations.com`.
- Git hygiene: `git ls-files | grep superpowers` and `grep favicon-preview` — PASS for `.superpowers/` and `favicon-preview`. 7 `docs/superpowers/` files remain (separate from original issue, see new issue #1).
- Core routes regression (6 routes) — PASS. All 200.
- Meta files regression (4 files) — PASS. All 200.
- Trailing-slash regression (5 routes with `/`) — PASS. All 200, no unexpected redirect loops.

---

## Verdict

**approve**

All 8 issues from the first report are resolved or accepted-deferred. 3 new findings, all nice-to-have (stale comment, unrelated tracked docs, pre-existing 2-hop pattern that was already improved). No blocking issues. No regressions. Build clean at 62 routes. Production behaviour matches intent across all verified paths.
