# ✈️ Class 26 — TEST ME!
## Dream Trip Planner | React Components, Props, `.map()`, and SCSS

> **Live demo time: 15 minutes** (setup is done before the timer).  
> **Goal:** Prove the Class 26 React website works, show where its data comes from, and demonstrate why reusable components are helpful.

## 🚀 START HERE — Turn on the application

📂 **[FILE TO OPEN]** `package.json` (in the main project folder)

👉 **DO — Copy and paste these commands into the VS Code terminal:**

```bash
# Go to the project folder containing package.json first.
# Download packages only if you haven't installed them yet:
npm install

# Start the local website:
npm run dev
```

Keep the terminal running. Vite will print a **Local** URL, usually `http://localhost:5173/`.

⚠️ !! **[IMPORTANT]** Use **`npm run dev`**, **not** `npm run server`. This Class 26 project uses **Vite** to run the website; its `package.json` has no `server` script or separate backend. If Vite prints port `5174` or another port, use that port instead of `5173` below.

👉 **DO — Open these addresses in a browser (replace the port if necessary):**

```text
http://localhost:5173/?demo=class
http://localhost:5173/?demo=functions
```

💡 **[EXPLAIN]** A **development server** is a tool that shows your website on your own computer while you edit it. Saving a file usually updates the browser automatically.

⚠️ !! **[IMPORTANT]** The project must have `index.html` in the top-level folder. It should load `/src/main.jsx`. Do **not** paste React `.jsx` code into `index.html`.

---

## ⏱️ STEP 1 — Do both versions load? (2 minutes)

📂 **[FILE TO OPEN]** `src/main.jsx`  
➡️ **NEXT FILE:** `src/data/tripData.js`

🎯 **Goal:** Check the class-component and function-component versions of the same app.

👉 **DO:**

1. Open `?demo=class`. Check for the trip banner, **Lisbon**, **Kyoto**, and **Reykjavík** cards, daily itinerary, and packing checklist.
2. Click **Functions** at the top (or open `?demo=functions`). Confirm the same three destinations are displayed with the updated styling.
3. In `src/main.jsx`, point to this existing line:

```jsx
const isClassDemo = new URLSearchParams(window.location.search).get('demo') === 'class';
```

📢 **[TELL]** “This URL switch lets us compare two ways of writing React components. We have not added interactive React state yet.”

✅ **PASS:** Both versions load without a blank screen or an error.

---

## ⏱️ STEP 2 — Change one destination's data (3 minutes)

📂 **[FILE TO OPEN]** `src/data/tripData.js`  
➡️ **NEXT FILE:** `src/function-components/App.jsx`

🎯 **Goal:** Prove both versions get their destination information from the same file.

👉 **DO:**

1. Find `export const destinations = [`.
2. Inside the **Lisbon** object, find:

```js
city: 'Lisbon',
```

3. Temporarily replace it with:

```js
city: 'Lisbon ✨',
```

4. Save (`Ctrl + S`). Check the **Lisbon destination card** in both versions.
5. Change it back to `city: 'Lisbon',` and save again.

💡 **[EXPLAIN]** An **array** is a list of items. Each **object** in this array holds details about one destination. The components display those details.

❓ **[CHECK-IN QUESTIONS]** “Did we edit the card component to change its city?”  
**Answer:** No. We changed the data that the card receives.

✅ **PASS:** The destination card changes to **Lisbon ✨**, then returns to **Lisbon**.

---

## ⏱️ STEP 3 — Add a fourth destination (5 minutes)

📂 **[FILE TO OPEN]** `src/function-components/App.jsx`  
➡️ **NEXT FILE:** `src/data/tripData.js`

🎯 **Goal:** Show that `.map()` can reuse one card component to display many destinations.

👉 **DO:**

1. In `App.jsx`, find the existing line:

```jsx
{destinations.map((destination) => <DestinationCard key={destination.id} destination={destination} />)}
```

2. Explain: **`.map()`** goes through every destination in the array and creates a card. A **prop** (`destination={destination}`) supplies its details. A **key** (`destination.id`) helps React track each card.
3. Open `src/data/tripData.js`. Inside the `destinations` array, **after the Reykjavík object and before the closing `];`**, add this new object. Keep a comma between each object:

```js
{
  id: 'bangkok',
  city: 'Bangkok',
  country: 'Thailand',
  emoji: '🛕',
  theme: 'sunset',
  description: 'Temples, markets, and delicious street food.',
  days: 5,
  budget: '$$',
},
```

