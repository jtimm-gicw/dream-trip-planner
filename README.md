# ✈️ Dream Trip Planner — Code 401, Class 26

> **React Function Components + Props + SCSS**  
> A **web-based React/Vite app** that grows across Classes **26 → 27 → 28 → 29**.
>
> **Today:** Two versions of one travel planner: **class components + plain CSS** first, then **function components + SCSS**. All trip content is static in Class 26. There are no forms that modify data yet.

## 🎯 Class 26 learning goals

By the end of the code-along, students should be able to:

1. Recognize the structure of a React component written as a JavaScript **class** versus a **function**.
2. Explain **JSX**, **props**, **parent/child components**, and **one-way data flow** in familiar language.
3. Use `.map()` and a stable `key` to display a collection of items.
4. Explain the difference between ordinary CSS and **SCSS variables, mixins, and nesting**.
5. Locate the single, intentionally small `useEffect` preview that updates the browser tab title; save the full effect/lifecycle lesson for **Class 28**.

**Important:** The separate Class 26 **Insertion Sort** code challenge is not a required feature of this React app. Treat sorting practice and component practice as separate exercises unless the instructor assigns an extension.

---

## 1. What students need to install

| Tool / package | What it does | Install instructions |
|---|---|---|
| **Node.js** | Runs local JavaScript tooling | Have Node **20.19+** or **22.12+** (or later compatible versions) and npm installed. Check below. |
| **npm** | Downloads project packages | Comes with most Node.js installations. |
| **Git** | Tracks code changes | Install Git on your machine. |
| **GitHub account** | Stores/shares your repository | Free account; repository creation is optional for running locally. |
| `react` | Creates UI components | Installed automatically by `npm install` in this project. |
| `react-dom` | Displays React in the browser | Installed automatically. |
| `vite` | Starts the development server and builds the app | Installed as a development dependency. |
| `@vitejs/plugin-react` | Supports React within Vite | Installed as a development dependency. |
| `sass` | Compiles `.scss` styles into CSS | Installed as a development dependency. |

```bash
node --version
npm --version
git --version
```

**Do not install React, Vite, or Sass globally.** They are already declared in the provided `package.json`. There is **no backend, database, API key, routing package, React Native, Expo, Axios, or CSS framework** needed for Class 26.

### OPTION A — Run the provided finished project (recommended)

1. Download and unzip `dream-trip-planner-class26.zip`.
2. Open the unzipped folder in VS Code.
3. In the VS Code terminal, from the folder that contains `package.json`, run:

```bash
npm install
npm run dev
```

4. Open the **Local** link Vite prints (usually `http://localhost:5173/`).
5. Compare the two versions:

```text
http://localhost:5173/?demo=class       ← class components + plain CSS
http://localhost:5173/?demo=functions   ← function components + SCSS (default)
```

The **Compare** links at the top of the page also switch versions. They change the URL and refresh the page; this is not `useState`.

**Common mistake:** `npm run dev` must be run **inside** the project folder (next to `package.json`), not in the parent folder.

### OPTION B — Scaffold a fresh Vite project during the lecture

If you want students to practice creating the project from scratch rather than unzipping it:

```bash
npm create vite@latest dream-trip-planner -- --template react
cd dream-trip-planner
npm install
npm install -D sass
npm run dev
```

The Vite React template already includes React, React DOM, Vite and the React plugin. `npm install -D sass` adds SCSS support. To match this particular teaching demo, **copy the supplied `src/`, `index.html`, and any needed root files** into the scaffold, or use the provided completed project. You do **not** need to run Option A and Option B together.

> This package ships with a ready-to-run Vite configuration and a `package.json`. Option A is the shortest reproducible classroom setup.

---

## 2. Git repository setup — one repo for the entire four-class project

**Recommended repository name:** `dream-trip-planner`.

You only need **one** project repository for Classes 26–29. Do **not** create a new repo every class. The two Class 26 demos are two views of the same Vite app, not two separate projects.

