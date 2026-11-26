import type { Metadata } from "next";
import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { LabPage } from "@/components/lab/LabPage";
import { labCopy } from "@/lib/lab";
import { pageMetadata } from "@/lib/meta";

export const metadata: Metadata = pageMetadata({
  lang: "pt",
  path: "/lab",
  altPath: "/en/lab",
  title: labCopy.pt.metaTitle,
  description: labCopy.pt.metaDescription,
});

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
