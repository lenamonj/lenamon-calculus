# Curriculum Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Grow the course from 25 to 32 lessons, upgrade every existing lesson, give every lesson two practice problems, and make the engine insertion-proof.

**Architecture:** Content stays in `src/content.jsx` as typed blocks built by `buildLessons`; the engine in `src/App.jsx` gains stable lesson slugs, a `Ref` component for cross-references, slug-keyed progress with a v1 migration, a slug-keyed quiz bank and inspiration map, and one new lab (`RiemannExplorer`). Counts are computed, never typed. A content-contract test locks the structure in.

**Tech Stack:** React 18, Vite 6, Vitest 4 + jsdom + Testing Library, KaTeX (CDN), Python 3.13 + sympy for numeric verification.

**Spec:** `docs/specs/2026-09-05-curriculum-overhaul.md`

## Global Constraints

- Writing standard: never state a fact without saying why in terms the learner already has; never skip a step; the reader is a curious 15-year-old.
- No emoji, no "→" arrows, no "  -  " artifacts, no em or en dashes anywhere in content. Use words, commas, colons, or parentheses.
- Design system: graph world is chalk on ink; only the calculus is gold. Riemann rectangles are calculus, so they are gold. Semantic block colors (concept indigo, formulas amber, example green, lab cyan, practice pink) are preserved.
- Every number in prose must appear in `scratchpad/verify_content.py` and pass. Extend the script whenever a new number is written.
- Tests green, lint at or below 12 warnings, `npm run build` clean, before every commit. Commit locally only; never push.
- Lesson block order: concept(s), rule, example(s), optional interactive, practice, practice. Labels are short noun phrases.
- Four existing lessons have no Key Formulas block today (derivative, marginal, optimization, substitution). Each gets one in its content phase; Phase 6 tightens the contract test to exactly one `rule` block per lesson.
- Cross-references use `<Ref to="slug"/>` (renders "Lesson N") or `<Ref to="slug" bare/>` (renders "N"). Never type a lesson number in prose.

---

## Phase 0: Engine foundations

**Success criteria:** every existing test plus new tests green; `Ref` resolves all 62 former hard-coded references; QUIZ, INSPO, and progress keyed by slug; a v1 save migrates and an earned certificate stays unlocked; `RiemannExplorer` renders with accessible slider and live readout; certificate and landing copy compute their counts. Content numbering unchanged (still 25 lessons) at the end of this phase.

### Task 0.1: Slugs, `Ref`, slug-keyed QUIZ

**Files:**
- Modify: `src/content.jsx` (every lesson header line `{id:N,module:...}` and the QUIZ keys)
- Modify: `src/App.jsx:373` (build L), `src/App.jsx:837` (quiz lookup)
- Create: `src/content.test.jsx`

**Interfaces:**
- Produces: `export const LESSONS` (array of lessons, each `{slug, id, module, title, time, content}`), `export function Ref({to, bare})` from `src/App.jsx`.
- `buildLessons({ M, Box, Graph, SlopeExplorer, SignChart, ParamExplorer, RiemannExplorer, Ref })` from `src/content.jsx`. Lessons carry `slug`, not `id`.

Slug table (old id, slug): 1 functions, 2 lines, 3 exponentials, 4 logarithms, 5 limits, 6 infinite-limits, 7 continuity, 8 derivative, 9 power-rule, 10 marginal, 11 exp-log-derivatives, 12 product-quotient, 13 chain-rule, 14 elasticity, 15 first-derivative-test, 16 concavity, 17 absolute-extrema, 18 optimization, 19 antiderivatives, 20 substitution, 21 definite-integral, 22 ftc, 23 area-between-curves, 24 surplus, 25 income-streams.

- [ ] **Step 1: Write the failing tests** in `src/content.test.jsx`:

```jsx
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

  it.each(LESSONS)('$slug: has exactly one Key Formulas block, a concept, and a practice', (l) => {
    const types = l.content.map((b) => b.type);
    expect(types.filter((t) => t === 'rule').length).toBe(1);
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
```

- [ ] **Step 2: Run** `npx vitest run src/content.test.jsx` and confirm it fails (LESSONS undefined).

- [ ] **Step 3: Implement.** In `src/content.jsx`, change every lesson header from `{id:N,module:` to `{slug:"<slug>",module:` and every QUIZ key from `"N"` to the slug. Change the function signature to `export function buildLessons({ M, Box, Graph, SlopeExplorer, SignChart, ParamExplorer, RiemannExplorer, Ref })`. Replace every `Lesson N` / `Lessons N` / `(LN)` in prose with `<Ref .../>` (a script may do the bulk; hand-check every string-literal prop such as lab `intro` and graph `caption`, which cannot hold JSX and must be reworded or converted to expressions). In `src/App.jsx` replace line 373 with:

```jsx
const L = buildLessons({ M, Box, Graph, SlopeExplorer, SignChart, ParamExplorer, RiemannExplorer, Ref }).map((l, i) => ({ ...l, id: i + 1 }));
export const LESSONS = L;
const LESSON_NO = new Map(L.map((l) => [l.slug, l.id]));
// Cross-references resolve at render time so inserting a lesson never breaks a number.
export function Ref({ to, bare = false }) {
  const n = LESSON_NO.get(to);
  if (n == null) throw new Error(`Unknown lesson reference: ${to}`);
  return bare ? <>{n}</> : <>Lesson {n}</>;
}
```

(`RiemannExplorer` is defined in Task 0.4; until then pass a stub `function RiemannExplorer(){return null;}` or do Task 0.4 first.) Change `QUIZ[lesson.id]` at line 837 to `QUIZ[lesson.slug]`. In `src/quiz.test.js` replace the literal 75 with `LESSONS.length * 3` (import `LESSONS` from `./App.jsx`).

- [ ] **Step 4: Run** `npm test` and confirm green. Grep `grep -c "Lesson [0-9]" src/content.jsx` returns 0.

- [ ] **Step 5: Commit** `git commit -m "Engine: lesson slugs and Ref cross-references"`.

### Task 0.2: Progress keyed by slug with v1 migration; earned certificates persist

