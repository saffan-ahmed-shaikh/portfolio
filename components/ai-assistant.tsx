"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bot,
  Mic,
  MicOff,
  Send,
  X,
  Volume2,
  VolumeX,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
  isVoice?: boolean;
}

declare global {
  interface Window {
    SpeechRecognition?: any;
    webkitSpeechRecognition?: any;
  }
}

// Custom Speech Recognition interface declaration
interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionResultList {
  [index: number]: SpeechRecognitionResult;
  length: number;
}

interface SpeechRecognitionResult {
  [index: number]: SpeechRecognitionAlternative;
  length: number;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionEvent extends Event {
  resultIndex: number;
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionInstance {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onstart: (() => void) | null;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

const SYSTEM_KNOWLEDGE = [
  {
    keywords: ["who", "about", "name", "safwan", "experience", "profile"],
    response:
      "Safwan Ahmed is a Full-Stack Engineer with 4+ years of experience building high-traffic financial and enterprise products using React.js, Node.js, TypeScript, and Python. He’s known for automation, compliance-ready delivery, and performance-focused frontend engineering.",
  },
  {
    keywords: ["skill", "tech", "stack", "language", "framework", "database"],
    response:
      "Safwan’s tech stack includes React.js, Next.js, TypeScript, and Python. For backend services he uses Node.js + Express.js (and NestJS), with REST APIs, JWT authentication, RBAC, and structured error handling. He also works with MySQL/PostgreSQL/MongoDB and real-time systems like Socket.io; he integrates with enterprise workflows such as ServiceNow.",
  },
  {
    keywords: ["project", "work", "portfolio", "built", "apps"],
    response:
      "Safwan’s standout projects include CollabDocs (Real-Time Collaborative Editor with Next.js/TypeScript, Socket.io, and Yjs CRDT sync) and Tunnel (Real-Time Chat Application with Next.js/Node.js, Express, Socket.io, and MongoDB).",
  },
  {
    keywords: ["collabdocs", "collab", "crdt", "collaborative", "editor"],
    response:
      "CollabDocs is Safwan’s real-time collaborative document editor. It uses Yjs CRDT synchronization over Socket.io to enable conflict-free multi-user editing with sub-second latency, along with JWT authentication and role-based permissions.",
  },
  {
    keywords: ["contact", "hire", "email", "phone", "reach"],
    response:
      "You can contact Safwan directly using the contact form at the bottom of the page, or email him. He is open to full-time roles and relevant opportunities aligned with full-stack and performance-focused engineering.",
  },
  {
    keywords: ["project", "tutorial", "lab", "playground", "creative"],
    response:
      "Check out the Playground and Lab sections—Safwan built interactive UI experiences and engineering-focused experiments there.",
  },
];

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<
    "idle" | "listening" | "thinking" | "speaking"
  >("idle");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm Safwan Ahmed's AI assistant 👋 Ask me about his projects, skills, experience, or tech stack.",
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [speechSupported, setSpeechSupported] = useState(false);
  const [textToSpeechEnabled, setTextToSpeechEnabled] = useState(true);

  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Initialize Speech Services on client mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      synthRef.current = window.speechSynthesis;

      const BrowserSpeech =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (BrowserSpeech) {
        setSpeechSupported(true);
        const rec = new BrowserSpeech() as SpeechRecognitionInstance;
        rec.continuous = false;
        rec.interimResults = false;
        rec.lang = "en-US";

        rec.onstart = () => {
          setStatus("listening");
        };

        rec.onresult = (event: SpeechRecognitionEvent) => {
          const text = event.results[0][0].transcript;
          if (text) {
            handleUserQuery(text, true);
          }
        };

        rec.onerror = (e: SpeechRecognitionErrorEvent) => {
          console.error("Speech recognition error:", e.error);
          setStatus("idle");
        };

        rec.onend = () => {
          setStatus((prev) => (prev === "listening" ? "idle" : prev));
        };

        recognitionRef.current = rec;
      }
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, status]);

