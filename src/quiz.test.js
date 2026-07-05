import { describe, it, expect } from 'vitest';
import { QUIZ } from './content.jsx';

// Flatten the per-lesson quiz map into one list of {lessonId, i, q} records so
// every question can be asserted individually.
const questions = Object.entries(QUIZ).flatMap(([lessonId, qs]) =>
  qs.map((q, i) => ({ lessonId, i, q }))
);

describe('QUIZ data integrity', () => {
  it('contains exactly 75 questions', () => {
    expect(questions.length).toBe(75);
  });

  it.each(questions)(
    'lesson $lessonId question $i marks a correct answer that is in range',
    ({ q }) => {
      expect(Array.isArray(q.choices)).toBe(true);
      expect(q.choices.length).toBeGreaterThanOrEqual(2);
      expect(Number.isInteger(q.answer)).toBe(true);
      expect(q.answer).toBeGreaterThanOrEqual(0);
      expect(q.answer).toBeLessThan(q.choices.length);
    }
  );

  it.each(questions)(
    'lesson $lessonId question $i has one explanation per choice',
    ({ q }) => {
      expect(Array.isArray(q.why)).toBe(true);
      expect(q.why.length).toBe(q.choices.length);
      for (const choice of q.choices) {
        expect(typeof choice).toBe('string');
        expect(choice.trim().length).toBeGreaterThan(0);
      }
      for (const explanation of q.why) {
        expect(typeof explanation).toBe('string');
        expect(explanation.trim().length).toBeGreaterThan(0);
      }
    }
  );

  it.each(questions)(
    'lesson $lessonId question $i has a non-empty prompt',
    ({ q }) => {
      expect(typeof q.q).toBe('string');
      expect(q.q.trim().length).toBeGreaterThan(0);
    }
  );
});
