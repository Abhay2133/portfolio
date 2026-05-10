import { motion } from "motion/react";

const journey = [
  {
    role: "Full Stack Engineer",
    organization: "Formester",
    period: "July 2025 - Present"
  },
  {
    role: "Full Stack Intern",
    organization: "Acorn Globus",
    period: "Feb 2025 - June 2025"
  },
  {
    role: "SDE Intern",
    organization: "Excelling Technologies",
    period: "June 2024 - Dec 2024"
  },
  {
    role: "Internship",
    organization: "CodeQuotient",
    period: "June 2024 - July 2024"
  }
];

export function Journey() {
  return (
    <motion.section 
      id="journey"
      className="w-full"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 tracking-tight px-1">Career Journey</h2>
      
      <div className="flex flex-col gap-0 relative px-1">
        {/* Timeline line */}
        <div className="absolute left-[15px] top-4 bottom-4 w-[2px] bg-neutral-200 dark:bg-neutral-800"></div>

        {journey.map((item, index) => (
          <div key={index} className="flex gap-5 sm:gap-6 relative z-10 pb-10 last:pb-0 group">
            {/* Dot */}
            <div className="relative mt-1.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#fafafa] dark:bg-[#0a0a0a] ring-1 ring-neutral-200 dark:ring-neutral-800 shadow-sm transition-all group-hover:ring-neutral-300 dark:group-hover:ring-neutral-700">
              <div className="h-2 w-2 rounded-full bg-neutral-400 dark:bg-neutral-500 transition-colors group-hover:bg-neutral-600 dark:group-hover:bg-neutral-300"></div>
            </div>
            
            <div className="flex flex-col">
              <h3 className="text-base tracking-tight font-medium text-neutral-900 dark:text-neutral-100">
                {item.role}
              </h3>
              <p className="text-sm font-medium text-neutral-600 dark:text-neutral-400 mt-0.5">
                {item.organization}
              </p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mt-1">
                {item.period}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
