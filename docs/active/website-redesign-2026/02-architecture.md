# 02 — Architecture Specification

## Executive Summary

Replace the React + Vite SPA with a Next.js 15 App Router site using static generation, server components by default, and Tailwind v4. All existing URLs are preserved via a `[slug]` dispatcher for location/service pages and `/resources/[slug]` for articles. Three API Route Handlers proxy form submissions to n8n with rate limiting, honeypot, and body-size caps. The site deploys on Vercel from a `redesign` branch with preview URLs, merging to `main` for production.

---

## Directory Structure

```
undercurrent/
  app/
    layout.js                   # Root layout — fonts, metadata, analytics
    page.js                     # Homepage
    not-found.js                # 404
    globals.css                 # Tailwind v4 @theme + base styles + animations
    resources/
      page.js                   # Articles listing
      [slug]/
        page.js                 # Individual article
    audit/
      page.js                   # BusinessAuditV2
      report/
        page.js                 # AuditReport (reads searchParams)
    roi/
      page.js                   # ROI Calculator
    missed-revenue/
      page.js                   # MissedRevenueAudit
    contact/
      page.js                   # Contact page
    about/
      page.js                   # About
    process/
      page.js                   # Process
    services/
      page.js                   # Services listing
    case-study/
      page.js                   # Case studies
    privacy/
      page.js                   # Privacy policy
    terms/
      page.js                   # Terms of service
    [slug]/
      page.js                   # Dispatcher: location + service pages
    api/
      contact/
        route.js                # Contact form -> n8n
      qualify/
        route.js                # Qualifier form -> n8n
      audit/
        route.js                # Audit submission -> n8n
    sitemap.js                  # Dynamic sitemap
    robots.js                   # Dynamic robots.txt
    feed.xml/
      route.js                  # RSS feed
    llms.txt/
      route.js                  # LLM context file
  components/
    layout/
      Header.js                 # 'use client' — mobile menu toggle
      Footer.js                 # Server component
      Breadcrumb.js             # Server component
    ui/
      Button.js                 # Server component
      Card.js                   # Server component
      Badge.js                  # Server component
      JsonLd.js                 # Server component
      FadeIn.js                 # 'use client' — IntersectionObserver
      Accordion.js              # 'use client' — open/close state
    sections/
      Hero.js                   # Server component
      TrustStrip.js             # Server component
      ProblemFrame.js           # Server component
      ServicesOverview.js       # Server component
      Process.js                # Server component
      ComparisonTable.js        # Server component
      Pricing.js                # Server component
      Testimonials.js           # Server component
      IndustryScroller.js       # 'use client' — pause-on-hover
      FAQ.js                    # 'use client' — uses Accordion
      FinalCTA.js               # Server component
    forms/
      ContactForm.js            # 'use client'
      AuditForm.js              # 'use client'
      QualifyForm.js            # 'use client'
    audit/
      BusinessAuditV2.js        # 'use client'
      AuditReport.js            # 'use client'
      ROICalculator.js          # 'use client'
      MissedRevenueAudit.js     # 'use client'
      RadarChart.js             # 'use client'
      calculations.js           # Pure JS — no directive needed
      config.js                 # Pure JS
  lib/
    articles.js                 # gray-matter + remark pipeline
    rateLimit.js                # In-memory sliding window
    webhookProxy.js             # Shared n8n proxy utility
    validation.js               # Zod schemas for API routes
    data/
      locations.js              # Location page data array
      services.js               # Service page data array
      industries.js             # Industry data
      pricing.js                # Pricing tiers
      faq.js                    # FAQ entries
      navigation.js             # Nav links
  content/
    articles/                   # Markdown files (gray-matter frontmatter)
      *.md
  public/
    fonts/
      Satoshi-Variable.woff2
      Satoshi-VariableItalic.woff2
    images/                     # Static images
    articles/                   # Article hero images
      [slug]/
        hero.jpg
    favicon.ico
    apple-touch-icon.png
  next.config.js
  vercel.json
  package.json
  .env.local                    # Local dev only, gitignored
  .gitignore
```

