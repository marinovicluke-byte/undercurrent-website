# SEO + AIO Audit — UnderCurrent Automations Website
**Date:** 2026-04-20
**Auditor:** Claude (cold review)
**Branch:** `main` (Next.js 15 cutover, 2026-04-20)
**Domain:** undercurrentautomations.com
**Frameworks applied:**
- `~/UnderCurrent/Vault/Research/wiki/seo-aio/nextjs-ai-search-framework.md`
- `~/UnderCurrent/Vault/Research/wiki/seo-aio/service-page-blueprint.md`
- Intelligentle Healing `04-qa-report.md` (format reference)

**Primary goal weighting:** rank and be cited as the go-to AI automation agency for Melbourne, Sydney, and Australia-wide queries across Google, AI Overviews, ChatGPT, Perplexity.

---

## Summary

| Severity | Count |
|----------|-------|
| P0 Critical | 6 |
| P1 Major | 7 |
| P2 Minor | 6 |
| P3 Nit | 4 |

**Overall score against framework:** 78 / 100. Foundations are strong (server components, full JSON-LD stack, clean robots + sitemap, entity-rich service pages). The gap is geographic coverage, canonical-domain consistency, and missing NAP (telephone) — three issues that directly cap how high the site can rank outside Melbourne.

**Headline finding:** the site is built to win Melbourne and cannot currently win Sydney, Brisbane, Perth, Adelaide, Canberra or "Australia-wide" search because those location pages do not exist and no schema signals them. Five pages fix that gap. See **P0-01**.

---

## P0 — Critical (blocks national ranking / AI-citation coverage)

### P0-01: Only one location page exists — Sydney / Brisbane / Perth / Adelaide are invisible

**Framework:** `nextjs-ai-search-framework.md §7 — topic clusters with hub-spoke internal linking`; goal is "rank as go-to across Australia".

**Actual:** `lib/data/locations.js` has **one** entry: `ai-automation-melbourne`. Sitemap generates exactly one location URL. No `/ai-automation-sydney`, `/ai-automation-brisbane`, `/ai-automation-perth`, `/ai-automation-adelaide`, `/ai-automation-australia`.

`lib/data/seo.js` `LOCATIONS` lists "Sydney, Brisbane, Perth, Remote Australia-wide" as chip labels on service pages, but those strings are not backed by real routes. That is cosmetic area-served text, not indexable pages.

**Evidence:**
- `lib/data/locations.js:5-143` — single entry
- `app/sitemap.js:22-27` — maps over `LOCATIONS` which yields 1 URL
- Service page chips render `Sydney`, `Brisbane`, `Perth` as plain `<span>` tags (`components/pages/ServicePage.js:362`) — no links, no pages

**Impact:**
- "AI automation Sydney", "AI automation Brisbane", "business automation Perth" etc have **zero chance** of ranking — Google has no entity page to rank.
- AI Overviews / ChatGPT / Perplexity citation is entity-driven. Without a page whose H1, JSON-LD `areaServed`, and FAQ explicitly target Sydney/Brisbane/etc, the site will not be cited for those city-scoped queries.
- "AI automation agency Australia" (the broadest national query) has no dedicated page either — the homepage tries to serve both "Melbourne" and "Australia" which dilutes both.

**Fix (one plan, five pages):**
1. Add `ai-automation-sydney`, `ai-automation-brisbane`, `ai-automation-perth`, `ai-automation-adelaide`, `ai-automation-australia` to `LOCATIONS` in `lib/data/locations.js`. Each with its own H1, meta title, meta description, city-specific FAQs, local industries, local CTA copy.
2. Update each service's `areaServed` JSON-LD in `ServicePage.js` to reference all five cities + Australia as `Place` nodes (already AREAS_SERVED partially does this, but currently lists only Melbourne/Victoria/Australia).
3. Add internal links from every service page `internalLinks` block to 2 relevant location pages (e.g., sales-automation → Sydney + Melbourne).
4. Footer: add a "Locations" column with all five city pages.
5. Each location page must use the LocationPage component as a **server component** — see P0-03.

