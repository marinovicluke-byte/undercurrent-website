# Article System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render SEO-optimised markdown articles committed by the n8n blog pipeline as pre-rendered HTML pages with sitemap and RSS feed support.

**Architecture:** Vite SPA with build-time pre-rendering. Articles are markdown files with YAML frontmatter in `src/content/articles/`. Client-side rendering uses `import.meta.glob` + `marked`. Build-time pre-rendering via `scripts/prerender.js` with `gray-matter` + `marked` generates static HTML, sitemap entries, and RSS feed.

**Tech Stack:** React 19, Vite 8, React Router 7, Tailwind CSS 3, marked (runtime), gray-matter (build-time), GSAP (animations)

**Spec:** `docs/superpowers/specs/2026-03-25-article-system-design.md`

---

## File Structure

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/content/articles/.gitkeep` | Empty dir for pipeline-committed markdown |
| Create | `src/content/articles/test-article.md` | Test article for validation (deleted before deploy) |
| Create | `src/utils/articles.js` | Load/parse articles via import.meta.glob, export query functions |
| Create | `src/components/MarkdownRenderer.jsx` | Render HTML string with brand-styled elements |
| Create | `src/pages/Article.jsx` | Full article page with SEO, breadcrumb, related articles, CTA |
| Modify | `src/App.jsx:1-170` | Add Article lazy import + `/resources/:slug` route |
| Modify | `src/pages/Resources.jsx:1-459` | Merge published articles into cluster sections |
| Modify | `scripts/prerender.js:1-241` | Scan articles, inject HTML, extend sitemap, generate RSS |
| Modify | `vercel.json:1-30` | Add sitemap.xml/feed.xml rewrites before catch-all |
| Modify | `package.json` | Add gray-matter (dev) + marked (regular) dependencies |

---

### Task 1: Install dependencies and create article content directory

**Files:**
- Modify: `package.json`
- Create: `src/content/articles/.gitkeep`
- Create: `src/content/articles/test-article.md`

- [ ] **Step 1: Install dependencies**

Run from project root (`/Users/luke/Desktop/UnderCurrent Builds/UnderCurrent/Website/undercurrent`):

```bash
npm install marked
npm install -D gray-matter
```

Expected: `package.json` shows `marked` in `dependencies` and `gray-matter` in `devDependencies`.

- [ ] **Step 2: Create content directory with .gitkeep**

```bash
mkdir -p src/content/articles
touch src/content/articles/.gitkeep
```

- [ ] **Step 3: Create test article**

Create `src/content/articles/test-article.md`:

```markdown
---
title: "How to Automate Invoicing for Your Small Business"
slug: test-article
description: "Stop spending 4 hours a week on invoices. Here's how small businesses are setting up automated invoicing that runs itself."
keyword: "automate invoicing small business"
cluster: automation
level: beginner
author: Luke Marinovic
date: 2026-03-25
readingTime: 6
---

Running a small business means wearing every hat. But invoicing shouldn't be one of them.

## Why Manual Invoicing Is Costing You More Than You Think

Most business owners spend 3-5 hours per week on invoicing. That's over 200 hours a year, time you could spend on growth, clients, or just having a life.

The real cost isn't just time. It's the **follow-ups you forget**, the invoices that go out late, and the cash flow gaps that compound silently.

## The Three Pillars of Automated Invoicing

### 1. Trigger-Based Generation

Instead of remembering to create invoices, set up triggers:

- **Project completion** triggers a draft invoice
- **Recurring services** auto-generate on schedule
- **Time tracking** rolls up into line items automatically

### 2. Smart Follow-Up Sequences

> "The money isn't in the invoice. It's in the follow-up." — Every accountant, ever.

Automated reminders at 3, 7, and 14 days overdue. Polite, consistent, and impossible to forget.

### 3. Payment Reconciliation

When payment hits your account, the system:

1. Marks the invoice as paid
2. Updates your accounting software
3. Sends a thank-you receipt
4. Flags any discrepancies for review

## What This Looks Like in Practice

Here's a simple automation flow using `n8n` and Xero:

```
Trigger: Project marked complete in CRM
  -> Generate invoice from template
  -> Send via email with payment link
  -> Schedule follow-up reminders
  -> On payment: reconcile and notify
```

The entire flow runs without you touching it.

## Getting Started

You don't need to automate everything at once. Start with:

1. **Pick your most repetitive invoice type** (usually recurring services)
2. **Map the current manual steps** (who does what, when)
3. **Identify the trigger** (what event should start the process)
4. **Build one automation** and let it run for a month

