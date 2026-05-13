---
slug: what-is-business-process-automation
term: Business Process Automation (BPA)
shortDefinition: Using software to run a defined business process end-to-end, invoicing, onboarding, ticket triage, without a person performing each step manually.
category: discipline
relatedServices: [/custom-integrations]
relatedTerms: [what-is-ai-automation, what-is-marketing-automation, what-is-an-ai-agent]
sources:
  - { title: "Business process automation: definition and examples (Zapier)", url: "https://zapier.com/blog/business-process-automation/" }
  - { title: "The state of AI in 2025 (McKinsey)", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" }
faqs:
  - q: "What's the difference between BPA and AI automation?"
    a: "BPA is the older, broader category, software that runs whole business processes, usually with deterministic rules and clear handoffs. AI automation is BPA with an AI model in the loop for the steps that need to read messy input or draft a reply. Most live SMB stacks today are mostly BPA with one or two AI steps slotted in where they earn their keep."
  - q: "Do BPA tools require coding?"
    a: "Not for the common SMB cases. Make, Zapier and n8n let you assemble multi-step processes through a visual editor and prebuilt connectors to tools like Xero, HubSpot and ServiceM8. Complex cases, custom APIs, conditional branching, error handling, audit logging, are where most businesses bring in an automation specialist. The line is the same as in marketing: DIY for simple, hire for the spine."
  - q: "What's the most common first BPA project in an Australian SME?"
    a: "Lead capture to first reply. A web form submits, the lead lands in the CRM, the right team member is notified, the lead gets an immediate acknowledgement email, and a follow-up fires if the lead doesn't reply within a day. It's the highest-leverage first process because the loss of a slow reply is measurable and the build is small. Most teams cover the build cost inside two months from won work."
author: Luke Marinovic
datePublished: 2026-05-13
dateModified: 2026-05-13
complianceNote: null
ai-assisted: true
source: claude-code
---

# Business Process Automation (BPA)

**Business Process Automation is using software to run a defined business process end-to-end, invoicing, onboarding, ticket triage, without a person performing each step manually.**

BPA is the older, broader discipline that [AI Automation](/glossary/what-is-ai-automation) now sits inside. The shape is a process, not a single task: a sequence of steps that crosses tools, has handoffs, and produces a measurable output. [Zapier's BPA explainer](https://zapier.com/blog/business-process-automation/) defines it as the practice of using software to automatically execute repetitive tasks related to a company's essential procedures, and lists the usual surfaces, sales, marketing, HR, scheduling, customer support, where the same five steps run dozens of times a week.

Three things separate BPA from a single Zap or a single AI agent. First, it covers a whole process, not a trigger-action pair. A new-client onboarding might fire eight automations across HubSpot, Xero, Slack and Google Drive before it ends. Second, it includes error handling and audit trails by design, so when one step fails the process pauses and notifies, it doesn't silently drop work. Third, it usually mixes deterministic rules with a model only where the model earns its keep, the receipt PDF gets parsed by an AI layer, the invoice numbering stays in code.

Here is what good looks like for an Australian SME. A plumbing business uses ServiceM8 for jobs, Xero for invoicing, and Make as the spine. A completed job in ServiceM8 fires a Make scenario: generate the invoice in Xero, send it to the customer, schedule a review request 72 hours later, and add a warranty follow-up task at 6 months. Five tools, one process, no one types anything. McKinsey's [State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) makes a quiet but useful point: the organisations getting real value from AI tend to be the ones with this kind of process layer already in place. The AI is added to a workflow that already works, not asked to be the workflow. The pillar piece on [BPA for Australian SMBs](/blog/what-is-business-process-automation-australia) walks through where to start, and the build side is our [Custom Integrations](/custom-integrations) service.
