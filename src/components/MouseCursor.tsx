
import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const MouseCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trailPosition, setTrailPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, .cyber-button, .glass-morphism, input, .terminal-window');
      setIsHovering(!!isInteractive);
    };

    // Smooth trail effect
    const updateTrail = () => {
      setTrailPosition(prev => ({
        x: prev.x + (position.x - prev.x) * 0.15,
        y: prev.y + (position.y - prev.y) * 0.15,
      }));
    };

    window.addEventListener('mousemove', updateCursor);
    const trailInterval = setInterval(updateTrail, 16); // ~60fps

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      clearInterval(trailInterval);
    };
  }, [position.x, position.y]);

  return (
    <>
      {/* Trail cursor with background */}
      <div
        className="fixed pointer-events-none z-[9997] transition-all duration-200 ease-out"
        style={{
          left: trailPosition.x,
          top: trailPosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-sm border border-neon-green/20" />
      </div>

      {/* Main cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-75 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-3 h-3 rounded-full border border-neon-green transition-all duration-75 ${
          isHovering ? 'bg-neon-green shadow-md shadow-neon-green/50' : 'bg-neon-green/80'
        }`} />
      </div>

      {/* Outer ring on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-12 h-12 rounded-full border border-neon-green/30 animate-pulse" />
        </div>
      )}
    </>
  );
};
