import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function Navigation() {
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    // Check initial preference
    const checkDark = document.documentElement.classList.contains('dark') || 
                      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setIsDark(checkDark);
    if (checkDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
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
    <header className="site-header">
      <div className="container">
        <a href="/" className="brand-logo">
          abhay
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#about" className="nav-hide-sm">About</a>
          <a href="#journey">Experience</a>
          <a href="#projects">Projects</a>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle ml-2"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-[14px] h-[14px]" /> : <Moon className="w-[14px] h-[14px]" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
