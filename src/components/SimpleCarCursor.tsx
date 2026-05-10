import { useEffect, useRef, useState } from 'react';

export function SimpleCarCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const carRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const carPos = useRef({ x: 0, y: 0 });
  const carAngle = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'm') {
        e.preventDefault();
        setIsVisible(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Initial position outside the screen or at current mouse if revealing
    if (carPos.current.x === -100) {
      carPos.current = { x: -100, y: window.innerHeight / 2 };
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    
    const animate = () => {
      if (!carRef.current) return;

      // Easing/Damping parameters
      const damping = 0.02; // Adjusted for slower, heavier feel
      
      // Calculate distance to mouse
      const dx = mousePos.current.x - carPos.current.x;
      const dy = mousePos.current.y - carPos.current.y;
      
      // Move car position towards mouse with damping
      carPos.current.x += dx * damping;
      carPos.current.y += dy * damping;

      // Calculate target angle
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        const targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Smooth rotation for a more natural heavy car turn
        const angleDiff = targetAngle - carAngle.current;
        const normalizedDiff = ((angleDiff + 180) % 360) - 180;
        carAngle.current += normalizedDiff * 0.1;
      }

      // Apply transformations
      carRef.current.style.transform = `translate3d(${carPos.current.x}px, ${carPos.current.y}px, 0) rotate(${carAngle.current}deg)`;

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={carRef}
      style={{
        position: 'fixed',
        left: -25, // Offset to center the car (width is 50)
        top: -12.5,  // Offset to center the car (height is 25)
        width: '50px',
        height: '25px',
        zIndex: 0,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
    >
      <svg
        viewBox="0 0 50 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-60 dark:opacity-80 drop-shadow-md"
      >
        {/* Ford Mustang Silhouette - Top Down */}
        {/* Main Body */}
        <path 
          d="M5,5 Q10,3 25,3 L40,3 Q48,4 48,12.5 Q48,21 40,22 L10,22 Q5,22 5,12.5 Z" 
          fill="currentColor" 
          className="text-slate-800 dark:text-slate-300"
        />
        {/* Long Hood / Engine Bay */}
        <rect x="25" y="4" width="18" height="17" fill="black" opacity="0.1" />
        {/* Dual Racing Stripes */}
        <rect x="5" y="9" width="43" height="2" fill="currentColor" className="text-white/20 dark:text-black/20" />
        <rect x="5" y="14" width="43" height="2" fill="currentColor" className="text-white/20 dark:text-black/20" />
        {/* Windshield */}
        <path d="M22,6 L28,6 L28,19 L22,19 Z" fill="#44CCFF" opacity="0.6" />
        {/* Headlights */}
        <rect x="46" y="5" width="2" height="4" rx="0.5" fill="#FFFFEE" />
        <rect x="46" y="16" width="2" height="4" rx="0.5" fill="#FFFFEE" />
        {/* Iconic Tri-Bar Taillights */}
        <g opacity="0.9">
          <rect x="3" y="6" width="1" height="3" fill="#EE0000" />
          <rect x="3" y="10" width="1" height="3" fill="#EE0000" />
          <rect x="3" y="10" width="1" height="5" transform="translate(0,6)" fill="#EE0000" />
          
          <rect x="3" y="16" width="1" height="3" fill="#EE0000" />
          <rect x="3" y="20" width="1" height="3" transform="translate(0,-5)" fill="#EE0000" />
          <rect x="3" y="20" width="1" height="3" transform="translate(0,-9)" fill="#EE0000" />
        </g>
      </svg>
    </div>
  );
}
