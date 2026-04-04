# UnderCurrent Website Redesign 2026 - Research Synthesis

**Date:** 2026-04-04
**Status:** Ready for implementation planning
**Audience:** Luke Marinovic (solo operator, AI-assisted build)

---

## 1. Executive Summary

The current React + Vite SPA has a critical SEO deficiency: PageHead.jsx uses client-side useEffect to set meta tags, meaning crawlers see no metadata on any page. Migrating to Next.js App Router with server-rendered metadata is the single highest-value change. The redesign should use Next.js 15.x with App Router, Tailwind v4, and a clean white/charcoal/steel blue design system using Space Grotesk and Satoshi typography. All form submissions must route through Next.js Route Handlers to n8n webhooks (never exposing n8n URLs to the browser), replacing the current mailto: contact form and browser-direct audit webhook. The vercel.json SPA catch-all rewrite must be deleted before deploy or it will silently break all SSR. A root-level [slug] collision between location pages and service pages is the trickiest architectural problem and must be solved with a single dispatcher page. Estimated effort is 6-10 AI-assisted sessions, with the main complexity in metadata migration and dynamic route generation.

---

## 2. Approach Rankings

### Rank 1: Next.js App Router on Vercel (Recommended)

**Feasibility:** High. Existing codebase is React, so component reuse is straightforward. AI-assisted migration is well-supported. Vercel free tier handles this site's traffic with headroom.

**Client fit:** Perfect. Server-rendered metadata fixes the SEO gap immediately. Route Handlers give a clean proxy layer to n8n. Vercel's deploy preview URLs let Luke verify every page before domain swap. The ecosystem (next/font, next/image, @vercel/analytics) eliminates several standalone dependencies.

**Trade-offs:** Caching model can get complex if dynamic features are added later. Major version upgrades require 1-3 hours with codemods.

### Rank 2: Astro with React Islands

**Feasibility:** Medium. Architecturally cleaner for a mostly-static marketing site. Ships zero JS by default, hydrates only interactive components.

**Why it loses:** Switching from React Router to Astro's routing model is a full rewrite, not a migration. The interactive components (BusinessAuditV2, ROICalculator, MissedRevenueAudit) use heavy client-side state and GSAP. Luke's AI-assisted workflow is optimised for React/Next.js, not Astro. The switching cost outweighs the architectural benefit.

### Rank 3: Keep Vite SPA, Add Prerendering

**Feasibility:** Low. scripts/prerender.js already exists but the PageHead.jsx problem is fundamental to the SPA architecture. Bolting SSR onto Vite is fighting the framework. Every new page would need manual prerender config.

**Why it loses:** Does not solve the core SEO problem cleanly. Maintenance burden grows with every page addition.

### Rank 4: Pages Router

**Not recommended.** Pages Router is in maintenance mode. Starting a new project on it creates migration debt from day one.

---

## 3. Tech Stack Decisions

### Use

| Package | Purpose | Notes |
|---|---|---|
| Next.js 15.x | Framework | App Router, React 19 |
| React 19 | UI library | Ships with Next.js 15 |
| Tailwind v4 | Styling | CSS-native config, stable since Jan 2025, avoids future v3-to-v4 migration |
| gray-matter v4 | Markdown frontmatter | Lightweight, well-maintained |
| remark + remark-html | Markdown rendering | Simple pipeline, no heavy MDX tooling needed |
| lucide-react | Icons | Tree-shakeable, consistent with design system |
| @vercel/analytics | Analytics | Import from `/next` variant, place in app/layout.js |
| @vercel/speed-insights | Performance | Import from `/next` variant, place in app/layout.js |
| resend | Transactional email | Replace mailto: hack for contact form confirmation |
| next/font/google | Space Grotesk | Eliminates render-blocking Google Fonts link |
| next/font/local | Satoshi | Download woff2 from Fontshare, commit to public/fonts/ |

### Remove

| Package | Reason |
|---|---|
| gsap / ScrollTrigger | 45KB+, overkill for 250ms fade reveals. Replace with existing useFadeIn hook (IntersectionObserver + CSS) |
| framer-motion / motion | 18-46KB for no benefit in a minimal-animation design |
| marked | Replaced by remark pipeline |
| react-router-dom | Replaced by Next.js file-based routing |
| contentlayer | Unmaintained, do not adopt |
| next-mdx-remote | Overkill for simple markdown blog articles |

### Font Strategy

- **Space Grotesk** (H1, H2): `next/font/google` with `subsets: ['latin']`, variable font
- **Satoshi** (H3, body): `next/font/local` with woff2 files in `public/fonts/`, downloaded from Fontshare and committed to repo
- Both fonts assigned to CSS custom properties in app/layout.js, referenced in Tailwind config

### Tailwind v4 Decision

Use v4. The CSS-native config model (`@theme` in CSS instead of tailwind.config.js) is stable and avoids a v3-to-v4 migration later. The config rewrite is a one-time cost during this migration. Import globals.css in app/layout.js, update content paths.

