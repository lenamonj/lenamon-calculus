import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import { M } from './App.jsx';

// M shares a module-level, one-way KaTeX readiness signal across every instance.
// The late-load case runs first so it drives a fresh poller; once KaTeX is marked
// ready the flag stays set, which the later cases tolerate (M's effect decides on
// window.katex directly, not on the ready flag).
// Note: d values use JSX expression form ({"..."}) so JS string escaping applies
// predictably on both the input and the expected assertions.
describe('M (KaTeX rendering with raw-text fallback)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    delete window.katex;
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
    delete window.katex;
  });

  it('shows the raw LaTeX first, then re-typesets when KaTeX loads late', async () => {
    const { container } = render(<M d={'a+b'} />);
    // KaTeX absent at mount: the node must show the raw string, never blank.
    expect(container.textContent).toBe('a+b');

    const renderSpy = vi.fn((d, node) => { node.textContent = 'KTX(' + d + ')'; });
    window.katex = { render: renderSpy };
    await act(async () => {
      await vi.advanceTimersByTimeAsync(60);
    });

    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(renderSpy.mock.calls[0][0]).toBe('a+b');
    expect(container.textContent).toBe('KTX(a+b)');
  });

  it('typesets immediately when KaTeX is available at mount', () => {
    const renderSpy = vi.fn((d, node) => { node.textContent = 'KTX(' + d + ')'; });
    window.katex = { render: renderSpy };

    const { container } = render(<M d={'c \\cdot d'} block />);

    expect(renderSpy).toHaveBeenCalledTimes(1);
    expect(renderSpy.mock.calls[0][0]).toBe('c \\cdot d');
    expect(container.textContent).toBe('KTX(c \\cdot d)');
  });

  it('falls back to raw text when KaTeX render throws', () => {
    const renderSpy = vi.fn(() => { throw new Error('bad latex'); });
    window.katex = { render: renderSpy };

    const { container } = render(<M d={'\\frac{1}{'} />);

    expect(renderSpy).toHaveBeenCalled();
    expect(container.textContent).toBe('\\frac{1}{');
  });
});
