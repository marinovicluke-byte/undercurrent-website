# Client Website Blueprint — UnderCurrent

> Drop this file into any new client project as `CLAUDE.md`. It defines the stack, structure, and standards for building production-grade, SEO-optimised websites.

---

## Stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Next.js (App Router) | 14+ |
| Language | TypeScript | Latest |
| Styling | Tailwind CSS | 3.4+ |
| Animations | Framer Motion | 11+ |
| Icons | Lucide React | Latest |
| Fonts | `next/font/google` | Built-in |
| Analytics | Vercel Analytics + Speed Insights | Latest |
| Hosting | Vercel | — |
| Package Manager | npm | — |

**Do NOT use:** GSAP (SSR-incompatible), React Router (Next.js has file-based routing), CSS Modules (use Tailwind), Create React App, Vite.

---

## Project Scaffolding

```bash
npx create-next-app@latest client-name --typescript --tailwind --app --src-dir --import-alias "@/*"
cd client-name
npm install framer-motion lucide-react @vercel/analytics @vercel/speed-insights
```

---

## Directory Structure

```
client-name/
  src/
    app/
      layout.tsx          # Root layout — fonts, metadata, analytics, global wrapper
      page.tsx            # Homepage
      not-found.tsx       # 404 page
      about/
        page.tsx
      services/
        page.tsx
      contact/
        page.tsx
      [other-routes]/
        page.tsx
    components/
      layout/
        Navbar.tsx        # Site navigation
        Footer.tsx        # Site footer
        MobileMenu.tsx    # Mobile nav drawer
      ui/
        Button.tsx        # Reusable button variants
        Section.tsx       # Standard section wrapper (max-width, padding)
        Badge.tsx         # Label/tag component
        Card.tsx          # Reusable card component
      sections/
        Hero.tsx          # Homepage hero
        Features.tsx      # Feature grid/list
        Testimonials.tsx  # Social proof
        CTA.tsx           # Call-to-action blocks
        FAQ.tsx           # Accordion FAQ
        Pricing.tsx       # Pricing cards
      animations/
        FadeIn.tsx        # Scroll-triggered fade in
        StaggerChildren.tsx  # Staggered child animations
        CountUp.tsx       # Animated number counter
    lib/
      constants.ts        # CTA URLs, brand colors, contact info, social links
      metadata.ts         # Shared metadata helpers
      types.ts            # Shared TypeScript types
    styles/
      globals.css         # Tailwind directives + custom CSS
  public/
    favicon.svg
    og-image.jpg          # 1200x630px Open Graph image
    robots.txt
    sitemap.xml
  next.config.js
  tailwind.config.ts
  tsconfig.json
```

---

## Root Layout (`src/app/layout.tsx`)

Every client site MUST have this structure:

```tsx
import type { Metadata } from 'next'
import { DM_Sans, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

// Load fonts via next/font — no external requests, no layout shift
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.client-domain.com'),
  title: {
    default: 'Client Name — Tagline',
    template: '%s | Client Name',
  },
  description: 'Primary meta description. 150-160 characters. Include location and key service.',
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    siteName: 'Client Name',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
```

### When pages need different layouts

Use Next.js **route groups** if some pages need no Navbar/Footer (e.g., a standalone report or funnel page):

```
src/app/
  (main)/           # Has Navbar + Footer
    layout.tsx
    page.tsx
    about/page.tsx
  (standalone)/     # No Navbar/Footer
    layout.tsx
    report/page.tsx
```

---

## Per-Page SEO (REQUIRED for every page)

Every `page.tsx` MUST export metadata:

```tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Page Title',  // Uses template from layout: "Page Title | Client Name"
  description: 'Unique description for this page. 150-160 chars. Include keywords naturally.',
  alternates: { canonical: '/page-path' },
  openGraph: {
    title: 'Page Title — Client Name',
    description: 'Same or slightly different from meta description.',
  },
}

export default function PageName() {
  return (...)
}
```

### Structured Data (JSON-LD)

Add structured data to relevant pages. Place it in the page component:

```tsx
export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Client Name',
    url: 'https://www.client-domain.com',
    // ... full schema
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Page content */}
    </>
  )
}
```

**Required schemas by page type:**
- Homepage: `LocalBusiness` or `Organization` + `WebSite`
- Services: `Service` entries with descriptions
- About: `AboutPage` + `Organization`
- FAQ: `FAQPage` with `Question`/`Answer` pairs
- Contact: `ContactPage`

---

## SEO Checklist (every project)

### Before launch
- [ ] Every page has unique `title` and `description`
- [ ] Every page has `canonical` URL set
- [ ] `og-image.jpg` exists (1200x630px) and renders correctly
- [ ] `robots.txt` exists in `/public` with sitemap reference
- [ ] `sitemap.xml` exists in `/public` listing all public routes
- [ ] JSON-LD structured data on homepage (minimum)
- [ ] All images use `next/image` with `alt` text
- [ ] No `undercurrent.au` or placeholder domains — use the real client domain
- [ ] Favicon exists and is referenced
- [ ] `lang` attribute set on `<html>`
- [ ] Mobile responsive (test at 375px, 768px, 1024px, 1440px)

### After launch
- [ ] Google Search Console verified and sitemap submitted
- [ ] Test with https://search.google.com/test/rich-results (structured data)
- [ ] Test OG tags with https://www.opengraph.xyz/
- [ ] Run Lighthouse audit — aim for 90+ on all scores
- [ ] Verify `curl -s https://client-domain.com/ | grep '<title>'` shows correct title in raw HTML

