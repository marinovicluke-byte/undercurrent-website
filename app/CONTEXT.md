# App Router — Build Context

## Inputs
- Layer 4 (working): specs in docs/active/website-redesign-2026/, superpowers plans in docs/superpowers/
- Layer 3 (reference): _config/design-tokens.md, Content/UC-Articles/_config/brand_guide.md

## Page Routes

| Route | File | Type | Description |
|-------|------|------|-------------|
| / | page.js | Static | Homepage (Hero, ProblemFrame, TrustStrip, Services, IndustryScroller, Process, Testimonials, Comparison, Pricing, FAQ, CTA) |
| /about | about/page.js | Static | About page |
| /services | services/page.js | Static | Services overview |
| /process | process/page.js | Static | Process page |
| /contact | contact/page.js | Static | Contact form page |
| /blog | blog/page.js | Static | Blog listing (server-rendered) |
| /blog/[slug] | blog/[slug]/page.js | Dynamic | Individual article (BlogPosting JSON-LD) |
| /audit | audit/page.js | Static | Business Audit V2 form |
| /audit/report | audit/report/page.js | Static | Audit results display |
| /roi | roi/page.js | Static | ROI Calculator |
| /missed-revenue | missed-revenue/page.js | Static | Missed Revenue Audit |
| /case-study | case-study/page.js | Static | Case studies |
| /privacy | privacy/page.js | Static | Privacy policy |
| /terms | terms/page.js | Static | Terms of service |
| /[slug] | [slug]/page.js | Dynamic | Slug dispatcher: location pages + service pages (collision detection) |

## API Routes

| Endpoint | File | Purpose |
|----------|------|---------|
| POST /api/contact | api/contact/route.js | Contact form → n8n webhook |
| POST /api/qualify | api/qualify/route.js | Lead qualification → n8n webhook |
| POST /api/audit | api/audit/route.js | Audit submission → n8n email report |

All API routes use Zod validation + custom rate limiting (lib/rateLimit.js).

## SEO Routes

| Route | File | Purpose |
|-------|------|---------|
| /sitemap.xml | sitemap.js | Dynamic sitemap generation |
| /robots.txt | robots.js | Robots directives |
| /feed.xml | feed.xml/route.js | RSS feed |
| /llms.txt | llms.txt/route.js | AI crawler index |

## Component Map

### components/layout/
| Component | Purpose |
|-----------|---------|
| Header.js | Site navigation |
| Footer.js | Semantic SEO footer |
| Breadcrumb.js | Breadcrumb navigation |

### components/sections/ (homepage + shared)
| Component | Purpose |
|-----------|---------|
| Hero.js | Homepage hero |
| ProblemFrame.js | Problem/pain point section |
| TrustStrip.js | Social proof ticker |
| ServicesOverview.js | Service cards grid |
| IndustryScroller.js | Marquee industry scroller |
| Process.js | How it works steps |
| Testimonials.js | Client testimonials |
| ComparisonTable.js | Before/after comparison |
| Pricing.js | Pricing tiers |
| FAQ.js | Accordion FAQ |
| FinalCTA.js | Bottom call-to-action |

### components/audit/
| Component | Purpose |
|-----------|---------|
| BusinessAuditV2.js | Multi-step audit form |
| AuditReport.js | Audit results with scoring |
| ROICalculator.js | Interactive ROI calculator |
| MissedRevenueAudit.js | Revenue gap analysis |
| RadarChart.js | SVG radar visualization |
| calculations.js | Scoring logic |
| config.js | Audit configuration |

### components/pages/
| Component | Purpose |
|-----------|---------|
| LocationPage.js | Location-specific landing page |
| ServicePage.js | Service detail page |

### components/ui/
| Component | Purpose |
|-----------|---------|
| FadeIn.js | Intersection observer animation wrapper |
| Button.js | Button primitive |
| Card.js | Card primitive |
| Badge.js | Badge primitive |
| Accordion.js | Collapsible accordion |
| JsonLd.js | Structured data injection |

### components/forms/
| Component | Purpose |
|-----------|---------|
| ContactForm.js | Contact form with validation |

## Data Files (lib/data/)

| File | Contents |
|------|----------|
| services.js | Service definitions (6 services with slugs, descriptions, features) |
| locations.js | Location data (Melbourne + suburbs) |
| industries.js | Industry definitions for scroller |
| pricing.js | Pricing tier data |
| faq.js | FAQ questions and answers |

## Conventions
- Components: PascalCase, one per file, .js extension
- Server Components by default, 'use client' only where needed (FadeIn, forms, audit tools)
- Sections are full-width, pages compose sections
- All structured data via JsonLd component
- Articles: markdown with gray-matter frontmatter in content/articles/

## What to Avoid
- Do not create pages in src/ (legacy Vite, not active)
- Do not use Pages Router patterns (no pages/ directory)
- Do not add dependencies without checking existing ones
- Do not hardcode n8n webhook URLs, use env vars

<!-- Last updated: 2026-04-10 -->