---

### P0-02: Canonical domain inconsistent across robots / sitemap vs everything else (www vs non-www)

**Framework:** `nextjs-ai-search-framework.md §1 Crawl Access` + `§5 Canonical`.

**Actual:**
| File | Domain used |
|---|---|
| `app/layout.js` (`metadataBase`, all JSON-LD, all @id) | `undercurrentautomations.com` (no www) |
| `lib/data/seo.js` (`DOMAIN`) | no www |
| `app/llms.txt/route.js` (`BASE`) | no www |
| All service/blog/case-study `alternates.canonical` | no www |
| **`app/robots.js` (`sitemap:` line)** | **`www.undercurrentautomations.com`** |
| **`app/sitemap.js` (`BASE`)** | **`www.undercurrentautomations.com`** |

**Evidence:**
- `app/robots.js:37` — `sitemap: 'https://www.undercurrentautomations.com/sitemap.xml'`
- `app/sitemap.js:7` — `const BASE = 'https://www.undercurrentautomations.com'`
- vs `app/layout.js:27` — `metadataBase: new URL('https://undercurrentautomations.com')`

**Impact:**
- Google sees sitemap URLs on `www`, then crawls `www`, then each page's `<link rel="canonical">` points to the no-www version. Google will reconcile but link equity splits during the transition.
- AI crawlers (GPTBot, PerplexityBot) often treat the canonical as the citation URL — so citations land on the no-www version while indexed pages say www. Mixed signals.
- Social previews and OG cards will render with different URLs depending on which version is visited.

**Fix:** pick one (recommended: `undercurrentautomations.com` without www, since 90% of the code already uses it) and:
1. Change `app/sitemap.js` `BASE` to no-www
2. Change `app/robots.js` `sitemap:` to no-www
3. In Vercel project Settings → Domains, make `undercurrentautomations.com` the primary and set `www.undercurrentautomations.com` to redirect.
4. Verify with `curl -I https://www.undercurrentautomations.com` returns `308` → no-www after deploy.

---

### P0-03: LocationPage is `'use client'` — loses framework guarantees for new location pages

**Framework:** `nextjs-ai-search-framework.md §6 — SSR/SSG for all content. No client-side rendering for content.`

**Actual:** `components/pages/LocationPage.js:1` — `'use client'` at top of the entire location component. JSON-LD still ends up in initial HTML via Next.js server render of client components, but:
- The file can't use `export const metadata` — metadata is handled by the dispatcher (`app/[slug]/page.js`), which works, but it's fragile.
- Interactive grain canvases, pipeline animations and terminal animations force client hydration for the whole page — unnecessary for SEO content.
- The HowTo schema on line 525 references `${DOMAIN}/#business` — an `@id` that does not exist anywhere else on the site (layout uses `#organization` and `#localbusiness`). This is a broken `@id` reference.

**Evidence:**
- `components/pages/LocationPage.js:1` — `'use client'`
- `components/pages/LocationPage.js:525` — `provider: { '@type': 'Organization', '@id': ``${DOMAIN}/#business``, name: 'UnderCurrent' }` — points to nothing

**Impact:**
- Every animation hydrates before Largest Contentful Paint on location pages — hurts CWV, which is a ranking factor.
- Broken `@id` breaks the entity graph Google and LLMs build — the HowTo can't be bound back to the Organization.
- Setting the precedent of `'use client'` on LocationPage means the 5 new location pages (P0-01) will inherit the same problem at 5x the scale.

**Fix:**
1. Refactor LocationPage: keep animations as isolated client child components (`<Grain>`, `<PipelineAnim>`, etc. already exist), make the wrapper a server component.
2. Fix the broken `@id`: change `${DOMAIN}/#business` → `${DOMAIN}#organization` on line 525 to reference the sitewide Organization node.
3. Do this **before** adding Sydney/Brisbane/Perth/Adelaide/Australia pages.

---

### P0-04: Homepage has a duplicate / partial Organization schema that conflicts with the sitewide one

