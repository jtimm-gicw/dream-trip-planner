
/*
=======================================================
CLASS 28 — useEffect AND TIMER CLEANUP
=======================================================

FILE: VisitTimer.jsx

PURPOSE:
This component displays a timer that counts
how many seconds it has been visible on the page.

The timer starts at 0 and increases every second.

WHAT ARE WE LEARNING?

In Class 27:
We learned how useState remembers changing values.

In Class 28:
We are learning how useEffect works with things
outside React, such as browser timers.

THIS COMPONENT DEMONSTRATES:

1. useState remembers the number of seconds.
2. useEffect starts a repeating browser timer.
3. setInterval runs code every second.
4. setSeconds updates the displayed number.
5. A cleanup function stops the timer.
6. The dependency array [] controls when
   the Effect needs to run again.

IMPORTANT:

A timer is managed by the BROWSER.

React needs useEffect to set up and
clean up that browser timer.

Think of it this way:

useState = REMEMBER the number.

useEffect = START and STOP the timer.
*/

// =====================================================
// 1. IMPORT OUR REACT HOOKS
// =====================================================

// useState:
// Allows React to remember information
// that can change.
//
// useEffect:
// Allows React to synchronize with
// something outside the component.
//
// In this example, useEffect connects
// our component to a browser timer.

import { useEffect, useState } from 'react';

// =====================================================
// 2. CREATE OUR TIMER FUNCTION COMPONENT
// =====================================================

// VisitTimer is a CHILD component.
//
// Its parent is EffectTripPlanner.jsx.
//
// The parent decides whether this component
// should appear on the webpage.
//
// Inside EffectTripPlanner.jsx:
//
// {showTimer && <VisitTimer />}
//
// If showTimer is true:
// React adds VisitTimer to the page.
//
// If showTimer is false:
// React removes VisitTimer from the page.
//
// TWO IMPORTANT TERMS:
//
// MOUNT:
// React adds a component to the webpage.
//
// UNMOUNT:
// React removes a component from the webpage.
//
// This lets us demonstrate the lifecycle
// of a React component.

