"use client";

import { useState, SVGProps } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Sparkles, Code2, Database, Cloud } from "lucide-react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiSocketdotio,
  SiDocker,
  SiFlask,
  SiRedux,
  SiRedis,
  SiExpress,
  SiTypeorm,
  SiNginx,
  SiGit,
} from "react-icons/si";
import { IconType } from "react-icons";
import { LucideIcon } from "lucide-react";

interface AwsIconProps extends SVGProps<SVGSVGElement> {
  color?: string;
}

const AwsIcon = ({ color = "#FF9900", ...props }: AwsIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={25}
    viewBox="0 -30 150 150"
    fill="none"
    {...props}
  >
    {/* Orange swoosh */}
    <path
      d="M122.714 62.703c5.28-.643 16.924-2.027 18.997.643 2.072 2.621-2.319 13.649-4.293 18.544-.592 1.484.691 2.077 2.023.94 8.684-7.319 10.954-22.6 9.178-24.825-1.777-2.175-17.023-4.055-26.3 2.473-1.431 1.038-1.184 2.423.395 2.225z"
      fill="#F90"
    />
    <path
      d="M74.852 89.456c20.28 0 43.865-6.38 60.099-18.396 2.664-1.978.345-4.994-2.369-3.758-18.207 7.714-37.993 11.473-56.003 11.473-26.694 0-52.5-7.368-73.42-19.533-1.827-1.088-3.208.791-1.679 2.176 19.343 17.505 44.951 28.038 73.372 28.038z"
      fill="#F90"
    />
    {/* AWS text/logo */}
    <path
      d="M42.632 32.835c0 1.83.197 3.313.542 4.401a26.505 26.505 0 001.58 3.56c.246.396.345.792.345 1.138 0 .495-.296.99-.938 1.484l-3.108 2.077c-.444.296-.889.445-1.283.445-.494 0-.987-.248-1.48-.693a15.29 15.29 0 01-1.777-2.324 38.28 38.28 0 01-1.53-2.918c-3.848 4.55-8.684 6.825-14.506 6.825-4.145 0-7.45-1.187-9.868-3.56-2.418-2.374-3.652-5.54-3.652-9.495 0-4.204 1.48-7.616 4.49-10.187 3.01-2.572 7.007-3.857 12.09-3.857 1.677 0 3.404.148 5.23.395 1.825.248 3.7.643 5.674 1.088v-3.61c0-3.758-.79-6.379-2.32-7.912-1.578-1.533-4.243-2.274-8.042-2.274-1.727 0-3.503.197-5.329.642a39.247 39.247 0 00-5.329 1.682 14.14 14.14 0 01-1.727.643c-.345.098-.592.148-.79.148-.69 0-1.036-.494-1.036-1.533V6.577c0-.791.1-1.385.346-1.73.246-.347.69-.693 1.381-1.04 1.727-.89 3.8-1.631 6.217-2.225C20.23.94 22.797.642 25.51.642c5.872 0 10.164 1.336 12.927 4.006 2.714 2.67 4.096 6.726 4.096 12.165v16.022h.099zm-20.033 7.517c1.628 0 3.306-.297 5.082-.89 1.776-.594 3.355-1.682 4.687-3.165.79-.94 1.382-1.978 1.678-3.165.296-1.187.493-2.621.493-4.302v-2.077a41.135 41.135 0 00-4.539-.84 37.099 37.099 0 00-4.638-.298c-3.306 0-5.724.643-7.352 1.978-1.628 1.336-2.418 3.215-2.418 5.687 0 2.324.592 4.055 1.826 5.242 1.184 1.236 2.911 1.83 5.18 1.83zm39.621 5.34c-.888 0-1.48-.148-1.875-.494-.394-.297-.74-.99-1.036-1.929L47.714 5.044c-.296-.99-.444-1.632-.444-1.978 0-.791.394-1.236 1.184-1.236h4.835c.938 0 1.58.148 1.925.494.395.297.69.99.987 1.929l8.29 32.736 7.697-32.736c.246-.99.542-1.632.937-1.929.395-.297 1.085-.494 1.974-.494h3.947c.938 0 1.579.148 1.974.494.395.297.74.99.937 1.929l7.796 33.132L98.29 4.253c.295-.99.64-1.632.986-1.929.395-.297 1.036-.494 1.925-.494h4.588c.79 0 1.234.395 1.234 1.236 0 .247-.049.494-.099.791a7.041 7.041 0 01-.345 1.236L94.688 43.32c-.297.989-.642 1.631-1.037 1.928-.394.297-1.036.495-1.875.495h-4.243c-.938 0-1.58-.149-1.974-.495-.394-.346-.74-.989-.937-1.978l-7.648-31.895-7.599 31.846c-.247.989-.543 1.632-.938 1.978-.394.346-1.085.494-1.973.494H62.22zm63.405 1.336c-2.566 0-5.132-.297-7.599-.89-2.467-.594-4.391-1.237-5.674-1.979-.79-.445-1.332-.94-1.53-1.384a3.503 3.503 0 01-.296-1.385v-2.522c0-1.038.395-1.533 1.135-1.533.296 0 .592.05.888.148.296.1.74.297 1.234.495a26.791 26.791 0 005.428 1.73c1.973.396 3.898.594 5.871.594 3.109 0 5.527-.544 7.204-1.632 1.678-1.088 2.566-2.67 2.566-4.698 0-1.384-.444-2.521-1.332-3.461-.888-.94-2.566-1.78-4.984-2.571l-7.154-2.226c-3.602-1.137-6.267-2.818-7.895-5.044-1.628-2.176-2.467-4.599-2.467-7.17 0-2.077.444-3.907 1.332-5.489.888-1.582 2.072-2.967 3.553-4.055 1.48-1.137 3.157-1.978 5.131-2.571 1.974-.594 4.046-.841 6.217-.841 1.086 0 2.221.05 3.306.198 1.135.148 2.171.346 3.207.544.987.247 1.925.494 2.813.79.888.298 1.579.594 2.072.891.691.396 1.185.791 1.481 1.236.296.396.444.94.444 1.632V8.16c0 1.039-.395 1.583-1.135 1.583-.395 0-1.036-.198-1.875-.594-2.813-1.285-5.971-1.928-9.474-1.928-2.812 0-5.033.445-6.562 1.384-1.53.94-2.319 2.374-2.319 4.402 0 1.384.493 2.57 1.48 3.51s2.812 1.88 5.427 2.72l7.007 2.226c3.553 1.137 6.118 2.72 7.648 4.747 1.53 2.027 2.27 4.351 2.27 6.923 0 2.126-.444 4.055-1.283 5.736-.888 1.681-2.072 3.165-3.602 4.352-1.53 1.236-3.355 2.126-5.477 2.769-2.22.692-4.54 1.039-7.056 1.039z"
      fill="#FFF"
    />
  </svg>
);

