// app/layout.js
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const satoshi = localFont({
  src: [
    { path: '../public/fonts/Satoshi-Variable.woff2', style: 'normal', weight: '300 900' },
    { path: '../public/fonts/Satoshi-VariableItalic.woff2', style: 'italic', weight: '300 900' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://undercurrentautomations.com'),
  title: {
    default: 'UnderCurrent | AI Automation Agency for Australian Small Businesses | Melbourne',
    template: '%s | UnderCurrent Automations',
  },
  description: 'UnderCurrent is an AI automation agency in Melbourne. Lead gen, revenue ops, websites, AI search, SEO, strategy and integrations for Australian small businesses.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'UnderCurrent',
    images: [
      {
        url: '/brand/og-card.png',
        width: 1200,
        height: 630,
        alt: 'UnderCurrent Automations',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/brand/og-card.png'],
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: [{ url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const DOMAIN = 'https://undercurrentautomations.com'

// Sitewide JSON-LD. Applies to every page via root layout.
// Organization + LocalBusiness + WebSite stacked for max entity coverage per
// vault/Research/wiki/seo-aio/nextjs-ai-search-framework.md §2.
const siteJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${DOMAIN}#organization`,
    name: 'UnderCurrent Automations',
    alternateName: 'UnderCurrent',
    url: DOMAIN,
    logo: `${DOMAIN}/logo.png`,
    description: 'Melbourne AI automation agency. Custom workflow, sales, content and ops automation for Australian small businesses.',
    founder: {
      '@type': 'Person',
      name: 'Luke Marinovic',
      jobTitle: 'Founder, UnderCurrent Automations',
      url: `${DOMAIN}/about`,
      sameAs: ['https://www.linkedin.com/in/lukemarinovic/'],
    },
    foundingDate: '2026',
    areaServed: [
      { '@type': 'Place', name: 'Melbourne' },
      { '@type': 'Place', name: 'Victoria' },
      { '@type': 'Place', name: 'Australia' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/undercurrent-automations/',
      'https://www.linkedin.com/in/lukemarinovic/',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${DOMAIN}#localbusiness`,
    name: 'UnderCurrent Automations',
    url: DOMAIN,
    logo: `${DOMAIN}/logo.png`,
    image: `${DOMAIN}/logo.png`,
    description: 'Melbourne AI automation agency serving Australian small businesses.',
    priceRange: '$$-$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'Place', name: 'Melbourne' },
      { '@type': 'Place', name: 'Victoria' },
      { '@type': 'Place', name: 'Australia' },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 144.9631,
    },
    parentOrganization: { '@id': `${DOMAIN}#organization` },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DOMAIN}#website`,
    url: DOMAIN,
    name: 'UnderCurrent Automations',
    publisher: { '@id': `${DOMAIN}#organization` },
    inLanguage: 'en-AU',
  },
]

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${satoshi.variable}`}>
      <head>
        {siteJsonLd.map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        ))}
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
