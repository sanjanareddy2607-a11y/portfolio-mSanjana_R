import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { projects } from "@/lib/content";

const project = projects[2];

export const metadata: Metadata = {
  title: `${project.title} — Case Study | Mummaka Sanjana Reddy`,
  description: project.summary,
};

export default function JARVIS() {
  return <CaseStudyView project={project} index={project.index} />;
}
