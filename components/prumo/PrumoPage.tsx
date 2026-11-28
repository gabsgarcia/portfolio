import Link from "next/link";
import { copy, prices, prumoPath } from "@/content/prumo";
import { projectPath, type Lang } from "@/lib/i18n";
import { AskButton, Chat } from "./Chat";
import { ContactForm, DemoAction, HoursTable, MapOnRequest, OpenNow, Toaster } from "./Live";
import { Photo } from "./Photo";
import { Plate } from "./Plate";
import { StepsSpine } from "./StepsSpine";

/** The plumb bob that signs the brand: a line and a weight. */
function Bob({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 28" aria-hidden="true">
      <path d="M8 0v14" />
      <path d="M8 14l-5 5 5 9 5-9z" />
    </svg>
  );
}

export function PrumoPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const other: Lang = lang === "pt" ? "en" : "pt";

  return (
    <div className="prumo">
      <a className="pr-skip" href="#conteudo">
        {t.skip}
      </a>

      <header className="pr-header">
        <a className="pr-brand" href="#topo">
          <Bob className="pr-brand-bob" />
          Prumo
        </a>
        <nav aria-label={lang === "pt" ? "Seções" : "Sections"}>
          <a href="#primeira-aula">{t.nav.firstClass}</a>
          <a href="#valores">{t.nav.prices}</a>
          <a href="#como-chegar">{t.nav.visit}</a>
          <Link href={prumoPath(other)} hrefLang={other === "pt" ? "pt-BR" : "en"} lang={other === "pt" ? "pt-BR" : "en"}>
            <abbr title={t.nav.lang}>{t.nav.langShort}</abbr>
          </Link>
        </nav>
        <DemoAction className="pr-btn pr-btn--book pr-btn--sm pr-header-book" message={t.demoToast.whatsapp}>
          {t.nav.book}
        </DemoAction>
      </header>

      <main id="conteudo">
        {/* Hero: the promise in words, and plate 1 with the plumb line dropping beside the spine */}
        <section className="pr-hero" id="topo" aria-labelledby="pr-title">
          <div className="pr-hero-text">
            <h1 id="pr-title">{t.title}</h1>
            <p className="pr-lead">{t.lead}</p>
            <div className="pr-actions">
              <DemoAction className="pr-btn pr-btn--book" message={t.demoToast.whatsapp}>
                {t.ctaBook}
              </DemoAction>
              <AskButton className="pr-btn pr-btn--line">{t.ctaAsk}</AskButton>
            </div>
            <ul className="pr-facts">
              {t.facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <OpenNow lang={lang} openNow={t.openNow} closedNow={t.closedNow} />
          </div>
          <Plate labels={t.plate.labels} caption={t.plate.caption} />
        </section>

        <section className="pr-section pr-for" aria-labelledby="pr-for-title">
          <div className="pr-head">
            <h2 id="pr-for-title">{t.forTitle}</h2>
            <p>{t.forLead}</p>
          </div>
          <ul className="pr-for-list">
            {t.forItems.map((item) => (
              <li key={item.name}>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
          <p className="pr-for-also">{t.forAlso}</p>
        </section>

        <section className="pr-section pr-first" id="primeira-aula" aria-labelledby="pr-steps-title">
          <div className="pr-head">
            <h2 id="pr-steps-title">{t.stepsTitle}</h2>
            <p>{t.stepsLead}</p>
          </div>
          <StepsSpine steps={t.steps} label={t.stepsSpineLabel} />
          <aside className="pr-wear">
            <h3>{t.stepsWear.title}</h3>
            <p>{t.stepsWear.text}</p>
          </aside>
          <div className="pr-actions">
            <DemoAction className="pr-btn pr-btn--book" message={t.demoToast.whatsapp}>
              {t.ctaBook}
            </DemoAction>
          </div>
        </section>

        {/* Myths, printed like a blueprint: the one dark band of the page */}
        <section className="pr-myths" aria-labelledby="pr-myths-title">
          <div className="pr-myths-inner">
            <div className="pr-head">
              <h2 id="pr-myths-title">{t.mythsTitle}</h2>
              <p>{t.mythsLead}</p>
            </div>
            <p className="pr-myth-cols" aria-hidden="true">
              <span>{t.mythLabel}</span>
              <span>{t.truthLabel}</span>
            </p>
            <dl className="pr-myth-list">
              {t.myths.map((m) => (
                <div key={m.myth}>
                  <dt>
                    <span className="pr-myth-tag">{t.mythLabel}</span>
                    {m.myth}
                  </dt>
                  <dd>
                    <span className="pr-myth-tag">{t.truthLabel}</span>
                    {m.truth}
                  </dd>
                </div>
              ))}
            </dl>
            <AskButton className="pr-btn pr-btn--paper">{t.mythsAsk}</AskButton>
          </div>
        </section>

        <section className="pr-section pr-physio" aria-labelledby="pr-physio-title">
          <div className="pr-physio-text">
            <h2 id="pr-physio-title">{t.physioTitle}</h2>
            <p className="pr-physio-name">{t.physio.name}</p>
            <p className="pr-physio-role">{t.physio.role}</p>
            {t.physio.text.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Photo name="mola" lang={lang} sizes="(min-width: 900px) 30vw, 90vw" className="pr-photo--a" />
          <Photo name="reformer" lang={lang} sizes="(min-width: 900px) 24vw, 70vw" className="pr-photo--b" />
        </section>

        <section className="pr-section pr-prices" id="valores" aria-labelledby="pr-prices-title">
          <div className="pr-head">
            <h2 id="pr-prices-title">{t.pricesTitle}</h2>
            <p>{t.pricesLead}</p>
          </div>
          <ul className="pr-price-list">
            {prices.map((p) => (
              <li key={p.name.pt}>
                <div>
                  <h3>{p.name[lang]}</h3>
                  <p>{p.note[lang]}</p>
                </div>
                <p className="pr-price">
                  <span className="pr-price-value">
                    {t.currency} {p.value}
                  </span>
                  <span className="pr-price-per">{p.per[lang]}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className="pr-notes">
            <div>
              <h3>{t.insuranceTitle}</h3>
              <p>{t.insurance}</p>
            </div>
            <div>
              <h3>{t.cancelTitle}</h3>
              <p>{t.cancel}</p>
            </div>
          </div>
        </section>

        <section className="pr-section pr-visit" id="como-chegar" aria-labelledby="pr-visit-title">
          <div className="pr-visit-info">
            <h2 id="pr-visit-title">{t.visitTitle}</h2>
            <p className="pr-address">{t.address}</p>
            <ul className="pr-arrival">
              {t.arrival.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
            <h3>{t.hoursTitle}</h3>
            <HoursTable lang={lang} closed={t.closed} todayLabel={t.today} />
          </div>
          <MapOnRequest lang={lang} t={t} />
        </section>

        <section className="pr-section pr-write" aria-labelledby="pr-form-title">
          <div className="pr-head">
            <h2 id="pr-form-title">{t.formTitle}</h2>
            <p>{t.formLead}</p>
          </div>
          <ContactForm t={t.form} demoNote={t.demoToast.form} />
        </section>
      </main>

      <footer className="pr-footer">
        <Bob className="pr-footer-bob" />
        <p>
          {t.footerNote} <Link href={projectPath(lang, "prumo")}>{t.footerLink}</Link>
        </p>
      </footer>

      {/* On phones, booking and the assistant stay one thumb away */}
      <div className="pr-dock">
        <DemoAction className="pr-btn pr-btn--book" message={t.demoToast.whatsapp}>
          {t.nav.book}
        </DemoAction>
        <AskButton className="pr-btn pr-btn--line">{t.chat.open}</AskButton>
      </div>

      <Chat t={t.chat} whatsappNote={t.demoToast.whatsapp} />
      <Toaster />
    </div>
  );
}
