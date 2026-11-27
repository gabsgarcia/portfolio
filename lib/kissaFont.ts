import { Zen_Kaku_Gothic_New } from "next/font/google";

// Kissa's only typeface: a Japanese gothic whose Latin letters match its kana and kanji.
// Its Japanese glyphs come in small slices, so the browser only downloads the ones on the page.
export const kissaFont = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-kissa",
  display: "swap",
});
