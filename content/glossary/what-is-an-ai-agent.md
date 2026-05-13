---
slug: what-is-an-ai-agent
term: AI Agent
shortDefinition: An AI system that decides its own next step, picks the right tool, and runs a multi-step task on a person's behalf, like booking a meeting or chasing an invoice, without being scripted step-by-step.
category: tool
relatedServices: [/ai-strategy-training]
relatedTerms: [what-is-ai-automation, what-is-business-process-automation, what-is-chatgpt-search]
sources:
  - { title: "Building Effective Agents (Anthropic)", url: "https://www.anthropic.com/engineering/building-effective-agents" }
  - { title: "The state of AI in 2025 (McKinsey)", url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" }
  - { title: "AI now fastest-growing area of business R&D (Australian Bureau of Statistics)", url: "https://www.abs.gov.au/media-centre/media-releases/ai-now-fastest-growing-area-business-rd" }
faqs:
  - q: "What's the difference between an AI agent and AI automation?"
    a: "AI automation usually means a workflow with pre-defined steps and an AI model in the loop for the messy bits. An AI agent is given a goal and a set of tools and decides its own steps. The agent shape is more flexible and more expensive to run, the workflow shape is cheaper and more predictable. Most live SMB stacks today are workflows, with agents reserved for jobs whose path isn't known up front."
  - q: "Are AI agents safe to run on customer-facing email?"
    a: "Only with a human in the loop on anything irreversible. The standard pattern is to let the agent draft and stage the reply, then notify the owner to approve or edit before send. As models improve, more replies are sent without review, but for any small business the right starting position is human approval for first-touch and direct send only for clearly low-risk follow-ups."
  - q: "How is an AI agent different from ChatGPT?"
    a: "ChatGPT, in its default form, is a single conversation: you ask, it answers. An agent runs a loop, it can call tools, browse, write files, send messages, and decide what to do next based on the result. ChatGPT itself is increasingly agentic, ChatGPT Search and Operator are examples, but a business agent is typically a custom build wired into your CRM, calendar and inbox."
author: Luke Marinovic
datePublished: 2026-05-13
dateModified: 2026-05-13
complianceNote: null
ai-assisted: true
source: claude-code
---

# AI Agent

**An AI agent is an AI system that decides its own next step, picks the right tool, and runs a multi-step task on a person's behalf, like booking a meeting or chasing an invoice, without being scripted step-by-step.**

The cleanest way to read it is the goal-versus-steps line. In a workflow you write the steps; in an agent you give it a goal and a toolbelt and it picks the steps itself. Anthropic draws that line in [Building Effective Agents](https://www.anthropic.com/engineering/building-effective-agents): a "workflow" is a system where an LLM and tools are orchestrated through pre-defined code paths, an "agent" is a system where the LLM "dynamically directs its own processes and tool usage, maintaining control over how they accomplish tasks". Same underlying model, different control surface. An agent sits one rung above [AI Automation](/glossary/what-is-ai-automation), which sits above [Business Process Automation](/glossary/what-is-business-process-automation), but the rung that matters is the one where the software stops being told what to do next.

That tradeoff is the point. Agents handle work whose path isn't known in advance, the lead came in via SMS asking something the runbook doesn't cover, and they handle exceptions a script would drop. They also cost more, run slower, and fail in less predictable ways than a fixed workflow, which is why Anthropic's recommendation is "finding the simplest solution possible, and only increasing complexity when needed". Australian investment is following the same curve: the [Australian Bureau of Statistics](https://www.abs.gov.au/media-centre/media-releases/ai-now-fastest-growing-area-business-rd) reports business R&D spend on AI hit $668.3 million in 2023-24, a 142% increase since 2021-22, the fastest-growing R&D category in the country. McKinsey's [State of AI 2025](https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai) calls agents the next adoption wave, but notes enterprise tangible-EBIT impact is still rare, the technology is ahead of the playbooks.

A concrete one. A buyers agency runs an inbox agent built with Claude plus a calendar, CRM and Gmail tool. A prospect emails "can we chat next week", the agent reads the prior thread, checks the principal's calendar, proposes two slots, and replies, no human in the middle until the prospect picks one. The same shape is now landing inside consumer products too, [ChatGPT Search](/glossary/what-is-chatgpt-search) is an LLM browsing the web for the user without being told which sites to visit. Scoping which jobs are actually agent-shaped is the work we run inside [AI Strategy & Training](/ai-strategy-training); the longer Australian-pricing explainer lives at [what is an AI agent for business](/blog/what-is-an-ai-agent-for-business-australia).
