import { useState, useRef, ReactNode } from "react";

interface TooltipProps {
  children: ReactNode;
  content: string;
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const showTooltip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setIsVisible(true);
    }, 300);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative flex items-center justify-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      <div
        className={`absolute bottom-full mb-3 px-2.5 py-1.5 rounded-lg
                   bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 
                   text-[10px] sm:text-xs font-medium whitespace-nowrap 
                   shadow-xl shadow-black/10 z-50 pointer-events-none
                   transition-all duration-150 ease-out origin-bottom
                   ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95"}`}
      >
        {content}
        {/* Arrow */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-[5px] border-transparent border-t-neutral-900 dark:border-t-white" />
      </div>
    </div>
  );
}
