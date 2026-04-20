export default function SectionEyebrow({ n, label }) {
  if (!label && !n) return null

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'stretch',
      }}
    >
      {n && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            background: 'var(--off-white)',
            color: 'var(--charcoal-deep)',
            fontFamily: 'var(--font-display)',
            fontWeight: 700,
            fontSize: 14,
            padding: '11px 20px 11px 18px',
            borderRadius: '999px 8px 8px 999px',
            letterSpacing: '-0.01em',
            position: 'relative',
            zIndex: 2,
            whiteSpace: 'nowrap',
          }}
        >
          {n}
        </span>
      )}
      {label && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            marginLeft: n ? -6 : 0,
            background: 'var(--charcoal)',
            color: 'var(--off-white)',
            padding: '11px 22px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 13,
            letterSpacing: '-0.005em',
            border: '1px solid var(--charcoal-light)',
            borderRadius: n ? '8px 999px 999px 8px' : '999px',
            position: 'relative',
            zIndex: 1,
            whiteSpace: 'nowrap',
          }}
        >
          {label}
        </span>
      )}
    </span>
  )
}
