
import { useState, useEffect } from 'react';

// CLASS 28: Saving state with useEffect and localStorage.

export default function TripLengthCounter({ initialDays = 4 }) {

  // STEP 1: Read the saved number when the component starts.
  // If nothing is saved, use initialDays from the parent.
  const [days, setDays] = useState(() => {
    const savedDays = localStorage.getItem('tripDays');

    // localStorage stores text, so convert it to a number.
    const number = Number(savedDays);

    if (savedDays !== null && Number.isInteger(number) && number >= 1) {
      return number;
    }

    return initialDays;
  });

  // STEP 2: Save the number whenever days changes.
  //
  // useEffect runs after React updates the page.
  // [days] tells React to run this Effect when days changes.
  useEffect(() => {
    localStorage.setItem('tripDays', String(days));
  }, [days]);

  // STEP 3: Increase the number of days.
  function addDay() {
    setDays((previousDays) => previousDays + 1);
  }

  // STEP 4: Decrease the days, but never below 1.
  function removeDay() {
    setDays((previousDays) => Math.max(1, previousDays - 1));
  }

  // STEP 5: Display the counter.
  return (
    <section className="state-panel" aria-labelledby="length-title">
      <div className="state-panel__intro">
        <span className="state-kicker">
          01 · State and browser storage
        </span>

        <h2 id="length-title">
          How long should we stay?
        </h2>

        <p>
          Change the number, then refresh the browser.
          Your trip length should stay saved.
        </p>
      </div>

      <div className="counter-row">
        <button
          type="button"
          onClick={removeDay}
          disabled={days === 1}
          aria-label="Remove one day"
        >
          −
        </button>

        <output className="counter-value" aria-live="polite">
          {days} {days === 1 ? 'day' : 'days'}
        </output>

        <button
          type="button"
          onClick={addDay}
          aria-label="Add one day"
        >
          +
        </button>
      </div>

      <p className="helper-text">
        Starting value comes from the{' '}
        <code>initialDays</code> prop.
        Updated days are saved in your browser.
      </p>
    </section>
  );
}
