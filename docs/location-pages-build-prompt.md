# Build prompt — 5 new location pages

**Paste everything below the line into a fresh Claude Code session opened in `~/UnderCurrent/Builds/Products/Website/undercurrent/`.**

This prompt is self-contained. It briefs a cold agent to build Sydney, Brisbane, Perth, Adelaide, and Australia-wide location pages against the existing UnderCurrent framework.

---

You are extending the UnderCurrent Automations website (Next.js 15 App Router, production) with five new location pages. The goal is to rank and be cited as the go-to AI automation agency across Australia in Google, AI Overviews, ChatGPT, and Perplexity.

## Canonical references — read these before writing any code

1. `~/UnderCurrent/Vault/Research/wiki/seo-aio/nextjs-ai-search-framework.md` — the master framework. Entity density, schema, answer-first, canonical rules.
2. `~/UnderCurrent/Vault/Research/wiki/seo-aio/service-page-blueprint.md` — the service-page pattern. Location pages follow the same spirit.
3. `~/UnderCurrent/Vault/Research/wiki/seo-aio/google-maps-local-pack-ranking.md` — read before doing JSON-LD for the new cities.
4. `~/UnderCurrent/Vault/Research/wiki/seo-aio/ai-platform-citation-patterns.md` — what makes Perplexity/ChatGPT cite a page.
5. `docs/seo-aio-audit-2026-04-20.md` in this repo — the audit that produced this work. Specifically **P0-01** and **P0-03**.
6. `lib/data/locations.js` — the existing single entry (`ai-automation-melbourne`). Use it as structural template, not copy-paste.
7. `components/pages/LocationPage.js` — the component that renders every location entry.

## What to build

Five new entries in `lib/data/locations.js`:

| # | Slug | City | Region | Industry focus (4 per page) |
|---|---|---|---|---|
| 1 | `ai-automation-sydney` | Sydney | NSW | **Trades & Construction** (universal), **Consulting & Professional Services** (universal), Financial services, Property & real estate |
| 2 | `ai-automation-brisbane` | Brisbane | QLD | **Trades & Construction** (universal), **Consulting & Professional Services** (universal), Mining services & resources, Logistics & transport |
| 3 | `ai-automation-perth` | Perth | WA | **Trades & Construction** (universal), **Consulting & Professional Services** (universal), Mining & resources, Field services & remote ops |
| 4 | `ai-automation-adelaide` | Adelaide | SA | **Trades & Construction** (universal), **Consulting & Professional Services** (universal), Manufacturing & defence supply, Wine & agribusiness |
| 5 | `ai-automation-australia` | Australia (national) | — | **Trades & Construction** (universal), **Consulting & Professional Services** (universal), E-commerce & retail, Health & allied services |

**Universal rule:** every location page MUST include Trades + Consulting as two of the four industry cards. These are UC's two biggest-fit verticals and every Australian city needs them represented. The remaining two cards are the city-specific angle from the table above.

## Hard requirements (non-negotiable — the audit flags these)

### Architecture
- **Do not add `'use client'` to `components/pages/LocationPage.js`.** The audit (P0-03) separately refactors that file to a server component with client-animation subcomponents. Treat LocationPage as server-rendered. If you find it is still `'use client'` when you start, stop and fix P0-03 first (see below).
- New entries must drive the page entirely through data — do not create per-city variants of the component.
- Respect `dynamicParams = false` in `app/[slug]/page.js`; slugs must be registered in `LOCATIONS` for `generateStaticParams`.

### Per-entry required fields
Match the shape of the existing Melbourne entry. Every new entry must supply:

