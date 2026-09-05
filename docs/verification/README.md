# Content verification

Every number stated in a lesson (worked examples, practice solutions, quiz
answers, graph annotations) is recomputed independently by
`verify_content.py`, using sympy for the calculus and plain Python for the
arithmetic. The script is the audit trail for the accuracy claim in the README.

## Run it

```bash
pip install sympy          # once
python docs/verification/verify_content.py
```

The last line reports `ALL <n> CHECKS PASSED`. A failing check names the
lesson section and the value it expected, so the wrong number is easy to find.

## Keep it current

- When you change a number in `src/content.jsx`, change or add its check in
  the same commit. Put the check in the block for that lesson.
- Symbolic facts (a derivative or antiderivative that must match the prose)
  use `sympy.simplify(...) == 0` assertions; numeric facts use `check(label,
  value, expected, tol)`, where `tol` is relative to the expected value.
- The structural rules for lessons (one formulas plate, a worked example, two
  practices, a quiz, artifact-free prose) are enforced separately by
  `src/content.test.jsx` under `npm test`. This script covers the numbers;
  the test covers the shape.
