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
    return originalText
      .split('')
      .map(char => {
        // Keep certain characters stable (like ./: to maintain structure)
        if (char === '.' || char === '/' || char === ':') {
          return char;
        }
        // Randomly glitch other characters
        return Math.random() < 0.3 ? generateRandomChar() : char;
      })
      .join('');
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
