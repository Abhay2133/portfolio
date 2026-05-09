import { motion } from "motion/react";

const skills = {
  "Frontend": ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  "Backend": ["Node.js", "Express", "PostgreSQL", "MongoDB", "REST APIs"],
  "Tools": ["Git", "Docker", "AWS", "Linux"]
};

export function Skills() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-lg font-semibold text-neutral-900 mb-6 tracking-tight px-1">Technologies I Use</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="flex flex-col p-5 sm:p-6 rounded-2xl bg-white border border-neutral-100 shadow-sm hover:border-neutral-200 hover:shadow-md hover:-translate-y-0.5 transition-all">
            <h3 className="text-sm font-medium text-neutral-900 mb-4">{category}</h3>
            <ul className="flex flex-col gap-2.5">
              {items.map(item => (
                <li key={item} className="text-sm text-neutral-600 flex items-center before:content-[''] before:w-1.5 before:h-1.5 before:bg-neutral-300 before:rounded-full before:mr-3">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
