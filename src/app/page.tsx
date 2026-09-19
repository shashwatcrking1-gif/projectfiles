"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, personalInfo, socialLinks } from "@/data/portfolio";
import type { Project } from "@/data/portfolio";
import { LoadingScreen } from "@/components/LoadingScreen";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GridFloor } from "@/components/GridFloor";
import { Carousel } from "@/components/Carousel";
import { ProjectDetail } from "@/components/ProjectDetail";
import { FullView } from "@/components/FullView";

/**
 * Home — orchestrates the entire single-page portfolio.
 *
 * States:
 *  - loading → LoadingScreen (auto-dismisses)
 *  - view: "featured" → Carousel | "full" → FullView
 *  - selectedProject → ProjectDetail modal
 *  - showProfile → Profile modal
 */
export default function Home() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"featured" | "full">("featured");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProfile, setShowProfile] = useState(false);

  const handleProjectSelect = useCallback((p: Project) => {
    setSelectedProject(p);
  }, []);

  return (
    <>
      {/* ================================================================ */}
      {/* Loading Screen                                                    */}
      {/* ================================================================ */}
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {/* ================================================================ */}
      {/* Main content — fades in after loading                             */}
      {/* ================================================================ */}
      <motion.div
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Header */}
        <Header onProfileClick={() => setShowProfile(true)} />

        {/* Perspective grid */}
        <GridFloor />

        {/* View switcher */}
        <AnimatePresence mode="wait">
          {view === "featured" ? (
            <motion.div
              key="carousel"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Carousel projects={projects} onSelect={handleProjectSelect} />
            </motion.div>
          ) : (
            <motion.div
              key="full"
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <FullView projects={projects} onSelect={handleProjectSelect} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <Footer view={view} onViewChange={setView} />
      </motion.div>

      {/* ================================================================ */}
      {/* Project Detail Modal                                              */}
      {/* ================================================================ */}
      <ProjectDetail
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* ================================================================ */}
      {/* Profile Modal                                                     */}
      {/* ================================================================ */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
              onClick={() => setShowProfile(false)}
            />

            {/* Profile card */}
            <motion.div
              className="relative bg-[#0a0a0a] border border-white/[0.08] rounded-2xl p-8 md:p-10 max-w-lg w-full mx-6"
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 250 }}
            >
              {/* Close */}
              <button
                onClick={() => setShowProfile(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/20 transition-colors"
                aria-label="Close profile"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Content */}
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 mb-4 block">
                About
              </span>
              <h2 className="text-2xl font-bold text-white mb-2">
                {personalInfo.name}
              </h2>
              <p className="text-[13px] uppercase tracking-[0.12em] text-white/40 mb-6">
                {personalInfo.role}
              </p>

              <p className="text-[15px] text-white/50 font-light leading-relaxed mb-5">
                {personalInfo.bio}
              </p>
              <p className="text-[15px] text-white/50 font-light leading-relaxed mb-8">
                {personalInfo.philosophy}
              </p>

              {/* Social links */}
              <div className="flex gap-5 pt-5 border-t border-white/[0.06]">
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.1em] text-white/35 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.1em] text-white/35 hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] uppercase tracking-[0.1em] text-white/35 hover:text-white transition-colors"
                >
                  YouTube
                </a>
                <a
                  href={`mailto:${socialLinks.email}`}
                  className="text-[11px] uppercase tracking-[0.1em] text-white/35 hover:text-white transition-colors"
                >
                  Email
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
