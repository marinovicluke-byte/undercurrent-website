# Next-session prompt — run /undercurrent-copy on other parts of the site

**Paste everything below the line into a fresh Claude Code window opened in `~/UnderCurrent/Builds/Products/Website/undercurrent/`.**

---

You are continuing a copy-pass on the UnderCurrent Automations website (Next.js 15 App Router, production at `https://undercurrentautomations.com`). The goal is to run the `/undercurrent-copy` skill against parts of the site that have NOT had a recent voice + AIO + humanizer pass.

## Project snapshot

- **Business:** UnderCurrent Automations, Melbourne-based AI automation agency for Australian small businesses. Founded by Luke Marinovic, Feb 2026.
- **Stack:** Next.js 15 App Router, React 19, Tailwind v4 (via `@theme {}` in `app/globals.css`), Space Grotesk (display) + Satoshi (body).
- **Design language:** v2 (dark theme, `uc-glow-word--{blue|sage|orange}`, hard-offset shadows, no gradient text, no glassmorphism, max one radial glow per page). See `_config/constraints.md`.
- **Branch discipline:** `main` is production. Do NOT push to main without Luke saying "push it live" or equivalent. Preview deploys on feature branches are fine.
- **Current git state:** working tree has ~30 files of uncommitted SEO-audit work from prior sessions — **do not touch them** unless Luke explicitly scopes you in. Inventory: `docs/uncommitted-work-brief-2026-04-21.md`.

## Just completed (do NOT redo)

- 5 new location pages + Melbourne refresh shipped on commit `60bbfeb`, live at `/ai-automation-{melbourne|sydney|brisbane|perth|adelaide|australia}`. Voice, AIO, keyword, HTML semantics audits all passed.
- Architecture: `components/pages/LocationPage.js` (server) + `components/pages/LocationPageClient.js` (server, uses v2 primitives). Data in `lib/data/locations.js`.
- QA report: `docs/location-pages-qa-report.md`. Summary: `docs/location-pages-summary.md`. Screenshots: `docs/screenshots/`.

If a location page needs a tweak it can be done in isolation — shape is already correct.

## How /undercurrent-copy works

The skill lives at `.claude/skills/undercurrent-copy/SKILL.md`. It will auto-load the project's voice/tone and keyword files. You do not need to pre-read them. When Luke tells you the target, invoke it via the Skill tool.

## Candidate targets (pick one with Luke before starting)

Ranked by conversion impact. Confirm which one before writing any copy.

### Tier 1 — highest impact

1. **Service pages** (`lib/data/services.js` → 12 entries rendered by `components/pages/ServicePage.js`)
   - 12 services: `customer-experience-automation`, `sales-automation`, `content-automation`, `personal-system-automation`, `finance-automation`, `inbound-lead-management-melbourne`, `website-design`, `seo-ai-visibility`, `front-end-experience`, `surface-discovery`, `ai-strategy-training`, `custom-integrations`.
   - Each has its own `metaTitle`, `metaDescription`, `heroCopy`, industry cards, `whatWeDeliver`, FAQs, etc.
   - Per-service keyword data lives in `/Users/luke/UnderCurrent/Builds/Products/SEO/articles/data/undercurrent/service-keywords.json` — the skill's Step 0b loads this by slug.
   - These are highest-intent commercial pages; biggest payoff for Google + AI search ranking.

2. **Homepage sections** (`components/sections/*.js`, ~10 files)
   - `Hero.js` (headline + subtext + CTA), `Marquee.js`, `WhyUndercurrent.js`, `WhyAutomation.js`, `ServicesOverview.js`, `About.js`, `BeforeAfter.js`, `Process.js`, `FAQ.js`, `ClosingCTA.js`.
   - Legacy copy from pre-v2 landing page is captured in `_config/landing-page-copy.md` — use as reference for what WAS, then write fresh for v2.

### Tier 2 — supporting

3. **Services hub** (`app/services/page.js`) — the 6-discipline overview page. ~70 lines of copy across the hero, Discovery card, and 6 discipline cards.
4. **About** (`app/about/page.js`) — recently shipped but may need a voice tune (AboutUndercurrent, AboutMe, OurJourney). Be careful not to invent biographical facts; cross-check with vault memory `project_undercurrent_founding.md`.
5. **Process** (`app/process/page.js`)
6. **Contact** (`app/contact/page.js`)