The compound effect of small automations is remarkable. One workflow saves you 2 hours a week. Three workflows save you a full day. Six months in, you've reclaimed an entire workweek every month.

## Ready to Stop Chasing Invoices?

If you're spending more than an hour a week on invoicing, there's a better way. We build custom automation systems that handle the entire invoice lifecycle, from generation to reconciliation.

[Book a free audit](/audit) and we'll map out exactly where your invoicing process is leaking time.
```

- [ ] **Step 4: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds. The test article and new deps don't break anything.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json src/content/articles/.gitkeep src/content/articles/test-article.md
git commit -m "chore: add marked + gray-matter deps, create articles content dir with test article"
```

---

### Task 2: Create article loader utility (`src/utils/articles.js`)

**Files:**
- Create: `src/utils/articles.js`

- [ ] **Step 1: Create the article loader**

Create `src/utils/articles.js`:

```js
import { marked } from 'marked'

// Configure marked to generate heading IDs for deep linking
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = tokens.map(t => t.raw || t.text || '').join('')
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
      const Tag = `h${depth}`
      return `<${Tag} id="${id}">${this.parser.parseInline(tokens)}</${Tag}>\n`
    }
  }
})

// Load all .md files as raw strings at build time
const articleFiles = import.meta.glob('../content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
})

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) return null

  const frontmatter = {}
  match[1].split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    let val = line.slice(idx + 1).trim()
    // Strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    // Parse numbers
    if (/^\d+$/.test(val)) val = Number(val)
    frontmatter[key] = val
  })

  return { frontmatter, body: match[2] }
}

// Parse all articles once on import
const articles = Object.entries(articleFiles)
  .map(([path, raw]) => {
    const parsed = parseFrontmatter(raw)
    if (!parsed) return null
    return { ...parsed.frontmatter, _body: parsed.body }
  })
  .filter(Boolean)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

export function getAllArticles() {
  return articles.map(({ _body, ...meta }) => meta)
}

export function getArticleBySlug(slug) {
  const article = articles.find(a => a.slug === slug)
  if (!article) return null
  const { _body, ...meta } = article
  return { ...meta, html: marked.parse(_body) }
}

export function getArticlesByCluster(cluster) {
  return getAllArticles().filter(a => a.cluster === cluster)
}

export const CLUSTER_LABELS = {
  automation: 'Automation',
  ai: 'AI for Business',
  growth: 'Business Growth',
}
```

- [ ] **Step 2: Verify build still works**

```bash
npm run build
```

Expected: Build succeeds. The glob import resolves the test article.

- [ ] **Step 3: Commit**

```bash
git add src/utils/articles.js
git commit -m "feat: add article loader utility with import.meta.glob"
```

---

### Task 3: Create MarkdownRenderer component

**Files:**
- Create: `src/components/MarkdownRenderer.jsx`

- [ ] **Step 1: Create the component**

Create `src/components/MarkdownRenderer.jsx`:

