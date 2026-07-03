import { describe, it, expect } from 'vitest';
import { useRef, useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MobileDrawer } from './App.jsx';

// Mirrors how Course uses the drawer: a toggle button owns the ref that focus
// returns to, and the drawer renders while open.
function Harness() {
  const toggleRef = useRef(null);
  const [open, setOpen] = useState(true);
  return (
    <div>
      <button ref={toggleRef} onClick={() => setOpen(true)}>Open lesson menu</button>
      {open && (
        <MobileDrawer onClose={() => setOpen(false)} restoreFocusRef={toggleRef} label="Lesson menu">
          <button>First lesson</button>
          <button>Second lesson</button>
          <button>Third lesson</button>
        </MobileDrawer>
      )}
    </div>
  );
}

describe('MobileDrawer (accessible mobile lesson drawer)', () => {
  it('exposes dialog semantics', () => {
    render(<Harness />);
    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-label', 'Lesson menu');
  });

  it('moves focus to the first item when opened', () => {
    render(<Harness />);
    expect(document.activeElement).toBe(screen.getByRole('button', { name: 'First lesson' }));
  });

  it('traps Tab within the drawer', () => {
    render(<Harness />);
    const dialog = screen.getByRole('dialog');
    const first = screen.getByRole('button', { name: 'First lesson' });
    const last = screen.getByRole('button', { name: 'Third lesson' });

    // Tab from the last item wraps back to the first.
    last.focus();
    fireEvent.keyDown(dialog, { key: 'Tab' });
    expect(document.activeElement).toBe(first);

    // Shift+Tab from the first item wraps to the last.
    first.focus();
    fireEvent.keyDown(dialog, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(last);
  });

  it('closes on Escape and restores focus to the toggle', () => {
    render(<Harness />);
    const toggle = screen.getByRole('button', { name: 'Open lesson menu' });
    const dialog = screen.getByRole('dialog');

    fireEvent.keyDown(dialog, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(document.activeElement).toBe(toggle);
  });
});
