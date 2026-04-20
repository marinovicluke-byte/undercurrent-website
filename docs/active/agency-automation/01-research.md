# Agency Automation Pipeline — Research Synthesis

**Date:** 2026-04-14
**Sources:** 5 parallel research agents (tech stack, existing solutions, orchestration, cost/complexity, risks/edge cases)

---

## Executive Summary

The pipeline is technically feasible, financially attractive (88% net margin at scale), and sits in a genuine market gap. No competitor combines owned Next.js sites + sub-$500 pricing + 7-day delivery + full automation for trades. The critical risks are not technical but operational: AI quality variance, SLA enforcement, and solo operator fragility. The research surfaced several architecture changes from discovery that improve the build.

---

## Top 3 Recommended Approaches (Ranked)

### 1. Custom Pipeline (Recommended)

**Next.js multi-tenant on Vercel + Supabase CRM + FastAPI/ARQ on Hetzner + Claude API for generation**

This is the discovery stack with three refinements from research:

| Discovery Decision | Research Revision | Why |
|---|---|---|
| 25 sites per Vercel project | Single multi-tenant deploy with middleware routing | Vercel Platforms architecture handles 100k+ custom domains on one project. 25-per-project adds management overhead with no benefit. Use the [Platforms Starter Kit](https://github.com/vercel/platforms) |
| FastAPI (unspecified hosting) | Hetzner CX22 VPS + Docker Compose (FastAPI + ARQ worker + Redis) | $5/mo, handles the full pipeline. Railway/Fly.io cost 2-4x more for this workload. Luke already uses Hetzner |
| "Pure Python automation" | Saga pattern state machine + ARQ task queue | Research confirms this is the right orchestration pattern. Append-only event log in Supabase for audit trail. ARQ over Celery (async-native, lighter) |

**Pros:** Full control, highest margin, no platform dependency beyond Vercel/Supabase, defensible through automation depth.
**Cons:** Highest build complexity. Every integration is custom. Solo operator must maintain it all.
**Estimated build time:** 3-4 weeks to MVP (manual deploy acceptable), 6-8 weeks to full automation.

### 2. Hybrid: GoHighLevel + Custom Sites

**GHL ($297/mo) for CRM, automations, nurture sequences + custom Next.js sites on Vercel + Claude API for generation**

GHL replaces the Supabase CRM, FastAPI orchestration, and email/SMS automation layers. You build only the site generation and deployment pieces.

**Pros:** Cuts build time by ~40%. GHL handles lead capture, onboarding forms, payment (Stripe built-in), nudge sequences, review requests, and post-sale automation out of the box. Battle-tested at scale by thousands of agencies.
**Cons:** $297/mo fixed cost regardless of volume. Locked into GHL's ecosystem. GHL websites are funnel pages, not SEO-ready, so you still need custom Next.js sites. Two systems to maintain instead of one cohesive pipeline.
**When to consider:** If build time is the bottleneck and you want to start selling in week 1.

### 3. White-Label Platform: 10Web + GHL

**10Web ($100+/mo) for AI site generation + GHL ($297/mo) for everything else**

10Web's white-label reseller dashboard generates WordPress sites, handles hosting, and provides a branded client portal. GHL handles the pipeline. You become a pure operator, no code.

**Pros:** Fastest to market. Zero custom code. Unlimited client sites under your brand.
**Cons:** Sites are WordPress, not Next.js (contradicts the brand positioning). Output quality is generic. Margin compression from two platform fees (~$400/mo before revenue). No differentiation, every GHL agency can replicate this. Lose the "you own your site" narrative if 10Web hosts.
**When to consider:** Only as a validation play to test demand before building the custom pipeline.

### Verdict: Approach 1

The custom pipeline is the right call. The margin advantage ($4,420/mo net vs ~$4,100/mo with GHL overhead), full control, and defensibility through automation depth justify the extra build time. The hybrid approach is a reasonable fallback if build takes longer than expected.

---

## Architecture Refinements from Research

### Multi-Tenant (Single Deploy)

```
Request → Vercel Middleware (reads hostname)
       → Rewrites to /[tenant-slug]/...
       → Loads client config from Supabase
       → Renders with tenant theme (CSS variables via @theme)
```

One Next.js deployment serves all client sites. Custom domains route via middleware. Vercel Pro supports this natively. Template differentiation happens through:
- `site.json` config per client (business name, services, contact, trade type)
- CSS variables injected via Tailwind v4 `@theme` directive (colours, fonts)
- Content stored in Supabase, loaded at build/request time
- Client images in Supabase Storage

### Orchestration Architecture

```
Meta Ads → /webhooks/meta (FastAPI on Hetzner)
                ↓
        ARQ: create_lead()
                ↓
        Supabase: clients table (stage = LEAD)
                ↓
        PipelineOrchestrator.transition()
                ↓ (enqueues per-stage ARQ tasks)
        ┌─────────────────────────────────┐
        │  ARQ Worker                     │
        │  - send_onboarding_email()      │
        │  - charge_stripe_deposit()      │
        │  - trigger_claude_build()       │
        │  - deploy_to_vercel()           │
        │  - remind_client(nudge_level)   │
        │  - notify_operator_telegram()   │
        └─────────────────────────────────┘
                ↓ (on failure)
        failed_jobs → Supabase webhook → Telegram alert
```

- **State store:** Supabase Postgres with `stage` enum + `pipeline_events` append-only log
- **Task queue:** ARQ (async, Redis-backed)
- **Nudge sequences:** ARQ deferred jobs (`_defer_by=timedelta(hours=48)`), not cron
- **Webhook idempotency:** `processed_webhook_events` table keyed on event.id
- **Monitoring:** structlog + Sentry (free tier) + UptimeRobot + custom dead letter alerts via Telegram

### Stripe Billing Flow

```
1. Customer submits onboarding → Stripe Customer created
2. PaymentIntent for $449 (deposit) → collected immediately
3. On payment success → pipeline triggered
4. On site delivery + approval → Subscription for $50/month
```

Direct charges only (no Stripe Connect). Split payment: 25% deposit ($112) triggers build, remaining 75% ($337) on delivery confirmation. Client portal link in handover email for subscription self-management.

---

## Unit Economics

### Per-Client

| Item | One-Time Cost | Monthly Cost |
|---|---|---|
| AI generation (Claude API) | $0.10 | — |
| Domain registration | $13.00/yr | $1.08 (amortised) |
| Stripe fees | $13.32 on $449 | $2.00 on $50 |
| Ad acquisition (blended) | $40-80 | — |
| Vercel (shared) | — | $0.20 |
| Supabase (shared) | — | $0.35 |
| **Total cost** | **$66-106** | **$3.63** |
| **Revenue** | **$449** | **$50** |
| **Gross margin** | **76-85%** | **93%** |

### At 100 Clients

| | Monthly |
|---|---|
| Gross MRR | $5,000 |
| Stripe fees | -$200 |
| Vercel Pro | -$20 |
| Supabase Pro | -$35 |
| Claude API | -$15 |
| Hetzner VPS | -$5 |
| Domain renewals | -$110 |
| Ad spend | -$200 |
| **Net MRR** | **$4,415** |
| **Net margin** | **88%** |

Break-even on recurring alone: **12 clients**.

---

## Key Risks to Carry Forward

### Critical (Must Address Before Launch)

1. **AI quality floor.** The 15-20 min manual polish budget will be exceeded on 20%+ of builds without guardrails. Mitigation: lock onboarding form to required fields (5+ photos, ABN, licence number, exact services, service area). Gate build trigger on form completeness. Run automated Lighthouse/axe-core scans pre-deploy.

2. **7-day SLA legal exposure.** "Free if late" is a promotional guarantee under Australian Consumer Law, must be honoured as advertised. Mitigation: redefine as "7 business days from asset submission confirmation" with force majeure clause for platform outages. Get this reviewed by a lawyer.

3. **Professional indemnity insurance.** AI-generated content could contain inaccurate claims (e.g., "licensed and insured" when client isn't). E&O insurance ~$100/mo AUD. Required before client 1.

4. **Trades licence compliance.** QLD, NSW, VIC all require licence numbers on advertising for regulated trades. Onboarding form must collect this as a required field.

### High Priority (Address Before 50 Clients)

5. **Solo operator fragility.** At 100 clients, even 3 days of illness breaches multiple SLAs. Pipeline must run zero-touch for routine operations. Exception handling budget: if it exceeds 2 hrs/week, stop selling.

6. **Client churn.** SMB monthly churn benchmark: 3-8%. At 4%, losing 4 clients/month requires 48 new acquisitions/year just to hold flat. Mitigation: monthly automated value reports, annual prepay option ($480/yr), clear offboarding SOP.

7. **Meta Ads alone won't scale.** At $200/mo spend, expect ~5 leads/month, ~0.75 paying clients/month. Direct outreach (trades Facebook groups, cold DMs, Google Business Profile owners) will outperform ads 3-5x in early phase. Ads are a long-tail channel at this budget.

8. **Payment chargebacks.** Web design has above-average dispute rates. Require explicit written approval at each stage (onboarding complete, design approved, site live) stored in Supabase as evidence trail.

---

## Open Questions for Architecture

1. **Multi-tenant vs project-per-client on Vercel?** Research strongly favours single multi-tenant deploy. But risks agent flags that one bad site affects all. Decision needed: accept shared risk for operational simplicity, or pay the management overhead of isolation?

2. **Supabase for everything vs split concerns?** CRM data, pipeline state, client site content, and asset storage all in one Supabase project. Simple but creates a single point of failure. Acceptable at 100 clients?

3. **Claude API vs Claude Code for generation?** API is cheaper and more controllable for programmatic use. Claude Code (via Agent SDK) is more capable for complex multi-file generation. Which fits the template-customisation workflow better?

4. **GHL as fallback?** If the custom pipeline build stalls, is the hybrid approach (GHL for automation + custom sites) an acceptable interim? Adds $297/mo but removes 40% of build scope.

5. **Domain strategy?** Buy-and-markup via Namecheap API, or bundle into $50/mo maintenance? Bundling simplifies the sale but eats $1.08/mo margin per client.

---

## Recommended Build Order (Fastest to Revenue)

**Week 1: Sellable MVP**
1. One polished Next.js trades template (general services niche)
2. Stripe payment link ($449)
3. Onboarding form (Typeform or custom) → Supabase
4. Claude API script: intake JSON → site copy (run manually)
5. Telegram bot for payment + delivery alerts

**Week 2: Close the Loop**
6. Vercel API: project creation + domain attachment
7. Namecheap/Cloudflare DNS automation
8. FastAPI endpoint wrapping steps 6-7
9. Client email automation (welcome, delivery, handover)

**Week 3: Full Pipeline**
10. Stripe webhook → FastAPI → full build chain
11. ARQ task queue + saga state machine
12. Nudge sequences (deferred ARQ jobs)
13. Supabase CRM dashboard

**Week 4+: Marketing**
14. Landing page for the agency
15. Meta Ads campaign (general trades audience)
16. Direct outreach to local trades Facebook groups

---

## Research Complete

Next step: `/architect` to resolve the open architecture questions and produce a system design.
