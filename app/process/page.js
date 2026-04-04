import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'

export const metadata = {
  title: 'How We Work',
  description: 'Three precise steps: Map your workflows, Build automations that fit, then let them Flow around the clock.',
}

const steps = [
  {
    num: '01',
    word: 'Map',
    tagline: 'We find where your time is going.',
    body: 'In a 30-minute call, we go through everything you and your team do repeatedly. We rank it by time saved and show you exactly what can be automated, and what the impact would be.',
  },
  {
    num: '02',
    word: 'Build',
    tagline: "We set it up. You don't lift a finger.",
    body: 'We connect automations directly into the tools you already use. No new software to learn, nothing to change about how you work. We just remove the slow, repetitive parts.',
  },
  {
    num: '03',
    word: 'Flow',
    tagline: "It runs. You don't have to.",
    body: 'Your systems work around the clock, following up leads, looking after clients, keeping your inbox clear. You get your time back, and it stays that way as your business grows.',
  },
]

export default function ProcessPage() {
  return (
    <div className="bg-white pt-24 pb-section overflow-x-hidden">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <FadeIn>
          <p className="text-xs font-mono tracking-widest text-muted mb-4">HOW WE WORK</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal leading-none">
            Three steps.<br />
            <span className="text-blue">Then it runs itself.</span>
          </h1>
          <p className="mt-8 text-lg text-muted max-w-prose font-light leading-relaxed">
            We keep it simple on purpose. Map what&apos;s costing you time, build the system that handles it, and hand it over. That&apos;s it.
          </p>
        </FadeIn>
      </section>

      {/* Steps */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 space-y-0">
          {steps.map((step, i) => (
            <FadeIn key={step.num} delay={i * 100}>
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 ${i < steps.length - 1 ? 'border-b border-border' : ''}`}>
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="text-xs font-mono tracking-widest text-blue/60 block mb-4">{step.num}</span>
                  <h2 className="font-display text-6xl md:text-8xl font-bold text-charcoal leading-none mb-6">{step.word}</h2>
                  <p className="text-xl font-medium text-charcoal mb-4">{step.tagline}</p>
                  <p className="text-base font-light leading-relaxed text-muted max-w-md">{step.body}</p>
                </div>
                <div className={`flex items-center justify-center ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <div className="w-full max-w-sm aspect-square rounded-2xl bg-surface border border-border flex items-center justify-center">
                    <span className="font-display text-9xl font-bold text-blue/10">{step.num}</span>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* What you get */}
      <section className="bg-charcoal py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="text-xs font-mono tracking-widest text-blue/70 mb-4">WHAT YOU GET</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight mb-12 max-w-2xl">
              Every engagement includes the same core promise.
            </h2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Full workflow audit', body: 'We map every repetitive task across your business before writing a single line of automation.' },
              { title: 'Custom-built systems', body: 'No templates. Every automation is built specifically for how your business operates.' },
              { title: 'Handed over and documented', body: 'You own everything we build. We document it and train you before we leave.' },
            ].map((item, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="border border-white/10 rounded-xl p-8">
                  <h3 className="font-display text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-white/60">{item.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-bold text-charcoal mb-6">Start with a free workflow audit.</h2>
              <p className="text-lg font-light leading-relaxed text-muted mb-8">
                30 minutes. We&apos;ll tell you exactly what can be automated, what it would save, and roughly what it would cost.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/audit" className="inline-block rounded-md bg-charcoal text-white px-8 py-3 text-sm font-medium hover:bg-blue transition-colors">
                  Get your free audit
                </Link>
                <Link href="/contact" className="inline-block rounded-md border border-charcoal text-charcoal px-8 py-3 text-sm font-medium hover:bg-surface transition-colors">
                  Talk to us first
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  )
}
