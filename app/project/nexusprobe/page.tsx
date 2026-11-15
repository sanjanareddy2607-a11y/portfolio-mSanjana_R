import type { Metadata } from "next";
import { CaseStudyView } from "@/components/CaseStudyView";
import { projects } from "@/lib/content";

const project = projects[4];

export const metadata: Metadata = {
  title: `${project.title} — Case Study | Mummaka Sanjana Reddy`,
  description: project.summary,
};

export default function NexusProbe() {
  return <CaseStudyView project={project} index={project.index} />;
}
