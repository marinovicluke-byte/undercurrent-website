// lib/clusters.js — shared topic cluster metadata for /blog and /blog/cluster/[slug]

export const CLUSTERS = {
  'getting-started': {
    slug: 'getting-started',
    label: 'Getting Started',
    num: '01',
    tagline: 'Foundations for Australian SMEs new to automation.',
    // Entity-rich description for SEO (names real tools — wiki: nextjs-ai-search-framework)
    description:
      'Practical starting guides on business process automation for Australian small businesses. Covers foundational tools like Xero, n8n, Make, and Zapier, what to automate first, and how to pick a local partner without overpaying.',
    // Pillar keyword this cluster targets
    pillarKeyword: 'business automation for Australian small business',
  },
  'time-admin': {
    slug: 'time-admin',
    label: 'Time & Admin',
    num: '02',
    tagline: 'Recover the hours lost to repetitive business admin.',
    description:
      'Calculations and systems for cutting admin overhead. Uses Fair Work, ABS, and Xero data to quantify the real hourly cost of manual admin, and shows the fastest no-code automations (Zapier, Make, n8n) that Australian operators can deploy in under 30 minutes.',
    pillarKeyword: 'reduce admin time Australian small business',
  },
  'leads-sales': {
    slug: 'leads-sales',
    label: 'Leads & Sales',
    num: '03',
    tagline: 'Systems that find, qualify, and convert customers automatically.',
    description:
      'Marketing automation and lead response playbooks for Australian SMEs. Covers tools like HubSpot, ActiveCampaign, and Mailchimp, local SEO review strategies for tradies, and the lead response data behind why most enquiries are lost before the first quote.',
    pillarKeyword: 'marketing automation Australia small business',
  },
  'industry-guides': {
    slug: 'industry-guides',
    label: 'Industry Guides',
    num: '04',
    tagline: 'Sector-specific automation playbooks.',
    description:
      'Vertical-specific guides for Australian service industries. Covers accountant client onboarding workflows, Peppol e-invoicing setup for ATO compliance, and automation patterns for trades, professional services, and compliance-heavy businesses.',
    pillarKeyword: 'industry automation guides Australia',
  },
}

export const CLUSTER_ORDER = [
  'getting-started',
  'time-admin',
  'leads-sales',
  'industry-guides',
]

export function getClusterBySlug(slug) {
  return CLUSTERS[slug] || null
}

export function groupByCluster(articles) {
  return CLUSTER_ORDER.reduce((acc, key) => {
    acc[key] = articles.filter(a => a.cluster === key)
    return acc
  }, {})
}
