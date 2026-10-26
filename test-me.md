# ✅ Class 28 — TEST ME: Effects and Lifecycle (10–15 minutes)

## PREP (before the demo)

📂 [FILE TO OPEN] `src/main.jsx`  
Run `npm install` if needed, then `npm run dev` and open `http://localhost:5173/?demo=effect` (use the port Vite prints).

## STEP 1 — Browser tab title (⏱️ 3 minutes)

📂 [FILE TO OPEN] `src/EffectTripPlanner.jsx`  
➡️ NEXT FILE: `src/EffectTripPlanner.jsx`

👉 DO: Choose **Kyoto**. Look at the browser tab: it should say **Dream Trip | Kyoto**. Choose **Reykjavík** and check again.

💡 [EXPLAIN] `useEffect` keeps the tab title matched to the selected city.

## STEP 2 — Save and refresh (⏱️ 4 minutes)

📂 [FILE TO OPEN] `src/EffectTripPlanner.jsx`  
➡️ NEXT FILE: `src/components/VisitTimer.jsx`

👉 DO: Select **Kyoto** and check **Pack a carry-on bag**. Refresh. Confirm Kyoto is still selected and the packing total is still updated.

⚠️ !! [IMPORTANT] The **Lisbon sample itinerary remains static**; we are testing the selection banner and packing checklist.

## STEP 3 — Timer cleanup (⏱️ 3 minutes)

📂 [FILE TO OPEN] `src/components/VisitTimer.jsx`  
➡️ NEXT FILE: `src/__tests__/effect.test.jsx`

👉 DO: Open Developer Tools → Console. Click **Show timer**, wait a few seconds, then **Hide timer**. Look for `TIMER: setup` and `TIMER: cleanup` messages.

💡 [EXPLAIN] `clearInterval` stops repeating work when a component leaves the page.

## STEP 4 — Automated tests (⏱️ 3 minutes)

📂 [FILE TO OPEN] `src/__tests__/effect.test.jsx`  
➡️ NEXT FILE: `docs/CLASS_28_INSTRUCTOR_GUIDE.md`

👉 DO: Run `npm test`. Identify tests for changing browser title, saving, restoring, and toggling the timer. The older Class 27 tests should still run.

## ⏱️ MUST SHOW / CAN SKIP

**MUST SHOW:** change a city, refresh saved choices, show/hide timer.  
**CAN SKIP:** inspecting storage in Developer Tools, explaining Strict Mode logs in depth.
