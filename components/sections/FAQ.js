// components/sections/FAQ.js
import FadeIn from '@/components/ui/FadeIn'
import Accordion from '@/components/ui/Accordion'
import JsonLd from '@/components/ui/JsonLd'
import { FAQ_ITEMS } from '@/lib/data/faq'

export default function FAQ() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="bg-surface py-section">
      <JsonLd schema={schema} />
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">Common questions</h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-10">
            <Accordion items={FAQ_ITEMS} defaultOpenIndex={0} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
