const INTEGRATIONS = [
  'ChatGPT', 'Claude', 'n8n', 'Gmail', 'Slack', 'Notion',
  'LinkedIn', 'Instagram', 'WhatsApp', 'HubSpot', 'Stripe', 'Zapier',
]

export default function Marquee() {
  const loop = [...INTEGRATIONS, ...INTEGRATIONS, ...INTEGRATIONS]

  return (
    <div
      className="uc-marquee-wrap"
      style={{
        borderTop: '1px solid var(--text-faint)',
        borderBottom: '1px solid var(--text-faint)',
        background: 'var(--charcoal)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Label — aligned with page content edge */}
      <div
        className="uc-marquee-label"
        style={{
          flexShrink: 0,
          paddingTop: 30,
          paddingBottom: 30,
          paddingLeft: 'var(--page-pad)',
          paddingRight: 28,
        }}
      >
        <span className="label" style={{ fontSize: 13, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          We build with:
        </span>
      </div>

      {/* Scroll window with mask fades */}
      <div
        style={{
          flex: 1,
          overflow: 'hidden',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 82%, transparent 100%)',
          maskImage: 'linear-gradient(90deg, transparent 0%, black 10%, black 82%, transparent 100%)',
        }}
      >
        <div
          className="uc-marquee-row"
          style={{
            display: 'flex',
            gap: 48,
            alignItems: 'center',
            whiteSpace: 'nowrap',
            animation: 'marquee-scroll 55s linear infinite',
            width: 'max-content',
            padding: '30px 0',
          }}
        >
          {loop.map((name, i) => (
            <span
              key={i}
              className="uc-marquee-item"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 300,
                fontSize: 20,
                letterSpacing: '-0.01em',
                color: 'var(--text-secondary)',
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
