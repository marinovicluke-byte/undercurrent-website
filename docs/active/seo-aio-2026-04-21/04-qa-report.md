# QA Report — SEO + AIO Foundation Pass

**Date:** 2026-04-21
**Auditor:** Claude (cold-read, Step 6a, pipeline tier)
**Target:** https://undercurrentautomations.com
**Spec:** `docs/seo-aio-audit-2026-04-20.md` (23 findings — 6 P0, 7 P1, 6 P2, 4 P3)
**Commits shipped this pass:**
- `0893bc6` fix(hero): add missing poster image asset
- `a86dc85` feat(seo): sitewide SEO + AIO foundation pass (34 files)
- `957bb57` docs: session handoff briefs, SEO audit, location-pages build prompt
- `ee40528` copy(services): rewrite ai-strategy-training page voice + AIO pass (Luke, parallel session)
- Prior session: `60bbfeb` feat(locations): 5 new location pages + Melbourne refresh

**Primary goal:** rank and be cited as the go-to AI automation agency for Melbourne, Sydney, and Australia-wide queries across Google, AI Overviews, ChatGPT, Perplexity.

---

## Summary

| Severity | Pre-push | Closed | Deferred | Outstanding |
|----------|----------|--------|----------|-------------|
| P0 Critical | 6 | 6 | 0 | 0 |
| P1 Major | 7 | 7 | 0 | 0 |
| P2 Minor | 6 | 6 | 0 | 0 |
| P3 Nit | 4 | 1 | 2 | 1 |

**Verdict:** ✅ **PASS** — every P0 and P1 audit finding is closed in production. No critical or major issues found. One P3 action (external: run Rich Results Test via Google) is recommended for Luke to do in-browser but not blocking.

**Framework score delta:** 78/100 → estimated 94/100 pending external Lighthouse + Rich Results verification.

---

## Success Criteria — Pass / Fail

### Primary goal 1: site ranks for Melbourne / Sydney / Australia-wide
| Criterion | Status | Evidence |
|---|---|---|
| Location page exists per major city | ✅ PASS | 6 pages 200: `/ai-automation-{melbourne,sydney,brisbane,perth,adelaide,australia}`. Each H1 names the city. |
| Service JSON-LD names all 6 capitals | ✅ PASS | `/sales-automation` Service schema `areaServed` returns 13 Place nodes: Melbourne, Sydney, Brisbane, Perth, Adelaide, Canberra + 6 states + Australia |
| Location pages server-rendered | ✅ PASS | No `use client` marker in fetched HTML of `/ai-automation-sydney`. JSON-LD present in initial HTML. |
| Entity graph bound by @id | ✅ PASS | Page-local `#business` node defined + sitewide `#organization` referenced. No orphan @ids. |

### Primary goal 2: AI engines cite UC as the named entity
| Criterion | Status | Evidence |
|---|---|---|
| Complete NAP in schema | ✅ PASS | Org/LocalBusiness has telephone `+61438780815`, email, ABN (`23 368 496 814`), openingHours Mon–Fri 09:00–17:00, hasMap |
| Visible NAP matches schema | ✅ PASS | Footer renders phone, hours, ABN. Contact page has `tel:+61438780815`, email, hours. |
| sameAs disambiguation signals | ✅ PASS | 6 URLs: LinkedIn (co + personal), X, Instagram, Facebook, Google Maps (was 2) |
| Single Organization entity | ✅ PASS | Homepage now emits 1 Organization node (was 2 — duplicate removed) |
| Canonical per page | ✅ PASS | Homepage + 4 static pages now have `rel="canonical"`. Was missing on 5 pages. |
| Structured FAQs on articles | ✅ PASS | `/blog/what-is-business-process-automation-australia` returns 8 Questions + 8 Answers in FAQPage schema, extracted from frontmatter |

### Primary goal 3: technical SEO foundations
| Criterion | Status | Evidence |
|---|---|---|
| Canonical domain consistent | ✅ PASS | Sitemap + robots + all canonicals use no-www. `www.undercurrentautomations.com` returns 308 to no-www. |
| Core Web Vitals — LCP poster | ✅ PASS | `/hero-poster.jpg` returns 200 (was 404). Hero video paints poster immediately. |
| Sitemap fresh and reachable | ✅ PASS | 51 URLs, no-www, listed in robots.txt |
| llms.txt reachable | ✅ PASS | `/llms.txt` returns 200, 8061 bytes |
| Breadcrumbs visible + schema | ✅ PASS | Blog, service, case-study pages all render `aria-label="Breadcrumb"` + BreadcrumbList JSON-LD |
| Freshness signal | ✅ PASS | All 12 services show `dateModified: 2026-04-21`, auto-derived from git log of `lib/data/services.js` |
| Internal linking | ✅ PASS | Sydney page links to 10 specific service slugs (was `/services` generically) |

