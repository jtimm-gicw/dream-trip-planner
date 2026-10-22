import { useEffect } from 'react';
import { trip, destinations, itinerary, checklist } from '../data/tripData.js';
import Header from './Header.jsx';
import Hero from './Hero.jsx';
import DestinationCard from './DestinationCard.jsx';
import DayPlan from './DayPlan.jsx';
import Checklist from './Checklist.jsx';

// CLASS 26: This function returns the entire app's JSX.
// The app is deliberately STATIC. It only receives data and renders components.
// There is NO useState and NO useReducer in Class 26.
export default function FunctionTripPlanner() {
  // SMALL HOOK PREVIEW from the facilitator notes:
  // React can synchronize the browser tab's title using a hook.
  // For now, observe the effect. We will explain lifecycle/dependencies/cleanup
  // thoroughly in Class 28. React Strict Mode may run it twice in development.
  useEffect(() => {
    document.title = 'Dream Trip | Function Components';
  }, []);

  return (
    <div className="function-demo" id="top">
      <Header version="functions" />
      <main className="page-container">
        <Hero trip={trip} />
        <section className="content-section" aria-labelledby="destinations-heading">
          <div className="section-heading"><div><span className="eyebrow">01 / GET INSPIRED</span><h2 id="destinations-heading">Where to next?</h2><p>Three amazing destinations to start dreaming about.</p></div><span className="section-count">3 ideas</span></div>
          <div className="destination-grid">
            {/* REVIEW: .map() turns data into components. The unique ID is the key. */}
            {destinations.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}
          </div>
        </section>
        <section className="content-section plan-section" id="itinerary" aria-labelledby="itinerary-heading">
          <div className="section-heading"><div><span className="eyebrow">02 / MAKE A PLAN</span><h2 id="itinerary-heading">Your Lisbon itinerary</h2><p>A sample plan organized by day — ready to customize in upcoming classes.</p></div></div>
          <div className="plan-grid">
            <div className="day-grid">{itinerary.map((day) => <DayPlan key={day.id} day={day} />)}</div>
            <Checklist items={checklist} />
          </div>
        </section>
      </main>
      <footer className="app-footer page-container"><span>✈️ Dream Trip Planner</span><span>Code 401 · Class 26 · React Function Components + SCSS</span></footer>
    </div>
  );
}
