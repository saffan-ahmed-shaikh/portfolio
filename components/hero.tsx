"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download } from "lucide-react";
import { motion } from "framer-motion";

const ROLES = [
  "Full-Stack Engineer",
  "React • Node.js • TypeScript",
  "ML-Powered Automation Builder",
  "Fintech & Enterprise Systems",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  /* Typewriter */
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayText.length < current.length) {
        timeout = setTimeout(() => {
          setDisplayText(current.slice(0, displayText.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 35);
      } else {
        setIsDeleting(false);
        setRoleIndex((i) => (i + 1) % ROLES.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.18, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 28 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="home"
      className="relative overflow-hidden py-24 sm:pt-36 sm:pb-44"
    >
      {/* ── Decorative blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right glow */}
        <div
          className="absolute -top-32 -right-32 w-150 h-150 rounded-full blur-3xl animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
          }}
        />
        {/* Bottom left glow */}
        <div
          className="absolute -bottom-24 -left-24 w-120 h-120 rounded-full blur-3xl animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12), transparent 70%)",
            animationDelay: "1.2s",
          }}
        />

        {/* Dot grid */}
        <div className="absolute inset-0 dot-grid opacity-30" />

        {/* Floating geometric shapes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 1 }}
          className="absolute top-24 right-16 w-16 h-16 border border-accent/20 rounded-2xl animate-float"
          style={{ animationDelay: "0s" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute top-48 right-36 w-8 h-8 border border-accent/15 rounded-full animate-float-reverse"
          style={{ animationDelay: "0.5s" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-32 right-24 w-12 h-12 border border-purple-400/15 rounded-xl animate-float"
          style={{ animationDelay: "1s" }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="absolute top-36 left-8 w-6 h-6 rounded-full animate-float-x"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.5), transparent)",
            animationDelay: "0.3s",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-8"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
              Available for opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h1 className="text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl lg:text-8xl leading-none flex gap-2 items-center">
              <span className="block">Safwan</span>
              <span className="block gradient-text">Ahmed</span>
            </h1>

            {/* Typewriter role */}
            <div className="flex items-center gap-2 mt-4 h-10">
              <span className="text-xl sm:text-2xl font-semibold text-muted-foreground">
                {displayText}
              </span>
              <span className="cursor-blink inline-block w-0.5 h-[1.4em] bg-accent rounded-sm" />
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground sm:text-xl max-w-2xl leading-relaxed"
          >
            Full-stack engineer with{" "}
            <span className="text-foreground font-semibold">4+ years</span>{" "}
            building high-traffic financial and enterprise products at Deloitte
            and ILM UX — eliminating{" "}
            <span className="text-foreground font-semibold">1,054+ hours</span>{" "}
            of manual work via ML-powered automation.
          </motion.p>

          {/* Stat pills */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
            {[
              { label: "Years of Experience", value: "4+" },
              { label: "Projects Shipped", value: "10+" },
              { label: "Tech Stack", value: "15+" },
              { label: "Awards", value: "3×" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-background/50 backdrop-blur-sm"
              >
                <span className="text-sm font-bold text-accent">
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Button
              size="lg"
              className="group relative overflow-hidden text-accent-foreground font-semibold px-7 py-6 rounded-xl"
              style={{
                background: "var(--accent)",
                boxShadow: "0 4px 24px rgba(var(--glow-accent), 0.4)",
              }}
              asChild
            >
              <a href="#projects">
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl" />
              </a>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group px-7 py-6 rounded-xl hover:text-accent border-border/60 hover:border-accent/60 hover:bg-accent/5 transition-all duration-200 font-semibold"
              asChild
            >
              <a href="#contact">Get in Touch</a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="group px-7 py-6 hover:text-accent rounded-xl border-border/60 hover:border-accent/60 hover:bg-accent/5 transition-all duration-200 font-semibold"
              asChild
            >
              <a href="/Safwan_Ahmed.pdf" download>
                <span className="flex items-center gap-2">
                  <Download className="h-4 w-4" />
                  Resume
                </span>
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
