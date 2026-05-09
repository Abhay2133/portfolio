import { motion } from "motion/react";
import { Mail } from "lucide-react";

export function Contact() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-md hover:border-neutral-200 dark:hover:border-neutral-700 transition-all mt-4 relative overflow-hidden group" 
      id="contact"
    >
      <div className="relative z-10">
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-3 tracking-tight">Get in touch</h2>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 mb-8 max-w-md leading-relaxed">
          I'm currently available for freelance projects and open to full-time roles. 
          Feel free to reach out if you want to collaborate or just say hi.
        </p>
        <a 
          href="mailto:abhaybishthestudent@gmail.com" 
          className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white dark:bg-neutral-800 border border-white/80 dark:border-white/10 shadow-sm text-sm font-medium text-neutral-900 dark:text-neutral-100 hover:text-blue-600 dark:hover:text-blue-400 transition-all hover:shadow-md hover:-translate-y-0.5"
        >
          <Mail className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
          Say Hello
        </a>
      </div>
      <div className="absolute -bottom-24 -right-24 text-neutral-100 dark:text-neutral-800 group-hover:text-neutral-200 dark:group-hover:text-neutral-700 transition-colors duration-700 pointer-events-none">
        <svg width="300" height="300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="5" />
        </svg>
      </div>
    </motion.section>
  );
}
