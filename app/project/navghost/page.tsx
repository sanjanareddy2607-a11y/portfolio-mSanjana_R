import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { projects } from "@/lib/content";

const project = projects[0];

export const metadata: Metadata = {
  title: `${project.title} — Case Study | Mummaka Sanjana Reddy`,
  description: project.summary,
};

export default function NavGhost() {
  return <CaseStudyView project={project} index={project.index} />;
}
