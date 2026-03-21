# Audit Email + Report — Final Design

**Date:** 2026-03-22
**Status:** Complete
**Author:** Claude + Luke

## Overview

The Business Audit workflow sends leads a personalised HTML email after form submission, linking to a 5-page scroll-snapping report page. The n8n workflow forks into two parallel branches: Notion CRM entry + Gmail email.

## 1. N8n Workflow

### Architecture

```
Webhook (POST /webhook/business-audit)
  ├→ Branch A: Build Notion Payload → Create Notion Page  (existing)
  └→ Branch B: Build HTML Email (Code node) → Send Audit Email (Gmail node)
```

Both branches run in parallel from the same webhook trigger.

**Note:** Branch A uses legacy pillar keys (`operations`, `admin`, `marketing`, `finance`, `client`). Branch B uses the correct frontend keys (`customer_experience`, `sales`, `content_design`, `personal_systems`, `finance`). This is a known divergence deferred as a separate cleanup.

### Branch B: Email Delivery

**Node 1: Build HTML Email (Code node)**

Receives webhook payload (`contact`, `benchmark`). Builds a **light-mode** HTML email with inline CSS. Contents:

1. **Greeting:** "Hey {first_name}, your audit results are ready."
2. **Subtext:** "We've finished analysing how **{business_name}** is spending its time, and where that time is quietly costing you money."
3. **Stat Card:** Monthly loss (large, red #a52a2a) + yearly loss, inside a light grey card
4. **Biggest Leak Card:** Green border (#c8ddd0), pillar name, headline, fix copy, hours/week + $/month
5. **CTA Button 1:** "View Your Full Report" (sage green #8FAF9F) → `https://www.undercurrentautomations.com/report?d={base64}`
6. **CTA Button 2:** "Book a Free Strategy Call" (outlined green) → `https://cal.com/luke-marinovic-aqeosc/30min`
7. **Footer:** Dark bar (#1a1a1a) with "Undercurrent Automations" and copyright

**Email Styling (Light Mode):**
- Background: off-white (#f5f2ed)
- Card: white (#ffffff) with rounded corners
- Stat card: light grey (#f7f7f7) with subtle border
- Loss figures: brown-red (#a52a2a)
- Biggest leak: soft green background (#f0f7f3) with green border (#c8ddd0)
- Fonts: Arial, Helvetica, sans-serif (email safe)
- All inline CSS

**Report Link Construction:**
```json
{
  "n": "Full Name",
  "b": "Business Name",
  "i": "Industry",
  "r": hourly_rate,
  "p": { pillar_key: { hours_per_week, self_rating, calc_rating, subtasks }, ... }
}
```
URL: `https://www.undercurrentautomations.com/report?d={encodeURIComponent(btoa(JSON.stringify(data)))}`

**Code Node Output:**
```js
return [{ json: {
  html,
  recipientEmail: contact.email,
  subjectLine: `${firstName}, here's your business audit results`
} }]
```

**Node 2: Send Audit Email (Gmail node)**
- From: luke@undercurrentautomations.com (Gmail OAuth2 credential)
- To: `{{ $json.recipientEmail }}`
- Subject: `{{ $json.subjectLine }}`
- Body: `{{ $json.html }}`

### Biggest Leak Selection
Sort pillars by `hours_per_week * hourly_rate * 4.33` descending, take the first.

### Pillar Copy Mapping

| Key | Label | Headline | Fix |
|-----|-------|----------|-----|
| customer_experience | Customer Experience | A lead messaged you at 9pm. By morning they'd booked someone else. | We set up an instant response system that replies, qualifies, and books, while you sleep. |
| sales | Sales | Your best lead this month replied to your quote. Then went quiet. You followed up two weeks later. | We build a follow up sequence that stays on them for 30 days without you touching it. |
| content_design | Content & Design | You know you need to post. You just never have time to sit down and do it. | One piece of content gets turned into a week of posts, captions, and emails, automatically. |
| personal_systems | Personal Systems | You're running the business and doing the admin of a business. That's two full time jobs. | We take the second one off your plate, inbox, scheduling, meeting notes, reporting. |
| finance | Finance | You did the work. Getting paid for it is somehow still your problem. | Invoices go out the moment a job is marked complete. Overdue reminders run on autopilot. |

## 2. AuditReport.jsx — 5-Page Scroll-Snapping Report

The report is a full-page scroll-snapping experience with 5 sections, dark charcoal theme (#1C1C1A), and brand typography (DM Sans 800 for headings, DM Mono for labels).

### Page 1 — Cover
- Section label: "Business Health Report · {industry}"
- Business name (huge, DM Sans 800)
- "Prepared for {name}"
- Two stat cards side by side: monthly loss + yearly loss (red #FF6B50 on dark red cards)
- Pillar pills showing each area + hours/week
- CTA: "Show me how to stop the bleeding" (sage green pill button)
- Scroll prompt: "Scroll to see your biggest leaks"

### Page 2 — Time Wasters
- Each pillar as a two-column card: left side has label, dollar loss, hours; right side has headline quote + "The automation" fix
- #1 leak gets red accent card; others get standard dark cards
- Scroll prompt: "Scroll to see how you compare"

### Page 3 — Benchmarks
- "How you compare" — user's manual hours vs automated benchmarks per pillar
- Horizontal bar comparisons (orange = user, green = automated)
- Subtask pills showing breakdown
- Legend at bottom

### Page 4 — Stats + Radar
- "What businesses like yours are seeing with automation"
- 4 stat cards in 2x2 grid, each with a contextual SVG graph:
  - **20 hrs** — before/after horizontal bars (red long → green short)
  - **20-30%** — donut ring chart at 25%
  - **3-6 mo** — timeline with START → EVEN → ROI milestones
  - **3-10x** — ascending stepped bars from 1x to 10x
- Cards are centered with hover effects
- Radar/spider chart: pure SVG, 5 axes, green polygon showing time distribution

### Page 5 — Summary + CTA
- "What would you do with {X} extra hours a month?"
- 3 recovery stat cards: revenue recovered, hours freed, average ROI
- Final CTA card: "Let's plug the leaks, {firstName}." with Book a Call button
- Footer: copyright line

### Custom Report Nav
- Fixed floating pill bar at top (no full Navbar import)
- Left: "UnderCurrent" wordmark (Cormorant Garamond) + animated canvas wave
- Right: "Book a Call" sage green pill button
- No nav links, no hamburger, no mobile menu
- Wave hidden on mobile via CSS

### Automated Benchmarks
```js
const AUTO_BENCHMARKS = {
  customer_experience: 1.5,
  sales: 2.0,
  content_design: 1.5,
  personal_systems: 2.5,
  finance: 0.5,
}
```

### Mobile Responsive
- All grids collapse appropriately at 640px
- Hero stats → single column
- Leak cards → single column (divider switches from right border to bottom border)
- Stat cards stay 2-column on mobile
- Recovery grid → single column

## 3. Data Flow

```
User fills out audit on /audit or /audit-v2
  → Clicks "Send me the full report"
    → POST to /webhook/business-audit with { contact, benchmark }
      → N8n Webhook receives payload
        ├→ Branch A: Creates Notion CRM entry
        └→ Branch B: Builds light-mode HTML email → Sends via Gmail
          → Email arrives with report link
            → "View Your Full Report" → www.undercurrentautomations.com/report?d={data}
              → AuditReport.jsx decodes, renders 5-page scroll-snapping report
```

## 4. Files

| File | Purpose |
|------|---------|
| `audit-workflow.json` | N8n workflow JSON (5 nodes, forked connections) |
| `n8n-email-code.js` | Standalone copy of the Build HTML Email code node (for easy paste into n8n) |
| `src/pages/AuditReport.jsx` | 5-page scroll-snapping report with custom nav, stat graphs, radar chart |
| `src/audit/RadarChart.jsx` | Pure SVG radar/spider chart component |
| `src/audit/calculations.js` | calcPillarMonthly and other calculation helpers |

## 5. Deployment

- Frontend: Vercel (auto-deploys from `main` branch on GitHub)
- Vercel config: `vercel.json` with SPA rewrite `{"rewrites": [{"source": "/(.*)", "destination": "/index.html"}]}`
- N8n: Self-hosted at `n8n.undercurrentautomations.xyz`
- Domain: `www.undercurrentautomations.com`

## 6. Copy Rules

- No dashes used as punctuation in user-facing text (email or report)
- Use commas instead
- Compound words keep hyphens (e.g. "follow-up", "self-rated")
- Email subject: "{first_name}, here's your business audit results"
