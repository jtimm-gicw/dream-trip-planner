
/*
=======================================================
CLASS 28 REVIEW — UNDERSTANDING CLASS 27 STATE
=======================================================

FILE: src/class27/StateTripPlanner.jsx

PURPOSE:
This is the MAIN PARENT COMPONENT for our Class 27
interactive trip planner.

We are reviewing it during Class 28 to understand
the difference between useState and useEffect.

CLASS 27 — useState:
React remembers information while a component
is running and updates the screen when it changes.

CLASS 28 — useEffect:
React can synchronize with outside systems,
such as localStorage and the browser tab title.

IMPORTANT:
This file only demonstrates useState.

It does NOT use useEffect to save information.

If you refresh this page, the state returns
to its original starting values.

That is expected behavior.

To see how choices are saved after refreshing,
open src/EffectTripPlanner.jsx instead.

MAIN IDEAS TO REVIEW:
1. A parent component can own shared state.
2. Props send information to child components.
3. Children can call functions passed as props.
4. Setter functions request state updates.
5. Arrays and objects should be copied when updated.
*/

// =====================================================
// 1. IMPORT THE useState HOOK
// =====================================================

// useState is a React Hook.
//
// It allows a component to remember values
// between renders.
//
// A render happens when React runs a component
// to determine what should appear on the page.
//
// When state changes, React renders again.
//
// CLASS 28 CONNECTION:
//
// useState updates information inside React.
//
// useEffect can synchronize that information
// with things outside React, such as localStorage.

import { useState } from 'react';

// =====================================================
// 2. IMPORT OUR CLASS 26 COMPONENTS
// =====================================================

// These components were introduced in Class 26.
//
// Header:
// Displays the navigation area.
//
// Hero:
// Displays the trip introduction.
//
// DayPlan:
// Displays information for one itinerary day.
//
// We can reuse these components because
// React components are designed to be reusable.

import Header from '../function-components/Header.jsx';
import Hero from '../function-components/Hero.jsx';
import DayPlan from '../function-components/DayPlan.jsx';

// =====================================================
// 3. IMPORT OUR SAMPLE TRAVEL DATA
// =====================================================

// trip:
// General information about the trip.
//
// destinations:
// An array containing places to visit.
//
// itinerary:
// An array containing sample daily activities.
//
// checklist:
// An array containing packing items.
//
// These are starting values imported from
// our JavaScript data file.

import {
  trip,
  destinations,
  itinerary,
  checklist,
} from '../data/tripData.js';

// =====================================================
// 4. IMPORT OUR CLASS 27 CHILD COMPONENTS
// =====================================================

// Each child component has a different job.
//
// TripLengthCounter:
// Remembers and changes the number of days.
//
// DestinationPicker:
// Displays destinations and lets users select one.
//
// PackingChecklist:
// Displays packing items and handles checkbox clicks.
//
// TravelerCounterTwoStates:
// Uses TWO separate useState Hooks.
//
// TripPreferencesObject:
// Stores related preferences in ONE state object.
//
// These components help us review how
// state and props work together.

import TripLengthCounter from './components/TripLengthCounter.jsx';
import DestinationPicker from './components/DestinationPicker.jsx';
import PackingChecklist from './components/PackingChecklist.jsx';
import TravelerCounterTwoStates from './components/TravelerCounterTwoStates.jsx';
import TripPreferencesObject from './components/TripPreferencesObject.jsx';

// =====================================================
// 5. CREATE OUR MAIN PARENT COMPONENT
// =====================================================

// StateTripPlanner organizes our Class 27 page.
//
// It is a PARENT because it displays
// several child components.
//
// It receives one optional prop:
//
// counterMode
//
// counterMode decides which traveler
// preferences component to show.
//
// 'two':
// Show the version using two state variables.
//
// 'object':
// Show the version using one state object.
//
// The default is 'object'.
//
// In main.jsx:
//
// ?demo=state-two uses counterMode="two"
//
// ?demo=state uses counterMode="object"

