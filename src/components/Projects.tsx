const projects = [
  {
    title: "NeuroPlan",
    description: "An AI-powered Flutter app that converts natural language goals into structured project roadmaps with pluggable AI providers.",
    tech: ["Flutter", "Dart", "Firebase", "GROQ AI"],
    link: "https://abhay2133.github.io/neuroplan/"
  },
  {
    title: "Engineers Day System",
    description: "Event registration system for managing participant data and secure online payments with transaction verification.",
    tech: ["Next.js", "PostgreSQL", "Tailwind CSS"],
    link: "https://github.com/Abhay2133/engineering_day"
  },
  {
    title: "Quiz Bowl Application",
    description: "Full-stack quiz platform featuring individual submission handling and JSON-based storage for competitive quiz bowls.",
    tech: ["Flutter", "Express.js", "Node.js", "TypeScript"],
    link: "https://github.com/Abhay2133/quiz_bowl"
  }
];

import { SkillIcon } from "./SkillIcon";
import { FolderCode } from "lucide-react";

export function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="flex items-center gap-2">Projects <FolderCode className="w-[1.2rem] h-[1.2rem] text-neutral-400" /></h2>
      <p className="section-lead mb-6">
        A few things I've built — some for clients, some for fun.
      </p>
      
      <ul className="projects">
        {projects.map((project) => (
          <li key={project.title}>
            <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-card">
              <div className="card-head">
                <h3>{project.title}</h3>
                <svg 
                  className="card-arrow" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  aria-hidden="true"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
              <p>{project.description}</p>
              <div className="tags">
                {project.tech.map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5">
                    <SkillIcon skill={t} />
                    {t}
                  </span>
                ))}
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
