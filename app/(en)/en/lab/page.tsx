import type { Metadata } from "next";
import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { LabPage } from "@/components/lab/LabPage";
import { labCopy } from "@/lib/lab";

export const metadata: Metadata = {
  title: labCopy.en.metaTitle,
  description: labCopy.en.metaDescription,
  alternates: { languages: { "pt-BR": "/lab", en: "/en/lab" } },
};

export default function Page() {
  return (
    <>
      <Header lang="en" otherHref="/lab" />
      <LabPage lang="en" />
      <Footer lang="en" />
      <AvailabilityBar lang="en" />
    </>
  );
}
