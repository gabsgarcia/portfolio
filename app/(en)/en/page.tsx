import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { Home } from "@/components/Home";
import { JsonLd } from "@/components/JsonLd";
import { dict } from "@/lib/i18n";
import { pageMetadata, personJsonLd } from "@/lib/meta";

export const metadata = pageMetadata({ lang: "en", path: "/en", altPath: "/", description: dict.en.metaDescription });

export default function Page() {
  return (
    <>
      <Header lang="en" otherHref="/" />
      <JsonLd data={personJsonLd("en")} />
      <Home lang="en" />
      <Footer lang="en" />
      <AvailabilityBar lang="en" />
    </>
  );
}
