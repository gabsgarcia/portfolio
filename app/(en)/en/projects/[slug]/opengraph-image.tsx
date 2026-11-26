import { getProject, projects } from "@/content/projects";
import { ogSize, renderOgImage, rongalongArt } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Gabi Garcia";

export function generateStaticParams() {
  return projects.filter((p) => p.caseStudy).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOgImage("en", project && { title: project.title, subtitle: project.caseStudy?.lead.en ?? project.summary.en }, project?.cover === "rongalong" ? rongalongArt.en : undefined);
}