**Framework:** `service-page-blueprint.md — never redefine Organization/LocalBusiness/WebSite on a page. They live once in layout.`

**Actual:** `app/page.js:13-26` injects a second `Organization` schema with only `name`, `url`, `description`, `areaServed: 'Australia'`, `address` — and **no `@id`**. The sitewide layout already injects a full Organization with `@id`, founder, foundingDate, areaServed (Melbourne/Victoria/Australia as Place nodes), sameAs, logo.

**Impact:**
- Google sees two Organization nodes for the same entity. Without `@id` on the homepage one, they don't merge. The entity graph becomes ambiguous.
- The homepage version has weaker fields (string `areaServed`, no founder, no sameAs, no logo). Google may pick either depending on freshness signals.
- Framework explicitly says to reference sitewide nodes via `@id`, not redefine.

**Fix:** delete `orgSchema` and its `<JsonLd schema={orgSchema} />` from `app/page.js`. The layout already handles this page and every other. Homepage only needs to add its **page-specific** schema (e.g., `WebPage` with `@id` referencing the homepage, `FAQPage` already exists via the FAQ component).

---

### P0-05: Homepage has no canonical URL, no OG per-page override, and no page-specific metadata

**Framework:** `nextjs-ai-search-framework.md §5 Meta & Head — self-referencing canonical on every page`. Implementation note: "Next.js layout canonicals don't propagate to child pages."

**Actual:** `app/page.js` is a server component but does not export `metadata` at all. It inherits from layout. The layout sets `metadataBase` but no `alternates.canonical` on the root path.

**Evidence:** `app/page.js:1-44` — no `export const metadata`, no `alternates`, no page-specific `openGraph`.

**Impact:**
- Google may still infer the canonical but there's no signal if the homepage is reached via `?utm_*` params or the www variant.
- The homepage is the most linked-to page on the site. Missing canonical on this page is the highest-value single missing tag.
- No page-specific OG means every share of the homepage uses the generic fallback title "UnderCurrent | AI Automation Agency for Australian Small Businesses | Melbourne" which is fine but the OG card image is the site-wide default — correct, but confirm it renders.

**Fix:** add to `app/page.js`:
```js
export const metadata = {
  title: 'UnderCurrent Automations — AI Automation Agency for Australian Small Businesses',
  description: '...', // rewrite for answer-first, entity-rich, 150-160 chars
  alternates: { canonical: 'https://undercurrentautomations.com' },
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://undercurrentautomations.com',
    type: 'website',
  },
}
```

---

### P0-06: No telephone or email in LocalBusiness / Organization schema — NAP incomplete

**Framework:** `nextjs-ai-search-framework.md §4 E-E-A-T — Consistent NAP (Name, Address, Phone) identical across site, Google Business Profile, directories`.

**Actual:**
- `app/layout.js` LocalBusiness schema has no `telephone`, no `email`, no `contactPoint`, no `streetAddress`, no `postalCode`.
- Contact page `app/contact/page.js` has no visible phone or `tel:` link — only a contact form.
- Footer also has no phone/email (verified by grep).

**Impact:**
- Google's Knowledge Panel and Maps Pack both prefer LocalBusiness entries with `telephone` + `address` + `openingHoursSpecification`. Without telephone, Maps Pack inclusion is blocked.
- AI engines use phone as a high-confidence entity signal — "the go-to agency" for local queries almost always includes a phone on the LocalBusiness panel.
- NAP inconsistency with Google Business Profile (if one exists) breaks local rank entirely.

**Fix:** either add a real AU business phone (ideally a landline or 1300 number) + contact email to `app/layout.js` LocalBusiness schema AND the footer AND the contact page; OR if UC is deliberately contact-form only, downgrade the LocalBusiness to `Organization` alone and drop the Maps/local-pack ambition. The first option is strongly preferred for the user's stated goal.

Also add: `openingHoursSpecification`, `streetAddress` or neighbourhood, `postalCode`. Even "Melbourne CBD" with postcode 3000 is better than blank.

---

