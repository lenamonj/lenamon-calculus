# Landing Page and Temporary Auth - Design Spec

Date: 2026-06-30
Status: Approved (design), pending implementation

## Goal

Add a professional landing page as the default entry point and a temporary,
client-side account system so the course can be gated per user. This is a stub
ahead of a real backend ("next stage"): accounts and session live in
`localStorage`. Not secure by design; the backend stage replaces it.

## Decisions (from brainstorming)

- Course content is account-gated. The landing page is the public front door.
- Admin signs in with username `user` / password `password` (hardcoded,
  temporary) and lands on a user-management dashboard.
- Accounts are first name + last name + email (no password). First/last name are
  captured now for a future course-completion certificate.
- Returning users sign in with email only (matched against registered accounts).
- The app always opens on the landing page. Clicking the "Business Calculus"
  brand (top right of the course/admin header) returns to the landing page.

## Architecture

Single-file React app (`src/App.jsx`), per the project convention.

- The current `App` body becomes a `Course` component (unchanged behavior).
- A new `App` shell holds two pieces of state: `view` and `session`, and renders
  the right screen. `view` always initializes to `landing` on load.
- `view`: one of `landing | signup | signin | adminlogin | course | admin`.

### localStorage keys

- `lenamon_users_v1`: array of `{ firstName, lastName, email, createdAt }`
  (email stored lowercased; acts as the unique key).
- `lenamon_session_v1`: `{ role: "user", email }` | `{ role: "admin" }` | null.
- `lenamon_calc_v1` (existing): course progress, kept global for now. Per-user
  progress is a next-stage item.

### Components (all in `src/App.jsx`)

- `LandingPage({ onSignIn, onSignUp, onAdmin })`
- `AuthScreen` (handles `signup`, `signin`, `adminlogin` modes) with a back link
  to the landing page.
- `AdminDashboard({ users, onEnterCourse, onSignOut, onBrand })`
- `Course` (the existing course UI) gains a top-right brand + signed-in name +
  Sign out, wired through props.

## Flows

- Create account: validate first/last non-empty + email format; reject duplicate
  email (point to Sign In). On success: append user, set session, go to course.
- Sign in: email only; match account -> session -> course; else inline error.
- Admin: `user` / `password` -> session `{role:"admin"}` -> admin dashboard;
  else inline error.
- Sign out (course or admin): clear session, return to landing.
- Gating: course/admin reachable only via authenticated transitions; load always
  starts on landing.

## Landing page content

Sticky nav (brand left; Sign In + Create Account right), hero with primary CTA
"Create your free account" and secondary "Sign in", a stat strip (25 lessons,
6 modules, interactive labs, free), a "why it's different" pedagogy section,
feature highlights, a 6-module curriculum overview, and a footer with a discreet
Admin link. Dark/indigo theme, Inter + Bricolage Grotesque, matching the course.

## Success criteria

Phase 1 - Auth core
- [ ] localStorage helpers for users + session (load/save) added.
- [ ] App shell switches views and always starts on `landing`.
- [ ] Create-account validates fields, blocks duplicate email, logs in on success.
- [ ] Email-only sign in works; unknown email shows a clear message.
- [ ] Admin `user`/`password` reaches the dashboard; wrong creds show an error.

Phase 2 - Screens
- [ ] Professional landing page renders and matches the theme.
- [ ] Admin dashboard lists all users with count and signup dates.
- [ ] Course header has a top-right clickable brand to landing, the user's first
      name, and Sign out.

Phase 3 - Verification
- [ ] `npm run build` compiles clean.
- [ ] KaTeX math-string balance check still passes.
- [ ] Manual smoke: landing -> create account -> course -> brand returns to
      landing -> email sign in -> course; admin login -> dashboard shows the
      new account.

## Out of scope (next stage)

Real backend + secure auth, passwords, per-user progress, the completion
certificate (first/last name are only captured now), email verification.
