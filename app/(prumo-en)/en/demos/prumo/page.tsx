import type { Metadata } from "next";
import { PrumoPage } from "@/components/prumo/PrumoPage";
import { copy, prumoPath } from "@/content/prumo";

const t = copy.en;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: prumoPath("en"), languages: { "pt-BR": prumoPath("pt"), en: prumoPath("en"), "x-default": prumoPath("pt") } },
  openGraph: {
    type: "website",
    siteName: "Prumo",
    locale: "en_US",
    url: prumoPath("en"),
    title: t.metaTitle,
    description: t.metaDescription,
  },
  twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription },
};

export default function Page() {
  return <PrumoPage lang="en" />;
}
