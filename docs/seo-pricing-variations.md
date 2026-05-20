---
ai-assisted: true
source: claude-code
updated: 2026-05-19
---

# SEO Page — Pricing Section (working guide)

Companion notes for `seo-pricing-variations.html`. Read this first when reopening this folder.

## What we're doing

Designing the **pricing section for the SEO / AI-visibility service page**
(`app/seo-ai-visibility/page.js`). `seo-pricing-variations.html` is a
standalone mockup file holding 3 layout variations so we can compare before
wiring the chosen one into the live page.

Not wired into the site yet. This is still design iteration.

## Status — V2 is the active design

| Var | Name | Verdict |
|-----|------|---------|
| V1 | Staggered Pyramid + hard offset shadow | alternate, kept for reference |
| **V2** | **Staggered Arc + featured border + glyph bullets** | **active — this is the one we're developing** |
| V3 | Overlapping Deck / fan layout | alternate, kept for reference |

Benchmark reference: the Hook agency pricing page — giant prices, bold tier
names, featured card peaking with a coloured border, side cards fanned into
an arc, edges only kissing (no content hidden).

## V2 — current design spec

Rebuilt 2026-05-19 to match the Hook reference. State of play:

- **4 tiers:** Starter, Growth, Authority (featured), Enterprise.
- **Staggered arc** — cards fan vertically: Starter `margin-top:130px`,
  Growth `64px`, Authority `0` (peak), Enterprise `96px`.
- **Edges kiss only** — 16px overlap, neighbours tuck behind featured.
  This replaced an earlier 40px overlap that buried card content (the
  "horrible" version).
- **Featured card** — 2px solid blue border `#3D7FD6`, `--charcoal2` bg,
  circular badge top-right with the UC glyph in blue, sits at the arc peak.
- **Shadows** — soft dark depth shadows for layering. The blue hard-offset
  shadow slab was removed (read as a glitch).
- **Prices** — `clamp(44px,4.5vw,60px)` normal, `clamp(52px,5.5vw,70px)`
  featured. All prices white (pop comes from border + badge + position).
- **No CTAs** on the cards — removed per Luke.
- **Bullets** — each feature row uses the UC 3-wave glyph (white) instead
  of a checkmark. Glyph source: `public/brand/glyph-mono.svg`.

## Open decisions / next steps

1. **Real pricing numbers** — $1,000 / $2,500 / $4,500 are ILLUSTRATIVE
   placeholders, NOT confirmed. Do not publish without Luke's real AUD
   bands. (Pricing floor is $1,000/mo — see vault memory.)
2. **Handwritten annotation** — Hook ref has "Most People Choose" with a
   scrawled arrow above the featured card. Not yet added to V2. Decide
   whether to add a "Most clients choose this" Caveat annotation.
3. **Glyph legibility** — confirm the 3-wave glyph reads cleanly at ~17px
   bullet size; swap to a single wave or bump size if it looks muddy.
4. **Wire it in** — once V2 is approved, build the section into
   `app/seo-ai-visibility/page.js` on the `worktree-copy-home-meta` branch.

## Design rules (UC)

- Cards 14–18px radius. Blue `#6A8DAD` default accent, brighter `#3D7FD6`
  used for the featured pricing border/badge.
- Space Grotesk for display, Satoshi for body.
- No gradient text, no glassmorphism, no animated shimmer.
- Hard offset shadows are the UC norm — but on this layered/overlapping
  deck a hard offset accent slab broke the look, so V2 uses soft neutral
  depth shadows instead. Intentional deviation.
