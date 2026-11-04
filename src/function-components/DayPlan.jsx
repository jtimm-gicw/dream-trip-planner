// COMPONENT COMPOSITION: DayPlan receives one day's information as props.
// It then maps through the smaller "activities" array to create list items.
export default function DayPlan({ day }) {
  return (
    <article className="day-card">
      <div className="day-card__heading">
        <div className="day-card__number">{day.label}</div>
        <div><p className="day-card__date">{day.date}</p><h3>{day.heading}</h3></div>
      </div>
      <ol className="activity-list">
        {day.activities.map((activity) => (
          <li className="activity" key={activity.id}>
            <span className="activity__time">{activity.time}</span>
            <span className="activity__icon" aria-hidden="true">{activity.emoji}</span>
            <div><strong>{activity.title}</strong><p>{activity.detail}</p></div>
          </li>
        ))}
      </ol>
    </article>
  );
}
