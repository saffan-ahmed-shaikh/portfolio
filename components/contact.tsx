"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, CheckCircle, Send } from "lucide-react";
import { motion } from "framer-motion";
import SocialLinks from "./social-links";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name");
    const email = formData.get("email");
    const message = formData.get("message");
    const phoneNumber = "8108360326";

    const text = `Hello Safwan 👋\n\nYou have received a new message:\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;
    const encodedText = encodeURIComponent(text);
    const appUrl = `whatsapp://send?phone=${phoneNumber}&text=${encodedText}`;
    const webUrl = `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;
    const fallbackUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;

    let appOpened = false;
    const handleVisibilityChange = () => {
      if (document.hidden) {
        appOpened = true;
        document.removeEventListener(
          "visibilitychange",
          handleVisibilityChange,
        );
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.location.href = appUrl;

    setTimeout(() => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (!appOpened) {
        const webWindow = window.open(webUrl, "_blank");
        if (!webWindow) window.open(fallbackUrl, "_blank");
      }
      setIsSubmitting(false);
      setSubmitStatus("success");
      form.reset();
    }, 1200);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 rounded-xl border text-foreground bg-background/70 text-sm placeholder:text-muted-foreground/50 outline-none transition-all duration-250 ${
      focused === field
        ? "border-accent/60 shadow-[0_0_0_3px_rgba(var(--glow-accent),0.12)]"
        : "border-border/60 hover:border-border"
    }`;

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section
      id="contact"
      className="py-24 sm:py-36 relative overflow-hidden bg-secondary/20"
    >
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-1/3 w-80 h-80 rounded-full blur-3xl opacity-6 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(99,102,241,0.18), transparent)",
          }}
        />
        <div
          className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full blur-3xl opacity-6 animate-pulse-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.12), transparent)",
            animationDelay: "1.5s",
          }}
        />
        <div className="absolute inset-0 dot-grid opacity-20" />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-14"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="space-y-5">
            <span className="section-label">
              <Mail className="h-3 w-3" />
              Contact
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              I&apos;m always interested in new opportunities, exciting
              projects, or just a chat about web development. Let&apos;s
              connect.
            </p>
          </motion.div>

          <div className="grid gap-8 lg:grid-cols-5">
            {/* Form — 3/5 */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="relative rounded-2xl border border-border/50 bg-card p-6 md:p-8 overflow-hidden">
                {/* Card ambient */}
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-3xl opacity-6 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle, rgba(99,102,241,0.4), transparent)",
                  }}
                />

                <h3 className="font-semibold text-foreground text-lg mb-6">
                  Send Me a Message
                </h3>

                {submitStatus === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-12 gap-4 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle className="h-8 w-8 text-emerald-500" />
                    </div>
                    <p className="font-semibold text-foreground">
                      Message Ready!
                    </p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      WhatsApp has been opened with your message pre-filled.
                      Please send it to complete.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSubmitStatus("idle")}
                      className="mt-2 rounded-xl"
                    >
                      Send another
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          placeholder="Your name"
                          className={inputClass("name")}
                          onFocus={() => setFocused("name")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-foreground mb-2"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          placeholder="your@email.com"
                          className={inputClass("email")}
                          onFocus={() => setFocused("email")}
                          onBlur={() => setFocused(null)}
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-foreground mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell me about your project or opportunity..."
                        className={`${inputClass("message")} resize-none`}
                        onFocus={() => setFocused("message")}
                        onBlur={() => setFocused(null)}
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-6 rounded-xl font-semibold text-accent-foreground transition-all duration-200"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 4px 20px rgba(var(--glow-accent), 0.35)",
                      }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                          Opening WhatsApp…
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4" />
                          Send via WhatsApp
                          <Send className="h-3.5 w-3.5 ml-1" />
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Info panel — 2/5 */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 space-y-5"
            >
              {/* Email card */}
              <div className="group relative rounded-2xl border border-border/50 bg-card p-6 overflow-hidden transition-all duration-300 hover:border-accent/30 hover:shadow-lg">
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-350 pointer-events-none"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(99,102,241,0.3), 0 8px 28px rgba(99,102,241,0.08)",
                  }}
                />
                <div className="flex items-start gap-4">
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-xl shrink-0"
                    style={{
                      background: "rgba(99,102,241,0.12)",
                      boxShadow: "0 4px 12px rgba(99,102,241,0.2)",
                    }}
                  >
                    <Mail
                      className="h-5 w-5"
                      style={{ color: "rgb(99,102,241)" }}
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-0.5">
                      Email
                    </p>
                    <a
                      href="mailto:safwan.ahmed.swe@gmail.com"
                      className="text-accent hover:underline text-sm break-all"
                    >
                      safwan.ahmed.swe@gmail.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Availability card */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="font-semibold text-foreground text-sm">
                    Currently Available
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Open to full-time roles at product-based companies and MNCs.
                  Based in Mumbai — notice period: 90 days.
                </p>
              </div>

              {/* Social links */}
              <div className="rounded-2xl border border-border/50 bg-card p-6">
                <p className="font-semibold text-foreground text-sm mb-4">
                  Find Me Online
                </p>
                <SocialLinks />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
