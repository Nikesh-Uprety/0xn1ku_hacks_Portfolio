
import { useState, useEffect } from 'react';

interface DecodingTextProps {
  baseText: string;
  isActive: boolean;
}

export const DecodingText = ({ baseText, isActive }: DecodingTextProps) => {
  const [displayText, setDisplayText] = useState(baseText);

  const generateRandomChar = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(){}[]|\\:";\'<>?,./';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateGlitchedText = (originalText: string) => {
    // Split the text into stable part and glitchable part
    const stablePart = './api/';
    const glitchablePart = 'FUZZ';
    
    if (originalText === './api/FUZZ') {
      const glitchedFuzz = glitchablePart
        .split('')
        .map(() => generateRandomChar())
        .join('');
      
      return stablePart + glitchedFuzz;
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
