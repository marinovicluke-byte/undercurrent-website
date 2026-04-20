## Before You Prompt (GOLDEN Gate)
- **Goal**: Stand up Hetzner CX22 with Docker Compose running FastAPI + ARQ + Redis, reverse-proxied by Caddy
- **Output**: `docker-compose.yml`, `Caddyfile`, FastAPI healthcheck endpoint responding, ARQ worker connected to Redis
- **Limits**: Infrastructure only, no business logic. Use `.env` with placeholder values for all API keys. No secrets in code
- **Data**: Load 02-architecture.md §Tools & Services table and §Integrations for service list and auth methods
- **Evaluation**: 1. `docker compose up` runs clean 2. FastAPI healthcheck returns 200 3. ARQ worker logs "started" 4. Caddy terminates TLS
- **Next**: Unlocks Task 5 (FastAPI skeleton + webhook handlers)

## Framework
- Use RISEN for structured execution
