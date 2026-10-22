# ✈️ Dream Trip Planner — Code 401 · Class 27

## React `useState` Hook — Second Demo Set

> **One web app, four React classes.** This project continues the Dream Trip Planner from **Class 26**; **Class 27** makes it interactive using `useState`. No React Native, API key, database, or backend is needed.

### 🎯 Learning goals

Students should be able to explain and show:

1. **`useState`** = a React hook that lets a component remember a changing value.
2. **Props** = information a parent passes into a child; props are not changed by the child.
3. **Event handler** = a function that runs when someone clicks or changes an input.
4. **Setter function** = the function from `useState` that tells React to use a new value and redraw the component.
5. **Functional update** = `setValue(previous => ...)`, useful when the new value depends on the previous one.
6. **Immutable update** = make a new object or array instead of changing the old one in place.
7. **Derived value** = a value calculated from existing data (for example, number of checked boxes); it does not need separate state.
8. **Testing** = describing a user's steps in code so we can rerun them automatically.

**Not yet:** `useEffect` for loading or saving data belongs to **Class 28**; `useReducer` for coordinated itinerary updates belongs to **Class 29**. Class 26 already included one small browser-title effect *preview* — we will not expand on it today.

---

## 1. PREP — Before class

### Tools students need

| Tool/package | Why we need it | How to get it |
| --- | --- | --- |
| **Node.js** (20.19+ or 22.12+) | Runs our local React development tools | Install Node; check `node -v` |
| **npm** | Downloads JavaScript packages | Included with Node; check `npm -v` |
| **VS Code** | Edits files | Already used in Class 26 |
| **Git / GitHub** | Saves the Class 27 checkpoint | Use the existing Dream Trip Planner repository |
| **React + React DOM** | Builds and shows the interface | Already in `package.json` |
| **Vite + React plugin** | Starts the local website | Already in `package.json` |
| **Sass** | Builds styles from `.scss` files | Already in `package.json` |
| **Vitest** | Runs component tests | New Class 27 **development dependency** |
| **React Testing Library** | Lets tests click and read the interface | New Class 27 **development dependency** |
| **user-event** | Simulates real clicks and selection | New Class 27 **development dependency** |
| **jest-dom** | Offers readable checks like `toBeInTheDocument()` | New Class 27 **development dependency** |
| **jsdom** | Gives tests a simulated browser | New Class 27 **development dependency** |

**IMPORTANT:** Use only **one** GitHub repository across Classes 26–29. Do **not** create a new React Native or Vite project if you are using this starter. The bundled `package.json` already lists the packages.

### Upgrade from Class 26

**Easiest:** Extract this Class 27 ZIP into a new local folder, or copy its changed files into your existing `dream-trip-planner` repository. Make a Git commit before replacing files. The Class 26 source pages remain accessible with `?demo=class` and `?demo=functions`.

Inside the Class 27 folder, run:

```bash
node -v
npm -v
npm install
npm run dev
```

`npm install` reads `package.json` and installs everything including the new testing packages. **Do not run a second command to install React or Sass.**

If you are **manually updating** an existing Class 26 project rather than using the included Class 27 `package.json`, add the Class 27 test tools with:

```bash
npm install -D vitest@^4 jsdom@^26 @testing-library/react@^16 @testing-library/user-event@^14 @testing-library/jest-dom@^6
```

Then copy `vite.config.js`, `src/test/setup.js`, `src/class27/__tests__/`, and the workflow, or match their settings. Your React, Vite, and Sass packages can stay at the working versions from Class 26.

### Opening the pages

Use the **Local** URL printed by Vite. It is often `http://localhost:5173` but may be `5174` or another port.

| URL (replace port if necessary) | Purpose |
| --- | --- |
| `http://localhost:5173/?demo=class` | Class 26 — class components |
| `http://localhost:5173/?demo=functions` | Class 26 — function components |
| `http://localhost:5173/?demo=state-basic` | **Class 27, step 1** — isolated counter |
| `http://localhost:5173/?demo=state-two` | **Class 27, steps 2–4A** — full interactions and **two state variables** |
| `http://localhost:5173/?demo=state` | **Class 27, final** — full interactions and **one object state** |

