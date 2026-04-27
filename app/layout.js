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
    default: 'UnderCurrent Automations — AI Automation Melbourne',
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
    foundingDate: '2026-03-07',
    taxID: '23 368 496 814',
    email: 'luke@undercurrentautomations.com',
    telephone: '+61438780815',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: '+61438780815',
        email: 'luke@undercurrentautomations.com',
        availableLanguage: ['English'],
        areaServed: 'AU',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: 'luke@undercurrentautomations.com',
        availableLanguage: ['English'],
        areaServed: 'AU',
      },
    ],
    areaServed: [
      { '@type': 'Place', name: 'Melbourne' },
      { '@type': 'Place', name: 'Sydney' },
      { '@type': 'Place', name: 'Brisbane' },
      { '@type': 'Place', name: 'Perth' },
      { '@type': 'Place', name: 'Adelaide' },
      { '@type': 'Place', name: 'Canberra' },
      { '@type': 'Place', name: 'Victoria' },
      { '@type': 'Place', name: 'Australia' },
    ],
    sameAs: [
      'https://www.linkedin.com/company/undercurrent-automations/',
      'https://www.linkedin.com/in/lukemarinovic/',
      'https://x.com/UC_Automations',
      'https://www.instagram.com/undercurrent.automations/',
      'https://www.facebook.com/profile.php?id=61578553167947',
      'https://www.google.com/maps/place/Undercurrent+Automations/data=!4m2!3m1!1s0x0:0xfa88043129a24340',
      'https://clutch.co/profile/undercurrent-automations',
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
    telephone: '+61438780815',
    email: 'luke@undercurrentautomations.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Melbourne',
      addressRegion: 'VIC',
      addressCountry: 'AU',
    },
    areaServed: [
      { '@type': 'Place', name: 'Melbourne' },
      { '@type': 'Place', name: 'Sydney' },
      { '@type': 'Place', name: 'Brisbane' },
      { '@type': 'Place', name: 'Perth' },
      { '@type': 'Place', name: 'Adelaide' },
      { '@type': 'Place', name: 'Canberra' },
      { '@type': 'Place', name: 'Victoria' },
      { '@type': 'Place', name: 'Australia' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '17:00',
      },
    ],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -37.8136,
      longitude: 144.9631,
    },
    hasMap: 'https://www.google.com/maps/place/Undercurrent+Automations/data=!4m2!3m1!1s0x0:0xfa88043129a24340',
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
