import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { calcRating } from './calculations.js'

const HEALTH_COLORS = {
  Red:    { bg: 'rgba(220,60,60,0.12)',  border: 'rgba(220,60,60,0.5)',  text: '#dc3c3c' },
  Orange: { bg: 'rgba(212,140,0,0.12)',  border: 'rgba(212,140,0,0.5)',  text: '#d48c00' },
  Green:  { bg: 'rgba(143,175,159,0.15)', border: 'rgba(143,175,159,0.6)', text: '#8FAF9F' },
}

function HealthPill({ rating, selected, onClick }) {
  const c = HEALTH_COLORS[rating]
  return (
    <button
      onClick={() => onClick(rating)}
      style={{
        padding: '4px 14px',
        borderRadius: '999px',
        border: `1.5px solid ${selected ? c.border : 'rgba(212,201,176,0.45)'}`,
        backgroundColor: selected ? c.bg : 'transparent',
        color: selected ? c.text : 'rgba(28,28,26,0.45)',
        fontFamily: 'DM Mono, monospace',
        fontSize: '0.72rem',
        letterSpacing: '0.06em',
        cursor: 'pointer',
        transition: 'all 0.2s',
        fontWeight: selected ? 600 : 400,
      }}
    >
      {rating}
    </button>
  )
}

function AuditSlider({ label, value, max, onChange, showValue = true }) {
  return (
    <div style={{ marginBottom: '4px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
        <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.83rem', color: '#1C1C1A', opacity: 0.8 }}>
          {label}
        </span>
        {showValue && (
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.75rem', color: '#8FAF9F', minWidth: '52px', textAlign: 'right' }}>
            {value} hr{value !== 1 ? 's' : ''}
          </span>
        )}
      </div>
      <input
        type="range"
        min={0}
        max={max}
        step={0.5}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="roi-slider"
      />
    </div>
  )
}

export default function PillarCard({ pillar, state, onChange }) {
  const [expanded, setExpanded] = useState(false)
  const { hours, selfRating, subtasks } = state
  const calcedRating = calcRating(hours)

  const handleHours = (val) => onChange({ ...state, hours: val })
  const handleRating = (rating) => onChange({ ...state, selfRating: rating === selfRating ? null : rating })
  const handleSubtask = (key, val) => onChange({ ...state, subtasks: { ...subtasks, [key]: val } })

  return (
    <div style={{
      backgroundColor: '#FDFAF6',
      border: '1px solid rgba(212,201,176,0.7)',
      borderRadius: '20px',
      padding: 'clamp(20px, 3vw, 28px)',
      boxShadow: '0 2px 16px rgba(28,28,26,0.06)',
      transition: 'box-shadow 0.3s',
    }}>
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <p style={{
          fontFamily: 'DM Mono, monospace',
          fontSize: '0.68rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: '#8FAF9F',
          margin: '0 0 10px',
        }}>
          {pillar.label}
        </p>

        {/* Health pills */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {['Red', 'Orange', 'Green'].map(r => (
            <HealthPill key={r} rating={r} selected={selfRating === r} onClick={handleRating} />
          ))}
        </div>
      </div>

      {/* Main hours slider */}
      <div style={{ paddingBottom: '8px', borderBottom: expanded ? '1px solid rgba(212,201,176,0.35)' : 'none', marginBottom: expanded ? '16px' : '0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
          <span style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '0.88rem', color: '#1C1C1A', fontWeight: 500 }}>
            Hours/week on this area
          </span>
          <span style={{ fontFamily: 'DM Mono, monospace', fontSize: '0.78rem', color: '#8FAF9F' }}>
            {hours} hr{hours !== 1 ? 's' : ''}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={40}
          step={0.5}
          value={hours}
          onChange={e => handleHours(Number(e.target.value))}
          className="roi-slider"
        />
      </div>

      {/* Sub-tasks (expanded) */}
      {expanded && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          {pillar.subtasks.map(st => (
            <AuditSlider
              key={st.key}
              label={st.label}
              value={subtasks[st.key]}
              max={20}
              onChange={val => handleSubtask(st.key, val)}
            />
          ))}
        </div>
      )}

      {/* Expand / collapse trigger */}
      <button
        onClick={() => setExpanded(v => !v)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'none',
          border: 'none',
          padding: 0,
          cursor: 'pointer',
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.80rem',
          color: 'rgba(28,28,26,0.5)',
          transition: 'color 0.2s',
          marginTop: expanded ? '0' : '8px',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#8FAF9F'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(28,28,26,0.5)'}
      >
        {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        {expanded ? 'Collapse' : 'Break it down'}
      </button>
    </div>
  )
}