- `slug` (kebab-case, starts with `ai-automation-`)
- `city`, `region`
- `heroVariant` — pick one of `default`, `editorial`, `mono`. Vary across the five so hero treatments feel distinct.
- `metaTitle` — under 60 chars, leads with city + "AI Automation", ends with "| UnderCurrent"
- `metaDescription` — 150-160 chars, answer-first, names 2-3 real integrations (Xero, HubSpot, n8n, etc.) and the time-saving claim
- `heroPill`, `heroHeadline1`, `heroHeadline2`, `heroCopy` — city-specific phrasing, not Melbourne copy with find-replace
- `industriesLabel`, `industriesHeadline`, `industriesCopy`, `industries` (**4 entries**, each with `label`, `headline`, `copy`, `animType` — order is: Trades → Consulting → city-specific-1 → city-specific-2)
- `benefitsLabel`, `benefitsHeadline`, `benefits` (4 entries, same shape as Melbourne)
- `processLabel`, `processHeadline` (can reuse Melbourne's 3-step framing)
- `comparisonLabel`, `comparisonHeadline`, `comparisonCopy`, `comparisonRows`, `comparisonColumns` — 4 columns, 6 rows; UC always true
- `faqLabel`, `faqHeadline`, `faqs` — **7 FAQs minimum. At least 3 must explicitly name the city or region in the question.** Answers 60-80 words each, self-contained, answer-first.
- `ctaHeadline`, `ctaCopy` — city-flavoured
- `internalLinks` — **3 real service slugs (not `/services`)**, picked for the city's economic profile:
  - Sydney: `/sales-automation`, `/customer-experience-automation`, `/seo-ai-visibility`
  - Brisbane: `/inbound-lead-management-melbourne`, `/finance-automation`, `/content-automation`
  - Perth: `/custom-integrations`, `/personal-system-automation`, `/ai-strategy-training`
  - Adelaide: `/finance-automation`, `/custom-integrations`, `/sales-automation`
  - Australia: `/sales-automation`, `/customer-experience-automation`, `/website-design`

### Content rules (from the framework)
- H1 pattern (rendered by LocationPage): `AI Automation {City}.` followed by `AI Automation` token as line 1. Do not change the component — feed it the right `heroHeadline1`/`heroHeadline2`.
- **15+ named entities per page minimum.** Name specific tools (Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, n8n, Make, Zapier, Clio, Ironclad, Cin7, Unleashed) — at least 6 per page. Name local industry bodies or standards where relevant (Peppol, ATO, Fair Work, ABS, ASIC, MBA, HIA).
- Paragraphs 2-3 lines max.
- Answer-first: each FAQ and each section must resolve the question in the first 1-2 sentences.
- Data density: at least 3 specific numbers per page (hours saved, revenue uplift, delivery time).
- No invented stats. If the existing Melbourne page has "15 to 25 hours saved / week, 3x pipeline, 40% more reviews," reuse those bands across cities unless a city-specific datapoint is genuinely known.

### City-specific FAQ seed questions
Use these as starting points — rewrite for voice, do not paste verbatim. Always include the city name in at least 3 questions.

Every city's FAQ block must include **one trades-focused question AND one consulting-focused question** plus the city-specific angle. Target is 7-8 FAQs per page.

**Sydney:**
- What is AI automation for Sydney small businesses?
- Do you work with Sydney trades, builders and construction businesses?
- How does automation help Sydney consulting firms and professional services?
- Do you work with Sydney CBD, North Shore, Eastern Suburbs and Western Sydney?
- How does automation work for Sydney financial services firms?
- What tools do you integrate with?
- How long to go live in Sydney?
- What is the ROI for a Sydney business?
- Is my business data held onshore?

**Brisbane:**
- What is AI automation for Brisbane small business?
- Do you work with Brisbane trades, plumbers, electricians and builders?
- How does automation help Brisbane consulting firms and professional services?
- Do you work with businesses across South East Queensland?
- How does this help Brisbane logistics and mining-services businesses?
- What tools do you integrate with?
- How long does it take to deploy in Brisbane?
- What is the ROI for a Brisbane small business?
- Can you handle high-volume quoting for tradies?

**Perth:**
- What is AI automation for Perth small business?
- Do you work with Perth trades and construction businesses?
- How does automation help Perth consulting firms and professional services?
- Do you work with Perth resources-sector and field-service businesses?
- How do automations handle Perth's time-zone gap with the eastern states?
- What tools do you integrate with?
- How long does it take to deploy for a Perth business?
- What is the ROI for a Perth small business?
- Can automations run when our field crews are offline?

**Adelaide:**
- What is AI automation for Adelaide small business?
- Do you work with Adelaide trades and construction businesses?
- How does automation help Adelaide consulting firms and professional services?
- Do you work with Adelaide manufacturing, defence-supply and agribusiness?
- How does automation help Adelaide wine and food producers?
- What tools do you integrate with?
- How long does it take to deploy in Adelaide?
- What is the ROI for an Adelaide small business?
- Is this compliant with Australian food / defence data requirements?

**Australia (national):**
- What is AI automation for Australian small businesses?
- Do you work with trades and construction businesses Australia-wide?
- How does automation help Australian consulting firms and professional services?
- Can UnderCurrent work with a business anywhere in Australia?
- How do you handle businesses across multiple states and time zones?
- What tools do you integrate with?
- Do you meet Australian data sovereignty requirements?
- How long does a nationwide rollout take?
- What is the ROI for a multi-location Australian business?

### SEO / JSON-LD requirements
The LocationPage component already injects three schemas per page: `LocalBusiness`, `FAQPage`, `HowTo`. You do **not** need to touch the component's JSON-LD builders if you fix P0-03 first (the @id bug). Your job is to make sure the data feeding them is correct:

- `city` must be a real Australian city (used in `addressLocality` and `areaServed.name`)
- `region` must be the state abbreviation (`NSW`, `QLD`, `WA`, `SA`, `VIC`). For national, use `region: 'AU'` and handle it in the component if needed.
- `faqs` must be literal questions + answers — they become `FAQPage.mainEntity` directly.

### Supporting changes required in other files

1. **`lib/data/seo.js`** — expand `AREAS_SERVED` to:
   ```js
   export const AREAS_SERVED = [
     'Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide', 'Canberra',
     'Victoria', 'New South Wales', 'Queensland', 'Western Australia',
     'South Australia', 'Australian Capital Territory', 'Australia',
   ]
   ```
   This flows into every service page's JSON-LD automatically.

2. **`components/layout/Footer.js`** — add a "Locations" column linking to all 6 location pages (Melbourne + 5 new).

3. **`app/page.js`** (homepage) — if a "Locations" strip or chip exists in the hero or about section, add chips for the 5 new cities linking to their pages. If no such strip exists, skip — do not invent new layout.

4. **`public/llms.txt`** — served via `app/llms.txt/route.js`; auto-updates from `LOCATIONS`. Verify after deploy by curling `/llms.txt`.

5. **`app/sitemap.js`** — auto-updates from `LOCATIONS`. No change needed.

### Verification before you report done

1. `npm run build` — zero errors, 5 new routes appear in the route manifest
2. `npm run dev`, then `curl http://localhost:3001/ai-automation-sydney` (and the other four) returns 200
3. View-source on each new page confirms:
   - `<link rel="canonical" href="https://undercurrentautomations.com/ai-automation-{city}">`
   - Three `<script type="application/ld+json">` blocks: LocalBusiness, FAQPage, HowTo
   - H1 contains the city name
   - `addressLocality` and `areaServed` in the LocalBusiness schema match the city
4. Google's Rich Results Test (paste the page source): Service / LocalBusiness / FAQPage all parse cleanly
5. Run the entity-density check: grep the rendered HTML for named tools — at least 6 distinct tool names per page

### Content do's and don'ts

**Do:**
- Use Luke's brand voice: short, direct, sacrifices grammar for brevity, no em dashes, uses commas for pauses.
- Name real tools, suburbs, industries, standards.
- Answer first, context second.
- Reference the city the way locals reference it (Brisbane = SEQ / South East Queensland, Perth = WA, Sydney = inner-ring suburbs named by name: Surry Hills, Chatswood, Parramatta).

**Don't:**
- Copy Melbourne copy and find-replace city names.
- Use "basically", "actually", "very", "leverage", "synergy", "seamless", "cutting-edge".
- Use em dashes (`—`). Use commas.
- Invent statistics or claim offices in cities where UC has none. The framing is "Melbourne-based, serves {city} remotely, onsite available on request."
- Add `'use client'` anywhere.

### Output you must deliver back

1. One diff adding 5 entries to `lib/data/locations.js`
2. One diff expanding `AREAS_SERVED` in `lib/data/seo.js`
3. One diff adding Locations footer column in `components/layout/Footer.js`
4. Screenshots (via Playwright or manual) of all 5 pages at 1440px + 375px
5. A 1-page summary: entity count per page, FAQ count per page, word count per page, any open questions

### When to stop and ask

- If the LocationPage is still `'use client'` when you start — stop, point Luke at audit P0-03 and wait.
- If you cannot confirm which real industries / landmarks a city's content should name — ask Luke.
- If the component renders with broken layout for any of the new entries — stop and report which field shape is off.
- Do not guess real phone numbers, addresses, or testimonials. None should appear on location pages regardless.

Start. Report back when all five pages pass verification.
