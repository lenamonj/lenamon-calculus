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

  it.each(LESSONS)('$slug: has exactly one Key Formulas block, a concept, a worked example, and two closing practices', (l) => {
    const types = l.content.map((b) => b.type);
    expect(types.filter((t) => t === 'rule').length).toBe(1);
    expect(types).toContain('concept');
    expect(types).toContain('example');
    expect(types.filter((t) => t === 'practice').length).toBe(2);
    expect(types.slice(-2)).toEqual(['practice', 'practice']);
    expect(types.indexOf('rule')).toBeGreaterThan(types.indexOf('concept'));
    for (const t of types) expect(['concept', 'rule', 'example', 'interactive', 'practice']).toContain(t);
  });

  it.each(LESSONS)('$slug: prose has no emoji, arrows, dashes, or spacing artifacts', (l) => {
    const { container, unmount } = render(
      <>{l.content.map((b, i) => <div key={i}>{b.render()}{b.type === 'practice' ? b.answer() : null}</div>)}</>
    );
    const text = container.textContent;
    unmount();
    expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
    expect(text).not.toMatch(/→|—|–/);
    expect(text).not.toMatch(/ {2}- {2}/);
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
