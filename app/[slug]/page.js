import { notFound } from 'next/navigation'
import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import LocationPage from '@/components/pages/LocationPage'
import ServicePage from '@/components/pages/ServicePage'

export const dynamicParams = false

export function generateStaticParams() {
  const locationSlugs = new Set(LOCATIONS.map(l => l.slug))
  const serviceSlugs = new Set(SERVICES.map(s => s.slug))

  for (const slug of locationSlugs) {
    if (serviceSlugs.has(slug)) {
      console.warn(`[slug collision] "${slug}" exists in both locations and services`)
    }
  }

  return [
    ...LOCATIONS.map(l => ({ slug: l.slug })),
    ...SERVICES.map(s => ({ slug: s.slug })),
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const location = LOCATIONS.find(l => l.slug === slug)
  if (location) {
    return {
      title: location.metaTitle,
      description: location.metaDescription,
      openGraph: { title: location.metaTitle, description: location.metaDescription },
    }
  }
  const service = SERVICES.find(s => s.slug === slug)
  if (service) {
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      openGraph: { title: service.metaTitle, description: service.metaDescription },
    }
  }
  return {}
}

export default async function SlugPage({ params }) {
  const { slug } = await params
  const location = LOCATIONS.find(l => l.slug === slug)
  if (location) return <LocationPage location={location} />

  const service = SERVICES.find(s => s.slug === slug)
  if (service) return <ServicePage service={service} />

  return notFound()
}
