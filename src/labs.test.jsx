import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SlopeExplorer, ParamExplorer } from './App.jsx';

describe('SlopeExplorer slider accessibility', () => {
  const props = { fn: (x) => x * x, dfn: (x) => 2 * x, xMin: -3, xMax: 3, yMin: -1, yMax: 9, start: 1 };

  it('gives the slider a meaningful accessible name', () => {
    render(<SlopeExplorer {...props} />);
    expect(screen.getByRole('slider')).toHaveAccessibleName(/point position along the curve/i);
  });

  it('exposes the interpretation as the slider value text', () => {
    render(<SlopeExplorer {...props} />);
    // start x=1 -> slope 2 -> climbing
    expect(screen.getByRole('slider').getAttribute('aria-valuetext')).toMatch(/climbing uphill/i);
  });

  it('announces the updated interpretation via an aria-live region on drag', () => {
    const { container } = render(<SlopeExplorer {...props} />);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toBeTruthy();
    expect(live.textContent).toMatch(/climbing uphill/i);

    // Drag into negative x -> slope negative -> downhill.
    fireEvent.change(screen.getByRole('slider'), { target: { value: '-2' } });
    expect(live.textContent).toMatch(/heading downhill/i);
  });
});

describe('ParamExplorer slider accessibility', () => {
  const build = (v) => ({
    curves: [{ f: (x) => v * x, color: '#818cf8' }],
    formula: `y=${v}x`,
    caption: `The slope is ${v.toFixed(2)}`,
  });

  it('names the slider after the parameter it controls', () => {
    render(<ParamExplorer xMin={-3} xMax={3} yMin={-3} yMax={3} min={-2} max={2} start={1} name="m" hint="slope" build={build} />);
    expect(screen.getByRole('slider')).toHaveAccessibleName(/parameter m/i);
  });

  it('puts the caption in an aria-live region', () => {
    const { container } = render(<ParamExplorer xMin={-3} xMax={3} yMin={-3} yMax={3} min={-2} max={2} start={1} name="m" hint="slope" build={build} />);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live).toBeTruthy();
    expect(live.textContent).toMatch(/the slope is/i);
  });
});
