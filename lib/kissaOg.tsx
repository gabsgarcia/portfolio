import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Lang } from "./i18n";
import { ogSize } from "./og";

const fontDir = join(process.cwd(), "assets/og");

const lines: Record<Lang, { meaning: string; rest: string }> = {
  pt: { meaning: "o café de bairro japonês, onde se senta sem pressa.", rest: "Matcha, sandos e café coado na Vila Mariana, São Paulo." },
  en: { meaning: "the Japanese neighbourhood café, where nobody is in a hurry.", rest: "Matcha, sandos and pour-over coffee in Vila Mariana, São Paulo." },
};

/** Share card for the Kissa demo. It explains the name, so the link makes sense to people who don't read Japanese. */
export async function renderKissaOg(lang: Lang) {
  const [gothic, mincho] = await Promise.all([
    readFile(join(fontDir, "ZenKakuGothicNew-Bold-kissa.ttf")),
    readFile(join(fontDir, "ShipporiMincho-ExtraBold-kissa.ttf")),
  ]);
  const l = lines[lang];
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          gap: 64,
          padding: "0 88px",
          background: "#e8e6d9",
          color: "#23241f",
          fontFamily: "Zen Kaku Gothic New",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: 150,
            height: 270,
            borderRadius: 10,
            background: "#b5372a",
            color: "#e8e6d9",
            fontFamily: "Shippori Mincho",
            fontSize: 112,
            lineHeight: 1.05,
            transform: "rotate(-4deg)",
          }}
        >
          <span>喫</span>
          <span>茶</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ fontSize: 168, lineHeight: 0.9, letterSpacing: -7, color: "#2e4128" }}>Kissa</div>
          <div style={{ marginTop: 30, fontSize: 40, lineHeight: 1.35 }}>{`喫茶 (kissa): ${l.meaning}`}</div>
          <div style={{ marginTop: 22, fontSize: 30, color: "#55574c" }}>{l.rest}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Zen Kaku Gothic New", data: gothic, weight: 700, style: "normal" },
        { name: "Shippori Mincho", data: mincho, weight: 800, style: "normal" },
      ],
    },
  );
}