---

## Animations — Framer Motion Patterns

### FadeIn Component (use instead of GSAP)

```tsx
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface FadeInProps {
  children: React.ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right'
  className?: string
}

export function FadeIn({ children, delay = 0, direction = 'up', className }: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const directions = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Stagger Children

```tsx
'use client'

import { motion } from 'framer-motion'

export function StaggerChildren({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Rules
- Animations MUST be in `'use client'` components
- Keep parent page as a server component — only wrap the animated section in a client component
- Use `useInView` with `once: true` — don't replay animations on scroll back
- Keep durations under 0.6s — snappy, not sluggish
- Never animate layout properties (width, height) — use `transform` and `opacity` only

---

## Component Standards

### Server vs Client Components

```
Server Components (default):     Client Components ('use client'):
- Page layouts                   - Anything with useState/useEffect
- Static content sections        - Forms
- Metadata                       - Animations (Framer Motion)
- Data fetching                  - Interactive elements (accordions, tabs)
                                 - Browser APIs (IntersectionObserver, etc.)
```

**Rule:** Keep pages as server components. Extract interactive parts into small client components and import them into the server page. This maximises SSR content.

```tsx
// app/page.tsx — SERVER component (good)
import { Hero } from '@/components/sections/Hero'          // client
import { Features } from '@/components/sections/Features'  // server
import { FAQ } from '@/components/sections/FAQ'            // client (accordion)

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <FAQ />
    </>
  )
}
```

### Constants File (`src/lib/constants.ts`)

Centralise all repeated values. Never hardcode URLs, colors, or contact info in components:

```tsx
export const SITE = {
  name: 'Client Name',
  domain: 'https://www.client-domain.com',
  email: 'hello@client-domain.com',
  phone: '04XX XXX XXX',
  location: 'Melbourne, Australia',
}

export const CTA_HREF = 'https://cal.com/client/30min'

export const SOCIALS = {
  instagram: 'https://instagram.com/client',
  linkedin: 'https://linkedin.com/company/client',
  facebook: 'https://facebook.com/client',
}
```

### Image Handling

Always use `next/image` — never raw `<img>`:

```tsx
import Image from 'next/image'

<Image
  src="/hero.jpg"
  alt="Descriptive alt text for SEO and accessibility"
  width={1200}
  height={800}
  priority  // Only for above-the-fold images (hero, logo)
  className="object-cover"
/>
```

- `priority` on hero images and logos only (prevents lazy loading)
- Always provide meaningful `alt` text
- Use WebP or AVIF formats when possible
- Keep OG image as JPG (widest compatibility)

---

## Accessibility Standards (every project)

- All interactive elements keyboard-navigable
- `:focus-visible` outlines on all focusable elements
- `aria-expanded` on accordions/dropdowns
- `aria-label` on icon-only buttons
- Form inputs associated with labels via `htmlFor`/`id`
- Semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Colour contrast minimum 4.5:1 for text
- Skip-to-content link (optional but recommended)

---

## Performance Standards

- Lighthouse Performance: 90+
- Lighthouse Accessibility: 95+
- Lighthouse SEO: 100
- No layout shift (CLS < 0.1)
- Largest contentful paint < 2.5s
- All fonts loaded via `next/font` (zero external requests)
- Images optimised via `next/image`
- Code-split by route (automatic with Next.js App Router)

---

## Deployment

### Vercel Setup
1. Connect GitHub repo to Vercel
2. Framework preset: Next.js (auto-detected)
3. Set environment variables in Vercel dashboard (never commit `.env` with secrets)
4. Add custom domain
5. Enable Vercel Analytics

### Environment Variables
- Client-facing vars: prefix with `NEXT_PUBLIC_`
- Server-only vars: no prefix (API keys, webhooks)
- Never commit `.env` — use `.env.example` as a template

### Pre-launch
```bash
npm run build     # Must complete with zero errors
npm run start     # Test production build locally
```

---

## Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `HeroSection.tsx` |
| Pages | `page.tsx` in route folder | `app/about/page.tsx` |
| Utilities | camelCase | `formatDate.ts` |
| Constants | UPPER_SNAKE | `CTA_HREF` |
| CSS classes | Tailwind utilities | `className="text-lg font-medium"` |
| Route folders | kebab-case | `app/case-studies/page.tsx` |
| Component folders | PascalCase groups | `components/sections/` |

---

## What NOT To Do

- **Don't use GSAP** — it requires DOM access and breaks SSR. Use Framer Motion.
- **Don't use React Router** — Next.js has file-based routing built in.
- **Don't use `<img>` tags** — use `next/image` for automatic optimisation.
- **Don't load fonts via `<link>` tags** — use `next/font/google` for zero-CLS font loading.
- **Don't put secrets in `NEXT_PUBLIC_` vars** — they're exposed to the browser.
- **Don't make entire pages `'use client'`** — extract interactive parts into small client components.
- **Don't skip metadata exports** — every page needs unique title/description/canonical.
- **Don't hardcode URLs or contact info** — use `constants.ts`.
- **Don't use `dangerouslySetInnerHTML`** except for JSON-LD structured data.
- **Don't skip the 404 page** — always create `not-found.tsx`.
- **Don't forget `robots.txt` and `sitemap.xml`** — create them before launch.
