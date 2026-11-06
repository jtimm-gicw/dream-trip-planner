# ✈️ CLASS 28 — How `useState`, `useEffect`, and `localStorage` Work Together

> **Code 401 · React Review and Class 28 Teaching Handout**  
> **Project:** Dream Trip Planner · Branch: `401class28`  
> **Level:** Beginner-friendly · Explains *what*, *why*, *when*, and *how*

---

## 🎯 Goal

Understand the three different jobs of **`useState`**, **`useEffect`**, and **`localStorage`**, and follow how they work together to remember a user's choices **even after refreshing the browser**.

## 🌟 The simplest explanation

Imagine you are planning a trip and select **Kyoto**.

| Tool | Its job | Easy way to remember it |
|---|---|---|
| **`useState`** | Remembers your **current** choice inside a running React component and helps update the screen. | 🧠 **Working memory** |
| **`useEffect`** | Runs code to **synchronize React with something outside React**, such as browser storage or a timer. | 🔄 **The messenger** |
| **`localStorage`** | Saves small amounts of text **in the browser**, so they usually remain after a refresh or browser restart. | 📦 **The storage box** |

**Say to students:** “`useState` remembers what the user chose *right now*. `useEffect` can send that choice to the browser. `localStorage` keeps a copy for the next time the page opens.”

> ⚠️ **IMPORTANT:** `useEffect` does **not** save data by itself. The browser's `localStorage.setItem()` actually saves it. `useEffect` determines *when to run that save operation*.

---

## 1. 📂 [FILE TO OPEN] `src/EffectTripPlanner.jsx` — Imports

```jsx
import { useState, useEffect } from 'react';
```

| Part | Plain-English meaning |
|---|---|
| `import` | Bring code from another file or package into this file. |
| `{ useState, useEffect }` | Bring in **two named React Hooks**. |
| `from 'react'` | Both Hooks come from the installed React package. |
| `useState` | Lets a component keep changing information. |
| `useEffect` | Lets a component synchronize with outside systems. |

**Important:** `localStorage` is **not imported from React**. It is built into the browser and can be accessed with `window.localStorage`.

```jsx
window.localStorage.getItem('myKey'); // Read saved text
window.localStorage.setItem('myKey', 'Hello'); // Save text
```

### 💡 Why do we need both Hooks?

- **`useState`** is needed because clicking a destination should immediately change the React page.
- **`useEffect`** is useful because we also want to tell the **browser** to save the new destination.
- **`localStorage`** keeps the saved value available when the app loads again.

---

## 2. 🧠 `useState` — Remember the current value

### The basic pattern

```jsx
const [value, setValue] = useState(startingValue);
```

**One argument goes into `useState`:** `startingValue`. React returns **two things** that we name using array destructuring.

| Code | Meaning |
|---|---|
| `startingValue` | The value to use the **first time** the component initializes its state. |
| `value` | The current state value. **Read** this to show information. |
| `setValue` | A function React gives us. **Call** this to request an update. |
| `[value, setValue]` | Array destructuring: name the two values React returns. |

### Example: The trip-length counter

```jsx
const [days, setDays] = useState(4);

function addDay() {
  setDays((previousDays) => previousDays + 1);
}
```

**Read it like this:** “Start with 4 days. `days` is the number React remembers. `setDays` asks React to change it.”

- `4` is the **initial argument** to `useState`.
- `previousDays` is a **parameter of the updater function**. React provides the pending previous value when processing the update.
- `previousDays + 1` is the **new state value** returned by the updater.
- You do **not** change `days` directly with `days = 5`.

### What happens after clicking `+`?

```text
User clicks +
     ↓
addDay() runs
     ↓
setDays(previousDays => previousDays + 1)
     ↓
React updates state: 4 → 5
     ↓
React displays: 5 days
```

**But if the page refreshes:** `useState(4)` starts at 4 again unless the component gets a saved starting value from somewhere else.

---

## 3. 🔄 `useEffect` — Work with something outside React

### The basic pattern

```jsx
useEffect(() => {
  // SETUP: synchronize with an outside system.

  return () => {
    // OPTIONAL CLEANUP: stop or undo the setup.
  };
}, [dependency]);
```

### What are the arguments?

