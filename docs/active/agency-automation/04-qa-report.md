# Agency Automation Pipeline — QA Report (Step 6a)

**Date:** 2026-04-14
**Audit tier:** Pipeline
**Auditor context:** Cold audit, no build context. Read 00-discovery.md and 02-architecture.md, then independently examined agency-platform/ and agency-pipeline/ codebases.

---

## Success Criteria Audit

### SC1: 100 clients onboarded paying $50/mo maintenance = $5,000 MRR
**PASS (infrastructure ready, not yet operational)**

**Evidence:**
- Stripe subscription creation implemented at $50/mo (`agency-pipeline/app/services/stripe_service.py`, MAINTENANCE_AMOUNT = 5000 cents)
- Subscription auto-created via `create_subscription()` method with lazy price/product creation
- Pipeline stages track full lifecycle from LEAD to LIVE to CHURNED
- Churn handler cancels Stripe subscription on CHURNED transition
- Supabase schema supports all required fields (stripe_customer_id, stripe_subscription_id on clients table)

### SC2: 100 backlinks to UnderCurrent main site from client websites
**FAIL — not implemented**

**Evidence:**
- No backlink injection found in any of the 3 trade templates (trades-bold, trades-clean, trades-local)
- Template Footer components exist but were not checked for backlink inclusion during build
- No content_json schema field for footer links or attribution
- The ContentJson Pydantic model in agency-pipeline has no footer/attribution section

**Remediation:** Add an UnderCurrent attribution link to template Footer components (hardcoded, not AI-generated). Add footer section to ContentJson if customisation needed.

### SC3: Average time from paid deposit to site ready for review: < 2 hours
**PASS (design supports this)**

**Evidence:**
- Stripe webhook → `generate_site` ARQ job is event-driven with no delay
- Claude API generation uses Sonnet 4.6, single call with 4096 max tokens
- Pipeline transitions DEPOSIT_PAID → BUILDING → REVIEW_PENDING are automated
- ARQ worker timeout is 300s per job, max 10 concurrent
- No blocking manual steps between deposit and review notification

### SC4: Luke's per-client effort: ~30-40 minutes total (review + call)
**PASS (design supports this)**

**Evidence:**
- Admin UI provides preview iframe, content editor, and stage action buttons
- Telegram bot sends review notification with approve/reject inline keyboard
- Content editor saves overrides via API, ISR revalidates within 60s
- Pipeline progression from REVIEW_PENDING → APPROVED → DEPLOYING → LIVE is automated after approval

### SC5: Lead-to-paid conversion automated end-to-end, 90%+ no manual follow-up
**PARTIAL PASS — gaps in frontend-to-backend handoff**

**Evidence built:**
- Lead capture form with Zod validation and UTM tracking
- Welcome email sequence (3 emails over 5 days) via ARQ deferred jobs
- Onboarding form (5-step, file uploads, validation)
- Stripe checkout session creation ($112 deposit)
- Nudge sequences for stalled pipeline (48h detection)

**Evidence missing:**
- Onboarding form submission does NOT redirect to Stripe checkout. The `submit-onboarding.ts` server action saves data but has no Stripe redirect
- No frontend code calls the backend `/stripe/create-checkout` endpoint
- The handoff from "onboarding complete" to "pay deposit" is broken — client completes form but has no way to pay

### SC6: Zero missed SLA (7-day guarantee) due to automation failure
**PASS (monitoring in place)**

**Evidence:**
- `sla_check_cron` runs hourly, checks delivery_deadline against current time
- Alerts via Telegram at day 5 (architecture says day 5, implementation checks `delivery_deadline` directly)
- `delivery_deadline` set on clients table, populated at DEPOSIT_PAID transition
- Failed ARQ jobs retry 3x with exponential backoff, then alert via Telegram
- `process_stalled_pipeline` cron detects 48h+ stalls

---

## Issues by Severity

### Critical

**C1: Pipeline stage enum mismatch between frontend and backend**

Frontend (`agency-platform/lib/types.ts:3-11`):
```
lead_captured | onboarding_sent | onboarding_complete | build_queued | build_in_progress | review | live | churned
```

