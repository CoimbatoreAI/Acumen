import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroCctv from "@/assets/hero-cctv.jpg";
import heroAutomation from "@/assets/hero-automation.jpg";
import heroFire from "@/assets/hero-fire.jpg";

const slides = [
  {
    image: heroCctv,
    title: "Smart Security Solutions for Homes & Businesses",
    subtitle: "Advanced CCTV surveillance systems with 24/7 monitoring and smart alerts.",
  },
  {
    image: heroAutomation,
    title: "Protect What Matters Most with Advanced Technology",
    subtitle: "Complete automation solutions that make your property smarter and safer.",
  },
  {
    image: heroFire,
    title: "Comprehensive Fire Safety Systems You Can Trust",
    subtitle: "State-of-the-art fire detection and alarm systems for total protection.",
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  return (
    <section className="relative h-[85vh] min-h-[500px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].title}
            className="w-full h-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl glass-container p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
            <motion.div
              key={`text-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative z-10"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "80px" }}
                transition={{ delay: 0.1, duration: 0.8 }}
                className="h-1 bg-primary mb-8"
              />
              <h1
                className="text-4xl md:text-6xl font-extrabold leading-[1.1] mb-8 text-white"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {slides[current].title}
              </h1>
              <p className="text-lg md:text-xl mb-10 text-white/80 leading-relaxed font-medium">
                {slides[current].subtitle}
              </p>
              <div className="flex flex-wrap gap-5">
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition-all duration-300 shadow-[0_10px_20px_-10px_rgba(var(--primary),0.5)] hover:-translate-y-1"
                >
                  Get Started
                </Link>
                <Link
                  to="/contact"
                  className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl font-bold hover:bg-white/20 transition-all duration-300 hover:-translate-y-1"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .glass-container {
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.05));
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
          }
        `}} />
      </div>

      {/* Controls */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center text-primary-foreground hover:bg-primary-foreground/20 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-primary" : "w-2 bg-primary-foreground/40"
              }`}
          />
        ))}
      </div>
    </section>
  );
}
