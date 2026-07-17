import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";

export function GithubHeatmap() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Set mounted on client load
    setMounted(true);
  }, []);

  const customTheme = {
    light: ["#e7e4dc", "#cdece7", "#60cbb7", "#0d7f72", "#074d44"],
    dark: ["#242321", "#0f3933", "#2ab79d", "#5ee2cb", "#8cf0dc"]
  };

  const renderSkeleton = () => (
    <div className="w-full flex flex-col gap-3 animate-pulse">
      {/* Total count skeleton */}
      <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
      
      {/* Grid skeleton (7 rows of contributions) */}
      <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-2">
        {Array.from({ length: 364 }).map((_, i) => (
          <div 
            key={i} 
            className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] bg-neutral-200 dark:bg-neutral-800 rounded-[2px] shrink-0" 
          />
        ))}
      </div>
      
      {/* Legend skeleton */}
      <div className="flex justify-between items-center text-xs mt-1">
        <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded"></div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-800 rounded mr-1"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] bg-neutral-200 dark:bg-neutral-800 rounded-[2px]" />
          ))}
          <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-800 rounded ml-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="contributions" className="section">
      <h2>GitHub Activity</h2>
      {!mounted ? (
        renderSkeleton()
      ) : (
        <div className="w-full overflow-x-auto pb-2 text-sm text-neutral-600 dark:text-neutral-400">
          <GitHubCalendar 
            username="abhay2133"
            theme={customTheme}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      )}
    </section>
  );
}
