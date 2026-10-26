import React from 'react';
import { createRoot } from 'react-dom/client';
import FunctionTripPlanner from './function-components/App.jsx';
import ClassTripPlanner from './class-components/ClassTripPlanner.jsx';
import BasicStateDemo from './class27/BasicStateDemo.jsx';
import StateTripPlanner from './class27/StateTripPlanner.jsx';
import EffectTripPlanner from './EffectTripPlanner.jsx';
import ReducerTripPlanner from './ReducerTripPlanner.jsx';
import './styles/base.css';
import './class-components/class-demo.css';
import './styles/main.scss';
import './styles/class27.scss';
import './styles/class28.scss';
import './styles/class29.scss';

// CLASSES 26–29: Choose a completed demo using the URL after ?demo=.
// The switch reloads the page; state and reducer updates happen INSIDE each demo.
const demo = new URLSearchParams(window.location.search).get('demo');
const page = demo === 'reducer' ? <ReducerTripPlanner />
  : demo === 'effect' ? <EffectTripPlanner />
  : demo === 'class' ? <ClassTripPlanner />
  : demo === 'functions' ? <FunctionTripPlanner />
  : demo === 'state-basic' ? <BasicStateDemo />
  : demo === 'state-two' ? <StateTripPlanner counterMode="two" />
  : <StateTripPlanner counterMode="object" />; // default and ?demo=state

createRoot(document.getElementById('root')).render(
  <React.StrictMode>{page}</React.StrictMode>
);