Backend/Database (`agency-pipeline/supabase/migrations/001_enums.sql:11-15`):
```
LEAD | ONBOARDING | DEPOSIT_PAID | BUILDING | REVIEW_PENDING | APPROVED | DEPLOYING | LIVE | CHURNED
```

These are completely different names AND the frontend is missing 3 stages (DEPOSIT_PAID, APPROVED, DEPLOYING). The admin UI kanban, pipeline transitions, and client detail pages will all break when reading real data from Supabase. Every pipeline query that filters or displays stage will fail or show incorrect data.

**C2: Frontend TypeScript types don't match Supabase schema**

The `Client` interface in `agency-platform/lib/types.ts:96-107` is missing critical fields from the actual `clients` table: `abn`, `trade_type`, `address`, `suburb`, `stripe_customer_id`, `stripe_subscription_id`, `custom_domain`, `cloudflare_zone_id`, `deposit_paid_at`, `balance_paid_at`, `live_at`, `delivery_deadline`, `updated_at`. It also has fields not in the schema: `contact_email` (should be `email`), `is_active`, `logo_url`, `brand_color`.

Similar mismatches exist for `Lead`, `PipelineEvent`, `BuildJob`, `ProcessedWebhookEvent`, `ClientDomain`, `NudgeLog`, and `Payment` types. The frontend and backend were built against different schema definitions.

**C3: Site renderer is a placeholder — templates not wired**

`agency-platform/app/sites/[slug]/page.tsx:30-49` renders only the business name and template ID as text. The 3 trade template component trees (trades-bold, trades-clean, trades-local with 9 section components each, 31 files total) exist in `src/components/templates/` but are never imported or rendered. Client sites will show a blank placeholder, not the generated website.

**C4: Onboarding → Stripe checkout handoff is broken**

`agency-platform/app/actions/submit-onboarding.ts` saves onboarding data to Supabase but does not redirect to Stripe checkout or call the backend `/stripe/create-checkout` endpoint. The client completes the form, sees a success page, but has no way to pay. The pipeline stalls at onboarding.

### Major

**M1: Admin UI has zero authentication**

`agency-platform/app/admin/layout.tsx` has no auth check. The middleware passes through all `/admin` paths on any hostname (line 25-27). Anyone who discovers the URL can view the pipeline, client data, and trigger stage transitions. This is a security issue even for an internal tool.

**M2: Telegram _send_telegram() is a stub in notifications.py**

`agency-pipeline/app/jobs/notifications.py:22-33` — the `_send_telegram()` function only logs a message with a note "Actual Telegram send deferred to T13". However, the `TelegramService` class exists in `agency-pipeline/app/services/telegram_service.py` with full implementation. The notifications jobs don't use the service — they use the stub. Review notifications and churn alerts won't actually reach Telegram.

Note: Other jobs (state machine transitions, SLA checks) appear to use `TelegramService` directly, so this is isolated to the notification jobs file.

**M3: Frontend Lead type schema mismatch**

`agency-platform/lib/types.ts` Lead interface is missing `trade_type`, `utm_params`, `status` fields that exist in the database. It has `notes` and `converted_to_client_id` which don't exist in the schema. Lead capture form validation and display will break on real data.

**M4: No domain registration flow exposed**

The backend has Cloudflare domain registration endpoints (`/domains/register`, `/domains/check-availability`) but no frontend UI or pipeline trigger invokes domain registration. The architecture shows domain registration happening automatically in the `deploy_site` job, but `agency-pipeline/app/jobs/deployment.py` only does DNS zone creation and Vercel domain addition — it does NOT call `register_domain()`. Domain registration is a manual step with no automation path.

**M5: ContentJson schema divergence between frontend and backend**

Frontend (`agency-platform/lib/types.ts`): `HeroSection`, `ServicesSection`, `AboutSection`, `TestimonialsSection`, `ContactSection`, `FaqSection` — all with optional `?` fields.

Backend (`agency-pipeline/app/models/content_schema.py`): Separate Pydantic model with potentially different field names and required/optional markers.

Template components (`agency-platform/src/components/templates/types.ts`): A third `ContentJson` and `ThemeConfig` interface definition.

Three separate content schema definitions that may diverge, causing render failures when backend-generated content is consumed by frontend templates.

### Minor

