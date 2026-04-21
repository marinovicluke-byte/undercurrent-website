import PillCTA from '@/components/ui/PillCTA'

export default function ClosingCTA() {
  return (
    <section
      style={{
        padding: '140px var(--page-pad)',
        borderTop: '1px solid var(--text-faint)',
        background: 'var(--bg-deep)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          bottom: '-30%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '90%',
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 70%, rgba(138,174,200,0.30) 0%, rgba(106,141,173,0.12) 30%, transparent 65%)',
          filter: 'blur(40px)',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: 900, margin: '0 auto' }}>
        <h2
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 'clamp(40px, 5vw, var(--page-pad))',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--off-white)',
          }}
        >
          Ready to get your afternoons back?
        </h2>
        <p
          style={{
            marginTop: 20,
            marginBottom: 36,
            fontFamily: 'var(--font-body)',
            fontSize: 17,
            color: 'var(--text-secondary)',
          }}
        >
          Book a 20-minute call. No slides, no pitch — just a look at where automation pays back first.
        </p>
        <div style={{ display: 'inline-flex' }}>
          <PillCTA label="Let's talk" href="https://cal.com/luke-marinovic-aqeosc/30min" large />
        </div>
      </div>
    </section>
  )
}
