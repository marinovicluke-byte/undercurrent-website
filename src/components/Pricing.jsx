import { useEffect, useRef, useState } from 'react'
import { Shield, ArrowRight, Check } from 'lucide-react'

const CTA_HREF = 'https://cal.com/luke-marinovic-aqeosc/30min'

function useVisible(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

const BULLETS = [
  { label: 'Built for your business', sub: 'No templates. Every automation is mapped to how you actually work.' },
  { label: 'Custom-built, not off-the-shelf', sub: 'Works inside the tools you already use — no switching, no disruption.' },
  { label: 'Live in 30 days', sub: 'Fast implementation with results you can see quickly.' },
  { label: 'You keep the majority', sub: 'We take a small share of what we save you. You keep the rest.' },
  { label: 'Ongoing support included', sub: 'We stay on to tune, improve, and expand as your business grows.' },
]

export default function Pricing() {
  const [headRef, headVisible] = useVisible(0.15)
  const [cardRef, cardVisible] = useVisible(0.1)

  return (
    <section style={{ background: 'linear-gradient(160deg, #1a1816 0%, #1f1e1b 50%, #1a1816 100%)', padding: '6rem 1.5rem 5rem' }}>
      <style>{`
        @keyframes guarantee-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(143,175,159,0); }
          50% { box-shadow: 0 0 0 10px rgba(143,175,159,0.06); }
        }
        .pricing-card-inner {
          display: flex;
        }
        .pricing-left {
          flex: 1 1 55%;
          padding: 2.5rem;
        }
        .pricing-right {
          flex: 1 1 40%;
          padding: 2.5rem;
          border-left: 1px solid rgba(143,175,159,0.15);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .pricing-guarantee {
          border-top: 1px solid rgba(143,175,159,0.15);
          padding: 1.25rem 2.5rem;
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
          background: rgba(143,175,159,0.04);
          animation: guarantee-pulse 3s ease-in-out infinite;
        }
        @media (max-width: 680px) {
          .pricing-card-inner { flex-direction: column; }
          .pricing-left { padding: 1.75rem 1.5rem; }
          .pricing-right {
            border-left: none;
            border-top: 1px solid rgba(143,175,159,0.15);
            padding: 1.75rem 1.5rem;
          }
          .pricing-guarantee { padding: 1.25rem 1.5rem; }
        }
      `}</style>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Heading */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center',
            marginBottom: '3rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'opacity 0.65s ease, transform 0.65s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.18em', color: '#8FAF9F', marginBottom: '1rem', fontWeight: 500 }}>
            THE OFFER
          </p>
          <h2 className="font-cormorant" style={{
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
            fontWeight: 600,
            color: '#F7F3ED',
            lineHeight: 1.15,
            margin: '0 0 1rem',
            letterSpacing: '-0.02em',
          }}>
            You only pay based on<br />what it saves you.
          </h2>
          <p className="font-dm" style={{
            fontSize: 'clamp(0.95rem, 1.5vw, 1.05rem)',
            fontWeight: 400,
            color: 'rgba(247,243,237,0.65)',
            maxWidth: '540px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}>
            We price on value, not hours. If your business saves $20,000 a year, you keep most of it — we take a small share. Most clients see full ROI within six months.
          </p>
        </div>

        {/* Main pricing card */}
        <div
          ref={cardRef}
          style={{
            background: '#222220',
            border: '1px solid rgba(143,175,159,0.2)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            opacity: cardVisible ? 1 : 0,
            transform: cardVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.65s ease 0.1s, transform 0.65s ease 0.1s',
          }}
        >
          {/* Card body */}
          <div className="pricing-card-inner">
            {/* Left: what's included */}
            <div className="pricing-left">
              <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '1.5rem', fontWeight: 500 }}>
                WHAT'S INCLUDED
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {BULLETS.map((b) => (
                  <div key={b.label} style={{ display: 'flex', gap: '0.85rem', alignItems: 'flex-start' }}>
                    <span style={{
                      width: '20px', height: '20px', borderRadius: '50%',
                      background: 'rgba(143,175,159,0.12)',
                      border: '1.5px solid rgba(143,175,159,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: '1px',
                    }}>
                      <Check size={10} color="#8FAF9F" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="font-dm" style={{ fontSize: '0.92rem', fontWeight: 600, color: '#F7F3ED', margin: '0 0 0.15rem', lineHeight: 1.3 }}>
                        {b.label}
                      </p>
                      <p className="font-dm" style={{ fontSize: '0.8rem', fontWeight: 400, color: 'rgba(247,243,237,0.65)', margin: 0, lineHeight: 1.55 }}>
                        {b.sub}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: pricing model + CTA */}
            <div className="pricing-right">
              <div>
                <p className="font-mono" style={{ fontSize: '0.62rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.7)', marginBottom: '1.5rem', fontWeight: 500 }}>
                  PRICING MODEL
                </p>
                <p className="font-cormorant" style={{
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  fontWeight: 600,
                  fontStyle: 'italic',
                  color: '#F7F3ED',
                  margin: '0 0 0.75rem',
                  lineHeight: 1.2,
                  letterSpacing: '-0.01em',
                }}>
                  Value-based — not an hourly rate.
                </p>
                <p className="font-dm" style={{ fontSize: '0.85rem', fontWeight: 400, color: 'rgba(247,243,237,0.65)', lineHeight: 1.65, margin: '0 0 2rem' }}>
                  Your investment is tied directly to the results we deliver. We only win when you win.
                </p>

                {/* Mini stat chips */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                  {[
                    { val: '30 days', label: 'average time to go live' },
                    { val: '6 months', label: 'average time to full ROI' },
                    { val: '5 hrs/wk', label: 'minimum we guarantee to find' },
                  ].map(({ val, label }) => (
                    <div key={val} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 700, color: '#8FAF9F', minWidth: '80px' }}>{val}</span>
                      <span className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 400, color: 'rgba(247,243,237,0.55)' }}>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <a
                href={CTA_HREF}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.95rem 1.5rem',
                  background: '#8FAF9F',
                  color: '#1C1C1A',
                  borderRadius: '9999px',
                  textDecoration: 'none',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  letterSpacing: '-0.01em',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7fa08f' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#8FAF9F' }}
              >
                Book Your Free Audit <ArrowRight size={16} />
              </a>
            </div>
          </div>

          {/* Guarantee strip */}
          <div className="pricing-guarantee">
            <Shield size={16} color="#8FAF9F" style={{ flexShrink: 0, marginTop: '2px' }} />
            <p className="font-dm" style={{ fontSize: '0.84rem', fontWeight: 400, color: 'rgba(247,243,237,0.8)', margin: 0, lineHeight: 1.65 }}>
              <strong style={{ color: '#F7F3ED', fontWeight: 600 }}>Zero-Risk Guarantee.</strong>{' '}
              If we can't find you at least 5 hours a week to automate in the free audit — the call is free and you keep every insight.
            </p>
          </div>
        </div>

      </div>
    </section>
  )
}
