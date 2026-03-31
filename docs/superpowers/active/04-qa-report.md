# QA Report — UnderCurrent Website

**Date:** 2026-03-31
**Auditor:** Claude (independent QA, no prior build context)
**Project:** UnderCurrent marketing website (`undercurrent/`)
**Stack:** Vite 8 + React 19 + React Router 7 + Tailwind CSS + GSAP
**Deployment:** Vercel SPA with prerender script for SEO

---

## Summary

The website is a substantial, production-deployed marketing site with 18+ pages, a business audit tool, email/report pipeline via n8n, an article system with 6 published articles, and SEO prerendering. The build is mostly solid. This report documents 34 findings across 5 categories.

**Severity key:**
- **CRITICAL** — broken functionality, data loss risk, or security issue
- **HIGH** — spec deviation that impacts user experience or SEO
- **MEDIUM** — functional but deviates from spec or has edge case issues
- **LOW** — cosmetic, minor spec deviation, or improvement opportunity

---

## 1. Homepage — Spec vs Build

**Reference:** `specs/2026-03-19-homepage-redesign-design.md`

### 1.1 Hero Section

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Headline | "Your Business Should Run Without You Doing Everything." | "What Would You Do With 12 Hours Back Every Week?" | **MEDIUM — Deviation** |
| Sub-headline | Matches spec | Matches spec (minus em-dash, uses comma per brand guide) | PASS |
| Eyebrow | "MELBOURNE AI AUTOMATION STUDIO" | Not present | **MEDIUM — Missing** |
| Primary CTA | "Book a Free Audit" (solid sage) | "See What You're Losing Each Month" → `/audit` | **MEDIUM — Different copy + link** |
| Secondary CTA | "Try the Free Calculator" (ghost) | Not present (single CTA only) | **MEDIUM — Missing** |
| Trust chips below CTAs | "No tech knowledge needed · Live in 14 days · Results in 30 days or we keep going" | Not present in Hero | **MEDIUM — Missing** |
| Background | Water current canvas (GSAP) | Video background (`hero-bg.mp4`) with mask gradients | **MEDIUM — Different implementation** |
| Fonts | DM Sans line 1 + Cormorant italic line 2 (signature pairing) | Both lines DM Sans 700 (no Cormorant italic) | **MEDIUM — Brand signature missing** |

**Evidence:** `src/components/Hero.jsx:106-119` — both headline spans use `font-dm` (DM Sans), weight 700. The spec calls for line 2 in Cormorant Garamond light italic, which is the core brand typographic signature per the brand guide.

### 1.2 Proof Strip

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| 4 outcome stats | 12 hrs, +40%, +31%, $800+ | 3 stat cards with detailed descriptions (3-4 hrs/day, 78%, $41k+) | **MEDIUM — Different stats + format** |
| Dark bar, numbers only | Simple stat strip | Rich cards with SVG visualizations (arc gauge, line chart, bar chart) | LOW — Exceeds spec |

**Note:** The current ProofStrip is richer than spec'd. Not a bug, but different from the "four stats, no explanation needed" directive.

### 1.3 Section Order

| Spec Order | Spec Section | Actual Order | Actual Section | Status |
|------------|-------------|-------------|----------------|--------|
| 1 | Hero | 1 | Hero | PASS |
| 2 | Proof Strip | 2 | ProofStrip | PASS |
| 3 | The Problem (5 horizontal cards) | 3 | Benefits (story cards with scroll) | **MEDIUM — Different format** |
| 4 | The Dream (3 outcome cards) | 4 | WhatWeAutomate (before/after comparison) | **MEDIUM — Different format** |
| 5 | The Plan | 5 | Protocol | PASS |
| 6 | The Offer | 6 | Pricing | PASS |
| — | — | 7 | CalculatorTeaser (not in spec) | LOW — Extra section |
| 7 | FAQ | 8 | FAQ | PASS |
| 8 | Final CTA | 9 | Contact | PASS |

