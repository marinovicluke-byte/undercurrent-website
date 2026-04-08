/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/resources', destination: '/blog', permanent: true },
      { source: '/resources/:slug', destination: '/blog/:slug', permanent: true },
      { source: '/articles', destination: '/blog', permanent: true },
      { source: '/articles/:slug', destination: '/blog/:slug', permanent: true },
    ]
  },
}

export default nextConfig
