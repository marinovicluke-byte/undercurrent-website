# Blog Redesign — Follow-ups & Roadmap

Created 2026-04-19 after blog/case-studies redesign lands on `redesign` branch.

## Shipped in this redesign

- `/blog` — topic-clustered index with case studies strip, top-5 per cluster
- `/blog/cluster/[slug]` — 4 pillar pages (getting-started, time-admin, leads-sales, industry-guides)
- `/blog/[slug]` — article detail refreshed (Quick Answer extraction, hero image, cluster back-link, related articles, case study cross-link)
- `/case-studies` — case study index
- `/case-studies/[slug]` — case study detail with Quick Answer, before/after, tools, related articles
- Full JSON-LD stack: CollectionPage, ItemList, Article, FAQPage, Person, BreadcrumbList
- `remark-gfm` wired into both markdown processors (tables now render as semantic HTML)
- Sitemap includes clusters + case studies
- 301 redirects: `/case-study` → `/case-studies`, `/case-study/:slug` → `/case-studies/:slug`

## Outstanding — Article pipeline alignment

These live in the SEO project (`~/UnderCurrent/Builds/Products/SEO/`), outside the website repo. Fix when convenient, not blocking for redesign launch.

### 6. Pipeline publishes to wrong path for Next.js redesign

**Current:** `_config/clients/undercurrent.yml` line 516
```yaml
github_content_path: "src/content/articles"
```

**Problem:** The redesign reads from `content/articles/` (App Router convention). The pipeline still writes to the old Vite path.

**Fix when redesign merges to `main`:**
```yaml
github_content_path: "content/articles"
```

Also migrate existing committed articles from `src/content/articles/` → `content/articles/` on the redesign branch before merge (or leave them on main until cutover, then move).

---

### 7. Case study pipeline should emit to `/content/case-studies/` with clean slugs

**Current behaviour:** The Saturday case-study pipeline path publishes case studies as articles. The "30 Minutes a Week" case study was committed as:
- Content: `src/content/articles/ai-content-automation-small-business-australia-case-study.md`
- Hero: `public/articles/ai-content-automation-small-business-australia-case-study/hero.jpg`

**What the website expects:**
- Content: `content/case-studies/ai-content-automation-small-business-australia.md`
- Hero: anywhere under `public/` — frontmatter `heroImage` field points at the URL

**Required pipeline changes:**

1. **New config field** in `_config/clients/undercurrent.yml` under `case_studies:`:
   ```yaml
   case_studies:
     github_content_path: "content/case-studies"
     github_image_path: "public/case-studies"
   ```

2. **Slug normalization** — drop the `-case-study` suffix. Case studies live under `/case-studies/{slug}`, so the suffix is redundant and makes URLs ugly.

3. **Frontmatter fields** the case study page reads (extend scorer/writer to emit these):
   - `type: "case-study"` (discriminator)
   - `relatedCluster: "time-admin"` (links back to the pillar page)
   - `industry`, `location` (eyebrow metadata)
   - `outcomeHeadline` (the green sage-coloured headline below the title)
   - `outcomeMetrics: [{ label, before, after }]` (currently unused by the page — removed card band — but still useful metadata for AI extraction via frontmatter)
   - `tools: [...]` (chip list at the bottom)
   - `heroImage: "/case-studies/{slug}/hero.jpg"`
   - `heroImageAlt: "..."` (entity-rich alt text per SEO wiki)
   - `timeline: "2 weeks from first deploy..."`
   - `dateModified: "2026-04-19"` (freshness signal)

4. **Hero image path** — if the pipeline keeps images at `public/articles/{slug}/...` that still works (just reference in frontmatter). Cleaner: move to `public/case-studies/{slug}/`.

5. **Inline body image paths** — pipeline uses relative markdown references (`![alt](body-1.jpg)`) which resolve wrong under Next.js. Update to absolute paths: `![alt](/case-studies/{slug}/body-1.jpg)` or `/articles/{slug}/body-1.jpg` depending on where images land.

---

## Pre-cutover — footer SEO columns (DONE 2026-04-20)

**Resolved.** [components/layout/Footer.js](../components/layout/Footer.js) now imports `SERVICES` and `LOCATIONS` from `lib/data/` and renders a 4-column layout: Logo / Company / Services / Locations+Legal. Every service slug (10) and every location slug (1+) gets a sitewide footer link. Total footer URLs: 23.

If new services or locations are added to `lib/data/services.js` or `lib/data/locations.js`, the footer auto-updates — no further maintenance needed.

---

## Other follow-ups (not blocking)

- **Blog archive/all-articles view** — when we pass ~50 articles, the cluster pages become the entry points but a flat chronological archive might be useful. Add `/blog/archive` then.
- **Search** — at 200 articles, site search becomes real UX value. Algolia DocSearch or similar. Not needed until 50+.
- **Tag pages** — wiki (`article-optimisation-2026`) pushes topic clusters *over* tag pages. Skip tags unless we have a specific need.
- **RSS feed** — `feed.xml` already exists from old Vite build. Verify it picks up the new `/content/articles/` once pipeline points there.
- **Author pages** — when we have more than one writer, add `/authors/{name}` with `Person` schema. Until then, keep Luke as the single byline.

## Success metrics (to re-check in 90 days)

- Articles appearing in Google AI Overviews for target keywords
- Citations in Perplexity / ChatGPT / Claude for queries in the AI monitoring prompt set (see `_config/clients/undercurrent.yml` — 27 tracked prompts)
- Cluster pages ranking on page 1 for their `pillarKeyword`
- Sitemap discovery and indexation rate in GSC
