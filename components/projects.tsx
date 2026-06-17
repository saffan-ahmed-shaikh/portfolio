"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ExternalLink,
  GitBranch,
  Lock,
  Sparkles,
  Star,
  X,
  Info,
  Layers,
  Settings,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Category = "All" | "Web" | "Enterprise";

interface ProjectHighlight {
  icon: string;
  label: string;
}

interface Project {
  id: number;
  title: string;
  shortTitle: string;
  description: string;
  technologies: string[];
  category: Category;
  featured?: boolean;
  badge: string;
  badgeColors: { from: string; to: string };
  highlights?: ProjectHighlight[];
  features?: string[];
  links: { live?: string; github?: string };
  isPrivate?: boolean;
  accentRgb: string;
  number: string;
}

interface CaseStudyDetails {
  problem: string;
  solution: string;
  architecture: string[];
  challenges: { title: string; desc: string }[];
  results: { value: string; label: string }[];
}

const CASE_STUDIES: Record<number, CaseStudyDetails> = {
  1: {
    problem:
      "Real-time collaborative editing is notoriously hard — concurrent edits from multiple users create conflicts, data loss, and a broken user experience without careful conflict resolution at the data layer.",
    solution:
      "CollabDocs uses Yjs CRDT (Conflict-free Replicated Data Type) synced over Socket.io, ensuring all edits are automatically merged without conflicts. Combined with JWT RBAC and TypeORM-backed PostgreSQL, it delivers a production-grade collaborative editing experience.",
    architecture: [
      "Next.js frontend: Real-time cursor presence, live document rendering, role-aware UI.",
      "Node.js + Socket.io: WebSocket server handling Yjs document sync with sub-second broadcast.",
      "PostgreSQL + TypeORM: Document persistence with schema migrations and viewer/editor/owner model.",
      "Vercel + EC2 + Nginx: Frontend on Vercel, backend on EC2 with reverse proxy and SSL via Let's Encrypt.",
    ],
    challenges: [
      {
        title: "Conflict-free concurrent editing",
        desc: "Multiple users editing the same document simultaneously created merge conflicts. Solved by adopting Yjs CRDT which mathematically guarantees conflict-free convergence regardless of edit order.",
      },
      {
        title: "WebSocket state sync on reconnect",
        desc: "Users rejoining after a disconnect received stale document state. Resolved by persisting Yjs document updates to PostgreSQL and replaying the update log on reconnect.",
      },
    ],
    results: [
      { value: "<1s", label: "Sync Latency" },
      { value: "3", label: "Permission Tiers" },
      { value: "0", label: "Merge Conflicts" },
    ],
  },
  2: {
    problem:
      "Real-time messaging apps suffer from high latency and dropped connections under concurrent load, degrading user experience especially under mobile network switches.",
    solution:
      "Tunnel uses Socket.io with optimised event handling and a Node.js/Express backend with MongoDB — delivering consistent low-latency messaging for 50–200 concurrent live users.",
    architecture: [
      "Socket.io Server: Bi-directional WebSocket events for instant message delivery and group rooms.",
      "Node.js + Express REST API: Handles user auth, room management, and message persistence.",
      "MongoDB: Flexible document model for chat history with optimised query indexing.",
    ],
    challenges: [
      {
        title: "Message latency under concurrent load",
        desc: "Under peak usage, message delivery slowed due to unoptimised Socket.io event handlers. Resolved by batching events and optimising MongoDB query indexes, reducing latency by 20%.",
      },
    ],
    results: [
      { value: "50–200", label: "Live Users" },
      { value: "20%", label: "Latency Reduction" },
      { value: "30%", label: "Faster Data Retrieval" },
    ],
  },
  3: {
    problem:
      "Most task management tools are either too complex for personal use or too simple for team collaboration, with no middle ground for lightweight project tracking.",
    solution:
      "Taskblitz uses Appwrite as a backend-as-a-service to handle auth, database, and storage — letting the Next.js frontend focus entirely on UX and real-time updates.",
    architecture: [
      "Next.js App Router: Dynamic workspace routing and server components.",
      "Appwrite: Auth, Realtime DB subscriptions, file storage.",
      "Chakra UI: Accessible, themeable component system.",
    ],
    challenges: [
      {
        title: "Real-time state consistency across tabs",
        desc: "Task updates in one browser tab weren't reflecting in others. Resolved by subscribing to Appwrite Realtime channels and updating local state on broadcast events.",
      },
    ],
    results: [
      { value: "Real-time", label: "Task Updates" },
      { value: "Appwrite", label: "Backend Platform" },
      { value: "0", label: "Custom Backend Code" },
    ],
  },
};

