# UnderCurrent Website Redesign 2026 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the React + Vite SPA with a Next.js 15 App Router site that has server-rendered metadata, SSG for all content pages, and proxied n8n form submissions.

**Architecture:** Next.js 15 App Router on Vercel, Tailwind v4 CSS-native config, static generation via `generateStaticParams()` for all location/service/article pages. Three API Route Handlers proxy form submissions to n8n. Single `app/[slug]/page.js` dispatcher handles location + service pages without URL namespace collision.

**Tech Stack:** Next.js 15, React 19, Tailwind v4, gray-matter, remark + remark-html, lucide-react, zod, @vercel/analytics, @vercel/speed-insights, next/font/google (Space Grotesk), next/font/local (Satoshi)

---

## Dependency Map

```
Task 1: Foundation
  └── Task 2: UI Primitives + Layout      (depends on 1)
  └── Task 7: API Layer                   (depends on 1, parallel with 2)
        └── Task 3: Homepage              (depends on 2)
        └── Task 4: Slug Dispatcher       (depends on 2)
        └── Task 5: Articles              (depends on 2)
        └── Task 6: Audit Tools           (depends on 2)
        └── Task 8: SEO + Static Pages    (depends on 2)
              └── Task 9: QA + Polish     (depends on 3,4,5,6,7,8)
                    └── Task 10: Launch   (depends on 9)
```

**Parallelism summary:**
- Task 1 → sequential (everything depends on it)
- Tasks 2 and 7 → parallel with each other (both depend only on Task 1)
- Tasks 3, 4, 5, 6, 8 → parallel with each other (all depend only on Task 2)
- Task 9 → sequential (depends on all of 3–8)
- Task 10 → sequential (depends on 9)

---

## Existing codebase reference

The Vite SPA lives in `undercurrent/` on `main`. Key source files to migrate from:

| Source | Destination |
|--------|-------------|
| `src/data/locations.js` | `lib/data/locations.js` |
| `src/data/services.js` | `lib/data/services.js` |
| `src/content/articles/*.md` | `content/articles/*.md` |
| `src/pages/LocationPage.jsx` | `components/pages/LocationPage.js` |
| `src/pages/ServicePage.jsx` | `components/pages/ServicePage.js` |
| `src/pages/LandingPage.jsx` | `app/page.js` + `components/sections/*` |
| `src/audit/` | `components/audit/` |
| `src/pages/AuditReport.jsx` | `components/audit/AuditReport.js` |
| `src/pages/ROICalculator.jsx` | `components/audit/ROICalculator.js` |
| `src/pages/MissedRevenueAudit.jsx` | `components/audit/MissedRevenueAudit.js` |

---

## Task 1: Foundation

**Sequential. Must complete before all other tasks.**

**Files:**
- Create: `app/globals.css`
- Create: `app/layout.js` (stub — full version in Task 2)
- Create: `lib/data/locations.js`
- Create: `lib/data/services.js`
- Create: `lib/articles.js`
- Create: `next.config.js`
- Create: `vercel.json`
- Create: `public/fonts/` (Satoshi font files)
- Modify: `.gitignore`

- [ ] **Step 1: Create `redesign` branch**

```bash
cd "/Users/luke/Desktop/UnderCurrent Builds/Internal/Website/undercurrent"
git checkout -b redesign
```

- [ ] **Step 2: Scaffold Next.js 15 into a temp directory then copy files**

The existing SPA files must be preserved on `main` but replaced on `redesign`. Scaffold Next.js in a sibling temp dir, then copy the generated config/app structure over:

```bash
cd "/Users/luke/Desktop/UnderCurrent Builds/Internal/Website"
npx create-next-app@latest uc-next-temp \
  --js \
  --no-typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

- [ ] **Step 3: Copy Next.js scaffold files into the redesign branch**

```bash
cd "/Users/luke/Desktop/UnderCurrent Builds/Internal/Website"
# Copy Next.js project files into undercurrent/
cp uc-next-temp/next.config.js undercurrent/
cp uc-next-temp/package.json undercurrent/package.next.json  # review before replacing
cp -r uc-next-temp/app undercurrent/
rm -rf uc-next-temp
```

Then manually merge `package.next.json` into the existing `package.json`: replace dependencies with the Next.js set (remove vite, react-router-dom, gsap, framer-motion, marked), and add new deps. Delete `package.next.json` when done.

- [ ] **Step 4: Install dependencies**

```bash
cd "/Users/luke/Desktop/UnderCurrent Builds/Internal/Website/undercurrent"
npm install
npm install gray-matter remark remark-html lucide-react zod @vercel/analytics @vercel/speed-insights
```

- [ ] **Step 5: Download Satoshi fonts**

Download from Fontshare (fontshare.com/fonts/satoshi). Place files at:
- `public/fonts/Satoshi-Variable.woff2`
- `public/fonts/Satoshi-VariableItalic.woff2`

- [ ] **Step 6: Write `app/globals.css`**

Replace the scaffolded globals.css entirely:

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

  /* Spacing */
  --spacing-section: 6rem;
  --spacing-section-sm: 4rem;
}

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

.fade-hidden {
  opacity: 0;
  transform: translateY(24px);
}

.fade-visible {
  opacity: 1;
  transform: translateY(0);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

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

- [ ] **Step 7: Write stub `app/layout.js`** (full version in Task 2)

```js
// app/layout.js
import './globals.css'

