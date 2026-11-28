import "@/components/prumo/prumo.css";
import { prumoFontVars } from "@/lib/prumoFont";
import { SITE_URL } from "@/lib/meta";

// The Prumo demo is its own site: own root layout, no portfolio styles or fonts.
export const metadata = { metadataBase: new URL(SITE_URL) };

export const viewport = { themeColor: "#ebe9e3" };

export default function PrumoLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={prumoFontVars}>
      <body style={{ margin: 0, background: "#ebe9e3" }}>{children}</body>
    </html>
  );
}
