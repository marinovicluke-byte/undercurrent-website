import { useState } from 'react'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function PDFCaptureForm({ onSubmit, payload }) {
  const [form, setForm] = useState({ businessName: '', fullName: '', email: '', phone: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const errs = {}
    if (!form.businessName.trim()) errs.businessName = 'Required'
    if (!form.fullName.trim())     errs.fullName = 'Required'
    if (!form.email.trim())        errs.email = 'Required'
    else if (!EMAIL_RE.test(form.email)) errs.email = 'Enter a valid email address'
    return errs
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('loading')

    const webhookUrl = import.meta.env.VITE_N8N_AUDIT_WEBHOOK_URL
    const body = {
      ...payload,
      contact: {
        business_name: form.businessName.trim(),
        full_name:     form.fullName.trim(),
        email:         form.email.trim(),
        phone:         form.phone.trim() || null,
      },
    }

    try {
      const res = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('success')
      onSubmit?.()
    } catch {
      setStatus('error')
    }
  }

  const fieldStyle = (hasError) => ({
    width: '100%',
    padding: '12px 16px',
    borderRadius: '12px',
    border: `1.5px solid ${hasError ? 'rgba(220,60,60,0.5)' : 'rgba(212,201,176,0.6)'}`,
    backgroundColor: '#FDFAF6',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#1C1C1A',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  })

  const labelStyle = {
    display: 'block',
    fontFamily: 'DM Mono, monospace',
    fontSize: '0.68rem',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: '#8FAF9F',
    marginBottom: '6px',
  }

  const errStyle = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.76rem',
    color: '#dc3c3c',
    marginTop: '4px',
  }

  if (status === 'success') {
    return (
      <div style={{
        backgroundColor: 'rgba(143,175,159,0.1)',
        border: '1.5px solid rgba(143,175,159,0.4)',
        borderRadius: '20px',
        padding: '32px',
        textAlign: 'center',
      }}>
        <p style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.72rem', letterSpacing: '0.15em', color: '#8FAF9F', textTransform: 'uppercase', margin: '0 0 8px' }}>
          Report incoming
        </p>
        <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.6rem', color: '#1C1C1A', margin: '0', letterSpacing: '-0.01em' }}>
          Report on its way — check your inbox.
        </p>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#FDFAF6',
      border: '1px solid rgba(212,201,176,0.7)',
      borderRadius: '24px',
      padding: 'clamp(24px, 4vw, 40px)',
    }}>
      <p style={{
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.68rem',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: '#8FAF9F',
        margin: '0 0 6px',
      }}>
        Get your full report
      </p>
      <h2 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
        fontWeight: 400,
        color: '#1C1C1A',
        margin: '0 0 24px',
        letterSpacing: '-0.02em',
      }}>
        See the full breakdown — sent straight to your inbox.
      </h2>

      <form onSubmit={handleSubmit} noValidate>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(240px, 100%), 1fr))', gap: '16px', marginBottom: '16px' }}>
          {[
            { field: 'businessName', label: 'Business name', type: 'text', placeholder: 'Acme Plumbing' },
            { field: 'fullName',     label: 'Your name',     type: 'text', placeholder: 'Jane Smith' },
            { field: 'email',        label: 'Email address', type: 'email', placeholder: 'jane@example.com' },
            { field: 'phone',        label: 'Phone (optional)', type: 'tel', placeholder: '04XX XXX XXX' },
          ].map(({ field, label, type, placeholder }) => (
            <div key={field}>
              <label style={labelStyle}>{label}</label>
              <input
                type={type}
                value={form[field]}
                onChange={set(field)}
                placeholder={placeholder}
                style={fieldStyle(!!errors[field])}
                onFocus={e => { e.target.style.borderColor = '#8FAF9F' }}
                onBlur={e => { e.target.style.borderColor = errors[field] ? 'rgba(220,60,60,0.5)' : 'rgba(212,201,176,0.6)' }}
              />
              {errors[field] && <p style={errStyle}>{errors[field]}</p>}
            </div>
          ))}
        </div>

        {status === 'error' && (
          <p style={{ ...errStyle, marginBottom: '16px', fontSize: '0.84rem' }}>
            Something went wrong — please try again or email us directly at{' '}
            <a href="mailto:hello@undercurrent.com.au" style={{ color: '#dc3c3c' }}>hello@undercurrent.com.au</a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="btn-sage"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 28px',
            opacity: status === 'loading' ? 0.6 : 1,
            cursor: status === 'loading' ? 'default' : 'pointer',
          }}
        >
          {status === 'loading' ? 'Sending…' : 'Send me the full report'}
        </button>
      </form>
    </div>
  )
}
