## Before You Prompt (GOLDEN Gate)
- **Goal**: Build admin UI for Luke to manage the pipeline: kanban view, client detail, preview, content editing, and approval
- **Output**: Pipeline kanban (display only), client detail page, preview iframe (`*.preview.*`), content edit form (writes `custom_overrides`), approve button triggering deploy job
- **Limits**: Admin-only routes (auth gated to Luke). No client-facing features. Reads/writes Supabase directly. No drag-and-drop on kanban
- **Data**: Load 02-architecture.md §Multi-Tenant Architecture (preview URLs) and §Data Flow by Stage (Review row)
- **Evaluation**: 1. Kanban shows all pipeline stages with client counts 2. Preview iframe loads correctly 3. Content edits persist to `custom_overrides` 4. Approve triggers deploy ARQ job
- **Next**: Luke's primary interface for pipeline management

## Framework
- Use RISEN for structured execution
