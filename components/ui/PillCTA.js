'use client'
import { useState } from 'react'
import Link from 'next/link'

// v2: hard offset accent pop-shadow replaces glassmorphism.
// Same API — tone, large, compact, onClick, href, external.
export default function PillCTA({
  label = "Let's talk",
  href = '#',
  onClick,
  tone = 'blue',
  large = false,
  compact = false,
  external = false,
}) {
  const [hover, setHover] = useState(false)

  const padY = compact ? 8 : large ? 16 : 12
  const padX = compact ? 18 : large ? 30 : 22
  const fontSize = compact ? 13 : large ? 17 : 15

  const accent =
    tone === 'sage' ? 'var(--sage)' :
    tone === 'orange' ? 'var(--orange)' :
    'var(--blue)'

  const restShadow = compact ? '3px 3px 0 0' : '4px 4px 0 0'
  const hoverShadow = compact ? '5px 5px 0 0' : '7px 7px 0 0'

  const arrowSize = compact ? 14 : large ? 20 : 17
  const stroke = compact ? 1.5 : 1.75

  const style = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: compact ? 10 : large ? 14 : 12,
    padding: `${padY}px ${padX}px`,
    borderRadius: 999,
    background: 'var(--off-white)',
    color: 'var(--charcoal-deep)',
    border: '1px solid var(--charcoal-deep)',
    boxShadow: `${hover ? hoverShadow : restShadow} ${accent}`,
    fontFamily: 'var(--font-display)',
    fontWeight: 600,
    fontSize,
    letterSpacing: '-0.01em',
    cursor: 'pointer',
    transform: hover ? 'translate(-3px, -3px)' : 'translate(0, 0)',
    transition: 'transform 140ms cubic-bezier(.2,.7,.3,1), box-shadow 140ms cubic-bezier(.2,.7,.3,1)',
    whiteSpace: 'nowrap',
    lineHeight: 1.2,
    textDecoration: 'none',
  }

  const content = (
    <>
      <span>{label}</span>
      <svg
        width={arrowSize}
        height={arrowSize}
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
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  )

  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  }

  if (onClick) {
    return (
      <button type="button" onClick={onClick} style={style} {...handlers}>
        {content}
      </button>
    )
  }

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} {...handlers}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} style={style} {...handlers}>
      {content}
    </Link>
  )
}
