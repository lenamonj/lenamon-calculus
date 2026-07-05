import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { CC } from './App.jsx';

describe('step-by-step solution disclosure', () => {
  const item = { type: 'practice', prompt: () => 'Try this one', answer: () => 'the worked solution' };

  it('collapsed: aria-expanded is false and aria-controls names the solution region', () => {
    render(<CC item={item} showAnswer={false} onToggle={() => {}} id="blk-1-2" />);
    const btn = screen.getByRole('button', { name: /show me how/i });
    expect(btn.getAttribute('aria-expanded')).toBe('false');
    expect(btn.getAttribute('aria-controls')).toBe('blk-1-2-sol');
  });

  it('expanded: aria-expanded is true and the controlled region exists with the matching id', () => {
    render(<CC item={item} showAnswer={true} onToggle={() => {}} id="blk-1-2" />);
    const btn = screen.getByRole('button', { name: /hide solution/i });
    expect(btn.getAttribute('aria-expanded')).toBe('true');
    const region = document.getElementById(btn.getAttribute('aria-controls'));
    expect(region).toBeTruthy();
    expect(region.textContent).toMatch(/worked solution/i);
  });
});
