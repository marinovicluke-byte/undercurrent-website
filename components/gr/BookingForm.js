'use client'
// components/gr/BookingForm.js — the one form on the Google reviews page. Three short steps
// (a time, the business, the person) so the first ask is one tap, not eight fields (landing-pages
// wiki 06 §6.3 hybrid, §6.5 ladder). Posts the shared-brief contract to POST /api/leads/google-reviews.
// The Pixel Lead fires only after { ok: true }, with the same event_id the server sends to CAPI.
import { useEffect, useMemo, useRef, useState } from 'react'
import { buildDays, fetchTaken, slotLabel, localHint } from './slots'
import { captureAttribution, utmProps, metaIds, track, distinctId } from './track'

const YEARS = [['<1', 'Under 1 year'], ['1-3', '1 to 3 years'], ['3-10', '3 to 10 years'], ['10+', '10+ years']]
// compliance/consent-copy.md §2, word for word. Sent with the lead as the record of what was shown.
const CONSENT = 'I agree to be contacted by UnderCurrent by phone, SMS and email about my enquiry. Reply STOP to opt out anytime.'
const FAIL = 'That didn’t go through. Try again, or text Luke on 0438 780 815.'

// AU mobile only: the reminders go by text. Stored E.164, +614xxxxxxxx.
export function auMobile(raw) {
  let d = String(raw || '').replace(/[^\d+]/g, '')
  if (d.startsWith('+61')) d = d.slice(3)
  else if (d.startsWith('61') && d.length === 11) d = d.slice(2)
  else if (d.startsWith('0')) d = d.slice(1)
  return /^4\d{8}$/.test(d) ? '+61' + d : ''
}

function asUrl(raw) {
  const v = String(raw || '').trim()
  if (!v) return null
  try { return new URL(/^https?:\/\//i.test(v) ? v : 'https://' + v) } catch { return null }
}
// A Google Maps or Business Profile link: maps.app.goo.gl, g.page, share.google, google.com/maps, g.co/kgs.
export function gbpUrl(raw) {
  const u = asUrl(raw)
  return u && /(^|\.)(google\.[a-z.]+|goo\.gl|g\.page|g\.co|share\.google)$/i.test(u.hostname) ? u.href : ''
}
function siteUrl(raw) {
  const u = asUrl(raw)
  return u && u.hostname.includes('.') ? u.href : ''
}

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = (Math.random() * 16) | 0; return (c === 'x' ? r : (r & 3) | 8).toString(16) })
}