### Tier 3 — content (separate skill ecosystem)

- Blog articles (`content/articles/*.md`) and case studies (`content/case-studies/*.md`) are NOT covered by `/undercurrent-copy`. They have their own content skills. Skip unless Luke explicitly scopes.

## Hard rules (from `_config/voice-and-tone.md` + `_config/constraints.md`)

- **No em dashes.** Ever. Use commas or periods.
- **No banned words:** leverage, synergy, cutting-edge, revolutionise, empower, utilize, best-in-class, game-changer, seamless, robust, in order to, at its core, delve, tapestry, testament, pivotal, intricate, vibrant, foster, align with, showcase, actually (as filler).
- **Full brand name** `UnderCurrent Automations` in citation-critical fields (metaDescription, first FAQ answer). Bare "UnderCurrent" risks AI citations routing to unrelated entities.
- **Never invent pricing.** If a price is needed, stop and ask Luke for the real AUD band.
- **Never invent stats or claims.** Superlatives ("more X than any state") require a verifiable source or they get cut. Last session had two made-up superlatives flagged at `/qa` — don't repeat.
- **Meta title budget:** raw ≤ 33 chars. The layout template appends ` | UnderCurrent Automations` (27 chars), so rendered max is 60.
- **Meta description:** 150–160 chars, opens with `UnderCurrent Automations`, answer-first, names 2–3 real integrations.
- **Entity density:** at least 6 named tools per page (Xero, MYOB, HubSpot, Salesforce, Shopify, Gmail, Outlook, Slack, Notion, Asana, ClickUp, Clio, Cin7, Unleashed, n8n, Make, Zapier, Cliniko, Halaxy, Nookal, HICAPS, Hipages, Peppol — use what's actually relevant per page).
- **Four UC verticals** to cover across a full page where natural: tradies, business services, consultants, allied health practitioners.

## How to start

1. Ask Luke which target (service slug / homepage section / etc).
2. Read the current copy at that path.
3. Invoke `/undercurrent-copy` via the Skill tool. The skill will:
   - Auto-load voice/tone/constraints/landing-page-copy, plus keyword data.
   - For service-page targets, load the per-slug cluster from `service-keywords.json` (Step 0b).
   - Produce: final copy, keyword coverage table, AIO citation checklist, voice audit, HTML semantics audit, file+lines to apply, and any flagged tradeoffs.
4. Present the skill's output to Luke before applying.
5. Apply the edit only after he confirms. Run `npm run dev` + `curl` the page to verify post-edit.
6. Run the same humanizer regex sweep the skill prescribes (use Python, not bash — bash byte-grep mishandles unicode):

```python
import re
banned = ['leverage','synergy','cutting-edge','revolutionise','empower','utilize','best-in-class','game-changer','seamless','robust','in order to','at its core','delve','tapestry','testament','pivotal','intricate','vibrant','foster','align with','showcase']
assert '\u2014' not in text
assert not re.search(r'(?i)\b actually \b', text)
for w in banned: assert w not in text.lower()
```

## If Luke asks you to also fix something beyond copy

Check `docs/uncommitted-work-brief-2026-04-21.md` before touching anything under `app/`, `components/`, `lib/data/seo.js`, `components/layout/*`, or `content/articles/*.md`. Those paths have uncommitted changes from prior sessions that are not yours.

## Reference

- Full voice: `_config/voice-and-tone.md`
- Design constraints: `_config/constraints.md`
- Landing-page copy (legacy reference): `_config/landing-page-copy.md`
- Design tokens: `_config/design-tokens.md` + `app/globals.css`
- Project rules: `CLAUDE.md` at repo root + parent
- SEO framework: `~/UnderCurrent/Vault/Research/wiki/seo-aio/nextjs-ai-search-framework.md`
- Service-page blueprint: `~/UnderCurrent/Vault/Research/wiki/seo-aio/service-page-blueprint.md`
- Keyword data: `/Users/luke/UnderCurrent/Builds/Products/SEO/articles/data/undercurrent/`

Start by asking Luke which target to run `/undercurrent-copy` against first.