  const toggleMic = () => {
    if (status === "listening") {
      recognitionRef.current?.stop();
    } else {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
      recognitionRef.current?.start();
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    const text = inputVal.trim();
    setInputVal("");
    handleUserQuery(text, false);
  };

  const handleUserQuery = async (query: string, isVoice: boolean = false) => {
    const updatedMessages: Message[] = [
      ...messages,
      {
        role: "user",
        content: query,
        isVoice,
      },
    ];

    setMessages(updatedMessages);

    setStatus("thinking");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();

      const responseText =
        data.message || "Sorry, I could not generate a response.";

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: responseText,
        },
      ]);

      if (textToSpeechEnabled && synthRef.current) {
        synthRef.current.cancel();

        const utterance = new SpeechSynthesisUtterance(responseText);

        const playVoice = () => {
          if (!synthRef.current) return;
          const voices = window.speechSynthesis.getVoices();
          const selectedVoice =
            voices.find((voice) =>
              voice.name.includes("Google UK English Female"),
            ) ||
            voices.find((voice) => voice.lang.startsWith("en")) ||
            voices[0];

          if (selectedVoice) {
            utterance.voice = selectedVoice;
          }

          utterance.rate = 1;
          utterance.pitch = 1;

          utterance.onend = () => {
            setStatus("idle");
          };

          utterance.onerror = () => {
            setStatus("idle");
          };

          setStatus("speaking");
          synthRef.current.speak(utterance);
        };

        // Handles asynchronous loading of SpeechSynthesis voices (e.g. Chrome/WebKit loading delay)
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            playVoice();
          };
        } else {
          playVoice();
        }
      } else {
        setStatus("idle");
      }
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Something went wrong. Please try again.",
        },
      ]);

      setStatus("idle");
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setStatus("idle");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="w-[90vw] sm:w-95 h-125 mb-4 rounded-2xl border border-border bg-card shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-border bg-muted/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <Bot className="h-4 w-4 text-accent" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 border border-card" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    Safwan's Assistant
                  </h4>
                  <p className="text-[10px] text-muted-foreground font-mono">
                    Speech Engine Active
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={() => setTextToSpeechEnabled(!textToSpeechEnabled)}
                  aria-label={
                    textToSpeechEnabled
                      ? "Mute voice response output"
                      : "Enable voice response output"
                  }
                  title={
                    textToSpeechEnabled
                      ? "Mute Voice Output"
                      : "Enable Voice Output"
                  }
                >
                  {textToSpeechEnabled ? (
                    <Volume2 className="h-4 w-4" />
                  ) : (
                    <VolumeX className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground cursor-pointer"
                  onClick={handleClose}
                  aria-label="Close AI Assistant panel"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Message Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      msg.role === "user"
                        ? "bg-accent text-accent-foreground rounded-tr-none"
                        : "border border-border bg-muted/40 text-foreground rounded-tl-none"
                    }`}
                  >
                    {msg.content}
                    {msg.isVoice && (
                      <span className="block text-[8px] opacity-60 font-mono mt-1 text-right">
                        🎙️ Voice Input
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {/* Animated status representation in chat */}
              {status === "thinking" && (
                <div className="flex justify-start">
                  <div className="border border-border bg-muted/40 rounded-2xl rounded-tl-none p-3.5 flex items-center gap-1">
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <span
                      className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              )}

              {status === "listening" && (
                <div className="flex justify-center p-2">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-red-500/20 bg-red-500/5 text-red-500 text-[10px] font-mono">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    Listening for voice input...
                  </div>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Waveform visualizer / Speaking state */}
            {status !== "idle" && (
              <div className="px-4 py-2 border-t border-border/40 bg-muted/10 flex items-center justify-between gap-4">
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                  Assistant State: {status}
                </span>

                {/* Simulated Waveform animation */}
                <div className="flex items-end gap-0.5 h-6">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const durations = ["0.6s", "0.9s", "0.7s", "1.1s", "0.8s"];
                    const dur = durations[i % durations.length];
                    const activeHeight =
                      status === "speaking"
                        ? "h-5"
                        : status === "listening"
                          ? "h-3"
                          : "h-1.5";
                    return (
                      <motion.span
                        key={i}
                        animate={{
                          height:
                            status === "speaking"
                              ? [4, 18, 6, 22, 4]
                              : status === "listening"
                                ? [3, 12, 3]
                                : 4,
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: parseFloat(dur),
                          ease: "easeInOut",
                        }}
                        className={`w-0.75 bg-accent rounded-full`}
                        style={{ height: "4px" }}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              onSubmit={handleTextSubmit}
              className="p-3 border-t border-border bg-card flex gap-2"
            >
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                aria-label="Ask Safwan's AI assistant a question"
                placeholder={
                  status === "listening"
                    ? "Listening..."
                    : "Ask me a question..."
                }
                disabled={status === "listening"}
                className="flex-1 bg-muted/50 border border-border/80 rounded-xl px-3 text-xs text-foreground focus:outline-none focus:border-accent transition-colors disabled:opacity-50"
              />

              {speechSupported && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={toggleMic}
                  className={`rounded-xl shrink-0 cursor-pointer ${
                    status === "listening"
                      ? "border-red-500/50 bg-red-500/10 text-red-500 hover:bg-red-500/20"
                      : "hover:bg-muted"
                  }`}
                  aria-label={
                    status === "listening"
                      ? "Stop microphone recording voice input"
                      : "Activate microphone for voice input"
                  }
                  title="Speech Input"
                >
                  {status === "listening" ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                </Button>
              )}

              <Button
                type="submit"
                size="icon"
                disabled={!inputVal.trim() || status === "listening"}
                aria-label="Send message to AI assistant"
                className="rounded-xl bg-accent text-accent-foreground hover:opacity-90 shrink-0 cursor-pointer"
              >
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label={
          isOpen
            ? "Close AI assistant chat window"
            : "Open AI assistant chat window"
        }
        aria-expanded={isOpen}
        className="w-14 h-14 rounded-full bg-linear-to-tr from-indigo-500 via-purple-500 to-pink-500 text-white flex items-center justify-center shadow-2xl relative group cursor-pointer z-100"
        style={{
          boxShadow: "0 8px 32px rgba(99, 102, 241, 0.4)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="relative"
            >
              <Bot className="h-6 w-6" />
              <span className="absolute -top-1.5 -right-1.5 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
