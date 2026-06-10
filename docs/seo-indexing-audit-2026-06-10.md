---
ai-assisted: true
source: claude-code
---

# SEO/Indexing Audit Remediation — 2026-06-10

Executed from the verified GSC + Bing audit (56 of 145 sitemap URLs never crawled, glossary section orphaned). Shipped via PR #26 + #27, live on production same day.

| # | Task | Status | Verified |
|---|------|--------|----------|
| 1 | Footer Glossary link (sitewide) | ✅ Done | Renders on home, service page, blog post |
| 2 | Contextual internal links to never-crawled posts | ✅ Done | website-design → 3 articles, seo-ai-visibility → 8 articles, all live. Blog→glossary links already existed in 39 articles (audit claim was stale) |
| 3 | IndexNow ping on production deploy | ✅ Done | `scripts/indexnow-ping.mjs` via postbuild. Live-tested: 200 OK, 145 URLs |
| 4 | Stable sitemap lastmod (no build timestamps) | ✅ Done | Two consecutive builds byte-identical, prod matches, changefreq/priority dropped |
| 5 | BingSiteAuth.xml in public/ | ⏳ Blocked | Needs Luke's Bing Webmaster Tools signup → supply the XML file |

Notes:
- `/seo-ai-visibility` is a bespoke route ignoring `services.js` internalLinks — needed its own Further Reading section (see lab-notes 2026-06-10).
- Bump `STATIC_LASTMOD` in `app/sitemap.js` whenever a static/service page's content actually changes.
