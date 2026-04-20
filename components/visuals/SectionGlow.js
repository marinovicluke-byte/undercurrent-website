// v2: static single radial. Reserved for ClosingCTA only.
// Other sections should NOT import or render this.
const CORNERS = {
  'bottom-right': { big: { right: '-20%', bottom: '-30%' }, origin: '70% 70%' },
  'top-left':     { big: { left: '-20%',  top: '-30%' },    origin: '30% 30%' },
  'top-right':    { big: { right: '-20%', top: '-30%' },    origin: '70% 30%' },
  'bottom-left':  { big: { left: '-20%',  bottom: '-30%' }, origin: '30% 70%' },
  'center':       { big: { left: '20%',   bottom: '-30%' }, origin: '50% 70%' },
}

export default function SectionGlow({ corner = 'bottom-right', tone = 'blue' }) {
  const c = CORNERS[corner] ?? CORNERS['bottom-right']
  const core =
    tone === 'sage' ? 'rgba(168,196,184,0.32)' :
    tone === 'orange' ? 'rgba(232,150,120,0.28)' :
    'rgba(138,174,200,0.32)'
  const halo =
    tone === 'sage' ? 'rgba(143,175,159,0.14)' :
    tone === 'orange' ? 'rgba(224,122,85,0.12)' :
    'rgba(106,141,173,0.16)'

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        ...c.big,
        width: '60%',
        height: '90%',
        pointerEvents: 'none',
        background: `radial-gradient(circle at ${c.origin}, ${core} 0%, ${halo} 32%, transparent 68%)`,
        filter: 'blur(38px)',
        zIndex: 0,
      }}
    />
  )
}
