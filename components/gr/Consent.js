'use client'
// components/gr/Consent.js — the Meta Pixel on the Google reviews page, and the way to opt out of it.
// Luke, D10 (13 Oct 2026, via ops): no cookie banner, the Pixel fires on load (his 14 June "zero-UX" call).
// The Pixel loads once the page is idle and grants itself, so PageView fires without a click. The footer
// carries the tracking notice, Privacy, and "Cookie settings and opt out", which opens Keep it on / Turn it off on
// demand: AU law asks for the privacy-policy disclosure and an opt-out, not an opt-in gate (meta-ads wiki,
// compliance-account-health §2.4, §4.2). A visitor who declines is remembered and the Pixel stays off.
// Nothing happens at all without NEXT_PUBLIC_META_PIXEL_ID.
import { useEffect, useState } from 'react'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const KEY = 'uc_consent'
// the opt-out also lives in memory, so it holds on this page even when storage throws (private mode)
let optedOut = false

function loadPixel() {
  if (window.ucPixel || document.getElementById('uc-pixel')) return Promise.resolve()
  window.__META_PIXEL_ID__ = PIXEL_ID
  return new Promise(res => {
    const s = document.createElement('script')
    s.id = 'uc-pixel'; s.src = '/js/uc-pixel.js'; s.async = true; s.onload = res; s.onerror = res
    document.head.appendChild(s)
  })
}
// re-checked at run time: an opt-out tapped before the idle callback fires must win
const grant = () => { if (adConsent()) loadPixel().then(() => { if (adConsent()) window.ucPixel?.grantConsent() }) }
// after load and idle, so the Pixel never competes with the hero on a phone
const whenIdle = fn => {
  const go = () => ('requestIdleCallback' in window ? requestIdleCallback(fn, { timeout: 3000 }) : setTimeout(fn, 1500))
  if (document.readyState === 'complete') go(); else addEventListener('load', go, { once: true })
}

// true unless this visitor opted out (BookingForm sends it as ad_consent)
export function adConsent() {
  if (!PIXEL_ID || optedOut) return false
  try { return localStorage.getItem(KEY) !== 'denied' } catch { return true }
}

export default function Consent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!PIXEL_ID) return
    whenIdle(grant)
    const reopen = e => { if (e.target.closest('[data-cookies]')) { e.preventDefault(); setOpen(true) } }
    document.addEventListener('click', reopen)
    return () => document.removeEventListener('click', reopen)
  }, [])

  useEffect(() => { document.documentElement.classList.toggle('gr-ck-open', open) }, [open])

  function choose(granted) {
    optedOut = !granted
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied') } catch {}
    if (granted) grant()
    else window.ucPixel?.revokeConsent()
    setOpen(false)
  }

  if (!PIXEL_ID || !open) return null
  return (
    <div className="ck" role="dialog" aria-label="Cookie settings">
      <p><b>We use cookies to measure our ads.</b> We use the Meta Pixel to see which Facebook and Instagram ads bring enquiries. You can turn it off here. <a href="/privacy" target="_blank" rel="noopener">Privacy policy</a></p>
      <div className="ck__b">
        <button type="button" className="btn" onClick={() => choose(true)}>Keep it on</button>
        <button type="button" className="btn btn--line" onClick={() => choose(false)}>Turn it off</button>
      </div>
    </div>
  )
}
