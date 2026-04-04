// components/sections/ServicesOverview.js
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { SERVICES } from '@/lib/data/services'

export default function ServicesOverview() {
  const featured = SERVICES.slice(0, 6)

  return (
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">What we automate</h2>
          <p className="mt-4 text-muted max-w-xl">
            Every engagement is custom-built. These are the most common workflows we deliver.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 75}>
              <Link
                href={`/${service.slug}`}
                className="block rounded-xl border border-border bg-white p-6 hover:border-blue transition-colors group"
              >
                <p className="text-xs font-body text-blue uppercase tracking-widest">
                  {service.label}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-charcoal group-hover:text-blue transition-colors">
                  {service.heroHeadline1} {service.heroHeadline2}
                </h3>
                <p className="mt-3 text-sm text-muted line-clamp-2">{service.heroCopy}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={500}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-body text-blue hover:text-blue-dark transition-colors"
            >
              View all services →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