// Union type to support both react-icons and lucide icons
type AnyIcon = IconType | LucideIcon;

interface TechNode {
  name: string;
  icon: AnyIcon;
  orbit: 1 | 2 | 3;
  angle: number;
  level: "Expert" | "Advanced" | "Proficient" | "Familiar";
  projects: string[];
  description: string;
  color: string;
}

function TechIcon({
  icon: Icon,
  size = 20,
  color = "white",
}: {
  icon: AnyIcon;
  size?: number;
  color?: string;
}) {
  return (
    <Icon size={size} color={color} className="pointer-events-none shrink-0" />
  );
}

const TECH_NODES: TechNode[] = [
  // ── Orbit 1: Core Languages ──
  {
    name: "TypeScript",
    icon: SiTypescript,
    orbit: 1,
    angle: 1,
    level: "Expert",
    projects: ["CollabDocs", "Deloitte L&D Portal"],
    description:
      "Strong typing, interfaces, generics, and full compilation checks across full-stack architectures at Deloitte and ILM UX.",
    color: "49, 120, 198",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    orbit: 1,
    angle: 120,
    level: "Expert",
    projects: ["Tunnel", "CollabDocs", "Deloitte L&D Portal"],
    description:
      "ES6+, async/await, closures, event loop, custom hooks, and dynamic DOM manipulation across production apps.",
    color: "247, 223, 30",
  },
  {
    name: "Python",
    icon: SiPython,
    orbit: 1,
    angle: 240,
    level: "Advanced",
    projects: ["Deloitte Automation", "ML CR Validation"],
    description:
      "Flask pipelines, ML model training, ServiceNow integration — saved 1,054+ hours annually via automated shift reporting.",
    color: "55, 118, 171",
  },

  // ── Orbit 2: Frameworks & UI ──
  {
    name: "React.js",
    icon: SiReact,
    orbit: 2,
    angle: 1,
    level: "Expert",
    projects: ["Deloitte L&D Portal"],
    description:
      "Custom hooks, code-splitting, lazy loading, SOLID architecture — 30% page load reduction on 50k–100k daily user platform.",
    color: "97, 218, 251",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    orbit: 2,
    angle: 51,
    level: "Expert",
    projects: ["CollabDocs", "Tunnel", "Taskblitz"],
    description:
      "App router, SSR/ISR, dynamic routing, middleware, and performance-optimised deployments on Vercel + EC2.",
    color: "255, 255, 255",
  },
  {
    name: "Node.js",
    icon: SiNodedotjs,
    orbit: 2,
    angle: 103,
    level: "Expert",
    projects: ["CollabDocs", "Tunnel", "ILM UX BFF"],
    description:
      "RESTful APIs, BFF layer, auth middleware, RBAC, structured error handling — production backend for fintech and enterprise apps.",
    color: "104, 160, 99",
  },
  {
    name: "Tailwind CSS",
    icon: SiTailwindcss,
    orbit: 2,
    angle: 154,
    level: "Expert",
    projects: ["CollabDocs", "Deloitte L&D Portal"],
    description:
      "Utility-first responsive layouts, custom theme extensions, and optimised production builds.",
    color: "56, 189, 248",
  },
  {
    name: "AWS",
    icon: AwsIcon, // lucide Cloud — clean fallback since Si doesn't have AWS
    orbit: 2,
    angle: 206,
    level: "Advanced",
    projects: ["CollabDocs", "Deloitte L&D Portal", "Deloitte Automation"],
    description:
      "EC2, S3, Lambda, RDS, API Gateway — certified AWS Developer Associate (DVA-C02) and AI Practitioner (AIF-C01).",
    color: "255, 153, 0",
  },
  {
    name: "Redux",
    icon: SiRedux,
    orbit: 2,
    angle: 257,
    level: "Advanced",
    projects: ["Deloitte L&D Portal"],
    description:
      "Managed complex application state using Redux Toolkit, async thunks, and centralized stores for scalable enterprise applications with predictable state management.",
    color: "118, 74, 188",
  },
  {
    name: "Express.js",
    icon: SiExpress,
    orbit: 2,
    angle: 309,
    level: "Advanced",
    projects: ["CollabDocs", "Tunnel", "ILM UX BFF"],
    description:
      "Built REST APIs, authentication middleware, RBAC systems, file upload services, and scalable backend architectures powering real-time and enterprise applications.",
    color: "255, 255, 255",
  },

  // ── Orbit 3: Backend, DBs & Real-Time ──
  {
    name: "PostgreSQL",
    icon: SiPostgresql,
    orbit: 3,
    angle: 1,
    level: "Advanced",
    projects: ["CollabDocs"],
    description:
      "Schema design, TypeORM migrations, complex query optimisation, and indexing strategies for high-traffic apps.",
    color: "51, 103, 145",
  },
  {
    name: "MySQL",
    icon: SiMysql,
    orbit: 3,
    angle: 37,
    level: "Expert",
    projects: ["Deloitte L&D Portal", "Deloitte Automation    "],
    description:
      "Complex query optimisation and indexing on high-traffic internal apps — reduced page load times by 15% at Deloitte.",
    color: "0, 117, 143",
  },
  {
    name: "MongoDB",
    icon: SiMongodb,
    orbit: 3,
    angle: 73,
    level: "Advanced",
    projects: ["Tunnel"],
    description:
      "Flexible document model for chat history — optimised queries improved data retrieval by 30% under concurrent load.",
    color: "71, 162, 72",
  },
  {
    name: "Socket.io",
    icon: SiSocketdotio,
    orbit: 3,
    angle: 109,
    level: "Expert",
    projects: ["Tunnel", "CollabDocs"],
    description:
      "Bi-directional WebSocket events, room bindings, Yjs CRDT sync for CollabDocs, and 20% latency reduction in Tunnel.",
    color: "255, 255, 255",
  },
  {
    name: "Docker",
    icon: SiDocker,
    orbit: 3,
    angle: 145,
    level: "Advanced",
    projects: ["Deloitte L&D Portal", "CollabDocs"],
    description:
      "Containerised deployments with Nginx reverse proxy, SSL via Let's Encrypt, and EC2-hosted production services.",
    color: "36, 150, 237",
  },
  {
    name: "Flask",
    icon: SiFlask,
    orbit: 3,
    angle: 181,
    level: "Advanced",
    projects: ["Deloitte Automation"],
    description:
      "Python/Flask pipeline integrated with ServiceNow — auto-generated shift reports saving 1,054+ hours annually.",
    color: "255, 255, 255",
  },
  {
    name: "Redis",
    icon: SiRedis,
    orbit: 3,
    angle: 217,
    level: "Advanced",
    projects: ["CollabDocs", "Tunnel"],
    description:
      "Caching, session storage, pub/sub messaging, and performance optimization for real-time applications.",
    color: "220, 38, 38",
  },
  {
    name: "TypeORM",
    icon: SiTypeorm,
    orbit: 3,
    angle: 253,
    level: "Advanced",
    projects: ["CollabDocs"],
    description:
      "Entity relationships, migrations, repositories, and database abstraction for scalable Node.js applications.",
    color: "254, 198, 0",
  },
  {
    name: "Nginx",
    icon: SiNginx,
    orbit: 3,
    angle: 289,
    level: "Advanced",
    projects: ["CollabDocs", "Deloitte L&D Portal"],
    description:
      "Reverse proxy, SSL termination, load balancing, and production deployment optimization.",
    color: "0, 179, 69",
  },
  {
    name: "Git",
    icon: SiGit,
    orbit: 3,
    angle: 325,
    level: "Expert",
    projects: ["All Projects"],
    description:
      "Branching strategies, code reviews, CI/CD workflows, release management, and team collaboration.",
    color: "240, 80, 50",
  },
];