### Key decisions

- **`lib/data/`** over root `data/`: keeps all non-route code under one `lib/` umbrella, simpler imports via `@/lib/data/services`.
- **`/resources/[slug]`** over `/articles/[slug]`: the existing SPA uses `/resources/:slug`, so we preserve the URL to avoid breaking indexed links and bookmarks.
- **JavaScript, not TypeScript**: the existing codebase is JS, this is a redesign not a rewrite. TS can be adopted incrementally later.

---

## Component Architecture

### Server vs Client boundary

Default to Server Component. Only add `'use client'` when the component needs browser APIs, event handlers, controlled inputs, or React state/effects.

**Server Components (no directive):**
Hero, TrustStrip, ProblemFrame, ServicesOverview, Process, ComparisonTable, Pricing, Testimonials, FinalCTA, Footer, Breadcrumb, Button, Card, Badge, JsonLd, all page.js files that are purely presentational

**Client Components (`'use client'`):**
Header (mobile menu), FAQ/Accordion (open state), IndustryScroller (pause-on-hover), FadeIn (IntersectionObserver), ContactForm, AuditForm, QualifyForm, BusinessAuditV2, AuditReport, ROICalculator, MissedRevenueAudit, RadarChart

### Component patterns

```jsx
// Server component — no directive, can be async, can fetch data
export default function Hero({ headline, subheadline }) {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <h1 className="font-display text-5xl md:text-7xl font-bold text-charcoal">
          {headline}
        </h1>
        <p className="mt-6 max-w-xl text-lg text-muted">{subheadline}</p>
      </div>
    </section>
  )
}
```

```jsx
// Client component — directive required
'use client'
import { useState } from 'react'

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null)
  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-5 text-left font-body text-charcoal flex justify-between"
          >
            {item.question}
            <span className={`transition-transform ${openIndex === i ? 'rotate-45' : ''}`}>+</span>
          </button>
          {openIndex === i && (
            <div className="pb-5 text-muted">{item.answer}</div>
          )}
        </div>
      ))}
    </div>
  )
}
```

---

## Data Layer

### Static data arrays

All in `lib/data/`. Exported as plain arrays/objects. Imported directly in Server Components (no API call needed, tree-shaken at build).

```js
// lib/data/locations.js
export const LOCATIONS = [
  {
    slug: 'ai-automation-melbourne',
    city: 'Melbourne',
    region: 'VIC',
    metaTitle: 'AI Automation Melbourne — Custom Workflows | UnderCurrent',
    metaDescription: '...',
    heroHeadline1: 'AI Automation',
    heroHeadline2: 'Melbourne.',
    heroCopy: '...',
    // ... all other fields preserved from current data file
  },
  // ...
]
```

```js
// lib/data/services.js
export const SERVICES = [
  {
    slug: 'customer-experience-automation',
    label: 'CUSTOMER EXPERIENCE',
    metaTitle: 'Customer Experience Automation Melbourne | UnderCurrent',
    metaDescription: '...',
    heroHeadline1: 'Every client feels',
    heroHeadline2: 'looked after.',
    heroCopy: '...',
    // ... all other fields preserved from current data file
  },
  // ...
]
```

### Article content

Markdown in `content/articles/` with gray-matter frontmatter. Processed at build time via `lib/articles.js`.

```js
// lib/articles.js
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const articlesDir = path.join(process.cwd(), 'content', 'articles')

export function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'))
  return files
    .map(filename => {
      const slug = filename.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(articlesDir, filename), 'utf8')
      const { data } = matter(raw)
      return { slug, ...data }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))
}

export async function getArticleBySlug(slug) {
  const filePath = path.join(articlesDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(raw)
  const processed = await remark().use(html).process(content)
  return { slug, frontmatter: data, html: processed.toString() }
}
```

---

## Routing Strategy

### All routes