`useEffect` accepts **two arguments**:

1. **Setup function** — `() => { ... }` — the code React runs after the component is committed to the page. The empty parentheses mean the function takes **no parameters**. It may return an optional cleanup function.
2. **Dependency array** — `[dependency]` — a list of values used by the Effect that React should check. React reruns the Effect when a listed value changes.

### The three common dependency patterns

| Code | What happens |
|---|---|
| `useEffect(() => { ... });` | Runs after **every committed render** because there is no dependency array. |
| `useEffect(() => { ... }, []);` | Sets up after the initial mount; cleanup on unmount. **In development Strict Mode**, React may run an extra setup/cleanup cycle. |
| `useEffect(() => { ... }, [days]);` | Runs after the initial mount and again when `days` changes. |

> ⚠️ **IMPORTANT:** A dependency array does not “watch the browser” directly. React compares the specified values between renders. Also, you do **not** need an Effect simply to calculate a display value from existing state.

### Example A: Change the browser tab title

```jsx
useEffect(() => {
  document.title = `Dream Trip | ${selectedPlace.city}`;
}, [selectedPlace.city]);
```

**Read it like this:** “When the chosen city changes, update the browser tab title.”

- `document.title` is controlled by the **browser**, not by JSX.
- `selectedPlace.city` is the value used by this Effect.
- `[selectedPlace.city]` tells React when the Effect should run again.
- There is **no cleanup** in this simple example because we are just setting a title.

### Example B: Save state to the browser

```jsx
useEffect(() => {
  window.localStorage.setItem('tripDays', String(days));
}, [days]);
```

**Read it like this:** “After `days` changes, tell the browser to save the new number.”

- `'tripDays'` is the **storage key** — the name of the saved item.
- `String(days)` turns a number like `7` into text like `'7'`.
- `[days]` tells React to save again whenever the number changes.

---

## 4. 📦 `localStorage` — Keep information after a refresh

`localStorage` is a built-in browser storage feature. **It stores strings**, not live React state or JavaScript objects.

### The most useful methods

```jsx
window.localStorage.setItem('tripDays', '7'); // Save
window.localStorage.getItem('tripDays');      // Read: '7'
window.localStorage.removeItem('tripDays');   // Delete one saved value
```

| Method | Parameters | What it does |
|---|---|---|
| `setItem(key, value)` | **Two:** storage name and text to save | Saves or replaces the value. |
| `getItem(key)` | **One:** storage name | Reads the saved string; returns `null` if absent. |
| `removeItem(key)` | **One:** storage name | Removes that saved item. |

**Example:** `getItem('tripDays')` returns the string `'7'`, **not** the number `7`. Use `Number(...)` to convert a valid saved number back to a number.

### Saving objects and arrays: JSON

Your Dream Trip Planner saves both a selected destination and an array of packing items.

```jsx
const tripChoices = {
  selectedId: 'kyoto',
  packingItems: [{ id: 1, done: true }],
};

// Convert JavaScript data into text before saving.
window.localStorage.setItem(
  'dreamtrip-class28',
  JSON.stringify(tripChoices)
);

// Read the text and convert it back to JavaScript data.
const raw = window.localStorage.getItem('dreamtrip-class28');
const restoredChoices = raw ? JSON.parse(raw) : null;
```

- **`JSON.stringify(object)`** → turns a JavaScript object into a string.
- **`JSON.parse(string)`** → turns a valid JSON string back into JavaScript data.
- `JSON.parse()` can fail if saved text is broken, so your actual `readSavedTrip()` uses `try/catch` and checks the contents.

> ⚠️ **IMPORTANT:** `localStorage` belongs to the current browser and website origin. It is **not a database account**, does not sync automatically across devices, and should not hold passwords or other sensitive information. Browser settings or user actions can clear it.

---

## 5. 🔗 Put the three ideas together — One complete example

### Scenario: Save the number of trip days

This small teaching example does **both jobs**: restore the saved number when the component starts, and save it again when the user changes it.

