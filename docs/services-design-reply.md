---
ai-assisted: true
source: claude-code
---

# Service pages: reply

## Stage 1, the concept board (2026-10-02)

Board: https://undercurrent-website-git-de-49e525-marinovicluke-bytes-projects.vercel.app/services-concepts.html (preview, behind Vercel login; this deployment is https://undercurrent-website-m76t75svy-marinovicluke-bytes-projects.vercel.app)

- Five sections of the AI Automation page, each shown as it is now and then three or four ideas for it, at 390 first with a desktop toggle, using the page's real copy.
- Picks: figures **Scanline**, steps **Fill**, What it is **Deck and pair**, includes **Ticks**, About **Pair**.
- Copy changes appear only in What it is (Deck and pair, Trigger line) and About (Pair, Pull line, Facts), and each idea's honest note spells them out.
- The four pages are not touched yet. Why us is not on the board and won't change.
- Figures: none of the twelve has a source on the page or in the repo. The source line was taken out on purpose in 73da37e, and the sources live in the sandbox docs (table in `docs/services-design-notes.md`).
- How the pages are built: four separate `page.js` files and four near-identical stylesheets, with no shared components. The rebuild will add shared ones.

Waiting on Luke's pick, one name per section.

## Stage 2, the four pages rebuilt (2026-10-02)

Luke's picks: figures Scanline, steps Fill, What it is the Trigger line opening followed by the crossed four-cell areas grid, includes Stages, About as live, Why us untouched.

**How it's built now.** Four shared components in `components/site/ServiceBlocks.js` (`ServiceFigures`, `ServiceSteps`, `ServiceWhat`, `ServiceIncludes`) and one shared stylesheet, `app/styles/service-blocks.css`, loaded after each page's own stylesheet so it takes that page's colour. Each page passes its own copy as data at the top of its `page.js`. The old `.fig`, `.areas`, `.steps` and `.spec` rules (26 lines a page) are gone from the four page stylesheets. Two dead remnants were left on purpose: the `.fig` rule inside the 1000px media line, because that line also holds the Why us `.stats` rules, and the `.row` hover rules.

**What each page now has (all four the same shape):**
- Why it matters: the page's three figures in the hero's stripes. Hairline rows on a phone; on desktop, three hairline cells with the grain cross where each divider meets the rules. "Over half" wraps at its space on narrow widths and doesn't clip.
- How we work together: the four steps with the article Fill numerals in the page's colour, a quarter filled at step 1 and solid at step 4.
- What it is: the h2, the opening sentence, its pattern drawn as a line of steps with a cross at each (the last in the page colour), the rest of the copy, then the four areas as the crossed grid. That's two by two with the cross at the centre on a phone, four across with crosses top and bottom on desktop.
- What the build includes: the h2, then the six items in three groups. Each group is headed by the number and name of the step that delivers it, using the page's own step names, so the list ties back to the steps above.

**Every copy change** (all in the What it is opening; no word added, no figure, heading, title, meta, URL, schema or link touched):
- Automation: "...follows a pattern: a job comes in, a quote goes out, an invoice is raised, a follow-up falls due. A system watches..." becomes "...follows a pattern:" plus a flow ("A job comes in" / "A quote goes out" / "An invoice is raised" / "A follow-up falls due"). "A system watches for the trigger and does the steps, on the tools you already pay for." now stands as its own line.
- Website: "For a small business it does three jobs. It says what you do. It shows people you're real and you're good at it. And it makes getting in touch easy." becomes "...three jobs:" plus a flow ("It says what you do" / "It shows people you're real and you're good at it" / "It makes getting in touch easy"). "And" is dropped.
- Search: "Our job is to make sure they find you. On Google's map, on the results page, and now inside AI answers." becomes "...find you:" plus a flow ("On Google's map" / "On the results page" / "And now inside AI answers"). "This is the work people used to call SEO." follows the flow.
- Consulting: "...watches how the work really moves. Where a job comes in. Who types what. What gets dropped." becomes "...really moves:" plus a flow ("Where a job comes in" / "Who types what" / "What gets dropped"). "Then you get a plan you can read. What to fix first. What to buy, what to build, and what to leave alone." follows.
- Combining Trigger line with the grid forced no change beyond these. The second paragraph stays whole on every page.

