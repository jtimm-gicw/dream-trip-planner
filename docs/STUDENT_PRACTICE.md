# ✈️ Class 26 Student Practice — React Components + SCSS

## Your mission

The travel planner already renders a sample trip. Your job is to practice **working with data and props** and make at least one visual improvement. Avoid `useState` and `useReducer` for now; those are future classes.

## Part A — Confirm the app works

1. In the project root run `npm install`, then `npm run dev`.
2. Open `?demo=class` and identify where a destination's title is rendered.
3. Open `?demo=functions` and identify the corresponding function component.
4. Locate the data object in `src/data/tripData.js`.

**Check-in:** How does `DestinationCard` receive a city name? **Answer:** `App.jsx` passes a destination object as a **prop**.

## Part B — Required: add your own destination

Open `src/data/tripData.js` and add an object to the `destinations` array. Example:

```js
{
  id: 'seoul',
  city: 'Seoul',
  country: 'South Korea',
  emoji: '🏙️',
  theme: 'blossom', // use one of: sunset, blossom, glacier
  description: 'Night markets, palaces, and vibrant neighborhoods.',
  days: 6,
  budget: '$$',
}
```

- Save. Confirm you see an extra card in **both** demos.
- Change your new city and save again. What changed?
- Explain why the `id` should be unique.

**Success criteria:** Both versions show your fourth destination with no React warning about missing keys.

## Part C — Required: make a reusable function component

Create `src/function-components/TripBadge.jsx`:

```jsx
// Review: "label" is a prop. The component doesn't store state.
export default function TripBadge({ label }) {
  return <span className="trip-badge">{label}</span>;
}
```

Then import it into `Hero.jsx`:

```jsx
import TripBadge from './TripBadge.jsx';
```

Render it somewhere inside Hero's returned JSX:

```jsx
<TripBadge label="Summer escape" />
```

Add a matching nested `.trip-badge` style in `main.scss` under `.function-demo`, save, and confirm it displays.

**Check-in:** Why is `<TripBadge label="Summer escape" />` reusable? **Answer:** It can display any string passed through `label`, without copying the component markup.

## Part D — SCSS detective activity

Find one example of each of the following, and explain it to a partner:

1. A variable (hint: `_tokens.scss`).
2. A mixin definition (hint: `_mixins.scss`).
3. An `@include` (hint: `main.scss`).
4. A nested selector (hint: `main.scss`).

**Bonus:** Change `$radius-card` in `_tokens.scss`. Which elements change their corner shape?

## Part E — Optional stretch

Add a **fourth itinerary day** to the `itinerary` array. Every activity must have a unique `id` and should include `time`, `emoji`, `title`, and `detail`. Explain why the UI automatically displays another day without editing `DayPlan.jsx`.

## Exit ticket — answer in your own words

1. What's one difference between class and function components?
2. What are props? Where do they go?
3. What does `.map()` help React display?
4. Why do lists need keys?
5. What problem does a Sass mixin solve?
6. What will we add with `useState` next class?

> **Note:** No checklist toggling yet. Those checkmarks are only sample values from the data file. Class 27 will make them interactive.
