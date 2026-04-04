// lib/webhookProxy.js
export async function proxyToN8n(webhookUrl, payload) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!res.ok) {
      console.error(`n8n responded ${res.status}`)
      return { ok: false, status: res.status }
    }
    return { ok: true }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('n8n webhook timed out after 10s')
      return { ok: false, status: 504 }
    }
    console.error('n8n webhook error:', err.message)
    return { ok: false, status: 502 }
  } finally {
    clearTimeout(timeout)
  }
}
