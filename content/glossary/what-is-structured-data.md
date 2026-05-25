---
slug: what-is-structured-data
term: Structured Data
shortDefinition: Machine-readable markup that gives explicit meaning to page content. In 2026 the format question is solved, ship JSON-LD schema.org for search and AI engines, ship OpenGraph for social.
category: discipline
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-schema-markup, what-is-faq-schema, what-is-entity-seo]
sources:
  - { title: "W3C: Semantic Web and structured data", url: "https://www.w3.org/2001/sw/" }
  - { title: "Google Search Central: intro to structured data markup", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" }
  - { title: "schema.org: Getting started", url: "https://schema.org/docs/gs.html" }
faqs:
  - q: "Is structured data the same as schema markup?"
    a: "No. Structured data is the broader concept, any machine-readable markup that gives explicit meaning to page content. Schema markup is one specific implementation using the schema.org vocabulary. OpenGraph tags, Microformats, and JSON product feeds are all structured data, none of them are schema markup."
  - q: "Should I bother with RDFa or Microdata in 2026?"
    a: "No. JSON-LD has won for schema.org. RDFa is functionally dead on the public web outside a few academic and government datasets. Microdata is shrinking and only worth keeping if you genuinely cannot add a script block to the page head. New builds should ship JSON-LD."
  - q: "Which schema types matter for AI engines specifically?"
    a: "Organization with a full sameAs array, LocalBusiness with verified NAP, FAQPage on every Q&A block, BreadcrumbList for site structure, and Article with author and dateModified. The search-era priorities (Review, Product, Recipe) still matter for rich results, but the AI-era priorities tilt toward entity-confirmation types rather than rich-result types."
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-25
complianceNote: null
ai-assisted: true
source: claude-code
---

# Structured Data

**Structured data is machine-readable markup that gives explicit meaning to page content. In 2026 the format question is solved: ship JSON-LD schema.org for search and AI engines, ship OpenGraph for social previews, ignore the rest unless there is a specific reason.**

The hierarchy first, then the prescription.

Structured data is the broad concept, defined in [W3C's Semantic Web work](https://www.w3.org/2001/sw/). It is any markup that lets a machine understand what a piece of content is, rather than just how to display it. A vocabulary is the agreed list of types and properties: schema.org for web content, OpenGraph for social previews, Dublin Core for documents. A format is how the vocabulary gets written into the page: JSON-LD, Microdata, RDFa, or meta tags.

Most explainers walk through all five formats as live options. They are not.

JSON-LD has won for schema.org content. [Google's structured-data documentation](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) recommends it, every major CMS plugin defaults to it, and it ships clean in a script tag without entangling markup with content. RDFa is functionally dead on the public web. Microdata is shrinking, useful only when a script block cannot be added. If a vendor is shipping anything other than JSON-LD for schema.org content in 2026, ask why.

The bigger shift is which schema types matter, and this is where most advice is six years out of date. Search-era schema prioritised Review, Product and Recipe, the rich-result types that won SERP real estate. The AI-engine era promotes a different set: Organization with a complete sameAs array, LocalBusiness with verified NAP, FAQPage on every Q&A block, BreadcrumbList for site structure, Article with author and dateModified. These are the types ChatGPT, Perplexity and Google AI Overviews lean on to confirm entity identity and lift clean citations. A page can ship 12 schema types and still get cited badly if the Organization block is incomplete.

OpenGraph is the other vocabulary still worth shipping. Not for search, for social. LinkedIn, Slack and X parse og:title, og:description and og:image when a link gets shared. Skip OpenGraph and link previews fall back to generic site metadata, which kills click-through on shared content.

Everything else is optional and almost always not worth the build time. [schema.org's getting-started guide](https://schema.org/docs/gs.html) lists every type but the SMB shortlist is small. UnderCurrent Automations ships the JSON-LD plus OpenGraph stack as the technical foundation of [SEO & AI Visibility](/seo-ai-visibility), keeps the type list focused on what AI engines actually read, and treats [schema markup](/glossary/what-is-schema-markup) as one specific implementation of the broader [entity-clarity discipline](/glossary/what-is-entity-seo). Most clients ship four schema types, ship them well, and stop.
