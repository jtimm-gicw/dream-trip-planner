import React from 'react';
import { createRoot } from 'react-dom/client';
import FunctionTripPlanner from './function-components/App.jsx';
import ClassTripPlanner from './class-components/ClassTripPlanner.jsx';
import BasicStateDemo from './class27/BasicStateDemo.jsx';
import StateTripPlanner from './class27/StateTripPlanner.jsx';
import './styles/base.css';
import './class-components/class-demo.css';
import './styles/main.scss';
import './styles/class27.scss';

// CLASS 27: Keep BOTH Class 26 demos unchanged for comparison.
// Pick one completed lesson stage by changing the URL after ?demo=.
// This URL switch reloads the page; useState is INSIDE the demo components.
const demo = new URLSearchParams(window.location.search).get('demo');
const page = demo === 'class' ? <ClassTripPlanner />
  : demo === 'functions' ? <FunctionTripPlanner />
  : demo === 'state-basic' ? <BasicStateDemo />
  : demo === 'state-two' ? <StateTripPlanner counterMode="two" />
  : <StateTripPlanner counterMode="object" />; // default and ?demo=state

createRoot(document.getElementById('root')).render(
  <React.StrictMode>{page}</React.StrictMode>
);
