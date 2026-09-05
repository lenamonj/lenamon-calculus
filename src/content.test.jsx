import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LESSONS, Ref } from './App.jsx';
import { QUIZ } from './content.jsx';

const MODULES = ['Foundations', 'Limits & Continuity', 'Derivatives', 'Applications of Derivatives', 'Integration', 'Business Applications'];

describe('lesson corpus contract', () => {
  it('gives every lesson a unique kebab-case slug, a known module, a title, and a time', () => {
    const slugs = LESSONS.map((l) => l.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const l of LESSONS) {
      expect(l.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(MODULES).toContain(l.module);
      expect(l.title.trim().length).toBeGreaterThan(0);
      expect(l.time).toMatch(/^\d+ min$/);
    }
  });

  it('numbers lessons by position', () => {
    LESSONS.forEach((l, i) => expect(l.id).toBe(i + 1));
  });

  it('keys the quiz bank by slug with exactly 3 questions per lesson', () => {
    expect(Object.keys(QUIZ).sort()).toEqual(LESSONS.map((l) => l.slug).sort());
    for (const l of LESSONS) expect(QUIZ[l.slug].length).toBe(3);
  });

  it.each(LESSONS)('$slug: every block and every solution renders', (l) => {
    for (const b of l.content) {
      const r = render(<>{b.render()}</>);
      r.unmount();
      if (b.type === 'practice') {
        expect(typeof b.answer).toBe('function');
        const s = render(<>{b.answer()}</>);
        s.unmount();
      }
    }
  });

  it.each(LESSONS)('$slug: has at most one Key Formulas block, a concept, and a practice', (l) => {
    const types = l.content.map((b) => b.type);
    // Tightened to exactly one once every lesson carries a formulas plate.
    expect(types.filter((t) => t === 'rule').length).toBeLessThanOrEqual(1);
    expect(types).toContain('concept');
    expect(types).toContain('practice');
    for (const t of types) expect(['concept', 'rule', 'example', 'interactive', 'practice']).toContain(t);
  });
});

describe('Ref', () => {
  it('renders the lesson number for a slug', () => {
    const { container } = render(<Ref to="chain-rule" />);
    const n = LESSONS.findIndex((l) => l.slug === 'chain-rule') + 1;
    expect(container.textContent).toBe(`Lesson ${n}`);
  });
  it('renders only the number when bare', () => {
    const { container } = render(<Ref to="functions" bare />);
    expect(container.textContent).toBe('1');
  });
  it('throws on an unknown slug', () => {
    expect(() => render(<Ref to="nope" />)).toThrow(/unknown lesson reference/i);
  });
});
