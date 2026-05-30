import React, { useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HeroSection } from './sections/HeroSection';
import { ProblemSection } from './sections/ProblemSection';
import { StorytellingSection } from './sections/StorytellingSection';
import { TechnologySection } from './sections/TechnologySection';
import { MethodologySection } from './sections/MethodologySection';
import { MRVSection } from './sections/MRVSection';
import { ImpactSection } from './sections/ImpactSection';
import { TeamSection } from './sections/TeamSection';
import { OfftakeSection } from './sections/OfftakeSection';
import { CarbonPathwaySection } from './sections/CarbonPathwaySection';
import { LinkedInFeedSection } from './sections/LinkedInFeedSection';

function App() {
  useEffect(() => {
    // Set up global scroll reveal
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="grain-overlay">
      <Navbar />
      <main>
        <HeroSection />
        <ProblemSection />
        <StorytellingSection />
        <TechnologySection />
        <MethodologySection />
        <CarbonPathwaySection /> 
        <MRVSection />
        <ImpactSection />
        <TeamSection />
        <LinkedInFeedSection />
        <OfftakeSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
