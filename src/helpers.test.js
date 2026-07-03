import { describe, it, expect } from 'vitest';
import { niceTicks, fmtLabel } from './App.jsx';

describe('niceTicks', () => {
  it('returns a single tick when the range is zero', () => {
    expect(niceTicks(5, 5)).toEqual([5]);
  });

  it('produces nice evenly spaced ticks across a round range', () => {
    expect(niceTicks(0, 10)).toEqual([0, 2, 4, 6, 8, 10]);
    expect(niceTicks(-100, 250)).toEqual([-100, -50, 0, 50, 100, 150, 200, 250]);
  });

  it('keeps every tick inside [lo, hi] and strictly increasing', () => {
    const cases = [[-4, 4], [0, 1], [1.5, 9.5], [-100, 250], [0.1, 0.9]];
    for (const [lo, hi] of cases) {
      const ticks = niceTicks(lo, hi);
      expect(ticks.length).toBeGreaterThan(0);
      for (const t of ticks) {
        expect(t).toBeGreaterThanOrEqual(lo);
        expect(t).toBeLessThanOrEqual(hi);
      }
      for (let i = 1; i < ticks.length; i++) {
        expect(ticks[i]).toBeGreaterThan(ticks[i - 1]);
      }
    }
  });

  it('respects a custom maxTicks by producing a coarser step', () => {
    const few = niceTicks(0, 100, 2);
    const many = niceTicks(0, 100, 20);
    expect(few.length).toBeLessThan(many.length);
  });
});

describe('fmtLabel', () => {
  it('formats millions with an M suffix', () => {
    expect(fmtLabel(1_500_000)).toBe('1.5M');
    expect(fmtLabel(10_000_000)).toBe('10M');
  });

  it('formats thousands with a K suffix', () => {
    expect(fmtLabel(1_500)).toBe('1.5K');
    expect(fmtLabel(10_000)).toBe('10K');
  });

  it('formats small integers and decimals plainly', () => {
    expect(fmtLabel(0)).toBe('0');
    expect(fmtLabel(5)).toBe('5');
    expect(fmtLabel(2.5)).toBe('2.5');
  });

  it('preserves sign for negative magnitudes', () => {
    expect(fmtLabel(-1_500_000)).toBe('-1.5M');
    expect(fmtLabel(-2.5)).toBe('-2.5');
  });
});