export default function StateTripPlanner({
  counterMode = 'object',
}) {

  // ===================================================
  // 6. STATE #1 — REMEMBER THE SELECTED DESTINATION
  // ===================================================

  // We use useState to remember which
  // destination the user selected.
  //
  // selectedId:
  // The currently selected destination ID.
  //
  // setSelectedId:
  // The setter function used to change it.
  //
  // destinations[0].id:
  // The ID of the FIRST destination in our array.
  //
  // This is the STARTING VALUE.
  //
  // EXAMPLE:
  //
  // The app starts with Lisbon selected.
  //
  // User clicks Kyoto.
  //
  // The child calls setSelectedId('kyoto').
  //
  // React remembers the new selection
  // and displays Kyoto.
  //
  // CLASS 28 CONNECTION:
  //
  // This component does NOT save selectedId
  // to browser storage.
  //
  // Refreshing starts the state over again.
  //
  // EffectTripPlanner.jsx demonstrates
  // how useEffect can save the choice.

  const [selectedId, setSelectedId] = useState(
    destinations[0].id
  );

  // ===================================================
  // 7. STATE #2 — REMEMBER THE PACKING CHECKLIST
  // ===================================================

  // This state contains an ARRAY of objects.
  //
  // Each packing item contains information
  // such as:
  //
  // {
  //   id: 1,
  //   label: 'Pack a carry-on bag',
  //   done: false
  // }
  //
  // packingItems:
  // The current checklist array.
  //
  // setPackingItems:
  // The function used to update the array.
  //
  // We start with checklist from tripData.js.
  //
  // .map() creates a NEW array.
  //
  // { ...item } copies each item object.
  //
  // WHY COPY THE DATA?
  //
  // React state should not be changed directly.
  //
  // We create new arrays and objects when
  // updating state.
  //
  // useState(() => ...)
  //
  // The function passed to useState creates
  // the starting checklist when React initializes
  // this component's state.
  //
  // This is called LAZY INITIALIZATION.
  //
  // CLASS 28 CONNECTION:
  //
  // This array is not saved to localStorage.
  //
  // The checklist returns to its sample values
  // after refreshing the browser.

  const [packingItems, setPackingItems] = useState(() =>
    checklist.map((item) => ({ ...item }))
  );

  // ===================================================
  // 8. CALCULATE THE CURRENT DESTINATION
  // ===================================================

  // selectedId contains only the ID.
  //
  // We use .find() to locate the full
  // destination object in our array.
  //
  // EXAMPLE:
  //
  // selectedId = 'kyoto'
  //
  // .find() returns the Kyoto object.
  //
  // selectedPlace.city:
  // The selected destination's city.
  //
  // selectedPlace.country:
  // The selected destination's country.
  //
  // This is called a DERIVED VALUE.
  //
  // A derived value is information calculated
  // from information we already have.
  //
  // We do not need another useState
  // for the city or country.
  //
  // CLASS 28 CONNECTION:
  //
  // EffectTripPlanner.jsx uses this same
  // selectedPlace information to update
  // the browser tab title with useEffect.

  const selectedPlace = destinations.find(
    (place) => place.id === selectedId
  );

  // ===================================================
  // 9. FUNCTION TO UPDATE A PACKING ITEM
  // ===================================================

  // This function runs when the user
  // checks or unchecks a packing item.
  //
  // It receives one PARAMETER:
  //
  // id:
  // The ID of the packing item clicked.
  //
  // EXAMPLE:
  //
  // togglePackingItem(3)
  //
  // This means:
  //
  // "Find the packing item with ID 3
  //  and change its checked status."
  //
  // setPackingItems requests an update.
  //
  // previousItems is the existing checklist
  // React provides to our updater function.
  //
  // .map() creates a new array.
  //
  // item.id === id:
  // Checks whether this is the clicked item.
  //
  // If it matches:
  //
  // { ...item, done: !item.done }
  //
  // Copies the item and reverses its done value.
  //
  // true becomes false.
  // false becomes true.
  //
  // If it does not match:
  // Keep the item unchanged.
  //
  // This is an IMMUTABLE UPDATE:
  //
  // We create new data instead of
  // directly changing the old state.
  //
  // CLASS 28 CONNECTION:
  //
  // In EffectTripPlanner.jsx, a useEffect
  // watches packingItems and saves changes
  // to localStorage.

  function togglePackingItem(id) {
    setPackingItems((previousItems) =>
      previousItems.map((item) =>
        item.id === id
          ? { ...item, done: !item.done }
          : item
      )
    );
  }

  // ===================================================
  // 10. RETURN THE WEBPAGE
  // ===================================================

  // Our JSX displays the page.
  //
  // We pass state and functions
  // to child components through props.
  //
  // When state changes, React updates
  // the displayed information.

  return (
    <div
      className="function-demo state-demo"
      id="top"
    >

      {/* ============================================ */}
      {/* 11. HEADER AND HERO — CLASS 26 REVIEW        */}
      {/* ============================================ */}

      {/*
        Header receives a version prop.

        Hero receives the trip object.

        Both display information from props.
      */}

      <Header version="state" />

      <main className="page-container">

        <Hero trip={trip} />

        {/* ========================================== */}
        {/* 12. CLASS 27 LESSON MESSAGE                 */}
        {/* ========================================== */}

        <div className="lesson-strip">
          <strong>
            Class 27 · State Hook
          </strong>

          <span>
            Try the controls: the screen updates
            without refreshing.
          </span>
        </div>

        {/* ========================================== */}
        {/* 13. TRIP LENGTH AND DESTINATION PICKER     */}
        {/* ========================================== */}

        {/*
          TripLengthCounter manages its OWN state.

          The parent passes initialDays={4}.

          The counter remembers its current
          number using useState.

          DestinationPicker works differently.

          The parent owns selectedId state
          because another part of the page
          also needs the selected destination.

          We pass THREE props to DestinationPicker:

          destinations:
          The available places.

          selectedId:
          The current selection from state.

          onSelect:
          A function the child calls to request
          a different destination.

          onSelect={setSelectedId} passes
          the parent's setter as a prop.

          This is called LIFTING STATE UP:
          Shared state lives in a common parent.
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
        {/* 14. DISPLAY THE SELECTED DESTINATION       */}
        {/* ========================================== */}

        {/*
          This message displays information
          from selectedPlace.

          When selectedId changes,
          React calculates selectedPlace again.

          The city and country then update.

          CLASS 28 CONNECTION:

          Updating this message happens
          through regular React rendering.

          We do not need useEffect for it.

          We use useEffect only when synchronizing
          with an outside system, such as
          changing document.title.
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
        {/* 15. PACKING CHECKLIST                      */}
        {/* ========================================== */}

        {/*
          PackingChecklist receives TWO props:

          items:
          The current packingItems state array.

          onToggle:
          The function used to request changes.

          When the user clicks a checkbox:

          1. PackingChecklist calls onToggle(item.id).
          2. The parent runs togglePackingItem.
          3. setPackingItems updates React state.
          4. React displays the updated checklist.

          CLASS 28 CONNECTION:

          On the Class 28 page, useEffect
          saves the updated checklist
          after state changes.
        */}

        <div className="state-layout state-layout--lower">

          <PackingChecklist
            items={packingItems}
            onToggle={togglePackingItem}
          />

          {/* ======================================== */}
          {/* 16. COMPARE TWO WAYS TO STORE STATE      */}
          {/* ======================================== */}

          {/*
            This is CONDITIONAL RENDERING.

            We choose between two components.

            If counterMode is 'two':
            Display TravelerCounterTwoStates.

            Otherwise:
            Display TripPreferencesObject.

            VERSION A:
            Two separate useState values.

            VERSION B:
            One useState containing an object.

            Both components manage their
            own traveler preference state.

            IMPORTANT:
            Switching demos using the URL
            loads a different component tree.

            Local state resets when a component
            is newly mounted.
          */}

          {counterMode === 'two' ? (
            <TravelerCounterTwoStates
              initialTravelers={trip.travelers}
            />
          ) : (
            <TripPreferencesObject
              initialTravelers={trip.travelers}
            />
          )}

        </div>

        {/* ========================================== */}
        {/* 17. SAMPLE ITINERARY — CLASS 26 REVIEW     */}
        {/* ========================================== */}

        {/*
          The itinerary is still STATIC.

          itinerary is an array containing
          the sample travel days.

          .map() creates one DayPlan
          component for each day.

          Each DayPlan receives a day prop.

          Changing the selected destination
          does not change these sample activities.

          In Class 29, we will learn
          how useReducer can manage more
          complex itinerary changes.
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
                This itinerary still displays static props.
                Editing activities is saved for Class 29.
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
      {/* 18. FOOTER                                  */}
      {/* ============================================ */}

      <footer className="app-footer page-container">
        Code 401 · Class 27 · useState and React Testing Library
      </footer>

    </div>
  );
}
