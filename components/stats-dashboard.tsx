"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart as BarChartIcon,
  GitPullRequest,
  Activity,
  Calendar,
  Award,
} from "lucide-react";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
} from "recharts";

interface GitBlock {
  count: number;
  date: string;
  level: 0 | 1 | 2 | 3 | 4;
}

const skillsMetric = [
  { subject: "React / Next.js", A: 95, fullMark: 100 },
  { subject: "Node.js / APIs", A: 92, fullMark: 100 },
  { subject: "TypeScript", A: 90, fullMark: 100 },
  { subject: "Databases / SQL", A: 83, fullMark: 100 },
  { subject: "Python / Flask", A: 78, fullMark: 100 },
  { subject: "AWS / DevOps", A: 75, fullMark: 100 },
];
const activityData = [
  { month: "Jan", commits: 95, deployments: 8 },
  { month: "Feb", commits: 140, deployments: 12 },
  { month: "Mar", commits: 185, deployments: 18 },
  { month: "Apr", commits: 110, deployments: 10 },
  { month: "May", commits: 210, deployments: 24 },
  { month: "Jun", commits: 165, deployments: 16 },
];

/* Custom Counter Component */
function StatCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1200;
    const stepTime = 25;
    const step = Math.ceil(target / (duration / stepTime));
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span
      ref={ref}
      className="font-extrabold text-3xl sm:text-4xl tracking-tight text-foreground tabular-nums"
    >
      {count}
      {suffix}
    </span>
  );
}

export default function StatsDashboard() {
  const [gitBlocks, setGitBlocks] = useState<GitBlock[]>([]);
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
    // Generate mock GitHub contribution calendar blocks (24 weeks * 7 days)
    const levels: (0 | 1 | 2 | 3 | 4)[] = [
      0, 0, 1, 1, 2, 2, 3, 3, 4, 1, 0, 2, 3, 0, 1, 4, 2, 1, 0, 0,
    ];
    const tempBlocks: GitBlock[] = [];
    const date = new Date();
    date.setDate(date.getDate() - 168); // go back 24 weeks

    for (let i = 0; i < 168; i++) {
      const idx = Math.floor(Math.random() * levels.length);
      const lvl = levels[idx];
      const count = lvl === 0 ? 0 : lvl * 2 + Math.floor(Math.random() * 2);

      const formattedDate = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

      tempBlocks.push({
        count,
        date: formattedDate,
        level: lvl,
      });

      date.setDate(date.getDate() + 1);
    }
    setGitBlocks(tempBlocks);
  }, []);

  return (
    <section
      id="stats"
      ref={containerRef}
      className="scroll-mt-24 py-24 sm:py-36 relative overflow-hidden bg-secondary/10"
    >
      {/* Grid Dot Background */}
      <div className="absolute inset-0 dot-grid opacity-35 pointer-events-none" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="space-y-5 mb-14"
        >
          <span className="section-label">
            <Activity className="h-3 w-3" />
            Dashboard
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Developer <span className="gradient-text">Statistics</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            A real-time snapshot of technical metrics, git contributions, and
            code-level delivery.
          </p>
        </motion.div>

        {/* Layout Grid */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Left panel: Counters + Github Grid — 3/5 width */}
          <div className="lg:col-span-3 space-y-6">
            {/* Stat Counters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Experience", value: 4, suffix: "y+", icon: Calendar },
                {
                  label: "Projects Shipped",
                  value: 10,
                  suffix: "+",
                  icon: GitPullRequest,
                },
                {
                  label: "Hours Saved",
                  value: 1054,
                  suffix: "+",
                  icon: BarChartIcon,
                },
                {
                  label: "Awards",
                  value: 3,
                  suffix: "×",
                  icon: Award,
                },
              ].map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                    className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex flex-col justify-between"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase">
                        {stat.label}
                      </span>
                      <Icon className="h-4 w-4 text-accent/80" />
                    </div>
                    <StatCounter target={stat.value} suffix={stat.suffix} />
                  </motion.div>
                );
              })}
            </div>

            {/* Simulated GitHub Contribution Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm"
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-sm font-bold text-foreground">
                    Git Contributions
                  </h3>
                  <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                    800+ commits in the last 24 weeks
                  </p>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
                  <span>Less</span>
                  <div className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-white/5" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-950/60" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-800/70" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-500/80" />
                  <div className="w-2.5 h-2.5 rounded-sm bg-emerald-300" />
                  <span>More</span>
                </div>
              </div>

              {/* Grid Box */}
              <div className="overflow-x-auto">
                <div className="grid grid-flow-col grid-rows-7 gap-1 min-w-120">
                  {gitBlocks.map((block, idx) => {
                    const bgColors = [
                      "bg-slate-900 border-white/5", // 0
                      "bg-emerald-950/60 border-emerald-950", // 1
                      "bg-emerald-800/70 border-emerald-800", // 2
                      "bg-emerald-500/80 border-emerald-600", // 3
                      "bg-emerald-300 border-emerald-400", // 4
                    ];
                    return (
                      <div
                        key={idx}
                        className={`w-2 h-2 rounded-[1.5px] border ${bgColors[block.level]} cursor-help transition-all hover:scale-125`}
                        title={`${block.count} commits on ${block.date}`}
                      />
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right panel: Recharts — 2/5 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab layout or grid layout for Recharts */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
              {/* Radar Chart (Full Capabilities) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex flex-col h-72"
              >
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  Skill Breakdown
                </h4>
                <div
                  style={{ height: "220px" }}
                  className="w-full min-w-0 text-[9px] font-mono"
                >
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart
                        cx="50%"
                        cy="50%"
                        outerRadius="70%"
                        data={skillsMetric}
                      >
                        <PolarGrid stroke="rgba(255,255,255,0.06)" />

                        <PolarAngleAxis
                          dataKey="subject"
                          stroke="rgba(255,255,255,0.45)"
                        />
                        <PolarRadiusAxis
                          angle={30}
                          domain={[0, 100]}
                          stroke="rgba(255,255,255,0.15)"
                          tick={false}
                        />
                        <Radar
                          name="Safwan"
                          dataKey="A"
                          stroke="var(--accent)"
                          fill="rgba(99,102,241,0.25)"
                          fillOpacity={0.65}
                        />
                      </RadarChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </motion.div>

              {/* Bar Chart (Activity Logs) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.12 }}
                className="p-5 rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm flex flex-col h-72"
              >
                <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                  Monthly Commits
                </h4>
                <div
                  style={{ height: "220px" }}
                  className="w-full min-w-0 text-[9px] font-mono"
                >
                  {isMounted ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={activityData}>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="rgba(255,255,255,0.05)"
                        />
                        <XAxis
                          dataKey="month"
                          stroke="rgba(255,255,255,0.45)"
                        />
                        <YAxis stroke="rgba(255,255,255,0.45)" />
                        <Tooltip
                          contentStyle={{
                            background: "#0f172a",
                            border: "1px solid var(--border)",
                            borderRadius: "12px",
                            fontSize: "11px",
                          }}
                        />
                        <Bar
                          dataKey="commits"
                          fill="var(--accent)"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : null}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
