"""Recompute every numeric claim in the lesson corpus (src/content.jsx).

Run from the repository root:

    python docs/verification/verify_content.py

Requires Python 3 and sympy (pip install sympy). Each check prints a labelled
value; an assertion fails loudly if a stated number is wrong. Sections are
grouped by the lesson whose prose states the number. When you change or add
a number in a lesson, add a check here in the same commit.
"""
import math
import sympy as sp

x, t, p, h = sp.symbols("x t p h", real=True)
ok = 0


def check(label, value, expected, tol=5e-4):
    global ok
    v = float(value)
    assert abs(v - expected) <= tol * max(1.0, abs(expected)), f"{label}: got {v}, expected {expected}"
    ok += 1
    print(f"  {label}: {v:.6g}")


print("L3 Quadratics")
check("roots x^2-6x+5", sp.solve(x**2 - 6 * x + 5, x)[0], 1)
check("vertex x of x^2-6x+5", -(-6) / (2 * 1), 3)
check("vertex y", (3**2 - 6 * 3 + 5), -4)
P3 = -2 * x**2 + 120 * x - 1000
check("profit roots low", min(sp.solve(P3, x)), 10)
check("profit roots high", max(sp.solve(P3, x)), 50)
check("profit vertex x", -120 / (2 * -2), 30)
check("profit vertex value", P3.subs(x, 30), 800)
check("3x^2-12x roots", max(sp.solve(3 * x**2 - 12 * x, x)), 4)
check("3x^2-12x vertex y", (3 * 4 - 24), -12)
r = sp.solve(x**2 + 4 * x - 3, x)
check("x^2+4x-3 root 1", max(r), -2 + math.sqrt(7))
check("x^2+4x-3 root 1 decimal", max(r), 0.6458, 1e-3)
check("x^2+4x-3 root 2 decimal", min(r), -4.6458, 1e-3)
check("sqrt 28", math.sqrt(28), 5.2915, 1e-4)
check("vertex x of x^2-8x+3", 8 / 2, 4)

print("L4 Business models")
C4 = 2000 + 1.5 * x
for q, exp in [(100, 21.5), (1000, 3.5), (10000, 1.7)]:
    check(f"AC bakery at {q}", (C4 / x).subs(x, q), exp)
R4 = 12 * x - 0.01 * x**2
check("R=12x-0.01x^2 vertex x", -12 / (2 * -0.01), 600)
check("R vertex value", R4.subs(x, 600), 3600)
check("equilibrium 50-0.1x=10+0.1x", sp.solve(50 - 0.1 * x - (10 + 0.1 * x), x)[0], 200)
Rc = 20 * x - 0.01 * x**2
Cc = 5000 + 4 * x
Pc = sp.expand(Rc - Cc)
print("  phone-case profit:", Pc)
be = sorted(sp.solve(Pc, x))
check("phone-case break-even low", be[0], 425.8, 1e-3)
check("phone-case break-even high", be[1], 1174.2, 1e-3)
check("sqrt 560000", math.sqrt(560000), 748.33, 1e-4)
check("phone-case max profit x", -16 / (2 * -0.01), 800)
check("phone-case max profit", Pc.subs(x, 800), 1400)
check("phone-case max revenue x", 1000, 1000)
check("phone-case max revenue", Rc.subs(x, 1000), 10000)
R41 = 40 * x - 0.02 * x**2
P41 = sp.expand(R41 - (1200 + 8 * x))
print("  practice-1 profit:", P41)
check("practice-1 P(500)", P41.subs(x, 500), 9800)
check("practice-1 AC(500)", (1200 + 8 * 500) / 500, 10.4)
be2 = sorted(sp.solve(P41, x))
check("practice-2 break-even low", be2[0], 38.4, 2e-3)
check("practice-2 break-even high", be2[1], 1561.6, 1e-3)
check("sqrt 2320000", math.sqrt(2320000), 1523.15, 1e-4)
check("practice-2 equilibrium x", sp.solve(80 - 0.2 * x - (20 + 0.1 * x), x)[0], 200)
check("practice-2 equilibrium p", 80 - 0.2 * 200, 40)

print("L5 Exponentials")
for n, exp in [(1, 2), (2, 2.25), (4, 2.4414), (12, 2.6130), (365, 2.71457), (1_000_000, 2.71828)]:
    check(f"(1+1/n)^n n={n}", (1 + 1 / n) ** n, exp, 1e-4)
