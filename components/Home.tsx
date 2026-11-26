import Link from "next/link";
import { projects } from "@/content/projects";
import { dict, EMAIL, GITHUB, LINKEDIN, projectPath, type Lang } from "@/lib/i18n";
import { Cover } from "./Cover";
import { SingingLyric } from "./SingingLyric";

const skills: { name: string; abbr: string; family: "ruby" | "blue" | "green" | "amber" }[] = [
  { name: "Ruby on Rails", abbr: "Rb", family: "ruby" },
  { name: "Ruby", abbr: "rb", family: "ruby" },
  { name: "Next.js", abbr: "Nx", family: "blue" },
  { name: "React", abbr: "Re", family: "blue" },
  { name: "TypeScript", abbr: "TS", family: "blue" },
  { name: "JavaScript", abbr: "JS", family: "blue" },
  { name: "HTML & CSS", abbr: "<>", family: "blue" },
  { name: "Supabase", abbr: "Sb", family: "green" },
  { name: "PostgreSQL", abbr: "Pg", family: "green" },
  { name: "Python", abbr: "Py", family: "green" },
  { name: "SQL", abbr: "SQ", family: "green" },
  { name: "Claude API", abbr: "AI", family: "amber" },
  { name: "Claude Code", abbr: ">_", family: "amber" },
  { name: "Git & GitHub", abbr: "Gt", family: "amber" },
  { name: "Vercel", abbr: "▲", family: "amber" },
  { name: "Heroku", abbr: "He", family: "amber" },
];

export function Home({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const [featured, ...others] = projects;

  return (
    <main>
      <section className="hero band">
        <div className="wrap hero-grid">
          <div className="hero-words">
            <h1 className="hero-name">
              Gabi
              <br />
              Garcia
            </h1>
            <p className="lead">{t.hero.intro}</p>
            <div className="btn-row">
              <a className="btn btn--primary" href="#projetos">
                {t.hero.primary}
              </a>
              <a className="btn btn--accent" href="#contato">
                {t.hero.accent}
              </a>
            </div>
          </div>
          <Link href={projectPath(lang, featured.slug)} className="hero-visual" aria-label={`${featured.title}: ${t.work.caseLink}`}>
            <SingingLyric unsureLabel={lang === "pt" ? "IA em dúvida" : "AI unsure"} />
            <span className="hero-visual__caption">
              {featured.title}
            </span>
          </Link>
        </div>
        <div className="wrap">
          <p className="facts">{t.facts}</p>
        </div>
      </section>

      <section id="projetos" className="band work" aria-labelledby="work-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="work-title">{t.work.title}</h2>
            <p>{t.work.lead}</p>
          </div>

          <article className="card card--featured">
            <Link href={projectPath(lang, featured.slug)} className="card__media" tabIndex={-1} aria-hidden="true">
              <Cover kind={featured.cover} lang={lang} />
            </Link>
            <div className="card__body">
              <span className="tag">{featured.tag[lang]}</span>
              <h3 className="card__title">
                <Link href={projectPath(lang, featured.slug)}>{featured.title}</Link>
              </h3>
              <p className="card__text">{featured.summary[lang]}</p>
              <p className="card__stack">{featured.stack.join(", ")}</p>
              <div className="card__links">
                <Link href={projectPath(lang, featured.slug)} className="btn btn--primary btn--sm">
                  {t.work.caseLink}
                </Link>
                {featured.live && (
                  <a target="_blank" rel="noopener noreferrer" href={featured.live} className="btn btn--ghost btn--sm">
                    {t.work.liveLink}
                  </a>
                )}
              </div>
            </div>
          </article>

          <div className="card-grid">
            {others.map((p) => {
              const href = p.live ?? p.code ?? "#";
              return (
                <article className="card" key={p.slug}>
                  <a target="_blank" rel="noopener noreferrer" href={href} className="card__media" tabIndex={-1} aria-hidden="true">
                    <Cover kind={p.cover} lang={lang} />
                  </a>
                  <div className="card__body">
                    <span className="tag">{p.tag[lang]}</span>
                    <h3 className="card__title">
                      <a target="_blank" rel="noopener noreferrer" href={href}>{p.title}</a>
                    </h3>
                    <p className="card__text">{p.summary[lang]}</p>
                    <p className="card__stack">{p.stack.join(", ")}</p>
                    <a target="_blank" rel="noopener noreferrer" href={href} className="text-link">
                      {p.live ? t.work.liveLink : t.work.codeLink}
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="band services" aria-labelledby="services-title">
        <div className="wrap two-col">
          <h2 id="services-title">{t.services.title}</h2>
          <ul className="service-list">
            {t.services.items.map((s) => (
              <li key={s.name}>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="metodo" className="band method" aria-labelledby="method-title">
        <div className="wrap">
          <div className="section-head">
            <h2 id="method-title">{t.method.title}</h2>
            <p>{t.method.lead}</p>
          </div>
          <ol className="steps">
            {t.method.steps.map((s, i) => (
              <li key={s.name}>
                <span className="step-n" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{s.name}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="band teaching" aria-labelledby="teaching-title">
        <div className="wrap two-col">
          <h2 id="teaching-title">{t.teaching.title}</h2>
          <ul className="teach-list">
            {t.teaching.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="band skills" aria-labelledby="skills-title">
        <div className="wrap">
          <h2 id="skills-title" className="h-small">
            {t.skills.title}
          </h2>
          <ul className="chips">
            {skills.map((s) => (
              <li className="chip" key={s.name}>
                <i className={`chip__icon chip__icon--${s.family}`} aria-hidden="true">
                  {s.abbr}
                </i>
                {s.name}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="contato" className="band contact" aria-labelledby="contact-title">
        <div className="wrap contact-grid">
          <div>
            <h2 id="contact-title">{t.contact.title}</h2>
            <p>{t.contact.text}</p>
          </div>
          <div className="contact-actions">
            <a className="btn btn--accent" href={`mailto:${EMAIL}`}>
              {t.contact.button}
            </a>
            <p className="contact-email">{EMAIL}</p>
            <p className="contact-links">
              <a target="_blank" rel="noopener noreferrer" href={LINKEDIN}>LinkedIn</a>
              <a target="_blank" rel="noopener noreferrer" href={GITHUB}>GitHub</a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
