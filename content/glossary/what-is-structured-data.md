---
slug: what-is-structured-data
term: Structured Data
shortDefinition: A general category of machine-readable markup that gives explicit meaning to page content. Schema.org is the most common vocabulary, JSON-LD the most common format, but not the only ones.
category: discipline
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-schema-markup, what-is-faq-schema, what-is-entity-seo]
sources:
  - { title: "W3C: Semantic Web and structured data", url: "https://www.w3.org/standards/semanticweb/data" }
  - { title: "Google Search Central: intro to structured data markup", url: "https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" }
  - { title: "schema.org: Getting started", url: "https://schema.org/docs/gs.html" }
faqs:
  - { q: "Is structured data the same as schema markup?", a: "No. Structured data is the broader concept, any machine-readable markup that gives explicit meaning to page content. Schema markup is one specific implementation, using the schema.org vocabulary. OpenGraph tags, Microformats, RSS, and JSON product feeds are all structured data, but none are schema markup." }
  - { q: "What formats can structured data use?", a: "On the web, the three formats are JSON-LD (a JavaScript object in a script tag, Google's recommended format), Microdata (HTML attributes inline with the content), and RDFa (a richer attribute syntax). JSON-LD has won by a wide margin because it's cleaner to maintain, lives in the page head, and doesn't entangle markup with content. Beyond schema.org, OpenGraph uses meta tags, RSS uses XML." }
  - { q: "Do AI engines read all formats?", a: "Yes. ChatGPT, Perplexity and Claude parse structured data regardless of format. Schema.org JSON-LD is the most common because Google's documentation pushed it for a decade, but a page shipping OpenGraph product tags, Microdata reviews, and JSON-LD organisation data is sending structured signal through three channels at once. AI engines pick up whichever ones are present." }
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-24
complianceNote: null
ai-assisted: true
source: claude-code
---

# Structured Data

**Structured data is a general category of machine-readable markup that gives explicit meaning to page content. Schema.org is the most common vocabulary, JSON-LD the most common format, but not the only ones.**

The hierarchy matters because the words get used interchangeably and they shouldn't be.

**At the top: structured data.** The broad concept, defined in [W3C's Semantic Web work](https://www.w3.org/standards/semanticweb/data), is any markup that lets a machine understand what a piece of content is, not just how to display it. A block of text that reads "Melbourne, VIC 3000" looks the same in HTML whether it's an address, a review location, or a city someone happens to mention. Structured data removes the ambiguity.

**One level down: vocabularies.** A vocabulary is the agreed list of types and properties used to describe things. Schema.org, launched in 2011 by Google, Microsoft, Yahoo and Yandex, is the dominant web vocabulary. It defines types like `LocalBusiness`, `Product`, `Recipe`, `Review`, `FAQPage`, with properties for each (`address`, `telephone`, `priceRange`, `aggregateRating`). But it isn't the only one. OpenGraph (Facebook's vocabulary, the `og:title` and `og:image` meta tags) describes pages for social sharing. Dublin Core describes documents. Microformats describes contact cards and events with class names. Each is structured data using a different vocabulary.

**One level down again: formats.** A format is how the vocabulary gets written into the page. For schema.org you've got three: JSON-LD (a JavaScript object in a script tag, what Google's [structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) recommends and what's now standard), Microdata (HTML attributes inline with the content), and RDFa (a richer attribute syntax). OpenGraph uses meta tags. RSS uses XML. Same structured-data concept, different format.

The distinction matters because AI engines look for any structured signal, not just schema.org. A product page can ship schema.org Product JSON-LD AND OpenGraph product tags AND a Microdata-marked review block. All three are structured data. Only one is [schema markup](/glossary/what-is-schema-markup). A page on [schema.org's getting-started guide](https://schema.org/docs/gs.html) confirms the vocabulary is the layer, not the format.

Practically, structured data is how a page asserts identity, [entity SEO](/glossary/what-is-entity-seo) is the discipline that uses it, [FAQ Schema](/glossary/what-is-faq-schema) is one common type, and UnderCurrent Automations ships the full structured-data stack across vocabulary and format as part of [SEO & AI Visibility](/seo-ai-visibility). Getting the language right is the first step to getting the markup right.
