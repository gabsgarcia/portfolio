import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { dict, type Lang } from "./i18n";

/** The picture Google, LinkedIn and WhatsApp show when someone shares a link to the site. */
export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "assets/og");

const c = {
  deep: "#140d35",
  surface: "#2a1f4f",
  peach: "#fadfcf",
  coral: "#e0482a",
  ink: "#0e0a24",
  text: "#f6f1ea",
  muted: "#c9bfe6",
};

/** What sits under the title: a row of words, or a Thai lyric for RongAlong. */
export type OgArt =
  | { kind: "words"; words: string[]; lit: number }
  | { kind: "karaoke"; words: string[]; lit: number }
  | { kind: "thai-below"; th: string; rom: string; meaning: string }
  | { kind: "thai-behind"; th: string; rom: string };

export const homeArt: Record<Lang, OgArt> = {
  pt: { kind: "words", words: ["agilidade", "qualidade", "AI engineering"], lit: 2 },
  en: { kind: "words", words: ["speed", "quality", "AI engineering"], lit: 2 },
};

export const rongalongArt: Record<Lang, OgArt> = {
  pt: { kind: "thai-below", th: "ฉันรักเธอ", rom: "chan rak thoe", meaning: "eu te amo" },
  en: { kind: "thai-below", th: "ฉันรักเธอ", rom: "chan rak thoe", meaning: "I love you" },
};

/** With no `page`, draws the home card. With one, puts that page's title first. */
export async function renderOgImage(lang: Lang, page?: { title: string; subtitle: string }, art?: OgArt) {
  const t = dict[lang];
  const title = page?.title ?? "Gabi Garcia";
  const subtitle =
    page?.subtitle ??
    (lang === "pt"
      ? "Desenvolvedora full-stack. Sites rápidos para pequenos negócios e produtos com IA."
      : "Full-stack developer. Fast websites for small businesses and AI products.");
  const [archivo, dmSans, thai] = await Promise.all([
    readFile(join(fontDir, "Archivo-ExtraBold.ttf")),
    readFile(join(fontDir, "DMSans-Medium.ttf")),
    readFile(join(fontDir, "NotoSansThai-Bold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: c.deep,
          color: c.text,
          fontFamily: "DM Sans",
          position: "relative",
        }}
      >
        {art?.kind === "thai-behind" && (
          <div
            style={{
              position: "absolute",
              right: 40,
              bottom: -20,
              fontFamily: "Noto Sans Thai",
              fontSize: 250,
              lineHeight: 1,
              color: c.surface,
            }}
          >
            {art.th}
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: c.coral }} />
          {page ? "Gabi Garcia" : t.avail.long}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Archivo",
              fontSize: title.length > 12 ? 120 : 150,
              lineHeight: 0.95,
              color: c.peach,
              letterSpacing: -4,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 38, maxWidth: 1000, lineHeight: 1.3 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 28 }}>
          {art?.kind === "words" && (
            <div style={{ display: "flex", gap: 14 }}>
              {art.words.map((w, i) => (
                <div
                  key={w}
                  style={{
                    padding: "8px 22px",
                    borderRadius: 999,
                    background: i === art.lit ? c.coral : c.surface,
                    color: i === art.lit ? c.ink : c.peach,
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          )}
          {art?.kind === "karaoke" && (
            <div style={{ display: "flex", gap: 12, fontFamily: "Archivo", fontSize: 34 }}>
              {art.words.map((w, i) => (
                <div
                  key={w}
                  style={{
                    display: "flex",
                    color: i < art.lit ? c.peach : i === art.lit ? c.coral : "#5a4e85",
                    borderBottom: i === art.lit ? `6px solid ${c.coral}` : "6px solid transparent",
                    paddingBottom: 4,
                  }}
                >
                  {w}
                </div>
              ))}
            </div>
          )}
          {art?.kind === "thai-below" && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "14px 26px",
                borderRadius: 18,
                background: c.surface,
                borderLeft: `8px solid ${c.coral}`,
              }}
            >
              <div style={{ fontFamily: "Noto Sans Thai", fontSize: 46, lineHeight: 1.5, color: c.text }}>{art.th}</div>
              <div style={{ display: "flex", gap: 18, fontSize: 28 }}>
                <span style={{ color: c.peach }}>{art.rom}</span>
                <span style={{ color: c.muted }}>{art.meaning}</span>
              </div>
            </div>
          )}
          {art?.kind === "thai-behind" && (
            <div style={{ padding: "8px 22px", borderRadius: 999, background: c.coral, color: c.ink }}>{art.rom}</div>
          )}
          {!art && <div />}
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 500, style: "normal" },
        { name: "Noto Sans Thai", data: thai, weight: 700, style: "normal" },
      ],
    },
  );
}
