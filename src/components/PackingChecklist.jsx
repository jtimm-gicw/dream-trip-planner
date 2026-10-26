// STEP 3: The checkboxes are controlled by React state in the parent.
// Each checkbox shows item.done and requests a change using onToggle(id).
export default function PackingChecklist({ items, onToggle }) {
  // DERIVED VALUE: no extra useState is needed for a number we can calculate.
  const completed = items.filter((item) => item.done).length;
  return (
    <section className="state-panel" aria-labelledby="packing-title">
      <div className="state-panel__intro">
        <span className="state-kicker">03 · Update an array</span>
        <h2 id="packing-title">🧳 Packing checklist</h2>
        <p>Tick an item. The total updates as you go.</p>
      </div>
      <p className="packing-progress" aria-live="polite">{completed} of {items.length} complete</p>
      <ul className="packing-list">
        {items.map((item) => (
          <li key={item.id}>
            <label className={item.done ? 'packing-item packing-item--done' : 'packing-item'}>
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggle(item.id)}
              />
              <span>{item.label}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