The URL is a **teaching switch** between completed snapshots. It's not a router or a state hook. Interaction happens *inside* each displayed React component.

### Git checkpoint

From the same local repository used for Class 26:

```bash
git status
git switch -c 401class27
git add .
git commit -m "Class 27: add useState travel interactions and component tests"
git push -u origin 401class27
```

If you already created the branch, use `git switch 401class27` instead. Pushing requires that `origin` is already configured. A GitHub repository is not needed merely to run the app locally.

**File names to verify:** root **`index.html`** contains real HTML, `src/main.jsx` starts React, `src/class-components/class-demo.css` contains CSS, and root `package.json` contains JSON—not a stylesheet or JSX.

---

## 2. Class 27 learning path — follow these files in order

| Checkpoint | 📂 FILE TO OPEN | What students do and observe |
| --- | --- | --- |
| Review Class 26 | `src/function-components/App.jsx` | Props, components, `.map()`, static checklist |
| **1 — One state value** | `src/class27/components/TripLengthCounter.jsx` | `useState(initialDays)`, plus/minus buttons; compare with a prop |
| See checkpoint 1 | `src/class27/BasicStateDemo.jsx` | Existing static components + a single new interactive piece |
| **2 — Parent state / child actions** | `src/class27/components/DestinationPicker.jsx` → `src/class27/StateTripPlanner.jsx` | Parent owns selected ID; child calls `onSelect` |
| **3 — Array state** | `src/class27/components/PackingChecklist.jsx` → `src/class27/StateTripPlanner.jsx` | `onChange`, `.map()`, object spread, completed count |
| **4A — Two separate values** | `src/class27/components/TravelerCounterTwoStates.jsx` | Compare separate `travelers` and `travelStyle` state values; reset both |
| **4B — One state object** | `src/class27/components/TripPreferencesObject.jsx` | Keep `travelers` and `travelStyle` together; preserve fields with `...previous` |
| **5 — Styling** | `src/styles/class27.scss` | New styles with existing Sass mixins and tokens |
| **6 — Tests** | `src/class27/__tests__/state.test.jsx` | Test props, clicks, checkbox updates, state object |
| CI demo | `.github/workflows/react-tests.yml` | Run tests/build on GitHub pushes and pull requests |

**⏱️ Live walkthrough:** `docs/CLASS_27_INSTRUCTOR_GUIDE.md` (45 minutes with your instructor tags). Practice exercises: `docs/CLASS_27_STUDENT_PRACTICE.md`.

---

## 3. Core ideas with tiny code examples

### A. Simple state

```jsx
const [days, setDays] = useState(initialDays);

// Correct: ask React to use a new value.
setDays((previousDays) => previousDays + 1);

// Incorrect: assigning to days does not tell React to update.
// days = days + 1;
```

### B. Parent → child and child → parent

```jsx
// Parent owns selectedId state:
<DestinationPicker selectedId={selectedId} onSelect={setSelectedId} />

// Child asks the parent to change it:
<button onClick={() => onSelect(place.id)}>Choose</button>
```

### C. Changing one item in an array

```jsx
setPackingItems((previousItems) => previousItems.map((item) =>
  item.id === id ? { ...item, done: !item.done } : item
));
```

`.map()` creates a **new array**. `{ ...item }` creates a **new object** for the item being changed. Other items stay as they were. Don't write `item.done = true` to update React state.

### D. Avoid unnecessary state

```jsx
const completed = packingItems.filter((item) => item.done).length;
```

Because `completed` can be calculated from `packingItems`, it doesn't need another state setter. React recalculates it when the component renders.

### E. Two states versus one object

```jsx
// Two independent values:
const [travelers, setTravelers] = useState(2);
const [travelStyle, setTravelStyle] = useState('Relaxed');

// One object of related preferences:
const [preferences, setPreferences] = useState({ travelers: 2, travelStyle: 'Relaxed' });
setPreferences((previous) => ({ ...previous, travelStyle: 'Adventure' }));
```

