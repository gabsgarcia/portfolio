// The spine seen from the side, drawn in lines like an anatomy plate.
// 7 cervical, 12 thoracic and 5 lumbar vertebrae plus the sacrum, placed along a curve.
// `pose` goes from 0 (slumped: head forward, rounded back) to 1 (aligned). The steps
// section moves it as the visitor reads; the hero shows it aligned.

type Key = { t: number; x: number };

/** Where the spine sits, front to back (negative = front), along its length (t = 0 top, 1 bottom). */
const aligned: Key[] = [
  { t: 0, x: 0 },
  { t: 0.13, x: -9 },
  { t: 0.27, x: 0 },
  { t: 0.5, x: 16 },
  { t: 0.74, x: 3 },
  { t: 0.88, x: -10 },
  { t: 1, x: -3 },
];

const slumped: Key[] = [
  { t: 0, x: -46 },
  { t: 0.13, x: -34 },
  { t: 0.27, x: -10 },
  { t: 0.5, x: 30 },
  { t: 0.74, x: 14 },
  { t: 0.88, x: 2 },
  { t: 1, x: 2 },
];

/** Smooth curve through the keys (Catmull-Rom), and its slope. */
function at(keys: Key[], t: number) {
  let i = keys.findIndex((k, n) => n < keys.length - 1 && t <= keys[n + 1].t);
  if (i < 0) i = keys.length - 2;
  const p0 = keys[Math.max(i - 1, 0)];
  const p1 = keys[i];
  const p2 = keys[i + 1];
  const p3 = keys[Math.min(i + 2, keys.length - 1)];
  const u = (t - p1.t) / (p2.t - p1.t);
  const m1 = (p2.x - p0.x) / 2;
  const m2 = (p3.x - p1.x) / 2;
  const u2 = u * u;
  const u3 = u2 * u;
  const x = (2 * u3 - 3 * u2 + 1) * p1.x + (u3 - 2 * u2 + u) * m1 + (-2 * u3 + 3 * u2) * p2.x + (u3 - u2) * m2;
  const dx = ((6 * u2 - 6 * u) * p1.x + (3 * u2 - 4 * u + 1) * m1 + (-6 * u2 + 6 * u) * p2.x + (3 * u2 - 2 * u) * m2) / (p2.t - p1.t);
  return { x, dx };
}

type Vertebra = { id: string; y: number; h: number; w: number; t: number };

const GAP = 4.5;
const TOP = 34;
const SPAN = 470; // height from the first vertebra to the last

function build(): Vertebra[] {
  const groups = [
    { prefix: "C", n: 7, h: 12, w: 26 },
    { prefix: "T", n: 12, h: 15.5, w: 32 },
    { prefix: "L", n: 5, h: 21, w: 40 },
  ];
  const list: Vertebra[] = [];
  let y = TOP;
  for (const g of groups) {
    for (let i = 1; i <= g.n; i++) {
      list.push({ id: `${g.prefix}${i}`, y, h: g.h, w: g.w, t: 0 });
      y += g.h + GAP;
    }
  }
  const total = y - GAP - TOP;
  // Spread the vertebrae over SPAN, keeping their proportions.
  const k = SPAN / total;
  return list.map((v) => {
    const yy = TOP + (v.y - TOP) * k;
    return { ...v, y: yy, h: v.h * k, w: v.w * k, t: (yy - TOP) / SPAN };
  });
}

export const vertebrae = build();
export const CENTER = 150;

/** Position and tilt of one vertebra for a given pose. */
export function place(v: Vertebra, pose: number) {
  const a = at(aligned, v.t);
  const s = at(slumped, v.t);
  const x = s.x + (a.x - s.x) * pose;
  const dx = s.dx + (a.dx - s.dx) * pose;
  // dx is "front-back per unit of length"; turn it into an angle in degrees.
  const angle = (Math.atan2(dx, SPAN) * 180) / Math.PI;
  return { x: CENTER + x, y: v.y + v.h / 2, angle: -angle };
}

export function Spine({ pose, className, animate }: { pose: number; className?: string; animate?: boolean }) {
  const last = vertebrae[vertebrae.length - 1];
  const sacrumTop = last.y + last.h + GAP;
  const sp = place({ ...last, y: sacrumTop, t: 1 }, pose);
  return (
    <g className={className}>
      {vertebrae.map((v) => {
        const p = place(v, pose);
        return (
          <g
            key={v.id}
            className={animate ? "pr-vertebra pr-vertebra--moves" : "pr-vertebra"}
            style={{ transform: `translate(${p.x}px, ${p.y}px) rotate(${p.angle}deg)` }}
          >
            {/* The body of the vertebra, toward the front */}
            <rect x={-v.w / 2} y={-v.h / 2} width={v.w} height={v.h} rx={v.h * 0.28} />
            {/* The spinous process: the bump you feel on your back */}
            <path d={`M ${v.w / 2} ${-v.h * 0.2} L ${v.w / 2 + v.w * 0.55} ${v.h * 0.25}`} />
          </g>
        );
      })}
      {/* The sacrum, a wedge at the base */}
      <g
        className={animate ? "pr-vertebra pr-vertebra--moves" : "pr-vertebra"}
        style={{ transform: `translate(${sp.x}px, ${sacrumTop}px) rotate(${sp.angle + 28}deg)` }}
      >
        <path d="M -22 0 L 26 0 L 10 62 Q 4 74 -2 62 Z" />
        <path d="M -12 16 L 18 16 M -6 32 L 13 32 M -1 47 L 9 47" />
      </g>
    </g>
  );
}

/** The y of a vertebra's centre, for labels. */
export function yOf(id: string) {
  const v = vertebrae.find((x) => x.id === id)!;
  return v.y + v.h / 2;
}
