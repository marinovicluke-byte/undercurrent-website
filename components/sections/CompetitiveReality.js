import SectionEyebrow from '@/components/ui/SectionEyebrow'
import PillCTA from '@/components/ui/PillCTA'

const BODY_MAX = 860

const narrativeStyle = {
  margin: 0,
  fontFamily: 'var(--font-body)',
  fontSize: 17,
  lineHeight: 1.6,
  color: 'var(--text-secondary)',
  maxWidth: BODY_MAX,
}

const pullStyle = {
  margin: '6px 0',
  padding: '16px 26px',
  borderLeft: '3px solid var(--blue)',
  fontFamily: 'var(--font-display)',
  fontSize: 24,
  fontWeight: 500,
  letterSpacing: '-0.02em',
  lineHeight: 1.32,
  color: 'var(--off-white)',
  maxWidth: BODY_MAX,
}

const decideStyle = {
  margin: '4px 0 0',
  fontFamily: 'var(--font-display)',
  fontSize: 24,
  fontWeight: 500,
  letterSpacing: '-0.02em',
  lineHeight: 1.3,
  color: 'var(--off-white)',
  maxWidth: BODY_MAX,
  textWrap: 'balance',
}

export default function CompetitiveReality() {
  return (
    <section
      id="why-now"
      style={{
        position: 'relative',
        padding: '96px var(--page-pad)',
        background: 'var(--bg-deep)',
        borderTop: '1px solid var(--text-faint)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div style={{ alignSelf: 'flex-start' }}>
          <SectionEyebrow n="01" label="Why now" />
        </div>

        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 5vw, var(--page-pad))',
            lineHeight: 1.04,
            letterSpacing: '-0.035em',
            color: 'var(--off-white)',
            textWrap: 'balance',
            maxWidth: 1200,
          }}
        >
          Someone in your market has{' '}
          <span className="uc-glow-word uc-glow-word--sage">already</span>{' '}
          figured out AI.
        </h2>

        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
            maxWidth: 720,
          }}
        >
          Australian small businesses are losing ground to competitors who started using AI first. The good news: the tech is the easy part. You still have time to catch up.
        </p>

        <div
          style={{
            marginTop: 12,
            display: 'flex',
            flexDirection: 'column',
            gap: 18,
          }}
        >
          <p style={narrativeStyle}>
            You built your business the right way. Real customers. Real relationships. A team you trust. Now a competitor in your market replies faster, quotes faster, and grows without hiring. You can feel deals starting to slip.
          </p>

          <p style={narrativeStyle}>You’re not imagining it.</p>

          <p style={narrativeStyle}>
            Their developers code with AI. Their support is 95% AI-handled. Their ops team gets twice as much done. Their proposals go out same-day.
          </p>

          <p style={pullStyle}>
            They’re not smarter than you. They just wired AI into their business first.
          </p>

          <p style={narrativeStyle}>
            If nothing changes, the gap grows. Slow at first. Then all at once. Customers, staff, margin, gone to whoever moved first.
          </p>

          <p style={narrativeStyle}>
            The tools are cheap. Everyone has them. The real work is fitting AI to your people, your processes, and your systems. That is what UnderCurrent Automations builds.
          </p>

          <p style={decideStyle}>
            Choose whether you disrupt your industry, or get disrupted by it.
          </p>
        </div>

        <div style={{ marginTop: 12 }}>
          <PillCTA label="See what we’d automate first" href="/services" tone="blue" />
        </div>
      </div>
    </section>
  )
}