**Discussion:** Which version is easier to understand for the features we want? One state object can group related values, while separate state setters may be simpler for values that change independently.

**Important note about updates:** State updates are queued for the next render; do not assume the state variable has already changed on the very next line of the same click handler. When the next value depends on the previous value, use the setter's function form.

---

## 4. Run the React component tests

```bash
npm test             # Run all tests once
npm run test:watch   # Rerun tests while editing
npm run build        # Check the app builds for production
```

These tests use **Vitest + React Testing Library** (instead of Jest) because this is already a Vite project. Both serve the same teaching goal of checking how an app behaves. Tests simulate a visitor instead of testing React's private details.

Manual test ideas **before** looking at the test file:

- Increase the trip from 3 to 4 days; confirm 4 appears.
- Try to decrease a 1-day trip; the minus button should be disabled.
- Select Kyoto; confirm the message says Kyoto, Japan.
- Check “Pack a carry-on bag”; confirm 2 of 4 becomes 3 of 4.
- Increase the travelers, change travel style, and confirm the traveler count stays the same.

The GitHub workflow runs dependency installation, `npm test`, and `npm run build` on pushes and pull requests. It uses `npm ci` if `package-lock.json` exists, or `npm install` for a new ZIP without a lockfile. **After your first successful `npm install`, commit `package-lock.json`** so future installs use reproducible versions.

---

## 5. What's different from Class 26?

**Class 26:** Static information flows into reusable function components as props. You can't click a checklist item to change it.

**Class 27:** `useState` stores values in memory **while the current page is open**. Clicking a button calls an event handler, and the setter changes state, so React shows new information. Refreshing returns to the starting data. **Nothing is saved between visits yet.**

**Class 28:** We'll use `useEffect` and lifecycle cleanup to sync the planner with browser storage, document title or other outside systems.

**Class 29:** We'll move related itinerary and packing changes into a `useReducer` function with clearly named actions. The goal is to keep the same app instead of starting a new project.

### 📂 Key files

```text
index.html                            HTML entry (NOT JSX)
package.json                          Packages and scripts
vite.config.js                        Vite + Vitest setup
src/main.jsx                          URL demo selection
src/function-components/             Class 26 component baseline
src/class27/BasicStateDemo.jsx         Step 1 snapshot
src/class27/StateTripPlanner.jsx       Interactive app and parent state
src/class27/components/              Small Class 27 components
src/class27/__tests__/state.test.jsx   Component tests
src/test/setup.js                     Test matchers
src/styles/class27.scss               Added Class 27 SCSS
.github/workflows/react-tests.yml     GitHub test automation
```

### Quick troubleshooting

- **404 or page not found:** Verify the root file is `index.html`, not `index.jsx`; check the port Vite prints.
- **Blank page:** Open browser developer tools (Console) and terminal errors. A misspelled import is common.
- **Can't find a package:** From the folder containing `package.json`, run `npm install`.
- **Port already in use:** Vite may choose the next port. Use the address it prints.
- **Tests fail due to missing simulated browser:** Make sure `jsdom` is installed and the `test` section exists in `vite.config.js`.
- **Sass warning on an older Vite:** The included project uses Vite 7 with the modern Sass API; do not paste stylesheet code into `package.json`.
- **Selected travel location changes but sample itinerary still says Lisbon:** This is intentional: Class 27 updates the **chosen destination banner**, while itinerary editing is reserved for Class 29.

---

## Reference documentation

- [React: useState](https://react.dev/reference/react/useState)
- [React: updating arrays in state](https://react.dev/learn/updating-arrays-in-state)
- [React: updating objects in state](https://react.dev/learn/updating-objects-in-state)
- [Vitest](https://vitest.dev/guide/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

**Class 27 focus:** Review known React ideas, experiment with state, then write tests for behaviors students can already explain verbally.
