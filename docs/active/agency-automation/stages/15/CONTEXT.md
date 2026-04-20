## Before You Prompt (GOLDEN Gate)
- **Goal**: Automate domain purchase, DNS zone creation, and record management via Cloudflare API
- **Output**: Domain availability check, Registrar API purchase, DNS zone creation, A/CNAME records pointing to Vercel, SSL verification. Writes to `client_domains`
- **Limits**: Cloudflare API integration only, no Vercel domain assignment (Task 16). Must handle API rate limits and propagation delays
- **Data**: Load 02-architecture.md §Tools & Services (Cloudflare row) and §Data Flow by Stage (Deploy row)
- **Evaluation**: 1. Programmatic domain purchase works 2. DNS records created correctly 3. SSL provisions automatically 4. `client_domains` updated with zone/record IDs
- **Next**: Works with Vercel API (Task 16) to complete domain-to-site binding

## Framework
- Use RISEN for structured execution
