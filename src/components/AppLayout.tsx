import React, { useEffect } from 'react';
import ParticleBackground from './portfolio/ParticleBackground';
import CursorGlow from './portfolio/CursorGlow';
import Navbar from './portfolio/Navbar';
import HeroSection from './portfolio/HeroSection';
import MarqueeSection from './portfolio/MarqueeSection';
import StatsSection from './portfolio/StatsSection';
import ServicesSection from './portfolio/ServicesSection';
import SpecializationSection from './portfolio/SpecializationSection';
import TechStackSection from './portfolio/TechStackSection';
import ProcessSection from './portfolio/ProcessSection';
import ProjectsSection from './portfolio/ProjectsSection';
import BusinessSolutions from './portfolio/BusinessSolutions';
import AboutSection from './portfolio/AboutSection';
import TestimonialsSection from './portfolio/TestimonialsSection';
import ContactSection from './portfolio/ContactSection';
import FooterSection from './portfolio/FooterSection';
import FloatingCTA from './portfolio/FloatingCTA';

const AppLayout: React.FC = () => {
  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
  }, []);

  return (
    <div className="min-h-screen bg-[hsl(220,20%,4%)] text-white overflow-x-hidden">
      {/* Background effects */}
      <ParticleBackground />
      <CursorGlow />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <HeroSection />
        <MarqueeSection />
        <StatsSection />
        <ServicesSection />
        <SpecializationSection />
        <TechStackSection />
        <ProcessSection />
        <ProjectsSection />
        <BusinessSolutions />
        <AboutSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <FooterSection />

      {/* Floating CTA */}
      <FloatingCTA />
    </div>
  );
};

export default AppLayout;
