---
slug: what-is-rpa
term: Robotic Process Automation (RPA)
shortDefinition: Software bots that perform rules-based tasks by clicking through user interfaces the way a person would, used to automate legacy systems with no API access.
category: tool
relatedServices: [/custom-integrations]
relatedTerms: [what-is-business-process-automation, what-is-ai-automation, what-is-an-ai-agent]
sources:
  - { title: "What is robotic process automation (RPA)? (IBM)", url: "https://www.ibm.com/think/topics/rpa" }
  - { title: "UiPath: what is RPA? (UiPath)", url: "https://www.uipath.com/rpa/robotic-process-automation" }
  - { title: "The state of AI in 2025 (McKinsey)", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" }
faqs:
  - q: "Is Zapier or n8n considered RPA?"
    a: "No. Zapier, Make and n8n are iPaaS, integration-platform-as-a-service. They talk to other tools through APIs, the official back door. RPA bots use the front door, clicking buttons and reading screens. Different layer entirely. If a modern API exists, iPaaS is faster, cheaper and more reliable, RPA only earns its keep where no API is available."
  - q: "Is RPA dead now that AI agents exist?"
    a: "No, the use case shrunk. RPA still wins where a legacy system has no API and the screens never change. AI agents take over the moment the input gets messy or the screen layout shifts, because rules-based bots break the second a button moves. The realistic 2026 stack is RPA for the immovable legacy parts, AI agents for everything else."
  - q: "Do Australian SMBs use RPA?"
    a: "Rarely. RPA's pricing model and complexity were built for banks, insurers and government, all of whom still run mainframes and green-screen apps. Most Australian SMBs run on Xero, HubSpot and ServiceM8, which all have modern APIs, so iPaaS tools like n8n cover the same need at a fraction of the cost."
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-24
complianceNote: null
ai-assisted: true
source: claude-code
---

# Robotic Process Automation (RPA)

**Robotic Process Automation is software bots that perform rules-based tasks by clicking through user interfaces the way a person would, used to automate legacy systems with no API access.**

Three layers sit on top of each other in the automation stack, and RPA is the oldest. At the bottom, RPA bots from UiPath, Blue Prism and Automation Anywhere, the big three, drive applications through the user interface. They click buttons, copy fields, tab between windows, exactly like a person, just faster and without lunch breaks. [IBM's RPA explainer](https://www.ibm.com/think/topics/rpa) and [UiPath's own definition](https://www.uipath.com/rpa/robotic-process-automation) both anchor on this UI-layer behaviour, that is what makes RPA RPA.

The middle layer is iPaaS, integration-platform-as-a-service. n8n, Make and Zapier sit here. They talk to applications through APIs, the official structured interface, not the user interface. This is faster, cheaper and far more reliable, the API doesn't move buttons around in a Tuesday update. iPaaS is what 95% of [business process automation](/glossary/what-is-business-process-automation) work in an Australian SMB actually uses. It is not RPA, calling it RPA is the most common confusion in the market and worth being precise about.

The top layer is [AI agents](/glossary/what-is-an-ai-agent) and broader [AI automation](/glossary/what-is-ai-automation). These add judgment on top of either of the layers below, deciding what to do with a messy email, reading an unstructured invoice, drafting a contextual reply.

So where does RPA still win? Three places. A 1995 ERP system with no API and a green-screen terminal interface that the company can't replace, RPA. A government portal with a manual web form that has to be filled in 200 times a day, RPA. A legacy banking core that exposes nothing but a 3270 emulator, RPA. Outside those cases, in 2026, an iPaaS tool with an API connector is the better answer.

[McKinsey's State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) reports that enterprises increasingly pair RPA bots with AI agents, the bot handles the deterministic clicks, the agent handles the decision. The honest read is that pure RPA shops are being squeezed from both sides, iPaaS is eating the simple cases, AI agents are eating the hard ones, and RPA is left with the legacy middle. UnderCurrent Automations works almost entirely in the API layer, through [Custom Integrations](/custom-integrations), because that is where modern Australian SMB stacks live.
