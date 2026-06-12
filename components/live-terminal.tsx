"use client";

import { useEffect, useRef, useState } from "react";
import { Terminal, ShieldAlert, Cpu } from "lucide-react";
import { motion } from "framer-motion";

interface CommandOutput {
  command: string;
  response: string | string[];
}

const COMMANDS = [
  "help",
  "skills",
  "projects",
  "contact",
  "resume",
  "clear",
  "sudo",
];

export default function LiveTerminal() {
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      command: "system-init",
      response: [
        "Welcome to Safwan's Interactive Command Terminal [v1.0.4]",
        "Type 'help' to see list of available commands.",
        "",
      ],
    },
  ]);
  const [inputVal, setInputVal] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);

  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdText: string) => {
    const trimmed = cmdText.trim().toLowerCase();
    let response: string | string[] = "";

    if (trimmed) {
      setCmdHistory((prev) => [...prev, cmdText]);
    }
    setHistoryIndex(-1);

    switch (trimmed) {
      case "help":
        response = [
          "Available Commands:",
          "  help     - Show list of commands",
          "  skills   - List technical skills and proficiency",
          "  projects - Summary of featured projects",
          "  contact  - Display contact channels",
          "  resume   - View/download professional resume",
          "  clear    - Clear console screen",
          "  sudo     - Enter root administration mode",
        ];
        break;

      case "skills":
        response = [
          "Technical Stack:",
          "  [Frontend]   - Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP",
          "  [Backend]    - NestJS, Node.js, REST APIs, WebSocket (Socket.io), MQTT",
          "  [Database]   - PostgreSQL, Prisma ORM, MongoDB",
          "  [Tools]      - Git, Docker, Postman, Vercel, Expo (React Native)",
        ];
        break;

      case "projects":
        response = [
          "Featured Projects:",
          "  1. ELMS (Employee Leave Management System) - Premium NestJS/Next.js portal",
          "  2. Tunnel Real-Time Chat App             - Low-latency Socket.io workspace",
          "  3. Kalaam AI Voice Platform              - ElevenLabs & LiveKit voice synth",
          "  4. Pulse Viz Platform                   - Web Audio API canvas visualizer",
          "Type 'projects' for overview, check projects section for detailed case studies.",
        ];
        break;

      case "contact":
        response = [
          "Contact Information:",
          "  Form: Scroll down to 'Contact' form.",
          "  Status: Open for full-time & consulting opportunities.",
        ];
        break;

      case "resume":
        response = [
          "Opening resume in new window...",
          "  If it didn't open, visit direct link: Safwan_Ahmed.pdf",
        ];
        // Trigger download/view mock
        if (typeof window !== "undefined") {
          window.open("/Safwan_Ahmed.pdf", "_blank");
        }
        break;

      case "clear":
        setHistory([]);
        return;

      case "sudo":
        response =
          "Error: guest is not in the sudoers file. This incident will be reported to Safwan.";
        break;

      case "":
        response = "";
        break;

      default:
        response = `Command not found: '${trimmed}'. Type 'help' to see list of valid commands.`;
        break;
    }

    setHistory((prev) => [...prev, { command: cmdText, response }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Arrow Up - Walk history backward
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      }
    }

    // Arrow Down - Walk history forward
    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[cmdHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }

    // Tab autocomplete
    if (e.key === "Tab") {
      e.preventDefault();
      const matching = COMMANDS.filter((c) => c.startsWith(inputVal));
      if (matching.length === 1) {
        setInputVal(matching[0]);
      } else if (matching.length > 1) {
        // print options in console
        setHistory((prev) => [
          ...prev,
          {
            command: inputVal,
            response: `Matching: ${matching.join(", ")}`,
          },
        ]);
      }
    }
  };

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  return (
    <section
      id="terminal-section"
      className="py-24 sm:py-36 relative overflow-hidden bg-background"
    >
      {/* Glow backgrounds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-140 h-140 rounded-full blur-3xl opacity-5 bg-cyan-400" />
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-4 mb-10 text-center"
        >
          <span className="section-label mx-auto">
            <Terminal className="h-3 w-3" />
            Console
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Live <span className="gradient-text">Interactive</span> Terminal
          </h2>
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            For developers, recruiters, or command line lovers. Interact
            directly with Safwan's profile using the prompt.
          </p>
        </motion.div>

        {/* Terminal Window Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="rounded-2xl border border-border bg-slate-950 shadow-2xl overflow-hidden flex flex-col font-mono text-xs sm:text-sm h-100 cursor-text"
          onClick={handleTerminalClick}
        >
          {/* Windows Header Control */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-border select-none">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="text-[10px] text-muted-foreground tracking-wide font-mono flex items-center gap-1">
              <Cpu className="h-3 w-3 text-accent" />
              guest@safwan.dev:~
            </div>
            <div className="w-12" /> {/* alignment spacer */}
          </div>

          {/* Console Area */}
          <div
            ref={terminalRef}
            className="flex-1 p-5 overflow-y-auto space-y-3.5 text-zinc-300"
          >
            {history.map((item, idx) => (
              <div key={idx} className="space-y-1">
                {item.command !== "system-init" && (
                  <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                    <span>guest@safwan.dev:~$</span>
                    <span className="text-zinc-200">{item.command}</span>
                  </div>
                )}
                <div className="whitespace-pre-wrap leading-relaxed text-zinc-300 font-mono">
                  {Array.isArray(item.response) ? (
                    item.response.map((line, lineIdx) => (
                      <div key={lineIdx} className={line === "" ? "h-2" : ""}>
                        {line}
                      </div>
                    ))
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {item.response.startsWith("Error:") && (
                        <ShieldAlert className="h-3.5 w-3.5 text-red-500 shrink-0" />
                      )}
                      <span
                        className={
                          item.response.startsWith("Error:")
                            ? "text-red-400"
                            : ""
                        }
                      >
                        {item.response}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Current prompt command line input */}
            <div className="flex items-center gap-2 text-emerald-400 font-semibold pt-1">
              <span>guest@safwan:~$</span>
              <div className="flex-1 relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onSubmit={() => handleCommand(inputVal)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCommand(inputVal);
                      setInputVal("");
                    }
                  }}
                  className="w-full bg-transparent text-zinc-200 border-none outline-none focus:ring-0 focus:border-none focus:outline-none p-0 caret-transparent font-mono"
                  autoComplete="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                {/* Virtual Cursor */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    left: `${Math.min(inputVal.length * 7.5, 450)}px`,
                  }}
                >
                  <span className="terminal-cursor" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
