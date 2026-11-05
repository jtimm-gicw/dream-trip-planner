
/*
=======================================================
CLASS 27 — MANAGING STATE WITH AN OBJECT
=======================================================

FILE: TripPreferencesObject.jsx

PURPOSE:
This component allows users to:
1. Increase or decrease the number of travelers.
2. Choose a travel style.
3. Reset both preferences to their starting values.

WHAT ARE WE LEARNING?

Previously, in TravelerCounterTwoStates.jsx,
we used TWO separate useState Hooks:

const [travelers, setTravelers] = useState(2);

const [travelStyle, setTravelStyle] =
  useState('Relaxed');

Now we will store BOTH values inside ONE object.

This is helpful when several pieces of
information belong together.

IMPORTANT:
When updating an object in React state,
we create a NEW object instead of changing
the existing object directly.
*/

// =====================================================
// 1. IMPORT THE useState HOOK
// =====================================================

// useState allows React to remember information
// that can change.
//
// Our state will contain an OBJECT instead of
// just a number or string.

import { useState } from 'react';

// =====================================================
// 2. CREATE OUR FUNCTION COMPONENT
// =====================================================

// TripPreferencesObject is a child component.
//
// It receives ONE prop from its parent:
//
// initialTravelers = starting number of travelers
//
// The "= 2" provides a DEFAULT value.
//
// If the parent does not provide initialTravelers,
// the component starts with 2 travelers.

