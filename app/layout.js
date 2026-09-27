// app/layout.js — the root shell for the 2026 design. Inter via next/font, the
// sitewide JSON-LD, analytics. Nav and Footer are the sandbox's, on every page.
// Each page imports its own stylesheet (app/styles/*.css) and links are plain
// anchors, so a page's sheet never leaks into the next one.
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600'],
})

export const metadata = {
  metadataBase: new URL('https://undercurrentautomations.com'),
  title: {
    default: 'UnderCurrent Automations — AI Search and Automation Agency Australia',
    template: '%s | UnderCurrent Automations',
  },
  description: 'UnderCurrent Automations is an AI search and automation agency for Australian small business. SEO and AI visibility, custom workflows, websites and integrations. Built in Melbourne, working Australia-wide.',
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
    image: `${DOMAIN}/brand/og-card.png`,
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
    <html lang="en-AU" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        {/* the reveal is gated on .js so a fetcher that runs no script reads every line (transfer note 2) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        {siteJsonLd.map((obj, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(obj) }}
          />
        ))}
        {process.env.NEXT_PUBLIC_AHREFS_KEY && (
          <script
            src="https://analytics.ahrefs.com/analytics.js"
            data-key={process.env.NEXT_PUBLIC_AHREFS_KEY}
            async
          />
        )}
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
        <Analytics />
        <SpeedInsights />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        {process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID && (
          <Script
            id="microsoft-clarity"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID}");`,
            }}
          />
        )}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <Script
            id="posthog-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing clear_opt_in_out_capturing reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty createPersonProfile debug".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);posthog.init("${process.env.NEXT_PUBLIC_POSTHOG_KEY}",{api_host:"${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'}",defaults:"2026-01-30",person_profiles:"identified_only"});`,
            }}
          />
        )}
      </body>
    </html>
  )
}
