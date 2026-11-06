
/*
=======================================================
CLASS 28 REVIEW — CLASS 27 useState BASICS
=======================================================

FILE: src/class27/BasicStateDemo.jsx

PURPOSE:
This component is our first simple example
of React state from Class 27.

We are reviewing it during Class 28 to understand
what useState does BEFORE learning useEffect.

WHAT DID WE LEARN IN CLASS 27?

1. A function component displays JSX.
2. Props pass information from parent to child.
3. useState remembers changing information.
4. Setter functions update state.
5. React updates the screen when state changes.

WHAT ARE WE LEARNING IN CLASS 28?

useEffect allows React to work with outside
systems, such as:

- Browser localStorage.
- The browser tab title.
- Browser timers.

IMPORTANT:

This file does NOT use useEffect.

It organizes the page and displays child
components from earlier lessons.

The TripLengthCounter child handles the
changing number of days.

This helps us compare:

useState = remembers changing information.

useEffect = synchronizes with outside systems.

NOTE:
The counter only resets after a refresh if its
own component has no browser-storage feature.
*/

// =====================================================
// 1. IMPORT OUR CLASS 26 COMPONENTS
// =====================================================

// These were introduced in Class 26.
//
// Header:
// Displays the navigation area at the top.
//
// Hero:
// Displays the main trip introduction.
//
// DestinationCard:
// Displays information about one destination.
//
// We reuse these components because we do not
// need to write the same JSX again.

import Header from '../function-components/Header.jsx';
import Hero from '../function-components/Hero.jsx';
import DestinationCard from '../function-components/DestinationCard.jsx';

// =====================================================
// 2. IMPORT OUR SAMPLE TRIP DATA
// =====================================================

// trip is a JavaScript object containing
// information about the planned trip.
//
// destinations is an array of destination objects.
//
// We pass this information to child components
// using props.
//
// REVIEW:
//
// Props are information a parent component
// sends to a child component.
//
// Props are read-only to the receiving child.

import { trip, destinations } from '../data/tripData.js';

// =====================================================
// 3. IMPORT OUR CLASS 27 COUNTER COMPONENT
// =====================================================

// TripLengthCounter is our interactive component.
//
// It receives the starting number of days
// from this parent.
//
// The counter manages its own state using useState.
//
// CLASS 28 CONNECTION:
//
// If TripLengthCounter uses only useState,
// its number resets after refreshing.
//
// If TripLengthCounter was updated to use
// localStorage and useEffect, its saved number
// can be restored after refreshing.
//
// The saving behavior belongs to the counter,
// not to BasicStateDemo.jsx.

import TripLengthCounter from './components/TripLengthCounter.jsx';

// =====================================================
// 4. CREATE OUR PARENT FUNCTION COMPONENT
// =====================================================

// BasicStateDemo is the PARENT component.
//
// It organizes our webpage.
//
// It displays other components inside its JSX.
//
// The parent passes information to children
// through props.
//
// IMPORTANT:
//
// BasicStateDemo does not manage the trip counter's
// state directly.
//
// TripLengthCounter manages its own days value.

