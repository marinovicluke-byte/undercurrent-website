# Design Tokens — UnderCurrent Website

**Source of truth:** `~/UnderCurrent/Vault/brand-visual.md`
(palette, typography, six design principles, anti-patterns).

This file documents **website-specific deltas only** — what's in this codebase that isn't in the brand doc. If anything below conflicts with `brand-visual.md`, the brand doc wins.

## Where tokens live

- Tailwind v4 `@theme {}` block → `app/globals.css` (lines ~5-27). Adds the `--color-*` prefix Tailwind needs to generate utility classes (e.g. `--color-blue` → `bg-blue`, `text-blue`).
- Plain CSS custom properties → `app/globals.css` `:root` block. Used directly via `var(--blue)` in inline styles and component CSS.

## Website-only tokens (not in brand-visual.md)

| Token | Value | Purpose |
|---|---|---|
| `--bg-deep` | `#121210` | Page background, hero |
| `--bg-main` | `#262624` | Body sections |
| `--bg-card` | `#2E2E2B` | Card backgrounds |
| `--page-pad` | `30px` mobile / `88px` desktop | Horizontal page padding (set via `@media`) |
| `--tint-positive` | `rgba(143,175,159,0.12)` | Sage tint fills |
| `--tint-warning` | `rgba(224,122,85,0.12)` | Orange tint fills |
| `--tint-negative` | `rgba(212,86,74,0.12)` | Error tint fills |
| `--tint-neutral` | `rgba(250,249,245,0.06)` | Subtle dividers |

## Animation conventions

- FadeIn: `opacity 0→1`, `translateY(24px→0)`, 600ms ease. Classes `.fade-hidden` / `.fade-visible`.
- Card hover: `translate(-2px,-2px)`, shadow 6→8px, 160ms `cubic-bezier(.2,.7,.3,1)`.
- Marquee: `@keyframes marquee-scroll`, `translateX(0 → -33.333%)`.
- `prefers-reduced-motion`: all durations collapse to 0.01ms, `.fade-hidden` becomes visible immediately.
- Hard rule: no GSAP, no Framer Motion. CSS transitions + intersection observer only.

## Utility classes

- `.uc-pop-blue` / `.uc-pop-sage` / `.uc-pop-orange` — `box-shadow: 6px 6px 0 0 var(--accent)`. The brand "teeth."
- `.uc-pop-blue--sm` etc. — 4px variant for smaller cards.
- `.uc-pop-hover-*` — adds the lift + shadow expand on hover.
- `.label` — Space Grotesk 11px uppercase eyebrow.
- `.mono` — SF Mono with tabular numerals. **Numerals only**, never decorative on labels.
- `.uc-glow-word*` — neutralised to `inherit` after v2 (gradient text removed). Class names retained for backwards compatibility.

## Inline `clamp()` warning

Do not use `clamp()` inside a CSS custom property consumed via React inline shorthand — renders 0px. Use plain px in the variable + responsive `@media` on `:root` (see `--page-pad` for the pattern). Logged in `lab-notes.md`.
