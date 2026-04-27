# docs/ — Planning & Reference Pointer Index

Documentation for shipped and in-flight initiatives. The site itself is live; this folder is read-only history plus active planning for current initiatives.

## Inputs

- Live code in `app/`, `components/`, `lib/`.
- `lab-notes.md` for what broke and what fixed it.
- `_config/` for brand and design law.

## Structure

```
docs/
├── active/                            ← current initiatives only
│   ├── seo-aio-2026-04-21/            ← live: SEO + AI search optimisation
│   ├── cutover-2026-04-20/            ← QA reports from the Next.js cutover
│   ├── agency-automation/             ← parked: agency-platform planning
│   └── eyebrow-pills.html             ← design experiment
├── superpowers/
│   ├── plans/                         ← dated plan files (build-time)
│   └── specs/                         ← dated spec files (design-time)
├── screenshots/                       ← visual reference
├── N8N_RECOVERY_GUIDE.md              ← n8n server access, Docker, API
├── case-study-seo-improvement.md      ← SEO audit case study
└── *-2026-04-*.md                     ← dated factcheck and handoff notes
```

## Process

- New spec → `superpowers/specs/YYYY-MM-DD-<slug>-design.md`.
- New plan → `superpowers/plans/YYYY-MM-DD-<slug>.md`.
- New initiative active work → `active/<slug>-YYYY-MM-DD/`.
- Initiative complete → leave in `active/` until next archive sweep.
- One-off factcheck or handoff notes → `docs/<slug>-YYYY-MM-DD.md` at root.

## What to avoid

- Storing credentials in docs — use `.env`.
- Editing shipped specs — write a new dated one if the design changes.
- Treating loose `*.html` files at `docs/` root as live (they're frozen mockups).
