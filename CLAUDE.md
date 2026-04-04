# UnderCurrent Website — Agent Instructions

## ⚠️ HARD RULE: DO NOT PUSH TO PRODUCTION

The `redesign` branch is a **design preview only**. It must NEVER be merged to `main` or deployed to production without Luke explicitly saying so.

**Do not:**
- Merge `redesign` into `main`
- Run `git checkout main && git merge redesign`
- Push anything to `main`
- Trigger a production Vercel deployment

**The only exception:** Luke says the words "push it live", "merge to main", or "deploy to production". Until then, all work stays on `redesign`.

---

## Branch Structure

| Branch | Purpose |
|--------|---------|
| `main` | Live production website — DO NOT TOUCH |
| `redesign` | Design preview — all work happens here |

---

## Project

- **Stack:** Next.js 15 (App Router), React 19, Tailwind v4
- **Dev server:** `npm run dev` → http://localhost:3001
- **Repo:** `marinovicluke-byte/undercurrent-website`
- **Vercel project:** `undercurrent-website` (team: marinovicluke-bytes-projects)

## Viewing the redesign locally

```bash
cd "/Users/luke/Desktop/UnderCurrent Builds/Internal/Website/undercurrent"
git checkout redesign
npm run dev
# Opens at http://localhost:3001
```

## Making design changes

All edits go to `redesign` branch. Commit and push after each change. Vercel will auto-deploy a preview URL once the framework preset is fixed (change from Vite → Next.js in Vercel project settings).

---

## Lab Notes — What Not To Try

- **Vercel build fails with "No Output Directory named dist"** — Vercel project is still configured for Vite. Fix: Vercel dashboard → Settings → Framework Preset → Next.js.
- **Workspace root lockfile warning** — cosmetic only. The parent `/Website/` dir has a `package-lock.json` that Turbopack detects. Does not affect builds.
- **`src/pages/` renamed to `src/views/`** — done on redesign branch to prevent Next.js from treating old Vite SPA pages as Pages Router routes.
