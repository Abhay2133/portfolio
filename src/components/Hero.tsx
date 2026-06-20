export function Hero() {
  return (
    <section className="pt-4 sm:pt-8">
      <h1 className="hero-title text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-5 overflow-hidden">
        Hi, I'm Abhay Bisht.
      </h1>
      <p className="hero-subtitle text-neutral-600 dark:text-neutral-400 leading-relaxed text-balance sm:text-lg max-w-xl opacity-0 translate-y-4">
        <span className="text-neutral-950 dark:text-white font-semibold border-b-2 border-purple-500/40 pb-0.5">Software Engineer</span> specializing in Full Stack & AI Systems. 
        I build production SaaS platforms, design robust APIs, and integrate AI models 
        to create scalable and high-performance digital products.
      </p>
      
      <div className="hero-buttons mt-10 flex flex-wrap gap-4 opacity-0 translate-y-4">
        <a 
          href="#projects" 
          className="text-sm font-medium bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-6 py-2.5 rounded-full shadow-md hover:bg-neutral-800 dark:hover:bg-white hover:shadow-lg hover:-translate-y-0.5 transition-all magnetic-target"
        >
          View Projects
        </a>
        <a 
          href="/Resume_Abhay-Bisht.pdf" 
          target="_blank" 
          className="text-sm font-medium bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 px-6 py-2.5 rounded-full shadow-sm hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-md hover:-translate-y-0.5 transition-all text-neutral-800 dark:text-neutral-200 magnetic-target"
        >
          Resume
        </a>
      </div>
    </section>
  );
}
