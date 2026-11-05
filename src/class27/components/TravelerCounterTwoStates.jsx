
/*
=======================================================
CLASS 27 — MANAGING TWO STATE VARIABLES
=======================================================

FILE: TravelerCounterTwoStates.jsx

PURPOSE:
This component allows users to:
1. Increase or decrease the number of travelers.
2. Choose a travel style.
3. Reset both preferences to their starting values.

WHAT ARE WE LEARNING?

In our first useState example, we remembered
ONE value: the number of days.

Now we will remember TWO different values:

1. travelers   = how many people are traveling
2. travelStyle = what type of trip they prefer

Each value has its own useState Hook.

IMPORTANT:
One component can use useState more than once.

We do not need a separate component for
every piece of information we want to remember.
*/

// =====================================================
// 1. IMPORT THE useState HOOK
// =====================================================

// useState allows React to remember changing
// information between renders.
//
// When we call a setter function, React schedules
// an update and displays the new information.

import { useState } from 'react';

// =====================================================
// 2. CREATE OUR FUNCTION COMPONENT
// =====================================================

// TravelerCounterTwoStates is a child component.
//
// It receives ONE prop from its parent:
//
// initialTravelers = the starting number of travelers
//
// The "= 2" provides a default value.
//
// If the parent does not send initialTravelers,
// the component starts with 2 travelers.
//
// Example parent JSX:
//
// <TravelerCounterTwoStates initialTravelers={3} />

