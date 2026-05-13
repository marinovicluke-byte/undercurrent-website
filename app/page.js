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

const DOMAIN = 'https://undercurrentautomations.com'

export const metadata = {
  title: { absolute: 'AI Automation Agency Melbourne | UnderCurrent Automations' },
  description: 'UnderCurrent Automations is a Melbourne AI automation agency for Australian small businesses. SEO and AI search, custom websites, AI integrations, AI training.',
  alternates: { canonical: DOMAIN },
  openGraph: {
    title: 'AI Automation Agency Melbourne | UnderCurrent Automations',
    description: 'UnderCurrent Automations is a Melbourne AI automation agency for Australian small businesses. SEO and AI search, custom websites, AI integrations, AI training.',
    url: DOMAIN,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Automation Agency Melbourne | UnderCurrent Automations',
    description: 'UnderCurrent Automations is a Melbourne AI automation agency for Australian small businesses. SEO and AI search, custom websites, AI integrations, AI training.',
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${DOMAIN}#webpage`,
  url: DOMAIN,
  name: 'UnderCurrent Automations — AI Automation Agency for Australian Small Businesses',
  description: 'Melbourne AI automation agency serving Australia-wide.',
  isPartOf: { '@id': `${DOMAIN}#website` },
  about: { '@id': `${DOMAIN}#organization` },
  inLanguage: 'en-AU',
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={webPageSchema} />
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
