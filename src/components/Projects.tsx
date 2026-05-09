import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution with real-time inventory management, secure payments, and a scalable architecture.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool focusing on minimal design and offline-first capabilities.",
    tech: ["React", "Firebase", "Redux"],
    image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80&auto=format&fit=crop",
    link: "#"
  },
  {
    title: "Real-time Chat Service",
    description: "WebSocket-based chat service supporting multiple channels and message history caching.",
    tech: ["Node.js", "Socket.io", "Redis"],
    image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80&auto=format&fit=crop",
    link: "#"
  }
];

export function Projects() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
      id="projects"
    >
      <h2 className="text-lg font-semibold text-neutral-900 mb-6 tracking-tight px-1">Selected Work</h2>
      <div className="flex flex-col gap-6">
        {projects.map((project) => (
          <div key={project.title} className="group relative flex flex-col p-4 sm:p-5 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:border-neutral-200 hover:shadow-md hover:-translate-y-0.5 transition-all gap-4">
            <a href={project.link} className="w-full aspect-video sm:aspect-[2/1] rounded-xl overflow-hidden bg-neutral-100 block">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out" />
            </a>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 px-1.5 pb-1.5">
              <div className="sm:w-1/3 shrink-0">
                <a href={project.link} className="inline-flex items-center gap-1 font-medium text-neutral-900 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                  {project.title}
                  <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600 transition-colors" />
                </a>
                <div className="text-xs text-neutral-500 mt-2 flex flex-wrap gap-x-2 gap-y-1">
                  {project.tech.map((t, i) => (
                    <span key={t} className="flex items-center">
                      {t}{i < project.tech.length - 1 && <span className="ml-2 w-1 h-1 bg-neutral-300 rounded-full" />}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-neutral-600 sm:w-2/3 leading-relaxed mt-1 sm:mt-0">
                {project.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
