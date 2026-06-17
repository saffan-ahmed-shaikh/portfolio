"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FOOTER_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-border/50">
      {/* Gradient top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(var(--glow-accent), 0.6), transparent)",
        }}
      />

      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 blur-3xl opacity-5"
          style={{
            background:
              "radial-gradient(ellipse, rgba(99,102,241,1), transparent)",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <a
              href="#home"
              className="text-xl font-extrabold font-mono gradient-text hover:opacity-80 transition-opacity"
            >
              {"<Safwan />"}
            </a>
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © {currentYear} Safwan Ahmed. Crafted with ❤️ & Next.js.
            </p>
          </div>

          {/* Nav links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Made with */}
          <p className="text-xs text-muted-foreground text-center">
            Built with <span className="text-accent font-medium">Next.js</span>,{" "}
            <span className="text-accent font-medium">Tailwind CSS</span> &{" "}
            <span className="text-accent font-medium">Framer Motion</span>
          </p>
        </div>
      </div>

      {/* Back to top button */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.22 }}
            onClick={scrollToTop}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full text-accent-foreground shadow-xl transition-transform duration-200 hover:scale-110 cursor-pointer"
            style={{
              background: "var(--accent)",
              boxShadow: "0 4px 20px rgba(var(--glow-accent), 0.45)",
            }}
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
