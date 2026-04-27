# app/ — Maintenance Stage Contract

The site is live. Work in `app/` is maintenance: content edits, copy tweaks, new service pages, small bug fixes, occasional new routes.

## Inputs

- `codemap.md` (project root) — current route + component map. Regenerate via `/codemap` after structural changes.
- `_config/voice-and-tone.md`, `_config/constraints.md`, `_config/design-tokens.md` — brand and design law.
- `.impeccable.md` — six design principles.
- `lab-notes.md` — what's broken in the past, what fixed it.
- `content/articles/`, `content/case-studies/` — markdown source for blog and case study routes.

## Process

1. Read `lab-notes.md` for any prior fix that touches your area.
2. Read `codemap.md` to find the right file. If structure has changed since last codemap, regenerate first.
3. Branch off `main` (e.g. `mobile-polish`, `service-page-rev-ops`).
4. Make the change. Server Components by default; `'use client'` only when the component uses state, effects, or browser APIs (forms, FadeIn, audit tools).
5. `npm run dev` and verify in browser. Type-checking and tests verify code, not feature behaviour.
6. PR back to `main`. Wait for explicit "push it live" before merging.

## Skills & tools

| Job | Skill |
|-----|-------|
| New or rewritten service page | `/service-page-blueprint` |
| Site copy edits (any user-facing text) | `/undercurrent-copy` |
| Performance / accessibility / SEO check | `/audit` |
| New article or case study | `scripts/` publishing pipeline + `/uc-article` |

Do not duplicate skill content here. Invoke the skill.

## What good looks like

- Surgical edits — every changed line traces to the request.
- Existing component reused before a new one is written.
- JSON-LD on every page that has a structured data shape (Article, FAQPage, Service, BreadcrumbList).
- Frontmatter `faqs:` on any article / case study with FAQ sections (drives FAQPage schema, see `lab-notes.md` 2026-04-27).
- Design tokens via `app/globals.css` `@theme {}`, never hardcoded hex.

## What to avoid

- Editing files in `src/`, `dist/`, `vite.config.js`, `tailwind.config.js`, `index.html` — all legacy Vite, kept for migration history.
- Pages Router patterns (no `pages/` directory).
- Hardcoded n8n webhook URLs — use env vars.
- Inline `clamp()` inside CSS custom properties (renders as 0px, see `lab-notes.md`).
- Cluster slugs outside the valid list (`lead-generation`, `revenue-operations`, `website-experience-design`, `seo-ai-visibility`, `ai-strategy-training`, `custom-integrations`, `industry-guides`, `foundations`) — wrong cluster silently breaks the Vercel build.

## Outputs

A merged PR to `main` and an updated `lab-notes.md` entry if anything broke or surprised.
