const skills = {
  "Frontend": ["React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS"],
  "Backend": ["Node.js", "Ruby on Rails", "Express.js", "REST APIs", "Webhooks"],
  "Databases & Tools": ["PostgreSQL", "MySQL", "Git", "API Design", "System Design"]
};

export function Skills() {
  return (
    <section className="scroll-animate-tech">
      <h2 className="tech-section-title text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 tracking-tight px-1 opacity-0 translate-y-4">
        Technologies I Use
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div 
            key={category} 
            className="tech-card flex flex-col p-5 sm:p-6 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-md transition-[border-color,box-shadow] duration-300 opacity-0"
          >
            <h3 className="tech-card-title text-sm font-medium text-neutral-900 dark:text-neutral-100 mb-4 opacity-0 translate-y-2">
              {category}
            </h3>
            <ul className="flex flex-col gap-2.5">
              {items.map(item => (
                <li 
                  key={item} 
                  className="tech-item text-sm text-neutral-600 dark:text-neutral-400 flex items-center cursor-default py-1 px-1.5 rounded-lg transition-colors duration-300 hover:bg-neutral-50 dark:hover:bg-neutral-800/30 opacity-0 translate-x-[-10px]"
                >
                  <span className="tech-dot w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-600 rounded-full mr-3 flex-shrink-0 origin-center scale-0"></span>
                  <span className="tech-text transition-colors duration-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 px-1 items-center">
        <span className="cert-title text-[10px] items-center font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 opacity-0 translate-y-2">
          Certifications:
        </span>
        {["Machine Learning – Acmegrade", "JS Algorithms – Freecodecamp", "Responsive Web Design"].map((cert) => (
          <span 
            key={cert} 
            className="cert-item text-xs font-medium text-neutral-500 dark:text-neutral-400 px-3 py-1 bg-neutral-100/50 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-800/50 rounded-full flex items-center gap-1.5 hover:border-purple-500/30 hover:text-purple-500 dark:hover:text-purple-400 hover:shadow-sm transition-all duration-300 cursor-default opacity-0 scale-90"
          >
            <svg 
              className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 transition-colors duration-300" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            {cert}
          </span>
        ))}
      </div>
    </section>
  );
}
