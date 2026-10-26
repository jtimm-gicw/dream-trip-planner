// A navigation component shared by Classes 26–29.
// The version prop identifies which page is currently being shown.
export default function Header({ version }) {
  const current = version === 'state-basic' ? 'state-basic'
    : version === 'state' ? 'state' : version;
  return (
    <header className="site-header">
      <div className="site-header__inner page-container">
        <a className="brand" href="#top" aria-label="Dream Trip Planner home">
          <span className="brand__icon" aria-hidden="true">✈️</span>
          <span>dreamtrip<span className="brand__dot">.</span></span>
        </a>
        <nav aria-label="Demo versions" className="demo-switcher">
          <span className="demo-switcher__label">Compare:</span>
          <a href="?demo=class" aria-current={current === 'class' ? 'page' : undefined}>Class 26 · Class</a>
          <a href="?demo=functions" aria-current={current === 'functions' ? 'page' : undefined}>Class 26 · Functions</a>
          <a href="?demo=state-basic" aria-current={current === 'state-basic' ? 'page' : undefined}>Class 27 · Basic</a>
          <a href="?demo=state" aria-current={current === 'state' ? 'page' : undefined}>Class 27 · State</a>
          <a href="?demo=effect" aria-current={current === 'effect' ? 'page' : undefined}>Class 28 · Effects</a>
          <a href="?demo=reducer" aria-current={current === 'reducer' ? 'page' : undefined}>Class 29 · Reducer</a>
        </nav>
      </div>
    </header>
  );
}