## P1 — Major

### P1-07: `areaServed` on service pages lists only Melbourne / Victoria / Australia — does not name Sydney, Brisbane, Perth, Adelaide

**Framework:** `nextjs-ai-search-framework.md §2 — Service schema with area served`. Entity density rule: 15+ named entities per page boosts citation 4.8x.

**Actual:** `lib/data/seo.js:19` — `AREAS_SERVED = ['Melbourne', 'Victoria', 'Australia']`. This is what every service page's JSON-LD exposes.

Service pages also render a visible chip list from `LOCATIONS` (seo.js:21-24) that DOES include Sydney/Brisbane/Perth — but only as display chips, not in the JSON-LD.

**Impact:** Service pages are discoverable for "sales automation Melbourne" but not for "sales automation Sydney" because Google and LLMs parse the structured data, not only the visible chips.

**Fix:** expand `AREAS_SERVED` to `['Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide', 'Canberra', 'Australia', 'Victoria', 'New South Wales', 'Queensland', 'Western Australia', 'South Australia', 'Australian Capital Territory']`. This is one file change that updates every service page.

---

### P1-08: Homepage H1 is brand-first, not query-first

**Framework:** `nextjs-ai-search-framework.md §3 — H1 contains primary query + entity`. Intelligentle precedent: `P0-01` in that audit was the same bug.

**Actual:** Hero H1 is `"The AI automation agency for Australian small businesses"` — strong entity-rich phrasing. This is actually OK, **keep it**, but note that the underlying Hero renders this H1 inside a client-side token-splitter effect. Confirm it ships as a real `<h1>` in the initial HTML, not via JS. (The file `components/sections/Hero.js:103-116` does render `<h1>` in JSX, so this is fine.)

**Action:** **no H1 change**, but add a `<h2>` with location breadth: "Built in Melbourne. Delivered Australia-wide." somewhere above the fold so Sydney/Brisbane searchers see relevance.

---

### P1-09: About, Contact, Process, Audit pages have no `alternates.canonical`

**Framework:** `nextjs-ai-search-framework.md §5 — self-referencing canonical on every page`. Implementation note: layout canonicals don't propagate.

**Actual:**
| Page | `alternates.canonical` |
|---|---|
| `/` (homepage) | ❌ (covered by P0-05) |
| `/about` | ❌ |
| `/contact` | ❌ |
| `/process` | ❌ |
| `/audit` | ❌ |
| `/services` | ✅ |
| `/blog` | ✅ |
| `/case-studies` | ✅ |
| `/[slug]` (services + locations) | ✅ |
| `/blog/[slug]` | ✅ |
| `/case-studies/[slug]` | ✅ |
| `/blog/cluster/[slug]` | ✅ |

**Fix:** add `alternates: { canonical: 'https://undercurrentautomations.com/about' }` (and similar) to each page's `export const metadata`. Bulk 4-page change.

---

### P1-10: Contact page has no `openGraph`, no `twitter`, no phone link, no address

**Framework:** §5 Meta & Head + §4 NAP.

**Actual:** `app/contact/page.js:4-7` — metadata is `{ title: 'Contact', description: 'Get in touch...' }`. No canonical, no OG, no schema. No visible `tel:` or `mailto:` link.

**Impact:** This is a "bounce-off" page for AI traffic — LLMs often cite "contact the business at X" answers. Right now the citation quality for contact intent is zero.

**Fix:** add full metadata block + visible phone (or an explicit "contact form only" justification) + `ContactPoint` schema nested under the LocalBusiness in layout.

---

### P1-11: No `sameAs` beyond LinkedIn — Instagram, Facebook, YouTube, Google Business Profile missing

**Framework:** `nextjs-ai-search-framework.md §2 — sameAs: array of all official profiles`.

**Actual:** `app/layout.js:88-91` — `sameAs: ['linkedin.com/company/undercurrent-automations/', 'linkedin.com/in/lukemarinovic/']`.

