# Constraints — What to Avoid

## Copy
- No exclamation marks
- No em dashes (use commas instead, per Luke's style)
- No AI-isms: "leverage", "synergy", "cutting-edge", "revolutionise", "empower", "utilize", "best-in-class", "game-changer", "seamless", "robust"
- No vague claims without specific metrics
- No feature-first headlines, always pain-point or outcome-first
- No "we" as the subject of the first sentence in any section

## Design (v2 — current)
- No gradient text on headings (no `-webkit-background-clip: text` + linear-gradient combo)
- No animated shimmer or pulse on decorative elements
- No glassmorphism (`backdrop-filter: blur()` on cards, panels, buttons)
- No soft accent blur shadows (`box-shadow: 0 Npx Npx -Xpx rgba(accent, 0.X)`)
- Max one radial gradient glow per page, reserved for the closing CTA
- SF Mono confined to stat numerals and section-number eyebrows only, never as a decorative voice on tag labels
- No gradients on buttons or cards (solid colors only)
- No heavy animation libraries (GSAP, Framer Motion), use CSS transitions + intersection observer
- No stock photography
- No more than 2 font weights per typeface on a single page
- Blue (#6A8DAD) is the default accent, Sage (#8FAF9F) for positive/after states, Orange (#E07A55) for warnings/before/single-spot emphasis only

## Design — primitives to use
- Rounded 14px on cards (`borderRadius: 14`), 999 on pills
- Hard offset accent shadow on cards: `box-shadow: 6px 6px 0 0 var(--blue)` (or sage/orange per section tone)
- Pop-hover on CTAs: `translate(-3px, -3px)` + `7px 7px 0 0 var(--accent)` on hover
- Solid accent color via `.uc-glow-word`, `.uc-glow-word--sage`, `.uc-glow-word--blue`, `.uc-glow-word--orange`
- One static radial glow per page, only in `ClosingCTA`

## Code
- No `src/` directory modifications (legacy Vite, read-only reference)
- No `tailwind.config.js` edits (old Vite config)
- No Pages Router patterns, App Router only
- No `'use client'` unless the component genuinely needs browser APIs
- No hardcoded webhook URLs, use env vars
- No new dependencies without checking existing ones first
