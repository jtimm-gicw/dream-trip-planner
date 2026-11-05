/*
  CLASS 27 — REACT useState: THE INTERACTIVE TRIP PLANNER

  This file is the MAIN PARENT COMPONENT for our Class 27 page.

  In Class 26, we displayed information using props.
  In Class 27, we add STATE so the page can remember changes.

  MAIN IDEAS:
  1. useState lets React remember a value.
  2. A setter function tells React to update that value.
  3. A parent can send state to a child through props.
  4. A child can call a function passed through props to request a change.
  5. We create new arrays/objects when updating state, rather than
     changing the old ones directly.

  We do NOT save choices in the browser yet (Class 28).
  We do NOT use reducers yet (Class 29).
*/

// ======================================================
// 1. IMPORT useState FROM REACT
// ======================================================

// useState is a React Hook. A Hook is a special React function.
// It lets this component remember information between renders.
import { useState } from 'react';

// ======================================================
// 2. IMPORT REUSABLE CHILD COMPONENTS
// ======================================================

// We reuse the Header, Hero, and DayPlan components from Class 26.
import Header from './function-components/Header.jsx';
import Hero from './function-components/Hero.jsx';
import DayPlan from './function-components/DayPlan.jsx';

// Our data file holds the sample trip, destinations, and packing items.
import { trip, destinations, itinerary, checklist } from './data/tripData.js';

// These Class 27 components add interactive controls to the page.
import TripLengthCounter from './components/TripLengthCounter.jsx';
import DestinationPicker from './components/DestinationPicker.jsx';
import PackingChecklist from './components/PackingChecklist.jsx';
import TravelerCounterTwoStates from './components/TravelerCounterTwoStates.jsx';
import TripPreferencesObject from './components/TripPreferencesObject.jsx';

// ======================================================
// 3. CREATE OUR MAIN PARENT COMPONENT
// ======================================================

