import { useState } from 'react';

// CLASS 29: This component DISPLAYS the itinerary and reports button clicks.
// It does NOT change the reducer's state by itself; the parent owns dispatch.
export default function ItineraryEditor({ days, onAdd, onRemove, onMove, onReset }) {
  // Class 27 REVIEW: simple form inputs still use useState.
  // useReducer is useful for the RELATED itinerary updates, not every input.
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('9:00 AM');
  const [dayId, setDayId] = useState(days[0].id);

  function handleSubmit(event) {
    event.preventDefault(); // Keep the form from reloading the page.
    if (!title.trim() || !time.trim()) return;
    onAdd({ dayId, title, time });
    setTitle(''); // Clear the input AFTER dispatching the request.
  }

  // This number is calculated from the existing days, not stored separately.
  const activityCount = days.reduce((total, day) => total + day.activities.length, 0);

  return (
    <section className="reducer-editor" id="itinerary" aria-labelledby="editor-title">
      <div className="reducer-editor__heading">
        <div>
          <span className="state-kicker">04 · Reducer actions</span>
          <h2 id="editor-title">🗺️ Build your Lisbon itinerary</h2>
          <p>Add, remove, or move activities. Each click sends a named action to the reducer.</p>
          <p className="reducer-count" role="status">{activityCount} activities across {days.length} days</p>
        </div>
        <button type="button" className="reducer-reset" onClick={onReset}>Reset sample itinerary</button>
      </div>

      <form className="reducer-form" onSubmit={handleSubmit} aria-label="Add an activity">
        <label>
          Activity name
          <input value={title} onChange={(event) => setTitle(event.target.value)}
            placeholder="Try a pastry shop" maxLength={70} required />
        </label>
        <label>
          Time
          <input value={time} onChange={(event) => setTime(event.target.value)}
            placeholder="9:00 AM" maxLength={35} required />
        </label>
        <label>
          Day
          <select value={dayId} onChange={(event) => setDayId(event.target.value)}>
            {days.map((day) => <option value={day.id} key={day.id}>{day.label}</option>)}
          </select>
        </label>
        <button type="submit">Add activity</button>
      </form>

      <div className="reducer-days">
        {days.map((day, index) => {
          const nextDay = days[index + 1];
          return (
            <article className="reducer-day" key={day.id}>
              <h3>{day.label}: {day.heading}</h3>
              <p className="reducer-day__date">{day.date}</p>
              {day.activities.length === 0 ? (
                <p>No activities yet. Add one using the form above.</p>
              ) : (
                <ul className="reducer-activities">
                  {day.activities.map((activity) => (
                    <li key={activity.id}>
                      <div className="reducer-activity__info">
                        <strong>{activity.emoji} {activity.time} · {activity.title}</strong>
                        <p>{activity.detail}</p>
                      </div>
                      <div className="reducer-activity__actions">
                        {nextDay && (
                          <button type="button" onClick={() => onMove(activity.id, nextDay.id)}
                            aria-label={`Move ${activity.title} to ${nextDay.label}`}>
                            Move to {nextDay.label}
                          </button>
                        )}
                        <button type="button" className="reducer-remove"
                          onClick={() => onRemove(activity.id)}
                          aria-label={`Remove ${activity.title}`}>
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          );
        })}
      </div>
      <p className="reducer-helper">Class 28 review: destination and packing choices persist after a refresh. Class 29 itinerary edits are temporary; Reset also restores the sample itinerary.</p>
    </section>
  );
}
