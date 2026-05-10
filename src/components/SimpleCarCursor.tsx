import { useEffect, useRef } from 'react';

interface SimpleCarCursorProps {
  isVisible: boolean;
}

export function SimpleCarCursor({ isVisible }: SimpleCarCursorProps) {
  const carRef = useRef<HTMLDivElement>(null);
  const headlightRef = useRef<SVGGElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const carPos = useRef({ x: 0, y: 0 });
  const carAngle = useRef(0);

  useEffect(() => {
    if (!isVisible) return;

    // Initial position outside the screen or at current mouse if revealing
    if (carPos.current.x === 0 && carPos.current.y === 0) {
      carPos.current = { x: -100, y: window.innerHeight / 2 };
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId: number;
    
    const animate = () => {
      if (!carRef.current) return;

      // --- Driving Physics Constants ---
      const baseSpeed = 4; // Constant forward speed
      const turnSpeed = 0.08; // How fast the car can steer (radians)
      const stopDistance = 40; // Stop driving when close to cursor
      
      // Calculate vector to mouse
      const dx = mousePos.current.x - carPos.current.x;
      const dy = mousePos.current.y - carPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // 1. Steering Logic
      if (distance > 5) { // Only steer if there's significant distance
        const targetAngle = Math.atan2(dy, dx); // Angle in radians
        
        // Find the shortest turn direction
        let angleDiff = targetAngle - carAngle.current;
        // Normalize angle difference to (-PI, PI]
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        // Apply steering (clamped to max turn speed)
        const steeringForce = Math.max(-turnSpeed, Math.min(turnSpeed, angleDiff));
        carAngle.current += steeringForce;
      }

      // 2. Forward Movement Logic
      if (distance > stopDistance) {
        // Drive forward based on current angle
        carPos.current.x += Math.cos(carAngle.current) * baseSpeed;
        carPos.current.y += Math.sin(carAngle.current) * baseSpeed;
      } else if (distance > 5) {
        // Slower movement when very close to mouse for precision
        const slowSpeed = baseSpeed * (distance / stopDistance);
        carPos.current.x += Math.cos(carAngle.current) * slowSpeed;
        carPos.current.y += Math.sin(carAngle.current) * slowSpeed;
      }

      // 3. Render
      const angleInDegrees = carAngle.current * (180 / Math.PI);
      carRef.current.style.transform = `translate3d(${carPos.current.x}px, ${carPos.current.y}px, 0) rotate(${angleInDegrees}deg)`;

      // 4. Headlight Control
      if (headlightRef.current) {
        // Turn on if moving significantly, turn off when close to cursor
        const headlightOpacity = distance > stopDistance ? (isVisible ? 1 : 0) : 0;
        headlightRef.current.style.opacity = headlightOpacity.toString();
        // Dynamic scaling of headlight intensity based on speed could be cool, 
        // but simple toggle is requested.
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
              .stop-color-headlight-start { stop-color: rgba(255, 255, 180, 0.4); }
              .stop-color-headlight-end { stop-color: rgba(255, 255, 180, 0); }
              .dark .stop-color-headlight-start { stop-color: rgba(255, 255, 220, 0.6); }
              .dark .stop-color-headlight-end { stop-color: rgba(255, 255, 220, 0); }
            `}
          </style>
        </defs>

        {/* Headlight Beams */}
        <g ref={headlightRef} style={{ transition: 'opacity 0.3s ease', opacity: 0 }}>
          <path d="M48,7 L100,-10 L100,10 L48,9 Z" fill="url(#headlightGradient)" />
          <path d="M48,18 L100,15 L100,35 L48,16 Z" fill="url(#headlightGradient)" />
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
