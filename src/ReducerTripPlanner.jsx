import { useEffect, useReducer, useState } from 'react';
import Header from './function-components/Header.jsx';
import Hero from './function-components/Hero.jsx';
import DestinationPicker from './components/DestinationPicker.jsx';
import PackingChecklist from './components/PackingChecklist.jsx';
import TripLengthCounter from './components/TripLengthCounter.jsx';
import VisitTimer from './components/VisitTimer.jsx';
import ItineraryEditor from './components/ItineraryEditor.jsx';
import { trip, destinations, checklist } from './data/tripData.js';
import { createInitialItineraryState, itineraryReducer } from './reducers/itineraryReducer.js';

// CLASS 29: Build on Class 28, rather than starting a new application.
// Class 27 useState remains for independent values and form fields.
// Class 28 useEffect remains for title, saved choices, and timer cleanup.
// Class 29 useReducer manages the RELATED itinerary changes together.
const STORAGE_KEY = 'dreamtrip-class28';

function readSavedTrip() {
  // Same browser-storage behavior as Class 28.
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

export default function ReducerTripPlanner() {
  // REVIEW: These useState values have simple, separate purposes.
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

  // NEW IN CLASS 29: [state, dispatch] replaces several related setters.
  // React calls createInitialItineraryState once to obtain the starting data.
  const [itineraryState, dispatch] = useReducer(itineraryReducer, undefined, createInitialItineraryState);

  function togglePackingItem(id) {
    setPackingItems((previous) => previous.map((item) =>
      item.id === id ? { ...item, done: !item.done } : item));
  }

  // REVIEW: Effects communicate with the browser outside React.
  useEffect(() => {
    document.title = `Dream Trip | ${selectedPlace.city} | Reducer`;
  }, [selectedPlace.city]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedId, packingItems }));
  }, [selectedId, packingItems]);

  function resetSavedTrip() {
    setSelectedId(destinations[0].id);
    setPackingItems(checklist.map((item) => ({ ...item })));
  }

  // STEP 1: DISPATCH sends an ACTION describing what the user wants.
  // The reducer decides how the itinerary must change.
  function addActivity(values) {
    dispatch({ type: 'ADD_ACTIVITY', payload: values });
  }

  function removeActivity(activityId) {
    dispatch({ type: 'REMOVE_ACTIVITY', payload: { activityId } });
  }

  function moveActivity(activityId, targetDayId) {
    dispatch({ type: 'MOVE_ACTIVITY', payload: { activityId, targetDayId } });
  }

  function resetItinerary() {
    dispatch({ type: 'RESET_ITINERARY' });
  }

  return (
    <div className="function-demo state-demo effect-demo reducer-demo" id="top">
      <Header version="reducer" />
      <main className="page-container">
        <Hero trip={trip} />
        <div className="lesson-strip">
          <strong>Class 29 · Reducer Hook</strong>
          <span>One action → one reducer → an updated itinerary.</span>
        </div>
        <section className="effect-panel" aria-labelledby="review-title">
          <h2 id="review-title">🔄 Previous classes still work</h2>
          <p>Pick a destination, check a packing item, or show the timer. These are reviews of useState and useEffect.</p>
          <div className="effect-actions">
            <button type="button" onClick={() => setShowTimer((previous) => !previous)}>
              {showTimer ? 'Hide timer' : 'Show timer'}
            </button>
            <button type="button" onClick={resetSavedTrip}>Reset trip choices</button>
          </div>
          {showTimer && <VisitTimer />}
        </section>
        <div className="state-layout">
          <TripLengthCounter initialDays={4} />
          <DestinationPicker destinations={destinations} selectedId={selectedId} onSelect={setSelectedId} />
        </div>
        <p className="selection-banner" role="status">✈️ You're planning a trip to <strong>{selectedPlace.city}, {selectedPlace.country}</strong>.</p>
        <div className="state-layout state-layout--lower">
          <PackingChecklist items={packingItems} onToggle={togglePackingItem} />
          <section className="state-panel">
            <span className="state-kicker">CLASS 29: FOUR PIECES</span>
            <h2>🧩 How a reducer works</h2>
            <ol className="reducer-concepts">
              <li><strong>Initial state</strong> — the starting itinerary.</li>
              <li><strong>Action</strong> — a named request, like ADD_ACTIVITY.</li>
              <li><strong>Reducer</strong> — a function that returns the next state.</li>
              <li><strong>Dispatch</strong> — sends the action to React.</li>
            </ol>
          </section>
        </div>
        <ItineraryEditor
          days={itineraryState.days}
          onAdd={addActivity}
          onRemove={removeActivity}
          onMove={moveActivity}
          onReset={resetItinerary}
        />
      </main>
      <footer className="app-footer page-container">Code 401 · Class 29 · useReducer + immutability</footer>
    </div>
  );
}