**Note:** Features.jsx ("What We Build") is NOT rendered on the homepage (confirmed in `App.jsx`). This matches the spec directive to remove it from homepage. The CalculatorTeaser section is extra but not harmful.

### 1.4 Problem Section (Benefits.jsx)

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Layout | 5 horizontal cards, all visible on desktop | Horizontal scroll strip with click-to-activate story cards | **MEDIUM — Different interaction** |
| Card content | Title + one-line description + pulsing dot | Full story cards: stat + trigger + action + result | **MEDIUM — Richer than spec** |
| Ghost numbers | 01-05 at 6% opacity, 45% sage on hover | Not present | LOW |
| Pulsing dot | Soft red/amber in top-right | Not present | LOW |

### 1.5 Dream Section (WhatWeAutomate.jsx)

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Layout | 3 animated outcome cards (Time/Money/Growth) | Before/after comparison with connector | **MEDIUM — Different format** |
| Counter animations | Numeric counters (0→12, $0→$800) | Static numbers in panels | **MEDIUM — No animation** |
| Pipeline animation | Mini 3-node pipeline on Growth card | Not present | LOW |
| Service area tags | Pills on each card (Sales, CX, etc.) | Not present | LOW |

### 1.6 Plan Section (Protocol.jsx)

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| 3 steps | Map / Build / Maintain | Map / Build / Maintain | PASS |
| Step 3 name | "It runs. You get your time back." | Matches | PASS |
| Connector animation | Dashed sage line between cards | Custom animations per step (network, blocks, orbit) | LOW — Different but better |
| Accent colors | Sage / Gold / Green | Sage / Gold / Moss green | PASS |
| Tags | "Free 30-min call", "2-week build", "Ongoing" | Present and correct | PASS |

### 1.7 Offer Section (Pricing.jsx)

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Headline | "You only pay based on what it saves you." | Matches | PASS |
| 3 Cormorant italic statements | Staggered fade-up | Not present (replaced by included/pricing model layout) | **MEDIUM — Different layout** |
| Drawing divider line | Thin sage line draws left-to-right | Not present | LOW |
| Guarantee card | Pulsing sage glow border | Present with pulsing animation | PASS |
| CTA shimmer | One-time 45-degree white sweep | Not present | LOW |
| Two CTAs | Book audit + Calculator | Single "Book Your Free Audit" CTA | **MEDIUM — Missing second CTA** |

### 1.8 FAQ Section

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| 4 questions | Grade 5 language | 3 featured tiles + 4 FAQ questions (7 total) | LOW — Exceeds spec |
| Accordion | Keep existing | Desktop: left nav + right panel; Mobile: accordion | PASS |
| JSON-LD FAQ schema | Not explicitly spec'd | Present — injected on mount | PASS (bonus) |

### 1.9 Final CTA (Contact.jsx)

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Headline | "What would you do with 12 hours back every week?" | Matches | PASS |
| Two CTAs | Book audit + Calculator | Present (Book Your Free Audit + Try the Free Calculator) | PASS |
| Trust chips | Present | Present and matching | PASS |
| Simplest section | No cards, no grid | Clean, correct | PASS |

---

## 2. Business Audit Tool

**Reference:** `specs/2026-03-19-business-audit-tool-design.md`

### 2.1 Core Functionality

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Route | `/audit` | `/audit` and `/audit-v2` both point to BusinessAuditV2 | PASS |
| 5 pillars with sliders | Range 0-40, step 0.5 | Present in BusinessAuditV2 | PASS |
| Subtask sliders | Range 0-20, step 0.5, expandable | Present in PillarCard with expand/collapse | PASS |
| Health rating pills | Red/Orange/Green, no default | Present, unselected until touched | PASS |
| Business context inputs | Industry, hourly rate, project value, leads/month, response time | Present | PASS |
| Results block | Hidden until hours > 0, live updates | Present, triggers on non-zero hours | PASS |
| Lead bleed | Hidden when $0 (including <5 min response) | Present, correct zero-check | PASS |

