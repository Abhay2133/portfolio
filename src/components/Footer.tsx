export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <ul className="footer-social" aria-label="Social links">
          <li>
            <a href="mailto:abhaybishthestudent@gmail.com">
              Email
            </a>
          </li>
          <li>
            <a href="https://github.com/abhay2133" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/abhay-21m" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
        </ul>
        <div className="footer-meta">
          <span>&copy; {currentYear} Abhay Bisht</span>
        </div>
      </div>
    </footer>
  );
}
