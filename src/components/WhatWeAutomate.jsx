import { useEffect, useRef, useState } from 'react'

// ─── Scroll visibility hook ────────────────────────────────────────────────────
function useVisible(threshold = 0.12) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// ─── Column Header (sits above each card) ─────────────────────────────────────
function ColumnHeader({ label, stat, statSub, accent, visible, delay = 0 }) {
  return (
    <div style={{
      marginBottom: '1.5rem',
      textAlign: 'center',
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
    }}>
      {/* Big heading — dominant */}
      <h3 className="font-dm" style={{
        fontSize: 'clamp(2.6rem, 4.5vw, 3.5rem)',
        fontWeight: 800,
        letterSpacing: '-0.03em',
        color: accent,
        margin: '0 0 0.35rem',
        lineHeight: 1,
      }}>
        {label}
      </h3>

      {/* Stat — secondary, smaller */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem', justifyContent: 'center' }}>
        <span className="font-dm" style={{
          fontSize: 'clamp(1.2rem, 2vw, 1.5rem)',
          fontWeight: 600,
          color: accent,
          lineHeight: 1,
          letterSpacing: '-0.01em',
          opacity: 0.75,
        }}>
          {stat}
        </span>
        <span className="font-mono" style={{
          fontSize: '0.6rem',
          letterSpacing: '0.14em',
          color: `${accent}55`,
          textTransform: 'uppercase',
        }}>
          {statSub}
        </span>
      </div>
    </div>
  )
}

// ─── Before Panel ─────────────────────────────────────────────────────────────
function BeforePanel({ visible }) {
  const items = [
    { label: 'Sarah — new enquiry',    meta: '2h ago',    dot: '#D97757' },
    { label: 'Invoice #214 overdue',   meta: '14 days',   dot: '#D97757' },
    { label: 'Tom — follow-up needed', meta: 'yesterday', dot: '#C4A97A' },
    { label: 'Google review request',  meta: '3 days',    dot: '#D97757' },
    { label: '47 unread emails',       meta: 'today',     dot: '#D97757' },
  ]

  return (
    <div>
      <ColumnHeader
        label="Currently"
        stat="12 hrs"
        statSub="lost every week"
        accent="#D97757"
        visible={visible}
        delay={0.1}
      />

      <div style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(217,119,87,0.18)',
        borderRadius: '1.5rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(-20px)',
        transition: 'opacity 0.55s ease 0.2s, transform 0.55s ease 0.2s',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1.5rem',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(217,119,87,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Panel label */}
        <p className="font-mono" style={{
          fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(247,243,237,0.52)',
          textTransform: 'uppercase', margin: '0 0 1.25rem',
        }}>
          Your week — right now
        </p>

        {/* Task list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {items.map((item, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: '0.75rem',
                padding: '0.65rem 0.85rem',
                background: 'rgba(217,119,87,0.06)',
                border: '1px solid rgba(217,119,87,0.12)',
                borderRadius: '0.65rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(-10px)',
                transition: `opacity 0.4s ease ${0.3 + i * 0.07}s, transform 0.4s ease ${0.3 + i * 0.07}s`,
              }}
            >
              <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: item.dot, flexShrink: 0 }} />
              <span className="font-dm" style={{
                fontSize: '0.9rem', color: 'rgba(247,243,237,0.82)',
                flexGrow: 1, lineHeight: 1.3, fontWeight: 400,
              }}>
                {item.label}
              </span>
              <span className="font-mono" style={{
                fontSize: '0.56rem', letterSpacing: '0.09em',
                color: 'rgba(247,243,237,0.58)', flexShrink: 0,
              }}>
                {item.meta}
              </span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '1.25rem', paddingTop: '1rem',
          borderTop: '1px solid rgba(247,243,237,0.07)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.75s',
        }}>
          <p className="font-dm" style={{
            fontSize: '0.82rem', color: 'rgba(247,243,237,0.62)',
            margin: 0, lineHeight: 1.55, fontStyle: 'italic',
          }}>
            All of this requires your attention. Again.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Connector ────────────────────────────────────────────────────────────────
function Connector({ isMobile, visible }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: isMobile ? 'row' : 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      padding: isMobile ? '2rem 0' : '0 2.5rem',
    }}>
      <svg
        width={isMobile ? 40 : 1} height={isMobile ? 1 : 36}
        viewBox={isMobile ? '0 0 40 1' : '0 0 1 36'}
        style={{ overflow: 'visible', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.5s' }}
      >
        {isMobile
          ? <line x1="0" y1="0.5" x2="40" y2="0.5" stroke="rgba(143,175,159,0.3)" strokeWidth="1" strokeDasharray="3 4" />
          : <line x1="0.5" y1="0" x2="0.5" y2="36" stroke="rgba(143,175,159,0.3)" strokeWidth="1" strokeDasharray="3 4" />
        }
      </svg>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: '0.6rem', textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'scale(1)' : 'scale(0.85)',
        transition: 'opacity 0.55s ease 0.5s, transform 0.55s ease 0.5s',
      }}>
        <div style={{
          width: '52px', height: '52px', borderRadius: '50%',
          background: 'rgba(143,175,159,0.1)',
          border: '1px solid rgba(143,175,159,0.32)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 0 28px rgba(143,175,159,0.14)',
        }}>
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none">
            <path d="M1 7 C4.5 2, 8 12, 11 7 C14 2, 17.5 12, 21 7" stroke="#8FAF9F" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <div>
          <p className="font-mono" style={{ fontSize: '0.54rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.85)', margin: '0 0 0.2rem', textTransform: 'uppercase' }}>
            UnderCurrent
          </p>
          <p className="font-mono" style={{ fontSize: '0.52rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.52)', margin: 0 }}>
            14 days
          </p>
        </div>
      </div>

      <svg
        width={isMobile ? 52 : 1} height={isMobile ? 14 : 52}
        viewBox={isMobile ? '0 0 52 14' : '0 0 14 52'}
        style={{ overflow: 'visible', opacity: visible ? 1 : 0, transition: 'opacity 0.5s ease 0.6s' }}
      >
        {isMobile ? (
          <>
            <line x1="0" y1="4" x2="40" y2="4" stroke="rgba(143,175,159,0.3)" strokeWidth="1" strokeDasharray="3 4" />
            <polyline points="36,0 44,4 36,8" stroke="rgba(143,175,159,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        ) : (
          <>
            <line x1="4" y1="0" x2="4" y2="40" stroke="rgba(143,175,159,0.3)" strokeWidth="1" strokeDasharray="3 4" />
            <polyline points="0,36 4,44 8,36" stroke="rgba(143,175,159,0.65)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </>
        )}
      </svg>
    </div>
  )
}

// ─── After Panel ──────────────────────────────────────────────────────────────
function AfterPanel({ visible }) {
  const outcomes = [
    { stat: '12',    unit: 'hrs/week', label: 'Back, every week',       color: '#8FAF9F', desc: 'Follow-ups, reminders, and inbox — handled automatically.' },
    { stat: '+40%',  unit: '',         label: 'More leads converted',    color: '#C4A97A', desc: 'Every enquiry gets a personal reply — even at 11pm.' },
    { stat: '$800+', unit: '/wk',      label: 'Saved in admin costs',    color: '#89ACBE', desc: 'Invoices chased, receipts logged — without lifting a finger.' },
  ]

  return (
    <div>
      <ColumnHeader
        label="Automated"
        stat="$800+"
        statSub="saved every week"
        accent="#8FAF9F"
        visible={visible}
        delay={0.15}
      />

      <div style={{
        background: 'rgba(143,175,159,0.04)',
        border: '1px solid rgba(143,175,159,0.18)',
        borderRadius: '1.5rem',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        transition: 'opacity 0.55s ease 0.25s, transform 0.55s ease 0.25s',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '1.5rem',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(143,175,159,0.08) 0%, transparent 65%)',
          pointerEvents: 'none',
        }} />

        {/* Panel label */}
        <p className="font-mono" style={{
          fontSize: '0.6rem', letterSpacing: '0.18em', color: 'rgba(143,175,159,0.6)',
          textTransform: 'uppercase', margin: '0 0 1.25rem',
        }}>
          Your week — from now on
        </p>

        {/* Outcome rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {outcomes.map((o, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'flex-start', gap: '1rem',
                padding: '0.9rem 1rem',
                background: `${o.color}09`,
                border: `1px solid ${o.color}22`,
                borderRadius: '0.75rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateX(0)' : 'translateX(10px)',
                transition: `opacity 0.4s ease ${0.35 + i * 0.1}s, transform 0.4s ease ${0.35 + i * 0.1}s`,
              }}
            >
              <div style={{ flexShrink: 0, textAlign: 'right', minWidth: '56px' }}>
                <p className="font-dm" style={{ fontSize: '1.9rem', fontWeight: 800, color: o.color, lineHeight: 1, margin: 0, letterSpacing: '-0.02em' }}>
                  {o.stat}
                </p>
                {o.unit && (
                  <p className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: `${o.color}90`, margin: 0 }}>
                    {o.unit}
                  </p>
                )}
              </div>
              <div style={{ borderLeft: `1px solid ${o.color}25`, paddingLeft: '0.9rem' }}>
                <p className="font-mono" style={{ fontSize: '0.58rem', letterSpacing: '0.1em', color: o.color, margin: '0 0 0.3rem', textTransform: 'uppercase' }}>
                  {o.label}
                </p>
                <p className="font-dm" style={{ fontSize: '0.86rem', color: 'rgba(247,243,237,0.72)', lineHeight: 1.5, margin: 0, fontWeight: 300 }}>
                  {o.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{
          marginTop: '1.25rem', paddingTop: '1rem',
          borderTop: '1px solid rgba(143,175,159,0.1)',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.5s ease 0.8s',
        }}>
          <p className="font-dm" style={{ fontSize: '0.82rem', color: 'rgba(143,175,159,0.6)', margin: 0, lineHeight: 1.55, fontStyle: 'italic' }}>
            Working while you sleep. Every day. Without fail.
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────
export default function WhatWeAutomate() {
  const [headRef, headVisible] = useVisible(0.15)
  const [journeyRef, journeyVisible] = useVisible(0.08)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 860)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <section style={{ background: 'linear-gradient(160deg, #1C1C1A 0%, #1e2820 45%, #192217 80%, #1a1c1a 100%)', padding: '7rem 1.5rem 9rem', overflow: 'hidden', position: 'relative' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Headline */}
        <div
          ref={headRef}
          style={{
            textAlign: 'center',
            marginBottom: '4.5rem',
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <p className="font-mono" style={{ fontSize: '0.68rem', letterSpacing: '0.2em', color: 'rgba(232,224,208,0.70)', marginBottom: '1rem', fontWeight: 500 }}>
            WHAT CHANGES
          </p>
          <h2 className="font-cormorant" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.15 }}>
            Here's what your business looks like<br />when it runs itself.
          </h2>
        </div>

        {/* Journey */}
        <div
          ref={journeyRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1fr auto 1fr',
            alignItems: 'center',
          }}
        >
          <BeforePanel visible={journeyVisible} />
          <Connector isMobile={isMobile} visible={journeyVisible} />
          <AfterPanel visible={journeyVisible} />
        </div>

        {/* Quote */}
        <p
          className="font-cormorant"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(1.05rem, 1.8vw, 1.4rem)',
            fontWeight: 400, fontStyle: 'italic',
            color: 'rgba(247,243,237,0.72)',
            marginTop: '4rem',
            letterSpacing: '-0.01em',
            opacity: journeyVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.9s',
          }}
        >
          "We do the repetitive work so you can focus on the work only you can do."
        </p>

      </div>

      {/* Wave into Protocol — overlays the gradient so no flat-colour seam */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0, zIndex: 2 }}
      >
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ width: '100%', height: '80px', display: 'block' }}>
          <path d="M0,40 C200,8 440,68 720,36 C960,10 1200,64 1440,30 L1440,80 L0,80 Z" fill="#F7F3ED" />
        </svg>
      </div>
    </section>
  )
}
