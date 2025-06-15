
import { useState, useEffect } from "react";

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  
  const terminalText = "./0xn1ku_hacks ~# whoami";
  const roles = ["Ethical Hacker", "CTF Creator", "Full Stack Dev", "DevSecOps"];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    
    if (isTyping && currentText.length < terminalText.length) {
      timeout = setTimeout(() => {
        setCurrentText(terminalText.slice(0, currentText.length + 1));
      }, 100);
    } else if (currentText.length === terminalText.length) {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [currentText, isTyping, terminalText]);

  return (
    <div className="container mx-auto px-4 sm:px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Terminal Prompt */}
        <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 mb-8 font-mono">
          <div className="flex items-center mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="ml-4 text-gray-400 text-sm">terminal</div>
          </div>
          
          <div className="text-accent-teal text-lg">
            {currentText}
            {isTyping && <span className="animate-pulse">|</span>}
          </div>
          
          {!isTyping && (
            <div className="mt-4 text-gray-300">
              <div className="mb-2">=> {roles.join(" | ")}</div>
              <div className="text-gray-500 text-sm mt-4">
                "Crafting secure systems, breaking bad ones."
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Nikesh Uprety
          </h1>
          
          <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
            Cybersecurity specialist passionate about ethical hacking, CTF challenges, 
            and building secure applications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#projects" 
              className="bg-accent-teal text-dark-bg px-6 py-3 rounded-lg font-medium hover:bg-accent-teal/90 transition-colors"
            >
              View Projects
            </a>
            <a 
              href="#contact" 
              className="border border-accent-teal text-accent-teal px-6 py-3 rounded-lg font-medium hover:bg-accent-teal/10 transition-colors"
            >
              Contact Me
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