export default function TripPreferencesObject({
  initialTravelers = 2,
}) {

  // ===================================================
  // 3. CREATE ONE STATE OBJECT
  // ===================================================

  // We call useState ONE time.
  //
  // Instead of storing one simple value,
  // we store an object containing two properties.
  //
  // preferences:
  // The current state OBJECT.
  //
  // setPreferences:
  // The setter function used to update the object.
  //
  // INITIAL OBJECT:
  //
  // {
  //   travelers: 2,
  //   travelStyle: 'Relaxed'
  // }
  //
  // We can access each property using dot notation:
  //
  // preferences.travelers
  // preferences.travelStyle
  //
  // REMEMBER:
  // React does not automatically merge state objects.
  //
  // When changing one property, we usually need
  // to copy the other properties into the new object.

  const [preferences, setPreferences] = useState({
    travelers: initialTravelers,
    travelStyle: 'Relaxed',
  });

  // ===================================================
  // 4. FUNCTION TO CHANGE THE NUMBER OF TRAVELERS
  // ===================================================

  // changeTravelers handles BOTH + and - buttons.
  //
  // It receives one parameter:
  //
  // amount = the number to add or subtract
  //
  // amount = 1  -> add one traveler
  // amount = -1 -> remove one traveler
  //
  // setPreferences receives an updater function.
  //
  // React provides the previous state object
  // through the parameter named "previous".
  //
  // IMPORTANT:
  //
  // ...previous is called the SPREAD OPERATOR.
  //
  // It copies the properties from the old object
  // into a NEW object.
  //
  // Then we update only the travelers property.
  //
  // EXAMPLE:
  //
  // Previous state:
  // {
  //   travelers: 2,
  //   travelStyle: 'Relaxed'
  // }
  //
  // Click +:
  //
  // New state:
  // {
  //   travelers: 3,
  //   travelStyle: 'Relaxed'
  // }
  //
  // Notice:
  // travelStyle stays the same.

  function changeTravelers(amount) {
    setPreferences((previous) => ({
      ...previous,
      travelers: Math.max(1, previous.travelers + amount),
    }));
  }

  // ===================================================
  // 5. FUNCTION TO CHANGE THE TRAVEL STYLE
  // ===================================================

  // chooseStyle runs when the user selects
  // a different option in the dropdown.
  //
  // event is an object containing information
  // about what happened in the browser.
  //
  // event.target.value gives us the selected value.
  //
  // EXAMPLE:
  //
  // User selects "Adventure".
  //
  // We call setPreferences to update the object.
  //
  // ...previous copies the existing properties.
  //
  // travelStyle gets the newly selected value.
  //
  // EXAMPLE:
  //
  // Previous state:
  // {
  //   travelers: 3,
  //   travelStyle: 'Relaxed'
  // }
  //
  // New state:
  // {
  //   travelers: 3,
  //   travelStyle: 'Adventure'
  // }
  //
  // The traveler count stays the same.
  //
  // WITHOUT ...previous:
  //
  // We could accidentally remove travelers
  // from the state object.

  function chooseStyle(event) {
    setPreferences((previous) => ({
      ...previous,
      travelStyle: event.target.value,
    }));
  }

  // ===================================================
  // 6. FUNCTION TO RESET THE PREFERENCES
  // ===================================================

  // resetPreferences restores BOTH properties
  // to their original values.
  //
  // Unlike the previous component,
  // we only need ONE setter function.
  //
  // setPreferences replaces the entire object
  // with a new object containing starting values.
  //
  // Example:
  //
  // Before reset:
  // {
  //   travelers: 5,
  //   travelStyle: 'Adventure'
  // }
  //
  // After reset:
  // {
  //   travelers: 2,
  //   travelStyle: 'Relaxed'
  // }

  function resetPreferences() {
    setPreferences({
      travelers: initialTravelers,
      travelStyle: 'Relaxed',
    });
  }

  // ===================================================
  // 7. RETURN THE JSX
  // ===================================================

  // This JSX displays:
  //
  // - A title.
  // - Buttons to change the number of travelers.
  // - A dropdown to choose the travel style.
  // - A summary showing both preferences.
  // - A Reset button.

  return (
    <section
      className="state-panel"
      aria-labelledby="preferences-title"
    >

      {/* ============================================ */}
      {/* 8. SECTION TITLE                             */}
      {/* ============================================ */}

      <span className="state-kicker">
        04 · One state object
      </span>

      <h2 id="preferences-title">
        Who's coming and what's the vibe?
      </h2>

      {/* ============================================ */}
      {/* 9. TRAVELER COUNTER                          */}
      {/* ============================================ */}

      {/*
        These buttons update the travelers property
        inside the preferences state object.

        The minus button calls changeTravelers(-1).
        The plus button calls changeTravelers(1).

        We display the number using:

        preferences.travelers

        Notice the difference from the earlier example:

        TWO STATES:
        travelers

        ONE OBJECT:
        preferences.travelers
      */}

      <div className="counter-row">

        {/* MINUS BUTTON */}

        {/*
          When clicked, subtract one traveler.

          The button is disabled when
          preferences.travelers equals 1.
        */}

        <button
          type="button"
          aria-label="Remove one traveler"
          disabled={preferences.travelers === 1}
          onClick={() => changeTravelers(-1)}
        >
          −
        </button>

        {/* DISPLAY CURRENT TRAVELER COUNT */}

        {/*
          preferences.travelers reads the number
          stored inside our state object.

          React displays the updated number
          whenever this value changes.
        */}

        <output
          className="counter-value"
          aria-live="polite"
        >
          {preferences.travelers} travelers
        </output>

        {/* PLUS BUTTON */}

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
        The dropdown updates the travelStyle
        property inside our preferences object.

        value={preferences.travelStyle}

        This controls which option is selected.

        onChange={chooseStyle}

        When the user chooses another option,
        React calls chooseStyle.

        chooseStyle calls setPreferences.

        React then displays the selected style.

        This is called a CONTROLLED INPUT.

        A controlled input gets its displayed
        value from React state.
      */}

      <label className="style-picker">
        Travel style

        <select
          value={preferences.travelStyle}
          onChange={chooseStyle}
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
      {/* 11. DISPLAY THE CURRENT PREFERENCES         */}
      {/* ============================================ */}

      {/*
        This paragraph displays BOTH properties
        from our ONE state object.

        preferences.travelers = number of people

        preferences.travelStyle = selected style

        React updates the summary whenever
        either property changes.
      */}

      <p className="helper-text">
        Your plan:{' '}
        <strong>{preferences.travelers} travelers</strong>
        {' · '}
        <strong>{preferences.travelStyle}</strong>
      </p>

      {/* ============================================ */}
      {/* 12. RESET BUTTON                             */}
      {/* ============================================ */}

      {/*
        When clicked, run resetPreferences.

        That function calls setPreferences ONE time.

        The entire state object is replaced
        with its original starting values.

        This is one advantage of grouping
        related information into an object.
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
