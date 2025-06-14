
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { DecodingText } from "./DecodingText";
import { BruteforceSimulation } from "./BruteforceSimulation";

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showBruteforce, setShowBruteforce] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: "/", label: "/home", color: "text-neon-green" },
    { path: "/blogs", label: "/blogs", color: "text-neon-green" },
    { path: "/hacks", label: "/hacks", color: "text-neon-green" },
    { path: "/secret", label: "/secret", color: "text-red-500" },
  ];

  const isHomePage = location.pathname === "/";

  const handleButtonClick = () => {
    if (isHomePage) {
      // Toggle bruteforce simulation on home page
      setShowBruteforce(!showBruteforce);
    } else {
      // Navigate to home on other pages
      navigate("/");
    }
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
  };

  const handleBruteforceComplete = () => {
    setShowBruteforce(false);
    // Don't automatically open the dropdown, let user interact with the scan results
  };

  return (
    <div className="fixed top-20 right-8 z-50">
      {/* Bruteforce Simulation */}
      {showBruteforce && (
        <div className="absolute top-16 right-0 mb-2 min-w-[300px]">
          <BruteforceSimulation onComplete={handleBruteforceComplete} />
        </div>
      )}

      {/* Route Buttons for non-home pages */}
      {!isHomePage && !showBruteforce && (
        <div className="flex flex-col space-y-2 mb-2">
          {routes
            .filter(route => route.path !== location.pathname)
            .map((route) => (
              <button
                key={route.path}
                onClick={() => handleRouteClick(route.path)}
                className="bg-cyber-dark border border-neon-green/50 rounded-lg px-4 py-2 hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 animate-float"
              >
                <span className={`font-mono ${route.color}`}>{route.label}</span>
              </button>
            ))}
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-cyber-dark border border-neon-green/50 rounded-lg px-4 py-2 hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 animate-float"
      >
        {isHomePage ? (
          <DecodingText baseText="./api/FUZZ" isActive={isHovered || isOpen || showBruteforce} />
        ) : (
          <span className="font-mono text-neon-green">/home</span>
        )}
      </button>
    </div>
  );
};

export default FloatingNav;
