
import { useEffect, useState } from 'react';

interface CursorPosition {
  x: number;
  y: number;
}

interface Trail {
  x: number;
  y: number;
  id: number;
}

export const MouseCursor = () => {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 });
  const [trail, setTrail] = useState<Trail[]>([]);
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Add new trail point
      setTrail(prev => [
        ...prev.slice(-15), // Keep only last 15 points
        {
          x: e.clientX,
          y: e.clientY,
          id: Date.now(),
        }
      ]);

      // Clear moving state after a delay
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsMoving(false), 100);
    };

    window.addEventListener('mousemove', updateCursor);

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      clearTimeout(timeoutId);
    };
  }, []);

  // Clean up old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-10));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Custom Cursor */}
      <div
        className={`fixed pointer-events-none z-50 mix-blend-difference transition-transform duration-100 ${
          isMoving ? 'scale-150' : 'scale-100'
        }`}
        style={{
          left: position.x - 10,
          top: position.y - 10,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-5 h-5 rounded-full border-2 border-neon-green bg-neon-green/20 animate-pulse" />
      </div>

      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="fixed pointer-events-none z-40"
          style={{
            left: point.x,
            top: point.y,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div
            className="rounded-full bg-neon-green/30 animate-ping"
            style={{
              width: `${Math.max(2, 8 - index * 0.5)}px`,
              height: `${Math.max(2, 8 - index * 0.5)}px`,
              opacity: Math.max(0.1, 1 - index * 0.1),
              animationDuration: `${0.5 + index * 0.1}s`,
            }}
          />
        </div>
      ))}

      {/* Particles on movement */}
      {isMoving && (
        <>
          <div
            className="fixed pointer-events-none z-30"
            style={{
              left: position.x,
              top: position.y,
              transform: 'translate(-50%, -50%)',
            }}
          >
            <div className="relative">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-neon-blue rounded-full animate-ping"
                  style={{
                    left: `${Math.cos((i * Math.PI) / 3) * 20}px`,
                    top: `${Math.sin((i * Math.PI) / 3) * 20}px`,
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: '0.6s',
                  }}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};