const projects: Project[] = [
  {
    id: 1,
    title: "CollabDocs – Real-Time Collaborative Editor",
    shortTitle: "CollabDocs",
    description:
      "A production-grade real-time collaborative document editor with live multi-user editing, cursor presence, and role-based access control. Built with Yjs CRDT for conflict-free sync at sub-second latency.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Socket.io",
      "Yjs",
      "TailwindCSS",
    ],
    category: "Enterprise",
    featured: true,
    badge: "Full Stack",
    badgeColors: { from: "#8b5cf6", to: "#6d28d9" },
    highlights: [
      { icon: "📝", label: "Live Editing" },
      { icon: "👥", label: "Multi-user" },
      { icon: "🔐", label: "RBAC Auth" },
      { icon: "⚡", label: "Sub-second Sync" },
      { icon: "🔄", label: "CRDT Conflict-free" },
      { icon: "☁️", label: "EC2 + Vercel" },
    ],
    features: [
      "Live multi-user editing with cursor presence",
      "Yjs CRDT sync over Socket.io",
      "JWT auth with refresh tokens",
      "Viewer / Editor / Owner permission model",
      "TypeORM migrations with PostgreSQL",
      "Nginx reverse proxy + SSL (Let's Encrypt)",
      "Deployed on Vercel + AWS EC2",
    ],
    links: {
      live: "https://collabdocs-client.vercel.app/dashboard",
    },
    accentRgb: "139, 92, 246",
    number: "01",
  },
  {
    id: 2,
    title: "Tunnel – Real-Time Chat Application",
    shortTitle: "Tunnel",
    description:
      "A production real-time chat application with 50–200 live users. Supports instant messaging and group conversations with WebSocket-based communication. Optimised queries improved data retrieval by 30% under concurrent load.",
    technologies: ["Next.js", "Node.js", "Socket.io", "MongoDB", "Chakra UI"],
    category: "Web",
    featured: false,
    badge: "Real-Time",
    badgeColors: { from: "#06b6d4", to: "#0284c7" },
    highlights: [],
    features: [
      "WebSocket instant messaging via Socket.io",
      "Group conversations support",
      "50–200 live users in production",
      "RESTful API with Node.js + Express",
      "MongoDB with optimised queries",
      "20% latency reduction via event optimisation",
    ],
    links: {
      live: "https://tunnel.safwan-ahmed-shaikh.vercel.app/",
    },
    accentRgb: "6, 182, 212",
    number: "02",
  },
  {
    id: 3,
    title: "Taskblitz – Task Management App",
    shortTitle: "Taskblitz",
    description:
      "A modern task and project management application built with Next.js and Appwrite. Features real-time updates, workspace collaboration, and a clean Chakra UI design system.",
    technologies: ["Next.js", "Appwrite", "Chakra UI", "TypeScript"],
    category: "Web",
    featured: false,
    badge: "Productivity",
    badgeColors: { from: "#10b981", to: "#0d9488" },
    highlights: [],
    features: [
      "Real-time task updates",
      "Workspace-based collaboration",
      "Appwrite backend (auth, DB, storage)",
      "Chakra UI component system",
      "TypeScript throughout",
    ],
    links: {
      live: "",
    },
    accentRgb: "16, 185, 129",
    number: "03",
  },
];