---

## 4. Design System and UX Patterns

### Homepage Section Flow (Recommended Order)

1. **Hero** - Headline with staggered reveal (250ms), subhead, "Book a Call" CTA (Cal.com direct link), compressed hero-bg video or static fallback
2. **Trust Strip** - Key stats (clients served, hours saved, etc.), horizontal row, monochrome
3. **Problem Frame** - "You're losing money to manual processes" outcome language
4. **Services Overview** - Card grid linking to service detail pages
5. **Industry Scroller** - Slow CSS infinite marquee (30-50s cycle), pill tags, steel blue/monochrome, pause on hover. No logos, no fast scroll.
6. **Process** - 3-4 step visual, outcome-focused language
7. **Comparison Tables** - 3-column (DIY | Big Agency | UnderCurrent), outcome language not feature ticks, honest about trade-offs, short prose intro before table
8. **Pricing** - "Starting from" anchors per tier with scope descriptions. Never hide all pricing behind "contact us".
9. **Testimonials** - Real quotes, name + business type
10. **FAQ** - First question open by default, 40-100 words per answer, FAQPage JSON-LD schema, link answers to relevant service pages. Source questions from real enquiries.
11. **Final CTA** - "Book a Call" repeat

### Animation Rules

**Do:**
- Micro-interactions on hover/focus states
- Fast scroll reveals (250ms) via IntersectionObserver + CSS transitions
- Stagger hero headline words/lines
- CSS infinite marquee for industry scroller

**Do not:**
- Parallax scrolling
- Gradient mesh / aurora backgrounds
- Text scramble or glitch effects
- Preloader animations
- Lottie section backgrounds
- Fast marquees (disorienting)
- Any animation library (Framer Motion, GSAP) in the new build

### Comparison Table Format

```
             DIY          Big Agency      UnderCurrent
Cost         Free/cheap   $5-15K/mo       Starting from $X/mo
Setup        Weeks/months Weeks           Days
Ownership    You build    They own it     You own it
Support      Forums       Account manager Direct access
```

Use outcome language: "Leads answered in 2 minutes" not "AI chatbot integration". Acknowledge honestly where DIY or agencies win on specific dimensions.

### Pricing Display

Show "Starting from" price anchors. Include scope descriptions in plain language ("Up to 3 automations", "Includes monthly optimisation call"). Do not use feature tick matrices. Link each tier's CTA to Cal.com booking with a pre-filled tier parameter if possible.

---

## 5. n8n Lead Flow Architecture

### Current State (Broken)

```
Browser → mailto: link → email (loses leads, no tracking)
Browser → n8n webhook directly (exposes URL, no validation)
```

### Target State

```
Browser → POST /api/contact     → n8n /webhook/contact-form     → Notion CRM + Gmail + Telegram
Browser → POST /api/qualify      → n8n /webhook/lead-qualifier   → Score → Route by tier → Personalised response
Browser → POST /api/audit        → n8n /webhook/business-audit   → Process → Return results
Cal.com → Webhook                → n8n /webhook/cal-booking      → Notion CRM + Gmail + Telegram
```

### Route Handler Pattern (All Forms)

Every form submission follows this pattern:

1. Browser POSTs to Next.js Route Handler (`/api/[endpoint]`)
2. Route Handler validates input, checks honeypot field, enforces rate limit + body size limit
3. Route Handler POSTs to n8n webhook with `X-Webhook-Secret` header (server-only env var)
4. n8n webhook responds immediately (responseMode: "onReceived"), processes async
5. Route Handler returns success/error to browser

### Security Layers

| Layer | Implementation |
|---|---|
| Honeypot | Hidden field in every form, reject if filled |
| Webhook secret | `N8N_WEBHOOK_SECRET` in server env (no NEXT_PUBLIC_ prefix) |
| Rate limiting | By IP, in Route Handler middleware |
| Body size | Limit in Route Handler |
| Bot detection | Turnstile as backup only if spam becomes a problem. No reCAPTCHA v2 (kills conversion). |

### Cal.com Webhook Flow

Cal.com is already set up. The n8n workflow handles:

1. Webhook node receives BOOKING_CREATED / BOOKING_RESCHEDULED / BOOKING_CANCELLED
2. IF node filters by event type
3. Code node extracts prospect details
4. Notion CRM entry created/updated
5. Gmail notification to Luke
6. Telegram ping
7. (Optional) Pre-call email to prospect with agenda/prep questions

### Environment Variables (Server Only)

```
N8N_WEBHOOK_SECRET=<secret>
N8N_CONTACT_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/contact-form
N8N_AUDIT_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/business-audit
N8N_QUALIFIER_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/lead-qualifier
```

None of these get the `NEXT_PUBLIC_` prefix. They are only accessible in Route Handlers and Server Components.

### CRM Separation

Create a separate "Website Leads" Notion database, distinct from the outreach CRM. Website leads have different qualification signals and lifecycle than outbound prospects.

