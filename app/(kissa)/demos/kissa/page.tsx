import type { Metadata } from "next";
import { KissaPage } from "@/components/kissa/KissaPage";
import { copy, kissaPath } from "@/content/kissa";

const t = copy.pt;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: kissaPath("pt"), languages: { "pt-BR": kissaPath("pt"), en: kissaPath("en"), "x-default": kissaPath("pt") } },
  openGraph: {
    type: "website",
    siteName: "Kissa",
    locale: "pt_BR",
    url: kissaPath("pt"),
    title: t.metaTitle,
    description: t.metaDescription,
  },
  twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription },
};

export default function Page() {
  return <KissaPage lang="pt" />;
}
