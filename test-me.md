# ✈️ Class 29 — TEST ME! (`useReducer`)

**10–15 minute live classroom test** · Uses flat `src/` paths · No `src/class29/`

## PREP (before the timer)

```bash
npm install
npm run dev
```

Open the **actual Vite URL** with `?demo=reducer` (often `http://localhost:5173/?demo=reducer`).

## STEP 1 — Check the starting itinerary (⏱️ 2 minutes)

📂 **[FILE TO OPEN]** `src/data/tripData.js`

➡️ **NEXT FILE:** `src/components/ItineraryEditor.jsx`

🎯 **Goal:** Identify the sample days and starting activities.

👉 **DO:** Confirm that the editor shows **3 days**. Find Day 1's **Breakfast at a café**. Refresh the page and confirm the sample still appears.

📢 **[TELL]** “These sample days become the reducer's initial state.”

## STEP 2 — Test ADD_ACTIVITY (⏱️ 3 minutes)

📂 **[FILE TO OPEN]** `src/components/ItineraryEditor.jsx`

➡️ **NEXT FILE:** `src/ReducerTripPlanner.jsx`

👉 **DO:** Enter **Visit the market**, **2 PM**, and **Day 1**. Click **Add activity**. Check that the new item appears on Day 1.

💡 **[EXPLAIN]** `onAdd` sends form data to the parent. The parent uses `dispatch` to request the update.

❓ **[CHECK-IN QUESTIONS]** “What changed on the page?” **Answer:** A new activity was added to the itinerary.

## STEP 3 — Test MOVE and REMOVE (⏱️ 4 minutes)

📂 **[FILE TO OPEN]** `src/reducers/itineraryReducer.js`

➡️ **NEXT FILE:** `src/reducers/itineraryReducer.js` (reset action)

👉 **DO:**
1. Find **Visit the market** on Day 1. Click **Move to Day 2**.
2. Confirm it moved to Day 2 and no longer appears in Day 1.
3. Click **Remove** next to **Visit the market** on Day 2.
4. Confirm it disappears.

💡 **[EXPLAIN]** `MOVE_ACTIVITY` changes two day lists together; `REMOVE_ACTIVITY` uses `.filter()`.

## STEP 4 — Test RESET_ITINERARY (⏱️ 2 minutes)

📂 **[FILE TO OPEN]** `src/reducers/itineraryReducer.js`

➡️ **NEXT FILE:** `src/__tests__/reducer.test.jsx`

👉 **DO:** Click **Reset sample itinerary**. Confirm **Breakfast at a café** is on Day 1 and the custom activity is gone.

⚠️ **!! [IMPORTANT]** Resetting the itinerary does not reset the Class 28 destination or packing choices. Those features still use their own state.

## STEP 5 — Run automated tests (⏱️ 3 minutes)

📂 **[FILE TO OPEN]** `src/__tests__/reducer.test.jsx`

➡️ **NEXT FILE:** `docs/CLASS_29_STUDENT_PRACTICE.md`

👉 **DO:** Run:

```bash
npm test
npm run build
```

Expected result: all Class 27, 28, and 29 tests pass and Vite builds the webpage. If they fail, read the first error and check imports, action names, and missing packages.

## ⏱️ MUST SHOW vs CAN SKIP

**⭐ MUST SHOW:** add → move → remove → reset, and how those changes relate to reducer actions.

**⏭️ CAN SKIP OR SHORTEN:** the refresh check and full test-suite explanation. Ask students to run `npm test` after class if time runs short.
