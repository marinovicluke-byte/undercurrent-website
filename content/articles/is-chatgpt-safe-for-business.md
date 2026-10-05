---
title: "Is ChatGPT Safe? What Happens to Your Customer Data"
description: "Is ChatGPT safe for small business? What happens to customer data you paste in, OpenAI's three dated incidents, and a plain checklist."
date: "2026-10-08"
slug: "is-chatgpt-safe-for-business"
cluster: "ai-strategy-training"
keyword: "is chatgpt safe"
author: "Luke Marinovic"
level: "intermediate"
readingTime: 7
photo: "/images/luke-2026/luke-marinovic-undercurrent-steel-desk-laptop-wide-melbourne.jpg"
photoFocus: "62% 40%"
faqs:
  - q: 'Does ChatGPT keep what I type?'
    a: 'Yes, ChatGPT keeps what you type in your chat history until you delete it. OpenAI says deleted chats leave its systems within 30 days. The exceptions are chats that were stripped of your identity, or kept for security or legal reasons. Temporary Chat skips your history and model training. OpenAI may still hold a copy for up to 30 days for safety, so treat anything you type as stored for a month.'
  - q: 'Can my staff paste customer details into ChatGPT?'
    a: 'Your staff shouldn''t paste customer details into a personal ChatGPT account. Australia''s privacy watchdog, the OAIC, says businesses should keep personal details out of public AI chatbots. If a job really needs customer details, like replies to complaints, move it to a business workspace your admin runs. A tool built on the API also works. Then write the rule down, so every staff member knows what can and can''t go in.'
  - q: 'Is Claude safe to use with business data?'
    a: 'Claude follows the same basic pattern as ChatGPT for small business use. Personal accounts and business plans are handled differently, so the plan you pay for matters more than the brand. Read the maker''s own privacy page before staff use it with customer details. Check whether it trains on your chats by default. The safe habits are the same for both: one business account, no customer details in personal accounts, and a person checking answers.'
  - q: 'Is ChatGPT confidential enough for client work?'
    a: 'ChatGPT isn''t confidential the way a lawyer or accountant is, because OpenAI staff can read chats in some cases. OpenAI says approved staff may read content to check abuse, give support, handle legal matters or train models, unless you opt out. Business plans give you ownership of what goes in and out, with no training by default. For client work under a privacy deal, use a business workspace and leave names out.'
  - q: 'Does OpenAI sell my ChatGPT data to advertisers?'
    a: 'No, OpenAI says it doesn''t sell your data or share your ChatGPT chats with advertisers. It does share the least content needed with suppliers that help run its services, under strict security terms. The Mixpanel breach in November 2025 showed why that matters, because one of those suppliers was hacked. So for your business, the real question isn''t about advertisers. It''s about what your staff put in.'
---
# Is ChatGPT Safe? What Happens to Your Customer Data

> **Quick Answer:** **ChatGPT is safe enough for most small business work if customer details stay out of personal accounts.**
> - Personal accounts can train OpenAI's models, based on your settings
> - Business plans don't train on your data by default
> - OpenAI's recent incidents didn't leak chats
> - Your own setup is the bigger risk

Australia's privacy regulator says personal details shouldn't go into public AI chatbots. Without a rule in place, a customer's name, address and invoice number can end up in one anyway.

OpenAI's own pages answer most of it. They say where that text goes, and what its last three incidents did and didn't touch.

## Is ChatGPT Safe for a Small Business to Use?

**ChatGPT is safe for drafts, summaries and research, as long as customer details stay out of personal accounts. The risk is what your staff paste in, not the chat box itself.**

Australia's privacy watchdog is blunt about this. The [OAIC says businesses should not put personal details into public AI chatbots](https://www.oaic.gov.au/privacy/privacy-guidance-for-organisations-and-government-agencies/guidance-on-privacy-and-the-use-of-commercially-available-ai-products), because the privacy risks are hard to control. If your business is covered by the Privacy Act, its rules apply to AI use too. That covers a customer's name, phone number and job notes.

Here's what doing nothing costs, as a worked example. Say five staff each paste three customer emails a day into their own accounts.

**Customer records in personal accounts (an example)**

