import { IBM_Plex_Sans_Condensed, Schibsted_Grotesk } from "next/font/google";

// Prumo's two typefaces. A firm grotesk for reading and headings, and a condensed sans
// for the small captions on the anatomy drawings, like the labels on a technical plate.
export const prumoSans = Schibsted_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-prumo",
  display: "swap",
});

export const prumoLabel = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-prumo-label",
  display: "swap",
});

export const prumoFontVars = `${prumoSans.variable} ${prumoLabel.variable}`;
