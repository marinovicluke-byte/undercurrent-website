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
      // '/resources/' (trailing slash) is handled in middleware.js — see comment there.
      { source: '/resources', destination: '/blog', statusCode: 301 },
      { source: '/resources/:slug', destination: '/blog/:slug', statusCode: 301 },
      { source: '/articles', destination: '/blog', statusCode: 301 },
      { source: '/articles/:slug', destination: '/blog/:slug', statusCode: 301 },
      // Case studies: singular → plural. Preserves link equity from old /case-study placeholder route.
      // Specific legacy URL first: the -case-study suffix would otherwise pass through the
      // generic rule below and land on a non-existent /case-studies/<slug>-case-study 404.
      {
        source: '/case-study/ai-content-automation-small-business-australia-case-study',
        destination: '/case-studies/ai-content-automation-small-business-australia',
        statusCode: 301,
      },
      { source: '/case-study', destination: '/case-studies', statusCode: 301 },
      { source: '/case-study/:slug', destination: '/case-studies/:slug', statusCode: 301 },

      // Legacy article URLs from the live site: case-study-suffixed URL now lives under /case-studies
      {
        source: '/blog/ai-content-automation-small-business-australia-case-study',
        destination: '/case-studies/ai-content-automation-small-business-australia',
        statusCode: 301,
      },

      // Slug rename (2026-05-15): article slug "best-ai-search-agency-australia"
      // suggested a buyer's guide but content is an industry audit. Renamed to
      // match content; old slug 301s to the new one to preserve link equity.
      {
        source: '/blog/best-ai-search-agency-australia',
        destination: '/blog/au-seo-agencies-ai-search-audit',
        statusCode: 301,
      },

      // Duplicate / variant article URLs consolidated to the canonical version
      {
        source: '/blog/getting-started-einvoicing-small-business-australia-guide',
        destination: '/blog/einvoicing-small-business-australia-guide',
        statusCode: 301,
      },
      {
        source: '/blog/getting-started-with-einvoicing-small-business-australia',
        destination: '/blog/einvoicing-small-business-australia-guide',
        statusCode: 301,
      },
      {
        source: '/blog/marketing-automation-small-business-australia',
        destination: '/blog/best-marketing-automation-software-australia-2026',
        statusCode: 301,
      },
      {
        source: '/blog/which-business-processes-automate-first-australia-2026',
        destination: '/blog/simplest-small-business-automation-tasks-australia-2026',
        statusCode: 301,
      },

      // Service slug rename (2026-04-20): website-experience-design → website-design
      {
        source: '/website-experience-design',
        destination: '/website-design',
        statusCode: 301,
      },

      // Spoke condensation (2026-05-08): front-end-experience duplicates website-design.
      // Collapsed into a single canonical page when the IA dropped to 4 spokes.
      {
        source: '/front-end-experience',
        destination: '/website-design',
        statusCode: 301,
      },

      // Ghost URL reclaim (2026-04-24): /surface-discovery never existed on this site
      // but Google found it externally. Route it to the booking CTA so any stray traffic
      // lands somewhere useful instead of a 404.
      {
        source: '/surface-discovery',
        destination: 'https://cal.com/luke-marinovic-aqeosc/30min',
        statusCode: 301,
        basePath: false,
      },

      // Retired /roi page (2026-05-25): ROI calculator removed from the IA.
      // The closest live equivalent is the automation audit, which outputs a
      // savings estimate. All inbound article links have been swapped to /audit
      // directly; this redirect catches stale external links + indexed URLs.
      { source: '/roi', destination: '/audit', statusCode: 301 },

      // Glossary URL shape migration (2026-05-25): old short-form slugs
      // (`/glossary/seo`) replaced with `/glossary/what-is-X` form. Old internal
      // links 404'd until Screaming Frog surfaced them. Map below.
      { source: '/glossary/seo', destination: '/glossary/what-is-seo', statusCode: 301 },
      { source: '/glossary/aeo', destination: '/glossary/what-is-answer-engine-optimisation', statusCode: 301 },
      { source: '/glossary/geo', destination: '/glossary/what-is-generative-engine-optimisation', statusCode: 301 },
      { source: '/glossary/aiso', destination: '/glossary/what-is-ai-search-optimisation', statusCode: 301 },
      { source: '/glossary/ai-agent', destination: '/glossary/what-is-an-ai-agent', statusCode: 301 },
      { source: '/glossary/schema-markup', destination: '/glossary/what-is-schema-markup', statusCode: 301 },
      { source: '/glossary/faq-schema', destination: '/glossary/what-is-faq-schema', statusCode: 301 },
      // No exact glossary match for ChatGPT Search yet — route to the closest
      // explainer article so traffic lands somewhere useful instead of 404.
      { source: '/glossary/chatgpt-search', destination: '/blog/how-to-rank-in-chatgpt-search', statusCode: 301 },

      // Blog article slug rename (2026-05-25): ai-search-vs-traditional-seo →
      // ai-search-vs-traditional-search-australia-2026. Old slug had 2 inbound
      // links from sibling articles; redirect preserves equity, content edits
      // below kill the redirect chain on the canonical path.
      {
        source: '/blog/ai-search-vs-traditional-seo-australia',
        destination: '/blog/ai-search-vs-traditional-search-australia-2026',
        statusCode: 301,
      },

      // Cluster taxonomy migration (2026-04-22): old topic clusters → service-aligned clusters.
      // leads-sales → lead-generation; getting-started + time-admin → foundations.
      // industry-guides slug unchanged.
      {
        source: '/blog/cluster/leads-sales',
        destination: '/blog/cluster/lead-generation',
        statusCode: 301,
      },
      {
        source: '/blog/cluster/getting-started',
        destination: '/blog/cluster/foundations',
        statusCode: 301,
      },
      {
        source: '/blog/cluster/time-admin',
        destination: '/blog/cluster/foundations',
        statusCode: 301,
      },
    ]
  },
}

export default nextConfig
