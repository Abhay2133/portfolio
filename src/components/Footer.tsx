import { motion } from "motion/react";

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5 }}
      className="pb-8 pt-4 text-sm text-neutral-500 flex flex-col sm:flex-row justify-between items-center sm:items-end w-full"
    >
      <p>&copy; {new Date().getFullYear()} Abhay Bisht.</p>
      <div className="flex gap-4 mt-6 sm:mt-0">
        <a href="https://github.com/abhay2133" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors">GitHub</a>
        <a href="https://www.linkedin.com/in/abhay-21m" target="_blank" rel="noreferrer" className="hover:text-neutral-900 transition-colors">LinkedIn</a>
      </div>
    </motion.footer>
  );
}
