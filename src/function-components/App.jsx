
/*
  =====================================================
  CLASS 26 — FUNCTION COMPONENTS AND PROPS
  =====================================================

  This is our MAIN PARENT COMPONENT.

  A component is a reusable part of a webpage.

  A PARENT component uses other components.
  A CHILD component is used inside a parent.

  PROPS are information passed from a parent
  component to a child component.

  Think of props like handing information to
  another person so they can do their job.

  This file:
  1. Imports our travel information.
  2. Imports the child components.
  3. Passes information to those components.
  4. Organizes everything on the webpage.
*/

// =====================================================
// 1. IMPORT OUR TRAVEL DATA
// =====================================================

// We import information from tripData.js.
//
// trip         = general information about our trip
// destinations = a list of places to visit
// itinerary    = a list of daily travel plans
// checklist    = a list of items to pack
//
// These are JavaScript objects and arrays.
// We will pass this information to child components.

import {
  trip,
  destinations,
  itinerary,
  checklist,
} from '../data/tripData.js';

// =====================================================
// 2. IMPORT OUR CHILD COMPONENTS
// =====================================================

// Each child component displays a different
// section of our webpage.
//
// Header          = top navigation area
// Hero            = main trip introduction
// DestinationCard = information about one place
// DayPlan         = activities for one day
// Checklist       = list of things to pack
//
// We import them so we can use them in our JSX.

import Header from './Header.jsx';
import Hero from './Hero.jsx';
import DestinationCard from './DestinationCard.jsx';
import DayPlan from './DayPlan.jsx';
import Checklist from './Checklist.jsx';

// =====================================================
// 3. MAIN PARENT COMPONENT
// =====================================================

// This is a FUNCTION COMPONENT.
//
// A function component is a JavaScript function
// that returns JSX.
//
// JSX looks like HTML but is written in JavaScript.
//
// FunctionTripPlanner is the parent because it
// displays and organizes our child components.