| URL | Source | Type |
|-----|--------|------|
| `/` | `app/page.js` | Static |
| `/about` | `app/about/page.js` | Static |
| `/services` | `app/services/page.js` | Static |
| `/process` | `app/process/page.js` | Static |
| `/contact` | `app/contact/page.js` | Static |
| `/case-study` | `app/case-study/page.js` | Static |
| `/privacy` | `app/privacy/page.js` | Static |
| `/terms` | `app/terms/page.js` | Static |
| `/audit` | `app/audit/page.js` | Static shell, client form |
| `/audit/report` | `app/audit/report/page.js` | Static shell, client reads `?d=` |
| `/roi` | `app/roi/page.js` | Static shell, client calculator |
| `/missed-revenue` | `app/missed-revenue/page.js` | Static shell, client tool |
| `/resources` | `app/resources/page.js` | Static |
| `/resources/[slug]` | `app/resources/[slug]/page.js` | SSG via generateStaticParams |
| `/[slug]` | `app/[slug]/page.js` | SSG via generateStaticParams |
| `/api/contact` | `app/api/contact/route.js` | Route Handler |
| `/api/qualify` | `app/api/qualify/route.js` | Route Handler |
| `/api/audit` | `app/api/audit/route.js` | Route Handler |
| `/sitemap.xml` | `app/sitemap.js` | Generated |
| `/robots.txt` | `app/robots.js` | Generated |
| `/feed.xml` | `app/feed.xml/route.js` | Route Handler |
| `/llms.txt` | `app/llms.txt/route.js` | Route Handler |

### The `[slug]` dispatcher

This is the core pattern. A single dynamic route handles both location pages (`ai-automation-melbourne`) and service pages (`customer-experience-automation`).

```js
// app/[slug]/page.js
import { notFound } from 'next/navigation'
import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import LocationPage from '@/components/pages/LocationPage'
import ServicePage from '@/components/pages/ServicePage'

// Reject any slug not in our known set — returns 404 immediately
export const dynamicParams = false

export function generateStaticParams() {
  const allSlugs = [
    ...LOCATIONS.map(l => l.slug),
    ...SERVICES.map(s => s.slug),
  ]

  // Collision detection — log warning if same slug in both arrays
  const locationSlugs = new Set(LOCATIONS.map(l => l.slug))
  const serviceSlugs = new Set(SERVICES.map(s => s.slug))
  for (const slug of locationSlugs) {
    if (serviceSlugs.has(slug)) {
      console.warn(`[slug collision] "${slug}" exists in both locations and services`)
    }
  }

  return allSlugs.map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const { slug } = params
  const location = LOCATIONS.find(l => l.slug === slug)
  if (location) {
    return {
      title: location.metaTitle,
      description: location.metaDescription,
      openGraph: { title: location.metaTitle, description: location.metaDescription },
    }
  }
  const service = SERVICES.find(s => s.slug === slug)
  if (service) {
    return {
      title: service.metaTitle,
      description: service.metaDescription,
      openGraph: { title: service.metaTitle, description: service.metaDescription },
    }
  }
  return notFound()
}

export default function SlugPage({ params }) {
  const { slug } = params
  const location = LOCATIONS.find(l => l.slug === slug)
  if (location) return <LocationPage location={location} />

  const service = SERVICES.find(s => s.slug === slug)
  if (service) return <ServicePage service={service} />

  return notFound()
}
```

### Article route

```js
// app/resources/[slug]/page.js
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllArticles().map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return notFound()
  return {
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    openGraph: {
      title: article.frontmatter.title,
      description: article.frontmatter.description,
      images: [`/articles/${params.slug}/hero.jpg`],
      type: 'article',
      publishedTime: article.frontmatter.date,
    },
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return notFound()
  // Render article with JsonLd for BlogPosting
  return (/* ... */)
}
```

---

## API Layer

### Shared webhook proxy

All three Route Handlers share the same proxy logic. Extracted to `lib/webhookProxy.js`.

```js
// lib/webhookProxy.js
export async function proxyToN8n(webhookUrl, payload) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 10_000)

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Secret': process.env.N8N_WEBHOOK_SECRET,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    })

    if (!res.ok) {
      console.error(`n8n responded ${res.status}`)
      return { ok: false, status: res.status }
    }
    return { ok: true }
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('n8n webhook timed out after 10s')
      return { ok: false, status: 504 }
    }
    console.error('n8n webhook error:', err.message)
    return { ok: false, status: 502 }
  } finally {
    clearTimeout(timeout)
  }
}
```

