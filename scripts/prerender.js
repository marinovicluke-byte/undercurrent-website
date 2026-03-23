/**
 * Pre-render script — visits each route in a headless browser after vite build
 * and saves the fully rendered HTML so crawlers see real content.
 *
 * Usage: node scripts/prerender.js
 * Runs automatically via "npm run build" (postbuild hook).
 */

import { execSync, spawn } from 'child_process'
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DIST = join(__dirname, '..', 'dist')

// Routes to pre-render (public-facing pages)
const ROUTES = [
  '/',
  '/about',
  '/services',
  '/process',
  '/contact',
  '/stats',
  '/roi',
  '/audit',
  '/lp',
]

const PORT = 4884

async function prerender() {
  console.log('\n🔍 Pre-rendering routes for SEO...\n')

  // Start a local preview server
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT)], {
    cwd: join(__dirname, '..'),
    stdio: 'pipe',
  })

  // Wait for server to be ready
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server start timeout')), 15000)
    server.stdout.on('data', (data) => {
      if (data.toString().includes(String(PORT))) {
        clearTimeout(timeout)
        resolve()
      }
    })
    server.stderr.on('data', (data) => {
      const msg = data.toString()
      if (msg.includes(String(PORT))) {
        clearTimeout(timeout)
        resolve()
      }
    })
  })

  // Small delay to ensure server is fully ready
  await new Promise(r => setTimeout(r, 1000))

  try {
    const puppeteer = await import('puppeteer')
    const browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })

    for (const route of ROUTES) {
      const page = await browser.newPage()

      // Block unnecessary resources to speed up rendering
      await page.setRequestInterception(true)
      page.on('request', (req) => {
        const type = req.resourceType()
        if (['image', 'font', 'media'].includes(type)) {
          req.abort()
        } else {
          req.continue()
        }
      })

      const url = `http://localhost:${PORT}${route}`
      console.log(`  Rendering ${route}...`)

      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 })

      // Wait a bit for GSAP animations to initialize and content to render
      await page.waitForFunction(() => document.querySelector('#root')?.innerHTML?.length > 100, {
        timeout: 10000,
      })

      // Get the full rendered HTML
      const html = await page.content()

      // Determine output path
      const outDir = route === '/'
        ? DIST
        : join(DIST, route)

      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true })
      }

      writeFileSync(join(outDir, 'index.html'), html)
      console.log(`  ✓ ${route} → ${join(outDir, 'index.html').replace(DIST, 'dist')}`)

      await page.close()
    }

    await browser.close()
    console.log(`\n✅ Pre-rendered ${ROUTES.length} routes successfully\n`)
  } finally {
    server.kill()
  }
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err.message)
  // Don't fail the build — pre-rendering is an enhancement
  // The SPA still works without it
  process.exit(0)
})
