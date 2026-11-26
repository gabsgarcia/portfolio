"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Fraunces } from "next/font/google";
import type { LabCopy } from "@/lib/lab";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// The café has its own type: a warm, slightly wonky serif. Loaded only on the Lab page.
const fraunces = Fraunces({ subsets: ["latin"], axes: ["SOFT", "WONK", "opsz"], variable: "--font-torra" });

/**
 * Beans around the cup. x/y are in vmin from the centre, depth goes from 0 (far) to 1 (near).
 * Depth drives three things at once: size, blur and how far the bean travels on scroll.
 */
const BEANS = [
  { x: -34, y: -26, depth: 0.9, rot: 24 },
  { x: 30, y: -32, depth: 0.35, rot: -40 },
  { x: 38, y: 14, depth: 1, rot: 70 },
  { x: -40, y: 20, depth: 0.5, rot: -15 },
  { x: -18, y: 38, depth: 0.2, rot: 110 },
  { x: 16, y: 36, depth: 0.7, rot: -80 },
  { x: 4, y: -42, depth: 0.15, rot: 5 },
  { x: -46, y: -4, depth: 0.25, rot: 150 },
];

export function CafeScroll({ copy }: { copy: LabCopy["cafe"] }) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Everything animated lives inside this query. If the visitor asks for less motion,
      // none of it runs and the static layout from the CSS stays on screen.
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = root.current!;
        el.classList.add("is-animated");

        const letters = gsap.utils.toArray<HTMLElement>(".torra-word span", el);
        const beans = gsap.utils.toArray<HTMLElement>(".torra-bean", el);
        const lines = gsap.utils.toArray<HTMLElement>(".torra-line", el);
        const mid = (letters.length - 1) / 2;

        gsap.set(lines, { autoAlpha: 0, yPercent: 60 });
        gsap.set(".torra-cta", { autoAlpha: 0, y: 24 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: "+=260%", // the pinned scene lasts 2.6 screens of scrolling
            pin: true,
            scrub: 0.6, // a little lag so the motion feels like it has weight
          },
        });

        // Background "roasts" from cream to caramel to espresso. Going through caramel keeps the
        // middle of the scroll warm instead of a muddy grey; the text flips to cream at the dark end.
        tl.to(el, { "--torra-bg": "#c98d5a", duration: 1.4 }, 0);
        tl.to(el, { "--torra-bg": "#24140d", duration: 1.6 }, 1.4);
        tl.to(el, { "--torra-ink": "#f3e6d6", "--torra-crema": "#d9a06a", duration: 0.5 }, 1.7);

        // The cup rises toward the viewer while the crema swirls faster than the cup turns.
        tl.fromTo(".torra-cup", { scale: 0.7, rotate: 0 }, { scale: 1.12, rotate: -35, duration: 3 }, 0);
        tl.to(".torra-crema", { rotate: 320, duration: 3 }, 0);

        // The word behind the cup splits apart letter by letter.
        letters.forEach((letter, i) => {
          tl.to(letter, { xPercent: (i - mid) * 55, opacity: 0.18, duration: 1.6 }, 0);
        });

        // Parallax: near beans fly further and spin more than far ones.
        beans.forEach((bean) => {
          const d = Number(bean.dataset.depth);
          const x = Number(bean.dataset.x);
          const y = Number(bean.dataset.y);
          tl.to(bean, { x: `${x * 1.3 * d}vmin`, y: `${y * 1.3 * d - 18 * d}vmin`, rotate: `+=${200 * d}`, duration: 3 }, 0);
        });

        // Three lines take turns, then the button arrives and stays.
        lines.forEach((line, i) => {
          tl.to(line, { autoAlpha: 1, yPercent: 0, duration: 0.35 }, 0.2 + i * 0.9);
          if (i < lines.length - 1) tl.to(line, { autoAlpha: 0, yPercent: -60, duration: 0.3 }, 0.75 + i * 0.9);
        });
        tl.to(".torra-cta", { autoAlpha: 1, y: 0, duration: 0.3 }, 2.55);
        tl.to(".torra-hint", { autoAlpha: 0, duration: 0.3 }, 0);

        return () => el.classList.remove("is-animated");
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} className={`torra ${fraunces.variable}`} aria-label={`${copy.brand}, ${copy.place}`}>
      <div className="torra-stage">
        <p className="torra-place">{copy.place}</p>

        <p className="torra-word" aria-hidden="true">
          {copy.brand.split("").map((c, i) => (
            <span key={i}>{c}</span>
          ))}
        </p>

        <div className="torra-scene" aria-hidden="true">
          {BEANS.map((b, i) => (
            <span
              key={i}
              className="torra-bean"
              data-x={b.x}
              data-y={b.y}
              data-depth={b.depth}
              style={
                {
                  "--x": `${b.x}vmin`,
                  "--y": `${b.y}vmin`,
                  "--size": `${3 + b.depth * 4.5}vmin`,
                  "--blur": `${(1 - b.depth) * 3}px`,
                  "--rot": `${b.rot}deg`,
                  zIndex: b.depth > 0.6 ? 3 : 1,
                } as React.CSSProperties
              }
            />
          ))}
          <div className="torra-cup">
            <span className="torra-cup__handle" />
            <div className="torra-cup__rim">
              <div className="torra-cup__coffee">
                <div className="torra-crema" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="torra-brand">{copy.brand}</h2>
        <ul className="torra-lines">
          {copy.lines.map((line) => (
            <li key={line} className="torra-line">
              {line}
            </li>
          ))}
        </ul>
        {/* Part of the mock client site, so it is decoration here, not a real link. */}
        <span className="torra-cta" aria-hidden="true">
          {copy.cta}
        </span>
        <p className="torra-hint" aria-hidden="true">
          {copy.hint} ↓
        </p>
      </div>
    </section>
  );
}
