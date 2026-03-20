import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

function useFadeIn(delay = 0) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])
  return [ref, visible]
}

export default function Contact() {
  const [h2Ref, h2Visible] = useFadeIn(0)
  const [subRef, subVisible] = useFadeIn(120)
  const [ctaRef, ctaVisible] = useFadeIn(220)
  const [chipsRef, chipsVisible] = useFadeIn(300)

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '8rem 1.5rem', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>

        {/* Headline */}
        <h2
          ref={h2Ref}
          className="font-cormorant"
          style={{
            fontSize: 'clamp(2.25rem, 5vw, 4rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            color: '#F7F3ED',
            lineHeight: 1.2,
            marginBottom: '1.5rem',
            opacity: h2Visible ? 1 : 0,
            transform: h2Visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          "What would you do with 12 hours back every week?"
        </h2>

        {/* Sub-copy */}
        <p
          ref={subRef}
          className="font-dm"
          style={{
            fontSize: '1rem',
            fontWeight: 300,
            color: 'rgba(247,243,237,0.5)',
            lineHeight: 1.75,
            marginBottom: '2.5rem',
            opacity: subVisible ? 1 : 0,
            transform: subVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          Book a free 30-minute call. We'll show you exactly where your time is going and what an automated version of your business looks like. No obligation. No tech knowledge needed.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: '1.5rem',
            opacity: ctaVisible ? 1 : 0,
            transform: ctaVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <a
            href={CTA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sage-hero"
            style={{ fontSize: '1rem', padding: '0.9rem 2rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            Book Your Free Audit <ArrowRight size={18} />
          </a>
          <a
            href="/audit"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.9rem',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 400,
              color: 'rgba(247,243,237,0.55)',
              border: '1px solid rgba(247,243,237,0.15)',
              borderRadius: '9999px',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
            }}
          >
            Try the Free Calculator <ArrowRight size={14} />
          </a>
        </div>

        {/* Trust chips */}
        <div
          ref={chipsRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            opacity: chipsVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}
        >
          {['No tech knowledge needed', 'Live in 14 days', 'Results in 30 days or we keep going'].map((chip, i) => (
            <span key={chip} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {i > 0 && <span style={{ color: 'rgba(143,175,159,0.2)', fontSize: '0.7rem' }}>·</span>}
              <span
                className="font-mono"
                style={{ fontSize: '0.62rem', letterSpacing: '0.12em', color: 'rgba(247,243,237,0.45)' }}
              >
                {chip}
              </span>
            </span>
          ))}
        </div>

      </div>
    </section>
  )
}
