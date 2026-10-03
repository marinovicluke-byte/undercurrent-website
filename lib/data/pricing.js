// lib/data/pricing.js
// Public SEO + AI search pricing. SEO is priced case by case: one "expect to
// pay around" range plus what moves it. Mirrors /blog/seo-pricing-australia-2026.
// No fixed tiers (Luke, 3 Oct 2026).
export const SEO_PRICING = {
  name: 'SEO and AI search',
  price: 'Around $500 to $2,000/mo',
  description: 'Priced case by case, depending on the work your site needs. Basic SEO starts around $500 a month. There is usually a one-off implementation fee, scoped at the start.',
  features: [
    'Articles: how many you need each month',
    'Site architecture: how much restructuring your site needs',
    'Ongoing management: reporting, Google Business Profile upkeep, technical fixes',
  ],
}

// Google Ads management (Luke, 3 Oct 2026): a monthly minimum, ad spend on top.
// No tiers, no performance bonus.
export const GOOGLE_ADS_PRICING = {
  name: 'Google Ads management',
  price: 'From $500/mo',
  description: 'Google Ads management starts at $500 a month, minimum. Ad spend is on top of that fee, and you pay it to Google.',
}
