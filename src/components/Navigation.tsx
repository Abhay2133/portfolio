import { motion } from "motion/react";
import { Github, Linkedin, Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function Navigation() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check initial preference
    if (document.documentElement.classList.contains('dark') || 
        (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center w-full sticky top-6 z-50 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-white/60 dark:border-neutral-800/60 p-3 sm:px-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]"
    >
      <div className="text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 px-2 cursor-pointer">
        Abhay Bisht
      </div>
      <div className="flex gap-4 items-center px-2">
        <button 
          onClick={toggleTheme} 
          className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-all mr-2"
          aria-label="Toggle Dark Mode"
        >
          {isDark ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <a href="https://github.com/abhay2133" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 hover:scale-110 transition-all">
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
        <a href="https://www.linkedin.com/in/abhay-21m" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-blue-600 dark:text-neutral-400 dark:hover:text-blue-400 hover:scale-110 transition-all">
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </motion.nav>
  );
}
