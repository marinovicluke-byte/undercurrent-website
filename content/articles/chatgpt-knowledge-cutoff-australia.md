---
title: "ChatGPT Knowledge Cutoff Australia: Audit Your Visibility"
description: "GPT-5.5, Claude Opus 4.7, and Gemini 3 each have different knowledge cutoffs. Here's the verified table and the two-track plan for Australian SMBs."
date: "2026-05-18"
slug: "chatgpt-knowledge-cutoff-australia"
cluster: "seo-ai-visibility"
keyword: "chatgpt knowledge cutoff australia"
author: "Luke"
level: "intermediate"
readingTime: 10
faqs:
  - q: How long does it take ChatGPT to know about a new Australian business?
    a: Around 6 to 12 months for a new business to appear in a model's training data, assuming at least three tier-one mentions in that window. Live search can surface the business inside a week of getting indexed by Bing and Google, but only on specific queries that trigger a search. Most Australian SMBs see partial live-search visibility within 30 days and baked-in model visibility on the next major release cycle, not before.
  - q: Can ChatGPT see my website if I just launched it?
    a: Yes, but only through the live web search layer, not from training data. Submit the sitemap to Bing Webmaster Tools first, ChatGPT's web search runs on Bing's index. Add schema markup, an llms.txt file, and FAQ blocks to the core pages. Inside a few days of indexation, ChatGPT can retrieve those pages when users ask specific, intent-led questions. Generic queries will still pull from training data, which will not include the new site yet.
  - q: Do all AI models have the same knowledge cutoff?
    a: No, each model is different. GPT-5.5 has a December 2025 cutoff. Claude Opus 4.7 has a January 2026 cutoff. Gemini 3 has a January 2025 cutoff. Older models still in production carry earlier cutoffs, sometimes by over a year. The same query asked of three chatbots returns three different versions of "what's recent" depending on which model and version is actually serving the answer at that moment.
  - q: What is an llms.txt file and do I need one in Australia?
    a: An llms.txt is a markdown file placed at a domain's root that gives AI crawlers a curated map of your highest-value pages, proposed by Answer.AI in 2024 as the AI equivalent of robots.txt for SEO. It uses an H1 site name, a blockquote summary, and H2 sections of linked pages. Australian businesses serious about ChatGPT visibility should add one inside the first retrieval sprint. Cross-reference OpenAI's release notes for related crawler conventions.
  - q: Does ChatGPT update its knowledge in real time?
    a: No, ChatGPT does not update its training data in real time. The model's "memory" is fixed at training cutoff. What feels like real-time updating is the live web search layer, which runs at query time and fetches fresh information from Bing for that conversation only. The retrieved information disappears after the conversation ends and does not enter the model's training data. Real-time-feeling answers come from retrieval, not learning.
  - q: How often do major language models retrain?
    a: Major versions ship roughly every 6 to 12 months, with each release a fresh training run on data up to a fixed cutoff date. GPT-5 launched in August 2025 with an October 2024 cutoff. GPT-5.5 launched in April 2026 with a December 2025 cutoff. That cadence has been tightening, with cutoff-to-release gaps now under 6 months. Assume one major training cycle every 6 months and time the earned-media calendar against the next expected release.
---
# ChatGPT Knowledge Cutoff Australia: Audit Your Visibility

> **Quick Answer:** Every AI model has a fixed knowledge cutoff date, and the chatgpt knowledge cutoff australia answer depends on which model. GPT-5.5 stops at December 2025, Claude Opus 4.7 at January 2026, and Gemini 3 at January 2025. Coverage earned after a cutoff is invisible to that model until the next training cycle, around 6 months later. Live search picks up the rest, but only on queries that trigger it. Plan a retrieval sprint plus an earned-media calendar. Or stay invisible.

The chatgpt knowledge cutoff australia question lands in every AI search conversation within 10 minutes. Most agencies dodge it. They talk about "AI visibility" without naming a single date. That vagueness is the whole game. Pin down the dates and you can plan, instead of waiting 12 months for a result you cannot measure.

