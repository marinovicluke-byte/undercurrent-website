// Pings IndexNow with the full sitemap URL list after a production build.
// Runs via npm postbuild; skips preview/local builds. Never fails the deploy:
// a dead ping endpoint is not a reason to block a release.
// The list comes from lib/sitemap.js, the same builder /sitemap.xml renders per request, so a
// scheduled article is never pinged before its date.

const HOST = 'undercurrentautomations.com'
const KEY = '5563149d85e149959f54f0aba4255afa'

if (process.env.VERCEL_ENV !== 'production') {
  console.log(`indexnow: skipped (VERCEL_ENV=${process.env.VERCEL_ENV || 'unset'})`)
  process.exit(0)
}

try {
  const { sitemapEntries } = await import('../lib/sitemap.js')
  const urlList = sitemapEntries().map(e => e.url)
  if (urlList.length === 0) throw new Error('lib/sitemap.js returned no URLs')

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
