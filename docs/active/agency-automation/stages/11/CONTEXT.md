## Before You Prompt (GOLDEN Gate)
- **Goal**: Implement all ~12 ARQ async jobs that drive the pipeline from lead to live
- **Output**: ARQ jobs: `send_welcome_sequence`, `generate_site`, `deploy_site`, `register_domain`, `add_vercel_domain`, `invoice_balance`, `create_subscription`, `send_live_email`, `send_handover_pack`, `send_upsell_sequence`, `sla_check_cron`, `process_stalled_pipeline`
- **Limits**: Each job calls the relevant service integration (Tasks 9, 10, 12, 13, 15, 16). 3x retry with exponential backoff (60s, 300s, 900s). Failed → FAILED status + Telegram alert
- **Data**: Load 02-architecture.md §Workflow/Automation Structure (full pipeline) and §State Machine (retry/failure rules)
- **Evaluation**: 1. Every job executes correctly in isolation 2. Retries work with correct backoff 3. Failures update `build_jobs` status and alert Telegram 4. State transitions fire correctly
- **Next**: Unlocks Tasks 14, 15, 16 (admin UI, Cloudflare, Vercel API)

## Framework
- Use RISEN for structured execution