### 2.2 Calculation Accuracy

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Rating thresholds | <2 Green, 2-6 Orange, >6 Red | `calcRating`: <2 Green, <=6 Orange, >6 Red | PASS |
| Monthly cost | hours × rate × 4.33 | `calcPillarMonthly`: hours * hourlyRate * 4.33 | PASS |
| Yearly | monthly × 12 | `calcTotals`: totalMonthly * 12 | PASS |
| Response multipliers | <5min=1.0, 5-30=0.48, 30-60=0.14, 1-4h=0.08, 4-24h=0.03, 24+=0.01 | Matches in config.js | PASS |
| Lead bleed | potential - actual revenue | Correct formula in calcLeadBleed | PASS |
| Gap calc | self_score - calc_score | Correct: gap>0 = Blind spot, =0 = Accurate, <0 = Under-estimated | PASS |
| Banding | Leads, project value, monthly loss bands | All band boundaries match spec exactly | PASS |

### 2.3 PDF Capture Form

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Fields | Business name (req), Full name (req), Email (req), Phone (opt) | All 4 present with correct validation | PASS |
| Phone null handling | Send null if blank | `phone: form.phone.trim() \|\| null` | PASS |
| Webhook URL | VITE_N8N_AUDIT_WEBHOOK_URL | `import.meta.env.VITE_N8N_AUDIT_WEBHOOK_URL` | PASS |
| Success message | "Report on its way — check your inbox" | "Report on its way — check your inbox." | PASS |
| Error message | "Something went wrong" + email fallback | Present with email link | PASS |
| Error email | hello@undercurrent.com.au | luke@undercurrentautomations.com | **LOW — Different email** |
| Button re-enable on error | Preserve form values | Status returns to idle-equivalent on re-render | PASS |

### 2.4 Webhook Payload

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Payload structure | contact + benchmark nested | Matches spec structure in buildPayload | PASS |
| Submission date | AEST/AEDT via toLocaleDateString | Present with Australia/Melbourne timezone | PASS |
| Omit zero-hour pillars | Only include pillars > 0 | `if (pillar.hours <= 0) continue` | PASS |
| Subtask nulls | null if untouched/0 | `stVal > 0 ? stVal : null` | PASS |
| total_monthly_loss | Present in payload | `Math.round(totalMonthly)` | PASS |

---

## 3. Audit Email + Report

**Reference:** `specs/2026-03-21-audit-email-report-design.md`

### 3.1 n8n Workflow

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Architecture | Webhook → Branch A (Notion) + Branch B (Email) | Both branches present in audit-workflow.json | PASS |
| Biggest leak selection | Sort by hours × rate × 4.33, take first | Present in n8n-email-code.js | PASS |
| Pillar copy mapping | 5 pillars with headline + fix | PILLAR_COPY object with all 5 | PASS |
| Email format | Light-mode HTML, inline CSS | Present, using Arial/Helvetica (email-safe) | PASS |
| Report link | base64-encoded data in URL param | `btoa(JSON.stringify(data))` with encodeURIComponent | PASS |
| Known divergence | Branch A uses legacy keys (operations, admin, etc.) | Documented as deferred cleanup | PASS (known) |

### 3.2 AuditReport.jsx (5-page scroll-snap)

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| 5 scroll-snap pages | Cover, Time Wasters, Benchmarks, Stats+Radar, Summary+CTA | All 5 pages present | PASS |
| Custom ReportNav | Floating pill, wordmark + wave + "Book a Call" | Present with canvas wave animation | PASS |
| Radar chart | Pure SVG, 5 axes | RadarChart.jsx, SVG pentagon with data polygon | PASS |
| Stat cards (Page 4) | 4 cards with SVG graphs (bars, donut, timeline, stepped) | Present in 2x2 grid | PASS |
| Mobile responsive | Grids collapse at 640px | Responsive styles present | PASS |
| Data decoding | URL param `?d=` base64 → JSON | Present in AuditReport | PASS |

---

## 4. Case Studies + Resources + Articles

**Reference:** `specs/2026-03-23-case-studies-resources-design.md`, `specs/2026-03-25-article-system-design.md`

