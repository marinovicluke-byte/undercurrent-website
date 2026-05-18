---
title: "Does ChatGPT Search the Web? The 34.5% Answer"
description: "ChatGPT only searches the web on 34.5% of queries per Semrush's 1B-row study. Here's how that rewrites the AEO playbook for Australian businesses in 2026."
date: "2026-05-17"
slug: "does-chatgpt-search-the-web"
cluster: "seo-ai-visibility"
keyword: "does chatgpt search the web"
author: "Luke"
level: "intermediate"
readingTime: 9
faqs:
  - q: "How often does ChatGPT search the web?"
    a: "About 34.5% of the time as of February 2026, according to Semrush's analysis of more than one billion lines of US clickstream data. The figure was 46% in late 2024, so the share is falling, not rising. The other ~65% of ChatGPT answers come from training data the model learned during pretraining, with no live search involved. Whether your specific query triggers a search depends on prompt phrasing and the topic's apparent freshness."
  - q: "Does ChatGPT pull from Google when it searches?"
    a: "Yes, often. Semrush's clickstream data shows over 21% of ChatGPT's outbound referral traffic flows to Google. When ChatGPT runs a live web search and surfaces a result, that result is frequently a Google search page itself, which the user clicks through. ChatGPT is acting as a partial front end for Google in those cases, not as an independent search index. The remaining referral share spreads across Wikipedia, Reddit, YouTube, news sites, and a long tail of ~170,000 unique domains."
  - q: "What's the difference between ChatGPT training data and live search?"
    a: "Training data is what the model learned during pretraining, with a fixed knowledge cutoff (December 1, 2025 for GPT-5.5). Live search means the model fires off a query through OAI-SearchBot, scrapes results in real time, and quotes them with citations. Training data answers are faster and don't need internet access, but they go stale. Live search answers are current, but they only fire when the system decides the query needs fresh information."
  - q: "Does schema markup help me appear in ChatGPT answers?"
    a: "Slightly, on the retrieval path, and almost not at all on the training-data path. Schema affects how live-search bots parse and quote your page, which helps for the ~34.5% of queries that trigger a live search. It does nothing for the ~65% of answers generated from training data, where what matters is whether your brand and content show up across high-signal sources like Wikipedia, Reddit, and news media. Schema is table stakes, not a moat."
  - q: "How long does it take to appear in ChatGPT's training data?"
    a: "Roughly six to nine months from publication to the next major training cutoff. GPT-5.5 was cut off on December 1, 2025 and released into the API around late April 2026, suggesting a four-to-five-month gap between cutoff and release. Anything you publish today is racing the next model's cutoff, which will land sometime in the second half of 2026. Content that doesn't land in time gets pushed to the model after that, costing you another generation."
  - q: "Is AEO a different job from SEO in Australia?"
    a: "It overlaps heavily but the centre of gravity is different. Traditional SEO in Australia rewards backlinks, on-page optimisation, and Google's E-E-A-T signals. Answer engine optimisation rewards mention-density across the open web, citation-friendly content design, and consistency of brand entities. A site can rank #1 on Google and still get cited zero times in ChatGPT because the entity layer is thin. The reverse is rarer, but possible."
---
# Does ChatGPT Search the Web? The 34.5% Answer

> **Quick Answer:** Yes, ChatGPT can search the web, but it usually doesn't. As of February 2026, ChatGPT triggers a live web search on only 34.5% of queries, down from 46% in late 2024, per a [Semrush analysis of 1B+ clickstream rows](https://www.semrush.com/blog/chatgpt-search-insights/). The other ~65% of answers come from training data baked in months earlier. Schema isn't the lever. Earned media is.

There's an AEO cottage industry on LinkedIn telling you that schema markup is the magic lever that gets you cited inside ChatGPT. It isn't. The lever sits somewhere else, and the data on where ChatGPT actually gets its answers is now public enough that nobody has an excuse for getting it wrong.

This is a practical breakdown for Australian small businesses, agencies, and in-house marketing leads who keep being asked "are we showing up in [ChatGPT Search](/glossary/what-is-chatgpt-search)?" and want a real answer instead of a sales deck. We've pulled the numbers from the only two large-scale datasets that exist on this, paired them with our own audit corpus, and turned it into a roadmap you can run on Monday.

If you'd rather we run the analysis on your own site, [here's how our AI search audit works](/audit). Otherwise, keep reading.

## Does ChatGPT search the web on every query?

