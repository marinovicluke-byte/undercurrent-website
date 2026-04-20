// AI crawler allowlist per vault/Research/wiki/seo-aio/nextjs-ai-search-framework.md.
// GPTBot (OpenAI), Google-Extended (Gemini training + AI Overviews data),
// Googlebot-AI (AI Overviews serving), PerplexityBot, ClaudeBot (Anthropic),
// CCBot (Common Crawl, used by many LLMs), and the opt-in ChatGPT-User /
// OAI-SearchBot are all explicitly allowed. Wildcard `*` rule remains for
// traditional search and general crawlers.
export default function robots() {
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
        disallow: ['/api/', '/audit/report'],
      },
      ...aiBots.map((agent) => ({
        userAgent: agent,
        allow: '/',
        disallow: ['/api/'],
      })),
    ],
    sitemap: 'https://undercurrentautomations.com/sitemap.xml',
  }
}
