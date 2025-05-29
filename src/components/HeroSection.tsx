
import { useState } from "react";

export const HeroSection = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  const handleImageHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Profile Image */}
        <div className="flex justify-center">
          <div
            className={`relative ${isGlitching ? "animate-glitch" : ""}`}
            onMouseEnter={handleImageHover}
          >
            <div className="relative">
              <img
                src="/lovable-uploads/full_final_banner.png"
                alt="Nikesh Uprety"
                className={`w-80 h-80 object-cover rounded-lg neon-border animate-glow-pulse ${
                  isGlitching ? "opacity-50" : ""
                }`}
              />
              {isGlitching && (
                <div className="absolute inset-0 bg-neon-green opacity-20 rounded-lg animate-pulse"></div>
              )}
            </div>
            <div className="absolute -inset-1 bg-gradient-to-r from-neon-green via-neon-blue to-neon-purple opacity-30 rounded-lg blur"></div>
          </div>
        </div>

        {/* Hero Text */}
        <div className="space-y-6">
          <div className="font-mono text-neon-green text-lg">
            <span className="animate-typewriter">
              0xN1kU_H4X_!@kali:~$ whoami
            </span>
            <span className="animate-blink ml-1">_</span>
          </div>

          <h1 className="text-5xl md:text-6xl font-cyber font-bold leading-tight">
            <span className="text-white">CYBERSECURITY</span>
            <br />
            <span className="text-neon-green animate-text-flicker">
              SPECIALIST
            </span>
          </h1>

          <div className="font-mono text-lg space-y-2">
            <p className="text-gray-300">
              <span className="text-neon-blue">{">"}</span> DevSecOps Engineer
            </p>
            <p className="text-gray-300">
              <span className="text-neon-blue">{">"}</span> Ethical Hacker &
              Security Researcher
            </p>
            <p className="text-gray-300">
              <span className="text-neon-blue">{">"}</span> Full-Stack Developer
            </p>
          </div>

          <div className="flex space-x-4 pt-6">
            <button className="cyber-button px-8 py-3 rounded font-mono text-lg hover:scale-105 transition-transform">
              DOWNLOAD CV
            </button>
            <button className="border border-neon-green text-neon-green px-8 py-3 rounded font-mono text-lg hover:bg-neon-green hover:text-black transition-colors">
              VIEW PROJECTS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