export default function SkillsGalaxy() {
  const [selectedTech, setSelectedTech] = useState<TechNode>(TECH_NODES[0]);
  const [isHovered, setIsHovered] = useState(false);

  const getStaticPosition = (orbit: number, angle: number) => {
    const radius = orbit === 1 ? 75 : orbit === 2 ? 145 : 215;
    const rad = (angle * Math.PI) / 180;
    return {
      x: Number((Math.cos(rad) * radius).toFixed(3)),
      y: Number((Math.sin(rad) * radius).toFixed(3)),
    };
  };

  const orbitConfigs = [
    {
      orbit: 1 as const,
      size: "w-37.5 h-37.5",
      animation: "spin-slow 28s linear infinite",
      counterAnimation: "spin-reverse 28s linear infinite",
      svgCenter: 75,
      gradientId: "glowGrad1",
      ariaLabel: "Core skill",
    },
    {
      orbit: 2 as const,
      size: "w-72.5 h-72.5",
      animation: "spin-reverse 34s linear infinite",
      counterAnimation: "spin-slow 34s linear infinite",
      svgCenter: 145,
      gradientId: "glowGrad2",
      ariaLabel: "Framework",
    },
    {
      orbit: 3 as const,
      size: "w-107.5 h-107.5",
      animation: "spin-slow 40s linear infinite",
      counterAnimation: "spin-reverse 40s linear infinite",
      svgCenter: 215,
      gradientId: "glowGrad3",
      ariaLabel: "Integration",
    },
  ];

  return (
    <section
      id="skills"
      className="py-24 sm:py-36 relative overflow-hidden bg-background"
    >
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 rounded-full blur-3xl opacity-10 bg-indigo-500" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="space-y-5 mb-14">
          <span className="section-label">
            <Cpu className="h-3 w-3" />
            Skills Galaxy
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Interactive <span className="gradient-text">Constellation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Hover over a node to pause rotation and reveal experience metrics,
            project usage, and tech details.
          </p>
        </div>

        {/* Galaxy Layout */}
        <div className="grid gap-12 lg:grid-cols-5 items-center">
          {/* Orbit canvas — 3/5 */}
          <div className="lg:col-span-3 flex justify-center items-center h-115 relative select-none">
            <div
              className="relative w-110 h-110 flex items-center justify-center rounded-full scale-[0.8] sm:scale-100"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Orbit ring lines */}
              <div className="absolute w-107.5 h-107.5 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute w-72.5 h-72.5 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute w-37.5 h-37.5 rounded-full border border-white/5 pointer-events-none" />

              {/* Core node */}
              <div className="absolute w-16 h-16 rounded-full bg-slate-900 border-2 border-accent flex flex-col items-center justify-center shadow-[0_0_24px_rgba(99,102,241,0.5)] z-25">
                <span className="text-[10px] font-bold text-accent tracking-widest font-mono">
                  CORE
                </span>
                <span className="text-[8px] font-semibold text-white mt-0.5">
                  FULL-STACK
                </span>
              </div>

              {/* Render each orbit */}
              {orbitConfigs.map((config) => (
                <div
                  key={config.orbit}
                  className={`absolute ${config.size} rounded-full flex items-center justify-center pointer-events-none`}
                  style={{
                    animation: config.animation,
                    animationPlayState: isHovered ? "paused" : "running",
                  }}
                >
                  {/* SVG connector line for selected node */}
                  {selectedTech.orbit === config.orbit && (
                    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible z-10">
                      <defs>
                        <linearGradient
                          id={config.gradientId}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--accent)"
                            stopOpacity={0.8}
                          />
                          <stop
                            offset="100%"
                            stopColor={`rgb(${selectedTech.color})`}
                            stopOpacity={0.3}
                          />
                        </linearGradient>
                      </defs>
                      <motion.line
                        x1={config.svgCenter}
                        y1={config.svgCenter}
                        x2={
                          config.svgCenter +
                          getStaticPosition(config.orbit, selectedTech.angle).x
                        }
                        y2={
                          config.svgCenter +
                          getStaticPosition(config.orbit, selectedTech.angle).y
                        }
                        stroke={`url(#${config.gradientId})`}
                        strokeWidth="1.5"
                        strokeDasharray="4, 4"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -20 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                      />
                    </svg>
                  )}

                  {/* Nodes for this orbit */}
                  {TECH_NODES.filter((n) => n.orbit === config.orbit).map(
                    (node) => {
                      const pos = getStaticPosition(node.orbit, node.angle);
                      const isSelected = selectedTech.name === node.name;
                      return (
                        <button
                          key={node.name}
                          className="absolute w-10 h-10 rounded-xl flex items-center justify-center border cursor-pointer select-none transition-all duration-200 z-20 pointer-events-auto hover:scale-110"
                          style={{
                            transform: `translate(${pos.x}px, ${pos.y}px)`,
                            background: isSelected
                              ? `rgba(${node.color}, 0.25)`
                              : "rgba(15, 23, 42, 0.85)",
                            borderColor: isSelected
                              ? `rgb(${node.color})`
                              : "rgba(255,255,255,0.12)",
                            boxShadow: isSelected
                              ? `0 0 16px rgba(${node.color}, 0.45)`
                              : "none",
                          }}
                          onMouseEnter={() => setSelectedTech(node)}
                          onClick={() => setSelectedTech(node)}
                          aria-label={`${config.ariaLabel}: ${node.name}`}
                        >
                          <span
                            className="inline-flex items-center justify-center pointer-events-none"
                            style={{
                              animation: config.counterAnimation,
                              animationPlayState: isHovered
                                ? "paused"
                                : "running",
                            }}
                          >
                            <TechIcon
                              icon={node.icon}
                              size={20}
                              color={`rgb(${node.color})`}
                            />
                          </span>
                        </button>
                      );
                    },
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Details panel — 2/5 */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTech.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl border border-border bg-card shadow-xl relative overflow-hidden"
                aria-live="polite"
              >
                {/* Glow corner */}
                <div
                  className="absolute -top-12 -right-12 w-28 h-28 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-300"
                  style={{ background: `rgb(${selectedTech.color})` }}
                />

                {/* Icon + name */}
                <div className="flex items-center gap-3.5 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `rgba(${selectedTech.color}, 0.15)`,
                      border: `1px solid rgba(${selectedTech.color}, 0.4)`,
                      boxShadow: `0 4px 12px rgba(${selectedTech.color}, 0.15)`,
                    }}
                  >
                    <TechIcon
                      icon={selectedTech.icon}
                      size={26}
                      color={`rgb(${selectedTech.color})`}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">
                      {selectedTech.name}
                    </h3>
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white uppercase tracking-widest mt-1"
                      style={{
                        background: `linear-gradient(135deg, rgba(${selectedTech.color}, 0.7), rgba(${selectedTech.color}, 0.4))`,
                      }}
                    >
                      <Sparkles className="h-2.5 w-2.5" />
                      {selectedTech.level}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-medium">
                  {selectedTech.description}
                </p>

                {/* Meta */}
                <div className="space-y-4 border-t border-border/40 pt-4 font-medium text-xs">
                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-widest mb-1.5">
                      Layer Category
                    </span>
                    <span className="text-foreground flex items-center gap-2 font-semibold">
                      {selectedTech.orbit === 1 && (
                        <Code2 className="h-3.5 w-3.5 text-accent" />
                      )}
                      {selectedTech.orbit === 2 && (
                        <Cpu className="h-3.5 w-3.5 text-accent" />
                      )}
                      {selectedTech.orbit === 3 && (
                        <Database className="h-3.5 w-3.5 text-accent" />
                      )}
                      {selectedTech.orbit === 1
                        ? "Core Language / Spec"
                        : selectedTech.orbit === 2
                          ? "Framework & Runtime"
                          : "Database & Integrations"}
                    </span>
                  </div>

                  <div>
                    <span className="text-muted-foreground block text-[10px] uppercase font-bold tracking-widest mb-1.5">
                      Shipped in Products
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedTech.projects.map((p) => (
                        <span
                          key={p}
                          className="px-2.5 py-1 rounded-lg border border-border/50 bg-background/50 font-mono text-[10px] text-foreground"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
