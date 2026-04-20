# Agency Automation Pipeline — Discovery

## Client Overview
Internal build for UnderCurrent. Fully automated web design agency targeting trades businesses. Goal: 100 clients generating $5,000/month recurring revenue, 100 backlinks to main site, and a warm upsell pipeline for SEO/marketing services.

## Problem Statement
Running a web design agency at $449/site with a 7-day delivery guarantee requires near-total automation. Manual builds don't scale, manual follow-ups leak leads, and without automation the margins collapse. The entire pipeline from ad click to post-handover upsell needs to run with minimal human intervention.

## Desired Outcome
A client fills out a form. Their website gets built automatically (80% draft), Luke reviews and polishes, site deploys, payment collects, and post-sale sequences run, all without Luke doing more than a 15-20 minute review + a 15-20 minute client call per project.

## What We're Building

### Pipeline Stages
1. **Meta Ads** — niche-specific ad sets with auto-research improving copy over time
2. **Landing Pages** — 6 pages (1 general + 5 niche: plumber, electrician, builder, HVAC, roofing), Next.js, StoryBrand copy, built from existing brand guidelines
3. **Lead Capture → CRM** — form submission populates Supabase CRM, tags campaign source, sends auto thank-you + onboarding form link
4. **Onboarding Form** — collects brand guidelines, photos, logo, assets. Suggests ChatGPT prompts if stuck. Estimated 20-30 min for client
5. **Payment** — 25% deposit via Stripe before build starts. Maintenance plan ($50/month) and add-ons presented. Split payment option available
6. **Automated Website Builder** — AI agent reads onboarding submission, invokes two skills:
   - **Builder Skill**: clones niche template, structures pages (hero, CTA, nav, testimonials, services, about, FAQ, more testimonials, blog). Uses Impeccable for animations, ensures non-AI colour schemes
   - **Copy Skill**: writes all content using StoryBrand framework, optimised for AI search/SEO/GEO, run through Humanizer
   - Output: 80% complete Next.js site ready for Luke's review
7. **Review & Approval** — Luke gets notified, reviews, makes final adjustments
8. **Nudge Sequences** — automated reminders for non-responsive leads, unpaid deposits, missing assets. Escalation to personal call if needed
9. **Deployment** — multi-tenant hosting on single Vercel project. Client brings own domain (or we buy + markup). Domain config + SSL automated
10. **Client Walkthrough** — 15-20 min call: walk through site, collect final payment, set up maintenance subscription
11. **Handover** — automated email: pricing summary, build details, brand guidelines, private support link for change requests (resolved within a week)
12. **Post-Handover** — Google review request (+ reminder), 1-month check-in call prompt, automated SEO upsell follow-up
13. **Reporting** — weekly automated reports: ad performance, revenue, expenses, automation health. Delivered via Telegram + email

### Tech Stack
| Component | Technology |
|-----------|-----------|
| Websites | Next.js (all client sites) |
| Hosting | Vercel (multi-tenant, 25 sites per project, new project at capacity) |
| CRM | Supabase (greenfield, replacing Airtable) |
| Payments | Stripe (existing account) |
| Automation | Pure Python (FastAPI for webhooks/triggers) |
| AI Agent | Claude Code (builder skill + copy skill) |
| Ads | Meta Ads |
| Notifications | Telegram + Email |
| Landing Pages | Next.js, built from existing brand guidelines |

### Niche Templates (6 at launch)
1. Plumber
2. Electrician
3. Builder
4. HVAC
5. Roofing
6. General services

All follow the same page structure, differentiated by colour scheme, imagery, and niche-specific copy.

## Constraints
- **Budget**: $200/month initial ad spend, all revenue reinvested
- **Timeline**: No hard deadline, as fast as practical
- **Tech**: Luke codes via Claude Code, comfortable with Python, Next.js, n8n
- **Supabase CRM**: Not built yet, greenfield
- **n8n**: Not fully operational yet, needs setup
- **Manual touchpoints**: Review + polish (~15-20 min), client call (~15-20 min). Everything else should be automated
- **Pricing**: $449/site, $50/month maintenance, $100/hour for full edits, 7-day delivery guarantee (free if late)

## Success Criteria
1. 100 clients onboarded and paying $50/month maintenance = $5,000 MRR
2. 100 backlinks to UnderCurrent main site from client websites
3. Average time from paid deposit to site ready for review: < 2 hours (automated portion)
4. Luke's per-client effort: ~30-40 minutes total (review + call)
5. Lead-to-paid conversion automated end-to-end with no manual follow-up needed for 90%+ of leads
6. Zero missed SLA (7-day guarantee) due to automation failure

## Risks & Open Questions

### Risks
1. **Website builder quality** — AI-generated sites may need more than 20% manual polish, breaking the time model
2. **Multi-tenant Vercel** — routing, domain management, and deployment for 100+ sites on one project adds complexity
3. **7-day guarantee** — if automation breaks or a client is slow with assets, the clock is ticking. Need clear SLA terms (does clock start at deposit, or at asset submission?)
4. **Supabase migration** — building CRM from scratch while also building the pipeline. Could delay everything
5. **n8n reliability** — automation chain is only as strong as its weakest node. Failure in any step needs alerting + fallback
6. **Ad spend ROI at $200/month** — may be too low to validate quickly. Could take months to reach 100 clients
7. **Stripe split payments + subscriptions** — refund policy for 7-day guarantee needs legal clarity
8. **Copy quality** — StoryBrand + Humanizer may still read generic across 100 sites in the same niches

### Resolved
1. **7-day clock starts at deposit paid** — not asset submission
2. **Pure Python (FastAPI)** for all automation — no n8n dependency. Claude Code makes maintenance trivial
3. **25 sites per Vercel project** — new project spun up at capacity. Isolates risk, keeps builds fast
4. **Pilot niche: General services** — build the template, prove the pipeline, then clone for trades

### Open Questions
1. Refund policy details — full refund if late, or discount?
2. How do we handle clients who never submit assets? At what point do we refund/cancel?
3. Do client sites get their own subdomain during build (preview URL)?
4. What's the upsell pricing for SEO services post-handover?
5. Change request SLA — "within a week" needs tightening for automation tracking
