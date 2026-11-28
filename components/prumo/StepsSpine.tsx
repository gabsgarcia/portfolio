"use client";

// The steps of the first class, with a spine beside them that straightens a little more
// at each step. It explains the promise of the studio (re-teaching the body) instead of
// decorating. With "reduce motion" on, the spine shows aligned and nothing moves.

import { useEffect, useRef, useState } from "react";
import { Spine } from "./Spine";

type Step = { name: string; text: string; time: string };

export function StepsSpine({ steps, label }: { steps: Step[]; label: string }) {
  const list = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(-1);
  const [still, setStill] = useState(false);

  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStill(media.matches);
    sync();
    media.addEventListener("change", sync);
    const items = [...(list.current?.querySelectorAll("li") ?? [])];
    // A step counts as read once it crosses the middle of the screen.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const i = items.indexOf(e.target as HTMLLIElement);
          if (e.isIntersecting) setActive((a) => Math.max(a, i));
          else if (e.boundingClientRect.top > 0) setActive((a) => (a >= i ? i - 1 : a));
        }
      },
      { rootMargin: "0px 0px -50% 0px" },
    );
    items.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      media.removeEventListener("change", sync);
    };
  }, []);

  const pose = still ? 1 : (active + 1) / steps.length;

  return (
    <div className="pr-steps-grid">
      <ol className="pr-steps" ref={list}>
        {steps.map((s, i) => (
          <li key={s.name} className={i <= active ? "is-read" : undefined}>
            <span className="pr-step-n" aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h3>
                {s.name} <span className="pr-step-time">{s.time}</span>
              </h3>
              <p>{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      <figure className="pr-steps-figure" aria-hidden="true">
        <svg viewBox="40 0 220 600">
          <line className="pr-steps-line" x1="146" y1="8" x2="146" y2="592" />
          <Spine pose={pose} className="pr-spine" animate={!still} />
        </svg>
        <figcaption>{label}</figcaption>
      </figure>
    </div>
  );
}
