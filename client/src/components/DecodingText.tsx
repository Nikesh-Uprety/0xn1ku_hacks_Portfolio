
import { useState, useEffect } from 'react';

interface DecodingTextProps {
  baseText: string;
  isActive: boolean;
}

export const DecodingText = ({ baseText, isActive }: DecodingTextProps) => {
  const [displayText, setDisplayText] = useState(baseText);

  const generateRandomChar = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateGlitchedText = (originalText: string) => {
    // Split the text into stable part and glitchable part
    const stablePart = './api/';
    const glitchablePart = 'abcdef'; // Fixed 6 letters
    
    if (originalText === './api/FUZZ') {
      const glitchedPart = Array.from({ length: 6 }, () => generateRandomChar()).join('');
      return stablePart + glitchedPart;
    }
    
    return originalText;
  };

  useEffect(() => {
    if (!isActive) {
      setDisplayText(baseText);
      return;
    }

    const interval = setInterval(() => {
      setDisplayText(generateGlitchedText(baseText));
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, baseText]);

  return (
    <span className="font-mono text-neon-green">
      {displayText}
    </span>
  );
};
