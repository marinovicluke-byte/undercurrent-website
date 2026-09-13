import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  // Disable the automatic trailing-slash 308 so proxy.js can single-hop /resources/ → /blog.
  // Routes still render for both /foo and /foo/ variants; canonical <link> tags and the sitemap
  // keep the no-slash form as the indexed URL, so duplicate-content risk stays bounded.
  skipTrailingSlashRedirect: true,
  // Site-wide security headers (added 2026-05-25 after Screaming Frog flagged
  // 169 URLs missing baseline headers). CSP is intentionally permissive enough
  // to keep Vercel Analytics, Google Analytics, Clarity, Ahrefs, and inline
  // JSON-LD working; tighten further once the next iteration drops 'unsafe-inline'.
  async headers() {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.clarity.ms https://analytics.ahrefs.com https://va.vercel-scripts.com https://vercel.live",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://*.clarity.ms https://analytics.ahrefs.com https://vitals.vercel-insights.com https://va.vercel-scripts.com https://vercel.live wss://vercel.live",
      "frame-src 'self' https://cal.com https://app.cal.com https://vercel.live",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join('; ')
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
    ]
  },
  async redirects() {
    return [
      // '/resources/' (trailing slash) is handled in proxy.js — see comment there.
      { source: '/resources', destination: '/blog', statusCode: 301 },
      { source: '/resources/:slug', destination: '/blog/:slug', statusCode: 301 },
      { source: '/articles', destination: '/blog', statusCode: 301 },
      { source: '/articles/:slug', destination: '/blog/:slug', statusCode: 301 },

      // Redesign cutover (2026-09): the site collapsed to four service pages.
      // Every old service slug lands on the page that now sells that work.
      ...['customer-experience-automation', 'sales-automation', 'content-automation', 'personal-system-automation',
        'finance-automation', 'inbound-lead-management-melbourne', 'custom-integrations']
        .map(s => ({ source: `/${s}`, destination: '/automation', statusCode: 301 })),
      ...['website-design', 'website-experience-design', 'front-end-experience']
        .map(s => ({ source: `/${s}`, destination: '/website', statusCode: 301 })),
      { source: '/seo-ai-visibility', destination: '/seo', statusCode: 301 },
      { source: '/ai-strategy-training', destination: '/consulting', statusCode: 301 },
      { source: '/services', destination: '/', statusCode: 301 },
      { source: '/services/:path*', destination: '/', statusCode: 301 },
      { source: '/process', destination: '/', statusCode: 301 },

      // Discontinued: the audit tool, the missed-revenue calculator, the ROI page
      { source: '/audit', destination: '/contact', statusCode: 301 },
      { source: '/audit/:path*', destination: '/contact', statusCode: 301 },
      { source: '/missed-revenue', destination: '/contact', statusCode: 301 },
      { source: '/roi', destination: '/contact', statusCode: 301 },

      // Discontinued: case studies (both the old singular and the plural paths, and the
      // one that once lived under /blog). The blog carries the work now.
      { source: '/case-study', destination: '/blog', statusCode: 301 },
      { source: '/case-study/:slug', destination: '/blog', statusCode: 301 },
      { source: '/case-studies', destination: '/blog', statusCode: 301 },
      { source: '/case-studies/:slug', destination: '/blog', statusCode: 301 },
      { source: '/blog/ai-content-automation-small-business-australia-case-study', destination: '/blog', statusCode: 301 },

      // Blog cluster pillars: the index now files every article under its category
      { source: '/blog/cluster/:slug', destination: '/blog', statusCode: 301 },

      // Slug rename (2026-05-15): article slug "best-ai-search-agency-australia"
      // suggested a buyer's guide but content is an industry audit.
      { source: '/blog/best-ai-search-agency-australia', destination: '/blog/au-seo-agencies-ai-search-audit', statusCode: 301 },

      // Duplicate / variant article URLs consolidated to the canonical version
      { source: '/blog/getting-started-einvoicing-small-business-australia-guide', destination: '/blog/einvoicing-small-business-australia-guide', statusCode: 301 },
      { source: '/blog/getting-started-with-einvoicing-small-business-australia', destination: '/blog/einvoicing-small-business-australia-guide', statusCode: 301 },
      { source: '/blog/marketing-automation-small-business-australia', destination: '/blog/best-marketing-automation-software-australia-2026', statusCode: 301 },
      { source: '/blog/which-business-processes-automate-first-australia-2026', destination: '/blog/simplest-small-business-automation-tasks-australia-2026', statusCode: 301 },
      { source: '/blog/ai-search-vs-traditional-seo-australia', destination: '/blog/ai-search-vs-traditional-search-australia-2026', statusCode: 301 },

      // Ghost URL reclaim (2026-04-24): /surface-discovery never existed on this site
      // but Google found it externally. Route it to the booking CTA.
      { source: '/surface-discovery', destination: 'https://cal.com/luke-marinovic-aqeosc/30min', statusCode: 301, basePath: false },

      // Glossary URL shape migration (2026-05-25): old short-form slugs
      { source: '/glossary/seo', destination: '/glossary/what-is-seo', statusCode: 301 },
      { source: '/glossary/aeo', destination: '/glossary/what-is-answer-engine-optimisation', statusCode: 301 },
      { source: '/glossary/geo', destination: '/glossary/what-is-generative-engine-optimisation', statusCode: 301 },
      { source: '/glossary/aiso', destination: '/glossary/what-is-ai-search-optimisation', statusCode: 301 },
      { source: '/glossary/ai-agent', destination: '/glossary/what-is-an-ai-agent', statusCode: 301 },
      { source: '/glossary/schema-markup', destination: '/glossary/what-is-schema-markup', statusCode: 301 },
      { source: '/glossary/faq-schema', destination: '/glossary/what-is-faq-schema', statusCode: 301 },
      { source: '/glossary/chatgpt-search', destination: '/blog/how-to-rank-in-chatgpt-search', statusCode: 301 },
    ]
  },
}

export default nextConfig
