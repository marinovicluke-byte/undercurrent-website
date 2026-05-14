'use client'
import { useState } from 'react'

const CAL_URL = 'https://cal.com/luke-marinovic-aqeosc/30min'

export default function HeroCta({ label = 'Get a free AI search audit', href = CAL_URL }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ marginTop: 28 }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '10px 22px',
          borderRadius: 8,
          background: 'var(--off-white)',
          color: 'var(--charcoal-deep)',
          border: '1px solid var(--charcoal-deep)',
          boxShadow: hover ? '5px 5px 0 0 var(--blue)' : '3px 3px 0 0 var(--blue)',
          fontFamily: 'var(--font-display)',
          fontWeight: 600,
          fontSize: 14,
          letterSpacing: '-0.01em',
          textDecoration: 'none',
          transform: hover ? 'translate(-2px, -2px)' : 'translate(0, 0)',
          transition: 'transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1)',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {label}
        <svg
          width={14}
          height={14}
          viewBox="0 0 24 24"
          fill="none"
          style={{
            transform: hover ? 'translateX(3px)' : 'translateX(0)',
            transition: 'transform 200ms ease',
            flexShrink: 0,
          }}
        >
          <path
            d="M4 12 L20 12 M14 6 L20 12 L14 18"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  )
}
