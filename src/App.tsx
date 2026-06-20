import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [showCar, setShowCar] = useState(false);
  const [showCustomCursor, setShowCustomCursor] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Detect Desktop for Custom Cursor
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (!isTouchDevice) {
        setShowCustomCursor(true);
        
        setTimeout(() => {
          const cursorDot = document.querySelector('.cursor-dot');
          const cursorRing = document.querySelector('.cursor-ring');
          if (!cursorDot || !cursorRing) return;

          gsap.set(cursorDot, { xPercent: -50, yPercent: -50 });
          gsap.set(cursorRing, { xPercent: -50, yPercent: -50 });

          const xToDot = gsap.quickTo(cursorDot, "x", { duration: 0.1, ease: "power3" });
          const yToDot = gsap.quickTo(cursorDot, "y", { duration: 0.1, ease: "power3" });
          const xToRing = gsap.quickTo(cursorRing, "x", { duration: 0.35, ease: "power3" });
          const yToRing = gsap.quickTo(cursorRing, "y", { duration: 0.35, ease: "power3" });

          const handleMouseMove = (e: MouseEvent) => {
            xToDot(e.clientX);
            yToDot(e.clientY);
            xToRing(e.clientX);
            yToRing(e.clientY);
          };
          window.addEventListener("mousemove", handleMouseMove);

          // Hover snaps & Magnet effects
          const magneticTargets = document.querySelectorAll(".magnetic-target");
          
          magneticTargets.forEach((target) => {
            const el = target as HTMLElement;

            const onMouseEnter = () => {
              gsap.to(cursorRing, {
                scale: 1.5,
                backgroundColor: "rgba(168, 85, 247, 0.05)",
                borderColor: "#a855f7",
                duration: 0.3
              });
              gsap.to(cursorDot, {
                scale: 1.5,
                backgroundColor: "#a855f7",
                duration: 0.3
              });
            };

            const onMouseLeave = () => {
              const isDarkMode = document.documentElement.classList.contains('dark');
              gsap.to(cursorRing, {
                scale: 1,
                backgroundColor: "transparent",
                borderColor: isDarkMode ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)",
                duration: 0.3
              });
              gsap.to(cursorDot, {
                scale: 1,
                backgroundColor: isDarkMode ? "#ffffff" : "#171717",
                duration: 0.3
              });
              gsap.to(el, { x: 0, y: 0, ease: "power3.out", duration: 0.5 });
            };

            const onMouseMoveEl = (e: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;

              gsap.to(el, {
                x: x * 0.3,
                y: y * 0.3,
                ease: "power2.out",
                duration: 0.3
              });
            };

            el.addEventListener("mouseenter", onMouseEnter);
            el.addEventListener("mouseleave", onMouseLeave);
            el.addEventListener("mousemove", onMouseMoveEl);
          });
        }, 100);
      }

      // Helper to initialize all ScrollTrigger-based animations and hover listeners
      const initScrollTriggerAnimations = () => {
        // 3. ScrollTrigger reveals for sections
        document.querySelectorAll('.scroll-animate').forEach(section => {
          // Skip sections with custom child stagger triggers
          if (
            section.querySelector('.tech-card') || 
            section.querySelector('.achievement-card') || 
            section.querySelector('.journey-item') || 
            section.querySelector('.project-card')
          ) {
            return;
          }

          gsap.set(section, { opacity: 0, y: 30 });
          gsap.to(section, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              once: true
            }
          });
        });

        // 4. Stagger Technologies Section Title, Cards, Items, and Certifications
        const techSection = document.querySelector('.scroll-animate-tech');
        if (techSection) {
          const techTitle = techSection.querySelector('.tech-section-title');
          const techCards = techSection.querySelectorAll('.tech-card');
          const certTitle = techSection.querySelector('.cert-title');
          const certItems = techSection.querySelectorAll('.cert-item');

          // Create a main ScrollTrigger timeline for this section
          const tlTech = gsap.timeline({
            scrollTrigger: {
              trigger: techSection,
              start: "top 80%",
              once: true
            }
          });

          // 1. Reveal Section Title
          if (techTitle) {
            tlTech.to(techTitle, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            });
          }

          // 2. Initial state setup for cards and items to support GSAP animate-in
          gsap.set(techCards, { 
            opacity: 0, 
            y: 50,
            rotateX: -15,
            transformPerspective: 1000,
            transformOrigin: "top center"
          });

          // 3. Stagger reveal the cards
          tlTech.to(techCards, {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.2)",
          }, "-=0.3");

          // 4. Reveal titles and stagger list items inside cards
          techCards.forEach((card, cardIndex) => {
            const cardTitle = card.querySelector('.tech-card-title');
            const items = card.querySelectorAll('.tech-item');
            const dots = card.querySelectorAll('.tech-dot');

            if (cardTitle) {
              tlTech.to(cardTitle, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              }, `-=${0.7 - cardIndex * 0.1}`);
            }

            if (items.length > 0) {
              tlTech.to(items, {
                opacity: 1,
                x: 0,
                duration: 0.5,
                stagger: 0.05,
                ease: "power2.out"
              }, `<+=0.1`);

              tlTech.to(dots, {
                scale: 1,
                duration: 0.4,
                stagger: 0.05,
                ease: "back.out(2)"
              }, `<`);
            }
          });

          // 5. Stagger reveal certifications
          if (certTitle || certItems.length > 0) {
            const certTimeline = gsap.timeline();
            if (certTitle) {
              certTimeline.to(certTitle, {
                opacity: 1,
                y: 0,
                duration: 0.4,
                ease: "power2.out"
              });
            }
            if (certItems.length > 0) {
              certTimeline.to(certItems, {
                opacity: 1,
                scale: 1,
                duration: 0.5,
                stagger: 0.06,
                ease: "back.out(1.5)"
              }, "-=0.2");
            }
            tlTech.add(certTimeline, "-=0.2");
          }

          // Add 3D perspective tilt on card hover
          const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
          if (!isTouch) {
            techCards.forEach((card) => {
              const el = card as HTMLElement;
              el.addEventListener("mousemove", (e) => {
                const rect = el.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;

                gsap.to(el, {
                  rotationY: x * 10,
                  rotationX: -y * 10,
                  y: -6,
                  transformPerspective: 800,
                  ease: "power2.out",
                  duration: 0.4
                });
              });

              el.addEventListener("mouseleave", () => {
                gsap.to(el, {
                  rotationY: 0,
                  rotationX: 0,
                  y: 0,
                  ease: "power3.out",
                  duration: 0.6
                });
              });
            });

            // Add magnetic target/highlight effect for individual tech items on hover
            const techItems = techSection.querySelectorAll('.tech-item');
            techItems.forEach((item) => {
              const el = item as HTMLElement;
              const dot = el.querySelector('.tech-dot');
              const text = el.querySelector('.tech-text');

              el.addEventListener("mouseenter", () => {
                gsap.to(el, {
                  x: 6,
                  duration: 0.3,
                  ease: "power2.out"
                });
                if (dot) {
                  gsap.to(dot, {
                    scale: 1.6,
                    backgroundColor: "#a855f7",
                    duration: 0.3,
                    ease: "back.out(2)"
                  });
                }
                if (text) {
                  gsap.to(text, {
                    color: "#a855f7",
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              });

              el.addEventListener("mouseleave", () => {
                gsap.to(el, {
                  x: 0,
                  duration: 0.4,
                  ease: "power3.out"
                });
                if (dot) {
                  gsap.to(dot, {
                    scale: 1,
                    backgroundColor: "",
                    duration: 0.4,
                    ease: "power3.out"
                  });
                }
                if (text) {
                  gsap.to(text, {
                    color: "",
                    duration: 0.4,
                    ease: "power3.out"
                  });
                }
              });
            });

            // Also add hover effects to cert items
            certItems.forEach((cert) => {
              const el = cert as HTMLElement;
              const svg = el.querySelector('svg');

              el.addEventListener("mouseenter", () => {
                gsap.to(el, {
                  y: -2,
                  scale: 1.05,
                  borderColor: "rgba(168, 85, 247, 0.4)",
                  duration: 0.3,
                  ease: "power2.out"
                });
                if (svg) {
                  gsap.to(svg, {
                    color: "#a855f7",
                    rotate: 15,
                    scale: 1.1,
                    duration: 0.3,
                    ease: "power2.out"
                  });
                }
              });

              el.addEventListener("mouseleave", () => {
                gsap.to(el, {
                  y: 0,
                  scale: 1,
                  borderColor: "",
                  duration: 0.4,
                  ease: "power3.out"
                });
                if (svg) {
                  gsap.to(svg, {
                    color: "",
                    rotate: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out"
                  });
                }
              });
            });
          }
        }

        // 5. Stagger Achievements
        const achieveCards = document.querySelectorAll('.achievement-card');
        if (achieveCards.length > 0) {
          gsap.set(achieveCards, { opacity: 0, y: 30 });
          gsap.to(achieveCards, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".achievement-card",
              start: "top 85%",
              once: true
            }
          });
        }

        // 6. Career Journey grow vertical line + node reveals
        const journeyLine = document.querySelector('.journey-line');
        if (journeyLine) {
          gsap.to(journeyLine, {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: "#journey",
              start: "top 75%",
              end: "bottom 70%",
              scrub: 1
            }
          });
        }

        const journeyItems = document.querySelectorAll('.journey-item');
        if (journeyItems.length > 0) {
          journeyItems.forEach((item) => {
            const dot = item.querySelector('.timeline-dot');
            const content = item.querySelector('.journey-content');
            
            if (dot && content) {
              gsap.set(dot, { scale: 0, opacity: 0 });
              gsap.set(content, { opacity: 0, x: 20 });

              gsap.timeline({
                scrollTrigger: {
                  trigger: item,
                  start: "top 80%",
                  once: true
                }
              })
              .to(dot, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" })
              .to(content, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");
            }
          });
        }

        // 7. Selected Work Project Cards Reveal (Clip-Path & Image Parallax)
        const projectCards = document.querySelectorAll('.project-card');
        if (projectCards.length > 0) {
          projectCards.forEach((card) => {
            const wrap = card.querySelector('.project-img-wrap');
            const img = card.querySelector('.project-img');
            const content = card.querySelector('.project-content');

            if (wrap && img && content) {
              gsap.set(content, { opacity: 0, y: 15 });

              gsap.timeline({
                scrollTrigger: {
                  trigger: card,
                  start: "top 85%",
                  once: true
                }
              })
              .to(wrap, {
                clipPath: "inset(0 0% 0 0)",
                duration: 1,
                ease: "power3.inOut"
              })
              .to(img, {
                scale: 1,
                duration: 1,
                ease: "power3.inOut"
              }, "<")
              .to(content, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
              }, "-=0.4");
            }
          });
        }

        // 8. Interactive 3D Glare Tilt for Get In Touch Card
        const contactCard = document.querySelector('.contact-card');
        const contactGlare = document.querySelector('.contact-glare');
        if (contactCard && contactGlare) {
          contactCard.addEventListener("mousemove", (e) => {
            const rect = contactCard.getBoundingClientRect();
            const x = ((e as MouseEvent).clientX - rect.left) / rect.width - 0.5;
            const y = ((e as MouseEvent).clientY - rect.top) / rect.height - 0.5;

            gsap.to(contactCard, {
              rotationY: x * 15,
              rotationX: -y * 15,
              transformPerspective: 1000,
              ease: "power2.out",
              duration: 0.5
            });

            gsap.to(contactGlare, {
              opacity: 1,
              background: `radial-gradient(circle at ${(x + 0.5) * 100}% ${(y + 0.5) * 100}%, rgba(168, 85, 247, 0.18) 0%, transparent 60%)`,
              ease: "power2.out",
              duration: 0.5
            });
          });

          contactCard.addEventListener("mouseleave", () => {
            gsap.to(contactCard, {
              rotationY: 0,
              rotationX: 0,
              ease: "power3.out",
              duration: 0.8
            });
            gsap.to(contactGlare, {
              opacity: 0,
              ease: "power3.out",
              duration: 0.8
            });
          });
        }
      };

      // 2. Entrance Timeline (no intro preloader)
      const tl = gsap.timeline({
        onComplete: () => {
          // 9. Navbar Scroll animations
          const navbar = document.querySelector('.navbar-container');
          if (navbar) {
            ScrollTrigger.create({
              start: "top top",
              onUpdate: (self) => {
                // Hide navbar on scroll down past 80px, show on scroll up
                if (self.direction === 1 && self.scroll() > 80) {
                  gsap.to(navbar, { 
                    y: -100, 
                    opacity: 0, 
                    duration: 0.4, 
                    ease: "power2.out" 
                  });
                } else {
                  gsap.to(navbar, { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.4, 
                    ease: "power2.out" 
                  });
                }
              }
            });
          }

          // Scroll Progress indicator inside the navbar
          const scrollProgress = document.querySelector('.scroll-progress-bar');
          if (scrollProgress) {
            ScrollTrigger.create({
              trigger: "body",
              start: "top top",
              end: "bottom bottom",
              scrub: true,
              onUpdate: (self) => {
                gsap.to(scrollProgress, {
                  scaleX: self.progress,
                  duration: 0.1,
                  ease: "none",
                  overwrite: "auto"
                });
              }
            });
          }
        }
      });

      const navbar = document.querySelector('.navbar-container');
      if (navbar) {
        gsap.set(navbar, { y: -50, opacity: 0 });
        tl.to(navbar, {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out"
        });
      }

      // Programmatically split and reveal the main hero title
      const splitTitle = document.querySelector('.hero-title');
      if (splitTitle) {
        const rawText = splitTitle.textContent?.trim() || "";
        splitTitle.innerHTML = "";
        
        const heroWords = rawText.split(" ");
        heroWords.forEach((word) => {
          const wordSpan = document.createElement("span");
          wordSpan.className = "inline-block whitespace-nowrap mr-2";
          
          const characters = word.split("");
          characters.forEach((char) => {
            const charSpan = document.createElement("span");
            charSpan.className = "char-span inline-block opacity-0 translate-y-[110%] rotate-6";
            charSpan.textContent = char;
            wordSpan.appendChild(charSpan);
          });
          
          splitTitle.appendChild(wordSpan);
        });

        // Stagger main heading characters (overlapping with navbar transition)
        tl.to(".char-span", {
          opacity: 1,
          y: 0,
          rotate: 0,
          duration: 0.9,
          ease: "power4.out",
          stagger: 0.03
        }, "-=0.8");
      }

      // Cascade subtitle and buttons
      const heroSubtitle = document.querySelector('.hero-subtitle');
      const heroButtons = document.querySelector('.hero-buttons');
      if (heroSubtitle && heroButtons) {
        tl.to(heroSubtitle, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6")
        .to(heroButtons, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out"
        }, "-=0.6");
      }

      // Initialize all ScrollTrigger animations immediately on mount
      initScrollTriggerAnimations();
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center px-6 sm:px-12 relative overflow-x-hidden">
      {/* Custom Cursor (Desktop Only) */}
      {showCustomCursor && (
        <div className="hidden md:block">
          <div className="cursor-dot fixed top-0 left-0 w-2 h-2 bg-neutral-900 dark:bg-white rounded-full pointer-events-none z-50 mix-blend-difference"></div>
          <div className="cursor-ring fixed top-0 left-0 w-8 h-8 border border-neutral-950/30 dark:border-white/30 rounded-full pointer-events-none z-50"></div>
        </div>
      )}

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
