import { create } from "zustand";
import { Project } from "@/content";

export type CursorVariant = "default" | "hover" | "project" | "hidden";

interface PortfolioStore {
  // Scroll & Camera synchronization
  scrollProgress: number;
  activeSection: number;
  scrollVelocity: number;
  setScrollState: (progress: number, activeSection: number, velocity: number) => void;

  // Custom Cursor state
  cursorVariant: CursorVariant;
  cursorText: string;
  setCursorVariant: (variant: CursorVariant, text?: string) => void;

  // Loading & intro sequence
  isLoaded: boolean;
  setIsLoaded: (loaded: boolean) => void;

  // Case Study modal
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  // Mobile / Low power detection
  isMobile: boolean;
  setIsMobile: (mobile: boolean) => void;
}

export const usePortfolioStore = create<PortfolioStore>((set) => ({
  scrollProgress: 0,
  activeSection: 0,
  scrollVelocity: 0,
  setScrollState: (progress, activeSection, velocity) =>
    set({ scrollProgress: progress, activeSection, scrollVelocity: velocity }),

  cursorVariant: "default",
  cursorText: "",
  setCursorVariant: (variant, text = "") =>
    set({ cursorVariant: variant, cursorText: text }),

  isLoaded: false,
  setIsLoaded: (isLoaded) => set({ isLoaded }),

  selectedProject: null,
  setSelectedProject: (selectedProject) => set({ selectedProject }),

  isMobile: false,
  setIsMobile: (isMobile) => set({ isMobile }),
}));
