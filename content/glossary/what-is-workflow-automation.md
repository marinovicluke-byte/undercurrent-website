---
slug: what-is-workflow-automation
term: Workflow Automation
shortDefinition: Software that runs a trigger-action chain across tools, the smallest unit of automation, one event fires a defined sequence with no person in the middle.
category: discipline
relatedServices: [/custom-integrations]
relatedTerms: [what-is-business-process-automation, what-is-marketing-automation, what-is-ai-automation]
sources:
  - { title: "What is workflow automation? (Zapier)", url: "https://zapier.com/blog/workflow-automation/" }
  - { title: "Workflow automation overview (Microsoft Power Automate)", url: "https://learn.microsoft.com/en-us/power-automate/getting-started" }
  - { title: "The state of AI in 2025 (McKinsey)", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" }
faqs:
  - q: "How is workflow automation different from BPA?"
    a: "A workflow is one trigger-action chain. BPA is a whole business process, usually three to ten workflows wired together with handoffs, error handling, and an audit trail. Workflow is the brick, BPA is the wall."
  - q: "What tools build workflows in an Australian SMB stack?"
    a: "Zapier, Make and n8n are the three most common spines. They connect Xero, HubSpot, ServiceM8, Gmail and Slack out of the box. n8n is self-hostable, which matters when invoice data or client PII can't sit on a US-only platform."
  - q: "Can one workflow include an AI step?"
    a: "Yes, and it's the most common upgrade path. A workflow stays a workflow when an AI node is dropped in to read a PDF, draft a reply, or classify an inbound message. It only graduates to AI automation once the model is doing more than one decision in the chain."
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-24
complianceNote: null
ai-assisted: true
source: claude-code
---

# Workflow Automation

**Workflow automation is software that runs a trigger-action chain across tools, the smallest unit of automation, one event fires a defined sequence with no person in the middle.**

Think of three concentric circles. Workflow automation is the inner one, a single trigger-action chain. [Business Process Automation](/glossary/what-is-business-process-automation) is the middle circle, several workflows stitched into one end-to-end business process. [Marketing Automation](/glossary/what-is-marketing-automation) is the outer ring scoped to a single function, marketing, usually built on top of both. Most teams confuse the three because vendors sell each one as the whole pie.

A workflow has three parts: a trigger (something happens), conditions (optional filters or branches), and actions (one or more steps that run as a result). [Zapier's workflow automation explainer](https://zapier.com/blog/workflow-automation/) and [Microsoft Power Automate's docs](https://learn.microsoft.com/en-us/power-automate/getting-started) both anchor on the same shape, the language differs, the structure doesn't. n8n calls them workflows, Make calls them scenarios, Zapier calls them Zaps, Power Automate calls them flows. Same brick.

Here is what a workflow looks like in practice. A sales rep sends a quote in HubSpot. That fires a workflow: a Slack message pings the deal owner with the amount, and a follow-up email is scheduled for three business days later if the quote hasn't been opened. One trigger, two actions, one condition, no human in the middle. That is a workflow.

Three of those, the quote-sent workflow, a quote-accepted workflow that creates the Xero invoice and a project folder in Google Drive, and a quote-declined workflow that logs the reason and schedules a 90-day check-in, wired into the same post-quote process with shared error handling, is BPA. The bricks haven't changed, the wall has.

[McKinsey's State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) makes the same point: the firms getting real value from AI tend to be the ones with workflow plumbing already in place. The AI is dropped into a workflow that already runs cleanly. If you're starting from zero, start with one high-payoff workflow, not a hyperautomation platform. Lead-to-CRM, quote-to-invoice, or job-complete-to-review-request are the three UC builds most often through [Custom Integrations](/custom-integrations).
