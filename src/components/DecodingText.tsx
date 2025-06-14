
import { useState, useEffect } from 'react';

interface DecodingTextProps {
  baseText: string;
  isActive: boolean;
}

export const DecodingText = ({ baseText, isActive }: DecodingTextProps) => {
  const [decodingChars, setDecodingChars] = useState('');

  const generateRandomChar = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ%123456789101112131415161718192020';
    return chars[Math.floor(Math.random() * chars.length)];
  };

  const generateRandomString = () => {
    return Array.from({ length: 4 }, () => generateRandomChar()).join('');
  };

  useEffect(() => {
    if (!isActive) {
      setDecodingChars('');
      return;
    }

    const interval = setInterval(() => {
      setDecodingChars(generateRandomString());
    }, 100);

    return () => clearInterval(interval);
  }, [isActive]);

  return (
    <span className="font-mono text-neon-green">
      {baseText}
      {isActive && <span className="animate-pulse">{decodingChars}</span>}
    </span>
  );
};
