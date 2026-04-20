# Agency Automation Pipeline — Architecture

**Date:** 2026-04-14
**Method:** Stochastic consensus (5 independent Sonnet agents, Opus synthesis)

---

## Chosen Approach

Single-deploy multi-tenant Next.js on Vercel Platforms, orchestrated by a FastAPI/ARQ saga state machine on Hetzner CX22, with Supabase as the unified data layer and Claude API for structured site generation. No n8n, no GHL, no external form tools. Pure Python automation with direct API integrations.

---

## Workflow/Automation Structure

### End-to-End Pipeline

```
Meta Ads ($200/mo budget)
  └─ Landing Page (Next.js on Vercel, static)
       └─ Lead Capture Form → Supabase `leads` table
            └─ ARQ: send_welcome_sequence (Resend, 3 emails over 5 days)
                 └─ Onboarding Form (Next.js multi-step, same app)
                      └─ Stripe Checkout ($112 deposit, 25%)
                           └─ Stripe webhook → FastAPI → ARQ: generate_site
                                └─ Claude API → structured JSON site spec
                                     └─ Pydantic validation → Supabase `site_content`
                                          └─ Vercel ISR revalidation → preview URL live
                                               └─ Telegram alert to Luke: "Review ready"
                                                    └─ Luke reviews in Admin UI (~15 min)
                                                         └─ Approve → ARQ: deploy_site
                                                              ├─ Cloudflare: register domain + DNS
                                                              ├─ Vercel API: add custom domain
                                                              ├─ Stripe: invoice $337 balance
                                                              └─ Resend: "Your site is live" + Calendly link
                                                                   └─ Client pays balance → Stripe subscription ($50/mo) starts
                                                                        └─ Luke handover call (~20 min)
                                                                             └─ ARQ: send_handover_pack
                                                                                  └─ ARQ deferred: upsell sequence (Day 30, 45, 60)
```

### State Machine

Pipeline stage lives on the `clients` table as an enum. Every transition is logged to `pipeline_events` (append-only audit trail).

```
LEAD → ONBOARDING → DEPOSIT_PAID → BUILDING → REVIEW_PENDING → APPROVED → DEPLOYING → LIVE → CHURNED
```

Transition rules:
- Each stage has exactly one ARQ job that advances it
- Failed jobs retry 3x with exponential backoff (60s, 300s, 900s)
- After 3 failures: status = `FAILED`, Telegram alert, manual rerun from admin UI
- No silent failures. Every state change fires a Telegram notification

### SLA Monitoring

ARQ daily cron (the only cron in the system) checks all clients with `pipeline_stage IN (BUILDING, REVIEW_PENDING, DEPLOYING)` against `deposit_paid_at`. Alert at day 5 if not `LIVE`. Everything else is event-driven.

---

## Tools & Services

| Layer | Service | Cost/mo | Rationale |
|---|---|---|---|
| Frontend + CDN | Vercel Pro | $20 | Multi-tenant Platforms architecture, single deploy, custom domains, ISR |
| Database + Auth + Storage | Supabase Pro | $25 | CRM, pipeline state, site content, file storage. One dashboard, one backup target |
| Compute + Queue | Hetzner CX22 (Docker Compose: FastAPI + ARQ + Redis) | $5 | Always-on worker, handles webhooks + async jobs. Luke already uses Hetzner |
| AI Generation | Claude API (Sonnet) | ~$10 at 100 clients | Structured JSON output, ~$0.10/site. Deterministic, auditable |
| Payments | Stripe | 1.75% + $0.30 | Deposit + balance + subscription. Direct charges, no Connect |
| Email | Resend | $0-20 | Transactional email, React Email templates. Free tier covers early growth |
| DNS + Domains | Cloudflare Registrar | ~$75/mo at 100 clients | Wholesale domains ($8-10/yr), DNS API, free SSL, DDoS protection |
| Monitoring | Sentry (free) + UptimeRobot (free) | $0 | Exception tracking + uptime checks per client domain |
| Alerts | Telegram Bot | $0 | Luke's primary control plane. Inline keyboard for approve/reject |
| Scheduling | Calendly (free) | $0 | Handover call booking, webhook on event |
| Stock Images | Unsplash API (free) | $0 | Fallback hero/section images by trade type |
| **Total infrastructure** | | **~$80-95/mo** | |

