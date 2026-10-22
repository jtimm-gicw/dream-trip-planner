import { useState } from 'react';

// STEP 4B: Compare this with TravelerCounterTwoStates.jsx.
// A single OBJECT groups two related values: travelers and travelStyle.
export default function TripPreferencesObject({ initialTravelers = 2 }) {
  const [preferences, setPreferences] = useState({
    travelers: initialTravelers,
    travelStyle: 'Relaxed',
  });

  function changeTravelers(amount) {
    // The ... spreads the OLD fields into a NEW object. Do not mutate state.
    setPreferences((previous) => ({
      ...previous,
      travelers: Math.max(1, previous.travelers + amount),
    }));
  }

  function chooseStyle(event) {
    // If we forgot ...previous, the travelers field would disappear.
    setPreferences((previous) => ({
      ...previous,
      travelStyle: event.target.value,
    }));
  }

  function resetPreferences() {
    // One setter replaces the whole group with its starting values.
    setPreferences({ travelers: initialTravelers, travelStyle: 'Relaxed' });
  }

  return (
    <section className="state-panel" aria-labelledby="preferences-title">
      <span className="state-kicker">04 · One state object</span>
      <h2 id="preferences-title">Who's coming and what's the vibe?</h2>
      <div className="counter-row">
        <button type="button" aria-label="Remove one traveler" disabled={preferences.travelers === 1} onClick={() => changeTravelers(-1)}>−</button>
        <output className="counter-value" aria-live="polite">{preferences.travelers} travelers</output>
        <button type="button" aria-label="Add one traveler" onClick={() => changeTravelers(1)}>+</button>
      </div>
      <label className="style-picker">Travel style
        <select value={preferences.travelStyle} onChange={chooseStyle}>
          <option value="Relaxed">Relaxed</option>
          <option value="Adventure">Adventure</option>
          <option value="Food and culture">Food and culture</option>
        </select>
      </label>
      <p className="helper-text">Your plan: <strong>{preferences.travelers} travelers</strong> · <strong>{preferences.travelStyle}</strong></p>
      <button type="button" className="reset-button" onClick={resetPreferences}>Reset preferences</button>
    </section>
  );
}
