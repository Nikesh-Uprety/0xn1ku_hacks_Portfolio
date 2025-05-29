
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
      const isInteractive = target.closest('a, button, .cyber-button, .glass-morphism, nav');
      setIsHovering(!!isInteractive);
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', updateCursor);

    // Add event listeners to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .cyber-button, .glass-morphism');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Add illusion effect to elements under cursor
  useEffect(() => {
    const elements = document.elementsFromPoint(position.x, position.y);
    
    // Remove previous illusion effects
    document.querySelectorAll('.cursor-illusion').forEach(el => {
      el.classList.remove('cursor-illusion');
    });

    // Apply illusion effect to hovered elements
    elements.forEach(el => {
      if (el.classList.contains('glass-morphism') || 
          el.closest('.glass-morphism') || 
          el.tagName === 'A' || 
          el.classList.contains('cyber-button')) {
        el.classList.add('cursor-illusion');
      }
    });
  }, [position]);

  return (
    <>
      {/* Custom Cursor - Green Dot Only */}
      <div
        className={`fixed pointer-events-none z-50 transition-all duration-200 ${
          isHovering ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-3 h-3 rounded-full border border-neon-green transition-all duration-200 ${
          isHovering ? 'bg-neon-green shadow-lg shadow-neon-green/50' : 'bg-neon-green/50'
        }`} />
      </div>

      {/* Ripple effect on click */}
      <div
        className="fixed pointer-events-none z-40"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className={`w-8 h-8 rounded-full border border-neon-green/30 transition-all duration-300 ${
          isHovering ? 'scale-150 opacity-100' : 'scale-100 opacity-0'
        }`} />
      </div>
    </>
  );
};
