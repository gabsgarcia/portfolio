import type { Metadata } from "next";
import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { LabPage } from "@/components/lab/LabPage";
import { labCopy } from "@/lib/lab";

export const metadata: Metadata = {
  title: labCopy.pt.metaTitle,
  description: labCopy.pt.metaDescription,
  alternates: { languages: { "pt-BR": "/lab", en: "/en/lab" } },
};

export default function Page() {
  return (
    <>
      <Header lang="pt" otherHref="/en/lab" />
      <LabPage lang="pt" />
      <Footer lang="pt" />
      <AvailabilityBar lang="pt" />
    </>
  );
}