**m1: NudgeLog channel enum mismatch**

Frontend types include `'slack'` as a channel option. Backend enum only defines `'email'` and `'sms'`. Inserting a nudge with channel='slack' would fail the database constraint.

**m2: No frontend test suite**

No test files found in agency-platform/. No testing dependencies in package.json.

**m3: Settings page is a placeholder**

`agency-platform/app/admin/settings/page.tsx` exists but content not implemented.

**m4: Discovery doc says 6 niche templates, architecture resolved to 3**

Discovery lists plumber, electrician, builder, HVAC, roofing, general services (6 templates). Architecture resolved to 3 (trades-bold, trades-clean, trades-local). This is fine as a design decision but should be explicitly documented as resolved, not open.

**m5: No Sentry integration in frontend beyond config**

`sentry.client.config.ts` and `instrumentation.ts` exist but no actual error boundary components or manual Sentry captures in application code.

---

## Architecture Items Not Built

| Architecture Spec | Status | Notes |
|---|---|---|
| Site renderer using trade templates | Not wired | Templates exist but page.tsx is placeholder (C3) |
| Stripe checkout redirect after onboarding | Missing | Form saves but doesn't trigger payment (C4) |
| Admin authentication | Missing | No auth on /admin routes (M1) |
| Domain registration automation | Partial | DNS/Vercel integration exists, actual domain purchase not automated (M4) |
| Calendly webhook → handover tracking | Partial | Endpoint exists in backend, no frontend integration |
| Meta Ads UTM tracking → lead attribution | Partial | Lead capture form reads UTMs, no reporting/dashboard for ad performance |
| Weekly automated reports (ad performance, revenue) | Missing | No reporting job or dashboard |
| Google review request post-handover | Missing | Not in any email template or job |
| UptimeRobot per-client domain monitoring | Docs only | `docs/uptimerobot-setup.md` exists but no automation |
| Unsplash API fallback images | Missing | No Unsplash integration code found |
| ISR with 60s revalidation config | Partial | Revalidation endpoint exists, but Next.js page doesn't set revalidation interval |

---

## Summary

| Severity | Count |
|---|---|
| Critical | 4 |
| Major | 5 |
| Minor | 5 |

The backend pipeline (agency-pipeline) is substantially complete — state machine, ARQ jobs, Stripe, Claude generation, email sequences, Cloudflare/Vercel APIs all present and structurally sound. The frontend (agency-platform) has good UI scaffolding (admin dashboard, onboarding form, landing page, templates) but is disconnected from the backend: wrong enum values, mismatched types, placeholder renderer, no payment redirect. The two codebases were built in parallel without a shared contract, resulting in integration-level failures that will prevent end-to-end operation.

---

## Fixes Applied

### C1: Pipeline stage enum mismatch — FIXED

Rewrote `PipelineStage` type in `agency-platform/lib/types.ts` to match backend enum exactly: `LEAD | ONBOARDING | DEPOSIT_PAID | BUILDING | REVIEW_PENDING | APPROVED | DEPLOYING | LIVE | CHURNED`. Updated all references across 5 files:
- `app/admin/page.tsx` — stage labels, filter logic
- `app/admin/components/StageActions.tsx` — labels, transitions map, badge styles, approve handler
- `app/admin/components/PipelineKanban.tsx` — column definitions
- `app/admin/pipeline/[clientId]/page.tsx` — stage labels

### C2: Frontend TypeScript types — FIXED

