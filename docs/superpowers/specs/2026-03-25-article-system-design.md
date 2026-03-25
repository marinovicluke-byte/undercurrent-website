# Article System Design

**Date:** 2026-03-25
**Goal:** Render SEO-optimised markdown articles committed by the n8n blog pipeline, with full pre-rendering, sitemap entries, and RSS feed. First article auto-publishes in ~24 hours.

---

## Architecture Overview

The n8n pipeline commits markdown files to `src/content/articles/{slug}.md`. The website handles everything else:

```
n8n commits .md file to GitHub
  -> Vercel auto-deploys
  -> vite build (bundles React app)
  -> node scripts/prerender.js (scans .md files, generates per-article HTML, sitemap, RSS)
  -> dist/resources/{slug}/index.html (full article HTML visible without JS)
```

Two rendering paths exist for each article:
1. **Pre-rendered HTML** (for crawlers): `prerender.js` parses markdown with `gray-matter` + `marked`, injects full article HTML into a `<div id="article-content">` in the static HTML file, along with meta tags and JSON-LD. An inline `<script>` immediately after hides the div so JS-capable browsers don't show duplicate content.
2. **React SPA** (for users navigating client-side): `Article.jsx` loads the article via `import.meta.glob`, renders it with `MarkdownRenderer.jsx`

Both paths produce identical visible content. Non-JS crawlers see the static HTML in `#article-content`. JS-capable browsers hide that div instantly and render via React in `#root`.

---

## URL Structure

```
/resources              -> cluster hub page (existing)
/resources/{slug}       -> individual article
/sitemap.xml            -> includes all articles at priority 0.7
/feed.xml               -> RSS 2.0 feed with full article content
```

Hub-and-spoke structure under `/resources/` for topical authority signalling.

**Vercel routing:** `vercel.json` must add explicit rules for `sitemap.xml` and `feed.xml` BEFORE the catch-all SPA rewrite, otherwise the catch-all serves `index.html` for XML requests:

```json
{
  "rewrites": [
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/feed.xml", "destination": "/feed.xml" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## New Files

### 1. `src/content/articles/` (directory)

Empty directory where the pipeline commits `.md` files. Each file has frontmatter:

```yaml
title: string
slug: string
description: string
keyword: string
cluster: "automation" | "ai" | "growth"
level: "beginner" | "intermediate"
author: string (defaults to "Luke Marinovic")
date: YYYY-MM-DD
readingTime: number (minutes)
```

### 2. `src/utils/articles.js`

Build-time article loader using Vite's `import.meta.glob`.

**Exports:**
- `getAllArticles()` - all articles sorted by date (newest first), returns frontmatter only (no body)
- `getArticleBySlug(slug)` - single article with parsed HTML body
- `getArticlesByCluster(cluster)` - filtered by cluster ID

**Cluster mapping:**

| Frontmatter `cluster` | Display label    | Filter ID     |
|------------------------|-----------------|---------------|
| `automation`           | Automation      | `automation`  |
| `ai`                   | AI for Business | `ai`          |
| `growth`               | Business Growth | `growth`      |

Uses `import.meta.glob('../content/articles/*.md', { eager: true, query: '?raw', import: 'default' })` to load raw markdown strings at build time (the `import: 'default'` is required to get plain strings rather than module objects). Parses frontmatter manually by splitting on `---` delimiters. The `marked` library converts body markdown to HTML only when `getArticleBySlug` is called (keeps the bundle lean for listing pages).

**Note:** `gray-matter` is a Node.js library (uses `fs` internally) and cannot run in the browser bundle. The client-side `articles.js` will parse frontmatter with a simple regex split on `---` delimiters. `gray-matter` is only used in `prerender.js` (Node.js script).

### 3. `src/components/MarkdownRenderer.jsx`

Renders pre-parsed HTML string with brand-consistent styling. Applied via a wrapper `<div>` with scoped CSS targeting child elements:

- `h2`: Cormorant Garamond, 1.75rem, #F7F3ED, margin-top 2.5rem
- `h3`: DM Sans, 1.25rem, semi-bold, #F7F3ED
- `p`: DM Sans, 1.125rem (18px), rgba(232,224,208,0.75), line-height 1.8, max-width 680px
- `ul/ol`: DM Sans, left padding, sage bullet/number colour
- `blockquote`: Sage (#8FAF9F) 3px left border, italic, Cormorant Garamond
- `code` (inline): DM Mono, sage background tint, rounded
- `pre > code`: DM Mono, charcoal background, rounded-lg, horizontal scroll
- `a`: Sage colour, underline on hover
- `img`: full width, rounded corners, margin
- `strong`: #F7F3ED (full white)
- `h2, h3`: auto-generated `id` attributes from heading text (slugified) for deep linking (e.g. `/resources/some-article#section-name`). Useful for passage-based ranking and UX.

### 4. `src/pages/Article.jsx`

Full article page component. Layout (top to bottom):

1. **PageHead** - title, description, canonical, JSON-LD Article schema
2. **ScrollProgressBar**
3. **Navbar** (isSubPage)
4. **Breadcrumb** - Home > Resources > {Article Title}
5. **Article header**:
   - Cluster pill + level badge + date + reading time (DM Mono, small)
   - Title in Cormorant Garamond (clamp 2rem-3.5rem)
   - Description in DM Sans (muted)
   - Hero image (if exists at `/articles/{slug}/hero.jpg`, otherwise gradient placeholder matching ResourceCard style)
