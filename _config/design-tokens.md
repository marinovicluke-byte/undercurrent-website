# Design Tokens — UnderCurrent Website (Redesign)

> Extracted from app/globals.css @theme and app/layout.js. This is the source of truth for the redesign branch design system.
> For brand voice, colours, and typography used across all UC properties, see: Content/UC-Articles/_config/brand_guide.md

## Colours (Tailwind v4 @theme)

| Token | Hex | Usage |
|-------|-----|-------|
| --color-white | #FAFAF8 | Page background |
| --color-charcoal | #1C1C1A | Primary text, dark sections |
| --color-blue | #6A8DAD | Primary accent, links, CTAs |
| --color-blue-dark | #4A6D8D | Hover states, active elements |
| --color-muted | #6B7280 | Secondary text, captions |
| --color-border | #E5E7EB | Dividers, card borders |
| --color-surface | #F3F4F6 | Card backgrounds, alternate sections |

Note: The redesign palette differs from the live site (which uses sage #8FAF9F, parchment #E8E0D0, olive #6B7C4A). The redesign uses a cleaner blue-charcoal-white system.

## Typography

| Role | Font | Variable | Source |
|------|------|----------|--------|
| Display (h1, h2) | Space Grotesk | --font-space-grotesk | Google Fonts (400-700) |
| Body | Satoshi | --font-satoshi | Local woff2 (variable weight + italic) |

CSS aliases:
- `--font-display: var(--font-space-grotesk)`
- `--font-body: var(--font-satoshi)`

Note: The live site uses Cormorant Garamond + DM Sans. The redesign moved to Space Grotesk + Satoshi.

## Spacing

| Token | Value | Usage |
|-------|-------|-------|
| --spacing-section | 6rem | Vertical padding between major sections |
| --spacing-section-sm | 4rem | Vertical padding on mobile |

## Animation

- FadeIn: translateY(24px) → 0, opacity 0 → 1, 0.6s ease
- Classes: `.fade-hidden` (initial), `.fade-visible` (intersected)
- Scroll animation: `@keyframes scroll` for IndustryScroller marquee
- Respects `prefers-reduced-motion: reduce`

## Conventions
- No border-radius on the live site (neo-brutalist), but the redesign uses standard rounding
- Blue accent replaces sage green from the live site
- Light-mode only (no dark mode)
- All fonts loaded with `display: swap` for performance

<!-- Last updated: 2026-04-10 -->
