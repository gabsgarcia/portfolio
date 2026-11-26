"use client";

// The few parts of the page that need the browser: today's hours, the open/closed
// line, and the demo buttons that explain what they would do on a real site.

import { useEffect, useRef, useState } from "react";
import { dayNames, hours } from "@/content/kissa";
import type { Lang } from "@/lib/i18n";

/** Day of the week and hour in São Paulo, wherever the visitor is. */
function nowInSaoPaulo() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Sao_Paulo",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, hour: Number(get("hour")) + Number(get("minute")) / 60 };
}

function slotFor(day: number) {
  return hours.find((h) => h.days.includes(day));
}

export function formatHour(h: number, lang: Lang) {
  if (lang === "pt") return `${h}h`;
  if (h === 12) return "noon";
  return h < 12 ? `${h} am` : `${h - 12} pm`;
}

function useToday() {
  const [today, setToday] = useState<{ day: number; hour: number } | null>(null);
  useEffect(() => {
    const tick = () => setToday(nowInSaoPaulo());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return today;
}

export function OpenNow({ lang, openNow, closedNow }: { lang: Lang; openNow: string; closedNow: string }) {
  const today = useToday();
  if (!today) return <p className="ks-open" aria-hidden="true">&nbsp;</p>;
  const slot = slotFor(today.day);
  const open = !!slot && today.hour >= slot.open && today.hour < slot.close;
  const text = open ? openNow.replace("{close}", formatHour(slot!.close, lang)) : closedNow;
  return (
    <p className={`ks-open ${open ? "is-open" : ""}`}>
      <span className="ks-open-dot" aria-hidden="true" />
      {text}
    </p>
  );
}

/** Week starting on Monday, with today marked once the browser knows the date. */
export function HoursTable({ lang, closed, todayLabel }: { lang: Lang; closed: string; todayLabel: string }) {
  const today = useToday();
  const week = [1, 2, 3, 4, 5, 6, 0];
  const sep = lang === "pt" ? " às " : " – ";
  return (
    <dl className="ks-hours">
      {week.map((d) => {
        const slot = slotFor(d);
        const isToday = today?.day === d;
        return (
          <div key={d} className={isToday ? "is-today" : undefined}>
            <dt>
              {dayNames[lang][d]}
              {isToday && <span className="ks-today"> ({todayLabel})</span>}
            </dt>
            <dd>{slot ? `${formatHour(slot.open, lang)}${sep}${formatHour(slot.close, lang)}` : closed}</dd>
          </div>
        );
      })}
    </dl>
  );
}

/**
 * A button that stands in for a real link (iFood, WhatsApp, Instagram).
 * On a client's site it becomes a plain <a>; here it says what it would open.
 */
export function DemoAction({
  message,
  className,
  children,
}: {
  message: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent("kissa-toast", { detail: message }))}
    >
      {children}
    </button>
  );
}

export function Toaster() {
  const [toast, setToast] = useState({ message: "", n: 0 });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    const onToast = (e: Event) => {
      const message = (e as CustomEvent<string>).detail;
      setToast((t) => ({ message, n: t.n + 1 }));
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setToast((t) => ({ ...t, message: "" })), 4200);
    };
    window.addEventListener("kissa-toast", onToast);
    return () => {
      window.removeEventListener("kissa-toast", onToast);
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <div className="ks-toast-region" role="status" aria-live="polite">
      {toast.message && (
        <p className="ks-toast" key={toast.n}>
          {toast.message}
        </p>
      )}
    </div>
  );
}
