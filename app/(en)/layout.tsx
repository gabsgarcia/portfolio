import "../globals.css";
import { fontVars } from "@/lib/fonts";
import { baseMetadata } from "@/lib/meta";

export const metadata = baseMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
