---
slug: what-is-a-webhook
term: Webhook
shortDefinition: An HTTP request an application sends to a URL you control the instant something happens. Default implementations from no-code tools ship unsigned and non-idempotent, which is where automation quietly breaks.
category: tool
relatedServices: [/custom-integrations]
relatedTerms: [what-is-business-process-automation, what-is-ai-automation]
sources:
  - { title: "Webhooks overview (Stripe)", url: "https://stripe.com/docs/webhooks" }
  - { title: "About webhooks (GitHub Docs)", url: "https://docs.github.com/en/webhooks/about-webhooks" }
  - { title: "Webhooks (Xero Developer)", url: "https://developer.xero.com/documentation/guides/webhooks/overview/" }
faqs:
  - q: "What's the difference between a webhook and an API call?"
    a: "Direction. An API call is your system asking another system for data. A webhook is the other system calling you the moment something happens. Same underlying HTTP, opposite direction. Webhooks are push, APIs are pull."
  - q: "Why is the default n8n or Zapier webhook insecure?"
    a: "Because the no-code defaults ship with no signature validation. A public webhook URL with no HMAC check accepts any POST payload, which means a competitor or a bored teenager who knows the URL can fire fake events into your CRM. Stripe, Xero and GitHub all sign their payloads but it is on the receiver to verify the signature. UnderCurrent Automations treats this check as non-optional on production."
  - q: "What is webhook idempotency and why does it matter?"
    a: "Most providers retry on a non-200 response and sometimes retry quietly on timeout even when the original request succeeded. The result is duplicate events: a 'payment received' webhook arriving twice, the workflow running twice, the customer getting charged twice. The fix is storing the event ID on first receipt and dropping duplicates. Stripe documents the pattern, almost no SMB tutorial mentions it."
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-25
complianceNote: null
ai-assisted: true
source: claude-code
---

# Webhook

**A webhook is an HTTP request an application sends to a URL you control the instant something happens, so your system reacts in real time instead of polling. Default implementations from SaaS vendors and no-code tools ship unsigned and non-idempotent, which is where most "automated" systems quietly break.**

Direction is the easy part. A polling integration asks a third-party API every few minutes whether anything new has happened. A webhook is the third-party calling you the moment the event fires. Cheaper and faster, with no wasted traffic when nothing is happening. [Stripe's webhook documentation](https://stripe.com/docs/webhooks) is the reference implementation most other vendors copy, and [GitHub's webhook docs](https://docs.github.com/en/webhooks/about-webhooks) plus [Xero's webhook overview](https://developer.xero.com/documentation/guides/webhooks/overview/) follow the same pattern.

The part most teams skip is the contract.

A webhook URL is public attack surface. Anyone who knows the URL can POST any payload they want. Stripe, Xero and GitHub all sign their payloads with a shared secret so the receiver can verify the request came from them. n8n, Make and Zapier all ship default webhook receivers with no signature check enabled. Ship the no-code default and a competitor (or a bored teenager) with the URL can fire fake "invoice paid" events into your CRM and trigger refund flows you never authorised. The fix is one HMAC validation step before processing. It is non-optional on any production build.

The second contract is idempotency. Most webhook providers retry on a non-200 response, and many retry quietly on timeout even when the original request succeeded. The result: the same "payment received" event arrives twice, the workflow runs twice, the thank-you email sends twice, and in the worst case the customer is charged twice. The fix is storing each event ID on first receipt and dropping duplicates on the retry. Stripe documents this pattern, almost no SMB automation tutorial mentions it.

A concrete reproducible example. A small business runs Xero for accounting and HubSpot for CRM. Xero fires a webhook to an n8n workflow when an invoice is marked paid. The workflow validates the Xero signature header, checks an Upstash Redis store for the event ID, then updates the HubSpot deal stage, fires the thank-you email and logs to Slack. Two seconds end to end. Zero polling, zero replay risk.

Webhooks are the connective tissue under [business process automation](/glossary/what-is-business-process-automation) and the trigger that lets [AI automation](/glossary/what-is-ai-automation) react in real time. UnderCurrent Automations treats every webhook on a [Custom Integrations](/custom-integrations) build as a two-part contract: signature validation and idempotency, both required before the workflow runs. Skip either and the system works until the day it doesn't, usually on the support ticket six months later.
