import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReducerTripPlanner from '../ReducerTripPlanner.jsx';
import { createInitialItineraryState, itineraryReducer } from '../reducers/itineraryReducer.js';

beforeEach(() => window.localStorage.clear());
afterEach(() => cleanup());

describe('Class 29: reducer logic', () => {
  it('adds an activity WITHOUT modifying the original state', () => {
    const before = createInitialItineraryState();
    const after = itineraryReducer(before, {
      type: 'ADD_ACTIVITY', payload: { dayId: 'day-1', title: ' Visit market ', time: '2 PM' },
    });
    expect(after.days[0].activities.at(-1).title).toBe('Visit market');
    expect(after.days[0].activities).toHaveLength(before.days[0].activities.length + 1);
    expect(before.days[0].activities).toHaveLength(3); // Original remains unchanged.
  });

  it('moves an activity from Day 1 to Day 2', () => {
    const initial = createInitialItineraryState();
    const moved = itineraryReducer(initial, {
      type: 'MOVE_ACTIVITY', payload: { activityId: 'a1', targetDayId: 'day-2' },
    });
    expect(moved.days[0].activities.some((a) => a.id === 'a1')).toBe(false);
    expect(moved.days[1].activities.some((a) => a.id === 'a1')).toBe(true);
    expect(initial.days[0].activities.some((a) => a.id === 'a1')).toBe(true);
  });

  it('removes an activity then resets the sample itinerary', () => {
    const initial = createInitialItineraryState();
    const removed = itineraryReducer(initial, {
      type: 'REMOVE_ACTIVITY', payload: { activityId: 'a1' },
    });
    expect(removed.days[0].activities.some((a) => a.id === 'a1')).toBe(false);
    const reset = itineraryReducer(removed, { type: 'RESET_ITINERARY' });
    expect(reset.days[0].activities.some((a) => a.id === 'a1')).toBe(true);
  });

  it('ignores unknown actions or invalid destinations', () => {
    const state = createInitialItineraryState();
    expect(itineraryReducer(state, { type: 'UNKNOWN' })).toBe(state);
    expect(itineraryReducer(state, {
      type: 'MOVE_ACTIVITY', payload: { activityId: 'a1', targetDayId: 'no-such-day' },
    })).toBe(state);
  });
});

describe('Class 29: visitor interactions', () => {
  it('adds a new activity using the form', async () => {
    const user = userEvent.setup();
    render(<ReducerTripPlanner />);
    await user.type(screen.getByRole('textbox', { name: 'Activity name' }), 'Try a pastry shop');
    await user.selectOptions(screen.getByRole('combobox', { name: 'Day' }), 'day-2');
    await user.click(screen.getByRole('button', { name: 'Add activity' }));
    const dayTwo = screen.getByRole('heading', { name: /Day 2: Culture/ }).closest('article');
    expect(within(dayTwo).getByText(/Try a pastry shop/)).toBeInTheDocument();
  });

  it('moves, removes, and resets an activity using buttons', async () => {
    const user = userEvent.setup();
    render(<ReducerTripPlanner />);
    await user.click(screen.getByRole('button', { name: 'Move Breakfast at a café to Day 2' }));
    const dayOne = screen.getByRole('heading', { name: /Day 1: Explore/ }).closest('article');
    const dayTwo = screen.getByRole('heading', { name: /Day 2: Culture/ }).closest('article');
    expect(within(dayOne).queryByText(/Breakfast at a café/)).not.toBeInTheDocument();
    expect(within(dayTwo).getByText(/Breakfast at a café/)).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Remove Breakfast at a café' }));
    expect(within(dayTwo).queryByText(/Breakfast at a café/)).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Reset sample itinerary' }));
    expect(within(dayOne).getByText(/Breakfast at a café/)).toBeInTheDocument();
  });

  it('still changes a destination and saves it (Class 28 review)', async () => {
    const user = userEvent.setup();
    render(<ReducerTripPlanner />);
    await user.click(screen.getByRole('button', { name: /Kyoto Japan/i }));
    expect(document.title).toContain('Kyoto');
    expect(JSON.parse(window.localStorage.getItem('dreamtrip-class28')).selectedId).toBe('kyoto');
  });
});
