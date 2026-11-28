"use client";

// The Prumo assistant. A calm panel that opens from the corner (or from any "ask" button
// on the page), answers from the studio's own information, and always leaves a way to a
// person: the booking button or reception on WhatsApp.

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { showDemoNote } from "./Live";

type ChatCopy = {
  open: string;
  title: string;
  subtitle: string;
  close: string;
  greeting: string;
  suggestions: string[];
  placeholder: string;
  inputLabel: string;
  send: string;
  stop: string;
  thinking: string;
  you: string;
  bot: string;
  disclaimer: string;
  book: string;
  reception: string;
  errors: { network: string; limit: string; offline: string; busy: string; tooLong: string };
  left: string;
};

type Msg = { role: "user" | "assistant"; content: string; error?: boolean; done?: boolean };

const OPEN_EVENT = "prumo-chat-open";

/** Opens the chat from anywhere on the page, optionally with a question already sent. */
export function openChat(question?: string) {
  window.dispatchEvent(new CustomEvent(OPEN_EVENT, { detail: question }));
}

export function AskButton({ className, children, question }: { className?: string; children: React.ReactNode; question?: string }) {
  return (
    <button type="button" className={className} onClick={() => openChat(question)}>
      {children}
    </button>
  );
}

/** What Claude wrote, without the markers, and which buttons the markers asked for. */
function readAnswer(raw: string) {
  const book = raw.includes("[[agendar]]");
  const reception = raw.includes("[[recepcao]]");
  const broken = raw.includes("[[erro]]");
  const text = raw
    .replace(/\[\[(agendar|recepcao|erro)\]\]/g, "")
    // While streaming, hide a marker that has only half arrived.
    .replace(/\[\[?[a-z]*\]?$/, "")
    .trim();
  return { text, book, reception, broken };
}

export function Chat({ t, whatsappNote }: { t: ChatCopy; whatsappNote: string }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [left, setLeft] = useState<number | null>(null);
  const abort = useRef<AbortController | null>(null);
  const field = useRef<HTMLTextAreaElement>(null);
  const log = useRef<HTMLDivElement>(null);
  const launcher = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  // Keep the newest message in view while it streams in.
  useEffect(() => {
    const el = log.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs]);

  // The box grows with the text; CSS stops it at five lines, then it scrolls.
  const fit = useCallback(() => {
    const el = field.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + el.offsetHeight - el.clientHeight}px`; // CSS caps it at five lines
  }, []);

  const send = useCallback(
    async (text: string) => {
      const question = text.trim();
      if (!question || busy) return;
      const history: Msg[] = [...msgs.filter((m) => !m.error), { role: "user", content: question }];
      setMsgs([...history, { role: "assistant", content: "" }]);
      setInput("");
      requestAnimationFrame(fit);
      setBusy(true);
      const controller = new AbortController();
      abort.current = controller;

      const finish = (patch: Partial<Msg>) =>
        setMsgs((list) => {
          const copy = [...list];
          copy[copy.length - 1] = { ...copy[copy.length - 1], ...patch };
          return copy;
        });

      try {
        const res = await fetch("/api/prumo/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
          signal: controller.signal,
        });
        if (!res.ok || !res.body) {
          const { error } = (await res.json().catch(() => ({}))) as { error?: keyof ChatCopy["errors"] };
          if (error === "limit") setLeft(0);
          finish({ content: t.errors[error && error in t.errors ? error : "network"], error: true, done: true });
          return;
        }
        const n = Number(res.headers.get("X-Questions-Left"));
        if (Number.isFinite(n)) setLeft(n);
        const reader = res.body.getReader();
        const decoder = new TextDecoder();
        let raw = "";
        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          raw += decoder.decode(value, { stream: true });
          finish({ content: raw });
        }
        if (readAnswer(raw).broken && !readAnswer(raw).text) finish({ content: t.errors.busy, error: true, done: true });
        else finish({ done: true });
      } catch (err) {
        if ((err as Error).name === "AbortError") finish({ done: true });
        else finish({ content: t.errors.network, error: true, done: true });
      } finally {
        setBusy(false);
        abort.current = null;
        field.current?.focus();
      }
    },
    [busy, msgs, t, fit],
  );

  // Other buttons on the page open the chat, sometimes with a question.
  useEffect(() => {
    const onOpen = (e: Event) => {
      setOpen(true);
      const q = (e as CustomEvent<string | undefined>).detail;
      requestAnimationFrame(() => {
        field.current?.focus();
        if (q) send(q);
      });
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_EVENT, onOpen);
  }, [send]);

  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus());
  };

  const empty = msgs.length === 0;
  const limitReached = left === 0;

  return (
    <>
      <button
        ref={launcher}
        type="button"
        className="pr-chat-launch"
        aria-expanded={open}
        aria-controls="pr-chat"
        onClick={() => (open ? close() : (setOpen(true), requestAnimationFrame(() => field.current?.focus())))}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 5.5h16v10H9l-5 4z" />
        </svg>
        {t.open}
      </button>

      <section
        id="pr-chat"
        className="pr-chat"
        role="dialog"
        aria-modal="false"
        aria-labelledby={titleId}
        hidden={!open}
        onKeyDown={(e) => {
          if (e.key === "Escape") close();
        }}
      >
        <header className="pr-chat-head">
          <div>
            <h2 id={titleId}>{t.title}</h2>
            <p>{t.subtitle}</p>
          </div>
          <button type="button" className="pr-icon-btn" onClick={close} aria-label={t.close}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </header>

        <div className="pr-chat-log" ref={log} aria-live="polite" aria-busy={busy}>
          <div className="pr-msg pr-msg--bot">
            <p className="pr-msg-who">{t.bot}</p>
            <p>{t.greeting}</p>
          </div>
          {empty && (
            <ul className="pr-suggest" aria-label={t.inputLabel}>
              {t.suggestions.map((s) => (
                <li key={s}>
                  <button type="button" onClick={() => send(s)}>
                    {s}
                  </button>
                </li>
              ))}
            </ul>
          )}
          {msgs.map((m, i) => {
            if (m.role === "user") {
              return (
                <div key={i} className="pr-msg pr-msg--you">
                  <p className="pr-msg-who">{t.you}</p>
                  <p>{m.content}</p>
                </div>
              );
            }
            if (m.error) {
              return (
                <div key={i} className="pr-msg pr-msg--bot pr-msg--error">
                  <p className="pr-msg-who">{t.bot}</p>
                  <p>{m.content}</p>
                  <DemoLink note={whatsappNote}>{t.reception}</DemoLink>
                </div>
              );
            }
            const a = readAnswer(m.content);
            return (
              <div key={i} className="pr-msg pr-msg--bot">
                <p className="pr-msg-who">{t.bot}</p>
                {a.text ? (
                  a.text.split(/\n+/).map((line, j) => <p key={j}>{line}</p>)
                ) : (
                  <p className="pr-thinking">{t.thinking}</p>
                )}
                {/* Every finished answer leaves a way to a person, whatever the model decided. */}
                {m.done && a.text && (
                  <DemoLink note={whatsappNote} strong={a.book}>
                    {a.book ? t.book : t.reception}
                  </DemoLink>
                )}
              </div>
            );
          })}
        </div>

        <form
          className="pr-chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="pr-chat-input" className="pr-sr">
            {t.inputLabel}
          </label>
          <textarea
            id="pr-chat-input"
            ref={field}
            rows={1}
            value={input}
            placeholder={t.placeholder}
            maxLength={800}
            disabled={limitReached}
            onChange={(e) => {
              setInput(e.target.value);
              fit();
            }}
            onKeyDown={(e) => {
              // Enter sends, on phones and computers alike; Shift+Enter adds a line.
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(input);
              }
            }}
          />
          {busy ? (
            <button type="button" className="pr-icon-btn pr-icon-btn--solid" onClick={() => abort.current?.abort()} aria-label={t.stop}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="7" y="7" width="10" height="10" rx="1.5" />
              </svg>
            </button>
          ) : (
            <button type="submit" className="pr-icon-btn pr-icon-btn--solid" disabled={!input.trim() || limitReached} aria-label={t.send}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 19V5M6 11l6-6 6 6" />
              </svg>
            </button>
          )}
        </form>
        <p className="pr-chat-foot">
          {t.disclaimer}
          {left !== null && left > 0 && left <= 5 && <> {t.left.replace("{n}", String(left))}.</>}
        </p>
      </section>
    </>
  );
}

/** The way out of the chat to a person. On a client's site this is a wa.me link. */
function DemoLink({ note, children, strong }: { note: string; children: React.ReactNode; strong?: boolean }) {
  return (
    <button type="button" className={strong ? "pr-btn pr-btn--book pr-btn--sm" : "pr-btn pr-btn--line pr-btn--sm"} onClick={(e) => showDemoNote(note, e.currentTarget)}>
      {children}
    </button>
  );
}
