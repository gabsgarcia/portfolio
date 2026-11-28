import type { CoverKind } from "@/content/projects";
import { Spine } from "@/components/prumo/Spine";

// Drawn covers: a faithful sketch of each product's main screen, made in
// HTML so it stays sharp and themed. Swap for real screenshots any time
// by rendering an <Image> here instead.

export function Cover({ kind, lang }: { kind: CoverKind; lang: "pt" | "en" }) {
  if (kind === "rongalong") return <RongAlongCover lang={lang} />;
  if (kind === "kissa") return <KissaCover />;
  if (kind === "prumo") return <PrumoCover lang={lang} />;
  if (kind === "kanban") return <KanbanCover />;
  return <DataCover />;
}

function RongAlongCover({ lang }: { lang: "pt" | "en" }) {
  const unsure = lang === "pt" ? "IA em dúvida" : "AI unsure";
  return (
    <div className="cover cover--rong" aria-hidden="true">
      <div className="rong-line">
        <span className="rong-th" lang="th">ฉันรักเธอ</span>
        <span className="rong-rom" lang="th-Latn">chan rak thoe</span>
        <span className="rong-en" lang="en">I love you</span>
      </div>
      <div className="rong-line rong-line--unsure">
        <span className="rong-th" lang="th">ใจของฉัน</span>
        <span className="rong-rom" lang="th-Latn">
          <mark>jai</mark> khoong chan
        </span>
        <span className="rong-flag">⚠ {unsure}</span>
      </div>
      <div className="rong-line rong-line--dim">
        <span className="rong-th" lang="th">เธออออ~</span>
        <span className="rong-rom" lang="th-Latn">thoe~</span>
      </div>
    </div>
  );
}

// The Kissa demo in miniature: its own palette (paper, matcha, hanko red), not the portfolio's.
const kissaRows = [
  ["Matcha latte", "22"],
  ["Tamago sando", "28"],
  ["Dorayaki", "14"],
];

function KissaCover() {
  const rows = kissaRows;
  return (
    <div className="cover cover--kissa" aria-hidden="true">
      <div className="kissa-cv-top">
        <span className="kissa-cv-stamp" lang="ja">喫<br />茶</span>
        <span className="kissa-cv-name">Kissa</span>
      </div>
      <ul className="kissa-cv-menu">
        {rows.map(([n, p]) => (
          <li key={n}>
            <span>{n}</span>
            <i />
            <span>R$ {p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The Prumo demo in miniature: graph paper, the spine plate and one chat exchange.
function PrumoCover({ lang }: { lang: "pt" | "en" }) {
  const q = lang === "pt" ? "Tenho hérnia, posso fazer?" : "I have a herniated disc, can I do it?";
  const a = lang === "pt" ? "Na maioria dos casos, pode. A avaliação define o que fazer no seu caso." : "In most cases, yes. The assessment decides what is right for you.";
  return (
    <div className="cover cover--prumo" aria-hidden="true">
      <svg className="prumo-cv-spine" viewBox="60 0 180 620">
        <path className="prumo-cv-line" d="M150 6V600" />
        <Spine pose={1} />
      </svg>
      <div className="prumo-cv-chat">
        <span className="prumo-cv-name">Prumo</span>
        <p className="prumo-cv-you">{q}</p>
        <p className="prumo-cv-bot">{a}</p>
      </div>
    </div>
  );
}

const columns = [
  { name: "Applied", cards: 3 },
  { name: "Interview", cards: 2 },
  { name: "Offer", cards: 1 },
];

function KanbanCover() {
  return (
    <div className="cover cover--kanban" aria-hidden="true">
      {columns.map((c) => (
        <div className="kb-col" key={c.name}>
          <span className="kb-name">{c.name}</span>
          {Array.from({ length: c.cards }, (_, i) => (
            <span className="kb-card" key={i} style={{ width: `${92 - i * 14}%` }} />
          ))}
        </div>
      ))}
    </div>
  );
}

const bars = [38, 64, 52, 88, 71, 46, 95, 60, 77, 54, 83, 69];

function DataCover() {
  return (
    <div className="cover cover--data" aria-hidden="true">
      <div className="data-bars">
        {bars.map((h, i) => (
          <span key={i} style={{ height: `${h}%` }} />
        ))}
      </div>
      <span className="data-label">listings · reviews · calendar</span>
    </div>
  );
}
