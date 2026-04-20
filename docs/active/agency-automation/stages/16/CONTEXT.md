## Before You Prompt (GOLDEN Gate)
- **Goal**: Integrate Vercel API for custom domain assignment and ISR revalidation triggers
- **Output**: Add custom domain to Vercel project, verify DNS, trigger ISR revalidation on content update via API
- **Limits**: Vercel API only, no Cloudflare (Task 15). Domain must already have DNS pointing to Vercel before assignment
- **Data**: Load 02-architecture.md §Multi-Tenant Architecture (Vercel Platforms routing) and §Integrations (Vercel row)
- **Evaluation**: 1. Custom domains resolve to correct client site 2. DNS verification passes 3. Revalidation refreshes content within 60s 4. Error handling for invalid domains
- **Next**: Completes the deploy pipeline, site goes live on custom domain

## Framework
- Use RISEN for structured execution
