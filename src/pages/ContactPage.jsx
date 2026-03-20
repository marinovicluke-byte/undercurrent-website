import { useState } from 'react'
import { Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    window.location.href = `mailto:luke@undercurrentautomations.com?subject=Enquiry from ${encodeURIComponent(form.name)} — ${encodeURIComponent(form.business)}&body=${encodeURIComponent(form.message)}%0A%0AReply to: ${encodeURIComponent(form.email)}`
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '0.875rem 1.1rem',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(212,201,176,0.12)',
    borderRadius: '0.6rem',
    color: '#F7F3ED',
    fontSize: '0.875rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
  }

  return (
    <div style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar ready />

      {/* Background wisps */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: '700px', height: '600px', left: '-200px', top: '10%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.09) 0%, transparent 70%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: '600px', height: '500px', right: '-150px', top: '30%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.06) 0%, transparent 70%)', filter: 'blur(100px)' }} />
        <svg width="100%" height="100%" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" style={{ position: 'absolute', inset: 0 }}>
          <defs><filter id="cWisp"><feGaussianBlur stdDeviation="20" /></filter></defs>
          <g filter="url(#cWisp)">
            <path d="M -100 300 C 200 150 600 400 900 250 S 1300 100 1600 320" stroke="rgba(143,175,159,0.18)" strokeWidth="90" fill="none" strokeLinecap="round" />
            <path d="M -100 520 C 300 650 700 380 1050 540 S 1420 640 1700 460" stroke="rgba(143,175,159,0.11)" strokeWidth="110" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 10, maxWidth: '640px', margin: '0 auto', padding: '10rem 1.5rem 6rem' }}>

        {/* Label */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ border: '1px solid rgba(143,175,159,0.25)', padding: '0.28rem 0.9rem' }}>
            <p className="font-mono" style={{ fontSize: '0.6rem', letterSpacing: '0.22em', color: '#8FAF9F' }}>
              GET IN TOUCH
            </p>
          </div>
        </div>

        <h1
          className="font-cormorant"
          style={{ textAlign: 'center', fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '1rem', letterSpacing: '-0.01em' }}
        >
          Send Us a Message
        </h1>
        <p
          className="font-dm"
          style={{ textAlign: 'center', fontSize: '0.9rem', color: 'rgba(212,201,176,0.5)', lineHeight: 1.7, marginBottom: '3.5rem' }}
        >
          We typically respond within one business day.
        </p>

        {sent ? (
          <div style={{ textAlign: 'center', padding: '3rem', border: '1px solid rgba(143,175,159,0.2)', borderRadius: '1.25rem', background: 'rgba(143,175,159,0.05)' }}>
            <p className="font-cormorant" style={{ fontSize: '1.6rem', color: '#F7F3ED', marginBottom: '0.5rem' }}>Message sent.</p>
            <p className="font-dm" style={{ fontSize: '0.85rem', color: 'rgba(212,201,176,0.5)' }}>We'll be in touch soon.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                  YOUR NAME
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handle}
                  placeholder="Luke"
                  required
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(143,175,159,0.4)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(212,201,176,0.12)' }}
                />
              </div>
              <div>
                <label className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                  BUSINESS NAME
                </label>
                <input
                  name="business"
                  value={form.business}
                  onChange={handle}
                  placeholder="Your business"
                  style={inputStyle}
                  onFocus={e => { e.target.style.borderColor = 'rgba(143,175,159,0.4)' }}
                  onBlur={e => { e.target.style.borderColor = 'rgba(212,201,176,0.12)' }}
                />
              </div>
            </div>

            <div>
              <label className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                EMAIL ADDRESS
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handle}
                placeholder="you@example.com"
                required
                style={inputStyle}
                onFocus={e => { e.target.style.borderColor = 'rgba(143,175,159,0.4)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(212,201,176,0.12)' }}
              />
            </div>

            <div>
              <label className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                MESSAGE
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handle}
                placeholder="Tell us what's on your mind..."
                required
                rows={6}
                style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.65 }}
                onFocus={e => { e.target.style.borderColor = 'rgba(143,175,159,0.4)' }}
                onBlur={e => { e.target.style.borderColor = 'rgba(212,201,176,0.12)' }}
              />
            </div>

            <button
              type="submit"
              className="font-dm"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.9rem 1.5rem',
                background: '#F0EBE2',
                color: '#1C1C1A',
                border: 'none',
                borderRadius: '0.6rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                marginTop: '0.5rem',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.opacity = '0.88' }}
              onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
            >
              Send Message
              <Send size={15} />
            </button>
          </form>
        )}

        {/* Direct email fallback */}
        <p className="font-dm" style={{ textAlign: 'center', fontSize: '0.78rem', color: 'rgba(212,201,176,0.3)', marginTop: '2rem' }}>
          Or email directly:{' '}
          <a href="mailto:luke@undercurrentautomations.com" style={{ color: 'rgba(143,175,159,0.6)', textDecoration: 'none' }}>
            luke@undercurrentautomations.com
          </a>
        </p>
      </div>

      <Footer />
    </div>
  )
}
