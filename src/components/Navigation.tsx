import { motion } from "motion/react";
import { Github, Linkedin } from "lucide-react";

export function Navigation() {
  return (
    <motion.nav 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center w-full sticky top-6 z-50 bg-white/40 backdrop-blur-md border border-white/60 p-3 sm:px-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
    >
      <div className="text-sm font-semibold tracking-tight text-neutral-900 px-2 cursor-pointer">
        Abhay Bisht
      </div>
      <div className="flex gap-4 items-center px-2">
        <a href="https://github.com/abhay2133" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 hover:scale-110 transition-all">
          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
        <a href="https://www.linkedin.com/in/abhay-21m" target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-blue-600 hover:scale-110 transition-all">
          <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
        </a>
      </div>
    </motion.nav>
  );
}
