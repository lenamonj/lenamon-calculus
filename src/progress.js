// Saved-progress format and migration. Pure functions, no React.
//
// v1 (original 25-lesson course) stored completed lessons and the current
// lesson as array positions. v2 stores stable lesson slugs, so inserting a
// lesson never marks the wrong one complete.

// Lesson order of the original course; v1 positions index into it.
export const LEGACY_ORDER = ["functions", "lines", "exponentials", "logarithms", "limits", "infinite-limits", "continuity", "derivative", "power-rule", "marginal", "exp-log-derivatives", "product-quotient", "chain-rule", "elasticity", "first-derivative-test", "concavity", "absolute-extrema", "optimization", "antiderivatives", "substitution", "definite-integral", "ftc", "area-between-curves", "surplus", "income-streams"];

export const freshSave = () => ({ v: 2, done: [], idx: 0, xp: 0, completedAt: null });

// `slugs` is the current lesson order, used to place the v1 current lesson.
export function migrateSave(s, slugs) {
  if (!s || typeof s !== "object") return freshSave();
  if (s.v === 2) return s;
  const done = (Array.isArray(s.done) ? s.done : []).map((i) => LEGACY_ORDER[i]).filter(Boolean);
  const idxSlug = LEGACY_ORDER[s.idx];
  const idx = idxSlug ? Math.max(0, slugs.indexOf(idxSlug)) : 0;
  return { v: 2, done, idx, xp: s.xp || 0, completedAt: s.completedAt || null };
}
