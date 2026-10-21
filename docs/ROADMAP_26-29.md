# 🧭 Dream Trip Planner — 4-Phase Teaching Roadmap

**Application:** Vite + React web app, **not React Native**.  
**Repository:** `dream-trip-planner` — one evolving repo across all four classes.  
**Principle:** Each class begins by running the previous class's working version. Make a commit after each milestone. Preserve the **same trip data shape** unless there is a deliberate reason to refactor it.

| Class | Core concept | Small working milestone | DSA / interview work (separate) |
|---|---|---|---|
| **26** | Class vs. function components, props, JSX, SCSS | Read-only cards / itinerary / checklist; SCSS variables, mixin, nesting | Insertion Sort |
| **27** | `useState` | Choose a destination and day, add an activity, toggle tasks | Merge Sort |
| **28** | `useEffect` & lifecycle | Persist changes in `localStorage`; change tab title based on selected trip; cleanup illustration | Quick Sort |
| **29** | `useReducer` | Centralized itinerary/checklist management with named actions | Mock interviews: Merge Sort, Quick Sort |

Class 30 remains Hash Tables / Behavioral Interview Workshop. No additional planner phase is required.

## Phase 1 — Class 26 (included in this zip)

**Files:** `tripData.js`, `main.jsx`, `class-components/`, `function-components/`, `styles/`.

**Start:** HTML/JSX review, static objects and arrays, classes.
**Finish:** Function components with props, mapping and keys; SCSS styles. A **tiny** `useEffect` sets the browser tab title, per the facilitator notes. Do **not** explain timer cleanup here.

**Explicitly out of scope:** input handling, changeable data, network requests, reducer actions, React Native.

## Phase 2 — Class 27 (`useState`) — planned changes, not implemented yet

**Suggested files:** modify `src/function-components/App.jsx`, `Header.jsx`, `Checklist.jsx` and add `ActivityForm.jsx`, `DaySelector.jsx`.

1. Add `const [selectedDestinationId, setSelectedDestinationId] = useState('lisbon')`.
2. Add a destination-selection button to cards or a select control. Use a click or change handler to update selection.
3. Add `const [selectedDayId, setSelectedDayId] = useState('day-1')` and use it to filter visible day content.
4. Move initial `itinerary` data into `const [days, setDays] = useState(itinerary)` and support adding one activity with immutable updates (create new objects/arrays instead of mutating existing ones).
5. Move checklist data to `const [tasks, setTasks] = useState(checklist)` and allow checking/unchecking items.
6. Manually test: click, add, toggle, and verify only the appropriate part of the UI changes. Introduce React Testing Library **after** state is covered, consistent with the facilitator notes.

**Teaching warning:** Don't mutate state arrays with `.push()` and expect React to update. Don't store values that can be simply calculated from existing state.

**Checkpoint:** Users can select a day, add an activity, and toggle tasks without refreshing.

## Phase 3 — Class 28 (`useEffect` + lifecycle) — planned changes, not implemented yet

**Suggested files:** modify `App.jsx`; optionally add `src/hooks/useLocalStorage.js` *after* explaining the basic effect, not before.

1. Review `useState` from Class 27, using the existing activity form.
2. Demonstrate an effect with dependencies that updates the browser tab title **when `selectedDestinationId` changes**.
3. Initialize state from `localStorage` with a lazy `useState` initializer, then use an effect to write updated trip data back to storage. Use `try/catch` for invalid stored data or unavailable storage.
4. Demonstrate an effect with **setup and cleanup** using a temporary countdown timer or `window` event listener. Clear the interval/remove the listener in the cleanup function.
5. Explain mount → setup; dependency change → cleanup/setup; unmount → cleanup. Discuss how Strict Mode checks effects in development.
6. Open DevTools; verify stored changes survive a refresh. Verify no timer keeps running after unmounting.

**Teaching warning:** Don't use an effect just to compute a budget total or count checked items. Derive them during rendering.

**Checkpoint:** Data persists on refresh, title reflects the chosen destination, and a cleanup example works correctly.

## Phase 4 — Class 29 (`useReducer`) — planned changes, not implemented yet

**Suggested files:** add `src/reducers/tripReducer.js`; refactor `App.jsx`, `ActivityForm.jsx`, `Checklist.jsx`, `DayPlan.jsx`.

**Initial state sketch:**

```js
const initialState = {
  selectedDestinationId: 'lisbon',
  selectedDayId: 'day-1',
  days: itinerary,
  tasks: checklist,
};
```

**Suggested actions:**

```js
{ type: 'SELECT_DESTINATION', payload: 'kyoto' }
{ type: 'SELECT_DAY', payload: 'day-2' }
{ type: 'ADD_ACTIVITY', payload: { dayId: 'day-2', activity: newActivity } }
{ type: 'REMOVE_ACTIVITY', payload: { dayId: 'day-2', activityId: 'b1' } }
{ type: 'TOGGLE_TASK', payload: 'passport' }
{ type: 'RESET_TRIP' }
```

**Important detail:** Many reducers conventionally use `{ type, payload }`; React only requires an action value, and `type` is a useful convention. Handle each action in a pure reducer and **return new arrays and objects**. Never modify existing reducer state in place. Use `dispatch(action)` rather than invoking a reducer to manually set React state.

**Live demonstration sequence:** (a) show initial state, (b) write one `ADD_ACTIVITY` case, (c) dispatch from a button, (d) add `REMOVE_ACTIVITY`, (e) move existing checklist logic to `TOGGLE_TASK`, (f) preserve Class 28's persistence effect.

**Checkpoint:** Multiple user operations are coordinated through `useReducer`; data still persists across refreshes; UI features from Classes 27–28 still work.

## Why the phases are in this order

```text
Class 26: DATA ─props→ COMPONENTS → static page
                    ↓
Class 27: COMPONENTS + useState → user interactions
                    ↓
Class 28: INTERACTIONS + useEffect → sync outside React
                    ↓
Class 29: RELATED STATE + useReducer → organized update rules
```

Students first learn the **shape** of the UI, then how it **changes**, then how it **syncs** with browser services, and finally how to **organize many types of changes**. The Vite project and data model stay familiar throughout.

## Instructor note about lab alignment

The source material for this teaching plan is the uploaded Class 26–29 facilitator notes, including the **two static app comparison**, simple title-hook preview, **SCSS variables/mixin/nesting**, state experiments, effect lifecycle demos, and reducer actions. The private Google Classroom assignment URL could not be read without a sign-in, so specific grading criteria from that lab have **not** been verified. Review its exact rubric before treating this project as a replacement for the assignment.
