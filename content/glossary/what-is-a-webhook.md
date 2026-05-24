---
slug: what-is-a-webhook
term: Webhook
shortDefinition: An HTTP request an application sends to a URL you control the instant something happens, so your system reacts in real time instead of polling for changes.
category: tool
relatedServices: [/custom-integrations]
relatedTerms: [what-is-business-process-automation, what-is-ai-automation]
sources:
  - { title: "Webhooks overview (Stripe)", url: "https://stripe.com/docs/webhooks" }
  - { title: "About webhooks (GitHub Docs)", url: "https://docs.github.com/en/webhooks/about-webhooks" }
  - { title: "Webhooks (Xero Developer)", url: "https://developer.xero.com/documentation/guides/webhooks/overview/" }
faqs:
  - q: "What's the difference between a webhook and an API call?"
    a: "Direction. An API call is your system asking another system for data, you call them. A webhook is the other system calling you the moment something happens. Same underlying HTTP, opposite direction. Webhooks are push, APIs are pull."
  - q: "Why are webhooks faster than scheduled polling?"
    a: "Polling means asking every minute or every five minutes whether anything changed. Most of those checks return nothing, and the worst case is a five-minute delay. A webhook fires within a second of the event. Less load, less delay, less cost."
  - q: "Are webhooks secure?"
    a: "They can be, with two practices. First, validate the signature header that providers like Stripe and Xero send so you know the request actually came from them. Second, accept webhooks only on HTTPS endpoints. A webhook URL with no signature check is an open door, treat it the same as any public API endpoint."
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-24
complianceNote: null
ai-assisted: true
source: claude-code
---

# Webhook

**A webhook is an HTTP request an application sends to a URL you control the instant something happens, so your system reacts in real time instead of polling for changes.**

The dial tone of automation. Almost every modern automation runs on either webhooks or scheduled polling, and webhooks are the better answer almost every time. The difference is who calls whom. With polling, your system asks every minute, "anything new?" Most of the time the answer is no. With a webhook, the other system calls you the moment the event happens, no asking, no waiting.

The canonical reference implementation is Stripe. The [Stripe webhooks documentation](https://stripe.com/docs/webhooks) is the doc most developers learn webhooks from, and the patterns there, event types, signed payloads, idempotency keys, retry policies, are the ones every other vendor copies. [GitHub's webhook docs](https://docs.github.com/en/webhooks/about-webhooks) cover the same shape for code events. In the Australian SMB stack, [Xero's webhooks](https://developer.xero.com/documentation/guides/webhooks/overview/) cover invoices, contacts and bank transactions.

Here is one concrete reproducible example. A small business uses Xero for accounting and HubSpot for CRM. They want a thank-you email and a status update the moment a client pays an invoice. Without webhooks, an automation runs every five minutes asking Xero "any invoices marked paid in the last five minutes?", twelve queries an hour, mostly empty. With a webhook, Xero fires a POST request to a URL on the business's automation platform the instant the invoice status changes. The payload, a small JSON object with the invoice ID and the event type, hits an n8n workflow. The workflow updates the deal stage in HubSpot, fires the thank-you email, and logs the payment in Slack. Total delay from "paid" to "thank-you sent", under two seconds. Zero polling, zero wasted calls.

Two practical notes. Validate the signature header providers send so you know the request is genuine, Stripe, Xero and GitHub all sign their payloads. And design the endpoint to be idempotent, the same webhook may arrive twice if the provider's retry kicks in. Webhooks are the connective tissue under most [business process automation](/glossary/what-is-business-process-automation) and the trigger that lets [AI automation](/glossary/what-is-ai-automation) react in real time. They're the default first piece UnderCurrent Automations reaches for on any [Custom Integrations](/custom-integrations) build.