**Impact:** Every social profile in `sameAs` is an entity-disambiguation signal for Google Knowledge Graph and LLMs. Two links is weak. If UC has an Instagram, Facebook, X, YouTube or Google Business Profile URL, each one added is a citation multiplier.

**Fix:** audit which profiles exist for UC; add them to both `Organization.sameAs` and the footer as visible links with `rel="me"`.

---

### P1-12: Homepage `metadataBase` uses no-www but `openGraph.images` are relative — fine now, but verify against www/no-www mismatch

**Framework:** §5 OG URLs must resolve.

**Actual:** `app/layout.js:26-45` — `metadataBase: 'https://undercurrentautomations.com'`, `images: [{ url: '/brand/og-card.png' }]`. Next.js will resolve to `https://undercurrentautomations.com/brand/og-card.png`. File exists at `public/brand/og-card.png` ✅.

**Impact:** once P0-02 is fixed (canonical domain locked), this is fine. Until then, if a user lands on www, OG URL still points at no-www, and some scrapers will 404. Deferred by P0-02.

---

### P1-13: Blog article FAQ extraction is regex-based on HTML — fragile

**Framework:** §8 FAQ Layer — "Never add FAQPage schema without matching visible FAQ content."

**Actual:** `app/blog/[slug]/page.js:63-76` extracts FAQs from compiled HTML by regex-matching `<h3>` + `<p>` pairs under the string "Frequently Asked Questions". Works for current articles but breaks if: FAQ section title differs, FAQ uses `<h2>`, answer is multi-paragraph, or markdown has extra whitespace.

**Impact:** silently drops FAQ schema on articles whose markdown doesn't match the exact pattern. This is the reverse of the framework risk (schema without content) — but it means articles with visible FAQs are losing their schema.

**Fix:** require every article frontmatter to include a structured `faqs: [{ q, a }]` field, then inject `FAQPage` from frontmatter not regex. Migrate the 18 existing articles in a single sweep.

---

## P2 — Minor

### P2-14: `/audit/report` is disallowed in robots — confirm this is intentional

**Actual:** `app/robots.js:29` — disallows `/audit/report`. If this is the private audit-result page gated per-lead, correct. If public, remove the disallow.

**Fix:** verify intent. If private, add `noindex` meta as a defence in depth.

---

### P2-15: `llms.txt` route is under `app/llms.txt/route.js` — verify it is reachable at `/llms.txt`

**Framework:** §1 — `public/llms.txt`.

**Actual:** the route lives at `app/llms.txt/route.js` which Next.js will serve at `/llms.txt` since `.txt` folder-names with a `route.js` return a text response. Correct for App Router. No action needed, but confirm with `curl https://undercurrentautomations.com/llms.txt` post-deploy.

Content looks clean: services, locations, articles. Note: because `LOCATIONS` in `lib/data/locations.js` has 1 entry, llms.txt also lists 1 location. When P0-01 is fixed, llms.txt automatically updates.

---

### P2-16: No visible breadcrumb chrome on service / blog / case-study pages

**Framework:** §7 Navigation — "Breadcrumbs on every page, with BreadcrumbList schema."

**Actual:** BreadcrumbList JSON-LD is present everywhere (service, blog, case-study, cluster). But visible breadcrumb `<nav>` chrome is optional per service-page-blueprint and currently only rendered on LocationPage (which imports `Breadcrumb`).

**Impact:** low. Schema alone gives Google the breadcrumb rich result. Visible chrome helps users navigate up the tree but is not a ranking factor.

**Fix:** optional. If added, render under the hero on service + article pages.

---

### P2-17: `dateModified` on service pages defaults to `2026-04-19` for all services

**Framework:** §4 E-E-A-T — "Last updated date, update with genuine new content not cosmetic edits." §6 implementation note — AI-cited content averages 25.7% newer than traditional search.

**Actual:** `components/pages/ServicePage.js:13` — `DEFAULT_SERVICE_DATE_MODIFIED = '2026-04-19'`. Twelve services all show the same "Last reviewed April 2026" unless they override `dateModified`.

**Impact:** when one service gets rewritten but the others don't, ranking signals become stale. AI engines weight freshness heavily.

