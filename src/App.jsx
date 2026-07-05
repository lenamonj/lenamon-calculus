import { useState, useEffect, useRef, useId, Component } from "react";
import { buildLessons, QUIZ } from "./content.jsx";

// Shared KaTeX readiness signal: every <M> renders raw LaTeX immediately, then
// re-typesets once the CDN script finishes loading. A single poller notifies
// every mounted <M>, so late or blocked CDN loads never leave a formula blank.
let katexReady = typeof window !== "undefined" && !!window.katex;
const katexWaiters = new Set();
let katexPolling = false;

function ensureKatexPoll() {
  if (katexPolling || katexReady || typeof window === "undefined") return;
  katexPolling = true;
  const iv = setInterval(() => {
    if (!window.katex) return;
    clearInterval(iv);
    katexReady = true;
    katexWaiters.forEach((cb) => cb());
    katexWaiters.clear();
  }, 50);
  setTimeout(() => clearInterval(iv), 10000);
}

function useKatexReady() {
  const [ready, setReady] = useState(katexReady);
  useEffect(() => {
    if (katexReady) { setReady(true); return; }
    const cb = () => setReady(true);
    katexWaiters.add(cb);
    ensureKatexPoll();
    return () => katexWaiters.delete(cb);
  }, []);
  return ready;
}

export function M({ d, block }) {
  const ref = useRef(null);
  const ready = useKatexReady();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.katex) {
      // trust:false (KaTeX default) blocks \href, \html*, and \includegraphics so
      // a formula string can never inject markup. All content is static author
      // LaTeX and uses none of those commands, so nothing renders differently.
      try { window.katex.render(d, node, { throwOnError: false, displayMode: !!block, trust: false }); }
      catch (e) { node.textContent = d; }
    } else {
      node.textContent = d;
    }
  }, [d, block, ready]);
  if (block) return <div ref={ref} style={{ margin: "10px 0", overflowX: "auto" }} />;
  return <span ref={ref} />;
}

export function niceTicks(lo, hi, maxTicks = 8) {
  const range = hi - lo;
  if (range === 0) return [lo];
  const rough = range / maxTicks;
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const candidates = [1, 2, 2.5, 5, 10];
  let step = candidates.find(c => c * mag >= rough) * mag;
  const ticks = [];
  let t = Math.ceil(lo / step) * step;
  while (t <= hi) { ticks.push(t); t += step; }
  return ticks;
}

export function fmtLabel(v) {
  const abs = Math.abs(v);
  if (abs >= 1e6) return (v / 1e6).toFixed(abs >= 1e7 ? 0 : 1) + "M";
  if (abs >= 1e3) return (v / 1e3).toFixed(abs >= 1e4 ? 0 : 1) + "K";
  return Number.isInteger(v) ? v.toString() : v.toFixed(1);
}

// Shared plotting core used by both Graph and Plot. plotProjection maps data
// coordinates to pixel coordinates for a padded drawing area; sampleSegments
// walks a function across the x-range and returns pixel-space polyline segments;
// segmentsToPath renders those segments as an SVG path string.
export function plotProjection({ xMin, xMax, yMin, yMax, width, height, pad }) {
  const w = width - 2 * pad, h = height - 2 * pad;
  return {
    w,
    h,
    toX: (x) => pad + ((x - xMin) / (xMax - xMin)) * w,
    toY: (y) => pad + ((yMax - y) / (yMax - yMin)) * h,
  };
}

// breakOnGap true (Graph) starts a new segment wherever a sample leaves the
// visible range, so a vertical asymptote or domain gap is not bridged by a
// spurious line; false (Plot) skips the off-range sample but keeps one polyline.
// A finite jumpLimit additionally breaks on a sudden vertical jump.
export function sampleSegments(f, { xMin, xMax, yMin, yMax, toX, toY, steps, jumpLimit = Infinity, breakOnGap = true }) {
  const yRange = Math.abs(yMax - yMin);
  const segs = [];
  let cur = null, prevY = null;
  const endSeg = () => { if (cur && cur.length) segs.push(cur); cur = null; };
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    let y; try { y = f(x); } catch { y = NaN; }
    const inRange = isFinite(y) && y >= yMin - yRange && y <= yMax + yRange;
    const jumped = prevY !== null && isFinite(y) && Math.abs(y - prevY) > jumpLimit;
    if (!inRange || jumped) {
      if (breakOnGap || jumped) endSeg();
      prevY = isFinite(y) ? y : null;
      continue;
    }
    if (!cur) cur = [];
    cur.push([toX(x), toY(y)]);
    prevY = y;
  }
  endSeg();
  return segs;
}

export function segmentsToPath(segs) {
  return segs
    .map((seg) => seg.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" "))
    .join(" ");
}