### Rate limiting

Sliding window, in-memory Map. Acceptable for single-instance Vercel deployment at this scale.

```js
// lib/rateLimit.js
const store = new Map()

const WINDOW_MS = 60_000   // 1 minute
const MAX_REQUESTS = 5

export function rateLimit(ip) {
  const now = Date.now()
  const entry = store.get(ip) || []

  // Sliding window: keep only timestamps within the window
  const recent = entry.filter(ts => now - ts < WINDOW_MS)

  if (recent.length >= MAX_REQUESTS) {
    store.set(ip, recent)
    return { allowed: false, remaining: 0 }
  }

  recent.push(now)
  store.set(ip, recent)
  return { allowed: true, remaining: MAX_REQUESTS - recent.length }
}
```

### Validation (Zod)

Zod is worth the dependency (~13KB gzipped). It replaces scattered regex/length checks across three routes with declarative schemas, type-safe parsed output, and human-readable error messages. One dependency, three routes cleaned up.

```js
// lib/validation.js
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
  company: z.string().max(100).optional(),
  honeypot: z.string().max(0).optional(),  // must be empty
})

export const qualifySchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  businessType: z.string().min(1).max(100),
  teamSize: z.string().max(50),
  challenge: z.string().min(10).max(2000),
  honeypot: z.string().max(0).optional(),
})

export const auditSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  businessName: z.string().min(1).max(100),
  industry: z.string().min(1).max(100),
  results: z.record(z.unknown()),
  honeypot: z.string().max(0).optional(),
})
```

### Route Handler pattern

All three follow the same structure. Example for `/api/contact`:

```js
// app/api/contact/route.js
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { contactSchema } from '@/lib/validation'
import { proxyToN8n } from '@/lib/webhookProxy'

const MAX_BODY_SIZE = 10_000 // 10KB

export async function POST(request) {
  // 1. Rate limit by IP
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  // 2. Body size guard
  const contentLength = parseInt(request.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  // 3. Parse and validate
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = contactSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  // 4. Honeypot — silently accept but don't forward
  if (result.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  // 5. Proxy to n8n
  const { honeypot, ...payload } = result.data
  const proxy = await proxyToN8n(process.env.N8N_CONTACT_WEBHOOK_URL, payload)
  if (!proxy.ok) {
    return NextResponse.json({ error: 'Submission failed' }, { status: proxy.status })
  }

  return NextResponse.json({ ok: true })
}
```

### Environment variables

All server-only (no `NEXT_PUBLIC_` prefix). Set in Vercel dashboard, never committed.

```
N8N_WEBHOOK_SECRET=<secret>
N8N_CONTACT_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/...
N8N_AUDIT_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/...
N8N_QUALIFIER_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/...
```

---

## Styling System

### Tailwind v4 — globals.css

No `tailwind.config.js`. All config lives in `globals.css` via the `@theme` directive.

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors */
  --color-white: #FAFAF8;
  --color-charcoal: #1C1C1A;
  --color-blue: #6A8DAD;
  --color-blue-dark: #4A6D8D;
  --color-muted: #6B7280;
  --color-border: #E5E7EB;
  --color-surface: #F3F4F6;

  /* Fonts */
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-satoshi);

  /* Spacing scale (if custom needed) */
  --spacing-section: 6rem;
  --spacing-section-sm: 4rem;
}

/* ─── Base Styles ─── */

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-body);
  color: var(--color-charcoal);
  background-color: var(--color-white);
}

h1, h2 {
  font-family: var(--font-display);
}

/* ─── Animation Utilities ─── */

.fade-hidden {
  opacity: 0;
  transform: translateY(24px);
}

.fade-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

