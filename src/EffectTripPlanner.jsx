
/*
=======================================================
CLASS 28 — REACT useEffect AND COMPONENT LIFECYCLE
=======================================================

FILE: src/EffectTripPlanner.jsx

PURPOSE:
This component teaches how React works with
things OUTSIDE of React using useEffect.

In Class 27, we learned useState:
- React remembers changing information.
- Setter functions update state.
- The webpage updates when state changes.

In Class 28, we are learning useEffect:
- How to run code after React renders.
- How to update the browser tab title.
- How to save information to localStorage.
- How to understand component lifecycle.
- How cleanup functions work.

WHAT IS useEffect?

useEffect is a React Hook that lets a component
synchronize with something outside React.

For example:
- The browser's document title.
- Browser storage.
- A repeating timer.

THREE IMPORTANT PARTS:

1. Effect function:
   The code we want React to run.

2. Dependency array:
   Tells React which values to watch.

3. Cleanup function:
   Optional code to stop or undo an Effect.

IMPORTANT:

useState remembers changing information.

useEffect helps React synchronize with
systems outside the component.

We will use BOTH Hooks in this lesson.
*/

// =====================================================
// 1. IMPORT OUR REACT HOOKS
// =====================================================

// useState:
// Remembers information that can change.
//
// useEffect:
// Synchronizes with things outside React
// after rendering.

import { useEffect, useState } from 'react';

// =====================================================
// 2. IMPORT OUR REUSABLE COMPONENTS
// =====================================================

// These components were introduced
// in previous classes.
//
// Header = navigation area.
// Hero = trip introduction.
// DayPlan = sample daily itinerary.

import Header from './function-components/Header.jsx';
import Hero from './function-components/Hero.jsx';
import DayPlan from './function-components/DayPlan.jsx';

// =====================================================
// 3. IMPORT OUR SAMPLE TRAVEL DATA
// =====================================================

// trip = information about our trip.
//
// destinations = places available to select.
//
// itinerary = sample activities organized by day.
//
// checklist = starting packing checklist.

import {
  trip,
  destinations,
  itinerary,
  checklist,
} from './data/tripData.js';

// =====================================================
// 4. IMPORT OUR CLASS 27 COMPONENTS
// =====================================================

// We reuse our interactive components from Class 27.
//
// DestinationPicker:
// Allows a user to select a destination.
//
// PackingChecklist:
// Displays the packing items and checkboxes.
//
// TripLengthCounter:
// Lets a user increase or decrease trip days.

import DestinationPicker from './class27/components/DestinationPicker.jsx';
import PackingChecklist from './class27/components/PackingChecklist.jsx';
import TripLengthCounter from './class27/components/TripLengthCounter.jsx';

// =====================================================
// 5. IMPORT OUR NEW CLASS 28 TIMER COMPONENT
// =====================================================

// VisitTimer demonstrates how an Effect
// starts a repeating timer.
//
// It also demonstrates CLEANUP.
//
// When the timer component is removed
// from the webpage, cleanup stops the timer.
//
// We will examine the actual timer code
// inside VisitTimer.jsx.

import VisitTimer from './components/VisitTimer.jsx';

// =====================================================
// 6. CREATE A STORAGE KEY
// =====================================================

// localStorage allows a browser to save
// small pieces of information.
//
// Saved information can remain available
// after refreshing or reopening the page.
//
// STORAGE_KEY is the name used to
// identify our saved trip information.
//
// Think of it as a label on a storage box.
//
// IMPORTANT:
//
// This is a regular JavaScript constant,
// not React state.

const STORAGE_KEY = 'dreamtrip-class28';

// =====================================================
// 7. READ PREVIOUSLY SAVED TRIP INFORMATION
// =====================================================

// This function checks whether the browser
// already has saved trip information.
//
// WHAT DOES IT DO?
//
// 1. Looks in localStorage.
// 2. Reads the saved text.
// 3. Converts the text back into JavaScript data.
// 4. Checks that the saved data is usable.
// 5. Returns the data if it is valid.
//
// If nothing is saved, it returns null.
//
// WHAT IS null?
//
// null means no saved information was found
// or the information could not be used.
//
// IMPORTANT:
//
// This function does NOT use useEffect.
//
// It is used when our component first
// creates its state.

