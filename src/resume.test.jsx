import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import App, { Course } from './App.jsx';

const SESSION_KEY = 'lenamon_session_v1';
const SAVE_KEY = 'lenamon_calc_v1';
const user = { role: 'user', email: 'a@x.com', firstName: 'A', lastName: 'B' };

beforeAll(() => {
  // Course calls scrollTo on mount and gates on window.katex; jsdom has neither.
  if (!Element.prototype.scrollTo) Element.prototype.scrollTo = () => {};
  window.katex = {};
});
afterEach(() => {
  cleanup();
  localStorage.clear();
});

describe('reload resume', () => {
  it('restores a logged-in user to the course view instead of landing', () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
    render(<App />);
    // The lesson header "Lesson X of N" appears only in the course view.
    expect(screen.getByText(/lesson \d+ of \d+/i)).toBeInTheDocument();
  });

  it('restores an admin session straight to the admin dashboard', () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ role: 'admin' }));
    render(<App />);
    // The "Enter course" control exists only on the admin dashboard.
    expect(screen.getByRole('button', { name: /enter course/i })).toBeInTheDocument();
  });

  it('still shows the landing page when there is no session', () => {
    render(<App />);
    expect(screen.queryByText(/lesson \d+ of \d+/i)).not.toBeInTheDocument();
  });

  it('honors the saved lesson index on mount (idx is no longer ignored)', () => {
    const key = `${SAVE_KEY}::${user.email}`;

    localStorage.setItem(key, JSON.stringify({ done: [], idx: 0, xp: 0 }));
    render(<Course session={user} onSignOut={() => {}} onBrand={() => {}} />);
    const atZero = screen.getByText(/lesson \d+ of \d+/i).textContent;
    cleanup();
    localStorage.clear();

    localStorage.setItem(key, JSON.stringify({ done: [], idx: 7, xp: 0 }));
    render(<Course session={user} onSignOut={() => {}} onBrand={() => {}} />);
    const atSeven = screen.getByText(/lesson \d+ of \d+/i).textContent;

    // A different saved idx surfaces a different lesson, proving idx is restored
    // rather than always overridden by firstIncompleteIdx.
    expect(atSeven).not.toBe(atZero);
  });
});