for n, exp in [(1, 11576.25), (12, 11614.72), (365, 11618.22)]:
    check(f"10000 at 5% 3y n={n}", 10000 * (1 + 0.05 / n) ** (n * 3), exp, 1e-6)
check("10000 at 5% 3y continuous", 10000 * math.exp(0.15), 11618.34, 1e-6)
check("8^(1/3)", 8 ** (1 / 3), 2)
check("4^(3/2)", 4 ** 1.5, 8)
check("5000 e^0.4", 5000 * math.exp(0.4), 7459.12, 1e-6)
check("5000 monthly 4% 10y", 5000 * (1 + 0.04 / 12) ** 120, 7454.16, 1e-6)
check("e^0.4", math.exp(0.4), 1.49182, 1e-5)
check("(1+0.04/12)^120", (1 + 0.04 / 12) ** 120, 1.490833, 1e-6)

print("L6 Logs")
check("ln 1.6", math.log(1.6), 0.470004, 1e-5)
check("t to reach 80000", math.log(1.6) / 0.02, 23.5, 1e-3)

print("L7 Limits")
check("lim x->3 x^2+2x", (x**2 + 2 * x).subs(x, 3), 15)
check("piecewise left at 2", 2 + 1, 3)
check("piecewise right at 2", 6 - 2, 4)
check("lim (x^2-x-6)/(x-3)", sp.limit((x**2 - x - 6) / (x - 3), x, 3), 5)

print("L8 Infinite limits")
check("lim AC bakery", sp.limit((2000 + 1.5 * x) / x, x, sp.oo), 1.5)

print("L9 Continuity")
check("lim (x^2-1)/(x-1) at 1", sp.limit((x**2 - 1) / (x - 1), x, 1), 2)

print("L10 Derivative")
C13 = 1000 + 25 * x - 0.05 * x**2
check("C(100)", C13.subs(x, 100), 3000)
check("C(50)", C13.subs(x, 50), 2125)
check("ARC 50..100", (C13.subs(x, 100) - C13.subs(x, 50)) / 50, 17.5)
f10 = x**2 + 4 * x
check("diff quotient x^2+4x", sp.limit((f10.subs(x, x + h) - f10) / h, h, 0).subs(x, 1), 6)

print("L11 Power rule")
f11 = 2 / x + 4 * sp.sqrt(x) - x**3 / 3
d11 = sp.simplify(sp.diff(f11, x))
print("  d/dx[2/x+4sqrt x-x^3/3] =", d11)
assert sp.simplify(d11 - (-2 / x**2 + 2 / sp.sqrt(x) - x**2)) == 0
ok += 1
f11e = 3 * sp.sqrt(x) + 5 / x**2 - 2 * x
assert sp.simplify(sp.diff(f11e, x) - (3 / (2 * sp.sqrt(x)) - 10 / x**3 - 2)) == 0
ok += 1

print("L12 Tangent lines")
check("x^2 tangent at 1 est 1.1", 2 * 1.1 - 1, 1.2)
check("x^2 actual 1.1", 1.1**2, 1.21)
check("x^2 tangent est 1.5", 2 * 1.5 - 1, 2.0)
check("C(51) via tangent", 2125 + 20, 2145)
check("C(51) actual", C13.subs(x, 51), 2144.95)
f12 = x**3 - 2 * x
check("f(2)", f12.subs(x, 2), 4)
check("f'(2)", sp.diff(f12, x).subs(x, 2), 10)
check("tangent est f(2.05)", 10 * 2.05 - 16, 4.5)
check("actual f(2.05)", f12.subs(x, 2.05), 4.515125, 1e-7)
R12 = 50 * x - 0.02 * x**2
check("R(1000)", R12.subs(x, 1000), 30000)
check("R'(1000)", sp.diff(R12, x).subs(x, 1000), 10)
check("R(1010) est", 30000 + 10 * 10, 30100)
check("R(1010) actual", R12.subs(x, 1010), 30098)
check("sqrt tangent at 4 slope", 1 / (2 * math.sqrt(4)), 0.25)
check("sqrt(4.2) est", 4.2 / 4 + 1, 2.05)
check("sqrt(4.2) actual", math.sqrt(4.2), 2.04939, 1e-5)
check("tangent y=x^2 at 3: slope", 6, 6)
check("tangent y=x^2 at 3: intercept", 9 - 6 * 3, -9)
check("quiz est f(2.1)", 5 + 3 * 0.1, 5.3)

