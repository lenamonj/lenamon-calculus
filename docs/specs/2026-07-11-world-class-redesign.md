# World-Class Visual Redesign - "The Living Graph"

Date: 2026-07-11
Status: Approved direction (owner asked for a world-class, high-impact pass)
Mode: Redesign - Overhaul (visual language) with strict preservation of content,
IA, view flow, functional copy, ARIA behavior, and all 279 test contracts.

## Design read

A consumer education landing + course shell for a personal-brand interactive
calculus course. Audience: math-curious beginners (the curious 15-year-old and
adult self-learners). Language: night graph-paper observatory with quant
precision - chalk curves on deep ink, one gold accent, mono data readouts.
Leaning toward native CSS + hand-driven SVG math animation, KaTeX as display
material, zero new runtime dependencies.

Dials: DESIGN_VARIANCE 7, MOTION_INTENSITY 8, VISUAL_DENSITY 3.
Reasoning: the owner explicitly asked for motion muscle ("AI flashy, muscle
flex") so motion runs high, but this is a learning product for beginners, so
layout stays structured and density stays airy. All motion collapses under
prefers-reduced-motion.

## Why the current design fails (audit)

The current landing is the statistical LLM default: centered hero, AI-purple
gradient CTAs, gradient text, an eyebrow pill with a lightning bolt, a
"Free forever / No prerequisites" micro-strip under the CTAs, a big-number stat
strip, three equal feature cards, six uniform module cards, aurora orbs.
Engineering is converged (279 tests, lint 0, audit clean); the visual identity
is templated. This redesign replaces the visual language only.

## Token system

Palette (dark, single theme - the product is a dark app end to end):
- ink      #05080f   page ground (near-black blue, not pure black)
- panel    #0a101d   raised surfaces (used sparingly; borders over cards)
- paper    #edf1f8   primary text and the function curves themselves
- muted    #94a1b7   secondary text
- grid     rgba(148,166,200,0.10)  graph-paper lines, hairline dividers
- gold     #e6b45a   THE accent (with #b8892f depth edge)

Color grammar (the memorable rule): the graph world is chalk on ink; only the
calculus is gold. Tangent lines, marked extrema, shaded integral areas, primary
CTAs, progress, the seal - everything the course teaches you to see - is gold.
Nothing else is. Semantic block colors inside the course app (concept/formula/
example/lab/practice) are preserved - they encode lesson structure.

Type roles:
- Display: Bricolage Grotesque (kept brand face, deployed with conviction:
  optical size 96, weights 700/800, tight leading, real scale)
- Reading: Source Serif 4 (kept; pairs with KaTeX)
- Data/mono: IBM Plex Mono (new; live readouts, axis labels, lesson numbers)
- Math as display: KaTeX (Computer Modern) rendered large in the hero graph
- Certificate: Playfair Display + Pinyon Script (unchanged)

Shape: one radius system - panels 16, controls 10, pills only for the point
markers. Buttons rectangular-soft (10), never pill.

## Signature element

THE LIVING GRAPH. The hero is a real coordinate plane: a business profit curve
draws itself in on load, and a gold tangent line rides the curve under the
visitor's pointer with live P(q) and P'(q) readouts in mono - computed from the
real function, not faked. The scroll then replays the arc of the course in
three beats using the same curve family:

1. Limits: a secant's second point slides into the first until the secant
   becomes the gold tangent (h shrinking to 0).
2. Optimization: the tangent sweeps the curve and locks flat at the true
   maximum; the peak gets the gold point.
3. Integration: Riemann bars (n = 6, then 12, then 24) rise under the curve and
   dissolve into the smooth gold area.

The landing page performs the curriculum. Every animation is storytelling
(the actual Module 2 / 4 / 5 content), not decoration.

## Landing layout (top to bottom)

1. Nav (64px, one line): brand left; "Sign in" ghost + "Create your free
   account" gold, right.
2. Hero, asymmetric split 52/48: left - the kept headline ("Calculus is not
   hard. / It was just explained badly." - both lines Bricolage, no serif
   injection, no gradient text), subtext cut to 19 words, two CTAs.
   Right - the Living Graph panel. Mobile: stacks; pointer becomes an
   autonomous slow sweep.
3. Manifesto (full-width editorial): the kept "never state a fact" rule in
   large Source Serif. The one centered moment on the page.
4. The three story beats (full-width band, sequential vignettes that draw in
   on scroll): limits, optimization, integration - each with a one-line plain
   caption naming the real module.
5. Syllabus: six modules as a two-column asymmetric index - micro SVG motif
   per module (line / approaching hole / tangent / peak / area / two curves),
   module name, blurb, and the real lesson titles in compact mono. Real
   content replaces generic cards.
6. Proof band, two-cell asymmetric bento: left (wide) - a real worked-example
   excerpt with actual KaTeX steps ("no skipped steps", shown not claimed);
   right - the certificate rendered small with the real gold CertSeal.
7. Final CTA band: one line, one gold button.
8. Footer: kept brand line + discreet Admin link (IA preserved).

CTA label discipline: signup intent = "Create your free account" everywhere on
the landing page; signin intent = "Sign in" everywhere. The auth screen's
submit stays exactly "Create account" (test contract).

## Course app modernization (levers 1-4 only)

- Background: retire aurora orbs + film grain for a faint static graph-paper
  grid on ink (subject-grounded atmosphere, cheaper to paint).
- Buttons/accents: purple gradient system becomes the gold system; XP chip
  already amber - now harmonized instead of clashing.
- Numbers (lesson ids, XP, progress, axis labels) move to IBM Plex Mono.
- Progress bar, active nav states, quiz progress dots: gold.
- Confetti palette: gold/paper/blue chalk.
- Everything else (lesson content, semantic block colors, quiz flow, labs,
  certificate, admin behavior) unchanged.

## Explicit non-goals

- No light mode: the product is a committed dark app end to end (course
  content styling is dark-tuned across 3,300 lines). Documented decision.
- No route/slug changes (there are none - state-machine views).
- No copy rewrite beyond the hero subtext trim and CTA label unification.
- No new runtime dependencies. No Tailwind (repo convention is inline styles).
- No logo/wordmark content change: the integral glyph + "Lenamon Calculus"
  stay; only the chip's fill moves from purple gradient to the new system
  (inherent to the approved overhaul; flagged for owner review).

## Verification

- npm test (all 279 must stay green), npm run lint, npm run build.
- Live browser screenshots (desktop + mobile widths) of landing, auth, course,
  quiz, certificate; both with motion and with prefers-reduced-motion.
- Taste-skill Section 14 Pre-Flight matrix run against the final page.
