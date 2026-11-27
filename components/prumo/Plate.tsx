import { CENTER, place, Spine, vertebrae, yOf } from "./Spine";

/**
 * The hero picture: plate 1 of an anatomy book. The aligned spine, the plumb line that
 * drops beside it as the page opens, and three numbered callouts explained in the legend.
 */
export function Plate({ labels, caption }: { labels: { c7: string; t12: string; l5: string; line: string }; caption: string }) {
  const marks = [
    { n: 1, id: "C7", side: -1, text: labels.c7 },
    { n: 2, id: "T12", side: 1, text: labels.t12 },
    { n: 3, id: "L5", side: -1, text: labels.l5 },
  ];
  const last = vertebrae[vertebrae.length - 1];
  const bobY = last.y + last.h + 96;
  return (
    <figure className="pr-plate">
      <svg viewBox="0 0 300 640" role="img" aria-labelledby="pr-plate-cap">
        <g className="pr-plumb-bob" style={{ transformOrigin: `${CENTER - 4}px 0px` }}>
          <line x1={CENTER - 4} y1="0" x2={CENTER - 4} y2={bobY} className="pr-plumb-line" pathLength={1} />
          <path d={`M ${CENTER - 4} ${bobY} l -9 10 l 9 26 l 9 -26 z`} className="pr-plumb-weight" />
        </g>
        <Spine pose={1} className="pr-spine" />
        {marks.map((m) => {
          const v = vertebrae.find((x) => x.id === m.id)!;
          const p = place(v, 1);
          const y = yOf(m.id);
          const edge = p.x + (m.side < 0 ? -v.w / 2 - 4 : v.w / 2 + v.w * 0.6 + 4);
          const end = m.side < 0 ? 40 : 262;
          return (
            <g key={m.n} className="pr-callout">
              <line x1={edge} y1={y} x2={end + (m.side < 0 ? 12 : -12)} y2={y} />
              <circle cx={end} cy={y} r="11" />
              <text x={end} y={y + 4} textAnchor="middle">
                {m.n}
              </text>
            </g>
          );
        })}
        <text className="pr-plate-tag" x={CENTER + 4} y={bobY + 54}>
          {labels.line}
        </text>
      </svg>
      <figcaption id="pr-plate-cap">
        <p>{caption}</p>
        <ol className="pr-legend">
          {marks.map((m) => (
            <li key={m.n}>
              <span className="pr-legend-n" aria-hidden="true">
                {m.n}
              </span>
              {m.text}
            </li>
          ))}
        </ol>
      </figcaption>
    </figure>
  );
}
