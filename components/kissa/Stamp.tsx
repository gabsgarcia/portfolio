import { useId } from "react";
import { KI, SA } from "./stampGlyphs";

/**
 * The hanko: a vermilion seal with 喫茶 cut out of it, read top to bottom.
 * A tiny displacement filter roughens the edge so it looks pressed, not printed.
 */
export function Stamp({ className, title, ...rest }: { className?: string; title?: string } & React.SVGProps<SVGSVGElement>) {
  const id = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  return (
    <svg
      className={className}
      viewBox="0 0 1240 2240"
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      {...rest}
    >
      <defs>
        <filter id={`ink-${id}`} x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="26" />
        </filter>
        <mask id={`cut-${id}`}>
          <rect width="1240" height="2240" fill="#fff" />
          <g fill="#000">
            <path d={KI} transform="translate(120 130)" />
            <path d={SA} transform="translate(120 1110)" />
          </g>
        </mask>
      </defs>
      <rect
        x="30"
        y="30"
        width="1180"
        height="2180"
        rx="70"
        fill="currentColor"
        mask={`url(#cut-${id})`}
        filter={`url(#ink-${id})`}
      />
    </svg>
  );
}
