# UnderCurrent Website — Workspace Context

## Overview
Website for UnderCurrent Automations, a Melbourne AI automation agency targeting Australian SMEs. Currently a Vite + React SPA on `main`, rebuilt as Next.js App Router on `redesign`. Core build complete, now in design + polish phase.

## Current State
All pages, components, API routes, SEO routes, and audit tools are built on `redesign`. The colorize design system (orange #E07A55 + sage #8FAF9F, sharp corners, pop-out box-shadows) is integrated. ServicesOverview uses sticky-scroll variant A1 with pain-point headlines.

## Stages

| # | Stage | Status |
|---|-------|--------|
| 01 | Homepage Redesign | In progress — services section done, rest pending |
| 02 | Design Pass | Not started |
| 03 | Performance | Not started |
| 04 | SEO Cutover | Not started |
| 05 | Vercel Switch | Not started |
| 06 | QA + Launch | Not started |

## Shared Resources
- Brand guide: `../../undercurrent-brand-guide.md`
- Design tokens: `app/globals.css` `@theme {}` block
- Voice + tone: `_config/voice-and-tone.md`
- Constraints: `_config/constraints.md`
- Planning docs: `docs/active/website-redesign-2026/`
- Specs: `docs/superpowers/specs/`

## Deploy Cutover Checklist
When Luke says "push it live":
1. Switch Vercel framework preset from Vite to Next.js
2. Verify all current production URLs have 301 redirects in next.config.mjs
3. Verify sitemap.xml matches or exceeds current sitemap coverage
4. Merge redesign → main
5. Verify Vercel auto-deploys, check preview URL first
6. Smoke test: homepage, blog posts, audit tools, contact form, location/service pages
7. Check Google Search Console for crawl errors after 24h

<!-- Last updated: 2026-04-15 -->
