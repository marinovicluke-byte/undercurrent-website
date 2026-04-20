## Before You Prompt (GOLDEN Gate)
- **Goal**: Build the static landing page with lead capture form on the root domain
- **Output**: Landing page at root domain, form (name, email, phone, trade type, suburb) via Next.js server action → Supabase `leads` table, UTM param capture
- **Limits**: Static page only, no dynamic content. Form writes to `leads` table, no pipeline logic. Run /humanizer on all copy
- **Data**: Load 02-architecture.md §Data Flow by Stage (Lead Capture row) and pricing-and-contracts.md for value props
- **Evaluation**: 1. Form submits to Supabase correctly 2. Zod validation rejects bad input 3. UTM params stored in `utm_params` jsonb 4. Page loads <2s
- **Next**: Leads flow into welcome email sequence (Task 12) and onboarding (Task 8)

## Framework
- Use COSTAR for content and tone (landing page copy)
