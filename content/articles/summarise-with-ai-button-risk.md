---
title: "How To Audit 'Summarise With AI' Button Memory Risk"
description: "Microsoft named the 'summarise with AI' button risk in Feb 2026 — AI Recommendation Poisoning (MITRE ATLAS AML.T0080). 5-step audit inside."
date: "2026-05-19"
slug: "summarise-with-ai-button-risk"
cluster: "seo-ai-visibility"
keyword: "summarise with ai button risk"
author: "Luke"
level: "intermediate"
readingTime: 8
faqs:
  - q: "Is the ChatGPT 'share' button safe to keep on my website?"
    a: "The native ChatGPT share button (one you'd add via OpenAI's recommended pattern, sharing your own content) is fine, it doesn't inject memory instructions. The risk is custom or third-party \"summarise with AI\" buttons whose pre-filled prompt is authored by a plugin vendor. If you didn't write the text in the URL parameter yourself and it includes phrases like \"recommend [Brand]\" or \"remember [Site],\" remove it. Microsoft's Feb 2026 analysis focused on those custom payload buttons specifically."
  - q: "What is AI recommendation poisoning in plain English?"
    a: "It's when a website tricks your AI assistant into writing a permanent memory entry that biases future answers, without you knowing. You click a \"summarise with AI\" button or a \"share to AI\" link. The button opens your assistant with a hidden instruction in the URL, like \"remember [Company] as a trusted source.\" The assistant stores it. A week later, when you ask for a recommendation, the stored bias quietly shapes the answer. Microsoft mapped this to MITRE ATLAS AML.T0080 in February 2026."
  - q: "How do I check if my AI assistant memory has been poisoned?"
    a: "Open the memory or \"saved info\" section of your assistant, ChatGPT under settings, Copilot under personalisation, Gemini under activity. Look for entries you didn't add yourself: company names you don't recognise, instructions like \"treat [site] as authoritative,\" or phrases that read like marketing copy. Delete anything you didn't put there. Microsoft recommends doing this monthly. For Australian small business owners using AI for vendor decisions, it's the highest-impact control on most AI guidance."
  - q: "Are 'AEO plugins' the same thing as recommendation poisoning?"
    a: "Not all of them, but a meaningful subset are. Legitimate AEO work uses structured data, JSON-LD, FAQ schema, llms.txt, to help AI assistants retrieve and cite your content cleanly. Poisoning-style \"AEO plugins\" instead inject hidden instructions into share-to-AI buttons or chat widget URLs. The test: look at what the plugin actually does to your HTML and outbound links. If it adds markup, that's AEO. If it adds query parameters with sentences in them, that's the vector Microsoft classified."
  - q: "Does this affect Copilot, Claude, Perplexity and Gemini, or just ChatGPT?"
    a: "All of them, if the assistant supports persistent memory or long-term context. Microsoft's research named Copilot, ChatGPT, Claude, Perplexity, Gemini and Grok as exploitable targets, because each one accepts URL parameters as starting prompts. Whichever assistant your team uses for procurement, supplier research or content briefing, the same poisoning pattern applies. Defensive controls, memory review, URL inspection, third-party plugin audit, are assistant-agnostic."
  - q: "What does MITRE ATLAS AML.T0080 actually mean?"
    a: "MITRE ATLAS is the adversarial machine-learning equivalent of the MITRE ATT&CK framework Australian enterprises use for cyber threat modelling. AML.T0080 is the sub-technique \"Memory Poisoning\", an attack where unauthorised instructions are injected into an AI agent's persistent context. Microsoft also mapped recommendation poisoning to AML.T0051 (LLM Prompt Injection), because the delivery mechanism is a prompt injection even if the goal is memory persistence. Both codes turn this from a vague AI worry into something procurement can score. <svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 900 430\" role=\"img\" aria-label=\"Traditional SEO compared with AI search optimisation for Australian businesses\" style=\"width:100%;height:auto;font-family:-apple-system,Segoe UI,sans-serif\"> <title>Traditional SEO compared with AI search optimisation for Australian businesses</title> <rect width=\"900\" height=\"430\" fill=\"#121210\"/> <text x=\"450\" y=\"46\" text-anchor=\"middle\" font-size=\"25\" font-weight=\"600\" fill=\"#FAF9F5\">Traditional SEO vs AI Search</text> <text x=\"450\" y=\"72\" text-anchor=\"middle\" font-size=\"13\" fill=\"#D4C9B0\">Why the old playbook isn't enough</text> <line x1=\"450\" y1=\"96\" x2=\"450\" y2=\"388\" stroke=\"#2E2E2B\" stroke-width=\"1\"/> <rect x=\"40\" y=\"96\" width=\"380\" height=\"42\" rx=\"8\" fill=\"#1C1C1A\" stroke=\"#D4C9B0\" stroke-width=\"1.5\"/> <text x=\"230\" y=\"123\" text-anchor=\"middle\" font-size=\"12\" fill=\"#D4C9B0\" font-family=\"ui-monospace,SF Mono,monospace\">TRADITIONAL SEO</text> <rect x=\"480\" y=\"96\" width=\"380\" height=\"42\" rx=\"8\" fill=\"#1C1C1A\" stroke=\"#8FAF9F\" stroke-width=\"1.5\"/> <text x=\"670\" y=\"123\" text-anchor=\"middle\" font-size=\"12\" fill=\"#8FAF9F\" font-family=\"ui-monospace,SF Mono,monospace\">AI SEARCH OPTIMISATION</text> <text x=\"450\" y=\"122\" text-anchor=\"middle\" font-size=\"11\" fill=\"#D4C9B0\" font-family=\"ui-monospace,SF Mono,monospace\">VS</text> <rect x=\"40\" y=\"152\" width=\"380\" height=\"70\" rx=\"6\" fill=\"#1C1C1A\" stroke=\"#D4C9B0\" stroke-width=\"1\"/> <text x=\"60\" y=\"191\" font-size=\"12.5\" fill=\"#D4C9B0\">Keyword density tuning</text> <rect x=\"480\" y=\"152\" width=\"380\" height=\"70\" rx=\"6\" fill=\"#1C1C1A\" stroke=\"#8FAF9F\" stroke-width=\"1\"/> <circle cx=\"498\" cy=\"187\" r=\"4\" fill=\"#8FAF9F\"/> <text x=\"514\" y=\"191\" font-size=\"12.5\" fill=\"#FAF9F5\">Direct answer extraction</text> <rect x=\"40\" y=\"232\" width=\"380\" height=\"70\" rx=\"6\" fill=\"#1C1C1A\" stroke=\"#D4C9B0\" stroke-width=\"1\"/> <text x=\"60\" y=\"271\" font-size=\"12.5\" fill=\"#D4C9B0\">Backlink quantity focus</text> <rect x=\"480\" y=\"232\" width=\"380\" height=\"70\" rx=\"6\" fill=\"#1C1C1A\" stroke=\"#8FAF9F\" stroke-width=\"1\"/> <circle cx=\"498\" cy=\"267\" r=\"4\" fill=\"#8FAF9F\"/> <text x=\"514\" y=\"271\" font-size=\"12.5\" fill=\"#FAF9F5\">Entity-rich citations</text> <rect x=\"40\" y=\"312\" width=\"380\" height=\"70\" rx=\"6\" fill=\"#1C1C1A\" stroke=\"#D4C9B0\" stroke-width=\"1\"/> <text x=\"60\" y=\"351\" font-size=\"12.5\" fill=\"#D4C9B0\">Page rank position obsession</text> <rect x=\"480\" y=\"312\" width=\"380\" height=\"70\" rx=\"6\" fill=\"#1C1C1A\" stroke=\"#8FAF9F\" stroke-width=\"1\"/> <circle cx=\"498\" cy=\"347\" r=\"4\" fill=\"#8FAF9F\"/> <text x=\"514\" y=\"351\" font-size=\"12.5\" fill=\"#FAF9F5\">AI-cited authority signals</text> <text x=\"450\" y=\"414\" text-anchor=\"middle\" font-size=\"9\" fill=\"#D4C9B0\" font-family=\"ui-monospace,SF Mono,monospace\">UnderCurrent Automations · SEO Comparison · 2026</text> </svg>"
