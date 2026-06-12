"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rohan Mehta",
    role: "CTO",
    company: "ILMUX Pvt. Ltd.",
    quote: "Jassir redesigned our real-time tracking pipelines using NestJS, MQTT, and Next.js. His optimization of PostgreSQL transaction scopes cut backend concurrency bottlenecks by 40% and improved Web Socket polling efficiency dramatically.",
    avatar: "RM",
    rating: 5,
  },
  {
    id: 2,
    name: "Sarah Jenkins",
    role: "VP of Product",
    company: "Veloce Enterprise",
    quote: "The ELMS Employee Leave Management platform Jassir built is a masterclass in full-stack execution. The multi-role dashboard workflow logic is incredibly intuitive, robust, and the transition animations feel premium and fluid.",
    avatar: "SJ",
    rating: 5,
  },
  {
    id: 3,
    name: "Vikram Sen",
    role: "Lead UI Architect",
    company: "Apex Labs",
    quote: "Jassir has a rare combination of frontend artistic sensibility and deep backend engineering skills. His typescript components are perfectly modular, performant, and his custom animation layers always add a 'wow' factor.",
    avatar: "VS",
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isHovering) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [index, isHovering]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-36 relative overflow-hidden bg-background"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Visual background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl opacity-5 bg-purple-500" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 mb-16 text-center">
          <span className="section-label mx-auto">
            <MessageSquare className="h-3 w-3" />
            Reviews
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Client <span className="gradient-text">Feedback</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            What engineering leaders and product owners say about Jassir's technical execution.
          </p>
        </div>

        {/* Carousel Card Wrapper */}
        <div className="relative min-h-[300px] flex flex-col items-center">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="w-full p-8 md:p-10 rounded-2xl border border-border bg-card shadow-lg relative flex flex-col justify-between"
            >
              {/* Large quote icon watermark */}
              <Quote className="absolute -top-3 -left-3 h-24 w-24 text-muted/5 pointer-events-none transform -rotate-12" />

              <div className="space-y-6">
                
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: current.rating }).map((_, sIdx) => (
                    <span key={sIdx} className="text-yellow-500 text-sm">★</span>
                  ))}
                </div>

                {/* Quote text */}
                <p className="text-sm sm:text-base text-foreground italic leading-relaxed font-medium">
                  "{current.quote}"
                </p>
              </div>

              {/* Author info row */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/40">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-accent to-purple-500 text-white flex items-center justify-center font-bold text-sm font-mono border-2 border-background shadow-md">
                  {current.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-snug">{current.name}</h4>
                  <p className="text-[11px] text-muted-foreground font-semibold">
                    {current.role} at <span className="text-accent">{current.company}</span>
                  </p>
                </div>
              </div>

            </motion.div>
          </AnimatePresence>

          {/* Manual controls buttons & Pagination indicators row */}
          <div className="flex items-center justify-between w-full mt-6 px-2">
            
            {/* Dots */}
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((t, tIdx) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(tIdx)}
                  className={`h-2 rounded-full transition-all duration-250 cursor-pointer ${
                    tIdx === index ? "w-6 bg-accent" : "w-2 bg-border hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to slide ${tIdx + 1}`}
                />
              ))}
            </div>

            {/* Nav Arrows */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="w-9 h-9 rounded-xl border-border bg-card hover:bg-muted cursor-pointer"
                aria-label="Previous review"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="w-9 h-9 rounded-xl border-border bg-card hover:bg-muted cursor-pointer"
                aria-label="Next review"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
