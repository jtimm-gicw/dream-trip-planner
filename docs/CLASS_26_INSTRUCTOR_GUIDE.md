# 👨‍🏫 Class 26 — 45-Minute Live Demo Guide

## 🎯 Goal

Build **Dream Trip Planner** twice: first as a static **class-component + CSS** review, then with **function components + props + SCSS**. Reuse the same `tripData.js` so students can see that component *structure* changes but the data and displayed purpose do not.

**Do not teach interactive state today.** `useState` begins in Class 27. The brief tab-title effect is an intentional preview per the facilitator notes, **not** today's effect lesson.

### PREP — 5 minutes before students arrive

- [ ] Node/npm installed (Node 20.19+, 22.12+, or later supported versions).
- [ ] Download/unzip the finished project; in its root run `npm install`, then `npm run dev`.
- [ ] Open `?demo=class` and `?demo=functions` in separate browser tabs.
- [ ] Open `src/data/tripData.js`, `src/class-components/ClassTripPlanner.jsx`, `src/function-components/App.jsx`, `src/function-components/DestinationCard.jsx`, `src/class-components/class-demo.css`, `src/styles/main.scss` in VS Code.
- [ ] Set browser/VS Code zoom for easy reading; use the browser console if needed.
- [ ] Have a clean Git commit available for restoring any accidental changes.

## 0:00–0:05 — Kickoff: recall component-based UI

📢 **[TELL]** "Today we are revisiting something you already know: React components. We will first look at the older class style and then the modern function style. Both display the same travel data. SCSS is our one *new* styling tool."

👉 **[DO]** Open `?demo=class`. Scroll the app, point out header, destinations, itinerary and checklist. Then open `tripData.js` to show that all information is a plain JavaScript object or array.

❓ **[CHECK-IN]** "If we want the same destination card three times, should we copy three blocks of HTML?" → **No, reuse a component with props.**

**Checkpoint:** Students can describe a component as one reusable section of a webpage.

## 0:05–0:14 — Demo A: class components and props

👉 **[DO]** In `ClassTripPlanner.jsx`, locate `ClassDestinationCard extends Component` and read:

```jsx
class ClassDestinationCard extends Component {
  render() {
    const { destination } = this.props;
    return <h3>{destination.city}</h3>;
  }
}
```

💡 **[EXPLAIN]** `extends Component` creates a React class component; `render()` returns JSX; `this.props` is how this class reads information provided by the parent.

👉 **[DO]** In `ClassTripPlanner.render()`, locate:

```jsx
{destinations.map((destination) => (
  <ClassDestinationCard key={destination.id} destination={destination} />
))}
```

⚠️ **[IMPORTANT]** `key` belongs on the component within the `.map()` expression. It is **not** a normal prop sent into the component. Use an actual unique ID; not a changing array index.

👉 **[DO]** Find `componentDidMount()` and demonstrate the class version of updating `document.title`. Do **not** turn this into a lifecycle lecture.

❓ **[CHECK-IN]** "Where does this child get the city name?" → **From its parent through `props`.**

**Checkpoint:** Student can locate `render()`, `this.props`, `.map()`, and a stable `key`.

## 0:14–0:26 — Demo B: the same app with function components

👉 **[DO]** Switch browser to `?demo=functions` and open `function-components/App.jsx` next to `ClassTripPlanner.jsx`.

📢 **[TELL]** "A function component is a JavaScript function that returns JSX. We don't need `class`, `extends`, `this`, or `render()` for this basic case."

👉 **[DO]** Show:

```jsx
export default function DestinationCard({ destination }) {
  return <h3>{destination.city}</h3>;
}
```

💡 **[EXPLAIN]** `{ destination }` means "pull the destination property out of the props object." Child components should not change the props they receive.

👉 **[DO]** Compare the same `.map()` in the function `App.jsx`, then point at `<Hero trip={trip} />`, `<Checklist items={checklist} />`.

👉 **[DO]** Make a **small reversible edit**: change `trip.description` in `tripData.js`, save, and show that both demos display the updated description.

❓ **[CHECK-IN]** "Why did we put destinations into an array?" → **To reuse one component for many data objects.**

👨‍🏫 **[TEACHER NOTE]** The small `useEffect` in function `App.jsx` updates the tab title. Point it out in one sentence only; Class 28 explains its lifecycle and cleanup. Under Strict Mode, setup can run more than once in development.

**Checkpoint:** Student can identify a parent, child, JSX, and destructured props.

## 0:26–0:37 — Demo C: plain CSS → SCSS

📢 **[TELL]** "SCSS makes our styles easier to organize. The browser still receives regular CSS after Sass compiles it."

👉 **[DO]** Place `class-demo.css` beside `main.scss`.

1. **Variables:** Find `$purple` in `_tokens.scss`. In `main.scss`, `@use 'tokens' as t;` lets us write `t.$purple`.
2. **Mixin:** Open `_mixins.scss`, point at `@mixin card-surface(...)`, then in `main.scss` show `@include m.card-surface(0);` and `@include m.card-surface(24px 26px);`.
3. **Nesting:** Compare `.class-card h3` in CSS with `.destination-card { &__heading { h3 { ... } } }` in SCSS.

👉 **[DO]** Change `$purple` in `_tokens.scss` to a different color, save, show that the theme updates. Restore the original value.

❓ **[CHECK-IN]** "Which SCSS feature helps avoid copying the same ten card styles repeatedly?" → **A mixin.**

**Checkpoint:** Students can correctly point to an SCSS variable, mixin, and nested selector.

## 0:37–0:43 — Student hands-on practice

👉 **[DO]** Give students a choice from [STUDENT_PRACTICE.md](STUDENT_PRACTICE.md):

- Add a fourth destination to `tripData.js`; OR
- Create a reusable `TripBadge` functional component that receives a text prop; OR
- Adjust SCSS `$purple` and card radius variables and describe the change.

📢 **[TELL]** "We are reviewing component composition, not building a full booking site. Focus on getting the data and props working."

## 0:43–0:45 — Wrap-up

❓ **[CHECK-IN]** "What do class and function components have in common?" → **Both render JSX and use props to display data.**

❓ **[CHECK-IN]** "What can't our checklist do yet?" → **Remember clicks or change its data. That's Class 27.**

📢 **[TELL]** "Next class, we add `useState` so travelers can choose a destination and modify their itinerary. We will keep building the same repository."

### Quick instructor grading / readiness check

- [ ] Can identify at least three named components.
- [ ] Can explain that data is sent from parent to child via props.
- [ ] Can add an item to a data array and see an extra card.
- [ ] Can explain why list items need stable keys.
- [ ] Can point to an SCSS variable, mixin, and nesting.
- [ ] Can say **why no `useState` or reducer logic appears today**.

### Common misconceptions to correct

| Misconception | What to say |
|---|---|
| "Props and state are the same." | Props come **from a parent**. State is data a component manages **over time**. We revisit state in Class 27. |
| "JSX is just HTML." | JSX resembles HTML but is JavaScript syntax compiled into React elements. |
| "SCSS is read directly by the browser." | Sass compiles SCSS to CSS. |
| "An array index is always a great key." | Use a stable unique ID when possible; items may be inserted or moved in later classes. |
| "We need an effect whenever anything changes." | No. We need an effect for synchronizing with an external system, not for ordinary values derived from props. |
