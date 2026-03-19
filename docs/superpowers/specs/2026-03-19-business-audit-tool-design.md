# Business Audit Tool — Design Spec
**Date:** 2026-03-19
**Project:** UnderCurrent website (`/audit` route)
**Status:** Approved

---

## Overview

A business health audit calculator for use during 30-minute discovery calls and as a pre-call self-serve tool. Prospects fill it out on the website to uncover how much time and money they're losing across five core business areas. The tool produces a headline dollar loss figure and offers a full PDF report sent via N8N automation.

Two use cases:
1. **Pre-call** — client fills it out before the call; Luke arrives with data
2. **On-call** — Luke runs through it live with the prospect on screen

---

## Page Route

`/audit` — standalone page, replaces the existing empty route. The existing `/roi` page remains unchanged.

---

## Page Structure & Flow

```
1. Hero            — "Find the holes in your business"
2. Business context — industry, hourly rate, avg project value, leads/month, response time
3. Five pillar audit — one card per area, expandable with sub-tasks
4. Results summary  — monthly + yearly loss, health gap analysis, lead bleed
5. PDF capture      — name, email, phone, business name → N8N webhook
```

---

## Business Context Inputs

Collected once at the top of the audit, used across all calculations:

| Field | Type | Notes |
|---|---|---|
| Industry | Select / free-text | See industry list below; "Other" free-text fallback |
| Hourly rate | Number input | Default $75; same pattern as ROI calculator |
| Avg project / job value | Number input | Default blank (0); used in lead bleed only |
| Leads per month | Number input | Default blank (0); used in lead bleed only |
| Avg lead response time | Select | < 5 min, 5–30 min, 30–60 min, 1–4 hrs, 4–24 hrs, 24+ hrs; no default (unselected until touched) |

**Industry list (pre-populated select):**
Trades & Construction, Real Estate, Health & Wellness, Beauty & Personal Care, Professional Services (Legal, Accounting, Finance), Marketing & Creative Agency, Coaching & Consulting, Hospitality & Events, Retail & E-commerce, Education & Training, Technology & Software, Property Management, Other (free-text).

---

## The Five Pillars

Each pillar has a top-level hours/week slider (range: 0–40, step: 0.5, default: 0) and five expandable sub-task sliders (range: 0–20, step: 0.5, default: 0). All hour thresholds in the health rating gap analysis apply to **each pillar's individual hours/week value**, not total hours across all pillars.

### 1. Customer Experience
Sub-tasks: Responding to enquiries (email/SMS/DM) · Follow-up after quote/proposal · Post-work follow-up & review collection · New client onboarding · Handling complaints & support

### 2. Sales
Sub-tasks: Speed-to-lead follow-up · Proposal/quote creation · CRM updates & pipeline tracking · Booking discovery calls · Re-engaging cold/dormant leads

### 3. Content & Design
Sub-tasks: Writing social captions & posts · Creating graphics & visuals · Writing emails & newsletters · Repurposing content across platforms · Scheduling & publishing

### 4. Personal Systems
Sub-tasks: Email inbox management · Calendar & scheduling · Meeting notes & action items · Admin & document prep · Internal reporting & data entry

### 5. Finance
Sub-tasks: Sending invoices · Chasing overdue payments · Bookkeeping data entry · Expense tracking · Financial reporting

---

## Pillar Card UI

### Collapsed state
- Area name (DM Mono label)
- Self-assessed health rating: Red / Orange / Green pill selector (client picks; no default — unselected until touched)
- Total hours/week slider (range: 0–40, step: 0.5, default: 0)
- "Break it down ▼" expand trigger

### Expanded state
- Total hours/week slider remains at top
- Five sub-task sliders appear below (range: 0–20, step: 0.5, default: 0, all optional)
- Sub-task hours are **informational only** — they do not affect any calculation
- Sub-tasks do not need to sum to the pillar total; no warning or enforcement if they exceed it (intentional — users are estimating)
- Sub-task values are stored to the benchmark database as raw numbers (null if untouched/at 0)
- "Collapse ▲" trigger (label changes from "Break it down ▼" when expanded)
- Multiple cards can be expanded simultaneously — no accordion behaviour

