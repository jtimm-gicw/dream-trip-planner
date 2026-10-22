import { useState } from 'react';

// STEP 4A: TWO SEPARATE state values for related trip preferences.
// Compare this screen with TripPreferencesObject.jsx: it behaves the same.
export default function TravelerCounterTwoStates({ initialTravelers = 2 }) {
  const [travelers, setTravelers] = useState(initialTravelers);
  const [travelStyle, setTravelStyle] = useState('Relaxed');

  function changeTravelers(amount) {
    // Use the earlier value to calculate the new number.
    setTravelers((previous) => Math.max(1, previous + amount));
  }

  function resetPreferences() {
    // One handler can call TWO setters; React combines updates when it renders.
    setTravelers(initialTravelers);
    setTravelStyle('Relaxed');
  }

  return (
    <section className="state-panel" aria-labelledby="travelers-title">
      <span className="state-kicker">04 · Two state variables</span>
      <h2 id="travelers-title">Who's coming and what's the vibe?</h2>
      <p>Two related values stored with two calls to <code>useState</code>.</p>
      <div className="counter-row">
        <button type="button" aria-label="Remove one traveler" disabled={travelers === 1} onClick={() => changeTravelers(-1)}>−</button>
        <output className="counter-value" aria-live="polite">{travelers} travelers</output>
        <button type="button" aria-label="Add one traveler" onClick={() => changeTravelers(1)}>+</button>
      </div>
      <label className="style-picker">Travel style
        <select value={travelStyle} onChange={(event) => setTravelStyle(event.target.value)}>
          <option value="Relaxed">Relaxed</option>
          <option value="Adventure">Adventure</option>
          <option value="Food and culture">Food and culture</option>
        </select>
      </label>
      <p className="helper-text">Your plan: <strong>{travelers} travelers</strong> · <strong>{travelStyle}</strong></p>
      <button type="button" className="reset-button" onClick={resetPreferences}>Reset preferences</button>
    </section>
  );
}
