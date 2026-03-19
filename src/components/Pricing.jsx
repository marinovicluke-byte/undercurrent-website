import { useEffect, useRef, useState } from 'react'
import { Shield, ArrowRight } from 'lucide-react'

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

export default function Pricing() {
  const [sectionRef, sectionVisible] = useFadeIn(0)
  const [lineRef, lineVisible] = useFadeIn(200)
  const [s1Ref, s1Visible] = useFadeIn(300)
  const [s2Ref, s2Visible] = useFadeIn(450)
  const [s3Ref, s3Visible] = useFadeIn(600)
  const [shimmered, setShimmered] = useState(false)

  // Shimmer fires once when CTA section enters view
  const ctaRef = useRef(null)
  useEffect(() => {
    const el = ctaRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !shimmered) {
          setShimmered(true)
          obs.disconnect()
        }
      },
      { threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [shimmered])

  const STATEMENTS = [
    'Priced on the value it creates — not an hourly rate.',
    'Done for you, inside the tools you already use.',
    'Results in 30 days. Or we keep going — no charge.',
  ]

  return (
    <section style={{ backgroundColor: '#1C1C1A', padding: '7rem 1.5rem' }}>
      <style>{`
        @keyframes guarantee-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,175,159,0); }
          50% { box-shadow: 0 0 0 8px rgba(143,175,159,0.08); }
        }
        @keyframes btn-shimmer {
          0% { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(300%) skewX(-15deg); }
        }
        .offer-btn-primary {
          position: relative;
          overflow: hidden;
        }
        .offer-btn-primary::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
          width: 40%;
          transform: translateX(-100%) skewX(-15deg);
        }
        .offer-btn-primary.shimmer::after {
          animation: btn-shimmer 0.6s ease forwards;
        }
      `}</style>

      <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>

        {/* Eyebrow */}
        <div
          ref={sectionRef}
          style={{
            opacity: sectionVisible ? 1 : 0,
            transform: sectionVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.9)', marginBottom: '1rem', fontWeight: 500 }}>
            THE OFFER
          </p>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15, marginBottom: '1rem' }}>
            You only pay based on what it saves you.
          </h2>
          <p className="font-dm" style={{ fontSize: '1rem', fontWeight: 300, color: 'rgba(247,243,237,0.5)', lineHeight: 1.7, marginBottom: '3rem' }}>
            We price on the value we create — not an hourly rate. If your business saves $20,000 a year, you keep most of it. We take a small share. Most clients see their full investment back within six months.
          </p>
        </div>

        {/* Drawing divider */}
        <div
          ref={lineRef}
          style={{
            height: '1px',
            background: 'rgba(143,175,159,0.2)',
            marginBottom: '2.5rem',
            transform: lineVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 0.6s ease-in-out',
          }}
        />

        {/* Cormorant italic statements — three individual refs, no hooks in loops */}
        <div style={{ marginBottom: '2.5rem' }}>
          {[
            { ref: s1Ref, visible: s1Visible, text: STATEMENTS[0], last: false },
            { ref: s2Ref, visible: s2Visible, text: STATEMENTS[1], last: false },
            { ref: s3Ref, visible: s3Visible, text: STATEMENTS[2], last: true },
          ].map(({ ref, visible, text, last }) => (
            <p
              key={text}
              ref={ref}
              className="font-cormorant"
              style={{
                fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                color: last ? '#8FAF9F' : 'rgba(247,243,237,0.7)',
                margin: last ? 0 : '0 0 0.5rem',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: 'opacity 0.5s ease, transform 0.5s ease',
              }}
            >
              {text}
            </p>
          ))}
        </div>

        {/* Guarantee card */}
        <div
          style={{
            backgroundColor: 'rgba(143,175,159,0.06)',
            border: '1px solid rgba(143,175,159,0.25)',
            borderRadius: '1rem',
            padding: '1.5rem 2rem',
            marginBottom: '2.5rem',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            textAlign: 'left',
            animation: 'guarantee-pulse 3s ease-in-out infinite',
          }}
        >
          <Shield size={18} color="#8FAF9F" style={{ flexShrink: 0, marginTop: '2px' }} />
          <p className="font-dm" style={{ fontSize: '0.88rem', fontWeight: 300, color: 'rgba(247,243,237,0.6)', margin: 0, lineHeight: 1.7 }}>
            <strong style={{ color: '#F7F3ED', fontWeight: 500 }}>Zero-Risk Guarantee.</strong>{' '}
            If we can't find you at least 5 hours a week to automate in the free audit — the call is free and you keep every insight.
          </p>
        </div>

        {/* Dual CTAs */}
        <div ref={ctaRef} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <a
              href={CTA_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-sage-hero offer-btn-primary${shimmered ? ' shimmer' : ''}`}
              style={{ fontSize: '0.95rem', padding: '0.85rem 1.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Book Your Free Audit <ArrowRight size={16} />
            </a>
            <a
              href="/audit"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.88rem',
                fontFamily: 'DM Sans, sans-serif',
                fontWeight: 400,
                color: 'rgba(247,243,237,0.55)',
                border: '1px solid rgba(247,243,237,0.15)',
                borderRadius: '9999px',
                padding: '0.7rem 1.5rem',
                textDecoration: 'none',
              }}
            >
              Try the Free Calculator <ArrowRight size={14} />
            </a>
          </div>
          <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.2)', margin: 0 }}>
            No obligation · No tech knowledge needed
          </p>
        </div>

      </div>
    </section>
  )
}
