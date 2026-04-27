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
├── archive/                           ← shipped initiatives, kept for reference
│   ├── seo-aio-audit-2026-04-20.md    ← source for the active seo-aio initiative
│   ├── location-pages-qa-report.md    ← QA from 5-location-pages build
│   ├── location-pages-summary.md      ← per-page metrics from same build
│   ├── case-study-seo-improvement.md  ← raw source for a future case study
│   ├── inbound-lead-management-factcheck-2026-04-21.md  ← referenced by lab-notes
│   └── uncommitted-work-brief-2026-04-21.md             ← survey of still-untracked files
├── superpowers/
│   ├── plans/                         ← dated plan files (build-time)
│   └── specs/                         ← dated spec files (design-time)
├── screenshots/                       ← visual reference
└── N8N_RECOVERY_GUIDE.md              ← n8n server access, Docker, API
```

## Process

- New spec → `superpowers/specs/YYYY-MM-DD-<slug>-design.md`.
- New plan → `superpowers/plans/YYYY-MM-DD-<slug>.md`.
- New initiative active work → `active/<slug>-YYYY-MM-DD/`.
- Initiative complete → `active/<slug>/` stays put until next archive sweep, then moves to `archive/`.
- Loose one-shot artefact at `docs/` root (factcheck, handoff prompt) → don't. Either put it under the right initiative folder in `active/` or archive immediately.

## What to avoid

- Storing credentials in docs — use `.env`.
- Editing shipped specs — write a new dated one if the design changes.
- Letting one-shot prompts and frozen mockups accumulate at `docs/` root (the symptom this archive sweep cleaned up).
