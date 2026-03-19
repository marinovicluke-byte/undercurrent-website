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
| Industry | Select / free-text | Pre-populated list with "Other" option; used to tag benchmark data |
| Hourly rate | Number input | Default $75; same pattern as ROI calculator |
| Avg project / job value | Number input | Used in lead bleed calculation |
| Leads per month | Number input | Used in lead bleed calculation |
| Avg lead response time | Select | Options: < 5 min, 5–30 min, 30–60 min, 1–4 hrs, 4–24 hrs, 24+ hrs |

---

## The Five Pillars

Each pillar has a top-level hours/week slider and five expandable sub-task sliders.

### 1. Customer Experience
Sub-tasks:
- Responding to enquiries (email/SMS/DM)
- Follow-up after quote/proposal
- Post-work follow-up & review collection
- New client onboarding
- Handling complaints & support

### 2. Sales
Sub-tasks:
- Speed-to-lead follow-up
- Proposal/quote creation
- CRM updates & pipeline tracking
- Booking discovery calls
- Re-engaging cold/dormant leads

### 3. Content & Design
Sub-tasks:
- Writing social captions & posts
- Creating graphics & visuals
- Writing emails & newsletters
- Repurposing content across platforms
- Scheduling & publishing

### 4. Personal Systems
Sub-tasks:
- Email inbox management
- Calendar & scheduling
- Meeting notes & action items
- Admin & document prep
- Internal reporting & data entry

### 5. Finance
Sub-tasks:
- Sending invoices
- Chasing overdue payments
- Bookkeeping data entry
- Expense tracking
- Financial reporting

---

## Pillar Card UI

### Collapsed state
- Area name (DM Mono label)
- Self-assessed health rating: Red / Orange / Green pill selector (client picks)
- Total hours/week slider (0–40 hrs)
- "Break it down ▼" expand trigger

### Expanded state
- Total hours/week slider remains at top
- Five sub-task sliders appear below (0–20 hrs each, optional)
- Sub-task hours are informational; they do not need to sum to the total
- "Collapse ▲" trigger

---

## Health Rating Gap Analysis

**Self-assessment:** Client picks Red / Orange / Green for each pillar.

**Calculated score** (from hours/week input):
- < 2 hrs/week → Green
- 2–6 hrs/week → Orange
- > 6 hrs/week → Red

**Gap logic:**
```
self_score:  Red=1, Orange=2, Green=3
calc_score:  derived from hours thresholds above

gap = self_score − calc_score
  > 0  → Blind spot (they think they're doing better than the data shows)
  = 0  → Accurate
  < 0  → Over-critical (rare, noted but not alarmed)
```

Blind spots are flagged with a ⚠ warning in the results and prominently in the PDF report.

---

## Calculation Logic

### Time cost (all pillars)
```
weekly_loss    = total_hours_per_week × hourly_rate
monthly_loss   = weekly_loss × 4.33
yearly_loss    = weekly_loss × 52
```
Each pillar contributes independently. Grand time total = sum across all five.

### Lead bleed (Sales pillar context, uses Business Context inputs)
```
baseline_conversion_rate = 20%  (industry default, will improve with benchmark data)

response_multiplier:
  < 5 min   → 1.00   (Hormozi standard; full conversion potential)
  5–30 min  → 0.48   (MIT/InsideSales: 8x drop over 5 min–24 hr window)
  30–60 min → 0.14   (InsideSales: 21x less likely than 5 min)
  1–4 hrs   → 0.08
  4–24 hrs  → 0.03
  24+ hrs   → 0.01   (HBR: 60x less likely than within 1 hr)

potential_monthly_revenue = leads_per_month × project_value × baseline_conversion_rate
actual_monthly_revenue    = leads_per_month × project_value × (baseline_conversion_rate × response_multiplier)
lead_bleed_monthly        = potential_monthly_revenue − actual_monthly_revenue
```

**Research sources:**
- Alex Hormozi, *$100M Leads* — 391% higher conversion within 60 seconds; 78% of buyers go with first responder
- MIT / InsideSales Lead Response Management Study — 21x more likely to qualify within 5 min vs 30 min
- Harvard Business Review (2.24M leads study) — 7x more likely within 1 hr; 60x less likely after 24 hrs

### Grand total
```
total_monthly_loss = sum(all_pillar_monthly_losses) + lead_bleed_monthly
total_yearly_loss  = total_monthly_loss × 12
```

---

## Results Block

Displayed after all pillars are filled in:

```
You're leaving an estimated
$X,XXX / month on the table
$XX,XXX / year

─────────────────────────────────────────
AREA              SELF-RATED    CALCULATED    STATUS
Customer Exp      Green         Red           ⚠ Blind spot
Sales             Orange        Red           ⚠ Blind spot
Content           Orange        Orange        ✓ Accurate
Personal Systems  Green         Green         ✓ Accurate
Finance           Red           Red           ✓ Accurate
─────────────────────────────────────────
Lead bleed: $X,XXX/mo — responding in 4+ hrs
```

Largest bleeding areas ranked by dollar impact.

---

## PDF Capture Form

Shown below the results. Gates the full breakdown report.

Fields:
- Business name
- Full name
- Email address
- Phone number

CTA: **"Send me the full report"**

On submit:
1. All audit inputs + contact details POST to N8N webhook
2. Inline confirmation: "Report on its way — check your inbox"
3. N8N sends PDF report to client email

---

## Benchmark Data Collection

**Every completed audit** (not just PDF requests) sends anonymised input data to N8N, tagged with industry. Fields stored:

- Industry
- Hours/week per pillar
- Sub-task hours (where entered)
- Self-assessed ratings
- Calculated ratings
- Response time band
- Lead volume & project value bands (not exact figures — bucketed for privacy)
- Total calculated monthly loss band

Purpose: build UnderCurrent's own industry benchmark database so future audits can show "businesses in your industry typically spend X hrs/week on this area — you're spending Y."

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