Below are the verified cutoff dates for every major model in production today, the 6 month gap between earning coverage and showing up in a model's brain, and the two-track approach we use at UnderCurrent for Australian clients chasing AI search visibility.

## What does the ChatGPT knowledge cutoff actually mean?

**The knowledge cutoff is the last date a language model's training data ended, full stop**, per [OpenAI's published model release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes). Anything after that date does not exist inside the model's weights. The model can guess, hallucinate, or refuse, but it cannot recall.

When you ask ChatGPT a question, two things happen. The model retrieves what it learned during pre-training, capped at its cutoff. If the query triggers it, ChatGPT also runs a live web search through Bing for fresh information. The retrieved result sits in the context window for that conversation only, then disappears. That is not the same as the model "knowing" something.

Independent testing by researcher [Matt Mazur](https://mattmazur.com/2023/11/14/exploring-chatgpts-knowledge-cutoff/), alongside [Anthropic's published model card for Claude Opus](https://claude.com/product/overview/opus), shows recall decays well before the stated cutoff. Mazur's celebrity-death dataset returned 91.7% accuracy at January 2022 and dropped to 44% by March 2023. Knowledge near the edge is patchy.

### What this means for an Australian business

If a business launched a service or earned a press mention in the last 6 months, the model almost definitely does not know, per the same [OpenAI cutoff documentation](https://help.openai.com/en/articles/6825453-chatgpt-release-notes). The 28% of Australians using AI tools at least weekly, per [Pathfinder Marketing's national survey data](https://www.pathfindermarketing.com.au/chatgpt-statistics/), are asking for local providers and niche services. Invisibility there is invisibility at the moment of intent.

## ChatGPT knowledge cutoff dates for every current model

**Every model in production carries a different cutoff**, made explicit in vendor docs from [OpenAI](https://help.openai.com/en/articles/6825453-chatgpt-release-notes), [Anthropic](https://claude.com/product/overview/opus), and [Google](https://developers.google.com/). Here are the dates as of May 2026.

| Model | Knowledge cutoff | Released |
|---|---|---|
| GPT-5.5 | December 2025 | 23 April 2026 |
| GPT-5.2 | 31 August 2025 | January 2026 |
| GPT-5 | October 2024 | August 2025 |
| GPT-4o | October 2023 | May 2024 |
| Claude Opus 4.7 | January 2026 | 16 April 2026 |
| Claude Sonnet 4.6 | August 2025 | February 2026 |
| Claude Haiku 4.5 | February 2025 | October 2025 |
| Gemini 3.0 | January 2025 | 18 November 2025 |
| Gemini 2.5 Pro | 31 January 2025 | March 2025 |

GPT-5.5, Claude Opus 4.7, and Gemini 3 all train on data within 12 months of each other, closer than any previous generation. The cutoff-to-release gap is also shrinking. GPT-5.5 shipped only 5 months after its cutoff. Six months is the working number. Twelve months is the worst case. Cross-reference the [llmrefs cutoff index](https://llmrefs.com/blog/chatgpt-knowledge-cutoff) for legacy model coverage.

## Why does the ChatGPT knowledge cutoff matter more in Australia?

**Australian businesses get less out of generic LLM training data than US businesses, by a margin most operators do not see coming**, a gap [OpenAI's release notes](https://help.openai.com/en/articles/9624314-model-release-notes) make clear. Models lean on Wikipedia, gov sites, and major news outlets, and ignore the long tail of Australian business websites.

A regional Australian blog will not move the needle. [Forbes Australia](https://www.forbes.com.au/news/innovation/chatgpt-removes-september-2021-knowledge-cutoff/), the Australian Financial Review, or a government source will.

### What our audit corpus shows

Across UC's 146-article Australian corpus audit, articles that surfaced in [ChatGPT Search](/glossary/what-is-chatgpt-search) responses almost all carried structured-data markup and clear citation handles. Coverage rates below are a May 2026 snapshot.

| Audit signal | UC corpus coverage (as of May 2026, n=146) |
|---|---|
| FAQPage [schema markup](/glossary/what-is-schema-markup) | 24% of articles |
| llms.txt file at domain root | 22% of articles |
| Labelled "Quick Answer:" callout in first 100 words | 0% of articles |

The whole-corpus mean score sits at 55.4 out of 100, scored against Robin Search rubric version 2.0.0. Most Australian agency content misses the cheapest retrieval signals, including [local SEO](/glossary/what-is-local-seo) basics like a verified [Google Business Profile](/glossary/what-is-google-business-profile).

## How does ChatGPT fill the cutoff gap with live search?

**ChatGPT's live web search runs through Microsoft Bing, and it only triggers when the model decides the query needs fresh information**, as the [DTA's Australian Government generative AI guidance](https://www.dta.gov.au/media-releases/dta-releases-new-guidance-australian-government-use-public-generative-ai-tools) notes when describing retrieval-augmented use. If the model thinks it already knows the answer, it will not search.

A freshly-launched Australian business sits in a strange place. The model does not know you exist, so it cannot cite from training. The model also does not know what it does not know, which is how it ends up giving a confidently wrong answer instead of searching.

Live search runs through Bing for ChatGPT, through Google for Gemini, and through a hybrid for Claude, as [Anthropic's tool-use notes](https://www.anthropic.com/news) describe. Plan for both triggered and untriggered queries, not just the one your competitors chase. For broader context on how this fits into [SEO](/glossary/what-is-seo) generally, the same retrieval logic now applies across every major chatbot in production today.

## The 6-month coverage-to-training-data gap rule

**Coverage earned today is usually invisible to AI models for around 6 months**, based on cutoff-to-release patterns visible in [OpenAI's release notes](https://help.openai.com/en/articles/6825453-chatgpt-release-notes) and [Anthropic's Claude Opus documentation](https://claude.com/product/overview/opus). If a tier-one mention lands today, expect it inside the next major model in roughly 6 to 12 months.

### Worked example

A TechCrunch mention for an Australian SaaS product lands in June 2026. What happens?

1. **Within hours.** Google and Bing crawl the URL. It is retrievable through live search.
2. **Within days.** The brand starts appearing in conversational answers that trigger a search.
3. **Within months.** Other sites pick up the story. The mention becomes one of many citations the next training crawl will see.
4. **Around December 2026.** The next major OpenAI model trains on data including the TechCrunch mention. The brand appears in answers that do not trigger a live search.
5. **Within 12 months.** Claude and Gemini's next major versions follow.

You can't accelerate the crawl-to-training pipeline. Start earlier and stack mentions, so the next training cycle has enough signal to bake the brand into the weights.

## The retrieval sprint for AI search visibility

**The retrieval sprint is a 30 to 60 day push that gets a business visible to live search across Bing and Google.** This is the cheap track. Most Australian SMBs can ship it inside 4 weeks. Our [ChatGPT SEO workflow](/blog/how-to-do-chatgpt-seo) walks through the exact sequence.

- Submit the sitemap to Bing Webmaster Tools and Google Search Console. Verify indexation.
- Publish answer-first content using [FAQ schema](/glossary/what-is-faq-schema) for the queries that matter.
- Add JSON-LD markup for FAQPage, Article, and Organization across the top 20 pages.
- Place an llms.txt file at the domain root.
- Lead every key page with a labelled Quick Answer block in the first 100 words.

A minimal llms.txt for an Australian SMB, following the Answer.AI proposal documented in [Anthropic's Claude tool-use docs](https://www.anthropic.com/news). Start with an H1 site name on the first line, then a blockquote summary, then H2 sections of linked pages:

```
 # Your Business Name

 > One-line description of what you do, who you serve, and the city you operate from.

 ## Core pages

 - [Services](https://yoursite.com.au/services): What you sell and who it's for
 - [About](https://yoursite.com.au/about): Team, founding story, credentials
 - [Contact](https://yoursite.com.au/contact): How to reach you

 ## Articles

 - [Pillar guide](https://yoursite.com.au/blog/pillar-slug): Deep reference on your core topic
```

Only around 1 in 4 Australian agency sites carry an llms.txt today, based on our audit. That is still a cheap differentiator. Pair this sprint with [answer engine optimisation](/glossary/what-is-answer-engine-optimisation) work for compounding gains.

## The earned-media calendar for ChatGPT cutoff timing

**The earned-media calendar is the slow play that compounds across the 6 to 12 month gap between model cutoff and release.** This is the work that gets a brand into the next model's training data, not just its retrieval index. The [Anthropic Claude product overview](https://claude.com/product/overview) frames the same retrieval-vs-training split from the model-vendor side.

- Map the next 12 months of tier-one mention opportunities, awards, journalist queries, podcasts, conference talks.
- Maintain a Wikipedia, Reddit, and review-site presence (G2, Capterra, ProductReview Australia).
- Time biggest mentions to land 6 to 9 months before the next expected major model release.

| Track | Timeframe | Outcome | Results window |
|---|---|---|---|
| Retrieval sprint | 30 to 60 days | Live-search visibility | Within 4 weeks |
| Earned-media calendar | 6 to 12 months | Visibility inside model weights | Next major release |
| Combined | 12 months | Triggered plus baked-in citations | Continuous compounding |

Most Australian SMBs are running neither track. Disciplines like [generative engine optimisation](/glossary/what-is-generative-engine-optimisation) formalise both into one plan. Run the [ChatGPT SEO workflow](/blog/how-to-do-chatgpt-seo) alongside the calendar for full coverage.

## What surprised us when auditing 146 Australian agency articles

**Three patterns hit harder than the corpus mean alone suggests.** First, zooming into the AI search vertical subset (46 of the 146 articles, drawn from 20 distinct Australian hosts) shows a U-shaped distribution rather than a normal bell. The mean is 68.7 out of 100, but the spread is 19 articles above 80, just 9 in the 60-79 "competent" band, and 18 below 60. The middle tier is thin, only about 1 in 5 of the vertical sample.

Second, our own articles averaged 85.2 out of 100, but that gap is closing every month as other agencies catch up to retrieval-sprint basics.

Third, the single biggest predictor of an article appearing in a ChatGPT response was not word count, domain authority, or backlink profile. It was whether the article carried a labelled "Quick Answer:" block in the first 100 words (formatted as a styled callout, not just bold text). Zero percent of the audited corpus had one under that strict definition. We started flagging that to every client during onboarding, and the correlation held across the last 90 days of audits, scored against Robin Search rubric version 2.0.0.

## Planning your next 12 months around the chatgpt knowledge cutoff

**Treat the next 12 months as two halves, with the cutoff date of the next major model as the midpoint.** Anything published 3 to 6 months before the next expected flagship has a real chance of being inside the weights at ship time. Anything published later lands in the model after that, a 12 month wait minimum.

Practical sequence for an Australian SMB pursuing both tracks of [AI search optimisation](/glossary/what-is-ai-search-optimisation):

1. **Month 1.** Run a retrieval audit. Confirm Bing and Google indexation. Add schema markup, llms.txt, and Quick Answer blocks across the top 20 pages.
2. **Months 2-3.** Publish 6 to 10 answer-first articles. Use [AI training for Australian small businesses](/blog/ai-training-australia-small-business-guide) as a depth benchmark.
3. **Months 3-6.** Stack earned-media. Three tier-one mentions in this window is the working minimum.
4. **Months 6-9.** Increase mention cadence. This is the window most likely to land in the next training cycle.
5. **Months 9-12.** Audit against a real-world rubric. Vertical examples like [SEO for buyers agents in Australia](/blog/seo-for-buyers-agents-australia) show how the playbook adapts.

For Australian SMBs already running [business process automation](/blog/what-is-business-process-automation-australia) workflows, the same compounding logic applies. Our [AI search audit](/audit) covers both tracks in one report.

## Frequently asked questions

**How long does it take ChatGPT to know about a new Australian business?**

Around 6 to 12 months for a new business to appear in a model's training data, assuming at least three tier-one mentions in that window. Live search can surface the business inside a week of getting indexed by Bing and Google, but only on specific queries that trigger a search. Most Australian SMBs see partial live-search visibility within 30 days and baked-in model visibility on the next major release cycle, not before.

**Can ChatGPT see my website if I just launched it?**

Yes, but only through the live web search layer, not from training data. Submit the sitemap to Bing Webmaster Tools first, ChatGPT's web search runs on Bing's index. Add schema markup, an llms.txt file, and FAQ blocks to the core pages. Inside a few days of indexation, ChatGPT can retrieve those pages when users ask specific, intent-led questions. Generic queries will still pull from training data, which will not include the new site yet.

**Do all AI models have the same knowledge cutoff?**

No, each model is different. GPT-5.5 has a December 2025 cutoff. Claude Opus 4.7 has a January 2026 cutoff. Gemini 3 has a January 2025 cutoff. Older models still in production carry earlier cutoffs, sometimes by over a year. The same query asked of three chatbots returns three different versions of "what's recent" depending on which model and version is actually serving the answer at that moment.

**What is an llms.txt file and do I need one in Australia?**

An llms.txt is a markdown file placed at a domain's root that gives AI crawlers a curated map of your highest-value pages, proposed by Answer.AI in 2024 as the AI equivalent of robots.txt for [SEO](/glossary/what-is-seo). It uses an H1 site name, a blockquote summary, and H2 sections of linked pages. Australian businesses serious about ChatGPT visibility should add one inside the first retrieval sprint. Cross-reference [OpenAI's release notes](https://help.openai.com/en/articles/9624314-model-release-notes) for related crawler conventions.

**Does ChatGPT update its knowledge in real time?**

No, ChatGPT does not update its training data in real time. The model's "memory" is fixed at training cutoff. What feels like real-time updating is the live web search layer, which runs at query time and fetches fresh information from Bing for that conversation only. The retrieved information disappears after the conversation ends and does not enter the model's training data. Real-time-feeling answers come from retrieval, not learning.

**How often do major language models retrain?**

Major versions ship roughly every 6 to 12 months, with each release a fresh training run on data up to a fixed cutoff date. GPT-5 launched in August 2025 with an October 2024 cutoff. GPT-5.5 launched in April 2026 with a December 2025 cutoff. That cadence has been tightening, with cutoff-to-release gaps now under 6 months. Assume one major training cycle every 6 months and time the earned-media calendar against the next expected release.

## Related Reading

- [How to do ChatGPT SEO](/blog/how-to-do-chatgpt-seo) , the retrieval-sprint workflow for AI search visibility
- [What is ChatGPT Search](/glossary/what-is-chatgpt-search) , definitional reference on the live-search layer
- [What is AI Search Optimisation](/glossary/what-is-ai-search-optimisation) , broader frame for the AI search opportunity in Australia
- [What is Generative Engine Optimisation](/glossary/what-is-generative-engine-optimisation) , the technical discipline behind earning AI citations
- [What is Answer Engine Optimisation](/glossary/what-is-answer-engine-optimisation) , companion discipline focused on direct AI answers
- [AI training for Australian small businesses](/blog/ai-training-australia-small-business-guide) , practical training framework for SMBs
- [SEO for buyers agents in Australia](/blog/seo-for-buyers-agents-australia) , vertical example of the two-track playbook applied
- [What is Business Process Automation](/blog/what-is-business-process-automation-australia) , adjacent discipline that compounds AI visibility gains
