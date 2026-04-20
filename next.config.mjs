import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      { source: '/resources', destination: '/blog', permanent: true },
      { source: '/resources/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/articles', destination: '/blog', permanent: true },
      { source: '/articles/:slug', destination: '/blog/:slug', permanent: true },
      // Case studies: singular → plural. Preserves link equity from old /case-study placeholder route.
      { source: '/case-study', destination: '/case-studies', permanent: true },
      { source: '/case-study/:slug', destination: '/case-studies/:slug', permanent: true },

      // Legacy article URLs from the live site: case-study-suffixed URL now lives under /case-studies
      {
        source: '/blog/ai-content-automation-small-business-australia-case-study',
        destination: '/case-studies/ai-content-automation-small-business-australia',
        permanent: true,
      },

      // Duplicate / variant article URLs consolidated to the canonical version
      {
        source: '/blog/getting-started-einvoicing-small-business-australia-guide',
        destination: '/blog/einvoicing-small-business-australia-guide',
        permanent: true,
      },
      {
        source: '/blog/getting-started-with-einvoicing-small-business-australia',
        destination: '/blog/einvoicing-small-business-australia-guide',
        permanent: true,
      },
      {
        source: '/blog/marketing-automation-small-business-australia',
        destination: '/blog/best-marketing-automation-software-australia-2026',
        permanent: true,
      },
      {
        source: '/blog/which-business-processes-automate-first-australia-2026',
        destination: '/blog/simplest-small-business-automation-tasks-australia-2026',
        permanent: true,
      },

      // Service slug rename (2026-04-20): website-experience-design → website-design
      {
        source: '/website-experience-design',
        destination: '/website-design',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
