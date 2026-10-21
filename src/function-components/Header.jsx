// FUNCTION COMPONENT REVIEW:
// A React function component is a JavaScript function that RETURNS JSX.
// props (properties) let a parent send information to a child component.
// Here we destructure the "version" prop from the props object.
export default function Header({ version }) {
  return (
    <header className="site-header">
      <div className="site-header__inner page-container">
        <a className="brand" href="#top" aria-label="Dream Trip Planner home">
          <span className="brand__icon" aria-hidden="true">✈️</span>
          <span>dreamtrip<span className="brand__dot">.</span></span>
        </a>
        <nav aria-label="Demo versions" className="demo-switcher">
          <span className="demo-switcher__label">Compare:</span>
          <a href="?demo=class" aria-current={version === 'class' ? 'page' : undefined}>Class</a>
          <a href="?demo=functions" aria-current={version === 'functions' ? 'page' : undefined}>Functions</a>
        </nav>
      </div>
    </header>
  );
}
