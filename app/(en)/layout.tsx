import "../globals.css";
import { fontVars } from "@/lib/fonts";
import { baseMetadata } from "@/lib/meta";
import { themeInitScript } from "@/lib/theme";

export const metadata = baseMetadata("en");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
