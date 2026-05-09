import { motion } from "motion/react";

export function AbstractBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#fafafa]">
      {/* Clean Grid Background */}
      <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="gridPattern" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#gridPattern)" />
      </svg>

      {/* Abstract Animated Geometry Top Right */}
      <motion.svg 
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute -top-64 -right-64 text-neutral-200/40" 
        width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="1" />
        <circle cx="400" cy="400" r="250" stroke="currentColor" strokeWidth="1" strokeDasharray="10 10" />
        <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="1" />
        <line x1="100" y1="400" x2="700" y2="400" stroke="currentColor" strokeWidth="1" />
        <line x1="400" y1="100" x2="400" y2="700" stroke="currentColor" strokeWidth="1" />
      </motion.svg>

      {/* Abstract Animated Geometry Bottom Left */}
      <motion.svg 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-48 -left-48 text-neutral-200/40" 
        width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M 100 500 L 500 100" stroke="currentColor" strokeWidth="1" />
        <path d="M 150 500 L 500 150" stroke="currentColor" strokeWidth="1" />
        <path d="M 200 500 L 500 200" stroke="currentColor" strokeWidth="1" />
        <path d="M 250 500 L 500 250" stroke="currentColor" strokeWidth="1" />
        <path d="M 300 500 L 500 300" stroke="currentColor" strokeWidth="1" />
        
        <circle cx="300" cy="300" r="10" stroke="currentColor" strokeWidth="2" />
      </motion.svg>
    </div>
  );
}