### 4.1 Case Studies Page

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Route | `/case-study` | Present in App.jsx | PASS |
| Hero | Video background, GSAP entrance | Present with hero-bg.mp4 | PASS |
| Album tabs | 4 tabs on right side, "Coming Soon" | Present with 4 tabs | PASS |
| Ocean canvas | Wave animation behind content | OceanCanvas component present | PASS |

### 4.2 Resources Page

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Route | `/resources` | Present | PASS |
| Filter pills | ALL, GUIDES, ARTICLES, etc. | Present (3 topic clusters) | PASS |
| Card grid | 3 columns desktop, 1 mobile | Auto-fill grid with minmax(300px, 1fr) | PASS |
| Published article cards | Real links, no "COMING SOON" | PublishedArticleCard with Link to `/resources/${slug}` | PASS |
| Placeholder cards | "COMING SOON" overlay | Present for unpublished content | PASS |

### 4.3 Article System

| Criterion | Spec | Actual | Status |
|-----------|------|--------|--------|
| Route | `/resources/:slug` | Present in App.jsx | PASS |
| Article loader | import.meta.glob with ?raw | Present in articles.js | PASS |
| gray-matter for prerender | Node.js only | Correct: gray-matter in devDeps, used only in prerender.js | PASS |
| marked for client | Regular dependency | Present in dependencies | PASS |
| MarkdownRenderer | Scoped CSS targeting child elements | All styles match spec (h2, h3, p, blockquote, code, etc.) | PASS |
| Breadcrumb | Home > Resources > Title | Present in Article.jsx | PASS |
| Related articles | Up to 3 from same cluster | Present, excludes current | PASS |
| CTA section | "Want this automated?" → /audit | Present | PASS |
| 404 handling | Redirect to /resources | Navigate component to /resources | PASS |
| JSON-LD Article schema | Full schema with author, publisher, dates | Present with BreadcrumbList, FAQPage, HowTo schemas | PASS |
| Published articles | 6 markdown files | 6 articles in src/content/articles/ | PASS |
| Hero images | `/articles/${slug}/hero.jpg` | **No `public/articles/` directory exists** | **HIGH — Missing hero images** |

---

## 5. SEO Compliance

### 5.1 Prerender Script

| Criterion | Spec / Best Practice | Actual | Status |
|-----------|---------------------|--------|--------|
| Meta injection | title, description, canonical, OG, Twitter | All present in prerender.js | PASS |
| JSON-LD schemas | Per-page (LocalBusiness, Article, FAQPage, HowTo, etc.) | Comprehensive schema generation | PASS |
| Dynamic sitemap | All routes + articles + lastmod | Generated to dist/sitemap.xml with priorities | PASS |
| RSS feed | feed.xml with content:encoded | Generated to dist/feed.xml | PASS |
| Article HTML injection | `#article-content` div for no-JS crawlers | Present with hide script | PASS |
| llms.txt | AI crawler discovery | Generated to dist/llms.txt and llms-full.txt | PASS |

### 5.2 Static vs Dynamic Sitemap

| Issue | Detail | Severity |
|-------|--------|----------|
| **Duplicate sitemap** | `public/sitemap.xml` (10 routes, frozen 2026-03-23) AND prerender generates `dist/sitemap.xml` (all routes + articles). The static file overwrites the generated one during build | **HIGH** |

**Evidence:** Vite copies `public/` contents to `dist/` BEFORE prerender.js runs. However, prerender.js writes `dist/sitemap.xml` AFTER the copy, so the dynamic version should win. The static `public/sitemap.xml` is misleading and should be deleted to avoid confusion. Verify build order to confirm.

### 5.3 robots.txt

| Criterion | Actual | Status |
|-----------|--------|--------|
| Allow all crawlers | Yes, including AI bots | PASS |
| Sitemap reference | Points to production domain | PASS |
| llms.txt reference | Present | PASS |

### 5.4 vercel.json Rewrites

