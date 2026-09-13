'use client'
// components/site/ContactForm.js — the contact mockup's form, markup verbatim,
// wired to /api/contact. The mockup swapped the body for the sent line and
// nothing left the page; here a good send POSTs first, then swaps.
import { useRef, useState } from 'react'

const FAIL = 'Something went wrong. Email us at luke@undercurrentautomations.com.'

export default function ContactForm() {
  const ref = useRef(null)
  const [tried, setTried] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e) {
    e.preventDefault()
    const form = ref.current
    setTried(true)
    const bad = form.querySelector(':invalid')
    if (bad) { bad.focus(); return }
    setError('')
    const d = new FormData(form)
    const body = {
      name: d.get('name'),
      email: d.get('email'),
      phone: d.get('phone'),
      company: d.get('company'),
      message: d.get('message'),
      honeypot: d.get('honeypot') || '',
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(res.status)
      setSent(true)
    } catch {
      setError(FAIL)
    }
  }

  function again() {
    ref.current.reset()
    setSent(false)
    setTried(false)
    setError('')
  }

  return (
    <form ref={ref} onSubmit={onSubmit} className={`form rv${tried ? ' tried' : ''}${sent ? ' is-sent' : ''}`} style={{"--i":"4"}} noValidate>
      <div className="form__body">
        <div className="f"><input id="f-name" name="name" type="text" required placeholder=" " autoComplete="name" /><label htmlFor="f-name">Name</label></div>
        <div className="f"><input id="f-email" name="email" type="email" required placeholder=" " autoComplete="email" /><label htmlFor="f-email">Email</label></div>
        <div className="fr">
          <div className="f"><input id="f-phone" name="phone" type="tel" placeholder=" " autoComplete="tel" /><label htmlFor="f-phone">Phone</label></div>
          <div className="f"><input id="f-company" name="company" type="text" placeholder=" " autoComplete="organization" /><label htmlFor="f-company">Company name</label></div>
        </div>
        <div className="f"><textarea id="f-msg" name="message" required minLength={10} placeholder=" " rows={3}></textarea><label htmlFor="f-msg">I&apos;m looking for…</label></div>
        <div className="form__foot"><button className="btn" type="submit">Send</button><span className="d-note">We respond within 1 business day.</span>{error ? <p className="d-note" role="alert">{error}</p> : null}</div>
        <input name="honeypot" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px' }} />
      </div>
      <div className="form__sent"><h2>Sent.</h2><p>Thanks. We&apos;ll reply within one business day.</p><button type="button" className="link" data-again="" onClick={again}>Send another</button></div>
    </form>
  )
}
