import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AbstractBackground } from "./components/AbstractBackground";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-12 relative selection:bg-neutral-200 selection:text-neutral-900">
      <AbstractBackground />
      <div className="w-full max-w-2xl flex flex-col gap-12 sm:gap-20 relative z-10 pt-6 pb-12">
        <Navigation />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
