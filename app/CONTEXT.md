# app/ — Maintenance Stage Contract

The site is live. Work in `app/` is maintenance: content edits, copy tweaks, new service pages, small bug fixes, occasional new routes.

## Inputs

- `codemap.md` (project root) — current route + component map. Regenerate via `/codemap` after structural changes.
- `_config/` — voice, constraints, design tokens. `.impeccable.md` — design law.
- `lab-notes.md` — what's broken before, what fixed it. Read first.
- `content/articles/`, `content/case-studies/` — markdown source for blog routes.

## Process

1. Read `lab-notes.md` for prior fixes in your area.
2. Read `codemap.md`. Regenerate if structure has shifted.
3. Branch off `main`. Make the change. Server Components by default.
4. `npm run dev`, verify in browser.
5. PR back to `main`. Wait for "push it live" before merging.

## Skills & tools

| Job | Skill |
|-----|-------|
| New / rewritten service page | `/service-page-blueprint` |
| Site copy edits | `/undercurrent-copy` |
| Performance / a11y / SEO check | `/audit` |
| New article or case study | `scripts/` + `/uc-article` |

Don't duplicate skill content here — invoke the skill.

## What good looks like

- Surgical edits: every changed line traces to the request.
- Existing component reused before a new one is written.
- JSON-LD on every page with a structured shape (Article, FAQPage, Service, BreadcrumbList).
- Frontmatter `faqs:` on any article / case study with FAQ sections.
- Design tokens via `app/globals.css` `@theme {}`, never hardcoded hex.

## What to avoid

- Editing `src/`, `dist/`, `vite.config.js`, `tailwind.config.js`, `index.html` (legacy Vite).
- Pages Router patterns (no `pages/` dir).
- Hardcoded webhook URLs — use env vars.
- `clamp()` inside CSS custom properties (renders 0px — see lab-notes).
- Cluster slugs outside the valid 8-slug list — silently breaks Vercel build. Slug list lives in the publishing pipeline.

## Outputs

A merged PR to `main` and a `lab-notes.md` entry if anything broke or surprised.
