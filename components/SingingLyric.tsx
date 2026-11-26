"use client";

import { useEffect, useRef } from "react";

// Hero picture: a RongAlong lyric line floating in depth. The romanization
// lights up one syllable at a time like karaoke, the syllable the AI is unsure
// about blinks in coral, and the scene tilts toward the pointer.
// Plain CSS 3D (no WebGL): it is text, so it stays sharp and loads instantly.

type Syllable = { th: string; rom: string; x: number; y: number; z: number; size: number; unsure?: boolean };

const SYLLABLES: Syllable[] = [
  { th: "ฉัน", rom: "chan", x: -34, y: -18, z: -60, size: 0.8 },
  { th: "รัก", rom: "rak", x: 0, y: -6, z: 70, size: 1.25 },
  { th: "เธอ", rom: "thoe", x: 32, y: -24, z: -10, size: 0.9, unsure: true },
  { th: "นะ", rom: "na", x: -18, y: 26, z: -140, size: 0.65 },
  { th: "จ๊ะ", rom: "ja", x: 26, y: 26, z: -100, size: 0.65 },
];

const STEP = 0.7; // seconds each syllable stays lit

export function SingingLyric({ unsureLabel }: { unsureLabel: string }) {
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const rig = el.querySelector<HTMLElement>(".sing-rig")!;
    const syls = Array.from(el.querySelectorAll<HTMLElement>(".sing-syl"));
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (still) {
      syls[1]?.classList.add("is-lit");
      return;
    }

    let tx = 0, ty = 0, rx = 0, ry = 0;
    let visible = true;
    let raf = 0;
    const start = performance.now();

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    const onLeave = () => { tx = 0; ty = 0; };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      // Ease toward the pointer so the tilt has a little weight.
      rx += (ty * -12 - rx) * 0.08;
      ry += (tx * 18 - ry) * 0.08;
      rig.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
      const lit = Math.floor(t / STEP) % syls.length;
      syls.forEach((s, i) => {
        s.style.setProperty("--float", `${Math.sin(t * 1.2 + i) * 6}px`);
        s.classList.toggle("is-lit", i === lit);
      });
      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(el);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div className="cover sing" ref={stage} aria-hidden="true">
      <div className="sing-rig">
        {SYLLABLES.map((s) => (
          <span
            key={s.rom}
            className={`sing-syl${s.unsure ? " sing-syl--unsure" : ""}`}
            style={{ "--x": `${s.x}%`, "--y": `${s.y}%`, "--z": `${s.z}px`, "--size": s.size } as React.CSSProperties}
          >
            <b lang="th">{s.th}</b>
            <span lang="th-Latn">{s.rom}</span>
            {s.unsure && <em>{unsureLabel}</em>}
          </span>
        ))}
      </div>
    </div>
  );
}
