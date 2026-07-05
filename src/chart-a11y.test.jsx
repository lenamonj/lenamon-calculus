import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Graph, Plot } from './App.jsx';

describe('Graph chart accessibility', () => {
  it('exposes the SVG as a single image with the caption as its accessible name', () => {
    const { container } = render(
      <Graph fn={(x) => 2 * x} xMin={-2} xMax={2} yMin={-2} yMax={2} caption="A straight line through the origin" />
    );
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('role')).toBe('img');
    expect(svg.getAttribute('aria-label')).toMatch(/straight line through the origin/i);
  });

  it('combines label and caption into the accessible name', () => {
    const { container } = render(
      <Graph fn={(x) => x} xMin={-2} xMax={2} yMin={-2} yMax={2} label="Secant line" caption="slope between two points" />
    );
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('aria-label')).toBe('Secant line. slope between two points');
  });

  it('falls back to a generic label when no label or caption is given', () => {
    const { container } = render(<Graph fn={(x) => x} xMin={-2} xMax={2} yMin={-2} yMax={2} />);
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('aria-label')).toBe('Function graph');
  });
});

describe('Plot chart accessibility', () => {
  it('hides the decorative lab plot from assistive tech', () => {
    const { container } = render(
      <Plot curves={[{ f: (x) => x, color: '#818cf8' }]} xMin={-2} xMax={2} yMin={-2} yMax={2} />
    );
    const svg = container.querySelector('svg');
    expect(svg.getAttribute('aria-hidden')).toBe('true');
  });
});
