# Homepage Redesign — Design Spec
**Date:** 2026-03-19
**Project:** Undercurrent — AI Automation Agency
**Route:** `/` (main homepage)
**Framework:** Donald Miller StoryBrand SB7 + Alex Hormozi conversion principles

---

## Overview

Redesign the main homepage to be outcome-first and customer-centric. The customer (small business owner wearing too many hats) is the hero. Undercurrent is the guide. Every section answers one question the visitor is already asking.

Copy must be Grade 5 language — clear, simple, no jargon. Design keeps the existing brand: dark (`#1C1C1A`), sage (`#8FAF9F`), cream (`#F7F3ED`, `#D4C9B0`), gold (`#C4A97A`), slate (`#89ACBE`), forest (`#6B7C4A`), Cormorant + DM Sans + mono fonts. Animations stay but serve the story — not the other way around.

---

## Target Customer

Small business owner running their own business. Overwhelmed, wearing too many hats, no good system in place. Not industry-specific — any service business with repetitive tasks and customers.

**Their villain:** Time theft. Manual, repetitive tasks that eat hours every day and stop them growing.
**Their dream:** A business that runs itself so they can focus on work only they can do.

---

## Primary CTAs

- **Primary:** Book Your Free Audit → (links to cal.com booking)
- **Secondary:** Try the Free Calculator → (links to `/audit`)

Both CTAs appear in the hero and repeat in Sections 6 and 8.

---

## Pricing Model

Value-based pricing — priced on the value created, not an hourly rate. If the business saves $20,000/year, Undercurrent takes a small share, the client keeps the rest. Most clients see full ROI within six months. Ongoing maintenance exists but is not mentioned on this page — pricing detail handled on the call.

---

## Page Structure

### Section 1 — Hero (dark gradient background)

**Animation:** Keep existing water current canvas (GSAP fade-up entrance). No changes to animation.

**Eyebrow:** `MELBOURNE AI AUTOMATION STUDIO`

**Headline:**
> Your Business Should Run Without You Doing Everything.

**Sub-headline:**
> We build AI systems that chase your leads, follow up your clients, and clear your inbox — so you can get back to the work that actually grows your business.

**Two CTAs (side by side):**
- Primary (solid sage button): `Book a Free Audit →`
- Secondary (ghost/outline button): `Try the Free Calculator →`

**Trust chips (below CTAs):**
> No tech knowledge needed · Live in 14 days · Results in 30 days or we keep going

---

### Section 2 — Proof Strip (dark background `#1C1C1A`)

Four outcome stats. Cormorant font for numbers. No explanation needed — just the result.

| Stat | Label |
|------|-------|
| 12 hrs | Saved every week |
| +40% | More leads converted |
| +31% | More 5-star reviews |
| $800+ | Saved per week in admin costs |

Same dark bar as existing. Structural change: none. Copy change: replace existing 4th stat.

---

### Section 3 — The Problem (cream background `#F7F3ED`)

**Eyebrow:** `THE PROBLEM`

**Headline:**
> You're the most expensive person in your business — doing the cheapest tasks.

**Sub-copy:**
> Every hour you spend chasing invoices, following up leads, or writing the same email again is an hour you're not growing your business.

**Problem Strip — horizontal card layout (replaces accordion):**

5 cards in a horizontal row. Desktop: all 5 visible. Mobile: swipe carousel with edge fade hinting more cards exist.

**Card design:**
- Large ghost number (01–05) in Cormorant at 6% opacity — scales to 45% opacity and sage (`#8FAF9F`) on hover. All five cards use sage as the hover accent colour. No individual per-card accent. 45% is intentional — readable but not overpowering the card title.
- Bold problem title, one-line description
- Small pulsing dot (soft red/amber, 2s pulse loop) in top-right corner — signals the problem is happening right now
- On hover: card lifts (`translateY -6px`), sage accent bar slides in from left along top edge, subtle warm glow behind card
- Mobile: active card scales up (`1.02×`), inactive cards fade to 80% opacity, momentum scroll

**Five problems:**

| # | Title | Description |
|---|-------|-------------|
| 01 | You're losing clients before they even start | No follow-up system means leads go cold and clients feel ignored |
| 02 | Your best leads are going cold right now | Every hour without a reply is a deal sliding to your competitor |
| 03 | You're invisible online because content takes too long | You know you should post. You never have time. |
| 04 | Your inbox is running your day, not you | 3–4 hours a day on email and scheduling. Every single day. |
| 05 | You're chasing money you've already earned | Late invoices and manual reconciliation are costing you hours and cash |