**Files:**
- Modify: `src/App.jsx:440-455` (loadSave, firstIncompleteIdx), `src/App.jsx:760-810` (Course state, save effect, completion effect), sidebar `done.has(...)` uses, quiz-pass handler, `allDone`.
- Create: `src/progress.test.jsx`
- Check: `src/resume.test.jsx:39-55` (uses a v1 save with idx 7; verify its expectation still holds after migration, adjust the fixture to v2 if it asserts a literal lesson number).

**Interfaces:**
- Produces: `export function migrateSave(s)` returning `{v:2, done:string[], idx:number, xp:number, completedAt:string|null}`.
- Save format v2: `{v:2, done:[slugs], idx, xp, completedAt}` under the unchanged key `lenamon_calc_v1::<email>`.

- [ ] **Step 1: Write failing tests** in `src/progress.test.jsx`:

```jsx
import { describe, it, expect, beforeAll, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { migrateSave, LESSONS, Course } from './App.jsx';

describe('migrateSave', () => {
  it('maps v1 lesson positions to slugs and keeps xp', () => {
    const out = migrateSave({ done: [0, 1, 7], idx: 7, xp: 150 });
    expect(out.v).toBe(2);
    expect(out.done).toEqual(['functions', 'lines', 'derivative']);
    expect(out.idx).toBe(LESSONS.findIndex((l) => l.slug === 'derivative'));
    expect(out.xp).toBe(150);
    expect(out.completedAt).toBeNull();
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

describe('earned certificate persists across a curriculum change', () => {
  beforeAll(() => {
    if (!Element.prototype.scrollTo) Element.prototype.scrollTo = () => {};
    window.katex = {};
  });
  afterEach(() => localStorage.clear());

  it('keeps the certificate unlocked when completedAt is set even if new lessons are undone', () => {
    const key = 'lenamon_calc_v1::cert@x.com';
    localStorage.setItem(key, JSON.stringify({ v: 2, done: ['functions'], idx: 0, xp: 1250, completedAt: '2026-07-01T00:00:00.000Z' }));
    render(<Course session={{ role: 'user', email: 'cert@x.com', firstName: 'C', lastName: 'X' }} onSignOut={() => {}} onBrand={() => {}} />);
    expect(screen.queryByText(/finish all \d+ lessons to unlock/i)).toBeNull();
  });

  it('locks the certificate for a learner who has not finished', () => {
    const key = 'lenamon_calc_v1::new@x.com';
    localStorage.setItem(key, JSON.stringify({ v: 2, done: ['functions'], idx: 0, xp: 50, completedAt: null }));
    render(<Course session={{ role: 'user', email: 'new@x.com', firstName: 'N', lastName: 'X' }} onSignOut={() => {}} onBrand={() => {}} />);
    expect(screen.getByText(/finish all \d+ lessons to unlock/i)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run** `npx vitest run src/progress.test.jsx`; expect failure (migrateSave not exported).

- [ ] **Step 3: Implement** in `src/App.jsx`:

```jsx
const SAVE_KEY="lenamon_calc_v1";
// Lesson order of the original 25-lesson course. v1 saves stored positions in
// this order; the migration turns them back into stable slugs.
const LEGACY_ORDER=["functions","lines","exponentials","logarithms","limits","infinite-limits","continuity","derivative","power-rule","marginal","exp-log-derivatives","product-quotient","chain-rule","elasticity","first-derivative-test","concavity","absolute-extrema","optimization","antiderivatives","substitution","definite-integral","ftc","area-between-curves","surplus","income-streams"];
const FRESH_SAVE=()=>({v:2,done:[],idx:0,xp:0,completedAt:null});
export function migrateSave(s){
  if(!s||typeof s!=="object") return FRESH_SAVE();
  if(s.v===2) return s;
  const done=(Array.isArray(s.done)?s.done:[]).map(i=>LEGACY_ORDER[i]).filter(Boolean);
  const idxSlug=LEGACY_ORDER[s.idx];
  const idx=idxSlug?Math.max(0,L.findIndex(l=>l.slug===idxSlug)):0;
  return {v:2,done,idx,xp:s.xp||0,completedAt:s.completedAt||null};
}
function loadSave(key){
  try{const s=JSON.parse(localStorage.getItem(key||SAVE_KEY));if(s)return migrateSave(s);}catch(e){console.warn("Ignoring unreadable saved progress:",e);}
  return FRESH_SAVE();
}
function firstIncompleteIdx(doneArr){
  const d=new Set(doneArr||[]);
  for(let i=0;i<L.length;i++){if(!d.has(L[i].slug))return i;}
  return Math.max(0,L.length-1);
}
```

In `Course`: `done` holds slugs; `const everyDone=L.every(l=>done.has(l.slug));` replaces both `done.size>=L.length` checks; `const allDone=everyDone||!!completedAt;`; the save effect writes `{v:2,done:[...done],idx,xp,completedAt}`; sidebar and quiz-pass code use `lesson.slug` / `l.slug` instead of indices. Grep `done.has(` and `done.size` to find every use.

- [ ] **Step 4: Run** `npm test`; green. If `resume.test.jsx` asserted a literal "Lesson 8 of", change its fixture to v2 with an explicit idx and keep its intent.

- [ ] **Step 5: Commit** `git commit -m "Engine: progress keyed by lesson slug with v1 migration"`.

### Task 0.3: INSPO keyed by slug; computed counts

**Files:**
- Modify: `src/App.jsx:478-504` (INSPO), `src/App.jsx:1033-1034` (lookup), `src/App.jsx:666` (certificate sentence), `src/App.jsx:1535` (landing sentence).

- [ ] **Step 1:** Convert `INSPO` to an object keyed by slug with the 25 existing cards, and add these 7:

```js
"quadratics":{t:"The shape of every deal",b:"Revenue, profit, and cost curves in this course are parabolas. Learn one U-shape well and you have read every business chart ahead of you."},
"business-models":{t:"Calculus needs a subject",b:"Cost, revenue, profit, demand: these are the functions calculus will soon differentiate and integrate. Meet them first as plain ideas, and the math later will feel like a conversation with old friends."},
"tangent-lines":{t:"The straight line inside every curve",b:"Zoom in on any smooth curve and it turns into a straight line. That single fact is why a derivative can predict tomorrow from today."},
"implicit-related-rates":{t:"Everything moves at once",b:"In a real business, price, demand, and revenue all change together over time. Related rates is calculus keeping track of all of them in one equation."},
"riemann-sums":{t:"Archimedes",b:"More than 2,200 years ago Archimedes found the exact area under a parabola by adding up ever thinner slices. You are about to do the same thing, with a slider instead of a stylus."},
"integration-by-parts":{t:"The product rule, backwards",b:"Every differentiation rule hides an integration rule inside it. Integration by parts is the product rule run in reverse, and it unlocks integrals no substitution can touch."},
"average-value":{t:"One number for a whole season",b:"A curve has infinitely many heights. Calculus can still say what its average is, exactly, and that average is what a manager actually plans around."},
```

Lookup becomes `(INSPO[lesson.slug]||INSPO.functions)`. Certificate sentence: `comprising all {L.length} lessons across {MODULES.length} modules`. Landing: `Pass all {L.length} quizzes`.

- [ ] **Step 2:** `npm test` green (grep tests for "25 lessons" first; adjust any literal). Commit `git commit -m "Engine: slug-keyed inspiration cards and computed lesson counts"`.

### Task 0.4: `RiemannExplorer` lab; `Plot` rectangles and open points

**Files:**
- Modify: `src/App.jsx:215-282` (Plot: add `rects` and `open`), add `RiemannExplorer` after `ParamExplorer` (~line 315).
- Create: `src/riemann.test.jsx`

**Interfaces:**
- `Plot` gains `rects=[]` where each rect is `{x, w, y, fill?, stroke?}` drawn from the x-axis to height y before the curves; points gain `open?: boolean` (hollow circle).
- `export function RiemannExplorer({ fn, a, b, exact, xMin, xMax, yMin, yMax, start = 4, maxN = 60, intro })`.

- [ ] **Step 1: Write failing tests** in `src/riemann.test.jsx`:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { RiemannExplorer } from './App.jsx';

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
```

- [ ] **Step 2: Run** it; expect failure (no export).

- [ ] **Step 3: Implement.** In `Plot`, add `rects = []` to the props and, immediately before `{curves.map(...)}`:

```jsx
{rects.map((r, i) => {
  const x0 = toX(r.x), x1 = toX(r.x + r.w), yTop = toY(Math.max(r.y, 0)), yBot = toY(Math.min(r.y, 0));
  return <rect key={`r${i}`} x={x0} y={yTop} width={Math.max(0, x1 - x0)} height={Math.max(0, yBot - yTop)} fill={r.fill || "rgba(230,180,90,0.22)"} stroke={r.stroke || "rgba(230,180,90,0.85)"} strokeWidth="1" />;
})}
```

In the points map, change the circle to `fill={pt.open ? "#0a0e1a" : (pt.color || "#f59e0b")} stroke={pt.open ? (pt.color || "#f59e0b") : "#0a0e1a"}`.

Add the lab:

```jsx
export function RiemannExplorer({ fn, a, b, exact, xMin, xMax, yMin, yMax, start = 4, maxN = 60, intro }) {
  const [n, setN] = useState(start);
  const dx = (b - a) / n;
  const rects = Array.from({ length: n }, (_, i) => ({ x: a + i * dx, w: dx, y: fn(a + i * dx) }));
  const sum = rects.reduce((s, r) => s + r.y * dx, 0);
  const gap = exact - sum;
  const word = n === 1 ? "rectangle" : "rectangles";
  const readout = `${n} ${word}: left sum ${sum.toFixed(3)}, exact area ${exact.toFixed(3)}, gap ${gap.toFixed(3)}`;
  return (
    <div>
      {intro && <p style={{ marginBottom: 12 }}>{intro}</p>}
      <Plot curves={[{ f: fn, color: "#818cf8" }]} rects={rects} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
      <Slider value={n} min={1} max={maxN} step={1} onChange={(v) => setN(Math.round(v))} ariaLabel="Number of rectangles" ariaValueText={readout} labelLeft={`n = ${n}`} labelRight="drag to add rectangles" />
      <div aria-live="polite" style={{ marginTop: 8, padding: "12px 16px", background: "rgba(8,11,20,0.45)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 12, fontSize: 14.5 }}>
        With <strong>{n}</strong> left-endpoint {word} the rectangles add up to <strong>{sum.toFixed(3)}</strong>. The exact area is <strong>{exact.toFixed(3)}</strong>, so the gap is <strong>{gap.toFixed(3)}</strong>. {n >= maxN ? "Even this many leaves a sliver. Only the limit closes it completely." : "Add rectangles and watch the gap shrink."}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Run** `npm test`; green. Run `npm run lint`; warnings at or below 12.

- [ ] **Step 5: Commit** `git commit -m "Lab: RiemannExplorer with gold rectangles; Plot rects and open points"`.

---

## Phase 1: Foundations (lessons 1 to 6)

**Success criteria:** six Foundations lessons in the order functions, lines, quadratics, business-models, exponentials, logarithms; each with the blocks listed; quiz entries for the two new slugs plus the replaced questions; `npm test` green; `grep -cE "  -  |✅|❌|⚠|→|✓" ` over these lessons returns 0; every number below re-verified by `verify_content.py`.

For each lesson below, write the prose in the course voice; the numbers are fixed and verified.

### Task 1.1: Lesson 1 `functions` upgrade
- Add concept block "Plugging In Expressions": f(x) = 2x + 3 gives f(a) = 2a + 3 and f(x + h) = 2x + 2h + 3; g(x) = x² gives g(x + h) = (x + h)² = x² + 2xh + h² with the multiply-every-piece expansion shown; business letters C(x), R(q), V(t) read as "cost at x", "revenue at q", "value at time t". Say why: the derivative in `<Ref to="derivative"/>` feeds in x + h.
- Second practice: f(x) = x² − 3x. Find f(2) = −2, f(−1) = 4, f(a) = a² − 3a, f(x + h) = x² + 2xh + h² − 3x − 3h. Full steps.
- Quiz: unchanged.

### Task 1.2: Lesson 2 `lines` upgrade
- Add to the rule block: point-slope form y − y₁ = m(x − x₁), with the reason (the slope from (x₁, y₁) to any (x, y) on the line is m; multiply out). Example: slope 3 through (2, 5) gives y = 3x − 1.
- Second practice (business): a courier charges $7 for a 2-mile delivery and $15 for 6 miles, straight-line pricing. Slope 8/4 = 2 dollars per mile; y − 7 = 2(x − 2) gives y = 2x + 3; base fee $3. Check at 6: 15.
- Quiz: unchanged.

### Task 1.3: NEW Lesson 3 `quadratics` (time "12 min")
- Concept "Why a Parabola Bends": table of x² for x = −3..3 (9, 4, 1, 0, 1, 4, 9), symmetric U; −x² flips to a dome; the coefficient stretches. Graph with fns x², −x², 0.5x².
- Concept "The Vertex": for y = ax² + bx + c the turning point is at x = −b/(2a). Reason: the two roots from the quadratic formula are −b/(2a) plus and minus the same amount, so the vertex sits halfway between them; the formula still gives the axis when there are no roots. Check on y = x² − 6x + 5: roots 1 and 5, midpoint 3, and −(−6)/(2·1) = 3; vertex value −4.
- Rule "Factoring, the Zero-Product Rule, and the Quadratic Formula": common factor ax² + bx = x(ax + b); difference of squares a² − b² = (a − b)(a + b) with the multiply-back check; trinomial x² + bx + c = (x + m)(x + n) where m + n = b and mn = c, with x² − 6x + 5 = (x − 1)(x − 5); zero-product rule with its reason (a product is zero only when a factor is); quadratic formula; vertex formula; polynomial, degree, leading coefficient; rational function.
- Example "A Profit Parabola": P(x) = −2x² + 120x − 1000. Roots: divide by −2 to get x² − 60x + 500 = (x − 10)(x − 50), so 10 and 50 (break-even preview). Vertex x = 30, P(30) = 800. Graph with highlights at the roots and vertex.
- Example "When It Will Not Factor": x² + 4x − 3 = 0 by the formula: x = (−4 ± √28)/2 = −2 ± √7, so 0.6458 and −4.6458; √28 ≈ 5.2915.
- Practice 1: solve 3x² − 12x = 0 (3x(x − 4) = 0, so 0 and 4) and find the vertex of y = 3x² − 12x (x = 2, y = −12).
- Practice 2: find the vertex and roots of y = x² − 8x + 3 (vertex x = 4, y = 16 − 32 + 3 = −13; roots 4 ± √13 ≈ 7.606 and 0.394). Add the roots to `verify_content.py`.
- Quiz `quadratics`: (1) vertex x of y = x² − 8x + 3 is 4 (distractors 8, −4, 3); (2) x² − 9 factors as (x − 3)(x + 3) (distractors (x − 3)², (x − 9)(x + 1), it does not factor); (3) if (x − 2)(x + 5) = 0 then x = 2 or x = −5 (distractors x = −2 or 5, x = 10, x = 3).

### Task 1.4: NEW Lesson 4 `business-models` (time "12 min")
- Concept "Cost Has Two Parts": fixed vs variable; bakery C(x) = 2000 + 1.5x; average cost AC(x) = C(x)/x = 2000/x + 1.5 with the table x = 100: 21.5; 1,000: 3.5; 10,000: 1.7, and why it falls (rent spread over more loaves) and where it is heading (1.5, previewing `<Ref to="infinite-limits"/>`).
- Concept "Price and Demand": p = a − bx slopes down (to sell more you must charge less); p = 12 − 0.01x; revenue R = p · x = 12x − 0.01x², a downward parabola (from `<Ref to="quadratics"/>`) with vertex x = 600, R = 3,600.
- Concept "Profit, Break-Even, and Where Buyers Meet Sellers": P = R − C; break-even means P = 0, the roots of a parabola; supply and demand as price-versus-quantity curves; equilibrium D(x) = S(x) with D(x) = 50 − 0.1x, S(x) = 10 + 0.1x giving x = 200, p = 30.
- Rule: C(x) = F + vx; AC(x) = C(x)/x; R(x) = p · x; P(x) = R(x) − C(x); break-even R = C; equilibrium D = S.
- Example "A Phone-Case Company": fixed $5,000, $4 per case, p = 20 − 0.01x. R = 20x − 0.01x²; P = −0.01x² + 16x − 5000; break-even by the formula: x² − 1600x + 500000 = 0, x = (1600 ± √560000)/2, √560000 ≈ 748.33, so about 425.8 and 1,174.2; max profit at the vertex x = 800, P(800) = 1,400; max revenue at x = 1,000, R = 10,000. State plainly that max revenue and max profit are different quantities at different x.
- Interactive: ParamExplorer, parameter x from 0 to 1600 step 10, start 800, curves R(x) = 20x − 0.01x² (indigo) and C(x) = 5000 + 4x (pink), points on both at x, formula `P(x)=...` showing profit at that x, caption naming loss/profit zones.
- Practice 1: C(x) = 1200 + 8x, p = 40 − 0.02x. R(x) = 40x − 0.02x²; P(x) = −0.02x² + 32x − 1200; P(500) = 9,800; AC(500) = 10.40.
- Practice 2: break-even for that firm: x² − 1600x + 60000 = 0, x = (1600 ± √2320000)/2, √2320000 ≈ 1523.15, so about 38.4 and 1,561.6. Then equilibrium of D(x) = 80 − 0.2x and S(x) = 20 + 0.1x: x = 200, p = 40.
- Quiz `business-models`: (1) fixed cost is paid even at zero output (rent), variable cost grows with each unit; (2) with p = 30 − 0.05x, R(x) = 30x − 0.05x² (distractors 30 − 0.05x², 30x − 0.05x, 30/x); (3) break-even is where revenue equals cost, so profit is zero.

### Task 1.5: Lesson 5 `exponentials` upgrade
- Add concept "Where e Comes From": A = P(1 + r/n)^{nt} explained (rate split into n pieces, applied n times); $1 at 100% for one year: n = 1: 2, 2: 2.25, 4: 2.4414, 12: 2.6130, 365: 2.71457, 1,000,000: 2.71828; the values creep up to e. Then $10,000 at 5% for 3 years: yearly 11,576.25, monthly 11,614.72, daily 11,618.22, continuous 11,618.34.
- Extend the rule block: negative exponents b^{−n} = 1/b^n from the divide-by-b pattern (2^{−3} = 1/8); fractional exponents b^{1/2} = √b because (b^{1/2})² = b^{1/2 + 1/2} = b; 8^{1/3} = 2; 4^{3/2} = 8; rewriting table: 1/x = x^{−1}, 1/x² = x^{−2}, √x = x^{1/2}, 1/√x = x^{−1/2}. Say this is what lets the power rule in `<Ref to="power-rule"/>` handle fractions and roots.
- Second practice: $5,000 at 4% for 10 years, monthly versus continuous: 5000(1 + 0.04/12)^{120} = 7,454.16; 5000e^{0.4} = 7,459.12 (e^{0.4} ≈ 1.49182).
- Quiz `exponentials`: replace q1 with "What is 2^{−3}?" answer 1/8 (distractors −8, −6, 1/6); keep q2; replace q3 with "√x written as a power" answer x^{1/2} (distractors x², x^{−1}, 2x).

### Task 1.6: Lesson 6 `logarithms` upgrade
- Add a Box to the concept: calculators have two buttons, log (base 10) and ln (base e); this course uses ln only; pressing log gives a different number.
- Second practice: population 50,000 growing continuously at 2% a year; when does it reach 80,000? 80000 = 50000e^{0.02t}, 1.6 = e^{0.02t}, t = ln(1.6)/0.02, ln(1.6) ≈ 0.4700, t ≈ 23.5 years.
- Quiz: unchanged.

- [ ] Run `verify_content.py` (extended with the quadratics practice-2 roots), `npm test`, artifact grep over lessons 1 to 6. Commit `git commit -m "Content: Foundations module, six lessons"`.

---

## Phase 2: Limits & Continuity (lessons 7 to 9)

**Success criteria:** as Phase 1, for these three lessons.

### Task 2.1: Lesson 7 `limits` upgrade
- Concept: keep the table story. Factoring in the practice now cites `<Ref to="quadratics"/>`.
- New concept "When You Can Just Plug In": for polynomials and any function with no jam at c, the limit is f(c) (direct substitution), because the graph has no break there (previewing `<Ref to="continuity"/>`); lim x→3 of x² + 2x is 15; limit laws (sum, difference, constant multiple, product) stated as "limits respect arithmetic".
- New example block "Two Sides That Disagree": a courier charges $5 for parcels under 2 kg and $8 from 2 kg on: f(w) = 5 for w < 2, f(w) = 8 for w ≥ 2. Left limit 5, right limit 8, limit does not exist. Second example (algebraic): f(x) = x + 1 for x < 2 and 6 − x for x ≥ 2: left 3, right 4. Graph via `fns` with NaN outside each piece (confirm the sampler breaks the path on NaN; if not, extend `sampleSegments`), open point at (2, 3), filled at (2, 4).
- Interactive: ParamExplorer, parameter x from 0 to 4 step 0.01, start 1.5, curve y = x + 2, a hollow point at (2, 4) via `open:true`, a moving point at (x, (x² − 4)/(x − 2)) except at exactly 2 where the point is omitted and the caption says f(2) is 0/0, undefined, and the limit is still 4; formula shows f(x) to 3 decimals.
- Practice 1: existing (x² − 4)/(x − 2) = 4, cite `<Ref to="quadratics"/>` for difference of squares.
- Practice 2: lim x→3 of (x² − x − 6)/(x − 3): trinomial factors (x − 3)(x + 2), limit 5.
- Quiz: unchanged.

### Task 2.2: Lesson 8 `infinite-limits` upgrade
- Fold the old second practice (2x + 5)/(x² − 1) → 0 into the worked example block as a second mini-example.
- Second practice (business): average cost AC(x) = (2000 + 1.5x)/x from `<Ref to="business-models"/>`; as x grows the limit is 1.5 (same degree, ratio 1.5/1); meaning: average cost settles at the per-unit cost once fixed cost is spread thin.
- Quiz: unchanged.

### Task 2.3: Lesson 9 `continuity` upgrade
- New example "Diagnosing the Courier Jump": f(2) = 8 is defined, the limit does not exist (5 from the left, 8 from the right), so condition 2 fails: a jump.
- Second practice: f(x) = (x² − 1)/(x − 1) for x ≠ 1 and f(1) = 3. Condition 1 holds (f(1) = 3), condition 2 holds (limit 2), condition 3 fails (2 ≠ 3): a hole patched at the wrong height.
- Quiz: unchanged.

- [ ] Verify, test, grep, commit `git commit -m "Content: Limits and Continuity module"`.

---

## Phase 3: Derivatives (lessons 10 to 18)

**Success criteria:** as Phase 1 for these nine lessons, including the two new ones.

### Task 3.1: Lesson 10 `derivative` upgrade
- In "Step 1", name the secant slope the **average rate of change** and add a business example: C(x) = 1000 + 25x − 0.05x², from x = 50 to 100: C(100) = 3000, C(50) = 2125, average rate 875/50 = 17.5 dollars per unit.
- Second practice: limit definition on f(x) = x² + 4x: f(x + h) = x² + 2xh + h² + 4x + 4h; rise 2xh + h² + 4h; divide by h: 2x + h + 4; limit 2x + 4; slope at x = 1 is 6.
- Quiz: unchanged.

### Task 3.2: Lesson 11 `power-rule` upgrade
- New concept "Fractions and Roots Are Powers Too": cite `<Ref to="exponentials"/>`; d/dx[1/x] = d/dx[x^{−1}] = −x^{−2} = −1/x²; d/dx[√x] = (1/2)x^{−1/2} = 1/(2√x); d/dx[1/x²] = −2/x³.
- New example block: f(x) = 3√x + 5/x² − 2x gives 3/(2√x) − 10/x³ − 2.
- Practice 1: existing. Practice 2: f(x) = 2/x + 4√x − x³/3 gives −2/x² + 2/√x − x².
- Quiz `power-rule`: replace q3 with d/dx[1/x] = −1/x² (distractors 1/x², ln x, −1/x).

### Task 3.3: NEW Lesson 12 `tangent-lines` (time "12 min")
- Concept "The Line That Hugs the Curve": at a = 1 on x², slope 2, point (1, 1), point-slope (from `<Ref to="lines"/>`) gives y = 2x − 1, the exact line drawn in `<Ref to="derivative"/>`. General: y = f(a) + f'(a)(x − a).
- Concept "Using the Tangent to Estimate": f(1.1) ≈ 1.2 vs 1.21; f(1.5) ≈ 2 vs 2.25; error grows with distance. Business: C(x) = 1000 + 25x − 0.05x², C(50) = 2125, C'(50) = 20, so C(51) ≈ 2145 vs 2144.95 (this is the marginal idea, coming in `<Ref to="marginal"/>`).
- Concept "Units": C in dollars, x in units gives C' in dollars per unit; miles and hours give miles per hour.
- Concept "Where a Derivative Fails": corner |x| at 0 (slopes −1 and +1 disagree), vertical tangent for x^{1/3} at 0 (slope grows without bound), any break. Graphs of |x| and cube root. Differentiable implies continuous; continuous does not imply differentiable (|x|).
- Rule: tangent line; linear approximation f(a + Δx) ≈ f(a) + f'(a)Δx; three ways a derivative fails.
- Example: f(x) = x³ − 2x at 2: f(2) = 4, f'(2) = 10, y = 10x − 16; f(2.05) ≈ 4.5 vs 4.515125.
- Example (business): R(x) = 50x − 0.02x², R(1000) = 30,000, R'(1000) = 10, R(1010) ≈ 30,100 vs 30,098.
- Interactive: ParamExplorer, parameter Δx from −1 to 1 step 0.02, start 0.5, curves x² and 2x − 1, points on the curve at (1 + Δx, (1 + Δx)²) and on the tangent at (1 + Δx, 1 + 2Δx), caption giving the estimate, the true value, and the error.
- Practice 1: tangent to √x at 4: slope 1/4, y = x/4 + 1; √4.2 ≈ 2.05 vs 2.04939.
- Practice 2: is |x − 3| differentiable at 3 (no, corner: left −1, right +1) and continuous there (yes); where is 1/x not differentiable (at 0, not even defined).
- Quiz `tangent-lines`: (1) tangent to y = x² at x = 3 is y = 6x − 9 (distractors y = 6x + 9, y = 2x − 9, y = 9x − 6); (2) at a corner the derivative does not exist because the left and right slopes disagree; (3) with f(2) = 5 and f'(2) = 3, f(2.1) ≈ 5.3 (distractors 5.03, 8, 5.6).

### Task 3.4: Lesson 13 `marginal` upgrade
- Derive R(x) = 12x − 0.01x² from p = 12 − 0.01x citing `<Ref to="business-models"/>`; the quadratic formula step cites `<Ref to="quadratics"/>` instead of re-teaching it; units sentence; tie "why approximate" to the tangent estimate in `<Ref to="tangent-lines"/>`.
- Second practice: R(x) = 80x − 0.1x²; R'(200) = 40; R(201) − R(200) = 39.9.
- Quiz: unchanged.

### Task 3.5: Lesson 14 `exp-log-derivatives` upgrade
- The "more on that idea later" sentence now says the full derivation arrives in `<Ref to="implicit-related-rates"/>`.
- Second practice: f(x) = 3e^x − 2 ln x + x², f'(x) = 3e^x − 2/x + 2x, f'(1) = 3e ≈ 8.155.
- Quiz: unchanged.

### Task 3.6: Lesson 15 `product-quotient` upgrade
- The "over v² later" sentence now points to `<Ref to="chain-rule"/>`.
- Second practice: f(x) = e^x / x, f'(x) = e^x(x − 1)/x²; slope zero at x = 1.
- Quiz: unchanged.

### Task 3.7: Lesson 16 `chain-rule` upgrade
- New concept "Closing a Loop: Where the Quotient Rule Comes From": u/v = u · v^{−1}; product rule plus chain rule gives u'/v − uv'/v² = (u'v − uv')/v². Short bonus paragraph: b^x = e^{x ln b}, so d/dx[2^x] = 2^x ln 2 ≈ 0.693 · 2^x.
- Second practice: f(x) = √(x² + 9) gives x/√(x² + 9); f'(4) = 0.8.
- Quiz: unchanged.

### Task 3.8: NEW Lesson 17 `implicit-related-rates` (time "11 min")
- Concept "When y Is Not Alone": x² + y² = 25; differentiate both sides treating y as a function of x (chain rule): 2x + 2y y' = 0, y' = −x/y; at (3, 4) slope −3/4; check by solving y = √(25 − x²) and differentiating: −3/4.
- Concept "A Promise Kept: the Derivative of ln x": y = ln x means e^y = x; differentiate: e^y y' = 1; y' = 1/e^y = 1/x.
- Concept "Everything Changes Over Time": related rates; R = p · q with both moving; dR/dt = p'q + pq'; the 4-step recipe (write the relationship, differentiate with respect to t, substitute values last, answer with units).
- Rule: implicit steps; the recipe.
- Example (business): price $30 rising $1 per month, q = 1000 − 20p so q = 400 and dq/dt = −20; dR/dt = 400 − 600 = −200 dollars per month; revenue falls even as price rises, which `<Ref to="elasticity"/>` explains.
- Practice 1: x² + xy + y² = 7 at (1, 2): y' = −(2x + y)/(x + 2y) = −4/5; confirm the point is on the curve (1 + 2 + 4 = 7).
- Practice 2: C(x) = 1000 + 25x − 0.05x², x = 50 rising 4 units per day: dC/dt = C'(50) · 4 = 20 · 4 = 80 dollars per day.
- Quiz `implicit-related-rates`: (1) d/dx[y²] when y depends on x is 2y y' (distractors 2y, 2x, y²); (2) in related rates you differentiate the relationship with respect to time first and substitute numbers last; (3) slope of x² + y² = 25 at (3, 4) is −3/4 (distractors 3/4, −4/3, 0).

### Task 3.9: Lesson 18 `elasticity` upgrade
- New concept "Why E = 1 Is the Top of the Revenue Hill": R(p) = p · f(p), product rule gives R'(p) = f(p) + p f'(p) = f(p)(1 − E). Check at p = 30: 400(1 − 1.5) = −200, matching `<Ref to="implicit-related-rates"/>`.
- Second practice: for q = 1000 − 20p find the unit-elastic price: 20p/(1000 − 20p) = 1 gives p = 25; R(25) = 12,500; confirm with the vertex of R(p) = 1000p − 20p².
- Quiz: unchanged.

- [ ] Verify, test, grep, commit `git commit -m "Content: Derivatives module, nine lessons"`.

---

## Phase 4: Applications of Derivatives (lessons 19 to 22)

### Task 4.1: Lesson 19 `first-derivative-test`: second practice f(x) = x⁴ − 4x³: f' = 4x²(x − 3), critical 0 and 3; signs at −1, 1, 4 are −16, −8, 64; no sign change at 0 (flat pause), min at 3 with f(3) = −27.
### Task 4.2: Lesson 20 `concavity`: new concept "Putting It Together: Sketching a Curve" on f(x) = x³ − 3x²: f' = 3x(x − 2), f'' = 6x − 6; max at 0 (value 0), min at 2 (value −4), inflection at 1 (value −2); summary table then graph. Second practice: f(x) = x³ − 6x² + 9x + 1: critical 1 and 3; f''(1) = −6 (max, value 5), f''(3) = 6 (min, value 1); inflection at 2 (value 3).
### Task 4.3: Lesson 21 `absolute-extrema`: new example "When Capacity Wins": P(x) = −0.01x² + 40x − 7000 on [0, 1500]; critical 2000 is outside; P(0) = −7000, P(1500) = 30,500; the unconstrained peak (`<Ref to="optimization"/>`) would be 33,000 at 2000. Second practice: R(p) = 600p − 20p² with price limited to [5, 12]: critical 15 outside; R(5) = 2,500, R(12) = 4,320.
### Task 4.4: Lesson 22 `optimization`: new example "Minimizing Average Cost": C(x) = 0.5x² + 20x + 800, AC = 0.5x + 20 + 800/x, AC' = 0.5 − 800/x² = 0 at x = 40, AC'' = 1600/x³ > 0, AC(40) = 60, and C'(40) = 60 (average cost is minimized where it equals marginal cost). Second practice (order size): 1,200 units a year, $50 per order, $3 per unit per year holding on average inventory x/2: T(x) = 60000/x + 1.5x, T' = 0 at x = 200, 6 orders a year, T(200) = 600.
- Quizzes unchanged.

- [ ] Verify, test, grep, commit `git commit -m "Content: Applications of Derivatives module"`.

---

## Phase 5: Integration (lessons 23 to 28)

### Task 5.1: Lesson 23 `antiderivatives`: new example "Pinning Down C": C'(x) = 25 − 0.1x with fixed cost 1000 gives C(x) = 25x − 0.05x² + K, C(0) = 1000 so K = 1000, the cost function from `<Ref to="marginal"/>`. Second practice: R'(x) = 80 − 0.2x with R(0) = 0 gives R(x) = 80x − 0.1x², and p = R/x = 80 − 0.1x.
### Task 5.2: Lesson 24 `substitution`: new example "Adjusting a Constant": ∫ x e^{x²} dx with u = x², x dx = du/2, answer e^{x²}/2 + C. Second practice: ∫ x/(x² + 1) dx = (1/2) ln(x² + 1) + C (bars optional since x² + 1 > 0).
### Task 5.3: NEW Lesson 25 `riemann-sums` (time "11 min")
- Concept "Area Out of Rectangles": x² on [0, 2]; left n = 4: widths 0.5, heights 0, 0.25, 1, 2.25, sum 1.75 (under); right n = 4: 0.25, 1, 2.25, 4, sum 3.75 (over); the truth is between.
- Concept "More Rectangles, Less Gap": table n = 4: 1.75 / 3.75; 8: 2.1875 / 3.1875; 16: 2.4219 / 2.9219; 100: 2.6268 / 2.7068; 1000: 2.6627 / 2.6707; both squeeze toward 8/3 ≈ 2.6667.
- Concept "Writing the Sum": sigma notation as shorthand; the definite integral as the limit; the integral sign as a stretched S. Business: rectangles under a marginal cost curve are the costs of successive units, so the area is total cost (paying off in `<Ref to="ftc"/>`).
- Rule: left sum, right sum, Δx = (b − a)/n, the limit definition.
- Example: 2x + 1 on [0, 3], n = 3: left 9, right 15, exact 12 by geometry (rectangle 3 plus triangle 9).
- Interactive: RiemannExplorer fn x², a 0, b 2, exact 8/3, xMin −0.2, xMax 2.3, yMin −0.3, yMax 4.4.
- Practice 1: right sum n = 4 for x² on [0, 2] is 3.75 and why it overestimates (increasing function).
- Practice 2: C'(x) = 20 − 0.2x, estimate the cost of the first 10 units with 5 left rectangles of width 2: heights 20, 19.6, 19.2, 18.8, 18.4, sum 192; exact 190; overestimate because the curve falls.
- Quiz `riemann-sums`: (1) left sum n = 2 for x² on [0, 2] is 1 (distractors 5, 2.5, 4); (2) as n grows the sums approach the exact area, the definite integral; (3) for an increasing function left sums underestimate.
### Task 5.4: Lesson 26 `definite-integral`: rebuild the concept on `<Ref to="riemann-sums"/>`; new example block by geometry: ∫₀³(2x + 1)dx = 12 and ∫₋₂²x dx = 0 (signed). Second practice: ∫₀⁴(4 − x)dx = 8 and ∫₁³ 5 dx = 10 read as $5k per day for two days.
### Task 5.5: Lesson 27 `ftc`: new example "A Rate Adds Up to a Total": ∫₅₀¹⁰⁰(25 − 0.1x)dx = 875, the cost of units 51 through 100, matching the average-rate example in `<Ref to="derivative"/>`. Second practice: ∫₁₀₀²⁰⁰(80 − 0.2x)dx = 5,000.
### Task 5.6: NEW Lesson 28 `integration-by-parts` (time "11 min")
- Concept: derive from the product rule in three lines; ∫u dv = uv − ∫v du; choosing u as the piece that simplifies when differentiated.
- Rule: the formula; the definite version; the choice guideline.
- Example 1: ∫x e^x dx = x e^x − e^x + C with the differentiate-to-check.
- Example 2: ∫ln x dx = x ln x − x + C (dv = dx); ∫₁ᵉ ln x dx = 1.
- Example 3 (business): PV of income growing as 1000t for 5 years at 5%: ∫₀⁵1000t e^{−0.05t}dt = 10,599.6 (e^{−0.25} ≈ 0.778801); every intermediate line shown.
- Practice 1: ∫x e^{2x}dx = x e^{2x}/2 − e^{2x}/4 + C.
- Practice 2: ∫₁⁴ x ln x dx = 8 ln 4 − 3.75 ≈ 7.3404 (8 ln 4 ≈ 11.0904).
- Quiz `integration-by-parts`: (1) the formula; (2) for ∫x e^x dx choose u = x because it simplifies when differentiated; (3) ∫ln x dx = x ln x − x + C (distractors 1/x + C, ln x + C, x ln x + C).

- [ ] Verify, test, grep, commit `git commit -m "Content: Integration module, six lessons"`.

---

## Phase 6: Business Applications (lessons 29 to 32) and the full contract

### Task 6.1: Lesson 29 `area-between-curves`: new example "Profit Is an Area Between Marginal Curves": R'(x) = 60 − 0.1x, C'(x) = 20 + 0.1x cross at 200; ∫₀²⁰⁰(40 − 0.2x)dx = 4,000. Second practice: y = x² − 4 and y = 2x − 1 cross at −1 and 3; area 32/3.
### Task 6.2: NEW Lesson 30 `average-value` (time "9 min")
- Concept: list average versus curve average; the formula falls out of the Riemann sum (`<Ref to="riemann-sums"/>`): (1/n)Σf(xᵢ) = (1/(b − a))Σf(xᵢ)Δx; the rectangle with the same area.
- Rule: f_avg = (1/(b − a))∫ₐᵇ f(x)dx.
- Example 1: x² on [0, 2] averages 4/3; graph with the rectangle of height 4/3.
- Example 2: inventory I(t) = 500 − 50t over 10 days averages 250 (the x/2 used in `<Ref to="optimization"/>`).
- Example 3: price p(t) = 20 + 4t − 0.5t² over [0, 8] averages 25.33.
- Practice 1: 3x² on [1, 3] averages 13.
- Practice 2: revenue rate 1000e^{0.1t} over [0, 5] averages 1,297.44.
- Quiz `average-value`: (1) the formula; (2) average of x on [0, 4] is 2; (3) the average value is the height of the rectangle with the same area over the interval.
### Task 6.3: Lesson 31 `surplus`: new example block: D(x) = 100 − 0.5x, S(x) = 20 + 0.3x, equilibrium (100, 50), CS 2,500, PS 1,500 (unequal, on purpose). Second practice: D(x) = 66 − 0.01x², S(x) = 18 + 0.02x², equilibrium (40, 50), CS 426.67, PS 853.33.
### Task 6.4: Lesson 32 `income-streams`: new concept "Future Value": FV = e^{rT} · PV = R(e^{rT} − 1)/r; $10,000 a year for 5 years at 6% is about 58,310 (exact PV 43,197, quoted "about 43,200" as before). New concept "Forever": ∫₀^∞ as a limit, PV = R/r, 10,000/0.06 ≈ 166,667. New example "A Growing Stream" via `<Ref to="integration-by-parts"/>`: (10000 + 2000t) for 5 years at 6%: 63,717, with ∫₀⁵t e^{−0.06t}dt = 10.2602 shown. Second practice: FV of 5,000 a year for 10 years at 4% is 61,478; perpetuity 125,000. Quiz: replace q2 with "PV of R dollars a year forever at rate r" answer R/r (distractors R · r, R e^{−r}, R/(1 − r)).
### Task 6.5: Full contract test. Add to `src/content.test.jsx`:

```jsx
it.each(LESSONS)('$slug: has a worked example and exactly two practices in the right order', (l) => {
  const types = l.content.map((b) => b.type);
  expect(types).toContain('example');
  expect(types.filter((t) => t === 'practice').length).toBe(2);
  expect(types.slice(-2)).toEqual(['practice', 'practice']);
  expect(types.indexOf('rule')).toBeGreaterThan(types.indexOf('concept'));
});

it.each(LESSONS)('$slug: prose has no emoji, arrows, or dash artifacts', (l) => {
  const { container, unmount } = render(<>{l.content.map((b, i) => <div key={i}>{b.render()}{b.type === 'practice' ? b.answer() : null}</div>)}</>);
  const text = container.textContent;
  unmount();
  expect(text).not.toMatch(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u);
  expect(text).not.toMatch(/\u2192|\u2014|\u2013/);
  expect(text).not.toMatch(/ {2}- {2}/);
});
```

- [ ] Verify, `npm test`, commit `git commit -m "Content: Business Applications module and full content contract"`.

---

## Phase 7: Documentation

- [ ] README: badges (lessons 32, quiz questions 96), curriculum table with all 32 titles, "Finish all 32 lessons", "two practice problems" in the block description, a sentence on migrated progress.
- [ ] `C:\calculus\summary.md`: module list, lesson count, verification status dated 2026-09-05.
- [ ] JOURNAL.md entry: what changed, the migration rationale (public behavior change: certificate persists; lesson count grows), and the verify script result.
- [ ] Spec status line to "Implemented and verified" once Phase 8 passes.
- [ ] Commit `git commit -m "Docs: README, summary, journal for the 32-lesson course"`.

## Phase 8: Verification

- [ ] `python verify_content.py` all checks pass (count recorded in JOURNAL.md).
- [ ] `npm test` green; `npm run lint` at or below 12 warnings; `npm run build` clean.
- [ ] Design pre-flight from `.agents/skills/design-taste-frontend` Section 14 on the RiemannExplorer lab and the new graphs.
- [ ] Live Chrome pass on `npm run preview`: sign up, open each new lesson (3, 4, 12, 17, 25, 28, 30), drag every new lab, pass one new quiz with a wrong answer first, confirm "Lesson N of 32" and the certificate copy; seed a v1 save in localStorage and confirm progress and certificate migrate.
- [ ] Regenerate `docs/landing.png` if the landing copy changed visibly.
- [ ] Final commit. Do not push.
