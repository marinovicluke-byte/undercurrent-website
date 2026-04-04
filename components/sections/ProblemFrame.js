// components/sections/ProblemFrame.js
import FadeIn from '@/components/ui/FadeIn'

const PAIN_POINTS = [
  'Quoting jobs manually while your phone keeps ringing',
  'Chasing unpaid invoices instead of doing billable work',
  'Onboarding new clients from a messy email thread',
  'Typing the same data into three different systems',
]

export default function ProblemFrame() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
              You&apos;re losing money to manual processes.
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-6 text-lg text-muted">
              Every hour your team spends on repetitive admin is an hour not spent on clients,
              sales, or growth. The tasks are predictable. They can be automated. Most businesses
              just haven&apos;t done it yet.
            </p>
          </FadeIn>
          <ul className="mt-8 space-y-4">
            {PAIN_POINTS.map((point, i) => (
              <FadeIn key={i} delay={200 + i * 100}>
                <li className="flex items-start gap-3 text-charcoal">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue flex-shrink-0" />
                  {point}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