**Fix:** require every service to set its own `dateModified` when its `lib/data/services.js` entry is touched. Consider a small pre-commit script that bumps `dateModified` on any service entry whose content fields changed in the diff.

---

### P2-18: Service page `internalLinks` point to `/services` for everything — no direct service-to-service connections

**Framework:** §7 — "Contextual internal links: 5+ per article, to related content AND service/about pages (not just blog-to-blog)."

**Actual (example):** `lib/data/locations.js:134-141` — all 5 `internalLinks` point to `/services`. Not to the specific service. This wastes the internal-linking signal.

**Fix:** make `internalLinks` point to actual service slugs (`/sales-automation`, `/content-automation`, etc.). ServicePage `internalLinks` already does this correctly for some services — sweep to verify all 12 + all locations.

---

### P2-19: No `WebPage` schema on homepage with `@id` referencing the hash

**Framework:** §2 — per-page schema.

**Actual:** homepage has `FAQPage` schema (via FAQ component) + an errant `Organization` (P0-04). No `WebPage` or `CollectionPage` schema binds the homepage itself to the Organization `@id`.

**Impact:** the entity graph has a gap at the homepage node. Low-impact but trivial to fix.

**Fix:** add a `WebPage` schema to homepage:
```js
{
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://undercurrentautomations.com#webpage',
  url: 'https://undercurrentautomations.com',
  name: 'UnderCurrent Automations',
  isPartOf: { '@id': 'https://undercurrentautomations.com#website' },
  about: { '@id': 'https://undercurrentautomations.com#organization' },
  inLanguage: 'en-AU',
}
```

---

## P3 — Nit

### P3-20: OG card is a PNG — consider adding per-page OG images for service + blog pages
Social previews for `/sales-automation` will all use the generic card. Per-page OG images raise CTR on LinkedIn especially. Deferred, low impact.

### P3-21: Service hero BLUF uses `<strong>` but not every service entry confirms BLUF starts with the service name
Blueprint requires this — needed for `blufAfterTerm()` stripper to work. Run a sweep: for each service, confirm `bluf` begins with `displayName` or `serviceDisplayName(service)`. Any mismatch silently ships the service name twice on hero. Visual only, but it's visible.

### P3-22: `components/pages/ServicePage.js:176` hard-codes `'Melbourne · Australia-wide'` for both location branches
```js
const locationChip = location === 'Melbourne' ? 'Melbourne · Australia-wide' : 'Melbourne · Australia-wide'
```
Ternary with identical branches — dead code. Harmless but a reviewer will flag it.

### P3-23: Structured data test recommended before promotion
After all P0s are fixed, run each template page through Google's Rich Results Test + Schema.org validator. This was the missing final step in the Intelligentle audit and caught two issues there post-launch.

---

## Pass/Fail against the framework (per layer)

### Layer 1 — Crawl Access
| Item | Status |
|---|---|
| robots.txt with AI crawlers | ✅ PASS (GPTBot, PerplexityBot, ClaudeBot, Google-Extended, CCBot, Applebot-Extended all listed) |
| XML sitemap | ✅ PASS (auto-generated, includes static/service/location/article/case-study/cluster) |
| Sitemap canonical domain | ❌ FAIL — uses www, rest of site uses no-www (P0-02) |
| Sitemap in robots.txt | ✅ PASS |
| llms.txt | ✅ PASS |
| SSR for content | ⚠ PARTIAL — LocationPage is `'use client'` (P0-03) |
| Canonical URLs | ⚠ PARTIAL — missing on 4 static pages (P1-09) + homepage (P0-05) |

