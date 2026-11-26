import type { Metadata } from "next";
import { dict, EMAIL, GITHUB, LINKEDIN, type Lang } from "./i18n";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-gabigarcia.vercel.app";

const SITE_NAME = "Gabi Garcia";

/** Site-wide defaults, set once in each root layout. Pages override with `pageMetadata`. */
export function baseMetadata(lang: Lang): Metadata {
  const t = dict[lang];
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: t.metaTitle, template: `%s · ${SITE_NAME}` },
    description: t.metaDescription,
    authors: [{ name: "Gabriella Garcia", url: SITE_URL }],
    openGraph: { siteName: SITE_NAME, type: "website", locale: lang === "pt" ? "pt_BR" : "en_US" },
    twitter: { card: "summary_large_image" },
  };
}

/**
 * Metadata for one page: its own canonical URL, the link to the same page in the other
 * language (hreflang), and matching Open Graph tags so a shared link shows the right title.
 * Next.js replaces nested objects instead of merging them, so every page needs the full set.
 */
export function pageMetadata({
  lang,
  path,
  altPath,
  title,
  description,
}: {
  lang: Lang;
  path: string;
  altPath: string;
  title?: string;
  description: string;
}): Metadata {
  const [pt, en] = lang === "pt" ? [path, altPath] : [altPath, path];
  const fullTitle = title ? `${title} · ${SITE_NAME}` : dict[lang].metaTitle;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path, languages: { "pt-BR": pt, en, "x-default": pt } },
    openGraph: {
      siteName: SITE_NAME,
      type: "website",
      locale: lang === "pt" ? "pt_BR" : "en_US",
      alternateLocale: lang === "pt" ? "en_US" : "pt_BR",
      url: path,
      title: fullTitle,
      description,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}

/** schema.org data for the home page, so Google knows whose site this is. */
export function personJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Gabriella Garcia",
    alternateName: "Gabi Garcia",
    url: SITE_URL,
    email: `mailto:${EMAIL}`,
    jobTitle: lang === "pt" ? "Desenvolvedora full-stack" : "Full-stack developer",
    description: dict[lang].metaDescription,
    knowsLanguage: ["pt-BR", "en"],
    worksFor: { "@type": "Organization", name: "Le Wagon" },
    sameAs: [LINKEDIN, GITHUB],
  };
}