// "counterMode" is a PROP supplied by main.jsx.
// 'two' shows two separate state variables for preferences.
// 'object' groups those preferences into one state object.
// If no value is passed, 'object' is the default.
export default function StateTripPlanner({ counterMode = 'object' }) {

  // ====================================================
  // 4. STATE #1: REMEMBER THE SELECTED DESTINATION
  // ====================================================

  // useState(startingValue) returns TWO things:
  //
  // selectedId    = the current destination ID React remembers.
  // setSelectedId = the function we call to change that ID.
  //
  // destinations[0].id means "start with the first destination."
  //
  // Example of the same pattern:
  // const [count, setCount] = useState(0);
  //
  // Never write selectedId = 'kyoto' to update state.
  // Instead, call setSelectedId('kyoto').
  const [selectedId, setSelectedId] = useState(destinations[0].id);

  // ====================================================
  // 5. STATE #2: REMEMBER THE PACKING CHECKLIST
  // ====================================================

  // This state is an ARRAY of packing items.
  //
  // Each item has information such as an ID, a label, and "done".
  // .map() makes a new array.
  // { ...item } makes a copy of each item object.
  //
  // Passing a function to useState tells React how to create the
  // starting value the first time this component is initialized.
  const [packingItems, setPackingItems] = useState(() =>
    checklist.map((item) => ({ ...item }))
  );

  // ====================================================
  // 6. FIND THE FULL DESTINATION USING OUR STATE
  // ====================================================

  // selectedId only stores the ID, such as 'kyoto'.
  // .find() looks up the matching destination object.
  //
  // We do NOT need another useState for the city and country.
  // We can calculate them from selectedId and destinations.
  const selectedPlace = destinations.find(
    (place) => place.id === selectedId
  );

  // ====================================================
  // 7. CHANGE ONE PACKING ITEM WHEN A CHILD REQUESTS IT
  // ====================================================

  // The PackingChecklist child will call this function with an ID.
  // Example: togglePackingItem(3)
  //
  // An EVENT HANDLER is a function that responds to a user action.
  function togglePackingItem(id) {
    // React gives us the previous packing list.
    setPackingItems((previousItems) =>
      previousItems.map((item) =>
        // Is this the item the user clicked?
        item.id === id
          // Yes: copy it and flip done from true to false (or back).
          ? { ...item, done: !item.done }
          // No: leave this item as it was.
          : item
      )
    );
  }

  // ====================================================
  // 8. RETURN THE WEBPAGE USING JSX
  // ====================================================

  // Every state update makes React run this component again.
  // React then updates only the screen content that needs changing.
  return (
    <div className="function-demo state-demo" id="top">

      {/* HEADER — the "version" prop tells the child which page this is. */}
      <Header version="state" />

      <main className="page-container">

        {/* HERO — pass trip information from parent to child. */}
        <Hero trip={trip} />

        {/* A note to students about today's interactive lesson. */}
        <div className="lesson-strip">
          <strong>Class 27 · State Hook</strong>
          <span>Try the controls: the screen updates without refreshing.</span>
        </div>

        {/* ========================================== */}
        {/* 9. TWO INTERACTIVE COMPONENTS               */}
        {/* ========================================== */}
        <div className="state-layout">

          {/*
            TripLengthCounter manages its OWN days state.
            Only this child needs that number, so the state
            can stay inside TripLengthCounter.jsx.

            initialDays={4} sends a STARTING VALUE as a prop.
          */}
          <TripLengthCounter initialDays={4} />

          {/*
            DestinationPicker does NOT own selectedId.
            The PARENT (this file) owns that state because
            the selected destination is also shown below.

            We pass three props DOWN to the child:
            1. destinations: all available places
            2. selectedId: which place is selected
            3. onSelect: the function used to CHANGE the selection

            In DestinationPicker.jsx, a button uses:
            onClick={() => onSelect(place.id)}

            This calls setSelectedId in the parent.

            FLOW:
            Parent state -> child props -> button click
            -> setter function -> React updates the page
          */}
          <DestinationPicker
            destinations={destinations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />
        </div>

        {/*
          The banner displays information calculated from selectedId.
          When the destination changes, React updates this message.
          role="status" helps assistive technology announce changes.
        */}
        <p className="selection-banner" role="status">
          ✈️ You're planning a trip to{' '}
          <strong>
            {selectedPlace.city}, {selectedPlace.country}
          </strong>.
        </p>

        {/* ========================================== */}
        {/* 10. CHECKLIST AND TRAVEL PREFERENCES         */}
        {/* ========================================== */}
        <div className="state-layout state-layout--lower">

          {/*
            PackingChecklist receives the CURRENT array as "items".
            It also receives "onToggle", a function to call when
            the user checks or unchecks an item.

            The child does not directly edit packingItems.
            It asks the parent to update state instead.
          */}
          <PackingChecklist
            items={packingItems}
            onToggle={togglePackingItem}
          />

          {/*
            This is CONDITIONAL RENDERING:
            React chooses which component to show.

            ?demo=state-two -> TWO separate useState values.
            ?demo=state     -> ONE state object with related fields.

            Both children receive initialTravelers as a prop.
            They manage their own preference state locally.
          */}
          {counterMode === 'two' ? (
            <TravelerCounterTwoStates initialTravelers={trip.travelers} />
          ) : (
            <TripPreferencesObject initialTravelers={trip.travelers} />
          )}
        </div>

        {/* ========================================== */}
        {/* 11. REVIEW STATIC DATA FROM CLASS 26        */}
        {/* ========================================== */}

        {/*
          These day cards still display sample information.
          We use .map() to make one DayPlan component per day.
          This section does NOT have interactive state yet.
        */}
        <section
          className="content-section plan-section"
          id="itinerary"
          aria-labelledby="itinerary-heading"
        >
          <div className="section-heading">
            <div>
              <span className="eyebrow">CLASS 26 REVIEW</span>
              <h2 id="itinerary-heading">Lisbon sample itinerary</h2>
              <p>
                This itinerary still displays static props.
                Editing activities is saved for Class 29.
              </p>
            </div>
          </div>

          <div className="day-grid">
            {itinerary.map((day) => (
              <DayPlan key={day.id} day={day} />
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER — information displayed at the bottom of the page. */}
      <footer className="app-footer page-container">
        Code 401 · Class 27 · useState and React Testing Library
      </footer>
    </div>
  );
}
