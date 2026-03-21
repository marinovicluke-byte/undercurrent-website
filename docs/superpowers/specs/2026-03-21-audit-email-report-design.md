# Audit Email + Report Enhancements

**Date:** 2026-03-21
**Status:** Draft
**Author:** Claude + Luke

## Overview

Extend the existing Business Audit workflow to email leads a personalised HTML teaser email after form submission, enhance the AuditReport page with a Gemini-generated infographic, and apply UI polish.

## 1. N8n Workflow: Add Email Branch

### Current State

The existing "Business Audit to Notion CRM" workflow is:

```
Webhook (POST /webhook/business-audit)
  → Build Notion Payload (Code node)
    → Create Notion Page (HTTP Request)
```

### Target State

Fork the webhook output into two parallel branches:

```
Webhook (POST /webhook/business-audit)
  ├→ Branch A: Build Notion Payload → Create Notion Page  (existing, unchanged)
  └→ Branch B: Build HTML Email (Code node) → Send Email (Gmail node)
```

Both branches run in parallel from the same webhook trigger. No changes to the webhook path or payload format.

**Note:** The existing Branch A Code node uses legacy pillar keys (`operations`, `admin`, `marketing`, `finance`, `client`) that don't match the current frontend keys (`customer_experience`, `sales`, `content_design`, `personal_systems`, `finance`). This is a known divergence, deferred as a separate cleanup task. Branch B uses the correct frontend keys.

### Branch B: Email Delivery

**Node 1: Build HTML Email (Code node)**

Receives the same webhook payload (`contact`, `benchmark`). Builds an HTML email string with inline CSS (email client safe). The email contains:

1. **Greeting:** "Hey {first_name}, your audit results are ready."
2. **Subtext:** "We've finished analysing how **{business_name}** is spending its time, and where that time is quietly costing you money."
3. **Stat Card 1:** Estimated Monthly Loss (red text, large) with subtitle "in unbilled time, missed leads & manual work"
4. **Stat Card 2:** "That's Per Year" with yearly figure (monthly x 12, red text, large)
5. **Biggest Leak Card:** Pillar name, headline copy, fix copy, hours/week + $/month (green border)
6. **CTA Button 1:** "View Your Full Report →" linking to `https://undercurrentautomations.com.au/report?d={base64_encoded_data}`
7. **CTA Button 2:** "Book a Free Strategy Call" linking to `https://cal.com/luke-marinovic-aqeosc/30min`
8. **Footer:** "UnderCurrent Automations" (text only, no logo image)

