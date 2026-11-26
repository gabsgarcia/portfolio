import Link from "next/link";
import type { Project } from "@/content/projects";
import { dict, homePath, type Lang } from "@/lib/i18n";
import { Cover } from "./Cover";

export function CaseStudy({ project, lang }: { project: Project; lang: Lang }) {
  const t = dict[lang];
  const cs = project.caseStudy!;
  const l = t.caseLabels;

  return (
    <main>
      <section className="band case-hero">
        <div className="wrap">
          <Link href={homePath(lang)} className="text-link back-link">
            <span aria-hidden="true">←</span> {t.back}
          </Link>
          <span className="tag">{project.tag[lang]}</span>
          <h1 className="case-title">{project.title}</h1>
          <p className="case-lead">{cs.lead[lang]}</p>
          <div className="case-cover">
            <Cover kind={project.cover} lang={lang} />
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="problem">
        <div className="wrap two-col">
          <h2 id="problem">{l.problem}</h2>
          <div className="prose">
            {cs.problem[lang].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band band--tint" aria-labelledby="solution">
        <div className="wrap two-col">
          <h2 id="solution">{l.solution}</h2>
          <div className="prose">
            {cs.solution[lang].map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="decisions">
        <div className="wrap">
          <h2 id="decisions" className="section-head">
            {l.decisions}
          </h2>
          <ul className="decision-grid">
            {cs.decisions[lang].map((d) => (
              <li key={d.name}>
                <h3>{d.name}</h3>
                <p>{d.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band contact" aria-labelledby="links">
        <div className="wrap contact-grid">
          <div>
            <h2 id="links">{l.stack}</h2>
            <p className="case-stack">{project.stack.join(", ")}</p>
          </div>
          <div className="contact-actions">
            {project.live && (
              <a target="_blank" rel="noopener noreferrer" className="btn btn--accent" href={project.live}>
                {t.work.liveLink}
              </a>
            )}
            {project.code ? (
              <a target="_blank" rel="noopener noreferrer" className="btn btn--ghost-deep" href={project.code}>
                {t.work.codeLink}
              </a>
            ) : (
              <p className="contact-email">{l.codePrivate}</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
