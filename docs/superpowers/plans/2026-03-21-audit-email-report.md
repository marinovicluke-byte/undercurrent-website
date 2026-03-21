# Audit Email + Report Enhancements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an HTML email branch to the n8n audit workflow, enhance the AuditReport page with a radar chart and UI polish, and remove all dashes from user-facing copy.

**Architecture:** The existing n8n webhook forks into two parallel branches: Branch A (Notion CRM, unchanged) and Branch B (new HTML email via Gmail). The AuditReport.jsx page gets a pure SVG radar chart, a scroll indicator, simplified footer, updated stats, and dash-free copy.

**Tech Stack:** React (Vite), n8n (Code node + Gmail node), inline SVG, inline CSS for email

**Spec:** `docs/superpowers/specs/2026-03-21-audit-email-report-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/audit/RadarChart.jsx` | Pure SVG radar/spider chart component |
| Modify | `src/pages/AuditReport.jsx` | Scroll indicator, footer, stats, dash removal, radar chart section |
| Modify | `Desktop/audit-workflow.json` | Add email branch nodes + fork connection |
| Modify | `src/__tests__/audit/calculations.test.js` | Add test for email data encoding if needed |

---

### Task 1: Remove Dashes from AuditReport.jsx Copy

**Files:**
- Modify: `src/pages/AuditReport.jsx:13,23,28,50,158,198,251,326,436`

- [ ] **Step 1: Replace em dashes in PILLAR_COPY fix strings**

Line 13: `"books — while"` → `"books, while"`
Line 23: `"emails — automatically"` → `"emails, automatically"`
Line 28: `"plate — inbox"` → `"plate, inbox"`

```js
// Line 13
fix: "We set up an instant-response system that replies, qualifies, and books, while you sleep.",
// Line 23
fix: "One piece of content gets turned into a week of posts, captions, and emails, automatically.",
// Line 28
fix: "We take the second one off your plate, inbox, scheduling, meeting notes, reporting.",
```

- [ ] **Step 2: Replace en dash in STATS and recovery grid**

Line 50: `'3–10×'` → `'3 to 10x'`
Line 326: `'3–10×'` → `'3 to 10x'`

- [ ] **Step 3: Replace em dashes in labels and headings**

Line 158: `"— Audit Report"` → `", Audit Report"`
Line 198: `"Business Health Report — {data.i}"` → `"Business Health Report, {data.i}"`
Line 251: `"Revenue leaks — ranked"` → `"Revenue leaks, ranked"`

- [ ] **Step 4: Replace em dash in CTA copy**

Line 436: `"first — no fluff, no pitch deck"` → `"first, no fluff, no pitch deck"`

- [ ] **Step 5: Verify no remaining dashes**

Run: `grep -n '[—–]' src/pages/AuditReport.jsx`
Expected: Only comment lines (273, 282), no user-facing text matches.

- [ ] **Step 6: Commit**

```bash
git add src/pages/AuditReport.jsx
git commit -m "style: remove dashes from AuditReport copy, replace with commas"
```

---

### Task 2: Update Stats + Simplify Footer + Add Scroll Indicator

**Files:**
- Modify: `src/pages/AuditReport.jsx:46-51,459-463,245-247`

- [ ] **Step 1: Replace STATS array (lines 46-51)**

```js
const STATS = [
  { n: '20 hrs', text: 'average time saved per week by small businesses using strategic automation' },
  { n: '20-30%', text: 'reduction in operational costs reported by businesses automating key workflows' },
  { n: '3-6 mo', text: 'typical time to achieve full ROI on automation investment' },
  { n: '3 to 10x', text: 'average ROI reported for every dollar invested in business automation' },
]
```

- [ ] **Step 2: Simplify footer (lines 459-463)**

Replace the existing footer div with:

```jsx
<div style={{ textAlign: 'center', padding: '48px 0 0' }}>
  <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.6rem', color: 'rgba(247,243,237,0.18)', letterSpacing: '0.1em', margin: 0 }}>
    UnderCurrent Automations
  </p>
</div>
```

- [ ] **Step 3: Add scroll indicator between hero CTA and first Divider**

Insert after the hero section closing `</div>` (after line 245) and before `<Divider />` (line 247):

