import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import WhyUndercurrent from '@/components/sections/WhyUndercurrent'
import WhyAutomation from '@/components/sections/WhyAutomation'
import ServicesOverview from '@/components/sections/ServicesOverview'
import About from '@/components/sections/About'
import BeforeAfter from '@/components/sections/BeforeAfter'
import Process from '@/components/sections/Process'
import FAQ from '@/components/sections/FAQ'
import ClosingCTA from '@/components/sections/ClosingCTA'
import JsonLd from '@/components/ui/JsonLd'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnderCurrent Automations',
  url: 'https://undercurrentautomations.com',
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
      <Marquee />
      <WhyUndercurrent />
      <WhyAutomation />
      <ServicesOverview />
      <About />
      <BeforeAfter />
      <Process />
      <FAQ />
      <ClosingCTA />
    </>
  )
}
