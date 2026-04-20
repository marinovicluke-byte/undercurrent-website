# Agency Automation Pipeline — QA Report v2 (Step 6c)

**Date:** 2026-04-14
**Audit tier:** Pipeline
**Auditor context:** Second-pass cold audit. Read 04-qa-report.md (4 critical, 5 major, 5 minor issues found and fixed). Independently verified each critical fix against actual codebase.

---

## Critical Issue Verification

### C1: Pipeline stage enum mismatch — VERIFIED FIXED

Frontend `PipelineStage` in `agency-platform/lib/types.ts:3-12` now defines:
```
'LEAD' | 'ONBOARDING' | 'DEPOSIT_PAID' | 'BUILDING' | 'REVIEW_PENDING' | 'APPROVED' | 'DEPLOYING' | 'LIVE' | 'CHURNED'
```

Backend enum in `001_enums.sql:11-13` defines identical values in same order. All 4 consuming components (`admin/page.tsx`, `StageActions.tsx`, `PipelineKanban.tsx`, `pipeline/[clientId]/page.tsx`) reference correct stage names with complete STAGE_LABELS records. No legacy values found.

**Status: PASS**

### C2: Frontend TypeScript types — VERIFIED FIXED (with new issues)

All database interfaces rewritten. Old field names (`is_active`, `published`, `verified`, `contact_email`, `success`, `error_message`) removed across all files. `get-client-by-domain.ts` correctly uses `approved_at` and `dns_verified_at`. `BuildStatus.tsx` correctly uses `done` and `last_error`.

**New issues introduced during fix:**

**N1 (Minor): `Client.template_id` ghost field**
`Client` interface defines `template_id?: string` (line 53) but `clients` table has no `template_id` column — it only exists on `site_content`. Three files access `client.template_id`: `sites/[slug]/page.tsx:61` (fallback), `ClientCard.tsx:33-35` (badge), `pipeline/[clientId]/page.tsx:98` (display). Won't cause runtime errors (undefined is handled), but displays incorrect/missing data.

**N2 (Minor): Required fields marked optional**
`trade_type`, `contact_name`, `email`, `phone` are marked optional (`?`) in the Client interface but are `NOT NULL` in the database. Won't cause runtime failures (data always present from DB), but weakens TypeScript's ability to catch null-access bugs.

**Status: PASS (core fix verified, new issues are minor)**

### C3: Site renderer — VERIFIED FIXED

`agency-platform/app/sites/[slug]/page.tsx` imports all 3 templates via `TEMPLATE_MAP` record. Template selection uses `siteContent.template_id` with fallback chain to `'trades-bold'`. Content and theme props passed correctly. All 3 template directories exist with complete component sets (9 sections each). Types imported from shared `templates/types.ts`.

**Status: PASS**

### C4: Onboarding → Stripe checkout — VERIFIED FIXED (with new bug)

`submit-onboarding.ts` calls `/stripe/create-checkout` and returns `checkout_url`. `OnboardingForm.tsx` redirects via `window.location.href`. Backend endpoint exists in `stripe_routes.py` and accepts `client_id`.

**New issue introduced during fix:**

**N3 (Major): Wrong env var in submit-onboarding.ts**
`submit-onboarding.ts:41` uses `process.env.API_URL` but the actual env var is `NEXT_PUBLIC_API_URL` (confirmed in `.env.local:4` and `.env.example:4`). All other files (`BuildStatus.tsx:19`, `StageActions.tsx:48`) correctly use `NEXT_PUBLIC_API_URL`. In production, `API_URL` will be undefined and the code silently falls back to `http://localhost:8000`, breaking the Stripe checkout flow. Works locally by coincidence (both resolve to localhost).

**Important note on server action env vars:** `submit-onboarding.ts` is a server action (runs server-side), so it doesn't need the `NEXT_PUBLIC_` prefix for access. However, the env var name must still match what's actually set. Either rename to `NEXT_PUBLIC_API_URL` for consistency, or add a separate `API_URL` env var for server-side use.

**Status: PASS (core fix verified, new bug needs fixing)**

---

## Major/Minor Fix Verification

| Fix | Status | Notes |
|---|---|---|
| SC2: Backlinks | PASS | All 3 Footer components have "Built by UnderCurrent" link to undercurrentdigital.com.au |
| M1: Admin auth | PASS | middleware.ts enforces Basic Auth on /admin, checks ADMIN_PASSWORD env var |
| M2: Telegram | PASS | notifications.py imports and uses TelegramService for review and churn alerts |
| M3: Lead types | PASS | Included in C2 fix |
| M4: Domain registration | PASS | deployment.py calls register_domain() before DNS zone creation, non-fatal on failure |
| M5: ContentJson | PASS | lib/types.ts re-exports from templates/types.ts, no duplicate definition |
| m1: NudgeLog channel | PASS | Included in C2, 'slack' removed |

---

## New Issues Introduced During Fixes

| ID | Severity | Description |
|---|---|---|
| N1 | Minor | `Client.template_id` ghost field — column doesn't exist on clients table |
| N2 | Minor | 4 NOT NULL columns marked optional in Client interface |
| N3 | Major | `submit-onboarding.ts:41` reads `API_URL` instead of `NEXT_PUBLIC_API_URL`, breaks Stripe checkout in production |

---

## Summary

All 4 critical issues from the original audit have been resolved. The core integration failures (enum mismatch, type mismatch, placeholder renderer, broken checkout flow) are fixed. The frontend and backend are now aligned on pipeline stages, database types, template rendering, and payment handoff.

One new major bug (N3) was introduced during fixes: wrong env var name in the Stripe checkout action. This must be fixed before deployment — it will silently break the payment flow in production while appearing to work in local dev.

Two new minor issues (N1, N2) are low-risk TypeScript accuracy problems that won't cause runtime failures but should be cleaned up.
