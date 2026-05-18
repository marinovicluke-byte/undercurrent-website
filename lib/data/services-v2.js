// 4 spokes — primary IA. One source of truth for the homepage ServicesOverview
// and the /services hub. Slugs map to existing /[slug] detail pages so old
// URLs and SEO equity are preserved.
export const SERVICES_V2 = [
  {
    num: '01',
    name: 'Search ecosystem',
    titleAccentWord: 'ecosystem',
    tagline: 'Rank everywhere your buyers are looking.',
    slug: 'seo-ai-visibility',
    accent: 'blue',
    desc: 'Our search ecosystem. SEO, AEO (AI search), PPC, and Maps and Places — wired together so the same work earns Google rankings, ChatGPT citations, and local visibility at once.',
    bullets: ['Classic SEO foundations', 'Answer-engine and AI search', 'PPC, Maps and Places'],
  },
  {
    num: '02',
    name: 'Website Design',
    titleAccentWord: 'Design',
    tagline: 'The face of your business, built to convert.',
    slug: 'website-design',
    accent: 'sage',
    desc: 'Marketing sites, custom dashboards, booking flows and client portals. Built on Next.js, wired to your CRM, calendar and payment stack.',
    bullets: ['Marketing sites', 'Custom dashboards', 'Booking and client portals'],
  },
  {
    num: '03',
    name: 'Custom Integrations',
    titleAccentWord: 'Integrations',
    tagline: 'Connect everything.',
    slug: 'custom-integrations',
    accent: 'orange',
    desc: "If your tools don't talk to each other, we fix it. n8n, Make, Zapier, direct APIs — sales, CX, content, finance and ops automations wired into one stack.",
    bullets: ['Bespoke API integrations', 'Multi-tool agent systems', 'Sales, CX, content, finance and ops'],
  },
  {
    num: '04',
    name: 'AI Strategy & Training',
    titleAccentWord: 'Training',
    tagline: 'The right tools. The right way.',
    slug: 'ai-strategy-training',
    accent: 'orange',
    desc: 'Roadmaps, tool selection, and hands-on training so your team uses AI with confidence — without wasting months figuring it out alone.',
    bullets: ['90-day AI roadmaps', 'Team workshops', 'Tool selection audits'],
  },
]

export const SERVICES_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'UnderCurrent Automations — Services',
  description: 'Four spokes covering search visibility, website design, custom integrations, and AI strategy and training for Australian small businesses.',
  url: 'https://undercurrentautomations.com/services',
  itemListElement: SERVICES_V2.map((s, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: s.name,
    description: s.desc,
    url: `https://undercurrentautomations.com/${s.slug}`,
  })),
}