export default function FunctionTripPlanner() {

  // ===================================================
  // 4. RETURN OUR WEBPAGE
  // ===================================================

  // The return statement contains our JSX.
  //
  // Every component placed inside this JSX
  // becomes part of the webpage.
  //
  // The outer div holds the entire app.

  return (
    <div className="function-demo" id="top">

      {/* ============================================ */}
      {/* 5. HEADER COMPONENT                          */}
      {/* ============================================ */}

      {/*
        PARENT: FunctionTripPlanner
        CHILD:  Header

        PROP BEING PASSED:
        version="functions"

        PROP NAME: version
        PROP VALUE: "functions"

        We are sending the text "functions"
        from the parent to the Header child.

        Inside Header.jsx, it can be received as:

        function Header({ version }) {
          // Use version here.
        }

        IMPORTANT:
        Text inside quotation marks is a string.
      */}

      <Header version="functions" />

      {/* ============================================ */}
      {/* 6. MAIN PAGE CONTENT                        */}
      {/* ============================================ */}

      {/*
        <main> contains the main content of our page.

        className connects JSX elements to
        our CSS or SCSS styling.

        className is NOT a prop being passed
        to one of our custom React components here.
        It is an attribute on an HTML element.
      */}

      <main className="page-container">

        {/* ========================================== */}
        {/* 7. HERO COMPONENT                          */}
        {/* ========================================== */}

        {/*
          PARENT: FunctionTripPlanner
          CHILD:  Hero

          PROP BEING PASSED:
          trip={trip}

          PROP NAME: trip
          PROP VALUE: the trip object from tripData.js

          The word on the LEFT is the prop name.
          The word inside { } is the JavaScript data.

          Inside Hero.jsx, the child can receive it:

          function Hero({ trip }) {
            // Now the child can read trip information.
          }

          For example, if the object contains a
          property named title, the child can use:

          trip.title

          This is how data moves from
          a parent to a child.
        */}

        <Hero trip={trip} />

        {/* ========================================== */}
        {/* 8. DESTINATIONS SECTION                    */}
        {/* ========================================== */}

        {/*
          This section contains our destination cards.

          The heading introduces the list of places.

          aria-labelledby connects the section
          to its heading for screen readers.
        */}

        <section
          className="content-section"
          aria-labelledby="destinations-heading"
        >

          <div className="section-heading">
            <div>
              <span className="eyebrow">
                01 / GET INSPIRED
              </span>

              <h2 id="destinations-heading">
                Where to next?
              </h2>

              <p>
                Three amazing destinations to start
                dreaming about.
              </p>
            </div>

            <span className="section-count">
              3 ideas
            </span>
          </div>

          {/* ======================================== */}
          {/* 9. DESTINATION CARDS AND PROPS            */}
          {/* ======================================== */}

          {/*
            destinations is an ARRAY.

            An array holds a list of items.

            We use .map() to go through the list
            one destination at a time.

            For EACH destination, we create
            one DestinationCard component.

            PARENT: FunctionTripPlanner
            CHILD:  DestinationCard

            PROP BEING PASSED:
            destination={destination}

            PROP NAME: destination
            PROP VALUE: the current destination object

            Inside DestinationCard.jsx:

            function DestinationCard({ destination }) {
              // Read the destination information here.
            }

            For example, the child could display:

            destination.city
            destination.country

            KEY:
            key={destination.id}

            React uses key to identify each card
            in the list.

            A key is special information used by React.
            The child does not receive it as a normal prop.

            IMPORTANT:
            We write ONE DestinationCard component.
            .map() lets us reuse it for every destination.
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

        {/* ========================================== */}
        {/* 10. ITINERARY SECTION                      */}
        {/* ========================================== */}

        {/*
          An itinerary is a day-by-day travel plan.

          This section displays:
          1. Daily activities
          2. A packing checklist

          We use child components to display both.
        */}

        <section
          className="content-section plan-section"
          id="itinerary"
          aria-labelledby="itinerary-heading"
        >

          <div className="section-heading">
            <div>
              <span className="eyebrow">
                02 / MAKE A PLAN
              </span>

              <h2 id="itinerary-heading">
                Your Lisbon itinerary
              </h2>

              <p>
                A sample plan organized by day —
                ready to customize in upcoming classes.
              </p>
            </div>
          </div>

          <div className="plan-grid">

            {/* ====================================== */}
            {/* 11. DAILY PLAN COMPONENTS               */}
            {/* ====================================== */}

            {/*
              itinerary is an ARRAY of day objects.

              We use .map() to visit every day.

              For each day, we create a DayPlan.

              PARENT: FunctionTripPlanner
              CHILD:  DayPlan

              PROP BEING PASSED:
              day={day}

              PROP NAME: day
              PROP VALUE: one day object from the array

              Inside DayPlan.jsx:

              function DayPlan({ day }) {
                // Display information for this day.
              }

              The key={day.id} gives React a
              unique identifier for each item.

              This is the same pattern used
              for our destination cards.
            */}

            <div className="day-grid">
              {itinerary.map((day) => (
                <DayPlan
                  key={day.id}
                  day={day}
                />
              ))}
            </div>

            {/* ====================================== */}
            {/* 12. CHECKLIST COMPONENT                 */}
            {/* ====================================== */}

            {/*
              PARENT: FunctionTripPlanner
              CHILD:  Checklist

              PROP BEING PASSED:
              items={checklist}

              PROP NAME: items
              PROP VALUE: the checklist array

              Notice the names are DIFFERENT!

              The parent has data named "checklist".
              The child receives a prop named "items".

              Inside Checklist.jsx:

              function Checklist({ items }) {
                // Use items to display the list.
              }

              The prop name does NOT have to match
              the original variable name.

              The important part is that the child
              uses the prop name sent by the parent.
            */}

            <Checklist items={checklist} />

          </div>
        </section>

      </main>

      {/* ============================================ */}
      {/* 13. FOOTER                                  */}
      {/* ============================================ */}

      {/*
        The footer displays information at
        the bottom of our webpage.

        These are regular HTML elements.

        We are not passing custom props here.
      */}

      <footer className="app-footer page-container">
        <span>✈️ Dream Trip Planner</span>

        <span>
          Code 401 · Class 26 · React Function Components + SCSS
        </span>
      </footer>

    </div>
  );
}
