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
      'Lead generation playbooks for Australian SMBs. Cold email, outbound sequences, instant lead response, and the automation stack that fills your pipeline.',
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
      'Revenue operations guides for Australian SMEs. CRM hygiene, automated follow-up, proposals, review generation, and cash flow recovery.',
    intro:
      'Revenue operations is the unglamorous work that decides whether a small business actually grows. CRMs go stale within weeks of go-live. Overdue invoices quietly cost Australian SMEs 30 to 60 days of working capital. Reviews trickle in by accident instead of arriving on schedule. The guides in this cluster walk through the systems that fix each leak: automated follow-up cadences in HubSpot or ServiceM8, AI-drafted proposals that go out the same day, review-request automation that runs after every job, and overdue-invoice chasers wired into Xero. None of these need a full RevOps hire to deploy. They need a stack that talks to itself and a small set of decisions about who gets nudged when.',
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
      'Website, portal, and booking playbooks for Australian SMBs. Performance, trust, and conversion patterns for marketing sites and client portals.',
    intro:
      'Most Australian small business websites are templated, slow, and built once then ignored. The guides in this cluster cover the architectural choices that change that. What custom builds buy you that templates do not when it comes to ranking in Google and getting cited by ChatGPT. Why Core Web Vitals decide whether your tradie quote form converts on a 4G phone in regional Victoria. How a thin client portal removes the back-and-forth that eats your week. What schema markup needs to be on every page if you want AI Overviews and Perplexity to name your business as the answer. Every guide assumes you would rather own the site than rent it from a platform.',
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
      'SEO plus AEO and GEO. How Australian service businesses earn rankings in Google and citations in ChatGPT, Perplexity, and Claude.',
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
      'AI adoption playbooks for Australian SMEs. 90-day roadmaps, tool selection audits, and team training so small teams use AI with confidence.',
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
      'Custom integration patterns for Australian SMEs. n8n, Make, Zapier, and direct API builds connecting Xero, HubSpot, Stripe, and your stack.',
    intro:
      'Every Australian SMB ends up running ten to fifteen tools. Xero, HubSpot or Pipedrive, ServiceM8 or Jobber, Stripe, Google Workspace, a calendar, a phone system, a few one-off SaaS apps. None of them talk to each other out of the box. The guides in this cluster cover the integration patterns that turn that scatter into a single working stack. When n8n beats Zapier on price and flexibility. Why Make sits in between for visual workflows you want to hand off. When to skip all three and write a direct API call from a tiny Modal or Cloudflare worker. How to wire AI agents into the gaps so the stack handles edge cases instead of paging a human. The guides assume you would rather own the integrations than pay per task forever.',
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
      'Vertical guides for Australian service industries. Accountant onboarding, Peppol e-invoicing, automation for trades and professional services.',
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
      'Starting points for Australian SMBs new to automation. What business process automation means, what manual work costs you, and what to automate first.',
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
