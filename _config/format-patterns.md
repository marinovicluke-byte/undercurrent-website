# Format Patterns — Content Structure

## Homepage Sections
```
[Section Label]     ← uppercase, small, muted, tracking-wide
[Headline]          ← pain-point question or outcome statement
[Supporting copy]   ← 1-2 sentences max, specific metrics where possible
[Content/Cards]     ← visual proof or interactive element
[CTA]               ← action-specific button, not generic
```

## Service Cards
```
[Pain-point headline as question]
[2-line description of what the automation does]
[Specific metric: "saves X hrs/week" or "X% faster"]
```

## Blog Articles
```
---
title: [Specific, keyword-rich]
description: [1 sentence, <160 chars]
date: YYYY-MM-DD
author: UnderCurrent
tags: [relevant, lowercase]
---

[Content: short paragraphs, subheadings every 2-3 paragraphs, specific examples]
```

## Page Metadata
```js
export const metadata = {
  title: 'Page Title | UnderCurrent',
  description: 'One sentence, under 160 chars, includes primary keyword.',
  openGraph: {
    title: 'Same as title or shorter',
    description: 'Same as description',
  },
}
```

## Button Patterns
- Primary action: `btn-pop` class, orange or sage shadow
- Secondary action: `btn-pop-outline` class, charcoal shadow
- Ghost/text link: no shadow, underline on hover
