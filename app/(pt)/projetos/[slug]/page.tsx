import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudy } from "@/components/CaseStudy";
import { AvailabilityBar, Footer, Header } from "@/components/Chrome";
import { getProject, projects } from "@/content/projects";
import { projectPath } from "@/lib/i18n";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const project = getProject((await params).slug);
  return project ? { title: project.title, description: project.summary.pt } : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project?.caseStudy) notFound();
  return (
    <>
      <Header lang="pt" otherHref={projectPath("en", slug)} />
      <CaseStudy project={project} lang="pt" />
      <Footer lang="pt" />
      <AvailabilityBar lang="pt" />
    </>
  );
}
