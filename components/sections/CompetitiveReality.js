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
          <span className="uc-glow-word uc-glow-word--sage">Search</span>{' '}
          has a new era.
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
          Australian small businesses are about to lose a decade of search work. Buyers ask AI now. Most of your market isn’t there.
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
            You built the business right. Real customers, real word-of-mouth, a Google ranking you worked for. Then your buyer started asking ChatGPT instead of Google. The ranking stopped delivering.
          </p>

          <p style={narrativeStyle}>You’re not imagining it.</p>

          <p style={narrativeStyle}>
            A competitor in your market shows up in ChatGPT answers, Perplexity citations, and Google AI Overviews. Your buyer asks once, gets the answer, books them. You never even saw the search.
          </p>

          <p style={pullStyle}>
            They didn’t beat you on quality. They beat you to AI search.
          </p>

          <p style={narrativeStyle}>
            The window is open. Almost no one in your market is fighting for AI citations yet. First movers compound. Latecomers fight for scraps.
          </p>

          <p style={narrativeStyle}>
            AI search isn’t a setting. It’s the structure, the authority, and the code under your content. That’s what UnderCurrent Automations builds.
          </p>

          <p style={decideStyle}>
            Win AI search, or watch a competitor take your market.
          </p>
        </div>

        <div style={{ marginTop: 12 }}>
          <PillCTA label="Let’s talk" href="https://cal.com/luke-marinovic-aqeosc/30min" tone="blue" />
        </div>
      </div>
    </section>
  )
}
