import { useEffect, useState } from "react";
import { GitHubCalendar } from "react-github-calendar";
import { GitCommit } from "lucide-react";

export function GithubHeatmap() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const checkDark = () => document.documentElement.classList.contains('dark');
    setIsDark(checkDark());

    const observer = new MutationObserver(() => {
      setIsDark(checkDark());
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);

  const renderSkeleton = () => (
    <div className="w-full flex flex-col gap-3 animate-pulse">
      <div className="h-5 w-48 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
      
      <div className="grid grid-flow-col grid-rows-7 gap-[3px] overflow-x-auto pb-2">
        {Array.from({ length: 364 }).map((_, i) => (
          <div 
            key={i} 
            className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] bg-neutral-200 dark:bg-neutral-800 rounded-sm shrink-0" 
          />
        ))}
      </div>
      
      <div className="flex justify-between items-center text-xs mt-1">
        <div className="h-4 w-28 bg-neutral-200 dark:bg-neutral-800 rounded-md"></div>
        <div className="flex items-center gap-1">
          <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-md mr-1"></div>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-[10px] h-[10px] sm:w-[11px] sm:h-[11px] bg-neutral-200 dark:bg-neutral-800 rounded-sm" />
          ))}
          <div className="h-3 w-8 bg-neutral-200 dark:bg-neutral-800 rounded-md ml-1"></div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="contributions" className="section">
      <h2 className="flex items-center gap-2">GitHub Activity <GitCommit className="w-[1.2rem] h-[1.2rem] text-neutral-400" /></h2>
      {!mounted ? (
        renderSkeleton()
      ) : (
        <div className="w-full overflow-x-auto pb-2 text-sm text-slate-500 dark:text-slate-400">
          <GitHubCalendar 
            username="abhay2133"
            colorScheme={isDark ? 'dark' : 'light'}
            labels={{
              totalCount: "{{count}} contributions in the last year",
            }}
          />
        </div>
      )}
    </section>
  );
}
