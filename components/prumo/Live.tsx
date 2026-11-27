"use client";

// The parts of the Prumo page that need the browser: today's hours, the open/closed line,
// the map that only loads when asked, the short form, and the demo buttons that say what
// they would do on a real site.

import { useEffect, useRef, useState } from "react";
import { dayNames, hours, mapEmbed, mapLink } from "@/content/prumo";
import type { Lang } from "@/lib/i18n";

/** Day of the week and hour in Belo Horizonte, wherever the visitor is. */
function nowInBH() {
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

const slotFor = (day: number) => hours.find((h) => h.days.includes(day));

function formatHour(h: number, lang: Lang) {
  if (lang === "pt") return `${h}h`;
  if (h === 12) return "noon";
  return h < 12 ? `${h} am` : `${h - 12} pm`;
}

function useToday() {
  const [today, setToday] = useState<{ day: number; hour: number } | null>(null);
  useEffect(() => {
    const tick = () => setToday(nowInBH());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);
  return today;
}

export function OpenNow({ lang, openNow, closedNow }: { lang: Lang; openNow: string; closedNow: string }) {
  const today = useToday();
  if (!today) return <p className="pr-open" aria-hidden="true">&nbsp;</p>;
  const slot = slotFor(today.day);
  const open = !!slot && today.hour >= slot.open && today.hour < slot.close;
  return (
    <p className={`pr-open ${open ? "is-open" : ""}`}>
      <span className="pr-open-dot" aria-hidden="true" />
      {open ? openNow.replace("{close}", formatHour(slot!.close, lang)) : closedNow}
    </p>
  );
}

/** Week starting on Monday, with today marked once the browser knows the date. */
export function HoursTable({ lang, closed, todayLabel }: { lang: Lang; closed: string; todayLabel: string }) {
  const today = useToday();
  const sep = lang === "pt" ? " às " : " – ";
  return (
    <dl className="pr-hours">
      {[1, 2, 3, 4, 5, 6, 0].map((d) => {
        const slot = slotFor(d);
        const isToday = today?.day === d;
        return (
          <div key={d} className={isToday ? "is-today" : undefined}>
            <dt>
              {dayNames[lang][d]}
              {isToday && <span className="pr-today"> ({todayLabel})</span>}
            </dt>
            <dd>{slot ? `${formatHour(slot.open, lang)}${sep}${formatHour(slot.close, lang)}` : closed}</dd>
          </div>
        );
      })}
    </dl>
  );
}

type ToastDetail = { message: string; rect: DOMRect };

/** Shows the demo note next to whatever element asked for it. */
export function showDemoNote(message: string, el: Element) {
  window.dispatchEvent(new CustomEvent<ToastDetail>("prumo-toast", { detail: { message, rect: el.getBoundingClientRect() } }));
}

/**
 * A button that stands in for a real link (the studio's WhatsApp).
 * On a client's site it becomes a plain <a href="https://wa.me/...">; here it says what it would open.
 */
export function DemoAction({ message, className, children }: { message: string; className?: string; children: React.ReactNode }) {
  return (
    <button type="button" className={className} onClick={(e) => showDemoNote(message, e.currentTarget)}>
      {children}
    </button>
  );
}

type ToastState = { message: string; n: number; style?: React.CSSProperties };

/** The demo note shows up right next to the button that was pressed, and goes away on scroll. */
export function Toaster() {
  const [toast, setToast] = useState<ToastState>({ message: "", n: 0 });
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => {
    const hide = () => setToast((t) => (t.message ? { ...t, message: "" } : t));
    const onToast = (e: Event) => {
      const { message, rect } = (e as CustomEvent<ToastDetail>).detail;
      const vw = window.innerWidth;
      const half = Math.min(220, vw / 2 - 16);
      const left = Math.min(Math.max(rect.left + rect.width / 2, 16 + half), vw - 16 - half);
      const above = rect.bottom + 140 > window.innerHeight;
      const style: React.CSSProperties = above
        ? { left, top: rect.top - 12, transform: "translate(-50%, -100%)" }
        : { left, top: rect.bottom + 12, transform: "translateX(-50%)" };
      setToast((t) => ({ message, n: t.n + 1, style }));
      clearTimeout(timer.current);
      timer.current = setTimeout(hide, 4500);
    };
    window.addEventListener("prumo-toast", onToast);
    window.addEventListener("scroll", hide, { passive: true });
    return () => {
      window.removeEventListener("prumo-toast", onToast);
      window.removeEventListener("scroll", hide);
      clearTimeout(timer.current);
    };
  }, []);
  return (
    <div className="pr-toast-region" role="status" aria-live="polite">
      {toast.message && (
        <div className="pr-toast-anchor" style={toast.style}>
          <p className="pr-toast" key={toast.n}>
            {toast.message}
          </p>
        </div>
      )}
    </div>
  );
}

/** Google's map only loads when asked: lighter page, and nothing goes to Google before that. */
export function MapOnRequest({ lang, t }: { lang: Lang; t: { mapLoad: string; mapNote: string; mapOpen: string; mapTitle: string } }) {
  const [on, setOn] = useState(false);
  return (
    <figure className="pr-map">
      <div className="pr-map-frame">
        {on ? (
          <iframe src={mapEmbed(lang)} title={t.mapTitle} referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
        ) : (
          <button type="button" className="pr-btn pr-btn--line" onClick={() => setOn(true)}>
            {t.mapLoad}
          </button>
        )}
      </div>
      <figcaption>
        <a className="pr-link" href={mapLink} target="_blank" rel="noopener noreferrer">
          {t.mapOpen}
        </a>
        <span>{t.mapNote}</span>
      </figcaption>
    </figure>
  );
}

type FormCopy = { name: string; phone: string; message: string; honeypot: string; send: string; sent: string; required: string };

/**
 * The second way in, for people who'd rather not open WhatsApp. The hidden "website"
 * field is a trap for spam bots: people never see it, bots fill it in.
 */
export function ContactForm({ t, demoNote }: { t: FormCopy; demoNote: string }) {
  const [sent, setSent] = useState(false);
  return (
    <form
      className="pr-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if ((form.elements.namedItem("website") as HTMLInputElement).value) return;
        setSent(true);
        showDemoNote(demoNote, form.querySelector("button[type=submit]") ?? form);
      }}
    >
      <label>
        <span>
          {t.name} <span className="pr-req">({t.required})</span>
        </span>
        <input name="nome" autoComplete="name" required />
      </label>
      <label>
        <span>
          {t.phone} <span className="pr-req">({t.required})</span>
        </span>
        <input name="whatsapp" type="tel" inputMode="tel" autoComplete="tel" required />
      </label>
      <label className="pr-form-wide">
        <span>{t.message}</span>
        <textarea name="mensagem" rows={3} />
      </label>
      <label className="pr-trap" aria-hidden="true">
        <span>{t.honeypot}</span>
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
      <button type="submit" className="pr-btn pr-btn--line" disabled={sent}>
        {sent ? t.sent : t.send}
      </button>
    </form>
  );
}