**Two out of three ChatGPT answers never touch the live web at all.** That is the single most important number in [AI search optimisation](/glossary/what-is-ai-search-optimisation) right now, and almost nobody is quoting it. The figure comes from a [Semrush study published in April 2026](https://www.semrush.com/blog/chatgpt-search-insights/) that analysed more than one billion lines of US clickstream data covering October 2024 to February 2026.

The headline finding: as of February 2026, ChatGPT enabled a [live web search on 34.5% of queries](https://www.semrush.com/blog/chatgpt-search-insights/), down from 46% in late 2024 (n=1B+ clickstream rows). The system is leaning more on its [training data](/blog/how-to-do-chatgpt-seo), not less, even as the crawler infrastructure grows. OpenAI's [OAI-SearchBot logged a 3.5x increase in events post-GPT-5](https://openai.com/) across [Botify's 7-billion-log-file analysis](https://www.botify.com/blog/openai-tripled-web-crawl) over the same period.

The two facts only sound contradictory. More crawling feeds the training-data pipeline (everything ingested now lands in the next model's weights). Retrieval-per-query is a separate dial , whether the live model decides any given prompt needs a fresh search , and that dial is being turned down. Up on one channel, down on the other.

If you have been optimising your site purely for retrieval, you are working on roughly one-third of the surface area. The rest lives upstream of any query.

## What's the difference between retrieval and training data?

**ChatGPT answers in two completely different ways, and they reward completely different behaviour.** This is the mental model the AEO blogs skip past, and it's the one you need.

**Retrieval is the path** when the model decides a question needs current information and fires a live search through OAI-SearchBot. Pages get scraped, summarised, and quoted with citations. [OpenAI says ChatGPT chooses to search automatically when a query would benefit from current information](https://www.popsci.com/diy/how-chatgpt-search-works/), like prices, news, or fast-moving topics.

**Training data is the other path.** No search happens. The model writes the answer from patterns it learned during pretraining. [GPT-5.5's knowledge cutoff is December 1, 2025](https://developers.openai.com/api/docs/models/gpt-5.5), so anything published before then is potentially baked in for good; anything after waits for the next model. The [eSafety Commission notes ChatGPT can produce factually inaccurate or biased outputs](https://www.esafety.gov.au/key-topics/esafety-guide/chatgpt) precisely because this path runs without checking current sources.

One caveat: a user can force a live search by clicking the search icon, which shifts the 34.5% share for that session. The figure is the default behaviour, not a ceiling.

A schema markup change might help retrieval slightly. It does almost nothing for training data, where most answers live.

## How does ChatGPT search pick its sources?

**Three out of every ten ChatGPT referrals go to just ten domains.** When ChatGPT does run a live search, the result is tightly concentrated. [Semrush's clickstream data shows over 30% of all referral traffic from ChatGPT goes to 10 domains](https://www.semrush.com/blog/chatgpt-search-insights/), and over 21% of that referral traffic flows to Google itself (n=1B+ rows, Feb 2026).

That number is the strange one. ChatGPT runs a live search, surfaces a Google page, the user clicks through, and Google sends them somewhere else. ChatGPT has become a partial front end for Google. [Search Engine Land covered this under the headline "One in five ChatGPT clicks go to Google"](https://searchengineland.com/chatgpt-traffic-google-study-473811).

A few more numbers from [the same Semrush dataset](https://www.semrush.com/blog/chatgpt-search-insights/):
- Outbound referrals from ChatGPT grew 206% in 2025; raw click volume to publisher sites is up sharply.
- Queries per session jumped 50% in four months, to 1.75 by Feb 2026.
- Domains receiving any ChatGPT referral peaked at 260,000 in October 2025, then dropped to 170,000.
- Search-style language inside prompts nearly doubled from 18.9% to 34.9% Oct 2025 to Feb 2026.

Concentrated retrieval that's shrinking, plus a training-data path that's quietly growing. That's the real shape.

## Why does GPT-5.5's cutoff matter for ranking?

**Anything you publish today is racing a December 2025 deadline that has already passed.** GPT-5.5 was released into the OpenAI API in late April 2026 with a [knowledge cutoff of December 1, 2025](https://developers.openai.com/api/docs/models/gpt-5.5). Anything written after that date is invisible to GPT-5.5's training-data path. It only appears in answers if the retrieval path fires for that query.

The next model, call it GPT-6, will land sometime in the second half of 2026. Its cutoff will likely sit six to nine months before its release, going by the [OpenAI release cadence](https://openai.com/). Content you publish in May 2026 has a realistic shot at being inside GPT-6's training set if you can get it indexed and cited enough that the model treats it as load-bearing.

That's your ranking window. Roughly six months from publication to the next major training cutoff. Miss it and you compete only in the retrieval path, which fires on 34.5% of queries and concentrates around 10 domains.

```text
Publish window  →  Indexation  →  Citation accumulation  →  Training cutoff
   May 2026        Jun-Jul          Aug-Oct                  Likely Nov 2026
   ────────────────────────────────────────────────────────────────────────
   Earned mentions on Reddit/Wikipedia/PR weight heaviest in this window.
   Schema tweaks weight near-zero. Crawler accessibility is table stakes.
```

The calendar matters more than the schema.

## Why the schema is the magic AI lever myth keeps getting written

**Schema markup helps retrieval at the margins and does almost nothing for training data.** It's easy to talk about, easy to sell, easy to ship as a deliverable, which is why every AEO content farm leads with it.

Training data is shaped by what the model reads during pretraining: a snapshot of high-signal web pages, books, code, and licensed corpora. A page with no [schema markup](/glossary/what-is-schema-markup) but high mention-density across Wikipedia, Reddit, news, and YouTube transcripts will out-rank a perfectly schema-tagged page with zero brand mentions. Microsoft's own [Security Blog on AI tradecraft](https://www.microsoft.com/en-us/security/blog/2026/03/06/ai-as-tradecraft-how-threat-actors-operationalize-ai/) documents how model behaviour follows training-set composition more than page-level markup. The signal is entity volume across high-trust sources, not [FAQ schema](/glossary/what-is-faq-schema) on your own domain.

The retrieval path is slightly more schema-friendly. Bots do parse structured data, and it can affect snippet quality. But [Botify's analysis](https://www.botify.com/blog/openai-tripled-web-crawl) shows OpenAI's crawl is still 4% of Google's volume. A generous schema lift on retrieval is a lift on a small share of a small share.

If your [AI search agency](/blog/best-ai-search-agency-australia) sells "we added FAQPage and HowTo schema across 40 pages," ask what the maths is.

## What surprised us when we audited 46 Australian competitors

**The gap between competent and uncited is mostly a gap in earned media, not technical SEO.** Across UC's 146-article Australian corpus audit, 46 sit in the AI-search vertical, drawn from 20 distinct hosts (as of May 2026). Robin Search rubric v2.0.0 scores each article on 100 points across answer-extraction structure, entity density, citation quality, semantic completeness, and brand-voice signals. Same yardstick for our pages and competitors'. Vertical mean: 68.7/100, median 70. UC's own 25 articles sit at 85.2/100.

Three things hit harder than the score sheet shows.

First, the bottom 18 (Weak band, 30-59) had clean schema and decent meta tags. They scored low because they had zero first-party data, generic stock examples, and no external mentions outside the host site. The technical layer was fine. The entity layer was empty.

Second, the top 19 (Strong band, 80+) shared one pattern: most carried at least one stat or claim other publishers could quote, which means they were designed for re-publication, not just for [SEO](/glossary/what-is-seo). That's the citation-bait pattern.

Third, even strong articles struggled with [internal link density](/blog/ai-search-vs-traditional-seo-australia). Average internal-link count sat below the floor for a pillar article.

## How does ChatGPT search change your AEO mix?

**You need two campaigns running side by side, weighted by your sales cycle length.** Most agencies sell you one optimisation: schema-and-content for retrieval. The new shape needs both halves.

| AEO lever | Retrieval | Training-data | Effort | Best for |
|---|---|---|---|---|
| Schema (FAQ/HowTo/Article) | Modest | Negligible | Low | All cycles |
| Quality content on owned domain | Moderate | Moderate | Medium | Long cycles (90+ days) |
| Citations on Reddit, Wikipedia, news | Modest | Strong | High | Long cycles |
| Paid PR + earned media | Modest | Strong | High | Premium brands |
| Crawler accessibility + speed | Strong | Negligible | Low | Short cycles (<30 days) |
| Comparison pages for "vs" queries | Strong | Modest | Medium | Mid cycles (30-90 days) |

Short cycles (e-commerce, urgent trades) mean retrieval dominates and your spend should weight that way. Long cycles ([buyers agents](/blog/how-to-rank-buyers-agency-ai-search-melbourne) or accountants) mean training-data is where the compounding happens, and you have time to wait for it.

This is the split we ran for our [Melbourne buyers-agency case](/blog/how-to-rank-buyers-agency-ai-search-melbourne) and our [AEO-vs-SEO-vs-GEO breakdown](/blog/aeo-vs-seo-vs-geo).

## How to act on this in the next 90 days

**Stop optimising for ChatGPT like it's a search engine and start optimising like it's a reading list.** Here is the 90-day shape we recommend for any Australian business taking [answer engine optimisation](/glossary/what-is-answer-engine-optimisation) seriously.

**Weeks 1-2.** Audit what ChatGPT already says about you. Open a fresh ChatGPT session, ask the questions a buyer would ask, and write down which sources it pulls on retrieval versus what it states from training data. The split shows which path you are losing on.

**Weeks 3-6.** Build the earned-media spine. Reddit AMAs in subreddits where your category gets discussed. Original data published as quotable artefacts (we do one of these every quarter). One serious press release that lands in trade media that ChatGPT crawls.

**Weeks 7-10.** Tighten the on-site retrieval surface. Quick Answer blocks at the top of every cornerstone page. Comparison tables for "vs" intent. Definitions for ambiguous terms. Crawler-friendly pagination.

**Weeks 11-12.** Measure. Re-run the prompts from Week 1. Retrieval should shift visibly. Training-data wins are next-model lottery tickets that pay out months later.

This is the playbook we run for [AI search clients in Australia](/blog/what-is-ai-search-optimisation-australia).

## Frequently asked questions

### How often does ChatGPT search the web?

About 34.5% of the time as of February 2026, according to Semrush's analysis of more than one billion lines of US clickstream data. The figure was 46% in late 2024, so the share is falling, not rising. The other ~65% of ChatGPT answers come from training data the model learned during pretraining, with no live search involved. Whether your specific query triggers a search depends on prompt phrasing and the topic's apparent freshness.

### Does ChatGPT pull from Google when it searches?

Yes, often. Semrush's clickstream data shows over 21% of ChatGPT's outbound referral traffic flows to Google. When ChatGPT runs a live web search and surfaces a result, that result is frequently a Google search page itself, which the user clicks through. ChatGPT is acting as a partial front end for Google in those cases, not as an independent search index. The remaining referral share spreads across Wikipedia, Reddit, YouTube, news sites, and a long tail of ~170,000 unique domains.

### What's the difference between ChatGPT training data and live search?

Training data is what the model learned during pretraining, with a fixed knowledge cutoff (December 1, 2025 for GPT-5.5). Live search means the model fires off a query through OAI-SearchBot, scrapes results in real time, and quotes them with citations. Training data answers are faster and don't need internet access, but they go stale. Live search answers are current, but they only fire when the system decides the query needs fresh information.

### Does schema markup help me appear in ChatGPT answers?

Slightly, on the retrieval path, and almost not at all on the training-data path. Schema affects how live-search bots parse and quote your page, which helps for the ~34.5% of queries that trigger a live search. It does nothing for the ~65% of answers generated from training data, where what matters is whether your brand and content show up across high-signal sources like Wikipedia, Reddit, and news media. Schema is table stakes, not a moat.

### How long does it take to appear in ChatGPT's training data?

Roughly six to nine months from publication to the next major training cutoff. GPT-5.5 was cut off on December 1, 2025 and released into the API around late April 2026, suggesting a four-to-five-month gap between cutoff and release. Anything you publish today is racing the next model's cutoff, which will land sometime in the second half of 2026. Content that doesn't land in time gets pushed to the model after that, costing you another generation.

### Is AEO a different job from SEO in Australia?

It overlaps heavily but the centre of gravity is different. Traditional [SEO](/glossary/what-is-seo) in Australia rewards backlinks, on-page optimisation, and Google's E-E-A-T signals. [Answer engine optimisation](/glossary/what-is-answer-engine-optimisation) rewards mention-density across the open web, citation-friendly content design, and consistency of brand entities. A site can rank #1 on Google and still get cited zero times in ChatGPT because the entity layer is thin. The reverse is rarer, but possible.

## Related Reading

- [What is AI search optimisation](/glossary/what-is-ai-search-optimisation) , definition and scope
- [AEO vs SEO vs GEO](/blog/aeo-vs-seo-vs-geo) , the three optimisation jobs and how they differ
- [How to do ChatGPT SEO](/blog/how-to-do-chatgpt-seo) , practical setup checklist
- [How to rank in ChatGPT Search](/blog/how-to-rank-in-chatgpt-search) , retrieval-path specifics
- [AI search vs traditional SEO in Australia](/blog/ai-search-vs-traditional-seo-australia) , local context
- [How to compare AI search agencies in Australia](/blog/how-to-compare-ai-search-agencies-australia) , what to look for
- [AI search vs traditional search Australia 2026](/blog/ai-search-vs-traditional-search-australia-2026) , the bigger picture
- [What is AI search optimisation in Australia](/blog/what-is-ai-search-optimisation-australia) , local primer

Want us to run this playbook? [Book a free AI search audit](/audit) and we'll show you exactly where you sit on the 46-article benchmark.
