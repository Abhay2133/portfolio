import { useEffect, useRef, useState } from 'react';

interface SimpleCarCursorProps {
  isVisible: boolean;
}

interface Point {
  x: number;
  y: number;
  id: number;
}

interface TireMarkPoint {
  lx: number;
  ly: number;
  rx: number;
  ry: number;
  opacity: number;
  id: number;
}

export function SimpleCarCursor({ isVisible }: SimpleCarCursorProps) {
  const carRef = useRef<HTMLDivElement>(null);
  const headlightRef = useRef<SVGGElement>(null);
  const pathQueue = useRef<Point[]>([]);
  const pointIdCounter = useRef(0);
  const markIdCounter = useRef(0);
  const carPos = useRef({ x: 0, y: 0 });
  const carAngle = useRef(0);
  const currentSpeed = useRef(0);
  const driftAngle = useRef(0); // Difference between facing direction and movement direction
  const [isBraking, setIsBraking] = useState(false);
  
  // Physics tracking
  const currentTargetId = useRef<number | null>(null);
  const timeChasingTarget = useRef(0);
  const estimatedTimeForTarget = useRef(0);
  
  // State to track points and tire marks for visualization
  const [displayPoints, setDisplayPoints] = useState<Point[]>([]);
  const [tireMarks, setTireMarks] = useState<TireMarkPoint[]>([]);
  const tireMarksRef = useRef<TireMarkPoint[]>([]);
  const lastMarkPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isVisible) {
      setDisplayPoints([]);
      setTireMarks([]);
      pathQueue.current = [];
      tireMarksRef.current = [];
      currentTargetId.current = null;
      currentSpeed.current = 0;
      driftAngle.current = 0;
      setIsBraking(false);
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
      const minSpeed = 1.5; 
      const maxSpeed = 7.5; 
      const acceleration = 0.05; 
      const maxTurnSpeed = 0.20; 
      const reachThreshold = 30; 
      const turnDamping = 0.15; 
      
      let actualSteering = 0;

      if (pathQueue.current.length > 0) {
        const target = pathQueue.current[0];
        
        // 1. Target Progress Tracking
        if (target.id !== currentTargetId.current) {
          const dx = target.x - carPos.current.x;
          const dy = target.y - carPos.current.y;
          const initialDist = Math.sqrt(dx * dx + dy * dy);
          
          currentTargetId.current = target.id;
          timeChasingTarget.current = 0;
          estimatedTimeForTarget.current = (initialDist / maxSpeed) * 1.5 + 40; 
        }

        timeChasingTarget.current++;

        const dx = target.x - carPos.current.x;
        const dy = target.y - carPos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // 2. Variable Target Speed
        let targetSpeed = maxSpeed;
        if (timeChasingTarget.current > estimatedTimeForTarget.current) {
          const overtime = timeChasingTarget.current - estimatedTimeForTarget.current;
          const slowdownFactor = Math.max(0, 1 - overtime / 60);
          targetSpeed = minSpeed + (maxSpeed - minSpeed) * slowdownFactor;
        }

        // Apply acceleration/deceleration
        if (currentSpeed.current < targetSpeed) {
          currentSpeed.current = Math.min(targetSpeed, currentSpeed.current + acceleration);
          setIsBraking(false);
        } else if (currentSpeed.current > targetSpeed) {
          currentSpeed.current = Math.max(targetSpeed, currentSpeed.current - acceleration * 3);
          setIsBraking(true);
        } else {
          setIsBraking(false);
        }

        // 3. Steering Logic with Speed-Dependent flexibility
        const speedNormalized = (currentSpeed.current - minSpeed) / (maxSpeed - minSpeed);
        const dynamicMaxTurnSpeed = maxTurnSpeed * (1 - Math.max(0, speedNormalized) * 0.6);
        
        const targetAngle = Math.atan2(dy, dx);
        let angleDiff = targetAngle - carAngle.current;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        const steeringForce = angleDiff * turnDamping;
        actualSteering = Math.max(-dynamicMaxTurnSpeed, Math.min(dynamicMaxTurnSpeed, steeringForce));
        carAngle.current += actualSteering;

        // --- Drifting Logic ---
        // Drift is triggered by sharp steering at high speed
        const driftThreshold = 0.08;
        const speedThreshold = 4.0;
        
        if (Math.abs(actualSteering) > driftThreshold && currentSpeed.current > speedThreshold) {
          // Increase drift angle based on steering intensity (slip outwards)
          const targetDrift = actualSteering * 2.5; 
          driftAngle.current += (targetDrift - driftAngle.current) * 0.1;
        } else {
          // Gradually recover from drift
          driftAngle.current *= 0.92;
        }

        // 4. Forward Movement (with side slip)
        const movementAngle = carAngle.current + driftAngle.current;
        carPos.current.x += Math.cos(movementAngle) * currentSpeed.current;
        carPos.current.y += Math.sin(movementAngle) * currentSpeed.current;

        // 5. Dequeue Logic
        if (distance < reachThreshold) {
          pathQueue.current.shift();
        }
      } else {
        // Naturally drift to a stop
        if (currentSpeed.current > 0) {
          const brakeForce = acceleration * 4; 
          currentSpeed.current = Math.max(0, currentSpeed.current - brakeForce);
          setIsBraking(true);
        } else {
          setIsBraking(false);
        }
        driftAngle.current *= 0.8;
        const movementAngle = carAngle.current + driftAngle.current;
        carPos.current.x += Math.cos(movementAngle) * currentSpeed.current;
        carPos.current.y += Math.sin(movementAngle) * currentSpeed.current;
      }

      // --- Tire Mark Generation & Decay ---
      // Decay existing marks every frame
      tireMarksRef.current = tireMarksRef.current
        .map(m => ({ ...m, opacity: m.opacity - 0.005 }))
        .filter(m => m.opacity > 0);

      const distFromLastMark = Math.sqrt(
        Math.pow(carPos.current.x - lastMarkPos.current.x, 2) + 
        Math.pow(carPos.current.y - lastMarkPos.current.y, 2)
      );

      // Add new mark point if moved enough
      const markThreshold = Math.abs(driftAngle.current) > 0.05 ? 5 : 12;

      if (currentSpeed.current > 0.5 && distFromLastMark > markThreshold) {
        const rearX = carPos.current.x - Math.cos(carAngle.current) * 15;
        const rearY = carPos.current.y - Math.sin(carAngle.current) * 15;

        const perpX = Math.cos(carAngle.current + Math.PI / 2);
        const perpY = Math.sin(carAngle.current + Math.PI / 2);

        const newMark: TireMarkPoint = {
          lx: rearX + perpX * 8,
          ly: rearY + perpY * 8,
          rx: rearX - perpX * 8,
          ry: rearY - perpY * 8,
          opacity: 1.0,
          id: markIdCounter.current++
        };

        tireMarksRef.current.push(newMark);
        if (tireMarksRef.current.length > 200) {
          tireMarksRef.current.shift();
        }
        lastMarkPos.current = { x: carPos.current.x, y: carPos.current.y };
      }

      // Sync display points and tire marks state
      setDisplayPoints([...pathQueue.current]);
      setTireMarks([...tireMarksRef.current]);

      // 6. Render
      const angleInDegrees = carAngle.current * (180 / Math.PI);
      // We render the body at carAngle, but movement was influenced by driftAngle
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
      {/* Background Visualization Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Tire Marks as continuous segments */}
        <svg className="w-full h-full">
          {tireMarks.map((mark, i) => {
            if (i === 0) return null;
            const prev = tireMarks[i - 1];
            
            // Don't connect if points are too far apart (jump or new segment)
            const dist = Math.sqrt(Math.pow(mark.lx - prev.lx, 2) + Math.pow(mark.ly - prev.ly, 2));
            if (dist > 30) return null;

            const finalOpacity = ((mark.opacity + prev.opacity) / 2) * 0.3;
            
            return (
              <g key={mark.id} style={{ opacity: finalOpacity }}>
                <line 
                  x1={prev.lx} y1={prev.ly} x2={mark.lx} y2={mark.ly} 
                  stroke="currentColor" strokeWidth="2.5"
                  className="text-neutral-900 dark:text-neutral-100"
                />
                <line 
                  x1={prev.rx} y1={prev.ry} x2={mark.rx} y2={mark.ry} 
                  stroke="currentColor" strokeWidth="2.5"
                  className="text-neutral-900 dark:text-neutral-100"
                />
              </g>
            );
          })}
        </svg>

        {/* Path Checkpoints */}
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
          <g className={`transition-all duration-200 ${isBraking ? "opacity-100 scale-x-110" : "opacity-90"}`}>
            {/* Glow effect for braking */}
            {isBraking && (
              <g className="animate-pulse">
                <rect x="1" y="6" width="4" height="3" fill="#FF0000" opacity="0.4" filter="blur(2px)" />
                <rect x="1" y="10" width="4" height="3" fill="#FF0000" opacity="0.4" filter="blur(2px)" />
                <rect x="1" y="14" width="4" height="3" fill="#FF0000" opacity="0.4" filter="blur(2px)" />
                
                <rect x="1" y="18" width="4" height="3" fill="#FF0000" opacity="0.4" filter="blur(2px)" />
                <rect x="1" y="22" width="4" height="3" fill="#FF0000" opacity="0.4" filter="blur(2px)" transform="translate(0,-11)" />
                <rect x="1" y="22" width="4" height="3" fill="#FF0000" opacity="0.4" filter="blur(2px)" transform="translate(0,-15)" />
              </g>
            )}
            
            <rect x="3" y="6" width="1" height="3" fill={isBraking ? "#FF3333" : "#EE0000"} />
            <rect x="3" y="10" width="1" height="3" fill={isBraking ? "#FF3333" : "#EE0000"} />
            <rect x="3" y="14" width="1" height="3" fill={isBraking ? "#FF3333" : "#EE0000"} />
            
            <rect x="3" y="18" width="1" height="3" fill={isBraking ? "#FF3333" : "#EE0000"} />
            <rect x="3" y="22" width="1" height="3" transform="translate(0,-11)" fill={isBraking ? "#FF3333" : "#EE0000"} />
            <rect x="3" y="22" width="1" height="3" transform="translate(0,-15)" fill={isBraking ? "#FF3333" : "#EE0000"} />
          </g>
        </svg>
      </div>
    </>
  );
}
