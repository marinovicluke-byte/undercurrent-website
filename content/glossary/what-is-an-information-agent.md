---
slug: what-is-an-information-agent
term: Information Agent
shortDefinition: A Google AI Pro and Ultra feature, launching summer 2026, that monitors the web 24/7 for updates matching a user's criteria and reports back when something qualifies.
category: tool
relatedServices: [/seo-ai-visibility]
relatedTerms: [what-is-agentic-search, what-is-an-ai-agent, what-is-google-ai-mode]
sources:
  - { title: "Search at I/O 2026 (Google blog)", url: "https://blog.google/products-and-platforms/products/search/search-io-2026/" }
  - { title: "Google AI Pro and AI Ultra plans", url: "https://one.google.com/about/google-ai-plans/" }
faqs:
  - q: "Who can use Google's Information Agents?"
    a: "Information Agents are gated to Google AI Pro and AI Ultra subscribers, the paid Gemini tiers that sit above the free One account. Google announced the feature at I/O 2026 with a rollout window of summer 2026, US first, other markets including Australia following. Free Search users do not get the watcher behaviour."
  - q: "What does my site need so an Information Agent can see it?"
    a: "Machine-readable inventory. The agent is matching user criteria against structured data, not reading your hero copy. For products and stock that means schema.org Product with a current Offer, price, and availability value. For appointments it means an Event or service block with bookable times. Without that, the page is invisible to the watcher even if it ranks in classical search."
  - q: "Is this the same as Google Alerts?"
    a: "No. Google Alerts is a 2003-era keyword notifier that emails you when a new page mentions a string. An Information Agent is a Gemini-backed watcher matching structured criteria, such as price band, distance, model, against live inventory feeds and listings. It is closer to a buyer agent than a press-clipping service."
author: Luke Marinovic
datePublished: 2026-05-25
dateModified: 2026-05-25
complianceNote: null
ai-assisted: true
source: claude-code
---

# Information Agent

**An Information Agent is a Google AI Pro and Ultra feature, launching summer 2026, that monitors the web 24/7 for updates matching a user's criteria and reports back when something qualifies.**

The framing that matters is the watcher, not the chatbot. A buyer tells Gemini "tell me when a Holden HSV under $40,000 appears within 50km of Melbourne" and the agent then runs that query against every relevant marketplace, classified listing, dealer site and structured feed for as long as the buyer leaves it on. Google announced the feature at [I/O 2026](https://blog.google/products-and-platforms/products/search/search-io-2026/), gated to [AI Pro and AI Ultra subscribers](https://one.google.com/about/google-ai-plans/), with the US rolling first and other markets including Australia behind.

The contrarian load-bearing point: this kills "set and forget" listings. The page an agent surfaces is not the prettiest one, it is the one with current structured data, fresh timestamps and machine-readable inventory. Most Australian SMB sites are written for the human visit, a hero image, a phone number, a contact form. To a watcher running once an hour, they are invisible. The site that wins is the used-car dealer in Geelong whose stock page exposes schema.org Product and Offer with `availability: InStock` and `price` on every vehicle, updated when the car sells. Same for a beauty salon publishing same-week appointment slots as structured Event data, or a tradie surfacing live job-availability rather than a generic "book a quote" form.

The shape is the same one Gemini's broader agent push is built on, a model that picks its own next step and runs a tool loop on the user's behalf, see [AI Agent](/glossary/what-is-an-ai-agent) and [agentic search](/glossary/what-is-agentic-search). The wrinkle for SMBs is the trigger. Classical search rewards a page that exists. An Information Agent only fires when your data changes in a way that matches the criteria. Stale inventory is worse than no inventory, because a watcher that has already discounted you will not re-check.

SMBs with dynamic stock, used cars, real estate, second-hand goods, available appointment slots, are now live data feeds or they get skipped. UnderCurrent Automations wires structured inventory into the same pages [Google AI Mode](/glossary/what-is-google-ai-mode) and Information Agents both read, as part of [SEO & AI Visibility](/seo-ai-visibility). The pretty hero stays. The JSON-LD underneath is what does the work.
