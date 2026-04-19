// New service definitions — 6 disciplines aligned to the redesign
export const SERVICES_V2 = [
  {
    num: '01',
    name: 'Lead Generation',
    tagline: 'Fill your pipeline without the manual grind.',
    slug: 'lead-generation',
    desc: 'Paid ad campaigns, SEO-ready content, outbound sequences, and lead scraping — all working together to bring qualified buyers directly to you.',
  },
  {
    num: '02',
    name: 'Revenue Operations',
    tagline: 'Close more. Keep more. Grow faster.',
    slug: 'revenue-operations',
    desc: 'CRM setup, automated follow-up, proposal and contract workflows, invoicing, and pipeline reporting — so no lead ever slips through the cracks.',
  },
  {
    num: '03',
    name: 'Front End Experience',
    tagline: 'The face of your business, built to convert.',
    slug: 'front-end-experience',
    desc: 'Websites, client portals, booking systems, and dashboards. Built for performance, built for trust, and connected to your back-end stack.',
  },
  {
    num: '04',
    name: 'Surface & Discovery',
    tagline: 'Rank everywhere your buyers are looking.',
    slug: 'surface-discovery',
    desc: 'Classic SEO plus AEO and GEO — earning rankings in Google and citations in ChatGPT, Perplexity and Claude.',
  },
  {
    num: '05',
    name: 'AI Strategy & Training',
    tagline: 'The right tools. The right way.',
    slug: 'ai-strategy-training',
    desc: 'Roadmaps, tool selection, and hands-on training so your team uses AI with confidence — without wasting months figuring it out alone.',
  },
  {
    num: '06',
    name: 'Custom Integrations',
    tagline: 'Connect everything.',
    slug: 'custom-integrations',
    desc: "If your tools don't talk to each other, we fix it. n8n, Make, Zapier, direct APIs — we wire up your entire stack so data flows where it should.",
  },
]

export const SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UnderCurrent Automations — AI Automation Services',
  description: 'AI automation services for Australian small businesses. Six disciplines covering lead generation, revenue operations, front end experience, discovery, AI strategy, and custom integrations.',
  url: 'https://undercurrentautomations.com/services',
  itemListElement: SERVICES_V2.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.name,
    description: s.desc,
    url: `https://undercurrentautomations.com/services/${s.slug}`,
  })),
}