### What's NOT in the stack

| Excluded | Why |
|---|---|
| GHL ($297/mo) | Redundant. Supabase + ARQ handles pipeline state and automation cheaper |
| n8n | Research resolved: Pure Python. Direct API calls from ARQ jobs, no glue layer |
| Typeform ($25/mo) | Custom Next.js form writes directly to Supabase. Zero ongoing cost, no webhook hop |
| Zapier | Every integration is direct API-to-API |
| Claude Agent SDK | Site generation is structured output, not an agent loop. API is cheaper and deterministic |

---

## Data Flow

### Supabase Schema

```sql
-- Lead capture
leads (
  id uuid PK, name, email, phone, business_name, trade_type,
  source, utm_params jsonb,
  status enum(new, nurturing, converted, dead),
  created_at
)

-- Client lifecycle
clients (
  id uuid PK, lead_id FK,
  business_name, abn, trade_type,
  contact_name, email, phone, address, suburb,
  stripe_customer_id, stripe_subscription_id,
  subdomain, custom_domain, cloudflare_zone_id,
  pipeline_stage enum(LEAD, ONBOARDING, DEPOSIT_PAID, BUILDING,
                      REVIEW_PENDING, APPROVED, DEPLOYING, LIVE, CHURNED),
  deposit_paid_at, balance_paid_at, live_at,
  delivery_deadline timestamptz,
  created_at, updated_at
)

-- Onboarding data (collected from form)
onboarding_responses (
  id uuid PK, client_id FK,
  services jsonb, service_areas jsonb,
  logo_url, photos jsonb,
  color_preference, style_preference, copy_tone,
  competitor_urls jsonb,
  licence_number,  -- required for regulated trades
  raw_json jsonb,  -- full payload for Claude context
  submitted_at
)

-- AI-generated site content
site_content (
  id uuid PK, client_id FK,
  template_id,
  content_json jsonb,       -- full Claude output (hero, services, about, etc.)
  custom_overrides jsonb,   -- Luke's manual edits, merged at render time
  version int,
  approved_at, approved_by,
  created_at
)

-- Pipeline audit trail (append-only)
pipeline_events (
  id uuid PK, client_id FK,
  event_type, actor enum(system, luke, client, stripe),
  payload jsonb,
  created_at
)

-- ARQ job tracking
build_jobs (
  id uuid PK, client_id FK,
  job_type, arq_job_id,
  status enum(queued, running, done, failed),
  attempts int default 0, last_error text,
  created_at, completed_at
)

-- Webhook idempotency
processed_webhook_events (
  id text PK,  -- provider's event ID (e.g. Stripe evt_xxx)
  provider, event_type,
  processed_at
)

-- Domain management
client_domains (
  id uuid PK, client_id FK,
  domain, subdomain,
  cloudflare_zone_id, cloudflare_record_id,
  vercel_domain_id,
  dns_verified_at, ssl_provisioned_at
)

-- Email/nudge tracking
nudge_log (
  id uuid PK, client_id FK,
  sequence_name, step_name, channel enum(email, sms),
  sent_at, opened_at, clicked_at
)

-- Payments
payments (
  id uuid PK, client_id FK,
  stripe_payment_intent_id, amount_cents,
  type enum(deposit, balance, subscription),
  status, created_at
)
```

### Data Flow by Stage