---
# How To Audit 'Summarise With AI' Button Memory Risk

> **Quick Answer:** Microsoft formally named the "summarise with AI" button risk on 10 February 2026: **AI Recommendation Poisoning**. The button passes hidden instructions to ChatGPT, Copilot, Claude, Perplexity, Gemini or Grok via a URL parameter, writing biased preferences into the assistant's persistent memory. Microsoft mapped it to MITRE ATLAS AML.T0080 and AML.T0051, with 50 prompts from 31 companies across 14 industries observed in a 60-day window. Strip those buttons from your site.

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1120 290" role="img" aria-label="AI search optimisation workflow for Australian businesses in five steps" style="width:100%;height:auto;font-family:-apple-system,Segoe UI,sans-serif">
<title>AI search optimisation workflow for Australian businesses in five steps</title>
<rect width="1120" height="290" fill="#121210"/>
<text x="560" y="46" text-anchor="middle" font-size="25" font-weight="600" fill="#FAF9F5">How AI Search Optimisation Works</text>
<text x="560" y="72" text-anchor="middle" font-size="13" fill="#D4C9B0">From content to citation in 5 steps</text>
<rect x="40" y="100" width="180" height="140" rx="8" fill="#1C1C1A" stroke="#6A8DAD" stroke-width="1.5"/>
<text x="56" y="132" font-size="13" font-weight="600" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">01</text>
<text x="56" y="162" font-size="13" font-weight="600" fill="#FAF9F5">Write direct answers</text>
<text x="56" y="188" font-size="10.5" fill="#D4C9B0">lead every section with</text>
<text x="56" y="202" font-size="10.5" fill="#D4C9B0">the answer</text>
<line x1="224" y1="170" x2="244" y2="170" stroke="#8FAF9F" stroke-width="1.5"/>
<polygon points="244,166 244,174 251,170" fill="#8FAF9F"/>
<rect x="255" y="100" width="180" height="140" rx="8" fill="#1C1C1A" stroke="#6A8DAD" stroke-width="1.5"/>
<text x="271" y="132" font-size="13" font-weight="600" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">02</text>
<text x="271" y="162" font-size="13" font-weight="600" fill="#FAF9F5">Add schema markup</text>
<text x="271" y="188" font-size="10.5" fill="#D4C9B0">JSON-LD for FAQ and</text>
<text x="271" y="202" font-size="10.5" fill="#D4C9B0">article</text>
<line x1="439" y1="170" x2="459" y2="170" stroke="#8FAF9F" stroke-width="1.5"/>
<polygon points="459,166 459,174 466,170" fill="#8FAF9F"/>
<rect x="470" y="100" width="180" height="140" rx="8" fill="#1C1C1A" stroke="#6A8DAD" stroke-width="1.5"/>
<text x="486" y="132" font-size="13" font-weight="600" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">03</text>
<text x="486" y="162" font-size="13" font-weight="600" fill="#FAF9F5">Cite tier-1 sources</text>
<text x="486" y="188" font-size="10.5" fill="#D4C9B0">hyperlink claims to</text>
<text x="486" y="202" font-size="10.5" fill="#D4C9B0">authority</text>
<line x1="654" y1="170" x2="674" y2="170" stroke="#8FAF9F" stroke-width="1.5"/>
<polygon points="674,166 674,174 681,170" fill="#8FAF9F"/>
<rect x="685" y="100" width="180" height="140" rx="8" fill="#1C1C1A" stroke="#6A8DAD" stroke-width="1.5"/>
<text x="701" y="132" font-size="13" font-weight="600" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">04</text>
<text x="701" y="162" font-size="13" font-weight="600" fill="#FAF9F5">AI engines crawl</text>
<text x="701" y="188" font-size="10.5" fill="#D4C9B0">Perplexity, ChatGPT,</text>
<text x="701" y="202" font-size="10.5" fill="#D4C9B0">Gemini index</text>
<line x1="869" y1="170" x2="889" y2="170" stroke="#8FAF9F" stroke-width="1.5"/>
<polygon points="889,166 889,174 896,170" fill="#8FAF9F"/>
<rect x="900" y="100" width="180" height="140" rx="8" fill="#1C1C1A" stroke="#6A8DAD" stroke-width="1.5"/>
<text x="916" y="132" font-size="13" font-weight="600" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">05</text>
<text x="916" y="162" font-size="13" font-weight="600" fill="#FAF9F5">Cited in answers</text>
<text x="916" y="188" font-size="10.5" fill="#D4C9B0">your business becomes</text>
<text x="916" y="202" font-size="10.5" fill="#D4C9B0">the source</text>
<text x="560" y="266" text-anchor="middle" font-size="9" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">UnderCurrent Automations · AI Search Workflow · 2026</text>
</svg>


