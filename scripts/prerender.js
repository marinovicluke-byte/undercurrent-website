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

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import matter from 'gray-matter'
import { marked } from 'marked'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')
const DOMAIN = 'https://www.undercurrentautomations.com'

// Configure marked to generate heading IDs (matches client-side config)
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = tokens.map(t => t.raw || t.text || '').join('')
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
      const Tag = `h${depth}`
      return `<${Tag} id="${id}">${this.parser.parseInline(tokens)}</${Tag}>\n`
    }
  }
})

const ARTICLES_DIR = join(__dirname, '..', 'src', 'content', 'articles')

function loadArticles() {
  if (!existsSync(ARTICLES_DIR)) return []
  const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const raw = readFileSync(join(ARTICLES_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    const html = marked.parse(content)
    return { frontmatter: data, html }
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}

function generateArticleRoutes(articles) {
  return articles.map(({ frontmatter }) => ({
    path: `/resources/${frontmatter.slug}`,
    title: `${frontmatter.title} | UnderCurrent`,
    description: frontmatter.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: frontmatter.title,
      description: frontmatter.description,
      author: { '@type': 'Person', name: frontmatter.author || 'Luke Marinovic' },
      publisher: {
        '@type': 'Organization',
        name: 'UnderCurrent',
        logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.svg` },
      },
      datePublished: frontmatter.date,
      dateModified: frontmatter.date,
      keywords: frontmatter.keyword,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${DOMAIN}/resources/${frontmatter.slug}` },
    },
  }))
}

function injectArticleContent(html, articleHtml) {
  const articleDiv = `<div id="article-content" style="max-width:680px;margin:0 auto;padding:2rem 1.5rem;font-family:'DM Sans',sans-serif;color:rgba(232,224,208,0.75);background:#1C1C1A">${articleHtml}</div>\n<script>document.getElementById('article-content').style.display='none'</script>\n`
  return html.replace('<div id="root">', articleDiv + '<div id="root">')
}

function escXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function generateRssFeed(articles) {
  const now = new Date().toUTCString()
  const items = articles.map(({ frontmatter, html }) => {
    const link = `${DOMAIN}/resources/${frontmatter.slug}`
    const pubDate = new Date(frontmatter.date + 'T00:00:00Z').toUTCString()
    return `    <item>
      <title>${escXml(frontmatter.title)}</title>
      <description>${escXml(frontmatter.description)}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`
  }).join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>UnderCurrent - AI &amp; Automation Guides</title>
    <description>Guides, playbooks, and lessons from the field. AI automation for Australian small businesses.</description>
    <link>${DOMAIN}/resources</link>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-AU</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`
  writeFileSync(join(DIST, 'feed.xml'), feed)
  console.log(`  ✓ feed.xml → ${articles.length} articles`)
}

// Per-route SEO metadata
const ROUTES = [
  {
    path: '/',
    title: 'AI Business Automation Melbourne | UnderCurrent',
    description: 'Melbourne-based AI automation studio. We map small business workflows and build custom AI-powered systems that run your operations — silently, continuously, precisely.',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': ['LocalBusiness', 'Organization'],
          '@id': `${DOMAIN}/#business`,
          name: 'UnderCurrent',
          alternateName: 'UnderCurrent AI Automation',
          description: 'Melbourne-based AI automation studio specialising in workflow automation for small businesses — onboarding, customer experience, sales, content design, and personal assistant AI systems.',
          url: DOMAIN,
          logo: `${DOMAIN}/favicon.svg`,
          image: `${DOMAIN}/og-image.jpg`,
          address: { '@type': 'PostalAddress', addressLocality: 'Melbourne', addressRegion: 'VIC', addressCountry: 'AU' },
          areaServed: { '@type': 'Country', name: 'Australia' },
          serviceType: ['AI Business Automation', 'Workflow Automation', 'Business Process Automation', 'AI Agent Deployment'],
          email: 'luke@undercurrentautomations.com',
          foundingDate: '2026',
          sameAs: [
            'https://www.instagram.com/undercurrent.automations/',
            'https://www.facebook.com/profile.php?id=61578553167947',
            'https://www.linkedin.com/company/undercurrent-automations',
          ],
          founder: {
            '@type': 'Person',
            name: 'Luke Marinovic',
            jobTitle: 'Founder',
            url: `${DOMAIN}/about`,
            sameAs: [
              'https://www.linkedin.com/company/undercurrent-automations',
            ],
          },
        },
        {
          '@type': 'WebSite',
          '@id': `${DOMAIN}/#website`,
          url: DOMAIN,
          name: 'UnderCurrent',
          publisher: { '@id': `${DOMAIN}/#business` },
        },
        // FAQPage schema is injected dynamically by FAQ.jsx component
      ],
    },
  },
  {
    path: '/about',
    title: 'About Us - AI Automation Studio | UnderCurrent',
    description: 'Learn about UnderCurrent — the Melbourne-based AI automation studio that maps small business workflows and builds custom systems to run your operations continuously and precisely.',
  },
  {
    path: '/services',
    title: 'Workflow Automation & AI Agent Services | UnderCurrent',
    description: 'Custom workflow automation and AI agent deployment — customer experience, sales pipelines, content creation, personal assistant AI, and financial operations built to run on autopilot.',
  },
  {
    path: '/process',
    title: 'How It Works - AI Automation Process | UnderCurrent',
    description: 'How UnderCurrent works: we map your workflows, build custom AI automation, and maintain your systems continuously. Three steps to operational freedom.',
  },
  {
    path: '/contact',
    title: 'Contact Us - AI Automation Enquiry | UnderCurrent',
    description: 'Get in touch with UnderCurrent. We typically respond within one business day.',
  },
  {
    path: '/stats',
    title: 'Results — UnderCurrent | AI Automation Impact',
    description: 'See the measurable impact of AI automation on small business operations — time saved, revenue recovered, and efficiency gained.',
  },
  {
    path: '/roi',
    title: 'ROI Calculator - How Much Could You Save? | UnderCurrent',
    description: 'Calculate how much time and money workflow automation could save your business. Free, instant ROI estimate.',
  },
  {
    path: '/audit',
    title: 'Free Business Audit - Find Time Leaks | UnderCurrent',
    description: 'Get a free AI-powered audit of your business operations. Discover where automation can save you time, money, and missed revenue.',
  },
  {
    path: '/lp',
    title: 'Automate Your Small Business Operations | UnderCurrent',
    description: 'See how custom automation systems can transform your daily operations. Free audit, real results.',
  },
  {
    path: '/case-study',
    title: 'Case Studies - AI Automation Results | UnderCurrent',
    description: 'See how we\'ve helped small businesses reclaim their time and scale their operations with AI automation. Real businesses, real results.',
  },
  {
    path: '/resources',
    title: 'Resources - AI & Automation Guides | UnderCurrent',
    description: 'Guides, playbooks, and lessons from the field. Everything we\'ve learned building AI automation for small businesses, packaged for you.',
  },
  {
    path: '/privacy',
    title: 'Privacy Policy | UnderCurrent',
    description: 'How UnderCurrent collects, uses, and protects your personal information. We respect your privacy and handle data responsibly.',
  },
  {
    path: '/terms',
    title: 'Terms of Service | UnderCurrent',
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

function generateSitemap(allRoutes) {
  const today = new Date().toISOString().split('T')[0]
  const priorities = {
    '/': '1.0', '/services': '0.9', '/about': '0.8', '/audit': '0.8',
    '/case-study': '0.7', '/resources': '0.7',
    '/process': '0.7', '/contact': '0.7', '/roi': '0.7',
    '/stats': '0.6', '/privacy': '0.3', '/terms': '0.3',
  }

  const urls = allRoutes
    .filter(r => r.path !== '/lp')
    .map(r => {
      const loc = `${DOMAIN}${r.path === '/' ? '/' : r.path}`
      const priority = priorities[r.path] || (r.path.startsWith('/resources/') ? '0.7' : '0.5')
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
  console.log(`  ✓ sitemap.xml → ${allRoutes.filter(r => r.path !== '/lp').length} URLs (lastmod: ${today})`)
}

function run() {
  console.log('\n  Injecting per-route SEO metadata...\n')

  const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

  // Load articles from markdown files
  const articles = loadArticles()
  const articleRoutes = generateArticleRoutes(articles)

  // Build a lookup of article HTML by path for injection
  const articleHtmlByPath = {}
  articles.forEach(({ frontmatter, html }) => {
    articleHtmlByPath[`/resources/${frontmatter.slug}`] = html
  })

  // Combine static routes with article routes
  const allRoutes = [...ROUTES, ...articleRoutes]

  for (const route of allRoutes) {
    let html = injectMeta(baseHtml, route)

    // If this is an article route, inject the full article HTML
    if (articleHtmlByPath[route.path]) {
      html = injectArticleContent(html, articleHtmlByPath[route.path])
    }

    const outDir = route.path === '/'
      ? DIST
      : join(DIST, route.path)

    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true })
    }

    writeFileSync(join(outDir, 'index.html'), html)
    console.log(`  ✓ ${route.path} → ${route.title}`)
  }

  generateSitemap(allRoutes)
  if (articles.length > 0) {
    generateRssFeed(articles)
  }

  console.log(`\n  Done — ${allRoutes.length} routes with unique SEO metadata\n`)
}

run()