---

## Audit finding-by-finding

### P0 — all closed

| ID | Finding | Status | Evidence |
|---|---|---|---|
| P0-01 | Only one location page | ✅ CLOSED | 6 pages 200, each with city-named H1, city-specific JSON-LD |
| P0-02 | www vs no-www mismatch | ✅ CLOSED | sitemap.xml has 0 www URLs, robots.txt points at no-www, www redirects 308 |
| P0-03 | LocationPage is `use client` | ✅ CLOSED | HTML returns JSON-LD in initial markup, no `use client` marker, `@id` references correct. Page-scoped `#business` sub-nodes are intentional and valid. |
| P0-04 | Duplicate Organization on homepage | ✅ CLOSED | `grep -c '"@type":"Organization"'` on homepage = 1 |
| P0-05 | Homepage no canonical / metadata | ✅ CLOSED | `<link rel="canonical" href="https://undercurrentautomations.com">` + WebPage JSON-LD with @id + og:title/url/type + twitter:card all present |
| P0-06 | NAP incomplete | ✅ CLOSED | Schema has `telephone`, `email`, `taxID`, `openingHoursSpecification`, `hasMap`. Footer renders phone/hours/ABN. Contact page has `tel:` link + hours block. |

### P1 — all closed

| ID | Finding | Status | Evidence |
|---|---|---|---|
| P1-07 | `areaServed` Melbourne-only | ✅ CLOSED | Service schema on `/sales-automation` exposes 13 Place nodes |
| P1-08 | Homepage H1 query-first check | ✅ CLOSED | Audit recommended keep-as-is; H1 unchanged and in initial HTML |
| P1-09 | Canonicals on 4 static pages | ✅ CLOSED | about, audit, contact, process all return `rel="canonical"` with full URL |
| P1-10 | Contact page metadata + NAP | ✅ CLOSED | og:title, og:url, twitter:card, canonical all present. `tel:+61438780815`, email, hours block visible above form. |
| P1-11 | Only 2 sameAs URLs | ✅ CLOSED | 6 URLs across LinkedIn, X, Instagram, Facebook, Google Maps |
| P1-12 | OG image resolution | ✅ CLOSED | `/brand/og-card.png` returns 200; canonical domain now consistent so no mixed signals |
| P1-13 | Regex FAQ extraction fragile | ✅ CLOSED | `extractFaqs(frontmatter, html)` prefers `frontmatter.faqs`. All 16 articles migrated. Verified article returns 8 Q + 8 A. |

### P2 — all closed

| ID | Finding | Status | Evidence |
|---|---|---|---|
| P2-14 | /audit/report privacy | ✅ CLOSED | robots.txt `Disallow: /audit/report` + page meta `noindex, nofollow` — defence in depth |
| P2-15 | llms.txt reachability | ✅ CLOSED | 200, 8061 bytes, lists all 6 locations + 12 services + articles |
| P2-16 | Visible breadcrumb chrome | ✅ CLOSED | `aria-label="Breadcrumb"` renders on blog and service pages (was LocationPage-only) |
| P2-17 | Identical dateModified | ✅ CLOSED | Auto-derive from git log works. All 12 services show 2026-04-21. Vercel build has full git history. |
| P2-18 | internalLinks generic | ✅ CLOSED | Sydney page links to 10 specific service slugs including ai-strategy-training, content-automation, custom-integrations, finance-automation, sales-automation, seo-ai-visibility |
| P2-19 | No WebPage on homepage | ✅ CLOSED | `"@type":"WebPage","@id":"https://undercurrentautomations.com#webpage"` present with `isPartOf` + `about` bindings |

### P3 — 1 closed, 2 deferred, 1 outstanding

