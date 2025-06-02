
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import Terminal from "@/components/Terminal";
import { MatrixRain } from "@/components/MatrixRain";
import { MouseCursor } from "@/components/MouseCursor";
import { Github, Linkedin } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-cyber-bg relative overflow-hidden cursor-none">
      <MatrixRain />
      <MouseCursor />
      
      <div className="relative z-10">
        {/* Navigation */}
        <nav className="fixed top-0 left-0 right-0 z-50 glass-morphism">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="font-cyber font-bold text-xl text-neon-green glitch-text" data-text="NIKESH.UPRETY">
                NIKESH.UPRETY
              </div>
              <div className="hidden md:flex space-x-8 items-center">
                <a href="#home" className="hover:text-neon-green transition-colors">
                  HOME
                </a>
                <a href="#projects" className="hover:text-neon-green transition-colors">PROJECTS</a>
                <a href="https://github.com/Nikesh-Uprety" className="hover:text-neon-green transition-colors" target="_blank" rel="noopener noreferrer">
                  <Github className="w-5 h-5" />
                </a>
                <a href="https://www.linkedin.com/in/nikesh-uprety-287a88244/" className="hover:text-neon-green transition-colors" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#contact" className="hover:text-neon-green transition-colors">CONTACT</a>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section id="home" className="pt-20">
          <HeroSection />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20">
          <ProjectsSection />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-cyber font-bold text-center mb-12 text-neon-green">
              ESTABLISH CONNECTION
            </h2>
            <div className="max-w-2xl mx-auto text-center">
              <p className="text-lg mb-8">
                Ready to collaborate on your next cybersecurity project or discuss innovative solutions?
              </p>
              <div className="flex justify-center space-x-6">
                <a 
                  href="https://github.com/Nikesh-Uprety" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="cyber-button px-6 py-3 rounded font-mono"
                >
                  GitHub Profile
                </a>
                <a 
                  href="mailto:upretynikesh021@gmail.com" 
                  className="cyber-button px-6 py-3 rounded font-mono"
                >
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Terminal Window */}
      <Terminal />
    </div>
  );
};

export default Index;
