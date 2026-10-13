// app/google-reviews/page.js — the Google reviews offer, general version. The link Luke sends to
// people who reach out, and the Meta ads landing page. noindex: an ads page, kept out of search.
import '@/app/styles/google-reviews.css'
import GoogleReviewsPage from '@/components/gr/GoogleReviewsPage'
import { NICHES } from '@/lib/data/googleReviews'

const d = NICHES.general

export const metadata = {
  title: { absolute: `${d.title} | UnderCurrent` },
  description: d.description,
  robots: { index: false, follow: false },
  openGraph: { title: d.h1, description: d.description, url: `https://undercurrentautomations.com${d.path}`, images: ['/brand/og-card.png'] },
}

export default function Page() {
  return <GoogleReviewsPage d={d} />
}
