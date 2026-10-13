// app/google-reviews/[niche]/page.js — the same page re-cut for one niche (/google-reviews/jiu-jitsu).
// Every key in lib/data/googleReviews.js except `general` is a page here; anything else 404s.
import '@/app/styles/google-reviews.css'
import GoogleReviewsPage from '@/components/gr/GoogleReviewsPage'
import { NICHES, NICHE_KEYS } from '@/lib/data/googleReviews'

export const dynamicParams = false
export function generateStaticParams() {
  return NICHE_KEYS.map(niche => ({ niche }))
}

export async function generateMetadata({ params }) {
  const d = NICHES[(await params).niche]
  return {
    title: { absolute: `${d.title} | UnderCurrent` },
    description: d.description,
    robots: { index: false, follow: false },
    openGraph: { title: d.h1, description: d.description, url: `https://undercurrentautomations.com${d.path}`, images: ['/brand/og-card.png'] },
  }
}

export default async function Page({ params }) {
  return <GoogleReviewsPage d={NICHES[(await params).niche]} />
}
