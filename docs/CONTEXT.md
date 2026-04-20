# Docs — Planning & Documentation Context

## Inputs
- Layer 4 (working): completed features in app/, components/
- Layer 3 (reference): _config/, Content/UC-Articles/_config/

## Structure

```
docs/
├── active/
│   └── website-redesign-2026/
│       ├── 00-discovery.md         ← Initial discovery
│       ├── 01-research.md          ← Market/competitor research
│       ├── 02-architecture.md      ← Technical architecture decisions
│       └── 03-implementation-plan.md ← Phased build plan
├── superpowers/
│   ├── active/
│   │   └── 04-qa-report.md         ← QA findings from polish pass
│   ├── plans/
│   │   ├── 2026-03-19-business-audit-tool.md
│   │   ├── 2026-03-19-homepage-redesign.md    ← StoryBrand + Hormozi plan
│   │   ├── 2026-03-21-audit-email-report.md
│   │   └── 2026-03-25-article-system.md
│   └── specs/
│       ├── 2026-03-19-business-audit-tool-design.md
│       ├── 2026-03-19-homepage-redesign-design.md  ← Homepage redesign spec
│       ├── 2026-03-21-audit-email-report-design.md
│       ├── 2026-03-23-case-studies-resources-design.md
│       └── 2026-03-25-article-system-design.md
├── N8N_RECOVERY_GUIDE.md            ← n8n backup/restore, server details
└── case-study-seo-improvement.md    ← SEO audit case study
```

## Key Documents

| Document | Purpose | Status |
|----------|---------|--------|
| 02-architecture.md | Technical decisions for the redesign | Complete |
| 03-implementation-plan.md | Phased build plan | In progress |
| homepage-redesign spec + plan | StoryBrand + Hormozi homepage | Spec + plan done, not built |
| 04-qa-report.md | QA findings from first polish pass | Complete |
| N8N_RECOVERY_GUIDE.md | n8n server access, Docker, API key | Reference |

## Process
- Specs go in docs/superpowers/specs/ with date prefix
- Plans go in docs/superpowers/plans/ with date prefix
- Active work (QA reports, checklists) in docs/superpowers/active/
- High-level architecture decisions in docs/active/website-redesign-2026/

## What Good Looks Like
- Every non-obvious decision documented with rationale
- Specs have problem, proposal, scope, dependencies, open questions
- Plans have numbered steps, success criteria, dependencies between steps

## What to Avoid
- Building features without reading the relevant spec first
- Duplicating specs across docs/active/ and docs/superpowers/
- Storing credentials in docs (use .env)

<!-- Last updated: 2026-04-10 -->
