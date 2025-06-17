
import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
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
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    let animationFrame: number;
    
    const animateCursor = () => {
      setCursorPosition(prev => ({
        x: prev.x + (mousePosition.x - prev.x) * 0.15,
        y: prev.y + (mousePosition.y - prev.y) * 0.15
      }));
      animationFrame = requestAnimationFrame(animateCursor);
    };

    animationFrame = requestAnimationFrame(animateCursor);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [mousePosition, isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Center dot - follows mouse directly */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className={`w-2 h-2 rounded-full bg-accent-teal transition-transform duration-150 ${
            isHovering ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Outer circle - follows with delay */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div 
          className={`w-8 h-8 rounded-full border border-accent-teal transition-all duration-300 ${
            isHovering 
              ? 'scale-150 opacity-40 border-2' 
              : 'scale-100 opacity-20 border-1'
          }`}
        />
      </div>
    </>
  );
};
