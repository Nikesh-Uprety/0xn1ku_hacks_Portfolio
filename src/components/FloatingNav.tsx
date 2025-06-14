
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Terminal, Home, FileText, Wrench, Shield, Link } from "lucide-react";

const FloatingNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDecoding, setIsDecoding] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const routes = [
    { path: "/blogs", label: "Security Research Blog", icon: FileText },
    { path: "/tools", label: "CTF Toolkit", icon: Wrench },
    { path: "/secret", label: "Classified Access", icon: Shield },
    { path: "/nexus", label: "Quick Links Hub", icon: Link },
  ];

  const handleButtonClick = () => {
    setIsDecoding(true);
    setTimeout(() => {
      setIsDecoding(false);
      setIsOpen(!isOpen);
    }, 800);
  };

  const handleRouteClick = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleHomeClick = () => {
    navigate("/");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 mb-2 min-w-[250px]">
          <div className="glass-morphism rounded-lg p-4 space-y-2 animate-fade-in">
            {/* Home Button (only show when not on home) */}
            {location.pathname !== "/" && (
              <button
                onClick={handleHomeClick}
                className="w-full flex items-center space-x-3 p-3 rounded hover:bg-neon-green/10 transition-colors text-left text-gray-300 hover:text-neon-green"
              >
                <Home className="w-4 h-4" />
                <span className="font-mono text-sm">[HOME]</span>
              </button>
            )}
            
            {/* API Routes */}
            {routes.map((route, index) => {
              const Icon = route.icon;
              return (
                <button
                  key={route.path}
                  onClick={() => handleRouteClick(route.path)}
                  className="w-full flex items-center space-x-3 p-3 rounded hover:bg-neon-green/10 transition-colors text-left text-gray-300 hover:text-neon-green"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-mono text-sm">{route.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={handleButtonClick}
        className="relative bg-cyber-dark border-2 border-neon-green/50 rounded-full p-4 hover:border-neon-green transition-all duration-300 group animate-glow-pulse"
      >
        <Terminal className="w-6 h-6 text-neon-green" />
        
        {/* Glitch overlay when decoding */}
        {isDecoding && (
          <div className="absolute inset-0 rounded-full bg-neon-green/20 animate-glitch">
            <div className="absolute inset-0 rounded-full border-2 border-neon-green animate-pulse"></div>
          </div>
        )}
        
        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="bg-cyber-dark border border-neon-green/50 rounded px-3 py-1 whitespace-nowrap">
            <span className="text-xs font-mono text-neon-green">
              {isDecoding ? "DECODING..." : "CHECKOUT API ROUTES"}
            </span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default FloatingNav;
