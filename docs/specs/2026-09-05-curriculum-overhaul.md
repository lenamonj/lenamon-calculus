# Curriculum Overhaul - "Nothing Assumed, Nothing Skipped"

Date: 2026-09-05
Status: Approved design, implementation in progress
Follows: 2026-07-11-lesson-experience.md (lesson surface). This spec covers the
course content itself: what is taught, in what order, and how deeply.

## Problem

The 25 lessons are mathematically correct and the sentence-level explanations
are good. The weakness is structural. The course skips prerequisite ideas and
then patches them ad hoc mid-lesson:

- Factoring first appears inside the limits practice problem; the quadratic
  formula first appears inside marginal analysis. Neither has a lesson.
- Cost, revenue, profit, demand, and break-even appear with no introduction in
  Lesson 10. The revenue function there comes from nowhere because the
  price-demand relationship is never taught.
- The number e is asserted to be "just a constant." Nothing shows where
  2.71828 comes from.
- Negative and fractional exponents are never taught, so the power rule never
  handles 1/x^2 or sqrt(x).
- Area as a sum is asserted, never shown. No Riemann sums.
- Two promises are never delivered: "more on inverse slopes later" (Lesson 11)
  and "why over v^2 comes later" (Lesson 12).
- Standard business calculus topics are absent: tangent line equation, where a
  derivative fails to exist, implicit differentiation and related rates,
  integration by parts, average value, future value and perpetuities, total
  change from a rate (recovering cost from marginal cost).
- Lessons 5, 9, 21, 24 have no worked example block. Most lessons have one
  practice problem.
- Emoji and stray "  -  " artifacts contradict the no-emoji design system.

Engineering constraints: 62 hard-coded "Lesson N" cross-references, progress
saved by array index, hard-coded 25/6/75 counts in the certificate, landing
page, README, and quiz test.

## Decisions (approved 2026-09-05)

1. Scope: all 7 new lessons, 32 total.
2. Learner progress is migrated, not reset. An already-earned certificate
   stays unlocked.
3. Every lesson gets two practice problems with full worked solutions.
4. Quizzes stay at 3 questions per lesson (96 total).

## Target syllabus

Existing lessons keep their relative order. New lessons are marked NEW.

| # | Slug | Module | Title |
|---|------|--------|-------|
| 1 | functions | Foundations | Functions, Domain & Range |
| 2 | lines | Foundations | Linear Equations & Slope |
| 3 | quadratics | Foundations | NEW Quadratics, Polynomials & Solving Equations |
| 4 | business-models | Foundations | NEW Business Models: Cost, Revenue, Profit & Demand |
| 5 | exponentials | Foundations | Exponential Functions & e |
| 6 | logarithms | Foundations | Logarithmic Functions |
| 7 | limits | Limits & Continuity | Introduction to Limits |
| 8 | infinite-limits | Limits & Continuity | Infinite Limits & Limits at Infinity |
| 9 | continuity | Limits & Continuity | Continuity |
| 10 | derivative | Derivatives | The Derivative: What It Means |
| 11 | power-rule | Derivatives | Power Rule & Basic Rules |
| 12 | tangent-lines | Derivatives | NEW Tangent Lines, Linear Approximation & Differentiability |
| 13 | marginal | Derivatives | Marginal Analysis |
| 14 | exp-log-derivatives | Derivatives | Derivatives of e^x and ln(x) |
| 15 | product-quotient | Derivatives | Product & Quotient Rules |
| 16 | chain-rule | Derivatives | The Chain Rule |
| 17 | implicit-related-rates | Derivatives | NEW Implicit Differentiation & Related Rates |
| 18 | elasticity | Derivatives | Elasticity of Demand |
| 19 | first-derivative-test | Applications of Derivatives | First Derivative Test |
| 20 | concavity | Applications of Derivatives | Second Derivative & Concavity |
| 21 | absolute-extrema | Applications of Derivatives | Absolute Extrema |
| 22 | optimization | Applications of Derivatives | Optimization |
| 23 | antiderivatives | Integration | Antiderivatives |
| 24 | substitution | Integration | Substitution |
| 25 | riemann-sums | Integration | NEW Area as a Sum: Riemann Sums |
| 26 | definite-integral | Integration | The Definite Integral |
| 27 | ftc | Integration | Fundamental Theorem of Calculus |
| 28 | integration-by-parts | Integration | NEW Integration by Parts |
| 29 | area-between-curves | Business Applications | Area Between Curves |
| 30 | average-value | Business Applications | NEW Average Value of a Function |
| 31 | surplus | Business Applications | Consumer & Producer Surplus |
| 32 | income-streams | Business Applications | Income Streams & Present Value |

