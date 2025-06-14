
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
    { status: 200, route: "/hacks", message: "200 OK", color: "text-neon-green", clickable: true },
    { status: 200, route: "/secret", message: "200 OK", color: "text-neon-green", clickable: true },
    { status: 404, route: "/admin/passwords.txt", message: "404 Not Found", color: "text-red-500", clickable: false },
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
    <div className="bg-cyber-dark border border-neon-green/50 rounded-lg p-4 min-w-[300px] animate-fade-in">
      <div className="font-mono text-sm space-y-2">
        {results.map((result, index) => (
          <div key={index} className="flex items-center space-x-2 animate-fade-in">
            <span className={`${result.color} font-bold`}>
              {result.message}
            </span>
            <span className="text-gray-400">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.1}s` }}>
                  .
                </span>
              ))}
            </span>
            {result.clickable ? (
              <button
                onClick={() => handleRouteClick(result.route)}
                className="text-gray-300 hover:text-neon-green transition-colors cursor-pointer underline"
              >
                {result.route}
              </button>
            ) : (
              <span className="text-gray-300">
                {result.route}
              </span>
            )}
          </div>
        ))}
        
        {isScanning && currentStep < scanResults.length && (
          <div className="flex items-center space-x-2 text-gray-400">
            <span>Scanning</span>
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
