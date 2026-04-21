# Uncommitted work brief — UnderCurrent website

**Date:** 2026-04-21
**Purpose:** survey every file currently sitting uncommitted in the working tree, say what each one does in plain terms, flag dependencies and risk. Written to be verifiable — every claim cites a specific file path and (where useful) line range or diff fragment. Re-run `git diff <path>` to confirm.
**Author:** Claude (session: ship 5 location pages on v2 design, 2026-04-20 → 2026-04-21)
**Shipped this session:** commit `60bbfeb` — 5 new location pages + Melbourne refresh + QA report + screenshots. On `main`, deployed.
**NOT shipped this session:** everything in this brief.

## Verification command

From repo root:

```sh
git status
git diff <path>                 # per file below
git log -1 --format=%H -- main
```

Everything below is claims I made in-session, cross-referenced to real diffs. If anything doesn't match the diff, assume I got it wrong and overrule me.

---

## Cluster 1 — Finish the SEO audit (big batch, depends on itself)

All of this was in-flight from a previous session, picking up items in `docs/seo-aio-audit-2026-04-20.md`. The pieces interlock — the blog page change reads frontmatter the migration script wrote, the footer change pairs with the layout change for NAP coverage, the breadcrumb rewrite supports the breadcrumb additions on blog/case-study pages.

### 1a. Sitewide Organization + LocalBusiness schema expansion

**File:** `app/layout.js` (+46 / -1)
**What it does:** beefs up the sitewide JSON-LD entity graph.

Adds to `Organization`:
- `foundingDate: '2026-03-07'` (was `'2026'`)
- `taxID: '23 368 496 814'`
- `telephone: '+61438780815'`
- `email: 'luke@undercurrentautomations.com'`
- `contactPoint: [...]` — two ContactPoint nodes (customer service + sales)
- `areaServed`: adds Sydney, Brisbane, Perth, Adelaide, Canberra (was just Melbourne + VIC + Australia)
- `sameAs`: adds X (UC_Automations), Instagram, Facebook, Google Maps entity URL

Adds to `LocalBusiness`:
- `telephone`, `email`
- Same `areaServed` expansion
- `openingHoursSpecification: Mon-Fri 09:00-17:00`
- `hasMap: <google maps URL>`

Addresses audit P0-06.

**Risk:** medium. Sitewide metadata, but JSON-LD only — no layout change.

### 1b. Footer visible NAP + heading-level fix

**File:** `components/layout/Footer.js` (+40 / -3)
**What it does:**
- Adds Phone (`0438 780 815`), Hours (`Mon–Fri 09:00–17:00 AEDT`), ABN (`23 368 496 814`) rows to the contact `<dl>`
- Swaps nav-column titles from `<h4>` to `<h3>` (heading hierarchy fix)
- My em-dash patch on `aria-label="UnderCurrent Automations, home"` (was `—`)

Pairs with 1a (JSON-LD) so the visible NAP and the structured NAP match.

**Risk:** low. Additive; visible in footer on every page.

### 1c. www vs no-www canonical fix

**Files:**
- `app/robots.js:37` — `sitemap:` value flips from `www.undercurrentautomations.com` to `undercurrentautomations.com`
- `app/sitemap.js:7` — `BASE` same flip

Addresses audit P0-02. Currently the sitemap URL and canonical URLs are inconsistent — this fixes it.

**Risk:** low for visitors, medium for Search Console. Once deployed, Google will see sitemap URLs moved domains and reconcile over 4-6 weeks. Recommended to submit both www and no-www sitemaps in GSC during the transition per the audit's risk flags.

### 1d. Homepage schema cleanup

**File:** `app/page.js` (+29 / -13)
**What it does:** removes a bare `Organization` JSON-LD that was duplicating the sitewide one, replaces with a `WebPage` node bound by `@id` to the sitewide Organization + WebSite. Also adds page-level `metadata` (canonical, openGraph, twitter).

Addresses P0-04 (duplicate Organization), P0-05 (missing canonical on homepage).

**Risk:** low.

### 1e. Canonicals on static pages

**Files (all +9 to +40 lines, no deletions):**
- `app/about/page.js`
- `app/audit/page.js`
- `app/contact/page.js`
- `app/process/page.js`

Each adds `alternates.canonical` + `openGraph` + `twitter` metadata. Addresses audit P1-09.

`app/contact/page.js` also adds a visible block showing email, phone, Melbourne + hours (pairs with the schema).