- Customer records pasted a week (five staff, three a day, five days), **75**
- Weeks a year, **52**
- = Customer records a year, **3,900**

You can't track those records, delete them, or explain them to a customer who asks.

## What Happens to Customer Data You Paste Into ChatGPT?

**On a personal account, OpenAI stores what you type and may use it to train its models, based on your settings. Chats you delete are removed within 30 days, with some exceptions.**

OpenAI's [page on how it handles your data](https://help.openai.com/en/articles/7039943-how-openai-uses-your-data) says chats are stored in the US and around the world. A small number of OpenAI staff and contractors can read them. That's only for set reasons, like abuse checks, support or training. Their own advice is plain: don't type anything sensitive you wouldn't want read or used.

**Temporary Chat** is a mode that keeps a chat out of your history and out of model training. OpenAI may still keep a copy for up to 30 days for safety. It's a good habit. It isn't a privacy rule for your business. It also doesn't change [whether ChatGPT searches the web](/blog/does-chatgpt-search-the-web) with what you type, which is a separate setting.

## Is ChatGPT Safe on a Free Plan or Only a Business Plan?

**The business plans are safer for customer data, because OpenAI doesn't train on them by default. You also own what goes in and what comes out.**

OpenAI's [business privacy page](https://openai.com/enterprise-privacy/) covers ChatGPT Business, Enterprise and the API. It lists a passed SOC 2 audit, which is an outside check of its security. Data is locked with AES-256 at rest and TLS 1.2 or higher in transit. An admin also picks which linked apps staff can use.

| What matters | Free or Plus (personal) | ChatGPT Business or Enterprise | API (built into your own tools) |
|---|---|---|---|
| Used to train models | Can be, based on settings | Not by default | Not by default |
| Who runs the account | Each staff member | Your admin | Your business |
| Who owns inputs and outputs | Personal account terms | You, where the law allows | You, where the law allows |
| Fit for customer details | No | Yes, with a written rule | Yes, with a written rule |

## Has OpenAI Had a Data Breach? The Incidents, Dated

**OpenAI has posted three security incidents since November 2025, and none leaked chat content. One was a supplier breach, one hit app signing, and one was a test that escaped.**

