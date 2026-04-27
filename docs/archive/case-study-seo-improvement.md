# Case Study: UnderCurrent SEO Improvement

## Raw Data for Case Study Creation

Use this file as the source material. Another terminal/session should turn this into a polished case study page for the website.

---

## The Numbers

- **Before:** 41/100 (Grade C — Below Average)
- **After:** 60/100 (Grade B — Above Average)
- **Improvement:** +19 points (+46% improvement)
- **Pages indexed:** 7 → 12
- **Time:** Single day
- **Approach:** Automated SEO audit tool (built in-house) + targeted fixes

---

## What Was Wrong (Starting State — Score 41)

The website was a React single-page application (SPA) deployed on Vercel. While it looked great visually, search engines and AI crawlers were seeing an almost empty page.

### Critical Issues Found
1. **Empty HTML source** — Google saw `<div id="root"></div>` with no content. All text, links, and structured data were only visible after JavaScript executed.
2. **No robots.txt** — Search engines had no instructions on how to crawl the site.
3. **No sitemap.xml** — Search engines couldn't discover all pages.
4. **Identical meta tags on every page** — Every route served the homepage title and description. The Services page, About page, and Audit page all showed "UnderCurrent — AI Business Automation" in search results.
5. **Wrong canonical URL** — Pointed to `undercurrent.au` instead of `undercurrentautomations.com`, confusing search engines about which domain was authoritative.
6. **No image alt text** — All images invisible to search engines and screen readers.
7. **No blog or articles** — Zero content marketing presence.
8. **No FAQ schema** — Missing structured data that enables rich search results.
9. **Keyword cannibalization** — Multiple pages competing for the same keywords.

---

## What Was Fixed

### Phase 1: Technical Foundation (40% → 80%)

| Fix | Before | After | Impact |
|-----|--------|-------|--------|
| Robots.txt | Missing | Present with sitemap reference | Search engines can now crawl efficiently |
| XML Sitemap | Missing | 12 URLs indexed | All pages discoverable |
| Canonical tags | Wrong domain | Correct self-referencing | No duplicate content confusion |
| Pre-rendered HTML | Empty div | Full page content in source | Google sees all content without JS |

### Phase 2: On-Page Optimisation (47% → 67%)

| Fix | Before | After | Impact |
|-----|--------|-------|--------|
| Per-page meta titles | Same title everywhere | Unique, keyword-targeted per page | Each page can rank for its own terms |
| Per-page meta descriptions | Same description everywhere | Unique, compelling per page | Better click-through rates from search results |
| Heading hierarchy | Multiple H1s on some pages | Single H1, logical H2→H3 flow | Clearer content structure for crawlers |
| Image alt text | 0% coverage | 100% coverage | Images indexable, accessible |
| Keyword differentiation | Multiple pages targeting same terms | Distinct keyword targets per page | No cannibalization |

### Phase 3: Content & E-E-A-T (27% → 60%)

| Fix | Before | After | Impact |
|-----|--------|-------|--------|
| Content freshness | No dates, stale signals | Fresh dates, recent content | Google favors recently updated content |
| Experience signals | None | Credentials, case studies, specific results | Builds trust with Google's E-E-A-T framework |
| FAQ sections | None | FAQ with structured data on key pages | Eligible for FAQ rich results in Google |

### Phase 4: Blog & Content Marketing (0% → 40%)

| Fix | Before | After | Impact |
|-----|--------|-------|--------|
| Blog section | Non-existent | Blog/resources page with articles | Foundation for content marketing and keyword targeting |
| Article internal linking | N/A | Articles cross-linked with service pages | Link equity distribution, topic authority |
| Keyword strategy | No strategy | Targeted keywords across blog content | Ranking for long-tail search terms |

### Phase 5: Schema & Structured Data (80% — maintained)

Already strong before, maintained throughout:
- LocalBusiness schema with full address, hours, geo coordinates
- Organization schema with social profiles
- FAQPage schema on relevant pages
- BreadcrumbList navigation schema
- CollectionPage + Service schema on Services page
- AboutPage schema on About page
- Person schema for founder

### Phase 6: Additional Improvements

| Fix | Before | After | Impact |
|-----|--------|-------|--------|
| Open Graph tags | Same for all pages | Unique per page | Correct previews when shared on LinkedIn, Slack, Facebook |
| Navigation clarity | No privacy/terms pages | Privacy + Terms added | Professional trust signals |
| Self-linking eliminated | Navbar linked to current page | Current page renders as span | Cleaner crawl signals |
| Vendor chunk splitting | Single JS bundle | React + GSAP split into separate chunks | Faster initial page load |
| Authority signals | Minimal | Case study page, resource links | Building domain authority |