```jsx
import { useState, useEffect } from 'react';

export default function SavedTripCounter() {
  // 1. INITIALIZE STATE: use a saved number, or start at 4.
  const [days, setDays] = useState(() => {
    const savedText = window.localStorage.getItem('tripDays');
    if (savedText === null) return 4;

    const savedNumber = Number(savedText);
    return Number.isInteger(savedNumber) && savedNumber >= 1
      ? savedNumber
      : 4;
  });

  // 2. EFFECT: save whenever the number changes.
  useEffect(() => {
    window.localStorage.setItem('tripDays', String(days));
  }, [days]);

  // 3. EVENT HANDLER: update React state after a click.
  function addDay() {
    setDays((previousDays) => previousDays + 1);
  }

  // 4. JSX: show the current state.
  return (
    <div>
      <p>{days} days</p>
      <button type="button" onClick={addDay}>+ Add day</button>
    </div>
  );
}
```

### Follow the entire journey

```text
FIRST PAGE LOAD
  Browser checks localStorage for 'tripDays'
                     ↓
  useState initializes with saved value (or 4)
                     ↓
  React displays that number
                     ↓
  useEffect saves the current number

USER CLICKS +
  onClick → addDay() → setDays(...)
                     ↓
  React state changes, e.g. 4 → 5
                     ↓
  React displays 5 days
                     ↓
  useEffect runs because [days] changed
                     ↓
  localStorage.setItem saves '5'

USER REFRESHES
  React starts the component again
                     ↓
  useState reads '5' from localStorage
                     ↓
  React displays 5 days ✅
```

### Why not put `localStorage.setItem()` directly in the JSX?

Rendering should describe **what to display**, not repeatedly write to outside systems. The Effect keeps browser storage synchronized when the relevant state changes.

### Why do we read storage *inside the `useState` initializer*, not in a saving Effect?

We need the saved value **as the starting state**. If we started at 4 and only read the saved value later in an Effect, the page could briefly show 4 before updating to the saved number. The initializer avoids that mismatch. `useState(() => readSavedValue())` is called **lazy initialization**: React uses the function to determine the initial state.

---

## 6. 🧩 Connect this to your actual Dream Trip Planner

**📂 [FILE TO OPEN] `src/EffectTripPlanner.jsx`**

Your app reads the saved choices first:

```jsx
const STORAGE_KEY = 'dreamtrip-class28';

const [savedAtStart] = useState(readSavedTrip);
const [selectedId, setSelectedId] = useState(
  savedAtStart?.selectedId ?? destinations[0].id
);
```

**Explain each name:**

| Name | Meaning |
|---|---|
| `STORAGE_KEY` | The label used to save and find this app's data in the browser. |
| `readSavedTrip` | A regular JavaScript function that reads and validates saved data. |
| `savedAtStart` | The saved object returned at initialization, or `null`. |
| `selectedId` | The current destination ID in React state. |
| `setSelectedId` | The setter used when the user chooses a new destination. |
| `destinations[0].id` | Fallback starting destination if none was saved. |
| `?.` | Optional chaining: safely reads a property when the object might be `null`. |
| `??` | Uses the right-hand fallback if the left value is `null` or `undefined`. |

Next, a child component lets the user make a choice:

```jsx
<DestinationPicker
  destinations={destinations}
  selectedId={selectedId}
  onSelect={setSelectedId}
/>
```

Inside **`src/class27/components/DestinationPicker.jsx`**, the button asks the parent to change state:

```jsx
onClick={() => onSelect(place.id)}
```

Then **`EffectTripPlanner.jsx`** saves the updated choices:

```jsx
useEffect(() => {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ selectedId, packingItems })
  );
}, [selectedId, packingItems]);
```

### 📢 [TELL] Follow one click from beginning to end

1. “I click **Kyoto** in `DestinationPicker`.”
2. “The child calls `onSelect(place.id)`.”
3. “That calls `setSelectedId()` in the parent.”
4. “React remembers Kyoto and updates the webpage.”
5. “The Effect sees that `selectedId` changed.”
6. “The browser saves the selection using `localStorage.setItem()`.”
7. “When I refresh, `readSavedTrip()` reads Kyoto so React can start with it again.”

> 💡 **Notice:** Your current Class 28 app saves **destination and packing choices**. It does **not** save trip length unless you add a storage feature to the counter too. This is why some values persist and others reset.

---

## 7. ⏱️ Why the timer needs an Effect and cleanup

