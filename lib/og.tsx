import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { dict, type Lang } from "./i18n";

/** The picture Google, LinkedIn and WhatsApp show when someone shares a link to the site. */
export const ogSize = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "assets/og");

/** With no `page`, draws the home card. With one, puts that page's title first. */
export async function renderOgImage(lang: Lang, page?: { title: string; subtitle: string }) {
  const t = dict[lang];
  const title = page?.title ?? "Gabi Garcia";
  const subtitle =
    page?.subtitle ??
    (lang === "pt"
      ? "Desenvolvedora full-stack. Sites rápidos para pequenos negócios e produtos com IA."
      : "Full-stack developer. Fast websites for small businesses and AI products.");
  const [archivo, dmSans] = await Promise.all([
    readFile(join(fontDir, "Archivo-ExtraBold.ttf")),
    readFile(join(fontDir, "DMSans-Medium.ttf")),
  ]);
  const syllables = ["chan", "rak", "thoe~"];

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
          background: "#140d35",
          color: "#f6f1ea",
          fontFamily: "DM Sans",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30 }}>
          <div style={{ width: 18, height: 18, borderRadius: 9, background: "#e0482a" }} />
          {page ? "Gabi Garcia" : t.avail.long}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontFamily: "Archivo", fontSize: title.length > 12 ? 120 : 150, lineHeight: 0.95, color: "#fadfcf", letterSpacing: -4 }}>
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 38, maxWidth: 1000, lineHeight: 1.3 }}>{subtitle}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 28 }}>
          <div style={{ display: "flex", gap: 14 }}>
            {syllables.map((s, i) => (
              <div
                key={s}
                style={{
                  padding: "8px 20px",
                  borderRadius: 999,
                  background: i === 1 ? "#e0482a" : "#2a1f4f",
                  color: i === 1 ? "#0e0a24" : "#fadfcf",
                }}
              >
                {s}
              </div>
            ))}
          </div>
          <div style={{ color: "#c9bfe6" }}>portfolio-gabigarcia.vercel.app</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Archivo", data: archivo, weight: 800, style: "normal" },
        { name: "DM Sans", data: dmSans, weight: 500, style: "normal" },
      ],
    },
  );
}
