// Live corpus snapshot for the Robin Search Article Reviewer.
//
// Numbers come from the UC SEO repo's article-review corpus
// (Supabase article_scores table, refreshed by /article-review runs).
//
// Refresh process: SEO repo's articles/snapshot_robin_rubric.py queries
// Supabase and rewrites this file. Until that script lands, hand-update
// after each batch run and bump lastUpdatedISO.

export const ROBIN_RUBRIC_SNAPSHOT = {
  // ISO date of the most recent corpus refresh.
  lastUpdatedISO: '2026-05-14',
  lastUpdatedDisplay: '14 May 2026',

  // Headline corpus counts.
  articlesAudited: 146,
  publishersCovered: 'Australian SEO, AI, and marketing agencies, plus a US-leading control sample',

  // Structural findings: percentage of audited articles meeting each criterion.
  // These are the canonical brand-stat numbers cited across UC glossary entries.
  findings: [
    {
      key: 'faq_schema',
      label: 'Ship FAQPage schema',
      pct: 24,
      blurb: 'Pages that mark up their FAQ section with FAQPage JSON-LD. The single biggest AI-citation signal we measure, and the easiest to ship.',
    },
    {
      key: 'llms_txt',
      label: 'Publish an llms.txt entry',
      pct: 22,
      blurb: 'Sites that expose a parseable map of their content to LLM crawlers. Almost free to ship, almost no one ships it.',
    },
    {
      key: 'quick_answer',
      label: 'Ship a labelled Quick Answer block',
      pct: 0,
      blurb: 'Articles that lead with a 40 to 60 word definitional answer in a labelled block above the fold. The shape ChatGPT and Perplexity prefer to lift verbatim.',
    },
  ],

  // High-level dimension definitions. Categories only, no weights, no criteria list.
  dimensions: [
    {
      slug: 'structural-integrity',
      name: 'Structural integrity',
      blurb: 'Semantic HTML, heading hierarchy, and internal link architecture. A page an AI crawler can navigate without guessing.',
    },
    {
      slug: 'ai-search-readiness',
      name: 'AI search readiness',
      blurb: 'Schema coverage (FAQPage, Article), llms.txt presence, definitional openers, Quick Answer blocks. The patterns AI answers cite in production.',
    },
    {
      slug: 'citation-density',
      name: 'Citation density',
      blurb: 'Hyperlinked sources, first-party data, regulator URLs. Trust signals an AI ranker can verify in one hop.',
    },
    {
      slug: 'vertical-specificity',
      name: 'Vertical specificity',
      blurb: 'Australian regulators, named verticals, location specificity. Content that survives a "for Australia" qualifier in the query.',
    },
    {
      slug: 'article-type-fit',
      name: 'Article-type fit',
      blurb: 'Does the page deliver what its type promises? Case studies show numbers. Service pages convert. Glossary entries define. We score 13 article types separately.',
    },
    {
      slug: 'authority-and-freshness',
      name: 'Authority and freshness',
      blurb: 'Verifiable author, recent dateModified, visible update cadence. The signals that say "this team is still shipping".',
    },
  ],

  // Visible changelog. Freshness signal for AI search and Google QDF.
  // Newest first.
  changelog: [
    {
      version: 'v2.7',
      date: '2026-05-13',
      note: 'Added curl-supplement for body-level JSON-LD and React Quick Answer detection. FireCrawl alone misses both.',
    },
    {
      version: 'v2.6',
      date: '2026-05-09',
      note: 'DRIFT detection on regulator stat citations. ASIC, AFCA, AHPRA, ACL claims now verified against the source URL before scoring.',
    },
    {
      version: 'v2.5',
      date: '2026-05-01',
      note: '13-type article classifier shipped. Case study, service, location, blog, pillar, definitional, how-to, comparison, listicle, news, opinion, tool review, glossary all scored on type-specific criteria.',
    },
  ],

  // Methodology principles. Plain statements, no weasel words.
  principles: [
    {
      title: 'Generic scoring',
      body: 'We score competitors and our own articles on the same rubric. No UC weighting, no home-team adjustment.',
    },
    {
      title: 'Australian corpus only',
      body: 'US benchmarks do not reflect Australian SERP behaviour. The corpus is Australian publishers, scored against Australian queries.',
    },
    {
      title: 'Continuous refresh',
      body: 'New articles join the corpus as they publish. Re-scored articles update. The snapshot tile shows the most recent refresh date.',
    },
    {
      title: 'Reproducible',
      body: 'The same article scored twice produces the same score. Deterministic structural checks plus a calibrated qualitative panel.',
    },
  ],
}
