'use client'

import { useState } from 'react'

const BLUE_RGB = '106,141,173'
const BLUE     = `rgb(${BLUE_RGB})`

const TABS = [
  {
    id: 'audit',
    label: 'Audit',
    num: '01',
    headline: 'Start with what is actually broken',
    copy: 'Technical audit covering crawl health, indexation, Core Web Vitals, entity gaps, and internal linking. Delivered as a written report with a prioritised 90-day action list — not a generic checklist.',
    badge: 'Week 1',
    mockLabel: 'SEO audit report',
  },
  {
    id: 'cluster',
    label: 'Cluster',
    num: '02',
    headline: 'Architecture before content',
    copy: 'Topic cluster map built around buyer-intent queries — not keyword difficulty. Pillar hubs and interlinked support pages designed so Google and AI crawlers understand the topical authority.',
    badge: 'Week 2',
    mockLabel: 'Topic cluster map',
  },
  {
    id: 'content',
    label: 'Content',
    num: '03',
    headline: 'Written to rank and be cited verbatim',
    copy: 'Answer-first structure, BLUF openers, question-led H2s, and FAQ blocks crafted for verbatim quotation inside ChatGPT and Perplexity. Human-authored, AI-assisted drafting, editorial quality review before anything ships.',
    badge: 'Weeks 3–6',
    mockLabel: 'Content editor',
  },
  {
    id: 'results',
    label: 'Results',
    num: '04',
    headline: 'Monthly proof it is working',
    copy: 'Google ranking movements, AI citation tracking across ChatGPT and Perplexity, and organic pipeline attribution. Every month, a report that shows what moved and what is next.',
    badge: 'Monthly',
    mockLabel: 'Rankings dashboard',
  },
]

export default function SeoTabDemo() {
  const [active, setActive] = useState(0)
  const tab = TABS[active]

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid rgba(250,249,245,0.1)',
        marginBottom: 52,
        overflowX: 'auto',
      }}>
        {TABS.map((t, i) => (
          <button
            key={t.id}
            onClick={() => setActive(i)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: active === i ? `2px solid ${BLUE}` : '2px solid transparent',
              padding: '14px 28px',
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 14,
              letterSpacing: '-0.01em',
              color: active === i ? BLUE : 'rgba(250,249,245,0.4)',
              cursor: 'pointer',
              transition: 'color 160ms ease, border-color 160ms ease',
              marginBottom: -1,
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Content grid */}
      <div className="seo-demo-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.5fr',
        gap: 64,
        alignItems: 'center',
      }}>
        {/* Left: copy */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: BLUE, letterSpacing: '0.12em',
            }}>
              {tab.num} / 04
            </span>
            <span style={{
              display: 'inline-block',
              padding: '3px 10px',
              border: `1px solid rgba(${BLUE_RGB}, 0.35)`,
              borderRadius: 999,
              fontFamily: 'var(--font-display)', fontSize: 11, fontWeight: 500,
              color: BLUE, letterSpacing: '0.08em',
            }}>
              {tab.badge}
            </span>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontWeight: 500,
            fontSize: 'clamp(22px, 2.4vw, 32px)', lineHeight: 1.1,
            letterSpacing: '-0.025em', color: 'rgba(250,249,245,0.95)',
            margin: '0 0 18px',
          }}>
            {tab.headline}
          </h3>

          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 15, lineHeight: 1.7,
            color: 'rgba(250,249,245,0.58)', margin: '0 0 32px',
          }}>
            {tab.copy}
          </p>

          {/* Progress dots */}
          <div style={{ display: 'flex', gap: 8 }}>
            {TABS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to ${TABS[i].label}`}
                style={{
                  width: i === active ? 28 : 8,
                  height: 8,
                  borderRadius: 4,
                  background: i === active ? BLUE : 'rgba(250,249,245,0.18)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 220ms ease, background 220ms ease',
                }}
              />
            ))}
          </div>
        </div>

        {/* Right: browser mockup */}
        <div style={{
          background: '#1C1C1A',
          border: '1px solid rgba(250,249,245,0.1)',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow: `6px 6px 0 0 rgba(${BLUE_RGB}, 0.28)`,
        }}>
          {/* Browser chrome */}
          <div style={{
            background: 'rgba(0,0,0,0.45)',
            padding: '11px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            borderBottom: '1px solid rgba(250,249,245,0.07)',
          }}>
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#FF5F57', flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#FEBC2E', flexShrink: 0 }} />
            <span style={{ width: 10, height: 10, borderRadius: 5, background: '#28C840', flexShrink: 0 }} />
            <div style={{
              flex: 1,
              background: 'rgba(255,255,255,0.05)',
              borderRadius: 4,
              height: 20,
              marginLeft: 8,
              display: 'flex',
              alignItems: 'center',
              paddingLeft: 10,
            }}>
              <span style={{
                fontSize: 11,
                color: 'rgba(250,249,245,0.28)',
                fontFamily: 'var(--font-body)',
              }}>
                robin.undercurrentautomations.com / {tab.mockLabel.toLowerCase().replace(' ', '-')}
              </span>
            </div>
          </div>

          {/* Placeholder body */}
          <div style={{
            height: 360,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 14,
            padding: 32,
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: `rgba(${BLUE_RGB}, 0.1)`,
              border: `1px solid rgba(${BLUE_RGB}, 0.3)`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="5" rx="1" stroke={BLUE} strokeWidth="1.5"/>
                <rect x="14" y="3" width="7" height="5" rx="1" stroke={BLUE} strokeWidth="1.5"/>
                <rect x="3" y="12" width="7" height="9" rx="1" stroke={BLUE} strokeWidth="1.5"/>
                <rect x="14" y="12" width="7" height="9" rx="1" stroke={BLUE} strokeWidth="1.5"/>
              </svg>
            </div>
            <p style={{
              color: 'rgba(250,249,245,0.22)',
              fontSize: 13,
              fontFamily: 'var(--font-body)',
              margin: 0,
              textAlign: 'center',
              lineHeight: 1.5,
              maxWidth: 260,
            }}>
              Robin Signal — {tab.mockLabel}<br />
              <span style={{ color: 'rgba(250,249,245,0.14)', fontSize: 11 }}>
                Dashboard screenshot coming soon
              </span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .seo-demo-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>
    </div>
  )
}