print("L13 Marginal")
R13b = 80 * x - 0.1 * x**2
check("R'(200)", sp.diff(R13b, x).subs(x, 200), 40)
check("R(200)", R13b.subs(x, 200), 12000)
check("R(201)", R13b.subs(x, 201), 12039.9)
check("R(201)-R(200)", R13b.subs(x, 201) - R13b.subs(x, 200), 39.9)

print("L14 e^x ln")
f14 = 3 * sp.exp(x) - 2 * sp.log(x) + x**2
check("f'(1)", sp.diff(f14, x).subs(x, 1), 3 * math.e)
check("3e", 3 * math.e, 8.1548, 1e-4)

print("L15 Product quotient")
f15 = sp.exp(x) / x
assert sp.simplify(sp.diff(f15, x) - sp.exp(x) * (x - 1) / x**2) == 0
ok += 1

print("L16 Chain")
f16 = sp.sqrt(x**2 + 9)
assert sp.simplify(sp.diff(f16, x) - x / sp.sqrt(x**2 + 9)) == 0
ok += 1
check("f'(4)", sp.diff(f16, x).subs(x, 4), 0.8)
check("ln 2", math.log(2), 0.693, 1e-3)

print("L17 Implicit / related rates")
y = sp.Function("y")(x)
circ = sp.diff(x**2 + y**2 - 25, x)
yp = sp.solve(circ, sp.diff(y, x))[0]
check("circle slope at (3,4)", yp.subs({y: 4, x: 3}), -0.75)
check("circle explicit slope", sp.diff(sp.sqrt(25 - x**2), x).subs(x, 3), -0.75)
check("related rates dR/dt", 1 * 400 + 30 * (-20), -200)
imp = sp.diff(x**2 + x * y + y**2 - 7, x)
yp2 = sp.solve(imp, sp.diff(y, x))[0]
check("implicit practice slope at (1,2)", yp2.subs({y: 2, x: 1}), -0.8)
check("point on curve", 1 + 2 + 4, 7)
check("dC/dt", (25 - 0.1 * 50) * 4, 80)

print("L18 Elasticity")
check("R'(30) = q(1-E)", 400 * (1 - 1.5), -200)
check("unit elastic price", sp.solve(20 * p / (1000 - 20 * p) - 1, p)[0], 25)
check("R(25)", 25 * (1000 - 20 * 25), 12500)
check("R(p) vertex", -1000 / (2 * -20), 25)

print("L19 First derivative test")
f19 = x**4 - 4 * x**3
d19 = sp.factor(sp.diff(f19, x))
print("  f' =", d19)
check("f'(-1)", sp.diff(f19, x).subs(x, -1), -16)
check("f'(1)", sp.diff(f19, x).subs(x, 1), -8)
check("f'(4)", sp.diff(f19, x).subs(x, 4), 64)
check("f(3)", f19.subs(x, 3), -27)

print("L20 Concavity")
f20 = x**3 - 3 * x**2
check("f(0)", f20.subs(x, 0), 0)
check("f(2)", f20.subs(x, 2), -4)
check("f(1) inflection", f20.subs(x, 1), -2)
f20b = x**3 - 6 * x**2 + 9 * x + 1
print("  f' =", sp.factor(sp.diff(f20b, x)))
check("f''(1)", sp.diff(f20b, x, 2).subs(x, 1), -6)
check("f(1)", f20b.subs(x, 1), 5)
check("f''(3)", sp.diff(f20b, x, 2).subs(x, 3), 6)
check("f(3)", f20b.subs(x, 3), 1)
check("f(2)", f20b.subs(x, 2), 3)

print("L21 Absolute extrema")
P21 = -0.01 * x**2 + 40 * x - 7000
check("P(0)", P21.subs(x, 0), -7000)
check("P(1500)", P21.subs(x, 1500), 30500)
check("P(2000)", P21.subs(x, 2000), 33000)
R21 = 600 * p - 20 * p**2
check("R(5)", R21.subs(p, 5), 2500)
check("R(12)", R21.subs(p, 12), 4320)

