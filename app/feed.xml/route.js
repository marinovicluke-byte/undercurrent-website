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