---

### Section 4 — The Dream (dark background `#1C1C1A`)

**Eyebrow:** `WHAT CHANGES`

**Headline:**
> Here's what your business looks like when it runs itself.

**Three animated outcome cards** (keep existing card structure, reframe content):

**Card 1 — Time** (sage accent `#8FAF9F`)
- Stat: `12 Hours Back Every Week`
- Copy: Your follow-ups, reminders, and inbox — handled automatically. You only touch what actually needs you.
- Animated visual: Numeric counter. Starts at 0, counts up to 12 over 2.5s with an ease-out curve. Triggered on scroll-enter. Holds at 12 — does not loop. Unit label "hrs/week" appears alongside the number.
- Service tags: `Sales · Personal Admin`

**Card 2 — Money** (gold accent `#C4A97A`)
- Stat: `$800+ Saved Every Week`
- Copy: Every invoice chased, every receipt logged, every overdue payment followed up — without you lifting a finger.
- Animated visual: Dollar counter. Starts at $0, counts up to $800 over 2.5s with an ease-out curve. Triggered on scroll-enter. Holds at $800+ — does not loop. Uses a CSS number counter animation (no external library required).
- Service tags: `Finance · Customer Experience`

**Card 3 — Growth** (slate accent `#89ACBE`)
- Stat: `+40% More Leads Converted` (consistent with Section 2 proof strip — same number used throughout)
- Copy: Every enquiry gets a fast, personal reply. Every lead gets followed up. No one slips through the cracks.
- Animated visual: Mini pipeline — three circular nodes (16px diameter, filled with slate `#89ACBE` at 30% opacity, border 1px solid `#89ACBE`) labelled below in DM Sans 10px at 50% opacity (labels: "Enquiry", "Follow-up", "Booked"). Nodes connected by a horizontal dashed line (1px, `#89ACBE` at 20% opacity). A single dot (8px, solid `#89ACBE`) animates along the track left to right, taking 1.5s per traverse with a 0.5s pause at each node. Triggered on scroll-enter, loops continuously.
- Service tags: `Sales · Content`

**Below all three cards:**
> *"We do the repetitive work so you can focus on the work only you can do."*

**Service area tags note:** Small muted pill tags on each card hint at the 5 service areas (Sales, Customer Experience, Finance, Content, Personal Admin) without making it a feature. Full detail lives on the Services page.

---

### Section 5 — The Plan (cream background `#F7F3ED`)

**Eyebrow:** `HOW IT WORKS`

**Headline:**
> Three steps. Then it runs itself.

**Sub-copy:**
> You don't need to know how it works. You just need to know it does.

**Three step cards** (keep existing white card style, large ghost number, accent tag at bottom):

**Step 1** (sage accent)
- Title: We find where your time is going
- Body: In a free 30-minute call we look at everything you do every week. We show you exactly what can be automated and how much time it will give back.
- Tag: `Free 30-min call`

**Step 2** (gold accent)
- Title: We build it. You don't touch a thing.
- Body: We set everything up inside the tools you already use. No new software. No learning curve. Nothing changes about how you work — we just remove the slow parts.
- Tag: `Done for you · 2 weeks`

**Step 3** (green accent `#6B7C4A`)
- Title: It runs. You get your time back.
- Body: Your leads get followed up. Your clients feel looked after. Your inbox stays clear. It works around the clock so you don't have to.
- Tag: `Ongoing · Always on`

**Connector animation:**
- Desktop: Dashed sage line draws itself left to right between cards on scroll-enter
- Mobile: Vertical dashed line runs down the left edge of stacked cards, draws downward as user scrolls. Each card slides in from right on enter.

---

### Section 6 — The Offer (dark background `#1C1C1A`)

**Eyebrow:** `THE OFFER`

**Headline:**
> You only pay based on what it saves you.

**Sub-copy:**
> We price on the value we create — not an hourly rate. If your business saves $20,000 a year, you keep most of it. We take a small share. Most clients see their full investment back within six months.

**Three Cormorant italic statements** (staggered fade-up on scroll):
> *Priced on the value it creates — not an hourly rate.*
> *Done for you, inside the tools you already use.*
> *Results in 30 days. Or we keep going — no charge.*

**Divider:** Thin sage line (1px, `#8FAF9F` at 20% opacity) draws left to right before the statements appear. Duration: 0.6s ease-in-out. Triggered when section is 20% into the viewport. The first statement begins fading in 0.2s after the line draw completes. Signals ceremony/importance.

