export default function ProofStrip() {
  const STATS = [
    { stat: '12 hrs', label: 'Saved every week', color: '#D4C9B0' },
    { stat: '+40%', label: 'More leads converted', color: '#8FAF9F' },
    { stat: '+31%', label: 'More 5-star reviews', color: '#C4A97A' },
    { stat: '$800+', label: 'Saved per week in admin costs', color: '#89ACBE' },
  ]

  return (
    <section
      style={{
        backgroundColor: '#1C1C1A',
        borderTop: '1px solid rgba(143,175,159,0.08)',
        borderBottom: '1px solid rgba(143,175,159,0.08)',
        padding: '3rem 1.5rem',
      }}
    >
      <style>{`
        @media (max-width: 600px) {
          .proof-strip-grid { grid-template-columns: 1fr 1fr !important; gap: 1.25rem !important; }
        }
      `}</style>
      <div
        className="proof-strip-grid"
        style={{
          maxWidth: '860px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem',
          textAlign: 'center',
        }}
      >
        {STATS.map((item) => (
          <div key={item.label} style={{ padding: '0.5rem' }}>
            <p
              className="font-cormorant"
              style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: item.color,
                margin: '0 0 0.35rem',
                lineHeight: 1,
              }}
            >
              {item.stat}
            </p>
            <p
              className="font-mono"
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.1em',
                color: 'rgba(212,201,176,0.45)',
                margin: 0,
              }}
            >
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
