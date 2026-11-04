// ONE component, THREE uses: a parent uses .map() to display each destination.
// Every rendered element in a list needs a stable unique key (set in App.jsx).
export default function DestinationCard({ destination }) {
  return (
    <article className="destination-card">
      <div className={`destination-card__visual destination-card__visual--${destination.theme}`}>
        <span className="destination-card__stamp" aria-hidden="true">{destination.emoji}</span>
        <span className="destination-card__mini-label">DESTINATION GUIDE</span>
      </div>
      <div className="destination-card__body">
        <div className="destination-card__heading">
          <div><h3>{destination.city}</h3><p>{destination.country}</p></div>
          <span className="destination-card__budget" aria-label={`Relative budget: ${destination.budget.length} out of 3`}>{destination.budget}</span>
        </div>
        <p className="destination-card__description">{destination.description}</p>
        <div className="destination-card__footer"><span>🗓️ Suggested: {destination.days} days</span><span>Inspiration only</span></div>
      </div>
    </article>
  );
}
