import type { Metadata } from "next";
import { KissaPage } from "@/components/kissa/KissaPage";
import { copy, kissaPath } from "@/content/kissa";

const t = copy.en;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: kissaPath("en"), languages: { "pt-BR": kissaPath("pt"), en: kissaPath("en"), "x-default": kissaPath("pt") } },
  openGraph: {
    type: "website",
    siteName: "Kissa",
    locale: "en_US",
    url: kissaPath("en"),
    title: t.metaTitle,
    description: t.metaDescription,
  },
  twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription },
};

export default function Page() {
  return <KissaPage lang="en" />;
}