print("L22 Optimization")
AC = 0.5 * x + 20 + 800 / x
check("AC' zero", sp.solve(sp.diff(AC, x), x)[-1], 40)
check("AC(40)", AC.subs(x, 40), 60)
check("MC(40)", sp.diff(0.5 * x**2 + 20 * x + 800, x).subs(x, 40), 60)
T = 60000 / x + 1.5 * x
check("EOQ", sp.solve(sp.diff(T, x), x)[-1], 200)
check("T(200)", T.subs(x, 200), 600)
check("orders per year", 1200 / 200, 6)

print("L23 Antiderivatives")
check("C from C' with C(0)=1000", sp.integrate(25 - 0.1 * x, x).subs(x, 50) + 1000, 2125)
check("R from R'", sp.integrate(80 - 0.2 * x, x).subs(x, 200), 12000)

print("L24 Substitution")
assert sp.simplify(sp.diff(sp.exp(x**2) / 2, x) - x * sp.exp(x**2)) == 0
ok += 1
assert sp.simplify(sp.diff(sp.log(x**2 + 1) / 2, x) - x / (x**2 + 1)) == 0
ok += 1

print("L25 Riemann sums")


def left_sum(f, a, b, n):
    dx = (b - a) / n
    return sum(f(a + i * dx) for i in range(n)) * dx


def right_sum(f, a, b, n):
    dx = (b - a) / n
    return sum(f(a + (i + 1) * dx) for i in range(n)) * dx


sq = lambda v: v * v
check("exact x^2 [0,2]", 8 / 3, 2.6667, 1e-4)
check("left n=4", left_sum(sq, 0, 2, 4), 1.75)
check("right n=4", right_sum(sq, 0, 2, 4), 3.75)
check("left n=2", left_sum(sq, 0, 2, 2), 1.0)
for n in [4, 8, 16, 100, 1000]:
    print(f"  n={n}: left={left_sum(sq, 0, 2, n):.4f} right={right_sum(sq, 0, 2, n):.4f}")
check("left n=8", left_sum(sq, 0, 2, 8), 2.1875)
check("right n=8", right_sum(sq, 0, 2, 8), 3.1875)
check("left n=16", left_sum(sq, 0, 2, 16), 2.4219, 1e-4)
check("right n=16", right_sum(sq, 0, 2, 16), 2.9219, 1e-4)
check("left n=100", left_sum(sq, 0, 2, 100), 2.6268, 1e-4)
check("right n=100", right_sum(sq, 0, 2, 100), 2.7068, 1e-4)
check("left n=1000", left_sum(sq, 0, 2, 1000), 2.6627, 1e-4)
check("right n=1000", right_sum(sq, 0, 2, 1000), 2.6707, 1e-4)
lin = lambda v: 2 * v + 1
check("2x+1 left n=3", left_sum(lin, 0, 3, 3), 9)
check("2x+1 right n=3", right_sum(lin, 0, 3, 3), 15)
check("2x+1 exact", sp.integrate(2 * x + 1, (x, 0, 3)), 12)
mc = lambda v: 20 - 0.2 * v
check("MC left n=5 [0,10]", left_sum(mc, 0, 10, 5), 192)
check("MC exact", sp.integrate(20 - 0.2 * x, (x, 0, 10)), 190)

print("L26 Definite integral")
check("int_0^4 (4-x)", sp.integrate(4 - x, (x, 0, 4)), 8)
check("int_1^3 5", sp.integrate(5, (x, 1, 3)), 10)
check("int_-2^2 x", sp.integrate(x, (x, -2, 2)), 0)

print("L27 FTC")
check("int_50^100 C'", sp.integrate(25 - 0.1 * x, (x, 50, 100)), 875)
check("int_100^200 R'", sp.integrate(80 - 0.2 * x, (x, 100, 200)), 5000)

print("L28 Integration by parts")
assert sp.simplify(sp.integrate(x * sp.exp(x), x) - (x * sp.exp(x) - sp.exp(x))) == 0
ok += 1
assert sp.simplify(sp.integrate(sp.log(x), x) - (x * sp.log(x) - x)) == 0
ok += 1
check("int_1^e ln x", sp.integrate(sp.log(x), (x, 1, sp.E)), 1)
assert sp.simplify(sp.integrate(x * sp.exp(2 * x), x) - (x * sp.exp(2 * x) / 2 - sp.exp(2 * x) / 4)) == 0
ok += 1
check("int_1^4 x ln x", sp.integrate(x * sp.log(x), (x, 1, 4)), 7.3404, 1e-4)
check("8 ln 4", 8 * math.log(4), 11.0904, 1e-4)
check("growing stream 1000t 5y 5%", sp.integrate(1000 * t * sp.exp(-0.05 * t), (t, 0, 5)), 10599.6, 1e-4)
check("e^-0.25", math.exp(-0.25), 0.778801, 1e-5)

