## Before You Prompt (GOLDEN Gate)
- **Goal**: Build Telegram bot for pipeline alerts and inline keyboard approve/reject actions
- **Output**: Bot sends alerts on every state change, ARQ failure, and SLA breach. Inline keyboard with Approve/Reject buttons. FastAPI callback endpoints for button presses
- **Limits**: Telegram integration only, no admin UI. Luke's chat ID hardcoded in `.env`. Inline keyboard triggers state machine transitions
- **Data**: Load 02-architecture.md §State Machine (alert rules) and §Tools & Services (Telegram row)
- **Evaluation**: 1. Alerts fire on every state change 2. Inline keyboard triggers approve/reject correctly 3. Failures alert immediately 4. SLA breach alerts at day 5
- **Next**: Operational from day one, works alongside Admin UI (Task 14)

## Framework
- Use RISEN for structured execution
