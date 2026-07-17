import { 
  SiReact, SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiRubyonrails, SiExpress, SiPostgresql, SiMysql,
  SiGit, SiFlutter, SiDart, SiFirebase
} from "react-icons/si";

import { 
  Server, Webhook, Network, Settings, Brain, Code, MonitorSmartphone, Cpu 
} from "lucide-react";

export function SkillIcon({ skill, className = "" }: { skill: string, className?: string }) {
  const size = 14;
  
  switch (skill) {
    case "React": return <SiReact size={size} className={`text-[#61DAFB] ${className}`} />;
    case "Next.js": return <SiNextdotjs size={size} className={`text-black dark:text-white ${className}`} />;
    case "Vue.js": return <SiVuedotjs size={size} className={`text-[#4FC08D] ${className}`} />;
    case "TypeScript": return <SiTypescript size={size} className={`text-[#3178C6] ${className}`} />;
    case "Tailwind CSS": return <SiTailwindcss size={size} className={`text-[#06B6D4] ${className}`} />;
    case "Node.js": return <SiNodedotjs size={size} className={`text-[#339933] ${className}`} />;
    case "Ruby on Rails": return <SiRubyonrails size={size} className={`text-[#CC0000] ${className}`} />;
    case "Express.js": return <SiExpress size={size} className={`text-black dark:text-white ${className}`} />;
    case "PostgreSQL": return <SiPostgresql size={size} className={`text-[#4169E1] ${className}`} />;
    case "MySQL": return <SiMysql size={size} className={`text-[#4479A1] ${className}`} />;
    case "Git": return <SiGit size={size} className={`text-[#F05032] ${className}`} />;
    case "Flutter": return <SiFlutter size={size} className={`text-[#02569B] ${className}`} />;
    case "Dart": return <SiDart size={size} className={`text-[#0175C2] ${className}`} />;
    case "Firebase": return <SiFirebase size={size} className={`text-[#FFCA28] ${className}`} />;
    
    // Abstract concepts
    case "REST APIs": return <Server size={size} className={className} />;
    case "Webhooks": return <Webhook size={size} className={className} />;
    case "API Design": return <Network size={size} className={className} />;
    case "System Design": return <Settings size={size} className={className} />;
    case "Machine Learning – Acmegrade": return <Brain size={size} className={className} />;
    case "JS Algorithms – Freecodecamp": return <Code size={size} className={className} />;
    case "Responsive Web Design": return <MonitorSmartphone size={size} className={className} />;
    case "GROQ AI": return <Cpu size={size} className={className} />;
    
    default: return null;
  }
}
