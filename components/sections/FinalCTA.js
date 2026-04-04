// components/sections/FinalCTA.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

export default function FinalCTA() {
  return (
    <section className="bg-charcoal py-section">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Ready to get your time back?
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-6 max-w-xl mx-auto text-white/70">
            Book a free 30-minute call. We&apos;ll map out what to automate first and give you a
            fixed-price quote before we start.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button href="https://cal.com/undercurrent" variant="secondary">
              Book a Free Call
            </Button>
            <Button href="/audit" variant="ghost" className="text-white hover:text-white/70">
              Take the free audit →
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