4. Save and return to the browser. Look for the **fourth destination card: Bangkok**.
5. Test the **Class** view too: Bangkok should appear there because both versions read the same array.

⚠️ !! **[IMPORTANT]** Use a **unique `id`** (`'bangkok'`) and an existing `theme` (`'sunset'`, `'blossom'`, or `'glacier'`). The function page has a hard-coded **“3 ideas”** label, so it may still say “3 ideas” even though four cards appear. That label does not affect the cards.

❓ **[CHECK-IN QUESTIONS]** “Why did Bangkok appear without creating `BangkokCard.jsx`?”  
**Answer:** React reused `DestinationCard` for the new item in the array.

✅ **PASS:** Four destination cards appear in both versions; no new card component was needed.

---

## ⏱️ STEP 4 — Trace props into a component (3 minutes)

📂 **[FILE TO OPEN]** `src/function-components/DestinationCard.jsx`  
➡️ **NEXT FILE:** `src/styles/main.scss`

🎯 **Goal:** Show students *how* a card gets the values it displays.

👉 **DO:**

1. Find the function declaration:

```jsx
export default function DestinationCard({ destination }) {
```

2. Point to these existing values in the file:

```jsx
{destination.city}
{destination.country}
{destination.description}
```

3. Explain that the parent (`App.jsx`) passes the `destination` prop to this child component.
4. Point to the same **Bangkok** card in the browser. No changes to `DestinationCard.jsx` were necessary.

💡 **[EXPLAIN]** **Props** are information a parent component sends to a child component. The same component can display different information each time it is used.

❓ **[CHECK-IN QUESTIONS]** “Where does `destination.city` come from?”  
**Answer:** From an object in `tripData.js`, passed in by `App.jsx`.

✅ **PASS:** Students can trace `tripData.js` → `App.jsx` → `DestinationCard.jsx` → browser.

---

## ⏱️ STEP 5 — Check the SCSS styling (2 minutes)

📂 **[FILE TO OPEN]** `src/styles/main.scss`  
➡️ **NEXT FILE:** `src/styles/_tokens.scss` (optional after the demo)

🎯 **Goal:** Confirm Sass styling works and the new card uses the same design as the others.

👉 **DO:**

1. Find `.destination-card` in `main.scss`.
2. Point to the reusable SCSS style, such as `@include m.card-surface(0);`.
3. Open `src/styles/_tokens.scss` briefly. Find the color and radius variables that styles reuse.
4. Return to the website. Verify **Bangkok has the same card layout** as the first three destinations.

📢 **[TELL]** “SCSS helps us reuse colors and styles. Sass turns SCSS into regular CSS that the browser can display.”

✅ **PASS:** Bangkok is styled correctly, and students can find one SCSS style or variable.

---

## ✅ Final check — What should work?

- [ ] `npm run dev` starts Vite without a fatal error.
- [ ] `?demo=class` loads the class-component version.
- [ ] `?demo=functions` loads the function-component version.
- [ ] Editing Lisbon in `tripData.js` updates the destination cards.
- [ ] Adding Bangkok creates a fourth card in both versions.
- [ ] `DestinationCard.jsx` gets data through props.
- [ ] The cards have consistent styling from SCSS/CSS.

👨‍🏫 **[TEACHER NOTE]** Class 26 is **static**. The checklist does not respond to clicks, and destination cards do not switch the active trip. That interactive behavior is introduced in **Class 27 with `useState`**. Adding Bangkok also does **not** automatically change the featured Lisbon trip or Lisbon itinerary; those use other data.

---

## ⏱️ 15-Minute Checkpoint — If you're running behind

**⭐ MUST SHOW:**

1. Start the app using `npm run dev` and open the function version.
2. Show the `destinations` array in `tripData.js`.
3. Add Bangkok and confirm the new card appears.
4. Show `.map()` in `App.jsx` and the `destination` prop in `DestinationCard.jsx`.

**⏭️ CAN SKIP OR SHORTEN:**

- Skip temporarily renaming Lisbon and go straight to adding Bangkok.
- Compare the Class version only once.
- Skip opening `_tokens.scss`; simply show the styled fourth card.

**[STUDENT TIP]** If the page goes blank, check the terminal for an error. Verify object commas, braces `{}`, the file you edited, and that the terminal running Vite is still open. You can undo the Bangkok addition afterward or keep it for practice.
