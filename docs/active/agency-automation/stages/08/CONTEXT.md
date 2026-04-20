## Before You Prompt (GOLDEN Gate)
- **Goal**: Build multi-step onboarding form collecting all business details needed for site generation
- **Output**: Multi-step form: business details, services, service areas, logo upload, photos, preferences, competitor URLs, licence number. Zod validation, Supabase Storage uploads
- **Limits**: Form + data persistence only, no Stripe integration (Task 9), no AI generation. Creates `clients` + `onboarding_responses` rows
- **Data**: Load 02-architecture.md §Supabase Schema (`onboarding_responses` table) and §Data Flow by Stage (Onboarding row)
- **Evaluation**: 1. All form steps validate with Zod 2. Files upload to Supabase Storage 3. Data persists to both tables 4. Mobile-friendly, works on tradesperson's phone
- **Next**: Connects to Stripe Checkout (Task 9) as final step

## Framework
- Use RISEN for structured execution
