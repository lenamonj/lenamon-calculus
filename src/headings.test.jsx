import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CC, Course } from './App.jsx';

describe('lesson content card headings', () => {
  it('renders the card section label as a level-2 heading', () => {
    render(<CC item={{ type: 'concept', render: () => 'body text' }} showAnswer={false} onToggle={() => {}} id="blk" />);
    expect(screen.getByRole('heading', { level: 2, name: /core concept/i })).toBeInTheDocument();
  });
});

describe('course lesson view headings', () => {
  beforeAll(() => {
    // jsdom implements neither of these; Course calls them on mount.
    if (!Element.prototype.scrollTo) Element.prototype.scrollTo = () => {};
    // A truthy window.katex flips Course past its loading gate; M falls back to
    // raw text since this stub has no render method.
    window.katex = {};
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the lesson title as an h1 and section labels as headings', () => {
    render(<Course session={{ role: 'user', email: 't@x.com', firstName: 'T', lastName: 'X' }} onSignOut={() => {}} onBrand={() => {}} />);

    // The lesson title is the single top-level heading of the view.
    const h1 = screen.getByRole('heading', { level: 1 });
    expect(h1.textContent.trim().length).toBeGreaterThan(0);

    // The lesson is built from labelled content cards, each a section heading.
    expect(screen.getAllByRole('heading', { level: 2 }).length).toBeGreaterThan(0);
  });
});