export function Graph({ fn, xMin = -4, xMax = 4, yMin = -4, yMax = 4, width = 440, height = 280, highlights = [], label, caption, fns, shades = [], hlines = [], notes = [], xlab, ylab }) {
  const uid = useId().replace(/[:]/g, "");
  // role=img makes the SVG an atomic image so screen readers announce this one
  // summary instead of traversing every raw tick number; the label/caption text
  // is the human-readable meaning already shown beside the chart.
  const chartLabel = [label, caption].filter((s) => typeof s === "string" && s).join(". ") || "Function graph";
  const pad = 42;
  const { w, h, toX, toY } = plotProjection({ xMin, xMax, yMin, yMax, width, height, pad });
  const yRange = Math.abs(yMax - yMin);
  const colors = ["#818cf8", "#f472b6", "#34d399", "#fbbf24"];
  const allFns = fns || (fn ? [fn] : []);
  const jumpLimit = yRange * 1.5;
  const evalAt = (g, x) => (typeof g === "function" ? g(x) : g);
  const clamp = (y) => Math.max(yMin, Math.min(yMax, y));
  const linePath = (f) => segmentsToPath(sampleSegments(f, { xMin, xMax, yMin, yMax, toX, toY, steps: 240, jumpLimit, breakOnGap: true }));
  const shadePath = (top, bottom, from, to) => {
    const N = 80; let d = "";
    for (let i = 0; i <= N; i++) { const x = from + (i / N) * (to - from); d += `${i === 0 ? "M" : "L"}${toX(x).toFixed(1)},${toY(clamp(evalAt(top, x))).toFixed(1)} `; }
    for (let i = N; i >= 0; i--) { const x = from + (i / N) * (to - from); d += `L${toX(x).toFixed(1)},${toY(clamp(evalAt(bottom, x))).toFixed(1)} `; }
    return d + "Z";
  };
  const paths = allFns.map((f, fi) => <path key={fi} d={linePath(f)} fill="none" stroke={colors[fi % 4]} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />);
  const xTicks = niceTicks(xMin, xMax, 8);
  const yTicks = niceTicks(yMin, yMax, 6);
  const grid = [];
  xTicks.forEach(x => {
    grid.push(<line key={`gx${x}`} x1={toX(x)} y1={toY(yMax)} x2={toX(x)} y2={toY(yMin)} stroke="rgba(148,163,184,0.09)" />);
    if (x !== 0) grid.push(<text key={`lx${x}`} x={toX(x)} y={toY(yMin) + 15} fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="Inter,system-ui">{fmtLabel(x)}</text>);
  });
  yTicks.forEach(y => {
    grid.push(<line key={`gy${y}`} x1={toX(xMin)} y1={toY(y)} x2={toX(xMax)} y2={toY(y)} stroke="rgba(148,163,184,0.09)" />);
    if (y !== 0) grid.push(<text key={`ly${y}`} x={toX(xMin) - 6} y={toY(y) + 4} fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="Inter,system-ui">{fmtLabel(y)}</text>);
  });
  return (
    <div style={{ margin: "16px 0", textAlign: "center" }}>
      {label && <div style={{ fontSize: 11, fontWeight: 700, color: "#818cf8", marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em", fontFamily: "Inter,system-ui" }}>{label}</div>}
      <svg role="img" aria-label={chartLabel} width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", maxWidth: 460, background: "rgba(5,8,16,0.6)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.07)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
        <defs>
          <clipPath id={`clip${uid}`}><rect x={pad} y={pad} width={w} height={h} /></clipPath>
          <linearGradient id={`gfill${uid}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#6366f1" stopOpacity="0.34" /><stop offset="100%" stopColor="#6366f1" stopOpacity="0.05" /></linearGradient>
        </defs>
        {grid}
        <g clipPath={`url(#clip${uid})`}>
          {shades.map((s, i) => <path key={`s${i}`} d={shadePath(s.top, s.bottom, s.from, s.to)} fill={s.color || `url(#gfill${uid})`} stroke="none" />)}
          {hlines.map((hl, i) => <line key={`h${i}`} x1={toX(hl.x1 != null ? hl.x1 : xMin)} y1={toY(hl.y)} x2={toX(hl.x2 != null ? hl.x2 : xMax)} y2={toY(hl.y)} stroke={hl.color || "#cbd5e1"} strokeWidth="1.5" strokeDasharray="5 4" />)}
          <line x1={toX(xMin)} y1={toY(0)} x2={toX(xMax)} y2={toY(0)} stroke="#475569" strokeWidth="1.5" />
          <line x1={toX(0)} y1={toY(yMin)} x2={toX(0)} y2={toY(yMax)} stroke="#475569" strokeWidth="1.5" />
          {paths}
        </g>
        {notes.map((n, i) => <text key={`n${i}`} x={toX(n.x)} y={toY(n.y)} fill={n.color || "#e2e8f0"} fontSize="11" fontWeight="700" textAnchor={n.anchor || "middle"} fontFamily="Inter,system-ui" stroke="#0a0e1a" strokeWidth="3.4" paintOrder="stroke" strokeLinejoin="round">{n.text}</text>)}
        {highlights.map((pt, i) => (
          <g key={i}>
            {/* pt.open renders a hollow circle: the standard notation for a hole (a missing point) */}
            {pt.open
              ? <circle cx={toX(pt.x)} cy={toY(pt.y)} r="5" fill="#0a0e1a" stroke={pt.color || "#f59e0b"} strokeWidth="2.4" />
              : <circle cx={toX(pt.x)} cy={toY(pt.y)} r="5" fill={pt.color || "#f59e0b"} stroke="#0a0e1a" strokeWidth="2" />}
            {pt.label && <text x={toX(pt.x) + (pt.lo ? pt.lo[0] : 8)} y={toY(pt.y) + (pt.lo ? pt.lo[1] : -8)} fill={pt.color || "#f59e0b"} fontSize="10" fontWeight="700" fontFamily="Inter,system-ui" stroke="#0a0e1a" strokeWidth="3.4" paintOrder="stroke" strokeLinejoin="round">{pt.label}</text>}
          </g>
        ))}
        {xlab && <text x={width - pad} y={height - 8} fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="end" fontFamily="Inter,system-ui">{xlab}</text>}
        {ylab && <text x={pad - 4} y={pad - 12} fill="#94a3b8" fontSize="11" fontWeight="600" textAnchor="start" fontFamily="Inter,system-ui">{ylab}</text>}
      </svg>
      {caption && <div style={{ fontSize: 11.5, color: "#94a3b8", marginTop: 6, fontStyle: "italic", maxWidth: 460, marginLeft: "auto", marginRight: "auto" }}>{caption}</div>}
    </div>
  );
}

function SignChart({ intervals, criticals }) {
  return (
    <div style={{ margin: "12px 0", padding: "12px 16px", background: "rgba(15,23,42,0.5)", borderRadius: 8, border: "1px solid rgba(99,102,241,0.12)", overflowX: "auto" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0, minWidth: 280 }}>
        {intervals.map((seg, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center" }}>
            {i > 0 && <div style={{ width: 28, height: 28, borderRadius: "50%", background: "rgba(245,158,11,0.15)", border: "1px solid #f59e0b", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#f59e0b", flexShrink: 0, fontFamily: "system-ui" }}>{criticals[i - 1]}</div>}
            <div style={{ padding: "4px 14px", fontSize: 16, fontWeight: 700, color: seg.sign === "+" ? "#4ade80" : "#f87171" }}>{seg.sign === "+" ? "↗ +" : "↘ −"}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Box({ children, color = "indigo" }) {
  const bgs = { indigo: "rgba(99,102,241,0.06)", green: "rgba(16,185,129,0.06)", amber: "rgba(245,158,11,0.06)" };
  const bds = { indigo: "rgba(99,102,241,0.15)", green: "rgba(16,185,129,0.15)", amber: "rgba(245,158,11,0.15)" };
  return <div style={{ padding: "10px 14px", background: bgs[color] || bgs.indigo, border: `1px solid ${bds[color] || bds.indigo}`, borderRadius: 8, margin: "8px 0" }}>{children}</div>;
}

// ---------- Interactive lab pieces ----------
export function Plot({ curves = [], lines = [], points = [], xMin, xMax, yMin, yMax, width = 640, height = 300 }) {
  const pad = 40;
  const { toX, toY } = plotProjection({ xMin, xMax, yMin, yMax, width, height, pad });
  // Plot draws a single polyline that bridges off-range gaps (breakOnGap:false),
  // so sample flattens the one segment the shared sampler returns.
  const sample = (f) => sampleSegments(f, { xMin, xMax, yMin, yMax, toX, toY, steps: 260, breakOnGap: false }).flat();
  const dpath = (pts) => segmentsToPath([pts]);
  const xT = niceTicks(xMin, xMax, 8), yT = niceTicks(yMin, yMax, 6);
  const palette = ["#818cf8", "#f472b6", "#34d399", "#fbbf24"];
  return (
    <svg aria-hidden="true" width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ width: "100%", height: "auto", background: "rgba(5,8,16,0.55)", borderRadius: 14, border: "1px solid rgba(255,255,255,0.07)", boxShadow: "inset 0 1px 0 rgba(255,255,255,0.04)" }}>
      <defs>
        <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </linearGradient>
      </defs>
      {xT.map((x) => (
        <g key={`gx${x}`}>
          <line x1={toX(x)} y1={toY(yMax)} x2={toX(x)} y2={toY(yMin)} stroke="rgba(148,163,184,0.09)" />
          {x !== 0 && <text x={toX(x)} y={toY(yMin) + 15} fill="#64748b" fontSize="10" textAnchor="middle" fontFamily="Inter,system-ui">{fmtLabel(x)}</text>}
        </g>
      ))}
      {yT.map((y) => (
        <g key={`gy${y}`}>
          <line x1={toX(xMin)} y1={toY(y)} x2={toX(xMax)} y2={toY(y)} stroke="rgba(148,163,184,0.09)" />
          {y !== 0 && <text x={toX(xMin) - 6} y={toY(y) + 4} fill="#64748b" fontSize="9" textAnchor="end" fontFamily="Inter,system-ui">{fmtLabel(y)}</text>}
        </g>
      ))}
      <line x1={toX(xMin)} y1={toY(0)} x2={toX(xMax)} y2={toY(0)} stroke="#475569" strokeWidth="1.5" />
      <line x1={toX(0)} y1={toY(yMin)} x2={toX(0)} y2={toY(yMax)} stroke="#475569" strokeWidth="1.5" />
      {curves.map((cv, i) => {
        const pts = sample(cv.f);
        if (!pts.length) return null;
        const stroke = cv.color || palette[i % 4];
        const area = cv.fill ? `${dpath(pts)} L${pts[pts.length - 1][0].toFixed(1)},${toY(0)} L${pts[0][0].toFixed(1)},${toY(0)} Z` : null;
        return (
          <g key={`c${i}`}>
            {area && <path d={area} fill="url(#areaFill)" />}
            <path d={dpath(pts)} fill="none" stroke={stroke} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        );
      })}
      {lines.map((ln, i) => (
        <line key={`l${i}`} x1={toX(ln.x1)} y1={toY(ln.y1)} x2={toX(ln.x2)} y2={toY(ln.y2)} stroke={ln.color || "#f59e0b"} strokeWidth={ln.width || 2.4} strokeDasharray={ln.dash || "none"} strokeLinecap="round" />
      ))}
      {points.map((pt, i) => (
        <g key={`p${i}`} style={{ transition: "all 0.05s linear" }}>
          <circle cx={toX(pt.x)} cy={toY(pt.y)} r={pt.r || 7} fill={pt.color || "#f59e0b"} stroke="#0a0e1a" strokeWidth="2.5" />
          {pt.label && <text x={toX(pt.x) + (pt.lx != null ? pt.lx : 11)} y={toY(pt.y) + (pt.ly != null ? pt.ly : -13)} fill={pt.color || "#f59e0b"} fontSize="11" fontWeight="700" fontFamily="Inter,system-ui" stroke="#0a0e1a" strokeWidth="3.6" paintOrder="stroke" strokeLinejoin="round" textAnchor={pt.anchor || "start"}>{pt.label}</text>}
        </g>
      ))}
    </svg>
  );
}

function Slider({ value, min, max, step = 0.01, onChange, labelLeft, labelRight, ariaLabel, ariaValueText }) {
  return (
    <div style={{ margin: "16px 0 4px" }}>
      <input type="range" min={min} max={max} step={step} value={value}
        aria-label={ariaLabel} aria-valuetext={ariaValueText}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        style={{ width: "100%", accentColor: "#8b5cf6", cursor: "pointer", height: 6 }} />
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "#94a3b8", fontFamily: "Inter,system-ui", marginTop: 4 }}>
        <span style={{ fontWeight: 700, color: "#c4b5fd" }}>{labelLeft}</span><span>{labelRight}</span>
      </div>
    </div>
  );
}

export function SlopeExplorer({ fn, dfn, xMin, xMax, yMin, yMax, start, intro }) {
  const [x, setX] = useState(start != null ? start : (xMin + xMax) / 2);
  const y = fn(x), m = dfn(x);
  const seg = (xMax - xMin) * 0.16;
  const lines = [{ x1: x - seg, y1: y - m * seg, x2: x + seg, y2: y + m * seg, color: "#fbbf24", width: 3 }];
  const sign = m > 0.05 ? "climbing uphill" : m < -0.05 ? "heading downhill" : "perfectly flat (a peak, valley, or pause)";
  const sColor = m > 0.05 ? "#4ade80" : m < -0.05 ? "#f87171" : "#fbbf24";
  const readout = `x = ${x.toFixed(2)}, slope ${m.toFixed(2)}, the curve is ${sign}`;
  return (
    <div>
      {intro && <p style={{ marginBottom: 12 }}>{intro}</p>}
      <Plot curves={[{ f: fn, color: "#818cf8", fill: true }]} lines={lines} points={[{ x, y, color: "#fbbf24", label: "you are here", lx: m >= 0 ? -12 : 12, ly: -15, anchor: m >= 0 ? "end" : "start" }]} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
      <Slider value={x} min={xMin} max={xMax} step={(xMax - xMin) / 220} onChange={setX} ariaLabel="Point position along the curve" ariaValueText={readout} labelLeft={`x = ${x.toFixed(2)}`} labelRight="drag to slide the point along the curve" />
      <div aria-live="polite" style={{ marginTop: 8, padding: "12px 16px", background: "rgba(8,11,20,0.45)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 12, fontSize: 14.5 }}>
        The orange line is the <strong>tangent</strong>: it shows the slope right at that spot. Here <M d={`f'(${x.toFixed(2)})=${m.toFixed(2)}`} />, so the curve is <span style={{ color: sColor, fontWeight: 700 }}>{sign}</span>.
      </div>
    </div>
  );
}

export function ParamExplorer({ xMin, xMax, yMin, yMax, min, max, step = 0.05, start, name, hint, build, intro }) {
  const [v, setV] = useState(start);
  const spec = build(v);
  return (
    <div>
      {intro && <p style={{ marginBottom: 12 }}>{intro}</p>}
      <Plot curves={spec.curves} points={spec.points || []} lines={spec.lines || []} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax} />
      {spec.formula && <div style={{ textAlign: "center", margin: "10px 0 0" }}><M d={spec.formula} block /></div>}
      <Slider value={v} min={min} max={max} step={step} onChange={setV} ariaLabel={`Parameter ${name}`} ariaValueText={`${name} = ${v.toFixed(2)}`} labelLeft={`${name} = ${v.toFixed(2)}`} labelRight={hint || "drag to change it"} />
      {spec.caption && <div aria-live="polite" style={{ marginTop: 6, padding: "12px 16px", background: "rgba(8,11,20,0.45)", border: "1px solid rgba(99,102,241,0.15)", borderRadius: 12, fontSize: 14.5 }}>{spec.caption}</div>}
    </div>
  );
}

function Celebrate({ trigger }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!trigger) return;
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext("2d");
    cv.width = window.innerWidth; cv.height = window.innerHeight;
    const colors = ["#6366f1", "#8b5cf6", "#22d3ee", "#10b981", "#f59e0b", "#ef4444", "#f472b6"];
    const parts = Array.from({ length: 160 }, () => ({
      x: window.innerWidth / 2 + (Math.random() - 0.5) * 240,
      y: window.innerHeight * 0.32,
      vx: (Math.random() - 0.5) * 14, vy: Math.random() * -13 - 4,
      g: 0.32 + Math.random() * 0.22, s: 5 + Math.random() * 8,
      rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.4,
      c: colors[Math.floor(Math.random() * colors.length)], life: 0,
    }));
    let raf;
    const tick = () => {
      ctx.clearRect(0, 0, cv.width, cv.height);
      let alive = false;
      for (const p of parts) {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.rot += p.vr; p.life += 1;
        if (p.y < cv.height + 30) alive = true;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - p.life / 130); ctx.fillStyle = p.c;
        ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s * 0.62); ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(tick); else ctx.clearRect(0, 0, cv.width, cv.height);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [trigger]);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 200, pointerEvents: "none" }} />;
}

// Crisp stroke icons (lucide-style paths) - consistent across platforms, unlike emoji.
const ICONS = {
  bulb: ["M9 18h6", "M10 22h4", "M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"],
  sigma: ["M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"],
  chart: ["M3 3v16a2 2 0 0 0 2 2h16", "M7 16v-5", "M12 16V8", "M17 16v-3"],
  sliders: ["M21 4h-7", "M10 4H3", "M21 12h-9", "M8 12H3", "M21 20h-5", "M12 20H3", "M14 2v4", "M8 10v4", "M16 18v4"],
  pencil: ["M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z", "m15 5 4 4"],
  zap: ["M13 2 3 14h9l-1 8 10-12h-9l1-8Z"],
  steps: ["m3 17 2 2 4-4", "m3 7 2 2 4-4", "M13 6h8", "M13 12h8", "M13 18h8"],
  award: ["M12 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12Z", "M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"],
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  check: ["M20 6 9 17l-5-5"],
};
function Ic({ d, size = 13, sw = 2.2, style }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0, ...style }}>
      {d.map((p, i) => <path key={i} d={p} />)}
    </svg>
  );
}

const L = buildLessons({ M, Box, Graph, SlopeExplorer, SignChart, ParamExplorer });

const MODULES=[...new Set(L.map(l=>l.module))];
const tc={concept:{bg:"rgba(129,140,248,0.09)",border:"#818cf8",icon:ICONS.bulb,label:"Core Concept"},rule:{bg:"rgba(251,191,36,0.09)",border:"#fbbf24",icon:ICONS.sigma,label:"Key Formulas"},example:{bg:"rgba(52,211,153,0.09)",border:"#34d399",icon:ICONS.chart,label:"Worked Example"},interactive:{bg:"rgba(34,211,238,0.09)",border:"#22d3ee",icon:ICONS.sliders,label:"Play with it"},practice:{bg:"rgba(244,114,182,0.09)",border:"#f472b6",icon:ICONS.pencil,label:"Your Turn"}};

function PB({completed,total}){
  const p=Math.round(completed/total*100);
  return(
    <div style={{marginBottom:16}}>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:12,color:"#94a3b8",marginBottom:4,fontFamily:"system-ui"}}>
        <span>{completed}/{total}</span><span>{p}%</span>
      </div>
      <div style={{height:6,background:"rgba(148,163,184,0.14)",borderRadius:4,overflow:"hidden"}}>
        <div style={{height:"100%",width:`${p}%`,background:"linear-gradient(90deg,#6366f1,#a78bfa)",borderRadius:4,transition:"width 0.5s cubic-bezier(0.22,1,0.36,1)",boxShadow:"0 0 10px rgba(139,92,246,0.55)"}}/>
      </div>
    </div>
  );
}