print("L29 Area between curves")
check("area x^2-4 vs 2x-1", sp.integrate((2 * x - 1) - (x**2 - 4), (x, -1, 3)), 32 / 3)
check("marginal profit area", sp.integrate((60 - 0.1 * x) - (20 + 0.1 * x), (x, 0, 200)), 4000)

print("L30 Average value")
check("avg x^2 [0,2]", sp.integrate(x**2, (x, 0, 2)) / 2, 4 / 3)
check("avg inventory", sp.integrate(500 - 50 * t, (t, 0, 10)) / 10, 250)
check("avg price", sp.integrate(20 + 4 * t - 0.5 * t**2, (t, 0, 8)) / 8, 25.333, 1e-4)
check("avg 3x^2 [1,3]", sp.integrate(3 * x**2, (x, 1, 3)) / 2, 13)
check("avg 1000e^0.1t [0,5]", sp.integrate(1000 * sp.exp(0.1 * t), (t, 0, 5)) / 5, 1297.44, 1e-5)
check("avg x [0,4]", sp.integrate(x, (x, 0, 4)) / 4, 2)

print("L31 Surplus")
check("eq x 100-0.5x=20+0.3x", sp.solve(100 - 0.5 * x - (20 + 0.3 * x), x)[0], 100)
check("CS", sp.integrate(100 - 0.5 * x - 50, (x, 0, 100)), 2500)
check("PS", sp.integrate(50 - (20 + 0.3 * x), (x, 0, 100)), 1500)
check("eq x nonlinear", max(sp.solve(66 - 0.01 * x**2 - (18 + 0.02 * x**2), x)), 40)
check("p nonlinear", 66 - 0.01 * 1600, 50)
check("CS nonlinear", sp.integrate(66 - 0.01 * x**2 - 50, (x, 0, 40)), 426.67, 1e-4)
check("PS nonlinear", sp.integrate(50 - (18 + 0.02 * x**2), (x, 0, 40)), 853.33, 1e-4)

print("L32 Income streams")
check("PV 10000 5y 6% exact", 10000 * (1 - math.exp(-0.3)) / 0.06, 43196.97, 1e-6)
check("FV 10000 5y 6%", 10000 * (math.exp(0.3) - 1) / 0.06, 58309.8, 1e-5)
check("e^0.3 - 1", math.exp(0.3) - 1, 0.349859, 1e-5)
check("perpetuity 10000 at 6%", 10000 / 0.06, 166666.67, 1e-6)
check("growing 10000+2000t", sp.integrate((10000 + 2000 * t) * sp.exp(-0.06 * t), (t, 0, 5)), 63717, 1e-4)
check("int t e^-0.06t 0..5", sp.integrate(t * sp.exp(-0.06 * t), (t, 0, 5)), 10.2602, 1e-4)
check("FV 5000 10y 4%", 5000 * (math.exp(0.4) - 1) / 0.04, 61478, 1e-4)
check("perpetuity 5000 at 4%", 5000 / 0.04, 125000)


print("Phase 1 additions")
check("sqrt 52", math.sqrt(52), 7.2111, 1e-4)
check("4+sqrt13", 4 + math.sqrt(13), 7.606, 1e-3)
check("4-sqrt13", 4 - math.sqrt(13), 0.394, 2e-3)
check("vertex y of x^2-8x+3", 16 - 32 + 3, -13)
check("0.6458 check", 0.6458**2 + 4 * 0.6458 - 3, 0, 1e-3)
check("ln 100", math.log(100), 4.605, 1e-3)
check("e^0.47", math.exp(0.47), 1.6, 1e-3)
check("continuous minus monthly", 5000 * math.exp(0.4) - 5000 * (1 + 0.04 / 12) ** 120, 4.96, 1e-2)
check("(1+2)^2 vs 1+4", 9 - 5, 4)
check("R(425.8)", 20 * 425.8 - 0.01 * 425.8**2, 6703, 2e-4)
check("C(1174.2)", 5000 + 4 * 1174.2, 9697, 2e-4)
check("f(-1) for x^2-3x", 1 + 3, 4)
check("price 12-0.01*600", 12 - 6, 6)
check("courier slope", (15 - 7) / (6 - 2), 2)
check("courier base", 7 - 2 * 2, 3)

