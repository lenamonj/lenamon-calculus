# Lesson Experience Redesign - "The Working Notebook"

Date: 2026-07-11
Status: Implemented and verified
Follows: 2026-07-11-world-class-redesign.md (landing + chrome). This spec
covers the lesson reading surface, which that pass deliberately left alone.

## Problem

Every lesson block (concept, formulas, example, lab, practice) shared one
glass-card treatment, so a lesson read as a stack of five identical rounded
rectangles. Uniformity, not lack of decoration, was why lessons felt flat
next to the new landing page.

## Concept

A lesson is a beautifully typeset working notebook, not a deck of cards.
Structure now encodes meaning:

- **Opener (arrival moment).** Mono module + lesson number line, the lesson
  title as the page's single h1 in display type, a short gold rule, and a
  giant outlined ghost numeral of the lesson id in the top corner.
- **Blocks become document sections.** Each starts with its thin type-colored
  label (icon + name) ruling across the page into a fading hairline; prose
  flows directly on the page. Hairlines divide sections. No cards.
- **Only two containers remain, because they mean something:**
  - Key Formulas sit on a gold plate with certificate-style corner brackets,
    square-cut like the certificate frame (the one square-cornered element,
    by rule).
  - Interactive labs sit on an ink instrument bench (inset panel).
- **Reading progress.** A 2px gold thread across the top of the lesson
  scroller, driven entirely by CSS animation-timeline: scroll(nearest);
  invisible where unsupported, no JS, no scroll listeners.
- **Scroll-spy.** The "On this page" rail highlights the section being read
  (IntersectionObserver on block anchors, keyed by lesson so switching
  lessons resets by derivation, not by a synchronous setState). The rail also
  gains a quiz entry ("Check your understanding" / "Quiz passed").
- **Section reveals.** Blocks rise in once on scroll via the shared Reveal
  component (threshold relaxed to 0 so tall lab sections fire reliably).
- **Quiz completion flows forward.** The completion box now carries the
  gated continue button (same label as the header's Next control), so
  finishing a quiz does not send the eyes back to the top chrome.

## Contracts preserved

- Exactly one h1 in the course view: the opener title (header title demoted
  to a div; the certificate masthead becomes the h1 on the certificate view).
- CC section labels remain h2 with unchanged accessible names.
- "Lesson N of M" phrasing exists only in the header (opener says
  "Lesson 08" with no "of").
- Disclosure button text/aria, quiz flow and labels, sliders, drawer,
  admin: untouched. All 279 tests pass; lint stays at the 12-warning
  baseline; build 134 KB gzip.

## Verification

Live Chrome pass on Lessons 9, 10, 11: opener + ghost numeral, document
sections, formula plate with corner brackets, scroll-spy highlighting,
reading thread growing to full width at page bottom, Your Turn disclosure,
quiz frame, rail quiz entry. jsdom safety: IO/matchMedia/rAF all guarded.
