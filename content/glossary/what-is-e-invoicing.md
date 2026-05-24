---
slug: what-is-e-invoicing
term: eInvoicing (Peppol)
shortDefinition: Direct system-to-system exchange of invoices in a structured digital format over the Peppol network, no PDF, no email, no manual entry on the buyer's side.
category: workflow
relatedServices: [/custom-integrations]
relatedTerms: [what-is-business-process-automation, what-is-marketing-automation]
sources:
  - { title: "eInvoicing overview (Australian Taxation Office)", url: "https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/einvoicing" }
  - { title: "About Peppol (OpenPeppol)", url: "https://peppol.org/about/" }
  - { title: "Spend two hours, save 10 days this eInvoicing Week (MYOB / McCrindle research)", url: "https://www.myob.com/au/press-releases/spend-two-hours-save-10-days-this-einvoicing-week" }
faqs:
  - q: "Is emailing a PDF invoice considered eInvoicing?"
    a: "No. A PDF is a digital image of an invoice, not structured data. The buyer still has to read it and key the line items into their accounting system. eInvoicing means the invoice arrives as machine-readable data over Peppol, the buyer's software reads it directly, no human in the middle."
  - q: "Is eInvoicing mandatory for Australian small businesses?"
    a: "Not for sending. It is mandatory for Commonwealth government agencies to be able to receive Peppol eInvoices, which has been the policy since July 2022. For businesses, it is opt-in, but the more suppliers and buyers connect, the cheaper and faster the whole chain runs."
  - q: "Which Australian accounting software supports Peppol eInvoicing?"
    a: "Xero, MYOB and Reckon all support sending and receiving Peppol eInvoices natively. The setup is usually a one-time toggle in the accounting software and registration of your ABN against the Peppol directory."
author: Luke Marinovic
datePublished: 2026-05-24
dateModified: 2026-05-24
complianceNote: "Peppol is the open international standard the Australian Government has adopted for eInvoicing. Commonwealth agencies have been required to receive Peppol eInvoices since 1 July 2022 (ATO). State and Territory adoption varies."
ai-assisted: true
source: claude-code
---

# eInvoicing (Peppol)

**eInvoicing is the direct system-to-system exchange of invoices in a structured digital format over the Peppol network, no PDF, no email, no manual entry on the buyer's side.**

The mistake almost every small business makes is calling a PDF invoice an eInvoice. It is not. A PDF is a picture of an invoice. The buyer still opens it, reads it, and keys the line items into Xero or MYOB by hand, the same as a paper invoice arriving in the post. eInvoicing means the invoice never becomes a document the buyer has to look at, it arrives as structured data, the buyer's accounting software ingests it directly, and a draft bill appears ready to approve.

Three things make this work. First, a shared digital format, UBL 2.1 XML in the Australian context, so any system can read any other system's invoices without bespoke mapping. Second, the Peppol network itself, a four-corner exchange model run globally by [OpenPeppol](https://peppol.org/about/) and adopted by the Australian Government through the ATO. Third, accredited access points, the postal service in the analogy, that move the message between sender and receiver. The [ATO's eInvoicing overview](https://www.ato.gov.au/businesses-and-organisations/preparing-lodging-and-paying/einvoicing) lists the registered Australian access points, including ones built into Xero and MYOB.

Here is the three-step flow in practice. A Melbourne plumber finishes a job and marks the invoice as complete in Xero. Xero converts it to UBL XML and pushes it over Peppol to the buyer's access point. The buyer's accounting software, also Xero in this case, receives the structured invoice, matches the ABN, and creates a draft bill ready to approve. No PDF was generated, no email was sent, no one typed anything on the buyer's side. End to end, seconds.

The cost of not doing this is measurable. [MYOB and McCrindle research](https://www.myob.com/au/press-releases/spend-two-hours-save-10-days-this-einvoicing-week) found 83% of Australian SMEs spend up to 20 hours a month on invoicing alone. The pillar [eInvoicing for Australian Small Business guide](/blog/einvoicing-small-business-australia-guide) walks through the setup. Wiring eInvoicing into broader [business process automation](/glossary/what-is-business-process-automation), connecting it to job management, CRM follow-ups and reporting, is the [Custom Integrations](/custom-integrations) build.
