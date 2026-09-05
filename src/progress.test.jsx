import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { LESSONS, Course } from './App.jsx';
import { migrateSave as migrate } from './progress.js';

const SLUGS = LESSONS.map((l) => l.slug);
const migrateSave = (s) => migrate(s, SLUGS);

describe('migrateSave', () => {
  it('maps v1 lesson positions to slugs and keeps xp', () => {
    const out = migrateSave({ done: [0, 1, 7], idx: 7, xp: 150 });
    expect(out.v).toBe(2);
    expect(out.done).toEqual(['functions', 'lines', 'derivative']);
    expect(out.idx).toBe(LESSONS.findIndex((l) => l.slug === 'derivative'));
    expect(out.xp).toBe(150);
    expect(out.completedAt).toBeNull();
  });

  it('drops v1 positions that no longer map to a lesson', () => {
    const out = migrateSave({ done: [0, 99], idx: 99, xp: 0 });
    expect(out.done).toEqual(['functions']);
    expect(out.idx).toBe(0);
  });

  it('returns v2 saves untouched', () => {
    const s = { v: 2, done: ['functions'], idx: 3, xp: 50, completedAt: null };
    expect(migrateSave(s)).toBe(s);
  });

  it('yields a fresh save for null or garbage', () => {
    expect(migrateSave(null)).toEqual({ v: 2, done: [], idx: 0, xp: 0, completedAt: null });
    expect(migrateSave('junk')).toEqual({ v: 2, done: [], idx: 0, xp: 0, completedAt: null });
  });
});

describe('certificate gating across a curriculum change', () => {
  beforeAll(() => {
    if (!Element.prototype.scrollTo) Element.prototype.scrollTo = () => {};
    window.katex = {};
  });
  afterEach(() => {
    cleanup();
    localStorage.clear();
  });

  it('keeps an earned certificate unlocked when new lessons are still undone', () => {
    localStorage.setItem('lenamon_calc_v1::cert@x.com', JSON.stringify({ v: 2, done: ['functions'], idx: 0, xp: 1250, completedAt: '2026-07-01T00:00:00.000Z' }));
    render(<Course session={{ role: 'user', email: 'cert@x.com', firstName: 'C', lastName: 'X' }} onSignOut={() => {}} onBrand={() => {}} />);
    expect(screen.queryByText(/finish all \d+ lessons to unlock/i)).toBeNull();
  });

  it('locks the certificate for a learner who has not finished', () => {
    localStorage.setItem('lenamon_calc_v1::new@x.com', JSON.stringify({ v: 2, done: ['functions'], idx: 0, xp: 50, completedAt: null }));
    render(<Course session={{ role: 'user', email: 'new@x.com', firstName: 'N', lastName: 'X' }} onSignOut={() => {}} onBrand={() => {}} />);
    expect(screen.getByText(/finish all \d+ lessons to unlock/i)).toBeInTheDocument();
  });

  it('marks migrated v1 lessons as completed in the sidebar', () => {
    localStorage.setItem('lenamon_calc_v1::old@x.com', JSON.stringify({ done: [0], idx: 1, xp: 50 }));
    render(<Course session={{ role: 'user', email: 'old@x.com', firstName: 'O', lastName: 'X' }} onSignOut={() => {}} onBrand={() => {}} />);
    // Progress bar reads completed/total; one migrated lesson is done.
    expect(screen.getAllByText(new RegExp(`^1/${LESSONS.length}$`)).length).toBeGreaterThan(0);
  });
});
