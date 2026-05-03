'use client'

import { useState } from 'react'
import AboutV1 from '@/components/about/AboutV1'
import AboutV2 from '@/components/about/AboutV2'
import AboutV3 from '@/components/about/AboutV3'
import AboutV4 from '@/components/about/AboutV4'

const CONCEPTS = [
  {
    id: 'v1',
    label: 'V1 — Director\'s Cut',
    sub: 'Editorial · Sage-dominant · Magazine feel',
    accent: '143, 175, 159',
    component: AboutV1,
  },
  {
    id: 'v2',
    label: 'V2 — The Manifesto',
    sub: 'SaaS · Blue-dominant · Numbered statements',
    accent: '106, 141, 173',
    component: AboutV2,
  },
  {
    id: 'v3',
    label: 'V3 — The Human',
    sub: 'Warm · Orange accent · Founder-first',
    accent: '224, 122, 85',
    component: AboutV3,
  },
  {
    id: 'v4',
    label: 'V4 — The Architect',
    sub: 'Swiss-grid · Sage structure · Precise & label-heavy',
    accent: '143, 175, 159',
    component: AboutV4,
  },
]

export default function ConceptSwitcher() {
  const [active, setActive] = useState('v1')
  const current = CONCEPTS.find(c => c.id === active)
  const ActiveComponent = current.component

  return (
    <div style={{ minHeight: '100vh', background: '#121210' }}>
      {/* Sticky nav bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'var(--charcoal-deep)',
          borderBottom: '1px solid rgba(250,249,245,0.08)',
          padding: '0 24px',
        }}
      >
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            height: 56,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: 'rgba(250,249,245,0.35)',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              marginRight: 24,
              whiteSpace: 'nowrap',
            }}
          >
            About · Concepts
          </span>

          <div style={{ display: 'flex', gap: 4, flex: 1 }}>
            {CONCEPTS.map(c => (
              <button
                key={c.id}
                onClick={() => setActive(c.id)}
                style={{
                  padding: '6px 14px',
                  border: 'none',
                  borderRadius: 6,
                  background:
                    active === c.id
                      ? `rgba(${c.accent}, 0.15)`
                      : 'transparent',
                  color:
                    active === c.id
                      ? `rgb(${c.accent})`
                      : 'rgba(250,249,245,0.45)',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  cursor: 'pointer',
                  transition: 'all 150ms ease',
                  outline:
                    active === c.id
                      ? `1px solid rgba(${c.accent}, 0.30)`
                      : '1px solid transparent',
                  whiteSpace: 'nowrap',
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 10,
              color: `rgba(${current.accent}, 0.60)`,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textAlign: 'right',
              maxWidth: 240,
              lineHeight: 1.4,
            }}
          >
            {current.sub}
          </span>
        </div>
      </div>

      {/* Active concept */}
      <ActiveComponent />

      {/* Footer nav */}
      <div
        style={{
          padding: '48px 56px',
          background: '#0A0A09',
          borderTop: '1px solid rgba(250,249,245,0.06)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        {CONCEPTS.map(c => (
          <button
            key={c.id}
            onClick={() => { setActive(c.id); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{
              padding: '10px 20px',
              border: `1px solid ${active === c.id ? `rgba(${c.accent}, 0.40)` : 'rgba(250,249,245,0.08)'}`,
              borderRadius: 8,
              background:
                active === c.id ? `rgba(${c.accent}, 0.10)` : 'transparent',
              color:
                active === c.id
                  ? `rgb(${c.accent})`
                  : 'rgba(250,249,245,0.35)',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'all 150ms ease',
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
    </div>
  )
}
