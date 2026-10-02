// AI + search crawler allowlist per vault/Research/wiki/seo-aio/.
// searchBots: general web indexers that also feed AI surfaces — Bingbot powers
// ChatGPT Search + Copilot, Bravebot powers Claude's live retrieval. Get the
// strict `*` disallow because audit reports are user-specific.
// aiBots: AI training + on-demand fetchers. Looser disallow.
// the article blocks board is a design record (noindex in its own head), not a page
const DISALLOW = ['/api/', '/article-blocks-concepts']

export default function robots() {
  const searchBots = [
    'Bingbot',
    'Bravebot',
  ]

  const aiBots = [
    'GPTBot',
    'ChatGPT-User',
    'OAI-SearchBot',
    'Google-Extended',
    'Googlebot-AI',
    'PerplexityBot',
    'Perplexity-User',
    'ClaudeBot',
    'anthropic-ai',
    'Claude-Web',
    'CCBot',
    'Bytespider',
    'Applebot-Extended',
  ]

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: DISALLOW,
      },
      ...searchBots.map((agent) => ({
        userAgent: agent,
        allow: '/',
        disallow: DISALLOW,
      })),
      ...aiBots.map((agent) => ({
        userAgent: agent,
        allow: '/',
        disallow: DISALLOW,
      })),
    ],
    sitemap: 'https://undercurrentautomations.com/sitemap.xml',
  }
}