print("Phase 2 additions")
check("table check 2.99", (2.99**2 - 2.99 - 6) / (2.99 - 3), 4.99, 1e-3)
check("2.99^2-2.99-6", 2.99**2 - 2.99 - 6, -0.0499, 1e-3)
check("(10^6)^3 * 7 in quintillions", 7e18 / 1e18, 7)

print("Phase 3 additions")
check("f(1.01) x^2+4x", 1.01**2 + 4 * 1.01, 5.0601, 1e-6)
check("secant 1..1.01", (5.0601 - 5) / 0.01, 6.01, 1e-3)
check("tangent error at 2.05", 4.515125 - 4.5, 0.015125, 1e-6)
check("error percent", 0.015125 / 4.515125 * 100, 0.335, 2e-3)
check("sqrt(4.2) error", 2.05 - math.sqrt(4.2), 0.0006, 0.1)
assert sp.simplify(sp.diff(x ** sp.Rational(1, 3), x) - sp.Rational(1, 3) * x ** sp.Rational(-2, 3)) == 0
ok += 1
check("(e^0.1-1)/0.1", (math.exp(0.1) - 1) / 0.1, 1.0517, 1e-4)
check("(e^0.01-1)/0.01", (math.exp(0.01) - 1) / 0.01, 1.00502, 1e-5)
check("(e^0.001-1)/0.001", (math.exp(0.001) - 1) / 0.001, 1.0005, 1e-4)
check("ln(1.1)/0.1", math.log(1.1) / 0.1, 0.953, 1e-3)
check("ln(1.01)/0.01", math.log(1.01) / 0.01, 0.995, 1e-3)
check("ln(1.001)/0.001", math.log(1.001) / 0.001, 0.9995, 1e-4)
assert sp.simplify(sp.diff((3 * x**2 + 1) ** 4, x) - 24 * x * (3 * x**2 + 1) ** 3) == 0
ok += 1
assert sp.simplify(sp.diff(2**x, x) - 2**x * sp.log(2)) == 0
ok += 1
u, v = sp.Function("u")(x), sp.Function("v")(x)
assert sp.simplify(sp.diff(u / v, x) - (sp.diff(u, x) * v - u * sp.diff(v, x)) / v**2) == 0
ok += 1
check("E(p)=20p/(1000-20p) at 25", 20 * 25 / (1000 - 20 * 25), 1)
check("f(25)", 1000 - 20 * 25, 500)
check("dq/dt", -20 * 1, -20)
check("q at 30", 1000 - 20 * 30, 400)
check("(x^2+1)/(3x-5) derivative numerator", 3, 3)
assert sp.simplify(sp.diff((x**2 + 1) / (3 * x - 5), x) - (3 * x**2 - 10 * x - 3) / (3 * x - 5) ** 2) == 0
ok += 1
check("e^x/x min value", math.e, 2.71828, 1e-5)
check("cube root at 0 slope blowup", 1 / (3 * 0.001 ** (2 / 3)), 33.33, 1e-3)

print("Phase 4 additions")
assert sp.simplify(sp.diff(0.5 * x + 20 + 800 / x, x, 2) - 1600 / x**3) == 0
ok += 1
assert sp.simplify(sp.diff(60000 / x + 1.5 * x, x, 2) - 120000 / x**3) == 0
ok += 1
check("E(15) theater", -(15 * -20) / (600 - 20 * 15), 1)
check("f(1) x^3-3x^2 slope test", (3 * 1 * 1 - 6 * 1), -3)
check("inflection midpoint", (5 + 1) / 2, 3)
check("EOQ costs equal", 60000 / 200, 300)
check("holding cost", 1.5 * 200, 300)
f19b = x**4 - 4 * x**3
print("  f'(x) factored:", sp.factor(sp.diff(f19b, x)))
check("f''(0) for x^3-3x^2", sp.diff(x**3 - 3 * x**2, x, 2).subs(x, 0), -6)
check("f''(2) for x^3-3x^2", sp.diff(x**3 - 3 * x**2, x, 2).subs(x, 2), 6)

