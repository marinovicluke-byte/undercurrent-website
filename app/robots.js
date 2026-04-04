export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/audit/report'],
      },
    ],
    sitemap: 'https://undercurrentautomations.com.au/sitemap.xml',
  }
}