export default function BookingForm({ niche, variant }) {
  const [step, setStep] = useState(1)
  const [duration, setDuration] = useState(15)
  const [days, setDays] = useState([])
  const [avail, setAvail] = useState({ stub: true })
  const [dayKey, setDayKey] = useState('')
  const [slot, setSlot] = useState('')
  const [v, setV] = useState({ business_name: '', gbp_url: '', website: '', years_in_business: '', name: '', phone: '', email: '', consent: false, hp: '' })
  const [err, setErr] = useState({})
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const started = useRef(false)
  const top = useRef(null)

  useEffect(() => { setDays(buildDays()) }, [])
  useEffect(() => {
    let live = true
    fetchTaken(duration).then(r => { if (live) setAvail(r) })
    return () => { live = false }
  }, [duration])

  const shown = useMemo(() => days.map(d => ({
    ...d,
    slots: d.slots.filter(s => avail.taken ? !avail.taken.has(s.ms) : avail.available ? avail.available.has(s.ms) : true),
  })).filter(d => d.slots.length), [days, avail])
  const day = shown.find(d => d.key === dayKey) || shown[0]

  // a slot that disappears (taken, or the duration changed) is cleared, not silently kept
  useEffect(() => {
    if (slot && !shown.some(d => d.slots.some(s => s.iso === slot))) setSlot('')
  }, [shown, slot])

  const base = () => ({ niche, page_variant: variant, ...utmProps(captureAttribution()) })
  function start() {
    if (started.current) return
    started.current = true
    track('gr_form_start', base())
  }
  const set = (k, val) => { setV(o => ({ ...o, [k]: val })); if (err[k]) setErr(e => ({ ...e, [k]: '' })) }
  const go = n => { setStep(n); setMsg(''); requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })) }

  function next2() {
    if (!slot) { setMsg('Pick a time first.'); return }
    go(2)
  }
  function next3() {
    const e = {}
    if (!v.business_name.trim()) e.business_name = 'Add your business name.'
    if (!gbpUrl(v.gbp_url)) e.gbp_url = 'Paste the link from Google Maps. Open Google Maps, find your business, tap Share, then Copy link.'
    if (v.website.trim() && !siteUrl(v.website)) e.website = 'That doesn’t look like a website. Leave it blank if you don’t have one.'
    if (!v.years_in_business) e.years_in_business = 'Pick one.'
    setErr(e)
    if (Object.keys(e).length) return
    go(3)
  }

  async function submit(ev) {
    ev.preventDefault()
    const e = {}
    if (!v.name.trim()) e.name = 'Add your name.'
    const phone = auMobile(v.phone)
    if (!phone) e.phone = 'Add an Australian mobile, like 0412 345 678. The reminders come by text.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email.trim())) e.email = 'Add an email, like you@yourbusiness.com.au.'
    if (!v.consent) e.consent = 'Tick this so Luke can text you the time.'
    setErr(e)
    if (Object.keys(e).length) return
    if (v.hp) { setDone({ slot, name: v.name.trim(), phone }); return }

    setBusy(true); setMsg('')
    const attr = captureAttribution()
    const event_id = uuid()
    let adConsent = false
    try { adConsent = localStorage.getItem('uc_consent') === 'granted' } catch {}
    const body = {
      name: v.name.trim(), phone, email: v.email.trim(),
      business_name: v.business_name.trim(), website: siteUrl(v.website) || '', gbp_url: gbpUrl(v.gbp_url),
      years_in_business: v.years_in_business,
      slot_start: slot, duration_min: duration,
      niche, page_variant: variant,
      ...utmProps(attr), ...metaIds(attr),
      posthog_distinct_id: distinctId(), event_id, consent: true,
      // beyond the shared contract, safe to ignore server side: the consent wording shown, and whether
      // the visitor accepted ad cookies (CAPI is the lead-booking pane's call)
      consent_text: CONSENT, ad_consent: adConsent,
    }
    track('gr_form_submit', { ...base(), duration_min: duration })
    try {
      const res = await fetch('/api/leads/google-reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      let j = {}
      try { j = await res.json() } catch {}
      if (res.ok && j.ok) {
        track('gr_booked', { ...base(), duration_min: duration, lead_id: j.lead_id || '' })
        if (adConsent) window.ucPixel?.trackLead(event_id)
        setDone({ slot, name: v.name.trim(), phone })
        requestAnimationFrame(() => top.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
      } else if (res.status === 409 || j.error === 'slot_taken') {
        setAvail(await fetchTaken(duration))
        setSlot('')
        setStep(1)
        setMsg('Someone just took that time. Pick another one.')
      } else {
        setMsg(FAIL)
      }
    } catch {
      setMsg(FAIL)
    }
    setBusy(false)
  }

  if (done) {
    const first = done.name.split(/\s+/)[0]
    return (
      <div className="bk bk--done" ref={top} role="status">
        <p className="label"><b>Booked</b></p>
        <h3 className="bk__h">You’re booked, {first}.</h3>
        <p className="bk__when">{slotLabel(done.slot)}, Melbourne time. {duration} minutes.</p>
        <ol className="bk__next">
          <li>You get a text now with the time.</li>
          <li>You get a reminder the day before.</li>
          <li>Before the call, Luke looks up your Google profile and where you sit on the map.</li>
          <li>Luke calls you on {done.phone.replace(/^\+61/, '0')} at that time.</li>
        </ol>
        <p className="bk__fine">Need to move it? Text Luke on 0438 780 815.</p>
      </div>
    )
  }

  const pick = slot && (
    <p className="bk__pick">
      <span><b>{slotLabel(slot)}</b>, {duration} min</span>
      <button type="button" className="bk__chg" onClick={() => go(1)}>Change</button>
    </p>
  )

  return (
    <form className="bk" ref={top} onSubmit={submit} onFocusCapture={start} onPointerDownCapture={start} noValidate aria-label="Book a call with Luke">
      <ol className="bk__steps" aria-label={`Step ${step} of 3`}>
        {['A time', 'Your business', 'You'].map((t, i) => (
          <li key={t} className={i + 1 === step ? 'on' : i + 1 < step ? 'past' : ''} aria-current={i + 1 === step ? 'step' : undefined}><span>{i + 1}</span>{t}</li>
        ))}
      </ol>

      {step === 1 && (
        <fieldset className="bk__set">
          <legend className="bk__h">Pick a time for your call.</legend>
          <div className="bk__seg" role="radiogroup" aria-label="Call length">
            {[15, 30].map(n => (
              <button key={n} type="button" role="radio" aria-checked={duration === n} onClick={() => setDuration(n)}>{n} min</button>
            ))}
          </div>
          {!shown.length ? <p className="bk__fine">Loading times…</p> : (
            <>
              <div className="bk__days" role="radiogroup" aria-label="Day">
                {shown.map(d => (
                  <button key={d.key} type="button" role="radio" aria-checked={day?.key === d.key} onClick={() => setDayKey(d.key)}>{d.label}</button>
                ))}
              </div>
              <div className="bk__times" role="radiogroup" aria-label="Time">
                {day?.slots.map(s => (
                  <button key={s.iso} type="button" role="radio" aria-checked={slot === s.iso} onClick={() => { setSlot(s.iso); setMsg('') }}>{s.label}</button>
                ))}
              </div>
              <p className="bk__fine">Melbourne time.{slot ? ' ' + localHint(slot) : ''}</p>
            </>
          )}
          {pick}
          {msg ? <p className="bk__msg" role="alert">{msg}</p> : null}
          <button type="button" className="btn btn--block" onClick={next2}>Next: your business</button>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="bk__set">
          <legend className="bk__h">Tell Luke about your business.</legend>
          {pick}
          <div className="bk__f">
            <label htmlFor="bk-biz">Business name</label>
            <input id="bk-biz" name="business_name" autoComplete="organization" value={v.business_name} onChange={e => set('business_name', e.target.value)} aria-invalid={!!err.business_name} />
            {err.business_name ? <p className="bk__err">{err.business_name}</p> : null}
          </div>
          <div className="bk__f">
            <label htmlFor="bk-gbp">Your Google Maps link</label>
            <input id="bk-gbp" name="gbp_url" type="url" inputMode="url" placeholder="maps.app.goo.gl/…" value={v.gbp_url} onChange={e => set('gbp_url', e.target.value)} aria-invalid={!!err.gbp_url} aria-describedby="bk-gbp-how" />
            <details className="bk__how" id="bk-gbp-how"><summary>How do I find it?</summary><p>Open Google Maps and find your business. Tap Share, then Copy link. Paste it here.</p></details>
            {err.gbp_url ? <p className="bk__err">{err.gbp_url}</p> : null}
          </div>
          <div className="bk__f">
            <label htmlFor="bk-web">Website <small>(if you have one)</small></label>
            <input id="bk-web" name="website" type="url" inputMode="url" autoComplete="url" value={v.website} onChange={e => set('website', e.target.value)} aria-invalid={!!err.website} />
            {err.website ? <p className="bk__err">{err.website}</p> : null}
          </div>
          <div className="bk__f">
            <p className="bk__lbl" id="bk-yrs">How long have you been in business?</p>
            <div className="bk__chips" role="radiogroup" aria-labelledby="bk-yrs">
              {YEARS.map(([val, t]) => (
                <button key={val} type="button" role="radio" aria-checked={v.years_in_business === val} onClick={() => set('years_in_business', val)}>{t}</button>
              ))}
            </div>
            {err.years_in_business ? <p className="bk__err">{err.years_in_business}</p> : null}
          </div>
          <button type="button" className="btn btn--block" onClick={next3}>Next: your details</button>
          <button type="button" className="bk__back" onClick={() => go(1)}>Back</button>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="bk__set">
          <legend className="bk__h">Where should Luke text you the time?</legend>
          {pick}
          <div className="bk__f">
            <label htmlFor="bk-name">Your name</label>
            <input id="bk-name" name="name" autoComplete="name" value={v.name} onChange={e => set('name', e.target.value)} aria-invalid={!!err.name} />
            {err.name ? <p className="bk__err">{err.name}</p> : null}
          </div>
          <div className="bk__f">
            <label htmlFor="bk-ph">Mobile</label>
            <input id="bk-ph" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="0412 345 678" value={v.phone} onChange={e => set('phone', e.target.value)} aria-invalid={!!err.phone} />
            {err.phone ? <p className="bk__err">{err.phone}</p> : null}
          </div>
          <div className="bk__f">
            <label htmlFor="bk-em">Email</label>
            <input id="bk-em" name="email" type="email" inputMode="email" autoComplete="email" value={v.email} onChange={e => set('email', e.target.value)} aria-invalid={!!err.email} />
            {err.email ? <p className="bk__err">{err.email}</p> : null}
          </div>
          <label className="bk__ok">
            <input type="checkbox" checked={v.consent} onChange={e => set('consent', e.target.checked)} aria-invalid={!!err.consent} />
            <span>{CONSENT} <a href="/privacy" target="_blank" rel="noopener">Privacy policy</a></span>
          </label>
          {err.consent ? <p className="bk__err">{err.consent}</p> : null}
          <input className="bk__hp" name="company_url" tabIndex={-1} autoComplete="off" aria-hidden="true" value={v.hp} onChange={e => set('hp', e.target.value)} />
          {msg ? <p className="bk__msg" role="alert">{msg}</p> : null}
          <button type="submit" className="btn btn--block" disabled={busy}>{busy ? 'Booking…' : 'Book my call with Luke'}</button>
          <p className="bk__fine">You’ll get a text to confirm. Cancel or move it any time.</p>
          <button type="button" className="bk__back" onClick={() => go(2)}>Back</button>
        </fieldset>
      )}
    </form>
  )
}
