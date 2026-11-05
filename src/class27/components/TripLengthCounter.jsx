
/*
=======================================================
CLASS 27 — REACT useState HOOK
=======================================================

FILE: TripLengthCounter.jsx

PURPOSE:
This component allows users to increase or decrease
the number of days for a trip.

We use this example to introduce React STATE.

WHAT IS STATE?
State is information React remembers that can change.

For example:
- Our trip starts with 4 days.
- The user clicks the + button.
- React remembers the new value: 5 days.
- The webpage displays the updated number.

WHAT WE WILL LEARN:
1. How a child receives a prop from its parent.
2. How useState creates a state variable.
3. How a setter function updates state.
4. How onClick responds to button clicks.
5. How React updates the webpage.
*/

// =====================================================
// 1. IMPORT THE useState HOOK
// =====================================================

// useState is a built-in React Hook.
//
// It allows a function component to remember
// information between renders.
//
// A render is when React runs a component to
// determine what should appear on the webpage.

import { useState } from 'react';

// =====================================================
// 2. CREATE OUR FUNCTION COMPONENT
// =====================================================

// TripLengthCounter is a CHILD component.
//
// Its parent is BasicStateDemo.jsx.
//
// The parent passes a prop:
//
// <TripLengthCounter initialDays={4} />
//
// PROP NAME: initialDays
// PROP VALUE: 4
//
// We receive that prop here:
//
// { initialDays = 4 }
//
// The "= 4" is a DEFAULT VALUE.
//
// This means:
// If the parent does not provide initialDays,
// the counter will start at 4 days.
//
// If the parent sends initialDays={7},
// the counter will start at 7 days instead.

export default function TripLengthCounter({ initialDays = 4 }) {

  // ===================================================
  // 3. CREATE OUR FIRST STATE VARIABLE
  // ===================================================

  // useState creates information React remembers.
  //
  // SYNTAX:
  //
  // const [state, setState] = useState(startingValue);
  //
  // OUR EXAMPLE:
  //
  // const [days, setDays] = useState(initialDays);
  //
  // days:
  // The CURRENT number of days.
  //
  // setDays:
  // The SETTER FUNCTION used to update days.
  //
  // initialDays:
  // The STARTING VALUE received from the parent.
  //
  // EXAMPLE:
  //
  // Starting value: 4
  // days = 4
  //
  // After clicking +:
  // days = 5
  //
  // React runs the component again and displays
  // the updated value.

  const [days, setDays] = useState(initialDays);

  // ===================================================
  // 4. FUNCTION TO ADD ONE DAY
  // ===================================================

  // addDay runs when the user clicks the + button.
  //
  // We call setDays to update our state.
  //
  // React gives us the previous value through
  // the parameter named previousDays.
  //
  // We add 1 to that number.
  //
  // EXAMPLE:
  //
  // previousDays = 4
  // previousDays + 1 = 5
  //
  // React updates days to 5 and renders again.
  //
  // This is called a FUNCTIONAL STATE UPDATE.
  // It is useful when the next value depends
  // on the previous value.

  function addDay() {
    setDays((previousDays) => previousDays + 1);
  }

  // ===================================================
  // 5. FUNCTION TO REMOVE ONE DAY
  // ===================================================

  // removeDay runs when the user clicks -.
  //
  // We subtract 1 from the previous number.
  //
  // Math.max(1, previousDays - 1)
  //
  // Math.max chooses the LARGER number.
  //
  // This prevents our trip from having
  // fewer than 1 day.
  //
  // EXAMPLES:
  //
  // Previous value: 5 -> New value: 4
  // Previous value: 2 -> New value: 1
  // Previous value: 1 -> Stays at 1
  //
  // We use setDays instead of changing
  // the days variable directly.

  function removeDay() {
    setDays((previousDays) => Math.max(1, previousDays - 1));
  }

  // ===================================================
  // 6. RETURN OUR JSX
  // ===================================================

  // The return statement describes what
  // React should display on the webpage.
  //
  // Our component contains:
  //
  // 1. A title and short explanation.
  // 2. A minus button.
  // 3. The current number of days.
  // 4. A plus button.
  // 5. A message explaining the starting value.

  return (
    <section
      className="state-panel"
      aria-labelledby="length-title"
    >

      {/* ============================================ */}
      {/* 7. COMPONENT TITLE AND INTRODUCTION          */}
      {/* ============================================ */}

      <div className="state-panel__intro">
        <span className="state-kicker">
          01 · First state hook
        </span>

        <h2 id="length-title">
          How long should we stay?
        </h2>

        <p>
          Change the number. React redraws this part
          of the page.
        </p>
      </div>

      {/* ============================================ */}
      {/* 8. COUNTER BUTTONS AND CURRENT STATE         */}
      {/* ============================================ */}

      <div className="counter-row">

        {/* ========================================== */}
        {/* MINUS BUTTON                               */}
        {/* ========================================== */}

        {/*
          onClick={removeDay}

          onClick is a React event handler.

          It tells React:
          "When this button is clicked,
           run the removeDay function."

          disabled={days === 1}

          This disables the button when
          days is equal to 1.

          === means "is equal to".

          This prevents users from going below 1 day.
        */}

        <button
          type="button"
          onClick={removeDay}
          disabled={days === 1}
          aria-label="Remove one day"
        >
          −
        </button>

        {/* ========================================== */}
        {/* DISPLAY THE CURRENT STATE                  */}
        {/* ========================================== */}

        {/*
          {days} displays the current state value.

          When setDays changes the state,
          React renders again and shows the new number.

          days === 1 ? 'day' : 'days'

          This is a TERNARY OPERATOR.

          It is a short way to write an if/else.

          If days is exactly 1:
          Display "day"

          Otherwise:
          Display "days"

          EXAMPLES:
          1 day
          2 days
          5 days

          aria-live="polite" helps screen readers
          announce changes to this number.
        */}

        <output
          className="counter-value"
          aria-live="polite"
        >
          {days} {days === 1 ? 'day' : 'days'}
        </output>

        {/* ========================================== */}
        {/* PLUS BUTTON                                */}
        {/* ========================================== */}

        {/*
          onClick={addDay}

          When the user clicks this button,
          React calls the addDay function.

          addDay calls setDays.

          setDays requests a state update.

          React then displays the updated value.

          REMEMBER:

          onClick={addDay}  -> CORRECT

          onClick={addDay()} -> NOT what we want here.

          Adding () would call the function
          while rendering instead of waiting
          for the click.
        */}

        <button
          type="button"
          onClick={addDay}
          aria-label="Add one day"
        >
          +
        </button>

      </div>

      {/* ============================================ */}
      {/* 9. HELPER MESSAGE                            */}
      {/* ============================================ */}

      {/*
        This message reminds students that the
        original starting value comes from a PROP.

        The parent provides initialDays.

        TripLengthCounter creates its own state
        using that starting value.

        IMPORTANT:
        We should NEVER write:

        days = 6;

        days is a state variable declared with const.

        To change it, always call setDays().
      */}

      <p className="helper-text">
        Starting value comes from the{' '}
        <code>initialDays</code> prop.
      </p>

    </section>
  );
}