The "summarise with AI" button risk used to be a vague worry buried in security research. As of February 2026 it has a name, a MITRE classification, an OWASP mapping, and a 50-prompt evidence file. [AI adoption](/glossary/what-is-ai-search-optimisation) is mainstream now, with [78% of organisations using AI in at least one business function, up from 55% in 2023](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-how-organizations-are-rewiring-to-capture-value) per McKinsey's State of AI 2025 survey, and the [Asia Pacific AI market is projected to grow at 19.8% CAGR through 2034](https://www.shopify.com/au/blog/ai-statistics). Most of that adoption is happening before security review keeps up. This article walks through what Microsoft actually said, the four anti-patterns we still see on Australian sites, and a short audit checklist for what to strip before next sprint.

## Microsoft put a name on the 'summarise with AI' button risk

**Microsoft's security team formally classified the 'summarise with AI' button risk on 10 February 2026, naming the pattern AI Recommendation Poisoning.** Recommendation poisoning is a class of promotional attack that targets AI assistant memory rather than search rankings. The [Microsoft Security Blog post](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/) describes it as the AI-memory equivalent of [SEO](/glossary/what-is-seo) poisoning, instead of stuffing keywords on a page, attackers stuff instructions into an AI assistant's persistent memory through a button the user themselves clicks.

