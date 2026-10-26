import { useEffect, useState } from 'react';
import Header from './function-components/Header.jsx';
import Hero from './function-components/Hero.jsx';
import DayPlan from './function-components/DayPlan.jsx';
import { trip, destinations, itinerary, checklist } from './data/tripData.js';
import DestinationPicker from './class27/components/DestinationPicker.jsx';
import PackingChecklist from './class27/components/PackingChecklist.jsx';
import TripLengthCounter from './class27/components/TripLengthCounter.jsx';
import VisitTimer from './components/VisitTimer.jsx';

// CLASS 28: Keep Class 27's useState. Add effects only for things OUTSIDE React:
// browser title, browser storage, and a repeating browser timer.
// Class 29 will introduce useReducer for complex changes to an itinerary.
const STORAGE_KEY = 'dreamtrip-class28';

function readSavedTrip() {
  // This runs when state starts, NOT inside an effect.
  // If there is no saved trip (or saved data is broken), use the sample values.
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (!data || !destinations.some((place) => place.id === data.selectedId)) return null;
    if (!Array.isArray(data.packingItems)) return null;
    return data;
  } catch {
    return null;
  }
}

export default function EffectTripPlanner() {
  // STEP 1: Familiar Class 27 state. The saved browser data supplies initial values.
  const [savedAtStart] = useState(readSavedTrip);
  const [selectedId, setSelectedId] = useState(savedAtStart?.selectedId ?? destinations[0].id);
  const [packingItems, setPackingItems] = useState(() =>
    checklist.map((item) => ({
      ...item,
      done: savedAtStart?.packingItems.find((saved) => saved.id === item.id)?.done ?? item.done,
    }))
  );
  const [showTimer, setShowTimer] = useState(false);
  const selectedPlace = destinations.find((place) => place.id === selectedId);

  function togglePackingItem(id) {
    setPackingItems((previous) => previous.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  }

  // STEP 2: [] means "no changing dependencies". React sets this up after
  // mounting. In development StrictMode may run an extra setup/cleanup cycle.
  useEffect(() => {
    console.log('APP: mounted');
    return () => console.log('APP: unmounted');
  }, []);

  // STEP 3: This effect runs when selectedId changes (and on first mount).
  // document.title is part of the BROWSER, outside React's JSX.
  useEffect(() => {
    document.title = `Dream Trip | ${selectedPlace.city}`;
    console.log('TITLE: selected destination is', selectedPlace.city);
  }, [selectedPlace.city]);

  // STEP 3: Save to the browser after selection or packing state changes.
  // Do NOT put derived display values in another state variable.
  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedId, packingItems }));
    console.log('STORAGE: saved trip preferences');
  }, [selectedId, packingItems]);

  function resetSavedTrip() {
    // Reset React state; the save effect will then store default values.
    setSelectedId(destinations[0].id);
    setPackingItems(checklist.map((item) => ({ ...item })));
  }

  return (
    <div className="function-demo state-demo effect-demo" id="top">
      <Header version="effect" />
      <main className="page-container">
        <Hero trip={trip} />
        <div className="lesson-strip">
          <strong>Class 28 · Effect Hook and Lifecycle</strong>
          <span>Change a destination, refresh the browser, and try the timer.</span>
        </div>
        <section className="effect-panel" aria-labelledby="effect-title">
          <h2 id="effect-title">🔄 Effects outside the webpage</h2>
          <p><strong>Try this:</strong> pick Kyoto, check a packing item, then refresh. Your selections should stay.</p>
          <div className="effect-actions">
            <button type="button" onClick={() => setShowTimer((previous) => !previous)}>
              {showTimer ? 'Hide timer' : 'Show timer'}
            </button>
            <button type="button" onClick={resetSavedTrip}>Reset trip choices</button>
          </div>
          {/* Toggling removes or adds the timer COMPONENT, not just its text. */}
          {showTimer && <VisitTimer />}
          <p className="helper-text">Open Developer Tools → Console for mount, effect, and cleanup messages.</p>
        </section>
        <div className="state-layout">
          <TripLengthCounter initialDays={4} />
          <DestinationPicker destinations={destinations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <p className="selection-banner" role="status">✈️ You're planning a trip to <strong>{selectedPlace.city}, {selectedPlace.country}</strong>.</p>
        <div className="state-layout state-layout--lower">
          <PackingChecklist items={packingItems} onToggle={togglePackingItem} />
          <section className="state-panel"><div className="state-panel__intro"><span className="state-kicker">NEXT: CLASS 29</span><h2>🗺️ Trip activities</h2><p>Today's itinerary is still read-only. In Class 29, reducers will add, remove, and move activities.</p></div></section>
        </div>
        <section className="content-section plan-section" id="itinerary" aria-labelledby="itinerary-heading">
          <div className="section-heading"><div><span className="eyebrow">CLASS 26 REVIEW</span><h2 id="itinerary-heading">Lisbon sample itinerary</h2><p>These sample activities do not change when the selected destination changes.</p></div></div>
          <div className="day-grid">{itinerary.map((day) => <DayPlan key={day.id} day={day} />)}</div>
        </section>
      </main>
      <footer className="app-footer page-container">Code 401 · Class 28 · useEffect and component lifecycle</footer>
    </div>
  );
}
