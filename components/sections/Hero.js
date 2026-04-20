import PillCTA from '@/components/ui/PillCTA'

const GLOW_WORDS = ['automation', 'agency', 'australian', 'small', 'businesses']

function renderHeadline(headline) {
  const tokens = String(headline).split(/(\s+)/)
  const isGlow = (w) => {
    const s = w.toLowerCase().replace(/[^a-z]/g, '')
    return GLOW_WORDS.includes(s)
  }
  return tokens.map((t, i) =>
    isGlow(t) ? (
      <span key={i} className="uc-glow-word">
        {t}
      </span>
    ) : (
      <span key={i}>{t}</span>
    ),
  )
}

export default function Hero({
  headline = 'The AI automation agency for Australian small businesses',
  subtext,
  showSubtext = false,
  ctaLabel = "Let's talk",
  ctaHref = '/contact',
}) {
  return (
    <section
      className="uc-hero"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        paddingTop: 0,
        paddingBottom: 'clamp(80px, 14vh, 160px)',
        overflow: 'hidden',
        minHeight: 'calc(100vh - 80px - 90px)',
        background: 'var(--charcoal-deep)',
      }}
    >
      {/* Background video — dimmed over black. Hidden for reduced-motion. */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        className="uc-hero-video"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.26,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <source src="/hero-home-bg.webm" type="video/webm" />
        <source src="/hero-home-bg.mp4" type="video/mp4" />
      </video>
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .uc-hero-video { display: none; }
        }
        @media (max-width: 780px) {
          .uc-hero {
            min-height: auto !important;
            padding-top: 48px !important;
            padding-bottom: 40px !important;
          }
          .uc-hero h1 {
            font-size: clamp(34px, 9vw, 48px) !important;
            line-height: 1.05 !important;
          }
          .uc-hero .uc-hero-cta {
            margin-top: 24px !important;
          }
        }
      `}</style>

      {/* Type block */}
      <div
        style={{
          padding: '0 var(--page-pad)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            maxWidth: 1600,
            margin: 0,
            width: '100%',
            boxSizing: 'border-box',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(42px, 8vw, 96px)',
              lineHeight: 1.04,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
            }}
          >
            {renderHeadline(headline)}
          </h1>

          {showSubtext && subtext && (
            <p
              style={{
                margin: '24px 0 0',
                fontFamily: 'var(--font-body)',
                fontSize: 18,
                lineHeight: 1.45,
                color: 'var(--text-secondary)',
                maxWidth: 540,
              }}
            >
              {subtext}
            </p>
          )}

          <div className="uc-hero-cta" style={{ marginTop: 32 }}>
            <PillCTA label={ctaLabel} href={ctaHref} large />
          </div>
        </div>
      </div>
    </section>
  )
}
