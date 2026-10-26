import { itinerary } from '../data/tripData.js';

// CLASS 29: useReducer has FOUR pieces:
// 1. Initial state: starting trip days and activities.
// 2. Action: an object that says what the user wants to do.
// 3. Reducer: a function that returns the NEXT state.
// 4. Dispatch: the message sent from a button or form to the reducer.
// This file contains pieces 1–3. ReducerTripPlanner.jsx uses dispatch.

// Make separate copies of the sample days and activities.
// Never change tripData.js or the previous state directly.
function copySampleDays() {
  return itinerary.map((day) => ({
    ...day,
    activities: day.activities.map((activity) => ({ ...activity })),
  }));
}

// 1. INITIAL STATE: two related values managed together.
export function createInitialItineraryState() {
  return { days: copySampleDays(), nextActivityId: 1 };
}

// This is a pure function: same inputs -> same output.
// It does NOT call setState, change an array, access storage, or make an API request.
export function itineraryReducer(state, action) {
  // 3. REDUCER: choose what to do based on action.type.
  switch (action.type) {
    case 'ADD_ACTIVITY': {
      const { dayId, title, time } = action.payload;
      const cleanTitle = title.trim();
      const cleanTime = time.trim();
      // Do not add a blank activity or a day that does not exist.
      if (!cleanTitle || !cleanTime || !state.days.some((day) => day.id === dayId)) {
        return state;
      }
      const newActivity = {
        id: `custom-${state.nextActivityId}`,
        emoji: '📍',
        title: cleanTitle,
        time: cleanTime,
        detail: 'Added during Class 29',
      };
      return {
        ...state,
        nextActivityId: state.nextActivityId + 1,
        // .map() and [...] create NEW arrays instead of changing the old ones.
        days: state.days.map((day) => day.id === dayId
          ? { ...day, activities: [...day.activities, newActivity] }
          : day),
      };
    }

    case 'REMOVE_ACTIVITY': {
      const { activityId } = action.payload;
      // .filter() keeps everything EXCEPT the activity being removed.
      return {
        ...state,
        days: state.days.map((day) => ({
          ...day,
          activities: day.activities.filter((activity) => activity.id !== activityId),
        })),
      };
    }

    case 'MOVE_ACTIVITY': {
      const { activityId, targetDayId } = action.payload;
      const targetExists = state.days.some((day) => day.id === targetDayId);
      const source = state.days.find((day) => day.activities.some((a) => a.id === activityId));
      if (!targetExists || !source || source.id === targetDayId) return state;
      const activityToMove = source.activities.find((a) => a.id === activityId);

      return {
        ...state,
        days: state.days.map((day) => {
          if (day.id === source.id) {
            return { ...day, activities: day.activities.filter((a) => a.id !== activityId) };
          }
          if (day.id === targetDayId) {
            return { ...day, activities: [...day.activities, activityToMove] };
          }
          return day;
        }),
      };
    }

    case 'RESET_ITINERARY':
      // Return fresh sample data. Existing objects remain unchanged.
      return createInitialItineraryState();

    default:
      // Unknown action? Leave state as it was.
      return state;
  }
}
