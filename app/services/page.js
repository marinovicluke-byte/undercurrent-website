import FadeIn from '@/components/ui/FadeIn'
import Link from 'next/link'
import { SERVICES } from '@/lib/data/services'

export const metadata = {
  title: 'Services',
  description: 'AI automation services for Australian small businesses. We build custom workflow systems that save 15+ hours a week.',
}

export default function ServicesPage() {
  return (
    <div className="bg-white pt-24 pb-section overflow-x-hidden">

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <FadeIn>
          <p className="text-xs font-mono tracking-widest text-muted mb-4">WHAT WE BUILD</p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal leading-none">
            Systems that run<br />
            <span className="text-blue">while you work.</span>
          </h1>
          <p className="mt-8 text-lg text-muted max-w-prose font-light leading-relaxed">
            Every service we offer is a custom-built automation system. No templates. No off-the-shelf tools repackaged. Built for how your business actually operates.
          </p>
        </FadeIn>
      </section>

      {/* Services grid */}
      <section className="bg-surface py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SERVICES.map((service, i) => (
              <FadeIn key={service.slug} delay={i * 60}>
                <Link
                  href={`/${service.slug}`}
                  className="group block rounded-2xl border border-border bg-white p-8 hover:border-blue/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-start justify-between mb-6">
                    <span className="text-xs font-mono tracking-widest text-blue/60">{service.index}</span>
                    <span className="text-xs font-mono tracking-widest text-muted opacity-0 group-hover:opacity-100 transition-opacity">VIEW &rarr;</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-charcoal mb-3 group-hover:text-blue transition-colors">
                    {service.label}
                  </h2>
                  <p className="text-sm font-light leading-relaxed text-muted">
                    {service.heroCopy}
                  </p>
                  {service.whatWeDeliver && service.whatWeDeliver.length > 0 && (
                    <ul className="mt-6 space-y-2">
                      {service.whatWeDeliver.slice(0, 3).map((item, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-muted">
                          <span className="text-blue mt-0.5 flex-shrink-0">&#x2022;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works teaser */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn>
              <p className="text-xs font-mono tracking-widest text-muted mb-4">HOW WE WORK</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight mb-6">
                Every engagement starts with a free audit.
              </h2>
              <p className="text-lg font-light leading-relaxed text-muted mb-8">
                We map your workflows, identify what&apos;s costing you time, and show you exactly what can be automated before you spend a cent.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/audit" className="inline-block rounded-md bg-charcoal text-white px-8 py-3 text-sm font-medium hover:bg-blue transition-colors">
                  Get your free audit
                </Link>
                <Link href="/process" className="inline-block rounded-md border border-charcoal text-charcoal px-8 py-3 text-sm font-medium hover:bg-surface transition-colors">
                  See how it works
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="space-y-4">
                {[
                  { num: '01', label: 'Map — we find where your time is going' },
                  { num: '02', label: 'Build — we set it up, you don\'t lift a finger' },
                  { num: '03', label: 'Flow — it runs, you don\'t have to' },
                ].map((step) => (
                  <div key={step.num} className="flex items-center gap-4 p-5 rounded-xl border border-border">
                    <span className="text-xs font-mono tracking-widest text-blue/60 flex-shrink-0">{step.num}</span>
                    <span className="text-sm font-medium text-charcoal">{step.label}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

    </div>
  )
}