### Expand/collapse behaviour
- Any number of pillar cards can be open at the same time
- Expanded state persists as the user scrolls
- No animation requirement beyond a smooth height transition

---

## Health Rating Gap Analysis

**Self-assessment:** Client picks Red / Orange / Green for each pillar. No default — pill remains unselected until the client chooses.

**Calculated score** — applied independently to **each pillar's** hours/week value:

| Hours/week | Calculated rating |
|---|---|
| < 2 hrs | Green |
| ≥ 2 and ≤ 6 hrs | Orange |
| > 6 hrs | Red |

Boundary values: exactly 2 hrs → Orange; exactly 6 hrs → Orange; above 6 hrs → Red.

**Numeric mapping (same scale for both self and calculated):**

```
Red = 1, Orange = 2, Green = 3

self_score: derived from client's pill selection
calc_score: derived from hours thresholds above using same Red=1/Orange=2/Green=3 scale

gap = self_score − calc_score
```

**Gap status and display:**

| gap | Status label | Icon | Colour treatment |
|---|---|---|---|
| > 0 | Blind spot | ⚠ | Amber/orange text |
| = 0 | Accurate | ✓ | Sage green text |
| < 0 | Under-estimated | ↑ | Muted charcoal, quiet treatment |

- Gap analysis only shown for pillars where the client has both set hours > 0 AND selected a self-rating.
- Pillars with no self-rating selected show "—" in the status column.

---

## Calculation Logic

### Time cost — calculated per pillar, then summed

For each pillar independently:
```
pillar_weekly_loss  = pillar_hours_per_week × hourly_rate
pillar_monthly_loss = pillar_weekly_loss × 4.33
```

Grand time total:
```
total_time_monthly_loss = sum of all five pillar_monthly_loss values
```

### Lead bleed (only applied when leads_per_month > 0 AND project_value > 0)

```
baseline_conversion_rate = 0.20  (20% industry default)

response_multiplier (from selected response time band):
  < 5 min   → 1.00
  5–30 min  → 0.48
  30–60 min → 0.14
  1–4 hrs   → 0.08
  4–24 hrs  → 0.03
  24+ hrs   → 0.01

potential_monthly_revenue = leads_per_month × project_value × 0.20
actual_monthly_revenue    = leads_per_month × project_value × (0.20 × response_multiplier)
lead_bleed_monthly        = potential_monthly_revenue − actual_monthly_revenue
```

**Research sources:**
- Alex Hormozi, *$100M Leads* — 391% higher conversion within 60 seconds; 78% of buyers go with first responder
- MIT / InsideSales Lead Response Management Study — 21x more likely to qualify within 5 min vs 30 min; 8x more conversions in first 5 min vs 5 min–24 hr window
- Harvard Business Review (2.24M leads study) — 7x more likely within 1 hr; 60x less likely after 24 hrs

### Grand total — single canonical calculation

```
total_monthly_loss = total_time_monthly_loss + lead_bleed_monthly
total_yearly_loss  = total_monthly_loss × 12
```

`× 12` is the single source of truth for annualising. Per-pillar yearly figures (used in display breakdowns) also use `pillar_monthly_loss × 12`.

### Lead bleed display rule

The lead bleed row is hidden whenever `lead_bleed_monthly === 0`. This covers all cases:
- `leads_per_month` is 0 or blank → bleed = 0
- `project_value` is 0 or blank → bleed = 0
- Response time is < 5 min (multiplier = 1.00) → bleed = 0

When response time is < 5 min and all other inputs are set, the row disappears entirely — it does **not** show "$0". This is correct: no revenue is being lost to slow response.

No separate upstream gate needed — the single zero-check handles all three.

---

## Results Block

**Display trigger:** Results block is hidden on load (all sliders default to 0). It appears as soon as at least one pillar has a non-zero hours value. Results update live as sliders change.

```
You're leaving an estimated
$X,XXX / month on the table
$XX,XXX / year

─────────────────────────────────────────────────────
AREA              SELF-RATED    CALCULATED    STATUS
Customer Exp      Green         Red           ⚠ Blind spot
Sales             Orange        Red           ⚠ Blind spot
Content           Orange        Orange        ✓ Accurate
Personal Systems  —             Green         —
Finance           Red           Red           ✓ Accurate
─────────────────────────────────────────────────────
Lead bleed: $X,XXX/mo — responding in [band]
(row hidden when lead_bleed_monthly === 0)
```

