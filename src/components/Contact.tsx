import { Mail } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="section">
      <h2 className="flex items-center gap-2">Get in touch <Mail className="w-[1.2rem] h-[1.2rem] text-neutral-400" /></h2>
      <p className="section-lead">
        I'm currently available for full-time roles and freelance projects. Feel free to reach out if you want to collaborate or just say hi.
      </p>
      
      <div className="quick-links">
        <a href="mailto:abhaybishthestudent@gmail.com" className="inline-flex items-center gap-2">
          <Mail className="w-4 h-4" />
          Say Hello
        </a>
      </div>
    </section>
  );
}