| Incident | When | What OpenAI says was exposed |
|---|---|---|
| [Mixpanel analytics supplier](https://openai.com/index/mixpanel-incident/) | Breach 9 Nov 2025, post 26 Nov 2025 | Names, emails and rough location of API users and some ChatGPT users. No chats, passwords or payment details. |
| [Axios developer tool](https://openai.com/index/axios-developer-tool-compromise/) | Attack 31 Mar 2026, post 10 Apr 2026 | No sign user data was accessed. Mac app users had to update by 8 May 2026. |
| [Hugging Face model test](https://openai.com/index/hugging-face-model-evaluation-security-incident/) | July 2026, disclosed 21 Jul 2026 | Test models broke out and reached another company's systems. No customer data hit. |

OpenAI's [full Hugging Face report](https://openai.com/index/hugging-face-incident-and-the-road-ahead/) came out on 26 August 2026. It says customer data wasn't affected. The Mixpanel case is the one to learn from. The weak point was a supplier, and that's where most small business leaks start too.

## Where Do Small Business Data Leaks Actually Come From?

**Most small business leaks come from the business's own setup, not the AI company. Old files and forgotten copies do more harm than any chatbot breach.**

In a recent audit we ran, a property advisory firm in Melbourne was about to launch a new website. We found 18 old backup pages live on the public site. Anyone who guessed the old page addresses could have opened them. The photos also held location data accurate to about 1 metre. Both were removed before launch.

Nobody at the firm had been careless on purpose. Those pages were left over from old builds, the same way customer details pile up in staff chat histories. In our own audits, the leak is rarely the AI company. UnderCurrent Automations helps Australian small businesses map where their data goes, then [fix the biggest leak first](/consulting).

## What Does Safe ChatGPT Use Look Like in a Small Business?

**Safe use means one business account, one written rule about customer data, and a person checking anything a customer will see. For most teams, that's the whole system.**

Before a rule, staff use their own accounts and nobody knows what went in. After a rule, everyone works in one business workspace with training off by default. Names, phone numbers, and health or money details stay out. The [National AI Centre found 65% of businesses not using AI](https://www.ai.gov.au/news-and-insights/blog/ai-adoption-insights-december-2025-february-2026) cite distrust or wanting human control. A written rule deals with most of that worry.

[business.gov.au says to test any AI tool](https://business.gov.au/online-and-digital/artificial-intelligence) for privacy and cyber security problems before you use it. When a job truly needs customer details, like quotes from job notes, build it as a [custom workflow](/automation) on the API. If you're weighing a second assistant, our [guide to using Claude in your business](/blog/how-to-use-claude-in-your-business-australian-smb-guide) uses the same rules.

## Is ChatGPT Safe for Your Team? A Plain Checklist

**ChatGPT is safe for your team once every item below is true. Most small businesses can tick them all in one afternoon.**

**The customer data checklist**

- [ ] Move staff onto one ChatGPT Business workspace, not personal accounts
- [ ] Write a one-line rule: no customer names, contacts, health or money details
- [ ] Turn on two-step login for every account, as OpenAI's Mixpanel post advises
- [ ] Use Temporary Chat for anything you'd rather not keep
- [ ] Have a person check every answer before a customer sees it
- [ ] Check dates on facts, since [ChatGPT's knowledge cutoff](/blog/chatgpt-knowledge-cutoff-australia) lags the news
- [ ] List every AI tool staff use, with the government's [AI adoption guidance](https://www.industry.gov.au/publications/guidance-for-ai-adoption) as a guide

If you'd like UnderCurrent Automations to map where customer data goes in your business today and set the rule with you, [book a consult](/contact). It's a short call, and you'll leave knowing your biggest leak.

## Frequently Asked Questions

**Does ChatGPT keep what I type?**

Yes, ChatGPT keeps what you type in your chat history until you delete it. OpenAI says deleted chats leave its systems within 30 days. The exceptions are chats that were stripped of your identity, or kept for security or legal reasons. Temporary Chat skips your history and model training. OpenAI may still hold a copy for up to 30 days for safety, so treat anything you type as stored for a month.

**Can my staff paste customer details into ChatGPT?**

Your staff shouldn't paste customer details into a personal ChatGPT account. Australia's privacy watchdog, the OAIC, says businesses should keep personal details out of public AI chatbots. If a job really needs customer details, like replies to complaints, move it to a business workspace your admin runs. A tool built on the API also works. Then write the rule down, so every staff member knows what can and can't go in.

**Is Claude safe to use with business data?**

Claude follows the same basic pattern as ChatGPT for small business use. Personal accounts and business plans are handled differently, so the plan you pay for matters more than the brand. Read the maker's own privacy page before staff use it with customer details. Check whether it trains on your chats by default. The safe habits are the same for both: one business account, no customer details in personal accounts, and a person checking answers.

**Is ChatGPT confidential enough for client work?**

ChatGPT isn't confidential the way a lawyer or accountant is, because OpenAI staff can read chats in some cases. OpenAI says approved staff may read content to check abuse, give support, handle legal matters or train models, unless you opt out. Business plans give you ownership of what goes in and out, with no training by default. For client work under a privacy deal, use a business workspace and leave names out.

**Does OpenAI sell my ChatGPT data to advertisers?**

No, OpenAI says it doesn't sell your data or share your ChatGPT chats with advertisers. It does share the least content needed with suppliers that help run its services, under strict security terms. The Mixpanel breach in November 2025 showed why that matters, because one of those suppliers was hacked. So for your business, the real question isn't about advertisers. It's about what your staff put in.

## Related Reading

- [What is ChatGPT search](/glossary/what-is-chatgpt-search), a plain definition of how ChatGPT finds and cites web pages.
- [How to rank in ChatGPT search](/blog/how-to-rank-in-chatgpt-search), getting your business named when customers ask an assistant.
- [How to do ChatGPT SEO](/blog/how-to-do-chatgpt-seo), the steps that help AI assistants cite your site.
- [Client onboarding automation for accountants](/blog/client-onboarding-accountants-automation-australia), a worked example of handling client data in a custom workflow.
