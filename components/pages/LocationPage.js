// Server wrapper for location pages.
// JSON-LD is rendered here (guaranteed server-side), then the content
// renderer is mounted below. Emits LocalBusiness + FAQPage + HowTo +
// BreadcrumbList + Service schemas, bound back to the sitewide Organization
// node via @id so AI crawlers can resolve the entity graph.
// See docs/seo-aio-audit-2026-04-20.md — P0-03.

import JsonLd from '@/components/ui/JsonLd'
import LocationPageClient from './LocationPageClient'

const DOMAIN = 'https://undercurrentautomations.com'

// Plain text mirror of the three-step process used on every location page.
// Duplicated server-side so HowTo schema stays SSR'd without pulling JSX.
const DEFAULT_STEPS_TEXT = [
  {
    label: 'Workflow review',
    copy: 'A free 30-minute session where we map every repetitive task in your business, rank by time saved, and show you exactly what automation looks like.',
  },
  {
    label: 'Fixed-price build',
    copy: 'Scope, timeline, fixed price. No surprises, no hourly billing. Built inside tools you already use, live within 14 days.',
  },
  {
    label: 'Handoff and handle',
    copy: 'You get a documented, running system plus an optional retainer for monitoring and iteration. Most clients see compounding returns.',
  },
]

function buildLocationJsonLd(location) {
  const url = `${DOMAIN}/${location.slug}`
  const steps = (location.processSteps && location.processSteps.length
    ? location.processSteps.map(s => ({ label: s.title, copy: s.body }))
    : DEFAULT_STEPS_TEXT)

  const isNational = location.region === 'AU'

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${url}#business`,
      name: `UnderCurrent Automations, ${location.city}`,
      description: location.metaDescription,
      url,
      address: {
        '@type': 'PostalAddress',
        addressLocality: isNational ? 'Melbourne' : location.city,
        addressRegion: isNational ? 'VIC' : location.region,
        addressCountry: 'AU',
      },
      areaServed: isNational
        ? { '@type': 'Country', name: 'Australia' }
        : [
            { '@type': 'City', name: location.city },
            { '@type': 'Country', name: 'Australia' },
          ],
      serviceType: [
        'AI Business Automation',
        'Workflow Automation',
        'Business Process Automation',
        'Lead Generation Automation',
        'Sales Automation',
      ],
      parentOrganization: { '@id': `${DOMAIN}#organization` },
      provider: { '@id': `${DOMAIN}#organization` },
      priceRange: 'AUD',
      telephone: '+61438780815',
      email: 'luke@undercurrentautomations.com',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      '@id': `${url}#service`,
      name: `AI Automation for ${location.city} Businesses`,
      description: location.metaDescription,
      serviceType: 'AI Business Automation',
      provider: { '@id': `${DOMAIN}#organization` },
      areaServed: isNational
        ? { '@type': 'Country', name: 'Australia' }
        : { '@type': 'City', name: location.city },
      audience: {
        '@type': 'BusinessAudience',
        audienceType: 'Australian small businesses',
      },
      offers: {
        '@type': 'Offer',
        url,
        availability: 'https://schema.org/InStock',
        priceCurrency: 'AUD',
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'AUD',
          description: 'Value-based pricing, scoped per engagement after a free workflow review.',
        },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: location.faqs.map(f => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'HowTo',
      '@id': `${url}#howto`,
      name: `How to Automate a ${location.city} Small Business with UnderCurrent`,
      description: `Three steps to roll out AI automation for a ${location.city} small business.`,
      totalTime: 'P14D',
      step: steps.map((s, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: s.label,
        text: s.copy,
      })),
      provider: { '@id': `${DOMAIN}#organization` },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumbs`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
        { '@type': 'ListItem', position: 2, name: `AI Automation ${location.city}`, item: url },
      ],
    },
  ]
}

export default function LocationPage({ location }) {
  const jsonLd = buildLocationJsonLd(location)
  return (
    <>
      {jsonLd.map((schema, i) => (
        <JsonLd key={i} schema={schema} />
      ))}
      <LocationPageClient location={location} />
    </>
  )
}
