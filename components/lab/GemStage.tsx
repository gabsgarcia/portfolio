"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import type { LabCopy } from "@/lib/lab";

// Three.js is heavy (~150 KB gzipped). This keeps it out of the first page load:
// the chunk is only requested once the stage gets close to the screen.
const GemScene = dynamic(() => import("./GemScene"), { ssr: false });

let webglCache: boolean | undefined;
function hasWebGL() {
  if (webglCache === undefined) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

const REDUCED = "(prefers-reduced-motion: reduce)";
function onReducedChange(cb: () => void) {
  const mq = window.matchMedia(REDUCED);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
const noSubscribe = () => () => {};

export function GemStage({ copy }: { copy: LabCopy["gem"] }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useRef(0); // 0 when the section enters the screen, 1 when it leaves
  const [near, setNear] = useState(false); // close enough to start loading
  const [visible, setVisible] = useState(false); // on screen, so the render loop should run
  // Read browser settings without an effect; the server render assumes "motion on, WebGL on".
  const still = useSyncExternalStore(onReducedChange, () => window.matchMedia(REDUCED).matches, () => false);
  const webgl = useSyncExternalStore(noSubscribe, hasWebGL, () => true);

  useEffect(() => {
    const el = ref.current!;
    const loader = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: "400px 0px" });
    const watcher = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    loader.observe(el);
    watcher.observe(el);

    // Plain scroll math, no library: how far the section has travelled through the viewport.
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const total = r.height + window.innerHeight;
      progress.current = Math.min(1, Math.max(0, (window.innerHeight - r.top) / total));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      loader.disconnect();
      watcher.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section ref={ref} className="gem" aria-labelledby="gem-title">
      <div className="gem-canvas" aria-hidden="true">
        {webgl ? near && <GemScene active={visible} still={still} progress={progress} source={ref} /> : <div className="gem-fallback" />}
      </div>
      <div className="gem-words">
        <p className="gem-kicker">{copy.kicker}</p>
        <h2 id="gem-title" className="gem-title">
          {copy.title}
        </h2>
        <p className="gem-text">{webgl ? copy.text : copy.fallback}</p>
      </div>
      {webgl && !still && (
        <p className="gem-hint" aria-hidden="true">
          {copy.hint}
        </p>
      )}
    </section>
  );
}
