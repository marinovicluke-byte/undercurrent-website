// components/sections/Process.js
import FadeIn from '@/components/ui/FadeIn'

const STEPS = [
  {
    number: '01',
    title: 'Discovery call',
    description: 'We map your current workflow, find where time is leaking, and scope what to automate first.',
  },
  {
    number: '02',
    title: 'Build',
    description: 'We build the automation end-to-end in 3–5 days. You see it working before we hand it over.',
  },
  {
    number: '03',
    title: 'Handover',
    description: 'We walk you through it, give you full access, and make sure your team can use it confidently.',
  },
  {
    number: '04',
    title: 'Optimise',
    description: 'On retainer, we keep improving — adding new automations as your business changes.',
  },
]

export default function Process() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">How it works</h2>
          <p className="mt-4 text-muted max-w-xl">
            From first call to working automation in under a week.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 100}>
              <div>
                <p className="font-display text-5xl font-bold text-border">{step.number}</p>
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal">{step.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