6. **Article body** - MarkdownRenderer, max-width 680px, centered
7. **Related articles** - up to 3 from same cluster, using existing ResourceCard-style cards (but with real links)
8. **CTA section** - "Want this automated for your business?" linking to /audit
9. **Footer**

**Background:** #1C1C1A (matches Resources page). Same ambient glow elements as Resources.

**404 handling:** If `getArticleBySlug(slug)` returns `undefined`, redirect to `/resources` using React Router's `Navigate` component. The pre-rendered HTML for valid articles handles crawlers; invalid slugs will get the SPA fallback which redirects.

**JSON-LD Article schema:**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{description}",
  "author": { "@type": "Person", "name": "{author}" },
  "publisher": {
    "@type": "Organization",
    "name": "UnderCurrent",
    "logo": { "@type": "ImageObject", "url": "{domain}/favicon.svg" }
  },
  "datePublished": "{date}",
  "dateModified": "{date}",
  "keywords": "{keyword}",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "{canonical}" }
}
```

---

## Modified Files

### 1. `src/App.jsx`

Add lazy import for Article page and route:

```jsx
const Article = lazy(() => import('./pages/Article'))

// Inside <Routes>, before the catch-all:
<Route path="/resources/:slug" element={<Suspense fallback={<LoadingSpinner />}><Article /></Suspense>} />
```

React Router v7 handles path specificity ranking automatically, so declaration order does not matter. Place it near the existing `/resources` route for readability.

### 2. `src/pages/Resources.jsx`

**Additive changes only** -- existing TOPICS structure stays as-is for pillar guides and placeholder articles.

Changes:
- Import `getAllArticles` from `articles.js`
- Call `getAllArticles()` at module level (runs at build time via import.meta.glob)
- For each topic cluster section, merge published articles (from .md files) with the existing hardcoded placeholder articles
- Published articles get real `<Link to={/resources/${slug}}>` wrappers, hero images, date/readingTime display, and no "COMING SOON" overlay
- Unpublished placeholder articles keep the existing "COMING SOON" overlay
- Update article count per cluster: count = (hardcoded placeholder articles) + (published .md articles in that cluster) + 1 (pillar guide). Published articles are always appended after placeholders, never replacing them (they are different articles)
- Add a `PublishedArticleCard` variant of `ResourceCard` that links to the article and shows metadata

### 3. `scripts/prerender.js`

Extend the existing script (do not restructure it). Changes:

1. **Import** `gray-matter` and `marked` at top
2. **Add `loadArticles()` function** that:
   - Scans `src/content/articles/*.md` using `readdirSync`/`readFileSync`
   - Parses each with `gray-matter` (frontmatter + body)
   - Converts body to HTML with `marked`
   - Returns array of `{ frontmatter, html }`
3. **Generate article routes** by mapping each article to a ROUTES-compatible entry with path, title, description, and JSON-LD Article schema
4. **Inject article HTML** into each article's `index.html`:
   - After the normal `injectMeta()` call, insert the full article HTML into a `<div id="article-content">` before `<div id="root">`
   - Immediately after the closing `</div>`, insert `<script>document.getElementById('article-content').style.display='none'</script>` so JS-capable browsers hide it instantly (prevents duplicate content flash)
   - Non-JS crawlers see the full article text in page source
   - React renders the interactive version inside `#root` as normal
5. **Add articles to sitemap.xml** with priority 0.7
6. **Generate `feed.xml`** (RSS 2.0):
   - Channel: UnderCurrent blog, en-AU, link to /resources
   - Items: all articles sorted newest first, with title, description, link, pubDate, `<content:encoded>` containing full HTML
   - RSS root element must include `xmlns:content="http://purl.org/rss/1.0/modules/content/"` namespace for valid XML
   - Written to `dist/feed.xml`

---

## Dependencies

```bash
npm install -D gray-matter
npm install marked
```

`gray-matter` is a devDependency only (Node.js prerender script). `marked` is a regular dependency because it is imported in `src/utils/articles.js` for client-side markdown-to-HTML conversion (~40KB minified, code-split behind the Article page lazy import so only loaded when viewing an article).

---

## Testing Plan

1. Create `src/content/articles/test-article.md` with valid frontmatter (cluster: automation, level: beginner)
2. Run `npm run build` -- verify `dist/resources/test-article/index.html` exists with full article HTML
3. Check `dist/sitemap.xml` includes `/resources/test-article`
4. Check `dist/feed.xml` exists and includes the test article
5. Run `npm run preview` -- verify:
   - `/resources` shows the test article in the Automation cluster (no "COMING SOON" overlay)
   - `/resources/test-article` renders the full article with correct styling
   - View source shows article content in `#article-content` div (no-JS readable)
6. Delete test article before deploying

---

## Risk Assessment

- **Zero risk to existing pages** -- all changes are additive. No existing routes, components, or styles are modified in breaking ways.
- **Build failure risk: low** -- if no `.md` files exist in `src/content/articles/`, the article scanner returns an empty array and everything continues as before.
- **Bundle size impact: minimal** -- `marked` (~40KB) is code-split behind the Article page lazy import. Only loaded when viewing an article.
