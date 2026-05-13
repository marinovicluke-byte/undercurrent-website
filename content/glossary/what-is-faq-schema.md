---
slug: what-is-faq-schema
term: FAQ Schema (FAQPage)
shortDefinition: The structured-data type that marks up question-and-answer content so search and AI engines can extract Q&A pairs directly, even after Google deprecated the FAQ rich result in May 2026.
category: workflow
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-schema-markup, what-is-answer-engine-optimisation, what-is-generative-engine-optimisation]
sources:
  - { title: "FAQ (FAQPage) structured data (Google Search Central)", url: "https://developers.google.com/search/docs/appearance/structured-data/faqpage" }
  - { title: "FAQPage (schema.org)", url: "https://schema.org/FAQPage" }
  - { title: "Getting started with schema.org (schema.org)", url: "https://schema.org/docs/gs.html" }
faqs:
  - { q: "Did Google really remove FAQ rich results in 2026?", a: "Yes. As of May 7, 2026, Google stopped showing FAQ rich results in Search. Google's own documentation confirms the change, with the FAQ search appearance, rich result report, and Rich Results Test support all being dropped, and Search Console API support ending in August 2026. The markup is still valid and still readable by AI engines, only the Google-rendered rich snippet is gone." }
  - { q: "Should I still add FAQ schema after the deprecation?", a: "Yes, for two reasons. AI engines like ChatGPT, Perplexity, and Claude read FAQPage markup directly when deciding how to answer questions, so the structured signal still earns citations in those tools. The Q&A structure is also cleaner for users, question headings get to the point faster than prose paragraphs." }
  - { q: "Which pages should have FAQ schema?", a: "Pages where the content genuinely is a set of questions and answers, a service explainer, a support page, a topic overview with real questions the audience asks. Avoid adding it to promotional copy dressed up as FAQs. Never duplicate the exact same FAQ block across multiple pages, each should answer questions specific to that page's topic." }
author: Luke Marinovic
datePublished: 2026-05-13
dateModified: 2026-05-13
complianceNote: null
ai-assisted: true
source: claude-code
---

# FAQ Schema (FAQPage)

**FAQ Schema, formally the FAQPage structured-data type, is JSON-LD markup that tells search and AI engines a page contains a set of questions with direct answers. Google deprecated the FAQ rich result on May 7, 2026, but AI engines still extract from FAQPage markup when deciding what to cite.**

Across UC's 146-article Australian corpus audit, 35% of audited sites had a visible FAQ block in the body but only 24% wired it up with FAQPage JSON-LD, roughly a third of FAQs sit unparseable to the AI engines they're meant to feed.

That gap is the reason the markup still matters. Before May 2026, FAQ schema had a visible payoff: Google would expand the questions as collapsible links under your search result, giving your listing more real estate. [Google's own deprecation notice](https://developers.google.com/search/docs/appearance/structured-data/faqpage) is blunt: "As of May 7, 2026, FAQ rich results are no longer appearing in Google Search." The visual snippet is gone. What remains is the structured signal underneath it, and that signal still reaches every AI engine that reads the web.

How the type works. [Schema.org defines FAQPage](https://schema.org/FAQPage) as a web page presenting a set of frequently asked questions and answers. The implementation is JSON-LD: a FAQPage entity containing a list of Question entities, each with an `acceptedAnswer` carrying the answer text. A crawler or AI extraction system reading that block gets the Q&A in machine-readable form, without parsing prose. [Schema.org was founded by Google, Microsoft, Yahoo and Yandex](https://schema.org/docs/gs.html) as a shared vocabulary for exactly this, not just for classic search, but for any system that needs to understand what a page contains, AI engines included.

The practical implication: when Perplexity or ChatGPT answers a question, it pulls from pages whose Q&A structure it can parse cleanly. FAQPage markup is one of the cleaner parsing targets, unmarked prose paragraphs are harder to extract with confidence. The deprecation of Google's rich snippet is not a signal to remove FAQ markup, it's a signal that the audience for the markup shifted from Google's SERP renderer to the AI layer on top.

What belongs on a page with FAQ schema. Acceptable uses are real Q&A pages where the content genuinely answers questions the audience asks. Pages with user-submitted answers, promotional copy, or FAQs duplicated across the whole site are the wrong candidates. One specific FAQ block per page, tied to that page's topic, is the shape that earns extraction, from AI engines now and from [Answer Engine Optimisation](/glossary/what-is-answer-engine-optimisation) signals broadly. What works in practice: a buyers agent's service page with five real questions buyers ask, *how does pricing work*, *do you cover Melbourne's eastern suburbs*, *what happens if the property fails the building report*, each marked up with `acceptedAnswer` JSON-LD, none lifted from a generic FAQ template. That's the version Perplexity quotes.

FAQ schema sits inside the wider [schema markup](/glossary/what-is-schema-markup) system and feeds directly into [SEO & AI Visibility](/seo-ai-visibility) work. The rich snippet is dead; the structured answer signal is not.
