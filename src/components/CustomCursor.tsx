
import { useEffect, useState, useRef } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();

  // Smooth following positions for the ring
  const ringPosition = useRef<CursorPosition>({ x: 0, y: 0 });

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

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Track hover state for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, [onclick]');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile, isVisible]);

  // Smooth ring animation with easing
  useEffect(() => {
    if (isMobile || !isVisible) return;

    const animateRing = () => {
      if (!ringRef.current) return;

      // Smooth easing for ring follow
      const ease = 0.15;
      ringPosition.current.x += (mousePosition.x - ringPosition.current.x) * ease;
      ringPosition.current.y += (mousePosition.y - ringPosition.current.y) * ease;

      // Update ring position
      ringRef.current.style.transform = `translate(${ringPosition.current.x - 15}px, ${ringPosition.current.y - 15}px) scale(${isHovering ? 1.15 : 1})`;

      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [mousePosition, isVisible, isMobile, isHovering]);

  // Update dot position immediately
  useEffect(() => {
    if (dotRef.current && isVisible && !isMobile) {
      dotRef.current.style.transform = `translate(${mousePosition.x - 4}px, ${mousePosition.y - 4}px)`;
    }
  }, [mousePosition, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Inner dot - follows cursor exactly */}
      <div
        ref={dotRef}
        className={`fixed pointer-events-none z-50 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: '#64ffda',
          borderRadius: '50%',
          boxShadow: isHovering ? '0 0 10px rgba(100, 255, 218, 0.6)' : 'none',
          transition: 'box-shadow 150ms ease-out',
        }}
      />
      
      {/* Outer ring - trails behind with smooth easing */}
      <div
        ref={ringRef}
        className={`fixed pointer-events-none z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: '30px',
          height: '30px',
          border: `1px solid ${isHovering ? '#00ffc3' : '#64ffda'}`,
          borderRadius: '50%',
          opacity: isHovering ? 0.4 : 0.2,
          backdropFilter: 'blur(1px)',
          transition: 'border-color 150ms ease-out, opacity 150ms ease-out',
        }}
      />
    </>
  );
};
