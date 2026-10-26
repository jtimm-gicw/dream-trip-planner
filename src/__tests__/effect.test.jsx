import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EffectTripPlanner from '../EffectTripPlanner.jsx';

// Test the same actions a visitor would take in a browser.
const KEY = 'dreamtrip-class28';
beforeEach(() => window.localStorage.clear());
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

describe('Class 28: effects and lifecycle', () => {
  it('changes the browser title when the destination changes', async () => {
    const user = userEvent.setup();
    render(<EffectTripPlanner />);
    expect(document.title).toContain('Lisbon');
    await user.click(screen.getByRole('button', { name: /Kyoto Japan/i }));
    expect(document.title).toContain('Kyoto');
  });

  it('saves the selected destination in localStorage', async () => {
    const user = userEvent.setup();
    render(<EffectTripPlanner />);
    await user.click(screen.getByRole('button', { name: /Kyoto Japan/i }));
    expect(JSON.parse(window.localStorage.getItem(KEY)).selectedId).toBe('kyoto');
  });

  it('restores the saved destination on a new mount', () => {
    window.localStorage.setItem(KEY, JSON.stringify({ selectedId: 'reykjavik', packingItems: [] }));
    render(<EffectTripPlanner />);
    expect(screen.getByText('Reykjavík, Iceland')).toBeInTheDocument();
  });

  it('mounts and removes the timer when toggled', async () => {
    const user = userEvent.setup();
    render(<EffectTripPlanner />);
    expect(screen.queryByRole('group', { name: 'Planning session timer' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Show timer' }));
    expect(screen.getByRole('group', { name: 'Planning session timer' })).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Hide timer' }));
    expect(screen.queryByRole('group', { name: 'Planning session timer' })).not.toBeInTheDocument();
  });
});
