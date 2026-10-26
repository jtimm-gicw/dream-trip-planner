import { useState } from 'react';

// STEP 1: Our first Class 27 hook.
// initialDays is a PROP: the starting value sent by a parent component.
// useState gives us the CURRENT days and a FUNCTION to change the days.
export default function TripLengthCounter({ initialDays = 4 }) {
  const [days, setDays] = useState(initialDays);

  function addDay() {
    // Functional update: React gives us the previous number.
    setDays((previousDays) => previousDays + 1);
  }

  function removeDay() {
    // Don't let the trip shrink below one day.
    setDays((previousDays) => Math.max(1, previousDays - 1));
  }

  return (
    <section className="state-panel" aria-labelledby="length-title">
      <div className="state-panel__intro">
        <span className="state-kicker">01 · First state hook</span>
        <h2 id="length-title">How long should we stay?</h2>
        <p>Change the number. React redraws this part of the page.</p>
      </div>
      <div className="counter-row">
        <button type="button" onClick={removeDay} disabled={days === 1} aria-label="Remove one day">−</button>
        <output className="counter-value" aria-live="polite">{days} {days === 1 ? 'day' : 'days'}</output>
        <button type="button" onClick={addDay} aria-label="Add one day">+</button>
      </div>
      {/* 'days' is STATE; writing days = 6 would NOT update React. */}
      <p className="helper-text">Starting value comes from the <code>initialDays</code> prop.</p>
    </section>
  );
}