---

## Segment Scores: Before → After

| Segment | Before | After | Change |
|---------|--------|-------|--------|
| Technical Foundation | 40% | 80% | **+40%** |
| On-Page Optimisation | 47% | 67% | **+20%** |
| Content Quality & E-E-A-T | 27% | 60% | **+33%** |
| Blog, Articles & Keywords | 0% | 40% | **+40%** |
| Site Architecture | 40% | 50% | **+10%** |
| Schema & Structured Data | 80% | 80% | — |
| Backlink & Authority | 40% | 50% | **+10%** |
| AI Search Readiness | 60% | 70% | **+10%** |
| Local SEO | 40% | 40% | — |

---

## Individual Criteria Improvements (13 criteria improved)

| Criterion | Segment | Before | After | Change |
|-----------|---------|--------|-------|--------|
| Robots.txt health | Technical | 0/2 | 2/2 | +2 |
| Sitemap | Technical | 0/1 | 1/1 | +1 |
| Canonical tags | Technical | 0/1 | 1/1 | +1 |
| Heading hierarchy | On-Page | 2/3 | 3/3 | +1 |
| Image alt text | On-Page | 0/2 | 2/2 | +2 |
| Content freshness | Content & E-E-A-T | 0/3 | 3/3 | +3 |
| Experience signals | Content & E-E-A-T | 0/3 | 2/3 | +2 |
| Blog/articles presence | Blog & Keywords | 0/2 | 1/2 | +1 |
| Keyword targeting (blog) | Blog & Keywords | 0/2 | 2/2 | +2 |
| Article internal linking | Blog & Keywords | 0/1 | 1/1 | +1 |
| Navigation clarity | Architecture | 0/2 | 1/2 | +1 |
| Authority proxy signals | Backlinks | 1/4 | 2/4 | +1 |
| FAQ presence | AI Readiness | 0/1 | 1/1 | +1 |

---

## The Tools Used

### SEO Architect (Built In-House)
- Automated crawling and scoring across 47 SEO criteria
- 9 segments covering technical, content, schema, AI readiness, local SEO
- Generates branded HTML reports with prioritized fix recommendations
- Logs results to Notion for tracking over time
- Shareable reports via GitHub Gist
- Comparison reports showing progress across multiple audits

### /seo-fix Skill (Built In-House)
- Claude Code skill that reads audit JSON reports
- Automatically implements fixes into Next.js codebases
- 5-phase approach: zero risk → low risk → schema → visual changes → manual checklist
- Safety rails: dedicated git branch, one commit per fix, build verification, revert log
- Two-gate approval for visual changes (content review + visual verification)
- Session resume capability for incremental work

---

## What This Means for the Business

### Immediate Effects
- All 12 pages are now properly indexed by Google
- Each page ranks for its own keywords instead of competing with itself
- Social media shares show correct page-specific previews
- FAQ sections eligible for rich result snippets in Google
- AI crawlers (ChatGPT, Perplexity, Claude) can read and cite the content

### Expected Effects (2-8 weeks)
- Improved rankings for targeted keywords
- Higher click-through rates from better meta descriptions
- More pages appearing in search results
- Better visibility in AI-generated answers

### Foundation for Growth
- Blog section ready for content marketing
- Schema markup enables rich search features
- Technical foundation supports future pages and content

---

## What's Still Left to Do

| Priority | Item | Impact |
|----------|------|--------|
| High | Page load speed optimization | Major ranking factor, currently slow |
| High | Google Business Profile setup | Drives local pack visibility |
| Medium | More blog articles + publishing cadence | Content authority builds over time |
| Medium | Author attribution (bio sections) | E-E-A-T trust signals |
| Medium | NAP consistency across directories | Local SEO ranking factor |
| Low | Individual Service schema per service | Marginal schema improvement |
| Low | Review generation strategy | Social proof + local ranking |

---

## Key Takeaway

A visually impressive website can be completely invisible to search engines if the technical SEO foundation isn't there. This site went from serving an empty HTML page to Google, to a fully optimized, properly structured, schema-rich site that search engines and AI crawlers can read, understand, and rank — in a single day.

The 46% score improvement (41 → 60) reflects fixing fundamental crawlability issues, adding per-page metadata, implementing structured data, and establishing content marketing infrastructure. The visual design and user experience were already excellent — the SEO work made sure search engines could actually see it.
