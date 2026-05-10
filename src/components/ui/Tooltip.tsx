import { useState, useRef, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 300); // Small delay to avoid accidental triggers
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute bottom-full mb-3 px-2.5 py-1.5 rounded-lg
                       bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 
                       text-[10px] sm:text-xs font-medium whitespace-nowrap 
                       shadow-xl shadow-black/10 z-50 pointer-events-none"
          >
            {content}
            {/* Arrow */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[5px] border-transparent border-t-neutral-900 dark:border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
