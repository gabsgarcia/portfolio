import type { Metadata } from "next";
import { PrumoPage } from "@/components/prumo/PrumoPage";
import { copy, prumoPath } from "@/content/prumo";

const t = copy.pt;

export const metadata: Metadata = {
  title: t.metaTitle,
  description: t.metaDescription,
  alternates: { canonical: prumoPath("pt"), languages: { "pt-BR": prumoPath("pt"), en: prumoPath("en"), "x-default": prumoPath("pt") } },
  openGraph: {
    type: "website",
    siteName: "Prumo",
    locale: "pt_BR",
    url: prumoPath("pt"),
    title: t.metaTitle,
    description: t.metaDescription,
  },
  twitter: { card: "summary_large_image", title: t.metaTitle, description: t.metaDescription },
};

export default function Page() {
  return <PrumoPage lang="pt" />;
}
