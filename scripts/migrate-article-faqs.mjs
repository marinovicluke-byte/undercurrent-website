// One-off migration: extract the `## Frequently Asked Questions` section from
// every article markdown file and inject a structured `faqs:` array into the
// YAML frontmatter so FAQPage JSON-LD matches the visible content exactly.
// Idempotent: skips files that already have `faqs:` in frontmatter.
// Usage: node scripts/migrate-article-faqs.mjs [--dry]

import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ARTICLES_DIR = join(__dirname, '..', 'content', 'articles')
const DRY = process.argv.includes('--dry')

function splitFrontmatter(raw) {
  if (!raw.startsWith('---\n')) return null
  const end = raw.indexOf('\n---\n', 4)
  if (end < 0) return null
  return {
    frontmatter: raw.slice(4, end),
    body: raw.slice(end + 5),
  }
}

function hasFaqsKey(frontmatter) {
  return /^faqs:/m.test(frontmatter)
}

function stripMarkdownLinks(text) {
  // [label](url) -> label
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
}

function stripInlineEmphasis(text) {
  // **x** -> x, *x* -> x, _x_ -> x
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
}

function cleanAnswer(text) {
  return stripInlineEmphasis(stripMarkdownLinks(text))
    .replace(/\s+/g, ' ')
    .trim()
}

function yamlQuote(str) {
  // Single-quoted YAML string. Internal single quotes are doubled.
  return `'${str.replace(/'/g, "''")}'`
}

function extractFaqs(body) {
  // Find the FAQ section — match either `## Frequently Asked Questions`
  // or variants with trailing content. Capture to the next `##` or EOF.
  const faqStart = body.search(/^##\s+Frequently Asked Questions/m)
  if (faqStart < 0) return []
  const after = body.slice(faqStart)
  // End at the next `## ` heading or the `## Sources` / end of file.
  const restStart = after.indexOf('\n')
  const rest = after.slice(restStart)
  const nextH2 = rest.search(/\n##\s+/)
  const section = nextH2 < 0 ? rest : rest.slice(0, nextH2)

  // Parse Q/A pairs. Supports two markdown patterns:
  //   A. **Question?**          (bold paragraph)
  //      Answer paragraph.
  //   B. ### Question?          (H3 heading)
  //
  //      Answer paragraph.
  // Answer continues until the next question marker of either kind.
  const lines = section.split('\n')
  const boldQ = /^\*\*(.+?)\*\*\s*$/
  const h3Q = /^###\s+(.+?)\s*$/
  const isQuestion = line => boldQ.test(line) || h3Q.test(line)
  const faqs = []
  let i = 0
  while (i < lines.length) {
    const line = lines[i].trim()
    const m = line.match(boldQ) || line.match(h3Q)
    if (m) {
      const question = stripInlineEmphasis(stripMarkdownLinks(m[1])).trim()
      const answerLines = []
      i++
      while (i < lines.length) {
        const next = lines[i]
        if (isQuestion(next.trim())) break
        answerLines.push(next)
        i++
      }
      const answer = cleanAnswer(answerLines.join(' '))
      if (question && answer) faqs.push({ q: question, a: answer })
      continue
    }
    i++
  }
  return faqs
}

function buildFaqsYaml(faqs) {
  // Emit as a YAML block list so each q/a is readable.
  const lines = ['faqs:']
  for (const { q, a } of faqs) {
    lines.push(`  - q: ${yamlQuote(q)}`)
    lines.push(`    a: ${yamlQuote(a)}`)
  }
  return lines.join('\n')
}

function insertFaqsIntoFrontmatter(frontmatter, faqsYaml) {
  // Append before the closing ---; preserve trailing newline.
  return frontmatter.replace(/\s*$/, '') + '\n' + faqsYaml
}

function main() {
  const files = readdirSync(ARTICLES_DIR).filter(f => f.endsWith('.md'))
  let migrated = 0
  let skipped = 0
  let empty = 0

  for (const filename of files) {
    const path = join(ARTICLES_DIR, filename)
    const raw = readFileSync(path, 'utf8')
    const split = splitFrontmatter(raw)
    if (!split) {
      console.warn(`SKIP no frontmatter: ${filename}`)
      skipped++
      continue
    }
    if (hasFaqsKey(split.frontmatter)) {
      console.log(`SKIP already migrated: ${filename}`)
      skipped++
      continue
    }
    const faqs = extractFaqs(split.body)
    if (faqs.length === 0) {
      console.warn(`WARN no FAQs extracted: ${filename}`)
      empty++
      continue
    }
    const faqsYaml = buildFaqsYaml(faqs)
    const newFrontmatter = insertFaqsIntoFrontmatter(split.frontmatter, faqsYaml)
    const updated = `---\n${newFrontmatter}\n---\n${split.body}`
    if (DRY) {
      console.log(`DRY ${filename}: would migrate ${faqs.length} FAQs`)
      console.log(faqsYaml.split('\n').slice(0, 6).join('\n') + '\n  ...')
    } else {
      writeFileSync(path, updated)
      console.log(`OK ${filename}: migrated ${faqs.length} FAQs`)
    }
    migrated++
  }

  console.log(`\nSummary: migrated=${migrated}, skipped=${skipped}, empty=${empty}, total=${files.length}`)
}

main()
