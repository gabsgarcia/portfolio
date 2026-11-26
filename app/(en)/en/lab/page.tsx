import type { Metadata } from "next";
import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { LabPage } from "@/components/lab/LabPage";
import { labCopy } from "@/lib/lab";
import { pageMetadata } from "@/lib/meta";

export const metadata: Metadata = pageMetadata({
  lang: "en",
  path: "/en/lab",
  altPath: "/lab",
  title: labCopy.en.metaTitle,
  description: labCopy.en.metaDescription,
});

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
