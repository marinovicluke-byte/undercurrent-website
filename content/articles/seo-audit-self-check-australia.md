---
title: "Is Your Website Broken? Run a 30-Min SEO Audit"
description: "Run a free 30-minute SEO audit on your Australian service business website with these 8 checks — no agency required. Spot what's broken before you spend a cent."
date: "2026-05-06"
slug: "seo-audit-self-check-australia"
cluster: "foundations"
keyword: "seo audit"
author: "Luke"
level: "intermediate"
readingTime: 11
summary: "A practical 8-step SEO audit any Australian service business owner can run in 30 minutes using free tools only. Covers indexation, Core Web Vitals, mobile usability, on-page basics, internal linking, content depth, Google Business Profile parity, and backlinks — plus an honest guide on what DIY finds versus what a paid audit actually adds."
faqs:
  - q: "Can I do an SEO audit myself without paying an agency?"
    a: "Running a basic SEO audit yourself is entirely possible using free tools, Google Search Console, PageSpeed Insights, Chrome Lighthouse, and the Rich Results Test cover the majority of critical checks. The self-audit in this article takes 30 minutes and surfaces the most common problems: indexation failures, Core Web Vitals errors, missing schema, and thin content. Where DIY falls short is full site crawls and competitor gap analysis. If your self-check turns up three or more issues you can't interpret, that's the point to consider paid help."
  - q: "How long does an SEO audit take to show results after you fix the issues?"
    a: "After fixing issues identified in an SEO audit, most technical changes, like resolving crawl errors or adding schema markup, are reflected in Google Search Console within 2-4 weeks of recrawl, per Google Search Central documentation. Content improvements typically take 6-12 weeks to show ranking movement, since Google needs time to re-crawl, re-index, and reassess page quality. Core Web Vitals fixes tend to show faster movement because Google recrawls frequently updated pages more often. Tracking changes in Search Console's Performance report is the most reliable way to measure impact post-fix."
  - q: "What is the difference between an SEO audit and an SEO report?"
    a: "An SEO audit is a diagnostic process, it actively checks your site against ranking criteria and identifies what is broken or missing. An SEO report is a summary document, often produced after an audit or as part of an ongoing retainer, that describes what was found and what changed over a period. Audits are action-oriented; reports are retrospective. Many agencies use the terms interchangeably, which causes confusion. When engaging a provider, ask specifically whether the deliverable includes a crawl, a prioritised fix list, and effort vs impact scoring, not just a PDF summary."
  - q: "Does a Google algorithm update mean I need to redo my SEO audit?"
    a: "A confirmed Google core algorithm update is a strong trigger for re-running your SEO audit, particularly if you notice a traffic drop in Search Console within 2-4 weeks of the update. Google's Search Central blog documents each core update with the rollout period. Not every update will affect your site, but sites relying on thin content, weak backlink profiles, or outdated structured data are most vulnerable. A quarterly audit cadence means you're rarely more than a few months behind any algorithm change, close enough to catch damage before it compounds."
  - q: "What does an SEO audit cost for a small business in Australia?"
    a: "A professional SEO audit for an Australian small business typically costs between $500 and $2,500 as a standalone engagement, depending on site size and audit depth. Ongoing monthly retainers that include regular auditing sit in the $2,000–$10,000 range. According to IBISWorld's Australian Digital Advertising industry data, demand for SEO services has grown steadily as businesses shift spend toward search visibility. Running the free self-audit in this article first is worthwhile, it confirms whether a real problem exists before you commit budget, and gives any agency you engage a clearer brief to work from."
---
# Is Your Website Broken? Run a 30-Min SEO Audit

> **Quick Answer:** An SEO audit is a structured check of your website's technical health, content, and visibility signals. You can run the eight most important checks in 30 minutes using only free tools, and most Australian service businesses will find at least two serious problems before they hit the 15-minute mark. Run it before you pay anyone.

![SEO audit workflow showing five steps Australian service businesses use to find technical issues](./body-1.jpg)


| Check | Free Tool | Time Required | Estimated Impact |
|---|---|---|---|
| 1. Indexation | Google Search (site:) | 3 min | Confirms site is visible to Google |
| 2. Search Console coverage + Core Web Vitals | Google Search Console | 5 min | Flags crawl errors, speed failures |
| 3. Mobile usability | PageSpeed Insights (Mobile tab) | 3 min | Catches layout breaks on phones |
| 4. On-page basics (title, H1, meta, schema) | PageSpeed / View Source | 5 min | Fixes the signals Google reads first |
| 5. Internal linking shape | Google Search Console | 3 min | Spots orphaned pages |
| 6. Content depth vs intent | Manual search + wordcount | 4 min | Reveals thin or mismatched content |
| 7. [Google Business Profile](/glossary/what-is-google-business-profile) parity | Google Maps / GBP dashboard | 3 min | Aligns local signals |
| 8. Backlink sanity check | Google Search Console | 4 min | Flags toxic or missing links |

