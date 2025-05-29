
import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

export const MouseCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive elements
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, .cyber-button, .glass-morphism, input, .terminal-window');
      setIsHovering(!!isInteractive);
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
    };
  }, []);

  return (
    <>
      {/* Custom Cursor - Green Dot */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-all duration-150 ease-out ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-3 h-3 rounded-full border border-neon-green transition-all duration-150 ${
          isHovering ? 'bg-neon-green shadow-md shadow-neon-green/50' : 'bg-neon-green/60'
        }`} />
      </div>

      {/* Simple outer ring on hover */}
      {isHovering && (
        <div
          className="fixed pointer-events-none z-[9998]"
          style={{
            left: position.x,
            top: position.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="w-8 h-8 rounded-full border border-neon-green/40 animate-pulse" />
        </div>
      )}
    </>
  );
};
