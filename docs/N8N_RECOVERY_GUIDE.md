# n8n Recovery & Workflow Deployment Guide

**Owner:** Luke Marinovic — UnderCurrent Automations
**Last Updated:** 2026-03-21

---

## PURPOSE

This document lets any Claude session (or human) restore n8n workflows from local JSON files into the live n8n instance. Paste this into a new context window alongside the project folder, and the agent can auto-deploy everything.

---

## HARD RULES — READ BEFORE DOING ANYTHING

1. **ALWAYS backup before ANY Docker change:** `bash /root/backup-n8n.sh` on the server FIRST.
2. **NEVER run `docker volume rm`.** The volume `n8n_n8n_data` contains ALL workflows, credentials, and execution history. Deleting it destroys everything.
3. **NEVER modify docker-compose directly.** Use `/root/start-n8n.sh` — it has the correct volume mount and restart policy.
4. **Container removal is safe. Volume removal is NOT.** `docker rm n8n` = safe (container only). `docker volume rm` = DATA LOSS.
5. **To recreate the container safely:** `bash /root/backup-n8n.sh && docker stop n8n && docker rm n8n && bash /root/start-n8n.sh`
6. **Credentials go in n8n's encrypted credential store** (via the UI), NEVER hardcoded in workflow JSON or docker env vars.
7. **After importing workflows, credentials must be linked manually** in the n8n UI — they cannot be set via API.
8. **Always export workflow JSON after building/editing** in n8n and save a copy locally in the project's `workflows/` folder.

---

## SERVER DETAILS

| Item | Value |
|------|-------|
| Hetzner Server IP | 204.168.142.125 |
| n8n URL | https://n8n.undercurrentautomations.xyz |
| SSH | `ssh root@204.168.142.125` |
| Docker container | `n8n` with `--restart=unless-stopped` |
| Data volume | `n8n_n8n_data` mounted at `/home/node/.n8n` |
| Startup script | `/root/start-n8n.sh` |
| Backup script | `/root/backup-n8n.sh` |
| Backup location | `/root/n8n-backups/` |
| Daily backup cron | 3am server time |
| Hetzner snapshot | Taken 2026-03-20 |

---

## n8n API KEY

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MDE5MGU2My0wNzkxLTQwYjAtYTMzOS1lNThjYzg4MzBjOGEiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpIiwianRpIjoiOWQxOWExZjEtOTIwZS00NzIxLWFlMGYtYWNmZjRmNjMzNmUyIiwiaWF0IjoxNzc0MDE1MTM1LCJleHAiOjE3NzY1NzEyMDB9.lbjyhWxIeDu3n5NTwVpjZpP-_kQ9iqot6ogB07QY6rE
```

**Expires:** Check — if API calls return 401, generate a new key in n8n Settings → API.

---

## HOW TO IMPORT WORKFLOWS VIA API

For each JSON file in the project's `workflows/` folder, run:

```python
import json, requests

N8N_URL = "https://n8n.undercurrentautomations.xyz"
API_KEY = "<paste n8n API key>"

def import_workflow(json_path, name):
    with open(json_path) as f:
        wf = json.load(f)
    payload = {
        "name": name,
        "nodes": wf["nodes"],
        "connections": wf["connections"],
        "settings": {"executionOrder": "v1"}
    }
    r = requests.post(
        f"{N8N_URL}/api/v1/workflows",
        headers={"X-N8N-API-KEY": API_KEY, "Content-Type": "application/json"},
        json=payload
    )
    result = r.json()
    print(f"{name}: ID={result.get('id', 'ERROR')}")
    return result
```

Or via curl:

```bash
curl -X POST 'https://n8n.undercurrentautomations.xyz/api/v1/workflows' \
  -H 'X-N8N-API-KEY: <api_key>' \
  -H 'Content-Type: application/json' \
  -d '{"name": "Workflow Name", "nodes": [...], "connections": {...}, "settings": {"executionOrder": "v1"}}'
