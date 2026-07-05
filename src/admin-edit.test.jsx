import { describe, it, expect, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { AdminDashboard } from './App.jsx';

const USERS_KEY = 'lenamon_users_v1';

describe('admin inline-edit input accessibility', () => {
  afterEach(() => localStorage.clear());

  it('gives each inline-edit field an accessible name', () => {
    localStorage.setItem(
      USERS_KEY,
      JSON.stringify([{ firstName: 'Ada', lastName: 'Lovelace', email: 'ada@x.com', createdAt: '2026-01-01T00:00:00Z' }])
    );
    render(<AdminDashboard onEnterCourse={() => {}} onSignOut={() => {}} onBrand={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /^edit$/i }));

    expect(screen.getByRole('textbox', { name: /first name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /last name/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
  });
});
