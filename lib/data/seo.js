// Shared SEO + JSON-LD constants for service pages.
// Sitewide Organization/LocalBusiness/WebSite lives in app/layout.js and is
// referenced via @id — do not redefine those nodes here.

export const DOMAIN = 'https://undercurrentautomations.com'

export const PROVIDER = {
  name: 'UnderCurrent Automations',
  url: DOMAIN,
  logo: `${DOMAIN}/logo.png`,
  founder: {
    name: 'Luke Marinovic',
    jobTitle: 'Founder, UnderCurrent Automations',
    url: `${DOMAIN}/about`,
    sameAs: ['https://www.linkedin.com/in/lukemarinovic/'],
  },
}

export const AREAS_SERVED = [
  'Melbourne', 'Sydney', 'Brisbane', 'Perth', 'Adelaide', 'Canberra',
  'Victoria', 'New South Wales', 'Queensland', 'Western Australia',
  'South Australia', 'Australian Capital Territory', 'Australia',
]

export const LOCATIONS = [
  'Melbourne CBD', 'Inner East', 'Inner West', 'Bayside',
  'Sydney', 'Brisbane', 'Perth', 'Remote Australia-wide',
]

export const WIKI_REFS = [
  { label: 'How AI search selects answers',      href: '/wiki/ai-search', kind: 'Wiki' },
  { label: 'SEO architecture for service pages', href: '/wiki/seo',       kind: 'Wiki' },
]
