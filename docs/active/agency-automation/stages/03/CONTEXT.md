## Before You Prompt (GOLDEN Gate)
- **Goal**: Build Next.js multi-tenant shell with Vercel Platforms middleware routing for 4 hostname patterns
- **Output**: `middleware.ts` routing logic, `/sites/[client-slug]` dynamic route, Supabase client init, Vercel project config
- **Limits**: No templates, no forms, no admin UI — shell and routing only. Must handle: root domain, `*.preview.*`, subdomains, custom domains
- **Data**: Load 02-architecture.md §Multi-Tenant Architecture and §Vercel Platforms Routing
- **Evaluation**: 1. All 4 hostname patterns route correctly 2. Client ID injected into rewrite 3. 404 for unknown domains 4. No performance overhead from middleware
- **Next**: Unlocks Tasks 7, 8, 14, 16 (landing page, onboarding form, admin UI, Vercel API)

## Framework
- Use RISEN for structured execution