```

**Import order matters for linked workflows:**
1. Import sub-workflows first (e.g., Intent Detector)
2. Import parent workflows second (e.g., Reply Handler that calls Intent Detector)
3. After import, open the parent workflow and update the Execute Workflow node to point to the sub-workflow's actual n8n ID

---

## AFTER IMPORT — MANUAL STEPS

These CANNOT be automated and must be done in the n8n UI:

### 1. Create Credentials (Settings → Credentials → Add Credential)

| Credential Type | Name (exact) | Value |
|----------------|--------------|-------|
| Google Sheets OAuth2 API | Google Sheets — Outreach | Sign in with Google account that owns the sheet |
| Notion API | Notion — Outreach | Internal Integration Token (from .env or SESSION_HANDOFF.md) |
| Anthropic | Anthropic — Outreach | API Key (from .env or SESSION_HANDOFF.md) |
| Telegram | Telegram — Outreach | Bot Token (from .env or SESSION_HANDOFF.md) |

### 2. Link Credentials to Nodes

Open each workflow and click on every node that shows a credential warning. Select the matching credential from the dropdown:

- **Google Sheets nodes** → `Google Sheets — Outreach`
- **Telegram nodes** → `Telegram — Outreach`
- Any **Anthropic native nodes** → `Anthropic — Outreach` (note: most Claude calls use HTTP Request with API key from env vars, not the credential)
- Any **Notion native nodes** → `Notion — Outreach` (note: most Notion calls use HTTP Request with API key from env vars)

### 3. Link Execute Workflow Nodes

In **Reply Handler**, open the "Trigger Intent Detector" node and select the "Intent Detector" workflow from the dropdown.

### 4. Set Webhook URL in Unipile

In the Unipile dashboard (Settings → Webhooks):
- URL: `https://n8n.undercurrentautomations.xyz/webhook/reply-handler`
- Event: `message.received`

### 5. Connect Notion Integration

In Notion: open the CRM database → ••• (top right) → Connections → find your integration → Connect.

### 6. Activate Trigger-Based Workflows

- **Reply Handler** — activate (webhook trigger)
- **Bump Handler** — activate (hourly schedule)
- Scrape And Enrich and Send Outreach stay inactive (manual run only)

---

## ENVIRONMENT VARIABLES

These are loaded in the Docker container via `/root/start-n8n.sh`. Workflows access them via `{{ $env.VAR_NAME }}`.

| Variable | Purpose |
|----------|---------|
| APIFY_API_TOKEN | Facebook Pages Scraper |
| GOOGLE_PLACES_API_KEY | Google Places enrichment |
| GOOGLE_SHEETS_ID | Master outreach sheet ID |
| UNIPILE_API_KEY | Messenger send/receive |
| UNIPILE_ACCOUNT_ID | Unipile Facebook account |
| UNIPILE_DSN | Unipile API endpoint |
| ANTHROPIC_API_KEY | Claude message generation |
| TELEGRAM_BOT_TOKEN | Lead alert notifications |
| TELEGRAM_CHAT_ID | Luke's Telegram chat |
| NOTION_API_KEY | CRM database access |
| NOTION_DATABASE_ID | CRM database ID |

If you need to add a new env var: edit `/root/start-n8n.sh`, then run the safe container recreation process (backup → stop → rm → start).

---

## WHAT HAPPENED (FOR CONTEXT)

On 2026-03-20, the n8n container was recreated during a session that added environment variables. The container recreation didn't properly preserve the data volume mapping, which caused n8n to initialize a fresh empty database. All previously built workflows (email generators, invoice generators, outreach workflows) were lost from n8n's database.

**What was recovered/rebuilt:**
- 5 Facebook outreach workflows were rebuilt as JSON files and re-imported via API
- Daily backup cron was set up to prevent future data loss
- Hetzner snapshot was taken
- Container was reconfigured with proper restart policy and volume mount

**What was permanently lost:**
- Any workflows built directly in n8n that were never exported as JSON
- Previous n8n credentials (re-entered manually)
- Execution history

**Lesson:** Always export workflow JSONs locally. Always backup before Docker changes. The backup script and cron are now in place to prevent this.

---

## QUICK REFERENCE — COMMON TASKS

**Backup now:**
```bash
ssh root@204.168.142.125 "bash /root/backup-n8n.sh"
```

**Check n8n is running:**
```bash
ssh root@204.168.142.125 "docker ps"
```

**Restart n8n safely:**
```bash
ssh root@204.168.142.125 "bash /root/backup-n8n.sh && docker restart n8n"
```

**Full container recreation (if needed):**
```bash
ssh root@204.168.142.125 "bash /root/backup-n8n.sh && docker stop n8n && docker rm n8n && bash /root/start-n8n.sh"
```

**View recent backups:**
```bash
ssh root@204.168.142.125 "ls -la /root/n8n-backups/"
```

**Restore from backup (emergency):**
```bash
ssh root@204.168.142.125 "docker stop n8n && docker cp /root/n8n-backups/FILENAME n8n:/home/node/.n8n/database.sqlite && docker start n8n"
```