/* Respect reduced motion preference via pure CSS */
@media (prefers-reduced-motion: reduce) {
  .fade-hidden {
    opacity: 1;
    transform: none;
  }
  .fade-visible {
    transition: none;
  }
}
```

### Usage in components

```jsx
<section className="bg-white py-section">
  <div className="mx-auto max-w-7xl px-6">
    <h2 className="font-display text-4xl font-bold text-charcoal">...</h2>
    <p className="mt-4 text-muted">...</p>
    <div className="mt-8 border-t border-border pt-8">...</div>
  </div>
</section>
```

---

## Font System

### Declarations in root layout

```js
// app/layout.js
import { Space_Grotesk } from 'next/font/google'
import localFont from 'next/font/local'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
})

const satoshi = localFont({
  src: [
    {
      path: '../public/fonts/Satoshi-Variable.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/Satoshi-VariableItalic.woff2',
      style: 'italic',
    },
  ],
  variable: '--font-satoshi',
  display: 'swap',
})
```

### Applied to HTML element

```jsx
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${satoshi.variable}`}>
      <body>{children}</body>
    </html>
  )
}
```

### Tailwind integration

The `@theme` block maps CSS variables to Tailwind tokens:

- `--font-display: var(--font-space-grotesk)` — use as `font-display` in classes
- `--font-body: var(--font-satoshi)` — use as `font-body` in classes
- `body` gets `font-family: var(--font-body)` as default
- `h1, h2` get `font-family: var(--font-display)` as default

---

## Animation System

### FadeIn component

```jsx
// components/ui/FadeIn.js
'use client'
import { useEffect, useRef } from 'react'

export default function FadeIn({
  children,
  as: Tag = 'div',
  delay = 0,
  className = '',
  ...props
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Apply delay via inline style to avoid needing dynamic classes
          el.style.transitionDelay = `${delay}ms`
          el.classList.remove('fade-hidden')
          el.classList.add('fade-visible')
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay])

  return (
    <Tag ref={ref} className={`fade-hidden ${className}`} {...props}>
      {children}
    </Tag>
  )
}
```

### Usage patterns

```jsx
// Simple fade
<FadeIn>
  <h2 className="text-4xl font-bold">Heading</h2>
</FadeIn>

// Staggered children
<div className="grid grid-cols-3 gap-8">
  {items.map((item, i) => (
    <FadeIn key={i} delay={i * 100}>
      <Card {...item} />
    </FadeIn>
  ))}
</div>

// Semantic element — avoids extra wrapper div
<FadeIn as="section" className="py-section">
  <div className="mx-auto max-w-7xl px-6">...</div>
</FadeIn>
```

The `as` prop allows FadeIn to render as any HTML element, avoiding unnecessary wrapper divs when the component already represents a section or article.

The `prefers-reduced-motion` handling is pure CSS (in globals.css), so the FadeIn component doesn't need a JS media query check. Elements just appear without transition.

---

## SEO + Metadata

### Root layout metadata

```js
// app/layout.js (metadata export)
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
```

### Per-page metadata

Every page exports `generateMetadata()` or a static `metadata` object. Examples shown in routing section above.

### JSON-LD component

```jsx
// components/ui/JsonLd.js
export default function JsonLd({ schema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### Structured data by page type

| Page | Schema Type |
|------|------------|
| Root layout | Organization |
| Location pages | LocalBusiness |
| Service pages | Service |
| FAQ section | FAQPage |
| Article pages | BlogPosting |

### Sitemap

```js
// app/sitemap.js
import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://undercurrentautomations.com.au'