| Stage | Input | Processing | Output | Storage |
|---|---|---|---|---|
| Lead Capture | Form submission (name, email, phone, trade, suburb) | Next.js server action | Welcome email queued | `leads` table |
| Onboarding | Multi-step form (business details, logo, services, photos, preferences) | Zod validation, file upload | Stripe Checkout session | `clients` + `onboarding_responses` + Supabase Storage |
| Deposit | Stripe webhook (`payment_intent.succeeded`) | Idempotency check, stage transition | Build job queued | `payments` + `pipeline_events` |
| AI Build | Client data from Supabase | Claude API → structured JSON → Pydantic validation | Site content written, preview URL live | `site_content` + `build_jobs` |
| Review | Preview iframe in admin UI | Luke edits fields, approves | Deploy job queued | `site_content.custom_overrides` |
| Deploy | Approval event | Cloudflare API (domain + DNS) + Vercel API (custom domain) | Site live on custom domain | `client_domains` |
| Balance | Stripe invoice | Webhook processing | Subscription created | `payments` |
| Handover | Calendly booking | Luke's manual call | Handover pack email | `pipeline_events` |
| Upsell | ARQ deferred jobs (Day 30, 45, 60) | Resend email API | Upsell emails sent | `nudge_log` |

---

## Integrations

| Service | Auth Method | Stored In | Purpose |
|---|---|---|---|
| Supabase | Service role key + anon key | Hetzner `.env` + Vercel env vars | All data operations |
| Vercel | API token + team ID | Hetzner `.env` | Deploy triggers, domain management |
| Claude API (Anthropic) | API key | Hetzner `.env` | Site content generation |
| Stripe | Secret key + webhook signing secret | Hetzner `.env` + Vercel env vars | Payments, subscriptions |
| Cloudflare | API token (Zone + Registrar scopes) | Hetzner `.env` | Domain registration, DNS management |
| Resend | API key | Hetzner `.env` | Transactional email |
| Telegram Bot | Bot token + chat ID | Hetzner `.env` | Operational alerts, approve/reject |
| Unsplash | Access key | Hetzner `.env` | Stock images by trade type |
| Calendly | Webhook secret | Hetzner `.env` | Handover call booking events |
| Sentry | DSN | Hetzner `.env` + Vercel env vars | Error tracking |
| Meta Ads | UTM params only | N/A | No API integration, just tracking params |

All credentials in `.env` on Hetzner and Vercel environment variables. Never committed to git. `.env` in `.gitignore`.

---

## Multi-Tenant Architecture

### Vercel Platforms Routing

```
Request arrives at Vercel edge
  → middleware.ts reads hostname
  → if root domain (undercurrent.agency): serve marketing site
  → if *.preview.undercurrent.agency: resolve subdomain → preview mode
  → if *.undercurrent.agency: resolve subdomain → client site
  → if custom domain: lookup client_domains table → resolve client_id
  → rewrite to /sites/[client-slug] with client_id injected
  → page fetches site_content + custom_overrides from Supabase
  → renders with trade-specific template + CSS variables
```

### Template System

3 base templates (expandable later):

| Template | Style | Best For |
|---|---|---|
| `trades-bold` | Dark hero, strong CTA, high contrast | Electricians, roofers |
| `trades-clean` | Light, professional, lots of whitespace | Plumbers, HVAC |
| `trades-local` | Community-focused, heavy social proof | Builders, general |

Templates are Next.js component trees with slot-based content regions. Claude fills the content slots via structured JSON. Layout, responsiveness, and performance are handled by the template, not by AI. This enforces the quality floor.

Differentiation per client:
- `site_content.content_json` — AI-generated copy for all sections
- `site_content.custom_overrides` — Luke's manual edits, merged at render time
- CSS variables via Tailwind v4 `@theme` — colours, fonts per client
- Client images in Supabase Storage

ISR with 60s revalidation. Luke's edits in the admin UI go live within a minute, no redeploy needed.

---

## Effort Estimate

