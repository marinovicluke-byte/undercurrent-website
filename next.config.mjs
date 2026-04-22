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
