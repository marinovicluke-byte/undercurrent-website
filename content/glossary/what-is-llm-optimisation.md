---
slug: what-is-llm-optimisation
term: LLM Optimisation (LLMO)
shortDefinition: Optimising web content so large language models like ChatGPT, Claude, Gemini, and Perplexity cite your page when generating answers. A relabel of AEO and GEO, same job.
category: discipline
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-generative-engine-optimisation, what-is-answer-engine-optimisation, what-is-ai-search-optimisation]
sources:
  - { title: "GEO: Generative Engine Optimization (Aggarwal et al., 2024)", url: "https://arxiv.org/abs/2311.09735" }
  - { title: "Google Search Central: how featured snippets work", url: "https://developers.google.com/search/docs/appearance/featured-snippets" }
  - { title: "OpenAI: ChatGPT search and citation behaviour", url: "https://openai.com/index/introducing-chatgpt-search/" }
faqs:
  - { q: "Is LLM optimisation different from AEO or GEO?", a: "Not really. AEO (Answer Engine Optimisation), GEO (Generative Engine Optimisation), AISO (AI Search Optimisation), and LLMO (LLM Optimisation) are four labels for the same work: structuring content so language models and answer engines extract and cite your page. The technical moves are identical. The proliferation is marketing-driven, not technical." }
  - { q: "Why are there so many names for the same thing?", a: "Because the space is new and every consultancy wants to own the category label. AEO came from the answer-box era; GEO entered through the 2023 academic paper from Princeton and Allen AI researchers; LLMO and AISO are later rebrands. The work converged before the vocabulary did." }
  - { q: "What does UnderCurrent call it?", a: "We use AI Search Optimisation internally, because it covers both extractive engines (Google AI Overviews, featured snippets) and generative engines (ChatGPT, Claude, Perplexity). One label, one playbook, no client confusion about whether AEO and GEO are different services." }
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-24
complianceNote: null
ai-assisted: true
source: claude-code
---

# LLM Optimisation (LLMO)

**LLM Optimisation is optimising web content so large language models like ChatGPT, Claude, Gemini, and Perplexity cite your page when generating answers. It's a fourth label for the same job AEO, GEO, and AISO already describe.**

Same job, fourth label. AEO (Answer Engine Optimisation), GEO (Generative Engine Optimisation), AISO (AI Search Optimisation), LLMO (LLM Optimisation), all four names point at the same underlying work: structuring content so language models and answer engines extract and cite your page instead of a competitor's.

The labels came in waves. AEO landed first, coined when [Google's featured snippets](https://developers.google.com/search/docs/appearance/featured-snippets) made "be the answer above the list" a distinct discipline from "rank in the list". GEO entered through the academic root, the 2023 [Princeton and Allen AI paper](https://arxiv.org/abs/2311.09735) that named generative engine optimisation as a research field. LLMO and AISO arrived later, mostly from consultancies wanting a fresh category label to own. The work converged before the vocabulary did.

The technical moves are identical across all four labels. Question-format headings that match the way real people type. A self-contained 40-to-60-word answer in the first paragraph of each section, before the supporting detail. Clean schema (Organization, LocalBusiness, FAQPage) so the machine knows what each block is. Entity clarity, NAP consistent across the web, sameAs links in Organization JSON-LD. Primary-source citations in the prose, because [OpenAI's ChatGPT search](https://openai.com/index/introducing-chatgpt-search/) and Perplexity both surface and weight outbound citations as a trust signal. None of that changes whether you call the work AEO, GEO, AISO, or LLMO.

UnderCurrent Automations uses [AI Search Optimisation](/glossary/what-is-ai-search-optimisation) internally, because it spans both the extractive engines ([AEO](/glossary/what-is-answer-engine-optimisation), Google AI Overviews, featured snippets) and the generative engines ([GEO](/glossary/what-is-generative-engine-optimisation), ChatGPT, Claude, Perplexity, Gemini). One label, one playbook, one set of changes to your site, no client confusion about whether they need to buy three separate services. UC ships the AISO build as part of [SEO & AI Visibility](/seo-ai-visibility).

If a vendor sells you AEO and GEO and LLMO as three distinct offerings with three distinct price tags, the burden's on them to show three distinct deliverables. In practice, the deliverable list is one.
