## Before You Prompt (GOLDEN Gate)
- **Goal**: Add monitoring, SLA enforcement, and run full end-to-end pipeline test with all services connected
- **Output**: Sentry integration (FastAPI + Next.js), UptimeRobot per domain, structlog throughout, SLA daily cron, full E2E test run
- **Limits**: No new features. Testing and hardening only. Must test both happy path and all error paths from architecture doc
- **Data**: Load 02-architecture.md §Workflow/Automation Structure (full pipeline), §State Machine (failure rules), §SLA Monitoring
- **Evaluation**: 1. Full pipeline runs end-to-end (fake lead → live site) 2. Sentry captures errors 3. SLA cron alerts at day 5 4. All error paths tested (duplicate webhooks, API failures, timeouts)
- **Next**: Pipeline is production-ready. Run /qa then /handover

## Framework
- Use RISEN for structured execution
