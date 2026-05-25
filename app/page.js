import Hero from '@/components/sections/Hero'
import Marquee from '@/components/sections/Marquee'
import CompetitiveReality from '@/components/sections/CompetitiveReality'
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
  title: { absolute: 'AI Search & Automation Australia | UnderCurrent Automations' },
  description: 'AI search and automation agency for Australian small business. SEO and AI visibility, custom workflows, websites and integrations. Built in Melbourne, working Australia-wide.',
  alternates: { canonical: DOMAIN },
  openGraph: {
    title: 'AI Search & Automation Australia | UnderCurrent Automations',
    description: 'AI search and automation agency for Australian small business. SEO and AI visibility, custom workflows, websites and integrations. Built in Melbourne, working Australia-wide.',
    url: DOMAIN,
    type: 'website',
    images: ['/brand/og-card.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Search & Automation Australia | UnderCurrent Automations',
    description: 'AI search and automation agency for Australian small business. SEO, AI visibility, automation, websites and integrations.',
  },
}

const webPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': `${DOMAIN}#webpage`,
  url: DOMAIN,
  name: 'UnderCurrent Automations — AI Search and Automation Agency for Australian Small Business',
  description: 'AI search and automation agency for Australian small business. Built in Melbourne, working Australia-wide.',
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
      <CompetitiveReality />
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
