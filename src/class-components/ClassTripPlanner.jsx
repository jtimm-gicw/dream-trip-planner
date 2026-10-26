import { Component } from 'react';
import { trip, destinations, itinerary, checklist } from '../data/tripData.js';

// FIRST DEMO: SAME application idea built with older CLASS component syntax.
// No state: class components can display static data using props, too.
// Compare "this.props" in these classes with destructured props in functions.
class ClassHeader extends Component {
  render() {
    return (
      <header className="class-header">
        <div className="page-container class-header__row">
          <a href="#top" className="class-logo">✈️ dreamtrip.</a>
          <nav aria-label="Demo versions" className="class-demo-switcher">
            <span>Compare:</span>
            <a href="?demo=class" aria-current="page">Class</a>
            <a href="?demo=functions">Functions</a>
          </nav>
        </div>
      </header>
    );
  }
}

class ClassDestinationCard extends Component {
  render() {
    // This component gets its data via "this.props.destination".
    const { destination } = this.props;
    return (
      <article className="class-card">
        <div className={`class-card__art class-card__art--${destination.theme}`} aria-hidden="true">{destination.emoji}</div>
        <h3>{destination.city}, {destination.country}</h3>
        <p>{destination.description}</p>
        <small>🗓️ {destination.days} days · Budget {destination.budget}</small>
      </article>
    );
  }
}

class ClassDayPlan extends Component {
  render() {
    const { day } = this.props;
    return (
      <article className="class-day-card">
        <h3>{day.label}: {day.heading}</h3><p className="class-day-date">{day.date}</p>
        <ol>
          {day.activities.map((activity) => (
            <li key={activity.id}><strong>{activity.time} · {activity.title}</strong><p>{activity.detail}</p></li>
          ))}
        </ol>
      </article>
    );
  }
}

class ClassChecklist extends Component {
  render() {
    const { items } = this.props;
    return (
      <aside className="class-checklist"><h2>🧳 Before you go</h2>
        <ul>{items.map((item) => <li key={item.id}>{item.done ? '✅' : '⬜'} {item.label}</li>)}</ul>
        <p>Static preview — we add interactions in Class 27.</p>
      </aside>
    );
  }
}

export default class ClassTripPlanner extends Component {
  // Lifecycle method from the earlier React curriculum.
  // Students will compare this with the hook in the function demo.
  componentDidMount() {
    document.title = 'Dream Trip | Class Components';
  }

  render() {
    return (
      <div className="class-demo" id="top">
        <ClassHeader />
        <main className="page-container">
          <section className="class-hero">
            <span className="class-eyebrow">OUR CLASS COMPONENT BASELINE</span>
            <h1>Let's go somewhere amazing. ✈️</h1>
            <p>{trip.description}</p>
            <p><strong>📍 {trip.destination}</strong> &nbsp; · &nbsp; {trip.dateLabel} &nbsp; · &nbsp; {trip.travelers} travelers</p>
            <a href="#class-itinerary">View the itinerary ↓</a>
          </section>
          <section className="class-section" aria-labelledby="class-ideas-heading">
            <h2 id="class-ideas-heading">Where to next?</h2>
            <p>Static cards made from the same array used in the function demo.</p>
            <div className="class-card-grid">
              {destinations.map((destination) => <ClassDestinationCard key={destination.id} destination={destination} />)}
            </div>
          </section>
          <section className="class-section" id="class-itinerary" aria-labelledby="class-plan-heading">
            <h2 id="class-plan-heading">Your Lisbon itinerary</h2>
            <div className="class-plan-grid">
              <div className="class-day-grid">
                {itinerary.map((day) => <ClassDayPlan key={day.id} day={day} />)}
              </div>
              <ClassChecklist items={checklist} />
            </div>
          </section>
        </main>
        <footer className="page-container class-footer">Code 401 · Class 26 · React Class Components + CSS</footer>
      </div>
    );
  }
}
