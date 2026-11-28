import type { MetadataRoute } from "next";
import { kissaPath } from "@/content/kissa";
import { prumoPath } from "@/content/prumo";
import { projects } from "@/content/projects";
import { homePath, labPath, projectPath, type Lang } from "@/lib/i18n";
import { SITE_URL } from "@/lib/meta";

/** Every page, in both languages, so Google finds them all. Served at /sitemap.xml. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: ((lang: Lang) => string)[] = [
    homePath,
    labPath,
    kissaPath,
    prumoPath,
    ...projects.filter((p) => p.caseStudy).map((p) => (lang: Lang) => projectPath(lang, p.slug)),
  ];
  return pages.flatMap((path) =>
    (["pt", "en"] as const).map((lang) => ({
      url: `${SITE_URL}${path(lang)}`,
      alternates: { languages: { "pt-BR": `${SITE_URL}${path("pt")}`, en: `${SITE_URL}${path("en")}` } },
    })),
  );
}
