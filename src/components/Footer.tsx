import { Mail, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <ul className="footer-social" aria-label="Social links">
          <li>
            <a href="mailto:abhaybishthestudent@gmail.com" aria-label="Email">
              <Mail />
            </a>
          </li>
          <li>
            <a href="https://github.com/abhay2133" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Github />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/abhay-21m" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Linkedin />
            </a>
          </li>
        </ul>
        <div className="footer-meta">
          <span>&copy; {currentYear} Abhay Bisht</span>
          <span>Built with Astro &amp; Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