```jsx
<div style={{ textAlign: 'center', padding: '32px 0 0' }}>
  <p style={{
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.62rem',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: 'rgba(143,175,159,0.35)',
    margin: 0,
  }}>
    ↓ SCROLL DOWN FOR MORE
  </p>
</div>
```

- [ ] **Step 4: Visual check**

Run: `npm run dev` (from `/Users/luke/Desktop/Website/undercurrent`)
Open: `http://localhost:5173/report?d=...` (use existing test data)
Verify: scroll indicator centered below CTA, footer shows only "UnderCurrent Automations", stats updated.

- [ ] **Step 5: Commit**

```bash
git add src/pages/AuditReport.jsx
git commit -m "feat: update stats, simplify footer, add scroll indicator"
```

---

### Task 3: Build RadarChart SVG Component

**Files:**
- Create: `src/audit/RadarChart.jsx`

- [ ] **Step 1: Create the RadarChart component**

```jsx
const LABELS = ['Customer Experience', 'Sales', 'Content & Design', 'Personal Systems', 'Finance']
const KEYS = ['customer_experience', 'sales', 'content_design', 'personal_systems', 'finance']
const MAX_HOURS = 20 // cap for normalization

export default function RadarChart({ pillars, size = 300 }) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.36
  const levels = 4
  const angleStep = (2 * Math.PI) / 5

  // Get point on axis at given fraction (0-1) from center
  function point(index, fraction) {
    const angle = angleStep * index - Math.PI / 2
    return [
      cx + radius * fraction * Math.cos(angle),
      cy + radius * fraction * Math.sin(angle),
    ]
  }

  // Normalize hours to 0-1 (capped at MAX_HOURS)
  const values = KEYS.map(key => {
    const hours = pillars?.[key]?.hours_per_week || 0
    return Math.min(hours / MAX_HOURS, 1)
  })

  // Build grid pentagons
  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const frac = (level + 1) / levels
    const pts = Array.from({ length: 5 }, (_, i) => point(i, frac))
    return pts.map(p => p.join(',')).join(' ')
  })

  // Build data polygon
  const dataPoints = values.map((v, i) => point(i, Math.max(v, 0.04)))
  const dataPath = dataPoints.map(p => p.join(',')).join(' ')

  // Label positions (slightly outside the chart)
  const labelPoints = Array.from({ length: 5 }, (_, i) => point(i, 1.22))

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto' }}>
      {/* Grid lines */}
      {gridPaths.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {/* Axis lines */}
      {Array.from({ length: 5 }, (_, i) => {
        const [x, y] = point(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      })}

      {/* Data fill */}
      <polygon
        points={dataPath}
        fill="rgba(143,175,159,0.15)"
        stroke="#8FAF9F"
        strokeWidth="1.5"
      />

      {/* Data points */}
      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="#8FAF9F" />
      ))}

      {/* Labels */}
      {labelPoints.map(([x, y], i) => (
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(247,243,237,0.5)"
          fontSize="9"
          fontFamily="DM Mono, monospace"
          letterSpacing="0.04em"
        >
          {LABELS[i]}
        </text>
      ))}
    </svg>
  )
}
```

- [ ] **Step 2: Verify it renders**

Temporarily import into AuditReport.jsx and test with dev server. Remove after verifying.

- [ ] **Step 3: Commit**

```bash
git add src/audit/RadarChart.jsx
git commit -m "feat: add pure SVG RadarChart component"
```

---

### Task 4: Add Radar Chart Section to AuditReport.jsx

**Files:**
- Modify: `src/pages/AuditReport.jsx`

- [ ] **Step 1: Import RadarChart**

Add to imports at top of file:

```js
import RadarChart from '../audit/RadarChart.jsx'
```

- [ ] **Step 2: Add "Your Business at a Glance" section**

Insert after the Industry Benchmark section's closing `</div>` and before the final `<Divider />` that precedes the CTA. The section goes between the benchmark bars and the CTA card.

```jsx
<Divider />

<div className="ri" style={{ animationDelay: '0.4s' }}>
  <Label>Your Business at a Glance</Label>
  <h2 style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 700, color: C.text, margin: '0 0 32px' }}>
    Where your time is going
  </h2>
  <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: '14px', padding: '32px 24px' }}>
    <RadarChart pillars={data.p} size={320} />
  </div>
</div>
```