function readSavedTrip() {

  // try / catch helps prevent broken saved data
  // from crashing our entire application.

  try {

    // getItem reads information from localStorage.
    //
    // STORAGE_KEY tells the browser
    // which saved information we want.

    const raw = window.localStorage.getItem(STORAGE_KEY);

    // If nothing was saved, return null.

    if (!raw) return null;

    // localStorage saves information as strings.
    //
    // JSON.parse converts the saved JSON text
    // back into a JavaScript object.

    const data = JSON.parse(raw);

    // Check whether our saved destination
    // still exists in the destinations array.
    //
    // .some() returns true if it finds a match.
    //
    // If the destination is missing or invalid,
    // return null instead of using broken data.

    if (
      !data ||
      !destinations.some(
        (place) => place.id === data.selectedId
      )
    ) {
      return null;
    }

    // Array.isArray checks whether
    // packingItems is actually an array.
    //
    // If the saved checklist is missing
    // or is not an array, return null.

    if (!Array.isArray(data.packingItems)) {
      return null;
    }

    // The saved data passed our checks.
    //
    // Return it so React can use it
    // as the starting information.

    return data;

  } catch {

    // If something goes wrong while reading
    // or converting saved information,
    // return null instead of crashing the app.

    return null;
  }
}

// =====================================================
// 8. CREATE OUR MAIN CLASS 28 COMPONENT
// =====================================================

// EffectTripPlanner is our main parent component.
//
// It manages shared trip information.
//
// It also contains useEffect examples.
//
// The child components receive information
// through props, just like Class 27.

