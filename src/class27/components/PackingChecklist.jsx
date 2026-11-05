
/*
=======================================================
CLASS 27 — UPDATING AN ARRAY IN REACT STATE
=======================================================

FILE: PackingChecklist.jsx

PURPOSE:
This component displays a packing checklist.

Users can:
1. Check an item when it is completed.
2. Uncheck an item.
3. See how many items are completed.

WHAT ARE WE LEARNING?

In Class 27, we learned how useState can remember:
- A number, such as the number of travelers.
- A string, such as the selected travel style.
- An object containing several values.

Now we are working with an ARRAY of objects.

Each checklist item contains information such as:

{
  id: 1,
  label: 'Pack a carry-on bag',
  done: false
}

IMPORTANT:

This component does NOT create its own state.

The PARENT component, StateTripPlanner.jsx,
owns the checklist state.

The parent passes the checklist to this child
and provides a function for requesting changes.

PARENT: "Here is the current checklist."

CHILD: "The user clicked this checkbox."

PARENT: "I'll update the checklist state."

React then displays the updated checklist.
*/

// =====================================================
// 1. CREATE OUR CHILD FUNCTION COMPONENT
// =====================================================

// PackingChecklist receives TWO props from its parent.
//
// 1. items
//    An array containing our packing items.
//    This comes from the parent's state.
//
// 2. onToggle
//    A function provided by the parent.
//    The child calls it when a checkbox changes.
//
// Example from the parent:
//
// <PackingChecklist
//   items={packingItems}
//   onToggle={togglePackingItem}
// />
//
// PROP NAME: items
// PROP VALUE: packingItems
//
// PROP NAME: onToggle
// PROP VALUE: togglePackingItem function
//
// The child does not directly change the array.
// It calls onToggle to request a change.

export default function PackingChecklist({ items, onToggle }) {

  // ===================================================
  // 2. CALCULATE THE NUMBER OF COMPLETED ITEMS
  // ===================================================

  // We want to display a message such as:
  //
  // "2 of 4 complete"
  //
  // To find the number of completed items,
  // we use JavaScript's .filter() method.
  //
  // .filter() goes through an array and returns
  // a NEW array containing only matching items.
  //
  // item.done is true when an item is checked.
  //
  // .length counts how many items matched.
  //
  // EXAMPLE:
  //
  // If our checklist has four items and
  // two have done: true,
  //
  // completed = 2
  //
  // IMPORTANT:
  // We do NOT need another useState for completed.
  //
  // We can calculate it using the existing items.
  //
  // This is called a DERIVED VALUE:
  // information calculated from other information.

  const completed = items.filter((item) => item.done).length;

  // ===================================================
  // 3. RETURN OUR CHECKLIST JSX
  // ===================================================

  // The return statement describes what
  // React displays on the webpage.
  //
  // This component contains:
  //
  // - A heading and short explanation.
  // - The number of completed items.
  // - A list of checkboxes.
  //
  // When the parent updates the items prop,
  // React displays the new checklist information.

  return (
    <section
      className="state-panel"
      aria-labelledby="packing-title"
    >

      {/* ============================================ */}
      {/* 4. CHECKLIST TITLE                           */}
      {/* ============================================ */}

      <div className="state-panel__intro">

        <span className="state-kicker">
          03 · Update an array
        </span>

        <h2 id="packing-title">
          🧳 Packing checklist
        </h2>

        <p>
          Tick an item. The total updates as you go.
        </p>

      </div>

      {/* ============================================ */}
      {/* 5. DISPLAY THE COMPLETED ITEM COUNT          */}
      {/* ============================================ */}

      {/*
        This displays:

        completed = number of checked items

        items.length = total number of items

        EXAMPLE:

        2 of 4 complete

        If another item is checked, the parent
        updates the items array.

        React then displays:

        3 of 4 complete

        aria-live="polite" helps screen readers
        announce changes to this progress message.
      */}

      <p
        className="packing-progress"
        aria-live="polite"
      >
        {completed} of {items.length} complete
      </p>

      {/* ============================================ */}
      {/* 6. DISPLAY CHECKBOXES USING .map()           */}
      {/* ============================================ */}

      {/*
        items is an ARRAY received from the parent.

        .map() visits each item in the array.

        For each item, React creates one <li>
        containing a checkbox and its label.

        This allows one block of JSX to display
        the entire checklist.

        key={item.id} gives React a unique
        identifier for each list item.
      */}

      <ul className="packing-list">

        {items.map((item) => (

          <li key={item.id}>

            {/* ====================================== */}
            {/* 7. STYLE COMPLETED ITEMS               */}
            {/* ====================================== */}

            {/*
              We use a TERNARY OPERATOR (? :) to
              choose a CSS class.

              If item.done is true:
              Use the completed-item styling.

              If item.done is false:
              Use the normal-item styling.

              This changes how completed items look.

              IMPORTANT:
              className changes the appearance.
              It does not update the checklist state.
            */}

            <label
              className={
                item.done
                  ? 'packing-item packing-item--done'
                  : 'packing-item'
              }
            >

              {/* ==================================== */}
              {/* 8. CHECKBOX — REQUEST A STATE UPDATE */}
              {/* ==================================== */}

              {/*
                This checkbox uses TWO important props:

                checked={item.done}

                This tells React whether the
                checkbox should appear checked.

                item.done comes from the parent's
                state through the items prop.

                onChange={() => onToggle(item.id)}

                onChange runs when the user
                checks or unchecks the box.

                The child calls onToggle and
                sends the clicked item's ID.

                The parent receives that ID
                and updates the matching item
                in its state array.

                React then sends the updated array
                back to this child through props.

                This is called a CONTROLLED INPUT.

                The checkbox's checked value
                is controlled by React state.
              */}

              <input
                type="checkbox"
                checked={item.done}
                onChange={() => onToggle(item.id)}
              />

              {/* ==================================== */}
              {/* 9. DISPLAY THE ITEM NAME             */}
              {/* ==================================== */}

              {/*
                item.label contains the text
                for this checklist item.

                Example:
                "Pack a carry-on bag"

                Each item displays its own label
                from the array.
              */}

              <span>
                {item.label}
              </span>

            </label>

          </li>
        ))}

      </ul>

    </section>
  );
}