- [ ] **Step 3: Visual check**

Run dev server, open report page with test data. Verify:
- Radar chart renders between benchmark bars and CTA
- 5 axes with correct labels
- Data polygon reflects pillar hours
- Matches dark theme aesthetic

- [ ] **Step 4: Commit**

```bash
git add src/pages/AuditReport.jsx
git commit -m "feat: add radar chart section to audit report"
```

---

### Task 5: Build N8n Email Branch, HTML Email Code Node

**Files:**
- Modify: `/Users/luke/Desktop/audit-workflow.json`

- [ ] **Step 1: Add the "Build HTML Email" Code node to the workflow JSON**

Add a new node to the `nodes` array. The Code node:
- Reads `$input.first().json.body.contact` and `$input.first().json.body.benchmark`
- Extracts first name from `contact.full_name`
- Finds biggest leak pillar (highest `hours_per_week * hourly_rate * 4.33`)
- Builds base64 encoded report link data
- Constructs HTML email with inline CSS
- Returns `{ html, recipientEmail, subjectLine }`

```js
// This is the jsCode value for the Code node
const raw = $input.first().json;
const contact = raw.body.contact;
const benchmark = raw.body.benchmark;

if (!contact || !benchmark) {
  throw new Error('Invalid payload: missing contact or benchmark');
}

const firstName = (contact.full_name || '').split(' ')[0] || 'there';

// Find biggest leak
const PILLAR_COPY = {
  customer_experience: {
    label: 'Customer Experience',
    headline: "A lead messaged you at 9pm. By morning they'd booked someone else.",
    fix: "We set up an instant response system that replies, qualifies, and books, while you sleep.",
  },
  sales: {
    label: 'Sales',
    headline: "Your best lead this month replied to your quote. Then went quiet. You followed up two weeks later.",
    fix: "We build a follow up sequence that stays on them for 30 days without you touching it.",
  },
  content_design: {
    label: 'Content & Design',
    headline: "You know you need to post. You just never have time to sit down and do it.",
    fix: "One piece of content gets turned into a week of posts, captions, and emails, automatically.",
  },
  personal_systems: {
    label: 'Personal Systems',
    headline: "You're running the business and doing the admin of a business. That's two full time jobs.",
    fix: "We take the second one off your plate, inbox, scheduling, meeting notes, reporting.",
  },
  finance: {
    label: 'Finance',
    headline: "You did the work. Getting paid for it is somehow still your problem.",
    fix: "Invoices go out the moment a job is marked complete. Overdue reminders run on autopilot.",
  },
};

const pillars = benchmark.pillars || {};
let biggestLeak = null;
let biggestLoss = 0;

for (const [key, pillar] of Object.entries(pillars)) {
  const loss = (pillar.hours_per_week || 0) * (benchmark.hourly_rate || 0) * 4.33;
  if (loss > biggestLoss && PILLAR_COPY[key]) {
    biggestLoss = loss;
    biggestLeak = { key, ...pillar, loss, copy: PILLAR_COPY[key] };
  }
}

const monthlyLoss = benchmark.total_monthly_loss || 0;
const yearlyLoss = monthlyLoss * 12;

function fmtMoney(n) {
  if (!n || n <= 0) return '$0';
  return '$' + Math.round(n).toLocaleString('en-AU');
}

// Build report link data (same format AuditReport.jsx expects)
const reportData = {
  n: contact.full_name,
  b: contact.business_name,
  i: benchmark.industry,
  r: benchmark.hourly_rate,
  p: pillars,
};
const encoded = encodeURIComponent(Buffer.from(JSON.stringify(reportData)).toString('base64'));
const reportUrl = 'https://undercurrentautomations.com.au/report?d=' + encoded;
const calUrl = 'https://cal.com/luke-marinovic-aqeosc/30min';

// Build HTML email
const leakBlock = biggestLeak ? `
  <div style="background: rgba(143,175,159,0.06); border: 1px solid rgba(143,175,159,0.18); border-radius: 14px; padding: 24px 28px; margin: 28px 0;">
    <p style="font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(143,175,159,0.65); margin: 0 0 8px;">YOUR BIGGEST LEAK, ${biggestLeak.copy.label.toUpperCase()}</p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 17px; font-weight: 600; color: #F7F3ED; margin: 0 0 12px; line-height: 1.5;">${biggestLeak.copy.headline}</p>
    <p style="font-family: Arial, Helvetica, sans-serif; font-size: 14px; color: rgba(247,243,237,0.6); margin: 0 0 14px; line-height: 1.6;">${biggestLeak.copy.fix}</p>
    <p style="font-family: 'DM Mono', monospace; font-size: 12px; color: #8FAF9F; margin: 0;">~${biggestLeak.hours_per_week} hrs/week &nbsp;&middot;&nbsp; ${fmtMoney(biggestLeak.loss)}/month</p>
  </div>
