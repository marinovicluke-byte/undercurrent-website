## Before You Prompt (GOLDEN Gate)
- **Goal**: Integrate Stripe for deposit ($112), balance invoice ($337), and subscription ($50/mo) with webhook-driven stage transitions
- **Output**: Checkout Session creation, webhook handler for `payment_intent.succeeded` → `DEPOSIT_PAID` transition, balance invoice on approval, subscription after balance
- **Limits**: Payment flows only. Webhook handler calls state machine (Task 6), queues ARQ job (Task 11). No direct pipeline logic in Stripe handlers
- **Data**: Load 02-architecture.md §Data Flow by Stage (Deposit, Balance rows) and pricing-and-contracts.md for amounts
- **Evaluation**: 1. Deposit checkout works end-to-end 2. Webhook fires correct state transition 3. Balance invoice creates on approval 4. Subscription starts after balance paid
- **Next**: Deposit triggers site generation (Task 11), balance triggers go-live

## Framework
- Use RISEN for structured execution
