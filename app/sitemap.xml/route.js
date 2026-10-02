import { sitemapEntries, sitemapXml } from '@/lib/sitemap'

// Rendered per request and held at the CDN for an hour, so a scheduled article enters the
// sitemap on its date with no deploy. Not a metadata route (app/sitemap.js) and not ISR: on
// Next 16 + Vercel both freeze at the deploy-time snapshot (Intelligentle Healing hit it twice,
// see lab-notes 2026-10-02).
export const dynamic = 'force-dynamic'

export function GET() {
  return new Response(sitemapXml(sitemapEntries()), {
    headers: { 'Content-Type': 'application/xml', 'Cache-Control': 'public, max-age=0, s-maxage=3600' },
  })
}
