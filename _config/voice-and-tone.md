# Voice & Tone — UnderCurrent Website

## Voice
Direct, calm, confident. Speaks like a smart operator, not a salesperson. No hype, no jargon. Dry wit when appropriate.

## Tone Words
Calm, precise, confident, grounded, dry wit.

## Sentence Style
- Short sentences. No padding words.
- Numbers before list items: 01, 02, 03
- Metrics are specific: "40% more 5-star reviews", "8 hrs saved / week"
- Section label + headline pattern: `WHAT WE BUILD / The work that's eating your day, handled.`

## Headlines
- Pain-point first: ask the question the visitor is already thinking
- "Leads come in but nobody follows up fast enough?" not "Automated Lead Follow-Up"
- Outcome over feature, always

## CTA Copy
- Primary: "Book a Workflow Review" (action-specific, not "Get Started")
- Secondary: "See What You're Missing" (links to audit tool)
- Never: "Learn More", "Contact Us", "Get In Touch"

## Words to Use
Automation, workflow, system, pipeline, follow-up, handoff, streamline, reclaim, handle

## Words to Never Use
Leverage, synergy, cutting-edge, revolutionise, empower, utilize, best-in-class, game-changer, seamless, robust

## Design Language (actual, shipped)
- Blue (#6A8DAD) for informational/tech signal, Sage (#8FAF9F) for positive signal, primary accents
- Orange (#E07A55) for warnings, single "start here" highlights or CTA accents only, never primary
- Neutrals: deep #121210, charcoal #1C1C1A, off-white rgba(250,249,245,0.88), muted rgba(250,249,245,0.38), faint rgba(250,249,245,0.09)
- Radius 12-16px on cards, 999 on pills (zero-radius is wrong)
- Accent-tinted pop-out shadows on hover, e.g. 5px 5px 0 rgba(var(--accent),0.2)
- Space Grotesk for display (weight 500 max), Satoshi for body, max 2 weights per typeface per page
- Layout: maxWidth 1280, left-aligned, horizontal padding via var(--page-pad)
- Section pattern: black hero (#121210) → charcoal body (#1C1C1A), matches homepage

**Ground truth: `app/page.js` and its sections. This doc is supplementary, verify against the live code if uncertain.**
