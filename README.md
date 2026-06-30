<div align="center">

# Lenamon Calculus

### Learn business calculus from absolute zero, one honest step at a time.

A free, interactive web course that teaches calculus to a complete beginner. Every concept is built from the ground up, and nothing is assumed. The guiding rule is simple: **never state a fact without explaining why it is true in terms the learner already understands.**

<br/>

[![License: MIT](https://img.shields.io/badge/License-MIT-22c55e.svg?style=for-the-badge)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![KaTeX](https://img.shields.io/badge/Math-KaTeX-0e9484?style=for-the-badge&logo=latex&logoColor=white)](https://katex.org)

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-6366f1?style=flat-square)](#contributing)
[![No build config](https://img.shields.io/badge/setup-2%20commands-f59e0b?style=flat-square)](#getting-started)
![Lessons](https://img.shields.io/badge/lessons-25-818cf8?style=flat-square)
![Quiz questions](https://img.shields.io/badge/quiz%20questions-75-f472b6?style=flat-square)
![Self hosted math](https://img.shields.io/badge/dependencies-2-34d399?style=flat-square)

</div>

---

## Who this is for

If you can do basic arithmetic, you can start here. No algebra fluency is required, no prior calculus, and no "you should already know this." The reading level targets a curious 15-year-old, which means it works just as well for:

- **Students** who found a textbook that skipped a step and lost them.
- **Adults** returning to math who want the intuition, not just the recipe.
- **Business and finance learners** who need calculus for marginal analysis, optimization, elasticity, and present value.
- **Teachers** looking for worked examples that explain the *why* behind every line.

---

## What makes it different

Most courses lose beginners at the exact moment an author assumes something the student never learned. This project is built to remove those silent assumptions.

| Principle | What it means in practice |
| --- | --- |
| **Explain the why, always** | You will learn *why* you cannot divide by zero, *why* `b^0 = 1`, *why* the chain rule multiplies, and *why* an integral measures area, not just the rules themselves. |
| **No skipped steps** | Worked examples show the algebra in full, including the sign traps and the "obvious" lines that trip people up. |
| **Notation read aloud** | Every new symbol (`f'(x)`, `dy/dx`, the integral sign, limits) is named and grounded the first time it appears. |
| **Verified for accuracy** | Every number, derivative, integral, sign chart, and graph has been independently recomputed across multiple adversarial review passes. |

---

## Features

- **Knowledge-check quizzes.** Every lesson ends with a 3-question quiz drawn straight from its material, a mix of conceptual and compute-it problems. Questions appear one at a time; a wrong answer gives a friendly explanation of why that choice is wrong and lets you try again, and you must pass all three to move on. (75 questions, every answer independently verified.)
- **Interactive labs.** Drag a point along a curve and watch the tangent line and the live slope readout change. Slide a parameter and reshape a function in real time while the equation updates.
- **Custom graphing engine.** A hand-built SVG renderer that breaks the curve across vertical asymptotes (no false connecting lines), shades regions between curves, draws tangent and reference lines, and keeps labels readable over any background.
- **A real completion certificate.** Finish all 25 lessons to unlock a printable certificate with your name, an engraved masthead, a golden foil seal, a signature, and the date. Print or Save as PDF is built in.
- **Inspiration on every page.** A card beside each lesson pairs the topic with either a genuine, attributed quote (Newton, Euler, Einstein, Cantor, von Neumann, and more) or a note of encouragement, all aimed at sparking a love of math.
- **Crisp math typesetting.** All formulas render with KaTeX, with a graceful fallback so a blocked CDN never freezes the page.
- **Gamified progress.** Earn XP and level up in the header, enjoy a confetti burst when you pass a lesson, and pick up exactly where you left off.
- **Accounts and saved progress.** Create a free account (first name, last name, email) and your progress is saved per learner. A lightweight admin view lists registered learners.
- **Designed to be read.** A clean three-column layout with module navigation, a focused reading column, and a sticky rail. Fully responsive down to mobile.
- **Accessible by default.** Keyboard-operable navigation, visible focus outlines, ARIA labels on icon buttons, and respect for reduced-motion preferences.

---

## Curriculum

**25 lessons across 6 modules.** Each lesson is built from typed blocks: a plain-English concept, the key formulas, a fully worked example, an optional interactive lab, a your-turn practice problem with a complete step-by-step solution, and a 3-question quiz you must pass before moving on.

| Module | Lessons |
| --- | --- |
| **1. Foundations** | Functions, Domain and Range - Linear Equations and Slope - Exponential Functions and e - Logarithmic Functions |
| **2. Limits and Continuity** | Introduction to Limits - Infinite Limits and Limits at Infinity - Continuity |
| **3. Derivatives** | The Derivative (what it means) - Power Rule - Marginal Analysis - Derivatives of e^x and ln(x) - Product and Quotient Rules - The Chain Rule - Elasticity of Demand |
| **4. Applications of Derivatives** | First Derivative Test - Second Derivative and Concavity - Absolute Extrema - Optimization |
| **5. Integration** | Antiderivatives - Substitution - The Definite Integral - Fundamental Theorem of Calculus |
| **6. Business Applications** | Area Between Curves - Consumer and Producer Surplus - Income Streams and Present Value |

---

## Accounts and admin

The course is gated behind a free account so progress can be saved per learner. Sign-up asks only for a first name, last name, and email; returning learners sign in by email. An admin view (reached from the landing-page footer) lists every registered learner and can edit a name or email, or remove an account.

This is a deliberately lightweight, **client-side** account system: accounts and progress live in the browser's `localStorage`, so it is not a secure authentication system. It exists to support per-learner progress and the completion certificate. A real backend with proper authentication is the planned next step.

---

## Tech stack

| Layer | Choice |
| --- | --- |
| **Framework** | React 18 (single-file app, client rendered) |
| **Build tool** | Vite 6 |
| **Math rendering** | KaTeX (loaded via CDN, with a load-timeout fallback) |
| **Typography** | Inter for body and UI, Bricolage Grotesque for display |
| **Styling** | Inline styles, dark theme with a subtle radial-gradient background |
| **Dependencies** | Just two runtime packages: `react` and `react-dom` |

---

## Getting started

### Prerequisites

- [Node.js](https://nodejs.org) 18 or newer (includes npm)

### Run it locally

```bash
# 1. Clone the repository
git clone https://github.com/lenamonj/lenamon-calculus.git
cd lenamon-calculus

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

### Available scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Produce an optimized production build in `dist/` |
| `npm run preview` | Serve the production build locally to verify it |

---

## Project structure

```
lenamon-calculus/
├── index.html          # App shell and KaTeX/font loading
├── src/
│   ├── main.jsx        # React entry point
│   └── App.jsx         # The entire course: components, lessons, graphs, labs
├── public/             # Static assets
├── package.json
└── vite.config.js
```

All lesson content lives in `src/App.jsx` as structured data, alongside the custom graphing, interactive-lab, and layout components.

---

## Contributing

Contributions are welcome. The bar for any content change is the project's core standard: **a curious 15-year-old must be able to follow it with nothing assumed and no step skipped.** If you fix a number, an explanation, or a graph, please recompute it independently and note that in your pull request.

1. Fork the repository.
2. Create a feature branch (`git checkout -b improve-lesson-x`).
3. Commit your changes and push.
4. Open a pull request describing what you changed and why.

---

## License

Released under the [MIT License](LICENSE). You are free to use, modify, and share this material, including for teaching.

---

<div align="center">

Built to prove that calculus is not hard. It was just explained badly.

</div>