| ID | Finding | Status | Notes |
|---|---|---|---|
| P3-20 | Per-page OG images | ⚠ DEFERRED | Every service shares `/brand/og-card.png`. Low impact. Generator at `scripts/gen-og-png.mjs` can be run later. |
| P3-21 | BLUF starts with service name | ⚠ DEFERRED | Not verified in this pass. Visual only. |
| P3-22 | Dead ternary in ServicePage | ✅ CLOSED | Removed in `a86dc85` ServicePage refactor |
| P3-23 | Rich Results Test recommended | ⚠ OUTSTANDING | **Action for Luke**: run Google's Rich Results Test + Schema.org validator on 3 representative pages. Paste in-browser: `https://search.google.com/test/rich-results?url=https://undercurrentautomations.com/ai-automation-sydney`, plus a service page and a migrated blog article. |

---

## Regressions check

None detected. Cross-checks:

- All 6 location pages return 200
- All 12 service pages return 200 with valid schema
- Sitemap has 51 URLs (up from 46 pre-cutover target of ~50, now complete)
- llms.txt auto-regenerated with full location set
- Homepage H1 still renders in initial HTML (not JS-injected)
- /audit/report still properly hidden
- FAQ counts on migrated article match frontmatter (8/8)
- www → no-www 308 still functions

No broken routes, no schema validation errors at the string-match level (Google Rich Results Test should still be run as external confirmation per P3-23).

---

## Items beyond the audit — extra work shipped

Not strictly audit-driven, included in this push:

| Item | Impact |
|---|---|
| `lib/data/services.js` — `ai-strategy-training` copy rewrite (Luke, ee40528) | AIO-friendlier metaTitle, compressed BLUF, expanded tool list, 6 FAQs match PAA |
| `app/globals.css` muted text opacity 0.42 → 0.60 | WCAG AA contrast lift sitewide (was part of earlier merge, live) |
| `components/sections/BeforeAfter.js` h4 → h3 | Heading order accessibility fix |
| `scripts/migrate-article-faqs.mjs` | One-off tool preserved as repo artefact for future article additions |
| Internal docs committed | `docs/seo-aio-audit-2026-04-20.md`, `docs/next-session-handoff.md`, `docs/location-pages-build-prompt.md`, `docs/uncommitted-work-brief-2026-04-21.md`, `docs/undercurrent-copy-next-session-prompt.md`, `docs/active/cutover-2026-04-20/` — preserved for future session context, not served by Next.js |

---

## Framework-layer rescore (post-push)

| Layer | Pre | Post | Notes |
|---|---|---|---|
| 1 — Crawl Access | ⚠ | ✅ | Canonical domain fixed, SSR on location pages confirmed, canonicals everywhere |
| 2 — Schema Markup | ⚠ | ✅ | NAP complete, single Organization on homepage, WebPage node present, sameAs expanded |
| 3 — Content Structure | ✅ | ✅ | Unchanged — was already strong |
| 4 — E-E-A-T | ⚠ | ✅ | NAP complete, per-service dateModified from git |
| 5 — Meta & Head | ⚠ | ✅ | Canonicals on homepage + 4 static, per-page OG on contact |
| 6 — Performance | ? | ⚠ | LCP poster fix shipped; **run Lighthouse to confirm mobile LCP < 2.5s** |
| 7 — Navigation | ⚠ | ✅ | Visible breadcrumbs on blog + service + case-study |
| 8 — FAQ | ⚠ | ✅ | Frontmatter migration complete, 16 articles |

---

## Recommended next actions (non-blocking)

1. **Run Google Rich Results Test** (P3-23) in-browser on 3 URLs: `/`, `/ai-automation-sydney`, `/blog/what-is-business-process-automation-australia`. Confirms schema validates end-to-end.
2. **Run Lighthouse** for mobile CWV baseline — the LCP fix should now register properly.
3. **Submit no-www sitemap in Google Search Console** if not already (www version was previously cached — confirm reconciliation over next 4–6 weeks).
4. **Request indexing** for the 5 new location pages + the homepage in Search Console (rate limit ~12/day).
5. **Update Google Business Profile** website URL from `http://www.undercurrentautomations.com/` to `https://undercurrentautomations.com`.
6. **AggregateRating / Review schema** — highest-ROI schema not yet wired. Blocked on having visible reviews on-site. Pull from GBP when ready.

None of the above affect the audit's pass verdict.

---

## Issues found by severity

**Critical:** 0
**Major:** 0
**Minor:** 0
**Nit:** 1 (P3-23 external validation, recommended)

---

*End of Step 6a cold audit. No fixes applied during this step.*
