"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Play, RotateCcw, ShieldAlert, CheckCircle2, Sliders, Gamepad2, Hourglass, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
}

// Memory Match Game Types
interface MemoryCard {
  id: number;
  symbol: string;
  isFlipped: boolean;
  isMatched: boolean;
}

// Speed Coder Snippets
const TYPING_SNIPPETS = [
  "const [data, setData] = useState(null);",
  "useEffect(() => { socket.connect(); }, []);",
  "const result = await prisma.employee.findUnique();",
  "export default function Hero() { return <div /> }",
];

// Debugger Quest Questions
interface BugQuestion {
  code: string;
  explanation: string;
  options: string[];
  correctIdx: number;
}

const BUG_QUESTIONS: BugQuestion[] = [
  {
    code: `if (isLoading) {\n  const [data, setData] = useState();\n}`,
    explanation: "React hooks must not be called inside conditional statements (Rules of Hooks).",
    options: [
      "Move useState outside the conditional block",
      "Change const to let",
      "Remove the state variable entirely",
      "Use useEffect instead of useState"
    ],
    correctIdx: 0,
  },
  {
    code: `for (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}`,
    explanation: "Using 'var' binds to function-scope, resulting in '3' logged three times. 'let' binds to block-scope.",
    options: [
      "Change var to let",
      "Increase timeout to 500",
      "Replace setTimeout with a Promise",
      "Change console.log to console.warn"
    ],
    correctIdx: 0,
  },
  {
    code: `class UserService {\n  constructor(private repo: Repo) {}\n}`,
    explanation: "In NestJS, dependencies require proper @Injectable() decorator to resolve compilation scopes.",
    options: [
      "Add @Injectable() decorator to UserService class",
      "Change constructor to public",
      "Remove private from repo declaration",
      "Declare repo as static"
    ],
    correctIdx: 0,
  },
];

type LabTab = "particles" | "memory" | "typing" | "debugger";

