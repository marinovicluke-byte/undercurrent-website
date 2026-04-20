// Capture screenshots of all 6 location pages at 1440px and 375px.
// Output: docs/screenshots/{slug}-{viewport}.png
// Usage: npx playwright install chromium && node scripts/capture-location-screenshots.mjs

import { chromium } from 'playwright'
import { mkdirSync } from 'fs'
import { resolve } from 'path'

const BASE = 'http://localhost:3000'
const SLUGS = [
  'ai-automation-melbourne',
  'ai-automation-sydney',
  'ai-automation-brisbane',
  'ai-automation-perth',
  'ai-automation-adelaide',
  'ai-automation-australia',
]
const VIEWPORTS = [
  { name: '1440', width: 1440, height: 900 },
  { name: '375',  width: 375,  height: 812 },
]

const outDir = resolve(process.cwd(), 'docs/screenshots')
mkdirSync(outDir, { recursive: true })

const browser = await chromium.launch()
try {
  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 })
    const page = await ctx.newPage()
    for (const slug of SLUGS) {
      const url = `${BASE}/${slug}`
      process.stdout.write(`capturing ${slug} @ ${vp.name}... `)
      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 })
      // Give lazy content a beat, and trigger scroll to fire any reveal animations
      await page.waitForTimeout(400)
      const outPath = resolve(outDir, `${slug}-${vp.name}.png`)
      await page.screenshot({ path: outPath, fullPage: true })
      console.log('ok')
    }
    await ctx.close()
  }
} finally {
  await browser.close()
}
console.log('done. output:', outDir)
