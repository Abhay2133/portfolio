export function Footer() {
  return (
    <footer className="pb-8 pt-4 text-sm text-neutral-500 dark:text-neutral-400 flex flex-col sm:flex-row justify-between items-center sm:items-end w-full">
      <p>&copy; {new Date().getFullYear()} Abhay Bisht.</p>
      <div className="flex gap-4 mt-6 sm:mt-0">
        <a 
          href="https://github.com/abhay2133" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors magnetic-target"
        >
          GitHub
        </a>
        <a 
          href="https://www.linkedin.com/in/abhay-21m" 
          target="_blank" 
          rel="noreferrer" 
          className="hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors magnetic-target"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