**What a page couldn't take as-is, and what I did:**
- Only the automation page has a trigger-and-steps pattern. On the other three, the flow is the closest list already in the opening: the website's three jobs, search's three places to be found, consulting's three things watched. They're lists, not sequences.
- The Stages groupings are my reading of each page. Group names are the page's own step names (step 1, Talk, delivers nothing on the list on any page):
  - Automation: Map (process map); Build, together (automation, documentation, training); Stay (monitoring, 30 days of support).
  - Website: Design (the plan, the design); Build together (the build, the words); Launch and stay (the setup, 30 days of care).
  - Search: Map (search map); Build, together (Google page, page per job, the questions, the fixes underneath); Stay (monthly report).
  - Consulting: Look (the map); The plan (the plan, tool list, the numbers); Stay (training, 30 day check-in).
  - Debatable placements: automation's Training, website's Setup, consulting's Training.

**Checks.** `next build` passes. The four pages, the homepage, /blog and an article show no sideways scroll at 390 or 1440. Why us (`#stats`) and About (`#about`) markup hash identically to main on all four pages, and so do the Why us and About CSS rules. Every page renders the same nine h2s in the same order, with metadata, schema and links untouched. The homepage, blog and articles share no file with this change. After screenshots are in `docs/screenshots/services-after/`.

**Preview** (branch alias, Vercel login): https://undercurrent-website-git-de-49e525-marinovicluke-bytes-projects.vercel.app plus /automation, /website, /seo, /consulting. Nothing merged.

**For Luke:** the three debatable Stages placements above. The figures still have no on-page source (your call in 73da37e), and the dead `.fig` rule can go whenever the Why us line is next touched.

## Stage 3, the problem section on the board (2026-10-02)

Luke asked why the problem section was never redesigned. It was left alone in round one because the crossed grid already gave it its own shape. Since then What it is ends on a crossed grid too, so the page would show the grid twice, two sections apart.

The board now has The problem (section 02): the live grid, then four ideas built from the automation page's problem copy, word for word, at 390 first with the desktop toggle.
- **Index (pick):** the five titles set large on hairline rows, as the menu sets its links. No stripes, so it doesn't compete with the Scanline figures or the Fill steps, and it leaves the crossed grid to What it is.
- **Count:** the lead's "five" as one huge striped 5 (decorative, aria-hidden), with compact rows under it.
- **Dark swipe:** the section on ink, the problems as the work section's static cards, swiped on a phone and five across on desktop.
- **Strike:** each title crossed through in the page colour as you scroll to it.

The four pages' problem sections are unchanged.

## Stage 4, the problem section, round two (2026-10-02)

Luke on round one: "you've just designed things that are already on our site and nothing original". Round two keeps what he liked (the striped 5 beside the opening line, Index's small number over a large title with the grey line, the live grid's white and grey) and gives each idea one new thing the reader does with the five complaints:
- **That's us (pick):** tap a row to tick it "That's us" (a real checkbox; tapping anywhere on the row works). A tally pinned to the section's foot counts the ticks, "2 of 5 are yours". CSS only, using counters and `:has()`. Tested: tapping a title ticks the row, Space toggles from the keyboard, and the tally follows.
- **Costs us most:** one question, "Which one costs you most?", as a radio group in a fieldset. The pick takes the page colour's grained ground and the other four step back to grey.
- **Pile-up:** the problems slide up and stick under each other into a stack of five tabs (sticky positioning, pure CSS).
- **Tally:** the numbers become tally marks, one stroke more each row and the newest drawn in the page colour as you reach it, until the fifth crosses the four.

Interface text added: "That's us", "of 5 are yours", "Which one costs you most?" and "Costs us most". The problem copy is unchanged. Round one is kept below on the board for comparison. Pages untouched.
