# UnderCurrent Website — Agent Instructions

## HARD RULE: DO NOT PUSH TO PRODUCTION

The `redesign` branch is a design preview only. NEVER merge to `main` or deploy to production without Luke explicitly saying "push it live", "merge to main", or "deploy to production". All work stays on `redesign`.

## Routing

| Domain | Read | Notes |
|--------|------|-------|
| Homepage / sections | stages/01_homepage_redesign/CONTEXT.md | StoryBrand + Hormozi rewrite |
| Design pass | stages/02_design_pass/CONTEXT.md | Premium polish across all pages |
| Performance | stages/03_performance/CONTEXT.md | CWV targets, bundle, images |
| SEO cutover | stages/04_seo_cutover/CONTEXT.md | 301 redirects, URL parity |
| Vercel deploy | stages/05_vercel_switch/CONTEXT.md | Framework preset, env vars |
| QA + launch | stages/06_qa_launch/CONTEXT.md | Final QA, merge, go-live |
| App routes | app/CONTEXT.md | Page routes, API routes, components |
| Docs / planning | docs/CONTEXT.md | Specs, plans, architecture |
| Brand / design | _config/voice-and-tone.md | Colorize palette, pop-out style |
| Constraints | _config/constraints.md | What to avoid |

## Project

- **Domain:** undercurrentautomations.com (NOT .com.au)
- **Stack:** Next.js 15 (App Router), React 19, Tailwind v4
- **Dev server:** `npm run dev` → http://localhost:3001
- **Branch:** `redesign` (all work here)
- **Repo:** `marinovicluke-byte/undercurrent-website`
- **Vercel project:** `undercurrent-website` (team: marinovicluke-bytes-projects)

## Hard Rules

- Never delete or modify files under `src/` (legacy Vite reference)
- Never edit `tailwind.config.js` (old Vite config, not active)
- Design tokens live in `app/globals.css` under `@theme {}`
- Rounded 14px on cards, 999 on pills (confirmed UC pattern, zero-radius is wrong)
- Blue (#6A8DAD) is default accent, Sage (#8FAF9F) for positive/after, Orange (#E07A55) warnings/before only
- Hard offset accent shadows on cards (`6px 6px 0 0 var(--accent)`), never soft accent blurs
- No gradient text on headings, no glassmorphism, no animated shimmer, no ambient radial glows (one per page max, in ClosingCTA only)
- SF Mono confined to stat numerals and section numbers, never on every label
- Space Grotesk for display, Satoshi for body
- Full design principles: `.impeccable.md` (v2)

## Lab Notes — What Not To Try

- **Vercel build fails with "No Output Directory named dist"** — Vercel project is still configured for Vite. Fix: Vercel dashboard → Settings → Framework Preset → Next.js. Do NOT change until ready to deploy redesign.
- **Workspace root lockfile warning** — cosmetic only. The parent `/Website/` dir has a `package-lock.json` that Turbopack detects. Does not affect builds.
- **`src/pages/` renamed to `src/views/`** — done on redesign branch to prevent Next.js from treating old Vite SPA pages as Pages Router routes.
- **Tailwind v4 uses @theme in globals.css** — the tailwind.config.js in root is the OLD Vite config. The actual design tokens for the redesign are in app/globals.css under `@theme {}`. Do not edit tailwind.config.js thinking it controls the redesign.
- **Legacy files coexist on redesign branch** — src/, dist/, vite.config.js, index.html, tailwind.config.js are all from the old Vite SPA. Do not modify or delete them, they're reference material for the migration.
