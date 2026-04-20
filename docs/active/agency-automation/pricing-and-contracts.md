# Agency Automation Pipeline — Pricing & Contract Structure

**Date:** 2026-04-14
**Status:** Framework decisions made, ready for lawyer review

---

## Pricing Model

### One-Time: $449

- Custom Next.js website built to client's trade niche
- All content, copy, images, SEO metadata — client owns permanently
- 7-day delivery guarantee from asset submission confirmation

### Recurring: $50/month (no lock-in)

- Hosting, SSL, uptime, infrastructure maintenance
- 1 minor update per month included (text, image, contact detail changes)
- 30-day cancellation notice required

### Hourly: $100/hour

- Any client-requested changes beyond the included minor update
- New pages, layout changes, feature additions
- Minimum billing unit TBD (lawyer to advise)

---

## Unit Economics

### Per-Client One-Time

| Item | Cost |
|---|---|
| AI generation (Claude API, Sonnet) | $0.10 |
| Domain registration (first year) | $13.00 |
| Stripe fee on $449 | $13.32 |
| Ad acquisition (blended, some organic) | $40-$80 |
| **Total variable cost** | **$66-$106** |
| **Revenue** | **$449** |
| **Gross margin** | **76-85%** |

### Per-Client Monthly

| Item | Cost/month |
|---|---|
| Vercel hosting (shared $20/100) | $0.20 |
| Supabase CRM (shared $35/100) | $0.35 |
| Stripe fee on $50 | $2.00 |
| Domain renewal (amortised) | $1.08 |
| **Total cost** | **$3.63** |
| **Revenue** | **$50** |
| **Net margin** | **93%** |

### At 100 Clients

| | Monthly |
|---|---|
| Gross MRR | $5,000 |
| Stripe fees | -$200 |
| Vercel Pro | -$20 |
| Supabase Pro | -$35 |
| Claude API | -$15 |
| Hetzner VPS | -$5 |
| Domain renewals (amortised) | -$110 |
| Ad spend | -$200 |
| **Net MRR** | **$4,415** |
| **Net margin** | **88%** |

Break-even on recurring alone: **12 clients**.

---

## Value Anchoring

### Competitor Price Points

| Competitor | Price | Weakness |
|---|---|---|
| Scorpion / Blue Corona | $3,000-$10,000/month | Proprietary CMS, lock-in, $24k buyout clauses |
| GoSite | $299-$349/month | Poor quality, mixed reviews, platform lock-in |
| Thryv | $623-$1,133/month | Expensive, limited flexibility |
| Wix / Squarespace / Durable | $12-$35/month | DIY, generic, no trades optimisation |

### Positioning

- $449 one-time < 1 day of tradie billable time ($80-$150/hr)
- $50/month = 85% cheaper than GoSite ($299-$349/mo) for better output
- $50/month below "suspiciously cheap" floor, above DIY tier
- "No contracts, leave anytime" as weapon against Scorpion's 12-month lock-in
- Client owns the site (portable Next.js) vs Scorpion's proprietary prison

### Future Tier Structure (post-validation)

| Tier | Includes | Price |
|---|---|---|
| Base | Hosting, SSL, uptime, 1 minor update/month | $50/month |
| Growth | Base + monthly SEO report + 1 content update/month | $150/month |
| Performance | Growth + Google Ads management + lead tracking | $300/month |

All tiers anchor below GoSite's $349/month base price.

---

## Contract Structure

### What the Client Is Buying
A website (product purchase) + hosting (subscription). NOT a managed service.

### Purchase Agreement ($449)
- Client receives: custom Next.js website, all content/copy/images/metadata
- Client owns: all generated copy, all content, their domain
- Delivery: 7 business days from asset submission confirmation
- Late delivery: site is free (promotional guarantee, needs lawyer-reviewed terms)
- Force majeure: documented third-party platform outages extend SLA

### Hosting Subscription ($50/month)
- No lock-in, no minimum term
- 30-day cancellation notice (operational, not punitive)
- Includes: hosting, SSL, uptime monitoring, infrastructure maintenance, 1 minor update/month
- Does not include: content changes beyond 1/month, new pages, layout changes, feature additions
- Additional work: $100/hour

### Minor Update Definition
"Text, image, or contact detail changes to existing pages." New pages, structural layout changes, and feature additions are hourly work.

### On Cancellation
- Site files exported and provided to client
- Domain transferred to client's registrar
- All generated copy and content goes with the client
- 30-day notice period, final invoice, clean break
- No ongoing obligations either direction

### Protected IP (Never Exposed in Contract)
- Pipeline orchestrator, saga state machine, ARQ workers
- Niche template system and config/rules layer
- AI generation skills, prompts, StoryBrand implementation
- Multi-tenant Vercel architecture
- These are trade secrets, not referenced or implied in client-facing documents

### Legal Items for Lawyer Review
1. 7-day guarantee terms under Australian Consumer Law (promotional guarantee must be honoured)
2. Force majeure clause for platform outages
3. Limitation of liability for AI-generated content (e.g., inaccurate claims)
4. "Minor update" definition precision
5. Data controller responsibilities (client is controller for their site's contact form submissions)
6. Trades licence number display requirements (state-by-state compliance)
7. Professional indemnity insurance requirements (~$100/mo AUD, required before client 1)

---

## Decisions Log

| Decision | Rationale |
|---|---|
| Flat pricing, no revenue share | Trades website leads are unattributable, revenue share creates disputes |
| No lock-in, month-to-month | $449 recovers acquisition cost day one, $50/month is pure margin, "no contracts" is a sales weapon |
| 30-day cancellation notice | Operational hygiene for offboarding, not lock-in |
| Client owns all copy | They paid for it, clean ownership, consistent with "buying a website" framing |
| 1 minor update/month included | Standard inclusion, not an add-on. Prevents $50/month feeling like "just hosting" |
| $100/hour for additional work | Protects against high-touch clients, self-selects into fair payment or fewer requests |
| Pipeline is trade secret | Client never sees or references the automation system, templates, or AI skills |
