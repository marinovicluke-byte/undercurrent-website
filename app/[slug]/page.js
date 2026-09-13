import { notFound } from 'next/navigation'
import { LOCATIONS } from '@/lib/data/locations'
import LocationPage from '@/components/pages/LocationPage'
// the six city pages keep their old body until they are redesigned; the new
// nav and footer need the shell's sheet, the old body needs the old globals
import '@/app/styles/home.css'
import '@/app/globals.css'

const DOMAIN = 'https://undercurrentautomations.com'

export const dynamicParams = false

export function generateStaticParams() {
  const locationSlugs = new Set(LOCATIONS.map(l => l.slug))

  return [
    ...LOCATIONS.map(l => ({ slug: l.slug })),
  ]
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const OG_IMAGE = `${DOMAIN}/brand/og-card.png`
  const location = LOCATIONS.find(l => l.slug === slug)
  if (location) {
    const url = `${DOMAIN}/${slug}`
    return {
      title: location.metaTitle,
      description: location.metaDescription,
      alternates: { canonical: url },
      openGraph: { title: location.metaTitle, description: location.metaDescription, url, type: 'website', images: [OG_IMAGE] },
      twitter:  { card: 'summary_large_image', title: location.metaTitle, description: location.metaDescription, images: [OG_IMAGE] },
    }
  }
  return {}
}

export default async function SlugPage({ params }) {
  const { slug } = await params
  const location = LOCATIONS.find(l => l.slug === slug)
  if (location) return <LocationPage location={location} />


  return notFound()
}
