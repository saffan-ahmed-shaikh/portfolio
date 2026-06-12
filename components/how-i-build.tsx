"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Compass,
  Terminal,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Check,
} from "lucide-react";

interface WorkflowStep {
  id: number;
  label: string;
  icon: any;
  title: string;
  description: string;
  bullets: string[];
  metrics: { value: string; label: string };
  color: string;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    id: 1,
    label: "Research",
    icon: Search,
    title: "1. Scope & System Strategy",
    description:
      "Prioritizing business logic scope, API bottlenecks, data structures, and third-party dependencies before any code is written.",
    bullets: [
      "Define database schemas (tables, relational integrity, indices).",
      "Draft system architecture charts detailing real-time (WebSockets) or batch integrations.",
      "Analyze potential CPU/memory hot-spots and select caching strategies.",
    ],
    metrics: { value: "100%", label: "Architectural alignment" },
    color: "59, 130, 246", // blue
  },
  {
    id: 2,
    label: "Design",
    icon: Compass,
    title: "2. UI/UX & Design Systems",
    description:
      "Designing components with strict style guidelines, defining theme tokens (colors, spacings, shadows), and designing layout structures.",
    bullets: [
      "Wireframe state-driven views (loading, error, interactive paths).",
      "Enforce mobile-first responsive scaling across all screen sizes.",
      "Establish micro-interactions, custom transition delays, and keyframes.",
    ],
    metrics: { value: "60fps", label: "Animation performance target" },
    color: "168, 85, 247", // purple
  },
  {
    id: 3,
    label: "Develop",
    icon: Terminal,
    title: "3. Full-Stack Development",
    description:
      "Developing type-safe codebases utilizing Next.js, NestJS, and Prisma ORM. Focusing on components reusability and fast database schemas.",
    bullets: [
      "Strict TypeScript types mapping across client and API contracts.",
      "Create clean REST controller hooks, WebSocket channels, or MQTT listeners.",
      "Implement role-based middleware guards (JWT headers, encrypted cookies).",
    ],
    metrics: { value: "Clean", label: "Modular architecture patterns" },
    color: "6, 182, 212", // cyan
  },
  {
    id: 4,
    label: "Test",
    icon: ShieldCheck,
    title: "4. Quality & Performance Audit",
    description:
      "Validating that all features conform to security policies, and optimizing code loops for high responsiveness.",
    bullets: [
      "Write integration tests for core transactions (e.g. Leave requests in ELMS).",
      "Benchmark database query speeds and setup PostgreSQL index optimizations.",
      "Audit page speed indicators (LCP, CLS, TBT) to achieve Vercel quality scores.",
    ],
    metrics: { value: "90+", label: "Target Lighthouse metric score" },
    color: "16, 185, 129", // emerald
  },
  {
    id: 5,
    label: "Deploy",
    icon: Cpu,
    title: "5. Production Deployment",
    description:
      "Setting up CI/CD action triggers, packing static files, and monitoring production errors.",
    bullets: [
      "Deploy optimized production bundles to Vercel/Render hosting.",
      "Integrate Vercel Analytics and error tracking monitors.",
      "Setup automated git PR branch verification checks.",
    ],
    metrics: { value: "Zero", label: "Downtime updates goal" },
    color: "239, 68, 68", // red
  },
];

export default function HowIBuild() {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const activeStep = WORKFLOW_STEPS[activeStepIdx];
  const StepIcon = activeStep.icon;

  return (
    <section
      id="how-i-build"
      className="py-24 sm:py-36 relative overflow-hidden bg-secondary/15"
    >
      {/* Glow dot grid background */}
      <div className="absolute inset-0 dot-grid opacity-25 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-16 text-center"
        >
          <span className="section-label mx-auto">
            <Cpu className="h-3 w-3" />
            Workflow
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            How I Build <span className="gradient-text">Products</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            My development pipeline integrates design, engineering, validation,
            and operations into a fast development loop.
          </p>
        </motion.div>

        {/* Step Navigation Pill Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-10">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = idx === activeStepIdx;
            return (
              <button
                key={step.id}
                onClick={() => setActiveStepIdx(idx)}
                className={`flex items-center gap-2 px-5 py-3.5 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  isActive
                    ? "bg-accent border-transparent text-accent-foreground shadow-lg"
                    : "border-border bg-card/50 text-muted-foreground hover:bg-card hover:text-foreground"
                }`}
                style={{
                  boxShadow: isActive
                    ? "0 4px 20px rgba(var(--glow-accent), 0.3)"
                    : "none",
                }}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{step.label}</span>
              </button>
            );
          })}
        </div>

        {/* Workflow Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.28 }}
            className="grid gap-6 md:grid-cols-5 p-6 md:p-8 rounded-2xl border border-border bg-card shadow-lg relative overflow-hidden"
          >
            {/* Ambient background blob */}
            <div
              className="absolute -bottom-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-10 pointer-events-none transition-all duration-350"
              style={{ background: `rgb(${activeStep.color})` }}
            />

            {/* Left side: descriptions — 3/5 width */}
            <div className="md:col-span-3 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: `rgba(${activeStep.color}, 0.12)`,
                      border: `1px solid rgba(${activeStep.color}, 0.35)`,
                    }}
                  >
                    <StepIcon
                      className="h-5 w-5"
                      style={{ color: `rgb(${activeStep.color})` }}
                    />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">
                    {activeStep.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-medium">
                  {activeStep.description}
                </p>
              </div>

              {/* Checklist */}
              <div className="space-y-2">
                {activeStep.bullets.map((bullet, bIdx) => (
                  <div
                    key={bIdx}
                    className="flex gap-2.5 text-xs text-muted-foreground leading-relaxed font-semibold"
                  >
                    <div className="w-4 h-4 rounded-full border border-border bg-muted/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-2.5 w-2.5 text-accent" />
                    </div>
                    <span>{bullet}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side: Key metric / illustration — 2/5 width */}
            <div className="md:col-span-2 flex flex-col items-center justify-center p-6 rounded-xl border border-border/40 bg-muted/20 relative">
              <div className="text-center space-y-2 relative z-10">
                <span
                  className="block text-4xl sm:text-5xl font-extrabold tracking-tighter"
                  style={{ color: `rgb(${activeStep.color})` }}
                >
                  {activeStep.metrics.value}
                </span>
                <span className="block text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-snug">
                  {activeStep.metrics.label}
                </span>
              </div>

              {/* Minimalist process connector representation */}
              {activeStepIdx < WORKFLOW_STEPS.length - 1 && (
                <button
                  onClick={() => setActiveStepIdx((idx) => idx + 1)}
                  className="bottom-3 right-1 absolute md:bottom-4 md:right-4 flex items-center gap-1.5 text-[10px] font-bold text-accent uppercase tracking-wider hover:underline cursor-pointer"
                >
                  <span>Next Step</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