export function CC({item,showAnswer,onToggle,id}){
  const c=tc[item.type];
  return(
    <div id={id} style={{background:"linear-gradient(180deg,rgba(255,255,255,0.038),rgba(255,255,255,0.016))",border:"1px solid rgba(255,255,255,0.07)",borderTop:"1px solid rgba(255,255,255,0.11)",borderRadius:20,padding:"28px 32px",marginBottom:24,boxShadow:"0 10px 30px rgba(2,4,12,0.35)",scrollMarginTop:18}}>
      <h2 style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:c.border,background:c.bg,border:`1px solid ${c.border}38`,padding:"5px 12px",borderRadius:999,marginBottom:18,fontFamily:"Inter,system-ui"}}><Ic d={c.icon} size={12.5}/>{item.label||c.label}</h2>
      <div className="prose" style={{fontSize:17,lineHeight:1.85,color:"#dde4ee"}}>{item.render?item.render():null}</div>
      {item.type==="practice"&&item.answer&&(
        <div style={{marginTop:18}}>
          <button onClick={onToggle} aria-expanded={showAnswer} aria-controls={`${id}-sol`} style={{background:showAnswer?"rgba(148,163,184,0.10)":"linear-gradient(135deg,#818cf8,#6366f1 45%,#8b5cf6)",border:showAnswer?"1px solid rgba(148,163,184,0.2)":"none",color:showAnswer?"#cbd5e1":"#fff",padding:"11px 22px",borderRadius:12,cursor:"pointer",fontSize:13.5,fontWeight:700,fontFamily:"Inter,system-ui",boxShadow:showAnswer?"none":"0 6px 18px rgba(99,102,241,0.32), inset 0 1px 0 rgba(255,255,255,0.18)"}}>
            {showAnswer?"Hide solution":"Show me how, step by step"}
          </button>
          {showAnswer&&(
            <div id={`${id}-sol`} className="prose lesson-fade" style={{marginTop:16,padding:"22px 26px",background:"rgba(52,211,153,0.05)",border:"1px solid rgba(52,211,153,0.18)",borderRadius:16,color:"#d8f3e3",fontSize:16,lineHeight:1.9}}>
              {typeof item.answer==="function"?item.answer():null}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const SAVE_KEY="lenamon_calc_v1";
function progressKey(session){
  if(session&&session.role==="admin") return SAVE_KEY+"::admin";
  if(session&&session.email) return SAVE_KEY+"::"+session.email;
  return SAVE_KEY;
}
function loadSave(key){
  try{const s=JSON.parse(localStorage.getItem(key||SAVE_KEY));if(s)return s;}catch(e){console.warn("Ignoring unreadable saved progress:",e);}
  return {done:[],idx:0,xp:0};
}
// Resume point: the first lesson the learner has not completed yet
// (Lesson 1 for a brand-new account; the last lesson if everything is done).
function firstIncompleteIdx(doneArr){
  const d=new Set(doneArr||[]);
  for(let i=0;i<L.length;i++){if(!d.has(i))return i;}
  return Math.max(0,L.length-1);
}

// ---------- Temporary client-side accounts (replaced by a real backend in the next stage) ----------
const USERS_KEY="lenamon_users_v1";
const SESSION_KEY="lenamon_session_v1";
const ADMIN_USER="user";      // temporary admin credentials - not secure, dev only
const ADMIN_PASS="password";  // temporary admin credentials - not secure, dev only
function loadUsers(){try{const u=JSON.parse(localStorage.getItem(USERS_KEY));if(Array.isArray(u))return u;}catch(e){console.warn("Ignoring unreadable users store:",e);}return[];}
export function saveUsers(u){try{localStorage.setItem(USERS_KEY,JSON.stringify(u));return true;}catch(e){console.error("Failed to persist users:",e);return false;}}
function loadSession(){try{const s=JSON.parse(localStorage.getItem(SESSION_KEY));if(s)return s;}catch(e){console.warn("Ignoring unreadable session:",e);}return null;}
function saveSession(s){try{if(s)localStorage.setItem(SESSION_KEY,JSON.stringify(s));else localStorage.removeItem(SESSION_KEY);}catch(e){console.warn("Could not persist session:",e);}}
function validEmail(e){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);}
function findUser(email){const e=(email||"").trim().toLowerCase();return loadUsers().find(u=>u.email===e)||null;}

// Per-lesson quizzes (lesson id -> 3 questions). Injected/verified separately.

// Render a string that may contain inline math wrapped in $...$ as KaTeX.
function MX({s}){
  const parts=String(s).split(/(\$[^$]*\$)/g);
  return <>{parts.map((p,i)=>(p.length>1&&p[0]==="$"&&p[p.length-1]==="$")?<M key={i} d={p.slice(1,-1)}/>:<span key={i}>{p}</span>)}</>;
}

// Per-lesson inspiration card (indexed by lesson position). Quotes are genuine and attributed.
const INSPO=[
  {t:"Roger Bacon",b:"\"Mathematics is the gate and key to the sciences.\" You are turning that key right now - and it all starts with the humble function."},
  {t:"The whole course in one idea",b:"Slope answers a single question: how fast is something changing? Every big idea ahead - derivatives, integrals - is a twist on that one question."},
  {t:"Meet a famous number",b:"The number e turns up wherever growth feeds on itself: savings, populations, even how a hot cup of coffee cools. You will see it for the rest of the course."},
  {t:"Pierre-Simon Laplace",b:"Laplace said the invention of logarithms, \"by shortening the labours, doubled the life of the astronomer.\" One good idea can give you time back."},
  {t:"A clever trick",b:"A limit is calculus learning to sneak up on the impossible - getting infinitely close to an answer you cannot reach head-on. Beautiful, once it clicks."},
  {t:"Georg Cantor",b:"\"The essence of mathematics lies in its freedom.\" Cantor tamed infinity itself - and here you are, looking in that same direction."},
  {t:"Smooth sailing",b:"Continuity is the math of 'no sudden jumps' - curves you can draw without lifting your pen. It is what makes everything ahead possible."},
  {t:"Isaac Newton",b:"\"If I have seen further, it is by standing on the shoulders of giants.\" Newton co-invented the very derivative you are about to learn."},
  {t:"The shortcut",b:"Once you see the pattern, you never unsee it. The power rule turns a whole page of limit algebra into a one-second move."},
  {t:"Calculus at work",b:"This is calculus earning its keep. 'What does one more unit cost, or earn?' is how real businesses and economists actually decide."},
  {t:"Its own echo",b:"e^x is the one function that is its own rate of change - it grows exactly as fast as it already is. Nature reuses this trick everywhere."},
  {t:"Keep asking why",b:"Every rule here was discovered by someone asking 'but why does that work?' - the exact question that is serving you so well right now."},
  {t:"Rates within rates",b:"The chain rule is how calculus handles a world of nested causes - speeds inside speeds. Once you spot it, you will see it everywhere."},
  {t:"William Thurston",b:"\"Mathematics is an art of human understanding.\" That is exactly what elasticity gives you - not a formula to memorize, but a way to understand how price and demand pull on each other."},
  {t:"Albert Einstein",b:"\"Pure mathematics is, in its way, the poetry of logical ideas.\" Finding a curve's peaks and valleys is a little piece of that poetry."},
  {t:"The second look",b:"Concavity is calculus noticing not just where you are headed, but whether you are speeding up or easing off. Subtle, and powerful."},
  {t:"Albert Einstein",b:"\"Do not worry about your difficulties in mathematics. I can assure you mine are still greater.\" If Einstein struggled, you are in fine company - keep going."},
  {t:"Leonhard Euler",b:"\"Nothing takes place in the world whose meaning is not that of some maximum or minimum.\" Optimization is calculus finding the best of everything."},
  {t:"Reverse gear",b:"Every derivative you learned now runs backward. That reverse gear is what unlocks areas, totals, and even the future."},
  {t:"Rename and conquer",b:"Substitution is the oldest trick in problem-solving: when something is too hard, rename it into something you already know."},
  {t:"Infinite slices",b:"An integral adds up infinitely many infinitely-thin slices and still lands on a clean, finite answer. That it works at all is a quiet miracle."},
  {t:"John von Neumann",b:"\"The calculus was the first achievement of modern mathematics, and it is difficult to overestimate its importance.\" You are now holding its crown jewel."},
  {t:"Mind the gap",b:"The gap between two curves can mean profit, surplus, or growth. Calculus measures that gap exactly - no guessing."},
  {t:"Hidden value",b:"Behind every supply-and-demand graph is a real story of value created. Calculus puts a number on the bonus everyone walks away with."},
  {t:"You made it",b:"From one humble function to pricing the future - look how far you have come. Wherever numbers lead next, you now speak their language."},
];

const QLETTERS=["A","B","C","D"];
export function Quiz({quiz,passed,onPass}){
  const[step,setStep]=useState(passed?quiz.length:0);
  const[chosen,setChosen]=useState(null);
  const continueRef=useRef(null);
  const finished=step>=quiz.length;
  const qz=finished?null:quiz[step];
  const isCorrect=!finished&&chosen!==null&&chosen===qz.answer;
  // When the answer is right, move focus to the revealed continue button so
  // keyboard users are not left hunting for it.
  useEffect(()=>{
    if(isCorrect&&continueRef.current) continueRef.current.focus();
  },[isCorrect,step]);

  if(finished){
    return(
      <div style={{background:"rgba(16,185,129,0.06)",border:"1px solid rgba(16,185,129,0.22)",borderRadius:20,padding:"24px 30px",marginBottom:24,textAlign:"center"}}>
        <div style={{fontSize:15,fontWeight:800,color:"#6ee7b7",fontFamily:"Inter,system-ui"}}>✓ Quiz complete</div>
        <div style={{fontSize:13.5,color:"#a5b0c2",marginTop:6,fontFamily:"Inter,system-ui"}}>You answered all {quiz.length} questions correctly. This lesson is unlocked - use the Next button up top to continue.</div>
      </div>
    );
  }

  const isWrong=chosen!==null&&chosen!==qz.answer;
  // The UI already labels feedback "Correct!" / "Not quite." - strip a duplicate
  // acknowledgment from the start of the explanation so it never reads twice.
  const cap=(s)=>s?s.charAt(0).toUpperCase()+s.slice(1):s;
  const whyRight=cap(qz.why[qz.answer].replace(/^(Correct|Yes|Exactly|Right)\b[!.,]?\s*-?\s*/i,""));
  const whyWrong=isWrong?cap(qz.why[chosen].replace(/^(Not quite|Not this one|Close, but|No)\b[!.,]?\s*-?\s*/i,"")):"";
  const pick=(i)=>{ if(isCorrect)return; setChosen(i); };
  const cont=()=>{ if(step+1>=quiz.length){onPass();setStep(quiz.length);} else {setStep(step+1);setChosen(null);} };

  return(
    <div style={{background:"linear-gradient(180deg,rgba(139,92,246,0.09),rgba(139,92,246,0.03))",border:"1px solid rgba(139,92,246,0.26)",borderTop:"1px solid rgba(196,181,253,0.3)",borderRadius:20,padding:"28px 32px",marginBottom:24,fontFamily:"Inter,system-ui",boxShadow:"0 10px 30px rgba(2,4,12,0.35)"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,marginBottom:16,flexWrap:"wrap"}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:7,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.07em",color:"#c4b5fd",background:"rgba(139,92,246,0.14)",border:"1px solid rgba(139,92,246,0.32)",padding:"5px 12px",borderRadius:999}}><Ic d={ICONS.check} size={12}/>Check your understanding</div>
        <div style={{display:"flex",gap:5,alignItems:"center"}}>
          {quiz.map((_,i)=><span key={i} style={{width:i===step?20:8,height:8,borderRadius:999,background:i<step?"#34d399":i===step?"linear-gradient(90deg,#a78bfa,#8b5cf6)":"rgba(148,163,184,0.3)",transition:"width 0.3s cubic-bezier(0.22,1,0.36,1)"}}/>)}
          <span style={{fontSize:12,color:"#94a3b8",marginLeft:6,fontWeight:600}}>Question {step+1} of {quiz.length}</span>
        </div>
      </div>

      <div style={{fontSize:16.5,lineHeight:1.6,color:"#eef2f8",fontWeight:600,marginBottom:16}}><MX s={qz.q}/></div>

      <div style={{display:"flex",flexDirection:"column",gap:10}}>
        {qz.choices.map((c,i)=>{
          const picked=chosen===i;
          const showRight=isCorrect&&i===qz.answer;
          const showWrong=isWrong&&picked;
          const bg=showRight?"rgba(16,185,129,0.14)":showWrong?"rgba(239,68,68,0.12)":"rgba(8,11,20,0.45)";
          const bd=showRight?"#34d399":showWrong?"#f87171":"rgba(148,163,184,0.2)";
          return(
            <button key={i} onClick={()=>pick(i)} disabled={isCorrect} className={showRight||showWrong?undefined:"qopt"}
              style={{display:"flex",alignItems:"center",gap:12,width:"100%",textAlign:"left",background:bg,border:`1px solid ${bd}`,borderRadius:12,padding:"13px 16px",cursor:isCorrect?"default":"pointer",fontFamily:"Inter,system-ui"}}>
              <span style={{width:26,height:26,flexShrink:0,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:800,background:showRight?"#10b981":showWrong?"#ef4444":"rgba(148,163,184,0.16)",color:showRight||showWrong?"#fff":"#cbd5e1"}}>{showRight?"✓":showWrong?"✕":QLETTERS[i]}</span>
              <span style={{fontSize:15,color:"#dde4ee",lineHeight:1.5}}><MX s={c}/></span>
            </button>
          );
        })}
      </div>

      <div role="status" aria-live="polite">
        {isWrong&&(
          <div style={{marginTop:14,padding:"13px 16px",background:"rgba(245,158,11,0.08)",border:"1px solid rgba(245,158,11,0.28)",borderRadius:12,fontSize:14,lineHeight:1.6,color:"#fcd9a8"}}>
            <strong style={{color:"#fbbf24"}}>Not quite. </strong><MX s={whyWrong}/> <span style={{color:"#fbbf24",fontWeight:600}}>Give it another try.</span>
          </div>
        )}
        {isCorrect&&(
          <div style={{marginTop:14}}>
            <div style={{padding:"13px 16px",background:"rgba(16,185,129,0.08)",border:"1px solid rgba(16,185,129,0.28)",borderRadius:12,fontSize:14,lineHeight:1.6,color:"#bbf7d0"}}>
              <strong style={{color:"#6ee7b7"}}>Correct! </strong><MX s={whyRight}/>
            </div>
            <button ref={continueRef} onClick={cont} style={{marginTop:14,background:"linear-gradient(135deg,#818cf8,#6366f1 45%,#8b5cf6)",color:"#fff",border:"none",padding:"11px 22px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:700,fontFamily:"Inter,system-ui",boxShadow:"0 6px 18px rgba(99,102,241,0.32), inset 0 1px 0 rgba(255,255,255,0.18)"}}>
              {step+1>=quiz.length?"Finish quiz →":"Next question →"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function LockIcon({size=13,color="#94a3b8"}){
  return(
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="5" y="11" width="14" height="9" rx="2" fill={color}/>
      <path d="M8 11V8a4 4 0 0 1 8 0v3" stroke={color} strokeWidth="2.2" fill="none"/>
    </svg>
  );
}

// Golden foil completion seal (SVG so it prints crisply and uses no emoji).
function CertSeal(){
  const cx=75,cy=78,pts=22,rO=47,rI=39;
  let star="";
  for(let i=0;i<pts*2;i++){
    const r=i%2===0?rO:rI;
    const a=(Math.PI/pts)*i-Math.PI/2;
    star+=(i===0?"M":"L")+(cx+r*Math.cos(a)).toFixed(1)+","+(cy+r*Math.sin(a)).toFixed(1)+" ";
  }
  star+="Z";
  return(
    <svg width="150" height="192" viewBox="0 0 150 192" aria-hidden="true" style={{display:"block"}}>
      <defs>
        <radialGradient id="cs_gold" cx="40%" cy="32%" r="72%">
          <stop offset="0%" stopColor="#fff7d6"/>
          <stop offset="45%" stopColor="#f3cd5f"/>
          <stop offset="78%" stopColor="#dca320"/>
          <stop offset="100%" stopColor="#a9760c"/>
        </radialGradient>
        <linearGradient id="cs_ribbon" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e0a92a"/>
          <stop offset="100%" stopColor="#8c6207"/>
        </linearGradient>
        <path id="cs_textpath" d={`M ${cx} ${cy} m -26,0 a 26,26 0 1,1 52,0 a 26,26 0 1,1 -52,0`} fill="none"/>
      </defs>
      <path d="M61,108 L51,184 L66,173 L69,112 Z" fill="url(#cs_ribbon)"/>
      <path d="M89,108 L99,184 L84,173 L81,112 Z" fill="url(#cs_ribbon)"/>
      <path d={star} fill="url(#cs_gold)" stroke="#8a5e08" strokeWidth="0.6"/>
      <circle cx={cx} cy={cy} r="38" fill="url(#cs_gold)" stroke="#fff7d6" strokeWidth="1"/>
      <circle cx={cx} cy={cy} r="33" fill="none" stroke="#7d5505" strokeWidth="1" opacity="0.55"/>
      <text fill="#6b4a06" fontSize="8" fontWeight="700" letterSpacing="2" fontFamily="'Playfair Display',serif">
        <textPath href="#cs_textpath" startOffset="6%">LENAMON CALCULUS · EST MMXXVI ·</textPath>
      </text>
      <text x={cx} y={cy+12} textAnchor="middle" fontSize="36" fontFamily="'Playfair Display',Georgia,serif" fontWeight="700" fill="#6b4a06">∫</text>
    </svg>
  );
}

function Certificate({fullName,dateStr,onPrint}){
  const name=(fullName||"").trim()||"Valued Student";
  const ink="#1c2b4a",gold="#caa64a",goldDk="#9a7b2e",serif="'Playfair Display',Georgia,serif",ui="'Inter',system-ui,sans-serif";
  const corner=(pos)=>{
    const b="2px solid "+gold,base={position:"absolute",width:26,height:26,pointerEvents:"none"};
    if(pos==="tl")return{...base,top:16,left:16,borderTop:b,borderLeft:b};
    if(pos==="tr")return{...base,top:16,right:16,borderTop:b,borderRight:b};
    if(pos==="bl")return{...base,bottom:16,left:16,borderBottom:b,borderLeft:b};
    return{...base,bottom:16,right:16,borderBottom:b,borderRight:b};
  };
  return(
    <div style={{padding:"30px 18px 72px",display:"flex",flexDirection:"column",alignItems:"center"}}>
      <div className="cert-print" style={{position:"relative",width:"100%",maxWidth:820,background:"linear-gradient(135deg,#fffdf6,#fbf3e0)",border:`2px solid ${gold}`,borderRadius:6,boxShadow:"0 24px 60px rgba(0,0,0,0.45)",padding:"48px 54px 56px",textAlign:"center",color:ink,fontFamily:serif,WebkitPrintColorAdjust:"exact",printColorAdjust:"exact",overflow:"hidden"}}>
        <div style={{position:"absolute",inset:10,border:`1px solid ${gold}`,borderRadius:3,opacity:0.6,pointerEvents:"none"}}/>
        <div style={corner("tl")}/><div style={corner("tr")}/><div style={corner("bl")}/><div style={corner("br")}/>

        <div style={{fontSize:28,color:"#b8860b",marginBottom:2,fontFamily:serif,lineHeight:1}}>∫</div>
        <div style={{fontSize:"clamp(28px,5vw,44px)",fontWeight:800,letterSpacing:"0.12em",textTransform:"uppercase",color:ink,lineHeight:1.05}}>Lenamon Calculus</div>
        <div style={{height:1,width:210,background:`linear-gradient(90deg,transparent,${gold},transparent)`,margin:"12px auto 8px"}}/>
        <div style={{fontSize:11.5,letterSpacing:"0.34em",textTransform:"uppercase",color:goldDk,fontFamily:ui,fontWeight:600}}>Department of Business Calculus</div>

        <div style={{fontSize:"clamp(18px,3vw,25px)",fontStyle:"italic",color:"#5b4a2a",margin:"30px 0 4px"}}>Certificate of Completion</div>
        <div style={{fontSize:13,color:"#5a6275",fontFamily:ui,letterSpacing:"0.04em"}}>This is to certify that</div>

        <div style={{fontSize:"clamp(30px,6vw,48px)",fontWeight:700,color:ink,margin:"14px 0 6px",lineHeight:1.1}}>{name}</div>
        <div style={{height:1,width:"min(440px,82%)",background:`linear-gradient(90deg,transparent,${gold},transparent)`,margin:"0 auto 22px"}}/>

        <div style={{fontSize:"clamp(14px,2.4vw,16.5px)",lineHeight:1.85,color:"#3a4254",fontFamily:ui,maxWidth:560,margin:"0 auto"}}>
          has successfully completed the <strong style={{color:ink}}>Lenamon Calculus</strong> course, comprising all 25 lessons across 6 modules of business calculus, demonstrating mastery from foundations and limits through derivatives, integration, and their real-world business applications.
        </div>

        <div style={{margin:"22px auto 4px",display:"flex",justifyContent:"center"}}><CertSeal/></div>

        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:30,margin:"14px auto 0",maxWidth:600}}>
          <div style={{textAlign:"center",flex:1}}>
            <div style={{fontFamily:"'Pinyon Script',cursive",fontSize:36,color:ink,lineHeight:1,marginBottom:2}}>Jeff Lenamon</div>
            <div style={{height:1,background:goldDk,opacity:0.55,margin:"0 auto 6px",width:"88%"}}/>
            <div style={{fontSize:11,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6b5a32",fontFamily:ui,fontWeight:600}}>Jeff Lenamon, Course Director</div>
          </div>
          <div style={{textAlign:"center",flex:1}}>
            <div style={{fontFamily:serif,fontSize:21,color:ink,lineHeight:1,marginBottom:8}}>{dateStr}</div>
            <div style={{height:1,background:goldDk,opacity:0.55,margin:"0 auto 6px",width:"88%"}}/>
            <div style={{fontSize:11,letterSpacing:"0.06em",textTransform:"uppercase",color:"#6b5a32",fontFamily:ui,fontWeight:600}}>Date of Completion</div>
          </div>
        </div>
      </div>

      <button onClick={onPrint} style={{marginTop:26,background:"linear-gradient(135deg,#6366f1,#8b5cf6)",color:"#fff",border:"none",padding:"12px 24px",borderRadius:12,cursor:"pointer",fontSize:14,fontWeight:700,fontFamily:"Inter,system-ui",boxShadow:"0 8px 24px rgba(99,102,241,0.32)"}}>Print / Save as PDF</button>
    </div>
  );
}

// Error boundary around the lesson content so a throw in any hand-authored
// lesson render/answer function shows a recoverable fallback instead of
// white-screening the whole app. Keyed by lesson idx at the use site, so
// navigating to another lesson remounts a fresh boundary.
export class LessonErrorBoundary extends Component {
  constructor(props){
    super(props);
    this.state={error:null};
  }
  static getDerivedStateFromError(error){
    return {error};
  }
  componentDidCatch(error,info){
    console.error("Lesson render failed:",error,info);
  }
  render(){
    if(this.state.error){
      return(
        <div role="alert" style={{background:"rgba(244,114,182,0.06)",border:"1px solid rgba(244,114,182,0.28)",borderRadius:16,padding:"28px 32px",margin:"0 0 24px",color:"#f4d4e4",fontFamily:"Inter,system-ui"}}>
          <div style={{fontSize:16,fontWeight:700,marginBottom:8,color:"#fbcfe8"}}>This lesson hit a snag while rendering.</div>
          <div style={{fontSize:14,lineHeight:1.7,color:"#e6bfd2",marginBottom:18}}>The rest of the course is fine. Try again, or pick another lesson from the sidebar.</div>
          <button onClick={()=>this.setState({error:null})} style={{background:"linear-gradient(135deg,#818cf8,#6366f1 45%,#8b5cf6)",border:"none",color:"#fff",padding:"11px 22px",borderRadius:12,cursor:"pointer",fontSize:13.5,fontWeight:700,fontFamily:"Inter,system-ui",boxShadow:"0 6px 18px rgba(99,102,241,0.32), inset 0 1px 0 rgba(255,255,255,0.18)"}}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

function getFocusable(container){
  if(!container) return [];
  return Array.from(container.querySelectorAll(
    'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'
  ));
}

// Accessible modal drawer: labels itself as a dialog, moves focus to its first
// item on open, traps Tab within it, closes on Escape, and restores focus to
// the control that opened it (passed via restoreFocusRef) on close.
export function MobileDrawer({onClose,restoreFocusRef,label,children}){
  const panelRef=useRef(null);
  useEffect(()=>{
    const focusables=getFocusable(panelRef.current);
    (focusables[0]||panelRef.current)?.focus();
    return ()=>{
      const t=restoreFocusRef&&restoreFocusRef.current;
      if(t&&typeof t.focus==="function") t.focus();
    };
  },[]);
  const onKeyDown=(e)=>{
    if(e.key==="Escape"){e.preventDefault();onClose();return;}
    if(e.key!=="Tab") return;
    const f=getFocusable(panelRef.current);
    if(!f.length){e.preventDefault();return;}
    const first=f[0],last=f[f.length-1],a=document.activeElement;
    if(e.shiftKey&&(a===first||!panelRef.current.contains(a))){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&(a===last||!panelRef.current.contains(a))){e.preventDefault();first.focus();}
  };
  return(
    <div style={{position:"fixed",inset:0,zIndex:50,display:"flex"}}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.5)"}} onClick={onClose}/>
      <div ref={panelRef} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} onKeyDown={onKeyDown}
        style={{position:"relative",width:280,background:"#0b1120",borderRight:"1px solid rgba(99,102,241,0.15)",height:"100%",overflowY:"auto",zIndex:1,outline:"none"}}>
        {children}
      </div>
    </div>
  );
}

const XP_PER_LESSON=50;   // XP awarded the first time a lesson is completed
const XP_PER_LEVEL=300;   // XP needed to advance one level

export function Course({session,onSignOut,onBrand}){
  const storeKey=progressKey(session);
  const saved=loadSave(storeKey);
  // Restore the last-viewed lesson if it is still a valid index; otherwise fall
  // back to the first incomplete lesson. This makes the saved idx meaningful on
  // reload instead of dead data.
  const[idx,setIdx]=useState(()=>{
    const i=saved.idx;
    return typeof i==="number"&&i>=0&&i<L.length?i:firstIncompleteIdx(saved.done);
  });
  const[done,setDone]=useState(new Set(saved.done||[]));
  const[xp,setXp]=useState(saved.xp||0);
  const[onCert,setOnCert]=useState(false);
  const[completedAt,setCompletedAt]=useState(saved.completedAt||null);
  const[ans,setAns]=useState({});
  const[sidebarOpen,setSidebarOpen]=useState(false);
  const[ready,setReady]=useState(false);
  const[burst,setBurst]=useState(0);
  const contentRef=useRef(null);
  const menuToggleRef=useRef(null);

  useEffect(()=>{
    // KaTeX is loaded via index.html <script> tag
    if(window.katex){setReady(true);return;}
    // Fallback: poll for KaTeX in case script hasn't loaded yet
    const check=setInterval(()=>{if(window.katex){setReady(true);clearInterval(check);}},50);
    // Safety net: if KaTeX never loads (e.g. CDN blocked), show the page anyway after 4s.
    // The M component falls back to raw text so lessons stay readable.
    const giveUp=setTimeout(()=>{setReady(true);clearInterval(check);},4000);
    return ()=>{clearInterval(check);clearTimeout(giveUp);};
  },[]);

  const prefersReduced=typeof window!=="undefined"&&window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior=prefersReduced?"auto":"smooth";

  useEffect(()=>{
    if(contentRef.current) contentRef.current.scrollTo({top:0,behavior:scrollBehavior});
  },[idx,onCert]);


  useEffect(()=>{
    try{localStorage.setItem(storeKey,JSON.stringify({done:[...done],idx,xp,completedAt}));}catch(e){console.warn("Could not save lesson progress:",e);}
  },[done,idx,xp,completedAt,storeKey]);

  // Stamp the completion date the first time every lesson is done.
  useEffect(()=>{
    if(done.size>=L.length&&!completedAt) setCompletedAt(new Date().toISOString());
  },[done,completedAt]);

  const level=Math.floor(xp/XP_PER_LEVEL)+1;
  const lesson=L[idx];
  const allDone=done.size>=L.length;
  const certDate=(completedAt?new Date(completedAt):new Date()).toLocaleDateString(undefined,{year:"numeric",month:"long",day:"numeric"});
  const fullName=session?`${session.firstName||""} ${session.lastName||""}`.trim():"";
  const lessonQuiz=QUIZ[lesson.id];
  const hasQuiz=!!(lessonQuiz&&lessonQuiz.length);
  const passed=done.has(idx);
  const toggle=(i)=>setAns(p=>({...p,[`${idx}-${i}`]:!p[`${idx}-${i}`]}));
  // Completing a lesson the first time awards XP and fires the confetti once;
  // calling it again for an already-done lesson is a no-op.
  const completeLesson=(i)=>{
    if(done.has(i))return;
    setDone(p=>new Set([...p,i]));setXp(p=>p+XP_PER_LESSON);setBurst(b=>b+1);
  };
  // Passing the quiz is what completes a lesson (awards XP, confetti once).
  const passQuiz=()=>completeLesson(idx);
  const isLast=idx>=L.length-1;
  const nextDisabled=hasQuiz?(!passed||(isLast&&!allDone)):false;
  const nextLabel=(hasQuiz&&!passed)?"Pass the quiz to continue":(isLast?(allDone?"View certificate →":"Finish remaining lessons"):"Next →");
  const next=()=>{
    if(nextDisabled)return;
    if(!hasQuiz)completeLesson(idx);
    if(!isLast){setIdx(idx+1);setAns({});}
    else if(allDone){setOnCert(true);}
  };
  const prev=()=>{if(idx>0){setIdx(idx-1);setAns({});}};

  if(!ready){
    return(
      <div style={{minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",color:"#818cf8",fontFamily:"Inter,system-ui"}}>
        <div style={{textAlign:"center"}}><div style={{fontSize:34}}>∫</div><div style={{marginTop:10,fontSize:14}}>Loading your lesson...</div></div>
      </div>
    );
  }

  const sidebar=(
    <div style={{height:"100%",overflowY:"auto",padding:"18px 14px",fontFamily:"Inter,system-ui"}}>
      <button onClick={onBrand} title="Back to home" style={{display:"flex",alignItems:"center",gap:9,marginBottom:16,width:"100%",background:"transparent",border:"none",padding:0,cursor:"pointer",textAlign:"left"}}>
        <div style={{width:30,height:30,borderRadius:9,background:"linear-gradient(135deg,#818cf8,#6366f1 45%,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,color:"#fff",flexShrink:0,boxShadow:"0 4px 12px rgba(99,102,241,0.4), inset 0 1px 0 rgba(255,255,255,0.25)"}}>∫</div>
        <div style={{fontSize:17,fontWeight:800,color:"#f1f5f9",fontFamily:"'Bricolage Grotesque',Inter,sans-serif",letterSpacing:"-0.01em"}}>Lenamon Calculus</div>
      </button>
      <PB completed={done.size} total={L.length}/>
      {MODULES.map(mod=>{
        const modLessons=L.filter(l=>l.module===mod);
        const modDone=modLessons.filter(l=>done.has(L.indexOf(l))).length;
        return(
        <div key={mod} style={{marginBottom:16}}>
          <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",gap:8,marginBottom:6,paddingBottom:4,borderBottom:"1px solid rgba(99,102,241,0.14)"}}>
            <span style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#818cf8"}}>{mod}</span>
            <span style={{fontSize:9.5,fontWeight:700,color:modDone===modLessons.length?"#34d399":"#64748b"}}>{modDone}/{modLessons.length}</span>
          </div>
          {modLessons.map(l=>{
            const i=L.indexOf(l);
            const isDone=done.has(i);
            const isAct=i===idx;
            return(
              <div key={l.id} role="button" tabIndex={0} aria-current={isAct?"true":undefined} onClick={()=>{setIdx(i);setAns({});setSidebarOpen(false);}} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setIdx(i);setAns({});setSidebarOpen(false);}}} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 8px",marginBottom:2,borderRadius:8,cursor:"pointer",background:isAct?"linear-gradient(90deg,rgba(99,102,241,0.22),rgba(139,92,246,0.08))":"transparent",border:isAct?"1px solid rgba(129,140,248,0.3)":"1px solid transparent",transition:"background 0.15s,border 0.15s"}}>
                <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:700,flexShrink:0,background:isDone?"linear-gradient(135deg,#34d399,#10b981)":isAct?"linear-gradient(135deg,#818cf8,#6366f1)":"rgba(51,65,85,0.5)",color:isDone||isAct?"#fff":"#94a3b8",boxShadow:isDone||isAct?"inset 0 1px 0 rgba(255,255,255,0.25)":"none"}}>{isDone?<Ic d={ICONS.check} size={11} sw={3}/>:l.id}</div>
                <div style={{flex:1,fontSize:12,fontWeight:isAct?700:500,color:isAct?"#e0e7ff":"#94a3b8",lineHeight:1.3}}>{l.title}</div>
              </div>
            );
          })}
        </div>
      );})}
      <div style={{marginTop:6,paddingTop:12,borderTop:"1px solid rgba(99,102,241,0.12)"}}>
        <div role={allDone?"button":undefined} tabIndex={allDone?0:undefined} aria-disabled={!allDone}
          onClick={allDone?()=>{setOnCert(true);setSidebarOpen(false);}:undefined}
          onKeyDown={allDone?e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();setOnCert(true);setSidebarOpen(false);}}:undefined}
          style={{display:"flex",alignItems:"center",gap:8,padding:"8px 8px",borderRadius:6,cursor:allDone?"pointer":"default",opacity:allDone?1:0.65,background:onCert?"rgba(245,158,11,0.14)":"transparent",border:onCert?"1px solid rgba(245,158,11,0.32)":"1px solid transparent"}}>
          <div style={{width:22,height:22,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,background:allDone?"linear-gradient(135deg,#f6d365,#d9a520)":"rgba(51,65,85,0.55)"}}>
            {allDone?<span style={{fontSize:12,color:"#5a3c06",fontWeight:800}}>★</span>:<LockIcon size={12} color="#94a3b8"/>}
          </div>
          <div style={{flex:1}}>
            <div style={{fontSize:12,fontWeight:700,color:allDone?(onCert?"#fde68a":"#e2e8f0"):"#94a3b8",lineHeight:1.3}}>Certificate of Completion</div>
            {!allDone&&<div style={{fontSize:10.5,color:"#64748b",marginTop:1}}>Finish all {L.length} lessons to unlock</div>}
          </div>
        </div>
      </div>
    </div>
  );

  return(
    <div style={{height:"100vh",color:"#e2e8f0",fontFamily:"Inter,system-ui,-apple-system,sans-serif",display:"flex",overflow:"hidden"}}>
      <Celebrate trigger={burst}/>

      {/* Desktop sidebar */}
      <div style={{width:250,flexShrink:0,background:"#0b1120",borderRight:"1px solid rgba(99,102,241,0.12)",height:"100vh",overflowY:"auto",display:"none"}} className="sidebar-desktop">
        {sidebar}
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen&&(
        <MobileDrawer onClose={()=>setSidebarOpen(false)} restoreFocusRef={menuToggleRef} label="Lesson menu">
          {sidebar}
        </MobileDrawer>
      )}

      {/* Main content */}
      <div style={{flex:1,display:"flex",flexDirection:"column",height:"100vh",overflow:"hidden"}}>
        {/* Top header with nav */}
        <div style={{flexShrink:0,background:"rgba(10,14,26,0.72)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(148,163,184,0.10)",padding:"12px 28px"}}>
          <div style={{maxWidth:1220,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
            <div style={{display:"flex",alignItems:"center",gap:12,minWidth:0}}>
              <button ref={menuToggleRef} onClick={()=>setSidebarOpen(true)} className="sidebar-toggle" aria-label="Open lesson menu" style={{background:"rgba(99,102,241,0.12)",border:"1px solid rgba(99,102,241,0.25)",color:"#a5b4fc",padding:"8px 10px",borderRadius:9,cursor:"pointer",fontFamily:"Inter,system-ui",display:"none",alignItems:"center",justifyContent:"center",flexShrink:0}}><Ic d={ICONS.menu} size={16}/></button>
              <div style={{minWidth:0}}>
                <div style={{fontSize:10.5,color:"#818cf8",fontWeight:600,textTransform:"uppercase",letterSpacing:"0.07em",fontFamily:"Inter,system-ui"}}>
                  {onCert?"Lenamon Calculus":`Lesson ${lesson.id} of ${L.length} · ${lesson.module}`}
                </div>
                <h1 style={{fontSize:18,fontWeight:800,color:"#f1f5f9",whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",fontFamily:"'Bricolage Grotesque',Inter,sans-serif",letterSpacing:"-0.01em"}}>{onCert?"Certificate of Completion":lesson.title}</h1>
              </div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
              <div className="xp-chip" style={{display:"flex",alignItems:"center",gap:10,marginRight:6,padding:"6px 13px",background:"rgba(245,158,11,0.10)",border:"1px solid rgba(245,158,11,0.25)",borderRadius:999,fontFamily:"Inter,system-ui"}}>
                <span style={{fontSize:13,fontWeight:800,color:"#fbbf24"}}>Lv {level}</span>
                <span style={{width:1,height:14,background:"rgba(245,158,11,0.3)"}}/>
                <span style={{fontSize:12.5,fontWeight:700,color:"#fcd34d"}}>{xp} XP</span>
              </div>
              {onCert?(
                <button onClick={()=>setOnCert(false)} style={{background:"rgba(148,163,184,0.08)",border:"1px solid rgba(148,163,184,0.16)",color:"#cbd5e1",padding:"9px 16px",borderRadius:10,cursor:"pointer",fontSize:13,fontWeight:600,fontFamily:"Inter,system-ui",whiteSpace:"nowrap"}}>← Back to lessons</button>
              ):(<>
              <button disabled={idx===0} onClick={prev} aria-label="Previous lesson" style={{background:"rgba(148,163,184,0.08)",border:"1px solid rgba(148,163,184,0.16)",color:idx===0?"#334155":"#cbd5e1",padding:"9px 15px",borderRadius:10,cursor:idx===0?"default":"pointer",fontSize:13,fontWeight:600,fontFamily:"Inter,system-ui"}}>
                ←
              </button>
              <button onClick={next} disabled={nextDisabled} aria-label="Next lesson" style={{background:nextDisabled?"rgba(148,163,184,0.08)":(isLast&&allDone?"linear-gradient(135deg,#f6d365,#d9a520)":"linear-gradient(135deg,#6366f1,#8b5cf6)"),border:nextDisabled?"1px solid rgba(148,163,184,0.16)":"none",color:nextDisabled?"#64748b":(isLast&&allDone?"#3a2a06":"#fff"),padding:"9px 18px",borderRadius:10,cursor:nextDisabled?"default":"pointer",fontSize:13,fontWeight:700,fontFamily:"Inter,system-ui",boxShadow:nextDisabled?"none":"0 4px 14px rgba(99,102,241,0.3)",whiteSpace:"nowrap"}}>
                {nextLabel}
              </button>
              </>)}
              <span className="acct-divider" style={{width:1,height:22,background:"rgba(148,163,184,0.18)",margin:"0 4px"}}/>
              {session&&session.firstName&&<span className="acct-name" style={{fontSize:12.5,color:"#94a3b8",fontWeight:600,whiteSpace:"nowrap"}}>Hi, {session.firstName}</span>}
              <button onClick={onSignOut} style={{background:"rgba(148,163,184,0.08)",border:"1px solid rgba(148,163,184,0.16)",color:"#cbd5e1",padding:"8px 13px",borderRadius:10,cursor:"pointer",fontSize:12.5,fontWeight:600,fontFamily:"Inter,system-ui",whiteSpace:"nowrap"}}>Sign out</button>
            </div>
          </div>
        </div>

        {/* Lesson content - this is the only thing that scrolls */}
        <div ref={contentRef} style={{flex:1,overflowY:"auto"}}>
          {onCert?(
            <Certificate fullName={fullName} dateStr={certDate} onPrint={()=>window.print()}/>
          ):(
          <div className="lesson-grid" style={{maxWidth:1220,margin:"0 auto",padding:"34px 40px 110px",display:"grid",gridTemplateColumns:"minmax(0,1fr) 280px",gap:52,alignItems:"start"}}>
            <div key={idx} className="lesson-fade" style={{minWidth:0,maxWidth:780,margin:"0 auto",width:"100%"}}>
              <LessonErrorBoundary>
                {lesson.content.map((item,i)=>(
                  <CC key={`${idx}-${i}`} id={`blk-${idx}-${i}`} item={item} showAnswer={!!ans[`${idx}-${i}`]} onToggle={()=>toggle(i)}/>
                ))}
                {hasQuiz&&<Quiz key={`quiz-${idx}`} quiz={lessonQuiz} passed={passed} onPass={passQuiz}/>}
              </LessonErrorBoundary>
            </div>
            <aside className="lesson-rail" style={{position:"sticky",top:0,alignSelf:"start",fontFamily:"Inter,system-ui",display:"flex",flexDirection:"column",gap:14}}>
              <div style={{background:"rgba(255,255,255,0.022)",border:"1px solid rgba(148,163,184,0.10)",borderRadius:16,padding:"16px 18px"}}>
                <div style={{fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:"#94a3b8",marginBottom:12}}>On this page</div>
                {lesson.content.map((item,i)=>{
                  const c=tc[item.type];
                  const go=()=>{const el=document.getElementById(`blk-${idx}-${i}`);if(el)el.scrollIntoView({behavior:scrollBehavior,block:"start"});};
                  return(
                    <div key={i} role="button" tabIndex={0} onClick={go} onKeyDown={e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}}}
                      style={{display:"flex",alignItems:"center",gap:9,padding:"7px 8px",borderRadius:8,cursor:"pointer",marginBottom:1}}
                      onMouseEnter={e=>e.currentTarget.style.background="rgba(148,163,184,0.08)"}
                      onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <span style={{width:7,height:7,borderRadius:"50%",background:c.border,flexShrink:0}}/>
                      <span style={{fontSize:13,color:"#cbd5e1",fontWeight:500}}>{item.label||c.label}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{background:"linear-gradient(160deg,rgba(99,102,241,0.14),rgba(139,92,246,0.05))",border:"1px solid rgba(129,140,248,0.22)",borderTop:"1px solid rgba(165,180,252,0.3)",borderRadius:16,padding:"16px 18px"}}>
                <div style={{fontSize:9.5,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#a5b4fc",marginBottom:8}}>A little inspiration</div>
                <div style={{fontSize:13,fontWeight:700,color:"#c7d2fe",marginBottom:6}}>{(INSPO[idx]||INSPO[0]).t}</div>
                <div style={{fontSize:13,lineHeight:1.75,color:"#b6c0d2",fontFamily:"'Source Serif 4',Georgia,serif"}}>{(INSPO[idx]||INSPO[0]).b}</div>
              </div>
              <div style={{padding:"4px 4px 0"}}>
                <div style={{fontSize:11,color:"#64748b",marginBottom:6,fontWeight:600}}>Course progress</div>
                <PB completed={done.size} total={L.length}/>
              </div>
            </aside>
          </div>
          )}
        </div>
      </div>

    </div>
  );
}

// ---------- Shared styles for the landing / auth / admin screens ----------
const DISPLAY="'Bricolage Grotesque',Inter,sans-serif";
const SCREEN_BG={height:"100vh",overflowY:"auto",color:"#e2e8f0",fontFamily:"Inter,system-ui,-apple-system,sans-serif"};
const BTN_PRIMARY={background:"linear-gradient(135deg,#818cf8,#6366f1 45%,#8b5cf6)",color:"#fff",border:"none",padding:"13px 24px",borderRadius:12,cursor:"pointer",fontSize:14.5,fontWeight:700,fontFamily:"Inter,system-ui",boxShadow:"0 8px 28px rgba(99,102,241,0.38), inset 0 1px 0 rgba(255,255,255,0.18)",whiteSpace:"nowrap"};
const BTN_GHOST={background:"rgba(148,163,184,0.07)",color:"#dbe2ee",border:"1px solid rgba(148,163,184,0.22)",padding:"13px 22px",borderRadius:12,cursor:"pointer",fontSize:14.5,fontWeight:600,fontFamily:"Inter,system-ui",whiteSpace:"nowrap",backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)"};
const LINKBTN={background:"transparent",border:"none",color:"#a5b4fc",cursor:"pointer",fontWeight:700,fontSize:13.5,fontFamily:"Inter,system-ui",padding:0};
const TH={padding:"14px 18px",fontSize:11.5,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.05em"};
const TD={padding:"13px 18px"};
const MODULE_BLURB={
  "Foundations":"Functions, lines, exponentials, and logs - the language everything else is written in.",
  "Limits & Continuity":"What it means for a function to head toward a value, and when it actually arrives.",
  "Derivatives":"The rate of change: slopes of curves, the rules, and what \"marginal\" means in business.",
  "Applications of Derivatives":"Find peaks, valleys, and the single best choice using optimization.",
  "Integration":"Add up infinitely many tiny pieces, and the theorem that ties calculus together.",
  "Business Applications":"Area between curves, consumer and producer surplus, and present value.",
};

function Brand({onClick,size=22}){
  return(
    <button onClick={onClick} title={onClick?"Back to home":undefined} style={{display:"flex",alignItems:"center",gap:10,background:"transparent",border:"none",cursor:onClick?"pointer":"default",padding:0,fontFamily:DISPLAY}}>
      <span style={{width:size+12,height:size+12,borderRadius:9,background:"linear-gradient(135deg,#818cf8,#6366f1 45%,#8b5cf6)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:size,color:"#fff",flexShrink:0,boxShadow:"0 4px 14px rgba(99,102,241,0.42), inset 0 1px 0 rgba(255,255,255,0.25)"}}>∫</span>
      <span style={{fontSize:size-3,fontWeight:800,color:"#f1f5f9",letterSpacing:"-0.01em"}}>Lenamon Calculus</span>
    </button>
  );
}

function Field({label,type,value,onChange,placeholder,autoFocus}){
  return(
    <label style={{display:"block",marginBottom:14}}>
      <span style={{display:"block",fontSize:12.5,fontWeight:700,color:"#cbd5e1",marginBottom:6}}>{label}</span>
      <input type={type||"text"} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} autoFocus={autoFocus}
        style={{width:"100%",boxSizing:"border-box",background:"rgba(8,11,20,0.6)",border:"1px solid rgba(148,163,184,0.2)",borderRadius:11,padding:"12px 14px",color:"#f1f5f9",fontSize:15,fontFamily:"Inter,system-ui",outline:"none"}}/>
    </label>
  );
}

const MODULE_HUES=["#818cf8","#22d3ee","#a78bfa","#f472b6","#34d399","#fbbf24"];
function LandingPage({loggedIn,userName,onCreate,onSignIn,onContinue,onAdmin,onSignOut}){
  const modules=MODULES.map(m=>({name:m,count:L.filter(l=>l.module===m).length}));
  const feature=(icon,title,body)=>(
    <div className="card-h" style={{background:"linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))",border:"1px solid rgba(255,255,255,0.07)",borderRadius:18,padding:"26px 24px"}}>
      <div style={{width:40,height:40,borderRadius:12,background:"linear-gradient(135deg,rgba(129,140,248,0.2),rgba(139,92,246,0.12))",border:"1px solid rgba(129,140,248,0.3)",display:"flex",alignItems:"center",justifyContent:"center",color:"#a5b4fc",marginBottom:16}}><Ic d={icon} size={19} sw={2}/></div>
      <div style={{fontSize:17,fontWeight:800,color:"#f1f5f9",marginBottom:8,fontFamily:DISPLAY}}>{title}</div>
      <div style={{fontSize:14.5,lineHeight:1.7,color:"#a5b0c2"}}>{body}</div>
    </div>
  );
  const stat=(big,small)=>(
    <div style={{textAlign:"center",minWidth:110}}>
      <div style={{fontSize:32,fontWeight:800,fontFamily:DISPLAY,lineHeight:1,background:"linear-gradient(135deg,#c7d2fe,#818cf8 55%,#a78bfa)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent"}}>{big}</div>
      <div style={{fontSize:12.5,color:"#94a3b8",marginTop:7,fontWeight:600,letterSpacing:"0.02em"}}>{small}</div>
    </div>
  );
  return(
    <div style={SCREEN_BG}>
      <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(7,10,20,0.7)",backdropFilter:"blur(14px)",WebkitBackdropFilter:"blur(14px)",borderBottom:"1px solid rgba(148,163,184,0.10)"}}>
        <div style={{maxWidth:1140,margin:"0 auto",padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <Brand/>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            {loggedIn?(<>
              <span style={{fontSize:13,color:"#94a3b8",fontWeight:600}}>Hi, {userName||"learner"}</span>
              <button onClick={onContinue} style={{...BTN_PRIMARY,padding:"11px 20px"}}>Continue learning →</button>
              <button onClick={onSignOut} style={{...BTN_GHOST,padding:"11px 16px"}}>Sign out</button>
            </>):(<>
              <button onClick={onSignIn} style={{...BTN_GHOST,padding:"11px 18px"}}>Sign in</button>
              <button onClick={onCreate} style={{...BTN_PRIMARY,padding:"11px 20px"}}>Create account</button>
            </>)}
          </div>
        </div>
      </div>

      <div style={{position:"relative",overflow:"hidden"}}>
        <div className="orb-a" aria-hidden="true" style={{position:"absolute",top:-120,left:"12%",width:420,height:420,borderRadius:"50%",background:"radial-gradient(circle,rgba(99,102,241,0.22),transparent 65%)",filter:"blur(30px)",pointerEvents:"none"}}/>
        <div className="orb-b" aria-hidden="true" style={{position:"absolute",top:40,right:"6%",width:380,height:380,borderRadius:"50%",background:"radial-gradient(circle,rgba(45,212,191,0.13),transparent 65%)",filter:"blur(30px)",pointerEvents:"none"}}/>
        <div style={{position:"relative",maxWidth:920,margin:"0 auto",padding:"92px 28px 64px",textAlign:"center"}}>
          <div style={{display:"inline-flex",alignItems:"center",gap:8,fontSize:12,fontWeight:700,letterSpacing:"0.08em",textTransform:"uppercase",color:"#a5b4fc",background:"rgba(99,102,241,0.10)",border:"1px solid rgba(99,102,241,0.25)",padding:"7px 15px",borderRadius:999,marginBottom:26,backdropFilter:"blur(6px)",WebkitBackdropFilter:"blur(6px)"}}><Ic d={ICONS.zap} size={12.5}/>Business calculus, from absolute zero</div>
          <h1 style={{fontSize:"clamp(36px,6.4vw,66px)",lineHeight:1.06,fontWeight:800,color:"#f8fafc",fontFamily:DISPLAY,letterSpacing:"-0.025em",margin:0}}>
            Calculus is not hard.<br/>
            <span style={{fontFamily:"'Source Serif 4',Georgia,serif",fontStyle:"italic",fontWeight:600,background:"linear-gradient(100deg,#a5b4fc,#c4b5fd 55%,#67e8f9)",WebkitBackgroundClip:"text",backgroundClip:"text",WebkitTextFillColor:"transparent",color:"transparent"}}>It was just explained badly.</span>
          </h1>
          <p style={{fontSize:"clamp(16px,2.4vw,19px)",lineHeight:1.7,color:"#aeb8c8",maxWidth:640,margin:"24px auto 0"}}>An interactive course that builds every idea from the ground up and assumes nothing. If you can do basic arithmetic, you can start today. Free, and made to be understood by anyone of any age.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap",marginTop:36}}>
            {loggedIn?(
              <button onClick={onContinue} style={{...BTN_PRIMARY,padding:"14px 28px",fontSize:15}}>Continue learning →</button>
            ):(<>
              <button onClick={onCreate} style={{...BTN_PRIMARY,padding:"14px 28px",fontSize:15}}>Create your free account</button>
              <button onClick={onSignIn} style={{...BTN_GHOST,padding:"14px 26px",fontSize:15}}>I already have an account</button>
            </>)}
          </div>
          <div style={{display:"flex",gap:18,justifyContent:"center",flexWrap:"wrap",marginTop:22,fontSize:13,color:"#7c8aa0",fontWeight:600}}>
            <span>Free forever</span><span style={{color:"#3d4a61"}}>·</span><span>No prerequisites</span><span style={{color:"#3d4a61"}}>·</span><span>Certificate on completion</span>
          </div>
        </div>
      </div>

      <div style={{maxWidth:800,margin:"0 auto",padding:"0 28px"}}>
        <div style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:24,padding:"28px 24px",background:"linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,boxShadow:"0 14px 40px rgba(2,4,12,0.4)"}}>
          {stat(L.length,"Lessons")}
          {stat(MODULES.length,"Modules")}
          {stat("Live","Interactive labs")}
          {stat("Free","Always")}
        </div>
      </div>

      <div style={{maxWidth:840,margin:"0 auto",padding:"80px 28px 0",textAlign:"center"}}>
        <div style={{fontSize:12,fontWeight:700,letterSpacing:"0.1em",textTransform:"uppercase",color:"#818cf8",marginBottom:14}}>The one rule this course follows</div>
        <p style={{fontFamily:"'Source Serif 4',Georgia,serif",fontSize:"clamp(20px,3.2vw,28px)",lineHeight:1.55,color:"#e3e9f4",maxWidth:720,margin:"0 auto",fontWeight:400}}>
          "Never state a fact without explaining <em style={{color:"#c4b5fd"}}>why</em> it is true, in terms you already understand."
        </p>
        <p style={{fontSize:16,lineHeight:1.8,color:"#9aa7ba",maxWidth:660,margin:"18px auto 0"}}>No skipped steps, no silent assumptions, no "you should already know this." You will learn why you cannot divide by zero, why the chain rule multiplies, and why an integral measures area, not just the rules.</p>
      </div>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"50px 28px 0",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18}}>
        {feature(ICONS.sliders,"Interactive labs","Drag a point along a curve and watch the tangent line and live slope change. Reshape a function with a slider and see the equation update in real time.")}
        {feature(ICONS.steps,"Worked, step by step","Every example shows the full algebra, including the sign traps and the lines most textbooks skip. Then you try one yourself with a complete solution.")}
        {feature(ICONS.award,"Progress that sticks","Earn XP, level up, and celebrate each finished lesson. Your place is saved automatically, and finishing all 25 lessons unlocks a printable certificate.")}
      </div>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"80px 28px 0"}}>
        <h2 style={{fontSize:"clamp(26px,4vw,38px)",fontWeight:800,color:"#f1f5f9",fontFamily:DISPLAY,letterSpacing:"-0.01em",textAlign:"center",margin:"0 0 8px"}}>What you will learn</h2>
        <p style={{fontSize:15,color:"#94a3b8",textAlign:"center",margin:"0 0 30px"}}>{L.length} lessons across {MODULES.length} modules, building from the basics to real business applications.</p>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:16}}>
          {modules.map((m,i)=>{
            const hue=MODULE_HUES[i%MODULE_HUES.length];
            return(
            <div key={m.name} className="card-h" style={{display:"flex",gap:16,background:"linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))",border:"1px solid rgba(255,255,255,0.07)",borderRadius:16,padding:"20px 22px"}}>
              <div style={{width:38,height:38,flexShrink:0,borderRadius:11,background:`${hue}1c`,border:`1px solid ${hue}45`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16,fontWeight:800,color:hue,fontFamily:DISPLAY}}>{i+1}</div>
              <div>
                <div style={{fontSize:16,fontWeight:800,color:"#f1f5f9",fontFamily:DISPLAY}}>{m.name}</div>
                <div style={{fontSize:11.5,color:hue,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.06em",margin:"3px 0 7px"}}>{m.count} lessons</div>
                <div style={{fontSize:14,lineHeight:1.6,color:"#a5b0c2"}}>{MODULE_BLURB[m.name]}</div>
              </div>
            </div>
          );})}
        </div>
      </div>

      <div style={{maxWidth:1040,margin:"0 auto",padding:"80px 28px 20px"}}>
        <div style={{position:"relative",overflow:"hidden",textAlign:"center",padding:"54px 28px",borderRadius:24,background:"linear-gradient(160deg,rgba(99,102,241,0.18),rgba(139,92,246,0.07))",border:"1px solid rgba(129,140,248,0.28)",borderTop:"1px solid rgba(165,180,252,0.4)",boxShadow:"0 20px 60px rgba(2,4,12,0.45)"}}>
          <div aria-hidden="true" style={{position:"absolute",top:-90,left:"50%",transform:"translateX(-50%)",width:520,height:220,borderRadius:"50%",background:"radial-gradient(ellipse,rgba(129,140,248,0.28),transparent 70%)",filter:"blur(24px)",pointerEvents:"none"}}/>
          <h2 style={{position:"relative",fontSize:"clamp(24px,4vw,34px)",fontWeight:800,color:"#f8fafc",fontFamily:DISPLAY,margin:0}}>Ready to start?</h2>
          <p style={{position:"relative",fontSize:16,color:"#b6c0d2",margin:"14px auto 26px",maxWidth:520}}>Create a free account with your name and email. That is all it takes.</p>
          {loggedIn?(
            <button onClick={onContinue} style={{...BTN_PRIMARY,position:"relative"}}>Continue learning →</button>
          ):(
            <button onClick={onCreate} style={{...BTN_PRIMARY,position:"relative"}}>Create your free account</button>
          )}
        </div>
      </div>

      <div style={{maxWidth:1040,margin:"40px auto 0",padding:"30px 28px 50px",borderTop:"1px solid rgba(148,163,184,0.08)",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <span style={{fontSize:13,color:"#64748b"}}>Lenamon Calculus - learn calculus the honest way.</span>
        <button onClick={onAdmin} style={{background:"transparent",border:"none",color:"#475569",fontSize:12.5,cursor:"pointer",fontFamily:"Inter,system-ui",fontWeight:600}}>Admin</button>
      </div>
    </div>
  );
}

function AuthScreen({mode,onSignup,onSignin,onAdmin,onBack,goSignup,goSignin}){
  const[firstName,setFirstName]=useState("");
  const[lastName,setLastName]=useState("");
  const[email,setEmail]=useState("");
  const[username,setUsername]=useState("");
  const[password,setPassword]=useState("");
  const[error,setError]=useState("");
  const titles={signup:"Create your account",signin:"Welcome back",admin:"Admin sign in"};
  const subs={signup:"Just your name and email - no password needed.",signin:"Enter the email you signed up with.",admin:"Restricted access for course administrators."};
  const submit=(e)=>{
    e.preventDefault();
    let err;
    if(mode==="signup") err=onSignup({firstName,lastName,email});
    else if(mode==="signin") err=onSignin(email);
    else err=onAdmin(username,password);
    if(err) setError(err);
  };
  return(
    <div style={{...SCREEN_BG,display:"flex",flexDirection:"column"}}>
      <div style={{padding:"22px 28px"}}><Brand onClick={onBack} size={20}/></div>
      <div style={{flex:1,display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"10px 20px 60px"}}>
        <form onSubmit={submit} className="lesson-fade" style={{width:"100%",maxWidth:420,background:"linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.018))",border:"1px solid rgba(255,255,255,0.09)",borderTop:"1px solid rgba(255,255,255,0.14)",borderRadius:20,padding:"32px 30px",marginTop:"4vh",boxShadow:"0 20px 50px rgba(2,4,12,0.45)"}}>
          <h1 style={{fontSize:25,fontWeight:800,color:"#f8fafc",fontFamily:DISPLAY,margin:"0 0 6px"}}>{titles[mode]}</h1>
          <p style={{fontSize:14,color:"#94a3b8",margin:"0 0 22px"}}>{subs[mode]}</p>

          {mode==="signup"&&(<>
            <div style={{display:"flex",gap:12}}>
              <div style={{flex:1}}><Field label="First name" value={firstName} onChange={v=>{setFirstName(v);setError("");}} placeholder="Ada" autoFocus/></div>
              <div style={{flex:1}}><Field label="Last name" value={lastName} onChange={v=>{setLastName(v);setError("");}} placeholder="Lovelace"/></div>
            </div>
            <Field label="Email" type="email" value={email} onChange={v=>{setEmail(v);setError("");}} placeholder="you@example.com"/>
          </>)}

          {mode==="signin"&&(
            <Field label="Email" type="email" value={email} onChange={v=>{setEmail(v);setError("");}} placeholder="you@example.com" autoFocus/>
          )}

          {mode==="admin"&&(<>
            <Field label="Username" value={username} onChange={v=>{setUsername(v);setError("");}} placeholder="user" autoFocus/>
            <Field label="Password" type="password" value={password} onChange={v=>{setPassword(v);setError("");}} placeholder="password"/>
          </>)}

          {error&&<div style={{fontSize:13.5,color:"#fca5a5",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.22)",borderRadius:10,padding:"10px 12px",marginBottom:14}}>{error}</div>}

          <button type="submit" style={{...BTN_PRIMARY,width:"100%",padding:"13px",marginTop:4}}>
            {mode==="signup"?"Create account":mode==="signin"?"Sign in":"Enter dashboard"}
          </button>

          {mode!=="admin"&&(
            <div style={{textAlign:"center",marginTop:18,fontSize:13.5,color:"#94a3b8"}}>
              {mode==="signup"?(<>Already have an account? <button type="button" onClick={goSignin} style={LINKBTN}>Sign in</button></>):(<>New here? <button type="button" onClick={goSignup} style={LINKBTN}>Create an account</button></>)}
            </div>
          )}
          <div style={{textAlign:"center",marginTop:12}}>
            <button type="button" onClick={onBack} style={{...LINKBTN,color:"#64748b"}}>← Back to home</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export function AdminDashboard({onEnterCourse,onSignOut,onBrand}){
  const[users,setUsers]=useState(()=>loadUsers());
  const[editing,setEditing]=useState(null);     // email currently being edited
  const[form,setForm]=useState({firstName:"",lastName:"",email:""});
  const[confirmDel,setConfirmDel]=useState(null); // email pending delete confirm
  const[err,setErr]=useState("");
  const fmt=(iso)=>{try{return new Date(iso).toLocaleDateString(undefined,{year:"numeric",month:"short",day:"numeric"});}catch(e){return iso;}};
  const persist=(list)=>{saveUsers(list);setUsers(list);};

  const startEdit=(u)=>{setEditing(u.email);setForm({firstName:u.firstName,lastName:u.lastName,email:u.email});setErr("");setConfirmDel(null);};
  const cancelEdit=()=>{setEditing(null);setErr("");};
  const saveEdit=(orig)=>{
    const fn=form.firstName.trim(),ln=form.lastName.trim(),em=form.email.trim().toLowerCase();
    if(!fn||!ln){setErr("First and last name are required.");return;}
    if(!validEmail(em)){setErr("Enter a valid email address.");return;}
    if(em!==orig&&users.some(u=>u.email===em)){setErr("Another account already uses that email.");return;}
    if(em!==orig){try{const v=localStorage.getItem(SAVE_KEY+"::"+orig);if(v!=null){localStorage.setItem(SAVE_KEY+"::"+em,v);localStorage.removeItem(SAVE_KEY+"::"+orig);}}catch(e){console.warn("Could not migrate saved progress to the new email:",e);}}
    persist(users.map(u=>u.email===orig?{...u,firstName:fn,lastName:ln,email:em}:u));
    setEditing(null);setErr("");
  };
  const doDelete=(email)=>{
    try{localStorage.removeItem(SAVE_KEY+"::"+email);}catch(e){console.warn("Could not remove deleted user's saved progress:",e);}
    persist(users.filter(u=>u.email!==email));
    setConfirmDel(null);
  };

  const inputStyle={width:"100%",boxSizing:"border-box",background:"rgba(8,11,20,0.6)",border:"1px solid rgba(148,163,184,0.25)",borderRadius:8,padding:"7px 10px",color:"#f1f5f9",fontSize:13.5,fontFamily:"Inter,system-ui",outline:"none"};
  const sbtn=(bg,col,bd)=>({background:bg,color:col,border:bd||"none",padding:"6px 12px",borderRadius:8,cursor:"pointer",fontSize:12.5,fontWeight:600,fontFamily:"Inter,system-ui",whiteSpace:"nowrap"});

  return(
    <div style={SCREEN_BG}>
      <div style={{position:"sticky",top:0,zIndex:10,background:"rgba(10,14,26,0.72)",backdropFilter:"blur(12px)",WebkitBackdropFilter:"blur(12px)",borderBottom:"1px solid rgba(148,163,184,0.10)"}}>
        <div style={{maxWidth:1080,margin:"0 auto",padding:"14px 28px",display:"flex",alignItems:"center",justifyContent:"space-between",gap:16}}>
          <Brand onClick={onBrand}/>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <button onClick={onEnterCourse} style={{...BTN_GHOST,padding:"10px 16px"}}>Enter course</button>
            <button onClick={onSignOut} style={{...BTN_PRIMARY,padding:"10px 18px"}}>Sign out</button>
          </div>
        </div>
      </div>
      <div style={{maxWidth:1080,margin:"0 auto",padding:"40px 28px 60px"}}>
        <div style={{display:"flex",alignItems:"baseline",justifyContent:"space-between",flexWrap:"wrap",gap:10,marginBottom:6}}>
          <h1 style={{fontSize:28,fontWeight:800,color:"#f8fafc",fontFamily:DISPLAY,margin:0}}>Registered users</h1>
          <span style={{fontSize:13,color:"#94a3b8",fontWeight:600}}>Admin dashboard (temporary)</span>
        </div>
        <p style={{fontSize:14.5,color:"#94a3b8",margin:"0 0 22px"}}>{users.length} {users.length===1?"account":"accounts"} so far. You can edit a name or email, or delete an account.</p>

        {users.length===0?(
          <div style={{padding:"48px 24px",textAlign:"center",background:"rgba(255,255,255,0.022)",border:"1px dashed rgba(148,163,184,0.2)",borderRadius:18,color:"#94a3b8",fontSize:15}}>No accounts yet. New sign-ups will appear here.</div>
        ):(
          <div style={{overflowX:"auto",background:"linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.015))",border:"1px solid rgba(255,255,255,0.08)",borderRadius:18,boxShadow:"0 14px 40px rgba(2,4,12,0.35)"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:14,minWidth:680}}>
              <thead>
                <tr style={{color:"#94a3b8"}}>
                  <th style={{...TH,textAlign:"left"}}>#</th><th style={{...TH,textAlign:"left"}}>First name</th><th style={{...TH,textAlign:"left"}}>Last name</th><th style={{...TH,textAlign:"left"}}>Email</th><th style={{...TH,textAlign:"left"}}>Signed up</th><th style={{...TH,textAlign:"right"}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u,i)=>{
                  const isEdit=editing===u.email;
                  return(
                  <tr key={u.email} style={{borderTop:"1px solid rgba(148,163,184,0.08)"}}>
                    <td style={{...TD,color:"#64748b"}}>{i+1}</td>
                    {isEdit?(<>
                      <td style={TD}><input aria-label="First name" style={inputStyle} value={form.firstName} onChange={e=>{setForm({...form,firstName:e.target.value});setErr("");}}/></td>
                      <td style={TD}><input aria-label="Last name" style={inputStyle} value={form.lastName} onChange={e=>{setForm({...form,lastName:e.target.value});setErr("");}}/></td>
                      <td style={TD}><input aria-label="Email" style={inputStyle} value={form.email} onChange={e=>{setForm({...form,email:e.target.value});setErr("");}}/></td>
                      <td style={{...TD,color:"#94a3b8"}}>{fmt(u.createdAt)}</td>
                      <td style={{...TD,textAlign:"right",whiteSpace:"nowrap"}}>
                        <button onClick={()=>saveEdit(u.email)} style={sbtn("linear-gradient(135deg,#6366f1,#8b5cf6)","#fff")}>Save</button>
                        <button onClick={cancelEdit} style={{...sbtn("rgba(148,163,184,0.08)","#cbd5e1","1px solid rgba(148,163,184,0.2)"),marginLeft:6}}>Cancel</button>
                      </td>
                    </>):(<>
                      <td style={{...TD,color:"#f1f5f9",fontWeight:600}}>{u.firstName}</td>
                      <td style={{...TD,color:"#f1f5f9",fontWeight:600}}>{u.lastName}</td>
                      <td style={{...TD,color:"#a5b0c2"}}>{u.email}</td>
                      <td style={{...TD,color:"#94a3b8"}}>{fmt(u.createdAt)}</td>
                      <td style={{...TD,textAlign:"right",whiteSpace:"nowrap"}}>
                        {confirmDel===u.email?(<>
                          <span style={{fontSize:12.5,color:"#fca5a5",marginRight:8}}>Delete?</span>
                          <button onClick={()=>doDelete(u.email)} style={sbtn("#ef4444","#fff")}>Confirm</button>
                          <button onClick={()=>setConfirmDel(null)} style={{...sbtn("rgba(148,163,184,0.08)","#cbd5e1","1px solid rgba(148,163,184,0.2)"),marginLeft:6}}>Cancel</button>
                        </>):(<>
                          <button onClick={()=>startEdit(u)} style={sbtn("rgba(99,102,241,0.12)","#a5b4fc","1px solid rgba(99,102,241,0.3)")}>Edit</button>
                          <button onClick={()=>{setConfirmDel(u.email);setEditing(null);}} style={{...sbtn("rgba(239,68,68,0.1)","#fca5a5","1px solid rgba(239,68,68,0.3)"),marginLeft:6}}>Delete</button>
                        </>)}
                      </td>
                    </>)}
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        )}
        {err&&<div style={{marginTop:14,fontSize:13.5,color:"#fca5a5",background:"rgba(239,68,68,0.08)",border:"1px solid rgba(239,68,68,0.22)",borderRadius:10,padding:"10px 14px"}}>{err}</div>}
      </div>
    </div>
  );
}

export default function App(){
  const[session,setSession]=useState(loadSession());
  // Resume where a returning user left off: a restored session lands on its
  // content view (course or admin) instead of the landing page on reload.
  const[view,setView]=useState(session?(session.role==="admin"?"admin":"course"):"landing");
  useEffect(()=>{saveSession(session);},[session]);

  const handleSignup=({firstName,lastName,email})=>{
    const fn=(firstName||"").trim(),ln=(lastName||"").trim(),em=(email||"").trim().toLowerCase();
    if(!fn||!ln) return "Please enter both your first and last name.";
    if(!validEmail(em)) return "Please enter a valid email address.";
    if(findUser(em)) return "That email already has an account. Try signing in instead.";
    const users=loadUsers();
    users.push({firstName:fn,lastName:ln,email:em,createdAt:new Date().toISOString()});
    if(!saveUsers(users)) return "We could not save your account on this device. Your browser storage may be full or disabled - free up space or try another browser, then try again.";
    setSession({role:"user",email:em,firstName:fn,lastName:ln});
    setView("course");
    return null;
  };
  const handleSignin=(email)=>{
    const em=(email||"").trim().toLowerCase();
    if(!validEmail(em)) return "Please enter a valid email address.";
    const u=findUser(em);
    if(!u) return "No account found for that email. Create one to get started.";
    setSession({role:"user",email:u.email,firstName:u.firstName,lastName:u.lastName});
    setView("course");
    return null;
  };
  const handleAdmin=(username,password)=>{
    if(username===ADMIN_USER&&password===ADMIN_PASS){setSession({role:"admin"});setView("admin");return null;}
    return "Incorrect admin username or password.";
  };
  const signOut=()=>{setSession(null);setView("landing");};
  const goHome=()=>setView("landing");
  const continueLearning=()=>setView(session&&session.role==="admin"?"admin":"course");

  if(view==="signup"||view==="signin"||view==="adminlogin"){
    return <AuthScreen mode={view==="signup"?"signup":view==="signin"?"signin":"admin"} onSignup={handleSignup} onSignin={handleSignin} onAdmin={handleAdmin} onBack={goHome} goSignup={()=>setView("signup")} goSignin={()=>setView("signin")}/>;
  }
  if(view==="admin"&&session&&session.role==="admin"){
    return <AdminDashboard onEnterCourse={()=>setView("course")} onSignOut={signOut} onBrand={goHome}/>;
  }
  if(view==="course"&&session){
    return <Course key={session.role==="admin"?"admin":session.email} session={session} onSignOut={signOut} onBrand={goHome}/>;
  }
  return <LandingPage loggedIn={!!session} userName={session&&session.firstName} onCreate={()=>setView("signup")} onSignIn={()=>setView("signin")} onContinue={continueLearning} onAdmin={()=>setView("adminlogin")} onSignOut={signOut}/>;
}
