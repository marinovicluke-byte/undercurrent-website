import { useEffect, useRef, useState } from 'react'
import { ArrowRight } from 'lucide-react'

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return isMobile
}

function useVisible(threshold = 0.1) {
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

// ─── Audit report mockup ─────────────────────────────────────────────────────
function AuditMockup({ isMobile }) {
  const GAPS = [
    { area: 'Customer Experience', self: 'Red', calc: 'Orange', status: 'Under-estimated', statusColor: '#C4A97A' },
    { area: 'Sales & Follow-up',   self: 'Orange', calc: 'Orange', status: 'Accurate',        statusColor: 'rgba(247,243,237,0.5)' },
    { area: 'Scheduling & Admin',  self: 'Orange', calc: 'Red',    status: 'Blind spot',      statusColor: '#bf7a7a' },
    { area: 'Finance & Invoicing', self: 'Red',    calc: 'Red',    status: 'Under-estimated', statusColor: '#C4A97A' },
  ]

  const labelColor = (l) => l === 'Red' ? '#bf7a7a' : l === 'Orange' ? '#C4A97A' : '#8FAF9F'

  return (
    <div style={{
      background: '#1A1A18',
      borderRadius: '1.25rem',
      overflow: 'hidden',
      border: '1px solid rgba(255,255,255,0.08)',
      fontFamily: 'DM Sans, sans-serif',
      userSelect: 'none',
      pointerEvents: 'none',
    }}>
      {/* Window chrome */}
      <div style={{ background: '#111110', padding: '0.65rem 1rem', display: 'flex', alignItems: 'center', gap: '0.4rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#bf7a7a', opacity: 0.7 }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#C4A97A', opacity: 0.7 }} />
        <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#8FAF9F', opacity: 0.7 }} />
        <span style={{ marginLeft: '0.5rem', fontSize: '0.65rem', color: 'rgba(247,243,237,0.52)', letterSpacing: '0.06em' }}>BUSINESS AUDIT — undercurrent.com.au/audit</span>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', gap: 0 }}>
        {/* Left: inputs */}
        <div style={{ flex: '1 1 50%', padding: '1.25rem', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.85rem', fontWeight: 600 }}>ABOUT YOUR BUSINESS</p>

          {/* Industry */}
          <div style={{ marginBottom: '0.6rem' }}>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.25rem' }}>INDUSTRY</p>
            <div style={{ background: '#222220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', padding: '0.45rem 0.65rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.72rem', color: '#F7F3ED' }}>Trades & Construction</span>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="rgba(247,243,237,0.4)" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>

          {/* Hourly rate */}
          <div style={{ marginBottom: '0.6rem' }}>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.25rem' }}>YOUR HOURLY RATE</p>
            <div style={{ background: '#222220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', padding: '0.45rem 0.65rem' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8FAF9F' }}>$75</span>
            </div>
          </div>

          {/* Project + Leads */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.25rem' }}>AVG PROJECT VALUE</p>
              <div style={{ background: '#222220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', padding: '0.45rem 0.65rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8FAF9F' }}>$500</span>
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.25rem' }}>LEADS PER MONTH</p>
              <div style={{ background: '#222220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.4rem', padding: '0.45rem 0.65rem' }}>
                <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#8FAF9F' }}>#20</span>
              </div>
            </div>
          </div>

          {/* Lead response chips */}
          <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.4rem' }}>AVG LEAD RESPONSE TIME</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
            {['< 5 min', '5–30 min', '30–60 min', '1–4 hrs', '4–24 hrs'].map((t, i) => (
              <span key={t} style={{
                fontSize: '0.58rem', padding: '0.2rem 0.55rem', borderRadius: '9999px',
                border: `1px solid ${i === 2 ? '#8FAF9F' : 'rgba(255,255,255,0.12)'}`,
                color: i === 2 ? '#8FAF9F' : 'rgba(247,243,237,0.5)',
                background: i === 2 ? 'rgba(143,175,159,0.08)' : 'transparent',
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Right: results */}
        <div style={{ flex: '1 1 50%', padding: '1.25rem', overflow: 'hidden' }}>
          <p style={{ fontSize: '0.55rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.7)', marginBottom: '0.85rem', fontWeight: 600 }}>ESTIMATED LOSS</p>

          {/* Big number */}
          <div style={{ background: '#222220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.65rem', padding: '1rem 1.1rem', marginBottom: '0.6rem' }}>
            <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.60)', margin: '0 0 0.3rem' }}>ESTIMATED MONTHLY LOSS</p>
            <p style={{ fontSize: '2rem', fontWeight: 800, color: '#F7F3ED', margin: '0 0 0.1rem', letterSpacing: '-0.03em', lineHeight: 1 }}>$9,514</p>
            <p style={{ fontSize: '0.65rem', color: 'rgba(247,243,237,0.60)', margin: 0 }}>$114,168 per year</p>
          </div>

          {/* Sub cards */}
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.85rem' }}>
            {[{ label: 'TIME COST', val: '$7,794', sub: 'per month', color: '#C4A97A' }, { label: 'LEAD BLEED', val: '$1,720', sub: 'per month', color: '#bf7a7a' }].map(c => (
              <div key={c.label} style={{ flex: 1, background: '#222220', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '0.5rem', padding: '0.65rem 0.75rem' }}>
                <p style={{ fontSize: '0.45rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.3rem' }}>{c.label}</p>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: c.color, margin: '0 0 0.1rem', letterSpacing: '-0.02em' }}>{c.val}</p>
                <p style={{ fontSize: '0.55rem', color: 'rgba(247,243,237,0.55)', margin: 0 }}>{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Gap table */}
          <p style={{ fontSize: '0.5rem', letterSpacing: '0.1em', color: 'rgba(247,243,237,0.55)', margin: '0 0 0.5rem' }}>GAP ANALYSIS</p>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr auto auto' : '1fr auto auto auto', gap: '0.2rem 0.5rem', alignItems: 'center' }}>
            {(isMobile ? ['AREA', 'SELF', 'CALC'] : ['AREA', 'SELF', 'CALC', 'STATUS']).map(h => (
              <span key={h} style={{ fontSize: '0.45rem', color: 'rgba(247,243,237,0.48)', letterSpacing: '0.08em' }}>{h}</span>
            ))}
            {GAPS.map(row => (
              <>
                <span key={row.area + 'a'} style={{ fontSize: '0.6rem', color: 'rgba(247,243,237,0.75)' }}>{row.area}</span>
                <span key={row.area + 'b'} style={{ fontSize: '0.6rem', color: labelColor(row.self) }}>{row.self}</span>
                <span key={row.area + 'c'} style={{ fontSize: '0.6rem', color: labelColor(row.calc) }}>{row.calc}</span>
                {!isMobile && <span key={row.area + 'd'} style={{ fontSize: '0.6rem', color: row.statusColor }}>{row.status}</span>}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────
export default function CalculatorTeaser() {
  const [ref, visible] = useVisible(0.08)
  const isMobile = useIsMobile()

  return (
    <section style={{
      background: 'linear-gradient(180deg, #1a1816 0%, #161614 100%)',
      padding: '0 1.5rem',
      position: 'relative',
    }}>
      {/* ── Flowing silk background (matches footer) ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', width: '900px', height: '700px', left: '-250px', top: '-100px', background: 'radial-gradient(ellipse, rgba(143,175,159,0.09) 0%, transparent 68%)', filter: 'blur(80px)' }} />
        <div style={{ position: 'absolute', width: '700px', height: '600px', right: '-180px', top: '100px', background: 'radial-gradient(ellipse, rgba(143,175,159,0.07) 0%, transparent 68%)', filter: 'blur(100px)' }} />
        <div style={{ position: 'absolute', width: '600px', height: '400px', left: '25%', bottom: '5%', background: 'radial-gradient(ellipse, rgba(212,201,176,0.06) 0%, transparent 68%)', filter: 'blur(80px)' }} />
        <svg
          width="100%" height="100%"
          viewBox="0 0 1440 1100"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: 'absolute', inset: 0 }}
        >
          <defs>
            <filter id="teaserWisp">
              <feGaussianBlur stdDeviation="18" />
            </filter>
          </defs>
          <g filter="url(#teaserWisp)" opacity="1">
            <path d="M -150 280 C 180 120 520 420 840 220 S 1260 20 1620 280"
              stroke="rgba(143,175,159,0.22)" strokeWidth="90" fill="none" strokeLinecap="round" />
            <path d="M -150 480 C 280 620 680 320 1020 500 S 1420 620 1700 420"
              stroke="rgba(143,175,159,0.14)" strokeWidth="110" fill="none" strokeLinecap="round" />
            <path d="M 80 680 C 380 520 740 740 1080 580 S 1440 480 1750 680"
              stroke="rgba(212,201,176,0.1)" strokeWidth="80" fill="none" strokeLinecap="round" />
            <path d="M -200 160 C 240 380 640 180 960 380 S 1360 580 1760 280"
              stroke="rgba(143,175,159,0.09)" strokeWidth="140" fill="none" strokeLinecap="round" />
            <path d="M 200 900 C 500 760 820 960 1140 820 S 1500 700 1800 900"
              stroke="rgba(212,201,176,0.07)" strokeWidth="100" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      </div>
      <div
        ref={ref}
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          position: 'relative',
          zIndex: 10,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(32px)',
          transition: 'opacity 0.75s ease, transform 0.75s ease',
        }}
      >
        {/* Heading — sits in the dark half */}
        <div style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '2.5rem' }}>
          <p className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#8FAF9F', marginBottom: '0.75rem', fontWeight: 500 }}>
            FREE REPORT
          </p>
          <h2 className="font-dm" style={{
            fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
            fontWeight: 800,
            color: '#F7F3ED',
            lineHeight: 1.2,
            letterSpacing: '-0.025em',
            margin: '0 0 0.65rem',
          }}>
            Still not sure? See exactly what you'd get.
          </h2>
          <p className="font-dm" style={{
            fontSize: 'clamp(0.9rem, 1.5vw, 1rem)',
            fontWeight: 400,
            color: 'rgba(247,243,237,0.65)',
            margin: '0 auto',
            maxWidth: '480px',
            lineHeight: 1.65,
          }}>
            Most consultants charge <span style={{ color: '#C4A97A', fontWeight: 600 }}>$5,000</span> for an automation audit. Ours is completely free — and you get the full report instantly.
          </p>
        </div>

        {/* Floating card — spans the gradient split */}
        <div style={{
          borderRadius: '1.5rem',
          overflow: 'hidden',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.35)',
          transform: isMobile ? 'none' : 'perspective(1200px) rotateX(1.5deg)',
          transformOrigin: 'top center',
        }}>
          <AuditMockup isMobile={isMobile} />
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '2.5rem 0 5rem' }}>
          <a
            href="/audit"
            className="btn-sage-hero"
            style={{ fontSize: '0.95rem', fontWeight: 700, letterSpacing: '-0.01em', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Try the Free Calculator <ArrowRight size={16} />
            </span>
          </a>
          <p className="font-dm" style={{ fontSize: '0.78rem', color: 'rgba(247,243,237,0.45)', margin: '0.75rem 0 0', fontWeight: 400 }}>
            No obligation · Takes 3 minutes · Instant results
          </p>
        </div>
      </div>

      {/* Bottom wave — light section rises into the dark gradient */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          lineHeight: 0,
          zIndex: 3,
        }}
      >
        <svg
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '80px', display: 'block' }}
        >
          <path
            d="M0,40 C200,8 440,68 720,36 C960,10 1200,64 1440,30 L1440,80 L0,80 Z"
            fill="#F7F3ED"
          />
        </svg>
      </div>
    </section>
  )
}