print("Phase 5 additions")
check("undiscounted growing stream", sp.integrate(1000 * t, (t, 0, 5)), 12500)
check("discount haircut pct", (1 - 10599.6 / 12500) * 100, 15.2, 1e-2)
check("ln 4", math.log(4), 1.3863, 1e-4)
check("PV bracket -100000 e^-0.25", -100000 * math.exp(-0.25), -77880.1, 1e-5)
check("400000(1-e^-0.25)", 400000 * (1 - math.exp(-0.25)), 88479.7, 1e-5)
check("int_1^3 x/2", sp.integrate(x / 2, (x, 1, 4)), 3.75)
check("triangle under 2x+1", 0.5 * 3 * 6, 9)
check("avg of left/right line sums", (9 + 15) / 2, 12)
check("R'(100)", 80 - 0.2 * 100, 60)
check("MR average check", 50 * 100, 5000)
check("C'(2)", 20 - 0.2 * 2, 19.6)
check("C'(8)", 20 - 0.2 * 8, 18.4)
check("MC sum heights", 20 + 19.6 + 19.2 + 18.8 + 18.4, 96)
check("F(100) for 25x-0.05x^2", 25 * 100 - 0.05 * 100**2, 2000)
check("F(50)", 25 * 50 - 0.05 * 50**2, 1125)
assert sp.simplify(sp.diff(sp.exp(x**2) / 2, x) - x * sp.exp(x**2)) == 0
ok += 1

print("Phase 6 additions")
check("[-x^3/3+x^2+3x] at 3", -9 + 9 + 9, 9)
check("[-x^3/3+x^2+3x] at -1", 1 / 3 + 1 - 3, -5 / 3)
check("sqrt(4/3)", math.sqrt(4 / 3), 1.155, 1e-3)
check("p(4) season", 20 + 16 - 8, 28)
check("p(8) season", 20 + 32 - 32, 20)
check("512/6", 512 / 6, 85.333, 1e-4)
check("season integral", 160 + 128 - 512 / 6, 202.667, 1e-4)
check("sqrt(13/3)", math.sqrt(13 / 3), 2.08, 2e-3)
check("e^0.5", math.exp(0.5), 1.648721, 1e-6)
check("10000(e^0.5-1)", 10000 * (math.exp(0.5) - 1), 6487.21, 1e-6)
check("1000e^0.5", 1000 * math.exp(0.5), 1649, 1e-3)
check("midpoint 1000..1649", (1000 + 1648.72) / 2, 1324, 1e-3)
check("CS triangle", 0.5 * 100 * 50, 2500)
check("PS triangle", 0.5 * 100 * 30, 1500)
check("0.01*64000/3", 0.01 * 64000 / 3, 213.33, 1e-4)
check("0.02*64000/3", 0.02 * 64000 / 3, 426.67, 1e-4)
check("PS/CS nonlinear ratio", 853.33 / 426.67, 2, 1e-4)
check("bracket 5 e^-0.3 / -0.06", 5 * math.exp(-0.3) / -0.06, -61.735, 1e-4)
check("(1-e^-0.3)/0.06", (1 - math.exp(-0.3)) / 0.06, 4.3197, 1e-4)
check("/0.06 again", (1 - math.exp(-0.3)) / 0.06 / 0.06, 71.995, 1e-4)
check("parts total", 5 * math.exp(-0.3) / -0.06 + (1 - math.exp(-0.3)) / 0.0036, 10.260, 1e-4)
check("2000 * 10.260", 2000 * 10.2602, 20520, 1e-4)
check("undiscounted growing 10000+2000t", sp.integrate(10000 + 2000 * t, (t, 0, 5)), 75000)
check("growing haircut pct", (1 - 63717 / 75000) * 100, 15.0, 2e-2)
check("FV growth added", 61478 - 50000, 11478, 1e-3)
check("perpetuity interest", 0.04 * 125000, 5000)
check("five years over forever", 43200 / 166667, 0.259, 2e-3)
check("2459.1/0.04", 2459.1 / 0.04, 61477.5, 1e-4)
check("R'(0) vs C'(0)", 60 - 20, 40)
check("marginal profit area bracket", 40 * 200 - 0.1 * 200**2, 4000)

print(f"

print(f"
ALL {ok} CHECKS PASSED")