const categories: Category[] = ["All", "Web", "Enterprise"];

const techColors: Record<string, { bg: string; text: string }> = {
  "Next.js": { bg: "rgba(0,0,0,0.08)", text: "#374151" },
  React: { bg: "rgba(6,182,212,0.1)", text: "#0891b2" },
  TypeScript: { bg: "rgba(59,130,246,0.1)", text: "#1d4ed8" },
  "Tailwind CSS": { bg: "rgba(20,184,166,0.1)", text: "#0d9488" },
  "Node.js": { bg: "rgba(34,197,94,0.1)", text: "#15803d" },
  "Socket.io": { bg: "rgba(107,114,128,0.1)", text: "#4b5563" },
  "Prisma ORM": { bg: "rgba(99,102,241,0.1)", text: "#4338ca" },
  PostgreSQL: { bg: "rgba(37,99,235,0.1)", text: "#1e40af" },
  NestJS: { bg: "rgba(239,68,68,0.1)", text: "#dc2626" },
  ElevenLabs: { bg: "rgba(168,85,247,0.1)", text: "#7c3aed" },
  LiveKit: { bg: "rgba(249,115,22,0.1)", text: "#c2410c" },
  WebRTC: { bg: "rgba(16,185,129,0.1)", text: "#059669" },
  "React Native": { bg: "rgba(59,130,246,0.1)", text: "#1d4ed8" },
  Expo: { bg: "rgba(0,0,0,0.08)", text: "#374151" },
  MQTT: { bg: "rgba(245,158,11,0.1)", text: "#b45309" },
  "Web Audio API": { bg: "rgba(236,72,153,0.1)", text: "#be185d" },
  "AI Voice": { bg: "rgba(168,85,247,0.1)", text: "#7c3aed" },
  "Live Tracking": { bg: "rgba(34,197,94,0.1)", text: "#15803d" },
  "REST API": { bg: "rgba(107,114,128,0.1)", text: "#4b5563" },
  "Performance Optimization": { bg: "rgba(16,185,129,0.1)", text: "#059669" },
  "Chakra UI": { bg: "rgba(6,182,212,0.1)", text: "#0891b2" },
};

function getTechStyle(tech: string) {
  return techColors[tech] ?? { bg: "rgba(99,102,241,0.1)", text: "#4338ca" };
}

/* ── Individual Project Card ── */
interface ProjectCardProps {
  project: Project;
  index: number;
  isFeatured?: boolean;
  onOpenCaseStudy: (project: Project) => void;
}

