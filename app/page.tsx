"use client";

import dynamic from "next/dynamic";
import Header from "@/components/header";
import Hero from "@/components/hero";
import About from "@/components/about";
import Footer from "@/components/footer";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy-loaded components below the fold with minimal fallbacks
const StatsDashboard = dynamic(() => import("@/components/stats-dashboard"), {
  ssr: false,
  loading: () => (
    <div className="py-24 max-w-6xl mx-auto px-4">
      <Skeleton className="h-100 w-full rounded-2xl" />
    </div>
  ),
});

const SkillsGalaxy = dynamic(() => import("@/components/skills-galaxy"), {
  ssr: false,
  loading: () => (
    <div className="py-24 max-w-6xl mx-auto px-4">
      <Skeleton className="h-125 w-full rounded-2xl" />
    </div>
  ),
});

const Projects = dynamic(() => import("@/components/projects"), {
  ssr: false,
  loading: () => (
    <div className="py-24 max-w-6xl mx-auto px-4">
      <Skeleton className="h-150 w-full rounded-2xl" />
    </div>
  ),
});

const Experience = dynamic(() => import("@/components/experience"), {
  ssr: false,
  loading: () => (
    <div className="py-24 max-w-6xl mx-auto px-4">
      <Skeleton className="h-112.5 w-full rounded-2xl" />
    </div>
  ),
});

const HowIBuild = dynamic(() => import("@/components/how-i-build"), {
  ssr: false,
});
const Playground = dynamic(() => import("@/components/playground"), {
  ssr: false,
});
const LiveTerminal = dynamic(() => import("@/components/live-terminal"), {
  ssr: false,
});
const Contact = dynamic(() => import("@/components/contact"), { ssr: false });
const AIAssistant = dynamic(() => import("@/components/ai-assistant"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-accent/30 selection:text-accent-foreground">
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <About />
        <StatsDashboard />
        <SkillsGalaxy />
        <Projects />
        <Experience />
        <HowIBuild />
        <Playground />
        <LiveTerminal />
        <Contact />
      </main>
      <Footer />
      <AIAssistant />
    </div>
  );
}
