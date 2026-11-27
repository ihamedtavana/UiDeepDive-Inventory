/**
 * Stock Box — Figma component "Stock Box" (node 6006:87028).
 *
 * A carton with 24 slots that fill from the bottom-left.
 *   dark   = on hand        orange = this delivery
 *   green  = saved          red    = does not fit
 *
 * States (same names as the Figma variants):
 *   empty | filling | full | over | saving | success | error
 *
 * Geometry is the Figma frame (216 × 156) so every part lines up with the
 * design; pass `width` to scale it (the panel uses 237.6, 182.8 and 228.5).
 */

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { BIN_CAPACITY as CAPACITY } from './stockInventory';
import s from "./StockBox.module.css";

export type StockBoxState = "empty" | "filling" | "full" | "over" | "saving" | "success" | "error";
export type StockBoxPose = 'half-open' | 'units-above' | 'hop';
type SlotKind = "free" | "have" | "add" | "ok";

const W = 216;
const H = 156;

/* Prototype → frame mapping (the carton was drawn on a 252 × 182 grid). */
const SC = 6 / 7;
const X = (x: number) => (x + 16) * SC;
const Y = (y: number) => y * SC;
const poly = (pts: number[][]) => pts.map(([x, y]) => `${X(x).toFixed(2)},${Y(y).toFixed(2)}`).join(" ");

function flapPoints(left: number, right: number) {
  const l = left * 125 * Math.PI / 180;
  const r = right * 125 * Math.PI / 180;
  return {
    left: poly([[40, 84], [52, 64], [52 + 58 * Math.cos(l), 64 - 40 * Math.sin(l)], [40 + 70 * Math.cos(l), 84 - 40 * Math.sin(l)]]),
    right: poly([[180, 84], [168, 64], [168 - 58 * Math.cos(r), 64 - 40 * Math.sin(r)], [180 - 70 * Math.cos(r), 84 - 40 * Math.sin(r)]]),
  };
}
const backPoints = (b: number) => poly([[52, 64], [168, 64], [168 - 7 * b, 64 - 30 * b], [52 + 7 * b, 64 - 30 * b]]);
const OPENING = poly([[40, 84], [52, 64], [168, 64], [180, 84]]);

/* Face and slot grid (frame coordinates). */
const FACE = { x: 48, y: 72, w: 120, h: 72, r: 10 };
const SLOT = { w: 15, h: 11, r: 3, gap: 3, x0: FACE.x + 7.5, y0: FACE.y + 9.5 };
const slotXY = (i: number) => {
  const col = i % 6;
  const rowFromBottom = Math.floor(i / 6);
  return { x: SLOT.x0 + col * (SLOT.w + SLOT.gap), y: SLOT.y0 + (3 - rowFromBottom) * (SLOT.h + SLOT.gap) };
};

/* Units that fall in, and the extra units that bounce on the rim. */
const PARCEL_X = [108, 74, 142, 91, 125];
const PARCEL_R = [14, -18, 20, -10, -16];
const AIRBORNE_PARCELS = [
  { x: 74, y: 15, angle: 18 },
  { x: 91, y: 4, angle: 10 },
  { x: 108, y: 8, angle: -14 },
  { x: 125, y: 18, angle: 16 },
  { x: 142, y: 11, angle: -20 },
];
const PILE = [
  { x: 85.7, y: 62.6, r: 10 },
  { x: 108, y: 58.3, r: -6 },
  { x: 130.3, y: 63.4, r: -14 },
];

const FACE_PATH = `M${FACE.x} ${FACE.y}H${FACE.x + FACE.w}V${FACE.y + FACE.h - FACE.r}a${FACE.r} ${FACE.r} 0 0 1 -${FACE.r} ${FACE.r}H${FACE.x + FACE.r}a${FACE.r} ${FACE.r} 0 0 1 -${FACE.r} -${FACE.r}Z`;
const TAPE_PATH = "M102 54.86H114L115.71 72V85.71L111.86 83.14L108 85.71L104.14 83.14L100.29 85.71V72Z";

