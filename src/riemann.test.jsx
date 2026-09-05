import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RiemannExplorer, Plot } from './App.jsx';

const props = { fn: (x) => x * x, a: 0, b: 2, exact: 8 / 3, xMin: -0.2, xMax: 2.3, yMin: -0.3, yMax: 4.4, start: 4 };

describe('RiemannExplorer', () => {
  it('names the slider and exposes the sum as its value text', () => {
    render(<RiemannExplorer {...props} />);
    const s = screen.getByRole('slider');
    expect(s).toHaveAccessibleName(/number of rectangles/i);
    expect(s.getAttribute('aria-valuetext')).toMatch(/4 rectangles/i);
    expect(s.getAttribute('aria-valuetext')).toMatch(/1\.750/);
  });

  it('draws one rectangle per n and updates the live readout on change', () => {
    const { container } = render(<RiemannExplorer {...props} />);
    expect(container.querySelectorAll('svg rect').length).toBe(4);
    const live = container.querySelector('[aria-live="polite"]');
    expect(live.textContent).toMatch(/1\.750/);
    fireEvent.change(screen.getByRole('slider'), { target: { value: '8' } });
    expect(container.querySelectorAll('svg rect').length).toBe(8);
    expect(live.textContent).toMatch(/2\.188/);
  });
});

describe('Plot rectangles and open points', () => {
  it('draws a rect from the axis to the given height and hollows open points', () => {
    const { container } = render(
      <Plot curves={[]} rects={[{ x: 0, w: 1, y: 2 }]} points={[{ x: 1, y: 1, open: true, color: '#abcdef' }]} xMin={-1} xMax={3} yMin={-1} yMax={3} />
    );
    const rect = container.querySelector('svg rect');
    expect(rect).toBeTruthy();
    expect(parseFloat(rect.getAttribute('height'))).toBeGreaterThan(0);
    const circle = container.querySelector('svg circle');
    expect(circle.getAttribute('fill')).toBe('#0a0e1a');
    expect(circle.getAttribute('stroke')).toBe('#abcdef');
  });
});
