import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "NeuroPlan",
    description: "An AI-powered Flutter app that converts natural language goals into structured project roadmaps with pluggable AI providers.",
    tech: ["Flutter", "Dart", "Firebase", "GROQ AI"],
    image: "https://images.unsplash.com/photo-1512758017271-d7b84c2113f1?w=800&q=80&auto=format&fit=crop",
    link: "https://github.com/abhay2133"
  },
  {
    title: "Engineers Day System",
    description: "Event registration system for managing participant data and secure online payments with transaction verification.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?w=800&q=80&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Quiz Bowl Application",
    description: "Full-stack quiz platform featuring individual submission handling and JSON-based storage for competitive quiz bowls.",
    tech: ["Flutter", "Express.js", "Node.js", "TypeScript"],
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?w=800&q=80&auto=format&fit=crop",
    link: "https://github.com/abhay2133"
  }
];

export function Projects() {
  return (
    <section id="projects" className="scroll-animate">
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 tracking-tight px-1">
        Selected Work
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div 
            key={project.title} 
            className="project-card group relative flex flex-col p-3 rounded-2xl border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-neutral-200 dark:hover:border-neutral-700 hover:shadow-md hover:-translate-y-0.5 transition-all gap-4 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm"
          >
            <a 
              href={project.link} 
              className="project-img-wrap w-full h-40 shrink-0 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 block relative magnetic-target"
              style={{ clipPath: "inset(0 100% 0 0)" }}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="project-img w-full h-full object-cover object-center scale-125 group-hover:scale-110 transition-transform duration-700 ease-out" 
              />
            </a>
            <div className="project-content flex flex-col grow px-1 opacity-0">
              <div>
                <a 
                  href={project.link} 
                  className="inline-flex items-center gap-1 font-medium text-neutral-900 dark:text-neutral-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base tracking-tight magnetic-target"
                >
                  {project.title}
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 dark:text-neutral-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed line-clamp-2 mt-1 shrink-0">
                {project.description}
              </p>
              <div className="text-xs font-mono text-neutral-500 dark:text-neutral-500 mt-auto pt-4 flex flex-wrap gap-x-3 gap-y-1">
                {project.tech.map((t, i) => (
                  <span key={t} className="flex items-center">
                    {t}{i < project.tech.length - 1 && <span className="ml-3 w-1.5 h-1.5 bg-neutral-300 dark:bg-neutral-700 rounded-full" />}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
