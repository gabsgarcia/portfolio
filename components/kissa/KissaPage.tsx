import Link from "next/link";
import { copy, kissaPath, mapEmbed, mapLink, menu, type MenuGroup } from "@/content/kissa";
import { projectPath, type Lang } from "@/lib/i18n";
import { LeafShadow } from "./LeafShadow";
import { DemoAction, HoursTable, OpenNow, Toaster } from "./Live";
import { Photo } from "./Photo";
import { Stamp } from "./Stamp";

export function KissaPage({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const other: Lang = lang === "pt" ? "en" : "pt";
  const price = (n: number) => `${t.currency} ${n}`;

  return (
    <div className="kissa">
      <a className="ks-skip" href="#conteudo">
        {t.skip}
      </a>

      <header className="ks-header">
        <a className="ks-brand" href="#topo" aria-label="Kissa">
          <Stamp className="ks-brand-stamp" />
          <span>Kissa</span>
        </a>
        <nav aria-label={lang === "pt" ? "Seções" : "Sections"}>
          <a href="#cardapio">{t.nav.menu}</a>
          <a href="#como-chegar">{t.nav.visit}</a>
          <Link href={kissaPath(other)} hrefLang={other === "pt" ? "pt-BR" : "en"} lang={other === "pt" ? "pt-BR" : "en"}>
            <abbr title={t.nav.lang}>{t.nav.langShort}</abbr>
          </Link>
        </nav>
        <DemoAction className="ks-btn ks-btn--order ks-header-order" message={t.demoToast.ifood}>
          {t.nav.order}
        </DemoAction>
      </header>

      <main id="conteudo">
        {/* Hero: the stamp, the name and what it means, over morning light */}
        <section className="ks-hero" id="topo" aria-labelledby="ks-title">
          <div className="ks-hero-text">
            <Stamp className="ks-hero-stamp" />
            <h1 id="ks-title" className="ks-title">
              Kissa
            </h1>
            <p className="ks-meaning">
              <span lang="ja">喫茶</span> <em lang="ja-Latn">{t.meaning.word}</em>: {t.meaning.text}
            </p>
            <p className="ks-lead">{t.lead}</p>
            <div className="ks-actions">
              <DemoAction className="ks-btn ks-btn--order" message={t.demoToast.ifood}>
                {t.nav.order}
              </DemoAction>
              <a className="ks-btn ks-btn--quiet" href="#como-chegar">
                {t.ctaVisit}
              </a>
            </div>
            <OpenNow lang={lang} openNow={t.openNow} closedNow={t.closedNow} />
          </div>

          <div className="ks-hero-visual">
            <Photo name="hero" lang={lang} sizes="(min-width: 900px) 52vw, 100vw" priority className="ks-hero-photo" />
            <p className="ks-vertical" lang="ja" aria-describedby="ks-vertical-meaning">
              {t.vertical}
            </p>
            <p className="ks-vertical-meaning" id="ks-vertical-meaning">
              {t.verticalMeaning}
            </p>
          </div>
          <LeafShadow className="ks-leaves" />
        </section>

        {/* Menu on the page, not in a PDF: loads at once and Google can read it */}
        <section className="ks-menu" id="cardapio" aria-labelledby="ks-menu-title">
          <div className="ks-menu-head">
            <h2 id="ks-menu-title">{t.menuTitle}</h2>
            <p>{t.menuLead}</p>
          </div>

          {/* Two columns: drinks on the left, savoury on the right, sweets in a wide row to close */}
          <div className="ks-menu-groups">
            {[menu.slice(0, 2), menu.slice(2, 3)].map((col, ci) => (
              <div className="ks-menu-col" key={ci}>
                {col.map((group) => (
                  <MenuGroupBlock key={group.id} group={group} lang={lang} price={price} />
                ))}
              </div>
            ))}
          </div>
          {menu.slice(3).map((group) => (
            <MenuGroupBlock key={group.id} group={group} lang={lang} price={price} wide />
          ))}
        </section>

        {/* The place, told through details instead of a wide room shot */}
        <section className="ks-place" aria-labelledby="ks-place-title">
          <div className="ks-place-text">
            <h2 id="ks-place-title">{t.placeTitle}</h2>
            {t.placeText.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <Photo name="balcao" lang={lang} sizes="(min-width: 900px) 40vw, 90vw" className="ks-place-a" />
          <Photo name="noren" lang={lang} sizes="(min-width: 900px) 26vw, 60vw" className="ks-place-b" />
          <Photo name="prateleira" lang={lang} sizes="(min-width: 900px) 30vw, 70vw" className="ks-place-c" />
        </section>

        {/* Visit: where, when, and how to order */}
        <section className="ks-visit" id="como-chegar" aria-labelledby="ks-visit-title">
          <div className="ks-visit-info">
            <h2 id="ks-visit-title">{t.visitTitle}</h2>
            <p className="ks-address">
              {t.address}
              <br />
              {t.metro}
            </p>
            <h3>{t.hoursTitle}</h3>
            <HoursTable lang={lang} closed={t.closed} todayLabel={t.today} />
            <h3>{t.orderTitle}</h3>
            <div className="ks-actions">
              <DemoAction className="ks-btn ks-btn--order" message={t.demoToast.ifood}>
                {t.nav.order}
              </DemoAction>
              <DemoAction className="ks-btn ks-btn--quiet" message={t.demoToast.whatsapp}>
                {t.whatsapp}
              </DemoAction>
              <DemoAction className="ks-btn ks-btn--quiet" message={t.demoToast.instagram}>
                {t.instagram}
              </DemoAction>
            </div>
          </div>
          <Map t={t} lang={lang} />
        </section>
      </main>

      <footer className="ks-footer">
        <Stamp className="ks-footer-stamp" />
        <p>
          {t.footerNote} <Link href={projectPath(lang, "kissa")}>{t.footerLink}</Link>
        </p>
      </footer>

      {/* On phones the two things people come for stay one thumb away */}
      <div className="ks-dock">
        <DemoAction className="ks-btn ks-btn--order" message={t.demoToast.ifood}>
          {t.nav.order}
        </DemoAction>
        <a className="ks-btn ks-btn--quiet" href="#como-chegar">
          {t.ctaVisit}
        </a>
      </div>

      <Toaster />
    </div>
  );
}

function MenuGroupBlock({
  group,
  lang,
  price,
  wide,
}: {
  group: MenuGroup;
  lang: Lang;
  price: (n: number) => string;
  wide?: boolean;
}) {
  return (
    <section className={`ks-group ks-group--${group.id}${wide ? " ks-group--wide" : ""}`} aria-labelledby={`ks-g-${group.id}`}>
      {group.photo && <Photo name={group.photo} lang={lang} sizes="(min-width: 900px) 40vw, 90vw" className="ks-group-photo" />}
      <h3 id={`ks-g-${group.id}`}>{group.title[lang]}</h3>
      <ul>
        {group.items.map((item) => (
          <li key={item.name} className="ks-item">
            <p className="ks-item-line">
              <span className="ks-item-name">{item.name}</span>
              <span className="ks-leader" aria-hidden="true" />
              <span className="ks-item-price">{price(item.price)}</span>
            </p>
            {item.jp && (
              <p className="ks-item-jp">
                <span lang="ja">{item.jp.text}</span> · {item.jp.meaning[lang]}
              </p>
            )}
            <p className="ks-item-note">{item.note[lang]}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** A real Google map, because that is what people use to find a place and get directions. */
function Map({ t, lang }: { t: (typeof copy)[Lang]; lang: Lang }) {
  return (
    <figure className="ks-map">
      <iframe
        src={mapEmbed(lang)}
        title={t.mapTitle}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <figcaption>
        <a className="ks-map-open" href={mapLink} target="_blank" rel="noopener noreferrer">
          {t.mapOpen} <span aria-hidden="true">↗</span>
        </a>
        <span className="ks-map-note">{t.mapNote}</span>
      </figcaption>
    </figure>
  );
}
