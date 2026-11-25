import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { Home } from "@/components/Home";

export default function Page() {
  return (
    <>
      <Header lang="pt" otherHref="/en" />
      <Home lang="pt" />
      <Footer lang="pt" />
      <AvailabilityBar lang="pt" />
    </>
  );
}
