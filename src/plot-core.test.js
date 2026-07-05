import { describe, it, expect } from 'vitest';
import { plotProjection, sampleSegments, segmentsToPath } from './App.jsx';

// Reference implementations copied verbatim from the pre-refactor Graph.linePath
// and Plot.sample/dpath. The shared helpers must reproduce these exactly (modulo
// the harmless trailing space the old Graph path string carried).

function oldLinePath(f, { xMin, xMax, yMin, yMax, width, height }) {
  const pad = 42;
  const w = width - 2 * pad, h = height - 2 * pad;
  const toX = (x) => pad + ((x - xMin) / (xMax - xMin)) * w;
  const toY = (y) => pad + ((yMax - y) / (yMax - yMin)) * h;
  const yRange = Math.abs(yMax - yMin);
  const jumpLimit = yRange * 1.5;
  let d = '', penDown = false, prevY = null;
  for (let i = 0; i <= 240; i++) {
    const x = xMin + (i / 240) * (xMax - xMin);
    let y; try { y = f(x); } catch { y = NaN; }
    const inRange = isFinite(y) && y >= yMin - yRange && y <= yMax + yRange;
    const jumped = prevY !== null && isFinite(y) && Math.abs(y - prevY) > jumpLimit;
    if (!inRange || jumped) { penDown = false; prevY = isFinite(y) ? y : null; continue; }
    d += `${penDown ? 'L' : 'M'}${toX(x).toFixed(1)},${toY(y).toFixed(1)} `;
    penDown = true; prevY = y;
  }
  return d;
}

function oldPlotPath(f, { xMin, xMax, yMin, yMax, width, height }) {
  const pad = 40;
  const w = width - 2 * pad, h = height - 2 * pad;
  const toX = (x) => pad + ((x - xMin) / (xMax - xMin)) * w;
  const toY = (y) => pad + ((yMax - y) / (yMax - yMin)) * h;
  const yRange = Math.abs(yMax - yMin);
  const pts = [];
  for (let i = 0; i <= 260; i++) {
    const x = xMin + (i / 260) * (xMax - xMin);
    try { const y = f(x); if (isFinite(y) && y >= yMin - yRange && y <= yMax + yRange) pts.push([toX(x), toY(y)]); } catch { /* skip */ }
  }
  return pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
}

const view = { xMin: -4, xMax: 4, yMin: -4, yMax: 4, width: 440, height: 280 };
const plotView = { xMin: -4, xMax: 4, yMin: -4, yMax: 4, width: 640, height: 300 };

const fns = {
  line: (x) => x,
  parabola: (x) => x * x, // leaves [-4,4] near the edges
  reciprocal: (x) => 1 / x, // vertical asymptote at 0
  thrower: (x) => { if (x > 1) throw new Error('domain'); return x; },
};

describe('shared plot projection', () => {
  it('maps endpoints and origin identically to the inline formula', () => {
    const { toX, toY } = plotProjection({ ...view, pad: 42 });
    expect(toX(view.xMin)).toBe(42);
    expect(toX(view.xMax)).toBe(view.width - 42);
    expect(toY(view.yMax)).toBe(42);
    expect(toY(view.yMin)).toBe(view.height - 42);
  });
});

describe('Graph path parity (breakOnGap, jumpLimit)', () => {
  const { toX, toY } = plotProjection({ ...view, pad: 42 });
  const graphPath = (f) => segmentsToPath(
    sampleSegments(f, { ...view, toX, toY, steps: 240, jumpLimit: Math.abs(view.yMax - view.yMin) * 1.5, breakOnGap: true })
  );

  for (const [name, f] of Object.entries(fns)) {
    it(`reproduces the old linePath for ${name}`, () => {
      expect(graphPath(f)).toBe(oldLinePath(f, view).trim());
    });
  }

  it('breaks the reciprocal into more than one subpath (asymptote not bridged)', () => {
    expect((graphPath(fns.reciprocal).match(/M/g) || []).length).toBeGreaterThan(1);
  });
});

describe('Plot path parity (connected polyline)', () => {
  const { toX, toY } = plotProjection({ ...plotView, pad: 40 });
  const plotPath = (f) => segmentsToPath([
    sampleSegments(f, { ...plotView, toX, toY, steps: 260, breakOnGap: false }).flat(),
  ]);

  for (const [name, f] of Object.entries(fns)) {
    it(`reproduces the old Plot path for ${name}`, () => {
      expect(plotPath(f)).toBe(oldPlotPath(f, plotView));
    });
  }

  it('keeps a single subpath across the reciprocal gap (one M)', () => {
    expect((plotPath(fns.reciprocal).match(/M/g) || []).length).toBe(1);
  });
});
