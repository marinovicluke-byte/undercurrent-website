# Location Pages — Build Summary

**Date:** 2026-04-21
**Scope:** 5 new location pages (Sydney, Brisbane, Perth, Adelaide, Australia) + Melbourne refresh
**Branch:** current working tree
**Delivered against:** `docs/location-pages-build-prompt.md` + `docs/seo-aio-audit-2026-04-20.md` (P0-01, P0-03)

## Per-page metrics

| Slug | Words | FAQs | Distinct tools | City-named FAQs | Title (rendered) | Desc chars |
|------|-------|-----:|---------------:|----------------:|------------------|-----------:|
| ai-automation-melbourne | 1,733 | 9 | 20 | 7 | `AI Automation Melbourne \| UnderCurrent Automations` | 152 |
| ai-automation-sydney    | 1,774 | 9 | 14 | 8 | `AI Automation Sydney \| UnderCurrent Automations`    | 154 |
| ai-automation-brisbane  | 1,756 | 9 | 16 | 7 | `AI Automation Brisbane \| UnderCurrent Automations`  | 157 |
| ai-automation-perth     | 1,769 | 9 | 12 | 7 | `AI Automation Perth \| UnderCurrent Automations`     | 154 |
| ai-automation-adelaide  | 1,701 | 9 | 14 | 7 | `AI Automation Adelaide \| UnderCurrent Automations`  | 152 |
| ai-automation-australia | 1,749 | 9 | 19 | 6 | `AI Automation Australia \| UnderCurrent Automations` | 150 |

Brief minimums: ≥ 7 FAQs, ≥ 3 city-named FAQs, ≥ 6 distinct tools, < 60 char title, 150–160 char desc. All pages pass every minimum.

## Per-city angle (distinct)

- **Melbourne** — home base. Retail/hospitality + allied health added alongside trades + consulting. Accent: sage.
- **Sydney** — speed and density. Sub-5-minute reply, financial services, property + REA/Domain. Accent: blue.
- **Brisbane** — scale and volume. SEQ coverage, 20–100 quotes/week, Peppol invoicing, mining-services corridor. Accent: sage.
- **Perth** — distance and isolation. AWST/AEST handover, offline field crews in the Pilbara/Goldfields. Accent: blue.
- **Adelaide** — compliance and craft. Defence supply (Edinburgh Parks, Osborne), wine DTC (Barossa/McLaren Vale/Adelaide Hills), food safety. Accent: sage.
- **Australia** — coverage and sovereignty. State-aware routing, multi-capital rollout, Australian data residency. Accent: blue.

## Schema stack (per page)

Each location page emits 5 location-specific JSON-LD blocks plus 3 sitewide (from `app/layout.js`):

| Schema | Source | Purpose |
|---|---|---|
| Organization             | layout | Sitewide entity |
| LocalBusiness (sitewide) | layout | Melbourne NAP |
| WebSite                  | layout | SearchAction |
| LocalBusiness (per-city) | LocationPage.js | City-scoped NAP + areaServed |
| Service                  | LocationPage.js | Offered service scope |
| FAQPage                  | LocationPage.js | City-specific FAQ |
| HowTo                    | LocationPage.js | Three-step rollout |
| BreadcrumbList           | LocationPage.js | Home → city page |

All provider/parentOrganization references resolve to `{DOMAIN}#organization` (P0-03 fix confirmed).

## Tools named per page

- **Melbourne**: Asana, ClickUp, Cliniko, Clio, Gmail, HICAPS, Halaxy, Hipages, HubSpot, Lightspeed, MYOB, Nookal, Notion, Outlook, Salesforce, Shopify, Slack, Square, Xero, n8n
- **Sydney**: Asana, ClickUp, Clio, Gmail, Hipages, HubSpot, MYOB, Notion, Outlook, Salesforce, Shopify, Slack, Xero, n8n
- **Brisbane**: Asana, Cin7, ClickUp, Gmail, Hipages, HubSpot, MYOB, Notion, Outlook, Peppol, Salesforce, Shopify, Slack, Unleashed, Xero, n8n
- **Perth**: Asana, ClickUp, Gmail, HubSpot, MYOB, Notion, Outlook, Salesforce, Shopify, Slack, Xero, n8n
- **Adelaide**: Asana, Cin7, Gmail, Hipages, HubSpot, MYOB, Notion, Outlook, Salesforce, Shopify, Slack, Unleashed, Xero, n8n
- **Australia**: Asana, Cin7, ClickUp, Cliniko, Gmail, HICAPS, Halaxy, HubSpot, MYOB, Nookal, Notion, Outlook, Salesforce, Shopify, Slack, Unleashed, WooCommerce, Xero, n8n

## Humanizer audit

- Em dashes: 0 across all 6 pages
- Banned words (leverage/synergy/cutting-edge/revolutionise/empower/utilize/best-in-class/game-changer/seamless/robust/in-order-to/at-its-core/delve/tapestry/testament/pivotal/intricate/vibrant/foster/align-with/showcase): 0 across all 6 pages
- "actually" as filler: 0 across all 6 pages

## Supporting deliverables

- `components/pages/LocationPage.js` — server wrapper rewritten with Service + BreadcrumbList schemas added
- `components/pages/LocationPageClient.js` — full rewrite to v2 design primitives (SectionEyebrow, PillCTA, `uc-glow-word`, hard-offset shadows). No `'use client'`. Native `<details>` for FAQ accordion.
- `lib/data/locations.js` — all 6 entries on the new data shape
- `lib/data/seo.js` — `AREAS_SERVED` expanded (pre-existing, confirmed)
- `components/layout/Footer.js` — Locations column auto-populates from `LOCATIONS` (pre-existing)
- `app/sitemap.js` + `app/llms.txt/route.js` — auto-updated from `LOCATIONS`
- `docs/screenshots/{slug}-{1440|375}.png` — 12 screenshots captured via Playwright
- `docs/location-pages-qa-report.md` — cold QA audit and Fixes Applied log

## Open questions

- None that block ship.
- Next phase: run `/fact-checker` over hero/FAQ copy to verify the softened claims (Sydney "high enquiry volume, crowded service market", Adelaide "deep compliance paperwork", Brisbane "20–100 quotes per week") against vault research or external sources before external citation push.