export default function sitemap() {
  const staticPages = [
    '', '/about', '/services', '/process', '/contact',
    '/audit', '/roi', '/missed-revenue', '/resources',
    '/case-study', '/privacy', '/terms',
  ].map(path => ({
    url: `${BASE}${path}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: path === '' ? 1.0 : 0.7,
  }))

  const locationPages = LOCATIONS.map(l => ({
    url: `${BASE}/${l.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const servicePages = SERVICES.map(s => ({
    url: `${BASE}/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const articles = getAllArticles().map(a => ({
    url: `${BASE}/resources/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'weekly',
    priority: 0.6,
  }))

  return [...staticPages, ...locationPages, ...servicePages, ...articles]
}
```

### Robots

```js
// app/robots.js
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/audit/report'],
      },
    ],
    sitemap: 'https://undercurrentautomations.com.au/sitemap.xml',
  }
}
```

The `/audit/report` page is disallowed because it contains user-specific results via query params, not meaningful indexable content.

---

## Audit Tool Migration

### Flow

1. User completes `BusinessAuditV2` form at `/audit`
2. Form calculates scores client-side, encodes results as base64 JSON
3. `router.push('/audit/report?d=' + encodeURIComponent(btoa(JSON.stringify(data))))`
4. `/audit/report` reads `?d=` param, decodes, validates, renders report
5. Optionally, form also POSTs to `/api/audit` to send results to n8n

### Audit report URL strategy

**Base64-encoded JSON blob via `?d=` param** (matching the existing SPA pattern). This preserves the current URL structure exactly. Individual query params (`?score=87&tier=hot`) would require restructuring the data model and wouldn't support the nested pillar/subtask structure the audit uses.

### AuditReport implementation

**`'use client'` with `useSearchParams()` + Suspense boundary.** The audit report page is entirely client-driven (decodes base64, renders charts, manages UI state). Using the server `searchParams` prop would be technically valid but creates a misleading pattern, the page does zero server work and needs client state for interactive elements.

```jsx
// app/audit/report/page.js
import { Suspense } from 'react'
import AuditReport from '@/components/audit/AuditReport'

export const metadata = {
  title: 'Your Automation Audit Report',
  robots: { index: false, follow: false },
}

export default function AuditReportPage() {
  return (
    <Suspense fallback={<AuditReportSkeleton />}>
      <AuditReport />
    </Suspense>
  )
}

function AuditReportSkeleton() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-blue" />
    </div>
  )
}
```

```jsx
// components/audit/AuditReport.js
'use client'
import { useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
// ... rest of audit report logic migrated from current AuditReport.jsx
```

The Suspense boundary is required because `useSearchParams()` in Next.js 15 App Router triggers a client-side render boundary.

---

## Vercel + Deployment

### vercel.json

Delete the SPA catch-all rewrite (`/(.*) -> /index.html`). Next.js handles routing natively. Keep only headers.

```json
{
  "headers": [
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/(.*\\.(?:png|jpg|jpeg|svg|webp|gif|ico))",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=2592000, stale-while-revalidate=86400" }
      ]
    }
  ],
  "regions": ["syd1"]
}
```

The `"regions": ["syd1"]` keeps serverless functions in Sydney, closest to the Melbourne target audience.

### Branch strategy

1. Create `redesign` branch from `main`
2. All Next.js work happens on `redesign`
3. Vercel auto-deploys `redesign` to a preview URL for review
4. Production swap: merge `redesign` to `main` when approved
5. The existing Vite SPA stays live on `main` until the merge

### Environment variables

Set in Vercel dashboard under the project settings. Scope to Preview + Production environments:

- `N8N_WEBHOOK_SECRET`
- `N8N_CONTACT_WEBHOOK_URL`
- `N8N_AUDIT_WEBHOOK_URL`
- `N8N_QUALIFIER_WEBHOOK_URL`

### next.config.js

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // No output: 'export' — we want server features (Route Handlers, dynamic metadata)
  // Images are all local, no remote config needed
}

export default nextConfig
```

---

## Build Sequence

### Session 1: Foundation (~3h)

- Create `redesign` branch
- `npx create-next-app@latest` inside the existing `undercurrent/` directory (or a fresh parallel dir)
- Install deps: `npm install gray-matter remark remark-html lucide-react zod @vercel/analytics @vercel/speed-insights`
- Set up `globals.css` with `@theme` block, base styles, animation utilities
- Configure fonts in `layout.js`
- Create `lib/data/` and copy `locations.js`, `services.js` from existing `src/data/`
- Create `lib/articles.js`
- Minimal `vercel.json`
- Push to GitHub, confirm Vercel preview deploys

### Session 2: Layout + Navigation (~2h)

