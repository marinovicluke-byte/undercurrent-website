// AuthorBio — drop at the bottom of article pages for E-E-A-T + author attribution.
// Schema.org Person microdata (itemScope, itemType, itemProp) runs parallel to
// the JSON-LD author block in the article page. Keeps the attributes untouched
// if the design pass ever reskins this — they're load-bearing for AI scrapers.
import Link from 'next/link'
import Image from 'next/image'

const DEFAULT_AUTHOR = {
  name: 'Luke Marinovic',
  role: 'Founder, UnderCurrent Automations',
  location: 'Melbourne, Australia',
  url: 'https://undercurrentautomations.com/about',
  image: '/authors/luke.jpg',
  sameAs: [
    'https://www.linkedin.com/in/lukemarinovic',
  ],
  bio: 'Luke founded UnderCurrent Automations in February 2026 after watching Australian small businesses grind through work they didn’t have to. He now runs lead generation, sales automation, and business process automation for tradies, consultants, allied health practices, and business services, with most builds going live in 14 days.',
}

function Initials({ name }) {
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase()
  return (
    <div
      aria-hidden
      style={{
        width: 96,
        height: 96,
        borderRadius: '50%',
        background: 'var(--charcoal-light)',
        border: '1px solid var(--text-faint)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontWeight: 500,
        fontSize: 32,
        letterSpacing: '-0.02em',
        color: 'var(--off-white)',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  )
}

export default function AuthorBio({ author = DEFAULT_AUTHOR, hasPhoto = false }) {
  return (
    <aside
      itemScope
      itemType="https://schema.org/Person"
      aria-label={`About the author, ${author.name}`}
      style={{
        maxWidth: 880,
        padding: '28px 32px',
        borderRadius: 14,
        background: 'var(--charcoal)',
        border: '1px solid var(--text-faint)',
        boxShadow: '6px 6px 0 0 var(--blue)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        gap: 24,
        alignItems: 'start',
      }}
    >
      {hasPhoto ? (
        <div
          style={{
            position: 'relative',
            width: 96,
            height: 96,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '1px solid var(--text-faint)',
            flexShrink: 0,
          }}
        >
          <Image
            src={author.image}
            alt={author.name}
            width={96}
            height={96}
            itemProp="image"
            style={{ objectFit: 'cover' }}
          />
        </div>
      ) : (
        <Initials name={author.name} />
      )}

      <div style={{ minWidth: 0 }}>
        <p
          style={{
            margin: 0,
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: 11,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--blue-light)',
          }}
        >
          About the author
        </p>

        <h3
          itemProp="name"
          style={{
            margin: '8px 0 0',
            fontFamily: 'var(--font-display)',
            fontWeight: 500,
            fontSize: 22,
            letterSpacing: '-0.02em',
            color: 'var(--off-white)',
            lineHeight: 1.2,
          }}
        >
          {author.name}
        </h3>

        <p
          style={{
            margin: '4px 0 0',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
          }}
        >
          <span itemProp="jobTitle">{author.role}</span>
          <span aria-hidden> · </span>
          <span
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <span itemProp="addressLocality">{author.location}</span>
          </span>
        </p>

        <p
          itemProp="description"
          style={{
            margin: '16px 0 0',
            fontFamily: 'var(--font-body)',
            fontSize: 15,
            lineHeight: 1.6,
            color: 'var(--text-secondary)',
          }}
        >
          {author.bio}
        </p>

        <div
          style={{
            marginTop: 18,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            alignItems: 'center',
          }}
        >
          <Link
            href="/about"
            itemProp="url"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--blue-light)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            More about Luke <span aria-hidden>→</span>
          </Link>
          <span aria-hidden style={{ color: 'var(--text-faint)' }}>·</span>
          <Link
            href="/contact"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 14,
              fontWeight: 500,
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}
          >
            Get in touch
          </Link>
        </div>

        {author.sameAs?.map(href => (
          <link key={href} itemProp="sameAs" href={href} />
        ))}
      </div>
    </aside>
  )
}
