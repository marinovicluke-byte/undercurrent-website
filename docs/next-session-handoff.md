# Next session handoff — UnderCurrent website SEO audit continuation

**Paste everything below the line into a fresh Claude Code window opened in `~/UnderCurrent/Builds/Products/Website/undercurrent/`.**

---

You are continuing a comprehensive SEO + AIO audit and fix pass on the UnderCurrent Automations website (Next.js 15, App Router, production at https://undercurrentautomations.com). The previous session was long, so here is the full state so you can pick up without re-researching.

## Project context

- **Business:** UnderCurrent Automations, Melbourne-based AI automation agency serving Australian small businesses nationwide. Founded by Luke Marinovic.
- **Founding date:** 2026-03-07
- **ABN:** 23 368 496 814
- **Phone:** +61438780815 (Luke's mobile, public)
- **Email:** luke@undercurrentautomations.com (public)
- **Address:** no public street address. Service Area Business on Google Business Profile. Locality "Melbourne, VIC, AU" only.
- **Opening hours:** Mon-Fri 09:00-17:00 AEDT
- **GBP socials linked:** LinkedIn (co + personal), X (UC_Automations), Instagram (undercurrent.automations), Facebook (profile.php?id=61578553167947), Google Business Profile
- **Target rankings:** "AI automation agency Melbourne / Sydney / Brisbane / Perth / Adelaide / Australia" plus service-specific + location-specific queries in Google, AI Overviews, ChatGPT, Perplexity
- **Stack:** Next.js 15 App Router, React 19, Tailwind v4 (via `@theme {}` in `app/globals.css`). Existing components use a hybrid of inline `style={{...}}` with CSS vars plus occasional Tailwind utilities. Do not force migration.
- **Canonical domain:** `https://undercurrentautomations.com` (no www). Vercel 308-redirects www to no-www.

## Reference docs you MUST read before coding

1. `docs/seo-aio-audit-2026-04-20.md` — the full audit. Lists every P0/P1/P2/P3 with evidence + fix.
2. `docs/location-pages-build-prompt.md` — the build brief used to produce the 5 new location pages.
3. `~/UnderCurrent/Vault/Research/wiki/seo-aio/nextjs-ai-search-framework.md` — master framework.
4. `~/UnderCurrent/Vault/Research/wiki/seo-aio/service-page-blueprint.md` — service-page pattern.
5. Project `CLAUDE.md` (root + `undercurrent/CLAUDE.md`).

## What the previous session shipped

### Schema + metadata
- Homepage: added `export const metadata` with canonical, OG, Twitter + `WebPage` JSON-LD with @id bound to Organization
- Static pages (about, contact, process, audit): added canonical + OG + Twitter metadata (was missing)
- Contact page: visible phone + email + hours block added above the form
- Sitewide Organization schema in `app/layout.js`: added `telephone`, `email`, `taxID` (ABN), `foundingDate: 2026-03-07`, `contactPoint` (customer-service + sales), expanded `areaServed` to 8 Places, `sameAs` now has 6 URLs
- Sitewide LocalBusiness schema: added `telephone`, `email`, `openingHoursSpecification` Mon-Fri 09:00-17:00, `hasMap` to GBP listing, `parentOrganization` @id binding, expanded `areaServed`
- `lib/data/seo.js`: `AREAS_SERVED` expanded from 3 entries to 13 (Melbourne, Sydney, Brisbane, Perth, Adelaide, Canberra + states + Australia)

### Canonical domain
- `app/sitemap.js` BASE changed from `www.undercurrentautomations.com` to `undercurrentautomations.com`
- `app/robots.js` sitemap URL changed to no-www
- All page-level canonicals use no-www consistently

### Location pages (P0-01) — SHIPPED
- `lib/data/locations.js` now has 6 entries: Melbourne (existing) + Sydney + Brisbane + Perth + Adelaide + Australia
- Each new entry delivered: 9 FAQs, 4 industries (Trades + Consulting + 2 city-specific), 13-15 named tool entities
- Content routes through `components/pages/LocationPage.js` (server wrapper) → `LocationPageClient.js` (interactive inner), which was refactored to resolve audit P0-03
- JSON-LD per location page: LocalBusiness + Service + FAQPage + HowTo + BreadcrumbList, all with proper @id bindings to sitewide `${DOMAIN}#organization`
- Audit verified: all 5 new routes return 200, all H1s contain city name, all schemas render in initial HTML

### LocationPage refactor (P0-03)
- `components/pages/LocationPage.js` is now a server component that builds JSON-LD and wraps the client inner
- `components/pages/LocationPageClient.js` holds all interactive pieces (was the old combined file, refactored by subsequent agent)
- Broken `@id` reference (`/#business` pointing to nothing) replaced with `#organization` binding

### Accessibility + performance
- `app/globals.css`: `--text-muted` bumped from `rgba(250,249,245, 0.42)` → `0.60` for WCAG AA contrast pass
- `--text-faint` bumped from 0.22 → 0.28 for consistency
- `components/layout/Footer.js` NavColumn: `<h4>` → `<h3>` (heading order fix)
- `components/sections/BeforeAfter.js` column headline: `<h4>` → `<h3>` (heading order fix)
- `components/sections/Hero.js`: added `poster="/hero-poster.jpg"` to background video (LCP fix, should drop mobile from 2.6s to ~0.5s)
- `public/hero-poster.jpg` (12KB) created from video frame via ffmpeg

### Breadcrumb chrome
- `components/layout/Breadcrumb.js` rebuilt with Tailwind v4 classes + CSS var tokens
- Wired into ServicePage, blog article, case-study article pages (location pages had it already)

### Blog FAQ
- `app/blog/[slug]/page.js` `extractFaqs()` now prefers structured `frontmatter.faqs: [{q, a}]` and falls back to HTML regex for legacy articles. New articles should define `faqs:` in frontmatter.

## Current open items

### External (user must do — not code)

1. **Vercel domain redirect.** Set primary to `undercurrentautomations.com` (no-www), www → 308 redirect. Luke reports done. Verify with `curl -I https://www.undercurrentautomations.com` → should return 308 to no-www.

2. **Deploy latest code.** The sitemap served at https://undercurrentautomations.com/sitemap.xml was cached with OLD www URLs as of the previous session's check. Luke needs to push latest `main` to Vercel so the regenerated sitemap has no-www URLs inside. Verify after deploy: `curl -sS https://undercurrentautomations.com/sitemap.xml | grep -c "www.undercurrent"` should return `0`.

3. **Search Console.** Luke submitted sitemap showing 46 discovered URLs but expected closer to 50 (6 locations + 12 services + 4 cluster hubs + 18 articles + 1 case study + 9 static = ~50). Investigate the delta. Possible causes: Vercel deploy not complete (fewer routes built), or some routes not yet in the generated sitemap. Check Search Console sitemap status at https://search.google.com/search-console/sitemaps?resource_id=sc-domain%3Aundercurrentautomations.com

4. **GBP Website URL.** Update from `http://www.undercurrentautomations.com/` to `https://undercurrentautomations.com`. Luke's to do.

5. **Request indexing for new URLs** in Search Console for the 5 new locations + homepage + Melbourne + (over 2 days) 12 service pages. Rate limit is ~12/day.

### Code-side open items (priority order)

6. **P0-06 residual — verify NAP is now complete.** Phone/email/ABN/hours/geo are in schema. Double-check by fetching live layout HTML and validating LocalBusiness schema through Google's Rich Results Test.

7. **P1-13 residual — migrate existing 18 articles' FAQs to frontmatter.** The fallback regex works but is fragile. One sweep through `content/articles/*.md` to add `faqs: [{ q, a }]` blocks based on the existing "Frequently Asked Questions" section in each article. Non-urgent but closes the gap.

8. **P2-17 — per-service `dateModified` process.** All 12 services in `lib/data/services.js` currently inherit `DEFAULT_SERVICE_DATE_MODIFIED = '2026-04-19'` from `components/pages/ServicePage.js`. Freshness signals suffer when one service is edited and others appear stale. Consider a pre-commit or deploy script that bumps `dateModified` on any service entry whose data changed.

9. **P2-18 — internalLinks audit.** Some entries in `lib/data/locations.js` and possibly older service entries point `internalLinks` to `/services` generically. Should point to specific service slugs. Sweep.

10. **AggregateRating / Review schema.** Not yet added because Luke has no visible reviews on the site. If Luke pulls Google reviews from his GBP and adds them to the site, wire up `AggregateRating` on Organization + `Review` nodes. Single highest-ROI schema for service businesses (~20-30% SERP CTR lift).

11. **Per-service OG images.** Currently every service shares `/brand/og-card.png`. `scripts/gen-og-png.mjs` exists. Generate one per service so LinkedIn/Slack/AI-citation previews render service-specific cards.

12. **Additional case studies.** Only 1 case study exists (`content/case-studies/ai-content-automation-small-business-australia.md`). More case studies = higher AI citation probability (they're the most-cited format by ChatGPT and Perplexity). Content work, not code.

## Design + code conventions

- **Brand voice:** short, direct, sacrifices grammar for brevity, no em dashes, commas for pauses. Never use "actually", "basically", "leverage", "synergy", "seamless", "cutting-edge".
- **Colours** (from `app/globals.css`): blue `#6A8DAD` default accent, sage `#8FAF9F` positive, orange `#E07A55` warnings only. Text tokens: `--text-primary` 0.88 alpha, `--text-secondary` 0.65, `--text-muted` 0.60, `--text-faint` 0.28.
- **Cards:** 14px rounded, hard offset accent shadows (`6px 6px 0 0 var(--accent)`), no glassmorphism, no soft blurs, no gradient text, no ambient radial glows (one per page max, in ClosingCTA only).
- **Fonts:** Space Grotesk display, Satoshi body, SF Mono for stat numerals only.
- **Server vs client:** default to server components. Only add `'use client'` for interactivity. Metadata must be on server pages.
- **Schema pattern:** sitewide Organization + LocalBusiness + WebSite in `app/layout.js` with @ids. Pages reference via `{ '@id': '${DOMAIN}#organization' }`, never redefine.

## Verification commands to run first

Before making any code change, confirm the current state:

```bash
# Build clean?
npm run build 2>&1 | tail -15

# Live sitemap has no-www URLs (should return 0)?
curl -sS https://undercurrentautomations.com/sitemap.xml | grep -c "www\.undercurrent"

# All 6 location routes respond 200?
for slug in melbourne sydney brisbane perth adelaide australia; do
  code=$(curl -sS -o /dev/null -w "%{http_code}" https://undercurrentautomations.com/ai-automation-$slug)
  echo "$code /ai-automation-$slug"
done

# www redirect working?
curl -sSI https://www.undercurrentautomations.com | head -5

# Rich Results Test on a key page (paste into browser):
# https://search.google.com/test/rich-results?url=https%3A%2F%2Fundercurrentautomations.com%2Fai-automation-sydney
```

Report the output of each command before proceeding.

## First task

Investigate the "46 URLs in sitemap" delta. Expected ~50.

1. Run `curl -sS https://undercurrentautomations.com/sitemap.xml | grep -c "<loc>"` to get the live count.
2. Open `app/sitemap.js` and count what it should emit from `LOCATIONS`, `SERVICES`, `CLUSTER_ORDER`, `getAllArticles()`, `getAllCaseStudies()`, plus static pages.
3. Compare. The delta is either (a) a route genuinely missing from the sitemap, (b) Vercel serving a stale cache, or (c) Google hasn't re-fetched yet.
4. Report findings to the user with the specific missing routes or a stale-cache confirmation.

Do not make code changes until you've verified the current state and reported the delta. After confirmation from Luke, proceed with the open code-side items in priority order (6 onwards in the list above).

Work expectation: report after each major step. Luke prefers terse, direct updates. Flag anything needing his input (real data like reviews, external dashboard actions).