export default function Playground() {
  const [activeTab, setActiveTab] = useState<LabTab>("particles");

  // Tab 1: Particle variables
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -999, y: -999 });
  const [pCount, setPCount] = useState(60);
  const [pSpeed, setPSpeed] = useState(0.65);
  const [pDist, setPDist] = useState(105);

  // Tab 2: Memory Match state
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState<MemoryCard | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<MemoryCard | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [memoryWon, setMemoryWon] = useState(false);

  // Tab 3: Speed Coder state
  const [snippetIdx, setSnippetIdx] = useState(0);
  const [typingInput, setTypingInput] = useState("");
  const [timer, setTimer] = useState(0);
  const [isTypingActive, setIsTypingActive] = useState(false);
  const [typingWpm, setTypingWpm] = useState(0);
  const [typingWon, setTypingWon] = useState(false);
  const typingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Tab 4: Debugger Quest state
  const [questIdx, setQuestIdx] = useState(0);
  const [questScore, setQuestScore] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [questChecked, setQuestChecked] = useState(false);
  const [questFeedback, setQuestFeedback] = useState("");

  /* ──────────────────────────────────────────────────────────
     TAB 1: PARTICLE CANVAS SYSTEM
     ────────────────────────────────────────────────────────── */
  useEffect(() => {
    if (activeTab !== "particles") {
      cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    setupCanvas();

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    particlesRef.current = Array.from({ length: pCount }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * pSpeed,
      vy: (Math.random() - 0.5) * pSpeed,
      size: Math.random() * 2 + 1,
    }));

    const draw = () => {
      const W2 = canvas.offsetWidth;
      const H2 = canvas.offsetHeight;
      ctx.clearRect(0, 0, W2, H2);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      particles.forEach((p) => {
        // Apply slight pull on cursor
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 140 && dist > 0) {
          const force = ((140 - dist) / 140) * 0.025;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        // speed constraints
        p.vx *= 0.98;
        p.vy *= 0.98;
        p.x += p.vx * pSpeed;
        p.y += p.vy * pSpeed;

        if (p.x < 0 || p.x > W2) p.vx *= -1;
        if (p.y < 0 || p.y > H2) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(99, 102, 241, 0.8)";
        ctx.fill();
      });

      // render lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(
            particles[i].x - particles[j].x,
            particles[i].y - particles[j].y
          );
          if (dist < pDist) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(99, 102, 241, ${(1 - dist / pDist) * 0.22})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeTab, pCount, pSpeed, pDist]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  const handleCanvasMouseLeave = () => {
    mouseRef.current = { x: -999, y: -999 };
  };

  /* ──────────────────────────────────────────────────────────
     TAB 2: MEMORY MATCH SYSTEM
     ────────────────────────────────────────────────────────── */
  const initMemoryGame = () => {
    const symbols = ["TS", "JS", "NXT", "NST", "SQL", "MQT"];
    const duplicated = [...symbols, ...symbols].map((symbol, idx) => ({
      id: idx,
      symbol,
      isFlipped: false,
      isMatched: false,
    }));
    // Shuffle
    duplicated.sort(() => Math.random() - 0.5);
    setMemoryCards(duplicated);
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setMemoryWon(false);
  };

  useEffect(() => {
    if (activeTab === "memory") {
      initMemoryGame();
    }
  }, [activeTab]);

  const handleMemorySelect = (card: MemoryCard) => {
    if (disabled || card.isFlipped || card.isMatched) return;
    
    // Flip card visually
    setMemoryCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    );

    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;
    setDisabled(true);

    if (choiceOne.symbol === choiceTwo.symbol) {
      // Matched!
      setMemoryCards((prev) =>
        prev.map((c) =>
          c.symbol === choiceOne.symbol ? { ...c, isMatched: true } : c
        )
      );
      resetMemoryTurn();
    } else {
      // Mismatch, flip back after timeout
      setTimeout(() => {
        setMemoryCards((prev) =>
          prev.map((c) =>
            c.id === choiceOne.id || c.id === choiceTwo.id
              ? { ...c, isFlipped: false }
              : c
          )
        );
        resetMemoryTurn();
      }, 700);
    }
  }, [choiceOne, choiceTwo]);

  const resetMemoryTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns((t) => t + 1);
    setDisabled(false);
  };

  // Check memory game win
  useEffect(() => {
    if (memoryCards.length > 0 && memoryCards.every((c) => c.isMatched)) {
      setMemoryWon(true);
    }
  }, [memoryCards]);

  /* ──────────────────────────────────────────────────────────
     TAB 3: SPEED CODER SYSTEM
     ────────────────────────────────────────────────────────── */
  const initTypingGame = () => {
    setTypingInput("");
    setIsTypingActive(false);
    setTimer(0);
    setTypingWpm(0);
    setTypingWon(false);
    if (typingTimerRef.current) clearInterval(typingTimerRef.current);
  };

  useEffect(() => {
    if (activeTab === "typing") {
      initTypingGame();
    }
    return () => {
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [activeTab, snippetIdx]);

  const handleTypingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setTypingInput(val);

    if (!isTypingActive && val.length > 0) {
      setIsTypingActive(true);
      const start = Date.now();
      typingTimerRef.current = setInterval(() => {
        setTimer(Math.floor((Date.now() - start) / 1000));
      }, 1000);
    }

    const currentSnippet = TYPING_SNIPPETS[snippetIdx];
    if (val === currentSnippet) {
      // Completed snippet!
      setIsTypingActive(false);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
      
      const seconds = Math.max(timer, 1);
      const wpm = Math.round((currentSnippet.length / 5) / (seconds / 60));
      setTypingWpm(wpm);
      setTypingWon(true);
    }
  };

  /* ──────────────────────────────────────────────────────────
     TAB 4: DEBUGGER QUEST SYSTEM
     ────────────────────────────────────────────────────────── */
  const handleQuestSelect = (idx: number) => {
    if (questChecked) return;
    setSelectedOpt(idx);
  };

  const handleQuestCheck = () => {
    if (selectedOpt === null) return;
    const currentQ = BUG_QUESTIONS[questIdx];
    setQuestChecked(true);

    if (selectedOpt === currentQ.correctIdx) {
      setQuestScore((s) => s + 10);
      setQuestFeedback(`Correct! ${currentQ.explanation}`);
    } else {
      setQuestFeedback(`Incorrect. The correct answer was "${currentQ.options[currentQ.correctIdx]}". ${currentQ.explanation}`);
    }
  };

  const handleQuestNext = () => {
    setSelectedOpt(null);
    setQuestChecked(false);
    setQuestFeedback("");
    setQuestIdx((idx) => (idx + 1) % BUG_QUESTIONS.length);
  };

  return (
    <section id="playground" className="py-24 sm:py-36 bg-slate-950 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 dot-grid opacity-15 pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-4 mb-14">
          <span className="section-label mx-auto">
            <Zap className="h-3 w-3" />
            Playground
          </span>
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Creative <span className="gradient-text">Lab & Games</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            Take a break and test your skills with some lightweight, interactive frontend challenges and games.
          </p>
        </div>

        {/* Tab Headers switcher */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {[
            { id: "particles", label: "Particle Editor", icon: Sliders },
            { id: "memory", label: "Memory Match", icon: Gamepad2 },
            { id: "typing", label: "Speed Coder", icon: Hourglass },
            { id: "debugger", label: "Debugger Quest", icon: Award },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as LabTab)}
                className={`flex items-center gap-2 px-5 py-3 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all duration-250 cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-accent border-transparent text-accent-foreground shadow-lg"
                    : "border-white/10 bg-slate-900/60 text-zinc-400 hover:text-white hover:bg-slate-900"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Lab Screen container */}
        <div className="min-h-[420px] rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden grid gap-6 md:grid-cols-5 p-6 relative">
          
          {/* Main workspace — 3/5 width */}
          <div className="md:col-span-3 flex flex-col justify-center relative min-h-[300px]">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Particle Editor Canvas */}
              {activeTab === "particles" && (
                <motion.div
                  key="particles-ws"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full relative"
                >
                  <canvas
                    ref={canvasRef}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseLeave={handleCanvasMouseLeave}
                    className="w-full h-full rounded-xl bg-slate-950 border border-white/5 cursor-crosshair min-h-[300px]"
                  />
                  <div className="absolute bottom-3 left-3 text-[10px] font-mono text-zinc-500 pointer-events-none">
                    Hover inside to interact with particles
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Memory Match Game Grid */}
              {activeTab === "memory" && (
                <motion.div
                  key="memory-ws"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center w-full"
                >
                  {memoryWon ? (
                    <div className="text-center space-y-4 py-8">
                      <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto animate-bounce" />
                      <h3 className="text-lg font-bold text-white">Perfect Match!</h3>
                      <p className="text-xs text-zinc-400">Completed in {turns} turns.</p>
                      <Button onClick={initMemoryGame} size="sm" className="rounded-lg bg-accent text-accent-foreground cursor-pointer">
                        Play Again
                      </Button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 w-full max-w-[280px]">
                      {memoryCards.map((card) => {
                        const showSymbol = card.isFlipped || card.isMatched;
                        return (
                          <button
                            key={card.id}
                            onClick={() => handleMemorySelect(card)}
                            className={`h-14 rounded-xl flex items-center justify-center font-mono font-bold text-xs border transition-all duration-200 cursor-pointer ${
                              showSymbol
                                ? "bg-accent border-accent text-accent-foreground"
                                : "bg-slate-950 border-white/10 hover:border-white/20 text-zinc-500"
                            }`}
                          >
                            {showSymbol ? card.symbol : "?"}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tab 3: Speed Coder Typing Workspace */}
              {activeTab === "typing" && (
                <motion.div
                  key="typing-ws"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 w-full"
                >
                  {typingWon ? (
                    <div className="text-center space-y-4 py-8">
                      <CheckCircle2 className="h-14 w-14 text-emerald-500 mx-auto animate-bounce" />
                      <h3 className="text-lg font-bold text-white">Snippets Complete!</h3>
                      <p className="text-xs text-zinc-400 font-mono">Speed Score: {typingWpm} WPM</p>
                      <Button onClick={initTypingGame} size="sm" className="rounded-lg bg-accent text-accent-foreground cursor-pointer">
                        Try Again
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* snippet preview */}
                      <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-sm leading-relaxed min-h-[60px] flex items-center">
                        <span className="text-zinc-400 select-none mr-3 text-xs w-4">#</span>
                        <span className="text-zinc-200">{TYPING_SNIPPETS[snippetIdx]}</span>
                      </div>

                      {/* input box */}
                      <input
                        type="text"
                        value={typingInput}
                        onChange={handleTypingChange}
                        placeholder="Click here and start typing code to begin..."
                        className="w-full bg-slate-950 border border-white/15 focus:border-accent rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors font-mono"
                        autoComplete="off"
                        autoCapitalize="off"
                        spellCheck="false"
                      />
                    </div>
                  )}
                </motion.div>
              )}

              {/* Tab 4: Debugger Quest Code Area */}
              {activeTab === "debugger" && (
                <motion.div
                  key="debugger-ws"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 w-full"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                      Quest Question {questIdx + 1} of {BUG_QUESTIONS.length}
                    </span>
                    <span className="text-xs font-mono font-bold text-accent">Score: {questScore}pts</span>
                  </div>

                  {/* Buggy Snippet */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-xs leading-relaxed text-zinc-300 relative overflow-hidden">
                    <pre>{BUG_QUESTIONS[questIdx].code}</pre>
                    <span className="absolute top-2 right-2 bg-red-500/10 border border-red-500/20 text-red-500 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1">
                      <ShieldAlert className="h-2 w-2 shrink-0" />
                      BUGGY
                    </span>
                  </div>

                  {/* Options List */}
                  <div className="grid gap-2">
                    {BUG_QUESTIONS[questIdx].options.map((opt, idx) => {
                      const isSelected = selectedOpt === idx;
                      return (
                        <button
                          key={idx}
                          onClick={() => handleQuestSelect(idx)}
                          className={`w-full p-3 rounded-xl border text-left text-xs font-semibold transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "bg-accent border-transparent text-accent-foreground"
                              : "border-white/5 bg-slate-950 hover:bg-slate-900 text-zinc-300"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* Sidebar controls/stats — 2/5 width */}
          <div className="md:col-span-2 rounded-xl bg-slate-950/60 p-5 border border-white/5 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              
              {/* Tab 1: Particle Sliders Panel */}
              {activeTab === "particles" && (
                <motion.div
                  key="particles-ctrl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-accent" />
                      Control Panel
                    </h3>
                    <p className="text-[10px] text-zinc-400 mt-1">Adjust vector constraints directly.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Count */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-400">
                        <span>Particle Count</span>
                        <span>{pCount}</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={pCount}
                        onChange={(e) => setPCount(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Speed */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-400">
                        <span>Speed Constant</span>
                        <span>{pSpeed.toFixed(2)}x</span>
                      </div>
                      <input
                        type="range"
                        min="0.2"
                        max="2.0"
                        step="0.1"
                        value={pSpeed}
                        onChange={(e) => setPSpeed(parseFloat(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>

                    {/* Distance */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-mono font-bold text-zinc-400">
                        <span>Link Distance</span>
                        <span>{pDist}px</span>
                      </div>
                      <input
                        type="range"
                        min="50"
                        max="180"
                        value={pDist}
                        onChange={(e) => setPDist(parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Tab 2: Memory Score Panel */}
              {activeTab === "memory" && (
                <motion.div
                  key="memory-ctrl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 flex flex-col h-full justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Gamepad2 className="h-4 w-4 text-accent" />
                        Memory Match
                      </h3>
                      <p className="text-[10px] text-zinc-400 mt-1">Match tech constellation node pairs.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Turns Taken
                        </span>
                        <span className="text-2xl font-extrabold font-mono text-white mt-1 block">
                          {turns}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Matched Pairs
                        </span>
                        <span className="text-2xl font-extrabold font-mono text-accent mt-1 block">
                          {memoryCards.filter((c) => c.isMatched).length / 2} / 6
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button onClick={initMemoryGame} variant="outline" className="w-full border-white/10 hover:bg-slate-900 gap-1.5 cursor-pointer text-xs font-bold py-2 rounded-xl mt-4">
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset Deck
                  </Button>
                </motion.div>
              )}

              {/* Tab 3: Speed Coder Panel */}
              {activeTab === "typing" && (
                <motion.div
                  key="typing-ctrl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 flex flex-col h-full justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Hourglass className="h-4 w-4 text-accent" />
                        Speed Coder
                      </h3>
                      <p className="text-[10px] text-zinc-400 mt-1">Type code snippets accurately as fast as you can.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
                      <div>
                        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Timer Duration
                        </span>
                        <span className="text-2xl font-extrabold font-mono text-white mt-1 block">
                          {timer}s
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                          Snippet Progress
                        </span>
                        <span className="text-xs text-muted-foreground mt-1.5 block font-semibold">
                          Snippet {snippetIdx + 1} of {TYPING_SNIPPETS.length}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => {
                        setSnippetIdx((idx) => (idx + 1) % TYPING_SNIPPETS.length);
                      }}
                      className="flex-1 bg-accent text-accent-foreground cursor-pointer text-xs font-bold py-2 rounded-xl"
                    >
                      Next Snippet
                    </Button>
                    <Button onClick={initTypingGame} variant="outline" size="icon" className="border-white/10 text-zinc-400 hover:text-white cursor-pointer rounded-xl">
                      <RotateCcw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Tab 4: Debugger Quest Panel */}
              {activeTab === "debugger" && (
                <motion.div
                  key="debugger-ctrl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 flex flex-col h-full justify-between"
                >
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-2">
                        <Award className="h-4 w-4 text-accent" />
                        Quest Result
                      </h3>
                      <p className="text-[10px] text-zinc-400 mt-1">Find the bug in the code syntax on the left.</p>
                    </div>

                    {/* feedback status box */}
                    {questFeedback && (
                      <div className="p-3.5 rounded-xl border border-white/5 bg-slate-950 text-[11px] text-zinc-300 leading-relaxed font-semibold">
                        {questFeedback}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/5">
                    {!questChecked ? (
                      <Button
                        onClick={handleQuestCheck}
                        disabled={selectedOpt === null}
                        className="w-full bg-accent text-accent-foreground cursor-pointer text-xs font-bold py-2 rounded-xl"
                      >
                        Check Answer
                      </Button>
                    ) : (
                      <Button
                        onClick={handleQuestNext}
                        className="w-full bg-accent text-accent-foreground cursor-pointer text-xs font-bold py-2 rounded-xl"
                      >
                        Next Challenge
                      </Button>
                    )}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}

