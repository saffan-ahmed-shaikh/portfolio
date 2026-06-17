"use client";

import { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#stats", label: "Stats" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#how-i-build", label: "Process" },
  { href: "#playground", label: "Lab" },
  { href: "#terminal-section", label: "Terminal" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActive] = useState("home");

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Scroll detection for header shadow */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Active section tracking via IntersectionObserver */
  useEffect(() => {
    const ids = [
      "home",
      "about",
      "stats",
      "skills",
      "projects",
      "experience",
      "how-i-build",
      "playground",
      "terminal-section",
      "contact",
    ];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!mounted) return null;

  const isActive = (href: string) => activeSection === href.replace("#", "");

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border/80 bg-background/85 backdrop-blur-lg shadow-sm"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <motion.a
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            href="#home"
            className="relative group text-xl font-extrabold font-mono tracking-tight"
          >
            <span className="gradient-text">{`<Safwan />`}</span>
            <span
              className="absolute -bottom-0.5 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-300 rounded-full"
              style={{ background: "var(--accent)" }}
            />
          </motion.a>

          {/* Desktop nav */}
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:flex items-center gap-1"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
                style={{
                  color: isActive(link.href)
                    ? "var(--accent)"
                    : "var(--muted-foreground)",
                }}
              >
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: "rgba(var(--glow-accent), 0.10)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10 hover:text-foreground transition-colors">
                  {link.label}
                </span>
              </a>
            ))}
          </motion.nav>

          {/* Right controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            {/* Theme toggle */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/10 transition-colors cursor-pointer"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={theme}
                    initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.22 }}
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </motion.div>

            {/* Mobile menu button */}
            <motion.div whileTap={{ scale: 0.95 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen((o) => !o)}
                className="md:hidden rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent/10 cursor-pointer"
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isOpen ? "close" : "open"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    {isOpen ? (
                      <X className="h-5 w-5" />
                    ) : (
                      <Menu className="h-5 w-5" />
                    )}
                  </motion.span>
                </AnimatePresence>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Mobile overlay — fullscreen slide from right */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            className="md:hidden overflow-hidden border-t border-border/40"
            style={{
              background: "var(--background)",
              backdropFilter: "blur(20px)",
            }}
              >
            <nav className="mx-auto max-w-6xl px-4 py-4 flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                  style={{
                    color: isActive(link.href)
                      ? "var(--accent)"
                      : "var(--muted-foreground)",
                    background: isActive(link.href)
                      ? "rgba(var(--glow-accent), 0.08)"
                      : "transparent",
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{
                      background: isActive(link.href)
                        ? "var(--accent)"
                        : "var(--border)",
                    }}
                  />
                    {link.label}
                  </motion.a>
                ))}
              </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
