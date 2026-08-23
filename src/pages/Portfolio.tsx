import ExperienceCanvas from '@/components/portfolio/three/ExperienceCanvas'
import HeroSection from '@/components/portfolio/sections/HeroSection'
import WorkflowSection from '@/components/portfolio/sections/WorkflowSection'
import ArchitectureSection from '@/components/portfolio/sections/ArchitectureSection'
import CaseStudiesSection from '@/components/portfolio/sections/CaseStudiesSection'
import HumanSection from '@/components/portfolio/sections/HumanSection'
import ExperienceSection from '@/components/portfolio/sections/ExperienceSection'
import ContactSection from '@/components/portfolio/sections/ContactSection'

export default function Portfolio() {
  return (
    <div className="bg-black text-white min-h-screen selection:bg-green-500/30 font-sans">
      <ExperienceCanvas />
      
      <main className="relative z-10 pointer-events-none">
        <div className="pointer-events-auto">
          <HeroSection />
          <WorkflowSection />
          <ArchitectureSection />
          <CaseStudiesSection />
          <HumanSection />
          <ExperienceSection />
          <ContactSection />
        </div>
      </main>
    </div>
  )
}

