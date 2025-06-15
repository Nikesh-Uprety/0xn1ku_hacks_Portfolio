
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";
import { useState } from "react";

const Index = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/90 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="font-mono text-accent-teal text-lg">
              ./nikesh.dev
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8 items-center">
              <a href="#about" className="text-gray-300 hover:text-accent-teal transition-colors text-sm">
                About
              </a>
              <a href="#skills" className="text-gray-300 hover:text-accent-teal transition-colors text-sm">
                Skills
              </a>
              <a href="#projects" className="text-gray-300 hover:text-accent-teal transition-colors text-sm">
                Projects
              </a>
              <a href="#contact" className="text-gray-300 hover:text-accent-teal transition-colors text-sm">
                Contact
              </a>
              <div className="flex space-x-4">
                <a href="https://github.com/Nikesh-Uprety" className="text-gray-400 hover:text-accent-teal transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/nikesh-uprety-287a88244/" className="text-gray-400 hover:text-accent-teal transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-accent-teal hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
              <div className="flex flex-col space-y-4 pt-4">
                <a href="#about" className="text-gray-300 hover:text-accent-teal transition-colors text-center" onClick={() => setIsMobileMenuOpen(false)}>
                  About
                </a>
                <a href="#skills" className="text-gray-300 hover:text-accent-teal transition-colors text-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Skills
                </a>
                <a href="#projects" className="text-gray-300 hover:text-accent-teal transition-colors text-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Projects
                </a>
                <a href="#contact" className="text-gray-300 hover:text-accent-teal transition-colors text-center" onClick={() => setIsMobileMenuOpen(false)}>
                  Contact
                </a>
                <div className="flex justify-center space-x-6 pt-2">
                  <a href="https://github.com/Nikesh-Uprety" className="text-gray-400 hover:text-accent-teal transition-colors" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://www.linkedin.com/in/nikesh-uprety-287a88244/" className="text-gray-400 hover:text-accent-teal transition-colors" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section id="home" className="py-20">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about" className="py-20 border-t border-gray-800">
          <AboutSection />
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-20 border-t border-gray-800">
          <SkillsSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 border-t border-gray-800">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 border-t border-gray-800">
          <ContactSection />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="font-mono text-gray-500 text-sm">
            <div className="mb-2">stay curious_</div>
            <div className="text-xs">© 2024 Nikesh Uprety. Built with security in mind.</div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
