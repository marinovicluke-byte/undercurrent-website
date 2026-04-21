import PillCTA from '@/components/ui/PillCTA'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

export default function WhyUndercurrent({
  eyebrow = 'Why UnderCurrent',
  eyebrowNumber = '02',
  headline,
  body = 'UnderCurrent sticks with you. We build your first automations, adjust them as the business changes, and add new ones when priorities shift. Everything we build is yours. We only win when you win.',
  ctaLabel = "Let's talk",
  ctaHref = '/contact',
}) {
  return (
    <section
      style={{
        position: 'relative',
        padding: '96px var(--page-pad)',
        background: '#26241F',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 1280,
          margin: 0,
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          gap: 28,
        }}
      >
        <div style={{ alignSelf: 'flex-start' }}>
          <SectionEyebrow n={eyebrowNumber} label={eyebrow} />
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
            maxWidth: 880,
          }}
        >
          {headline ?? (
            <>
              Your business grows.{' '}
              <span className="uc-glow-word uc-glow-word--blue">
                So do the systems.
              </span>
            </>
          )}
        </h2>

        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            lineHeight: 1.55,
            color: 'var(--text-secondary)',
            maxWidth: 680,
          }}
        >
          {body}
        </p>

        <div style={{ marginTop: 8 }}>
          <PillCTA label={ctaLabel} href={ctaHref} />
        </div>
      </div>
    </section>
  )
}
