# Agency Automation Pipeline — 60/30/10 WAT Breakdown

**Date:** 2026-04-14
**Actual ratio:** 67% infrastructure / 24% rules / 9% AI

---

## Ratio Summary

| Category | Components | % |
|---|---|---|
| 60% Infrastructure (scripts, APIs, DB operations) | 44 components | 67% |
| 30% Rules (routing, templates, lookup tables, timing) | 16 components | 24% |
| 10% AI (generation, synthesis, creative judgment) | 4 components | 9% |

Pipeline is 91% deterministic. AI does exactly two things: write page copy and write SEO metadata.

---

## Stage-by-Stage Classification

### Stage 1: Meta Ads
- Campaign structure, budget management, performance monitoring → **60% Script** (Meta Marketing API)
- Audience targeting config → **30% Rules** (niche x geo matrix)
- Ad creative images → **30% Rules** (pre-approved image library per trade type)
- Ad copy (initial) → **30% Rules** (3 pre-written variants per niche)
- Ad copy iteration → **10% AI** (future phase only, after data accumulates)

### Stage 2: Landing Pages
- Page build (6 pages) → **60% Script** (built once, deployed)
- Form submission handling → **60% Script** (webhook/API call)
- Page copy → **10% AI** (one-time generation per niche, then frozen)
- A/B variants → **30% Rules** (variant selection logic)

### Stage 3: Lead Capture → CRM
- Form → Supabase row → **60% Script** (direct API insert)
- Auto thank-you email → **60% Script** (templated email via Resend)
- Duplicate detection → **60% Script** (email/phone match query)
- Lead scoring/tagging → **30% Rules** (lookup table)

### Stage 4: Onboarding Form
- Form UI → **60% Script** (built once)
- Completeness validation → **60% Script** (field presence checks)
- Asset upload → Supabase Storage → **60% Script** (file upload API)
- Submission confirmation + SLA clock → **60% Script** (DB update + email)
- ChatGPT prompt suggestions → **30% Rules** (pre-written prompts per trade type)

### Stage 5: Payment
- Deposit collection ($112) → **60% Script** (Stripe PaymentIntent)
- Payment webhook handling → **60% Script** (webhook → idempotency → state transition)
- Failed payment retry → **60% Script** (Stripe native)
- Subscription creation ($50/mo) → **60% Script** (Stripe Subscription API)

### Stage 6: Automated Website Builder
- Template clone → **60% Script** (git clone + file ops)
- Client config injection (site.json) → **60% Script** (JSON template fill)
- Theme customisation (CSS variables) → **60% Script** (Tailwind v4 @theme substitution)
- Image swapping → **60% Script** (file copy from Supabase Storage)
- Build validation (next build, Lighthouse, axe-core) → **60% Script** (CLI + threshold checks)
- Fallback content → **30% Rules** (niche-specific default copy library)
- **Page copy generation** → **10% AI** (core AI task, StoryBrand + Humanizer)
- **SEO metadata** → **10% AI** (trade-specific, location-aware)

### Stage 7: Review & Approval
- Notification to Luke → **60% Script** (Telegram Bot API)
- Preview deploy → **60% Script** (Vercel API)
- Approval trigger → **60% Script** (button/form → state transition)

### Stage 8: Nudge Sequences
- Stage check before sending → **60% Script** (DB query)
- Send nudge → **60% Script** (Resend API)
- Escalation to personal call → **60% Script** (Telegram alert)
- Timing logic → **30% Rules** (deferred ARQ jobs, fixed intervals)
- Nudge content selection → **30% Rules** (nudge level → template lookup)

### Stage 9: Deployment
- Vercel deploy trigger → **60% Script** (Vercel API)
- Custom domain attachment → **60% Script** (Vercel API)
- DNS configuration → **60% Script** (Cloudflare API)
- SSL provisioning → **60% Script** (automatic via Vercel)
- Domain registration → **60% Script** (Namecheap API)

### Stage 10: Client Walkthrough
- Call scheduling → **60% Script** (templated email with booking link)
- Final payment collection → **60% Script** (Stripe PaymentIntent)
- Call prep summary → **30% Rules** (template populated from site.json + events)

### Stage 11: Handover
- Handover email → **60% Script** (templated email)
- Brand guidelines export → **60% Script** (template fill + PDF generation)
- Support channel setup → **60% Script** (URL generation + DB entry)
- Subscription activation confirmation → **60% Script** (Stripe check + email)

### Stage 12: Post-Handover
- Google review request → **60% Script** (templated email + link)
- 1-month check-in prompt → **60% Script** (deferred Telegram alert)
- Review reminder → **30% Rules** (deferred job, conditional check)
- SEO upsell sequence → **30% Rules** (timed emails, niche-based template selection)

### Stage 13: Reporting
- Ad performance pull → **60% Script** (Meta API + data transform)
- Revenue/expense calculation → **60% Script** (Stripe queries + arithmetic)
- Automation health check → **60% Script** (pipeline_events query)
- Report delivery → **60% Script** (Telegram + Resend API)
- Report formatting → **30% Rules** (template with conditional sections)

---

## MWP Structure Mapping

### 60% → `pipeline/` scripts

```
pipeline/
  webhooks/
    stripe.py          # Payment event handling
    meta.py            # Lead capture from ads
    supabase.py        # DB change triggers
  stages/
    lead_capture.py    # Form → Supabase insert
    onboarding.py      # Form validation, asset upload
    payment.py         # Stripe PaymentIntent + Subscription
    build_trigger.py   # Template clone, config injection, theme CSS
    deploy.py          # Vercel API + Cloudflare DNS + Namecheap
    handover.py        # Email dispatch, PDF generation
    post_handover.py   # Review request, check-in scheduling
  workers/
    notifications.py   # Telegram + Resend dispatch
    reporting.py       # Metrics pull, formatting, delivery
    health.py          # Pipeline monitoring, dead letter alerts
  orchestrator.py      # Saga state machine, stage transitions
```

### 30% → `config/` rules and routing

```
config/
  niches/
    plumber.json       # Default copy, images, colours, services list
    electrician.json
    builder.json
    hvac.json
    roofing.json
    general.json
  templates/
    emails/            # All email templates
    reports/           # Weekly report template
    call-prep/         # Walkthrough prep template
  nudge_rules.json     # Timing intervals, escalation thresholds
  ad_variants.json     # Pre-written ad copy variants per niche
  pipeline_rules.json  # Stage transition guards, SLA timers
  scoring.json         # Lead tagging rules
```

### 10% → `skills/` AI declarations

```
skills/
  copy_generator.py    # StoryBrand page copy from onboarding data
    # Input: site.json + niche config + onboarding response
    # Output: hero, services, about, FAQ, CTA copy
    # Model: Sonnet for generation, Humanizer post-process
  
  seo_generator.py     # Title tags, meta descriptions, local schema
    # Input: site.json + generated copy + suburb + trade type
    # Output: metadata JSON
    # Model: Haiku (structured, low-creativity)
```

---

## AI Pushback Notes

- **Upsell copy personalisation** was initially flagged as AI. Reclassified to rules: 6 niches = 6 email templates, personalisation is name + suburb insertion.
- **Ad copy iteration** reclassified to rules for initial phase: 3 pre-written variants per niche. AI iteration only after statistical significance on which angles work.
- **SEO metadata** could partially be rules (schema.org templates with variable fill) but location-aware title/description generation keeps it in AI.