**Risk:** low. Additive metadata only (contact also adds a visible block).

### 1f. Blog + case-study pages: breadcrumb + frontmatter FAQs

**Files:**
- `app/blog/[slug]/page.js` (+26 / -2)
- `app/case-studies/[slug]/page.js` (+10 / 0)

Both import the rewritten `Breadcrumb` and render it at the top of the hero.

Blog page also changes `extractFaqs(html)` to `extractFaqs(frontmatter, html)` — prefers a structured `faqs:` array in the article's YAML frontmatter, falls back to HTML regex on articles that haven't been migrated yet.

Addresses audit P1-13 (fragile FAQ regex). The migration was run via `scripts/migrate-article-faqs.mjs` and wrote `faqs:` into all 16 articles.

**Risk:** low functionally. If the regex and frontmatter produce different FAQ sets on any given article, the schema will now match frontmatter (which may or may not match what visitors see — worth spot-checking one article).

### 1g. Article frontmatter migration

**Files:** 16 × `content/articles/*.md`
**What changed:** YAML frontmatter gained a `faqs:` array block. Example (verified on `what-is-business-process-automation-australia.md`):

```yaml
faqs:
  - q: 'What is the simplest business process automation example for small businesses?'
    a: 'Email follow-ups after someone fills out a contact form...'
  - q: 'Do I need technical skills...'
    a: '...'
  # 6–8 more per article
```

No body changes, only frontmatter.

**Risk:** low. Only consumed by the blog page code in 1f. Verified matches the visible `## Frequently Asked Questions` section via the one-off migration script.

### 1h. Migration script

**File:** `scripts/migrate-article-faqs.mjs` (new, 46 lines)
**What it does:** one-off Node script that read each article's HTML `## Frequently Asked Questions` section and wrote it into YAML frontmatter. Idempotent (skips already-migrated files). Was run to produce the 16 article diffs in 1g.

**Ship decision:** safe to commit as a repo artefact, but it's a one-off — won't re-run unless you call it. Not deployed (under `scripts/`, not `app/`).

### 1i. Breadcrumb component rewrite

**File:** `components/layout/Breadcrumb.js` (+38 / -17)
**What it does:** the old component used Lucide's `ChevronRight` icon and Tailwind utility classes that don't exist on this project (`text-muted`, `text-charcoal`, `text-border`). It was probably broken or styled-wrong. The rewrite:
- Drops Lucide dependency, uses a text `›` separator
- Switches to CSS-variable colour tokens via arbitrary-value Tailwind classes
- Adds `tone="light"` prop for use on light-background sections
- Adds `aria-current="page"` on the last item

**Risk:** medium. The old breadcrumb was imported by 3 places; the rewrite changes the visual style everywhere it's used (now including blog, case-studies, services, locations).

### Cluster 1 dependency notes

- **Layout.js + Footer.js** must ship together for the NAP story to be consistent.
- **Blog page + article frontmatter** must ship together or FAQs may disappear on some articles (the fallback regex should cover this, but verify).
- **Breadcrumb rewrite** is imported by service, blog, and case-study pages in this batch — it must ship before or with them.

My recommendation: ship Cluster 1 as ONE commit, tested end-to-end. Goes through `/qa` first in a fresh session.

---

## Cluster 2 — Service page date + areas served

Independent of Cluster 1, but complementary. Could ship with it or standalone.

### 2a. Auto-derived "last reviewed" date

**File:** `components/pages/ServicePage.js` (+32 / -6)
**What it does:** replaces hardcoded `DEFAULT_SERVICE_DATE_MODIFIED = '2026-04-19'` with a function that reads the last commit date of `lib/data/services.js` via `execSync('git log -1 --format=%cI -- lib/data/services.js')`. Falls back to `'2026-04-19'` if git isn't available (sandboxed builds).

Also: removes a ternary with identical branches (audit P3-22 cleanup), wires the rebuilt Breadcrumb component.

**Risk:** low, but verify Vercel's build environment has git history (it does by default for cloned repos). Fallback handles the edge case.

### 2b. AREAS_SERVED expansion

**File:** `lib/data/seo.js` (+5 / -1)
**What it does:** expands the shared `AREAS_SERVED` array from `['Melbourne', 'Victoria', 'Australia']` to the full 13-entry list (6 cities + 6 states/territories + Australia). Consumed by every service page's JSON-LD.

