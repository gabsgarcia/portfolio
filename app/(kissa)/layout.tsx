import "@/components/kissa/kissa.css";
import { kissaFont } from "@/lib/kissaFont";
import { SITE_URL } from "@/lib/meta";

// The Kissa demo is its own site: own root layout, no portfolio styles or fonts.
export const metadata = { metadataBase: new URL(SITE_URL) };

export const viewport = { themeColor: "#e8e6d9" };

export default function KissaLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={kissaFont.variable}>
      <body style={{ margin: 0, background: "#e8e6d9" }}>{children}</body>
    </html>
  );
}
