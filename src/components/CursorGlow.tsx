
import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CursorGlow = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-0 transition-opacity duration-300"
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
        transform: 'translate(-50%, -50%)',
        background: `radial-gradient(circle 200px at center, rgba(100, 255, 218, 0.1) 0%, rgba(100, 255, 218, 0.05) 30%, transparent 70%)`,
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        backdropFilter: 'blur(1px)',
      }}
    />
  );
};