function ProjectCard({
  project,
  index,
  isFeatured,
  onOpenCaseStudy,
}: ProjectCardProps) {
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -10, y: (x - 0.5) * 10 });
    setSpotlight({ x: x * 100, y: y * 100, opacity: 1 });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovered(true), []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
    setSpotlight((p) => ({ ...p, opacity: 0 }));
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.55,
        delay: index * (isMobile ? 0.05 : 0.08),
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: isMobile ? 0.1 : undefined, margin: isMobile ? undefined : "-80px" }}
      whileTap={{ scale: 0.95 }}
      className={isFeatured ? "md:col-span-2" : ""}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.015 : 1})`,
          transition: isHovered
            ? "transform 0.12s ease"
            : "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
          transformStyle: "preserve-3d",
        }}
        className="relative h-full rounded-2xl border border-border/50 bg-card overflow-hidden cursor-default group"
      >
        {/* Spotlight glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl transition-opacity duration-300 z-10"
          style={{
            opacity: spotlight.opacity,
            background: `radial-gradient(400px circle at ${spotlight.x}% ${spotlight.y}%, rgba(${project.accentRgb}, 0.10), transparent 65%)`,
          }}
        />

        {/* Animated border glow on hover */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-400 z-0"
          style={{
            opacity: isHovered ? 1 : 0,
            boxShadow: `0 0 0 1px rgba(${project.accentRgb}, 0.45), 0 8px 40px rgba(${project.accentRgb}, 0.15)`,
          }}
        />

        {/* Ambient gradient background */}
        <div
          className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-opacity duration-500"
          style={{
            opacity: isHovered ? 0.12 : 0.05,
            background: `radial-gradient(circle, rgba(${project.accentRgb}, 1), transparent)`,
          }}
        />

        <div className="relative z-20 flex flex-col h-full p-6 md:p-7">
          {/* Header row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-mono font-bold opacity-40 tracking-widest"
                style={{ color: `rgb(${project.accentRgb})` }}
              >
                {project.number}
              </span>
              {/* Badge */}
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold text-white"
                style={{
                  background: `linear-gradient(135deg, ${project.badgeColors.from}, ${project.badgeColors.to})`,
                  boxShadow: `0 2px 10px rgba(${project.accentRgb}, 0.35)`,
                }}
              >
                {project.featured && <Sparkles className="h-2.5 w-2.5" />}
                {project.badge}
              </span>
            </div>

            {/* Action buttons (top right) */}
            <div className="flex items-center gap-2">
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-8 h-8 rounded-full border border-border/60 bg-background/70 text-muted-foreground hover:text-foreground hover:border-border active:scale-90 transition-all cursor-pointer"
                  title="GitHub"
                >
                  <GitBranch className="h-3.5 w-3.5" />
                </a>
              )}
              {project.isPrivate ? (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border border-border/40 text-muted-foreground bg-background/50">
                  <Lock className="h-3 w-3" />
                  Private
                </span>
              ) : project.links.live ? (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-white transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg cursor-pointer"
                  style={{
                    background: `linear-gradient(135deg, ${project.badgeColors.from}, ${project.badgeColors.to})`,
                    boxShadow: isHovered
                      ? `0 4px 20px rgba(${project.accentRgb}, 0.4)`
                      : "none",
                  }}
                >
                  <ExternalLink className="h-3 w-3" />
                  Live Demo
                </a>
              ) : null}
            </div>
          </div>

          {/* Title */}
          <h3
            className="text-lg font-bold text-foreground mb-3 leading-snug group-hover:transition-colors duration-200"
            style={{
              color: isHovered ? `rgb(${project.accentRgb})` : undefined,
            }}
          >
            {project.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
            {project.description}
          </p>

          {/* ELMS Feature highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="mb-5 grid grid-cols-3 gap-2">
              {project.highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-xl border border-border/40 bg-background/50 text-center transition-colors duration-200"
                  style={{
                    borderColor: isHovered
                      ? `rgba(${project.accentRgb}, 0.25)`
                      : undefined,
                    background: isHovered
                      ? `rgba(${project.accentRgb}, 0.04)`
                      : undefined,
                  }}
                >
                  <span className="text-base leading-none">{h.icon}</span>
                  <span className="text-[10px] font-medium text-muted-foreground leading-tight">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Features list (featured card only) */}
          {isFeatured && project.features && (
            <div className="mb-5">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2.5">
                Key Features
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {project.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-xs text-muted-foreground"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: `rgb(${project.accentRgb})` }}
                    />
                    {f}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom actions row with Case study option */}
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30 gap-4">
            {/* Tech stack badges */}
            <div className="flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech) => {
                const style = getTechStyle(tech);
                return (
                  <span
                    key={tech}
                    className="tech-badge inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold tracking-wide cursor-default"
                    style={{ background: style.bg, color: style.text }}
                  >
                    {tech}
                  </span>
                );
              })}
              {project.technologies.length > 3 && (
                <span className="text-[9px] text-muted-foreground font-mono mt-0.5">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>

            <motion.button
              onClick={() => onOpenCaseStudy(project)}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-border text-xs font-bold text-foreground hover:bg-muted transition-colors cursor-pointer shrink-0"
            >
              <Info className="h-3 w-3" />
              Case Study
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Section ── */
export default function Projects() {
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [activeTab, setActiveTab] = useState<
    "overview" | "architecture" | "challenges"
  >("overview");

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const study = activeCaseStudy ? CASE_STUDIES[activeCaseStudy.id] : null;

  return (
    <section
      id="projects"
      className="py-24 sm:py-36 relative overflow-hidden bg-secondary/20"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none bg-violet-500" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full blur-3xl opacity-5 pointer-events-none bg-cyan-500" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.1 : undefined, margin: isMobile ? undefined : "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 mb-10"
        >
          <span className="section-label">
            <Star className="h-3 w-3" />
            Portfolio
          </span>

          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed font-medium">
            A curated selection showcasing expertise in enterprise systems,
            real-time applications, AI integrations, and mobile development.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: isMobile ? 0.1 : undefined, margin: isMobile ? undefined : "-80px" }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap gap-2 mb-10"
        >
          {categories.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              whileTap={{ scale: 0.95 }}
              className="relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-250 cursor-pointer"
              style={{
                background:
                  activeCategory === cat ? "var(--accent)" : "transparent",
                color:
                  activeCategory === cat
                    ? "var(--accent-foreground)"
                    : "var(--muted-foreground)",
                border: `1px solid ${activeCategory === cat ? "transparent" : "var(--border)"}`,
                boxShadow:
                  activeCategory === cat
                    ? "0 4px 20px rgba(var(--glow-accent), 0.3)"
                    : "none",
              }}
            >
              {cat}
              {cat !== "All" && (
                <span className="ml-1.5 text-xs opacity-60">
                  ({projects.filter((p) => p.category === cat).length})
                </span>
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid gap-5 md:grid-cols-2"
          >
            {filtered.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                isFeatured={project.featured && activeCategory === "All"}
                onOpenCaseStudy={(p) => {
                  setActiveCaseStudy(p);
                  setActiveTab("overview");
                }}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Empty state */}
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 text-muted-foreground"
          >
            <p className="text-lg font-medium">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      {/* Case Study Sliding Drawer Modal */}
      <AnimatePresence>
        {activeCaseStudy && study && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveCaseStudy(null)}
              className="fixed inset-0 bg-black z-50 pointer-events-auto"
            />

            {/* Sidebar drawer panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 240 }}
              className="fixed top-0 right-0 h-full w-screen sm:w-120 md:w-140 bg-card border-l border-border shadow-2xl z-50 flex flex-col pointer-events-auto overflow-hidden text-foreground"
            >
              {/* Sticky Top Bar */}
              <div className="p-5 border-b border-border bg-muted/20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full text-white uppercase tracking-widest"
                    style={{
                      background: `linear-gradient(135deg, ${activeCaseStudy.badgeColors.from}, ${activeCaseStudy.badgeColors.to})`,
                    }}
                  >
                    {activeCaseStudy.badge}
                  </span>
                  <h3 className="text-sm font-bold text-foreground truncate max-w-60">
                    {activeCaseStudy.shortTitle} Case Study
                  </h3>
                </div>
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => setActiveCaseStudy(null)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </motion.div>
              </div>

              {/* Drawer Content Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* Showcase banner */}
                <div
                  className="p-6 rounded-2xl border text-white relative overflow-hidden flex flex-col justify-end min-h-35"
                  style={{
                    background: `linear-gradient(135deg, rgba(${activeCaseStudy.accentRgb}, 0.25), rgba(${activeCaseStudy.accentRgb}, 0.05))`,
                    borderColor: `rgba(${activeCaseStudy.accentRgb}, 0.3)`,
                  }}
                >
                  <h4 className="text-xl font-bold tracking-tight mb-2 text-foreground">
                    {activeCaseStudy.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed max-w-sm">
                    An in-depth breakdown of architecture systems and core
                    technical solutions.
                  </p>
                </div>

                {/* Tab buttons switcher */}
                <div className="flex border-b border-border text-xs font-bold uppercase tracking-wider">
                  {([
                    { id: "overview", label: "Overview", icon: Info },
                    { id: "architecture", label: "Architecture", icon: Layers },
                    { id: "challenges", label: "Challenges", icon: Settings },
                  ] as const).map((tab) => {
                    const TabIcon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        whileTap={{ scale: 0.95 }}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-3 border-b-2 font-bold cursor-pointer transition-colors ${
                          isActive
                            ? "border-accent text-accent"
                            : "border-transparent text-muted-foreground hover:text-foreground"
                        }`}
                      >
                          <TabIcon className="h-3.5 w-3.5" />
                          <span>{tab.label}</span>
                        </motion.button>
                    );
                  })}
                </div>

                {/* Active Tab Screen */}
                <div className="space-y-6 min-h-55">
                  {activeTab === "overview" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-5"
                    >
                      {/* Problem */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest flex items-center gap-1.5">
                          <AlertCircle className="h-3.5 w-3.5" />
                          The Problem
                        </span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                          {study.problem}
                        </p>
                      </div>

                      {/* Solution */}
                      <div className="space-y-2 border-t border-border/40 pt-4">
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          The Solution
                        </span>
                        <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                          {study.solution}
                        </p>
                      </div>

                      {/* Outcomes counters grid */}
                      <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-border/40">
                        {study.results.map((res) => (
                          <div
                            key={res.label}
                            className="p-3.5 rounded-xl border border-border/50 bg-muted/20 text-center space-y-1"
                          >
                            <span className="block text-lg font-bold text-accent font-mono leading-none">
                              {res.value}
                            </span>
                            <span className="block text-[8px] font-bold uppercase text-muted-foreground leading-tight">
                              {res.label}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "architecture" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        System & Stack Components
                      </h4>

                      {/* System flows */}
                      <div className="space-y-2.5">
                        {study.architecture.map((arch, idx) => (
                          <div
                            key={idx}
                            className="p-3.5 rounded-xl border border-border/50 bg-card flex gap-3 text-xs leading-relaxed"
                          >
                            <span className="w-5 h-5 rounded-full bg-accent/10 border border-accent/25 text-accent flex items-center justify-center font-mono font-bold shrink-0 text-[10px]">
                              {idx + 1}
                            </span>
                            <span className="font-semibold text-muted-foreground">
                              {arch}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Visual System flow mockup box */}
                      <div className="p-4 rounded-xl border border-dashed border-border/60 bg-muted/10 flex flex-col items-center gap-2">
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                          Data Pipeline Model
                        </span>
                        <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                          <span className="px-2 py-1 rounded bg-slate-900 border border-white/5">
                            Frontend (Next.js)
                          </span>
                          <span className="text-accent animate-pulse">➔</span>
                          <span className="px-2 py-1 rounded bg-slate-900 border border-white/5">
                            REST Gateway (NestJS)
                          </span>
                          <span className="text-accent animate-pulse">➔</span>
                          <span className="px-2 py-1 rounded bg-slate-900 border border-white/5">
                            Database (PostgreSQL)
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "challenges" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4"
                    >
                      <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        Engineering Solutions
                      </h4>

                      <div className="space-y-3.5">
                        {study.challenges.map((chal, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl border border-border/50 bg-card space-y-2"
                          >
                            <h5 className="text-xs font-bold text-foreground flex items-center gap-2">
                              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                              {chal.title}
                            </h5>
                            <p className="text-[11px] text-muted-foreground leading-relaxed font-semibold">
                              {chal.desc}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Drawer footer link */}
              {activeCaseStudy.links.live && (
                <div className="p-5 border-t border-border bg-muted/20">
                  <motion.a
                    href={activeCaseStudy.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileTap={{ scale: 0.95 }}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity cursor-pointer shadow-md"
                    style={{
                      background: `linear-gradient(135deg, ${activeCaseStudy.badgeColors.from}, ${activeCaseStudy.badgeColors.to})`,
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    Launch Interactive App Demo
                  </motion.a>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
