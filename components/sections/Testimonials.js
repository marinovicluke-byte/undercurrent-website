// components/sections/Testimonials.js
import FadeIn from '@/components/ui/FadeIn'

const TESTIMONIALS = [
  {
    quote: "We were spending 3 hours a day on quoting and follow-ups. UnderCurrent automated the whole thing in 4 days. Best $2K we've ever spent.",
    name: 'James T.',
    business: 'Plumbing & Gas, Brisbane',
  },
  {
    quote: "Our new client onboarding used to take a week of back-and-forth. Now it's done in 20 minutes without us touching it.",
    name: 'Sarah M.',
    business: 'Accounting Practice, Melbourne',
  },
  {
    quote: "I was sceptical automation was possible for our industry. Luke proved me wrong. The lead response time went from 2 days to 4 minutes.",
    name: 'Chris R.',
    business: 'Real Estate, Sydney',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">What clients say</h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-charcoal leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="font-body font-medium text-charcoal">{t.name}</p>
                  <p className="text-sm text-muted">{t.business}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
