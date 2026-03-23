/**
 * SEO meta injection script — creates per-route HTML files with correct
 * <title>, <meta>, <link rel="canonical">, Open Graph, Twitter, and JSON-LD
 * so crawlers and social scrapers see the right metadata without JavaScript.
 *
 * No browser needed — works in any CI environment (including Vercel).
 *
 * Usage: node scripts/prerender.js
 * Runs automatically after "vite build" via package.json build script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const DOMAIN = 'https://www.undercurrentautomations.com'

// Per-route SEO metadata
const ROUTES = [
  {
    path: '/',
    title: 'UnderCurrent — AI Business Automation',
    description: 'Melbourne-based AI automation studio. We map small business workflows and build custom AI-powered systems that run your operations — silently, continuously, precisely.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'LocalBusiness',
          '@id': `${DOMAIN}/#business`,
          name: 'UnderCurrent',
          alternateName: 'UnderCurrent AI Automation',
          description: 'Melbourne-based AI automation studio specialising in workflow automation for small businesses.',
          url: DOMAIN,
          logo: `${DOMAIN}/favicon.svg`,
          image: `${DOMAIN}/og-image.jpg`,
          address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
          areaServed: { '@type': 'Country', name: 'Australia' },
          serviceType: ['AI Business Automation', 'Workflow Automation', 'Business Process Automation', 'AI Agent Deployment'],
          email: 'luke@undercurrentautomations.com',
          foundingDate: '2021',
        },
        {
          '@type': 'WebSite',
          '@id': `${DOMAIN}/#website`,
          url: DOMAIN,
          name: 'UnderCurrent',
          publisher: { '@id': `${DOMAIN}/#business` },
        },
        {
          '@type': 'FAQPage',
          'mainEntity': [
            { '@type': 'Question', name: 'Will this actually work for my type of business?', acceptedAnswer: { '@type': 'Answer', text: 'We work with any service-based business, tradies, consultants, coaches, agencies, healthcare practices. If you have repetitive tasks and customers, we can automate it. The audit tells you exactly how much.' } },
            { '@type': 'Question', name: "I'm not tech-savvy, will I be able to manage this?", acceptedAnswer: { '@type': 'Answer', text: "You don't manage anything. We build it, we maintain it, we fix it when something changes. You just receive the results. Most clients never need to open a settings panel." } },
            { '@type': 'Question', name: "What if it doesn't save me as much time as you say?", acceptedAnswer: { '@type': 'Answer', text: "We don't guess. In the audit, we show you the exact hours and tasks we'll automate before we build anything. You see the numbers first. If they don't impress you, walk away, no charge." } },
            { '@type': 'Question', name: 'How does this work with our existing tools?', acceptedAnswer: { '@type': 'Answer', text: "We connect to the software you already use, Gmail, HubSpot, Notion, Slack, Xero, whatever you have. Nothing changes about how your team works. We add automation underneath, so the results happen without you having to think about it." } },
            { '@type': 'Question', name: 'What does it actually cost?', acceptedAnswer: { '@type': 'Answer', text: "We price based on what we save you. If automation saves your business $20,000 a year, we take a small share, you keep the rest. Most clients see their full investment back within six months. We show you the numbers in the free audit before you spend anything." } },
            { '@type': 'Question', name: 'How long until we see results?', acceptedAnswer: { '@type': 'Answer', text: "Most clients notice a difference in the first two weeks. The full system is live in 30 days. We move fast because we've done this before. The free audit maps out exactly what gets automated and when." } },
            { '@type': 'Question', name: 'Do we own the automations or are we locked in?', acceptedAnswer: { '@type': 'Answer', text: "You own everything we build. If you ever want to take it in-house or move on, the automations stay with you. We're not a subscription you can't escape, we're here to build something that works for your business long term." } },
          ],
        },
      ],
    },
  },
  {
    path: '/about',
    title: 'About — UnderCurrent | AI Automation Studio, Melbourne',
    description: 'Learn about UnderCurrent — the Melbourne-based AI automation studio that maps small business workflows and builds custom systems to run your operations continuously and precisely.',
  },
  {
    path: '/services',
    title: 'Services — UnderCurrent | CX, Sales, Content, Personal & Finance Automation',
    description: 'Full-service AI automation: customer experience, sales pipelines, content creation, personal assistant AI, and financial operations — all automated, all connected.',
  },
  {
    path: '/process',
    title: 'Our Process — UnderCurrent | Map, Build, Maintain',
    description: 'How UnderCurrent works: we map your workflows, build custom AI automation, and maintain your systems continuously. Three steps to operational freedom.',
  },
  {
    path: '/contact',
    title: 'Contact — UnderCurrent',
    description: 'Get in touch with UnderCurrent. We typically respond within one business day.',
  },
  {
    path: '/stats',
    title: 'Results — UnderCurrent | AI Automation Impact',
    description: 'See the measurable impact of AI automation on small business operations — time saved, revenue recovered, and efficiency gained.',
  },
  {
    path: '/roi',
    title: 'ROI Calculator — UnderCurrent | See Your Automation Savings',
    description: 'Calculate how much time and money AI automation could save your business. Free, instant results.',
  },
  {
    path: '/audit',
    title: 'Free Business Audit — UnderCurrent | Find Your Automation Opportunities',
    description: 'Get a free AI-powered audit of your business operations. Discover where automation can save you time, money, and missed revenue.',
  },
  {
    path: '/lp',
    title: 'UnderCurrent — AI Business Automation for Small Business',
    description: 'See how AI automation can transform your small business operations. Free audit, real results.',
  },
  {
    path: '/case-study',
    title: 'Case Studies — UnderCurrent',
    description: 'See how we\'ve helped small businesses reclaim their time and scale their operations with AI automation. Real businesses, real results.',
  },
  {
    path: '/resources',
    title: 'Resources — UnderCurrent',
    description: 'Guides, playbooks, and lessons from the field. Everything we\'ve learned building AI automation for small businesses, packaged for you.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy — UnderCurrent',
    description: 'How UnderCurrent collects, uses, and protects your personal information. We respect your privacy and handle data responsibly.',
  },
  {
    path: '/terms',
    title: 'Terms of Service — UnderCurrent',
    description: 'Terms and conditions for using the UnderCurrent website and AI automation services. Read our service agreement, limitations, and policies.',
  },
]

function injectMeta(html, route) {
  const canonical = `${DOMAIN}${route.path === '/' ? '' : route.path}`
  const ogImage = `${DOMAIN}/og-image.jpg`

  // Replace <title>
  html = html.replace(
    /<title>[^<]*<\/title>/,
    `<title>${route.title}</title>`
  )

  // Replace or inject meta description
  if (html.includes('name="description"')) {
    html = html.replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${route.description}" />`
    )
  } else {
    html = html.replace('</title>', `</title>\n    <meta name="description" content="${route.description}" />`)
  }

  // Replace canonical
  html = html.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonical}" />`
  )

  // Replace OG tags
  html = html.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonical}" />`
  )
  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${route.description}" />`
  )

  // Replace Twitter tags
  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${route.title}" />`
  )
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${route.description}" />`
  )

  // Replace JSON-LD if route has custom schema
  if (route.jsonLd) {
    html = html.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">\n    ${JSON.stringify(route.jsonLd)}\n    </script>`
    )
  }

  return html
}

function generateSitemap() {
  const today = new Date().toISOString().split('T')[0]
  const priorities = {
    '/': '1.0', '/services': '0.9', '/about': '0.8', '/audit': '0.8',
    '/case-study': '0.7', '/resources': '0.7',
    '/process': '0.7', '/contact': '0.7', '/roi': '0.7',
    '/stats': '0.6', '/privacy': '0.3', '/terms': '0.3',
  }

  const urls = ROUTES
    .filter(r => r.path !== '/lp')
    .map(r => {
      const loc = `${DOMAIN}${r.path === '/' ? '/' : r.path}`
      const priority = priorities[r.path] || '0.5'
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
  console.log(`  ✓ sitemap.xml → ${ROUTES.filter(r => r.path !== '/lp').length} URLs (lastmod: ${today})`)
}

function run() {
  console.log('\n  Injecting per-route SEO metadata...\n')

  const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

  for (const route of ROUTES) {
    const html = injectMeta(baseHtml, route)

    const outDir = route.path === '/'
      ? DIST
      : join(DIST, route.path)

    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true })
    }

    writeFileSync(join(outDir, 'index.html'), html)
    console.log(`  ✓ ${route.path} → ${route.title}`)
  }

  generateSitemap()

  console.log(`\n  Done — ${ROUTES.length} routes with unique SEO metadata\n`)
}

run()
