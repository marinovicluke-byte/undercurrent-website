---
slug: what-is-quality-score
term: Quality Score
shortDefinition: Quality Score is Google Ads' 1-to-10 diagnostic rating of how relevant and useful your keywords, ads and landing pages are, compared with other advertisers bidding on the same terms.
category: metric
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-cost-per-click, what-are-negative-keywords, what-is-ppc]
sources:
  - { title: "About Quality Score for Search campaigns (Google Ads Help)", url: "https://support.google.com/google-ads/answer/6167118" }
  - { title: "About Ad Rank (Google Ads Help)", url: "https://support.google.com/google-ads/answer/1722122" }
faqs:
  - { q: "Does Quality Score affect my CPC?", a: "Indirectly. Quality Score itself is a diagnostic number, and Google says it is not used directly in the live auction. But the same relevance signals it reports, expected click-through rate, ad relevance and landing page experience, are calculated in real time at auction, and stronger relevance generally lowers what you pay for a given position." }
  - { q: "What is a good Quality Score?", a: "On the 1-to-10 scale, 7 and above is healthy for most keywords, 8 to 10 is strong, and anything below 5 points to a real problem, usually a landing page that does not match the ad or an ad group that is too broad. Treat it as a warning light, not a target to chase for its own sake." }
  - { q: "Why can't I see Quality Score on my campaigns?", a: "Quality Score is reported at the keyword level in Search campaigns. Automated campaign types like Performance Max and AI Max for Search do not run on traditional keywords, so they show no Quality Score. As more spend moves into those formats, the metric is visible on a shrinking share of accounts." }
author: Luke Marinovic
datePublished: 2026-05-20
dateModified: 2026-05-20
complianceNote: null
ai-assisted: true
source: claude-code
---

# Quality Score

**Quality Score is Google Ads' 1-to-10 diagnostic rating of how relevant and useful your keywords, ads and landing pages are, compared with other advertisers bidding on the same terms.**

Most glossaries describe Quality Score as the dial that sets your cost-per-click. That is not what Google says it is. [Google's own documentation](https://support.google.com/google-ads/answer/6167118) is explicit: Quality Score is "a diagnostic tool meant to give you a sense of how well your ad quality compares to other advertisers," and it is "not an input in the ad auction." The live auction calculates ad quality in real time, from many signals, at the moment of each search. Quality Score is the reported summary of that, a dashboard light, not the engine.

That distinction tells you how to use the number. Quality Score is built from three components, each reported as below average, average or above average. Expected click-through rate is how likely your ad is to be clicked when it shows. Ad relevance is how closely the ad matches the intent behind the search. Landing page experience is how relevant and useful the page is once someone clicks. Read together, they point at where a keyword is weak.

What good looks like: on the 1-to-10 scale, 7 and above is healthy, 8 to 10 is strong, and below 5 is a problem worth stopping for. A low score almost always traces to one of two things, an ad group so broad that no single ad can be relevant to all of it, or a landing page that does not answer the search. Neither is fixed by raising your bid.

A concrete example. A Melbourne buyers agent runs one ad group holding "buyers agent", "buyers advocate" and "property negotiator", served by a single generic ad. No ad can mirror three different searches at once, so ad relevance sits at below average and the cost per click drifts up. Split them into three tight ad groups, each with an ad that uses the actual search term and a page built for it, and ad relevance climbs. The same position now costs less, because Google rewards the match. That is the real mechanism, even though [Ad Rank](https://support.google.com/google-ads/answer/1722122), not the Quality Score number itself, does the work.

One shift to watch. Quality Score is a keyword-level metric, and Google's newer campaign types, [Performance Max](/glossary/what-is-performance-max) and AI Max for Search, do not run on traditional keywords. As budget moves into them, Quality Score becomes visible on a shrinking slice of accounts, even though the underlying logic, relevance is rewarded, still governs every auction. Tightening relevance through clean ad groups and [negative keywords](/glossary/what-are-negative-keywords) stays the cheapest way to lower [cost-per-click](/glossary/what-is-cost-per-click).

Our [SEO & AI Visibility](/seo-ai-visibility) service builds landing pages that lift ad relevance and earn organic visibility from the same work.
