'use client'
import { useState } from 'react'
import SectionShell from '@/components/ui/SectionShell'
import PillCTA from '@/components/ui/PillCTA'

const PILLARS = [
  {
    key: 'lead',
    n: '01',
    name: 'Lead generation',
    before: {
      headline: 'Chasing cold lists, guessing who\u2019s ready.',
      items: [
        { metric: '6 hrs/wk', label: 'scraping LinkedIn for contacts' },
        { metric: '40%', label: 'of replies go to unqualified leads' },
        { metric: '3 days', label: 'avg. response to a warm inbound' },
        { metric: '1 tool', label: 'CRM, spreadsheets, inbox out of sync' },
      ],
      costline: 'A founder\u2019s half-day every week, gone.',
    },
    after: {
      headline: 'Qualified pipeline arrives while you sleep.',
      items: [
        { metric: '12 min/wk', label: 'reviewing a pre-scored shortlist' },
        { metric: '94%', label: 'match rate on ICP before outreach' },
        { metric: '8 min', label: 'median response to inbound' },
        { metric: 'One view', label: 'CRM, enrichment, inbox, calendar' },
      ],
      winline: 'Five hours back. Every week. Forever.',
    },
  },
  {
    key: 'revops',
    n: '02',
    name: 'Sales automation',
    before: {
      headline: 'Spreadsheets, copy-paste, and hoping nothing breaks.',
      items: [
        { metric: '14 hrs/mo', label: 'reconciling Stripe against the CRM' },
        { metric: '2\u20133 days', label: 'lag on pipeline-to-forecast reports' },
        { metric: '9%', label: 'of invoices sent with the wrong figure' },
        { metric: 'Monthly', label: 'close takes a full ops person out' },
      ],
      costline: 'Revenue leaks you don\u2019t see until month-end.',
    },
    after: {
      headline: 'Numbers match themselves. Close is a button.',
      items: [
        { metric: '< 20 min', label: 'from deal won to invoice sent' },
        { metric: 'Live', label: 'pipeline-to-forecast dashboard' },
        { metric: '0.2%', label: 'billing-error rate (audited)' },
        { metric: '1 day', label: 'month-end close, fully reconciled' },
      ],
      winline: 'Finance stops fighting sales. Everyone wins.',
    },
  },
  {
    key: 'frontend',
    n: '03',
    name: 'Front-end experiences',
    before: {
      headline: 'Generic templates. Forms that leak users.',
      items: [
        { metric: '38%', label: 'drop-off on the booking flow' },
        { metric: 'Weeks', label: 'to ship a new landing page' },
        { metric: '0', label: 'personalisation per visitor' },
        { metric: '3 stacks', label: 'agency-owned, nothing integrated' },
      ],
      costline: 'Customers bouncing off the thing you\u2019re paying to promote.',
    },
    after: {
      headline: 'Interfaces that convert. And you own them.',
      items: [
        { metric: '9%', label: 'drop-off on the rebuilt flow' },
        { metric: '48 hrs', label: 'from brief to live landing page' },
        { metric: 'Per-ICP', label: 'hero, copy, CTA personalisation' },
        { metric: 'One stack', label: 'handed over, documented, yours' },
      ],
      winline: 'Same traffic. 3\u00d7 the qualified calls.',
    },
  },
  {
    key: 'ai',
    n: '04',
    name: 'Surface & discovery',
    before: {
      headline: 'Invisible to ChatGPT. Buried in Google page 3.',
      items: [
        { metric: '0', label: 'mentions in AI answer engines' },
        { metric: 'Page 3+', label: 'for most commercial queries' },
        { metric: 'Guesswork', label: 'about what prospects actually ask' },
        { metric: 'No plan', label: 'for how the team should use AI' },
      ],
      costline: 'Your best competitor is the one an AI recommends.',
    },
    after: {
      headline: 'Cited by the answer. Trained for the team.',
      items: [
        { metric: '48', label: 'citations across GPT, Claude, Perplexity' },
        { metric: 'Top 3', label: 'for 12 of 15 target queries' },
        { metric: 'Query map', label: 'of what buyers ask, weekly' },
        { metric: 'Playbooks', label: 'for every role, reviewed quarterly' },
      ],
      winline: 'You become the default answer.',
    },
  },
  {
    key: 'integrations',
    n: '05',
    name: 'Custom integrations',
    before: {
      headline: 'Eleven tabs open. Same data typed four times.',
      items: [
        { metric: '11 tools', label: 'in daily use, none connected' },
        { metric: '4\u00d7', label: 'the same customer entered manually' },
        { metric: '22%', label: 'of records with missing or stale fields' },
        { metric: 'Fragile', label: 'Zaps that break quietly in the background' },
      ],
      costline: 'You\u2019re paying for software to be a filing problem.',
    },
    after: {
      headline: 'One source of truth, everywhere you need it.',
      items: [
        { metric: 'One API', label: 'layer, tools stay, chaos leaves' },
        { metric: '1\u00d7', label: 'entry, propagated everywhere' },
        { metric: '99.3%', label: 'record completeness, monitored' },
        { metric: 'Observable', label: 'pipelines with alerts you\u2019ll actually read' },
      ],
      winline: 'Your stack stops being a tax on your team.',
    },
  },
]

