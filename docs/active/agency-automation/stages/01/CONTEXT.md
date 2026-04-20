## Before You Prompt (GOLDEN Gate)
- **Goal**: Create all Supabase tables, enums, indexes, and RLS policies for the agency pipeline
- **Output**: SQL migration files + applied schema in Supabase project, RLS tested with both service role and anon key
- **Limits**: No application code, no API endpoints — schema and security only. Use exact table/column names from 02-architecture.md
- **Data**: Load 02-architecture.md §Supabase Schema and §Data Flow by Stage before prompting
- **Evaluation**: 1. Schema matches architecture spec exactly 2. RLS enforced (anon can't read other clients' data) 3. Migrations are idempotent and reversible
- **Next**: Unlocks Tasks 5-8 (FastAPI skeleton, state machine, landing page, onboarding form)

## Framework
- Use RISEN for structured execution
