import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { saveUsers } from './App.jsx';

const USERS_KEY = 'lenamon_users_v1';

describe('saveUsers', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('returns true when the write succeeds', () => {
    expect(saveUsers([{ email: 'a@b.com' }])).toBe(true);
    expect(JSON.parse(localStorage.getItem(USERS_KEY))).toHaveLength(1);
  });

  it('returns false (not a silent swallow) when setItem throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });
    expect(saveUsers([{ email: 'a@b.com' }])).toBe(false);
  });
});

describe('signup persistence failure handling', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  function fillSignupForm() {
    render(<App />);
    fireEvent.click(screen.getAllByRole('button', { name: /create/i })[0]);
    fireEvent.change(screen.getByPlaceholderText('Ada'), { target: { value: 'Ada' } });
    fireEvent.change(screen.getByPlaceholderText('Lovelace'), { target: { value: 'Lovelace' } });
    fireEvent.change(screen.getByPlaceholderText('you@example.com'), { target: { value: 'ada@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
  }

  it('surfaces an error and does not enter the course when the write fails', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota exceeded');
    });

    fillSignupForm();

    // The failure is surfaced to the signup UI...
    expect(screen.getByText(/could not save your account/i)).toBeInTheDocument();
    // ...and the user is still on the signup form, not advanced into the course.
    expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
    // Nothing was persisted, so a later sign-in would (correctly) find no account.
    expect(localStorage.getItem(USERS_KEY)).toBeNull();
  });

  it('enters the course and persists the account when the write succeeds', () => {
    fillSignupForm();

    // Advanced past the signup form (the Create account button is gone).
    expect(screen.queryByRole('button', { name: /create account/i })).not.toBeInTheDocument();
    const saved = JSON.parse(localStorage.getItem(USERS_KEY));
    expect(saved.some((u) => u.email === 'ada@example.com')).toBe(true);
  });
});