export const metadata = {
  title: 'UnderCurrent',
  description: 'AI Automation for Small Business',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

- [ ] **Step 8: Write `next.config.js`**

```js
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {}

export default nextConfig
```

- [ ] **Step 9: Write `vercel.json`**

Delete any existing vercel.json and create fresh (no SPA catch-all rewrite):

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

- [ ] **Step 10: Copy data files**

```bash
cp src/data/locations.js lib/data/locations.js
cp src/data/services.js lib/data/services.js
```

Then open `lib/data/locations.js` and `lib/data/services.js` and change any default exports to named exports:

```js
// lib/data/locations.js
export const LOCATIONS = [ /* existing array */ ]
```

```js
// lib/data/services.js
export const SERVICES = [ /* existing array */ ]
```

- [ ] **Step 11: Write `lib/articles.js`**

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

- [ ] **Step 12: Copy article markdown files**

```bash
mkdir -p content/articles
cp src/content/articles/*.md content/articles/
```

- [ ] **Step 13: Update `.gitignore`**

```
node_modules/
.env
.env.local
.env*.local
.next/
dist/
.DS_Store
```

- [ ] **Step 14: Verify build runs**

```bash
npm run build
```

Expected: Build completes with no errors. The stub layout and default Next.js page render at `/`.

- [ ] **Step 15: Push redesign branch to GitHub**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 foundation on redesign branch"
git push -u origin redesign
```

Expected: Vercel auto-deploys the redesign branch to a preview URL. Confirm the URL loads.

---

## Task 2: UI Primitives + Root Layout

**Depends on Task 1. Run after Task 1 completes. Task 7 can run in parallel with this task.**

**Files:**
- Modify: `app/layout.js`
- Create: `app/not-found.js`
- Create: `components/layout/Header.js`
- Create: `components/layout/Footer.js`
- Create: `components/layout/Breadcrumb.js`
- Create: `components/ui/Button.js`
- Create: `components/ui/Card.js`
- Create: `components/ui/Badge.js`
- Create: `components/ui/JsonLd.js`
- Create: `components/ui/FadeIn.js`
- Create: `components/ui/Accordion.js`

- [ ] **Step 1: Write `app/layout.js` (full version)**

```js
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
```

- [ ] **Step 2: Write `components/layout/Header.js`**

Migrate navigation from the existing `src/components/Navbar.jsx`. The Header needs mobile menu toggle state.

```js
// components/layout/Header.js
'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="mx-auto max-w-7xl px-6 flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-bold text-charcoal">
          UnderCurrent
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-body text-muted hover:text-charcoal transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="https://cal.com/undercurrent"
            className="rounded-md bg-charcoal px-4 py-2 text-sm font-body text-white hover:bg-blue transition-colors"
          >
            Book a Call
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-charcoal"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-white px-6 pb-6">
          <nav className="flex flex-col gap-4 pt-4">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-body text-charcoal"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="https://cal.com/undercurrent"
              onClick={() => setOpen(false)}
              className="inline-block rounded-md bg-charcoal px-4 py-2 text-sm font-body text-white text-center"
            >
              Book a Call
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
```

- [ ] **Step 3: Write `components/layout/Footer.js`**

```js
// components/layout/Footer.js
import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/process', label: 'Process' },
  { href: '/resources', label: 'Resources' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <span className="font-display text-xl font-bold text-charcoal">UnderCurrent</span>
            <p className="mt-2 text-sm text-muted">AI Automation for Small Business. Melbourne, Australia.</p>
          </div>
          <nav className="flex flex-wrap gap-6">
            {FOOTER_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-charcoal transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-8 text-sm text-muted">
          © {new Date().getFullYear()} UnderCurrent Automations. ABN: [YOUR ABN].
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Write `components/layout/Breadcrumb.js`**

```js
// components/layout/Breadcrumb.js
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export default function Breadcrumb({ items }) {
  // items: [{ label: 'Home', href: '/' }, { label: 'Services' }]
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted">
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-2">
          {i > 0 && <ChevronRight size={14} className="text-border" />}
          {item.href ? (
            <Link href={item.href} className="hover:text-charcoal transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-charcoal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
```

- [ ] **Step 5: Write `components/ui/Button.js`**

```js
// components/ui/Button.js
import Link from 'next/link'

export default function Button({
  href,
  children,
  variant = 'primary',
  className = '',
  ...props
}) {
  const base = 'inline-block rounded-md px-6 py-3 text-sm font-body font-medium transition-colors'
  const variants = {
    primary: 'bg-charcoal text-white hover:bg-blue',
    secondary: 'border border-charcoal text-charcoal hover:bg-surface',
    ghost: 'text-charcoal hover:text-blue',
  }
  const cls = `${base} ${variants[variant]} ${className}`

  if (href) {
    return <Link href={href} className={cls} {...props}>{children}</Link>
  }
  return <button className={cls} {...props}>{children}</button>
}
```

- [ ] **Step 6: Write `components/ui/Card.js`**

```js
// components/ui/Card.js
export default function Card({ children, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-white p-6 ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 7: Write `components/ui/Badge.js`**

```js
// components/ui/Badge.js
export default function Badge({ children, className = '' }) {
  return (
    <span className={`inline-block rounded-full bg-surface px-3 py-1 text-xs font-body text-muted ${className}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 8: Write `components/ui/JsonLd.js`**

```js
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

- [ ] **Step 9: Write `components/ui/FadeIn.js`**

```js
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

- [ ] **Step 10: Write `components/ui/Accordion.js`**

```js
// components/ui/Accordion.js
'use client'
import { useState } from 'react'

export default function Accordion({ items, defaultOpenIndex = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex)

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="w-full py-5 text-left font-body text-charcoal flex justify-between items-center"
            aria-expanded={openIndex === i}
          >
            <span>{item.question}</span>
            <span
              className={`text-2xl text-muted transition-transform duration-200 ${openIndex === i ? 'rotate-45' : ''}`}
              aria-hidden="true"
            >
              +
            </span>
          </button>
          {openIndex === i && (
            <div className="pb-5 text-muted leading-relaxed">
              {item.answer}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 11: Write `app/not-found.js`**

```js
// app/not-found.js
import Link from 'next/link'

export const metadata = {
  title: 'Page Not Found',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="text-sm font-body text-blue uppercase tracking-widest">404</p>
      <h1 className="mt-4 font-display text-5xl font-bold text-charcoal">Page not found</h1>
      <p className="mt-6 max-w-sm text-muted">
        That page doesn&apos;t exist. It may have moved, or the URL might be wrong.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-md bg-charcoal px-6 py-3 text-sm font-body text-white hover:bg-blue transition-colors"
      >
        Back to Home
      </Link>
    </div>
  )
}
```

- [ ] **Step 12: Verify build**

```bash
npm run build
```

Expected: No errors. `Header`, `Footer`, and UI primitives compile cleanly.

- [ ] **Step 13: Commit**

```bash
git add -A
git commit -m "feat: root layout, Header, Footer, UI primitives, FadeIn, Accordion"
```

---

## Task 7: API Layer

**Depends on Task 1. Can run in parallel with Task 2.**

**Files:**
- Create: `lib/rateLimit.js`
- Create: `lib/webhookProxy.js`
- Create: `lib/validation.js`
- Create: `app/api/contact/route.js`
- Create: `app/api/qualify/route.js`
- Create: `app/api/audit/route.js`
- Create: `.env.local` (local dev — gitignored)

- [ ] **Step 1: Write `lib/rateLimit.js`**

```js
// lib/rateLimit.js
const store = new Map()

const WINDOW_MS = 60_000  // 1 minute
const MAX_REQUESTS = 5

export function rateLimit(ip) {
  const now = Date.now()
  const entry = store.get(ip) || []
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

- [ ] **Step 2: Write `lib/webhookProxy.js`**

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

- [ ] **Step 3: Write `lib/validation.js`**

```bash
npm install zod
```

```js
// lib/validation.js
import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email().max(254),
  phone: z.string().max(20).optional(),
  message: z.string().min(10).max(2000),
  company: z.string().max(100).optional(),
  honeypot: z.string().max(0).optional(),
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

- [ ] **Step 4: Write `app/api/contact/route.js`**

```js
// app/api/contact/route.js
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { contactSchema } from '@/lib/validation'
import { proxyToN8n } from '@/lib/webhookProxy'

const MAX_BODY_SIZE = 10_000

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

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

  if (result.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const { honeypot, ...payload } = result.data
  const proxy = await proxyToN8n(process.env.N8N_CONTACT_WEBHOOK_URL, payload)
  if (!proxy.ok) {
    return NextResponse.json({ error: 'Submission failed' }, { status: proxy.status })
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 5: Write `app/api/qualify/route.js`**

```js
// app/api/qualify/route.js
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { qualifySchema } from '@/lib/validation'
import { proxyToN8n } from '@/lib/webhookProxy'

const MAX_BODY_SIZE = 10_000

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = qualifySchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  if (result.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const { honeypot, ...payload } = result.data
  const proxy = await proxyToN8n(process.env.N8N_QUALIFIER_WEBHOOK_URL, payload)
  if (!proxy.ok) {
    return NextResponse.json({ error: 'Submission failed' }, { status: proxy.status })
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 6: Write `app/api/audit/route.js`**

```js
// app/api/audit/route.js
import { NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rateLimit'
import { auditSchema } from '@/lib/validation'
import { proxyToN8n } from '@/lib/webhookProxy'

const MAX_BODY_SIZE = 50_000  // audit results can be larger

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  const limit = rateLimit(ip)
  if (!limit.allowed) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429, headers: { 'Retry-After': '60' } }
    )
  }

  const contentLength = parseInt(request.headers.get('content-length') || '0', 10)
  if (contentLength > MAX_BODY_SIZE) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const result = auditSchema.safeParse(body)
  if (!result.success) {
    return NextResponse.json(
      { error: 'Validation failed', details: result.error.flatten().fieldErrors },
      { status: 422 }
    )
  }

  if (result.data.honeypot) {
    return NextResponse.json({ ok: true })
  }

  const { honeypot, ...payload } = result.data
  const proxy = await proxyToN8n(process.env.N8N_AUDIT_WEBHOOK_URL, payload)
  if (!proxy.ok) {
    return NextResponse.json({ error: 'Submission failed' }, { status: proxy.status })
  }

  return NextResponse.json({ ok: true })
}
```

- [ ] **Step 7: Create `.env.local` for local dev**

```bash
# .env.local — gitignored, local dev only
# Fill in real values manually
N8N_WEBHOOK_SECRET=dev-secret-placeholder
N8N_CONTACT_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/contact-form
N8N_AUDIT_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/business-audit
N8N_QUALIFIER_WEBHOOK_URL=https://n8n.undercurrentautomations.xyz/webhook/lead-qualifier
```

**Luke fills in real values manually. Never commit `.env.local`.**

- [ ] **Step 8: Test routes with curl (against local dev server)**

```bash
npm run dev &
sleep 3

# Contact route
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","message":"Hello from test"}'
# Expected: {"ok":true} or n8n proxy result

# Validation rejection
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"","email":"not-an-email","message":"short"}'
# Expected: {"error":"Validation failed","details":{...}}

# Honeypot silently accepted
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@bot.com","message":"Spammy content here","honeypot":"filled"}'
# Expected: {"ok":true} — silently accepted, not forwarded to n8n
```

- [ ] **Step 9: Commit**

```bash
git add lib/rateLimit.js lib/webhookProxy.js lib/validation.js app/api/
git commit -m "feat: API route handlers for contact, qualify, audit with rate limiting + validation"
```

---

## Task 3: Homepage

**Depends on Task 2. Can run in parallel with Tasks 4, 5, 6, 8.**

**Files:**
- Create: `components/sections/Hero.js`
- Create: `components/sections/TrustStrip.js`
- Create: `components/sections/ProblemFrame.js`
- Create: `components/sections/ServicesOverview.js`
- Create: `components/sections/IndustryScroller.js`
- Create: `components/sections/Process.js`
- Create: `components/sections/ComparisonTable.js`
- Create: `components/sections/Pricing.js`
- Create: `components/sections/Testimonials.js`
- Create: `components/sections/FAQ.js`
- Create: `components/sections/FinalCTA.js`
- Create: `lib/data/faq.js`
- Create: `lib/data/pricing.js`
- Create: `lib/data/industries.js`
- Modify: `app/page.js`

- [ ] **Step 1: Write `lib/data/faq.js`**

Populate with the top FAQ questions from Luke (see Open Questions #4 in `01-research.md`). Placeholder entries below — replace with real content before launch.

```js
// lib/data/faq.js
export const FAQ_ITEMS = [
  {
    question: 'What kinds of businesses do you work with?',
    answer: 'We work primarily with Australian small businesses — tradies, accountants, real estate agents, consultants, and service businesses with 1–20 staff. If your team spends more than 5 hours a week on repetitive admin, we can help.',
  },
  {
    question: 'How long does it take to get set up?',
    answer: 'Most clients are running their first automation within 3–5 business days. Complex multi-system integrations take 2–3 weeks. We move fast because we build purpose-built workflows, not off-the-shelf tools.',
  },
  {
    question: 'Do I need to be technical to use this?',
    answer: 'No. You tell us the outcome you want. We build it, test it, and hand it over with a simple walkthrough. Ongoing changes are handled by us — you just use the result.',
  },
  {
    question: 'What does it cost?',
    answer: 'Projects start from $1,500. Monthly retainers for ongoing optimisation and support start from $500/month. We give you a fixed-price quote upfront — no hourly billing surprises.',
  },
  {
    question: 'What tools do you integrate with?',
    answer: 'We work with the tools you already use: Xero, MYOB, Google Workspace, HubSpot, Notion, Slack, Airtable, ServiceM8, Tradify, and 300+ others. If it has an API, we can connect it.',
  },
  {
    question: 'Will I own the automation you build?',
    answer: 'Yes. Everything we build for you is yours. No lock-in. You get full access to the workflow and can run it independently. We recommend keeping us on retainer for ongoing improvements, but it\'s not required.',
  },
  {
    question: 'What if something breaks after you build it?',
    answer: 'Retainer clients get same-day support. Project-only clients get 30 days of bug fixes included. After that, we offer hourly support or a monthly retainer.',
  },
  {
    question: 'Is my data safe?',
    answer: 'Yes. We don\'t store your business data. Automations run between your own accounts and tools — we\'re the plumber, not the storage system. All integrations use OAuth or API keys scoped to the minimum required permissions.',
  },
]
```

- [ ] **Step 2: Write `lib/data/pricing.js`**

Populate with real tier data from Luke (see Open Questions #1 in `01-research.md`). Placeholders below.

```js
// lib/data/pricing.js
export const PRICING_TIERS = [
  {
    name: 'Starter Project',
    price: 'From $1,500',
    description: 'One workflow, built and handed over. Best for a single pain point like lead capture, invoice sending, or appointment follow-ups.',
    features: [
      'Discovery call + scoping',
      'One end-to-end workflow',
      '30 days bug-fix support',
      'Walkthrough recording',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/undercurrent?tier=starter' },
  },
  {
    name: 'Growth Retainer',
    price: 'From $1,200/mo',
    description: 'Ongoing builds and optimisation. Best for businesses ready to systematically remove admin from their operations.',
    features: [
      'Up to 3 new workflows/month',
      'Same-day support',
      'Monthly optimisation call',
      'Priority access',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/undercurrent?tier=growth' },
    featured: true,
  },
  {
    name: 'Done-With-You',
    price: 'From $500/mo',
    description: 'We guide, you build. Best for teams that want to own the process but need an expert to shortcut the learning curve.',
    features: [
      'Weekly strategy session',
      'Build reviews and feedback',
      'Async support via Slack',
      'Template library access',
    ],
    cta: { label: 'Book a Call', href: 'https://cal.com/undercurrent?tier=dwy' },
  },
]
```

- [ ] **Step 3: Write `lib/data/industries.js`**

```js
// lib/data/industries.js
export const INDUSTRIES = [
  'Tradies & Construction',
  'Accountants & Bookkeepers',
  'Real Estate & Property',
  'Allied Health',
  'Legal & Compliance',
  'Hospitality & Food',
  'Retail & eCommerce',
  'Coaches & Consultants',
  'Marketing Agencies',
  'HR & Recruitment',
  'Financial Planning',
  'Cleaning & Facilities',
]
```

- [ ] **Step 4: Write `components/sections/Hero.js`**

```js
// components/sections/Hero.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-white pt-16">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <FadeIn>
          <p className="text-sm font-body text-blue uppercase tracking-widest">
            AI Automation · Melbourne
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <h1 className="mt-4 font-display text-5xl md:text-7xl font-bold text-charcoal leading-tight">
            Stop doing work<br />a machine can do.
          </h1>
        </FadeIn>
        <FadeIn delay={200}>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            We build custom automation workflows that give small businesses 15+ hours a week back.
            No off-the-shelf tools. No lock-in. Done in days, not months.
          </p>
        </FadeIn>
        <FadeIn delay={300}>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="https://cal.com/undercurrent" variant="primary">
              Book a Free Call
            </Button>
            <Button href="/audit" variant="secondary">
              Free Business Audit
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Write `components/sections/TrustStrip.js`**

Replace placeholder stats with real numbers from Luke (see Open Questions #2 in `01-research.md`).

```js
// components/sections/TrustStrip.js
const STATS = [
  { value: '47+', label: 'Automations deployed' },
  { value: '2,100+', label: 'Hours saved per month' },
  { value: '3–5 days', label: 'Average delivery time' },
  { value: '100%', label: 'Client ownership' },
]

export default function TrustStrip() {
  return (
    <section className="border-y border-border bg-surface py-section-sm">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-3xl font-bold text-charcoal">{stat.value}</p>
              <p className="mt-1 text-sm text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 6: Write `components/sections/ProblemFrame.js`**

```js
// components/sections/ProblemFrame.js
import FadeIn from '@/components/ui/FadeIn'

const PAIN_POINTS = [
  'Quoting jobs manually while your phone keeps ringing',
  'Chasing unpaid invoices instead of doing billable work',
  'Onboarding new clients from a messy email thread',
  'Typing the same data into three different systems',
]

export default function ProblemFrame() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <FadeIn>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-charcoal">
              You&apos;re losing money to manual processes.
            </h2>
          </FadeIn>
          <FadeIn delay={100}>
            <p className="mt-6 text-lg text-muted">
              Every hour your team spends on repetitive admin is an hour not spent on clients,
              sales, or growth. The tasks are predictable. They can be automated. Most businesses
              just haven&apos;t done it yet.
            </p>
          </FadeIn>
          <ul className="mt-8 space-y-4">
            {PAIN_POINTS.map((point, i) => (
              <FadeIn key={i} delay={200 + i * 100}>
                <li className="flex items-start gap-3 text-charcoal">
                  <span className="mt-1 h-2 w-2 rounded-full bg-blue flex-shrink-0" />
                  {point}
                </li>
              </FadeIn>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 7: Write `components/sections/ServicesOverview.js`**

```js
// components/sections/ServicesOverview.js
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { SERVICES } from '@/lib/data/services'

export default function ServicesOverview() {
  // Show first 6 services
  const featured = SERVICES.slice(0, 6)

  return (
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">What we automate</h2>
          <p className="mt-4 text-muted max-w-xl">
            Every engagement is custom-built. These are the most common workflows we deliver.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((service, i) => (
            <FadeIn key={service.slug} delay={i * 75}>
              <Link
                href={`/${service.slug}`}
                className="block rounded-xl border border-border bg-white p-6 hover:border-blue transition-colors group"
              >
                <p className="text-xs font-body text-blue uppercase tracking-widest">
                  {service.label}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-charcoal group-hover:text-blue transition-colors">
                  {service.heroHeadline1} {service.heroHeadline2}
                </h3>
                <p className="mt-3 text-sm text-muted line-clamp-2">{service.heroCopy}</p>
              </Link>
            </FadeIn>
          ))}
        </div>
        <FadeIn delay={500}>
          <div className="mt-10 text-center">
            <Link
              href="/services"
              className="text-sm font-body text-blue hover:text-blue-dark transition-colors"
            >
              View all services →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 8: Write `components/sections/IndustryScroller.js`**

```js
// components/sections/IndustryScroller.js
'use client'
import { useRef, useState } from 'react'
import { INDUSTRIES } from '@/lib/data/industries'

export default function IndustryScroller() {
  const [paused, setPaused] = useState(false)
  // Duplicate list for seamless loop
  const items = [...INDUSTRIES, ...INDUSTRIES]

  return (
    <section className="bg-white border-y border-border py-section-sm overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 mb-8">
        <p className="text-sm text-muted uppercase tracking-widest">Industries we serve</p>
      </div>
      <div
        className="relative flex"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          className="flex gap-4 whitespace-nowrap"
          style={{
            animation: `scroll 40s linear infinite`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        >
          {items.map((industry, i) => (
            <span
              key={i}
              className="inline-block rounded-full border border-border px-4 py-2 text-sm font-body text-muted"
            >
              {industry}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>
    </section>
  )
}
```

- [ ] **Step 9: Write `components/sections/Process.js`**

```js
// components/sections/Process.js
import FadeIn from '@/components/ui/FadeIn'

const STEPS = [
  {
    number: '01',
    title: 'Discovery call',
    description: 'We map your current workflow, find where time is leaking, and scope what to automate first.',
  },
  {
    number: '02',
    title: 'Build',
    description: 'We build the automation end-to-end in 3–5 days. You see it working before we hand it over.',
  },
  {
    number: '03',
    title: 'Handover',
    description: 'We walk you through it, give you full access, and make sure your team can use it confidently.',
  },
  {
    number: '04',
    title: 'Optimise',
    description: 'On retainer, we keep improving — adding new automations as your business changes.',
  },
]

export default function Process() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">How it works</h2>
          <p className="mt-4 text-muted max-w-xl">
            From first call to working automation in under a week.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((step, i) => (
            <FadeIn key={step.number} delay={i * 100}>
              <div>
                <p className="font-display text-5xl font-bold text-border">{step.number}</p>
                <h3 className="mt-4 font-display text-xl font-bold text-charcoal">{step.title}</h3>
                <p className="mt-3 text-sm text-muted leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 10: Write `components/sections/ComparisonTable.js`**

Populate the comparison rows with real content from Luke (see Open Questions #10 in `01-research.md`). Placeholders below.

```js
// components/sections/ComparisonTable.js
import FadeIn from '@/components/ui/FadeIn'

const ROWS = [
  { label: 'Cost',      diy: 'Free / cheap', agency: '$5–15K/mo', uc: 'From $1,500 project' },
  { label: 'Setup',     diy: 'Weeks/months', agency: 'Weeks',      uc: '3–5 days' },
  { label: 'Ownership', diy: 'You build it', agency: 'They own it',uc: 'You own it' },
  { label: 'Support',   diy: 'Forums / YouTube', agency: 'Account manager', uc: 'Direct access' },
  { label: 'Results',   diy: 'Depends on your skills', agency: 'Generic templates', uc: 'Built for your workflow' },
]

export default function ComparisonTable() {
  return (
    <section className="bg-surface py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">How we compare</h2>
          <p className="mt-4 max-w-xl text-muted">
            There are three ways to get your business automated. Here&apos;s an honest look at each.
          </p>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-10 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-4 pr-6 text-left font-body text-muted font-normal w-32"></th>
                  <th className="py-4 px-6 text-left font-display font-bold text-charcoal">DIY</th>
                  <th className="py-4 px-6 text-left font-display font-bold text-charcoal">Big Agency</th>
                  <th className="py-4 px-6 text-left font-display font-bold text-blue">UnderCurrent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {ROWS.map((row) => (
                  <tr key={row.label}>
                    <td className="py-4 pr-6 font-body text-muted">{row.label}</td>
                    <td className="py-4 px-6 text-charcoal">{row.diy}</td>
                    <td className="py-4 px-6 text-charcoal">{row.agency}</td>
                    <td className="py-4 px-6 font-medium text-charcoal">{row.uc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 11: Write `components/sections/Pricing.js`**

```js
// components/sections/Pricing.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import { PRICING_TIERS } from '@/lib/data/pricing'

export default function Pricing() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">Pricing</h2>
          <p className="mt-4 max-w-xl text-muted">
            Fixed-price projects. No hourly billing. No surprises.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PRICING_TIERS.map((tier, i) => (
            <FadeIn key={tier.name} delay={i * 100}>
              <div className={`rounded-xl border p-8 flex flex-col h-full ${tier.featured ? 'border-blue bg-charcoal text-white' : 'border-border bg-white'}`}>
                <p className={`text-sm uppercase tracking-widest font-body ${tier.featured ? 'text-blue' : 'text-muted'}`}>
                  {tier.name}
                </p>
                <p className={`mt-3 font-display text-3xl font-bold ${tier.featured ? 'text-white' : 'text-charcoal'}`}>
                  {tier.price}
                </p>
                <p className={`mt-3 text-sm leading-relaxed ${tier.featured ? 'text-white/70' : 'text-muted'}`}>
                  {tier.description}
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {tier.features.map(f => (
                    <li key={f} className={`flex items-start gap-2 text-sm ${tier.featured ? 'text-white/80' : 'text-charcoal'}`}>
                      <span className="mt-0.5 text-blue">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button
                    href={tier.cta.href}
                    variant={tier.featured ? 'secondary' : 'primary'}
                    className="w-full text-center justify-center"
                  >
                    {tier.cta.label}
                  </Button>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 12: Write `components/sections/Testimonials.js`**

Replace with real testimonials from Luke (see Open Questions #3 in `01-research.md`). Placeholders below.

```js
// components/sections/Testimonials.js
import FadeIn from '@/components/ui/FadeIn'

const TESTIMONIALS = [
  {
    quote: 'We were spending 3 hours a day on quoting and follow-ups. UnderCurrent automated the whole thing in 4 days. Best $2K we\'ve ever spent.',
    name: 'James T.',
    business: 'Plumbing & Gas, Brisbane',
  },
  {
    quote: 'Our new client onboarding used to take a week of back-and-forth. Now it\'s done in 20 minutes without us touching it.',
    name: 'Sarah M.',
    business: 'Accounting Practice, Melbourne',
  },
  {
    quote: 'I was sceptical automation was possible for our industry. Luke proved me wrong. The lead response time went from 2 days to 4 minutes.',
    name: 'Chris R.',
    business: 'Real Estate, Sydney',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-white py-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">What clients say</h2>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 100}>
              <div className="rounded-xl border border-border bg-surface p-6">
                <p className="text-charcoal leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-6">
                  <p className="font-body font-medium text-charcoal">{t.name}</p>
                  <p className="text-sm text-muted">{t.business}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 13: Write `components/sections/FAQ.js`**

```js
// components/sections/FAQ.js
import FadeIn from '@/components/ui/FadeIn'
import Accordion from '@/components/ui/Accordion'
import JsonLd from '@/components/ui/JsonLd'
import { FAQ_ITEMS } from '@/lib/data/faq'

export default function FAQ() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <section className="bg-surface py-section">
      <JsonLd schema={schema} />
      <div className="mx-auto max-w-3xl px-6">
        <FadeIn>
          <h2 className="font-display text-4xl font-bold text-charcoal">Common questions</h2>
        </FadeIn>
        <FadeIn delay={100}>
          <div className="mt-10">
            <Accordion items={FAQ_ITEMS} defaultOpenIndex={0} />
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 14: Write `components/sections/FinalCTA.js`**

```js
// components/sections/FinalCTA.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'

export default function FinalCTA() {
  return (
    <section className="bg-charcoal py-section">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <FadeIn>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">
            Ready to get your time back?
          </h2>
        </FadeIn>
        <FadeIn delay={100}>
          <p className="mt-6 max-w-xl mx-auto text-white/70">
            Book a free 30-minute call. We&apos;ll map out what to automate first and give you a
            fixed-price quote before we start.
          </p>
        </FadeIn>
        <FadeIn delay={200}>
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <Button href="https://cal.com/undercurrent" variant="secondary">
              Book a Free Call
            </Button>
            <Button href="/audit" variant="ghost" className="text-white hover:text-white/70">
              Take the free audit →
            </Button>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
```

- [ ] **Step 15: Write `app/page.js`**

```js
// app/page.js
import Hero from '@/components/sections/Hero'
import TrustStrip from '@/components/sections/TrustStrip'
import ProblemFrame from '@/components/sections/ProblemFrame'
import ServicesOverview from '@/components/sections/ServicesOverview'
import IndustryScroller from '@/components/sections/IndustryScroller'
import Process from '@/components/sections/Process'
import ComparisonTable from '@/components/sections/ComparisonTable'
import Pricing from '@/components/sections/Pricing'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import FinalCTA from '@/components/sections/FinalCTA'
import JsonLd from '@/components/ui/JsonLd'

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'UnderCurrent Automations',
  url: 'https://undercurrentautomations.com.au',
  description: 'AI automation for small businesses in Australia.',
  areaServed: 'Australia',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
}

export default function HomePage() {
  return (
    <>
      <JsonLd schema={orgSchema} />
      <Hero />
      <TrustStrip />
      <ProblemFrame />
      <ServicesOverview />
      <IndustryScroller />
      <Process />
      <ComparisonTable />
      <Pricing />
      <Testimonials />
      <FAQ />
      <FinalCTA />
    </>
  )
}
```

- [ ] **Step 16: Verify build and review homepage on dev server**

```bash
npm run build && npm run dev
```

Open `http://localhost:3000`. Verify: hero displays, FadeIn animations work, services grid pulls from data, accordion opens first item by default, pricing cards render correctly.

- [ ] **Step 17: Commit**

```bash
git add -A
git commit -m "feat: homepage — all sections, data files, FadeIn animations"
```

---

## Task 4: Slug Dispatcher + Location/Service Pages

**Depends on Task 2. Can run in parallel with Tasks 3, 5, 6, 8.**

**Files:**
- Create: `app/[slug]/page.js`
- Create: `components/pages/LocationPage.js`
- Create: `components/pages/ServicePage.js`

- [ ] **Step 1: Write `app/[slug]/page.js`**

```js
// app/[slug]/page.js
import { notFound } from 'next/navigation'
import { LOCATIONS } from '@/lib/data/locations'
import { SERVICES } from '@/lib/data/services'
import LocationPage from '@/components/pages/LocationPage'
import ServicePage from '@/components/pages/ServicePage'

export const dynamicParams = false

export function generateStaticParams() {
  const locationSlugs = new Set(LOCATIONS.map(l => l.slug))
  const serviceSlugs = new Set(SERVICES.map(s => s.slug))

  for (const slug of locationSlugs) {
    if (serviceSlugs.has(slug)) {
      console.warn(`[slug collision] "${slug}" exists in both locations and services`)
    }
  }

  return [
    ...LOCATIONS.map(l => ({ slug: l.slug })),
    ...SERVICES.map(s => ({ slug: s.slug })),
  ]
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

- [ ] **Step 2: Write `components/pages/LocationPage.js`**

Migrate from `src/pages/LocationPage.jsx`. Replace React Router imports with Next.js. Remove GSAP, replace with FadeIn. The existing LocationPage.jsx contains the full markup — keep the structure but update imports.

Open `src/pages/LocationPage.jsx` and recreate it as a server component at the new path, with these changes:

1. Remove `import { useParams } from 'react-router-dom'` — data is passed via props
2. Remove any GSAP imports — replace scroll animations with `<FadeIn>`
3. Update all icon imports to `lucide-react`
4. Add LocalBusiness JSON-LD schema

```js
// components/pages/LocationPage.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import JsonLd from '@/components/ui/JsonLd'

export default function LocationPage({ location }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: `UnderCurrent Automations — ${location.city}`,
    description: location.metaDescription,
    url: `https://undercurrentautomations.com.au/${location.slug}`,
    areaServed: {
      '@type': 'City',
      name: location.city,
    },
  }

  return (
    <>
      <JsonLd schema={schema} />
      {/* Migrate full markup from src/pages/LocationPage.jsx here */}
      {/* Replace router state with location prop */}
      {/* Replace GSAP with <FadeIn> */}
    </>
  )
}
```

**Important:** Read `src/pages/LocationPage.jsx` in full before writing this component. Preserve all existing sections and content structure.

- [ ] **Step 3: Write `components/pages/ServicePage.js`**

Same pattern as LocationPage. Read `src/pages/ServicePage.jsx` first, then migrate with:
1. Props instead of router params
2. FadeIn instead of GSAP
3. Service JSON-LD schema

```js
// components/pages/ServicePage.js
import FadeIn from '@/components/ui/FadeIn'
import Button from '@/components/ui/Button'
import JsonLd from '@/components/ui/JsonLd'

export default function ServicePage({ service }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.label,
    description: service.metaDescription,
    url: `https://undercurrentautomations.com.au/${service.slug}`,
    provider: {
      '@type': 'Organization',
      name: 'UnderCurrent Automations',
    },
  }

  return (
    <>
      <JsonLd schema={schema} />
      {/* Migrate full markup from src/pages/ServicePage.jsx */}
    </>
  )
}
```

- [ ] **Step 4: Verify all slugs generate correctly**

```bash
npm run build 2>&1 | grep -E "(slug|location|service|warning|error)"
```

Expected: All location and service slugs appear in the build output. No collision warnings. No errors.

- [ ] **Step 5: Spot-check a location and service page**

```bash
npm run dev
```

Open `http://localhost:3000/ai-automation-melbourne` — location page renders.
Open `http://localhost:3000/customer-experience-automation` — service page renders.
Open `http://localhost:3000/nonexistent-slug` — 404 page renders.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: slug dispatcher for location + service pages with collision detection"
```

---

## Task 5: Articles (Resources)

**Depends on Task 2. Can run in parallel with Tasks 3, 4, 6, 8.**

**Files:**
- Create: `app/resources/page.js`
- Create: `app/resources/[slug]/page.js`
- Create: `app/resources/[slug]/opengraph-image.js` (optional, if article hero images exist)

- [ ] **Step 1: Write `app/resources/page.js`**

```js
// app/resources/page.js
import Link from 'next/link'
import FadeIn from '@/components/ui/FadeIn'
import { getAllArticles } from '@/lib/articles'

export const metadata = {
  title: 'Resources',
  description: 'Guides, insights, and automation ideas for Australian small businesses.',
}

export default function ResourcesPage() {
  const articles = getAllArticles()

  return (
    <div className="bg-white pt-24 pb-section">
      <div className="mx-auto max-w-7xl px-6">
        <FadeIn>
          <h1 className="font-display text-5xl font-bold text-charcoal">Resources</h1>
          <p className="mt-4 text-muted max-w-xl">
            Guides and insights for Australian small businesses looking to automate smarter.
          </p>
        </FadeIn>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <FadeIn key={article.slug} delay={i * 50}>
              <Link
                href={`/resources/${article.slug}`}
                className="block rounded-xl border border-border bg-white p-6 hover:border-blue transition-colors group"
              >
                {article.category && (
                  <p className="text-xs font-body text-blue uppercase tracking-widest">
                    {article.category}
                  </p>
                )}
                <h2 className="mt-3 font-display text-xl font-bold text-charcoal group-hover:text-blue transition-colors line-clamp-2">
                  {article.title}
                </h2>
                {article.description && (
                  <p className="mt-3 text-sm text-muted line-clamp-3">{article.description}</p>
                )}
                {article.date && (
                  <p className="mt-4 text-xs text-muted">
                    {new Date(article.date).toLocaleDateString('en-AU', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </p>
                )}
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write `app/resources/[slug]/page.js`**

```js
// app/resources/[slug]/page.js
import { notFound } from 'next/navigation'
import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import JsonLd from '@/components/ui/JsonLd'
import Breadcrumb from '@/components/layout/Breadcrumb'

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
      type: 'article',
      publishedTime: article.frontmatter.date,
    },
  }
}

export default async function ArticlePage({ params }) {
  const article = await getArticleBySlug(params.slug)
  if (!article) return notFound()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.frontmatter.title,
    description: article.frontmatter.description,
    datePublished: article.frontmatter.date,
    author: {
      '@type': 'Organization',
      name: 'UnderCurrent Automations',
    },
    publisher: {
      '@type': 'Organization',
      name: 'UnderCurrent Automations',
      url: 'https://undercurrentautomations.com.au',
    },
    url: `https://undercurrentautomations.com.au/resources/${params.slug}`,
  }

  return (
    <article className="bg-white pt-24 pb-section">
      <JsonLd schema={schema} />
      <div className="mx-auto max-w-3xl px-6">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Resources', href: '/resources' },
          { label: article.frontmatter.title },
        ]} />

        <header className="mt-8">
          {article.frontmatter.category && (
            <p className="text-sm font-body text-blue uppercase tracking-widest">
              {article.frontmatter.category}
            </p>
          )}
          <h1 className="mt-3 font-display text-4xl md:text-5xl font-bold text-charcoal leading-tight">
            {article.frontmatter.title}
          </h1>
          {article.frontmatter.date && (
            <p className="mt-4 text-sm text-muted">
              {new Date(article.frontmatter.date).toLocaleDateString('en-AU', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          )}
        </header>

        <div
          className="mt-10 prose prose-lg max-w-none prose-headings:font-display prose-headings:text-charcoal prose-p:text-muted prose-a:text-blue"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </div>
    </article>
  )
}
```

- [ ] **Step 3: Verify all 12 articles generate**

```bash
npm run build 2>&1 | grep "resources/"
```

Expected: 12 article routes appear in build output. No errors.

- [ ] **Step 4: Spot-check an article page**

```bash
npm run dev
```

Open `http://localhost:3000/resources` — 12 article cards render.
Open `http://localhost:3000/resources/automating-business-processes-australia-sme-guide` — article renders with title, date, and body HTML.
Open page source and verify `<title>` and `<meta name="description">` are server-rendered.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: resources listing + server-rendered article pages with BlogPosting JSON-LD"
```

---

## Task 6: Audit Tools

**Depends on Task 2. Can run in parallel with Tasks 3, 4, 5, 8.**

**Files:**
- Create: `app/audit/page.js`
- Create: `app/audit/report/page.js`
- Create: `app/roi/page.js`
- Create: `app/missed-revenue/page.js`
- Create: `components/audit/BusinessAuditV2.js`
- Create: `components/audit/AuditReport.js`
- Create: `components/audit/ROICalculator.js`
- Create: `components/audit/MissedRevenueAudit.js`
- Create: `components/audit/RadarChart.js`
- Create: `components/audit/calculations.js`
- Create: `components/audit/config.js`

- [ ] **Step 1: Copy and migrate `calculations.js` and `config.js`**

These are pure JS with no React — no directive needed. Copy directly:

```bash
cp src/audit/calculations.js components/audit/calculations.js 2>/dev/null || \
cp src/components/audit/calculations.js components/audit/calculations.js 2>/dev/null
cp src/audit/config.js components/audit/config.js 2>/dev/null || \
cp src/components/audit/config.js components/audit/config.js 2>/dev/null
```

Open each file. Verify no `import` from react-router-dom, gsap, or framer-motion. Update any relative imports if needed. No changes to logic.

- [ ] **Step 2: Migrate `BusinessAuditV2.js`**

Read `src/pages/BusinessAuditV2.jsx` (or `src/audit/BusinessAuditV2.jsx`). Migrate with these changes:

1. Add `'use client'` at top
2. Remove `import { useNavigate } from 'react-router-dom'`
3. Replace `navigate('/audit/report', { state: { data } })` with:
   ```js
   import { useRouter } from 'next/navigation'
   const router = useRouter()
   router.push('/audit/report?d=' + encodeURIComponent(btoa(JSON.stringify(data))))
   ```
4. Remove GSAP imports — replace with CSS transitions or FadeIn
5. Keep all audit logic, scoring, and form structure intact

After form submission (after the router.push), also POST to the API route:
```js
// After router.push (fire-and-forget, don't await)
fetch('/api/audit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: formData.name,
    email: formData.email,
    businessName: formData.businessName,
    industry: formData.industry,
    results: auditResults,
  }),
}).catch(() => {}) // ignore errors — don't block the user
```

- [ ] **Step 3: Migrate `AuditReport.js`**

Read `src/pages/AuditReport.jsx`. Migrate with:

1. Add `'use client'`
2. Remove `import { useLocation } from 'react-router-dom'`
3. Replace `const { state } = useLocation()` with `useSearchParams()`:
   ```js
   import { useSearchParams } from 'next/navigation'

   export default function AuditReport() {
     const searchParams = useSearchParams()
     const encoded = searchParams.get('d')
     let data = null
     try {
       data = encoded ? JSON.parse(atob(decodeURIComponent(encoded))) : null
     } catch {
       data = null
     }
     if (!data) return <div className="text-center py-20 text-muted">No audit data found.</div>
     // ... rest of existing component
   }
   ```
4. Remove GSAP — replace animations with CSS transitions
5. Keep RadarChart, scoring display, and all result rendering intact

- [ ] **Step 4: Migrate `RadarChart.js`**

```bash
cp src/audit/RadarChart.jsx components/audit/RadarChart.js 2>/dev/null || \
cp src/components/audit/RadarChart.jsx components/audit/RadarChart.js 2>/dev/null
```

Add `'use client'` at the top. Update any imports. No logic changes.

- [ ] **Step 5: Migrate `ROICalculator.js` and `MissedRevenueAudit.js`**

```bash
cp src/pages/ROICalculator.jsx components/audit/ROICalculator.js
cp src/pages/MissedRevenueAudit.jsx components/audit/MissedRevenueAudit.js
```

For each file:
1. Add `'use client'`
2. Remove any react-router-dom imports
3. Remove GSAP imports
4. Update relative imports to use `@/` aliases

- [ ] **Step 6: Write `app/audit/page.js`**

```js
// app/audit/page.js
import BusinessAuditV2 from '@/components/audit/BusinessAuditV2'

export const metadata = {
  title: 'Free Business Automation Audit',
  description: 'Find out exactly which parts of your business could be automated. Free, instant results.',
}

export default function AuditPage() {
  return <BusinessAuditV2 />
}
```

- [ ] **Step 7: Write `app/audit/report/page.js`**

```js
// app/audit/report/page.js
import { Suspense } from 'react'
import AuditReport from '@/components/audit/AuditReport'

export const metadata = {
  title: 'Your Automation Audit Report',
  robots: { index: false, follow: false },
}

function AuditReportSkeleton() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-transparent border-t-blue" />
    </div>
  )
}

export default function AuditReportPage() {
  return (
    <Suspense fallback={<AuditReportSkeleton />}>
      <AuditReport />
    </Suspense>
  )
}
```

- [ ] **Step 8: Write `app/roi/page.js`**

```js
// app/roi/page.js
import ROICalculator from '@/components/audit/ROICalculator'

export const metadata = {
  title: 'ROI Calculator',
  description: 'Calculate the return on investment from automating your business processes.',
}

export default function ROIPage() {
  return <ROICalculator />
}
```

- [ ] **Step 9: Write `app/missed-revenue/page.js`**

```js
// app/missed-revenue/page.js
import MissedRevenueAudit from '@/components/audit/MissedRevenueAudit'

export const metadata = {
  title: 'Missed Revenue Audit',
  description: 'Find out how much revenue you\'re leaving on the table from slow follow-ups and manual processes.',
}

export default function MissedRevenuePage() {
  return <MissedRevenueAudit />
}
```

- [ ] **Step 10: Test the audit flow end-to-end**

```bash
npm run dev
```

1. Open `http://localhost:3000/audit`
2. Complete the audit form
3. Verify it redirects to `/audit/report?d=<encoded>`
4. Verify the report page decodes and renders the results
5. Check browser DevTools → Network for the `/api/audit` POST (should fire after redirect)

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: audit tools migrated — BusinessAuditV2, AuditReport, ROI, MissedRevenue"
```

---

## Task 8: SEO + Remaining Static Pages

**Depends on Task 2. Can run in parallel with Tasks 3, 4, 5, 6.**

**Files:**
- Create: `app/sitemap.js`
- Create: `app/robots.js`
- Create: `app/feed.xml/route.js`
- Create: `app/llms.txt/route.js`
- Create: `app/about/page.js`
- Create: `app/process/page.js`
- Create: `app/services/page.js`
- Create: `app/contact/page.js`
- Create: `app/case-study/page.js`
- Create: `app/privacy/page.js`
- Create: `app/terms/page.js`
- Create: `components/forms/ContactForm.js`

- [ ] **Step 1: Write `app/sitemap.js`**

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

- [ ] **Step 2: Write `app/robots.js`**

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

- [ ] **Step 3: Write `app/feed.xml/route.js`**

```js
// app/feed.xml/route.js
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://undercurrentautomations.com.au'

export async function GET() {
  const articles = getAllArticles()

  const items = articles.map(a => `
    <item>
      <title><![CDATA[${a.title}]]></title>
      <link>${BASE}/resources/${a.slug}</link>
      <guid>${BASE}/resources/${a.slug}</guid>
      <pubDate>${new Date(a.date).toUTCString()}</pubDate>
      ${a.description ? `<description><![CDATA[${a.description}]]></description>` : ''}
    </item>`).join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>UnderCurrent Automations</title>
    <link>${BASE}</link>
    <description>AI automation insights for Australian small businesses</description>
    <language>en-AU</language>
    ${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
  })
}
```

- [ ] **Step 4: Write `app/llms.txt/route.js`**

```js
// app/llms.txt/route.js
import { SERVICES } from '@/lib/data/services'
import { LOCATIONS } from '@/lib/data/locations'
import { getAllArticles } from '@/lib/articles'

const BASE = 'https://undercurrentautomations.com.au'

export async function GET() {
  const articles = getAllArticles()

  const content = `# UnderCurrent Automations

> AI automation for Australian small businesses. We build custom workflows that save 15+ hours a week.

## Services

${SERVICES.map(s => `- [${s.label}](${BASE}/${s.slug}): ${s.metaDescription}`).join('\n')}

## Locations

${LOCATIONS.map(l => `- [${l.city}, ${l.region}](${BASE}/${l.slug}): ${l.metaDescription}`).join('\n')}

## Resources

${articles.map(a => `- [${a.title}](${BASE}/resources/${a.slug})`).join('\n')}
`

  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
```

- [ ] **Step 5: Write `components/forms/ContactForm.js`**

```js
// components/forms/ContactForm.js
'use client'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const INITIAL = { name: '', email: '', phone: '', company: '', message: '', honeypot: '' }

export default function ContactForm() {
  const [form, setForm] = useState(INITIAL)
  const [status, setStatus] = useState('idle') // idle | loading | success | error

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed')
      setStatus('success')
      setForm(INITIAL)
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-border bg-surface p-8 text-center">
        <p className="font-display text-2xl font-bold text-charcoal">Message received.</p>
        <p className="mt-3 text-muted">We&apos;ll be in touch within 1 business day.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot — hidden from users */}
      <input
        type="text"
        name="honeypot"
        value={form.honeypot}
        onChange={set('honeypot')}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="name">Name *</label>
          <input
            id="name"
            type="text"
            required
            value={form.name}
            onChange={set('name')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={set('email')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-body text-charcoal mb-2" htmlFor="company">Business name</label>
          <input
            id="company"
            type="text"
            value={form.company}
            onChange={set('company')}
            className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-body text-charcoal mb-2" htmlFor="message">Message *</label>
        <textarea
          id="message"
          required
          rows={5}
          value={form.message}
          onChange={set('message')}
          className="w-full rounded-md border border-border bg-white px-4 py-3 text-sm text-charcoal focus:border-blue focus:outline-none resize-none"
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">Something went wrong. Please try again or email us directly.</p>
      )}

      <Button type="submit" disabled={status === 'loading'} variant="primary">
        {status === 'loading' ? 'Sending...' : 'Send message'}
      </Button>
    </form>
  )
}
```

- [ ] **Step 6: Write `app/contact/page.js`**

```js
// app/contact/page.js
import ContactForm from '@/components/forms/ContactForm'
import FadeIn from '@/components/ui/FadeIn'

export const metadata = {
  title: 'Contact',
  description: 'Get in touch with UnderCurrent Automations. We respond within 1 business day.',
}

export default function ContactPage() {
  return (
    <div className="bg-white pt-24 pb-section">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <FadeIn>
              <h1 className="font-display text-5xl font-bold text-charcoal">Let&apos;s talk.</h1>
              <p className="mt-4 text-muted max-w-md">
                Tell us what&apos;s eating your time. We&apos;ll tell you whether it can be automated
                and roughly what it would cost — no fluff.
              </p>
            </FadeIn>
            <FadeIn delay={100}>
              <div className="mt-8 space-y-4">
                <p className="text-sm text-muted">
                  Prefer to skip the form?{' '}
                  <a href="https://cal.com/undercurrent" className="text-blue hover:text-blue-dark">
                    Book a call directly.
                  </a>
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 7: Write remaining static pages**

For each page below, migrate from the corresponding `src/pages/*.jsx` file. Preserve all existing content and structure.

**`app/about/page.js`** — migrate from `src/pages/About.jsx`
**`app/process/page.js`** — migrate from `src/pages/Process.jsx`
**`app/services/page.js`** — migrate from `src/pages/Services.jsx`
**`app/case-study/page.js`** — migrate from `src/pages/CaseStudies.jsx`
**`app/privacy/page.js`** — migrate from `src/pages/PrivacyPolicy.jsx`
**`app/terms/page.js`** — migrate from `src/pages/TermsOfService.jsx`

Each page follows this pattern:

```js
// app/[page]/page.js
export const metadata = {
  title: '[Page Title]',
  description: '[Description from existing page or meta]',
}

export default function [PageName]() {
  return (
    <div className="bg-white pt-24 pb-section">
      <div className="mx-auto max-w-7xl px-6">
        {/* Migrated markup from src/pages/*.jsx */}
        {/* Replace GSAP with FadeIn */}
        {/* Remove react-router-dom imports */}
      </div>
    </div>
  )
}
```

- [ ] **Step 8: Verify sitemap**

```bash
npm run dev
curl http://localhost:3000/sitemap.xml
```

Expected: Valid XML with all static pages, all location slugs, all service slugs, and all 12 article URLs.

```bash
curl http://localhost:3000/robots.txt
```

Expected: `Disallow: /api/` and `Disallow: /audit/report` present.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: sitemap, robots, feed.xml, llms.txt, contact form, all static pages"
```

---

## Task 9: QA + Polish

**Depends on Tasks 3, 4, 5, 6, 7, 8. Sequential.**

- [ ] **Step 1: Crawl URL audit — verify no URLs are missing**

Run a build and check all generated routes match the existing production site's routes. The existing Vite SPA's routes are defined in `src/App.jsx`.

```bash
npm run build 2>&1 | grep -E "○|●|λ" | sort
```

Cross-reference against the existing routes in `src/App.jsx`. Every route in the SPA must appear in the Next.js build output.

- [ ] **Step 2: Lighthouse audit**

```bash
npm run build && npm start
```

Open Chrome → DevTools → Lighthouse. Run on:
- `/` (homepage)
- `/ai-automation-melbourne` (location page)
- `/resources/automating-business-processes-australia-sme-guide` (article)

Target: 90+ on Performance, Accessibility, Best Practices, SEO.

Fix any issues before proceeding.

- [ ] **Step 3: Server-rendered metadata check**

```bash
curl -s http://localhost:3000 | grep -E "<title>|<meta name=\"description\""
curl -s http://localhost:3000/ai-automation-melbourne | grep -E "<title>|<meta name=\"description\""
curl -s http://localhost:3000/resources/automating-business-processes-australia-sme-guide | grep -E "<title>|<meta name=\"description\""
```

Expected: Each page returns its correct title and description in the raw HTML (not injected by JS).

- [ ] **Step 4: Open Graph tags check**

Use the [Open Graph Debugger](https://developers.facebook.com/tools/debug/) against the Vercel preview URL. Check homepage, one location page, one article page.

Verify `og:title`, `og:description`, `og:image` (if set) are correct.

- [ ] **Step 5: JSON-LD validation**

Use [schema.org validator](https://validator.schema.org/) or `Rich Results Test` (search.google.com/test/rich-results) against:
- Homepage (Organization schema)
- A location page (LocalBusiness schema)
- An article page (BlogPosting schema)
- The FAQ section on homepage (FAQPage schema)

- [ ] **Step 6: Mobile and cross-browser check**

Test on:
- Chrome desktop
- Safari desktop
- Chrome mobile (DevTools device emulation)
- Safari mobile (if available)

Verify: header mobile menu opens/closes, FadeIn animations work, IndustryScroller pauses on hover, accordion opens/closes.

- [ ] **Step 7: Reduced motion check**

In Chrome DevTools → Rendering → Emulate CSS media feature → `prefers-reduced-motion: reduce`.

Verify: Elements appear without fade animation. No layout shift.

- [ ] **Step 8: 404 behavior**

Open `http://localhost:3000/this-slug-does-not-exist`.

Expected: Next.js `not-found.js` renders, not a raw "page not found" error.

- [ ] **Step 9: Form submission test (against preview deployment)**

On the Vercel preview URL (not localhost, since env vars are set there):

```bash
curl -X POST https://<preview-url>/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"QA Test","email":"test@example.com","message":"QA test message — please ignore"}'
```

Expected: `{"ok":true}`. Check n8n for the received webhook.

- [ ] **Step 10: Fix issues found, then commit**

```bash
git add -A
git commit -m "fix: QA polish — metadata, mobile, accessibility, JSON-LD"
```

---

## Task 10: Launch

**Depends on Task 9. Sequential.**

- [ ] **Step 1: Set production environment variables in Vercel**

In the Vercel project dashboard → Settings → Environment Variables, add for Production scope:

- `N8N_WEBHOOK_SECRET`
- `N8N_CONTACT_WEBHOOK_URL`
- `N8N_AUDIT_WEBHOOK_URL`
- `N8N_QUALIFIER_WEBHOOK_URL`

Luke sets these manually from the values in `.env.local`. Never paste in chat.

- [ ] **Step 2: Final review on preview URL**

Click through every route on the Vercel preview URL. Verify:
- [ ] Homepage loads and all sections render
- [ ] Header nav works on mobile
- [ ] At least 3 location pages load with correct metadata
- [ ] At least 3 service pages load with correct metadata
- [ ] Resources listing shows all 12 articles
- [ ] At least 2 article pages render with correct title in `<title>` tag
- [ ] Audit flow works end-to-end (form → report page)
- [ ] Contact form submits and returns success state
- [ ] 404 page appears for unknown slugs
- [ ] `/sitemap.xml` returns valid XML
- [ ] `/robots.txt` returns correct rules
- [ ] `/feed.xml` returns valid RSS

- [ ] **Step 3: Merge redesign to main**

```bash
git checkout main
git merge redesign --no-ff -m "feat: Next.js 15 redesign — server-rendered metadata, SSG, n8n API layer"
git push origin main
```

- [ ] **Step 4: Verify production deployment**

Vercel deploys `main` to production automatically. Watch the deployment in the Vercel dashboard.

When deployed, smoke test the production domain:
- Homepage loads
- A location page loads with correct `<title>` in page source
- Contact form submits

- [ ] **Step 5: Monitor for errors**

Check Vercel Analytics and Functions logs for the first 30 minutes after launch.

Watch for:
- 404s on routes that should exist
- 500s on API routes
- Any n8n webhook failures

- [ ] **Step 6: Delete the old SPA dist artifacts**

```bash
rm -rf dist/
git add -A
git commit -m "chore: remove Vite dist artifacts post-launch"
git push
```

---

## Open Questions (must resolve before launch)

These are from `01-research.md`. Answer and fill into the relevant data files before Task 9:

1. **Pricing** — real tier names, prices, scope (`lib/data/pricing.js`)
2. **Trust strip stats** — real numbers for TrustStrip section
3. **Testimonials** — real quotes with permission (`components/sections/Testimonials.js`)
4. **FAQ content** — real questions from prospect conversations (`lib/data/faq.js`)
5. **Comparison table** — real content per row (`components/sections/ComparisonTable.js`)
6. **Notion "Website Leads" database** — create if it doesn't exist; get URL for n8n workflow
7. **hero-bg.mp4** — keep video or static image? If video, compress under 2MB before Task 3
8. **ABN** — fill into Footer.js
9. **Cal.com URL** — verify the URL used in Header and CTAs is correct
