import { useState } from 'react';
import Header from '../function-components/Header.jsx';
import Hero from '../function-components/Hero.jsx';
import DayPlan from '../function-components/DayPlan.jsx';
import { trip, destinations, itinerary, checklist } from '../data/tripData.js';
import TripLengthCounter from './components/TripLengthCounter.jsx';
import DestinationPicker from './components/DestinationPicker.jsx';
import PackingChecklist from './components/PackingChecklist.jsx';
import TravelerCounterTwoStates from './components/TravelerCounterTwoStates.jsx';
import TripPreferencesObject from './components/TripPreferencesObject.jsx';

// CLASS 27 COMPLETED DEMO: Every interactive section uses useState.
// We will NOT use useEffect, localStorage, or useReducer for these interactions.
// Keep effects for Class 28 and reducers for Class 29.
export default function StateTripPlanner({ counterMode = 'object' }) {
  // STEP 2: One string stores the selected destination's ID.
  const [selectedId, setSelectedId] = useState(destinations[0].id);

  // STEP 3: An ARRAY in state. Copy objects from the sample data.
  // Lazy initialization happens when React first creates this state.
  const [packingItems, setPackingItems] = useState(() =>
    checklist.map((item) => ({ ...item }))
  );

  // DERIVED VALUE: look up the full destination using the selected ID.
  // We don't need extra state for the place name/country.
  const selectedPlace = destinations.find((place) => place.id === selectedId);

  function togglePackingItem(id) {
    // map() builds a NEW array. Spread makes a NEW object only for the item
    // that changed. Directly changing item.done would mutate React state.
    setPackingItems((previousItems) => previousItems.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  }

  return (
    <div className="function-demo state-demo" id="top">
      <Header version="state" />
      <main className="page-container">
        <Hero trip={trip} />
        <div className="lesson-strip"><strong>Class 27 · State Hook</strong><span>Try the controls: the screen updates without refreshing.</span></div>
        <div className="state-layout">
          <TripLengthCounter initialDays={4} />
          <DestinationPicker destinations={destinations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <p className="selection-banner" role="status">✈️ You're planning a trip to <strong>{selectedPlace.city}, {selectedPlace.country}</strong>.</p>
        <div className="state-layout state-layout--lower">
          <PackingChecklist items={packingItems} onToggle={togglePackingItem} />
          {counterMode === 'two'
            ? <TravelerCounterTwoStates initialTravelers={trip.travelers} />
            : <TripPreferencesObject initialTravelers={trip.travelers} />}
        </div>
        <section className="content-section plan-section" id="itinerary" aria-labelledby="itinerary-heading">
          <div className="section-heading"><div><span className="eyebrow">CLASS 26 REVIEW</span><h2 id="itinerary-heading">Lisbon sample itinerary</h2><p>This itinerary still displays static props. Editing activities is saved for Class 29.</p></div></div>
          <div className="day-grid">{itinerary.map((day) => <DayPlan key={day.id} day={day} />)}</div>
        </section>
      </main>
      <footer className="app-footer page-container">Code 401 · Class 27 · useState and React Testing Library</footer>
    </div>
  );
}
