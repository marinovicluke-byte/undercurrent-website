// components/gr/track.js — attribution and events for the Google reviews page. Browser only.
// PostHog loads afterInteractive from the root layout (when NEXT_PUBLIC_POSTHOG_KEY is set), so an
// event fired before it exists waits in a short queue. Every gr_* event carries niche, variant and the UTMs.
const KEY = 'gr_attr'
const UTM = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']

function cookie(name) {
  const m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'))
  return m ? decodeURIComponent(m[1]) : ''
}

// First touch wins for the session: a reload or a second ad click in the same tab keeps the first UTMs.
export function captureAttribution() {
  let a = {}
  try { a = JSON.parse(sessionStorage.getItem(KEY) || '{}') } catch {}
  const q = new URLSearchParams(location.search)
  if (!a.captured && [...UTM, 'fbclid'].some(k => q.get(k))) {
    UTM.forEach(k => { a[k] = q.get(k) || '' })
    a.fbclid = q.get('fbclid') || ''
    a.utm_term = q.get('utm_term') || ''
    a.ad_id = q.get('ad_id') || ''
    a.fbclid_at = Date.now()
    a.captured = true
    try { sessionStorage.setItem(KEY, JSON.stringify(a)) } catch {}
  }
  return a
}

export function utmProps(a) {
  const p = {}
  UTM.forEach(k => { p[k] = a[k] || '' })
  // lead-booking also takes utm_term and ad_id when the ad URL carries them
  if (a.utm_term) p.utm_term = a.utm_term
  if (a.ad_id) p.ad_id = a.ad_id
  return p
}

// _fbp and _fbc are set by the Pixel once consent is given. Without _fbc, build it from fbclid in
// Meta's documented shape: fb.1.<creation time in ms>.<fbclid>.
export function metaIds(a) {
  const fbp = cookie('_fbp')
  let fbc = cookie('_fbc')
  if (!fbc && a.fbclid) fbc = `fb.1.${a.fbclid_at || Date.now()}.${a.fbclid}`
  return { fbp, fbc, fbclid: a.fbclid || '' }
}

let queue = []
let timer = null
function flush() {
  if (window.posthog && typeof window.posthog.capture === 'function') {
    queue.forEach(([e, p]) => window.posthog.capture(e, p))
    queue = []
    clearInterval(timer); timer = null
  }
}

export function track(event, props) {
  queue.push([event, props])
  flush()
  if (queue.length && !timer) {
    let tries = 0
    timer = setInterval(() => { flush(); if (++tries > 40) { clearInterval(timer); timer = null; queue = [] } }, 250)
  }
}

export function distinctId() {
  try { return window.posthog?.get_distinct_id?.() || '' } catch { return '' }
}