export default function EffectTripPlanner() {

  // ===================================================
  // 9. REVIEW: useState AND STARTING VALUES
  // ===================================================

  // FIRST:
  // Read the browser's saved information.
  //
  // useState(readSavedTrip) gives React
  // the FUNCTION to call during initialization.
  //
  // Notice:
  // We are NOT writing readSavedTrip().
  //
  // React calls the function to get
  // the initial saved information.
  //
  // savedAtStart holds the result.
  //
  // We do not need a setter for this value.

  const [savedAtStart] = useState(readSavedTrip);

  // SECOND:
  // Create state for the selected destination.
  //
  // If a valid destination was saved,
  // start with that destination.
  //
  // Otherwise, start with the first destination.
  //
  // ?. is OPTIONAL CHAINING.
  //
  // It safely checks for a property even
  // when savedAtStart is null.
  //
  // ?? is NULLISH COALESCING.
  //
  // It provides a fallback value when
  // the value on the left is null or undefined.

  const [selectedId, setSelectedId] = useState(
    savedAtStart?.selectedId ?? destinations[0].id
  );

  // THIRD:
  // Create state for the packing checklist.
  //
  // We start with the sample checklist.
  //
  // .map() creates a new array.
  //
  // ...item copies each checklist object.
  //
  // If we previously saved whether an item
  // was checked, we use that saved value.
  //
  // Otherwise, we use the sample item's value.
  //
  // This allows the checklist to remember
  // checked items after refreshing.

  const [packingItems, setPackingItems] = useState(() =>
    checklist.map((item) => ({
      ...item,
      done:
        savedAtStart?.packingItems.find(
          (saved) => saved.id === item.id
        )?.done ?? item.done,
    }))
  );

  // FOURTH:
  // Remember whether the timer is visible.
  //
  // false = timer is hidden.
  //
  // true = timer is visible.
  //
  // This state controls whether VisitTimer
  // appears on the webpage.
  //
  // It does not save the timer's visibility
  // to localStorage.

  const [showTimer, setShowTimer] = useState(false);

  // ===================================================
  // 10. FIND THE CURRENT DESTINATION
  // ===================================================

  // selectedId stores the chosen destination ID.
  //
  // .find() gets the matching destination object.
  //
  // Example:
  //
  // selectedId = 'kyoto'
  //
  // selectedPlace = the Kyoto destination object.
  //
  // This is a DERIVED VALUE.
  //
  // We calculate it from existing information,
  // so another useState is not needed.

  const selectedPlace = destinations.find(
    (place) => place.id === selectedId
  );

  // ===================================================
  // 11. REVIEW: UPDATE THE PACKING CHECKLIST
  // ===================================================

  // This function is from our Class 27 lesson.
  //
  // The child PackingChecklist calls this function
  // when someone checks or unchecks an item.
  //
  // id identifies which item was clicked.
  //
  // .map() creates a new array.
  //
  // ...item creates a copy of the matching item.
  //
  // !item.done switches true to false
  // or false to true.
  //
  // setPackingItems requests a state update.
  //
  // Our storage Effect will save that updated
  // checklist after React processes the change.

  function togglePackingItem(id) {
    setPackingItems((previous) =>
      previous.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  }

  // ===================================================
  // 12. FIRST EFFECT: COMPONENT LIFECYCLE
  // ===================================================

  // WHAT IS COMPONENT LIFECYCLE?
  //
  // A component has a beginning and an end.
  //
  // MOUNT:
  // The component appears on the webpage.
  //
  // UPDATE:
  // React renders the component again because
  // its state or props changed.
  //
  // UNMOUNT:
  // The component is removed from the webpage.
  //
  // THIS EFFECT:
  //
  // useEffect(() => {
  //   // Setup code
  //   return () => {
  //     // Cleanup code
  //   };
  // }, []);
  //
  // The empty dependency array [] means
  // this Effect has no changing dependencies.
  //
  // In a normal production mount, React runs
  // the setup when the component mounts.
  //
  // The returned function is the CLEANUP.
  //
  // Cleanup runs when the component unmounts.
  //
  // IMPORTANT:
  // In development, React StrictMode may run
  // an extra setup and cleanup cycle.
  //
  // This is expected behavior.
  //
  // OPEN THE BROWSER CONSOLE TO SEE THE MESSAGES.

  useEffect(() => {
    console.log('APP: mounted');

    return () => console.log('APP: unmounted');
  }, []);

  // ===================================================
  // 13. SECOND EFFECT: UPDATE THE BROWSER TAB TITLE
  // ===================================================

  // This Effect changes the browser tab title
  // when a destination is selected.
  //
  // document.title is a browser feature.
  //
  // It is OUTSIDE React's JSX.
  //
  // DEPENDENCY ARRAY:
  //
  // [selectedPlace.city]
  //
  // This tells React to run the Effect:
  //
  // 1. After the initial mount.
  // 2. When selectedPlace.city changes.
  //
  // EXAMPLE:
  //
  // User selects Kyoto.
  //
  // selectedId changes through useState.
  //
  // selectedPlace changes to Kyoto.
  //
  // React renders the updated webpage.
  //
  // This Effect then changes the tab title to:
  //
  // Dream Trip | Kyoto
  //
  // We do not need a cleanup function here
  // because this example only sets the tab title.

  useEffect(() => {
    document.title = `Dream Trip | ${selectedPlace.city}`;

    console.log(
      'TITLE: selected destination is',
      selectedPlace.city
    );
  }, [selectedPlace.city]);

  // ===================================================
  // 14. THIRD EFFECT: SAVE INFORMATION TO localStorage
  // ===================================================

  // This Effect saves our trip choices.
  //
  // WHAT ARE WE SAVING?
  //
  // selectedId:
  // Which destination is selected.
  //
  // packingItems:
  // Which checklist items are checked.
  //
  // localStorage.setItem() saves information.
  //
  // It receives TWO arguments:
  //
  // 1. STORAGE_KEY
  //    The name of the saved information.
  //
  // 2. JSON.stringify(...)
  //    The information converted into JSON text.
  //
  // WHY JSON.stringify?
  //
  // localStorage saves strings.
  //
  // JSON.stringify converts an object
  // into a string that the browser can store.
  //
  // DEPENDENCY ARRAY:
  //
  // [selectedId, packingItems]
  //
  // React runs this Effect after the initial mount
  // and whenever either dependency changes.
  //
  // EXAMPLE:
  //
  // 1. User checks a packing item.
  // 2. setPackingItems updates React state.
  // 3. React renders the updated checklist.
  // 4. This Effect saves the updated array.
  // 5. Refreshing restores the saved checkbox.
  //
  // IMPORTANT:
  //
  // We do not put localStorage.setItem()
  // directly inside our JSX.
  //
  // We use an Effect to synchronize state
  // with the browser's storage.

  useEffect(() => {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ selectedId, packingItems })
    );

    console.log('STORAGE: saved trip preferences');
  }, [selectedId, packingItems]);

  // ===================================================
  // 15. RESET THE SAVED TRIP CHOICES
  // ===================================================

  // This function restores our original choices.
  //
  // The destination returns to the first option.
  //
  // The checklist returns to the sample values.
  //
  // We only update React state here.
  //
  // The storage Effect above notices
  // the state changes and saves the defaults.
  //
  // IMPORTANT:
  //
  // We do not have to call localStorage.setItem()
  // again inside this function.

  function resetSavedTrip() {
    setSelectedId(destinations[0].id);

    setPackingItems(
      checklist.map((item) => ({ ...item }))
    );
  }

  // ===================================================
  // 16. RETURN THE JSX
  // ===================================================

  // This JSX displays our trip planner.
  //
  // The page includes:
  //
  // - Header and trip introduction.
  // - Effect explanation and timer controls.
  // - Trip length counter.
  // - Destination picker.
  // - Packing checklist.
  // - Sample itinerary.
  //
  // We continue reusing earlier components
  // while adding Class 28 behavior.

  return (
    <div
      className="function-demo state-demo effect-demo"
      id="top"
    >

      {/* ============================================ */}
      {/* 17. HEADER AND HERO COMPONENTS                */}
      {/* ============================================ */}

      {/*
        Header receives the version prop.

        Hero receives the trip object.

        These are examples of props
        from Class 26.
      */}

      <Header version="effect" />

      <main className="page-container">

        <Hero trip={trip} />

        {/* ========================================== */}
        {/* 18. CLASS 28 LESSON INTRODUCTION            */}
        {/* ========================================== */}

        <div className="lesson-strip">
          <strong>
            Class 28 · Effect Hook and Lifecycle
          </strong>

          <span>
            Change a destination, refresh the browser,
            and try the timer.
          </span>
        </div>

        {/* ========================================== */}
        {/* 19. EFFECTS AND TIMER CONTROLS              */}
        {/* ========================================== */}

        {/*
          These buttons help us demonstrate
          the new Class 28 concepts.

          Show timer:
          Adds the VisitTimer component to the page.

          Hide timer:
          Removes the VisitTimer component.

          Reset trip choices:
          Restores the original destination
          and packing checklist.

          Open your browser's Developer Tools
          to view the Console messages.
        */}

        <section
          className="effect-panel"
          aria-labelledby="effect-title"
        >

          <h2 id="effect-title">
            🔄 Effects outside the webpage
          </h2>

          <p>
            <strong>Try this:</strong> pick Kyoto, check
            a packing item, then refresh. Your selections
            should stay.
          </p>

          <div className="effect-actions">

            {/* ====================================== */}
            {/* 20. SHOW OR HIDE THE TIMER              */}
            {/* ====================================== */}

            {/*
              onClick runs when the button is pressed.

              setShowTimer changes the showTimer state.

              previous is the current value
              React provides to the updater function.

              !previous switches the Boolean:

              false -> true
              true -> false

              This is a Class 27 useState review.

              In Class 28, we focus on what happens
              when the timer component appears
              and disappears.
            */}

            <button
              type="button"
              onClick={() =>
                setShowTimer((previous) => !previous)
              }
            >
              {showTimer ? 'Hide timer' : 'Show timer'}
            </button>

            {/* ====================================== */}
            {/* 21. RESET TRIP CHOICES                  */}
            {/* ====================================== */}

            {/*
              Calls resetSavedTrip.

              That function restores the starting
              destination and packing checklist.

              The storage Effect then saves
              those starting values.
            */}

            <button
              type="button"
              onClick={resetSavedTrip}
            >
              Reset trip choices
            </button>

          </div>

          {/* ======================================== */}
          {/* 22. CONDITIONAL TIMER COMPONENT           */}
          {/* ======================================== */}

          {/*
            showTimer && <VisitTimer />

            This is CONDITIONAL RENDERING.

            If showTimer is true:
            React displays VisitTimer.

            If showTimer is false:
            React removes VisitTimer.

            WHY IS THIS IMPORTANT?

            VisitTimer contains a useEffect
            that starts a repeating timer.

            When we remove VisitTimer,
            its cleanup function stops the timer.

            Removing the component is different
            from simply hiding its text.

            This lets us demonstrate
            mounting and unmounting.
          */}

          {showTimer && <VisitTimer />}

          <p className="helper-text">
            Open Developer Tools → Console for mount,
            effect, and cleanup messages.
          </p>

        </section>

        {/* ========================================== */}
        {/* 23. CLASS 27 STATE COMPONENTS               */}
        {/* ========================================== */}

        {/*
          TripLengthCounter manages its own
          number of trip days.

          DestinationPicker receives:
          - destinations: available choices
          - selectedId: the current selection
          - onSelect: the setter from the parent

          When the destination changes,
          the browser-title Effect runs.

          The storage Effect also saves the choice.
        */}

        <div className="state-layout">

          <TripLengthCounter initialDays={4} />

          <DestinationPicker
            destinations={destinations}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

        </div>

        {/* ========================================== */}
        {/* 24. DISPLAY THE SELECTED DESTINATION       */}
        {/* ========================================== */}

        {/*
          selectedPlace comes from selectedId.

          The message updates when
          the destination selection changes.

          This is a React state update.

          The browser tab title changes separately
          because of our useEffect.
        */}

        <p
          className="selection-banner"
          role="status"
        >
          ✈️ You're planning a trip to{' '}
          <strong>
            {selectedPlace.city}, {selectedPlace.country}
          </strong>.
        </p>

        {/* ========================================== */}
        {/* 25. PACKING CHECKLIST                      */}
        {/* ========================================== */}

        {/*
          PackingChecklist receives TWO props:

          items={packingItems}
          The current checklist array.

          onToggle={togglePackingItem}
          A function that updates an item.

          When a checkbox changes:

          1. The child calls onToggle.
          2. The parent updates packingItems.
          3. React displays the updated checklist.
          4. The storage Effect saves the new choices.

          This connects Class 27 and Class 28.
        */}

        <div className="state-layout state-layout--lower">

          <PackingChecklist
            items={packingItems}
            onToggle={togglePackingItem}
          />

          {/* ======================================== */}
          {/* 26. PREVIEW OF CLASS 29                   */}
          {/* ======================================== */}

          <section className="state-panel">
            <div className="state-panel__intro">

              <span className="state-kicker">
                NEXT: CLASS 29
              </span>

              <h2>
                🗺️ Trip activities
              </h2>

              <p>
                Today's itinerary is still read-only.
                In Class 29, reducers will add, remove,
                and move activities.
              </p>

            </div>
          </section>

        </div>

        {/* ========================================== */}
        {/* 27. REVIEW OF CLASS 26 ITINERARY           */}
        {/* ========================================== */}

        {/*
          The itinerary is still STATIC.

          .map() creates one DayPlan
          component for each day.

          Each DayPlan receives the day prop.

          The displayed Lisbon sample itinerary
          does not change when the user
          selects another destination.

          We will make itinerary editing
          interactive in Class 29.
        */}

        <section
          className="content-section plan-section"
          id="itinerary"
          aria-labelledby="itinerary-heading"
        >

          <div className="section-heading">
            <div>

              <span className="eyebrow">
                CLASS 26 REVIEW
              </span>

              <h2 id="itinerary-heading">
                Lisbon sample itinerary
              </h2>

              <p>
                These sample activities do not change
                when the selected destination changes.
              </p>

            </div>
          </div>

          <div className="day-grid">
            {itinerary.map((day) => (
              <DayPlan
                key={day.id}
                day={day}
              />
            ))}
          </div>

        </section>

      </main>

      {/* ============================================ */}
      {/* 28. FOOTER                                  */}
      {/* ============================================ */}

      <footer className="app-footer page-container">
        Code 401 · Class 28 · useEffect and component lifecycle
      </footer>

    </div>
  );
}
 