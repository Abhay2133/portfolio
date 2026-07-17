import { FileText, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="hero">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 md:gap-10">
        {/* Left Column: Text Content */}
        <div className="flex-1 min-w-0">
          <div className="mb-2">
            <span className="status">Currently at Formester</span>
          </div>
          <h1 className="text-neutral-900 dark:text-neutral-100">Abhay Bisht</h1>
          <p className="tagline">
            Software Engineer at{" "}
            <a href="https://formester.com" target="_blank" rel="noopener noreferrer">
              Formester
            </a>
          </p>
          <p className="intro">
            I build production SaaS platforms, design robust APIs, and integrate AI models to create scalable, high-performance digital products.
          </p>

          <div className="quick-links">
            <a href="/Resume_Abhay_V3.pdf" target="_blank" rel="noopener noreferrer">
              <FileText className="w-4 h-4" />
              Resume
            </a>
            <a href="https://github.com/abhay2133" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/abhay-21m" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </a>
            <a href="mailto:abhaybishthestudent@gmail.com">
              <Mail className="w-4 h-4" />
              Email
            </a>
          </div>
        </div>

        {/* Right Column: Avatar (on top on mobile, on the right on desktop) */}
        <div className="flex-shrink-0 self-start order-first md:order-last">
          <img
            className="avatar"
            src="/college.jpg"
            alt="Portrait of Abhay Bisht"
            width="120"
            height="120"
          />
        </div>
      </div>
    </section>
  );
}