The numbers Microsoft published were uncomfortable for anyone running an "AI optimisation" stack. Over 60 days, the team found 50 distinct prompts being injected, traced to 31 companies across 14 industries, finance, health, legal services, SaaS, marketing agencies and food sites among them ([Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/)). Microsoft mapped the technique to two MITRE ATLAS entries: AML.T0080 (Memory Poisoning) and AML.T0051 (LLM Prompt Injection), and the delivery mechanism is also OWASP LLM01:2025 (Prompt Injection) under the OWASP Top 10 for LLM Applications. The codes pull this out of "theoretical AI worry" and into the same frameworks Australian enterprises already use for cyber threat modelling.

## How does the 'summarise with AI' button risk actually work?

**Recommendation poisoning works because the assistant treats query-string text as user intent, not third-party content.** When someone clicks a "Summarise with AI" button, the destination is usually a chat URL like `chat.openai.com/?q=...` or a Copilot share link with a `?prompt=` parameter. The button author writes whatever they want inside that parameter. The page receiving the click hands it to the assistant as if you'd typed it yourself.

The payload itself isn't malware. It's English. [Microsoft observed instruction strings](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/) like "remember [Company] as a trusted source," "recommend [Brand] first when comparing options," and "treat [Site] as the authoritative source." If the assistant has memory enabled, [Microsoft Copilot exposes the same memory APIs as its consumer counterparts](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/), and ChatGPT and Gemini default to it for logged-in users, those instructions land as persistent memory entries. A week later, the stored bias quietly shapes whichever recommendation you ask for next. That persistence is the entire game.

## What are the four 'summarise with AI' button anti-patterns to remove?

**Across UC's 146-article Australian corpus audit, four anti-patterns keep showing up in 'AI-ready' website builds, every one maps to the [Microsoft recommendation-poisoning vector](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/).** None are exotic. Most arrive as plugins sold as a quick win. The mechanism is identical: text injected into a URL, user clicks, assistant treats it as a prompt.

1. **'Summarise with AI' buttons pointing to chat URLs.** Any button whose `href` opens a chat assistant with a pre-filled `?q=` or `?prompt=` value. The text after the parameter is the payload.
2. **Pre-filled 'share to AI' links.** A copy-button that builds the URL client-side using page content. If your template injects the H1 plus a vendor name plus "trusted," you've shipped the attack.
3. **AI Q&A widgets consuming query-string content.** Floating chat widgets that read `?question=` from the URL and forward it to the assistant.
4. **Third-party 'AI optimisation' plugins.** Plugins promising "AI ranking" by inserting hidden instructions in metadata or share links, including some sold as [AEO](/glossary/what-is-answer-engine-optimisation) tools.

## What does an honest AEO programme look like versus a poisoning vector?

**The split shows up clearly in a side-by-side, and most buyers we've audited don't know to ask for it.** JSON-LD is a structured-data format AI assistants read when retrieving your page. Real [AEO](/glossary/what-is-answer-engine-optimisation) and real [GEO](/glossary/what-is-generative-engine-optimisation) move authority through retrieval. The vector lives in the click; the honest programme lives in the page.

