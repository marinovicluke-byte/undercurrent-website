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
    { path: '../public/fonts/Satoshi-Variable.woff2', style: 'normal' },
    { path: '../public/fonts/Satoshi-VariableItalic.woff2', style: 'italic' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL('https://undercurrentautomations.com.au'),
  title: {
    default: 'UnderCurrent — AI Automation for Small Business',
    template: '%s | UnderCurrent',
  },
  description: 'Melbourne AI automation company. We build custom workflows that save small businesses 15+ hours a week.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'UnderCurrent',
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${satoshi.variable}`}>
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