| Component | Complexity | Hours |
|---|---|---|
| Next.js multi-tenant shell + middleware routing | High | 12-16h |
| Template library (3 trade templates, component tree) | Medium | 16-20h |
| Landing page + lead capture | Low | 8h |
| Onboarding form (multi-step, file upload, Zod validation) | Medium | 10h |
| Supabase schema + RLS + migrations | Medium | 6-8h |
| Hetzner setup (Docker Compose: FastAPI + ARQ + Redis) | Low | 4h |
| FastAPI skeleton + webhook handlers + idempotency | Medium | 8h |
| ARQ job implementations (all ~12 jobs) | High | 20-25h |
| Saga state machine + error handling | Medium-High | 10-12h |
| Claude API integration + prompt engineering + Pydantic validation | Medium | 10-12h |
| Stripe integration (deposit, balance, subscription, webhooks) | Medium | 8-10h |
| Cloudflare domain automation (registration + DNS) | Medium | 6-8h |
| Vercel API integration (deploy triggers, domain assignment) | Medium | 6-8h |
| Admin UI (pipeline kanban, client detail, preview, approve/edit) | Medium | 15-20h |
| Resend email templates + sequences | Low | 6-8h |
| Telegram bot (alerts, inline keyboard approve/reject) | Low | 4-6h |
| Monitoring (Sentry, UptimeRobot, structlog, SLA cron) | Low | 4h |
| End-to-end testing + edge cases | Medium | 10-12h |
| **Total** | | **~153-177h** |

**Timeline:** 4-6 weeks solo at full pace, 6-8 weeks at sustainable pace alongside other work.

**Critical path:** Supabase schema → FastAPI/ARQ → Stripe webhooks → Claude generation → multi-tenant Next.js → admin UI → domain automation

---

## Outlier Ideas Worth Considering

These were proposed by 1-2 agents but not the majority. Worth revisiting later:

1. **Two-stage Claude generation (brief → full spec)** — One agent proposed using Haiku for a strategic brief first, then a second call for the full site spec. Cheaper (~$0.06/site vs $0.10) and potentially more consistent since the brief constrains the full generation. Worth testing if quality variance is an issue.

2. **Cloudflare R2 for assets instead of Supabase Storage** — Free egress vs Supabase Storage bandwidth charges. Marginal at 100 clients but could matter at scale. Easy to migrate later.

3. **Client portal with magic links** — One agent proposed a lightweight client-facing portal (invoice history, change request form, site preview). Not needed for MVP but would reduce Luke's email inbox load post-handover.

4. **Telegram inline keyboard as the primary review interface** — Skip the admin UI for MVP. Luke reviews via preview URL, approves/rejects via Telegram buttons calling FastAPI endpoints. Admin UI can come later once the pipeline is proven.

5. **Client buys own domain (zero agency liability)** — One agent proposed having clients buy their own domains to eliminate renewal liability entirely. Trade-off: adds friction to onboarding and risks DNS misconfiguration. Current consensus (agency buys, bundles into $50/mo) is better for conversion.

---

## What We Ruled Out & Why

| Approach | Why Rejected |
|---|---|
| **GHL ($297/mo)** | Redundant automation layer. Adds cost, duplicates pipeline state, couples to a platform. ARQ + Telegram + Resend handles everything GHL does for this use case at $0-20/mo |
| **n8n for orchestration** | Research resolved: Pure Python via FastAPI/ARQ. n8n adds a GUI that no one maintains, and every workflow is a hidden dependency. Direct API calls in Python are auditable, testable, and debuggable |
| **Claude Agent SDK** | Site generation is structured output, not multi-turn reasoning. API call with JSON schema is cheaper ($0.10 vs potentially $1+ per agent session), faster, and fully deterministic |
| **Project-per-client on Vercel** | 100 Vercel projects = 100 deploy pipelines, 100 env var sets, unmanageable at scale. Single multi-tenant deploy handles 100k+ domains |
| **Typeform ($25/mo)** | Adds a webhook hop and ongoing cost. Custom Next.js form writes directly to Supabase with Zod validation. Zero cost, full control |
| **Split database architecture** | Separate services for CRM, pipeline state, and site content adds operational overhead a solo operator can't justify. Supabase handles all three in one project with schema separation |
| **WordPress/10Web** | Contradicts brand positioning ("you own your site, it's built on Next.js"). Output quality is generic, margin compression from platform fees, no differentiation |
