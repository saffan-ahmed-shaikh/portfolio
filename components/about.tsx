"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { User, Wifi, Gauge, Bot, Award } from "lucide-react";

interface Stat {
  label: string;
  value: number;
  suffix: string;
}

const stats: Stat[] = [
  { label: "Years of Experience", value: 4, suffix: "+" },
  { label: "Projects Shipped", value: 10, suffix: "+" },
  { label: "Technologies", value: 15, suffix: "+" },
  { label: "Awards", value: 3, suffix: "×" },
];

const cards = [
  {
    icon: User,
    title: "Full-Stack Ownership",
    color: "99, 102, 241",
    body: "I own features end-to-end — from MySQL schema design and TypeScript REST APIs to React.js frontends. At Deloitte, built an L&D portal solo, eliminating all manual compliance tracking.",
  },
  {
    icon: Wifi,
    title: "Real-Time Systems",
    color: "6, 182, 212",
    body: "Production experience with Socket.io WebSockets — built Tunnel (50–200 live users) and CollabDocs with Yjs CRDT sync for conflict-free collaborative editing at sub-second latency.",
  },
  {
    icon: Gauge,
    title: "Performance & Scale",
    color: "16, 185, 129",
    body: "Achieved 30% page load reduction on a 50k–100k daily user fintech platform via Lighthouse profiling, code-splitting, lazy loading, and MySQL query optimisation.",
  },
  {
    icon: Bot,
    title: "ML-Powered Automation",
    color: "168, 85, 247",
    body: "Built an ML-powered Change Request validation system at Deloitte integrated with ServiceNow, and a Python/Flask pipeline that saved 1,054+ hours of manual work annually.",
  },
];

/* Animated counter hook */
function useCounter(target: number, duration: number = 1400) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(target / (duration / 30));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return { count, ref };
}

function StatCounter({ stat }: { stat: Stat }) {
  const { count, ref } = useCounter(stat.value);
  return (
    <div className="text-center">
      <div className="flex items-end justify-center gap-0.5">
        <span
          ref={ref}
          className="text-3xl sm:text-4xl font-extrabold gradient-text tabular-nums"
        >
          {count}
        </span>
        <span className="text-2xl font-extrabold gradient-text mb-0.5">
          {stat.suffix}
        </span>
      </div>
      <p className="text-xs text-muted-foreground mt-1 font-medium leading-tight">
        {stat.label}
      </p>
    </div>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function About() {
  return (
    <section
      id="about"
      className="py-24 sm:py-36 relative overflow-hidden bg-secondary/20"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 -right-32 w-80 h-80 rounded-full blur-3xl opacity-8 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.15), transparent)",
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-14">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <span className="section-label">
              <Award className="h-3 w-3" />
              Who I Am
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              About <span className="gradient-text">Safwan</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              Full-stack engineer with 4+ years building high-traffic financial
              and enterprise products using React.js, Node.js, TypeScript, and
              Python. Deloitte Applause Award winner (2024 & 2025) for
              ML-powered automation that eliminated{" "}
              <span className="text-foreground font-semibold">
                1,054+ hours
              </span>{" "}
              of manual work annually across enterprise workflows.
            </p>
          </motion.div>

          {/* Stat counters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-6"
          >
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center justify-center p-5 rounded-2xl border border-border/50 bg-card hover:border-accent/30 transition-colors duration-300"
              >
                <StatCounter stat={s} />
              </div>
            ))}
          </motion.div>

          {/* Cards */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 md:grid-cols-2"
          >
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <motion.div key={card.title} variants={item}>
                  <div className="group relative h-full rounded-2xl border border-border/50 bg-card p-6 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-lg">
                    {/* Hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
                      style={{
                        boxShadow: `0 0 0 1px rgba(${card.color}, 0.35), 0 8px 28px rgba(${card.color}, 0.10)`,
                      }}
                    />

                    {/* Top ambient blob */}
                    <div
                      className="absolute -top-6 -right-6 w-28 h-28 rounded-full blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `rgb(${card.color})` }}
                    />

                    {/* Icon */}
                    <div
                      className="flex items-center justify-center w-11 h-11 rounded-xl mb-4 transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: `rgba(${card.color}, 0.12)`,
                        boxShadow: `0 4px 12px rgba(${card.color}, 0.2)`,
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: `rgb(${card.color})` }}
                      />
                    </div>

                    <h3 className="font-semibold text-foreground text-base mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
