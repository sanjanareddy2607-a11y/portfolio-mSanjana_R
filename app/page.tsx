import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { SelectedWork } from "@/components/SelectedWork";
import { ResearchTeaser } from "@/components/ResearchTeaser";
import { CurrentlyExploring } from "@/components/CurrentlyExploring";
import { BeyondSection } from "@/components/BeyondSection";
import { FinalCTA } from "@/components/FinalCTA";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <AboutSection />
      <SelectedWork />
      <ResearchTeaser />
      <CurrentlyExploring />
      <BeyondSection />
      <FinalCTA />
    </div>
  );
}
