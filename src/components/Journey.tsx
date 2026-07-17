const journey = [
  {
    role: "Full Stack Engineer",
    organization: "Formester",
    url: "https://formester.com",
    logoUrl: "/logos/formester.svg",
    period: "July 2025 — Present",
    bullets: [
      "Developing and maintaining core features of the Formester online form builder.",
      "Working across the stack with React, Ruby on Rails, and Tailwind CSS to deliver high-quality code.",
      "Collaborating with team members to resolve bugs, optimize performance, and release new product features."
    ]
  },
  {
    role: "Full Stack Intern",
    organization: "Acorn Globus",
    url: "https://acornglobus.com",
    logoUrl: "/logos/acornglobus.svg",
    period: "Feb 2025 — June 2025",
    bullets: [
      "Built responsive web applications and API integrations for client systems.",
      "Worked closely with frontend technologies like Vue.js and React to improve user interfaces.",
      "Participated in agile ceremonies and code reviews to ensure design standards."
    ]
  },
  {
    role: "SDE Intern",
    organization: "Excelling Technologies",
    url: "#",
    logoUrl: "",
    period: "June 2024 — Dec 2024",
    bullets: [
      "Contributed to backend services and database optimizations using Node.js and PostgreSQL.",
      "Designed and documented RESTful API endpoints for system integrations.",
      "Implemented security protocols and logging mechanisms to monitor system health."
    ]
  },
  {
    role: "Software Engineering Intern",
    organization: "CodeQuotient",
    url: "https://codequotient.com",
    logoUrl: "/logos/codequotient.svg",
    period: "June 2024 — July 2024",
    bullets: [
      "Completed intensive software engineering training focusing on data structures, algorithms, and full-stack development.",
      "Built several full-stack project prototypes using HTML, CSS, JavaScript, and Node.js."
    ]
  }
];

export function Journey() {
  return (
    <section id="journey" className="section">
      <h2>Experience</h2>
      <ol className="timeline">
        {journey.map((item, index) => (
          <li key={index} className="role">
            <div className="role-header">
              <h3 className="flex items-center gap-2">
                {item.logoUrl && (
                  <img src={item.logoUrl} alt={`${item.organization} logo`} className="w-5 h-5 rounded-sm object-contain bg-white" />
                )}
                {item.url !== "#" ? (
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    {item.organization}
                  </a>
                ) : (
                  item.organization
                )}
              </h3>
              <div className="role-meta">{item.period}</div>
            </div>
            <p className="role-title">{item.role}</p>
            <ul>
              {item.bullets.map((bullet, bulletIdx) => (
                <li key={bulletIdx}>{bullet}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
