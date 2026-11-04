// CLASS 26: This list is READ-ONLY. The ticks are sample data, not buttons.
// Class 27: Replace static ticks with click handlers + useState.
// Class 29: Move checklist changes into a reducer along with itinerary actions.
export default function Checklist({ items }) {
  const completed = items.filter((item) => item.done).length;
  // Derived value: count based on props; no React state needed.
  return (
    <aside className="checklist" aria-labelledby="checklist-title">
      <div className="checklist__heading"><span aria-hidden="true">🧳</span><div><h2 id="checklist-title">Before you go</h2><p>Just a few things to remember.</p></div></div>
      <p className="checklist__progress">{completed} of {items.length} tasks complete <span className="pill">Preview</span></p>
      <ul className="checklist__items">
        {items.map((item) => (
          <li className={item.done ? 'checklist__item checklist__item--done' : 'checklist__item'} key={item.id}>
            <span className="checklist__indicator" aria-hidden="true">{item.done ? '✓' : '○'}</span>
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <p className="checklist__hint">Interactive checkboxes arrive in Class 27.</p>
    </aside>
  );
}
