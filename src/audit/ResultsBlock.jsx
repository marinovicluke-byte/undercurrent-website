import { PILLARS } from './config.js'
import { calcRating, calcGap, calcPillarMonthly } from './calculations.js'

// Must be defined before the component (const is not hoisted)
const RESPONSE_LABEL = {
  lt5: '< 5 min', '5to30': '5–30 min', '30to60': '30–60 min',
  '1to4h': '1–4 hrs', '4to24h': '4–24 hrs', '24plus': '24+ hrs',
}

function fmt(n) {
  return n.toLocaleString('en-AU', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
}

const GAP_STYLES = {
  'Blind spot':       { icon: '⚠', color: '#d48c00' },
  'Accurate':         { icon: '✓', color: '#8FAF9F' },
  'Under-estimated':  { icon: '↑', color: 'rgba(28,28,26,0.45)' },
}

const RATING_DOT = {
  Red:    { bg: 'rgba(220,60,60,0.15)',   color: '#dc3c3c' },
  Orange: { bg: 'rgba(212,140,0,0.12)',   color: '#d48c00' },
  Green:  { bg: 'rgba(143,175,159,0.15)', color: '#8FAF9F' },
}

function RatingBadge({ rating }) {
  if (!rating) return <span style={{ color: 'rgba(28,28,26,0.3)', fontFamily: 'DM Mono, monospace', fontSize: '0.78rem' }}>—</span>
  const s = RATING_DOT[rating]
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '999px',
      backgroundColor: s.bg,
      color: s.color,
      fontFamily: 'DM Mono, monospace',
      fontSize: '0.72rem',
      fontWeight: 600,
    }}>
      {rating}
    </span>
  )
}

export default function ResultsBlock({ pillars, hourlyRate, responseTimeBand, totalMonthly, totalYearly, leadBleedMonthly }) {
  // Sort pillars by monthly loss descending, preserve original order for ties
  const sorted = PILLARS.map((p, originalIndex) => ({
    ...p,
    originalIndex,
    monthly: calcPillarMonthly(pillars[p.key].hours, hourlyRate),
    hours: pillars[p.key].hours,
    selfRating: pillars[p.key].selfRating,
    calcedRating: calcRating(pillars[p.key].hours),
  })).sort((a, b) => b.monthly - a.monthly || a.originalIndex - b.originalIndex)

  const pillarTotal = sorted.reduce((acc, p) => acc + p.monthly, 0)

  return (
    <div>
      {/* Headline figures */}
      <div style={{
        backgroundColor: '#1C1C1A',
        borderRadius: '24px',
        padding: 'clamp(28px, 4vw, 48px)',
        marginBottom: '24px',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center',
      }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(143,175,159,0.7)',
          margin: '0 0 12px',
        }}>
          You're leaving an estimated
        </p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(2.8rem, 6vw, 5rem)',
          fontWeight: 600,
          color: '#F7F3ED',
          margin: '0 0 4px',
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}>
          ${fmt(totalMonthly)}<span style={{ fontSize: '0.45em', opacity: 0.6, fontWeight: 400 }}>/month</span>
        </p>
        <p style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          color: 'rgba(143,175,159,0.85)',
          margin: '0',
          letterSpacing: '-0.01em',
        }}>
          ${fmt(totalYearly)} / year
        </p>
        <p style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: 'rgba(232,224,208,0.5)', margin: '12px 0 0' }}>
          on the table
        </p>
      </div>

      {/* Gap analysis table */}
      <div style={{
        backgroundColor: '#FDFAF6',
        border: '1px solid rgba(212,201,176,0.7)',
        borderRadius: '20px',
        padding: 'clamp(20px, 3vw, 32px)',
        marginBottom: '16px',
      }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8FAF9F',
          margin: '0 0 16px',
        }}>
          Health Assessment
        </p>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Area', 'Self-rated', 'Calculated', 'Status'].map(h => (
                  <th key={h} style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '0.65rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(28,28,26,0.4)',
                    textAlign: 'left',
                    padding: '0 12px 10px 0',
                    borderBottom: '1px solid rgba(212,201,176,0.4)',
                    whiteSpace: 'nowrap',
                  }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sorted.map(p => {
                const gap = calcGap(p.selfRating, p.calcedRating, p.hours)
                const gapStyle = gap ? GAP_STYLES[gap] : null
                return (
                  <tr key={p.key}>
                    <td style={{ padding: '10px 12px 10px 0', fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: '#1C1C1A', borderBottom: '1px solid rgba(212,201,176,0.25)' }}>
                      {p.label}
                    </td>
                    <td style={{ padding: '10px 12px 10px 0', borderBottom: '1px solid rgba(212,201,176,0.25)' }}>
                      <RatingBadge rating={p.selfRating} />
                    </td>
                    <td style={{ padding: '10px 12px 10px 0', borderBottom: '1px solid rgba(212,201,176,0.25)' }}>
                      <RatingBadge rating={p.hours > 0 ? p.calcedRating : null} />
                    </td>
                    <td style={{ padding: '10px 0 10px 0', borderBottom: '1px solid rgba(212,201,176,0.25)', fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: gapStyle?.color ?? 'rgba(28,28,26,0.3)' }}>
                      {gapStyle ? `${gapStyle.icon} ${gap}` : '—'}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead bleed row (hidden when === 0) */}
      {leadBleedMonthly > 0 && (
        <div style={{
          backgroundColor: 'rgba(220,60,60,0.06)',
          border: '1px solid rgba(220,60,60,0.25)',
          borderRadius: '16px',
          padding: '16px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ fontSize: '1.1rem' }}>⚡</span>
          <div>
            <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.84rem', color: '#1C1C1A' }}>
              Lead bleed:{' '}
              <strong style={{ color: '#dc3c3c' }}>${fmt(leadBleedMonthly)}/mo</strong>
              {' '}— responding in{' '}
              <strong>{responseTimeBand ? RESPONSE_LABEL[responseTimeBand] : '—'}</strong>
            </span>
          </div>
        </div>
      )}

      {/* Per-pillar cost breakdown */}
      <div style={{ marginTop: '24px' }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(28,28,26,0.4)',
          margin: '0 0 12px',
        }}>
          Cost breakdown — time lost per area
        </p>
        {sorted.filter(p => p.monthly > 0).map(p => (
          <div key={p.key} style={{ marginBottom: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.82rem', color: '#1C1C1A', opacity: 0.75 }}>{p.label}</span>
              <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#6B7C4A' }}>
                ${fmt(p.monthly)}/mo
              </span>
        </div>
            <div style={{ height: '4px', backgroundColor: 'rgba(143,175,159,0.15)', borderRadius: '2px', overflow: 'hidden' }}>
              <div style={{
                width: `${Math.min((p.monthly / (pillarTotal || 1)) * 100, 100)}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #8FAF9F, #6B7C4A)',
                borderRadius: '2px',
                transition: 'width 0.5s cubic-bezier(0.16,1,0.3,1)',
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
