
import { useState, useEffect } from 'react';

interface TypeWriterProps {
  texts: string[];
  speed?: number;
  delay?: number;
  repeatInterval?: number;
}

export const TypeWriter = ({ texts, speed = 50, delay = 1000, repeatInterval = 10000 }: TypeWriterProps) => {
  const [displayedTexts, setDisplayedTexts] = useState<string[]>([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [key, setKey] = useState(0);

  // Reset function to restart the animation
  const resetAnimation = () => {
    setDisplayedTexts([]);
    setCurrentTextIndex(0);
    setCurrentCharIndex(0);
    setIsTyping(true);
    setIsCompleted(false);
    setKey(prev => prev + 1);
  };

  useEffect(() => {
    if (isCompleted) {
      const repeatTimeout = setTimeout(() => {
        resetAnimation();
      }, repeatInterval);

      return () => clearTimeout(repeatTimeout);
    }
  }, [isCompleted, repeatInterval]);

  useEffect(() => {
    if (currentTextIndex >= texts.length) {
      setIsTyping(false);
      setIsCompleted(true);
      return;
    }

    const currentText = texts[currentTextIndex];
    
    if (currentCharIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayedTexts(prev => {
          const newTexts = [...prev];
          newTexts[currentTextIndex] = currentText.slice(0, currentCharIndex + 1);
          return newTexts;
        });
        setCurrentCharIndex(prev => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Current line is complete, move to next line after delay
      const timeout = setTimeout(() => {
        setCurrentTextIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, delay);

      return () => clearTimeout(timeout);
    }
  }, [currentTextIndex, currentCharIndex, texts, speed, delay, key]);

  return (
    <div className="font-mono text-base sm:text-lg space-y-2" key={key}>
      {displayedTexts.map((text, index) => (
        <p key={`${key}-${index}`} className="text-gray-300">
          <span className="text-neon-blue">{">"}</span> {text}
        </p>
      ))}
      {isTyping && currentTextIndex < texts.length && (
        <p className="text-gray-300">
          <span className="text-neon-blue">{">"}</span> {displayedTexts[currentTextIndex] || ''}
          <span className="animate-blink ml-1">_</span>
        </p>
      )}
    </div>
  );
};
