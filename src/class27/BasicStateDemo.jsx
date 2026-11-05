
/*
=======================================================
CLASS 27 — INTRODUCTION TO REACT useState
=======================================================

FILE: BasicStateDemo.jsx

PURPOSE:
This file introduces React state using a simple
trip length counter.

In Class 26, we learned:
- How to create function components.
- How to pass information using props.
- How to display lists using .map().

In Class 27, we are learning:
- What state is.
- How useState remembers information.
- How buttons can update state.
- How props and state work together.

IMPORTANT:
BasicStateDemo is the PARENT component.

TripLengthCounter is the CHILD component that
uses useState to remember the number of days.

The parent gives the child its STARTING value.
The child manages changes to that value.
*/

// =====================================================
// 1. IMPORT OUR REUSABLE COMPONENTS
// =====================================================

// These components were introduced in Class 26.
//
// We can reuse them without rewriting their code.
//
// Header = displays the navigation area.
// Hero = displays the main trip introduction.
// DestinationCard = displays one destination.

import Header from '../function-components/Header.jsx';
import Hero from '../function-components/Hero.jsx';
import DestinationCard from '../function-components/DestinationCard.jsx';

// =====================================================
// 2. IMPORT OUR TRAVEL DATA
// =====================================================

// trip is an object containing trip information.
//
// destinations is an array containing
// information about different destinations.
//
// We will pass this information to child components.

import { trip, destinations } from '../data/tripData.js';

// =====================================================
// 3. IMPORT OUR NEW CLASS 27 COMPONENT
// =====================================================

// TripLengthCounter is our NEW interactive component.
//
// It uses the useState Hook to remember
// how many days a trip will last.
//
// We do not need to import useState in this file.
// The counter manages its own state internally.

import TripLengthCounter from './components/TripLengthCounter.jsx';

// =====================================================
// 4. CREATE OUR MAIN PARENT COMPONENT
// =====================================================

// BasicStateDemo is a function component.
//
// It organizes the different sections of the page.
//
// It is the PARENT of TripLengthCounter because
// it includes the counter in its JSX.

export default function BasicStateDemo() {

  // ===================================================
  // 5. RETURN THE WEBPAGE
  // ===================================================

  // This component returns JSX that tells React
  // which elements and components to display.

  return (
    <div className="function-demo state-demo" id="top">

      {/* ============================================ */}
      {/* 6. HEADER — REVIEW OF PROPS                   */}
      {/* ============================================ */}

      {/*
        PARENT: BasicStateDemo
        CHILD: Header

        PROP NAME: version
        PROP VALUE: "state-basic"

        We send the text "state-basic" to Header.

        The Header component can use this information
        to display the correct navigation or version.

        This is the same props pattern from Class 26.
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

          The parent passes the travel information
          to Hero so the child can display it.

          Remember:

          <Hero trip={trip} />

          LEFT SIDE: name of the prop
          RIGHT SIDE: JavaScript information being sent
        */}

        <Hero trip={trip} />

        {/* ========================================== */}
        {/* 8. LESSON INTRODUCTION                     */}
        {/* ========================================== */}

        {/*
          This is a simple message for students.

          It explains what we are practicing today:

          One component.
          One state value.
          Two buttons.

          The buttons will allow us to change
          the number of days displayed.
        */}

        <div className="lesson-strip">
          <strong>Class 27 · Checkpoint 1</strong>

          <span>
            One component, one state value, two buttons.
          </span>
        </div>

        {/* ========================================== */}
        {/* 9. OUR FIRST INTERACTIVE COMPONENT         */}
        {/* ========================================== */}

        {/*
          THIS IS THE MAIN CLASS 27 EXAMPLE!

          PARENT: BasicStateDemo
          CHILD: TripLengthCounter

          PROP NAME: initialDays
          PROP VALUE: 4

          We are telling TripLengthCounter:

          "Start with a trip that lasts 4 days."

          The number 4 is passed to the child as a prop.

          Inside TripLengthCounter.jsx, the component
          can use that value to create its own state:

          const [days, setDays] = useState(initialDays);

          WHAT DOES THAT MEAN?

          initialDays = starting value from the parent

          days = the current number React remembers

          setDays = the function used to update days

          useState(initialDays) = creates state
          using the starting number

          IMPORTANT DIFFERENCE:

          The prop provides the INITIAL value.

          The counter uses STATE to remember changes
          when the user clicks its buttons.

          For example:

          Starting value: 4

          Click the + button.

          New state value: 5

          React displays 5 days.

          BasicStateDemo does not manage the count.

          TripLengthCounter manages its own state.
        */}

        <TripLengthCounter initialDays={4} />

        {/* ========================================== */}
        {/* 10. REVIEW CLASS 26 DESTINATION COMPONENTS */}
        {/* ========================================== */}

        {/*
          These destination cards are still STATIC.

          They receive information through props.

          They do not manage changing information
          in this demonstration.

          This lets us compare:

          DestinationCard = displays props

          TripLengthCounter = receives a prop
          AND manages its own state
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
          {/* 11. DISPLAY DESTINATIONS USING .map()     */}
          {/* ======================================== */}

          {/*
            destinations is an array.

            .map() goes through each destination
            one item at a time.

            For each destination, we display
            a DestinationCard component.

            PROP NAME: destination

            PROP VALUE: the current destination object

            KEY: destination.id

            key helps React identify each item
            in the list.

            This is review from Class 26.
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