```jsx
export default function MarkdownRenderer({ html }) {
  return (
    <>
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <style>{`
        .article-body {
          max-width: 680px;
          margin: 0 auto;
        }

        .article-body h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.75rem;
          font-weight: 600;
          color: #F7F3ED;
          line-height: 1.25;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: -0.01em;
        }

        .article-body h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.25rem;
          font-weight: 600;
          color: #F7F3ED;
          line-height: 1.3;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }

        .article-body p {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 300;
          color: rgba(232, 224, 208, 0.75);
          line-height: 1.8;
          margin-bottom: 1.25rem;
        }

        .article-body strong {
          color: #F7F3ED;
          font-weight: 500;
        }

        .article-body a {
          color: #8FAF9F;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .article-body a:hover {
          text-decoration: underline;
          opacity: 0.85;
        }

        .article-body ul,
        .article-body ol {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.125rem;
          font-weight: 300;
          color: rgba(232, 224, 208, 0.75);
          line-height: 1.8;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
        }
        .article-body li {
          margin-bottom: 0.4rem;
        }
        .article-body li::marker {
          color: #8FAF9F;
        }

        .article-body blockquote {
          border-left: 3px solid #8FAF9F;
          margin: 2rem 0;
          padding: 1rem 1.5rem;
          background: rgba(143, 175, 159, 0.04);
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .article-body blockquote p {
          font-family: 'Cormorant Garamond', serif;
          font-style: italic;
          font-size: 1.2rem;
          color: rgba(232, 224, 208, 0.6);
          margin-bottom: 0;
        }

        .article-body code {
          font-family: 'DM Mono', monospace;
          font-size: 0.9em;
          background: rgba(143, 175, 159, 0.1);
          color: #8FAF9F;
          padding: 0.15em 0.4em;
          border-radius: 4px;
        }

        .article-body pre {
          background: rgba(28, 28, 26, 0.8);
          border: 1px solid rgba(143, 175, 159, 0.1);
          border-radius: 0.75rem;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }
        .article-body pre code {
          background: none;
          padding: 0;
          font-size: 0.875rem;
          color: rgba(232, 224, 208, 0.7);
          line-height: 1.6;
        }

        .article-body img {
          width: 100%;
          border-radius: 0.75rem;
          margin: 1.5rem 0;
        }

        .article-body hr {
          border: none;
          border-top: 1px solid rgba(143, 175, 159, 0.1);
          margin: 2.5rem 0;
        }
      `}</style>
    </>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/MarkdownRenderer.jsx
git commit -m "feat: add MarkdownRenderer component with brand typography"
```

---

### Task 4: Create Article page (`src/pages/Article.jsx`)

**Files:**
- Create: `src/pages/Article.jsx`

**Reference:** The page must match the Resources.jsx dark aesthetic. Reuse `Navbar`, `Footer`, `ScrollProgressBar`, `PageHead`, `Reveal`, `Breadcrumb` components. See `src/pages/Resources.jsx` for style patterns.

- [ ] **Step 1: Create the Article page**

Create `src/pages/Article.jsx`:

```jsx
import { useParams, Navigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollProgressBar from '../components/ScrollProgressBar'
import PageHead from '../components/PageHead'
import Reveal from '../components/Reveal'
import Breadcrumb from '../components/Breadcrumb'
import MarkdownRenderer from '../components/MarkdownRenderer'
import { getArticleBySlug, getArticlesByCluster, CLUSTER_LABELS } from '../utils/articles'

const DOMAIN = 'https://www.undercurrentautomations.com'

function ArticleHero({ slug }) {
  const imgSrc = `/articles/${slug}/hero.jpg`
  return (
    <div style={{
      width: '100%',
      maxWidth: '680px',
      margin: '2rem auto',
      aspectRatio: '16/9',
      borderRadius: '1rem',
      overflow: 'hidden',
      background: 'linear-gradient(135deg, rgba(143,175,159,0.08) 0%, rgba(28,28,26,0.4) 100%)',
      border: '1px solid rgba(143,175,159,0.08)',
    }}>
      <img
        src={imgSrc}
        alt=""
        loading="eager"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        onError={e => { e.currentTarget.style.display = 'none' }}
      />
    </div>
  )
}

function RelatedArticles({ cluster, currentSlug }) {
  const related = getArticlesByCluster(cluster).filter(a => a.slug !== currentSlug).slice(0, 3)
  if (related.length === 0) return null

  return (
    <section style={{ maxWidth: '680px', margin: '4rem auto 0', padding: '0 1.5rem' }}>
      <Reveal>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '28px', height: '1px', background: 'rgba(143,175,159,0.3)' }} />
          <h3 className="font-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.18em', color: '#8FAF9F', fontWeight: 500 }}>
            MORE IN {CLUSTER_LABELS[cluster]?.toUpperCase() || cluster.toUpperCase()}
          </h3>
          <div style={{ flex: 1, height: '1px', background: 'rgba(143,175,159,0.08)' }} />
        </div>
      </Reveal>
      <div style={{ display: 'grid', gap: '1.25rem', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
        {related.map((article, i) => (
          <Reveal key={article.slug} delay={0.05 * (i + 1)} y={30}>
            <Link to={`/resources/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{
                background: 'linear-gradient(145deg, rgba(143,175,159,0.05) 0%, rgba(28,28,26,0.2) 100%)',
                border: '1px solid rgba(143,175,159,0.1)',
                borderRadius: '1.25rem',
                padding: '1.25rem 1.5rem',
                cursor: 'pointer',
                transition: 'all 0.35s ease',
              }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'
                  e.currentTarget.style.transform = 'translateY(-4px)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <p className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.6)', marginBottom: '0.6rem' }}>
                  {CLUSTER_LABELS[article.cluster]?.toUpperCase() || article.cluster.toUpperCase()}
                </p>
                <h4 className="font-cormorant" style={{ fontSize: '1.15rem', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.25, marginBottom: '0.5rem' }}>
                  {article.title}
                </h4>
                <p className="font-dm" style={{ fontSize: '0.8rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.6 }}>
                  {article.description}
                </p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <Reveal>
      <section style={{
        maxWidth: '680px',
        margin: '4rem auto',
        padding: '2.5rem',
        background: 'linear-gradient(145deg, rgba(143,175,159,0.08) 0%, rgba(28,28,26,0.3) 100%)',
        border: '1px solid rgba(143,175,159,0.15)',
        borderRadius: '1.25rem',
        textAlign: 'center',
      }}>
        <h3 className="font-cormorant" style={{ fontSize: '1.5rem', fontWeight: 600, color: '#F7F3ED', marginBottom: '0.75rem' }}>
          Want this automated for your business?
        </h3>
        <p className="font-dm" style={{ fontSize: '0.95rem', fontWeight: 300, color: 'rgba(212,201,176,0.5)', lineHeight: 1.7, marginBottom: '1.5rem', maxWidth: '48ch', margin: '0 auto 1.5rem' }}>
          We build custom automation systems for small businesses. Get a free audit to see where you're leaking time.
        </p>
        <Link
          to="/audit"
          className="font-dm"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: 'rgba(143,175,159,0.12)',
            border: '1px solid rgba(143,175,159,0.3)',
            borderRadius: '9999px',
            color: '#8FAF9F',
            fontSize: '0.9rem',
            fontWeight: 500,
            textDecoration: 'none',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = 'rgba(143,175,159,0.2)'
            e.currentTarget.style.borderColor = 'rgba(143,175,159,0.5)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.background = 'rgba(143,175,159,0.12)'
            e.currentTarget.style.borderColor = 'rgba(143,175,159,0.3)'
          }}
        >
          Book a Free Audit
        </Link>
      </section>
    </Reveal>
  )
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function Article() {
  const { slug } = useParams()
  const article = getArticleBySlug(slug)

  if (!article) return <Navigate to="/resources" replace />

  const canonical = `${DOMAIN}/resources/${article.slug}`
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    author: { '@type': 'Person', name: article.author || 'Luke Marinovic' },
    publisher: {
      '@type': 'Organization',
      name: 'UnderCurrent',
      logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.svg` },
    },
    datePublished: article.date,
    dateModified: article.date,
    keywords: article.keyword,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
  }

  return (
    <div style={{ backgroundColor: '#1C1C1A', minHeight: '100vh', overflowX: 'hidden' }}>
      <PageHead
        title={`${article.title} | UnderCurrent`}
        description={article.description}
        canonical={canonical}
        jsonLd={jsonLd}
      />
      <ScrollProgressBar />
      <Navbar ready isSubPage />
      <Breadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Resources', href: '/resources' },
        { label: article.title },
      ]} />

      {/* Ambient background glow */}
      <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <div style={{ position: 'absolute', width: '700px', height: '600px', left: '-250px', top: '40%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.08) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', width: '500px', height: '500px', right: '-150px', top: '60%', background: 'radial-gradient(ellipse, rgba(143,175,159,0.05) 0%, transparent 70%)', filter: 'blur(100px)', borderRadius: '50%' }} />
      </div>

      {/* Article content */}
      <article style={{ position: 'relative', zIndex: 10, padding: '2rem 1.5rem 0' }}>
        {/* Header */}
        <Reveal>
          <header style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            {/* Meta pills */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span className="font-mono" style={{
                fontSize: '0.5rem', letterSpacing: '0.16em',
                color: '#8FAF9F',
                border: '1px solid rgba(143,175,159,0.3)',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                background: 'rgba(143,175,159,0.08)',
              }}>
                {CLUSTER_LABELS[article.cluster]?.toUpperCase() || article.cluster.toUpperCase()}
              </span>
              <span className="font-mono" style={{
                fontSize: '0.5rem', letterSpacing: '0.16em',
                color: 'rgba(212,201,176,0.4)',
                border: '1px solid rgba(212,201,176,0.12)',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
              }}>
                {article.level?.toUpperCase() || 'GUIDE'}
              </span>
              <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.35)' }}>
                {formatDate(article.date)}
              </span>
              <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.35)' }}>
                {article.readingTime} MIN READ
              </span>
            </div>

            <h1 className="font-cormorant" style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 600,
              color: '#F7F3ED',
              lineHeight: 1.15,
              letterSpacing: '-0.01em',
              marginBottom: '1rem',
            }}>
              {article.title}
            </h1>

            <p className="font-dm" style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.15rem)',
              fontWeight: 300,
              color: 'rgba(232,224,208,0.55)',
              lineHeight: 1.7,
              maxWidth: '52ch',
              margin: '0 auto',
            }}>
              {article.description}
            </p>
          </header>
        </Reveal>

        <ArticleHero slug={article.slug} />

        {/* Body */}
        <Reveal delay={0.1}>
          <div style={{ padding: '0 1.5rem' }}>
            <MarkdownRenderer html={article.html} />
          </div>
        </Reveal>
      </article>

      <RelatedArticles cluster={article.cluster} currentSlug={article.slug} />
      <CTASection />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/pages/Article.jsx
git commit -m "feat: add Article page with SEO schema, breadcrumb, related articles, CTA"
```

---

### Task 5: Add article route to App.jsx

**Files:**
- Modify: `src/App.jsx:20-34` (lazy imports), `src/App.jsx:161-163` (routes)

- [ ] **Step 1: Add lazy import for Article**

In `src/App.jsx`, after line 31 (`const Resources = lazy(...)`), add:

```jsx
const Article = lazy(() => import('./pages/Article'))
```

- [ ] **Step 2: Add route**

In `src/App.jsx`, after the `/resources` route (line 161), add:

```jsx
        <Route path="/resources/:slug" element={<Suspense fallback={<LoadingSpinner />}><Article /></Suspense>} />
```

- [ ] **Step 3: Verify build**

```bash
npm run build
```

Expected: Build succeeds. The route is registered but not yet navigable from Resources page.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx
git commit -m "feat: add /resources/:slug route for articles"
```

---

### Task 6: Update Resources.jsx to show published articles

**Files:**
- Modify: `src/pages/Resources.jsx`

**Key constraint:** Keep all existing TOPICS/pillar/placeholder content. Add published articles from `.md` files alongside them.

- [ ] **Step 1: Add imports at top of Resources.jsx**

After existing imports (line 8), add:

```jsx
import { Link } from 'react-router-dom'
import { getAllArticles, CLUSTER_LABELS } from '../utils/articles'
```

- [ ] **Step 2: Add published articles data**

After the `FILTERS` line (line 117), add:

```jsx
const publishedArticles = getAllArticles()
```

- [ ] **Step 3: Create PublishedArticleCard component**

After the `ResourceCard` component (after line 267), add:

```jsx
function PublishedArticleCard({ article, delay }) {
  return (
    <Reveal delay={delay} y={30}>
      <Link to={`/resources/${article.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
        <div
          className="resource-card"
          style={{
            background: 'linear-gradient(145deg, rgba(143,175,159,0.05) 0%, rgba(28,28,26,0.2) 100%)',
            border: '1px solid rgba(143,175,159,0.1)',
            borderRadius: '1.25rem',
            overflow: 'hidden',
            cursor: 'pointer',
            transition: 'all 0.35s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = 'rgba(143,175,159,0.25)'
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = 'rgba(143,175,159,0.1)'
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          {/* Hero image area */}
          <div style={{
            width: '100%', height: '180px',
            background: 'linear-gradient(135deg, rgba(143,175,159,0.06) 0%, rgba(28,28,26,0.4) 100%)',
            position: 'relative', overflow: 'hidden',
          }}>
            <img
              src={`/articles/${article.slug}/hero.jpg`}
              alt=""
              loading="lazy"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
            {/* Card wave decoration */}
            <div aria-hidden="true" style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '40px', overflow: 'hidden' }}>
              <svg style={{ position: 'absolute', bottom: 0, width: '200%', height: '40px', animation: `cardWave 7s ease-in-out infinite` }} viewBox="0 0 1440 40" preserveAspectRatio="none">
                <path d="M0,20 C360,40 720,0 1080,20 C1260,30 1440,10 1440,20 L1440,40 L0,40 Z" fill="rgba(143,175,159,0.12)" />
              </svg>
            </div>
          </div>

          {/* Card body */}
          <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem', flexWrap: 'wrap' }}>
              <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.16em', color: 'rgba(143,175,159,0.6)' }}>
                {CLUSTER_LABELS[article.cluster]?.toUpperCase() || article.cluster.toUpperCase()}
              </span>
              <span className="font-mono" style={{ fontSize: '0.45rem', letterSpacing: '0.12em', color: 'rgba(212,201,176,0.3)' }}>
                {article.readingTime} MIN
              </span>
              <span className="font-mono" style={{
                fontSize: '0.45rem', letterSpacing: '0.12em',
                color: 'rgba(212,201,176,0.3)',
                border: '1px solid rgba(212,201,176,0.1)',
                padding: '0.1rem 0.4rem',
                borderRadius: '9999px',
              }}>
                {article.level?.toUpperCase() || 'GUIDE'}
              </span>
            </div>
            <h3 className="font-cormorant" style={{ fontSize: '1.25rem', fontWeight: 600, color: '#F7F3ED', lineHeight: 1.25, marginBottom: '0.5rem' }}>
              {article.title}
            </h3>
            <p className="font-dm" style={{ fontSize: '0.82rem', fontWeight: 300, color: 'rgba(212,201,176,0.4)', lineHeight: 1.65, marginBottom: '1rem' }}>
              {article.description}
            </p>
            <span className="font-dm" style={{ fontSize: '0.78rem', fontWeight: 400, color: '#8FAF9F', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              Read Article <span>→</span>
            </span>
          </div>
        </div>
      </Link>
    </Reveal>
  )
}
```

- [ ] **Step 4: Update article count and grid in the topic cluster sections**

In the render, find the topic heading area (around line 414) where it shows article count. Replace:

```jsx
                  <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.3)' }}>
                    {topic.articles.length + 1} ARTICLES
                  </span>
```

With:

```jsx
                  <span className="font-mono" style={{ fontSize: '0.5rem', letterSpacing: '0.14em', color: 'rgba(143,175,159,0.3)' }}>
                    {topic.articles.length + 1 + publishedArticles.filter(a => a.cluster === topic.id).length} ARTICLES
                  </span>
```

Then, after the existing supporting article cards grid (after line 438, the closing `</div>` of the grid), add published articles for this cluster:

```jsx
              {/* Published articles from markdown files */}
              {publishedArticles.filter(a => a.cluster === topic.id).length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" style={{ marginTop: '1.25rem' }}>
                  {publishedArticles.filter(a => a.cluster === topic.id).map((article, ai) => (
                    <PublishedArticleCard
                      key={article.slug}
                      article={article}
                      delay={0.05 * (ai + 1)}
                    />
                  ))}
                </div>
              )}
```

- [ ] **Step 5: Verify with dev server**

```bash
npm run dev
```

Navigate to `http://localhost:5173/resources`. Verify:
- The test article appears in the Automation cluster
- It has a "Read Article" link (no "COMING SOON" overlay)
- Clicking it navigates to `/resources/test-article`
- The article page renders with correct styling
- Breadcrumb shows Home > Resources > article title
- Related articles section is empty (only one article in cluster)
- CTA section links to /audit

- [ ] **Step 6: Commit**

```bash
git add src/pages/Resources.jsx
git commit -m "feat: show published articles on Resources page alongside placeholders"
```

---

### Task 7: Update prerender.js (article HTML injection, sitemap, RSS)

**Files:**
- Modify: `scripts/prerender.js`

This is the most substantial task. The prerender script needs to: scan articles, inject full HTML into static files, extend the sitemap, and generate an RSS feed.

- [ ] **Step 1: Add imports at top of prerender.js**

Add `readdirSync` to the existing `fs` import on line 12, and add `gray-matter` and `marked` imports after it:

Line 12 becomes:
```js
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
```

After line 13, add:
```js
import matter from 'gray-matter'
import { marked } from 'marked'
```

- [ ] **Step 2: Configure marked heading IDs (same as client-side)**

After the `DOMAIN` constant (line 18), add:

```js
// Configure marked to generate heading IDs (matches client-side config)
marked.use({
  renderer: {
    heading({ tokens, depth }) {
      const text = tokens.map(t => t.raw || t.text || '').join('')
      const id = text.toLowerCase().replace(/[^\w]+/g, '-').replace(/(^-|-$)/g, '')
      const Tag = `h${depth}`
      return `<${Tag} id="${id}">${this.parser.parseInline(tokens)}</${Tag}>\n`
    }
  }
})
```

- [ ] **Step 3: Add loadArticles() function**

After the marked config, add:

```js
const ARTICLES_DIR = join(__dirname, '..', 'src', 'content', 'articles')

function loadArticles() {
  if (!existsSync(ARTICLES_DIR)) return []
  const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'))
  return files.map(file => {
    const raw = readFileSync(join(ARTICLES_DIR, file), 'utf-8')
    const { data, content } = matter(raw)
    const html = marked.parse(content)
    return { frontmatter: data, html }
  }).sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
}
```

- [ ] **Step 4: Add generateArticleRoutes() function**

After `loadArticles()`, add:

```js
function generateArticleRoutes(articles) {
  return articles.map(({ frontmatter }) => ({
    path: `/resources/${frontmatter.slug}`,
    title: `${frontmatter.title} | UnderCurrent`,
    description: frontmatter.description,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: frontmatter.title,
      description: frontmatter.description,
      author: { '@type': 'Person', name: frontmatter.author || 'Luke Marinovic' },
      publisher: {
        '@type': 'Organization',
        name: 'UnderCurrent',
        logo: { '@type': 'ImageObject', url: `${DOMAIN}/favicon.svg` },
      },
      datePublished: frontmatter.date,
      dateModified: frontmatter.date,
      keywords: frontmatter.keyword,
      mainEntityOfPage: { '@type': 'WebPage', '@id': `${DOMAIN}/resources/${frontmatter.slug}` },
    },
    _articleHtml: null, // placeholder, actual HTML injected separately
  }))
}
```

- [ ] **Step 5: Add injectArticleContent() function**

After `generateArticleRoutes()`, add:

```js
function injectArticleContent(html, articleHtml) {
  // Insert article content div before #root, with inline script to hide it for JS browsers
  const articleDiv = `<div id="article-content" style="max-width:680px;margin:0 auto;padding:2rem 1.5rem;font-family:'DM Sans',sans-serif;color:rgba(232,224,208,0.75);background:#1C1C1A">${articleHtml}</div>\n<script>document.getElementById('article-content').style.display='none'</script>\n`
  return html.replace('<div id="root">', articleDiv + '<div id="root">')
}
```

- [ ] **Step 6: Add generateRssFeed() function**

After `injectArticleContent()`, add:

```js
function escXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function generateRssFeed(articles) {
  const now = new Date().toUTCString()
  const items = articles.map(({ frontmatter, html }) => {
    const link = `${DOMAIN}/resources/${frontmatter.slug}`
    const pubDate = new Date(frontmatter.date + 'T00:00:00Z').toUTCString()
    return `    <item>
      <title>${escXml(frontmatter.title)}</title>
      <description>${escXml(frontmatter.description)}</description>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${pubDate}</pubDate>
      <content:encoded><![CDATA[${html}]]></content:encoded>
    </item>`
  }).join('\n')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>UnderCurrent - AI &amp; Automation Guides</title>
    <description>Guides, playbooks, and lessons from the field. AI automation for Australian small businesses.</description>
    <link>${DOMAIN}/resources</link>
    <atom:link href="${DOMAIN}/feed.xml" rel="self" type="application/rss+xml" />
    <language>en-AU</language>
    <lastBuildDate>${now}</lastBuildDate>
${items}
  </channel>
</rss>
`
  writeFileSync(join(DIST, 'feed.xml'), feed)
  console.log(`  ✓ feed.xml → ${articles.length} articles`)
}
```

- [ ] **Step 7: Update the run() function**

Replace the existing `run()` function with:

```js
function run() {
  console.log('\n  Injecting per-route SEO metadata...\n')

  const baseHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')

  // Load articles from markdown files
  const articles = loadArticles()
  const articleRoutes = generateArticleRoutes(articles)

  // Build a lookup of article HTML by path for injection
  const articleHtmlByPath = {}
  articles.forEach(({ frontmatter, html }) => {
    articleHtmlByPath[`/resources/${frontmatter.slug}`] = html
  })

  // Combine static routes with article routes
  const allRoutes = [...ROUTES, ...articleRoutes]

  for (const route of allRoutes) {
    let html = injectMeta(baseHtml, route)

    // If this is an article route, inject the full article HTML
    if (articleHtmlByPath[route.path]) {
      html = injectArticleContent(html, articleHtmlByPath[route.path])
    }

    const outDir = route.path === '/'
      ? DIST
      : join(DIST, route.path)

    if (!existsSync(outDir)) {
      mkdirSync(outDir, { recursive: true })
    }

    writeFileSync(join(outDir, 'index.html'), html)
    console.log(`  ✓ ${route.path} → ${route.title}`)
  }

  generateSitemap(allRoutes)
  if (articles.length > 0) {
    generateRssFeed(articles)
  }

  console.log(`\n  Done — ${allRoutes.length} routes with unique SEO metadata\n`)
}
```

- [ ] **Step 8: Update generateSitemap() to accept routes parameter and include articles**

Replace the existing `generateSitemap()` function with:

```js
function generateSitemap(allRoutes) {
  const today = new Date().toISOString().split('T')[0]
  const priorities = {
    '/': '1.0', '/services': '0.9', '/about': '0.8', '/audit': '0.8',
    '/case-study': '0.7', '/resources': '0.7',
    '/process': '0.7', '/contact': '0.7', '/roi': '0.7',
    '/stats': '0.6', '/privacy': '0.3', '/terms': '0.3',
  }

  const urls = allRoutes
    .filter(r => r.path !== '/lp')
    .map(r => {
      const loc = `${DOMAIN}${r.path === '/' ? '/' : r.path}`
      // Article routes get 0.7, known routes use lookup, rest default to 0.5
      const priority = priorities[r.path] || (r.path.startsWith('/resources/') ? '0.7' : '0.5')
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${priority}</priority>\n  </url>`
    })
    .join('\n')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  writeFileSync(join(DIST, 'sitemap.xml'), sitemap)
  console.log(`  ✓ sitemap.xml → ${allRoutes.filter(r => r.path !== '/lp').length} URLs (lastmod: ${today})`)
}
```

- [ ] **Step 9: Verify build**

```bash
npm run build
```

Expected output includes:
- `✓ /resources/test-article → How to Automate Invoicing for Your Small Business | UnderCurrent`
- `✓ sitemap.xml → N URLs` (count should be 1 more than before)
- `✓ feed.xml → 1 articles`

- [ ] **Step 10: Verify pre-rendered HTML**

```bash
cat dist/resources/test-article/index.html | grep -c "article-content"
```

Expected: at least 1 match (the `<div id="article-content">` exists).

```bash
cat dist/resources/test-article/index.html | grep "Why Manual Invoicing"
```

Expected: shows the H2 heading text in the static HTML.

```bash
cat dist/sitemap.xml | grep "test-article"
```

Expected: shows the sitemap entry for the test article.

```bash
cat dist/feed.xml | grep "test-article"
```

Expected: shows the RSS entry for the test article.

- [ ] **Step 11: Commit**

```bash
git add scripts/prerender.js
git commit -m "feat: extend prerender to inject article HTML, update sitemap, generate RSS feed"
```

---

### Task 8: Update vercel.json for sitemap/feed routing

**Files:**
- Modify: `vercel.json`

- [ ] **Step 1: Update vercel.json rewrites**

Replace the existing `rewrites` array in `vercel.json`:

```json
"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
```

With:

```json
"rewrites": [
    { "source": "/sitemap.xml", "destination": "/sitemap.xml" },
    { "source": "/feed.xml", "destination": "/feed.xml" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
```

- [ ] **Step 2: Commit**

```bash
git add vercel.json
git commit -m "fix: add sitemap.xml and feed.xml rewrites before SPA catch-all"
```

---

### Task 9: End-to-end verification

**Files:** None (verification only)

- [ ] **Step 1: Full build**

```bash
npm run build
```

Expected: Clean build, no errors.

- [ ] **Step 2: Preview and verify**

```bash
npm run preview
```

In a browser, check:

1. `http://localhost:4173/resources` - test article visible in Automation cluster with "Read Article" link
2. `http://localhost:4173/resources/test-article` - full article renders with:
   - Correct breadcrumb (Home > Resources > article title)
   - Cluster pill, level badge, date, reading time
   - Title in Cormorant Garamond
   - Body text in DM Sans at readable width
   - Code blocks, blockquotes, lists all styled
   - CTA section at bottom linking to /audit
3. View page source on the article page - confirm `<div id="article-content">` contains the full article text (visible without JS)
4. `http://localhost:4173/sitemap.xml` - includes `/resources/test-article` entry
5. `http://localhost:4173/feed.xml` - valid RSS with the test article
6. `http://localhost:4173/resources/nonexistent-slug` - redirects to /resources

- [ ] **Step 3: Remove test article**

```bash
rm src/content/articles/test-article.md
```

Keep the `.gitkeep` file so the directory exists for the pipeline.

- [ ] **Step 4: Final build without test article**

```bash
npm run build
```

Expected: Build succeeds with 0 articles. No errors. Sitemap and existing routes unaffected. No `feed.xml` generated (0 articles).

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove test article, ready for pipeline"
```

---

## Post-Implementation Notes

- The n8n pipeline will commit `.md` files to `src/content/articles/` via GitHub API
- Vercel auto-deploys on push, running `vite build && node scripts/prerender.js`
- Each new article automatically gets: a pre-rendered HTML page, sitemap entry, RSS entry, and appears on /resources
- No manual intervention needed after this system is live