export default function TravelerCounterTwoStates({
  initialTravelers = 2,
}) {

  // ===================================================
  // 3. CREATE OUR FIRST STATE VARIABLE
  // ===================================================

  // FIRST useState:
  // Remember the number of travelers.
  //
  // travelers:
  // The current number of travelers.
  //
  // setTravelers:
  // The function used to update that number.
  //
  // initialTravelers:
  // The starting number received from the parent.
  //
  // Example:
  // Starting value = 2
  // After clicking + = 3

  const [travelers, setTravelers] = useState(initialTravelers);

  // ===================================================
  // 4. CREATE OUR SECOND STATE VARIABLE
  // ===================================================

  // SECOND useState:
  // Remember the selected travel style.
  //
  // travelStyle:
  // The currently selected style.
  //
  // setTravelStyle:
  // The function used to change that style.
  //
  // 'Relaxed':
  // The starting value.
  //
  // This state is independent of travelers.
  //
  // Changing travelStyle does not automatically
  // change the number of travelers.

  const [travelStyle, setTravelStyle] = useState('Relaxed');

  // ===================================================
  // 5. FUNCTION TO CHANGE THE NUMBER OF TRAVELERS
  // ===================================================

  // This function handles BOTH the + and - buttons.
  //
  // It accepts one parameter:
  //
  // amount = how much we want to change the number
  //
  // If amount is 1:
  // Add one traveler.
  //
  // If amount is -1:
  // Remove one traveler.
  //
  // previous is the earlier value React provides.
  //
  // Math.max(1, ...) prevents the number
  // from dropping below 1.
  //
  // Example:
  // previous = 2
  // amount = 1
  // New value = 3

  function changeTravelers(amount) {
    setTravelers((previous) => Math.max(1, previous + amount));
  }

  // ===================================================
  // 6. FUNCTION TO RESET BOTH STATE VALUES
  // ===================================================

  // One function can update multiple state values.
  //
  // When Reset is clicked:
  //
  // setTravelers restores the starting traveler count.
  //
  // setTravelStyle restores 'Relaxed'.
  //
  // React normally combines both updates
  // into one render when they happen in
  // the same event handler.
  //
  // IMPORTANT:
  // Each state variable still has its own setter.

  function resetPreferences() {
    setTravelers(initialTravelers);
    setTravelStyle('Relaxed');
  }

  // ===================================================
  // 7. RETURN THE JSX
  // ===================================================

  // This JSX displays:
  //
  // - The component title.
  // - Traveler count buttons.
  // - A dropdown for travel style.
  // - A summary of both state values.
  // - A Reset button.

  return (
    <section
      className="state-panel"
      aria-labelledby="travelers-title"
    >

      {/* ============================================ */}
      {/* 8. SECTION TITLE                             */}
      {/* ============================================ */}

      <span className="state-kicker">
        04 · Two state variables
      </span>

      <h2 id="travelers-title">
        Who's coming and what's the vibe?
      </h2>

      <p>
        Two related values stored with two calls to{' '}
        <code>useState</code>.
      </p>

      {/* ============================================ */}
      {/* 9. TRAVELER COUNTER                          */}
      {/* ============================================ */}

      {/*
        These buttons change the FIRST state value:
        travelers.

        The minus button calls changeTravelers(-1).

        The plus button calls changeTravelers(1).

        Both buttons use the same function,
        but send different numbers.
      */}

      <div className="counter-row">

        {/* MINUS BUTTON */}

        {/*
          onClick={() => changeTravelers(-1)}

          When clicked, subtract one traveler.

          disabled={travelers === 1}

          This disables the button when only
          one traveler remains.
        */}

        <button
          type="button"
          aria-label="Remove one traveler"
          disabled={travelers === 1}
          onClick={() => changeTravelers(-1)}
        >
          −
        </button>

        {/* DISPLAY CURRENT TRAVELER COUNT */}

        {/*
          {travelers} displays the current state.

          When setTravelers updates the value,
          React displays the new number.

          aria-live="polite" helps screen readers
          announce changes.
        */}

        <output
          className="counter-value"
          aria-live="polite"
        >
          {travelers} travelers
        </output>

        {/* PLUS BUTTON */}

        {/*
          When clicked, add one traveler.

          We use an arrow function because
          we need to pass the number 1
          into changeTravelers.
        */}

        <button
          type="button"
          aria-label="Add one traveler"
          onClick={() => changeTravelers(1)}
        >
          +
        </button>

      </div>

      {/* ============================================ */}
      {/* 10. TRAVEL STYLE DROPDOWN                    */}
      {/* ============================================ */}

      {/*
        The dropdown controls our SECOND state value:
        travelStyle.

        value={travelStyle}

        This tells the dropdown which option
        should currently be selected.

        onChange runs when the user selects
        a different option.

        event.target.value is the value
        chosen in the dropdown.

        We pass that value to setTravelStyle.

        Example:
        User selects "Adventure".

        setTravelStyle('Adventure')

        React remembers the new selection
        and displays it on the page.

        This is called a CONTROLLED INPUT.

        A controlled input gets its displayed
        value from React state.
      */}

      <label className="style-picker">
        Travel style

        <select
          value={travelStyle}
          onChange={(event) =>
            setTravelStyle(event.target.value)
          }
        >
          <option value="Relaxed">
            Relaxed
          </option>

          <option value="Adventure">
            Adventure
          </option>

          <option value="Food and culture">
            Food and culture
          </option>
        </select>
      </label>

      {/* ============================================ */}
      {/* 11. DISPLAY BOTH STATE VALUES                */}
      {/* ============================================ */}

      {/*
        This paragraph displays BOTH values.

        travelers comes from our FIRST useState.

        travelStyle comes from our SECOND useState.

        When either value changes,
        React updates the displayed summary.

        Notice:
        Both values are used in the SAME JSX.
      */}

      <p className="helper-text">
        Your plan:{' '}
        <strong>{travelers} travelers</strong>
        {' · '}
        <strong>{travelStyle}</strong>
      </p>

      {/* ============================================ */}
      {/* 12. RESET BUTTON                             */}
      {/* ============================================ */}

      {/*
        When the user clicks Reset preferences,
        React calls resetPreferences.

        That function calls TWO setters:

        setTravelers(initialTravelers)

        setTravelStyle('Relaxed')

        Both state values return to their
        starting values.
      */}

      <button
        type="button"
        className="reset-button"
        onClick={resetPreferences}
      >
        Reset preferences
      </button>

    </section>
  );
}
