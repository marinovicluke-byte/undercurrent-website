import SectionGlow from '@/components/visuals/SectionGlow'
import SectionEyebrow from '@/components/ui/SectionEyebrow'

const SECTION_PAD = '120px var(--page-pad)'
const MAX_W = 1280

function renderTitleWithGlow(title, glowWords, glowClass = 'uc-glow-word') {
  if (!glowWords || !glowWords.length) return title
  const parts = String(title).split(/(\s+)/)
  const target = glowWords.map(w => w.toLowerCase())
  const out = []
  let buffer = []
  const flushBuffer = key => {
    if (!buffer.length) return
    out.push(<span key={`g-${key}`} className={glowClass}>{buffer.join('')}</span>)
    buffer = []
  }
  parts.forEach((tok, i) => {
    const clean = tok.replace(/[^\p{L}\p{N}]/gu, '').toLowerCase()
    if (clean && target.includes(clean)) {
      buffer.push(tok)
    } else if (/^\s+$/.test(tok) && buffer.length) {
      buffer.push(tok)
    } else {
      flushBuffer(i)
      out.push(tok)
    }
  })
  flushBuffer('end')
  return out
}

export default function SectionShell({
  n,
  label,
  title,
  lede,
  bg = 'deep',
  children,
  anchor,
  glowWords,
  glowClass,
  align = 'left',
  bodyAlign,
  glowCorner,
}) {
  const bgColor =
    bg === 'card' ? 'var(--charcoal)' : bg === 'panel' ? '#26241F' : 'var(--bg-deep)'
  const hasTitle = !!title

  return (
    <section
      id={anchor}
      className="uc-section"
      style={{
        padding: hasTitle ? SECTION_PAD : '64px var(--page-pad) 120px',
        background: bgColor,
        borderTop: '1px solid var(--text-faint)',
        position: 'relative',
        overflow: glowCorner ? 'clip' : undefined,
      }}
    >
      {glowCorner && <SectionGlow corner={glowCorner} />}
      <div style={{ position: 'relative', zIndex: 1, maxWidth: MAX_W, margin: 0, textAlign: align }}>
        {(n || label) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: hasTitle ? 32 : 48,
              justifyContent: align === 'center' ? 'center' : 'flex-start',
            }}
          >
            <SectionEyebrow n={n} label={label} />
          </div>
        )}

        {hasTitle && (
          <h2
            style={{
              margin: align === 'center' ? '0 auto' : 0,
              fontFamily: 'var(--font-display)',
              fontWeight: 500,
              fontSize: 'clamp(36px, 4.4vw, 64px)',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              color: 'var(--off-white)',
              textWrap: 'balance',
              maxWidth: 1100,
            }}
          >
            {renderTitleWithGlow(title, glowWords, glowClass)}
          </h2>
        )}

        {lede && (
          <p
            style={{
              marginTop: 20,
              marginBottom: 0,
              marginLeft: align === 'center' ? 'auto' : 0,
              marginRight: align === 'center' ? 'auto' : 0,
              maxWidth: 640,
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              lineHeight: 1.55,
              color: 'var(--text-secondary)',
            }}
          >
            {lede}
          </p>
        )}

        {children && (
          <div
            style={{
              marginTop: hasTitle ? 56 : 0,
              textAlign: bodyAlign || 'left',
              display: bodyAlign === 'center' ? 'flex' : 'block',
              justifyContent: bodyAlign === 'center' ? 'center' : undefined,
            }}
          >
            {bodyAlign === 'center' ? (
              <div style={{ width: '100%', maxWidth: MAX_W }}>{children}</div>
            ) : (
              children
            )}
          </div>
        )}
      </div>
    </section>
  )
}

export { renderTitleWithGlow, MAX_W, SECTION_PAD }
