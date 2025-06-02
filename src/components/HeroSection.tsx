
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
    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-20">
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center order-1 lg:order-1">
          <div
            className={`relative ${isGlitching ? "animate-glitch" : ""}`}
            onMouseEnter={handleImageHover}
          >
            <div className="relative">
              {!imageLoaded && (
                <div className="w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 bg-cyber-dark rounded-lg neon-border animate-pulse flex items-center justify-center">
                  <div className="text-neon-green font-mono">Loading...</div>
                </div>
              )}
              <img
                src="/lovable-uploads/full_final_banner.png"
                alt="Nikesh Uprety"
                className={`w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-lg neon-border transition-all duration-300 ${
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
          <div className="font-mono text-neon-green text-sm sm:text-base lg:text-lg">
            <span className="animate-typewriter">
              0xN1kU_H4X_!@kali:~$ whoami
            </span>
            <span className="animate-blink ml-1">_</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-cyber font-bold leading-tight">
            <span className="text-white block">CYBERSECURITY</span>
            <span className="text-neon-green animate-text-flicker block">
              SPECIALIST
            </span>
          </h1>

          <div className="min-h-[120px] sm:min-h-[140px]">
            <TypeWriter texts={roleTexts} speed={50} delay={800} repeatInterval={10000} />
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6 justify-center lg:justify-start">
            <button className="cyber-button px-4 sm:px-6 lg:px-8 py-3 rounded font-mono text-sm sm:text-base lg:text-lg hover:scale-105 transition-transform">
              DOWNLOAD CV
            </button>
            <button className="border border-neon-green text-neon-green px-4 sm:px-6 lg:px-8 py-3 rounded font-mono text-sm sm:text-base lg:text-lg hover:bg-neon-green hover:text-black transition-colors">
              VIEW PROJECTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
