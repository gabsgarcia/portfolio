import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { Home } from "@/components/Home";
import { JsonLd } from "@/components/JsonLd";
import { dict } from "@/lib/i18n";
import { pageMetadata, personJsonLd } from "@/lib/meta";

export const metadata = pageMetadata({ lang: "pt", path: "/", altPath: "/en", description: dict.pt.metaDescription });

export default function Page() {
  return (
    <>
      <Header lang="pt" otherHref="/en" />
      <JsonLd data={personJsonLd("pt")} />
      <Home lang="pt" />
      <Footer lang="pt" />
      <AvailabilityBar lang="pt" />
    </>
  );
}
