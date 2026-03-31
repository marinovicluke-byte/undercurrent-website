import Reveal from './Reveal'

const CHARCOAL = '#1C1C1A'
const SAGE     = '#8FAF9F'

const ROW1 = [
  'Trades', 'HVAC', 'Electricians', 'Plumbers', 'Builders',
  'Carpenters', 'Roofing', 'Landscapers', 'Painters', 'Tilers',
]
const ROW2 = [
  'Cleaning Services', 'Medical Aesthetics', 'Dental Clinics', 'Gyms & Fitness',
  'Personal Trainers', 'Physio & Allied Health', 'Property Managers',
  'Bookkeepers', 'Real Estate', 'Mortgage Brokers',
]

function TickerRow({ items, reverse = false, speed = 38 }) {
  const doubled = [...items, ...items]
  return (
    <div style={{
      overflow: 'hidden',
      maskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)',
    }}>
      <div style={{
        display: 'flex',
        gap: 10,
        width: 'max-content',
        animation: `ws-ticker${reverse ? '-r' : ''} ${speed}s linear infinite`,
        willChange: 'transform',
      }}>
        {doubled.map((item, i) => {
          const isSage = i % 3 === 0
          return (
            <span key={i} style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
              fontFamily: 'DM Mono, monospace',
              fontSize: 11.5,
              letterSpacing: '0.07em',
              color: isSage ? 'rgba(143,175,159,0.8)' : 'rgba(232,224,208,0.55)',
              border: `1px solid ${isSage ? 'rgba(143,175,159,0.22)' : 'rgba(212,201,176,0.12)'}`,
              padding: '8px 20px',
              borderRadius: 999,
              background: isSage ? 'rgba(143,175,159,0.06)' : 'rgba(232,224,208,0.02)',
            }}>
              <span style={{
                width: 4, height: 4, borderRadius: '50%', flexShrink: 0,
                background: isSage ? SAGE : 'rgba(212,201,176,0.35)',
              }} />
              {item}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default function WhoWeServeSection() {
  return (
    <section style={{ background: CHARCOAL, padding: '88px 0 96px', overflow: 'hidden', position: 'relative' }}>
      <style>{`
        @keyframes ws-ticker   { from { transform: translateX(0) }    to { transform: translateX(-50%) } }
        @keyframes ws-ticker-r { from { transform: translateX(-50%) } to { transform: translateX(0) }    }
      `}</style>

      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center', padding: '0 24px', marginBottom: 52 }}>
        <Reveal>
          <span style={{
            display: 'inline-block', fontFamily: 'DM Mono, monospace', fontSize: 10,
            letterSpacing: '0.12em', color: 'rgba(143,175,159,0.75)',
            border: '1px solid rgba(143,175,159,0.22)', padding: '5px 14px', borderRadius: 999, marginBottom: 18,
          }}>
            INDUSTRIES WE SERVE
          </span>
          <h2 style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(2rem, 4.5vw, 4.8rem)',
            fontWeight: 700, color: '#F7F3ED',
            lineHeight: 1.05, margin: '0 0 16px', letterSpacing: '-0.03em',
          }}>
            Built for the businesses that keep things running.
          </h2>
          <p style={{
            fontFamily: 'DM Sans, sans-serif', fontSize: 'clamp(0.95rem, 1.4vw, 1.1rem)', fontWeight: 400,
            lineHeight: 1.65, color: 'rgba(232,224,208,0.5)', maxWidth: 520, margin: '0 auto',
          }}>
            From trades to allied health — we automate the admin that slows you down, so you can focus on the work that actually matters.
          </p>
        </Reveal>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <TickerRow items={ROW1} speed={38} />
        <TickerRow items={ROW2} reverse speed={46} />
      </div>
    </section>
  )
}
