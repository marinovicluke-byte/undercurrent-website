// lib/data/pricing.js
// Public SEO + AI search retainer tiers. Mirrors the full breakdown in
// /blog/seo-pricing-australia-2026 — the article covers all five tiers; this
// surface keeps the public choice points to the three most common entry sizes.
// Foundation is the entry hook, Local + PPC is the most common starting tier,
// National anchors the premium end so visitors see the full spectrum.
export const PRICING_TIERS = [
  {
    name: 'Foundation',
    price: '$1,000/mo',
    description: 'Entry tier for businesses just getting started in AI search. Technical fixes, schema, and a small content cadence to lay the groundwork.',
    features: [
      '2 articles / month',
      '2 service or location pages / month',
      'Schema + technical fixes',
      'Quarterly performance bonus',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/luke-marinovic-aqeosc/30min?tier=foundation' },
  },
  {
    name: 'Local + PPC',
    price: '$2,800/mo',
    description: 'Full Local tier including Google Ads / PPC alongside organic SEO and AI search. Most common starting point for committed Australian SMBs.',
    features: [
      '8 articles / month',
      '4 service or location pages / month',
      'Google Ads / PPC included',
      'GBP + Apple Business + FAQ schema',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/luke-marinovic-aqeosc/30min?tier=local' },
    featured: true,
  },
  {
    name: 'National',
    price: '$9,500/mo',
    description: 'Multi-location, multi-vertical scope with active link building, deep AI search monitoring, and bi-weekly strategy.',
    features: [
      '18 articles / month',
      '8 service or location pages / month',
      'Up to 10 GBP locations',
      '4-6 high-DR links / month',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/luke-marinovic-aqeosc/30min?tier=national' },
  },
]
