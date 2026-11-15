import { auth } from "@clerk/nextjs/server";
import { GateScreen } from "@/components/GateScreen";
import { PortfolioChrome } from "@/components/PortfolioChrome";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { SelectedWork } from "@/components/SelectedWork";
import { ResearchTeaser } from "@/components/ResearchTeaser";
import { CurrentlyExploring } from "@/components/CurrentlyExploring";
import { BeyondSection } from "@/components/BeyondSection";
import { FinalCTA } from "@/components/FinalCTA";

export default async function Home() {
  const { userId } = await auth();

  if (!userId) {
    return <GateScreen />;
  }

  return (
    <PortfolioChrome>
      <div className="w-full">
        <Hero />
        <AboutSection />
        <ExperienceSection />
        <SelectedWork />
        <ResearchTeaser />
        <CurrentlyExploring />
        <BeyondSection />
        <FinalCTA />
      </div>
    </PortfolioChrome>
  );
}