**📂 [FILE TO OPEN] `src/components/VisitTimer.jsx`**

A browser timer is another outside system, but unlike saving data, it needs to be **stopped**.

```jsx
const [seconds, setSeconds] = useState(0);

useEffect(() => {
  const timerId = window.setInterval(() => {
    setSeconds((previous) => previous + 1);
  }, 1000);

  return () => {
    window.clearInterval(timerId);
  };
}, []);
```

| Code | Meaning |
|---|---|
| `seconds` | Current number displayed by React. |
| `setSeconds` | Requests an updated number. |
| `window.setInterval(callback, 1000)` | Browser runs the callback approximately every 1,000 milliseconds (1 second). |
| `previous` | Parameter that receives the latest pending state value when React processes the update. |
| `timerId` | The identifier for this particular browser timer. |
| `return () => { ... }` | The **cleanup function** returned to React. |
| `window.clearInterval(timerId)` | Stops the timer when cleanup runs. |
| `[]` | No changing dependencies, so ordinary `seconds` updates do not restart the timer. |

**📢 [TELL]** “`useState` remembers the seconds. `useEffect` asks the browser to start the timer. Cleanup asks the browser to stop it when the timer component is removed.”

> ⚠️ **Strict Mode note:** During development, React can run an additional setup → cleanup → setup cycle. That does **not** mean production creates two permanent timers. Proper cleanup ensures only the intended interval remains active.

---

## 8. ❓ Quick check-in questions and answers

**1. Which Hook remembers the selected destination?**  
**Answer:** `useState`.

**2. Which Hook tells the browser to save the updated choice?**  
**Answer:** `useEffect` runs the code that calls `localStorage.setItem()`.

**3. What actually stores the saved choice?**  
**Answer:** The browser's `localStorage`.

**4. Does `useEffect` have to be used every time we update the screen?**  
**Answer:** No. Updating React state already causes React to render the updated information.

**5. Why do we use `[selectedId]` or `[days]`?**  
**Answer:** To rerun that Effect when the listed value changes (and after the initial mount).

**6. Why does `getItem()` need `Number()` for numeric values?**  
**Answer:** Because `localStorage` returns text strings, not numbers.

**7. Why does the timer return a function?**  
**Answer:** That function is cleanup. React calls it to stop the interval when needed.

**8. What happens to ordinary `useState` after a browser refresh?**  
**Answer:** The component initializes again, using its starting value unless the app restores saved data.

**9. Why do we use `JSON.stringify()`?**  
**Answer:** To convert an object or array into text for `localStorage`.

**10. Is `useEffect` the same as `localStorage`?**  
**Answer:** No. `useEffect` is part of React; `localStorage` is a browser storage feature.

---

## 9. 👨‍🏫 Two-minute teaching script

> “In our last class, `useState` allowed React to remember what a person clicked. If I choose Kyoto, React updates the page. But when I refresh, the app starts again and my choice can disappear.
>
> Today we're adding two ideas. First, `localStorage` is like a little storage box inside the browser. It can keep a copy of our choice. Second, `useEffect` is how we tell React to save our current choice to that outside storage whenever the choice changes.
>
> When the app starts, it checks the storage box. If Kyoto was saved, `useState` starts with Kyoto. If nothing was saved, it uses the usual starting destination.
>
> So remember: **`useState` holds the current value. `useEffect` runs the save operation. `localStorage` keeps the saved copy.** And for timers, an Effect can also return cleanup to stop what it started.”

---

## ⭐ Final cheat sheet

```text
useState     → REMEMBER current data inside React
setState     → REQUEST a state change
useEffect    → SYNCHRONIZE with an outside system
[dependency] → RERUN the Effect when that value changes
localStorage → SAVE text in the browser
getItem     → READ text from storage
setItem     → WRITE text to storage
JSON.stringify → OBJECT/ARRAY → TEXT
JSON.parse     → TEXT → OBJECT/ARRAY
cleanup     → STOP or UNDO an Effect's setup
```

**One sentence students should leave with:**  
**“`useState` remembers it now, `useEffect` helps save it, and `localStorage` remembers it after refresh.”**

---

*End of Class 28 beginner's guide · Dream Trip Planner*
