// app/page.js
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import ProblemFrame from '@/components/sections/ProblemFrame'
import ServicesOverview from '@/components/sections/ServicesOverview'
import IndustryScroller from '@/components/sections/IndustryScroller'
import Process from '@/components/sections/Process'
import ComparisonTable from '@/components/sections/ComparisonTable'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'
import JsonLd from '@/components/ui/JsonLd'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnderCurrent Automations',
  url: 'https://undercurrentautomations.com.au',
  description: 'AI automation for small businesses in Australia.',
  areaServed: 'Australia',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={orgSchema} />
      <Hero />
      <TrustStrip />
      <ProblemFrame />
      <ServicesOverview />
      <IndustryScroller />
      <Process />
      <ComparisonTable />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  )
}
