'use client'
import { useState } from 'react'

const INITIAL = { name: '', email: '', phone: '', company: '', message: '', honeypot: '' }

const fieldWrap = { display: 'flex', flexDirection: 'column', gap: 8 }
const label = {
  fontFamily: 'var(--font-display)',
  fontWeight: 500,
  fontSize: 12,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: 'var(--text-secondary)',
}
const input = {
  width: '100%',
  padding: '12px 14px',
  background: 'var(--charcoal)',
  border: '1px solid var(--text-faint)',
  borderRadius: 10,
  color: 'var(--off-white)',
  fontFamily: 'var(--font-body)',
  fontSize: 15,
  lineHeight: 1.4,
  outline: 'none',
  transition: 'border-color 140ms ease, box-shadow 140ms ease',
}

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle')

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    if (form.honeypot) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          padding: '36px 40px',
          background: 'var(--charcoal)',
          border: '1px solid var(--text-faint)',
          borderRadius: 14,
          boxShadow: '6px 6px 0 0 var(--sage)',
          textAlign: 'left',
        }}
      >
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 26,
            letterSpacing: '-0.02em',
            color: 'var(--off-white)',
          }}
        >
          Message received.
        </p>
        <p style={{ margin: '12px 0 0', fontFamily: 'var(--font-body)', fontSize: 15, color: 'var(--text-secondary)' }}>
          We&apos;ll be in touch within 1 business day.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        padding: '36px 40px',
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        borderRadius: 14,
        boxShadow: '6px 6px 0 0 var(--blue)',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
      }}
    >
      <style>{`
        .uc-contact-input:focus {
          border-color: var(--blue-light) !important;
          box-shadow: 0 0 0 1px var(--blue-light);
        }
      `}</style>

      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={set('honeypot')}
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
        className="uc-stack-2col"
      >
        <div style={fieldWrap}>
          <label style={label} htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            className="uc-contact-input"
            style={input}
          />
        </div>
        <div style={fieldWrap}>
          <label style={label} htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            className="uc-contact-input"
            style={input}
          />
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
        className="uc-stack-2col"
      >
        <div style={fieldWrap}>
          <label style={label} htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            className="uc-contact-input"
            style={input}
          />
        </div>
        <div style={fieldWrap}>
          <label style={label} htmlFor="company">Business name</label>
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={set('company')}
            className="uc-contact-input"
            style={input}
          />
        </div>
      </div>

      <div style={fieldWrap}>
        <label style={label} htmlFor="message">Message *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          className="uc-contact-input"
          style={{ ...input, resize: 'vertical', minHeight: 140, lineHeight: 1.5 }}
        />
      </div>

      {status === 'error' && (
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 13, color: 'var(--orange-light)' }}>
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <div style={{ marginTop: 8 }}>
        <button
          type="submit"
          disabled={status === 'loading'}
          className="uc-contact-submit"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 26px',
            borderRadius: 999,
            background: 'var(--off-white)',
            color: 'var(--charcoal-deep)',
            border: '1px solid var(--charcoal-deep)',
            boxShadow: '4px 4px 0 0 var(--blue)',
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 15,
            letterSpacing: '-0.01em',
            cursor: status === 'loading' ? 'wait' : 'pointer',
            opacity: status === 'loading' ? 0.7 : 1,
            transition: 'transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1)',
          }}
        >
          <span>{status === 'loading' ? 'Sending…' : 'Send message'}</span>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <path d="M4 12 L20 12 M14 6 L20 12 L14 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <style>{`
          .uc-contact-submit:hover:not(:disabled) {
            transform: translate(-3px, -3px);
            box-shadow: 7px 7px 0 0 var(--blue);
          }
        `}</style>
      </div>
    </form>
  )
}
