import SectionShell from '@/components/ui/SectionShell'

const STAGES = [
  {
    n: 1,
    title: 'Funnel map audit',
    body:
      'A free 30-minute session where we audit your funnel, identify bottlenecks, and map the highest-value automations.',
  },
  {
    n: 2,
    title: 'Proposal',
    body:
      'Scope, timeline, and fixed price up front. No surprises, no hourly billing. You know what you\u2019re getting.',
  },
  {
    n: 3,
    title: 'Project',
    body:
      'Our team builds, tests, and deploys your systems. You get weekly updates and a working product at handover.',
  },
  {
    n: 4,
    title: 'Ongoing management',
    body:
      'Optional retainer for monitoring, optimisation, and iteration. Most clients see compounding returns over time.',
  },
]


export default function Process() {
  return (
    <SectionShell n="06" label="How we work" anchor="process" bg="panel">
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
        From first call to <span className="uc-glow-word uc-glow-word--sage">launch</span>.
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
        Four stages, no surprises. Fixed scope, weekly check-ins, and a working system at
        handover. Most builds go live in 14 days.
      </p>

      <div
        className="uc-stack-4col"
        style={{
          marginTop: 56,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 16,
        }}
      >
        {STAGES.map(s => (
          <article
            key={s.n}
            style={{
              padding: '26px 26px 28px',
              borderRadius: 14,
              background: 'var(--charcoal)',
              border: '1px solid var(--text-faint)',
              boxShadow: '4px 4px 0 0 var(--text-faint)',
              display: 'flex',
              flexDirection: 'column',
              minHeight: 280,
            }}
          >
            <span
              style={{
                width: 28,
                height: 28,
                borderRadius: '50%',
                background: 'var(--off-white)',
                color: 'var(--charcoal-deep)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                flexShrink: 0,
              }}
            >
              {s.n}
            </span>
            <h3
              style={{
                margin: '22px 0 10px',
                fontFamily: 'var(--font-display)',
                fontWeight: 500,
                fontSize: 20,
                letterSpacing: '-0.015em',
                color: 'var(--off-white)',
              }}
            >
              {s.title}
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.55,
              }}
            >
              {s.body}
            </p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
