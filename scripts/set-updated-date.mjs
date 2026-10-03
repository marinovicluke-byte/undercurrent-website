// scripts/set-updated-date.mjs — gives every article changed against the base ref a new
// `dateModified`, spread across DAYS so the updates don't stack on one day. The day comes
// from a hash of the slug, so a rerun gives the same article the same date. `date`
// (published) is never touched. Luke, 3 Oct 2026: "mix the days around so its not all
// stacked on the 1 day".
//
//   node scripts/set-updated-date.mjs [--base origin/main]

import fs from 'fs'
import crypto from 'crypto'
import { execFileSync } from 'child_process'

export const DAYS = ['2026-09-29', '2026-09-30', '2026-10-01', '2026-10-02', '2026-10-03']
export const dayFor = slug => DAYS[parseInt(crypto.createHash('sha256').update(slug).digest('hex').slice(0, 8), 16) % DAYS.length]

if (import.meta.url === `file://${process.argv[1]}`) {
  const DIR = 'content/articles'
  const args = process.argv.slice(2)
  const base = args.includes('--base') ? args[args.indexOf('--base') + 1] : 'origin/main'
  const changed = execFileSync('git', ['diff', '--name-only', base, '--', DIR], { encoding: 'utf8' }).split('\n').filter(f => f.endsWith('.md'))
  for (const path of changed) {
    const slug = path.slice(DIR.length + 1, -3)
    const day = dayFor(slug)
    let s = fs.readFileSync(path, 'utf8')
    const line = `dateModified: "${day}"`
    if (/^dateModified:.*$/m.test(s)) s = s.replace(/^dateModified:.*$/m, line)
    else s = s.replace(/^(date:.*)$/m, `$1\n${line}`)
    fs.writeFileSync(path, s)
    console.log(`${day} ${slug}`)
  }
}
