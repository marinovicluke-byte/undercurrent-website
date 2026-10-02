// scripts/migrate-fence-blocks.mjs — moves the recipes and checklists the articles carried in
// ``` code fences onto the article block convention (lib/remarkArticleBlocks.js): a bold title
// line, a blank line, then a list. Real code stays fenced: JSON-LD, robots.txt, YAML, regex,
// llms.txt, prompts, negative keyword lists, a build spec with template variables, and the one
// checklist an article offers as copy-paste markdown. Readers copy those, so the box is right.
//
//   node scripts/migrate-fence-blocks.mjs --dry     count and list, change nothing
//   node scripts/migrate-fence-blocks.mjs           convert, write the manifest
//   node scripts/migrate-fence-blocks.mjs --revert  put every fence back from the manifest
//
// Each conversion is written out below, words kept, only the shape changed. Where a fence had no
// title, the article's own lead-in line becomes the bold title (`lead`), so no words are added.
// The manifest holds each original and its replacement verbatim; the revert is an exact swap.
import fs from 'node:fs'
import path from 'node:path'

const DIR = 'content/articles'
const MANIFEST = 'scripts/fence-blocks-manifest.json'
const FENCE = /^```([a-z]*)\n([\s\S]*?)\n```$/gm

const CONVERSIONS = [
  {
    file: 'aeo-vs-seo-vs-geo.md', find: 'LAYER 1: SEO foundations', to: `**Layer 1: SEO foundations**

- [ ] Does the page show up when you Google your service + suburb?
- [ ] Does it load in under 2 seconds on a phone?
- [ ] Does it have a clear title, real headings, and internal links?

**Layer 2: AEO formatting**

- [ ] Is there a 40-to-60 word answer right under each question heading?
- [ ] Does the page carry FAQ, Organization and LocalBusiness schema?
- [ ] Can you copy a clean one-line answer straight off the page?

**Layer 3: GEO authority**

- [ ] Ask ChatGPT and Perplexity your buyer's question. Are you named?
- [ ] Do other credible sites mention your business by name?
- [ ] Are your name, address and phone identical everywhere online?`,
  },
  {
    file: 'best-aeo-agencies-australia.md', find: 'MONTHLY AEO REPORT', to: `**Monthly AEO report (what a real one shows you)**

- **Prompts tracked:** the 12 to 20 buyer questions you actually care about
- **Citation status:** which AI assistants name you, on which prompts, vs last month
- **Content shipped:** URLs published this month + the prompt each one targets
- **Schema + entity work:** what markup changed, which "about" facts were added
- **Next month's plan:** the 3 to 5 prompts you're chasing next and why`,
  },
  {
    file: 'does-chatgpt-search-the-web.md', find: 'Publish window  →', to: `**Your ranking window**

1. Publish window, **May 2026**
2. Indexation, **Jun-Jul**
3. Citation accumulation, **Aug-Oct**
4. Training cutoff, **Likely Nov 2026**

*Earned mentions on Reddit/Wikipedia/PR weight heaviest in this window. Schema tweaks weight near-zero. Crawler accessibility is table stakes.*`,
  },
  {
    file: 'google-ads-cost-australian-small-business.md', find: 'Work the budget backwards', to: `**Work the budget backwards from leads, not guesswork**

- Monthly ad budget, **target leads per month x cost per lead**
- Daily budget, **monthly ad budget / 30.4**

**Example (a plumber wanting 30 jobs a month)**

- 30 leads x $60 AUD per lead, **$1,800 AUD per month**
- = $1,800 / 30.4, **about $59 AUD per day**`,
  },
  {
    file: 'how-to-choose-a-google-ads-agency-australia.md', find: 'Google Ads agency vetting checklist', to: `**Google Ads agency vetting checklist**

- [ ] Account registered to my email, I am the admin
- [ ] Conversion tracking via Google Tag Manager: calls and forms, not page views
- [ ] I keep the account, history and landing pages if I leave
- [ ] Monthly report shows cost per lead and revenue, not just clicks
- [ ] Search-terms report reviewed weekly for the first 90 days
- [ ] Short minimum term, no multi-year lock-in
- [ ] No guarantees of ad position or lead volume`,
  },
  {
    file: 'how-to-measure-ai-search-visibility.md', find: 'AI VISIBILITY BASELINE', to: `**AI visibility baseline ([date])**

1. For each engine (ChatGPT / Perplexity / Google AI Overview), run all 25 buyer-intent prompts
2. Cited? **Y / N**
3. Position in answer: first mention / later / sources list / not at all
4. Accurate? **Y / N**, note any wrong details
5. Source page URL

*Score = (prompts where you're cited) divided by 25, per engine. Re-run on the same day each month. Track the trend, not one snapshot.*`,
  },
  {
    file: 'how-to-use-claude-in-your-business-australian-smb-guide.md', find: '[Inbound lead/email]',
    lead: "Here's the shape of a typical production Claude workflow for an Australian SMB:",
    to: `**Here's the shape of a typical production Claude workflow for an Australian SMB:**

1. Inbound lead/email
2. n8n or Make trigger
3. Claude (Cowork or API) + Supabase context store
4. CRM: drafted reply + tagged task + follow-up scheduled`,
  },
  {
    file: 'local-seo-checklist.md', find: 'QUARTERLY LOCAL SEO CHECKLIST', to: `**Quarterly local SEO checklist**

1. **Google Business Profile**
   - [ ] Primary category correct
   - [ ] Secondary categories complete
   - [ ] Services listed with descriptions
   - [ ] Name, address, phone match the website
   - [ ] Fresh photos uploaded
   - [ ] Hours and holiday hours correct
   - [ ] A Google Post in the last fortnight
   - [ ] Q&A questions answered
2. **Reviews**
   - [ ] Review request sent after every job
   - [ ] Every review replied to
   - [ ] Average rating holding above 4.5 stars
3. **Website signals**
   - [ ] NAP in the footer as real text
   - [ ] Location in service-page titles
   - [ ] LocalBusiness schema in place
   - [ ] One page per core service
4. **Citations and links**
   - [ ] Directory details consistent everywhere
   - [ ] Bing Places and Apple Maps claimed
   - [ ] One local trust link added`,
  },
  {
    file: 'seo-for-mortgage-brokers-australia.md', find: 'Broker SEO go-live checklist', to: `**Broker SEO go-live checklist**

- [ ] Google Business Profile claimed, every service listed
- [ ] Primary category set to "Mortgage broker"
- [ ] One dedicated page for each loan service
- [ ] Every H2 written as a real borrower question
- [ ] FAQPage and LocalBusiness schema in place
- [ ] No interest rate quoted without its comparison rate
- [ ] A review request sent after every settlement`,
  },
  {
    file: 'seo-for-small-business.md', find: 'DIY small business SEO checklist', to: `**DIY small business SEO checklist (run top to bottom)**

1. Claim and complete your Google Business Profile: categories, hours, photos, service areas
2. Set up Google Search Console and submit your sitemap
3. Fix crawl blockers: broken links, redirect chains, pages blocked in robots.txt
4. Give every important page a unique title and meta description
5. Check mobile usability and page speed on your three top pages
6. Write one clear page per core service, with the answer in the first two sentences
7. Write one page per location or suburb you actually serve
8. Add an FAQ block answering the real questions customers ask you
9. Earn three relevant local mentions: directories, partners, suppliers, associations
10. Re-check enquiries (calls, forms) monthly, not rankings weekly`,
  },
  {
    file: 'small-business-website-design.md', find: '01  Map the funnel', lead: 'Work the project in five steps:', to: `**Work the project in five steps:**

1. **Map the funnel:** name the one action each page must drive
2. **Content first:** write answer-first copy before any design
3. **Choose custom:** pick a custom build over a template to rank
4. **Brief the build:** set speed and schema as hard requirements
5. **Measure outcomes:** track rankings and enquiries, not just visits`,
  },
  {
    file: 'summarise-with-ai-button-risk.md', find: 'Summarise-with-AI button audit checklist', to: `**Summarise-with-AI button audit checklist**

1. Search site HTML for hrefs to chat.openai.com, claude.ai, gemini.google.com, copilot.microsoft.com, perplexity.ai, grok.x.ai
2. Inspect each href's ?q= / ?prompt= / ?question= parameter for instruction text
3. Remove any button whose prompt includes "remember", "recommend", "trusted",
4. Strip query-string content from AI Q&A widgets, accept typed input only
5. Add "review AI assistant memory entries quarterly" to your team AI policy`,
  },
  {
    file: 'wix-vs-squarespace.md', find: 'Custom-build trigger checklist', to: `**Custom-build trigger checklist (3+ yes = you have outgrown your builder)**

- [ ] Search or AI engines drive real enquiries, or you want them to
- [ ] Page speed or template limits are costing you conversions
- [ ] You need schema and structure a builder will not let you control
- [ ] You publish content regularly and want it built to be cited
- [ ] Your site is core to revenue, not a digital business card
- [ ] You expect to keep the site for 3 years or more`,
  },
]