**Note:** my location-pages work ALREADY depends on the new list being present. This file was already modified when I started today. I did not touch it.

**Risk:** low. Flows into every service page's JSON-LD `areaServed` automatically.

---

## Cluster 3 — Hero performance (tiny)

### 3a. LCP poster

**File:** `components/sections/Hero.js` (+3 / 0)
**What it does:** adds `poster="/hero-poster.jpg"` to the hero video. Paints the poster image immediately while the video streams in behind it. Improves LCP (Largest Contentful Paint) — a Core Web Vital.

**File:** `public/hero-poster.jpg` (new asset)
**What it is:** the image used for that poster.

**Risk:** zero. Pure performance win. Fallback visual when prefers-reduced-motion is on.

---

## One-offs

### 4a. Heading hierarchy fix

**File:** `components/sections/BeforeAfter.js` (+2 / -2)
**What it does:** swaps `<h4>` to `<h3>` on Before/After panel headlines. Accessibility fix — the page was skipping h3.

**Risk:** zero.

### 4b. Sitewide text opacity bump

**File:** `app/globals.css` (+2 / -2)
**What it does:**
- `--text-muted` opacity: `0.42` → `0.60`
- `--text-faint` opacity: `0.22` → `0.28`

Makes muted and faint text **brighter everywhere**. Sitewide. Probably an accessibility/contrast pass.

**Risk:** visual. Every page that uses these tokens (most of them) will look subtly different. Worth eyeballing the homepage and a service page before/after.

### 4c. Header em-dash fix

**File:** `components/layout/Header.js` (+2 / -2)
**What it does:** my patch to remove em dashes from two `aria-label="UnderCurrent Automations, home"` attributes (was `—`). QA finding from today's session.

**Risk:** zero.

---

## Experiments (probably should not ship to production)

### 5a. About page concepts explorer

**Files:**
- `app/about-concepts/page.js`
- `app/about-concepts/ConceptSwitcher.js`

**What it is:** an internal design-exploration page with a concept switcher. Set to `robots: { index: false }` so it won't be indexed, but would be publicly reachable at `/about-concepts` if committed.

**Ship decision:** leave uncommitted unless you want an internal scratch URL. Low value, zero risk.

### 5b. Service-page preview index

**Files:**
- `app/services/preview/page.js`
- `lib/preview/sales-automation-content.js`

**What it is:** an index/landing page for the existing `/services/preview/v5a` reference (already shipped). Set to `robots: { index: false }`. Describes itself as a reference that can be deleted once every service uses the V5a template.

**Ship decision:** same — leave uncommitted unless you want the URL.

---

## Docs (no site impact regardless)

- `docs/seo-aio-audit-2026-04-20.md` — the audit itself
- `docs/location-pages-build-prompt.md` — the build brief I worked from today
- `docs/next-session-handoff.md` — handoff brief from the previous session for picking up Cluster 1
- `docs/active/cutover-2026-04-20/04-qa-report.md` + `-v2.md` — historical QA reports from the production cutover

Markdown under `docs/` is not served by Next.js. These are repo-internal notes. Commit or leave, no site impact.

---

## Next actions (recommended order)

1. **Start a fresh session** (this one is at ~36% context).
2. In the fresh session, run `/qa` against Cluster 1 to get a cold-read audit of the 30-odd files. Use `docs/next-session-handoff.md` as the input brief — it was written for exactly this.
3. Fix anything `/qa` flags.
4. Commit Cluster 1 as one coherent commit, push to main.
5. Decide on Cluster 2 and 3 separately (low risk, can ship same day or the next).
6. Decide on the globals.css opacity bump — eyeball the site before/after.
7. Decide on experiments (leave vs. commit for internal URL).

---

## Open questions for me when you pick this up next

- The breadcrumb rewrite (1i) uses Tailwind v4 arbitrary-value classes like `text-[color:var(--text-muted)]`. Verify that syntax actually works at build time in this Tailwind v4 config — if not, the breadcrumb will render with no colour.
- Cluster 1f changes FAQ extraction logic. Verify one blog article post-migration actually renders the right FAQs at `/blog/<slug>` before shipping.
- `ServicePage.js` git-log auto-date (2a): confirm Vercel build fetches full git history. If it fetches shallow, the fallback kicks in and every service reads `2026-04-19` regardless.

---

*End of brief. Re-verify by running `git diff <path>` against any file above. If I got a detail wrong, update this file and overrule me.*
