import Header from '../function-components/Header.jsx';
import Hero from '../function-components/Hero.jsx';
import { trip, destinations } from '../data/tripData.js';
import DestinationCard from '../function-components/DestinationCard.jsx';
import TripLengthCounter from './components/TripLengthCounter.jsx';

// STEP 1 VIEW: Class 26 components still display props. Only the counter
// uses useState. This isolates the new idea so it is easy to see.
export default function BasicStateDemo() {
  return (
    <div className="function-demo state-demo" id="top">
      <Header version="state-basic" />
      <main className="page-container">
        <Hero trip={trip} />
        <div className="lesson-strip"><strong>Class 27 · Checkpoint 1</strong><span>One component, one state value, two buttons.</span></div>
        <TripLengthCounter initialDays={4} />
        <section className="content-section" aria-labelledby="basic-ideas">
          <div className="section-heading"><div><span className="eyebrow">REVIEW FROM CLASS 26</span><h2 id="basic-ideas">Destination components</h2><p>These cards still receive props and do not change.</p></div></div>
          <div className="destination-grid">
            {destinations.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}
          </div>
        </section>
      </main>
      <footer className="app-footer page-container">Code 401 · Class 27 · Step 1: useState basics</footer>
    </div>
  );
}
