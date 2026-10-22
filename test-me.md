# ✈️ Dream Trip Planner — Class 27: TEST ME!

**Topic:** React `useState` — selecting destinations  
**Goal:** Test the destination buttons, add Bangkok, and confirm React updates the page.  
**Branch:** Class 27 (continue in your existing repository; do not create another React app)

> **📂 File paths in this guide use the Class 27 branch layout under `src/` — NOT `src/class27/`.**
>
> **⏱️ Suggested live activity: 15 minutes.**

---

## PREP — Start the website (2 minutes)

**🎯 Goal:** Open the working Class 27 destination selector.

**📂 [FILE TO OPEN]** `package.json` (project root)

👉 **DO**

1. Open your Dream Trip Planner repository in VS Code.
2. In the terminal, check that you are on the Class 27 branch:

   ```bash
   git branch --show-current
   ```

3. Install packages if you have not already done so on this branch, then start Vite:

   ```bash
   npm install
   npm run dev
   ```

4. Open the **Local** address shown in the terminal and add `?demo=state`:

   ```text
   http://localhost:5173/?demo=state
   ```

   **Use the port shown by your terminal** if it is not `5173`.

💡 **[EXPLAIN]** Vite runs our website on the computer. The `?demo=state` part opens the Class 27 version.

⚠️ **!! [IMPORTANT]** Leave `npm run dev` running while testing. You do **not** need React Native, Expo, a backend, or additional packages just to add a destination.

➡️ **NEXT FILE:** `src/StateTripPlanner.jsx`

---

## STEP 1 — Test the current destinations (3 minutes)

**🎯 Goal:** Confirm that clicking a destination changes the selected trip.

**📂 [FILE TO OPEN]** `src/StateTripPlanner.jsx`

👉 **DO — In the browser**

1. Find **Where are we going?**
2. Confirm that **Lisbon**, **Kyoto**, and **Reykjavík** appear.
3. Click **Kyoto**. The message should say **Kyoto, Japan**.
4. Click **Reykjavík**. The message should say **Reykjavík, Iceland**.
5. Click **Lisbon**. The message should say **Lisbon, Portugal**.
6. Confirm that the selected button's appearance changes with each click.

📢 **[TELL]** “React remembers the destination we clicked. The page changes without us manually editing the HTML.”

👉 **DO — Show the state in code**

Find these lines in `StateTripPlanner.jsx`:

```jsx
const [selectedId, setSelectedId] = useState(destinations[0].id);

const selectedPlace = destinations.find(
  (place) => place.id === selectedId
);
```

💡 **[EXPLAIN]**

- `selectedId` is the destination React remembers.
- `setSelectedId` is the function that changes that choice.
- `.find()` looks up the destination details matching the selected ID.
- The displayed message uses `selectedPlace.city` and `selectedPlace.country`.

❓ **[CHECK-IN QUESTIONS]** “If I choose Kyoto, what value does `selectedId` store?”  
**Answer:** `'kyoto'`.

➡️ **NEXT FILE:** `src/components/DestinationPicker.jsx`

---

## STEP 2 — Follow the button click (2 minutes)

**🎯 Goal:** Understand how a child component tells the parent which destination was selected.

**📂 [FILE TO OPEN]** `src/components/DestinationPicker.jsx`

👉 **DO**

Find the button inside `destinations.map(...)`:

```jsx
<button
  type="button"
  aria-pressed={selectedId === place.id}
  onClick={() => onSelect(place.id)}
  key={place.id}
>
```

📢 **[TELL]** “The button passes the clicked destination's ID to `onSelect`. The parent gave the child that function, so the parent can update the selected destination.”

💡 **[EXPLAIN]** `onSelect` is a **prop**: information or a function passed from a parent to a child. In this app, the parent passes `setSelectedId` as `onSelect`.

❓ **[CHECK-IN QUESTIONS]** “Do we need to create a separate button by hand for every city?”  
**Answer:** No. `.map()` creates one button for each object in the `destinations` array.

➡️ **NEXT FILE:** `src/data/tripData.js`

---

## STEP 3 — Add Bangkok, Thailand (4 minutes)

**🎯 Goal:** Add a destination **without** rewriting the React components.

**📂 [FILE TO OPEN]** `src/data/tripData.js`

👉 **DO**

1. Find the array beginning with `export const destinations = [`.
2. Find the **last existing destination object** (Reykjavík).
3. Add a **comma** after that object if one is missing.
4. Paste this **new object** before the array's final `];`:

   ```js
   {
     id: 'bangkok',
     city: 'Bangkok',
     country: 'Thailand',
     emoji: '🛕',
     theme: 'sunset',
     description: 'Street food, beautiful temples, and exciting markets.',
     days: 5,
     budget: '$$',
   },
   ```

