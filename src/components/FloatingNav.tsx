
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: "/blogs", label: "/blogs", color: "text-neon-green" },
    { path: "/nexus", label: "/hacks", color: "text-neon-green" },
    { path: "/secret", label: "/secret", color: "text-red-500" },
  ];

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-32 right-8 z-50">
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 min-w-[200px]">
          <div className="glass-morphism rounded-lg p-4 space-y-2 animate-fade-in">
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
        className="relative bg-cyber-dark border-2 border-neon-green/50 rounded-lg px-4 py-2 hover:border-neon-green transition-all duration-300 animate-float"
      >
        <span className="font-mono text-neon-green text-sm">./api/FUZZ</span>
      </button>
    </div>
  );
};

export default FloatingNav;