` : '';

const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background: #0c0c0c; font-family: Arial, Helvetica, sans-serif;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 24px;">
    <div style="background: rgba(255,255,255,0.028); border: 1px solid rgba(255,255,255,0.07); border-radius: 18px; padding: 40px 32px;">

      <h1 style="font-family: Arial, Helvetica, sans-serif; font-size: 26px; font-weight: 700; color: #F7F3ED; margin: 0 0 12px; line-height: 1.3;">Hey ${firstName}, your audit results are ready.</h1>
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 15px; color: rgba(247,243,237,0.55); margin: 0 0 32px; line-height: 1.6;">We've finished analysing how <strong style="color: #F7F3ED;">${contact.business_name}</strong> is spending its time, and where that time is quietly costing you money.</p>

      <div style="background: rgba(255,80,60,0.06); border: 1px solid rgba(255,80,60,0.18); border-radius: 14px; padding: 28px 28px 24px; text-align: center;">
        <p style="font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,107,80,0.7); margin: 0 0 8px;">ESTIMATED MONTHLY LOSS</p>
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 42px; font-weight: 700; color: #FF6B50; margin: 0 0 4px; line-height: 1;">${fmtMoney(monthlyLoss)}</p>
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 13px; color: rgba(247,243,237,0.45); margin: 0 0 20px;">in unbilled time, missed leads & manual work</p>

        <div style="height: 1px; background: rgba(255,255,255,0.06); margin: 0 0 20px;"></div>

        <p style="font-family: 'DM Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255,107,80,0.7); margin: 0 0 8px;">THAT'S PER YEAR</p>
        <p style="font-family: Arial, Helvetica, sans-serif; font-size: 42px; font-weight: 700; color: #FF6B50; margin: 0; line-height: 1;">${fmtMoney(yearlyLoss)}</p>
      </div>

      ${leakBlock}

      <div style="text-align: center; margin: 32px 0 16px;">
        <a href="${reportUrl}" style="display: inline-block; background: #8FAF9F; color: #0c0c0c; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 700; padding: 15px 36px; border-radius: 9999px; text-decoration: none; letter-spacing: 0.01em;">View Your Full Report →</a>
      </div>

      <div style="text-align: center; margin: 0 0 8px;">
        <a href="${calUrl}" style="display: inline-block; background: transparent; color: #8FAF9F; font-family: Arial, Helvetica, sans-serif; font-size: 15px; font-weight: 600; padding: 14px 36px; border-radius: 9999px; text-decoration: none; border: 1.5px solid rgba(143,175,159,0.3);">Book a Free Strategy Call</a>
      </div>

    </div>

    <div style="text-align: center; padding: 28px 0 0;">
      <p style="font-family: Arial, Helvetica, sans-serif; font-size: 12px; color: rgba(247,243,237,0.2); margin: 0;">UnderCurrent Automations</p>
    </div>
  </div>
</body>
</html>`;