const TONE = {
  red: { rgb: '224, 122, 85', light: '232, 152, 120' },
  sage: { rgb: '143, 175, 159', light: '168, 196, 184' },
  blue: { rgb: '106, 141, 173', light: '138, 174, 200' },
}

function PillarTabs({ active, onChange }) {
  return (
    <div
      role="tablist"
      style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 40 }}
    >
      {PILLARS.map((p, i) => {
        const on = i === active
        return (
          <button
            key={p.key}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(i)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 14px 8px 8px',
              borderRadius: 999,
              background: on ? 'var(--off-white)' : 'transparent',
              color: on ? 'var(--bg-deep)' : 'var(--text-secondary)',
              border: on ? '1px solid var(--off-white)' : '1px solid var(--text-faint)',
              fontFamily: 'var(--font-display)',
              fontSize: 13,
              fontWeight: 500,
              letterSpacing: '-0.005em',
              cursor: 'pointer',
              transition: 'all 160ms ease',
            }}
          >
            <span
              style={{
                width: 22,
                height: 22,
                borderRadius: '50%',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: on ? 'var(--bg-deep)' : 'rgba(255,255,255,0.08)',
                color: on ? 'var(--off-white)' : 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {p.n}
            </span>
            {p.name}
          </button>
        )
      })}
    </div>
  )
}

function BAColumnHeader({ tone, label, sub }) {
  const t = TONE[tone]
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: `rgb(${t.rgb})`,
        }}
      />
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          color: 'var(--off-white)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: '0.10em',
          textTransform: 'uppercase',
        }}
      >
        · {sub}
      </span>
    </div>
  )
}

function FlatPanel({ tone, label, sub, headline, items, tagline }) {
  const t = TONE[tone]
  return (
    <article
      style={{
        position: 'relative',
        padding: '30px 32px 28px',
        borderRadius: 14,
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        boxShadow: `5px 5px 0 0 rgb(${t.rgb})`,
      }}
    >
      <div style={{ position: 'relative' }}>
        <BAColumnHeader tone={tone} label={label} sub={sub} />

        <h3
          style={{
            margin: '16px 0 20px',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(20px, 1.8vw, 26px)',
            lineHeight: 1.18,
            letterSpacing: '-0.018em',
            color: 'var(--off-white)',
          }}
        >
          {headline}
        </h3>

        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {items.map((it, i) => (
            <li
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '110px 1fr',
                gap: 18,
                padding: '12px 0',
                borderTop: '1px solid rgba(255,255,255,0.06)',
                alignItems: 'baseline',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  fontSize: 18,
                  letterSpacing: '-0.01em',
                  fontVariantNumeric: 'tabular-nums',
                  color: `rgb(${t.light})`,
                }}
              >
                {it.metric}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 14,
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {it.label}
              </span>
            </li>
          ))}
        </ul>

        <div
          style={{
            marginTop: 22,
            paddingTop: 16,
            borderTop: '1px solid rgba(255,255,255,0.08)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            letterSpacing: '0.10em',
            textTransform: 'uppercase',
            lineHeight: 1.5,
            color: `rgb(${t.light})`,
          }}
        >
          {tagline}
        </div>
      </div>
    </article>
  )
}

export default function BeforeAfter() {
  const [pillarIdx, setPillarIdx] = useState(0)
  const p = PILLARS[pillarIdx]

  return (
    <SectionShell n="06" label="The shift" anchor="before-after" bg="panel">
      <h2
        style={{
          margin: 0,
          fontFamily: 'var(--font-display)',
          fontWeight: 500,
          fontSize: 'clamp(44px, 5.4vw, 84px)',
          lineHeight: 1.0,
          letterSpacing: '-0.035em',
          color: 'var(--off-white)',
          textWrap: 'balance',
          maxWidth: 1100,
        }}
      >
        The difference between a busy week and a{' '}
        <span className="uc-glow-word uc-glow-word--sage">compounding</span> one.
      </h2>

      <p
        style={{
          margin: '24px 0 0',
          maxWidth: 640,
          fontFamily: 'var(--font-body)',
          fontSize: 17,
          lineHeight: 1.6,
          color: 'var(--text-secondary)',
        }}
      >
        Most Australian small businesses lose five to fifteen hours a week to manual work.
        Automation reclaims it across five pillars: lead generation, sales automation,
        front-end experiences, surface and discovery, and custom integrations.
      </p>

      <div style={{ marginTop: 48 }}>
        <PillarTabs active={pillarIdx} onChange={setPillarIdx} />

        <div
          className="uc-stack-2col"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 28,
          }}
        >
          <FlatPanel
            tone="red"
            label="Before"
            sub="Manual, today"
            headline={p.before.headline}
            items={p.before.items}
            tagline={p.before.costline}
          />
          <FlatPanel
            tone="sage"
            label="After"
            sub="Automated, with us"
            headline={p.after.headline}
            items={p.after.items}
            tagline={p.after.winline}
          />
        </div>
      </div>

      <div
        style={{
          marginTop: 56,
          paddingTop: 28,
          borderTop: '1px solid var(--text-faint)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            color: 'var(--text-secondary)',
            maxWidth: 560,
          }}
        >
          Want to know which pillar would pay back first for your business? We&rsquo;ll do
          the audit.
        </div>
        <PillCTA label="Book a free audit" href="/audit" tone="blue" />
      </div>
    </SectionShell>
  )
}
