import { labCopy } from "@/lib/lab";
import { EMAIL, type Lang } from "@/lib/i18n";
import { CafeScroll } from "./CafeScroll";
import { GemStage } from "./GemStage";
import "./lab.css";

function Notes({ id, e }: { id: string; e: (typeof labCopy)["pt"]["experiments"][number] }) {
  return (
    <section id={id} className="band lab-notes" aria-labelledby={`${id}-title`}>
      <div className="wrap lab-notes__grid">
        <div className="lab-notes__head">
          <h2 id={`${id}-title`}>{e.title}</h2>
          <p className="lab-notes__pitch">{e.pitch}</p>
          <p className="card__stack">{e.stack}</p>
        </div>
        <div className="lab-notes__body">
          <h3>{e.howTitle}</h3>
          <ol className="lab-how">
            {e.how.map((h) => {
              const [name, ...rest] = h.split(": ");
              return (
                <li key={h}>
                  <span>
                    <strong>{name}:</strong> {rest.join(": ")}
                  </span>
                </li>
              );
            })}
          </ol>
          <aside className="lab-cta" aria-label={e.cta.title}>
            <p className="lab-cta__title">{e.cta.title}</p>
            <p className="lab-cta__text">{e.cta.text}</p>
            <a className="btn btn--accent btn--sm" href={`mailto:${EMAIL}?subject=${encodeURIComponent(e.cta.subject)}`}>
              {e.cta.button}
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}

export function LabPage({ lang }: { lang: Lang }) {
  const t = labCopy[lang];
  const [cafe, gem] = t.experiments;
  return (
    <main className="lab">
      <section className="band lab-intro">
        <div className="wrap">
          <h1 className="lab-title">{t.title}</h1>
          <p className="lead lab-lead">{t.lead}</p>
          <p className="lab-note">{t.note}</p>
        </div>
      </section>

      <CafeScroll copy={t.cafe} />
      <Notes id="lab-cafe-notes" e={cafe} />

      <GemStage copy={t.gem} />
      <Notes id="lab-gem-notes" e={gem} />
    </main>
  );
}
