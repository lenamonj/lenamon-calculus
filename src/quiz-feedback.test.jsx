import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Quiz } from './App.jsx';

const quiz = [
  { q: 'What is 2 plus 2?', choices: ['3', '4', '5'], answer: 1, why: ['No, too small', 'Correct - it is four', 'No, too big'] },
];

describe('Quiz feedback accessibility', () => {
  it('announces correct feedback via aria-live and moves focus to the continue control', () => {
    render(<Quiz quiz={quiz} passed={false} onPass={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /\b4\b/ }));

    const status = screen.getByRole('status');
    expect(status).toHaveAttribute('aria-live', 'polite');
    expect(status.textContent).toMatch(/correct/i);

    const cont = screen.getByRole('button', { name: /finish quiz/i });
    expect(document.activeElement).toBe(cont);
  });

  it('announces incorrect feedback via aria-live', () => {
    render(<Quiz quiz={quiz} passed={false} onPass={() => {}} />);

    fireEvent.click(screen.getByRole('button', { name: /\b3\b/ }));

    const status = screen.getByRole('status');
    expect(status.textContent).toMatch(/not quite/i);
    // Wrong answers do not reveal a continue control.
    expect(screen.queryByRole('button', { name: /finish quiz|next question/i })).not.toBeInTheDocument();
  });
});
