---
# ─────────────────────────────────────────────────────────────────────────────
# GLOSSARY ENTRY TEMPLATE — copy this file, rename to <slug>.md, fill it in.
# The `_` prefix keeps this file OUT of the build (lib/glossary.js skips `_*.md`).
# Contract enforced at build time by lib/glossary.js:
#   • front-matter `slug` MUST equal the filename (minus .md)
#   • `category` MUST be one of: discipline | workflow | tool | metric | regulator | buyer-language
#   • `term` and `shortDefinition` are required
# Page rules (not build-enforced, hold them anyway):
#   • shortDefinition ≤ 30 words — it becomes the <meta description>, the DefinedTerm.description,
#     and the sentence an AI engine extracts as the answer. One sentence, triple duty.
#   • body 250–400 words · 5–8 named entities · 2–3 external citations as inline links
#   • 2–3 internal links woven INTO the prose, mixed targets: one relatedService + 1–2 relatedTerms
#     (+ a blog article ONLY if it is confirmed live). The page auto-renders a "Related" nav block
#     from `relatedServices` + `relatedTerms` — do NOT add a `## Related` section to the body.
#   • the page auto-renders a "Sources" list from the `sources` array — inline-cite the same URLs in
#     the prose too, but don't add a `## Sources` section to the body.
#   • NEVER link a target that doesn't exist or doesn't ship in the same batch
#   • body opens with `# {term}` — the page renders front-matter `term` as the H1 and strips this one
# ─────────────────────────────────────────────────────────────────────────────
slug: example-term-slug
term: Example Term (ABBR)
shortDefinition: A ≤30-word plain-English definition that doubles as the meta description and the line an AI answer engine lifts.
category: discipline
relatedServices: [/seo-ai-visibility]
relatedTerms: [some-related-slug, another-related-slug]
sources:
  - { title: Authoritative source title, url: https://example.com/source-1 }
  - { title: Second authoritative source, url: https://example.com/source-2 }
faqs:
  - { q: A question people actually type?, a: A direct answer, two or three sentences. }
  - { q: A second question?, a: A second direct answer. }
author: Luke Marinovic
datePublished: 2026-05-12
dateModified: 2026-05-12
complianceNote: null
ai-assisted: true
source: claude-code
---

# Example Term (ABBR)

**A ≤30-word plain-English definition that doubles as the meta description and the line an AI answer engine lifts. Bolded, first thing on the page.**

Body copy, 250–400 words. Lead with the UC angle — the framing the generic definition lacks. Weave in 5–8 named entities (tools, regulators, real products, people). Include one concrete, reproducible example, never hypothetical. Cite 2–3 authoritative external sources as inline links. Link [one related glossary term](/glossary/some-related-slug), [another](/glossary/another-related-slug), and the [UC service](/seo-ai-visibility) this ties to.

Pick a structural shape that fits the term type: a discipline gets a "how it differs from X" beat; a tool gets "where it fits / what it replaces"; a workflow gets "how it works in three steps"; a metric gets "what good looks like". Don't reuse the last entry's skeleton.

If `complianceNote` is set, the page renders it as a callout above the body — so the body doesn't need to repeat it. No `## Related` or `## Sources` section here: the page builds those from front-matter.
