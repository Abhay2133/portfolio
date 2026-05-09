import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Journey } from "./components/Journey";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AbstractBackground } from "./components/AbstractBackground";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-12 relative">
      <AbstractBackground />
      <div className="w-full max-w-2xl flex flex-col gap-12 sm:gap-20 relative z-10 pt-6 pb-12">
        <Navigation />
        <Hero />
        <Skills />
        <Journey />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
