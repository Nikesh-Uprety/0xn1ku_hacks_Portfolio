
import { useState } from "react";
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
    { path: "/blogs", label: "/blogs", color: "text-neon-green" },
    { path: "/hacks", label: "/hacks", color: "text-neon-green" },
    { path: "/secret", label: "/secret", color: "text-red-500" },
  ];

  const isHomePage = location.pathname === "/";

  const handleButtonClick = () => {
    if (isHomePage) {
      // Show bruteforce simulation on home page
      setShowBruteforce(true);
      setTimeout(() => {
        setShowBruteforce(false);
        setIsOpen(true);
      }, 3000);
    } else {
      // Navigate to home on other pages
      navigate("/");
    }
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleBruteforceComplete = () => {
    setShowBruteforce(false);
    setIsOpen(true);
  };

  return (
    <div className="fixed top-20 right-8 z-50">
      {/* Bruteforce Simulation */}
      {showBruteforce && (
        <div className="absolute top-16 right-0 mb-2 min-w-[300px]">
          <BruteforceSimulation onComplete={handleBruteforceComplete} />
        </div>
      )}

      {/* Dropdown Menu */}
      {isOpen && !showBruteforce && (
        <div className="absolute top-16 right-0 mb-2 min-w-[200px]">
          <div className="bg-cyber-dark border border-neon-green/50 rounded-lg p-4 space-y-2 animate-fade-in">
            {routes.map((route) => (
              <button
                key={route.path}
                onClick={() => handleRouteClick(route.path)}
                className={`w-full text-left p-2 rounded hover:bg-neon-green/10 transition-colors font-mono ${route.color}`}
              >
                {route.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleButtonClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative bg-cyber-dark border border-neon-green/50 rounded-lg px-4 py-2 hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 animate-float"
        disabled={showBruteforce}
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
