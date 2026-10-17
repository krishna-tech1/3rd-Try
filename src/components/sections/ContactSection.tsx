"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  Send,
  Phone,
  ArrowUpRight,
  Sparkles,
  Mail,
} from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/Icons";
import { PORTFOLIO_CONTENT } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function ContactSection() {
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_CONTENT.contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setStatusMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setStatusMsg(data.message || "Thank you! Your message was sent.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setStatusMsg(data.error || "Failed to send message. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMsg("Network error. Please try again or email directly.");
    }
  };

  return (
    <section
      id="contact"
      className="relative px-6 sm:px-12 py-24 sm:py-32 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-gradient-to-tl from-blue-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Editorial Section Header */}
      <div className="flex items-baseline justify-between border-b border-[#0A0A0A]/10 pb-4 mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50">
          CONTACT // 07
        </span>
        <span className="text-xs uppercase tracking-widest text-[#2563EB] font-mono font-semibold">
          START A PROJECT
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Editorial Info & Channel Cards */}
        <div className="lg:col-span-6 space-y-8">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#2563EB] font-semibold flex items-center space-x-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>DIRECT INQUIRY</span>
            </span>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[#0A0A0A] leading-[0.95]">
              Let&apos;s build{" "}
              <span className="bg-gradient-to-r from-[#2563EB] to-[#4F46E5] bg-clip-text text-transparent">
                together.
              </span>
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#0A0A0A]/75 leading-relaxed max-w-md">
              {PORTFOLIO_CONTENT.contact.subHeadline}
            </p>
          </div>

          {/* Click to Copy Email Card */}
          <div className="p-6 rounded-3xl bg-white border border-blue-200/80 shadow-[0_8px_30px_rgba(37,99,235,0.06)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50">
                DIRECT INBOX
              </span>
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold">
                PREFERRED
              </span>
            </div>

            <button
              onClick={handleCopyEmail}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="group flex items-center justify-between w-full px-4 py-3.5 rounded-2xl bg-[#0A0A0A]/3 border border-[#0A0A0A]/8 hover:border-[#2563EB] hover:bg-white transition-all text-left"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563EB] flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-sm sm:text-base font-bold text-[#0A0A0A] group-hover:text-[#2563EB] transition-colors block">
                    {PORTFOLIO_CONTENT.contact.email}
                  </span>
                  <span className="text-[11px] text-[#0A0A0A]/50">
                    Click to copy address
                  </span>
                </div>
              </div>

              <div className="p-2 rounded-xl bg-white group-hover:bg-[#2563EB] group-hover:text-white transition-colors shadow-xs">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-600 group-hover:text-white" />
                ) : (
                  <Copy className="w-4 h-4 text-[#0A0A0A]/70" />
                )}
              </div>
            </button>
            {copied && (
              <span className="text-xs text-emerald-600 font-medium block">
                ✓ Copied {PORTFOLIO_CONTENT.contact.email} to clipboard!
              </span>
            )}
          </div>

          {/* Direct Channels Grid */}
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50 block">
              CHANNELS & SOCIALS
            </span>
            <div className="grid grid-cols-2 gap-3">
              <a
                href={PORTFOLIO_CONTENT.contact.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-emerald-200/80 hover:border-emerald-500 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0A0A0A] block">WhatsApp</span>
                  <span className="text-[10px] text-[#0A0A0A]/50 font-mono">Quick Chat</span>
                </div>
              </a>

              <a
                href={PORTFOLIO_CONTENT.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-blue-200/80 hover:border-blue-500 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#2563EB] flex items-center justify-center group-hover:bg-[#2563EB] group-hover:text-white transition-colors">
                  <LinkedinIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0A0A0A] block">LinkedIn</span>
                  <span className="text-[10px] text-[#0A0A0A]/50 font-mono">Profile</span>
                </div>
              </a>

              <a
                href={PORTFOLIO_CONTENT.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-[#0A0A0A]/10 hover:border-[#0A0A0A] shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-[#0A0A0A] flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                  <GithubIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0A0A0A] block">GitHub</span>
                  <span className="text-[10px] text-[#0A0A0A]/50 font-mono">Repositories</span>
                </div>
              </a>

              <a
                href={PORTFOLIO_CONTENT.contact.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setCursorVariant("hover")}
                onMouseLeave={() => setCursorVariant("default")}
                className="flex items-center space-x-3 p-3.5 rounded-2xl bg-white border border-rose-200/80 hover:border-rose-500 shadow-xs hover:shadow-md transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition-colors">
                  <InstagramIcon className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0A0A0A] block">Instagram</span>
                  <span className="text-[10px] text-[#0A0A0A]/50 font-mono">@ig_krish_na</span>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Working Contact Form */}
        <div className="lg:col-span-6 bg-white/95 backdrop-blur-md border border-[#0A0A0A]/10 rounded-3xl p-8 sm:p-10 shadow-[0_12px_45px_rgba(37,99,235,0.06)]">
          <div className="space-y-1 mb-6">
            <h3 className="text-2xl font-bold tracking-tight text-[#0A0A0A]">
              Send a Message
            </h3>
            <p className="text-xs text-[#0A0A0A]/60 font-mono">
              Direct delivery to {PORTFOLIO_CONTENT.contact.email}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]/70 mb-2"
              >
                Your Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Alexander Wright"
                className="w-full px-4 py-3.5 rounded-xl border border-[#0A0A0A]/15 bg-white text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]/70 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="e.g. alex@company.com"
                className="w-full px-4 py-3.5 rounded-xl border border-[#0A0A0A]/15 bg-white text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs uppercase tracking-wider font-semibold text-[#0A0A0A]/70 mb-2"
              >
                Project Scope or Inquiry
              </label>
              <textarea
                id="message"
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about the website, app, or initiative you want to build..."
                className="w-full px-4 py-3.5 rounded-xl border border-[#0A0A0A]/15 bg-white text-sm text-[#0A0A0A] focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20 transition-all resize-none"
              />
            </div>

            {statusMsg && (
              <div
                className={`p-3.5 rounded-xl text-xs font-semibold ${
                  status === "success"
                    ? "bg-emerald-50 text-emerald-800 border border-emerald-300"
                    : "bg-rose-50 text-rose-800 border border-rose-300"
                }`}
              >
                {statusMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="w-full flex items-center justify-center space-x-2 px-6 py-4 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2563EB] shadow-md shadow-blue-500/10 hover:shadow-blue-500/25 transition-all disabled:opacity-50"
            >
              {status === "loading" ? (
                <span>Transmitting...</span>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