export default function VisitTimer() {

  // ===================================================
  // 3. CREATE STATE TO REMEMBER THE SECONDS
  // ===================================================

  // This is a review of Class 27.
  //
  // useState(0) creates a state variable
  // with a starting value of 0.
  //
  // seconds:
  // The current number of seconds.
  //
  // setSeconds:
  // The setter function used to update seconds.
  //
  // STARTING VALUE:
  //
  // seconds = 0
  //
  // After one second:
  //
  // seconds = 1
  //
  // After two seconds:
  //
  // seconds = 2
  //
  // React remembers the current number
  // while this component remains mounted.
  //
  // When the component is removed and
  // later added again, it starts at 0.

  const [seconds, setSeconds] = useState(0);

  // ===================================================
  // 4. USE useEffect TO START OUR BROWSER TIMER
  // ===================================================

  // THIS IS THE MAIN CLASS 28 EXAMPLE!
  //
  // WHAT DOES useEffect DO HERE?
  //
  // It tells React:
  //
  // "After this component appears,
  //  start a repeating browser timer."
  //
  // GENERAL SYNTAX:
  //
  // useEffect(() => {
  //   // Setup code
  //
  //   return () => {
  //     // Cleanup code
  //   };
  // }, []);
  //
  // The arrow function () => { } contains
  // the setup code for our Effect.
  //
  // React runs the Effect's setup
  // after the component has been rendered.
  //
  // We place setInterval inside useEffect
  // because the browser timer is an
  // outside system that needs to be managed.
  //
  // We should NOT start setInterval directly
  // in the component body because React
  // may render the component many times.
  //
  // Doing that could create multiple timers.

  useEffect(() => {

    // =================================================
    // 5. SHOW A MESSAGE WHEN THE EFFECT STARTS
    // =================================================

    // console.log prints information
    // in the browser's Developer Tools Console.
    //
    // We use it to see WHEN the Effect starts.
    //
    // This is helpful because Effects happen
    // after rendering, not inside our JSX.
    //
    // The message helps us observe
    // the component lifecycle.

    console.log('TIMER: setup (component mounted)');

    // =================================================
    // 6. CREATE A REPEATING BROWSER TIMER
    // =================================================

    // setInterval is a built-in browser function.
    //
    // It asks the browser to repeatedly
    // run a function after a certain delay.
    //
    // SYNTAX:
    //
    // setInterval(functionToRun, delay);
    //
    // TWO ARGUMENTS:
    //
    // 1. functionToRun:
    //    The function to repeat.
    //
    // 2. delay:
    //    The time between runs in milliseconds.
    //
    // WHAT IS A MILLISECOND?
    //
    // 1,000 milliseconds = 1 second.
    //
    // OUR EXAMPLE:
    //
    // setInterval(() => {
    //   setSeconds(...);
    // }, 1000);
    //
    // This tells the browser:
    //
    // "Every 1,000 milliseconds,
    //  update our seconds state."
    //
    // setInterval returns an interval ID.
    //
    // We save that ID in timerId so we can
    // stop the correct timer later.

    const timerId = window.setInterval(() => {

      // ===============================================
      // 7. UPDATE STATE EVERY SECOND
      // ===============================================

      // This is a FUNCTIONAL STATE UPDATE.
      //
      // setSeconds is the setter from useState.
      //
      // previous is the current value React
      // provides to the updater function.
      //
      // previous + 1 adds one second.
      //
      // EXAMPLE:
      //
      // previous = 0 -> new value = 1
      // previous = 1 -> new value = 2
      // previous = 2 -> new value = 3
      //
      // Why use previous instead of seconds?
      //
      // The timer was created when the Effect ran.
      //
      // If we repeatedly used the seconds variable
      // captured by that first Effect, it could keep
      // using the old value of 0.
      //
      // The functional update gets the latest
      // pending state value from React.
      //
      // This lets the timer count correctly
      // without restarting the Effect every second.

      setSeconds((previous) => previous + 1);

    }, 1000);

    // =================================================
    // 8. RETURN A CLEANUP FUNCTION
    // =================================================

    // THIS IS AN IMPORTANT CLASS 28 CONCEPT!
    //
    // The return statement gives React
    // a CLEANUP FUNCTION.
    //
    // Cleanup stops or undoes work that
    // the Effect started.
    //
    // In this example, the Effect started
    // a repeating browser timer.
    //
    // We must stop that timer when the
    // component is removed.
    //
    // window.clearInterval(timerId)
    //
    // clearInterval tells the browser:
    //
    // "Stop repeating this timer."
    //
    // timerId identifies WHICH timer to stop.
    //
    // WHY DO WE NEED CLEANUP?
    //
    // Without cleanup, the browser interval
    // could keep running after VisitTimer
    // has been removed from the webpage.
    //
    // This wastes resources and can lead
    // to unexpected behavior.
    //
    // EXAMPLE:
    //
    // 1. User clicks "Show timer".
    // 2. React mounts VisitTimer.
    // 3. useEffect starts the interval.
    // 4. User clicks "Hide timer".
    // 5. React unmounts VisitTimer.
    // 6. Cleanup stops the interval.
    //
    // IMPORTANT:
    //
    // Cleanup also happens before an Effect
    // runs again if its dependencies change.
    //
    // In this example, the dependency
    // array is empty, so the timer does not
    // restart for ordinary state changes.

    return () => {

      window.clearInterval(timerId);

      console.log(
        'TIMER: cleanup (component unmounted)'
      );
    };

  }, []);

  // ===================================================
  // 9. UNDERSTAND THE DEPENDENCY ARRAY []
  // ===================================================

  // Look at the end of our Effect:
  //
  // }, []);
  //
  // The [] is called the DEPENDENCY ARRAY.
  //
  // Dependencies are values that an Effect
  // uses and needs to react to when they change.
  //
  // An EMPTY array means:
  //
  // "This Effect has no changing dependencies."
  //
  // In a normal production mount, React:
  //
  // 1. Runs this Effect's setup after mounting.
  // 2. Does not restart it when seconds changes.
  // 3. Runs its cleanup when the component unmounts.
  //
  // WHY IS THAT USEFUL HERE?
  //
  // The timer runs every second.
  //
  // Each second changes state and causes
  // React to render the component again.
  //
  // We do not want a new interval
  // every time seconds changes.
  //
  // [] allows the timer to keep running
  // without repeatedly setting it up.
  //
  // DEVELOPMENT NOTE:
  //
  // React.StrictMode may run an extra
  // setup -> cleanup -> setup sequence.
  //
  // This is normal during development.
  //
  // It checks whether cleanup works correctly.

  // ===================================================
  // 10. RETURN OUR TIMER JSX
  // ===================================================

  // This JSX displays the current time.
  //
  // When setSeconds updates the state,
  // React renders the component again.
  //
  // The updated value appears automatically.
  //
  // No manual HTML changes are needed.

  return (
    <div
      className="effect-timer"
      role="group"
      aria-label="Planning session timer"
    >

      {/* ============================================ */}
      {/* 11. DISPLAY THE TIMER LABEL                  */}
      {/* ============================================ */}

      {/*
        This label tells users what the timer
        is measuring.

        The emoji is decorative.
      */}

      <strong>
        ⏱️ Session timer:
      </strong>

      {/* ============================================ */}
      {/* 12. DISPLAY THE CURRENT NUMBER OF SECONDS    */}
      {/* ============================================ */}

      {/*
        {seconds} displays our state variable.
        
        When setSeconds changes the value,
        React updates this part of the page.

        aria-live="off" tells screen readers
        not to announce every change automatically.

        This is helpful because the timer
        changes every second.

        Announcing every second could become
        distracting for screen reader users.
      */}

      <output aria-live="off">
        {seconds} seconds
      </output>

      {/* ============================================ */}
      {/* 13. EXPLAIN HOW TO TEST THE CLEANUP          */}
      {/* ============================================ */}

      {/*
        This message tells students how
        to test the cleanup function.

        LIVE DEMO:

        1. Open Developer Tools -> Console.
        2. Click "Show timer".
        3. Watch the seconds increase.
        4. Click "Hide timer".
        5. Look for the cleanup message.

        The cleanup message shows that
        React stopped the interval.

        Showing the timer again creates
        a NEW component and a NEW interval.

        The new timer starts at 0.
      */}

      <p>
        Hide this panel to see cleanup
        in the browser console.
      </p>

    </div>
  );
}
