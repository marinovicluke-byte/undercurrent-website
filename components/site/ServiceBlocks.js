// components/site/ServiceBlocks.js — the sections the four service pages share, so they stay uniform.
// Picked by Luke from the services board, 2026-10-02 (docs/concept-boards/services-concepts.html). Each page passes its own
// copy; the look is app/styles/service-blocks.css in the page's colour. Server components, no behaviour
// beyond the page's ServiceFx (the reveal, the tap-to-pin rows).

const X = ({ at }) => <i className={'sv-x' + (at ? ' sv-x--' + at : '')} aria-hidden="true"></i>

// why it matters: the three figures, Scanline
export function ServiceFigures({ figures }) {
  return (
    <div className="sv-figs">
      {figures.map(([n, c], i) => (
        <div className="sv-fig rv" style={{ '--i': i + 2 }} key={n}>
          {i > 0 && <><X at="t" /><X at="b" /></>}
          <b>{n}</b><span>{c}</span>
        </div>
      ))}
    </div>
  )
}

// how we work together: the steps, Fill
export function ServiceSteps({ steps }) {
  return (
    <ol className="sv-fill rv" style={{ '--i': 1 }}>
      {steps.map(([h, p], i) => (
        <li className="rowb" style={{ '--n': i + 1, '--of': steps.length }} key={h}><h3>{h}</h3><p>{p}</p></li>
      ))}
    </ol>
  )
}

// what it is: the opening with its pattern drawn as a Trigger line, the rest, then the areas grid
export function ServiceWhat({ h2, open, flow, close, rest, areas }) {
  return (
    <>
      <div className="two sv-what">
        <h2 className="rv">{h2}</h2>
        <div>
          <p className="lead-p rv" style={{ '--i': 1 }}>{open}</p>
          <ol className="sv-flow rv" style={{ '--i': 1 }}>
            {flow.map((t) => <li key={t}><X />{t}</li>)}
          </ol>
          {close && <p className="lead-p rv" style={{ '--i': 2 }}>{close}</p>}
          <p className="rv" style={{ '--i': 2 }}>{rest}</p>
        </div>
      </div>
      <div className="sv-areas rv" style={{ '--i': 1 }}>
        {areas.map(([h, p]) => <div key={h}><h3>{h}</h3><p>{p}</p></div>)}
      </div>
    </>
  )
}

// what the build includes: the six things, Stages, grouped under the step that delivers them
export function ServiceIncludes({ stages }) {
  return (
    <div className="sv-stages rv" style={{ '--i': 1 }}>
      {stages.map(({ n, step, items }) => (
        <div className="sv-stage" key={n}>
          <p className="sv-stage__h" id={'inc-' + n}><i>{n}</i>{step}</p>
          <ul aria-labelledby={'inc-' + n}>
            {items.map(([b, s]) => <li key={b}><b>{b}</b><span>{s}</span></li>)}
          </ul>
        </div>
      ))}
    </div>
  )
}

// the problem: the opening line beside its count in the hero's stripes, then the problems, Pile-up. The
// count is the number of problems, so a page with four shows a 4
export function ServiceProblem({ lead, problems }) {
  return (
    <>
      <div className="sv-open rv">
        <span className="sv-open__n" aria-hidden="true">{problems.length}</span>
        <p>{lead}</p>
      </div>
      <ol className="sv-pile rv" style={{ '--i': 1, '--n': problems.length }}>
        {problems.map(([h, p], i) => (
          <li style={{ '--k': i }} key={h}>
            <span className="sv-pile__n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
            <h3>{h}</h3><p>{p}</p>
          </li>
        ))}
      </ol>
    </>
  )
}
