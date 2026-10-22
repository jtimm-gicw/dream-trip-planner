import TravelHighlight from './TravelHighlight.jsx';
// A REUSABLE COMPONENT: The Hero does not need to know where data came from.
// It only displays the values passed through the "trip" prop.
export default function Hero({ trip }) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__copy">
        <TravelHighlight text="Featured trip" />
        <span className="eyebrow">✦ Your next adventure starts here</span>
        <h1 id="hero-title">Let's go <em>somewhere</em> amazing.</h1>
        <p>{trip.description}</p>
        <a className="primary-link" href="#itinerary">Explore the itinerary <span aria-hidden="true">→</span></a>
        <div className="hero__metadata" aria-label="Featured trip details">
          <span>📍 {trip.destination}</span>
          <span>🗓️ {trip.dateLabel}</span>
          <span>👥 {trip.travelers} travelers</span>
        </div>
      </div>
      <div className="hero__art" aria-hidden="true">
        <div className="postcard postcard--back">✳</div>
        <div className="postcard postcard--front"><span>☀️</span><strong>Olá, Lisbon!</strong><small>Wish you were here</small></div>
        <span className="hero__sparkle hero__sparkle--one">✦</span>
        <span className="hero__sparkle hero__sparkle--two">✳</span>
      </div>
    </section>
  );
}
