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

The live site is the design (Luke, 2026-10-02). BRAND.md, the uc-redesign-v3 mockups and the old Vite rules (Space Grotesk, Satoshi, 14px radius, offset shadows) are retired. Source: `docs/blocks-design-notes.md`.

- Never delete or modify files under `src/` (legacy Vite reference, kept for migration history)
- Never edit `tailwind.config.js` (old Vite config, not active)
- Tokens live in the `:root` at the top of each page stylesheet in `app/styles/`: `--white`, `--off` #f6f6f6, `--ink` #141414, `--ink-2` #6b6b6b, `--line` rgba(20,20,20,.14), the noise data URIs, the five category colours. The `@theme {}` palette in `app/globals.css` is the retired design; don't build new UI from it
- Inter only (next/font, `--font-inter`): 500 for headings at -.02 to -.03em, 300 for big numerals, 18px/1.65 body, 11-12px uppercase tracked .14em for labels, links and buttons. No other faces
- Square corners everywhere: cards, photos, buttons, grids. The only round things are dots
- One hairline, `1px var(--line)`. A section opens on a full-width rule with a tracked caps label under it; lists are hairline rows; grids are hairline cells alternating white and #f6f6f6, no gaps
- Colour means the category (green automation, red search, orange web, teal strategy, plum growth) and fills grounds: the hero, cards, bands, the footer. On white paper it appears only at the size of a mark: the grain cross, the rail's underline, a hover, an 8% row band. No accent or offset shadows
- Grain is inline SVG noise blended over the category colour and jittered with `steps()`. On paper it shows only inside the 13px cross where hairlines meet
- Scanline lettering (`background-clip:text` over repeating stripes) is kept for the hero H1s, the wordmark, the footer sign and the article blocks' numerals and answers. No other gradient text
- Article blocks ship one look each (steps Fill, pairs Weight, tables Rail, Quick Answer Deck, workings Worked) from `app/styles/article-blocks.css`. The other fourteen live only on the board, `/article-blocks-concepts.html`, which has its own frozen stylesheet

## Errors

On any error, failure, or unexpected behaviour: read `lab-notes.md` first, then follow the global Error Protocol in `~/UnderCurrent/Vault/me.md`. Append new entries to `lab-notes.md` immediately.
