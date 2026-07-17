export function AmbientBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 bg-[#faf9f6] dark:bg-[#09070f] transition-colors duration-300">
      {/* Top-right ambient blur */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-400/5 dark:bg-indigo-500/3 blur-[80px] animate-ambient-slow"></div>
      
      {/* Left-middle ambient blur */}
      <div className="absolute top-[35%] left-[-15%] w-[600px] h-[600px] rounded-full bg-purple-400/4 dark:bg-purple-500/2 blur-[100px] animate-ambient-slower"></div>
      
      {/* Bottom-right ambient blur */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] rounded-full bg-violet-400/5 dark:bg-violet-500/2 blur-[80px] animate-ambient-slow"></div>
    </div>
  );
}
