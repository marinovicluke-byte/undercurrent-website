# What the live site is made of

Studied 2026-10-02 from undercurrentautomations.com (home, /automation, /blog/what-is-ai-automation-australia, /blog/does-chatgpt-search-the-web) and the same pages on `main` (`app/styles/home.css`, `automation.css`, `article.css`). Every article block has to be cut from this.

1. **Grain:** no image files. Three SVG `feTurbulence` noises are inlined as data URIs (`--noise` fine at .65, `--noise-coarse` at .32, `--noise-hard` posterised to four levels), laid over a colour with overlay or screen blends at .18 to .75. A `steps()` animation jitters them, so they read as live film grain rather than a texture.
2. **Grain sits on colour:** the hero, service cards, work cells, stats band and footer are a category gradient with a radial glow breathing on top, then static (colour × coarse noise, screen) and grain (overlay). On white paper, grain only shows up inside small marks.
3. **The mark:** a 13px cross made of two 1px lines, masked out of (category colour × coarse noise) and jittering. It sits wherever an inner vertical hairline meets a horizontal one, in the logo grid and the problem grid.
4. **Lines:** one hairline, `1px rgba(20,20,20,.14)`. Every section opens on a full-width rule with a 12px uppercase label tracked .14em under it. Lists are hairline rows. Grids are hairline cells alternating white and `#f6f6f6`, with no gaps between them.
5. **Scanlines:** display type is cut by horizontal stripes (`background-clip:text` over a repeating gradient, .014em on per .043em, over a 24% body). The hero H1s, the wordmark and the footer sign use it.
6. **Type:** Inter only. Headings are 500 at -.02 to -.03em. Big numerals are 300 light (stats at 46 to 84px, step indices at 22 to 30px). Body is 18px/1.65. There are two text tones, ink `#141414` and ink-2 `#6b6b6b`. Labels, links and buttons are 11 to 12px uppercase, tracked.
7. **Corners:** square everywhere, on photos, cards, buttons and grids. A link is uppercase tracked text on a 1px underline. The one filled button is a white square.
8. **Colour:** the paper is white, `#f6f6f6` and ink. Colour means the article's category (green automation, red search, orange web, teal strategy, plum growth) and it fills grounds. On paper it only appears at the size of a mark: the crosses, the rail's current underline, a hovered title, a row band at 8%.
9. **Rows answer:** on the service pages a row fills with an 8% band of the colour sweeping in from the left, or a 1px line in the colour draws along its foot. A "+" at weight 300 is the open affordance.
10. **Rhythm:** a 760px reading column on a 1320px wrap, sections 72 to 128px apart, 22px between paragraphs, and labels sitting well clear of what they label. Nothing crowds.
