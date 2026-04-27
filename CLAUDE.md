# UnderCurrent Website — Agent Instructions

## What this is

Live production marketing site for UnderCurrent Automations at undercurrentautomations.com. Next.js 16 App Router on Vercel, shipped to `main` 2026-04-20. Now in **maintenance mode**: content publishing, copy edits, service pages, occasional bug fixes. No phased build is in progress.

## Deploy rule

Production is `main`. Do not push to `main` without Luke explicitly saying "push it live", "merge to main", or "deploy to production". Preview deploys on feature branches are fine — they're private URLs on Vercel behind auth. Treat `git push origin main` as the one-way door: confirm before pulling the trigger.

## Project

- **Domain:** undercurrentautomations.com (NOT .com.au)
- **Stack:** Next.js 16.2.2 (App Router), React 19, Tailwind v4
- **Dev server:** `npm run dev` → http://localhost:3001
- **Branch model:** branch off `main`, open a PR, merge back. No long-lived feature branches.
- **Repo:** `marinovicluke-byte/undercurrent-website`
- **Vercel project:** `undercurrent-website` (team: marinovicluke-bytes-projects)

## Routing

| Domain | Read | Notes |
|--------|------|-------|
| App routes / components | `app/CONTEXT.md` + `codemap.md` | Stage contract + generated route/component map |
| Docs / planning | `docs/CONTEXT.md` | Pointer index for planning docs |
| Brand voice | `_config/voice-and-tone.md` | UC voice for site copy |
| Constraints | `_config/constraints.md` | What to avoid in copy/design |
| Design tokens | `_config/design-tokens.md` | Palette, typography, spacing |
| Operational memory | `lab-notes.md` | Live log of what broke / what worked — read before starting |
| Design law | `.impeccable.md` | Six design principles, non-negotiable |

For service-page work invoke `/service-page-blueprint`. For copy work invoke `/undercurrent-copy`. Both skills carry their own context.

## Hard Rules

- Never delete or modify files under `src/` (legacy Vite reference, kept for migration history)
- Never edit `tailwind.config.js` (old Vite config, not active)
- Design tokens live in `app/globals.css` under `@theme {}`
- Rounded 14px on cards, 999 on pills (confirmed UC pattern, zero-radius is wrong)
- Blue (#6A8DAD) is default accent, Sage (#8FAF9F) for positive/after, Orange (#E07A55) warnings/before only
- Hard offset accent shadows on cards (`6px 6px 0 0 var(--accent)`), never soft accent blurs
- No gradient text on headings, no glassmorphism, no animated shimmer, no ambient radial glows (one per page max, in ClosingCTA only)
- SF Mono confined to stat numerals and section numbers, never on every label
- Space Grotesk for display, Satoshi for body
- Full design principles: `.impeccable.md`

## Errors

On any error, failure, or unexpected behaviour: read `lab-notes.md` first, then follow the global Error Protocol in `~/UnderCurrent/Vault/me.md`. Append new entries to `lab-notes.md` immediately.
