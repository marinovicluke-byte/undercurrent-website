import { useState } from 'react'
import { Send } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import PageHead from '../components/PageHead'
import Breadcrumb from '../components/Breadcrumb'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', business: '', message: '' })
  const [sent, setSent] = useState(false)

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = e => {
    e.preventDefault()
    window.open(`mailto:luke@undercurrentautomations.com?subject=Enquiry from ${encodeURIComponent(form.name)} — ${encodeURIComponent(form.business)}&body=${encodeURIComponent(form.message)}%0A%0AReply to: ${encodeURIComponent(form.email)}`, '_blank')
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
      <PageHead
        title="Contact Us - AI Automation Enquiry | UnderCurrent"
        description="Get in touch with UnderCurrent. We typically respond within one business day."
        canonical="https://www.undercurrentautomations.com/contact"
      />
      <Navbar ready isSubPage />

      {/* Video background */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <video
          preload="auto"
          autoPlay
          muted
          loop
          playsInline
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            opacity: 0.35,
            pointerEvents: 'none',
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <div style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          background: [
            'linear-gradient(to bottom, #1C1C1A 0%, transparent 28%)',
            'linear-gradient(to top,    #1C1C1A 0%, transparent 32%)',
          ].join(', '),
        }} />
      </div>

      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

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
            <p className="font-cormorant" style={{ fontSize: '1.6rem', color: '#F7F3ED', marginBottom: '0.5rem' }}>Almost there!</p>
            <p className="font-dm" style={{ fontSize: '0.85rem', color: 'rgba(212,201,176,0.5)' }}>Your email client should have opened with a pre-filled message. Send it to complete your enquiry.</p>
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="contact-name" className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                  YOUR NAME
                </label>
                <input
                  id="contact-name"
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
                <label htmlFor="contact-business" className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                  BUSINESS NAME
                </label>
                <input
                  id="contact-business"
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
              <label htmlFor="contact-email" className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                EMAIL ADDRESS
              </label>
              <input
                id="contact-email"
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
              <label htmlFor="contact-message" className="font-mono" style={{ display: 'block', fontSize: '0.58rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.5rem' }}>
                MESSAGE
              </label>
              <textarea
                id="contact-message"
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