### Layer 2 — Schema Markup
| Schema | Status |
|---|---|
| Organization (sitewide) | ✅ PASS |
| LocalBusiness (sitewide) | ⚠ PARTIAL — missing telephone, streetAddress, postalCode, openingHours (P0-06) |
| WebSite | ✅ PASS |
| sameAs | ⚠ PARTIAL — 2 links, missing social profiles (P1-11) |
| Article per post | ✅ PASS |
| FAQPage per article | ⚠ PARTIAL — regex extraction is fragile (P1-13) |
| BreadcrumbList per post | ✅ PASS |
| Person (author) | ✅ PASS |
| Service per service page | ✅ PASS |
| FAQ on service pages | ✅ PASS |
| HowTo on location pages | ⚠ PARTIAL — broken `@id` reference (P0-03) |
| Homepage schema | ❌ FAIL — duplicate Organization (P0-04), no WebPage (P2-19) |

### Layer 3 — Content Structure
| Element | Status |
|---|---|
| Unique H1 per page | ✅ PASS |
| H1 with primary query + entity | ✅ PASS |
| Quick Answer block on articles | ✅ PASS |
| H2s as questions (service pages) | ✅ PASS (10-section Q&A layout) |
| Self-contained sections | ✅ PASS |
| Answer-first per section | ✅ PASS |
| Entity density (15+) | ✅ PASS (service pages have 15-20 integrations, industries, locations named) |
| Lists and tables | ✅ PASS |

### Layer 4 — E-E-A-T
| Signal | Status |
|---|---|
| Named author | ✅ PASS (Luke Marinovic) |
| Author schema | ✅ PASS |
| Publication date | ✅ PASS (articles + case studies) |
| Last updated date | ⚠ PARTIAL — service pages all default to same date (P2-17) |
| Brand entity priming | ✅ PASS ("UnderCurrent Automations" bolded across copy) |
| Consistent NAP | ❌ FAIL — no phone anywhere (P0-06) |
| Backlinks | Out of scope for this audit |

### Layer 5 — Meta & Head
| Element | Status |
|---|---|
| Title per page | ⚠ PARTIAL — homepage inherits layout default (P0-05) |
| Meta description | ✅ PASS |
| Open Graph | ⚠ PARTIAL — contact + audit + process + about have no page-specific OG (P1-10) |
| Twitter Card | ✅ PASS (sitewide default + per-page overrides on service/blog) |
| Canonical | ⚠ PARTIAL — 4 static pages + homepage missing (P0-05, P1-09) |
| Favicon + touch icon | ✅ PASS |

### Layer 6 — Performance
Not assessed in this audit — run Lighthouse separately post-deploy. Framework targets: LCP < 2.5s, CLS < 0.1, INP < 200ms.

### Layer 7 — Navigation / Internal Linking
| Item | Status |
|---|---|
| BreadcrumbList schema | ✅ PASS |
| Visible breadcrumb chrome | ⚠ PARTIAL — only on LocationPage (P2-16) |
| Footer sitemap link | Unknown — verify |
| Contextual internal links | ⚠ PARTIAL — some locations link to `/services` generically (P2-18) |
| Topic clusters | ✅ PASS — 4 pillar hubs exist, articles map to clusters |

### Layer 8 — FAQ
| Rule | Status |
|---|---|
| 3-6 FAQ per service | ✅ PASS (6 per service) |
| FAQ on homepage | ✅ PASS |
| FAQ on location page | ✅ PASS (7 items) |
| FAQPage schema | ✅ PASS on services + locations; ⚠ fragile on articles (P1-13) |
| Questions match real search queries | ✅ PASS (service blueprint requires PAA-derived FAQs) |

---

## Geographic coverage — scored for your stated goal

Target: **go-to agency for Melbourne, Sydney, Australia-wide queries**.

| Query intent | Ranking surface today | Post-fix |
|---|---|---|
| "AI automation agency Melbourne" | Homepage + `/ai-automation-melbourne` + 12 service pages + Melbourne case study | Same — strong |
| "AI automation agency Sydney" | ❌ nothing | `/ai-automation-sydney` (new page) |
| "AI automation agency Brisbane" | ❌ nothing | `/ai-automation-brisbane` |
| "AI automation agency Perth" | ❌ nothing | `/ai-automation-perth` |
| "AI automation agency Adelaide" | ❌ nothing | `/ai-automation-adelaide` |
| "AI automation agency Australia" | Homepage only (weakly targeted) | `/ai-automation-australia` + homepage |
| "sales automation Sydney" | ❌ nothing | Service page with `areaServed: ['Sydney', ...]` in JSON-LD |
| "business automation Brisbane small business" | ❌ nothing | Service + location page combo |

