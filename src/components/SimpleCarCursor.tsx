import { useEffect, useRef, useState } from 'react';

interface SimpleCarCursorProps {
  isVisible: boolean;
}

interface Point {
  x: number;
  y: number;
  id: number;
}

export function SimpleCarCursor({ isVisible }: SimpleCarCursorProps) {
  const carRef = useRef<HTMLDivElement>(null);
  const headlightRef = useRef<SVGGElement>(null);
  const pathQueue = useRef<Point[]>([]);
  const pointIdCounter = useRef(0);
  const carPos = useRef({ x: 0, y: 0 });
  const carAngle = useRef(0);
  
  // State to track points for visualization
  const [displayPoints, setDisplayPoints] = useState<Point[]>([]);

  useEffect(() => {
    if (!isVisible) {
      setDisplayPoints([]);
      pathQueue.current = [];
      return;
    }

    // Initial position outside the screen
    if (carPos.current.x === 0 && carPos.current.y === 0) {
      carPos.current = { x: -100, y: window.innerHeight / 2 };
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      const lastPoint = pathQueue.current[pathQueue.current.length - 1];
      const newPoint = { 
        x: e.clientX, 
        y: e.clientY, 
        id: pointIdCounter.current++ 
      };
      
      // Only add point if it's far enough from the last point to avoid excessive queue size
      if (!lastPoint || Math.sqrt(Math.pow(newPoint.x - lastPoint.x, 2) + Math.pow(newPoint.y - lastPoint.y, 2)) > 40) {
        pathQueue.current.push(newPoint);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    
    const animate = () => {
      if (!carRef.current) return;

      // --- Driving Physics Constants ---
      const minSpeed = 1.6; 
      const maxSpeed = 6.5; 
      const maxTurnSpeed = 0.18; 
      const reachThreshold = 35; // Slightly larger to prevent orbital locks
      const turnDamping = 0.15; // Smoother steering response
      
      if (pathQueue.current.length > 0) {
        const target = pathQueue.current[0];
        
        const dx = target.x - carPos.current.x;
        const dy = target.y - carPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 1. Steering Logic with Damping
        const targetAngle = Math.atan2(dy, dx);
        let angleDiff = targetAngle - carAngle.current;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        const steeringForce = angleDiff * turnDamping;
        const clampedSteering = Math.max(-maxTurnSpeed, Math.min(maxTurnSpeed, steeringForce));
        carAngle.current += clampedSteering;

        // 2. Variable Speed
        // Slow down as we reach the point to allow for tighter turning circle
        const distanceFactor = Math.min(distance / 250, 1);
        const currentSpeed = minSpeed + (maxSpeed - minSpeed) * distanceFactor;

        // 3. Forward Movement
        carPos.current.x += Math.cos(carAngle.current) * currentSpeed;
        carPos.current.y += Math.sin(carAngle.current) * currentSpeed;

        // 4. Dequeue Logic
        if (distance < reachThreshold) {
          pathQueue.current.shift();
        }
      }

      // Sync display points state once per frame for visualization
      setDisplayPoints([...pathQueue.current]);

      // 4. Render
      const angleInDegrees = carAngle.current * (180 / Math.PI);
      carRef.current.style.transform = `translate3d(${carPos.current.x}px, ${carPos.current.y}px, 0) rotate(${angleInDegrees}deg)`;

      // 5. Headlight Control
      if (headlightRef.current) {
        const isMoving = pathQueue.current.length > 0;
        headlightRef.current.style.opacity = isMoving ? "1" : "0";
      }

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
    <>
      {/* Path Visualization Layer - Dots on the screen */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {displayPoints.map((point) => (
          <div
            key={point.id}
            className="absolute w-1.5 h-1.5 rounded-full bg-blue-500/10 dark:bg-blue-400/30 blur-[0.5px]"
            style={{
              left: point.x,
              top: point.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        ))}
      </div>

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
          className="w-full h-full opacity-70 dark:opacity-90 drop-shadow-md overflow-visible"
        >
          <defs>
            <linearGradient id="headlightGradient" x1="0%" y1="50%" x2="100%" y2="50%">
              <stop offset="0%" className="stop-color-headlight-start" />
              <stop offset="100%" className="stop-color-headlight-end" />
            </linearGradient>
            <style>
              {`
                .stop-color-headlight-start { stop-color: rgba(255, 230, 100, 0.8); }
                .stop-color-headlight-end { stop-color: rgba(255, 230, 100, 0); }
                .dark .stop-color-headlight-start { stop-color: rgba(255, 255, 200, 0.7); }
                .dark .stop-color-headlight-end { stop-color: rgba(255, 255, 200, 0); }
              `}
            </style>
          </defs>

          {/* Headlight Beams */}
          <g ref={headlightRef} style={{ transition: 'opacity 0.3s ease', opacity: 0 }}>
            <path d="M48,5 L110,-15 L110,15 L48,9 Z" fill="url(#headlightGradient)" />
            <path d="M48,16 L110,10 L110,40 L48,20 Z" fill="url(#headlightGradient)" />
          </g>

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
          <rect x="46" y="5" width="2" height="4" rx="0.5" fill="#FFD700" className="opacity-90 dark:opacity-100" />
          <rect x="46" y="16" width="2" height="4" rx="0.5" fill="#FFD700" className="opacity-90 dark:opacity-100" />
          {/* Iconic Tri-Bar Taillights */}
          <g opacity="0.9">
            <rect x="3" y="6" width="1" height="3" fill="#EE0000" />
            <rect x="3" y="10" width="1" height="3" fill="#EE0000" />
            <rect x="3" y="14" width="1" height="3" fill="#EE0000" />
            
            <rect x="3" y="18" width="1" height="3" fill="#EE0000" />
            <rect x="3" y="22" width="1" height="3" transform="translate(0,-11)" fill="#EE0000" />
            <rect x="3" y="22" width="1" height="3" transform="translate(0,-15)" fill="#EE0000" />
          </g>
        </svg>
      </div>
    </>
  );
}
