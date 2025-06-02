
import { useState, useRef } from "react";
import { TypeWriter } from "./TypeWriter";

export const HeroSection = () => {
  const [isGlitching, setIsGlitching] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleImageHover = () => {
    setIsGlitching(true);
    setTimeout(() => setIsGlitching(false), 300);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (imageRef.current) {
      const rect = imageRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
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
            ref={imageRef}
            className={`relative ${isGlitching ? "animate-glitch" : ""} ${isHovering ? "animate-pulse" : ""}`}
            onMouseEnter={() => {
              handleImageHover();
              setIsHovering(true);
            }}
            onMouseLeave={() => setIsHovering(false)}
            onMouseMove={handleMouseMove}
            style={{
              transform: isHovering ? `translate(${(mousePosition.x - 50) * 0.02}px, ${(mousePosition.y - 50) * 0.02}px)` : 'translate(0, 0)',
              transition: isHovering ? 'none' : 'transform 0.3s ease-out'
            }}
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
                className={`w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-lg neon-border transition-all duration-300 ${
                  isGlitching ? "opacity-50" : ""
                } ${imageLoaded ? "opacity-100" : "opacity-0 absolute"}`}
                onLoad={() => setImageLoaded(true)}
                loading="eager"
                decoding="async"
                style={{
                  filter: isHovering ? `drop-shadow(${(mousePosition.x - 50) * 0.1}px ${(mousePosition.y - 50) * 0.1}px 10px rgba(0, 255, 65, 0.3))` : 'none',
                  clipPath: isHovering ? `circle(80% at ${mousePosition.x}% ${mousePosition.y}%)` : 'circle(100% at 50% 50%)',
                  transition: 'clip-path 0.3s ease-out, filter 0.3s ease-out'
                }}
              />
              {isGlitching && (
                <div className="absolute inset-0 bg-neon-green opacity-20 rounded-lg animate-pulse"></div>
              )}
              {isHovering && (
                <div 
                  className="absolute inset-0 rounded-lg"
                  style={{
                    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(0, 255, 65, 0.1) 0%, transparent 50%)`,
                    mixBlendMode: 'overlay'
                  }}
                />
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
            <TypeWriter texts={roleTexts} speed={50} delay={800} repeatInterval={10000} />
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
