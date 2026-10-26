# ✈️ Dream Trip Planner — Class 28: React Effect Hook and Lifecycle

A **React web app with Vite**. This phase builds on the Class 26 and 27 project, preserving those demos. **Class 28 adds effects and lifecycle cleanup, not a new backend or React Native app.**

## PREP — packages and setup (before class)

**Use the same GitHub repository.** Create a branch such as `401class28` from your completed Class 27 branch. No new repository is necessary.

```bash
git switch 401class27
git switch -c 401class28
npm install
npm run dev
```

If your existing Class 27 branch already has the required packages, **no additional npm package is needed for Class 28**: `useEffect` is part of React, and `localStorage` and `setInterval` are built into the browser.

| Package/tool | Why it is used | Install |
| --- | --- | --- |
| Node.js + npm | Runs the project and package commands | Install Node.js if missing; use `node -v` |
| React + React DOM | Components and hooks, including `useEffect` | Already in `package.json` |
| Vite + React plugin | Runs the local development webpage | Already in `package.json` |
| Sass | Converts SCSS styling into CSS | Already in `package.json` |
| Vitest, Testing Library, user-event, jsdom, jest-dom | Tests component behavior | Already in `package.json` |

If starting from scratch with **only your Class 27 source files** and a missing test setup, run `npm install` using the included `package.json`. Do not install `chance` unless your own separate lesson specifically uses it; this project does not.

**Important:** Use an up-to-date Node.js version compatible with the included Vite configuration (see `engines` in `package.json`). Commit your `package-lock.json` after `npm install` so classmates can use the same package versions. `index.html` must be HTML, not JSX.

## Open the demos

Run `npm run dev`. Use the **actual port** Vite prints (often `5173`).

| Demo | URL |
| --- | --- |
| Class 26 — class components | `http://localhost:5173/?demo=class` |
| Class 26 — function components | `http://localhost:5173/?demo=functions` |
| Class 27 — basic state | `http://localhost:5173/?demo=state-basic` |
| Class 27 — two state variables | `http://localhost:5173/?demo=state-two` |
| Class 27 — state object / default | `http://localhost:5173/?demo=state` |
| **Class 28 — effects and lifecycle** | **`http://localhost:5173/?demo=effect`** |

## 📂 Class 28 files and file order

The **new Class 28 demo files** are directly under `src/`, **not `src/class28/`**:

```text
src/
├── EffectTripPlanner.jsx            NEW: effect examples; the main demo
├── components/
│   └── VisitTimer.jsx               NEW: timer and cleanup
├── __tests__/
│   └── effect.test.jsx              NEW: Class 28 tests
├── styles/
│   └── class28.scss                 NEW: styles for effects panel
├── main.jsx                         UPDATED: ?demo=effect route
└── function-components/
    └── Header.jsx                   UPDATED: Class 28 navigation
```

**If your local Class 27 branch was flattened** (you moved files from `src/class27/` into `src/`): adjust the imports in `src/EffectTripPlanner.jsx` to `./components/DestinationPicker.jsx`, `./components/PackingChecklist.jsx`, and `./components/TripLengthCounter.jsx`. The download retains the original Class 27 files in `src/class27/` **to keep the existing demos working**. Only the new Class 28 code uses the paths shown above.

## 🎯 Today's goal

Use effects **only when React must work with something outside the component display**. Students have already learned `useState` and props. We add these examples one at a time:

1. **Mount / unmount:** an effect with an empty dependency array, and logs in the browser console.
2. **Dependency changes:** change a destination and update the browser tab title.
3. **Browser storage:** store selected destination and packing checklist when they change; restore those choices after reloading.
4. **Cleanup:** show a timer and hide it; demonstrate that React stops the interval.
5. **Testing:** verify changing the title, saving, restoring, and mounting/unmounting.

**Student-friendly definitions:**

- **Effect:** code that connects React to something outside the displayed JSX, like browser storage or a timer.
- **Mount:** a component appears on the webpage.
- **Unmount:** a component leaves the webpage.
- **Dependency:** a value an effect watches for changes.
- **Cleanup:** instructions to stop or undo an effect when it is no longer needed.
- **localStorage:** small saved browser data that can remain after refreshing a page.

## ⏱️ Instructor 45-minute plan

| Time | STEP | 📂 File |
| --- | --- | --- |
| 0–5 min | 1. Review state + run Class 28 | `src/main.jsx` |
| 5–11 min | 2. Mount and unmount | `src/EffectTripPlanner.jsx` |
| 11–19 min | 3. Dependency-based browser title | `src/EffectTripPlanner.jsx` |
| 19–29 min | 4. Save and restore with localStorage | `src/EffectTripPlanner.jsx` |
| 29–39 min | 5. Timer and cleanup | `src/components/VisitTimer.jsx` |
| 39–44 min | 6. Run tests and inspect browser | `src/__tests__/effect.test.jsx` |
| 44–45 min | 7. Exit check | `docs/CLASS_28_INSTRUCTOR_GUIDE.md` |

All 45 minutes happen **after PREP**. Follow the teacher script in `docs/CLASS_28_INSTRUCTOR_GUIDE.md` for the exact TELL, DO, EXPLAIN and CHECK-IN prompts. For a quick live test, use `test-me.md`.

## 👉 Run the tests

```bash
npm test
```

Or continuously:

```bash
npm run test:watch
```

The Class 27 test suite is preserved. If your local Class 27 branch already fixed its `getByRole('status')` ambiguity, keep your corrected test when merging this phase. The downloadable baseline also includes that fix.

## A few things NOT to do yet

- Do not add `useReducer` or action dispatching; that is **Class 29**.
- Do not build a real API or backend for this lesson.
- Do not copy a state value into a second state variable just to display it.
- Do not expect the static Lisbon itinerary to change with destination selection yet; it is still a Class 26 example.

## Save Class 28 to Git

```bash
git status
git add .
git commit -m "Class 28: effects, localStorage, and cleanup"
git push -u origin 401class28
```

If you already have a remote branch, simply `git push`.
