/**
 * Shadow of a branch outside the window, falling across the hero.
 * Drawn once as SVG, blurred in CSS and swayed slowly by a CSS animation
 * (kissa.css), which stops when the visitor asks for less motion.
 */

const LEAF = "M0 0 C 26 -20, 88 -22, 128 0 C 88 22, 26 20, 0 0 Z";

// Each branch: where it starts, its angle, and leaves at points along it.
const branches = [
  { x: 640, y: -40, angle: 118, length: 520, leaves: [70, 140, 200, 270, 330, 400, 460] },
  { x: 700, y: 120, angle: 150, length: 380, leaves: [60, 120, 190, 250, 320] },
  { x: 560, y: 260, angle: 100, length: 300, leaves: [50, 110, 170, 240] },
];

function rad(deg: number) {
  return (deg * Math.PI) / 180;
}

export function LeafShadow({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 700 700" aria-hidden="true" preserveAspectRatio="xMaxYMin slice">
      <g fill="currentColor" stroke="currentColor">
        {branches.map((b, bi) => {
          const dx = Math.cos(rad(b.angle));
          const dy = Math.sin(rad(b.angle));
          return (
            <g key={bi} className="ks-branch" style={{ transformOrigin: `${b.x}px ${b.y}px` }}>
              <line x1={b.x} y1={b.y} x2={b.x + dx * b.length} y2={b.y + dy * b.length} strokeWidth="5" />
              {b.leaves.map((d, li) => {
                const side = li % 2 === 0 ? 1 : -1;
                const lx = b.x + dx * d;
                const ly = b.y + dy * d;
                const a = b.angle + side * (38 + ((li * 7) % 14));
                const s = 0.75 + ((li * 13) % 5) / 10;
                return <path key={li} d={LEAF} transform={`translate(${lx} ${ly}) rotate(${a}) scale(${s})`} stroke="none" />;
              })}
            </g>
          );
        })}
      </g>
    </svg>
  );
}
