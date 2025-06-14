
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
    // Handle different base texts
    if (originalText === './api/FUZZ') {
      const stablePart = './api/';
      const glitchablePart = Array.from({ length: 6 }, () => generateRandomChar()).join('');
      return stablePart + glitchablePart;
    } else if (originalText === 'FUZZER') {
      // For the terminal header, glitch all 6 letters
      return Array.from({ length: 6 }, () => generateRandomChar()).join('');
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
