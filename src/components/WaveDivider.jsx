// Gentle curved wave divider between sections
// from = outgoing section bg color, to = incoming section bg color
export default function WaveDivider({ from, to, height = 72, flip = false }) {
  // Two gentle flowing crests — water-current feel that matches the brand
  const wave = flip
    ? 'M0,32 C280,72 560,8 840,48 C1040,72 1240,12 1440,40 L1440,72 L0,72 Z'
    : 'M0,40 C200,8 440,68 720,36 C960,10 1200,64 1440,30 L1440,72 L0,72 Z'

  return (
    <div
      aria-hidden="true"
      style={{
        display: 'block',
        lineHeight: 0,
        overflow: 'hidden',
        background: from,
        marginBottom: '-1px', // prevent hairline gaps at subpixel boundaries
      }}
    >
      <svg
        viewBox={`0 0 1440 72`}
        preserveAspectRatio="none"
        style={{ width: '100%', height: `${height}px`, display: 'block' }}
      >
        <path d={wave} fill={to} />
      </svg>
    </div>
  )
}
