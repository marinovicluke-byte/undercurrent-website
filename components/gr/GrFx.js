'use client'
// components/gr/GrFx.js — the Google reviews page's behaviour. GrFx: page view, CTA clicks, the
// reveal, the sticky phone bar. Suburbs: Vildan's 66 suburb cells with the Jun/Jul/Sep tabs.
// Calc: do your own maths. Ported from the drafts' assets/uc.js, same rules.
import { useEffect, useState } from 'react'
import { captureAttribution, utmProps, track } from './track'

export default function GrFx({ niche, variant }) {
  useEffect(() => {
    const props = { niche, page_variant: variant, ...utmProps(captureAttribution()) }
    track('gr_page_view', props)

    // every "Book my call" button jumps to the form; log which one was tapped
    const onClick = e => {
      const a = e.target.closest('[data-cta]')
      if (a) track('gr_cta_click', { ...props, cta: a.getAttribute('data-cta') })
    }
    document.addEventListener('click', onClick)

    // reveal below the fold only: the hero paints at once so the H1 is the LCP, not a 1.2s fade
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }), { rootMargin: '0px 0px -8% 0px' })
    const rvs = [...document.querySelectorAll('.gr .rv')]
    if (innerHeight > 2400) rvs.forEach(el => el.classList.add('in')); else rvs.forEach(el => io.observe(el))

    // sticky bar: on once the hero button has scrolled away, off while the form is on screen
    const stk = document.getElementById('gr-stk'), cta = document.getElementById('gr-hero-cta'), book = document.getElementById('book')
    const upd = () => {
      if (!stk || !cta || !book) return
      const past = cta.getBoundingClientRect().bottom < 0
      const r = book.getBoundingClientRect()
      const atForm = r.top < innerHeight * 0.9 && r.bottom > 0
      stk.classList.toggle('on', past && !atForm)
    }
    addEventListener('scroll', upd, { passive: true }); addEventListener('resize', upd); upd()

    return () => { document.removeEventListener('click', onClick); io.disconnect(); removeEventListener('scroll', upd); removeEventListener('resize', upd) }
  }, [niche, variant])
  return null
}

/* IH suburb cells: 66 suburbs, top-3 count 11 on 1 Jun to 29 on 27 Sep 2026. Fills outward from the
   clinic so the picture reads as a spreading area. Positions are drawn, the counts are real. */
const ORDER = (() => {
  const d = i => { const r = Math.floor(i / 11), c = i % 11; return Math.hypot(r - 2.5, (c - 5) * 0.8) }
  return [...Array(66).keys()].sort((a, b) => d(a) - d(b))
})()
export function Suburbs({ subs, of }) {
  const [n, setN] = useState(subs[subs.length - 1][1])
  const on = new Set(ORDER.slice(0, n))
  return (
    <div className="ihx__map">
      <div className="gm__head">
        <p className="label">In the map top 3: <b>{n}</b> of {of} searches</p>
        <div className="gm__tabs" role="group" aria-label="Pick a month">
          {subs.map(([m, c]) => <button key={m} type="button" aria-pressed={n === c} onClick={() => setN(c)}>{m}</button>)}
        </div>
      </div>
      <div className="sub" aria-hidden="true">{[...Array(of).keys()].map(i => <i key={i} className={on.has(i) ? 'on' : undefined} />)}</div>
      <p className="fn">Real counts. Square positions are drawn.</p>
    </div>
  )
}

const fmt = x => 'A$' + Math.round(x).toLocaleString('en-AU')
export function Calc({ value, customer, customers }) {
  const [val, setVal] = useState(String(value))
  const [n, setN] = useState(2)
  const v = Math.max(0, parseFloat(val.replace(/[^0-9.]/g, '')) || 0)
  const m = Math.floor(v / 97)
  return (
    <div className="calc">
      <div className="calc__in">
        <div><label htmlFor="gr-val">One new {customer} is worth<small>Example, change it</small></label>
          <div className="calc__money"><span>A$</span><input id="gr-val" inputMode="numeric" value={val} onChange={e => setVal(e.target.value)} /></div></div>
        <div><label htmlFor="gr-n">Extra {customers} a month <span className="calc__n">{n}</span></label>
          <input id="gr-n" type="range" min="1" max="10" value={n} onChange={e => setN(+e.target.value)} /></div>
      </div>
      <div className="calc__out">
        <div><b>{fmt(v * n)}</b><span>extra a month</span></div>
        <div><b>{fmt(v * n * 12)}</b><span>extra a year</span></div>
        <div><b>{m < 1 ? '<1' : m}</b><span>months paid for by one new {customer}</span></div>
      </div>
      <p className="fn">An example, not a promise.</p>
    </div>
  )
}
