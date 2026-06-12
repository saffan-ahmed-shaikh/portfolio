"use client";

import { motion } from "framer-motion";
import { Code2, Layers, Zap, Cpu, Wrench, Sparkles } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    color: "59, 130, 246",
    skills: [
      "TypeScript",
      "JavaScript (ES6+)",
      "Python",
      "SQL",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Frontend",
    icon: Layers,
    color: "6, 182, 212",
    skills: [
      "React.js",
      "Next.js",
      "Redux",
      "Zustand",
      "Tailwind CSS",
      "Chakra UI",
      "Framer Motion",
      "React Testing Library",
      "Jest",
    ],
  },
  {
    title: "Backend",
    icon: Zap,
    color: "168, 85, 247",
    skills: [
      "Node.js",
      "Express.js",
      "Flask",
      "REST APIs",
      "Socket.io",
      "JWT",
      "Passport.js",
      "Redis",
      "Microservices",
    ],
  },
  {
    title: "Databases",
    icon: Cpu,
    color: "245, 158, 11",
    skills: ["MySQL", "PostgreSQL", "MongoDB", "OracleDB", "TypeORM", "Prisma"],
  },
  {
    title: "Cloud & DevOps",
    icon: Wrench,
    color: "16, 185, 129",
    skills: [
      "AWS EC2",
      "AWS S3",
      "AWS Lambda",
      "AWS RDS",
      "Docker",
      "Nginx",
      "CI/CD",
      "Linux",
      "Git",
      "Vercel",
    ],
  },
  {
    title: "Tools & Practices",
    icon: Sparkles,
    color: "239, 68, 68",
    skills: [
      "ServiceNow",
      "Storybook",
      "Datadog",
      "Lighthouse",
      "Jira",
      "GitHub",
      "GitLab",
      "Agile / Scrum",
      "Postman",
    ],
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.09 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-36 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/4 w-72 h-72 rounded-full blur-3xl opacity-6 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(168,85,247,0.15), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full blur-3xl opacity-6 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12), transparent)",
            animationDelay: "1s",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <span className="section-label">
              <Cpu className="h-3 w-3" />
              Expertise
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Skills & <span className="gradient-text">Expertise</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
                A full-stack toolkit built over 4+ years across fintech,
                enterprise automation, and real-time systems — from React
                frontends to ML-powered Python pipelines on AWS.
              </p>
            </p>
          </motion.div>

          {/* Grid */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-80px" }}
            className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {skillCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <motion.div key={cat.title} variants={item}>
                  <div className="group relative h-full rounded-2xl border border-border/50 bg-card p-6 overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-xl">
                    {/* Card hover glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                      style={{
                        boxShadow: `0 0 0 1px rgba(${cat.color}, 0.4), 0 8px 32px rgba(${cat.color}, 0.12)`,
                      }}
                    />

                    {/* Ambient blob */}
                    <div
                      className="absolute -top-4 -right-4 w-24 h-24 rounded-full blur-2xl opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `rgb(${cat.color})` }}
                    />

                    {/* Icon + Title */}
                    <div className="flex items-center gap-3 mb-5">
                      <div
                        className="flex items-center justify-center w-10 h-10 rounded-xl shrink-0 transition-all duration-300 group-hover:scale-110"
                        style={{
                          background: `rgba(${cat.color}, 0.12)`,
                          boxShadow: `0 4px 12px rgba(${cat.color}, 0.2)`,
                        }}
                      >
                        <Icon
                          className="h-5 w-5"
                          style={{ color: `rgb(${cat.color})` }}
                        />
                      </div>
                      <h3 className="font-semibold text-foreground text-base">
                        {cat.title}
                      </h3>
                    </div>

                    {/* Skill tags */}
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill) => (
                        <span
                          key={skill}
                          className="tech-badge inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-border/50 text-muted-foreground bg-background/50 transition-all duration-200 hover:text-foreground cursor-default"
                          style={
                            {
                              /* subtle color accent on border hover */
                            }
                          }
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0"
                            style={{ background: `rgb(${cat.color})` }}
                          />
                          {skill}
                        </span>
                      ))}
                    </div>
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
