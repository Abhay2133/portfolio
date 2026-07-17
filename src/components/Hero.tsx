import { FileText, Github, Linkedin, Mail } from "lucide-react";

export function Hero() {
  return (
    <section className="hero">
      <img
        className="avatar"
        src="/college.jpg"
        alt="Portrait of Abhay Bisht"
        width="140"
        height="140"
      />
      <div>
        <span className="status">Currently at Formester</span>
      </div>
      <h1>Abhay Bisht</h1>
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
        <a href="/Resume_Abhay_Updated.pdf" target="_blank" rel="noopener noreferrer">
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
    </section>
  );
}
