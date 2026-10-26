# ✈️ Dream Trip Planner — Class 29: React `useReducer` (Final Phase)

**Code 401 · Module 6 · React web application · Vite + SCSS**

This is the **fourth and final React phase**, built directly on Class 28. It is a **website**, not a React Native or Expo project. The earlier demos remain available to compare how the application grows:

- **Class 26:** reusable function components, props, array `.map()`, and SCSS.
- **Class 27:** `useState` and buttons/checkboxes that change the page.
- **Class 28:** `useEffect`, lifecycle, browser storage, and timer cleanup.
- **Class 29:** `useReducer` for several related changes to a **Lisbon itinerary**.

**Goal:** Students should be able to explain four pieces: **initial state**, **action**, **reducer function**, and **dispatch**, and see each one in a working example.

> **Class 29 code challenge:** Mock interviews on merge sort and quicksort are a **separate activity**. The sorting challenges are not necessary to run Dream Trip Planner.

---

## PREP — before the 45-minute live demo

### Required tools and packages

| Tool/package | Why students need it | Install/update |
| --- | --- | --- |
| **Node.js + npm** | Runs local JavaScript tools and downloads packages | `node -v` and `npm -v`; use a Node version compatible with `package.json` |
| **React + React DOM** | Builds the page; `useReducer` comes with React | Already in `package.json` |
| **Vite + React plugin** | Starts the local website and bundles code | Already in `package.json` |
| **Sass (`sass`)** | Turns SCSS styling into CSS for the browser | Already in `package.json` |
| **Vitest, React Testing Library, user-event, jest-dom, jsdom** | Tests the reducer and user clicks | Already in `package.json` |
| **Git + GitHub** | Keeps work organized in a branch and online repo | Use the **same repo**, create a Class 29 branch |

**New npm packages for Class 29: NONE.** `useReducer` is a React hook, so it does not need a separate installation. No backend, database, API key, Expo, Chance.js, Redux, or React Native is required.

If you are continuing from your own Class 28 repo:

```bash
git switch 401class28
git switch -c 401class29
npm install
npm run dev
```

If you're opening the **downloadable complete Class 29 ZIP** instead: unzip, open `dream-trip-planner-class29` in VS Code, then run **only** `npm install` followed by `npm run dev`. The application already has `package.json` and `index.html`; **do not run `npm create vite` again**. Keep the Vite terminal open and use the actual port it prints (often 5173).

> **Note about npm versions:** This project uses Vite 7 / Vitest 4 and its `package.json` specifies Node **20.19+ or 22.12+** (according to its `engines` field). On compatible Node installations, `npm install` gets the declared packages. If the project already runs, avoid unrelated major-version updates during class.

### Open each demo

| Class | Address (replace 5173 if Vite uses a different port) |
| --- | --- |
| 26 — class components | `http://localhost:5173/?demo=class` |
| 26 — function components | `http://localhost:5173/?demo=functions` |
| 27 — first state counter | `http://localhost:5173/?demo=state-basic` |
| 27 — two state variables | `http://localhost:5173/?demo=state-two` |
| 27 — interactive state | `http://localhost:5173/?demo=state` |
| 28 — effects and lifecycle | `http://localhost:5173/?demo=effect` |
| **29 — reducer (NEW)** | **`http://localhost:5173/?demo=reducer`** |

**⚠️ IMPORTANT:** `index.html` must contain HTML (including `<div id="root"></div>`). React code belongs in `.jsx` files.

---

## 📂 What changed in Class 29?

The **new Class 29 entry point is directly in `src/`** — there is no `src/class29/` folder.

```text
src/
├── ReducerTripPlanner.jsx          NEW — Class 29 parent, useReducer and dispatch
├── reducers/
│   └── itineraryReducer.js        NEW — initial state + reducer actions
├── components/
│   ├── ItineraryEditor.jsx        NEW — editable activities and form
│   ├── DestinationPicker.jsx     REUSED — familiar Class 27 component
│   ├── PackingChecklist.jsx      REUSED — familiar Class 27 component
│   ├── TripLengthCounter.jsx     REUSED — familiar Class 27 component
│   └── VisitTimer.jsx             REUSED — Class 28 effect cleanup
├── __tests__/
│   ├── reducer.test.jsx           NEW — reducer logic + user interactions
│   └── effect.test.jsx            KEPT — Class 28 tests
├── styles/
│   ├── class29.scss               NEW — itinerary editor styles
│   ├── class28.scss               KEPT
│   └── ...                        KEPT
├── data/tripData.js               KEPT — static sample data
├── main.jsx                       UPDATED — ?demo=reducer
└── function-components/Header.jsx UPDATED — adds Class 29 tab
```

The full project ZIP also includes the **original Class 27 demo files** under `src/class27/` so those old URLs still work. **The Class 29 demo itself imports reusable components from `src/components/`**, never from `src/class29/` or `src/class27/`.

**For instructors using the flattened branch structure (no `src/class27/`):** Rather than replacing your working `src/main.jsx` with the full ZIP's version, follow **`docs/BRANCH_INTEGRATION.md`** to add the new Class 29 route and styles to your existing file. The Class 29 source imports are flat and already compatible with the `src/components/` layout.