Pillars ranked by `pillar_monthly_loss` descending. Tie-breaking: preserve original pillar order (Customer Experience → Sales → Content & Design → Personal Systems → Finance).

**Gap analysis table visibility:** The table is shown as soon as the results block is visible (at least one pillar with hours > 0). Pillars with no self-rating show "—" in the self-rated and status columns. The table is always rendered when results are visible — it does not hide if zero pillars have a self-rating.

---

## PDF Capture Form

Shown below the results. Gates the full breakdown report.

**Fields and validation:**

| Field | Required | Validation |
|---|---|---|
| Business name | Yes | Non-empty string |
| Full name | Yes | Non-empty string |
| Email address | Yes | Non-empty + valid email format (client-side regex) |
| Phone number | No | Optional; no format enforcement |

CTA: **"Send me the full report"**

**Phone field handling:** If phone is left blank, send `null` in the JSON payload (not `""`). Client-side: `phone: phoneValue.trim() || null`.

**Submit — success path:**
1. POST all audit inputs + contact details to `VITE_N8N_AUDIT_WEBHOOK_URL`
2. Button enters loading state (disabled, spinner)
3. On 2xx response: inline confirmation — "Report on its way — check your inbox"
4. N8N handles: send PDF to client email + store benchmark data

**Submit — error path:**
1. On non-2xx or network failure: inline error — "Something went wrong — please try again or email us directly at hello@undercurrent.com.au"
2. Button re-enables; all form values preserved for retry

---

## Benchmark Data Collection

**Trigger:** Fires on PDF capture form submit. A single POST to `VITE_N8N_AUDIT_WEBHOOK_URL` contains the full payload. N8N routes internally — one webhook, two workflow branches (PDF send + benchmark storage).

**Banding rules (applied client-side before sending):**

| Input | Band value | Boundary rule |
|---|---|---|
| leads_per_month = 0 | omitted (null) | — |
| leads_per_month 1–4 | "< 5" | 1 ≤ x ≤ 4 |
| leads_per_month 5–20 | "5–20" | 5 ≤ x ≤ 20 |
| leads_per_month 21–50 | "20–50" | 21 ≤ x ≤ 50 |
| leads_per_month 51–100 | "50–100" | 51 ≤ x ≤ 100 |
| leads_per_month > 100 | "100+" | x > 100 |
| project_value = 0 | omitted (null) | — |
| project_value 1–499 | "< $500" | 1 ≤ x ≤ 499 |
| project_value 500–1999 | "$500–$2k" | 500 ≤ x ≤ 1999 |
| project_value 2000–9999 | "$2k–$10k" | 2000 ≤ x ≤ 9999 |
| project_value 10000–49999 | "$10k–$50k" | 10000 ≤ x ≤ 49999 |
| project_value ≥ 50000 | "$50k+" | x ≥ 50000 |
| total_monthly_loss < 1000 | "< $1k" | x < 1000 |
| total_monthly_loss 1000–4999 | "$1k–$5k" | 1000 ≤ x ≤ 4999 |
| total_monthly_loss 5000–19999 | "$5k–$20k" | 5000 ≤ x ≤ 19999 |
| total_monthly_loss ≥ 20000 | "$20k+" | x ≥ 20000 |

**Pillars included in benchmark payload:** Only pillars where `hours_per_week > 0` are included in the `pillars` object. Pillars at 0 are omitted entirely. This avoids polluting the benchmark dataset with untouched fields.

**Webhook payload structure:**

