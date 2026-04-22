// lib/clusters.js — shared topic cluster metadata for /blog and /blog/cluster/[slug]
// 8 clusters: 6 service-aligned + Industry Guides (cross-cutting) + Foundations (top-of-funnel).
// Each service cluster maps to a pillar service page via `pillarPage` for internal linking.

export const CLUSTERS = {
  'lead-generation': {
    slug: 'lead-generation',
    label: 'Lead Generation',
    num: '01',
    tagline: 'Fill your pipeline without the manual grind.',
    description:
      'Lead generation playbooks for Australian small businesses. Covers AI cold email, outbound sequences, instant lead response, and marketing automation tools (HubSpot, ActiveCampaign, Mailchimp) that fill the pipeline without manual follow-up.',
    pillarKeyword: 'lead generation automation Australia small business',
    pillarPage: '/inbound-lead-management-melbourne',
    accent: 'blue',
  },
  'revenue-operations': {
    slug: 'revenue-operations',
    label: 'Revenue Operations',
    num: '02',
    tagline: 'Close more. Keep more. Grow faster.',
    description:
      'Revenue operations guides for Australian SMEs. CRM hygiene, automated follow-up, proposal workflows, review generation, and cash flow recovery so no lead or invoice slips through.',
    pillarKeyword: 'revenue operations Australian small business',
    pillarPage: '/sales-automation',
    accent: 'orange',
  },
  'website-experience-design': {
    slug: 'website-experience-design',
    label: 'Website Experience Design',
    num: '03',
    tagline: 'The face of your business, built to convert.',
    description:
      'Website, portal, booking system, and dashboard playbooks for Australian businesses. Performance, trust, and conversion patterns for marketing sites and client portals.',
    pillarKeyword: 'website design Australian small business',
    pillarPage: '/website-design',
    accent: 'sage',
  },
  'seo-ai-visibility': {
    slug: 'seo-ai-visibility',
    label: 'SEO & AI Visibility',
    num: '04',
    tagline: 'Rank everywhere your buyers are looking.',
    description:
      'Classic SEO plus AEO (answer-engine optimisation) and GEO (generative engine optimisation). How Australian service businesses earn rankings in Google and citations in ChatGPT, Perplexity, and Claude.',
    pillarKeyword: 'SEO AI visibility Australia',
    pillarPage: '/seo-ai-visibility',
    accent: 'blue',
  },
  'ai-strategy-training': {
    slug: 'ai-strategy-training',
    label: 'AI Strategy & Training',
    num: '05',
    tagline: 'The right tools. The right way.',
    description:
      'AI adoption playbooks for Australian SMEs — 90-day roadmaps, tool selection audits, and team training so small teams use AI with confidence. Covers the decisions behind which tools to pick and how to roll them out.',
    pillarKeyword: 'AI strategy training Australian small business',
    pillarPage: '/ai-strategy-training',
    accent: 'orange',
  },
  'custom-integrations': {
    slug: 'custom-integrations',
    label: 'Custom Integrations',
    num: '06',
    tagline: 'Connect everything.',
    description:
      'Custom integration patterns for Australian SMEs. n8n, Make, Zapier, and direct API builds that connect Xero, HubSpot, Stripe, and the tools your business already runs.',
    pillarKeyword: 'custom API integrations Australia small business',
    pillarPage: '/custom-integrations',
    accent: 'sage',
  },
  'industry-guides': {
    slug: 'industry-guides',
    label: 'Industry Guides',
    num: '07',
    tagline: 'Sector-specific automation playbooks.',
    description:
      'Vertical-specific guides for Australian service industries. Accountant client onboarding, Peppol e-invoicing for ATO compliance, and automation patterns for trades, professional services, and compliance-heavy businesses.',
    pillarKeyword: 'industry automation guides Australia',
    pillarPage: null,
    accent: null,
  },
  'foundations': {
    slug: 'foundations',
    label: 'Foundations',
    num: '08',
    tagline: 'What automation is, what it costs, and where to start.',
    description:
      'Starting points for Australian small businesses new to automation. What business process automation actually means, how much manual work is costing you, and the simplest tasks to automate first.',
    pillarKeyword: 'business automation for Australian small business',
    pillarPage: null,
    accent: null,
  },
}

export const CLUSTER_ORDER = [
  'lead-generation',
  'revenue-operations',
  'website-experience-design',
  'seo-ai-visibility',
  'ai-strategy-training',
  'custom-integrations',
  'industry-guides',
  'foundations',
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