**Styling:**
- Dark background (#0c0c0c), matching the report page aesthetic
- Card backgrounds: rgba surfaces with subtle borders
- Red (#FF6B50) for loss figures
- Green (#8FAF9F) for CTA buttons and pillar stats
- Fonts: system font stack (Arial, Helvetica, sans-serif) for email compatibility
- All inline CSS for email client compatibility
- No dashes in any copy, only commas

**Report Link Construction:**
The Code node base64-encodes the audit data into the same format that `AuditReport.jsx` reads:
```json
{
  "n": "Full Name",
  "b": "Business Name",
  "i": "Industry",
  "r": hourly_rate,
  "p": { pillar_key: { hours_per_week, self_rating, calc_rating }, ... }
}
```
URL: `https://undercurrentautomations.com.au/report?d={encodeURIComponent(btoa(JSON.stringify(data)))}`

**Biggest Leak Selection:**
Sort pillars by `hours_per_week * hourly_rate * 4.33` descending, take the first one.

**Pillar Copy Mapping** (same as AuditReport.jsx):

| Key | Label | Headline | Fix |
|-----|-------|----------|-----|
| customer_experience | Customer Experience | A lead messaged you at 9pm. By morning they'd booked someone else. | We set up an instant response system that replies, qualifies, and books, while you sleep. |
| sales | Sales | Your best lead this month replied to your quote. Then went quiet. You followed up two weeks later. | We build a follow up sequence that stays on them for 30 days without you touching it. |
| content_design | Content & Design | You know you need to post. You just never have time to sit down and do it. | One piece of content gets turned into a week of posts, captions, and emails, automatically. |
| personal_systems | Personal Systems | You're running the business and doing the admin of a business. That's two full time jobs. | We take the second one off your plate, inbox, scheduling, meeting notes, reporting. |
| finance | Finance | You did the work. Getting paid for it is somehow still your problem. | Invoices go out the moment a job is marked complete. Overdue reminders run on autopilot. |

**Code Node Output:**

The Code node must return all fields the Gmail node needs:

```js
return [{ json: {
  html: emailHtml,
  recipientEmail: contact.email,
  firstName: contact.full_name.split(' ')[0],
  subjectLine: `${contact.full_name.split(' ')[0]}, here's your business audit results`
} }]
```

Where `contact` is extracted from `$input.first().json.body.contact`.

**Node 2: Send Email (Gmail node)**

- **From:** luke@undercurrentautomations.com (via Gmail credential in n8n)
- **To:** `{{ $json.recipientEmail }}`
- **Subject:** `{{ $json.subjectLine }}`
- **Body:** `{{ $json.html }}`

### Credential Requirements

- Gmail OAuth2 credential in n8n (must be created in n8n UI and linked to the Gmail node)

## 2. AuditReport.jsx Tweaks

### 2a. Add "Scroll Down for More" Indicator

Insert a centered "↓ SCROLL DOWN FOR MORE" element between the hero CTA section and the first `<Divider />` (before "Revenue Leaks, Ranked" section).

- Monospace font (DM Mono), small caps, faint color
- Arrow character + text, centered

### 2b. Simplify Footer

Current: "UNDERCURRENT AUTOMATIONS · undercurrentautomations.com.au" (text only, centered)

New: Just "UnderCurrent Automations" centered, no dot separator, no URL.

### 2c. Update Industry Stats

Replace current STATS array with more authoritative data:

```js
const STATS = [
  { n: '20 hrs', text: 'average time saved per week by small businesses using strategic automation' },
  { n: '20-30%', text: 'reduction in operational costs reported by businesses automating key workflows' },
  { n: '3-6 mo', text: 'typical time to achieve full ROI on automation investment' },
  { n: '3-10x', text: 'average ROI reported for every dollar invested in business automation' },
]
```

### 2d. Remove All Dashes from Copy

Audit all user-facing text strings in AuditReport.jsx. Replace em dashes, en dashes, and hyphens used as punctuation with commas. Compound words and technical terms keep their hyphens (e.g. "follow-up" stays, but "no fluff — no pitch deck" becomes "no fluff, no pitch deck").

## 3. Radar Chart (Report Page)

### Approach

Add a new section to AuditReport.jsx titled "Your Business at a Glance" with a pure SVG radar/spider chart. No external APIs, no image generation. The chart renders directly from the pillar data already available in the page.

### Implementation

A `RadarChart` React component that:
- Takes the pillar data object and renders a 5-axis spider chart
- Each axis = one pillar (Customer Experience, Sales, Content & Design, Personal Systems, Finance)
- Values normalized to a 0-1 scale based on hours/week (capped at a reasonable max, e.g. 20 hrs)
- Higher hours = larger area = worse health (more time bleeding)
- Dark background matching the page (#0c0c0c)
- Green (#8FAF9F) fill with low opacity, green stroke for the data polygon
- Faint grid lines (concentric pentagons) in rgba(255,255,255,0.06)
- White/muted labels at each axis point
- Pure inline SVG, no charting library needed

### Report Page Placement

After the "Industry Benchmark" section (the horizontal bar comparisons), before the final CTA.

## 4. Data Flow Summary

```
User fills out audit on /audit-v2
  → Clicks "Send me the full report"
    → POST to /webhook/business-audit with { contact, benchmark }
      → N8n Webhook receives payload
        ├→ Branch A: Creates Notion CRM entry (existing)
        └→ Branch B: Builds HTML email → Sends via Gmail
          → Email arrives in lead's inbox
            → "View Your Full Report" links to /report?d={encoded_data}
              → AuditReport.jsx decodes data, renders report + SVG radar chart
```

## 5. Files Changed

| Action | File | What |
|--------|------|------|
| Edit | `audit-workflow.json` | Add email branch (Code node + Gmail node + connection fork) |
| Edit | `src/pages/AuditReport.jsx` | Scroll indicator, footer, stats, dash removal, Gemini section |
| None | `src/pages/BusinessAuditV2.jsx` | No changes |
| None | `src/audit/calculations.js` | No changes |

## 6. Copy Rules

- No dashes used as punctuation anywhere in user-facing text (email or report)
- Use commas instead
- Compound words keep hyphens (e.g. "follow-up", "self-rated")
- Email subject: "{first_name}, here's your business audit results"
