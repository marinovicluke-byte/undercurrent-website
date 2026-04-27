# Codemap — undercurrent (website)

Live marketing site at undercurrentautomations.com. Next.js 16 App Router on Vercel. See `CLAUDE.md` for instructions, `.impeccable.md` for design law.

## Top-level layout

```
app/              Next.js App Router — pages, API routes, SEO routes
components/       React components (8 subdirs by domain)
content/          Markdown source: articles/, case-studies/
lib/              Data, helpers, webhook proxy, validation
scripts/          One-shot Node scripts (image gen, faq migration, screenshots)
public/           Static assets (fonts, brand, articles, .well-known)
docs/             Planning + reference (see docs/CONTEXT.md)
_config/          Brand voice, constraints, design tokens
src/              Legacy Vite SPA — DO NOT MODIFY
dist/             Legacy Vite build output — DO NOT MODIFY
```

## Entry points

**Page routes** (`app/`): `/`, `/about`, `/about-concepts`, `/services`, `/services/preview`, `/services/preview/v5a`, `/process`, `/contact`, `/blog`, `/blog/[slug]`, `/blog/cluster/[slug]`, `/case-studies`, `/case-studies/[slug]`, `/audit`, `/audit/report`, `/roi`, `/missed-revenue`, `/privacy`, `/terms`, `/[slug]` (location + service dispatcher).

**API routes** (`app/api/`): `POST /api/contact`, `POST /api/qualify`, `POST /api/audit` — all Zod-validated, rate-limited via `lib/rateLimit.js`, proxy to n8n via `lib/webhookProxy.js`.

**SEO routes**: `app/sitemap.js`, `app/robots.js`, `app/feed.xml/route.js`, `app/llms.txt/route.js`.

**Scripts** (`scripts/*.mjs`): `gen-logo-png`, `gen-og-png`, `gen-social-pngs`, `capture-location-screenshots`, `populate-service-keywords`, `filter-service-keywords`, `migrate-article-faqs`, `prerender.js`.

## Modules

- `app/` — App Router routes. Server Components by default. `'use client'` only for forms, FadeIn, audit tools.
- `components/` — `layout/`, `sections/`, `ui/`, `forms/`, `audit/`, `pages/`, `about/`, `visuals/`. PascalCase, one per file.
- `lib/` — `articles.js`, `caseStudies.js`, `clusters.js` (markdown loaders); `data/` (services, locations, industries, pricing, faq, seo); `rateLimit.js`, `validation.js`, `webhookProxy.js`; `preview/` (untracked WIP).
- `content/articles/` — 22 markdown articles with `faqs:` frontmatter driving FAQPage JSON-LD.
- `content/case-studies/` — 2 markdown case studies, same frontmatter contract.
- `scripts/` — Node ESM utilities. Run via `node scripts/<name>.mjs`.

## External dependencies

- **Framework:** `next@16.2.2`, `react@19.2.4`, `react-dom@19.2.4`
- **Styling:** `tailwindcss@4`, `@tailwindcss/postcss`, `@tailwindcss/typography`
- **Content:** `gray-matter`, `remark`, `remark-gfm`, `remark-html`, `dompurify`
- **Validation:** `zod`
- **Icons:** `lucide-react`
- **Telemetry:** `@vercel/analytics`, `@vercel/speed-insights`
- **Dev:** `playwright` (for `scripts/capture-location-screenshots.mjs`), `eslint`, `eslint-config-next`

## Integration points

- **Vercel:** project `undercurrent-website` (team `marinovicluke-bytes-projects`). Production: `main` branch → undercurrentautomations.com. Auto-deploys preview URLs on every PR.
- **n8n:** three webhook endpoints (contact, audit, qualify). Server detail in `docs/N8N_RECOVERY_GUIDE.md`.
- **GitHub:** `marinovicluke-byte/undercurrent-website`.
- No Supabase, no Modal, no external AI APIs called from the site (all AI usage is in adjacent `agency-pipeline/` repo).

## Data & secrets

- **State:** markdown files in `content/`, static data tables in `lib/data/`. No database.
- **Secrets:** `.env.local` (gitignored). Naming pattern: `N8N_WEBHOOK_SECRET`, `N8N_CONTACT_WEBHOOK_URL`, `N8N_AUDIT_WEBHOOK_URL`, `N8N_QUALIFIER_WEBHOOK_URL`.
- **Static assets:** `public/articles/` (article images), `public/brand/`, `public/fonts/` (Satoshi local woff2).

## Last updated

2026-04-27