```json
{
  "contact": {
    "business_name": "string",
    "full_name": "string",
    "email": "string",
    "phone": "string | null"
  },
  "benchmark": {
    "industry": "string",
    "submission_date": "YYYY-MM-DD (client-local AEST/AEDT, derived via toLocaleDateString('en-AU', { timeZone: 'Australia/Melbourne' }))",
    "hourly_rate": number,
    "response_time_band": "< 5 min | 5–30 min | 30–60 min | 1–4 hrs | 4–24 hrs | 24+ hrs | null (if unset)",
    "leads_per_month_band": "banded string | null (if leads = 0 or unset)",
    "project_value_band": "banded string | null (if value = 0 or unset)",
    "total_monthly_loss_band": "banded string",
    "pillars": {
      "customer_experience": {
        "hours_per_week": number,
        "self_rating": "Red | Orange | Green | null",
        "calc_rating": "Red | Orange | Green",
        "subtasks": {
          "responding_to_enquiries": number | null,
          "followup_after_quote": number | null,
          "postwork_followup_review": number | null,
          "new_client_onboarding": number | null,
          "complaints_support": number | null
        }
      },
      "sales": {
        "hours_per_week": number,
        "self_rating": "Red | Orange | Green | null",
        "calc_rating": "Red | Orange | Green",
        "subtasks": {
          "speed_to_lead_followup": number | null,
          "proposal_quote_creation": number | null,
          "crm_pipeline_updates": number | null,
          "booking_discovery_calls": number | null,
          "reengaging_cold_leads": number | null
        }
      },
      "content_design": {
        "hours_per_week": number,
        "self_rating": "Red | Orange | Green | null",
        "calc_rating": "Red | Orange | Green",
        "subtasks": {
          "writing_social_captions": number | null,
          "creating_graphics": number | null,
          "writing_emails_newsletters": number | null,
          "repurposing_content": number | null,
          "scheduling_publishing": number | null
        }
      },
      "personal_systems": {
        "hours_per_week": number,
        "self_rating": "Red | Orange | Green | null",
        "calc_rating": "Red | Orange | Green",
        "subtasks": {
          "email_inbox_management": number | null,
          "calendar_scheduling": number | null,
          "meeting_notes_actions": number | null,
          "admin_document_prep": number | null,
          "internal_reporting": number | null
        }
      },
      "finance": {
        "hours_per_week": number,
        "self_rating": "Red | Orange | Green | null",
        "calc_rating": "Red | Orange | Green",
        "subtasks": {
          "sending_invoices": number | null,
          "chasing_overdue_payments": number | null,
          "bookkeeping_data_entry": number | null,
          "expense_tracking": number | null,
          "financial_reporting": number | null
        }
      }
    }
  }
}
```

Contact details are included in the payload for the PDF send workflow branch. The benchmark branch uses only the `benchmark` object — contact details are not stored in the benchmark database.

---

## Environment Variables

| Variable | Purpose |
|---|---|
| `VITE_N8N_AUDIT_WEBHOOK_URL` | Single N8N webhook endpoint for both PDF trigger and benchmark data |

---

## PDF Report Structure (deferred — build later)

Scope confirmed. Will be designed as a separate phase. Planned sections:

1. Cover — business name, date, UnderCurrent branding
2. Executive summary — total loss figure, top 3 bleeding areas
3. Pillar-by-pillar breakdown — self vs calculated rating, hours, cost
4. Lead bleed analysis — response time curve graphic
5. Recommended automations — mapped to weakest areas
6. CTA — book a follow-up call

---

## Technical Stack

- React 19 + Vite (existing)
- Tailwind CSS (existing)
- GSAP for animations (existing, match ROI calculator patterns)
- N8N webhook for PDF trigger + benchmark data collection
- No new dependencies required

---

## Brand Compliance

All UI must follow the UnderCurrent brand guide:
- Colors: Off-White `#F7F3ED`, Sage `#8FAF9F`, Charcoal `#1C1C1A`, Parchment `#E8E0D0`, Warm Sand `#D4C9B0`
- Fonts: Cormorant Garamond (headlines), DM Sans (body/UI), DM Mono (labels/mono)
- Sliders: same `.roi-slider` CSS pattern as ROI calculator
- Cards: parchment background, warm-sand borders, heavily rounded (`4xl`+)
- Animations: `y: 30 → 0, opacity: 0 → 1` scroll reveals via GSAP
- Noise overlay: fixed grain at `opacity: 0.04`
- Hero: signature charcoal→sage→sand gradient + water canvas

---

## Out of Scope

- PDF generation itself (handled by N8N / external tool)
- Authentication or saved sessions
- Admin dashboard for benchmark data (raw N8N storage for now)
- Industry-specific multipliers (default 20% close rate for all industries initially)
