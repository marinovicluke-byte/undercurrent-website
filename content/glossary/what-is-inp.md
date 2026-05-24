---
slug: what-is-inp
term: Interaction to Next Paint (INP)
shortDefinition: A Core Web Vital measuring responsiveness across every user interaction on a page. Good is 200ms or less at the 75th percentile in real-user data.
category: metric
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-seo, what-is-topical-authority, what-is-entity-seo]
sources:
  - { title: "Interaction to Next Paint (INP), web.dev", url: "https://web.dev/articles/inp" }
  - { title: "Core Web Vitals, Google Search Central", url: "https://developers.google.com/search/docs/appearance/core-web-vitals" }
  - { title: "Core Web Vitals 2026: complete INP guide and assessment", url: "https://koanthic.com/en/core-web-vitals-2026-complete-inp-guide-assessment/" }
faqs:
  - q: "What's a good INP score?"
    a: "200ms or less at the 75th percentile of real-user interactions, measured in the Chrome User Experience Report. Between 200ms and 500ms is needs-improvement. Above 500ms is poor. The 75th percentile rule means three out of four interactions on the page must hit the threshold, not the average."
  - q: "How is INP different from First Input Delay?"
    a: "FID only measured the delay before the browser started processing the very first interaction on the page. INP replaced FID in March 2024 as a Core Web Vital and measures the full latency, input to next paint, across every interaction during the visit. A site could pass FID and still feel broken on the fifth click. INP catches that."
  - q: "Does INP affect AI search citations?"
    a: "Yes. Since the May 2026 Core Update reweighted page experience signals, sites that fail INP are demoted as answer sources in Google's AI Mode and AI Overviews, not just in classic results. A page can be the most authoritative answer to a query and still be skipped if the third-party-script load makes it slow to interact with."
author: Luke Marinovic
datePublished: 2026-05-25
dateModified: 2026-05-25
complianceNote: null
ai-assisted: true
source: claude-code
---

# Interaction to Next Paint (INP)

**Interaction to Next Paint is a Core Web Vital measuring responsiveness across every user interaction on a page. Good is 200ms or less at the 75th percentile in real-user data from the Chrome User Experience Report.**

INP is a third-party-script problem dressed up as a developer-skill problem. The five tools an SMB adds to "help conversion", the chat widget, the heatmap pixel, the analytics tag, the marketing pixel, the popup tool, are the same tools that block the main thread on every tap and push INP into the failing band. Forty-three percent of sites fail the threshold according to the [2026 Chrome User Experience Report analysis](https://koanthic.com/en/core-web-vitals-2026-complete-inp-guide-assessment/), and almost all of them are failing for the same reason.

INP replaced [First Input Delay](https://web.dev/articles/inp) as a Core Web Vital in March 2024. FID only measured the delay before the browser started processing the first interaction. INP measures the full latency, input to next paint, across every click, tap and keypress for the entire session, then reports the 75th-percentile worst case. A site could pass FID at 50ms and still have an INP of 600ms on the fifth interaction. The May 2026 Core Update reweighted page experience signals and, per Google's own [Core Web Vitals documentation](https://developers.google.com/search/docs/appearance/core-web-vitals), sites that fail INP are now demoted as citation sources in [Google AI Mode](/glossary/what-is-google-ai-mode), not just in classic blue links.

What good looks like, in numbers: 200ms or less is good, 200ms to 500ms is needs-improvement, above 500ms is poor. Measured in the field through CrUX, surfaced in PageSpeed Insights and Search Console.

Concrete example: a Melbourne tradies' site running a chat widget, two pixels, a popup tool and Google Analytics scored an INP of 450ms on tap and was no longer cited in AI Mode answers for "emergency plumber Highett". UnderCurrent Automations deferred the chat widget and the popup tool, removed one pixel, and INP dropped to 180ms. The page was eligible for citation again within the next CrUX 28-day window.

The fix is brutal and rarely popular: audit every third-party script, defer or remove what isn't load-bearing, ship server-rendered HTML so the page is interactive before the JavaScript pile finishes parsing. This work compounds with [classical SEO fundamentals](/glossary/what-is-seo) and [entity SEO](/glossary/what-is-entity-seo), and sits inside [SEO & AI Visibility](/seo-ai-visibility). Authority gets you into the pool. INP decides whether you stay in it.
