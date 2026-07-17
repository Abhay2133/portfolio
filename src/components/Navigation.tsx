import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export function Navigation() {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

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

    // Scroll listener for header border
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <a href="/" className="brand-logo">
          <span className="brand-logo-text">abhay</span>
          <span className="brand-logo-symbol">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="1.5" y="1.5" width="5" height="5" transform="rotate(45 4 4)" fill="currentColor" />
            </svg>
          </span>
        </a>
        <nav className="site-nav" aria-label="Primary">
          <a href="#about" className="nav-hide-sm">About</a>
          <a href="#journey">Experience</a>
          <a href="#projects">Projects</a>
          <button 
            onClick={toggleTheme} 
            className="theme-toggle"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-[15px] h-[15px]" /> : <Moon className="w-[15px] h-[15px]" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
