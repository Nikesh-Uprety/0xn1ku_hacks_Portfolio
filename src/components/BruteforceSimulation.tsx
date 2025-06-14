
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DecodingText } from './DecodingText';

interface BruteforceSimulationProps {
  onComplete: () => void;
}

interface ScanResult {
  status: number;
  route: string;
  message: string;
  color: string;
  clickable: boolean;
}

export const BruteforceSimulation = ({ onComplete }: BruteforceSimulationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isScanning, setIsScanning] = useState(true);
  const [results, setResults] = useState<ScanResult[]>([]);
  const [scanComplete, setScanComplete] = useState(false);
  const navigate = useNavigate();

  const scanResults: ScanResult[] = [
    { status: 200, route: "/blogs", message: "200 OK", color: "text-neon-green", clickable: true },
    { status: 200, route: "/tools", message: "200 OK", color: "text-neon-green", clickable: true },
    { status: 200, route: "/hacks", message: "200 OK", color: "text-neon-green", clickable: true },
    { status: 200, route: "/secret", message: "200 OK", color: "text-neon-green", clickable: true },
    { status: 404, route: "/admin", message: "404 Not Found", color: "text-red-500", clickable: false },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentStep < scanResults.length) {
        setResults(prev => [...prev, scanResults[currentStep]]);
        setCurrentStep(prev => prev + 1);
      } else {
        setIsScanning(false);
        setScanComplete(true);
        clearInterval(interval);
      }
    }, 700);

    return () => clearInterval(interval);
  }, [currentStep]);

  const handleRouteClick = (route: string) => {
    navigate(route);
    onComplete();
  };

  return (
    <div className="fixed top-12 right-8 bg-black border border-neon-green/50 rounded-lg p-3 w-80 animate-fade-in terminal-scroll z-40">
      <div className="font-mono text-sm space-y-1 text-left">
        {/* Terminal header */}
        <div className="text-neon-green mb-2">
          <span>~$ ffuf -u url.txt/api/</span>
          <DecodingText baseText="FUZZER" isActive={isScanning} />
          <span> -w ./config.txt</span>
        </div>
        
        {results.map((result, index) => (
          <div key={index} className="flex items-start space-x-2 animate-fade-in">
            <span className={`${result.color} font-bold whitespace-nowrap`}>
              {result.message}
            </span>
            <span className="text-gray-400 flex-1 text-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <span key={i}>.</span>
              ))}
            </span>
            {result.clickable ? (
              <button
                onClick={() => handleRouteClick(result.route)}
                className="text-white hover:text-neon-green transition-colors cursor-pointer underline text-left whitespace-nowrap"
              >
                {result.route}
              </button>
            ) : (
              <span className="text-white text-left whitespace-nowrap">
                {result.route}
              </span>
            )}
          </div>
        ))}
        
        {isScanning && currentStep < scanResults.length && (
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Scanning directories</span>
            <span className="flex space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <span 
                  key={i} 
                  className="animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  .
                </span>
              ))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
