## Before You Prompt (GOLDEN Gate)
- **Goal**: Build all React Email templates and email sequences via Resend
- **Output**: Templates: welcome (3 emails, days 0/2/5), deposit confirmation, site live notification, handover pack, upsell (days 30/45/60). Tracked in `nudge_log`
- **Limits**: Email templates and send logic only. Sequences are ARQ-scheduled, not cron-based. Run /humanizer on all copy
- **Data**: Load 02-architecture.md §Data Flow by Stage (all email touchpoints) and pricing-and-contracts.md for messaging
- **Evaluation**: 1. All templates render correctly in email clients 2. Sequences fire at correct intervals 3. Opens/clicks tracked in `nudge_log` 4. Unsubscribe link included
- **Next**: Consumed by ARQ jobs (Task 11) for automated sending

## Framework
- Use COSTAR for content and tone (email copy)
