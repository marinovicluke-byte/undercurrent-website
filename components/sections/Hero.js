// components/sections/Hero.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white pt-16">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <FadeIn>
          <p className="text-sm font-body text-blue uppercase tracking-widest">
            AI Automation · Melbourne
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-charcoal leading-tight">
            Stop doing work<br />a machine can do.
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            We build custom automation workflows that give small businesses 15+ hours a week back.
            No off-the-shelf tools. No lock-in. Done in days, not months.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="https://cal.com/undercurrent" variant="primary">
              Book a Free Call
            </Button>
            <Button href="/audit" variant="secondary">
              Free Business Audit
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
