# 00 — Discovery: UnderCurrent Website Redesign 2026

**Project:** UC Website Redesign
**Date:** 2026-04-04
**Owner:** Luke Marinovic
**Status:** Discovery complete, moving to spec

---

## Client Overview

**Business:** UnderCurrent — AI Business Automation
**Location:** Melbourne, Australia
**Tagline:** Intelligent automation for small business owners who want their time back.
**Positioning:** Calm, direct, operator-to-operator. No hype. No jargon.
**Primary revenue action:** Book a discovery call.

---

## Problem Statement

The current website (React + Vite SPA) has too much going on visually. Excessive animations (GSAP, WaterCanvas, InteractiveWaves, WaveDividers, Loader, ScrollProgressBar), a jittery feel, and a homepage that is too long and unfocused. Visitors are not being led clearly toward booking a call. The design does not match the calm, confident, operator-level brand voice.

Specific issues:
- Too many animations competing for attention
- Homepage structure is bloated (10+ sections without clear flow)
- Visitor journey is unclear — no single dominant CTA path
- Current React SPA architecture is not ideal for SEO (client-rendered, no SSR)
- Design system (warm sage/parchment palette) no longer reflects the direction of the brand

---

## Desired Outcome

A clean, minimalistic Next.js website rebuilt section by section on a `redesign` git branch. The redesign will:

- Replace the existing Vite/React SPA with a Next.js App Router build
- Use a new, confident design system (steel blue, charcoal, clean white)
- Eliminate all heavy animations, replacing with simple CSS fade-on-scroll only
- Create a clear visitor flow with a single primary CTA: **Book a Call**
- Preserve all existing URLs and route structure (zero SEO/GEO impact)
- Be built and reviewed locally before any production deployment
- Include photos and short MP4 demo clips of automations embedded throughout

---

## Constraints

- **No live deployment until complete** — all work on `redesign` branch, localhost only
- **Preserve all existing URLs exactly** — location pages, service pages, resource slugs, etc.
- **SEO/GEO must be unaffected** — same route structure, same content, same meta tags
- **No overloading local machine** — one dev server, no parallel projects
- **Slow project by design** — one section at a time, approved before moving on
- **No placeholder testimonials** — testimonial section is a reserved slot, populated when real ones exist
- **About Me section** — planned but not built in initial phase

---

## New Design System

### Color Palette

| Token | Hex | Use |
|---|---|---|
| `--white` | `#FAFAF8` | Page background |
| `--charcoal` | `#1C1C1A` | Primary text, dark sections |
| `--blue` | `#6A8DAD` | Hero accent, CTAs, highlights |
| `--blue-dark` | `#4A6D8D` | Blue hover states |
| `--muted` | `#6B7280` | Subtext, captions |
| `--border` | `#E5E7EB` | Dividers, card borders |
| `--surface` | `#F3F4F6` | Card backgrounds, table rows |

Retired: sage green, warm sand, parchment, off-white warm tones.

### Typography

| Role | Font | Weight | Notes |
|---|---|---|---|
| H1 / H2 | Space Grotesk | Medium / Bold | Sharp, technical, ownable — primary visual voice |
| H3 / Subheading | Satoshi | Medium | Geometric but softer — bridges headline and body |
| Body / Caption | Satoshi | Regular / Light | Clean, legible, recedes properly |

Space Grotesk loaded via `next/font/google`. Satoshi self-hosted via Fontshare (not on Google Fonts — download woff2 files and serve locally for zero layout shift).

Retired: Inter, Cormorant Garamond, DM Sans, DM Mono.

### Animation Philosophy

- **Remove:** GSAP, WaterCanvas, InteractiveWaves, WaveDividers, Loader, ScrollProgressBar
- **Keep:** One CSS fade-up on scroll via IntersectionObserver (no library)
- **Transitions:** `200ms ease` on hover states only — nothing moves unless user-triggered
- Hovers, transitions, scroll effects will be dialled in as a final pass after sections are approved

---

## Homepage Structure (Approved)

| # | Section | Notes |
|---|---|---|
| 1 | Hero | Headline + Book a Call CTA. Hero background TBD: lighter video, or clean white with charcoal/blue. |
| 2 | Proof strip | Stats/results ticker — social proof at a glance |
| 3 | Services | What we offer |
| 4 | Industry scroller | Tag-based quick scroll showing industries served |
| 5 | How We Help | What the client actually receives |
| 6 | Comparison: Us vs Agencies | Table format |
| 7 | Comparison: With vs Without Automation | Table format |
| 8 | Process | Interview → Build → Maintain |
| 9 | Pricing | Quick pricing overview |
| 10 | Tool / CTA widget | Lead capture or booking prompt |
| 11 | Testimonials | Reserved slot — populate when real testimonials available |
| 12 | FAQ | 8–15 questions, SEO-optimised |
| 13 | Final CTA | Last conversion push |
| 14 | About Me | Planned, not in initial phase |

Media: photos + short MP4 automation demos embedded throughout (supplied by Luke).

---

## Technical Approach

**Framework:** Next.js (App Router)
**Styling:** Tailwind CSS
**Fonts:** `next/font/google` — Space Grotesk + Inter
**Branch:** `redesign` (off `main`)
**Dev server:** `localhost:3000`
**Deploy:** Vercel — swap to `redesign` branch only when full site is approved
**Route preservation:** All existing slugs mapped 1:1 in Next.js file-based routing
**Current site:** Stays live on `main` untouched throughout

---

## Success Criteria

- [ ] Visitor lands on homepage and has one clear action: book a call
- [ ] Zero jitter, zero competing animations
- [ ] All existing URLs resolve correctly in the new build
- [ ] Lighthouse SEO score maintained or improved (SSR helps)
- [ ] Each homepage section approved by Luke before moving to the next
- [ ] Design feels: calm, confident, operator-level — not agency-flashy
- [ ] Site deploys cleanly to Vercel with no build errors
- [ ] No broken links, no 404s on any existing route

---

## Out of Scope (This Phase)

- Testimonials section content (structure built, content deferred)
- About Me page
- New case studies
- Blog/resources redesign (routes preserved, visual update deferred)
- Any backend logic changes
