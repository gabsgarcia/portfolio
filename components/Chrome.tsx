import Link from "next/link";
import { dict, EMAIL, GITHUB, LINKEDIN, homePath, labPath, type Lang } from "@/lib/i18n";

export function Header({ lang, otherHref }: { lang: Lang; otherHref: string }) {
  const t = dict[lang];
  const home = homePath(lang);
  return (
    <header className="site-header band">
      <div className="wrap header-row">
        <Link href={home} className="logo">
          Gabi Garcia
        </Link>
        <nav aria-label={lang === "pt" ? "Principal" : "Main"}>
          <a href={`${home}#projetos`}>{t.nav.work}</a>
          <a href={`${home}#metodo`}>{t.nav.method}</a>
          <Link href={labPath(lang)}>{t.nav.lab}</Link>
          <a href={`${home}#contato`}>{t.nav.contact}</a>
          <a href={otherHref} hrefLang={lang === "pt" ? "en" : "pt-BR"} aria-label={t.nav.otherLangLabel} className="lang-switch">
            {t.nav.otherLang}
          </a>
        </nav>
      </div>
    </header>
  );
}

export function AvailabilityBar({ lang }: { lang: Lang }) {
  const t = dict[lang].avail;
  const home = homePath(lang);
  return (
    <aside className="avail" aria-label={t.long}>
      <span className="avail__avatar" aria-hidden="true">
        GG
      </span>
      <span className="avail__dot" aria-hidden="true" />
      <span className="avail__text">
        <span className="avail__long">{t.long}</span>
        <span className="avail__short">{t.short}</span>
      </span>
      <a className="btn btn--accent btn--sm" href={`${home}#contato`}>
        {t.button}
      </a>
    </aside>
  );
}

export function Footer({ lang }: { lang: Lang }) {
  const t = dict[lang];
  return (
    <footer className="site-footer band">
      <div className="wrap footer-row">
        <span>Gabriella Garcia · {t.footer}</span>
        <span className="footer-links">
          <a href={LINKEDIN}>LinkedIn</a>
          <a href={GITHUB}>GitHub</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
        </span>
      </div>
    </footer>
  );
}