Every P0-01 location page needs:
- Unique H1 (`AI Automation Sydney — Custom Workflows for Small Business | UnderCurrent`)
- City-specific FAQs (at least 2 of the 7 should mention the city by name)
- City-scoped industries section (Sydney = financial services, Brisbane = trades, Perth = mining/resources services, Adelaide = defence/manufacturing)
- Local CTA copy
- Internal links back to 3-4 service pages
- LocalBusiness schema `areaServed: { '@type': 'City', name: 'Sydney' }`

---

## Recommended fix order (ship-readiness)

**Week 1 (unblocks national ranking):**
1. Fix P0-02 (canonical domain — one file per side, Vercel redirect)
2. Fix P0-04, P0-05 (homepage schema cleanup + metadata)
3. Fix P0-06 (add phone + address to LocalBusiness + footer + contact)
4. Fix P0-03 (make LocationPage a server component, fix `@id`)
5. Fix P1-09 (canonicals on about/contact/process/audit)

**Week 2 (coverage expansion):**
6. Ship P0-01 — build 5 location pages (Sydney, Brisbane, Perth, Adelaide, Australia)
7. Fix P1-07 — expand AREAS_SERVED
8. Fix P1-11 — add social profiles to sameAs

**Week 3 (polish):**
9. P1-10 (contact page metadata + schema)
10. P1-13 (FAQ frontmatter migration)
11. P2-17, P2-18 (freshness, internal links)
12. P2-19 (WebPage schema)
13. Run Rich Results Test across every template page

---

## Architecture — what was built vs what the framework prescribes

| Framework requirement | Built | Gap |
|---|---|---|
| robots.txt with all AI crawlers | ✅ | None |
| XML sitemap auto-generated | ✅ | Domain mismatch (P0-02) |
| llms.txt | ✅ | None |
| SSR all content | ⚠ | LocationPage is client (P0-03) |
| Sitewide Organization + LocalBusiness + WebSite | ✅ | NAP incomplete (P0-06) |
| Per-page Article/Service/FAQ schema | ✅ | Homepage has dup Org (P0-04), articles fragile FAQ (P1-13) |
| Canonical per page | ⚠ | 5 pages missing |
| Named author everywhere | ✅ | None |
| Topic cluster architecture | ✅ | None |
| Location / geo coverage | ❌ | 1 of ~6 pages built (P0-01) |

---

## Risk flags

| Flag | Detail |
|---|---|
| Location-page fleet | Shipping 5 new location pages with the current `'use client'` LocationPage locks in the anti-pattern. Fix P0-03 first. |
| Phone number | Adding a phone means that phone is now part of public NAP. If it changes later, every directory / Google Business / citation must update. Pick a long-term number (1300 or mobile held by Luke personally). |
| Canonical domain switch | Once P0-02 is done, any already-indexed www pages will 301 — Search Console takes 4-6 weeks to reconcile. Submit both www and no-www sitemaps during transition. |
| `robots.txt` allows `anthropic-ai`, `Claude-Web`, `ClaudeBot` | Three separate Claude crawlers listed. Fine, but check the current Anthropic bot docs — some of these names are deprecated. |

---

## Out of scope for this pass (recommended follow-ups)

- Lighthouse / CWV baseline (Performance layer)
- Google Business Profile audit (separate — sits outside the repo)
- Backlink profile / domain authority (Ahrefs-side, not site-side)
- Reddit / social citation strategy (per vault `reddit-seo-ai-citation-strategy.md`)
- AI visibility measurement baseline (per vault `ai-visibility-measurement.md`) — would capture current ChatGPT/Perplexity citation rate before and after fixes

---

*End of cold audit. No fixes applied. Do not implement until priorities are confirmed with Luke.*