export default function BasicStateDemo() {

  // ===================================================
  // 5. RETURN THE WEBPAGE
  // ===================================================

  // The return statement describes the webpage.
  //
  // React uses this JSX to display:
  //
  // - The navigation header.
  // - The trip introduction.
  // - The interactive day counter.
  // - The destination cards.
  //
  // The page mixes reusable components from
  // Class 26 with state-based features from Class 27.

  return (
    <div
      className="function-demo state-demo"
      id="top"
    >

      {/* ============================================ */}
      {/* 6. HEADER — REVIEW PASSING PROPS              */}
      {/* ============================================ */}

      {/*
        PARENT: BasicStateDemo
        CHILD: Header

        PROP NAME: version
        PROP VALUE: "state-basic"

        We send the text "state-basic" to Header.

        This allows Header to identify which
        demo version is being displayed.

        This is the same parent-to-child
        props pattern from Class 26.
      */}

      <Header version="state-basic" />

      <main className="page-container">

        {/* ========================================== */}
        {/* 7. HERO — PASSING AN OBJECT AS A PROP       */}
        {/* ========================================== */}

        {/*
          PARENT: BasicStateDemo
          CHILD: Hero

          PROP NAME: trip
          PROP VALUE: the imported trip object

          In this JSX:

          <Hero trip={trip} />

          LEFT SIDE:
          trip is the prop name.

          RIGHT SIDE:
          {trip} is the JavaScript object being sent.

          The Hero component receives the object
          and uses its properties to display
          information about the trip.
        */}

        <Hero trip={trip} />

        {/* ========================================== */}
        {/* 8. CLASS 27 LESSON INTRODUCTION             */}
        {/* ========================================== */}

        {/*
          This is a simple message reminding
          students what Class 27 introduced.

          One component.
          One state value.
          Two buttons.

          The counter demonstrates how React
          remembers a value and updates it
          after a user clicks a button.

          CLASS 28 CONNECTION:

          Updating the counter on screen does not
          require useEffect.

          useEffect becomes useful when we want
          to synchronize with an outside system,
          such as saving the number to localStorage.
        */}

        <div className="lesson-strip">
          <strong>
            Class 27 · Checkpoint 1
          </strong>

          <span>
            One component, one state value, two buttons.
          </span>
        </div>

        {/* ========================================== */}
        {/* 9. TRIP LENGTH COUNTER                      */}
        {/* ========================================== */}

        {/*
          THIS IS THE MAIN CLASS 27 EXAMPLE.

          PARENT: BasicStateDemo
          CHILD: TripLengthCounter

          PROP NAME: initialDays
          PROP VALUE: 4

          The parent tells the child:

          "Start the trip at 4 days."

          Inside TripLengthCounter.jsx, the child
          can create state with:

          const [days, setDays] = useState(initialDays);

          WHAT DOES EACH PART MEAN?

          initialDays:
          Starting value received through props.

          days:
          The current number React remembers.

          setDays:
          The setter function used to update days.

          EXAMPLE:

          Starting number: 4 days.

          User clicks the + button.

          The child calls setDays.

          React remembers the new number.

          The webpage displays 5 days.

          IMPORTANT:

          This parent does not call setDays.

          TripLengthCounter owns its own state.

          CLASS 28 CONNECTION:

          By itself, useState does not save the number
          between browser refreshes.

          Saving requires another mechanism,
          such as localStorage.

          A useEffect can save the current number
          whenever the days state changes.
        */}

        <TripLengthCounter initialDays={4} />

        {/* ========================================== */}
        {/* 10. DESTINATIONS — CLASS 26 REVIEW          */}
        {/* ========================================== */}

        {/*
          These destination cards display
          information received through props.

          The cards do not manage changing state
          in this demonstration.

          This lets us compare two ideas:

          DestinationCard:
          Displays information sent through props.

          TripLengthCounter:
          Receives a prop AND manages state.

          CLASS 28 CONNECTION:

          Neither feature requires useEffect
          just to display its information.

          useEffect is for synchronizing with
          something outside React.
        */}

        <section
          className="content-section"
          aria-labelledby="basic-ideas"
        >

          <div className="section-heading">
            <div>

              <span className="eyebrow">
                REVIEW FROM CLASS 26
              </span>

              <h2 id="basic-ideas">
                Destination components
              </h2>

              <p>
                These cards still receive props
                and do not change.
              </p>

            </div>
          </div>

          {/* ======================================== */}
          {/* 11. DISPLAY DESTINATIONS WITH .map()      */}
          {/* ======================================== */}

          {/*
            destinations is an array.

            .map() goes through each destination
            one item at a time.

            For each destination, we create
            one DestinationCard component.

            PROP NAME:
            destination

            PROP VALUE:
            The current destination object.

            For example:

            <DestinationCard
              key={destination.id}
              destination={destination}
            />

            key={destination.id} gives React
            a unique identifier for the item.

            key helps React track elements
            when displaying lists.

            The child receives destination
            as a normal prop, but key is
            handled separately by React.

            This is a review of Class 26.
        */}

          <div className="destination-grid">
            {destinations.map((destination) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
              />
            ))}
          </div>

        </section>

      </main>

      {/* ============================================ */}
      {/* 12. FOOTER                                  */}
      {/* ============================================ */}

      <footer className="app-footer page-container">
        Code 401 · Class 27 · Step 1: useState basics
      </footer>

    </div>
  );
}
