"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { PORTFOLIO_CONTENT, Project } from "@/content";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const setCursorVariant = usePortfolioStore((state) => state.setCursorVariant);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);

  const projects = PORTFOLIO_CONTENT.projects;

  const scrollToIndex = (index: number) => {
    setActiveIndex(index);
    if (!trackRef.current) return;
    const cards = trackRef.current.children;
    if (cards[index]) {
      (cards[index] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  const handlePrev = () => {
    const nextIdx = activeIndex === 0 ? projects.length - 1 : activeIndex - 1;
    scrollToIndex(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activeIndex === projects.length - 1 ? 0 : activeIndex + 1;
    scrollToIndex(nextIdx);
  };

  return (
    <section id="projects" ref={containerRef} className="relative px-6 sm:px-12 py-24 sm:py-32 max-w-7xl mx-auto">
      {/* Editorial Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#0A0A0A]/10 pb-6 mb-8 gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A]/50 block">
            PROJECTS // 03
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0A0A0A] mt-1">
            Featured Engineering Projects
          </h2>
        </div>

        {/* Carousel Prev & Next Controls */}
        <div className="flex items-center space-x-3">
          <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/50 hidden sm:inline">
            0{activeIndex + 1} / 0{projects.length}
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              aria-label="Previous project"
              className="w-10 h-10 rounded-full border border-[#0A0A0A]/15 bg-white flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-all shadow-xs"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              aria-label="Next project"
              className="w-10 h-10 rounded-full border border-[#0A0A0A]/15 bg-white flex items-center justify-center hover:bg-[#0A0A0A] hover:text-white transition-all shadow-xs"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Project Jump Pills */}
      <div className="flex flex-wrap gap-2.5 mb-10">
        {projects.map((proj, idx) => (
          <button
            key={proj.id}
            onClick={() => scrollToIndex(idx)}
            onMouseEnter={() => setCursorVariant("hover")}
            onMouseLeave={() => setCursorVariant("default")}
            className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center space-x-2 ${
              activeIndex === idx
                ? "bg-[#2563EB] text-white shadow-md shadow-blue-500/20"
                : "bg-white border border-[#0A0A0A]/10 text-[#0A0A0A]/70 hover:border-[#2563EB] hover:text-[#2563EB]"
            }`}
          >
            <span className="font-mono text-[10px] opacity-75">0{idx + 1}</span>
            <span>{proj.title}</span>
          </button>
        ))}
      </div>

      {/* 3D-Tilt Cards Horizontal Carousel Track */}
      <div
        ref={trackRef}
        className="flex space-x-6 sm:space-x-8 overflow-x-auto pb-8 pt-2 scroll-smooth no-scrollbar snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {projects.map((project, idx) => (
          <div key={project.id} className="snap-center shrink-0">
            <TiltProjectCard
              project={project}
              index={idx}
              isActive={activeIndex === idx}
              onSelect={() => setSelectedProject(project)}
              onMouseEnter={() => setCursorVariant("project", "VIEW")}
              onMouseLeave={() => setCursorVariant("default")}
            />
          </div>
        ))}
      </div>

      {/* Bottom Track Indicator */}
      <div className="flex items-center justify-between border-t border-[#0A0A0A]/10 pt-4 text-xs uppercase tracking-widest text-[#0A0A0A]/50">
        <span className="font-mono">USE ARROWS OR SWIPE TO EXPLORE ALL 4 PROJECTS</span>
        <div className="flex items-center space-x-1.5">
          {projects.map((_, i) => (
            <div
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeIndex === i ? "w-8 bg-[#2563EB]" : "w-2 bg-[#0A0A0A]/20"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TiltCardProps {
  project: Project;
  index: number;
  isActive: boolean;
  onSelect: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

function TiltProjectCard({
  project,
  index,
  isActive,
  onSelect,
  onMouseEnter,
  onMouseLeave,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  // 3D Perspective Tilt toward cursor
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10;
    const rotY = ((x - centerX) / centerX) * 10;
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    onMouseLeave();
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onSelect}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.15s ease-out",
      }}
      className={`relative w-[320px] sm:w-[460px] lg:w-[540px] h-[460px] sm:h-[490px] rounded-3xl bg-white border p-8 sm:p-10 flex flex-col justify-between shadow-[0_12px_45px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(37,99,235,0.14)] cursor-pointer select-none group transition-all ${
        isActive ? "border-[#2563EB]/60 ring-2 ring-[#2563EB]/10" : "border-[#0A0A0A]/12 hover:border-[#2563EB]/50"
      }`}
    >
      {/* Top Bar with Number & Impact Pill */}
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs uppercase tracking-widest text-[#0A0A0A]/50">
          0{index + 1} // 04
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-blue-50 text-[#2563EB] border border-[#2563EB]/25">
          {project.impact}
        </span>
      </div>

      {/* Center Details */}
      <div className="my-auto space-y-4">
        <div className="space-y-1.5">
          <span className="text-xs uppercase tracking-widest text-[#0A0A0A]/60 font-semibold block">
            {project.role}
          </span>
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-[#0A0A0A] group-hover:text-[#2563EB] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm font-medium text-[#2563EB]">
            {project.subtitle}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-[#0A0A0A]/75 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-mono px-3 py-1 rounded-lg bg-[#0A0A0A]/4 text-[#0A0A0A] border border-[#0A0A0A]/8 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="flex items-center justify-between border-t border-[#0A0A0A]/10 pt-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-[#0A0A0A] group-hover:text-[#2563EB] transition-colors flex items-center space-x-1.5">
          <span>Read Case Study</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-[#2563EB]" />
        </span>

        <div className="flex items-center space-x-3 text-[#0A0A0A]/60">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[#2563EB] transition-colors p-1"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:text-[#2563EB] transition-colors p-1"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