/* ------------------------------------------------------------ easing + tween */
const ease = {
  back: (t: number) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  inOut: (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
};

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)';
  const [reduce, setReduce] = useState(() => window.matchMedia?.(query).matches ?? false);
  useEffect(() => {
    const mq = window.matchMedia?.(query);
    if (!mq) return;
    setReduce(mq.matches);
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduce;
}

/** Animates a number toward `target`; interruptible, never queues. */
function useTween(target: number, duration: number, easing: (t: number) => number, delay: number, reduce: boolean, initial: number) {
  const [v, setV] = useState(initial);
  const cur = useRef(initial);
  useEffect(() => {
    if (cur.current === target) return;
    if (reduce) { cur.current = target; setV(target); return; }
    const from = cur.current;
    let raf = 0;
    let start = 0;
    const tick = (now: number) => {
      if (!start) start = now + delay;
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      cur.current = from + (target - from) * easing(p);
      setV(cur.current);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, delay, duration, easing, reduce]);
  return v;
}

/* ------------------------------------------------------------ component */
export type StockBoxProps = {
  state: StockBoxState;
  /** Units already on the shelf (dark slots). */
  onHand?: number;
  /** Units in this delivery (orange, or green once saved). */
  adding: number;
  /** Rendered width in px; height keeps the 216 : 156 ratio. */
  width?: number;
  className?: string;
  isCompact?: boolean;
  isAnimated?: boolean;
  hasMinimum?: boolean;
  minLabel?: string;
  pose?: StockBoxPose;
  ariaLabel?: string;
};

export function StockBox({
  state, onHand = 0, adding, width = W, className, isCompact = false,
  isAnimated = true, hasMinimum = false, minLabel = 'Min 6', pose, ariaLabel,
}: StockBoxProps) {
  const reduce = usePrefersReducedMotion();
  const skipMotion = reduce || !isAnimated;
  const clipId = `sb-face-${useId().replace(/:/g, "")}`;
  const filled = Math.min(CAPACITY, onHand + adding);
  const [isFullSealed, setIsFullSealed] = useState(false);
  useEffect(() => {
    if (state !== 'full') { setIsFullSealed(false); return; }
    if (skipMotion) { setIsFullSealed(true); return; }
    const timer = window.setTimeout(() => setIsFullSealed(true), 660);
    return () => window.clearTimeout(timer);
  }, [state, skipMotion]);

  const closed = isCompact || state === 'saving' || state === 'success' || (state === 'full' && (skipMotion || isFullSealed));
  const flapTarget = closed ? 0 : pose === 'half-open' ? 0.47 : 1;
  const initialFlap = skipMotion ? flapTarget : 0;
  const leftT = useTween(flapTarget, closed ? 320 : 420, closed ? ease.inOut : ease.back, closed ? 60 : 0, skipMotion, initialFlap);
  const rightT = useTween(flapTarget, closed ? 320 : 420, closed ? ease.inOut : ease.back, closed ? 130 : 70, skipMotion, initialFlap);
  const backT = useTween(flapTarget, closed ? 200 : 360, closed ? ease.inOut : ease.back, closed ? 0 : 40, skipMotion, initialFlap);
  const flaps = flapPoints(Math.max(0, leftT), Math.max(0, rightT));

  const kinds: SlotKind[] = Array.from({ length: CAPACITY }, (_, i) =>
    i < onHand ? "have" : i < filled ? (state === "success" ? "ok" : "add") : "free",
  );

  const previousFill = useRef({ filled, onHand });
  const [fillMotion, setFillMotion] = useState({ before: filled, sequence: 0 });
  useLayoutEffect(() => {
    const previous = previousFill.current;
    previousFill.current = { filled, onHand };
    const before = isCompact || previous.onHand === onHand ? previous.filled : filled;
    setFillMotion(motion => ({ before, sequence: motion.sequence + 1 }));
  }, [filled, onHand, skipMotion, state, isCompact]);

  const isEditing = state !== 'saving' && state !== 'success' && state !== 'error';
  const change = isEditing && !skipMotion ? filled - fillMotion.before : 0;
  const drops = Array.from({ length: Math.min(5, Math.max(0, change)) }, (_, index) => index);
  const move = state === 'success' ? 'hop' : state === 'error' ? 'shake' : state === 'over' ? 'overShake' : '';

  const height = (width * H) / W;

  if (isCompact) return <svg className={[s.box, className].filter(Boolean).join(' ')} width={112} height={76} viewBox="0 0 112 76" role="img" aria-label={ariaLabel ?? `Bin: ${filled} of ${CAPACITY} slots used`} data-state={state}>
    <ellipse className={s.shadow} cx={56} cy={73} rx={49} ry={3} />
    <path className={s.face} d="M10 15H102V64Q102 72 94 72H18Q10 72 10 64Z" />
    {kinds.map((kind, index) => {
      const x = 18 + index % 6 * 13;
      const y = 24 + (3 - Math.floor(index / 6)) * 10;
      const isNew = change > 0 && index >= fillMotion.before && index < filled;
      return <g key={index}><rect className={s.slot_free} x={x} y={y} width={11} height={8} rx={2} />{kind !== 'free' && <rect key={isNew ? fillMotion.sequence : kind} className={[s.slot, s[`slot_${kind}`], isNew && s.slotPop].filter(Boolean).join(' ')} x={x} y={y} width={11} height={8} rx={2} style={{ animationDelay: `${isNew ? (index - fillMotion.before) * 25 : 0}ms` }} />}</g>;
    })}
    <path className={s.faceStroke} d="M10 15H102V64Q102 72 94 72H18Q10 72 10 64Z" />
    <path className={s.flap} d="M10 15L18 2H94L102 15Z M56 2V15" />
    <path className={s.tapeFill} d="M52 2H60L62 15V26L59 24L56 26L53 24L51 26V15Z" />
  </svg>;

  return (
    <svg
      className={[s.box, className].filter(Boolean).join(" ")}
      width={width}
      height={isAnimated ? Math.round(height) : height}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
        aria-label={ariaLabel ?? `Bin: ${filled} of ${CAPACITY} slots used${state === "over" ? ", over capacity" : ""}`}
      data-state={state}
      data-pose={pose}
      data-is-static={!isAnimated || undefined}
    >
      <defs>
        <clipPath id={clipId}>
          <path d={FACE_PATH} />
        </clipPath>
      </defs>

      <ellipse className={[s.shadow, move === "hop" && s.shadowHop].filter(Boolean).join(" ")} cx={108} cy={147.5} rx={pose === 'hop' ? 55 : 63.5} ry={4.5} />

      <g className={[s.rig, move && s[move]].filter(Boolean).join(" ")} transform={pose === 'hop' ? 'translate(0 -6)' : undefined}>
      <g className={drops.length ? (fillMotion.sequence % 2 === 0 ? s.dipAlternate : s.dip) : undefined}>
        {/* back flap + opening */}
        <polygon className={s.flapBack} points={backPoints(Math.max(0.08, backT))} style={{ opacity: backT < 0.08 ? 0 : 1 }} />
        <polygon className={s.opening} points={OPENING} />

        {/* falling units */}
        {drops.map((index) => (
          <rect
            key={`${fillMotion.sequence}-${index}`}
            className={s.parcel}
            x={-7.5}
            y={-5.5}
            width={15}
            height={11}
            rx={3}
            style={{ ["--x" as string]: `${PARCEL_X[index]}px`, ["--r" as string]: `${PARCEL_R[index]}deg`, animationDelay: `${index * 70}ms` }}
          />
        ))}
        {pose === 'units-above' && AIRBORNE_PARCELS.map(({ x, y, angle }) => (
          <rect key={x} className={s.posedParcel} x={-7.5} y={-5.5} width={15} height={11}
            transform={`translate(${x} ${y}) rotate(${angle})`} />
        ))}

        {/* extra units that do not fit */}
        {state === "over" &&
          PILE.map((p, i) => (
            <rect
              key={i}
              className={s.extra}
              x={-9.5}
              y={-7}
              width={19}
              height={14}
              rx={3.5}
              style={{ ["--x" as string]: `${p.x}px`, ["--y" as string]: `${p.y}px`, ["--r" as string]: `${p.r}deg`, animationDelay: `${i * 90}ms` }}
            />
          ))}

        {/* face + slots */}
        <path className={s.face} d={FACE_PATH} />
        <g clipPath={`url(#${clipId})`}>
          {kinds.map((k, i) => {
            const { x, y } = slotXY(i);
            const isNew = change > 0 && i >= fillMotion.before && i < filled;
            const isRemoved = change < 0 && i >= filled && i < fillMotion.before;
            const isSaved = state === 'success' && k === 'ok';
            const delay = isSaved ? (i - onHand) * 16 : isNew ? 240 + (i - fillMotion.before) * Math.min(45, 195 / change) : isRemoved ? (fillMotion.before - 1 - i) * Math.min(35, 260 / -change) : 0;
            return (
              <g key={i}>
                <rect x={x} y={y} width={SLOT.w} height={SLOT.h} rx={SLOT.r} className={s.slot_free} />
                {(k !== 'free' || isRemoved) && <rect
                  key={isNew || isRemoved ? fillMotion.sequence : k}
                  className={[s.slot, s[`slot_${isRemoved ? 'add' : k}`], isNew && s.slotPop, isRemoved && s.slotRemove, isSaved && s.slotSaved].filter(Boolean).join(' ')}
                  x={x} y={y} width={SLOT.w} height={SLOT.h} rx={SLOT.r}
                  style={{ animationDelay: `${delay}ms` }} />}
              </g>
            );
          })}
          {state === "saving" && <polygon className={s.shimmer} points="23.4,72 45.7,72 22.3,144 0,144" />}
        </g>
        <path className={s.faceStroke} d={FACE_PATH} />
        {hasMinimum && <g aria-hidden="true" className={s.minimum}>
          <path d="M49 120.5H167" />
          <text x="172" y="124">{minLabel}</text>
        </g>}

        {/* front flaps */}
        <polygon className={s.flap} points={flaps.left} />
        <polygon className={s.flap} points={flaps.right} />

        {/* tape over the seam */}
        <g className={[s.tape, closed && s.tapeOn].filter(Boolean).join(" ")}>
          <path className={state === "success" ? s.tapeOk : s.tapeFill} d={TAPE_PATH} />
        </g>

        {/* received stamp */}
        <g className={[s.stamp, state === "success" && s.stampOn].filter(Boolean).join(" ")} transform="translate(108 110)">
          <g className={s.stampInner}>
            <circle r={15.5} className={s.stampDisc} />
            <path d="M-6.86 0.43L-2.14 5.14L7.29 -5.14" className={s.stampCheck} />
          </g>
        </g>
      </g>
      </g>
    </svg>
  );
}

/** Maps quantity/flow state to the Stock Box variant. */
export function boxStateFor(opts: {
  adding: number;
  room: number;
  phase: "edit" | "review" | "saving" | "success" | "error";
}): StockBoxState {
  const { adding, room, phase } = opts;
  if (phase === "saving") return "saving";
  if (phase === "success") return "success";
  if (phase === "error") return "error";
  if (adding <= 0) return "empty";
  if (adding > room) return "over";
  if (adding === room) return "full";
  return "filling";
}