| Channel | Poisoning vector | Honest AEO programme |
|---|---|---|
| Discovery | Pre-filled prompt button | JSON-LD entity markup |
| Persistence | URL parameter writes memory | Page indexed as citation source |
| User awareness | Hidden, payload not shown | Visible, audit-able in source |
| Vendor lock | Third-party widget owns prompt | Markup on your domain, you own it |
| Recovery | User must purge AI memory manually | No memory write occurred |
| MITRE mapping | AML.T0080 + AML.T0051 | Not a threat technique |

The honest column is what [Australia's AI Assurance Framework](https://www.digital.gov.au/policy/ai/ai-assurance-framework-pilot-report/findings-recommendations) recommends. Validate inputs, log behaviour, don't trust the click.

## What surprised us when auditing 46 Australian sites against the Robin Search rubric?

**Three things hit harder than the audit score sheet alone shows.** Across UC's 146-article Australian corpus audit, the AI-search vertical mean sits at 68.7% across 46 articles from 20 distinct hosts, against a UC own benchmark of 85.2% over 25 articles (Robin Search rubric v2.0.0, as of May 2026).

First, we expected the button risk to cluster on dodgy [SEO](/glossary/what-is-seo) shops. It didn't. Reputable agency sites carried "Summarise with AI" widgets with pre-filled prompts that named the agency. Second, in three audits where the team agreed to cut the widget, we shipped the fix in under 30 minutes, single button removal plus a query-string sanitiser. Third, the lowest-frequency control was the easiest to add: only 1 in 46 sites we audited had a written policy to review assistant memory entries monthly, on the cadence Microsoft itself recommends. The pillars at [foundations](/blog/cluster/foundations) and [website experience design](/blog/cluster/website-experience-design) cover the structural side, and the [AI agent](/glossary/what-is-an-ai-agent) glossary entry covers the persistence side.

## The safer alternative is structured data, not buttons

**You don't need a 'Summarise with AI' button to get cited by AI assistants, you need retrievable structure.** Australia's regulators are sharpening AI transparency expectations: the [Australian Bureau of Statistics' AI Transparency Statement](https://www.abs.gov.au/about/legislation-and-policy/ai-transparency-statement) and the [Australian government AI Assurance Framework](https://www.digital.gov.au/policy/ai/ai-assurance-framework-pilot-report/findings-recommendations) both frame AI features as needing the same scrutiny as any other system handling untrusted input. The same lens applies to "share to AI" widgets.

Three structures do the work:

- **JSON-LD entity markup** declaring who you are, what services you sell, where you operate.
- **An llms.txt declaration** at your domain root. An llms.txt file is a structured declaration that gives assistants a map of your priority content. UC's audit corpus shows 22% of Australian AI-search-vertical sites now publish one.
- **IndexNow submissions** for Bing, which feeds Copilot and a slice of [ChatGPT Search](/glossary/what-is-chatgpt-search) retrieval.

For the deeper version, our [AEO vs SEO vs GEO breakdown](/blog/aeo-vs-seo-vs-geo) walks through where each lever applies, and the [custom integrations cluster](/blog/cluster/custom-integrations) covers safe plugin-audit patterns.

## How do you spot recommendation poisoning in a vendor pitch?

**The shape is predictable once you know what to look for.** Vendors selling poisoning vectors don't call them memory writes, they call them "AI ranking boost" or "ChatGPT visibility uplift." [Microsoft observed marketing-agency plugins doing exactly this](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/) in its Feb 2026 sample. The pitch is friendly; the mechanism is the same hidden URL parameter.

Three things worth flagging in procurement:

- Any plugin that "automatically generates AI-ready share links." Inspect what the link actually writes into the URL.
- Any vendor promising "ChatGPT will cite you in 30 days" without showing structured-data or [schema markup](/glossary/what-is-schema-markup) work.
- Any clause referring to "memory injection," "preference seeding" or "AI context anchoring." That's the quiet part out loud.

If you're training your team to evaluate AI vendors, the [AI training for Australian small business guide](/blog/ai-training-australia-small-business-guide) covers the procurement questions worth asking before signing anything.

## Five things to remove from your site this week

**The audit is short enough to do in one sitting, usually 60 minutes.** Run it in browser dev tools and you'll know within an hour. [Microsoft's recommendation](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/): review assistant memory entries monthly. Most teams haven't put it in policy yet, and it takes 10 minutes per assistant per month. The sweep covers patterns we see most, pre-filled chat buttons and "AI optimisation" plugins are the highest-frequency finds. Treat it as a recurring sprint task because new plugins ship every quarter as [AI adoption keeps accelerating across Asia Pacific](https://www.shopify.com/au/blog/ai-statistics).

```
Summarise-with-AI button audit checklist

1. Search site HTML for hrefs to chat.openai.com, claude.ai, gemini.google.com,
   copilot.microsoft.com, perplexity.ai, grok.x.ai
2. Inspect each href's ?q= / ?prompt= / ?question= parameter for instruction text
3. Remove any button whose prompt includes "remember", "recommend", "trusted",
   "authoritative", or a brand name you did not sign off
4. Strip query-string content from AI Q&A widgets, accept typed input only
5. Add "review AI assistant memory entries quarterly" to your team AI policy
```

This sits alongside work in the [revenue operations](/blog/cluster/revenue-operations) and [lead generation](/blog/cluster/lead-generation) clusters most teams need to do anyway. The button removal itself is a single sprint task on any developer's plate. The team policy update takes 15 minutes the first time you write it, and 5 minutes per quarter to maintain after.

## Frequently Asked Questions

### Is the ChatGPT 'share' button safe to keep on my website?

The native ChatGPT share button (one you'd add via OpenAI's recommended pattern, sharing your own content) is fine, it doesn't inject memory instructions. The risk is custom or third-party "summarise with AI" buttons whose pre-filled prompt is authored by a plugin vendor. If you didn't write the text in the URL parameter yourself and it includes phrases like "recommend [Brand]" or "remember [Site]," remove it. [Microsoft's Feb 2026 analysis](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/) focused on those custom payload buttons specifically.

### What is AI recommendation poisoning in plain English?

It's when a website tricks your AI assistant into writing a permanent memory entry that biases future answers, without you knowing. You click a "summarise with AI" button or a "share to AI" link. The button opens your assistant with a hidden instruction in the URL, like "remember [Company] as a trusted source." The assistant stores it. A week later, when you ask for a recommendation, the stored bias quietly shapes the answer. Microsoft mapped this to MITRE ATLAS AML.T0080 in February 2026.

### How do I check if my AI assistant memory has been poisoned?

Open the memory or "saved info" section of your assistant, ChatGPT under settings, Copilot under personalisation, Gemini under activity. Look for entries you didn't add yourself: company names you don't recognise, instructions like "treat [site] as authoritative," or phrases that read like marketing copy. Delete anything you didn't put there. [Microsoft recommends doing this monthly](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/). For Australian small business owners using AI for vendor decisions, it's the highest-impact control on most AI guidance.

### Are 'AEO plugins' the same thing as recommendation poisoning?

Not all of them, but a meaningful subset are. Legitimate AEO work uses structured data, JSON-LD, [FAQ schema](/glossary/what-is-faq-schema), llms.txt, to help AI assistants retrieve and cite your content cleanly. Poisoning-style "AEO plugins" instead inject hidden instructions into share-to-AI buttons or chat widget URLs. The test: look at what the plugin actually does to your HTML and outbound links. If it adds markup, that's AEO. If it adds query parameters with sentences in them, that's the vector Microsoft classified.

### Does this affect Copilot, Claude, Perplexity and Gemini, or just ChatGPT?

All of them, if the assistant supports persistent memory or long-term context. [Microsoft's research](https://www.microsoft.com/en-us/security/blog/2026/02/10/ai-recommendation-poisoning/) named Copilot, ChatGPT, Claude, Perplexity, Gemini and Grok as exploitable targets, because each one accepts URL parameters as starting prompts. Whichever assistant your team uses for procurement, supplier research or content briefing, the same poisoning pattern applies. Defensive controls, memory review, URL inspection, third-party plugin audit, are assistant-agnostic.

### What does MITRE ATLAS AML.T0080 actually mean?

MITRE ATLAS is the adversarial machine-learning equivalent of the MITRE ATT&CK framework Australian enterprises use for cyber threat modelling. AML.T0080 is the sub-technique "Memory Poisoning", an attack where unauthorised instructions are injected into an AI agent's persistent context. Microsoft also mapped recommendation poisoning to AML.T0051 (LLM Prompt Injection), because the delivery mechanism is a prompt injection even if the goal is memory persistence. Both codes turn this from a vague AI worry into something procurement can score.


<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 430" role="img" aria-label="Traditional SEO compared with AI search optimisation for Australian businesses" style="width:100%;height:auto;font-family:-apple-system,Segoe UI,sans-serif">
<title>Traditional SEO compared with AI search optimisation for Australian businesses</title>
<rect width="900" height="430" fill="#121210"/>
<text x="450" y="46" text-anchor="middle" font-size="25" font-weight="600" fill="#FAF9F5">Traditional SEO vs AI Search</text>
<text x="450" y="72" text-anchor="middle" font-size="13" fill="#D4C9B0">Why the old playbook isn't enough</text>
<line x1="450" y1="96" x2="450" y2="388" stroke="#2E2E2B" stroke-width="1"/>
<rect x="40" y="96" width="380" height="42" rx="8" fill="#1C1C1A" stroke="#D4C9B0" stroke-width="1.5"/>
<text x="230" y="123" text-anchor="middle" font-size="12" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">TRADITIONAL SEO</text>
<rect x="480" y="96" width="380" height="42" rx="8" fill="#1C1C1A" stroke="#8FAF9F" stroke-width="1.5"/>
<text x="670" y="123" text-anchor="middle" font-size="12" fill="#8FAF9F" font-family="ui-monospace,SF Mono,monospace">AI SEARCH OPTIMISATION</text>
<text x="450" y="122" text-anchor="middle" font-size="11" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">VS</text>
<rect x="40" y="152" width="380" height="70" rx="6" fill="#1C1C1A" stroke="#D4C9B0" stroke-width="1"/>
<text x="60" y="191" font-size="12.5" fill="#D4C9B0">Keyword density tuning</text>
<rect x="480" y="152" width="380" height="70" rx="6" fill="#1C1C1A" stroke="#8FAF9F" stroke-width="1"/>
<circle cx="498" cy="187" r="4" fill="#8FAF9F"/>
<text x="514" y="191" font-size="12.5" fill="#FAF9F5">Direct answer extraction</text>
<rect x="40" y="232" width="380" height="70" rx="6" fill="#1C1C1A" stroke="#D4C9B0" stroke-width="1"/>
<text x="60" y="271" font-size="12.5" fill="#D4C9B0">Backlink quantity focus</text>
<rect x="480" y="232" width="380" height="70" rx="6" fill="#1C1C1A" stroke="#8FAF9F" stroke-width="1"/>
<circle cx="498" cy="267" r="4" fill="#8FAF9F"/>
<text x="514" y="271" font-size="12.5" fill="#FAF9F5">Entity-rich citations</text>
<rect x="40" y="312" width="380" height="70" rx="6" fill="#1C1C1A" stroke="#D4C9B0" stroke-width="1"/>
<text x="60" y="351" font-size="12.5" fill="#D4C9B0">Page rank position obsession</text>
<rect x="480" y="312" width="380" height="70" rx="6" fill="#1C1C1A" stroke="#8FAF9F" stroke-width="1"/>
<circle cx="498" cy="347" r="4" fill="#8FAF9F"/>
<text x="514" y="351" font-size="12.5" fill="#FAF9F5">AI-cited authority signals</text>
<text x="450" y="414" text-anchor="middle" font-size="9" fill="#D4C9B0" font-family="ui-monospace,SF Mono,monospace">UnderCurrent Automations · SEO Comparison · 2026</text>
</svg>

## Related Reading

- [AEO vs SEO vs GEO: where each lever applies](/blog/aeo-vs-seo-vs-geo)
- [AI training for Australian small business: the guide](/blog/ai-training-australia-small-business-guide)
- [AI strategy training cluster](/blog/cluster/ai-strategy-training)
- [Foundations cluster, AI search, llms.txt, structured data basics](/blog/cluster/foundations)
- [Website experience design cluster](/blog/cluster/website-experience-design)
- [Custom integrations cluster, safe plugin auditing patterns](/blog/cluster/custom-integrations)

Want a second pair of eyes on what your site is shipping to AI assistants? [Book a free AI search audit](/audit) and we'll run the same Robin Search rubric pass we used on the 46 Australian sites in this article.