- Build root `layout.js` with metadata, fonts, analytics
- Build `Header.js` (mobile menu, nav links)
- Build `Footer.js`
- Build `not-found.js`
- Build `Button.js`, `Card.js`, `Badge.js`, `JsonLd.js`
- Build `FadeIn.js`

### Session 3: Homepage (~3h)

- Build all homepage sections: Hero, TrustStrip/ProofStrip, WhoWeServe, Benefits, WhatWeAutomate, Process, Pricing, CalculatorTeaser, FAQ, Contact, FinalCTA
- Wire into `app/page.js`
- Verify FadeIn animations work

### Session 4: Slug Dispatcher + Location/Service Pages (~3h)

- Build `app/[slug]/page.js` with `generateStaticParams` and collision detection
- Build `LocationPage` component (migrate from existing)
- Build `ServicePage` component (migrate from existing)
- Verify all slugs resolve, unknown slugs 404

### Session 5: Articles (~2h)

- Migrate markdown content to `content/articles/`
- Build `app/resources/page.js` (article listing)
- Build `app/resources/[slug]/page.js`
- Verify `generateStaticParams` generates all articles

### Session 6: Audit Tools (~3h)

- Migrate `BusinessAuditV2`, `AuditReport`, `ROICalculator`, `MissedRevenueAudit`
- Build `app/audit/page.js`, `app/audit/report/page.js`, `app/roi/page.js`, `app/missed-revenue/page.js`
- Migrate `calculations.js`, `config.js`, `RadarChart.js`
- Verify audit flow end-to-end (form -> base64 -> report page)

### Session 7: API Layer (~2h)

- Build `lib/rateLimit.js`, `lib/webhookProxy.js`, `lib/validation.js`
- Build all three Route Handlers
- Test with curl against preview deployment
- Set env vars in Vercel dashboard

### Session 8: SEO + Static Pages (~2h)

- Build `app/sitemap.js`, `app/robots.js`
- Build `app/feed.xml/route.js`, `app/llms.txt/route.js`
- Add JSON-LD to all page types
- Build remaining static pages: About, Process, Services, Contact, Case Study, Privacy, Terms

### Session 9: QA + Polish (~2h)

- Cross-browser testing (Chrome, Safari, Firefox, mobile)
- Lighthouse audit (target 90+ on all metrics)
- Verify all existing URLs work on preview
- Verify 404 behavior for unknown slugs
- Test reduced-motion
- Check OG tags with social debuggers

### Session 10: Launch (~1h)

- Final review on preview URL
- Merge `redesign` to `main`
- Verify production deployment
- Smoke test all critical paths (homepage, audit flow, contact form, article pages)
- Monitor Vercel analytics for errors

**Total estimated: ~23 hours across 10 sessions**

---

## Outlier Ideas

### Adopt

1. **`AbortSignal.timeout(10_000)` on n8n fetch** — Already included in `webhookProxy.js` above. Prevents requests from hanging indefinitely if n8n is unresponsive.

2. **`prefers-reduced-motion` via pure CSS** — Already included in `globals.css` above. Removes the need for a JS media query check in FadeIn. Simpler, no hydration mismatch risk.

3. **Collision detection in `generateStaticParams()`** — Already included in the dispatcher code above. Catches data entry errors at build time before they cause silent routing bugs.

4. **Shared `lib/webhookProxy.js`** — Already included above. DRY pattern prevents three Route Handlers from duplicating fetch + error handling + timeout logic.

5. **Disallow `/audit/report` in robots.js** — Already included above. User-specific result pages shouldn't be indexed.

6. **`"regions": ["syd1"]` in vercel.json** — Already included above. Keeps serverless compute in Sydney for lowest latency to Melbourne users.

7. **`as` prop on FadeIn** — Already included above. Avoids extra wrapper divs, keeps semantic HTML clean.

### Defer

1. **Rate limiter mutation bug (`store.set` vs `entry.count++`)** — Not applicable to our sliding window implementation (we always `.set()` a new filtered array). Worth noting as a general caution: never mutate a Map value without re-setting it if using a fixed-window counter pattern.
