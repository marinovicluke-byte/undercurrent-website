import Link from 'next/link'
import SectionEyebrow from '@/components/ui/SectionEyebrow'
import PillCTA from '@/components/ui/PillCTA'

export const metadata = {
  title: 'How We Work',
  description: 'Three precise steps: Map your workflows, Build automations that fit, then let them Flow around the clock.',
}

const STEPS = [
  {
    num: '01',
    word: 'Map',
    tagline: 'We find where your time is going.',
    body: 'In a 30-minute call, we go through everything you and your team do repeatedly. We rank it by time saved and show you exactly what can be automated, and what the impact would be.',
    accent: 'var(--blue)',
    accentLight: 'var(--blue-light)',
  },
  {
    num: '02',
    word: 'Build',
    tagline: "We set it up. You don't lift a finger.",
    body: 'We connect automations directly into the tools you already use. No new software to learn, nothing to change about how you work. We just remove the slow, repetitive parts.',
    accent: 'var(--orange)',
    accentLight: 'var(--orange-light)',
  },
  {
    num: '03',
    word: 'Flow',
    tagline: "It runs. You don't have to.",
    body: 'Your systems work around the clock, following up leads, looking after clients, keeping your inbox clear. You get your time back, and it stays that way as your business grows.',
    accent: 'var(--sage)',
    accentLight: 'var(--sage-light)',
  },
]

const PROMISES = [
  { title: 'Full workflow audit', body: 'We map every repetitive task across your business before writing a single line of automation.' },
  { title: 'Custom-built systems', body: 'No templates. Every automation is built specifically for how your business operates.' },
  { title: 'Handed over and documented', body: 'You own everything we build. We document it and train you before we leave.' },
]

export default function ProcessPage() {
  return (
    <div style={{ background: 'var(--bg-deep)' }}>
      {/* Hero */}
      <section style={{ padding: '120px var(--page-pad) 80px', background: 'var(--bg-deep)' }}>
        <div style={{ maxWidth: 1280, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 32 }}>
            <SectionEyebrow label="How we work" />
          </div>
          <h1
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(44px, 6vw, 88px)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 1000,
            }}
          >
            Three steps. <span className="uc-glow-word uc-glow-word--sage">Then it runs itself.</span>
          </h1>
          <p
            style={{
              margin: '28px 0 0',
              fontFamily: 'var(--font-body)',
              fontSize: 18,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
              maxWidth: 640,
            }}
          >
            We keep it simple on purpose. Map what&apos;s costing you time, build the system that handles it, and hand it over. That&apos;s it.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section style={{ padding: '40px var(--page-pad) 120px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
        <div style={{ maxWidth: 1280, margin: 0, width: '100%' }}>
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 64,
                alignItems: 'center',
                padding: '72px 0',
                borderBottom: i < STEPS.length - 1 ? '1px solid var(--text-faint)' : 'none',
              }}
              className="uc-stack-2col"
            >
              <div style={{ order: i % 2 === 1 ? 2 : 1 }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: '0.14em',
                    color: step.accentLight,
                    marginBottom: 16,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {step.num}
                </span>
                <h2
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 'clamp(56px, 8vw, 112px)',
                    lineHeight: 0.95,
                    letterSpacing: '-0.04em',
                    color: 'var(--off-white)',
                    marginBottom: 24,
                  }}
                >
                  {step.word}
                </h2>
                <p
                  style={{
                    margin: '0 0 16px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 22,
                    lineHeight: 1.3,
                    letterSpacing: '-0.02em',
                    color: 'var(--off-white)',
                  }}
                >
                  {step.tagline}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: 'var(--text-secondary)',
                    maxWidth: 480,
                  }}
                >
                  {step.body}
                </p>
              </div>

              <div
                style={{
                  order: i % 2 === 1 ? 1 : 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    width: '100%',
                    maxWidth: 380,
                    aspectRatio: '1 / 1',
                    background: 'var(--charcoal)',
                    border: '1px solid var(--text-faint)',
                    borderRadius: 14,
                    boxShadow: `6px 6px 0 0 ${step.accent}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 500,
                      fontSize: 'clamp(140px, 18vw, 240px)',
                      lineHeight: 1,
                      letterSpacing: '-0.05em',
                      color: step.accent,
                      opacity: 0.22,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {step.num}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section style={{ padding: '120px var(--page-pad)', background: 'var(--bg-deep)', borderTop: '1px solid var(--text-faint)' }}>
        <div style={{ maxWidth: 1280, margin: 0, width: '100%' }}>
          <div style={{ marginBottom: 32 }}>
            <SectionEyebrow label="What you get" />
          </div>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(36px, 4.8vw, 64px)',
              lineHeight: 1.0,
              letterSpacing: '-0.035em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 820,
              marginBottom: 56,
            }}
          >
            Every engagement includes the same <span className="uc-glow-word uc-glow-word--blue">core promise</span>.
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 20,
            }}
            className="uc-stack-4col"
          >
            {PROMISES.map((item, i) => (
              <article
                key={i}
                style={{
                  padding: '28px 30px 30px',
                  background: 'var(--charcoal)',
                  border: '1px solid var(--text-faint)',
                  borderRadius: 14,
                  boxShadow: '4px 4px 0 0 var(--text-faint)',
                }}
              >
                <h3
                  style={{
                    margin: '0 0 12px',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 500,
                    fontSize: 20,
                    letterSpacing: '-0.015em',
                    color: 'var(--off-white)',
                    lineHeight: 1.25,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontFamily: 'var(--font-body)',
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px var(--page-pad) 120px', background: 'var(--charcoal)', borderTop: '1px solid var(--text-faint)' }}>
        <div style={{ maxWidth: 1280, margin: 0, width: '100%' }}>
          <h2
            style={{
              margin: 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 4vw, 48px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--off-white)',
              maxWidth: 720,
              marginBottom: 20,
            }}
          >
            Start with a free workflow audit.
          </h2>
          <p
            style={{
              margin: '0 0 32px',
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              maxWidth: 560,
            }}
          >
            30 minutes. We&apos;ll tell you exactly what can be automated, what it would save, and roughly what it would cost.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, alignItems: 'center' }}>
            <PillCTA label="Get your free audit" href="/audit" tone="blue" />
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 22px',
                borderRadius: 999,
                border: '1px solid var(--text-faint)',
                background: 'transparent',
                color: 'var(--off-white)',
                textDecoration: 'none',
                fontFamily: 'var(--font-display)',
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}
            >
              Talk to us first <span aria-hidden style={{ fontSize: 14 }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