---

## 6. Risk Register

### P0 - Must Fix Before Production Deploy

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 1 | PageHead.jsx produces no server-rendered meta tags | Crawlers see no SEO metadata on any page. Already hurting rankings. | Replace entirely with Next.js `metadata` export or `generateMetadata()` per page. Move JSON-LD to server-rendered `<script>` tags in layout/page files. |
| 2 | vercel.json SPA catch-all rewrite `/(.*) -> /index.html` | If copied to Next.js project, silently breaks all SSR routing. Every page serves index.html. | Delete the rewrite rule. Do not copy vercel.json rewrites to the new project. |
| 3 | Root-level [slug] collision: location slugs and service slugs share URL namespace | `/ai-automation-melbourne` and `/customer-experience-automation` both resolve to `app/[slug]/page.js` | Single `app/[slug]/page.js` with combined `generateStaticParams()` pulling from both location and service data. Dispatcher checks slug against both lists. Set `dynamicParams = false`. Call `notFound()` for unknown slugs. |

### P1 - Must Fix Before Go-Live

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 4 | URL mismatch between old and new site | Lost SEO equity, broken inbound links | Crawl current production site before migration. Diff crawl output against `generateStaticParams()` output from Next.js preview build. Every URL must match exactly. |
| 5 | Article pages are client-rendered (useParams + client-side markdown) | Zero SEO value from blog content | Convert to server-rendered pages with `generateStaticParams()` and `generateMetadata()`. Massive SEO improvement. |
| 6 | Google Fonts `<link>` tags in index.html | Render-blocking, hurts LCP | Replace with `next/font/google`. Do not copy `<link>` tags. |
| 7 | `'use client'` boundary errors on interactive components | GSAP `registerPlugin(ScrollTrigger)` at module level crashes server components | Mark BusinessAuditV2, ROICalculator, MissedRevenueAudit page files as `'use client'`. In new build, replace GSAP with CSS transitions, but during migration, client boundary is the safe path. |
| 8 | Tailwind config migration | Broken styles if content paths are wrong | Update content paths for App Router structure. Import globals.css in app/layout.js. Use Tailwind v4 CSS-native config. |
| 9 | Prerender script outputs not ported | Missing sitemap.xml, robots.txt, llms.txt, feed.xml | Port to Next.js conventions: `app/sitemap.js`, `app/robots.js`, Route Handlers for feed.xml and llms.txt. Audit scripts/prerender.js output before migration. |
| 10 | AuditReport.jsx reads React Router navigation state | State passing mechanism does not exist in Next.js | Replace with URL search params or localStorage. URL params preferred for shareability. |
| 11 | Big bang deploy risk | Broken pages discovered after domain swap | Full preview URL testing of every route before domain swap. Use Vercel instant rollback if issues found post-deploy. |

### P2 - Before Go-Live

| # | Risk | Impact | Mitigation |
|---|---|---|---|
| 12 | Missing analytics/speed insights | No performance data from launch | Import `@vercel/analytics` and `@vercel/speed-insights` from `/next` variants in `app/layout.js` before go-live. |
| 13 | hero-bg.mp4 bandwidth on Vercel free tier | Potential bandwidth overage if video is large | Compress video under 2MB. Consider static image fallback with optional video load. |

---

## 7. Open Questions

These need a decision from Luke before implementation begins:

1. **Pricing tiers and amounts.** The design calls for "Starting from $X" anchors per tier. What are the actual tier names, starting prices, and scope descriptions?

2. **Trust strip stats.** What specific numbers go in the trust/stats strip? (e.g., "47 automations deployed", "2,100 hours saved per month across clients"). Need real or defensible numbers.

3. **Testimonials.** Do we have written testimonials with permission to publish? How many? With photos/logos or text-only?

4. **FAQ content.** What are the top 8-10 questions from real enquiries? These should be sourced from actual prospect conversations, not invented.

5. **Lead qualifier quiz.** Is this in scope for v1, or a post-launch addition? If in scope, what are the qualifying questions and scoring tiers (hot/warm/cool)?

6. **"Website Leads" Notion database.** Does this already exist, or does it need to be created? What fields/properties are needed?

7. **hero-bg.mp4 decision.** Keep the video (compressed under 2MB) or replace with a static hero image? Video adds visual impact but is the biggest bandwidth variable.

8. **Resend setup.** Is Resend already configured with a sending domain, or does this need to be set up? Contact form confirmation emails need a verified sender.

9. **Blog article count at launch.** How many articles exist now, and how many should be live at launch? This affects whether we need any pagination logic.

10. **Comparison table content.** The 3-column comparison (DIY | Big Agency | UnderCurrent) needs specific claims per row. Luke to draft the actual comparison points.

---

*This document synthesises findings from 5 specialist research agents (tech stack, design patterns, n8n architecture, cost/complexity, risks/edge cases). It is the input for 02-spec.md (implementation specification) and 03-plan.md (session-by-session build plan).*
