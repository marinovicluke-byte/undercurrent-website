// app/layout.js — the root shell for the 2026 design. Inter via next/font/local, the
// sitewide JSON-LD, analytics. Nav and Footer are the sandbox's, on every page.
// Each page imports its own stylesheet (app/styles/*.css) and links are plain
// anchors, so a page's sheet never leaks into the next one.
import localFont from 'next/font/local'
import './fonts/inter/inter-fallback.css'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'
import Nav from '@/components/site/Nav'
import Footer from '@/components/site/Footer'

// Inter, self-hosted (3 Oct 2026): the build used to fetch it from Google
// (next/font/google) and failed now and then on the fetch. These are the files
// Google serves for Inter 300 to 600, one variable file per subset, declared in
// Google's order with Google's unicode ranges, so the page renders the same.
// Only latin is preloaded, as before. The fallback face keeps Google's metrics
// (inter-fallback.css). Licence: app/fonts/inter/OFL.txt.
const interCyrillicExt = localFont({
  src: [
    { path: './fonts/inter/inter-cyrillic-ext.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-cyrillic-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-cyrillic-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-cyrillic-ext.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+0460-052F, U+1C80-1C8A, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F' },
  ],
})
const interCyrillic = localFont({
  src: [
    { path: './fonts/inter/inter-cyrillic.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-cyrillic.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-cyrillic.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-cyrillic.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116' },
  ],
})
const interGreekExt = localFont({
  src: [
    { path: './fonts/inter/inter-greek-ext.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-greek-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-greek-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-greek-ext.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+1F00-1FFF' },
  ],
})
const interGreek = localFont({
  src: [
    { path: './fonts/inter/inter-greek.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-greek.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-greek.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-greek.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+0370-0377, U+037A-037F, U+0384-038A, U+038C, U+038E-03A1, U+03A3-03FF' },
  ],
})
const interVietnamese = localFont({
  src: [
    { path: './fonts/inter/inter-vietnamese.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-vietnamese.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-vietnamese.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-vietnamese.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1EA0-1EF9, U+20AB' },
  ],
})
const interLatinExt = localFont({
  src: [
    { path: './fonts/inter/inter-latin-ext.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-latin-ext.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-latin-ext.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-latin-ext.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  preload: false,
  adjustFontFallback: false,
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF' },
  ],
})
const inter = localFont({
  src: [
    { path: './fonts/inter/inter-latin.woff2', weight: '300', style: 'normal' },
    { path: './fonts/inter/inter-latin.woff2', weight: '400', style: 'normal' },
    { path: './fonts/inter/inter-latin.woff2', weight: '500', style: 'normal' },
    { path: './fonts/inter/inter-latin.woff2', weight: '600', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: false,
  fallback: ['Inter Fallback'],
  declarations: [
    { prop: 'font-family', value: 'Inter' },
    { prop: 'unicode-range', value: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD' },
  ],
})
// the other subsets are declared above for their @font-face rules only
void [interCyrillicExt, interCyrillic, interGreekExt, interGreek, interVietnamese, interLatinExt]

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
