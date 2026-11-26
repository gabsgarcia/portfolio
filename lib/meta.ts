import type { Metadata } from "next";
import { dict, type Lang } from "./i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-gabigarcia.vercel.app";

export function baseMetadata(lang: Lang): Metadata {
  const t = dict[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.metaTitle, template: `%s · Gabi Garcia` },
    description: t.metaDescription,
    alternates: { languages: { "pt-BR": "/", en: "/en" } },
    openGraph: { title: t.metaTitle, description: t.metaDescription, type: "website", locale: lang === "pt" ? "pt_BR" : "en_US" },
  };
}
