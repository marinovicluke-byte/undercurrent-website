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
          Australian small businesses are quietly being out-operated by competitors who adopted AI automation first. The good news: the tech isn’t the hard part, and you still have time to lead.
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
            You built your business the right way. Real customers. Real relationships. A team you trust. Now you’re watching someone in your market reply quicker, quote faster, and scale without hiring, and you can feel the deals starting to slide.
          </p>

          <p style={narrativeStyle}>You’re not imagining it.</p>

          <p style={narrativeStyle}>
            Their engineers ship with AI coding assistants. Their customer service is 95% AI-handled. Their ops team runs at twice the productivity. Their proposals go out same-day.
          </p>

          <p style={pullStyle}>
            They’re not smarter than you. They just figured out the integration first.
          </p>

          <p style={narrativeStyle}>
            If nothing changes, the gap compounds. Slow at first. Then all at once. Market share, talent, margin, gone to whoever moved before you did.
          </p>

          <p style={narrativeStyle}>
            But the technology is commodity. The moat isn’t the tools, it is the human, organisational and integration work. That is the part UnderCurrent Automations builds.
          </p>

          <p style={decideStyle}>
            Decide whether you want to disrupt your industry, or be disrupted by it.
          </p>
        </div>

        <div style={{ marginTop: 12 }}>
          <PillCTA label="See what we’d automate first" href="/services" tone="blue" />
        </div>
      </div>
    </section>
  )
}