5. Save the file (`Ctrl + S`).
6. Go back to the browser. **Bangkok** should now appear as a fourth destination.
7. Click Bangkok. The selection message should now say **Bangkok, Thailand**.

⚠️ **!! [IMPORTANT]** Keep the original three objects in the array. Only **add** the Bangkok object. Each `id` must be unique. The `sunset` theme already exists, so you do not need to add new CSS.

💡 **[EXPLAIN]** We changed the **data** in `tripData.js`. The existing `.map()` builds the new button automatically, and `useState` handles the selection.

❓ **[CHECK-IN QUESTIONS]** “Which React component did we rewrite to add Bangkok?”  
**Answer:** None. We only added a destination object to the data file.

➡️ **NEXT FILE:** `src/StateTripPlanner.jsx`

---

## STEP 4 — Verify the state update (2 minutes)

**🎯 Goal:** Check that the new destination works, not just that its button appears.

**📂 [FILE TO OPEN]** `src/StateTripPlanner.jsx`

👉 **DO — In the browser**

- [ ] Four destinations are visible: Lisbon, Kyoto, Reykjavík, Bangkok.
- [ ] Clicking **Bangkok** displays **Bangkok, Thailand**.
- [ ] Bangkok's button looks selected.
- [ ] Clicking **Lisbon** displays **Lisbon, Portugal** again.
- [ ] The webpage stays open with no error message.

📢 **[TELL]** “The clicked button calls `setSelectedId`. React remembers the new ID and displays the matching city and country.”

⚠️ **!! [IMPORTANT]** The **Lisbon sample itinerary** remains unchanged. Class 27 changes the selected destination, **not** the itinerary data. Editing itineraries is planned for Class 29.

➡️ **NEXT FILE:** `src/__tests__/state.test.jsx` *(optional automated test)*

---

## STEP 5 — Optional: Automate the Bangkok test (2 minutes)

**🎯 Goal:** Write a test that repeats the click and checks the result.

**📂 [FILE TO OPEN]** `src/__tests__/state.test.jsx`

> If your branch puts tests in a different location, open the existing `state.test.jsx`. Keep its current imports and use the same test style.

👉 **DO**

1. In the existing test file, make sure the imports already include `render`, `screen`, `userEvent`, and `StateTripPlanner`.
2. Add this test **inside the existing `describe(...)` block**, or alongside the other tests:

   ```jsx
   it('selects the new Bangkok destination', async () => {
     const user = userEvent.setup();
     render(<StateTripPlanner />);

     await user.click(
       screen.getByRole('button', { name: /Bangkok Thailand/i })
     );

     expect(screen.getByRole('status')).toHaveTextContent(
       'Bangkok, Thailand'
     );
   });
   ```

3. In the terminal, run:

   ```bash
   npm test
   ```

4. Confirm the new test and the existing Class 27 tests pass.

💡 **[EXPLAIN]** An automated test acts like a user: it opens a component, clicks a button, and checks the displayed result.

**[STUDENT TIP]** If `npm test` cannot find a test file, check where the test files and test configuration are located in your branch before changing imports.

➡️ **NEXT FILE:** `src/data/tripData.js` *(student practice)*

---

## 🎓 STUDENT CHALLENGE — Add your own destination (after the demo)

**📂 [FILE TO OPEN]** `src/data/tripData.js`

Add one new place using the same fields as the existing destination objects:

```js
{
  id: 'unique-city-id',
  city: 'Your City',
  country: 'Your Country',
  emoji: '🌎',
  theme: 'sunset',
  description: 'One sentence about this destination.',
  days: 4,
  budget: '$$',
},
```

**Checklist**

- [ ] My destination has a **unique ID**.
- [ ] I added a comma where needed and kept valid JavaScript syntax.
- [ ] A new destination button appears.
- [ ] The selection message changes when I click it.
- [ ] The original destinations still work.
- [ ] I can explain how `useState`, `onSelect`, and `.map()` work together.

**Save your work** *(on your existing Class 27 branch)*:

```bash
git add src/data/tripData.js test-me.md
git commit -m "Class 27: test and add destinations"
git push
```

If you also added a test, include its actual path in `git add`, too.

---

## ⏱️ 15-Minute Checkpoint — If time is running short

**⭐ MUST SHOW:**

- **STEP 1:** Click Kyoto and show the changed message.
- **STEP 2:** Show `onClick={() => onSelect(place.id)}`.
- **STEP 3:** Add Bangkok in `src/data/tripData.js`.
- **STEP 4:** Click Bangkok and show the new message.

**⏭️ CAN SKIP OR SHORTEN:**

- Skip the detailed `.find()` explanation.
- Skip clicking all three original destinations; test one before adding Bangkok.
- Assign **STEP 5 (automated test)** as independent practice.
- Let students add their own destination after class.

**🎯 Final takeaway:** *One data array creates all the buttons. A click changes React state. React shows the newly selected destination.*