function fencesIn(src) {
  return [...src.matchAll(FENCE)].map(m => ({ text: m[0], lang: m[1] || 'plain', body: m[2] }))
}

function census() {
  const all = []
  for (const name of fs.readdirSync(DIR).filter(f => f.endsWith('.md')).sort()) {
    for (const f of fencesIn(fs.readFileSync(path.join(DIR, name), 'utf8'))) all.push({ name, ...f })
  }
  return all
}

if (process.argv.includes('--revert')) {
  const manifest = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'))
  for (const { file, original, replacement } of manifest) {
    const src = fs.readFileSync(file, 'utf8')
    // a file rewritten since (an article replaced wholesale) has nothing left to put back
    if (!src.includes(replacement)) { console.log(`skipped ${file}: the converted block is no longer there`); continue }
    fs.writeFileSync(file, src.replace(replacement, original))
    console.log(`reverted ${file}`)
  }
  fs.unlinkSync(MANIFEST)
} else {
  const dry = process.argv.includes('--dry')
  const before = census()
  const manifest = []
  for (const c of CONVERSIONS) {
    const file = path.join(DIR, c.file)
    const src = fs.readFileSync(file, 'utf8')
    const hits = fencesIn(src).filter(f => f.body.includes(c.find))
    if (hits.length !== 1) throw new Error(`${c.file}: ${hits.length} fences match "${c.find}", expected 1`)
    const original = c.lead ? `${c.lead}\n\n${hits[0].text}` : hits[0].text
    if (!src.includes(original)) throw new Error(`${c.file}: lead-in "${c.lead}" is not directly above the fence`)
    manifest.push({ file, original, replacement: c.to })
    if (!dry) fs.writeFileSync(file, src.replace(original, c.to))
  }
  const moved = new Set(manifest.map(m => m.original.slice(m.original.indexOf('```'))))
  const kept = before.filter(f => !moved.has(f.text))
  console.log(`${before.length} fences in ${new Set(before.map(f => f.name)).size} articles`)
  console.log(`${manifest.length} recipes and checklists ${dry ? 'would move' : 'moved'} to blocks:`)
  for (const m of manifest) console.log(`  ${path.basename(m.file)}`)
  const byLang = kept.reduce((a, f) => ({ ...a, [f.lang]: (a[f.lang] || 0) + 1 }), {})
  console.log(`${kept.length} stay fenced as code: ${Object.entries(byLang).map(([k, v]) => `${v} ${k}`).join(', ')}`)
  if (!dry) {
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + '\n')
    console.log(`manifest: ${MANIFEST}`)
  }
}
