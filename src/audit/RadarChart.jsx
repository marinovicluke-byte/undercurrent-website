const LABELS = ['Customer Experience', 'Sales', 'Content & Design', 'Personal Systems', 'Finance']
const KEYS = ['customer_experience', 'sales', 'content_design', 'personal_systems', 'finance']
const MAX_HOURS = 20

export default function RadarChart({ pillars, size = 300 }) {
  const cx = size / 2
  const cy = size / 2
  const radius = size * 0.36
  const levels = 4
  const angleStep = (2 * Math.PI) / 5

  function point(index, fraction) {
    const angle = angleStep * index - Math.PI / 2
    return [
      cx + radius * fraction * Math.cos(angle),
      cy + radius * fraction * Math.sin(angle),
    ]
  }

  const values = KEYS.map(key => {
    const hours = pillars?.[key]?.hours_per_week || 0
    return Math.min(hours / MAX_HOURS, 1)
  })

  const gridPaths = Array.from({ length: levels }, (_, level) => {
    const frac = (level + 1) / levels
    const pts = Array.from({ length: 5 }, (_, i) => point(i, frac))
    return pts.map(p => p.join(',')).join(' ')
  })

  const dataPoints = values.map((v, i) => point(i, Math.max(v, 0.04)))
  const dataPath = dataPoints.map(p => p.join(',')).join(' ')

  const labelPoints = Array.from({ length: 5 }, (_, i) => point(i, 1.22))

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block', margin: '0 auto' }}>
      {gridPaths.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="1"
        />
      ))}

      {Array.from({ length: 5 }, (_, i) => {
        const [x, y] = point(i, 1)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
      })}

      <polygon
        points={dataPath}
        fill="rgba(143,175,159,0.15)"
        stroke="#8FAF9F"
        strokeWidth="1.5"
      />

      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3} fill="#8FAF9F" />
      ))}

      {labelPoints.map(([x, y], i) => (
        <text
          key={i}
          x={x}
          y={y}
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(247,243,237,0.5)"
          fontSize="9"
          fontFamily="DM Mono, monospace"
          letterSpacing="0.04em"
        >
          {LABELS[i]}
        </text>
      ))}
    </svg>
  )
}
