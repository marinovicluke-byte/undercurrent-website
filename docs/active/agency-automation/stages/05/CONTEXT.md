## Before You Prompt (GOLDEN Gate)
- **Goal**: Build FastAPI app skeleton with webhook endpoints for Stripe + Calendly, idempotency layer, and Supabase client
- **Output**: FastAPI app with `/webhooks/stripe`, `/webhooks/calendly` endpoints, idempotency check against `processed_webhook_events`, structlog
- **Limits**: Webhook reception and validation only, no business logic in handlers yet. Signature verification for Stripe webhooks
- **Data**: Load 02-architecture.md §Workflow/Automation Structure and §Integrations for webhook auth methods
- **Evaluation**: 1. Webhooks accept valid payloads 2. Invalid signatures rejected 3. Duplicate events deduplicated 4. Structured logs output correctly
- **Next**: Unlocks Task 6 (saga state machine)

## Framework
- Use RISEN for structured execution
