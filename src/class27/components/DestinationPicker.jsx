// STEP 2: A CHILD sends a request up to its parent by calling onSelect.
// The parent owns the state. The child only displays options and handles clicks.
export default function DestinationPicker({ destinations, selectedId, onSelect }) {
  return (
    <section className="state-panel" aria-labelledby="pick-title">
      <div className="state-panel__intro">
        <span className="state-kicker">02 · Choose a destination</span>
        <h2 id="pick-title">Where are we going?</h2>
        <p>Pick a destination. The message below changes immediately.</p>
      </div>
      <div className="destination-choice-grid">
        {destinations.map((place) => (
          <button
            type="button"
            className={selectedId === place.id ? 'destination-choice destination-choice--active' : 'destination-choice'}
            aria-pressed={selectedId === place.id}
            onClick={() => onSelect(place.id)}
            key={place.id}
          >
            <span aria-hidden="true">{place.emoji}</span>
            <strong>{place.city}</strong>
            <small>{place.country}</small>
          </button>
        ))}
      </div>
    </section>
  );
}