return [{ json: {
  html,
  recipientEmail: contact.email,
  subjectLine: firstName + ", here's your business audit results",
} }];
```

- [ ] **Step 2: Add the Gmail send node to the workflow JSON**

Add a Gmail node (or HTTP Request to Gmail API) after the Code node. In n8n, the simplest approach is a Gmail node:

```json
{
  "parameters": {
    "sendTo": "={{ $json.recipientEmail }}",
    "subject": "={{ $json.subjectLine }}",
    "emailType": "html",
    "message": "={{ $json.html }}",
    "options": {}
  },
  "id": "55555555-5555-5555-5555-555555555555",
  "name": "Send Audit Email",
  "type": "n8n-nodes-base.gmail",
  "typeVersion": 2.1,
  "position": [690, 500],
  "credentials": {
    "gmailOAuth2": {
      "id": "NEEDS_LINKING",
      "name": "Gmail — Audit"
    }
  }
}
```

- [ ] **Step 3: Fork the webhook connection to both branches**

Update the `connections` object so the Webhook node outputs to BOTH "Build Notion Payload" AND the new "Build HTML Email" node:

```json
"Webhook": {
  "main": [[
    { "node": "Build Notion Payload", "type": "main", "index": 0 },
    { "node": "Build HTML Email", "type": "main", "index": 0 }
  ]]
}
```

Add the new connection from "Build HTML Email" to "Send Audit Email":

```json
"Build HTML Email": {
  "main": [[{ "node": "Send Audit Email", "type": "main", "index": 0 }]]
}
```

- [ ] **Step 4: Write the complete updated workflow JSON**

Merge all the above into the existing `audit-workflow.json` file. The final file should have 5 nodes (Webhook, Build Notion Payload, Create Notion Page, Build HTML Email, Send Audit Email) and the forked connections.

- [ ] **Step 5: Commit**

```bash
git add ../../audit-workflow.json
git commit -m "feat: add email branch to audit workflow (Code + Gmail nodes)"
```

---

### Task 6: Import Updated Workflow to N8n

**Files:**
- Reference: `/Users/luke/Desktop/N8N_RECOVERY_GUIDE.md`

- [ ] **Step 1: Check existing workflow ID in n8n**

```bash
curl -s 'https://n8n.undercurrentautomations.xyz/api/v1/workflows' \
  -H 'X-N8N-API-KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDE5MGU2My0wNzkxLTQwYjAtYTMzOS1lNThjYzg4MzBjOGEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWQxOWExZjEtOTIwZS00NzIxLWFlMGYtYWNmZjRmNjMzNmUyIiwiaWF0IjoxNzc0MDE1MTM1LCJleHAiOjE3NzY1NzEyMDB9.lbjyhWxIeDu3n5NTwVpjZpP-_kQ9iqot6ogB07QY6rE' \
  | python3 -c "import sys,json; [print(f'{w[\"id\"]}: {w[\"name\"]}') for w in json.load(sys.stdin).get('data',[])]"
```

- [ ] **Step 2: Update the existing workflow via API (or create new if not found)**

If the "Business Audit → Notion CRM" workflow exists, update it via PUT. Otherwise create via POST.

- [ ] **Step 3: Link Gmail credential in n8n UI**

Open the workflow in n8n UI, click on "Send Audit Email" node, select the Gmail credential. This step CANNOT be automated.

- [ ] **Step 4: Activate the workflow**

Ensure the workflow is active so the webhook endpoint is live.

- [ ] **Step 5: Test end-to-end**

Submit a test audit from the website (or curl the webhook directly). Verify:
- Notion CRM entry is created (Branch A still works)
- Email arrives with correct stats, biggest leak, and working report link
- Report link opens AuditReport.jsx with correct data

---

### Task 7: Final Visual QA

- [ ] **Step 1: Test AuditReport.jsx on desktop (wide viewport)**

Open report at full width. Verify:
- Max-width 840px, centered
- Scroll indicator visible and centered
- Radar chart renders cleanly
- Stats show updated data
- Footer shows only "UnderCurrent Automations"
- No dashes in any user-facing copy

- [ ] **Step 2: Test on mobile viewport (375px)**

Verify responsive grids collapse to single column. Radar chart scales down. All text readable.

- [ ] **Step 3: Test email in Gmail (mobile + desktop)**

Check the HTML email renders correctly in Gmail on both mobile and desktop. Dark theme, stat cards, CTA buttons all visible.

- [ ] **Step 4: Commit any final fixes**

```bash
git add -A
git commit -m "fix: final QA adjustments for audit email and report"
```
