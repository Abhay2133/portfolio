import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { GithubHeatmap } from "./components/GithubHeatmap";
import { Journey } from "./components/Journey";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-x-hidden">
      <Navigation />
      <main className="w-full max-w-[720px] px-6 sm:px-12 flex flex-col relative z-10">
        <Hero />
        <Skills />
        <GithubHeatmap />
        <Journey />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
