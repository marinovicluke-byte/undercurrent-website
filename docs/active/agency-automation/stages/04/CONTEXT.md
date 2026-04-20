## Before You Prompt (GOLDEN Gate)
- **Goal**: Build 3 trade website templates (`trades-bold`, `trades-clean`, `trades-local`) as slot-based Next.js component trees
- **Output**: 3 template component directories, each rendering from a `content_json` prop, Tailwind v4 `@theme` CSS variables for per-client theming
- **Limits**: Templates consume JSON data only, no data fetching. Responsive, accessible, Lighthouse >90. No AI generation logic
- **Data**: Load 02-architecture.md §Template System for template specs and differentiation model
- **Evaluation**: 1. All 3 templates render with mock JSON 2. Lighthouse >90 on all 3 3. Mobile-responsive 4. CSS variables correctly theme each client
- **Next**: Templates consumed by the multi-tenant rendering pipeline (Task 3 integration)

## Framework
- Use RISEN for structured execution