---

[Semrush's SEO statistics roundup](https://www.semrush.com/blog/seo-statistics/) reflects what we see in audits at UC: most Australian local businesses have never run a structured technical SEO check. That's not laziness, it's that the standard entry point is a $1,500 agency PDF that tells you nothing useful for the first week. This guide skips that. It walks through the same eight checks an agency runs in their first 30 minutes, using tools that cost nothing.

---

## What Is an SEO Audit and What Does It Cover?

**An SEO audit is a structured review of the technical, content, and authority signals that determine whether your website ranks in Google search results.** It identifies what's broken, what's missing, and what's actively suppressing your visibility.

Search engine optimisation audit refers to the process of systematically checking a website against the criteria search engines use to rank pages, then producing a prioritised list of fixes. That last part, prioritised, is what separates a useful audit from a 50-page report that collects dust.

A complete audit covers three layers: **technical** (can Google crawl and index your site?), **on-page** (are your content signals clear?), and **off-page** (does your site have credibility?). According to [Google Search Central documentation](https://developers.google.com/search/docs/fundamentals/how-search-works), Google evaluates sites against signals including page experience, relevance, and authority, all three layers map directly to that framework.

Google's own data shows that [Core Web Vitals are a confirmed ranking signal](https://developers.google.com/search/docs/appearance/core-web-vitals), specifically Largest Contentful Paint under 2.5 seconds, Cumulative Layout Shift under 0.1, and Interaction to Next Paint under 200ms. Sites that fail these thresholds are ranked below passing competitors on mobile, and [Google's web.dev documentation](https://web.dev/articles/vitals) confirms the metrics and their pass/fail boundaries.

The self-check below covers all three layers in 30 minutes. It won't replace a deep technical audit, if you want an expert set of eyes on your setup, our [free automation audit](/audit) includes a visibility check, but it will tell you whether your site has a serious problem before you spend anything finding out.

---

## How Do You Run Checks 1-4 of a Free SEO Audit?

**Start with the four signals Google reads first.** Each takes three to five minutes.

**Check 1, Indexation:** Type `site:yourdomain.com.au` into Google. Zero results means Google isn't indexing your site. Check your `robots.txt` and any `noindex` tags in the page source.

**Check 2, Search Console coverage:** Open [Google Search Console](https://search.google.com/search-console/about). The Coverage report should show zero "Error" URLs and the Core Web Vitals report should show URLs in the "Good" band per [Google's thresholds](https://developers.google.com/search/docs/appearance/core-web-vitals). Across UC's audit corpus, unoptimised images are the most common Core Web Vitals red flag, a 10-minute fix most owners miss.

**Check 3, Mobile usability:** Use [Google's PageSpeed Insights](https://pagespeed.web.dev/) (Mobile tab) or run [Chrome Lighthouse](https://developer.chrome.com/docs/lighthouse/) from Chrome DevTools. A broken mobile layout suppresses your whole domain. Per Statista's Australian mobile usage data, over 60% of Australian web traffic is mobile.

**Check 4, On-page basics:** Every page needs a unique title under 60 characters, one H1 matching search intent, a meta description under 160 characters, and LocalBusiness schema. Validate via [Google's Rich Results Test](https://search.google.com/test/rich-results). [Google's structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/local-business) confirms LocalBusiness schema feeds directly into local pack rankings.

Below is the canonical JSON-LD structure for an Australian local service business. Copy it into your site's `<head>` and fill in your details:

```json
{
"@context": "https://schema.org",
"@type": "LocalBusiness",
// Replace with your actual business type, e.g. "Plumber", "ElectricalContractor"
"name": "Your Business Name",
"url": "https://yourdomain.com.au",
// Must match your Google Business Profile address exactly
"address": {
"@type": "PostalAddress",
"streetAddress": "123 Example St",
"addressLocality": "Suburb",
"addressRegion": "VIC",
"postalCode": "3000",
"addressCountry": "AU"
},
// Use E.164 format for AU numbers
"telephone": "+61-3-XXXX-XXXX",
// areaServed helps Google tie you to local queries
"areaServed": {
"@type": "City",
"name": "Melbourne"
},
// Match your primary GMB category exactly
"description": "Licensed [trade type] servicing [suburbs], [State]."
}
```

## How Do You Complete Checks 5-8 of a Free SEO Audit?

**The final four checks cover authority, content depth, and local signals.** Run them in order.

**Check 5, Internal linking:** Go to Search Console → Links → Internal links. Any important service page with fewer than three internal links is effectively hidden from Google. An orphaned page for "emergency electrical Footscray" won't rank even with perfect content. Our [automation services](/services) page has a section on how we handle this for clients.

**Check 6, Content depth:** Open a private browser, search your target keyword, and compare the top three results to your page. A business we worked with, a residential landscaping team in Coburg, had three service pages each under 200 words. After expanding them to match competitor depth, all three moved from page 3 to page 1 within two months.

**Check 7, GBP parity:** Search your business name in Google Maps. Every field, name, address, phone, website URL, primary category, must exactly match your website footer. According to [Google's Business Profile help documentation](https://support.google.com/business/answer/7091), consistent NAP data is a primary local ranking signal.

**Check 8, Backlink profile:** Go to Search Console → Links → External links. You want a spread of real referring domains, local directories, industry associations, supplier pages. [Ahrefs' free backlink checker](https://ahrefs.com/backlink-checker) shows the top 100 referring domains.

---

## Free vs Paid SEO Audit: What's the Actual Difference?

**Free tools find what's broken.** A paid audit tells you why it's broken, what to fix first, and what fixing it is actually worth to your business.

The DIY path above surfaces the majority of problems. What it won't give you is a full site crawl, a competitor gap analysis, or a prioritised roadmap with effort vs impact scored. [Bruce Clay Australia's audit methodology](https://www.bruceclay.com/au/seo/seo_assessment/) runs a deep audit with architecture fixes included, that's a different product entirely from a self-check.

Public [Australian SEO agency pricing pages](https://www.bruceclay.com/au/seo/seo_assessment/) and [IBISWorld's Australian Digital Advertising Agencies industry report](https://www.ibisworld.com/australia/industry/digital-advertising-agencies/5535/) put a standalone audit in the $500–$2,500 band for most Australian small businesses, with ongoing retainers varying widely by scope. Beyond price, the [ASBFEO](https://www.asbfeo.gov.au/) is the canonical Australian government resource for SMB cost benchmarks, a one-off audit is one of the lower-cost diagnostics available before committing to a retainer.

The honest framing: run this checklist first. If you find three or more red flags, a paid audit has clear ROI. If everything looks clean, you may just need content, which you can do yourself.

If you'd rather have the whole thing done for you, audit, fixes, and ongoing visibility, [that's exactly what we do at UnderCurrent Automations](/audit), and most builds go live in under two weeks.

---

## How Often Should You Run an SEO Audit on Your Website?

**Run a basic self-audit every quarter.** Run a deeper audit every six months.

Google ships ranking system updates regularly, and [Google Search Central's ranking updates page](https://developers.google.com/search/updates/ranking) documents each confirmed core update. Sites that ranked cleanly 18 months ago may now be running into new signals they haven't accounted for. A quarterly check catches drift before it becomes a crisis.

Trigger an unscheduled audit when you migrate your site, change your URL structure, add a major service page, or notice a sudden traffic drop in Search Console. These events break things in ways a routine check won't catch until the damage is done. Our [how we work](/process) page outlines how we build recurring audit checkpoints into client engagements for exactly this reason.

According to [Semrush's local SEO data](https://www.semrush.com/blog/seo-statistics/), most local businesses run an SEO audit at some point, but far fewer do it on a regular cadence. [The ABS counts more than 2.5 million actively trading businesses in Australia](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release), and the majority have no recurring SEO monitoring in place. The competitive advantage isn't in running one audit, it's in running one every quarter when your competitors don't. If you want to see what that's worth in actual traffic terms, our [ROI calculator](/roi) can run the numbers for your market.

---

![Australian SEO audit comparison showing DIY free tools versus paid agency PDF reports](./body-2.jpg)

## Frequently Asked Questions

### Can I do an SEO audit myself without paying an agency?

**Running a basic SEO audit yourself is entirely possible using free tools, Google Search Console, PageSpeed Insights, Chrome Lighthouse, and the Rich Results Test cover the majority of critical checks.** The self-audit in this article takes 30 minutes and surfaces the most common problems: indexation failures, Core Web Vitals errors, missing schema, and thin content. Where DIY falls short is full site crawls and competitor gap analysis. If your self-check turns up three or more issues you can't interpret, that's the point to consider paid help.

### How long does an SEO audit take to show results after you fix the issues?

**After fixing issues identified in an SEO audit, most technical changes, like resolving crawl errors or adding schema markup, are reflected in Google Search Console within 2-4 weeks of recrawl, per [Google Search Central documentation](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).** Content improvements typically take 6-12 weeks to show ranking movement, since Google needs time to re-crawl, re-index, and reassess page quality. Core Web Vitals fixes tend to show faster movement because Google recrawls frequently updated pages more often. Tracking changes in Search Console's Performance report is the most reliable way to measure impact post-fix.

### What is the difference between an SEO audit and an SEO report?

**An SEO audit is a diagnostic process, it actively checks your site against ranking criteria and identifies what is broken or missing. An SEO report is a summary document, often produced after an audit or as part of an ongoing retainer, that describes what was found and what changed over a period.** Audits are action-oriented; reports are retrospective. Many agencies use the terms interchangeably, which causes confusion. When engaging a provider, ask specifically whether the deliverable includes a crawl, a prioritised fix list, and effort vs impact scoring, not just a PDF summary.

### Does a Google algorithm update mean I need to redo my SEO audit?

**A confirmed Google core algorithm update is a strong trigger for re-running your SEO audit, particularly if you notice a traffic drop in Search Console within 2-4 weeks of the update.** Google's Search Central blog documents each core update with the rollout period. Not every update will affect your site, but sites relying on thin content, weak backlink profiles, or outdated structured data are most vulnerable. A quarterly audit cadence means you're rarely more than a few months behind any algorithm change, close enough to catch damage before it compounds.

### What does an SEO audit cost for a small business in Australia?

**A professional SEO audit for an Australian small business typically costs between $500 and $2,500 as a standalone engagement, depending on site size and audit depth.** Ongoing monthly retainers that include regular auditing sit in the $2,000–$10,000 range. According to IBISWorld's Australian Digital Advertising industry data, demand for SEO services has grown steadily as businesses shift spend toward search visibility. Running the free self-audit in this article first is worthwhile, it confirms whether a real problem exists before you commit budget, and gives any agency you engage a clearer brief to work from.

---

## Related Reading

- [AI Search vs Traditional Search: What Australian Businesses Need to Know](/blog/ai-search-vs-traditional-search-australia-2026), why ranking in ChatGPT and Perplexity now matters as much as ranking in Google
- [How to Do AI Search Optimisation in Australia](/blog/what-is-ai-search-optimisation-australia), the strategy behind getting cited in AI-generated answers, not just organic results
- [How to Rank in ChatGPT Search](/blog/how-to-rank-in-chatgpt-search), what determines whether your business gets quoted in AI search results
- [Why Australian Tradies Don't Get Google Reviews](/blog/why-tradies-dont-get-google-reviews-australia), the local SEO signal most service businesses underweight
- [Why Most AU SEO Agencies Fail at AI Search](/blog/au-seo-agencies-ai-search-audit), what to look for when choosing an SEO partner in 2026

---

## Sources

1. [Semrush, SEO Statistics and Local Search Data](https://www.semrush.com/blog/seo-statistics/)
2. [Google Search Central, How Search Works](https://developers.google.com/search/docs/fundamentals/how-search-works)
3. [Google Search Central, Core Web Vitals as a Ranking Signal](https://developers.google.com/search/docs/appearance/core-web-vitals)
4. [Google web.dev, Core Web Vitals](https://web.dev/articles/vitals)
5. [Google Search Central, LocalBusiness Structured Data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
6. [Google Search Central, Ranking Updates](https://developers.google.com/search/updates/ranking)
7. [Google Support, Google Business Profile Local Ranking Signals](https://support.google.com/business/answer/7091)
8. [IBISWorld, Australian Digital Advertising Agencies Industry Report](https://www.ibisworld.com/australia/industry/digital-advertising-agencies/5535/)
9. [Bruce Clay Australia, SEO Assessment](https://www.bruceclay.com/au/seo/seo_assessment/)
10. [Ahrefs, Free Backlink Checker](https://ahrefs.com/backlink-checker)
11. Statista, Australia Mobile Internet Usage
12. [ASBFEO, Australian Small Business and Family Enterprise Ombudsman](https://www.asbfeo.gov.au/)
13. [ABS, Counts of Australian Businesses](https://www.abs.gov.au/statistics/economy/business-indicators/counts-australian-businesses-including-entries-and-exits/latest-release)
