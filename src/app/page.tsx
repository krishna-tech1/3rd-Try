import { DynamicCanvas } from "@/components/canvas/DynamicCanvas";
import { HeroSection } from "@/components/sections/HeroSection";
import { MarqueeSection } from "@/components/sections/MarqueeSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { AchievementsSection } from "@/components/sections/AchievementsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/ui/Footer";

export default function Home() {
  return (
    <>
      {/* 3D Fixed Canvas Background Layer */}
      <DynamicCanvas />

      {/* Foreground Semantic DOM Content Layer */}
      <div className="relative z-10 w-full overflow-x-hidden">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectsSection />
        <ExperienceSection />
        <SkillsSection />
        <AchievementsSection />
        <ContactSection />
        <Footer />
      </div>
    </>
  );
}