---

## 🧭 Four pieces of `useReducer` (plain English)

1. **Initial state:** What the itinerary looks like when the app begins — three sample days and their activities.
2. **Action:** A small message saying what the user wants, such as `{ type: 'RESET_ITINERARY' }`.
3. **Reducer function:** A function that receives the old state and action and **returns the next state**.
4. **Dispatch:** The function that sends an action to the reducer.

**Flow:** Visitor clicks a button → the component calls `dispatch(action)` → `itineraryReducer(state, action)` calculates a new itinerary → React displays it.

The actions taught today are:

| Action | What happens in the app |
| --- | --- |
| `ADD_ACTIVITY` | Add a new named activity to a selected day |
| `REMOVE_ACTIVITY` | Remove a particular activity |
| `MOVE_ACTIVITY` | Move an activity from one day to a different day |
| `RESET_ITINERARY` | Restore the three original sample days |

Example of a message sent by the parent:

```jsx
dispatch({
  type: 'ADD_ACTIVITY',
  payload: { dayId: 'day-1', title: 'Visit the market', time: '2 PM' },
});
```

> **Critical rule:** Reducers must not directly change the previous state. Use `.map()`, `.filter()`, `{ ...object }`, or `[...array]` to create new arrays/objects. The code in `src/reducers/itineraryReducer.js` demonstrates each step.

### Why not only `useState`?

`useState` still handles small, independent values like the destination selector and form inputs. The **itinerary has several kinds of related updates** (add, remove, move, reset); `useReducer` gives them one organized place. Students already know state and will be comparing approaches, not learning React from scratch.

---

## ⏱️ 45-minute live-demo sequence

| Time | Step | 📂 File |
| --- | --- | --- |
| 0–5 min | 1. Show Class 28 → Class 29 progression | `src/ReducerTripPlanner.jsx` |
| 5–12 min | 2. Identify initial state, action, reducer, dispatch | `src/reducers/itineraryReducer.js` |
| 12–21 min | 3. Submit the add-activity form | `src/components/ItineraryEditor.jsx` → `src/ReducerTripPlanner.jsx` |
| 21–29 min | 4. Remove an activity using `.filter()` | `src/reducers/itineraryReducer.js` |
| 29–35 min | 5. Move an activity between days | `src/reducers/itineraryReducer.js` |
| 35–41 min | 6. Reset and run tests | `src/__tests__/reducer.test.jsx` |
| 41–45 min | 7. Questions and recap | `docs/CLASS_29_INSTRUCTOR_GUIDE.md` |
| **TOTAL** | **45 minutes** | **PREP is separate** |

Use `docs/CLASS_29_INSTRUCTOR_GUIDE.md` for the exact **🎯 Goal / 📢 [TELL] / 👉 DO / 💡 [EXPLAIN] / ❓ [CHECK-IN QUESTIONS]** prompts and file pointers. Use `test-me.md` for a short separate live exercise.

---

## ✅ Test the project

**Manual testing:**

1. Start Vite and open `?demo=reducer`.
2. Add `Visit the market` at `2 PM` to **Day 1**. It should appear under Day 1.
3. Click **Move to Day 2** next to it. It should disappear from Day 1 and appear under Day 2.
4. Click **Remove** beside it. It should disappear from Day 2.
5. Click **Reset sample itinerary**. The original activities should return.
6. Choose Kyoto, update packing, then refresh. Those **Class 28** settings remain saved; the **Class 29 itinerary edits reset on refresh intentionally**.

**Automated testing:**

```bash
npm test
npm run build
```

`npm test` runs the original Class 27/28 tests **plus** Class 29 reducer tests. `npm run build` checks whether Vite can create the production website. `npm run test:watch` keeps tests running as files change.

**Troubleshooting:**

- `ReferenceError: test is not defined`: use imported `it` or import `test` from Vitest.
- `Found multiple elements with the role status`: use a more specific accessible query or scope a query with `within()`.
- Blank page / 404: check `index.html` exists and use the port printed by Vite.
- Missing import: compare spelling and capitalization with the file tree above.
- `npm install` fails: check your Node version and network, then try again; no Class 29-specific package is needed.

---

## ⚠️ Scope boundaries for students

- **Selected destination and packing list** are Class 27/28 features; they stay functional.
- **Itinerary editing** is limited to the original Lisbon sample plan. Selecting another city does **not** automatically create Kyoto or Reykjavík activities. That would require more sample data or a backend.
- **Itinerary edits are intentionally temporary:** the reducer starts with the sample itinerary each page load. This keeps today's focus on actions and immutable state, not storage integration.
- There is no backend, database, user accounts, API, or external service.

**Suggested student practice:** Add a `RENAME_ACTIVITY` action, handle it in the reducer, and test it. See `docs/CLASS_29_STUDENT_PRACTICE.md`.

**Final instructor note:** Preserve the same GitHub repo and the Class 29 branch. When finished, the series from Class 26 through 29 can be reviewed in one web app using its demo navigation.
