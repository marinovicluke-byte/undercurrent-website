## Before You Prompt (GOLDEN Gate)
- **Goal**: Implement the pipeline state machine with enforced transitions and append-only audit trail
- **Output**: State machine module enforcing `LEAD → ONBOARDING → DEPOSIT_PAID → BUILDING → REVIEW_PENDING → APPROVED → DEPLOYING → LIVE → CHURNED`, `pipeline_events` logging
- **Limits**: State transitions only, no ARQ job dispatch yet. Invalid transitions must raise, not silently fail
- **Data**: Load 02-architecture.md §State Machine for transition rules, retry policy, and failure handling
- **Evaluation**: 1. All valid transitions succeed 2. Invalid transitions raise errors 3. Every transition logged to `pipeline_events` 4. Actor enum (system/luke/client/stripe) tracked
- **Next**: Unlocks Tasks 9, 11, 12, 13, 14 (Stripe, ARQ jobs, email, Telegram, admin UI)

## Framework
- Use RISEN for structured execution