## Content contract (enforced by tests)

Every lesson has, in this order: at least one `concept` block, exactly one
`rule` block (Key Formulas), at least one `example` block, exactly two
`practice` blocks each with an `answer`, and 3 quiz questions. Labs
(`interactive`) are optional. Lesson prose contains no emoji and no
"  -  " artifact. Every `<Ref>` resolves to an existing slug.

Writing standard, unchanged from the original course: never state a fact
without saying why it is true in terms the learner already has; never skip a
step; the reader is a curious 15-year-old. Business examples use the letters
the business world uses (C, R, P, q, p, t).

## New lessons (what each must contain)

**3. Quadratics, Polynomials & Solving Equations.** Parabola shape and why
(the x^2 term dominates); vertex at x = -b/2a with the reason (symmetry of
roots); opening direction from the sign of a; factoring (common factor,
difference of squares, simple trinomials) with the zero-product rule; the
quadratic formula stated and used, with the sign traps; polynomials named
(degree, leading coefficient); rational functions as a fraction of two
polynomials. Worked example: a profit parabola, find its roots and vertex two
ways. The factoring material currently inside Lesson 5 and the quadratic
formula inside Lesson 10 move here; those lessons cite this one.

**4. Business Models: Cost, Revenue, Profit & Demand.** Fixed cost, variable
cost, C(x) = fixed + variable; average cost C(x)/x and why it falls as fixed
cost is spread; price-demand equation p = a - bx and why it slopes down;
revenue R = p times x, so a linear demand makes a quadratic revenue; profit
P = R - C; break-even as P = 0 (roots of a parabola, from Lesson 3); supply
and demand curves and equilibrium (so Lesson 31 is not the first sighting).
Lab: ParamExplorer sliding the price and showing revenue. The revenue function
in Lesson 13 is derived from its price-demand equation.

**12. Tangent Lines, Linear Approximation & Differentiability.** Equation of
the tangent line y = f(a) + f'(a)(x - a) with the reason (point-slope from
Lesson 2); using the tangent to estimate nearby values, with the error shown
numerically; units of a derivative (dollars per unit, and so on); where a
derivative does not exist: corner (|x|), vertical tangent (cube root), break
(any discontinuity), with a graph of each; "differentiable implies continuous,
not the reverse." This is what makes marginal analysis in Lesson 13 a one-line
consequence.

**17. Implicit Differentiation & Related Rates.** Why some relationships are
not written as y = f(x); differentiating both sides and treating y as a
function of x (chain rule, from Lesson 16); the ln x derivative finally
derived (y = ln x, e^y = x); related rates as "everything depends on time":
a demand equation with p and q both changing, revenue changing over time; the
4-step recipe (draw, relate, differentiate with respect to t, substitute).

**25. Area as a Sum: Riemann Sums.** The rectangle idea with n = 4 left
rectangles computed by hand under f(x) = x^2 on [0, 2]; right rectangles;
under and over estimates; a table for n = 4, 8, 16, 100 converging on 8/3;
sigma notation introduced only as shorthand for "add these up"; the definite
integral defined as the limit of the sums, and the integral sign explained
as a stretched S. Lab: new RiemannExplorer with an n slider (1 to 60) drawing
the rectangles and showing the sum next to the exact area.

**28. Integration by Parts.** Reverse of the product rule, derived in three
lines; the formula with u and dv; how to choose u (the piece that simplifies
when differentiated); worked: integral of x e^x, integral of ln x (the trick
dv = dx); definite version; business use: present value of a growing income
stream, integral of t e^{-rt}.

**30. Average Value of a Function.** Averaging a list versus averaging a
curve; the formula (1/(b - a)) times the integral with the reason (total
divided by width, height of the equivalent rectangle); worked: average
inventory over a cycle, average price over a season; the mean value
connection stated in one sentence.

## Upgrades to existing lessons

