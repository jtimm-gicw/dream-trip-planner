
/*
=======================================================
CLASS 27 — PASSING STATE AND FUNCTIONS AS PROPS
=======================================================

FILE: DestinationPicker.jsx

PURPOSE:
This component allows users to select a destination
by clicking one of the destination buttons.

It displays the available destinations and
highlights the currently selected destination.

WHAT WE WILL LEARN:
1. How a child receives state through props.
2. How a parent shares a setter function.
3. How a child requests a state change.
4. How React updates the selected button.

IMPORTANT:
This component does NOT create its own state.

The PARENT component owns the selected destination.

The CHILD receives the information and calls a
function when the user clicks a destination.

Think of it this way:

PARENT: "Here are the destinations and current choice."

CHILD: "The user clicked Kyoto. Please update the choice."

PARENT: "I'll update the state."

React then displays the updated selection.
*/

// =====================================================
// 1. CREATE THE CHILD FUNCTION COMPONENT
// =====================================================

// DestinationPicker receives THREE props
// from its parent component.
//
// 1. destinations
//    An ARRAY of destination objects.
//
// 2. selectedId
//    The ID of the currently selected destination.
//    This value comes from the parent's state.
//
// 3. onSelect
//    A FUNCTION passed down by the parent.
//    The child calls it when a destination is clicked.
//
// The curly braces { } are called DESTRUCTURING.
//
// They allow us to access the props directly
// instead of writing props.destinations,
// props.selectedId, and props.onSelect.

export default function DestinationPicker({
  destinations,
  selectedId,
  onSelect,
}) {

  // ===================================================
  // 2. RETURN THE DESTINATION PICKER
  // ===================================================

  // return contains the JSX that React displays.
  //
  // The section includes:
  // - A heading.
  // - A short explanation.
  // - A list of destination buttons.
  //
  // The buttons are created using .map().

  return (
    <section
      className="state-panel"
      aria-labelledby="pick-title"
    >

      {/* ============================================ */}
      {/* 3. SECTION TITLE                             */}
      {/* ============================================ */}

      {/*
        This introduces the destination picker.

        The id on <h2> matches aria-labelledby
        on the section, helping screen readers
        identify this section.
      */}

      <div className="state-panel__intro">
        <span className="state-kicker">
          02 · Choose a destination
        </span>

        <h2 id="pick-title">
          Where are we going?
        </h2>

        <p>
          Pick a destination. The message below
          changes immediately.
        </p>
      </div>

      {/* ============================================ */}
      {/* 4. DISPLAY DESTINATIONS USING .map()          */}
      {/* ============================================ */}

      {/*
        destinations is an ARRAY received
        from the parent through props.

        .map() goes through the array
        one destination at a time.

        Each item is temporarily named "place".

        For each place, React creates ONE button.

        Example:

        destinations = [
          { id: 'lisbon', city: 'Lisbon' },
          { id: 'kyoto', city: 'Kyoto' }
        ];

        The result is two destination buttons.

        key={place.id} gives React a unique
        identifier for each button in this list.
      */}

      <div className="destination-choice-grid">
        {destinations.map((place) => (

          <button
            type="button"

            /*
              NOTE:
              JSX comments cannot be placed directly
              inside an opening tag, so the comments
              explaining these props are below.
            */

            className={
              selectedId === place.id
                ? 'destination-choice destination-choice--active'
                : 'destination-choice'
            }

            aria-pressed={selectedId === place.id}

            onClick={() => onSelect(place.id)}

            key={place.id}
          >

            {/* ====================================== */}
            {/* 5. DISPLAY THE DESTINATION INFORMATION */}
            {/* ====================================== */}

            {/*
              These values come from the current
              destination object named "place".

              place.emoji = destination emoji
              place.city = destination city
              place.country = destination country

              aria-hidden="true" tells screen readers
              to skip the decorative emoji.
            */}

            <span aria-hidden="true">
              {place.emoji}
            </span>

            <strong>
              {place.city}
            </strong>

            <small>
              {place.country}
            </small>

          </button>
        ))}
      </div>
    </section>
  );
}
