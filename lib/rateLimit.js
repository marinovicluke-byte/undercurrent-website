// lib/rateLimit.js
const store = new Map()

const WINDOW_MS = 60_000  // 1 minute
const MAX_REQUESTS = 5

export function rateLimit(ip) {
  const now = Date.now()
  const entry = store.get(ip) || []
  const recent = entry.filter(ts => now - ts < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    store.set(ip, recent)
    return { allowed: false, remaining: 0 }
  }

  recent.push(now)
  store.set(ip, recent)
  return { allowed: true, remaining: MAX_REQUESTS - recent.length }
}
