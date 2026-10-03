---
ai-assisted: true
source: claude-code
date: 2026-10-03
---

# The " , " sweep

An earlier em-dash swap replaced each em dash with " , " (a space before the comma) across the articles. This PR puts the right punctuation back. Branch `content/comma-sweep`, off `origin/main` at `1c4aec2`. **The PR is open and not merged.**

## What changed

`scripts/fix-space-comma.mjs` applies five rules. Any " , " that fits none of them stops the script.

| Shape | Before | After |
|---|---|---|
| Bold term | `**Answer-first writing** , lead every page` | `**Answer-first writing:** lead every page` |
| Related Reading | `[SEO for dog groomers](/blog/...) , the deep guide` | `[SEO for dog groomers](/blog/...), the deep guide` |
| Source title | `[Safari Digital , Local SEO statistics](...)` | `[Safari Digital: Local SEO statistics](...)` |
| Table cell | `High , most-cited pages lead with direct answers` | `High: most-cited pages lead with direct answers` |
| Body sentence | 32 one-off fixes in `FIXES` | a colon, semicolon, comma or parentheses, whichever the sentence needs |

The sentence fixes include:

- "a separate dial (whether the live model decides any given prompt needs a fresh search), and"
- "not before: paid search puts you"
- the SVG heading "SEO for Dog Groomers: The 4 Levers"
- the one H2 with the scar, "GEO, AEO, LLMO: What's the Difference?". Nothing links to its anchor.

**Scope:**

- 23 articles are swept in this PR.
- 2 more are swept inside the format-pass PR that already edits them:
  - what-is-ai-search-optimisation-australia, in PR 44. Its H2 is fixed here, because the format pass keeps headings unchanged.
  - how-to-choose-a-google-ads-agency-australia, in PR 52.
- No rewrite-lane article had the scar.

## Left as they are

- **Frontmatter**, because titles, meta and FAQ schema must match production. That covers the summarise-with-AI meta description's em dash, and three FAQ answers in what-is-ai-search-optimisation-australia.
- **The body copies of those three FAQ answers**, so the visible FAQ still matches its schema. Fixing them means changing the frontmatter FAQ too. That's a small, separate call for Luke.

## Checks

- **Words:** on all 25 articles, the sequence of word tokens is identical to main. Only punctuation moved.
- **Frontmatter:** identical to main on all 25, apart from the new `dateModified`.
- **`node scripts/fix-space-comma.mjs --check`:** passes. No fixable " , " is left.
- **Updated dates** come from the slug hash, as in the batches. Where an article is also in a batch PR, both PRs insert the identical line.
- **Conflicts:** all six format-pass branches and this one were trial-merged onto main, in two different orders. Every merge was clean.
- **`next build`** of that fully merged tree passes.
- **Browser, local `next start` of the merged tree, Chromium, 390 and 1440:**
  - All 25 swept articles return 200, with no sideways scroll.
  - Every block renders, and the mid-body photo sits where production has it.
  - Title, meta, canonical, H1, Quick Answer and all JSON-LD except `dateModified` are identical to production.

## Rollback

Roll back with `git revert <squash commit>` through a PR.