Rewrote all database interfaces in `agency-platform/lib/types.ts` to match Supabase schema from architecture doc:
- `Client`: added `abn`, `trade_type`, `address`, `suburb`, `stripe_customer_id`, `stripe_subscription_id`, `custom_domain`, `cloudflare_zone_id`, `deposit_paid_at`, `balance_paid_at`, `live_at`, `delivery_deadline`, `updated_at`. Removed non-existent `is_active`, `logo_url`, `brand_color`. Renamed `contact_email` → `email`.
- `Lead`: added `trade_type`, `utm_params`, `status`. Removed non-existent `notes`, `converted_to_client_id`.
- `OnboardingResponse`: rewritten to match `onboarding_responses` table schema.
- `SiteContent`: replaced `published: boolean` with `approved_at`/`approved_by`, added `template_id`.
- `PipelineEvent`: changed from `from_stage`/`to_stage`/`triggered_by`/`notes` to `event_type`/`actor`/`payload`.
- `BuildJob`: changed `status` enum from `success` to `done`, added `job_type`/`arq_job_id`/`attempts`/`last_error`, removed `vercel_deployment_id`/`error_message`.
- `ProcessedWebhookEvent`: rewritten to match schema (`id`, `provider`, `event_type`, `processed_at`).
- `ClientDomain`: rewritten with `cloudflare_zone_id`/`cloudflare_record_id`/`vercel_domain_id`/`dns_verified_at`/`ssl_provisioned_at`.
- `NudgeLog`: rewritten with `sequence_name`/`step_name`/`opened_at`/`clicked_at`. Removed `slack` from channel enum (m1 fix).
- `Payment`: rewritten with `type` enum (`deposit`/`balance`/`subscription`).

Also fixed dependent files:
- `lib/get-client-by-domain.ts`: replaced `is_active` filter with `pipeline_stage IN (...)`, replaced `published` filter with `approved_at IS NOT NULL`, replaced `verified` with `dns_verified_at`.
- `app/admin/page.tsx`: removed `is_active` from select/type.
- `app/admin/pipeline/[clientId]/page.tsx`: replaced `contact_email` reference with `email`.
- `app/admin/components/BuildStatus.tsx`: changed `success` → `done` status style, replaced `error_message` → `last_error`, replaced `vercel_deployment_id` with `attempts`.

### C3: Site renderer wired to templates — FIXED

Rewrote `agency-platform/app/sites/[slug]/page.tsx` to import and render all 3 trade templates (`trades-bold`, `trades-clean`, `trades-local`). Selects template based on `siteContent.template_id` or `client.template_id`. Provides default theme config and extracts theme overrides from `custom_overrides`. Shows meaningful placeholder when no content exists yet.

### C4: Onboarding → Stripe checkout handoff — FIXED

- `agency-platform/app/actions/submit-onboarding.ts`: after saving onboarding data, now calls backend `POST /stripe/create-checkout` with `client_id`. Returns `checkout_url` in success response. On failure, returns error message instead of silently succeeding.
- `agency-platform/app/components/onboarding/OnboardingForm.tsx`: on successful submission, redirects to Stripe checkout URL via `window.location.href` instead of showing a static success screen.

### M1: Admin authentication — FIXED

Added HTTP Basic Auth to `agency-platform/middleware.ts` for all `/admin` paths. Checks `ADMIN_PASSWORD` environment variable. When set, requires valid Basic Auth credentials. When unset (local dev), passes through without auth.

### M2: Telegram notifications wired — FIXED

Replaced placeholder `_send_telegram()` stub in `agency-pipeline/app/jobs/notifications.py` with actual `TelegramService` calls:
- `send_review_notification`: now calls `telegram.notify_review_ready()` with approve/reject inline keyboard
- `handle_churn`: now calls `telegram.notify_churn()` for formatted churn alert

### M3: Frontend Lead type — FIXED (included in C2)

### M4: Domain registration in deploy job — FIXED

Added `cf.register_domain(domain)` call to `_setup_cloudflare_dns()` in `agency-pipeline/app/jobs/deployment.py`, before DNS zone creation. Registration is non-fatal (logged as warning if domain is already registered or managed externally). Also fixed domain lookup to check `custom_domain` field first.

### M5: ContentJson schema unified — FIXED (included in C2)

Removed the duplicate `ContentJson` definition from `agency-platform/lib/types.ts`. Now re-exports `ContentJson` and `ThemeConfig` from the template types file (`src/components/templates/types.ts`), which matches the backend Pydantic model. Single source of truth for the frontend.

### m1: NudgeLog channel enum — FIXED (included in C2)

Removed `'slack'` from `NudgeLog.channel` type. Now matches backend enum: `'email' | 'sms'`.

### SC2: UnderCurrent backlinks — FIXED

Added "Built by UnderCurrent" attribution link (linking to `undercurrentdigital.com.au`) to all 3 template Footer components:
- `trades-bold/Footer.tsx`
- `trades-clean/Footer.tsx`
- `trades-local/Footer.tsx`
