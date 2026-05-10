import { useState } from "react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import { Skills } from "./components/Skills";
import { Journey } from "./components/Journey";
import { Achievements } from "./components/Achievements";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { AbstractBackground } from "./components/AbstractBackground";
import { SimpleCarCursor } from "./components/SimpleCarCursor";

export default function App() {
  const [showCar, setShowCar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-12 relative">
      <AbstractBackground />
      <SimpleCarCursor isVisible={showCar} />
      <div className="w-full max-w-2xl flex flex-col gap-12 sm:gap-20 relative z-10 pt-6 pb-12">
        <Navigation onToggleCar={() => setShowCar(!showCar)} isCarVisible={showCar} />
        <Hero />
        <Skills />
        <Achievements />
        <Journey />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
