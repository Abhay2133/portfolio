const allSkills = [
  "React", "Next.js", "Vue.js", "TypeScript", "Tailwind CSS",
  "Node.js", "Ruby on Rails", "Express.js", "REST APIs", "Webhooks",
  "PostgreSQL", "MySQL", "Git", "API Design", "System Design"
];

const certifications = [
  "Machine Learning – Acmegrade",
  "JS Algorithms – Freecodecamp",
  "Responsive Web Design"
];

import { SkillIcon } from "./SkillIcon";

export function Skills() {
  return (
    <section id="about" className="section">
      <h2>About</h2>
      <p className="section-lead">
        I'm a full-stack software engineer specializing in web application development and AI systems. I enjoy building clean, robust, and user-centric digital products, bridging the gap between back-end architecture and front-end user experiences.
      </p>
      
      <div className="stack" aria-label="Technologies I work with">
        {allSkills.map(skill => (
          <span key={skill} className="inline-flex items-center gap-1.5">
            <SkillIcon skill={skill} />
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-[10px] font-mono font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 mb-3">
          Certifications
        </h3>
        <div className="flex flex-wrap gap-2">
          {certifications.map(cert => (
            <span 
              key={cert} 
              className="inline-flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300 px-3 py-1 bg-neutral-50/50 dark:bg-neutral-900/20 border border-neutral-200 dark:border-neutral-800 rounded-md"
            >
              <SkillIcon skill={cert} className="text-neutral-500" />
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
