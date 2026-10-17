"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, CheckCircle2 } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function CaseStudyModal() {
  const selectedProject = usePortfolioStore((state) => state.selectedProject);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject, setSelectedProject]);

  return (
    <AnimatePresence>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="absolute inset-0 bg-[#0A0A0A]/40 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white border border-[#0A0A0A]/10 rounded-3xl p-8 sm:p-12 shadow-2xl z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              className="absolute top-6 right-6 p-2 rounded-full border border-[#0A0A0A]/10 hover:bg-[#0A0A0A] hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-[#2563EB]/10 text-[#2563EB] font-semibold">
                  {selectedProject.impact}
                </span>
                <span className="text-xs uppercase tracking-widest text-[#0A0A0A]/50 font-medium">
                  {selectedProject.role}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#0A0A0A]">
                {selectedProject.title}
              </h2>
              <p className="text-base text-[#0A0A0A]/70 font-medium">
                {selectedProject.subtitle}
              </p>
            </div>

            {/* Content body */}
            <div className="mt-8 pt-8 border-t border-[#0A0A0A]/10 space-y-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/60 mb-2">
                  OVERVIEW & SCOPE
                </h4>
                <p className="text-sm sm:text-base text-[#0A0A0A]/85 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/60 mb-3">
                  TECHNOLOGY STACK
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-mono px-3 py-1.5 rounded-md bg-[#0A0A0A]/5 text-[#0A0A0A] border border-[#0A0A0A]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-[#F8FAFC] border border-[#0A0A0A]/8 rounded-2xl p-6 space-y-3">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/80">
                  KEY DELIVERABLES
                </h4>
                <ul className="space-y-2 text-xs sm:text-sm text-[#0A0A0A]/80">
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Architected responsive frontend interfaces with pixel-perfect layouts.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Integrated robust REST endpoints and persistent database schema.</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0" />
                    <span>Deployed to production infrastructure with high availability and fast load.</span>
                  </li>
                </ul>
              </div>

              {/* Action buttons */}
              <div className="pt-4 flex flex-wrap gap-4">
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full bg-[#0A0A0A] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#2563EB] transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-[#0A0A0A]/20 text-[#0A0A0A] text-xs uppercase tracking-widest font-semibold hover:border-[#0A0A0A] transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>View Repository</span>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
