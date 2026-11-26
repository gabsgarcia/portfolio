import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { Home } from "@/components/Home";

export default function Page() {
  return (
    <>
      <Header lang="en" otherHref="/" />
      <Home lang="en" />
      <Footer lang="en" />
      <AvailabilityBar lang="en" />
    </>
  );
}
