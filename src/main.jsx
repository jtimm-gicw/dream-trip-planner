
/*
=======================================================
CLASS 28 — REACT useEffect HOOK
=======================================================

FILE: src/main.jsx

PURPOSE:
This is the ENTRY POINT of our React application.

An entry point is the file that starts our app.

WHAT DOES THIS FILE DO?

1. Imports React and the tools needed to display it.
2. Imports our components from Classes 26–28.
3. Imports the CSS and SCSS styles.
4. Checks the browser URL to decide which demo to show.
5. Displays the selected demo on the webpage.

CLASS 28 LEARNING FOCUS:

In Class 27, we learned useState:
React remembers information that can change.

In Class 28, we are learning useEffect:
React can synchronize with things outside
the component, such as:

- The browser tab title.
- The browser's localStorage.
- A timer that runs every second.

IMPORTANT:

This file does NOT use useEffect directly.

It loads EffectTripPlanner.jsx, where we will
study how useEffect works.
*/

// =====================================================
// 1. IMPORT REACT AND THE REACT DOM TOOL
// =====================================================

// React allows us to create components using JSX.
//
// createRoot connects our React application
// to an HTML element in index.html.
//
// Think of createRoot as telling React:
//
// "This is where our application should appear."

import React from 'react';
import { createRoot } from 'react-dom/client';

// =====================================================
// 2. IMPORT OUR CLASS 26 COMPONENTS
// =====================================================

// These are our original Class 26 demonstrations.
//
// FunctionTripPlanner:
// Shows React function components and props.
//
// ClassTripPlanner:
// Shows the older class component approach.
//
// We keep these for reviewing previous lessons.

import FunctionTripPlanner from './function-components/App.jsx';
import ClassTripPlanner from './class-components/ClassTripPlanner.jsx';

// =====================================================
// 3. IMPORT OUR CLASS 27 COMPONENTS
// =====================================================

// These components review useState.
//
// BasicStateDemo:
// Our first simple counter using useState.
//
// StateTripPlanner:
// A more interactive trip planner using
// state, props, and event handlers.

import BasicStateDemo from './class27/BasicStateDemo.jsx';
import StateTripPlanner from './class27/StateTripPlanner.jsx';

// =====================================================
// 4. IMPORT OUR NEW CLASS 28 COMPONENT
// =====================================================

// THIS IS OUR MAIN COMPONENT FOR CLASS 28.
//
// EffectTripPlanner uses useEffect to work with
// things outside React, such as browser storage
// and the browser tab title.
//
// It also includes previous Class 27 features.
//
// During Class 28, we will spend most of
// our time studying EffectTripPlanner.jsx.

import EffectTripPlanner from './EffectTripPlanner.jsx';

// =====================================================
// 5. IMPORT CSS AND SCSS STYLES
// =====================================================

// These files control how our webpage looks.
//
// base.css = basic styling used by the application.
//
// class-demo.css = styling for class components.
//
// main.scss = shared styles for the trip planner.
//
// class27.scss = styling for Class 27 examples.
//
// class28.scss = styling for Class 28 features.
//
// These files are imported so Vite can include
// their styles when building the webpage.

import './styles/base.css';
import './class-components/class-demo.css';
import './styles/main.scss';
import './styles/class27.scss';
import './styles/class28.scss';

// =====================================================
// 6. READ THE BROWSER URL
// =====================================================

// We want to keep all our class demonstrations
// inside ONE React project.
//
// Instead of creating a new application for
// every lesson, we use the browser URL
// to choose which demo to display.
//
// EXAMPLE:
//
// http://localhost:5173/?demo=effect
//
// window.location.search reads the part
// of the URL starting with ?
//
// URLSearchParams helps us read values
// from the URL.
//
// .get('demo') finds the value after demo=
//
// EXAMPLES:
//
// ?demo=effect     -> demo = 'effect'
//
// ?demo=functions  -> demo = 'functions'
//
// ?demo=state      -> demo = 'state'
//
// IMPORTANT:
//
// Changing this URL loads the selected demo.
// It is not the same as updating useState.

const demo = new URLSearchParams(
  window.location.search
).get('demo');

// =====================================================
// 7. CHOOSE WHICH DEMO TO DISPLAY
// =====================================================

// We use CONDITIONAL RENDERING.
//
// Conditional rendering means:
// "Display one component or another
// depending on a condition."
//
// The ? : symbols form a TERNARY OPERATOR.
//
// It is a shorter way to write if / else.
//
// The code checks the demo value.
//
// If demo is 'effect':
// Show EffectTripPlanner.
//
// If demo is 'functions':
// Show FunctionTripPlanner.
//
// If demo is 'state-basic':
// Show BasicStateDemo.
//
// If no recognized value is found:
// Show the Class 27 StateTripPlanner.
//
// CLASS 28 DEMO URL:
//
// http://localhost:5173/?demo=effect

const page =
  demo === 'effect'
    ? <EffectTripPlanner />

    : demo === 'class'
    ? <ClassTripPlanner />

    : demo === 'functions'
    ? <FunctionTripPlanner />

    : demo === 'state-basic'
    ? <BasicStateDemo />

    : demo === 'state-two'
    ? <StateTripPlanner counterMode="two" />

    : <StateTripPlanner counterMode="object" />;

// =====================================================
// 8. DISPLAY OUR REACT APPLICATION
// =====================================================

// document.getElementById('root')
//
// Finds the HTML element with id="root"
// inside index.html.
//
// createRoot(...)
//
// Tells React where to display the application.
//
// .render(...)
//
// Tells React what to display.
//
// {page} is the component we selected above.
//
// React.StrictMode:
//
// Helps developers notice certain problems
// while working on an application.
//
// IMPORTANT FOR CLASS 28:
//
// In development, StrictMode may run an Effect's
// setup, cleanup, and setup again.
//
// This is normal React development behavior.
//
// It helps us check that our cleanup code works.
//
// We will see this when working with timers
// and useEffect in Class 28.

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {page}
  </React.StrictMode>
);