For a new local repository, from the project folder:

```bash
git init -b main
git add .
git commit -m "Class 26: static React components and SCSS"
```

Then, on GitHub, create an **empty** public repository called `dream-trip-planner` (do **not** add an auto-generated README, since this folder already includes one). Copy the actual repository URL from GitHub and replace `YOUR-USERNAME` below:

```bash
git remote add origin https://github.com/YOUR-USERNAME/dream-trip-planner.git
git push -u origin main
```

If your organization blocks GitHub SSH traffic, the HTTPS remote above is an alternative; it may still require GitHub authentication. Avoid committing `node_modules`, `.env`, or build output: `.gitignore` excludes them.

When Class 26 is finished, optionally mark a known-good checkpoint:

```bash
git tag class26-complete
git push origin class26-complete
```

For Class 27, continue in the **same repository**. Commit each milestone so you can demonstrate how an existing application evolves. Optionally use a `class27-state` branch and merge it after reviewing the changes.

---

## 3. What the application displays today

- A travel planning header, a featured trip to Lisbon, and a link that scrolls to the itinerary.
- Three destination cards rendered from a JavaScript array.
- Three itinerary day cards with scheduled activities.
- A **read-only** packing/travel checklist showing example completion marks.
- Two demo URLs for comparing React class components/CSS with function components/SCSS.

**Not yet implemented:** adding destinations, clicking checklist tasks, saving data, changing itinerary days, API requests, or reducer actions. Those belong in Classes 27–29.

## 4. Project file structure

```text
dream-trip-planner/
├── .gitignore
├── README.md                      ← install/run/Git instructions
├── index.html                     ← HTML entry point
├── package.json                   ← runtime + development packages
├── vite.config.js                 ← React support in Vite
├── docs/
│   ├── CLASS_26_INSTRUCTOR_GUIDE.md
│   ├── STUDENT_PRACTICE.md
│   └── ROADMAP_26-29.md
└── src/
    ├── main.jsx                   ← class/functional demo URL switch
    ├── data/
    │   └── tripData.js            ← static data used by BOTH demos
    ├── class-components/
    │   ├── ClassTripPlanner.jsx   ← classes + this.props + componentDidMount
    │   └── class-demo.css         ← repeated plain CSS styles
    ├── function-components/
    │   ├── App.jsx                ← parent component + small useEffect preview
    │   ├── Header.jsx             ← props
    │   ├── Hero.jsx               ← object props
    │   ├── DestinationCard.jsx    ← reusable UI item
    │   ├── DayPlan.jsx            ← .map(), nested list, stable keys
    │   └── Checklist.jsx          ← static list and derived count
    └── styles/
        ├── base.css               ← CSS shared by both versions
        ├── _tokens.scss           ← SCSS variables
        ├── _mixins.scss           ← SCSS mixins
        └── main.scss              ← SCSS nesting and @include
```

---

## 5. How Class 26 React pieces connect

```text
src/data/tripData.js
      │  plain objects and arrays
      ▼
src/function-components/App.jsx (PARENT)
      │
      ├── <Header version="functions" />
      ├── <Hero trip={trip} />
      ├── destinations.map(...) ──► <DestinationCard destination={...} />
      ├── itinerary.map(...) ────► <DayPlan day={...} />
      └── <Checklist items={checklist} />

      Parent sends props DOWN to children.
      Children READ and DISPLAY those props.
      No state setter, reducer, or data modification yet.
```

### A small code example to point at

```jsx
function DestinationCard({ destination }) {
  return <h3>{destination.city}</h3>;
}

// Parent uses .map() and a stable key from the data.
{destinations.map((destination) => (
  <DestinationCard key={destination.id} destination={destination} />
))}
```

- **Component:** A reusable piece of the screen.
- **JSX:** HTML-like syntax inside JavaScript. It describes what React displays.
- **Props:** Information a parent passes to a child. Treat props as read-only.
- **Key:** A stable identifier React uses when rendering multiple siblings in a list.
- **SCSS:** A styling language that compiles into CSS. The browser still reads CSS, not SCSS directly.

