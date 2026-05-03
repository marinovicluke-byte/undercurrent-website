// Shared content for V5a service-page reference.

export const DOMAIN = 'https://undercurrentautomations.com'
export const URL    = `${DOMAIN}/sales-automation`

export const PROVIDER = {
  name:  'UnderCurrent Automations',
  url:   DOMAIN,
  logo:  `${DOMAIN}/logo.png`,
  founder: {
    name: 'Luke Marinovic',
    jobTitle: 'Founder, UnderCurrent Automations',
    url: `${DOMAIN}/about`,
  },
}

export const AREAS_SERVED = ['Melbourne', 'Victoria', 'Australia']

export const INTEGRATIONS = [
  'HubSpot', 'Pipedrive', 'Salesforce', 'Close', 'ActiveCampaign',
  'Mailchimp', 'Monday.com', 'Notion', 'Gmail', 'Outlook',
  'Microsoft 365', 'Google Workspace', 'Calendly', 'Cal.com',
  'LinkedIn Sales Navigator', 'Apollo', 'Clearbit', 'n8n', 'Zapier', 'Make',
]

export const LOCATIONS = [
  'Melbourne CBD', 'Inner East', 'Inner West', 'Bayside',
  'Sydney', 'Brisbane', 'Perth', 'Remote Australia-wide',
]

export const HERO_STATS = [
  { v: '< 5 min', k: 'Response SLA after a lead lands' },
  { v: '47 h',    k: 'Industry average response time' },
  { v: '14 days', k: 'First call to deployed system' },
  { v: '20+',     k: 'Tools we wire into directly' },
]

export const PIPELINE_STAGES = [
  { n: '01', label: 'Lead lands', sub: 'Web, Meta, Google, LinkedIn, referral' },
  { n: '02', label: 'Captured',   sub: 'Enriched, de-duped, CRM-written' },
  { n: '03', label: 'Scored',     sub: 'ICP + intent = fit score' },
  { n: '04', label: 'Routed',     sub: 'Hot → rep. Cold → nurture' },
  { n: '05', label: 'Sequenced',  sub: 'Personalised, multi-step, auto-pause' },
  { n: '06', label: 'Booked',     sub: 'Calendar held with pre-meeting brief' },
]

export const PRICING_TIERS = [
  { name: 'Foundation',   priceFrom: 'from AUD $5,000', tag: 'Single pipeline', desc: 'Capture, CRM progression, automated follow-up, reactivation. Fits a business with one primary channel.' },
  { name: 'Multi-source', priceFrom: 'from AUD $9,000', tag: 'Cross-channel',   desc: 'Multi-channel capture, lead scoring, personalised outreach, meeting booking with pre-meeting briefs.' },
  { name: 'Full system',  priceFrom: 'by quote',         tag: 'End-to-end',     desc: 'Outbound sequencing at scale, Clearbit or Apollo enrichment, Salesforce or HubSpot customisation, analytics.' },
]

export const WIKI_REFS = [
  { label: 'How AI search selects answers',        href: '/wiki/ai-search',                    kind: 'Wiki' },
  { label: 'SEO architecture for service pages',   href: '/wiki/seo',                          kind: 'Wiki' },
  { label: 'Pipeline benchmarks, Australia 2026',  href: '/wiki/pipeline',                     kind: 'Data' },
  { label: 'Customer experience automation',       href: '/customer-experience-automation',    kind: 'Service' },
  { label: 'Inbound lead management',              href: '/inbound-lead-management-melbourne', kind: 'Service' },
  { label: 'Content automation',                   href: '/content-automation',                kind: 'Service' },
]

export const TOC = [
  { id: 'what',     label: 'What is sales automation?' },
  { id: 'included', label: 'What does the build include?' },
  { id: 'who',      label: 'Who is it built for?' },
  { id: 'stack',    label: 'What tools does it work with?' },
  { id: 'process',  label: 'How does UnderCurrent build it?' },
  { id: 'compare',  label: 'How does it compare to alternatives?' },
  { id: 'pricing',  label: 'What does it cost?' },
  { id: 'timeline', label: 'How long does it take?' },
  { id: 'where',    label: 'Where does UnderCurrent operate?' },
  { id: 'faq',      label: 'Frequently asked questions' },
]

export function buildJsonLd(s) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home',     item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${DOMAIN}/services` },
      { '@type': 'ListItem', position: 3, name: s.label,    item: URL },
    ],
  }

  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${URL}#service`,
    name: 'Sales Automation',
    serviceType: 'Sales pipeline automation',
    description: 'UnderCurrent builds custom sales automation systems for Australian small businesses. Lead capture, scoring, personalised outreach, CRM progression, meeting booking and reactivation — built on HubSpot, Pipedrive, Salesforce, or the stack you already use.',
    url: URL,
    provider: {
      '@type': 'Organization',
      name: PROVIDER.name,
      url:  PROVIDER.url,
      logo: PROVIDER.logo,
      founder: { '@type': 'Person', name: PROVIDER.founder.name, jobTitle: PROVIDER.founder.jobTitle, url: PROVIDER.founder.url },
    },
    areaServed: AREAS_SERVED.map((a) => ({ '@type': 'Place', name: a })),
    audience: {
      '@type': 'BusinessAudience',
      audienceType: 'Australian small and medium businesses with inbound enquiries or outbound sales motions',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Sales automation deliverables',
      itemListElement: s.whatWeDeliver.map((item, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
    offers: {
      '@type': 'Offer',
      priceCurrency: 'AUD',
      priceRange: '$$-$$$',
      availability: 'https://schema.org/InStock',
      url: URL,
    },
  }

  const faq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROVIDER.founder.name,
    jobTitle: PROVIDER.founder.jobTitle,
    url: PROVIDER.founder.url,
    worksFor: { '@type': 'Organization', name: PROVIDER.name, url: PROVIDER.url },
  }

  return [breadcrumb, service, faq, person]
}

export const BASE_METADATA = {
  title: 'Sales Automation Australia — Custom Systems by UnderCurrent',
  description:
    'Sales automation for Australian small businesses. UnderCurrent builds custom lead capture, qualification, outreach and CRM pipeline systems — connected to HubSpot, Pipedrive, Salesforce or the tools you already use.',
  alternates: { canonical: URL },
  openGraph: {
    title: 'Sales Automation Australia — UnderCurrent',
    description: 'Custom sales automation, built on the stack you already use. Melbourne-based, Australia-wide.',
    url: URL,
    type: 'website',
    siteName: 'UnderCurrent Automations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sales Automation Australia — UnderCurrent',
    description: 'Custom sales automation for Australian small businesses.',
  },
  robots: { index: false, follow: false },
}