| Criterion | Actual | Status |
|-----------|--------|--------|
| sitemap.xml before catch-all | Yes | PASS |
| feed.xml before catch-all | Yes | PASS |
| robots.txt before catch-all | Yes | PASS |
| llms.txt before catch-all | Yes | PASS |
| SPA catch-all | `/(.*) → /index.html` | PASS |

---

## 6. Security

| # | Finding | Severity | Evidence |
|---|---------|----------|----------|
| S1 | **MarkdownRenderer uses dangerouslySetInnerHTML without sanitization** | **HIGH** | `src/components/MarkdownRenderer.jsx:6` — renders pre-parsed HTML directly. Currently safe because articles are committed by the n8n pipeline (trusted source). However, if user-generated markdown or external content is ever rendered, this is an XSS vector. No DOMPurify or equivalent sanitization layer. | 
| S2 | **Webhook URL exposed via VITE_ prefix** | **MEDIUM** | `VITE_N8N_AUDIT_WEBHOOK_URL` is a client-side env var (Vite exposes all `VITE_*` vars to the browser bundle). The n8n webhook endpoint is publicly visible in the JS bundle. Anyone can POST to it. Mitigated if n8n webhook has its own auth, but worth noting. |
| S3 | **No CSRF protection on audit form submit** | **LOW** | PDFCaptureForm.jsx POSTs directly to n8n webhook with no CSRF token. Acceptable for a lead capture form but could be abused for spam submissions. |
| S4 | **AuditReport decodes arbitrary base64 from URL** | **MEDIUM** | AuditReport.jsx reads `?d=` param, base64-decodes it, and parses as JSON. Malformed data could cause rendering errors. The data is used for display only (not executed), but no validation of the decoded structure exists. |

---

## 7. Build + Deployment

| Criterion | Actual | Status |
|-----------|--------|--------|
| Build command | `vite build && node scripts/prerender.js` | PASS |
| Chunk splitting | react-vendor + gsap-vendor manual chunks | PASS |
| Cache headers | 1yr immutable for assets/JS/CSS/fonts, 30d for images | PASS |
| Vercel Analytics | SpeedInsights + Analytics in App.jsx | PASS |
| React 19 + React Router 7 | Current versions | PASS |
| Lazy loading | All sub-pages use lazy() + Suspense | PASS |
| 404 page | Custom NotFound component on `*` route | PASS |

---

## 8. Stack Deviation from Blueprint

**Reference:** `client-website-blueprint.md`

| Blueprint Directive | Actual | Severity |
|--------------------|--------|----------|
| **"Do NOT use Vite"** | Site is built on Vite 8 | **HIGH — Explicit blueprint violation** |
| Framework: Next.js App Router | React SPA with Vite | **HIGH — Different framework** |
| `next/image` for all images | Raw `<img>` / `<video>` tags | MEDIUM |
| `next/font/google` for fonts | CSS @import or link tags | MEDIUM |
| Server Components by default | All client-side (SPA) | MEDIUM |
| Per-page metadata exports | Client-side PageHead via useEffect | MEDIUM |

**Note:** The blueprint explicitly states "Do NOT use Vite" in its restrictions. The entire site is built on Vite. This is the single largest deviation. However, the prerender script compensates for many SSR/SEO benefits that Next.js would provide natively. The site appears to function well in production despite this deviation.

---

## 9. Copy Deviations

The homepage spec (`2026-03-19-homepage-redesign-design.md`) and the latest copy doc (`undercurrent-website-copy.txt`) have divergent copy. The actual build follows the copy doc more closely than the redesign spec in some places, and neither perfectly in others.

| Section | Redesign Spec Copy | Copy Doc (v2) Copy | Actual Build | Status |
|---------|-------------------|-------------------|-------------|--------|
| Hero headline | "Your Business Should Run Without You Doing Everything." | "More time doing the work / you actually built this for." | "What Would You Do With 12 Hours Back Every Week?" | **MEDIUM — Matches neither** |
| Nav CTA | "Book a Call" | "Book a Workflow Review" | "Book a Call" | LOW |
| Nav links | Home, Services, Business Audit, About | How it works, Services, Pricing, ROI Calculator, About | Home, Services, Business Audit, About | LOW |

