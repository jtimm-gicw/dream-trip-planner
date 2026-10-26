import { useEffect, useState } from 'react';

// STEP 4: This child appears only when the parent says "Show timer".
// Mount = React puts it on the page. Unmount = React removes it.
export default function VisitTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    console.log('TIMER: setup (component mounted)');
    // setInterval asks the browser to repeat work every second.
    const timerId = window.setInterval(() => {
      setSeconds((previous) => previous + 1);
    }, 1000);

    // CLEANUP: stop the timer before the component leaves the page.
    // Without cleanup, old intervals could keep running.
    return () => {
      window.clearInterval(timerId);
      console.log('TIMER: cleanup (component unmounted)');
    };
  }, []); // []: this effect does not depend on changing props or state.

  return (
    <div className="effect-timer" role="group" aria-label="Planning session timer">
      <strong>⏱️ Session timer:</strong>
      <output aria-live="off">{seconds} seconds</output>
      <p>Hide this panel to see cleanup in the browser console.</p>
    </div>
  );
}
