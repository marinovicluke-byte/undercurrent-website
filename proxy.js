import { NextResponse } from 'next/server'

// Next.js normalises trailing slashes via an internal 308 *before* the redirects config runs,
// so a `source: '/resources/'` redirect rule would be unreachable. This proxy fires ahead of
// that normalisation, collapsing the legacy `/resources/` URL to a single 301 → /blog
// instead of the 2-hop 308 → /resources → 301 → /blog chain flagged during the cutover QA.
export function proxy(req) {
  const { pathname } = req.nextUrl
  if (pathname === '/resources' || pathname === '/resources/') {
    return NextResponse.redirect(new URL('/blog', req.url), 301)
  }
  return NextResponse.next()
}

export const config = {
  matcher: '/resources/:path*',
}
