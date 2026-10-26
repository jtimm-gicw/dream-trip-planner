import { afterEach, describe, expect, it } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TripLengthCounter from '../components/TripLengthCounter.jsx';
import StateTripPlanner from '../StateTripPlanner.jsx';

// TESTING IDEA: Write the same steps a visitor would try in the browser.
afterEach(() => cleanup()); // Each test gets a clean, separate page.

describe('Class 27: useState interactions', () => {
  it('reads an initial prop and increases the trip length', async () => {
    const user = userEvent.setup();
    render(<TripLengthCounter initialDays={3} />);
    expect(screen.getByText('3 days')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Add one day' }));
    expect(screen.getByText('4 days')).toBeInTheDocument();
  });

  it('never allows fewer than one day', async () => {
    render(<TripLengthCounter initialDays={1} />);
    expect(screen.getByRole('button', { name: 'Remove one day' })).toBeDisabled();
  });

  it('changes the destination after a click', async () => {
    const user = userEvent.setup();
    render(<StateTripPlanner />);
    await user.click(screen.getByRole('button', { name: /Kyoto Japan/ }));
    expect(document.querySelector('.selection-banner')).toHaveTextContent('Kyoto, Japan');
  });

  it('checks a packing item and updates its completed count', async () => {
    const user = userEvent.setup();
    render(<StateTripPlanner />);
    expect(screen.getByText('2 of 4 complete')).toBeInTheDocument();
    await user.click(screen.getByRole('checkbox', { name: 'Pack a carry-on bag' }));
    expect(screen.getByText('3 of 4 complete')).toBeInTheDocument();
  });

  it('keeps travelers while a travel style changes', async () => {
    const user = userEvent.setup();
    render(<StateTripPlanner />);
    await user.click(screen.getByRole('button', { name: 'Add one traveler' }));
    await user.selectOptions(screen.getByLabelText('Travel style'), 'Adventure');
    expect(screen.getAllByText('3 travelers').length).toBeGreaterThan(0);
    expect(screen.getByText('Adventure', { selector: 'strong' })).toBeInTheDocument();
  });
});
