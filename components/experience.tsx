"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Award,
  GraduationCap,
  MapPin,
  Calendar,
  Rocket,
  Cpu,
  BookmarkCheck,
} from "lucide-react";

interface Milestone {
  id: number;
  icon: any;
  title: string;
  subtitle: string;
  location?: string;
  period: string;
  description: string;
  type: "work" | "award" | "education" | "launch";
  technologies?: string[];
  highlights: string[];
  accentRgb: string;
}

const milestones: Milestone[] = [
  {
    id: 1,
    icon: Briefcase,
    title: "Full Stack Developer (Associate Analyst)",
    subtitle: "Deloitte",
    location: "Mumbai, Maharashtra",
    period: "Aug 2024 – Present",
    description:
      "Building enterprise-grade frontend + backend systems with a strong focus on automation, performance, and compliance-ready delivery.",
    type: "work",
    technologies: [
      "React.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "Python (Flask)",
      "MySQL",
    ],
    highlights: [
      "Built a Learning & Development portal end-to-end: MySQL schema, TypeScript REST APIs, React frontend—centralized course listings & automated compliance tracking; eliminated manual tracking spreadsheets.",
      "Implemented authentication middleware, RBAC, and structured error handling to ensure data integrity and audit readiness.",
      "Optimized complex MySQL queries/indexing on high-traffic apps—reduced page load times by 15% under peak load.",
      "Automated shift handover reporting via Python/Flask + ServiceNow—replaced 3 reports/day; saved 1,054+ hours annually and reduced reporting errors by 30%.",
      "Architected an ML-powered ServiceNow Change Request validation system—auto-validates descriptions/justifications/backout plans/attachments; eliminated manual review.",
    ],
    accentRgb: "139, 92, 246",
  },
  {
    id: 2,
    icon: Rocket,
    title: "Software Engineer",
    subtitle: "ILM UX",
    location: "Navi Mumbai, Maharashtra",
    period: "Jan 2022 – Aug 2024",
    description:
      "Owned frontend architecture for a wealth management & stock trading platform serving 50k–100k daily users, delivering measurable Lighthouse performance improvements.",
    type: "work",
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "AWS",
      "Datadog",
      "Lighthouse",
    ],
    highlights: [
      "Built performant React/Next.js UIs using custom hooks, code-splitting, lazy loading, and SOLID architecture—reduced page load times by 30% (Lighthouse + Datadog).",
      "Designed a BFF layer in Node.js to protect sensitive portfolio/trade data—reduced security vulnerabilities by 30%.",
      "Implemented Passport.js + JWT auth/authorization—achieved 100% compliance with internal security audits.",
      "Shipped a privately published Chakra UI + Storybook component library (10–15 components) as an NPM package—cut new feature dev time by 25%.",
      "Introduced unit testing frameworks—raised coverage by 35%, reducing manual QA bugs by 40% and post-release defects by 20%.",
    ],
    accentRgb: "99, 102, 241",
  },
  {
    id: 3,
    icon: Award,
    title: "Deloitte Applause Award",
    subtitle: "2024 & 2025",
    period: "2024 – 2025",
    description:
      "Recognized for enterprise automation outcomes, including saving 1,054+ hours annually through ML-powered pipelines.",
    type: "award",
    highlights: [
      "Applause Award received twice for impact on automation and delivery efficiency.",
    ],
    accentRgb: "245, 158, 11",
  },
  {
    id: 4,
    icon: BookmarkCheck,
    title: "AWS Certifications",
    subtitle: "Developer + AI Practitioner",
    period: "2024",
    description:
      "Cloud fundamentals with application delivery and AI-focused engineering knowledge.",
    type: "award",
    technologies: ["AWS DVA (DVA-C02)", "AWS AI Practitioner (AIF-C01)"],
    highlights: [
      "AWS Certified Developer – Associate (DVA-C02).",
      "AWS Certified AI Practitioner (AIF-C01).",
    ],
    accentRgb: "6, 182, 212",
  },
  {
    id: 5,
    icon: GraduationCap,
    title: "B.Sc. Computer Science",
    subtitle: "Mumbai University (CGPA: 7.93)",
    location: "Mumbai, Maharashtra",
    period: "Jun 2021 – May 2024",
    description:
      "Computer science foundation with strong emphasis on building reliable software systems.",
    type: "education",
    highlights: ["CGPA: 7.93.", "B.Sc. Computer Science."],
    accentRgb: "16, 185, 129",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="py-24 sm:py-36 relative overflow-hidden bg-background"
    >
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 bg-indigo-500" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 bg-emerald-500" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-5 mb-20 text-center"
        >
          <span className="section-label mx-auto">
            <Cpu className="h-3 w-3" />
            Timeline
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Interactive Journey <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A linear progression of professional experience, enterprise
            launches, and key achievements.
          </p>
        </motion.div>

        {/* Timeline Path */}
        <div className="relative">
          {/* Vertical line indicator */}
          <div className="absolute left-4.5 sm:left-1/2 top-2 bottom-2 w-[2px] -translate-x-1/2 overflow-hidden bg-border/40">
            <motion.div
              initial={{ scaleY: 0, originY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-emerald-500 origin-top"
            />
          </div>

          <div className="space-y-12">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={item.id}
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Spacer for Left/Right balancing */}
                  <div className="hidden sm:block w-1/2 px-8" />

                  {/* Timeline Node Connector Dot */}
                  <div className="absolute left-4.5 sm:left-1/2 -translate-x-1/2 flex items-center justify-center z-20">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-80px" }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="w-9 h-9 rounded-full bg-slate-950 border-2 flex items-center justify-center shadow-lg"
                      style={{
                        borderColor: `rgb(${item.accentRgb})`,
                        boxShadow: `0 0 12px rgba(${item.accentRgb})`,
                      }}
                    >
                      <Icon
                        className="h-4 w-4"
                        style={{ color: `rgb(${item.accentRgb})` }}
                      />
                    </motion.div>
                  </div>

                  {/* Timeline Card Content */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 35 : -35, y: 15 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8"
                  >
                    <div className="group relative p-6 rounded-2xl border border-border bg-card shadow-md transition-all duration-300 hover:border-transparent hover:shadow-xl overflow-hidden">
                      {/* Hover border glow */}
                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: `0 0 0 1px rgba(${item.accentRgb}, 0.35), 0 8px 30px rgba(${item.accentRgb}, 0.1)`,
                        }}
                      />

                      {/* Header Row */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <h3 className="font-bold text-foreground text-base leading-snug">
                            {item.title}
                          </h3>
                          <span
                            className="text-xs font-semibold block mt-0.5"
                            style={{ color: `rgb(${item.accentRgb})` }}
                          >
                            {item.subtitle}
                          </span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-1 rounded-md border border-border bg-muted/50 text-muted-foreground flex items-center gap-1 font-mono">
                          <Calendar className="h-3 w-3 shrink-0" />
                          {item.period}
                        </span>
                      </div>

                      {/* Location if present */}
                      {item.location && (
                        <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-semibold mb-3">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {item.location}
                        </div>
                      )}

                      <p className="text-xs text-muted-foreground leading-relaxed mb-4 font-medium">
                        {item.description}
                      </p>

                      {/* Bullet Highlights */}
                      <ul className="space-y-1.5 mb-4">
                        {item.highlights.map((h, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex gap-2 text-xs text-muted-foreground leading-relaxed font-medium"
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                              style={{
                                backgroundColor: `rgb(${item.accentRgb})`,
                              }}
                            />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Badges if present */}
                      {item.technologies && (
                        <div className="flex flex-wrap gap-1 border-t border-border/40 pt-3.5 mt-auto">
                          {item.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="px-2 py-0.5 rounded-md border border-border/60 bg-muted/40 font-mono text-[9px] text-muted-foreground"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
