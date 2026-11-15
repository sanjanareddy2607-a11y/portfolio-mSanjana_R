import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { projects } from "@/lib/content";

const project = projects[3];

export const metadata: Metadata = {
  title: `${project.title} — Case Study | Mummaka Sanjana Reddy`,
  description: project.summary,
};

export default function EchoIntel() {
  return <CaseStudyView project={project} index={project.index} />;
}
