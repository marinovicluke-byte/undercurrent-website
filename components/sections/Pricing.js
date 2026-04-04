// components/sections/Pricing.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { PRICING_TIERS } from '@/lib/data/pricing'

export default function Pricing() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">Pricing</h2>
          <p className="mt-4 max-w-xl text-muted">
            Fixed-price projects. No hourly billing. No surprises.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 100}>
              <div className={`rounded-xl border p-8 flex flex-col h-full ${tier.featured ? 'border-blue bg-charcoal text-white' : 'border-border bg-white'}`}>
                <p className={`text-sm uppercase tracking-widest font-body ${tier.featured ? 'text-blue' : 'text-muted'}`}>
                  {tier.name}
                </p>
                <p className={`mt-3 font-display text-3xl font-bold ${tier.featured ? 'text-white' : 'text-charcoal'}`}>
                  {tier.price}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${tier.featured ? 'text-white/70' : 'text-muted'}`}>
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.featured ? 'text-white/80' : 'text-charcoal'}`}>
                      <span className="mt-0.5 text-blue">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href={tier.cta.href}
                    variant={tier.featured ? 'secondary' : 'primary'}
                    className="w-full text-center justify-center"
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
