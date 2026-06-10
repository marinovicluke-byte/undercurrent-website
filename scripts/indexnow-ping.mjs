// Pings IndexNow with the full sitemap URL list after a production build.
// Runs via npm postbuild; skips preview/local builds. Never fails the deploy:
// a dead ping endpoint is not a reason to block a release.
import { readFile } from 'node:fs/promises'

const HOST = 'undercurrentautomations.com'
const KEY = '5563149d85e149959f54f0aba4255afa'
const SITEMAP_BODY = '.next/server/app/sitemap.xml.body'

if (process.env.VERCEL_ENV !== 'production') {
  console.log(`indexnow: skipped (VERCEL_ENV=${process.env.VERCEL_ENV || 'unset'})`)
  process.exit(0)
}

try {
  const xml = await readFile(SITEMAP_BODY, 'utf8')
  const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1])
  if (urlList.length === 0) throw new Error(`no <loc> entries found in ${SITEMAP_BODY}`)

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList,
    }),
  })
  console.log(`indexnow: ${res.status} ${res.statusText} (${urlList.length} URLs submitted)`)
} catch (err) {
  console.error(`indexnow: ping failed, deploy continues — ${err.message}`)
}