**Guarantee card** (sage border, Shield icon):
> **Zero-Risk Guarantee.** If we can't find you at least 5 hours a week to automate in the free audit — the call is free and you keep every insight.

**Guarantee card animation:** Slow pulsing sage glow around the border. ~3 second pulse loop. Signals safety and confidence.

**Two CTAs:**
- Primary (solid sage): `Book Your Free Audit →` — subtle one-time shimmer sweep (45-degree white sweep at 20% opacity, 0.6s duration) on first scroll-enter only. Does not repeat if user scrolls away and back. Intent: catches the eye at the moment the user is most likely to convert, without being distracting on repeat views.
- Secondary (ghost): `Try the Free Calculator →`

---

### Section 7 — FAQ (cream background `#F7F3ED`)

**Eyebrow:** `QUESTIONS`

**Headline:**
> You probably have a few questions. Here are the honest answers.

**Design:** Keep existing accordion style on desktop and mobile. Copy rewrite only.

**Four questions:**

**Q: Will this work for my type of business?**
> If you run a service business and you have repetitive tasks — yes. We work with coaches, consultants, trades, agencies, healthcare. If you're wearing too many hats, we can help. The free audit tells you exactly how much.

**Q: Do I need to learn new software?**
> No. We build everything inside the tools you already use — Gmail, Notion, HubSpot, Slack, whatever you've got. Nothing changes about how you work. We just remove the slow parts.

**Q: How long until I see results?**
> Most clients save meaningful time in the first two weeks. Full ROI usually lands within six months. We move fast because we've done this before.

**Q: What if it doesn't work?**
> That's what the free audit is for. Before we build anything, we show you exactly what we'll automate and how many hours it saves. You see the numbers first. If they don't impress you — walk away, no charge.

---

### Section 8 — Final CTA (dark background `#1C1C1A`)

**Design:** Intentionally the simplest section on the page. No cards, no grid. Clean fade-up only. Restraint signals confidence.

**Headline (Cormorant italic, large):**
> *"What would you do with 12 hours back every week?"*

**Sub-copy:**
> Book a free 30-minute call. We'll show you exactly where your time is going and what an automated version of your business looks like. No obligation. No tech knowledge needed.

**Two CTAs:**
- Primary: `Book Your Free Audit →`
- Secondary: `Try the Free Calculator →`

**Trust chips:**
> No tech knowledge needed · Live in 14 days · Results in 30 days or we keep going

---

## What Stays the Same

- Brand colours: `#1C1C1A`, `#8FAF9F`, `#F7F3ED`, `#D4C9B0`, `#C4A97A`, `#89ACBE`, `#6B7C4A`
- Typography: Cormorant (headlines/italic), DM Sans (body), Mono (eyebrows/tags)
- Water current canvas animation on hero
- GSAP fade-up entrance animations
- Navbar, Footer, ScrollProgressBar
- FAQ accordion (desktop + mobile)
- Existing animated card structure (Section 4) — content reframed only

## What Changes

- All copy rewritten to Grade 5 language, outcome-first, customer-as-hero
- Hero: two CTAs (book + calculator), updated trust chips
- Proof strip: 4th stat changed to `$800+ saved per week in admin costs`
- Problem section: accordion replaced with horizontal swipe card strip
- Dream section: 3 cards reframed around Time / Money / Growth outcomes with animated visuals and service area pill tags
- Plan section: copy rewritten outcome-first, animated connector line added
- Offer section: value pricing messaging, pulsing guarantee card, drawing divider line
- FAQ: copy rewritten in Grade 5 language, 4 questions total

---

## Files to Modify

- `src/App.jsx` — no structural change needed
- `src/components/Hero.jsx` — add second CTA, update trust chips
- `src/components/Benefits.jsx` — likely replace or rewrite as Problem strip (Section 3)
- `src/components/WhatWeAutomate.jsx` — likely replace or rewrite as Dream cards (Section 4)
- `src/components/Protocol.jsx` — rewrite as Plan section (Section 5)
- `src/components/Pricing.jsx` — rewrite as Offer section (Section 6)
- `src/components/FAQ.jsx` — copy rewrite only
- `src/components/Contact.jsx` — replace with Final CTA section (Section 8)
- `src/components/Features.jsx` — **remove from homepage.** This component is replaced by the Dream section (Section 4). Delete the import and usage in `App.jsx`. Do not delete the file itself in case it is used on other routes.
- `src/index.css` — no change expected