- 1 Functions: evaluating f(x + h) and f(a) for expressions (needed in 10);
  function letters in business (C(x), R(q)); second practice.
- 2 Lines: parallel and perpendicular are out of scope; add point-slope form
  y - y1 = m(x - x1) since Lesson 12 uses it; second practice.
- 5 Exponentials: compounding n times per year, A = P(1 + r/n)^{nt}; the table
  of (1 + 1/n)^n producing 2.718...; exponent rules extended to negative and
  fractional exponents with reasons (the pattern from the lesson, and the
  square-root-squared argument); second practice.
- 6 Logarithms: the calculator's log versus ln buttons; solving for time in a
  business problem; second practice.
- 7 Limits: limit laws and direct substitution for polynomials (with the
  reason: continuity, previewed); a piecewise function whose one-sided limits
  disagree, graphed; worked example block; limit lab with ParamExplorer
  (slide x toward the hole and watch f(x)); factoring now cites Lesson 3;
  second practice.
- 8 Infinite limits: second practice (a business limit: average cost as x
  grows, tying to Lesson 4).
- 9 Continuity: the piecewise jump from Lesson 7 diagnosed with the three-part
  test; second practice.
- 10 Derivative: name the secant slope "average rate of change" with a
  business example (average cost increase over a range); second practice.
- 11 Power rule: negative and fractional exponents (rewrite 1/x^2 and sqrt x);
  worked example block; second practice.
- 13 Marginal: units; the revenue function derived from p = 12 - 0.01x; the
  quadratic formula step now cites Lesson 3; marginal average cost mentioned;
  second practice.
- 14 e^x and ln: the "more later" promise now points to Lesson 17; second
  practice.
- 15 Product and quotient: the "over v^2 later" promise now points to Lesson
  16; second practice.
- 16 Chain rule: closing section deriving the quotient rule from product plus
  chain (u times v^{-1}); second practice.
- 18 Elasticity: R'(p) = q (1 - E) derived, which proves the "E = 1 maximizes
  revenue" claim; second practice.
- 19, 20: 20 gets a curve-sketching synthesis section; second practices.
- 21 Absolute extrema: a business example where the endpoint wins (capacity
  limit); second practice.
- 22 Optimization: minimizing average cost as a worked example; second
  practice.
- 23 Antiderivatives: recovering C(x) from C'(x) plus fixed cost (initial
  condition determines C); second practice.
- 24 Substitution: an example needing a constant adjustment (x e^{x^2});
  second practice.
- 26 Definite integral: now built on Lesson 25; worked example block using
  geometry; second practice.
- 27 FTC: "integral of a rate is total change" with total cost from marginal
  cost; second practice.
- 29 Area between curves: second practice.
- 31 Surplus: worked example block; second practice.
- 32 Income streams: future value; perpetuities via an improper integral;
  growing stream via Lesson 28; second practice.
- All lessons: remove emoji and "  -  " artifacts; replace arrows with words.

## Engine changes

- Lessons carry a `slug`. A `Ref` component (`<Ref to="chain-rule"/>`
  renders "Lesson 16") replaces every hard-coded lesson number in prose. A
  test asserts every Ref target exists.
- Progress: `done` becomes an array of slugs. Save format gains `v: 2`. Loader
  migrates v1 (index-based) saves through the old 25-slug order. `idx` is
  validated as before. The certificate unlocks when every lesson is done OR
  `completedAt` is already set (earned certificates stay earned).
- INSPO becomes a slug-keyed map with a card for each new lesson.
- New `RiemannExplorer` lab component, built on Plot and Slider, with an
  aria-labelled slider and aria-live readout, matching the existing labs.
- Certificate text, landing copy, and README compute or state the new counts.
- New tests: content contract (block structure per lesson, two practices,
  quiz per lesson id, 3 questions each), no emoji or artifacts in prose,
  Ref resolution, progress migration, RiemannExplorer rendering and a11y.
- quiz.test asserts 3 questions for every lesson id rather than a literal 75.

## Verification

- Every numeric claim in new or changed content recomputed with Python
  (sympy) before it ships; the script lives in the scratchpad and its result
  is recorded in JOURNAL.md.
- vitest green, lint at or below the 12-warning baseline, production build
  compiles.
- Live Chrome pass on the production build through every new lesson and lab,
  quiz gating on a new lesson, and the progress migration path.
