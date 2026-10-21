import React from 'react';
import { createRoot } from 'react-dom/client';
import FunctionTripPlanner from './function-components/App.jsx';
import ClassTripPlanner from './class-components/ClassTripPlanner.jsx';
import './styles/base.css';
import './class-components/class-demo.css';
import './styles/main.scss';

// A teaching-only switch — NOT useState or React Router.
// Change the URL query string to compare two versions of the SAME content:
//   http://localhost:5173/?demo=class
//   http://localhost:5173/?demo=functions
// This refreshes the page. We will learn interactive React state in Class 27.
const isClassDemo = new URLSearchParams(window.location.search).get('demo') === 'class';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {isClassDemo ? <ClassTripPlanner /> : <FunctionTripPlanner />}
  </React.StrictMode>
);