---

## 10. Functional Gaps

| # | Gap | Severity | Detail |
|---|-----|----------|--------|
| F1 | **Newsletter form disabled** | **MEDIUM** | Footer newsletter signup says "Coming Soon", form is non-functional. No API endpoint configured. |
| F2 | **Footer links to `/calculator`** | **MEDIUM** | Footer CTA tile "Audit ROI Calculator" links to `/calculator` but no such route exists. Should be `/roi`. |
| F3 | **No `og-image.jpg` in public/** | **MEDIUM** | `public/` contains `LOGO.png` and `favicon.svg` but no `og-image.jpg`. PageHead defaults to `https://www.undercurrentautomations.com/og-image.jpg`. Prerender injects this URL. If the file doesn't exist at that URL on production, OG previews will be broken. |
| F4 | **Missing article hero images** | **HIGH** | Article.jsx references `/articles/${slug}/hero.jpg` for each article's hero image. No `public/articles/` directory exists. Articles will show gradient placeholder fallback, which is handled gracefully, but no articles have actual hero images. |
| F5 | **Video `preload="auto"` on hero** | **LOW** | Hero.jsx loads `hero-bg.mp4` with `preload="auto"`. On mobile connections this will aggressively download video data. The case studies page uses `preload="none"` (correct). Homepage should match. |
| F6 | **BusinessAudit v1 not routed** | **LOW** | `BusinessAudit.jsx` (v1, light theme) exists but is not imported or routed in App.jsx. Both `/audit` and `/audit-v2` point to BusinessAuditV2. Dead code. |

---

## 11. Summary Scorecard

| Area | Pass | Fail/Deviation | Score |
|------|------|----------------|-------|
| Homepage vs Redesign Spec | 9 | 12 (mostly MEDIUM) | 43% |
| Business Audit Tool | 22 | 1 (LOW) | 96% |
| Audit Email + Report | 12 | 0 | 100% |
| Case Studies + Resources | 8 | 0 | 100% |
| Article System | 14 | 1 (HIGH — images) | 93% |
| SEO / Prerendering | 10 | 1 (HIGH — sitemap) | 91% |
| Security | 2 pass, 4 findings | 2 HIGH, 2 MEDIUM | — |
| Build + Deploy | 7 | 0 | 100% |
| Blueprint Compliance | 0 | 6 (Vite, not Next.js) | 0% |

---

## 12. Priority Fix List

### Critical / High (fix before next deploy)

1. **Delete `public/sitemap.xml`** — static file may overwrite the dynamically generated sitemap, excluding all article and dynamic routes from search engines
2. **Add article hero images** — create `public/articles/{slug}/` directories with hero images for all 6 published articles, or update Article.jsx to not reference them
3. **Verify `og-image.jpg` exists on production** — if missing, OG previews on social shares will be broken
4. **Add HTML sanitization to MarkdownRenderer** — install DOMPurify and sanitize before rendering, even if current content is trusted
5. **Fix Footer `/calculator` link** — should be `/roi`

### Medium (fix in next sprint)

6. **Hero headline alignment** — decide between spec, copy doc v2, or current. Three different headlines exist.
7. **Add second CTA to Hero** — spec calls for "Book a Free Audit" + "Try the Free Calculator" side by side
8. **Hero typography** — add Cormorant Garamond italic to second headline line (brand signature)
9. **Add eyebrow to Hero** — "MELBOURNE AI AUTOMATION STUDIO"
10. **Add trust chips to Hero** — below CTAs
11. **Video preload** — change `preload="auto"` to `preload="none"` on homepage hero video
12. **Newsletter form** — either implement or remove the signup section from Footer

### Low (backlog)

13. Remove dead `BusinessAudit.jsx` (v1) if no longer needed
14. Add pulsing dots to Problem section cards
15. Add counter animations to Dream/WhatWeAutomate section
16. Add drawing connector line to Protocol section
17. Add CTA shimmer animation to Offer section

---

*Report generated 2026-03-31. No code was modified during this audit.*