### Why is there a `useEffect` in Class 26?

The facilitator notes suggest a tiny hook that changes the **browser title bar**. It is included **only in `function-components/App.jsx`**:

```jsx
useEffect(() => {
  document.title = 'Dream Trip | Function Components';
}, []);
```

This is a **preview** of a hook students encountered before. Do not expand into effect dependencies, lifecycle diagrams, timers, or cleanup until **Class 28**. In development, React Strict Mode can run effect setup more than once to help detect issues.

---

## 6. Introducing SCSS: three things to show

Open `src/styles/main.scss` alongside `src/class-components/class-demo.css`.

**A. Variable:** Define a color once and reuse it.

```scss
$purple: #6055cc;
.button { color: $purple; }
```

**B. Mixin:** Reuse a collection of CSS rules.

```scss
@mixin card-surface {
  background: white;
  border: 1px solid #e9eaf2;
  border-radius: 22px;
}
.card { @include card-surface; }
```

**C. Nesting:** Organize related selectors together.

```scss
.card {
  h3 { font-weight: 800; }
  &:hover { transform: translateY(-2px); }
}
```

In our actual app, mixins and variables live in separate **partial** files and are loaded with modern Sass `@use`. `sass` is the only extra development package needed.

---

## 7. The four-class build plan

| Class | Today's focus | What changes in Dream Trip Planner? | Separate code challenge |
|---|---|---|---|
| **26** | Function components; class comparison; SCSS | Static travel cards, itinerary, checklist, props, `.map()` | Insertion Sort |
| **27** | `useState` | Select a destination/day; add an activity; interact with checklist | Merge Sort |
| **28** | `useEffect` + lifecycle | Save/load itinerary using `localStorage`; sync tab title; demonstrate effect cleanup | Quick Sort |
| **29** | `useReducer` | Refactor related activity/checklist updates into named actions | Mock interviews: Merge Sort / Quick Sort |
| **30** | Hash tables / behavioral interviews | **No required new React feature**; optional destination lookup extension | Hash Tables Implementation |

See [docs/ROADMAP_26-29.md](docs/ROADMAP_26-29.md) for the exact files and suggested action types for future classes.

---

## 8. Check your app / troubleshoot

```bash
npm run dev       # local development
npm run build     # verifies that Vite can compile a production build
npm run preview   # preview the built version
```

| Problem | Try this |
|---|---|
| `npm: command not found` | Install Node.js and open a new terminal. |
| `Missing script: dev` | Run the command in the folder containing this project's `package.json`. |
| Vite says Node is too old | Upgrade to a supported Node version (see version requirement above). |
| SCSS import fails | In the project folder, run `npm install` or `npm install -D sass`. |
| Blank page | Check the terminal and browser developer console for import/JSX errors. |
| Browser says the port is busy | Use the **Local** URL printed by Vite; it may select a different port. |
| Git push is rejected | Verify your remote and authentication; `git remote -v` shows the URL. |

### Instructor resources

- [45-minute live demo script](docs/CLASS_26_INSTRUCTOR_GUIDE.md)
- [Student practice / checkpoints](docs/STUDENT_PRACTICE.md)
- [Classes 26–29 implementation roadmap](docs/ROADMAP_26-29.md)

**Curriculum grounding:** Built around the provided Class 26–29 facilitator notes. The Google Classroom assignment URL supplied by the instructor requires authentication, so the **exact lab instructions could not be verified**. This lesson is aligned to the demonstrated topics in the facilitator notes rather than claiming a verbatim match to the private assignment.

**Official references:** [Vite getting started](https://vite.dev/guide/) · [Vite SCSS support](https://vite.dev/guide/features.html#css-pre-processors) · [React: Passing props](https://react.dev/learn/passing-props-to-a-component) · [React: Rendering lists](https://react.dev/learn/rendering-lists)
