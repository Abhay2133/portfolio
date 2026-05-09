import { motion } from "motion/react";

export function Hero() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-4 sm:pt-8"
    >
      <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 mb-5">
        Hi, I'm Abhay Bisht.
      </h1>
      <p className="text-neutral-600 leading-relaxed text-balance sm:text-lg max-w-xl">
        I am a Full Stack Developer experienced in React, Node.js, and PostgreSQL. 
        I focus on creating impactful digital experiences, building robust systems, 
        and writing clean, maintainable code.
      </p>
      
      <div className="mt-10 flex flex-wrap gap-4">
        <a href="#projects" className="text-sm font-medium bg-neutral-900 text-white px-6 py-2.5 rounded-full shadow-md hover:bg-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all">
          View Projects
        </a>
        <a href="/resumes/Resume_Abhay-Bisht.pdf" target="_blank" className="text-sm font-medium bg-white border border-neutral-200 px-6 py-2.5 rounded-full shadow-sm hover:border-neutral-300 hover:shadow-md hover:-translate-y-0.5 transition-all text-neutral-800">
          Resume
        </a>
      </div>
    </motion.section>
  );
}
