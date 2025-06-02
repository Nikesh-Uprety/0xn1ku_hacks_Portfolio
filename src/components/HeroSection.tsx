
import { useState } from "react";
import { TypeWriter } from "./TypeWriter";

export const HeroSection = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  const roleTexts = [
    "DevSecOps Engineer",
    "Ethical Hacker & Security Researcher",
    "Full-Stack Developer"
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center order-1 lg:order-1">
          <div
            className={`relative ${isGlitching ? "animate-glitch" : ""}`}
            onMouseEnter={handleImageHover}
          >
            <div className="relative">
              {!imageLoaded && (
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-cyber-dark rounded-lg neon-border animate-pulse flex items-center justify-center">
                  <div className="text-neon-green font-mono">Loading...</div>
                </div>
              )}
              <img
                src="/lovable-uploads/full_final_banner.png"
                alt="Nikesh Uprety"
                className={`w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-lg neon-border transition-opacity duration-300 ${
                  isGlitching ? "opacity-50" : ""
                } ${imageLoaded ? "opacity-100" : "opacity-0 absolute"}`}
                onLoad={() => setImageLoaded(true)}
                loading="eager"
                decoding="async"
              />
              {isGlitching && (
                <div className="absolute inset-0 bg-neon-green opacity-20 rounded-lg animate-pulse"></div>
              )}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple opacity-30 rounded-lg blur"></div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6 order-2 lg:order-2 text-center lg:text-left">
          <div className="font-mono text-neon-green text-sm sm:text-lg">
            <span className="animate-typewriter">
              0xN1kU_H4X_!@kali:~$ whoami
            </span>
            <span className="animate-blink ml-1">_</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-cyber font-bold leading-tight">
            <span className="text-white block sm:inline">CYBERSECURITY</span>
            <br />
            <span className="text-neon-green animate-text-flicker block sm:inline">
              SPECIALIST
            </span>
          </h1>

          <div className="min-h-[120px]">
            <TypeWriter texts={roleTexts} speed={50} delay={800} />
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 justify-center lg:justify-start">
            <button className="cyber-button px-6 sm:px-8 py-3 rounded font-mono text-sm sm:text-lg hover:scale-105 transition-transform">
              DOWNLOAD CV
            </button>
            <button className="border border-neon-green text-neon-green px-6 sm:px-8 py-3 rounded font-mono text-sm sm:text-lg hover:bg-neon-green hover:text-black transition-colors">
              VIEW PROJECTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
