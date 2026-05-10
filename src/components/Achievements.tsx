import { motion } from "motion/react";
import { Trophy, Star } from "lucide-react";

const achievements = [
  {
    title: "YouTube Downloader",
    description: "Deployed a tool with over 1,000+ active users.",
    icon: Trophy
  },
  {
    title: "Real-time Chat",
    description: "Built and deployed a chat application supporting concurrent connections.",
    icon: Star
  }
];

export function Achievements() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 mb-6 tracking-tight px-1">Notable Achievements</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievements.map((item) => (
          <div key={item.title} className="flex gap-4 p-5 rounded-2xl bg-white dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800 shadow-sm hover:border-neutral-200 dark:hover:border-neutral-700 transition-all">
            <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
              <item.icon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-neutral-900 dark:text-neutral-100">{item.title}</h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
