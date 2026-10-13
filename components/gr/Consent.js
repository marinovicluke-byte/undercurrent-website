'use client'
// components/gr/Consent.js — the ad-cookie banner and the Meta Pixel behind it (meta-ads kit,
// compliance/consent-copy.md §1). Shows only when NEXT_PUBLIC_META_PIXEL_ID is set: no Pixel, nothing to ask.
// The Pixel script loads only after Accept (or a stored Accept), so a visitor who says no never
// downloads it, and the page stays light on a phone. "Cookie settings" in the footer re-opens it.
import { useEffect, useState } from 'react'

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
const KEY = 'uc_consent'

function loadPixel() {
  if (window.ucPixel || document.getElementById('uc-pixel')) return Promise.resolve()
  window.__META_PIXEL_ID__ = PIXEL_ID
  return new Promise(res => {
    const s = document.createElement('script')
    s.id = 'uc-pixel'; s.src = '/js/uc-pixel.js'; s.async = true; s.onload = res; s.onerror = res
    document.head.appendChild(s)
  })
}

export default function Consent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!PIXEL_ID) return
    let c = ''
    try { c = localStorage.getItem(KEY) || '' } catch {}
    if (c === 'granted') loadPixel().then(() => window.ucPixel?.grantConsent())
    else if (!c) setOpen(true)
    const reopen = e => { if (e.target.closest('[data-cookies]')) { e.preventDefault(); setOpen(true) } }
    document.addEventListener('click', reopen)
    return () => document.removeEventListener('click', reopen)
  }, [])

  useEffect(() => { document.documentElement.classList.toggle('gr-ck-open', open) }, [open])

  function choose(granted) {
    try { localStorage.setItem(KEY, granted ? 'granted' : 'denied') } catch {}
    if (granted) loadPixel().then(() => window.ucPixel?.grantConsent())
    else window.ucPixel?.revokeConsent()
    setOpen(false)
  }

  if (!PIXEL_ID || !open) return null
  return (
    <div className="ck" role="dialog" aria-label="Cookies">
      <p><b>We use cookies to measure our ads.</b> We use the Meta Pixel to see which Facebook and Instagram ads bring enquiries. It only runs if you accept. You can change your mind any time. <a href="/privacy" target="_blank" rel="noopener">Privacy policy</a></p>
      <div className="ck__b">
        <button type="button" className="btn" onClick={() => choose(true)}>Accept</button>
        <button type="button" className="btn btn--line" onClick={() => choose(false)}>Decline</button>
      </div>
    </div>
  )
}
